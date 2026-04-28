import { db } from '@/lib/db';

export async function GET() {
  const popup = await db.popupOffer.findFirst({ where: { active: true } });
  return Response.json(popup ?? null);
}
