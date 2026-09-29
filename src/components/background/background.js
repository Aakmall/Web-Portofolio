export function initBackground() {
  // Original 300-frame background, scrubbed by page scroll.
  // Vite includes these existing source images in the production build as well.
  // Standard URLs work in Live Server; Vite also bundles these frame assets.
  const frameUrls = Array.from({ length: 300 }, (_, index) => {
    const number = String(index + 1).padStart(3, '0');
    return new URL(`../../assets/background/frames/ezgif-frame-${number}.jpg`, import.meta.url).href;
  });
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const frames = [];
  let currentFrame = 0;
  let targetFrame = 0;
  let animationId = null;
  
  function drawFrame(index) {
    const frame = frames[Math.max(0, Math.min(frameUrls.length - 1, Math.round(index)))];
    if (!frame || !frame.complete || !frame.naturalWidth) return;
    const scale = Math.max(canvas.width / frame.naturalWidth, canvas.height / frame.naturalHeight);
    const width = frame.naturalWidth * scale;
    const height = frame.naturalHeight * scale;
    ctx.drawImage(frame, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }
  
  function animateBackground() {
    const difference = targetFrame - currentFrame;
    currentFrame = Math.abs(difference) < 0.01 ? targetFrame : currentFrame + difference * 0.15;
    drawFrame(currentFrame);
    animationId = currentFrame !== targetFrame ? requestAnimationFrame(animateBackground) : null;
  }
  
  function syncBackgroundScroll() {
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetFrame = Math.max(0, Math.min(1, window.scrollY / distance)) * (frameUrls.length - 1);
    if (animationId === null) animationId = requestAnimationFrame(animateBackground);
  }
  
  function resizeBackground() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawFrame(currentFrame);
    syncBackgroundScroll();
  }
  
  frameUrls.forEach((url, index) => {
    const frame = new Image();
    frames[index] = frame;
    frame.onload = () => {
      if (index === 0 || index === Math.round(currentFrame)) drawFrame(index);
    };
    frame.src = url;
  });
  window.addEventListener('scroll', syncBackgroundScroll, { passive: true });
  window.addEventListener('resize', resizeBackground);
  new ResizeObserver(syncBackgroundScroll).observe(document.getElementById('scroll-container'));
  resizeBackground();
}
