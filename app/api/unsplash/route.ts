import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'nature';
  const per_page = searchParams.get('per_page') || '20';
  const key = process.env.UNSPLASH_SECRET || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!key) return NextResponse.json({ error: 'Missing Unsplash key' }, { status: 500 });

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${per_page}`;
  try {
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
