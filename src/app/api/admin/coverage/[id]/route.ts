import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const coverageUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  district: z.string().min(1).optional(),
  status: z.string().optional(),
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
    const parsed = coverageUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const area = await db.coverageArea.update({ where: { id }, data: parsed.data });
    return Response.json(area);
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
    await db.coverageArea.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
