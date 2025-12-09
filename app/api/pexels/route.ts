import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'aesthetic';
  const per_page = searchParams.get('per_page') || '20';
  const key = process.env.NEXT_PUBLIC_PEXELS_KEY;
  if (!key) return NextResponse.json({ error: 'Missing Pexels key' }, { status: 500 });

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${per_page}`;
  try {
    const res = await fetch(url, { headers: { Authorization: key } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
