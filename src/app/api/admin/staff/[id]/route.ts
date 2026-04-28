import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const staffUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'SALES', 'SUPPORT', 'VIEWER']).optional(),
  active: z.boolean().optional(),
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
    const parsed = staffUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const user = await db.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return Response.json(user);
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
    await db.user.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
