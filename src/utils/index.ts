export function toQueryString(params: Record<string, any>): string {
  if (!params) return '';
  return Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        encodeURIComponent(k) +
        '=' +
        encodeURIComponent(
          typeof v === 'object' ? JSON.stringify(v) : String(v)
        )
    )
    .join('&');
}

export function isTimeActive({validFrom, validTill}: { validFrom?: Date; validTill?: Date }) {
  if (!validFrom || !validTill) return false;
  const now = new Date();
  const from = new Date(validFrom);
  const till = new Date(validTill);
  return now >= from && now <= till;
}