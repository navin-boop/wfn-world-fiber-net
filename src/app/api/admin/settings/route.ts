import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const settingEntrySchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

const settingsSchema = z.array(settingEntrySchema);

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await db.siteSetting.findMany();
  const result: Record<string, string> = {};
  for (const s of settings) {
    result[s.key] = s.value;
  }
  return Response.json(result);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input', details: parsed.error.issues }, { status: 400 });
    }

    await Promise.all(
      parsed.data.map((entry) =>
        db.siteSetting.upsert({
          where: { key: entry.key },
          create: { key: entry.key, value: entry.value },
          update: { value: entry.value },
        })
      )
    );

    const updated = await db.siteSetting.findMany();
    const result: Record<string, string> = {};
    for (const s of updated) {
      result[s.key] = s.value;
    }
    return Response.json(result);
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
