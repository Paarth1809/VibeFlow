'use client';
import { useState } from 'react';
import { searchUnsplash } from '@/utils/apiClients';

export default function Home() {
  const [q, setQ] = useState('lofi');
  const [res, setRes] = useState<any>(null);
  const run = async () => {
    const r = await searchUnsplash(q);
    setRes(r);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Serverless API test</h1>
      <div className="mt-4">
        <input className="p-2 border mr-2" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button className="px-3 py-2 bg-white text-black" onClick={run}>Search</button>
      </div>
      <pre className="mt-6 text-sm">{res ? JSON.stringify(res.results?.slice(0,3), null, 2) : 'No results yet'}</pre>
    </div>
  );
}
