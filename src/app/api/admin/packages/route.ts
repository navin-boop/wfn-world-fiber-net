import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const packageSchema = z.object({
  name: z.string().min(1),
  speed: z.string().min(1),
  unit: z.string().min(1),
  price: z.string().min(1),
  badge: z.string(),
  features: z.array(z.string()),
  popular: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const packages = await db.package.findMany({ orderBy: { order: 'asc' } });
  return Response.json(packages);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const { features, ...rest } = parsed.data;
    const pkg = await db.package.create({
      data: {
        ...rest,
        features: JSON.stringify(features),
      },
    });

    return Response.json(pkg, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
