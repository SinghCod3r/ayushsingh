import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initOpenSourceAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '.git-repo-banner',
          '.git-trunk-line',
          '.git-node-dot',
          '.git-branch-arm',
          '.git-commit-card',
          '.maintainer-callout-card',
        ],
        {
          scaleY: 1,
          scaleX: 1,
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
        }
      );
      return;
    }

    // 1. Repo Overview Banner Entrance
    gsap.from('.git-repo-banner', {
      scrollTrigger: {
        trigger: '.git-repo-banner',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.75,
      ease: 'power3.out',
    });

    // 2. Git Main Trunk Line: draws down as user scrolls through the repository log
    gsap.fromTo(
      '.git-trunk-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.git-tree-container',
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.4,
        },
      }
    );

    // 3. Progressive Branch Contribution Sequence:
    // line draws → PR node appears → PR information appears → next node → next contribution
    const branches = gsap.utils.toArray<HTMLElement>('.git-branch-item');

    branches.forEach((branch) => {
      const branchTl = gsap.timeline({
        scrollTrigger: {
          trigger: branch,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Step 1: Merged commit node pops in
      branchTl.from(branch.querySelector('.git-node-dot'), {
        scale: 0,
        duration: 0.32,
        ease: 'back.out(2)',
      })
        // Step 2: Branch connector arm draws horizontally into the commit
        .from(
          branch.querySelector('.git-branch-arm'),
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.22,
            ease: 'power2.out',
          },
          '-=0.12'
        )
        // Step 3: PR Commit Card reveals
        .from(
          branch.querySelector('.git-commit-card'),
          {
            x: -18,
            opacity: 0,
            duration: 0.42,
            ease: 'power2.out',
          },
          '-=0.15'
        );
    });

    // 4. Maintainer Quote Callout
    gsap.from('.maintainer-callout-card', {
      scrollTrigger: {
        trigger: '.maintainer-callout-card',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, container);

  return () => ctx.revert();
}
