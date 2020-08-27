import DOMPurify from 'dompurify';

export function purify(dirty) {
  return DOMPurify.sanitize(dirty, {SAFE_FOR_JQUERY: true});
}

