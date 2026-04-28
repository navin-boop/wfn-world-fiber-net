import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional().default('General'),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } });
  return Response.json(faqs);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const faq = await db.fAQ.create({ data: parsed.data });
    return Response.json(faq, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
