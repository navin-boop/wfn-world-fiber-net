import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const offerSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  ctaText: z.string().min(1),
  ctaLink: z.string().min(1),
  price: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional().default(true),
  placement: z.array(z.string()).optional().default(['homepage']),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const offers = await db.offer.findMany({ orderBy: { createdAt: 'desc' } });
  return Response.json(offers);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = offerSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const { placement, startDate, endDate, ...rest } = parsed.data;
    const offer = await db.offer.create({
      data: {
        ...rest,
        placement: JSON.stringify(placement),
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    return Response.json(offer, { status: 201 });
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
