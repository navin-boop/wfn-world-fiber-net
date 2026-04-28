import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const messageSchema = z.object({
  text: z.string().min(1),
});

const statusSchema = z.object({
  status: z.string().min(1),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const conversation = await db.whatsAppConversation.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!conversation) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(conversation);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const message = await db.whatsAppMessage.create({
      data: {
        conversationId: id,
        from: 'agent',
        text: parsed.data.text,
      },
    });

    await db.whatsAppConversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return Response.json(message, { status: 201 });
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
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    const conversation = await db.whatsAppConversation.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return Response.json(conversation);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
