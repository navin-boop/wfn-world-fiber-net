import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const testimonialUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  text: z.string().min(1).optional(),
  plan: z.string().optional(),
  stars: z.number().int().min(1).max(5).optional(),
  active: z.boolean().optional(),
  order: z.number().int().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = testimonialUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const testimonial = await db.testimonial.update({ where: { id }, data: parsed.data });
    return Response.json(testimonial);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await db.testimonial.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
