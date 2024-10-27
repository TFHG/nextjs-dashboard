'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Search({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(term) {
    // Create a new URLSearchParams instance based on the current search params.
    const params = new URLSearchParams(searchParams);

    // Reset the page to 1 for any new search.
    params.set('page', '1');

    // Set the 'query' parameter if a term is provided; otherwise, remove it.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Use replace to navigate to the updated URL with the new search term.
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
