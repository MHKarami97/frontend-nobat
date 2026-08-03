interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0..1
  mimeType?: 'image/jpeg' | 'image/webp';
}

const DEFAULTS: Required<CompressOptions> = {
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 0.8,
  mimeType: 'image/jpeg',
};

export async function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const opts = { ...DEFAULTS, ...options };

  if (!file.type.startsWith('image/')) {
    throw new Error('فقط فایل تصویری قابل آپلود است');
  }

  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  const ratio = Math.min(opts.maxWidth / width, opts.maxHeight / height, 1);
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('امکان پردازش تصویر وجود ندارد');

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('خطا در فشرده‌سازی تصویر'))),
      opts.mimeType,
      opts.quality
    );
  });

  const ext = opts.mimeType === 'image/webp' ? 'webp' : 'jpg';
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  return new File([blob], `${baseName}.${ext}`, { type: opts.mimeType });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}