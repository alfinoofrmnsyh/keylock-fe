import Link from "next/link";
import SearchBar from "./searchbar"; // Sesuaikan path import-nya

async function getProductsByCategory(category: string, locale: string, query: string) {
  const laravelBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  // Menambahkan query ke parameter API
  const url = `${laravelBaseUrl}/api/products?category=${category}&locale=${locale}&search=${query}`;
  
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();
  return json.data || []; 
}

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: string, category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>; 
}) {
  const { locale, category } = await params;
  const { search } = await searchParams; // Mengambil query dari URL
  
  // Panggil data dengan menyertakan query pencarian
  const products = await getProductsByCategory(category, locale, search || "");

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-slate-900 capitalize mb-6">
          {category.replace(/-/g, " ")}
        </h1>

        {/* Panggil Search Bar di sini */}
        <SearchBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p: any) => {
            const title = p.title[locale] || p.title['id'];
            const desc = p.desc[locale] || p.desc['id'];
            const cleanDesc = desc.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

            return (
              <Link key={p.id} href={`/${locale}/products/${category}/${p.slug}`} className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img src={p.image_url} alt={title} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">{title}</h2>
                  <p className="text-sm text-slate-500 mb-6 flex-grow">{cleanDesc}</p>
                  <span className="w-full text-center py-3 bg-slate-900 text-white text-sm font-bold rounded-xl group-hover:bg-amber-600 transition-colors">
                    {locale === "en" ? "View Details" : locale === "zh-Hans" ? "详情" : "Lihat Detail"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}