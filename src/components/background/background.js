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
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactViewport = window.matchMedia('(max-width: 1000px)');
  let currentFrame = 0;
  let targetFrame = 0;
  let animationId = null;
  let lastDrawnFrame = null;
  let settleFirstFrame;
  const firstFrameReady = new Promise(resolve => { settleFirstFrame = resolve; });

  function isStatic() {
    return reducedMotion.matches || compactViewport.matches;
  }
  
  function drawFrame(index) {
    const requestedFrame = frames[Math.max(0, Math.min(frameUrls.length - 1, Math.round(index)))];
    // Keep the last available portrait while a requested frame is still loading.
    const frame = requestedFrame?.complete && requestedFrame.naturalWidth ? requestedFrame : lastDrawnFrame;
    if (!frame || !frame.complete || !frame.naturalWidth) return;
    const coverScale = Math.max(canvas.width / frame.naturalWidth, canvas.height / frame.naturalHeight);
    // Give the static compact portrait more breathing room; keep desktop cover unchanged.
    const scale = coverScale * (compactViewport.matches ? 0.85 : 1);
    const width = frame.naturalWidth * scale;
    const height = frame.naturalHeight * scale;
    if (compactViewport.matches) {
      // Repaint the exposed area so a previous, larger draw cannot remain visible.
      ctx.fillStyle = '#090909';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(frame, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    lastDrawnFrame = frame;
  }
  
  function animateBackground() {
    const difference = targetFrame - currentFrame;
    currentFrame = Math.abs(difference) < 0.01 ? targetFrame : currentFrame + difference * 0.15;
    drawFrame(currentFrame);
    animationId = currentFrame !== targetFrame ? requestAnimationFrame(animateBackground) : null;
  }
  
  function syncBackgroundScroll() {
    if (isStatic()) return;
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetFrame = Math.max(0, Math.min(1, window.scrollY / distance)) * (frameUrls.length - 1);
    if (animationId === null) animationId = requestAnimationFrame(animateBackground);
  }

  function updateBackgroundMode() {
    loadFramesForMode();
    if (isStatic()) {
      if (animationId !== null) cancelAnimationFrame(animationId);
      animationId = null;
      // Keep the opening portrait on compact viewports and with reduced motion.
      currentFrame = 0;
      targetFrame = 0;
      drawFrame(0);
    } else {
      syncBackgroundScroll();
    }
  }
  
  function resizeBackground() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Compact CSS uses a stable large viewport height so mobile browser chrome
    // does not rescale the portrait as its address bar expands or collapses.
    const bounds = compactViewport.matches ? canvas.getBoundingClientRect() : null;
    canvas.width = Math.floor((bounds?.width ?? window.innerWidth) * dpr);
    canvas.height = Math.floor((bounds?.height ?? window.innerHeight) * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawFrame(isStatic() ? 0 : currentFrame);
    syncBackgroundScroll();
  }
  
  function loadFrame(index) {
    if (frames[index]) return;
    const frame = new Image();
    frames[index] = frame;
    frame.onload = () => {
      if (isStatic()) {
        if (index === 0) drawFrame(0);
      } else if (index === 0 || index === Math.round(currentFrame)) {
        drawFrame(index);
      }
      if (index === 0) settleFirstFrame(true);
    };
    frame.onerror = () => { if (index === 0) settleFirstFrame(false); };
    frame.src = frameUrls[index];
  }

  function loadFramesForMode() {
    if (isStatic()) loadFrame(0);
    else frameUrls.forEach((_, index) => loadFrame(index));
  }

  loadFramesForMode();
  window.addEventListener('scroll', syncBackgroundScroll, { passive: true });
  window.addEventListener('resize', resizeBackground);
  new ResizeObserver(syncBackgroundScroll).observe(document.getElementById('scroll-container'));
  reducedMotion.addEventListener('change', updateBackgroundMode);
  compactViewport.addEventListener('change', updateBackgroundMode);
  resizeBackground();
  return firstFrameReady;
}
