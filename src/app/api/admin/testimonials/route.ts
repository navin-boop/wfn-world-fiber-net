import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const testimonialSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  text: z.string().min(1),
  plan: z.string().optional(),
  stars: z.number().int().min(1).max(5).optional().default(5),
  active: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const testimonials = await db.testimonial.findMany({ orderBy: { order: 'asc' } });
  return Response.json(testimonials);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const testimonial = await db.testimonial.create({ data: parsed.data });
    return Response.json(testimonial, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
