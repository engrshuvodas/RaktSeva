import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkeyforraktseva123!';

async function verifyJwtEdge(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode payload
    const payloadStr = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    // Convert signature from base64url to ArrayBuffer
    const sigStr = atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
    if (!isValid) return null;

    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths requiring authentication
  const isDonorPath = pathname.startsWith('/donor');
  const isRequesterPath = pathname.startsWith('/requester');
  const isAdminPath = pathname.startsWith('/admin');
  const isSuperAdminPath = pathname.startsWith('/super-admin');

  if (isDonorPath || isRequesterPath || isAdminPath || isSuperAdminPath) {
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : null;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyJwtEdge(token, JWT_SECRET);
    if (!payload) {
      // Clear token and redirect if invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    const { role } = payload;

    // Enforce role-based access
    if (isDonorPath && role !== 'donor') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isRequesterPath && role !== 'requester') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isAdminPath && role !== 'admin' && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    if (isSuperAdminPath && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    '/donor/:path*',
    '/requester/:path*',
    '/admin/:path*',
    '/super-admin/:path*',
  ],
};
