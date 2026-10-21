import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { director } from '../engine/director';
import { PORTFOLIO_DATA, ToolkitSkillItem } from '../data';

const SKILL_ITEMS: ToolkitSkillItem[] = PORTFOLIO_DATA.toolkit.skillItems;

// Global singleton controller for SkillOrbit so Back & Front layers share state with 0 React re-renders
class SkillOrbitEngine {
  backRingRef: SVGSVGElement | null = null;
  frontRingRef: SVGSVGElement | null = null;
  connectionSvgRef: SVGSVGElement | null = null;
  connectionLineRef: SVGLineElement | null = null;
  connectionDotRef: SVGCircleElement | null = null;
  hubRef: HTMLDivElement | null = null;
  hubLabelRef: HTMLSpanElement | null = null;

  backNodeRefs: Array<HTMLDivElement | null> = [];
  frontNodeRefs: Array<HTMLDivElement | null> = [];

  categoryIndicatorCallback: ((stage: { num: string; label: string; tagline: string; activeSkill: string }) => void) | null = null;

  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private hoveredSkillId: string | null = null;
  private isSubscribed = false;
  private lastStageNum = '';

  init() {
    if (this.isSubscribed) return;
    this.isSubscribed = true;

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    }

    gsap.ticker.add(this.onTick);
  }

  destroy() {
    if (!this.isSubscribed) return;
    this.isSubscribed = false;

    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }

    gsap.ticker.remove(this.onTick);
  }

  private handleMouseMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    this.mouse.targetX = (e.clientX - cx) / cx;
    this.mouse.targetY = (e.clientY - cy) / cy;
  };

  setHoveredSkill(id: string | null) {
    this.hoveredSkillId = id;
  }

  registerCategoryCallback(cb: (stage: { num: string; label: string; tagline: string; activeSkill: string }) => void) {
    this.categoryIndicatorCallback = cb;
  }

  unregisterCategoryCallback() {
    this.categoryIndicatorCallback = null;
  }

  private onTick = () => {
    const state = director.getState();
    if (!state) return;
    const skillsProg = state.scenesProgress['skills'];

    // Smooth lerp mouse tilt
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    if (!skillsProg || skillsProg.vis <= 0.01) {
      // Hide all elements when not visible
      this.hideAll();
      return;
    }

    this.updateKinematics(skillsProg.p, skillsProg.exit, state.y);
  };

  private hideAll() {
    for (let i = 0; i < SKILL_ITEMS.length; i++) {
      if (this.backNodeRefs[i]) this.backNodeRefs[i]!.style.display = 'none';
      if (this.frontNodeRefs[i]) this.frontNodeRefs[i]!.style.display = 'none';
    }
    if (this.backRingRef) this.backRingRef.style.display = 'none';
    if (this.frontRingRef) this.frontRingRef.style.display = 'none';
    if (this.connectionSvgRef) this.connectionSvgRef.style.display = 'none';
    if (this.hubRef) this.hubRef.style.display = 'none';
  }

  private updateKinematics(p: number, exit: number, scrollY: number) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 820;

    // Show SVG containers
    if (this.backRingRef) this.backRingRef.style.display = 'block';
    if (this.frontRingRef) this.frontRingRef.style.display = 'block';
    if (this.connectionSvgRef) this.connectionSvgRef.style.display = 'block';
    if (this.hubRef) this.hubRef.style.display = 'flex';

    // 1. Center of Orbit System: anchored cleanly around shoulders / chest
    const cx = vw * 0.5;
    const cy = isMobile ? vh * 0.55 : vh * 0.52;

    // 2. Radii for 3 concentric orbital tracks
    const R0 = isMobile ? Math.min(vw * 0.22, 80) : Math.min(vw * 0.16, 195);
    const R1 = isMobile ? Math.min(vw * 0.30, 115) : Math.min(vw * 0.26, 310);
    const R2 = isMobile ? Math.min(vw * 0.38, 145) : Math.min(vw * 0.36, 420);
    const trackRadii = [R0, R1, R2];

    // 3. 3D Perspective Ellipse Tilt
    const mouseTiltX = isMobile ? 0 : this.mouse.x * 0.08;
    const mouseTiltY = isMobile ? 0 : this.mouse.y * 0.06;
    const baseRotX = isMobile ? -0.22 : -0.28; // radians (~ -13deg mobile, -16deg desktop)
    const rotX = baseRotX + mouseTiltY;
    const ySquash = isMobile ? 0.60 : 0.56;

    // 4. Subtle continuous time drift + scroll spin
    const time = performance.now() * 0.0005;
    // Differential spin speeds per track
    const rotSpeed = [
      time * 1.2 + scrollY * 0.004 + mouseTiltX,
      -time * 0.9 - scrollY * 0.003 + mouseTiltX,
      time * 0.7 + scrollY * 0.0025 + mouseTiltX,
    ];

    // 5. Entrance and Exit Progression
    // Rings draw in between p = 0.20 and 0.32
    const ringEnter = Math.max(0, Math.min(1, (p - 0.20) / 0.12));
    const exitFade = Math.max(0, 1 - exit * 2.6);
    const ringOpacity = ringEnter * exitFade;

    // Update Rings
    const ringScale = 0.85 + 0.15 * ringEnter;
    if (this.backRingRef) {
      this.backRingRef.style.opacity = String(ringOpacity * 0.55);
      this.backRingRef.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${ringScale})`;
    }
    if (this.frontRingRef) {
      this.frontRingRef.style.opacity = String(ringOpacity * 0.85);
      this.frontRingRef.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${ringScale})`;
    }

    // 6. Active Category and Active Skill
    let activeGroupIndex = 0;
    if (p < 0.25) activeGroupIndex = 0;
    else if (p < 0.50) activeGroupIndex = 1;
    else if (p < 0.75) activeGroupIndex = 2;
    else activeGroupIndex = 3;

    const currentGroup = PORTFOLIO_DATA.toolkit.groups[activeGroupIndex];

    // Determine dominant active skill
    let dominantSkillId: string | null = this.hoveredSkillId;
    if (!dominantSkillId) {
      for (const item of SKILL_ITEMS) {
        if (item.activeRange && p >= item.activeRange[0] && p < item.activeRange[1]) {
          dominantSkillId = item.id;
          break;
        }
      }
    }

    // Notify category indicator callback if stage changed
    const stageKey = `${currentGroup.num}_${dominantSkillId || ''}`;
    if (stageKey !== this.lastStageNum && this.categoryIndicatorCallback) {
      this.lastStageNum = stageKey;
      this.categoryIndicatorCallback({
        num: currentGroup.num,
        label: currentGroup.label,
        tagline: currentGroup.tagline,
        activeSkill: dominantSkillId
          ? (SKILL_ITEMS.find((s) => s.id === dominantSkillId)?.name || currentGroup.label)
          : currentGroup.label,
      });
    }

    // 7. Update Center Hub
    const hubY = cy + (isMobile ? 22 : 32);
    if (this.hubRef) {
      const hubEnter = Math.max(0, Math.min(1, (p - 0.18) / 0.10));
      this.hubRef.style.transform = `translate3d(${cx}px, ${hubY}px, 0) translate(-50%, -50%)`;
      this.hubRef.style.opacity = String(hubEnter * exitFade);
      if (this.hubLabelRef) {
        this.hubLabelRef.textContent = `STACK / ${currentGroup.num}`;
      }
    }

    // 8. Face Exclusion Zone (accounting for pill half-width ~45-55px)
    // Head in Shot 3 is centered horizontally, situated above the shoulders
    const faceX = cx;
    const faceY = isMobile ? vh * 0.38 : vh * 0.38;
    const faceRadiusX = isMobile ? 120 : 130;
    const faceRadiusY = isMobile ? 105 : 115;

    // 9. Compute Coordinates for Each Skill
    let activeFrontPoint: { x: number; y: number } | null = null;
    const candidatePoints: Array<{
      idx: number;
      item: ToolkitSkillItem;
      screenX: number;
      screenY: number;
      zTilted: number;
      scale: number;
      alpha: number;
      isFront: boolean;
      isActive: boolean;
    }> = [];

    const N = SKILL_ITEMS.length;
    for (let i = 0; i < N; i++) {
      const item = SKILL_ITEMS[i];
      const baseR = trackRadii[item.track];

      // Staggered Entrance easing
      const enterThreshold = item.entranceP;
      const enterSpan = 0.08;
      const enterT = Math.max(0, Math.min(1, (p - (enterThreshold - enterSpan)) / enterSpan));
      // Ease out cubic
      const enterEased = 1 - Math.pow(1 - enterT, 3);

      if (enterEased <= 0.01) {
        // Not yet entered
        continue;
      }

      // Exit expansion
      const exitSpan = Math.max(0, exit * 2.4);
      const expandR = baseR * (0.45 + 0.55 * enterEased + exitSpan * 0.35);

      // Angle
      const angle = item.angleOffset + rotSpeed[item.track];

      // 3D coordinates on unit orbit
      const x0 = Math.cos(angle) * expandR;
      const y0 = Math.sin(angle) * expandR * ySquash;
      const z0 = Math.sin(angle) * expandR;

      // Rotate around X-axis by rotX
      const yTilted = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
      const zTilted = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

      let screenX = cx + x0;
      let screenY = cy + yTilted;

      // Face exclusion zone deflection
      const dxFace = screenX - faceX;
      const dyFace = screenY - faceY;
      const normDist = Math.sqrt(
        Math.pow(dxFace / faceRadiusX, 2) + Math.pow(dyFace / faceRadiusY, 2)
      );

      if (normDist < 1.15) {
        // Firm radial deflection: project completely outside the protected face ellipse
        const angleDeflect = normDist > 0.001 ? Math.atan2(dyFace, dxFace) : Math.PI / 2;
        screenX = faceX + Math.cos(angleDeflect) * faceRadiusX * 1.20;
        screenY = faceY + Math.sin(angleDeflect) * faceRadiusY * 1.20;
      }

      // Viewport bounds clamping for mobile (Strict zero overflow)
      if (isMobile) {
        screenX = Math.max(34, Math.min(vw - 34, screenX));
      }

      // Depth factor normalized [0, 1]
      const zNorm = (zTilted + baseR) / (2 * baseR);
      const isFront = zTilted >= 0;
      const isActive = item.id === dominantSkillId;

      let scale = isFront
        ? (isMobile ? 0.88 + 0.16 * zNorm : 0.95 + 0.18 * zNorm)
        : (isMobile ? 0.74 + 0.12 * zNorm : 0.80 + 0.12 * zNorm);

      if (isActive) {
        scale *= 1.16;
      }

      const alpha = enterEased * exitFade;

      candidatePoints.push({
        idx: i,
        item,
        screenX,
        screenY,
        zTilted,
        scale,
        alpha,
        isFront,
        isActive,
      });
    }

    // Mobile density control: show top 7 clearest / active skills to avoid overcrowding
    const mobileAllowedIndices = new Set<number>();
    if (isMobile) {
      // Prioritize active skill, then sort by front-most z depth
      const sorted = [...candidatePoints].sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return b.zTilted - a.zTilted;
      });
      sorted.slice(0, 7).forEach((p) => mobileAllowedIndices.add(p.idx));
    }

    // Apply direct DOM mutations
    const renderedIds = new Set<number>();
    for (const pt of candidatePoints) {
      renderedIds.add(pt.idx);

      const backEl = this.backNodeRefs[pt.idx];
      const frontEl = this.frontNodeRefs[pt.idx];

      if (isMobile && !mobileAllowedIndices.has(pt.idx)) {
        if (backEl) backEl.style.display = 'none';
        if (frontEl) frontEl.style.display = 'none';
        continue;
      }

      if (!pt.isFront) {
        // BACK LAYER (z < 0, behind person canvas)
        if (frontEl) frontEl.style.display = 'none';
        if (backEl) {
          // On mobile, hide back nodes behind the upper torso/head to prevent visual clutter
          if (isMobile && pt.screenY < cy) {
            backEl.style.display = 'none';
            continue;
          }
          backEl.style.display = 'block';
          backEl.style.transform = `translate3d(${pt.screenX}px, ${pt.screenY}px, 0) translate(-50%, -50%) scale(${pt.scale})`;
          const backOpacity = Math.max(0, Math.min(1, (0.35 + 0.20 * ((pt.zTilted + R1) / (2 * R1))) * pt.alpha));
          backEl.style.opacity = String(backOpacity);
        }
      } else {
        // FRONT LAYER (z >= 0, in front of canvas)
        if (backEl) backEl.style.display = 'none';
        if (frontEl) {
          frontEl.style.display = 'block';
          frontEl.style.transform = `translate3d(${pt.screenX}px, ${pt.screenY}px, 0) translate(-50%, -50%) scale(${pt.scale})`;

          if (pt.isActive) {
            frontEl.style.background = 'var(--red)';
            frontEl.style.color = '#ffffff';
            frontEl.style.borderColor = 'var(--red)';
            frontEl.style.boxShadow = '0 8px 26px rgba(255, 31, 31, 0.45), 0 0 12px rgba(255, 31, 31, 0.35)';
            frontEl.style.opacity = String(pt.alpha);
            frontEl.style.zIndex = '12';
            activeFrontPoint = { x: pt.screenX, y: pt.screenY };
          } else {
            const hasActive = Boolean(dominantSkillId);
            const frontOpacity = (hasActive ? 0.80 : 0.98) * pt.alpha;
            frontEl.style.background = '#ffffff';
            frontEl.style.color = 'var(--ink)';
            frontEl.style.borderColor = 'rgba(255, 31, 31, 0.35)';
            frontEl.style.boxShadow = '0 6px 18px rgba(13, 13, 13, 0.08), 0 2px 6px rgba(255, 31, 31, 0.08)';
            frontEl.style.opacity = String(frontOpacity);
            frontEl.style.zIndex = '2';
          }
        }
      }
    }

    // Hide any skills that haven't entered yet
    for (let i = 0; i < N; i++) {
      if (!renderedIds.has(i)) {
        if (this.backNodeRefs[i]) this.backNodeRefs[i]!.style.display = 'none';
        if (this.frontNodeRefs[i]) this.frontNodeRefs[i]!.style.display = 'none';
      }
    }

    // 10. Update Connection Line to Center Hub
    if (activeFrontPoint && this.connectionLineRef && this.connectionDotRef && exitFade > 0.05) {
      this.connectionLineRef.setAttribute('x1', String(activeFrontPoint.x));
      this.connectionLineRef.setAttribute('y1', String(activeFrontPoint.y));
      this.connectionLineRef.setAttribute('x2', String(cx));
      this.connectionLineRef.setAttribute('y2', String(hubY));
      this.connectionLineRef.style.opacity = String(0.75 * exitFade);

      this.connectionDotRef.setAttribute('cx', String(activeFrontPoint.x));
      this.connectionDotRef.setAttribute('cy', String(activeFrontPoint.y));
      this.connectionDotRef.style.opacity = String(0.85 * exitFade);
    } else {
      if (this.connectionLineRef) this.connectionLineRef.style.opacity = '0';
      if (this.connectionDotRef) this.connectionDotRef.style.opacity = '0';
    }
  }
}

