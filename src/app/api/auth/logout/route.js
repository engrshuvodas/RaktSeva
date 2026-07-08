import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    
    // Delete the token cookie
    response.cookies.delete('token');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Support GET request for easy logging out via direct link if needed
export async function GET() {
  return POST();
}
