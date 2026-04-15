import axios from 'axios';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');
const ensureLeadingSlash = (value = '') => value.startsWith('/') ? value : `/${value}`;

export const API_BASE_URL = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL ?? '');
export const IMAGE_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_IMAGE_BASE_URL ?? API_BASE_URL
);

export const api = axios.create({
  baseURL: API_BASE_URL || undefined
});

export function getImageUrl(path = '') {
  if (!path) {
    return path;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = ensureLeadingSlash(path);
  return IMAGE_BASE_URL ? `${IMAGE_BASE_URL}${normalizedPath}` : normalizedPath;
}
