"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchApiJson, getLocalizedField, resolveImageUrl } from "@/lib/api";

export interface CategoryProduct {
  id?: number | string;
  slug: string;
  title?: unknown;
  desc?: unknown;
  image_url?: string | null;
  category_slug?: string;
}

interface CategoryProductsClientProps {
  locale: string;
  category: string;
  initialProducts: CategoryProduct[] | null;
  initialCurrentPage?: number;
  initialLastPage?: number;
  initialSearch?: string;
  initialPage?: string;
}

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

export function CategoryProductsClient({
  locale,
  category,
  initialProducts,
  initialCurrentPage = 1,
  initialLastPage = 1,
  initialSearch = "",
  initialPage = "1",
}: CategoryProductsClientProps) {
  const searchParams = useSearchParams();
  const activeSearch = (searchParams.get("search") ?? initialSearch).trim();
  const activePage = searchParams.get("page") ?? initialPage;

  const [products, setProducts] = useState<CategoryProduct[]>(initialProducts ?? []);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);
  const [lastPage, setLastPage] = useState<number>(initialLastPage);
  const [loading, setLoading] = useState<boolean>(initialProducts === null);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  useEffect(() => {
    if (initialProducts !== null && reloadNonce === 0) {
      return;
    }

    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setFetchError(false);

      const query = new URLSearchParams({
        category,
        locale,
        search: activeSearch,
        page: activePage,
      }).toString();

      const res = await fetchApiJson<ProductsApiResponse>(`/api/products?${query}`, {
        timeoutMs: 10000,
      });

      if (cancelled) return;

      if (res.ok && res.data) {
        const list = Array.isArray(res.data) ? res.data : res.data.data || [];
        setProducts(list);
        setCurrentPage(res.data.current_page || res.data.meta?.current_page || 1);
        setLastPage(res.data.last_page || res.data.meta?.last_page || 1);
      } else {
        console.error("[CategoryProductsClient] Failed to load products:", res.error);
        setFetchError(true);
      }
      setLoading(false);
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [category, locale, activeSearch, activePage, initialProducts, reloadNonce]);

  const filteredProducts = useMemo(() => {
    if (!activeSearch) return products;
    const q = activeSearch.toLowerCase();
    return products.filter((p) => {
      const title = getLocalizedField(p.title, locale).toLowerCase();
      const desc = getLocalizedField(p.desc, locale).replace(/<[^>]*>?/gm, "").toLowerCase();
      const slug = (p.slug || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || slug.includes(q);
    });
  }, [products, activeSearch, locale]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] w-full bg-slate-200" />
            <div className="p-3 sm:p-6 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
              <div className="h-9 bg-slate-200 rounded-xl mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (fetchError && products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-600 mb-4">
          {locale === "en"
            ? "Unable to load products right now. Please try again."
            : locale === "zh-Hans"
            ? "暂时无法加载产品数据，请重试。"
            : "Gagal memuat daftar produk. Silakan coba lagi."}
        </p>
        <button
          type="button"
          onClick={() => setReloadNonce((n) => n + 1)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          {locale === "en" ? "Retry" : locale === "zh-Hans" ? "重试" : "Muat Ulang"}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Grid Produk: 2 Kolom di Mobile, 2 Kolom di Tablet, 4 Kolom di Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, index) => {
            const title = getLocalizedField(p.title, locale) || p.slug;
            const rawDesc = getLocalizedField(p.desc, locale);
            const plainDesc = rawDesc.replace(/<[^>]*>?/gm, "").trim();
            const cleanDesc =
              plainDesc.length > 80
                ? `${plainDesc.substring(0, 80)}...`
                : plainDesc ||
                  (locale === "en"
                    ? "High quality industrial equipment."
                    : locale === "zh-Hans"
                    ? "高品质工业设备。"
                    : "Peralatan industri berkualitas tinggi.");
            const imageUrl = resolveImageUrl(p.image_url, "/images/product_placeholder.png");

            return (
              <Link
                key={p.id ?? p.slug ?? index}
                href={`/${locale}/products/${category}/${p.slug}`}
                className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 line-clamp-1">
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 flex-grow line-clamp-2">
                    {cleanDesc}
                  </p>
                  <span className="w-full text-center py-2 sm:py-3 bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl group-hover:bg-amber-600 transition-colors">
                    {locale === "en" ? "View Details" : locale === "zh-Hans" ? "详情" : "Lihat Detail"}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="col-span-full text-center text-slate-500 py-12">
            {locale === "en"
              ? "No products found."
              : locale === "zh-Hans"
              ? "未找到相关产品。"
              : "Produk tidak ditemukan."}
          </p>
        )}
      </div>

      {/* Komponen Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-12">
          {currentPage > 1 && (
            <Link
              href={`/${locale}/products/${category}?search=${encodeURIComponent(activeSearch)}&page=${currentPage - 1}`}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shadow-sm"
            >
              {locale === "en" ? "Previous" : locale === "zh-Hans" ? "上一页" : "Sebelumnya"}
            </Link>
          )}

          <span className="text-xs sm:text-sm text-slate-600 font-medium px-2">
            {locale === "en"
              ? `Page ${currentPage} of ${lastPage}`
              : locale === "zh-Hans"
              ? `第 ${currentPage} 页，共 ${lastPage} 页`
              : `Hal ${currentPage} dari ${lastPage}`}
          </span>

          {currentPage < lastPage && (
            <Link
              href={`/${locale}/products/${category}?search=${encodeURIComponent(activeSearch)}&page=${currentPage + 1}`}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shadow-sm"
            >
              {locale === "en" ? "Next" : locale === "zh-Hans" ? "下一页" : "Selanjutnya"}
            </Link>
          )}
        </div>
      )}
    </>
  );
}

