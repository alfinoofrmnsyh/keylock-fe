// --- ABOUT SECTION TYPES ---
export interface AboutBulletPoint {
  id: number;
  text: string;
}

export interface AboutStatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  icon_name: string;
}

export interface AboutSectionData {
  badge: string;
  title: string;
  description: string;
  bullet_points: AboutBulletPoint[];
  stats: AboutStatItem[];
}

// --- SERVICES SECTION TYPES ---
export interface ServiceFeatureItem {
  id: number;
  name: string;
}

export interface ServiceCardItem {
  id: number;
  icon_name: string;
  title: string;
  desc: string;
  features: ServiceFeatureItem[];
}

export interface ServicesSectionData {
  badge: string;
  title: string;
  subtitle: string;
  services: ServiceCardItem[];
}

// --- ADVANTAGES (WHY CHOOSE US) SECTION TYPES ---
export interface AdvantageCardItem {
  id: number;
  icon_name: string;
  title: string;
  desc: string;
}

export interface AdvantagesSectionData {
  badge: string;
  title: string;
  subtitle: string;
  advantages: AdvantageCardItem[];
}

// --- PRODUCTS SECTION TYPES ---
export interface ProductCardItem {
  id: number;
  name: string;
  tag: string;
  desc?: string;        
  description?: string; 
  image?: any; 
}

export interface ProductsSectionData {
  badge: string;
  title: string;
  description: string;  
  products: ProductCardItem[];
}

// --- WORKFLOW (PROCESS) SECTION TYPES ---
export interface WorkflowStepItem {
  id: number;
  icon?: string;       
  title: string;
  description: string;  
}

export interface WorkflowSectionData {
  badge: string;
  title: string;
  description: string;  
  steps: WorkflowStepItem[];
}
// --- TESTIMONIALS SECTION TYPES ---
export interface TestimonialItem {
  id: number;
  name: string;
  role_company: string;
  rating: number;
  quote: string;
}

export interface TestimonialsSectionData {
  badge?: string;
  title: string;
  description?: string; 
  testimonials: TestimonialItem[];
}
// --- COVERAGE SECTION TYPES ---
export interface CityItem {
  id: number;
  name: string;
  lng: string | number;
  lat: string | number;
}

export interface CoverageSectionData {
  badge?: string;
  title: string;
  description: string;
  cities: CityItem[];
}

// --- FAQ SECTION TYPES ---
export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  badge?: string;
  title: string;
  description: string;
  faqs: FaqItem[];
}

// --- FINAL CTA SECTION TYPES ---
export interface FinalCtaSectionData {
  title: string;
  description: string;
  primary_btn_text?: string;
  primary_btn_url?: string;
  whatsapp_number?: string;
}

export interface FooterLinkItem {
  id: number;
  label: string;
  url: string;
}

export interface FooterColumnItem {
  id: number;
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSectionData {
  description: string;
  address: string;
  phone: string;
  email: string;
  whatsapp_number?: string;
  whatsapp_label?: string;
  google_maps_url?: string;
  copyright_text?: string;
  keywords_text?: string;
  columns?: FooterColumnItem[];
}