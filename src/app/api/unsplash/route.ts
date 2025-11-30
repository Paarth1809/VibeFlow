import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'nature';
  const key = process.env.UNSPLASH_SECRET || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!key) return NextResponse.json({ error: 'No API key set' }, { status: 500 });

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=12`;
  try {
    const r = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
    const data = await r.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
