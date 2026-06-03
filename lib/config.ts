/**
 * Feature flags — flip to true once the corresponding asset lands in /public.
 * Keeping these off during initial build prevents 404s/crashes from missing assets.
 */
export const FEATURES = {
  hero_3d: false, //  public/models/evidence-pro.glb
  hero_video_fallback: true, // public/video/evidence-pro-turntable.mp4
  teardown_3d: false, // public/models/evidence-pro.glb (same asset, animated)
  teardown_webp: false, // public/frames/teardown/01-08.webp
  teardown_video: true, // public/video/evidence-pro-teardown.mp4 (scroll-scrubbed) ✓ live
  manufactory_images: true, // public/img/manufactory/*.webp
  timeline_images: true, // public/img/timeline/*.webp ✓ live
  lineas_images: true, // public/img/lineas/*.webp
} as const;