export const skillOrbitEngine = new SkillOrbitEngine();

/**
 * SkillOrbitBack: Mounted in .layer-back (z0: Behind person canvas)
 */
export const SkillOrbitBack: React.FC = () => {
  const ringRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    skillOrbitEngine.init();
    skillOrbitEngine.backRingRef = ringRef.current;

    return () => {
      skillOrbitEngine.backRingRef = null;
    };
  }, []);

  return (
    <div className="orbit-system-back" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* 3 Concentric Subtle Orbit Rings (Back Half) */}
      <svg
        ref={ringRef}
        className="orbit-ring-svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '900px',
          height: '520px',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          display: 'none',
        }}
        viewBox="-450 -260 900 520"
      >
        {/* Track 0: Inner Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx="195"
          ry="110"
          fill="none"
          stroke="rgba(255, 31, 31, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        {/* Track 1: Middle Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx="310"
          ry="175"
          fill="none"
          stroke="rgba(13, 13, 13, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="3 7"
        />
        {/* Track 2: Outer Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx="420"
          ry="235"
          fill="none"
          stroke="rgba(255, 31, 31, 0.18)"
          strokeWidth="1.2"
          strokeDasharray="5 9"
        />
      </svg>

      {/* Back Skill Nodes (z < 0) */}
      {SKILL_ITEMS.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            skillOrbitEngine.backNodeRefs[idx] = el;
          }}
          className="orbit-node-back"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(13, 13, 13, 0.14)',
            color: 'rgba(13, 13, 13, 0.65)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(13, 13, 13, 0.04)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

