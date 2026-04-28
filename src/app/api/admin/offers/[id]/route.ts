import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const offerUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  imageUrl: z.string().optional(),
  ctaText: z.string().min(1).optional(),
  ctaLink: z.string().min(1).optional(),
  price: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  placement: z.array(z.string()).optional(),
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
    const parsed = offerUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const { placement, startDate, endDate, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };
    if (placement !== undefined) data.placement = JSON.stringify(placement);
    if (startDate !== undefined) data.startDate = new Date(startDate);
    if (endDate !== undefined) data.endDate = new Date(endDate);

    const offer = await db.offer.update({ where: { id }, data });
    return Response.json(offer);
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
    await db.offer.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
