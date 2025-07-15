import { useEffect, useState } from 'react';

/**
 * Quickly samples a down‑scaled copy of the image and decides
 * whether to use light or dark text for best contrast.
 *
 * @param imgSrc     The full URL (or /public path) of the background image.
 * @param threshold  0‑255 brightness cut‑off. Lower → more images count as "bright".
 * @returns          "text-black" | "text-white"
 */
export function useDynamicTextColor(
  imgSrc: string,
  threshold = 140
): 'text-black' | 'text-white' {
  const [colorClass, setColorClass] = useState<'text-black' | 'text-white'>(
    'text-white'
  );

  useEffect(() => {
    if (!imgSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // works for same‑origin assets too
    img.src = imgSrc;

    img.onload = () => {
      const sampler = document.createElement('canvas');
      const ctx = sampler.getContext('2d');
      if (!ctx) return;

      // Shrink to 10×10 px so we only read 100 pixels (fast!)
      const w = 10;
      const h = 10;
      sampler.width = w;
      sampler.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      const { data } = ctx.getImageData(0, 0, w, h);
      let total = 0;

      // data = [r,g,b,a, r,g,b,a, ...]
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // perceived luminance formula
        total += (r * 299 + g * 587 + b * 114) / 1000;
      }

      const avg = total / (data.length / 4);
      setColorClass(avg > threshold ? 'text-black' : 'text-white');
    };

    // clean up object URL if one was created (not needed for public files)
    return () => {
      img.onload = null;
    };
  }, [imgSrc, threshold]);

  return colorClass;
}
