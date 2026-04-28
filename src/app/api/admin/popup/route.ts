import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const popupUpdateSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  delay: z.number().int().optional(),
  frequency: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const popup = await db.popupOffer.findFirst();
  return Response.json(popup);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = popupUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const existing = await db.popupOffer.findFirst();
    let popup;
    if (existing) {
      popup = await db.popupOffer.update({
        where: { id: existing.id },
        data: parsed.data,
      });
    } else {
      popup = await db.popupOffer.create({ data: parsed.data });
    }

    return Response.json(popup);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
