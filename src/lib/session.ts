import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? 'wfn-dev-secret-change-in-production-32chars'
);

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(key);
  return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get('admin_session')?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await createSession(payload);
  const jar = await cookies();
  jar.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function deleteSessionCookie() {
  const jar = await cookies();
  jar.delete('admin_session');
}
