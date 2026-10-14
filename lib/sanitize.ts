import sanitizeHtmlLib from 'sanitize-html'

/**
 * Sanitizes untrusted HTML string to prevent XSS (OWASP A03:2021).
 * Server-safe: pure HTML parser without JSDOM or browser dependencies.
 */
export function sanitizeHtml(dirty?: string | null): string {
  if (!dirty) return ''
  return sanitizeHtmlLib(dirty, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span']),
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      '*': ['class', 'id', 'style'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    },
  })
}
