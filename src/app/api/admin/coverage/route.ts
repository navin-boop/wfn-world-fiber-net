import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const coverageSchema = z.object({
  name: z.string().min(1),
  district: z.string().min(1),
  status: z.string().optional().default('active'),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const areas = await db.coverageArea.findMany({ orderBy: { order: 'asc' } });
  return Response.json(areas);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = coverageSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const area = await db.coverageArea.create({ data: parsed.data });
    return Response.json(area, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
