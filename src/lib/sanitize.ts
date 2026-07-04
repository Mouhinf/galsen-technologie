import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'img', 'span', 'div', 'pre', 'code', 'blockquote', 'hr',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'figure', 'figcaption', 'video', 'source',
];

const ALLOWED_ATTR = [
  'href', 'target', 'rel', 'src', 'alt', 'class', 'id',
  'width', 'height', 'style', 'loading', 'decoding',
  'controls', 'autoplay', 'loop', 'muted', 'poster',
  'type', 'srcset', 'sizes',
];

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  try {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
  } catch {
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
}
