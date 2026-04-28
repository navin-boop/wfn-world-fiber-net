import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const leadUpdateSchema = z.object({
  status: z.string().optional(),
  assignee: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(lead);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = leadUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const lead = await db.lead.update({ where: { id }, data: parsed.data });
    return Response.json(lead);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
