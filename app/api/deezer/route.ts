import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artistName = searchParams.get('q');

  if (!artistName) {
    return NextResponse.json({ error: 'Artist name is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.error || 'Failed to fetch artist data' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
