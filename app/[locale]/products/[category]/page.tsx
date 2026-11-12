import { Suspense } from "react";
import SearchBar from "./searchbar";
import { fetchApiJson } from "@/lib/api";
import { CategoryProductsClient, type CategoryProduct } from "./category-products-client";

interface ProductsApiResponse {
  status?: string;
  data?: CategoryProduct[];
  current_page?: number;
  last_page?: number;
  meta?: {
    current_page?: number;
    last_page?: number;
  };
}

async function getProductsByCategory(category: string, locale: string, query: string, page: string) {
  const qs = new URLSearchParams({
    category,
    locale,
    search: query,
    page,
  }).toString();

  const res = await fetchApiJson<ProductsApiResponse>(`/api/products?${qs}`, {
    timeoutMs: 3500,
  });

  if (!res.ok || !res.data) {
    console.error(`[CategoryPage] Server fetch failed for category="${category}", locale="${locale}":`, res.error);
    return {
      products: null as CategoryProduct[] | null,
      currentPage: 1,
      lastPage: 1,
    };
  }

  const list = Array.isArray(res.data) ? res.data : res.data.data || [];
  return {
    products: list,
    currentPage: res.data.current_page || res.data.meta?.current_page || 1,
    lastPage: res.data.last_page || res.data.meta?.last_page || 1,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { locale, category } = await params;
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const page = resolvedSearchParams.page || "1";

  const { products, currentPage, lastPage } = await getProductsByCategory(category, locale, search, page);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Container Flex: Judul Kiri, SearchBar Kanan */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 capitalize">
            {decodeURIComponent(category).replace(/-/g, " ")}
          </h1>

          <Suspense fallback={<div className="w-full md:w-80 h-12 rounded-xl bg-white border-2 border-yellow-500 animate-pulse" />}>
            <SearchBar />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <CategoryProductsClient
            locale={locale}
            category={category}
            initialProducts={products}
            initialCurrentPage={currentPage}
            initialLastPage={lastPage}
            initialSearch={search}
            initialPage={page}
          />
        </Suspense>
      </div>
    </main>
  );
}