/**
 * SkillOrbitFront: Mounted in .layer-front (z2: In front of canvas)
 */
export const SkillOrbitFront: React.FC = () => {
  const frontRingRef = useRef<SVGSVGElement | null>(null);
  const connectionSvgRef = useRef<SVGSVGElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const hubLabelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    skillOrbitEngine.init();
    skillOrbitEngine.frontRingRef = frontRingRef.current;
    skillOrbitEngine.connectionSvgRef = connectionSvgRef.current;
    skillOrbitEngine.connectionLineRef = lineRef.current;
    skillOrbitEngine.connectionDotRef = dotRef.current;
    skillOrbitEngine.hubRef = hubRef.current;
    skillOrbitEngine.hubLabelRef = hubLabelRef.current;

    return () => {
      skillOrbitEngine.frontRingRef = null;
      skillOrbitEngine.connectionSvgRef = null;
      skillOrbitEngine.connectionLineRef = null;
      skillOrbitEngine.connectionDotRef = null;
      skillOrbitEngine.hubRef = null;
      skillOrbitEngine.hubLabelRef = null;
    };
  }, []);

  return (
    <div className="orbit-system-front" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Front Highlighted Orbit Arcs */}
      <svg
        ref={frontRingRef}
        className="orbit-ring-front-svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '900px',
          height: '520px',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          display: 'none',
        }}
        viewBox="-450 -260 900 520"
      >
        <ellipse
          cx="0"
          cy="0"
          rx="195"
          ry="110"
          fill="none"
          stroke="rgba(255, 31, 31, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="8 24"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="310"
          ry="175"
          fill="none"
          stroke="rgba(255, 31, 31, 0.28)"
          strokeWidth="1.5"
          strokeDasharray="12 36"
        />
      </svg>

      {/* Connection Line SVG */}
      <svg
        ref={connectionSvgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <line
          ref={lineRef}
          stroke="var(--red)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
        />
        <circle
          ref={dotRef}
          r="3.5"
          fill="var(--red)"
          style={{ opacity: 0, transition: 'opacity 0.15s ease' }}
        />
      </svg>

      {/* Central Technical Hub Marker */}
      <div
        ref={hubRef}
        className="orbit-center-hub font-mono"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'none',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 31, 31, 0.30)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          zIndex: 8,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--red)',
            boxShadow: '0 0 8px rgba(255, 31, 31, 0.6)',
          }}
        />
        <span
          ref={hubLabelRef}
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--ink)',
          }}
        >
          STACK / 01
        </span>
      </div>

      {/* Front Skill Nodes (z >= 0, Interactive on Desktop) */}
      {SKILL_ITEMS.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            skillOrbitEngine.frontNodeRefs[idx] = el;
          }}
          className="orbit-node-front"
          onMouseEnter={() => skillOrbitEngine.setHoveredSkill(item.id)}
          onMouseLeave={() => skillOrbitEngine.setHoveredSkill(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none',
            padding: '8px 18px',
            borderRadius: '999px',
            background: '#ffffff',
            border: '1px solid rgba(255, 31, 31, 0.35)',
            color: 'var(--ink)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            fontWeight: 600,
            boxShadow: '0 6px 18px rgba(13, 13, 13, 0.08)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            pointerEvents: 'auto',
            willChange: 'transform, opacity',
            transition: 'background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
