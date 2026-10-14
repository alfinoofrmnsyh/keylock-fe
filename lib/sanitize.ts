import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes untrusted HTML string to prevent XSS (OWASP A03:2021).
 * Standardizes safe tags and attributes without duplicate logic across components.
 */
export function sanitizeHtml(dirty?: string | null): string {
  if (!dirty) return ''
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel'],
  })
}
