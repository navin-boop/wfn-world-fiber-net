import { deleteSessionCookie } from '@/lib/session';

export async function DELETE() {
  await deleteSessionCookie();
  return Response.json({ success: true });
}
