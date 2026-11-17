export function getMediaSrc(value: string | null | undefined): string {
  const source = value?.trim();
  if (!source) return "";

  if (/^\/?(?:api\/)?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?(?:api\/)?uploads\//i, "")}`;
  }

  return source;
}
