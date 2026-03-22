import type { ImageLoader } from "next/image";

/**
 * Custom Next.js image loader for Cloudinary.
 *
 * Usage in next.config.ts:
 *   images: { loader: 'custom', loaderFile: './src/lib/cloudinary.ts' }
 *
 * Then in your components:
 *   <Image src="property/skyline-penthouse" width={800} height={600} alt="..." />
 *   // src is the Cloudinary public_id (without the cloud name prefix)
 */
const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    // Fallback to src if Cloudinary is not configured
    return src;
  }

  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(",")}/${src}`;
};

export default cloudinaryLoader;
