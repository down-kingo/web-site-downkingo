const tagTranslations: Record<string, string> = {
  ai: 'ia',
  announcement: 'anúncio',
  comparison: 'comparativo',
  conversion: 'conversão',
  formats: 'formatos',
  guide: 'guia',
  transcription: 'transcrição',
  'video-download': 'download-video',
};

const reverseTagTranslations = Object.fromEntries(
  Object.entries(tagTranslations).map(([en, pt]) => [pt, en]),
) as Record<string, string>;

export function localizeBlogTag(tag: string, language: 'en' | 'pt'): string {
  return language === 'pt'
    ? (tagTranslations[tag] ?? tag)
    : (reverseTagTranslations[tag] ?? tag);
}
