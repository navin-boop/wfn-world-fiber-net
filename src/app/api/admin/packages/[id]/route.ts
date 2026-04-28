import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const packageUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  speed: z.string().min(1).optional(),
  unit: z.string().min(1).optional(),
  price: z.string().min(1).optional(),
  badge: z.string().optional(),
  features: z.array(z.string()).optional(),
  popular: z.boolean().optional(),
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
    const parsed = packageUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const { features, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };
    if (features !== undefined) {
      data.features = JSON.stringify(features);
    }

    const pkg = await db.package.update({ where: { id }, data });
    return Response.json(pkg);
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
    await db.package.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
