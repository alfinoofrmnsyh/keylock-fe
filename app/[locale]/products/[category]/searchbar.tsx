'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="w-full md:w-80">
      <input
        type="text"
        placeholder="Cari produk..."
        className="w-full px-4 py-3 rounded-xl border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <span className="text-xs text-yellow-600 ml-1">Mencari...</span>}
    </div>
  );
}