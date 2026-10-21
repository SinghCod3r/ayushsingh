import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.round(obj.val));
      },
    })
      .to('.loader-text-wrap', {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
      .to('.loader-curtain-top', {
        yPercent: -100,
        duration: 0.7,
        ease: 'expo.inOut',
      })
      .to(
        '.loader-curtain-bottom',
        {
          yPercent: 100,
          duration: 0.7,
          ease: 'expo.inOut',
        },
        '<'
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="intro-loader-root" aria-hidden="true">
      <div className="loader-curtain loader-curtain-top" />
      <div className="loader-curtain loader-curtain-bottom" />

      <div className="loader-content loader-text-wrap">
        <div className="loader-title-row">
          <span className="loader-tag">SYSTEM INIT // 2026</span>
          <span className="loader-percent">{percent}%</span>
        </div>
        <h1 className="loader-name">AYUSH SINGH</h1>
        <p className="loader-sub">CREATIVE ENGINEER &bull; UPSTREAM MAINTAINER</p>
      </div>
    </div>
  );
};

