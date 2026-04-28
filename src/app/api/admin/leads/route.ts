import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (type) where.type = type;

  const [leads, total] = await Promise.all([
    db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.lead.count({ where }),
  ]);

  return Response.json({ leads, total, page, limit });
}
