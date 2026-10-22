import type { Locale } from '../types/portfolio';
import { en } from './en';
import { es } from './es';

export function getDictionary(locale: Locale) {
  return locale === 'es' ? es : en;
}

export function localePath(locale: Locale) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return locale === 'es' ? `${base}/es/` : `${base}/`;
}
