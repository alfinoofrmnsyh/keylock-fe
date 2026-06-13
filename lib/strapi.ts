const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1338';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN?.trim();

export async function fetchFromStrapi(endpoint: string, options?: { query?: string }) {
  // Solusi Karakter Ilegal: Replace manual bracket [ menjadi %5B dan ] menjadi %5D
  const queryString = options?.query 
    ? `?${options.query.replace(/\[/g, '%5B').replace(/\]/g, '%5D')}` 
    : '';
    
  const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    cache: 'no-store', 
  });

  if (!res.ok) {
    console.error(`Gagal mengambil data dari Strapi pada endpoint: ${endpoint}. Status: ${res.status}`);
    return null;
  }

  return res.json();
}

export async function getHomepageData(locale: string) {
  const queryString =
    `locale=${locale}` +
    // 1. Hero Section
    `&populate[hero_section][populate][solutions][populate]=*` +
    // 2. About Section
    `&populate[about_section][populate][bullet_points]=*` +
    `&populate[about_section][populate][stats]=*` +
    // 3. Service Section
    `&populate[service_section][populate][services][populate][features]=*` +
    // 4. Advantages Section
    `&populate[advantages_section][populate][advantages]=*`+
    // //5. Product Section
     `&populate[products_section][populate][categories][populate]=*` +
    //6. Workflow Section
    `&populate[workflow_section][populate][steps]=*` +
    // 7. Testimonials Section
    `&populate[testimonials_section][populate][testimonials]=*` +
    // 8. Coverage Section
    `&populate[coverage_section][populate][cities]=*`+
    //9.FAQ Section
    `&populate[faq_section][populate][faqs]=*`+
    //10. CTA Section
    `&populate[cta_section][populate]=*`+
    //11. Footer Section
    `&populate[footer_section][populate]=*`;

  try {
    const response = await fetchFromStrapi("homepage", {
      query: queryString,
    });
    return response?.data || null;
  } catch (error) {
    console.error("Error fetching homepage data from Strapi:", error);
    return null;
  }
}