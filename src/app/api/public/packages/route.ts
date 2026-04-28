import { db } from '@/lib/db';

export async function GET() {
  const packages = await db.package.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
  return Response.json(packages);
}
