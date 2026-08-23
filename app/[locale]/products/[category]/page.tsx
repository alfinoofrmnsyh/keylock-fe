import Link from "next/link";
import SearchBar from "./searchbar"; 

async function getProductsByCategory(category: string, locale: string, query: string, page: string) {
  const laravelBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${laravelBaseUrl}/api/products?category=${category}&locale=${locale}&search=${query}&page=${page}`;
  
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();
  
  return {
    products: json.data || [],
    meta: json.meta || { current_page: 1, last_page: 1 }
  }; 
}

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: string, category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>; 
}) {
  const { locale, category } = await params;
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const page = resolvedSearchParams.page || "1";
  
  const { products, meta } = await getProductsByCategory(category, locale, search, page);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Container Flex: Judul Kiri, SearchBar Kanan */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h1 className="text-4xl font-extrabold text-slate-900 capitalize">
                {category.replace(/-/g, " ")}
            </h1>
            
            <SearchBar />
        </div>

        {/* Grid Produk: 2 kolom di mobile, 4 kolom di desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.length > 0 ? (
            products.map((p: any) => {
                const title = p.title[locale] || p.title['id'];
                const desc = p.desc[locale] || p.desc['id'];
                const cleanDesc = desc.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

                return (
                <Link key={p.id} href={`/${locale}/products/${category}/${p.slug}`} className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img src={p.image_url} alt={title} className="object-cover w-full h-full" />
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-2 line-clamp-1">{title}</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6 flex-grow line-clamp-2">{cleanDesc}</p>
                    <span className="w-full text-center py-2 sm:py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl group-hover:bg-amber-600 transition-colors">
                        {locale === "en" ? "View Details" : locale === "zh-Hans" ? "详情" : "Lihat Detail"}
                    </span>
                    </div>
                </Link>
                );
            })
          ) : (
            <p className="col-span-full text-center text-slate-500">Produk tidak ditemukan.</p>
          )}
        </div>

        {/* Tombol Paging / Navigasi Halaman */}
        {meta.last_page > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Tombol Sebelumnya */}
            {meta.current_page > 1 ? (
              <Link
                href={`/${locale}/products/${category}?search=${search}&page=${meta.current_page - 1}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                {locale === "en" ? "Previous" : locale === "zh-Hans" ? "上一页" : "Sebelumnya"}
              </Link>
            ) : (
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-400 cursor-not-allowed">
                {locale === "en" ? "Previous" : locale === "zh-Hans" ? "上一页" : "Sebelumnya"}
              </span>
            )}

            <span className="px-4 py-2 text-sm font-medium text-slate-600">
              {meta.current_page} / {meta.last_page}
            </span>

            {/* Tombol Selanjutnya */}
            {meta.current_page < meta.last_page ? (
              <Link
                href={`/${locale}/products/${category}?search=${search}&page=${meta.current_page + 1}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                {locale === "en" ? "Next" : locale === "zh-Hans" ? "下一页" : "Selanjutnya"}
              </Link>
            ) : (
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-400 cursor-not-allowed">
                {locale === "en" ? "Next" : locale === "zh-Hans" ? "下一页" : "Selanjutnya"}
              </span>
            )}
          </div>
        )}

      </div>
    </main>
  );
}