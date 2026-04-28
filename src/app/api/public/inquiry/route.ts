import { db } from '@/lib/db';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  message: z.string().optional(),
  type: z.string().min(1),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const lead = await db.lead.create({ data: parsed.data });
    return Response.json({ success: true, id: lead.id }, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
