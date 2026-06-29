const MAX_EDGE = 1024; // cap longest edge — keeps uploads + AI cost small at scale
const QUALITY = 0.82;

export type Capture = { blob: Blob; dataUrl: string; width: number; height: number };

/**
 * Grab the current video frame, downscale it, and encode as JPEG.
 *
 * Downscaling on the client is important for thousands of users: it cuts the
 * bytes we upload to Storage and send to the vision API by an order of
 * magnitude versus a raw 4K phone frame, without hurting recognition.
 */
export async function captureFrame(video: HTMLVideoElement): Promise<Capture> {
  const sw = video.videoWidth;
  const sh = video.videoHeight;
  if (!sw || !sh) throw new Error("camera-not-ready");

  const scale = Math.min(1, MAX_EDGE / Math.max(sw, sh));
  const width = Math.round(sw * scale);
  const height = Math.round(sh * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-unsupported");
  ctx.drawImage(video, 0, 0, width, height);

  const blob = await toBlob(canvas);
  const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
  return { blob, dataUrl, width, height };
}

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("encode-failed"))),
      "image/jpeg",
      QUALITY,
    );
  });
}

/** Convert a Blob to a base64 data URL (used to POST the image to our API). */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("read-failed"));
    reader.readAsDataURL(blob);
  });
}
