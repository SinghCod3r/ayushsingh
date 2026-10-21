import React, { useEffect, useRef } from 'react';
import { director, DirectorState, SCENES } from '../engine/director';
import { frameStore, ShotManifest } from '../engine/frames';

export const Stage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const lastKeyRef = useRef<string>('');
  const lastStateRef = useRef<DirectorState | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Mouse movement for parallax (±14px, lerp 0.06)
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mousePos.current.targetX = ((e.clientX - cx) / cx) * 14;
      mousePos.current.targetY = ((e.clientY - cy) / cy) * 14;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Director subscription
    const unsubscribeDirector = director.subscribe((state) => {
      lastStateRef.current = state;
    });

    // FrameStore subscription to force redraw when new frames finish loading
    const unsubscribeFrames = frameStore.onProgress(() => {
      // Force key change by tracking loaded count
    });

    // Continuous render loop driven by rAF
    const renderLoop = () => {
      // Lerp mouse parallax
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      renderStage();
      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      unsubscribeDirector();
      unsubscribeFrames();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const renderStage = () => {
    const canvas = canvasRef.current;
    const state = lastStateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 820;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Ensure canvas dimensions match screen
    const displayW = Math.round(vw * dpr);
    const displayH = Math.round(vh * dpr);
    if (canvas.width !== displayW || canvas.height !== displayH) {
      canvas.width = displayW;
      canvas.height = displayH;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }

    const loadedCount = frameStore.getLoadedCount();
    const curFrame = Math.round(state.currentFrame * 100) / 100;
    const transT = state.transition ? Math.round(state.transition.t * 100) / 100 : 0;
    const pX = Math.round(mousePos.current.x * 10) / 10;
    const pY = Math.round(mousePos.current.y * 10) / 10;

    // Cache key to redraw ONLY when input changes
    const renderKey = `${curFrame}_${transT}_${loadedCount}_${vw}_${vh}_${pX}_${pY}_${state.activeScene.id}`;
    if (renderKey === lastKeyRef.current) {
      return;
    }
    lastKeyRef.current = renderKey;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, vw, vh);

    const isContact = state.activeScene.id === 'contact';
    const bladeColor = isContact ? '#ffffff' : '#ff1f1f';

    // Helper to draw a single or blended frame
    const drawShotFrame = (
      frameVal: number,
      shot: ShotManifest,
      targetScene: typeof state.activeScene,
      shiftX: number = 0,
      alphaMult: number = 1.0
    ) => {
      const box = shot.box;
      const boxWidth = box[2] - box[0];
      const boxHeight = box[3] - box[1];

      let scale = (vh * targetScene.k) / 900;
      let targetX = targetScene.x;

      if (isMobile) {
        targetX = 0.5;
        // Base mobile scale
        scale = Math.min((vh * 0.65) / 900, (vw * 0.90) / Math.max(1, boxWidth));

        // Section-specific adjustments on mobile:
        if (targetScene.id === 'hero') {
          // Hero: anchor person lower so head sits safely below the CTA buttons
          scale = Math.min((vh * 0.58) / 900, (vw * 0.82) / Math.max(1, boxWidth));
        } else if (targetScene.id === 'about') {
          // About: person slightly right, subtle opacity
          targetX = 0.53;
          alphaMult *= 0.65;
        } else if (targetScene.id === 'work') {
          // Work: person mostly background
          scale = Math.min((vh * 0.52) / 900, (vw * 0.78) / Math.max(1, boxWidth));
          alphaMult *= 0.30;
        } else if (targetScene.id === 'journey') {
          // Journey: person behind frosted panel
          alphaMult *= 0.45;
        } else if (targetScene.id === 'skills') {
          // Toolkit: person central
          targetX = 0.5;
        } else if (targetScene.id === 'awards') {
          // Awards: person background with lower opacity and scaled to clear cylinder
          alphaMult *= 0.18;
          scale = Math.min((vh * 0.52) / 900, (vw * 0.78) / Math.max(1, boxWidth));
        } else if (targetScene.id === 'contact') {
          // Contact: person central/lower
          targetX = 0.5;
          scale = Math.min((vh * 0.60) / 900, (vw * 0.84) / Math.max(1, boxWidth));
        }
      }

      if (!isMobile && shot.from === 76) {
        // Shot 2 (sitting + laptop shot) desktop composition:
        // Inside the cropped 904x830 frame, Ayush's head center is at focusX = 508.
        // We anchor the head in the right third (targetHeadX = 0.73 * vw).
        // Scale k = 0.88 keeps proportions natural.
        // minRightMargin ensures Ayush's right elbow/chair is never clipped on narrower viewports.
        scale = (vh * 0.88) / 900;
      }

      const f0 = Math.floor(frameVal);
      const f1 = f0 + 1;
      const frac = frameVal - f0;

      let destX: number;
      if (!isMobile && shot.from === 76) {
        const focusX = 508.0;
        const targetHeadX = 0.73 * vw;
        let calculatedX = targetHeadX - focusX * scale + shiftX + mousePos.current.x;
        const minRightMargin = 56;
        const shotDestW = boxWidth * scale;
        if (calculatedX + shotDestW > vw - minRightMargin) {
          calculatedX = vw - minRightMargin - shotDestW;
        }
        destX = calculatedX;
      } else {
        const offX = targetX * vw - shot.cx * 1600 * scale;
        destX = offX + box[0] * scale + shiftX + (isMobile ? 0 : mousePos.current.x);
      }
      // Ensure the bottom of the person's torso stays firmly anchored to the bottom of the viewport
      const destW = boxWidth * scale;
      const destH = boxHeight * scale;
      let baseDestY = vh - destH;
      if (isMobile && targetScene.id === 'hero') {
        // Lower anchor in hero so it leaves upper half completely clear for title and buttons
        baseDestY = vh - destH * 0.84;
      } else if (isMobile && targetScene.id === 'awards') {
        // Anchor person lower in awards so cylinder card doesn't cover neck
        baseDestY = vh - destH * 0.76;
      } else if (isMobile && targetScene.id === 'contact') {
        baseDestY = vh - destH * 0.88;
      }
      const destY = baseDestY + (isMobile ? 0 : Math.max(0, mousePos.current.y * 0.5));

      // Draw f0
      const frame0Data = frameStore.getFrame(f0);
      if (frame0Data && frame0Data.img) {
        ctx.save();
        ctx.globalAlpha = alphaMult;
        ctx.drawImage(frame0Data.img, destX, destY, destW, destH);
        ctx.restore();
      }

      // Draw f1 if fractional, same shot, and frac > 0.02
      if (frac > 0.02 && f1 <= shot.to) {
        const frame1Data = frameStore.getFrame(f1);
        if (frame1Data && frame1Data.img) {
          ctx.save();
          ctx.globalAlpha = alphaMult * frac;
          ctx.drawImage(frame1Data.img, destX, destY, destW, destH);
          ctx.restore();
        }
      }
    };

    // Check if blade transition is active
    if (state.transition && state.transition.isTransitioning) {
      const { t, fromScene, toScene, fromFrame, toFrame } = state.transition;
      const skew = 0.2 * vh;
      const e = -skew + (vw + 2 * skew) * t;

      const outgoingShot = frameStore.getShotForFrame(fromFrame);
      const incomingShot = frameStore.getShotForFrame(toFrame);

      // 1. Draw Outgoing Shot:
      // - clip to polygon to the right of the line from (e+skew, 0) to (e-skew, vh)
      // - shift: +60t px
      // - alpha: 1 - 0.35t
      if (outgoingShot) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(e + skew, 0);
        ctx.lineTo(vw, 0);
        ctx.lineTo(vw, vh);
        ctx.lineTo(e - skew, vh);
        ctx.closePath();
        ctx.clip();

        const outShift = 60 * t;
        const outAlpha = Math.max(0, 1 - 0.35 * t);
        drawShotFrame(fromFrame, outgoingShot, fromScene, outShift, outAlpha);
        ctx.restore();
      }

      // 2. Draw Incoming Shot:
      // - clip to left of same line
      // - shift: -60(1-t) px
      if (incomingShot) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(e + skew, 0);
        ctx.lineTo(e - skew, vh);
        ctx.lineTo(0, vh);
        ctx.closePath();
        ctx.clip();

        const inShift = -60 * (1 - t);
        drawShotFrame(toFrame, incomingShot, toScene, inShift, 1.0);
        ctx.restore();
      }

      // 3. Draw Blade:
      // 3px line, 24px glow, 90px gradient trail
      ctx.save();
      // Gradient trail to the left
      const grad = ctx.createLinearGradient(e + skew - 90, 0, e + skew, 0);
      if (isContact) {
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.45)');
      } else {
        grad.addColorStop(0, 'rgba(255, 31, 31, 0)');
        grad.addColorStop(1, 'rgba(255, 31, 31, 0.45)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(e + skew - 90, 0);
      ctx.lineTo(e + skew, 0);
      ctx.lineTo(e - skew, vh);
      ctx.lineTo(e - skew - 90, vh);
      ctx.closePath();
      ctx.fill();

      // Blade line with clean mobile-safe glow
      ctx.beginPath();
      ctx.moveTo(e + skew, 0);
      ctx.lineTo(e - skew, vh);
      ctx.lineWidth = isMobile ? 2 : 3;
      ctx.strokeStyle = bladeColor;
      ctx.shadowColor = bladeColor;
      ctx.shadowBlur = isMobile ? 12 : 24;
      ctx.stroke();
      ctx.restore();
    } else {
      // Normal single shot rendering
      const activeShot = frameStore.getShotForFrame(state.currentFrame);
      if (activeShot) {
        drawShotFrame(state.currentFrame, activeShot, state.activeScene);
      }
    }

    ctx.restore();
  };

  return (
    <canvas
      ref={canvasRef}
      className="stage-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        zIndex: 1, // z1 as per Layer Architecture
        pointerEvents: 'none',
      }}
    />
  );
};

