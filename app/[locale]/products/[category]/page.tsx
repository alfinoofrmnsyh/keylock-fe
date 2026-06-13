import Link from "next/link";
import Image from "next/image";

async function getProductsByCategory(category: string, locale: string) {
  const strapiLocale = locale === "zh-Hans" ? "zh-Hans" : locale === "en" ? "en" : "id";
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${strapiBaseUrl}/api/products?filters[category_slug][$eq]=${category}&locale=${strapiLocale}&populate=*`;
  
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string, category: string }> }) {
  const { locale, category } = await params;
  const products = await getProductsByCategory(category, locale);

  return (
    // Background utama abu-abu muda yang konsisten
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Kategori */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 capitalize mb-2">
            {category.replace(/-/g, " ")}
          </h1>
          <div className="h-1.5 w-20 bg-amber-500 rounded-full"></div>
        </div>

        {/* Grid Kartu Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p: any) => {
            const imgUrl = p.image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.image.url}` : "/placeholder.png";
            // Ambil cuplikan teks dari blok desc
            const shortDesc = p.desc?.[0]?.children?.[0]?.text || "Klik untuk melihat spesifikasi lengkap.";

            return (
              <Link 
                key={p.documentId} 
                href={`/${locale}/products/${category}/${p.slug}`} 
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gambar dengan ukuran tetap dan rapi */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image 
                    src={imgUrl} 
                    alt={p.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                {/* Konten Card */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {p.title}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-grow">
                    {shortDesc}
                  </p>
                  
                  {/* Tombol Aksi */}
                  <div className="mt-auto">
                    <span className="inline-block w-full text-center py-3 px-4 bg-slate-900 text-white text-sm font-bold rounded-xl group-hover:bg-amber-600 transition-colors">
                      {locale === "en" ? "View Details" : locale === "zh-Hans" ? "查看详情" : "Lihat Detail"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}