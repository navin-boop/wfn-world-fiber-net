import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const [
    totalLeads,
    newLeads,
    totalPackages,
    activeOffers,
    openTickets,
    recentLeads,
  ] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { status: 'new' } }),
    db.package.count({ where: { active: true } }),
    db.offer.count({ where: { active: true } }),
    db.supportTicket.count({ where: { status: 'open' } }),
    db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  return Response.json({
    totalLeads,
    newLeads,
    totalPackages,
    activeOffers,
    openTickets,
    recentLeads,
  });
}
