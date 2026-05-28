/**
 * Feature flags — flip to true once the corresponding asset lands in /public.
 * Keeping these off during initial build prevents 404s/crashes from missing assets.
 */
export const FEATURES = {
  hero_3d: false, //  public/models/evidence-pro.glb
  hero_video_fallback: false, // public/video/evidence-pro-turntable.mp4
  teardown_3d: false, // public/models/evidence-pro.glb (same asset, animated)
  teardown_webp: false, // public/frames/teardown/01-08.webp
  manufactory_images: false, // public/img/manufactory/*.webp
  timeline_images: false, // public/img/timeline/*.webp
  lineas_images: false, // public/img/lineas/*.webp
} as const;
