import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const staffSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'SALES', 'SUPPORT', 'VIEWER']),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
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
  return Response.json(users);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = staffSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const { password, ...rest } = parsed.data;
    const hashed = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: { ...rest, password: hashed },
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

    return Response.json(user, { status: 201 });
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === 'P2002') {
      return Response.json({ error: 'Email already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
