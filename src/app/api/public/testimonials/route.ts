import { db } from '@/lib/db';

export async function GET() {
  const testimonials = await db.testimonial.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
  return Response.json(testimonials);
}
