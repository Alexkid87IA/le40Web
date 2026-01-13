/**
 * HTML Sanitization utility using DOMPurify
 * Prevents XSS attacks from untrusted HTML content (e.g., Shopify descriptions)
 */
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - The raw HTML string to sanitize
 * @returns Sanitized HTML string safe for dangerouslySetInnerHTML
 */
export function sanitizeHtml(html: string | undefined | null): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li', 'a', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Extract plain text from HTML (removes all tags)
 * Safe alternative to innerHTML for text extraction
 * @param html - The raw HTML string
 * @returns Plain text content
 */
export function extractTextFromHtml(html: string | undefined | null): string {
  if (!html) return '';
  // Use DOMPurify to strip all HTML, leaving only text
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

/**
 * Extract list items from HTML as plain text array
 * @param html - The raw HTML string containing list items
 * @param limit - Maximum number of items to return
 * @returns Array of plain text strings
 */
export function extractListItems(html: string | undefined | null, limit: number = 10): string[] {
  if (!html) return [];

  // Sanitize first, then parse
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });

  // Use DOMParser for safe parsing
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitized, 'text/html');
  const listItems = doc.querySelectorAll('li');

  return Array.from(listItems)
    .map(li => li.textContent?.trim() || '')
    .filter(text => text.length > 0)
    .slice(0, limit);
}
