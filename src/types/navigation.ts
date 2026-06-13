export interface NavItem {
  title: string
  href: string
  items?: Array<{
    title: string
    href: string
    slug: string
  }>
}