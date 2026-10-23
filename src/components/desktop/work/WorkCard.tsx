import { forwardRef } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../../../data';

interface WorkCardProps {
  project: Project;
  index: number;
  totalCards: number;
  onOpenModal: (project: Project) => void;
  isMobileStack?: boolean;
}

export const WorkCard = forwardRef<HTMLDivElement, WorkCardProps>(
  ({ project, index, totalCards, onOpenModal, isMobileStack = false }, ref) => {
    return (
      <div
        ref={ref}
        data-cursor="project"
        className={`w-full max-w-4xl lg:max-w-5xl rounded-2xl bg-[#0c0d12] border border-zinc-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 flex flex-col justify-between transition-colors hover:border-zinc-700/70 select-none ${
          isMobileStack
            ? 'relative mb-12 min-h-[440px]'
            : 'absolute top-0 left-0 right-0 mx-auto h-[540px] sm:h-[580px] lg:h-[610px]'
        }`}
        style={{
          transformOrigin: '50% 8%',
        }}
      >
        {/* ========================================================= */}
        {/* TOP: Number & Title (Editorial Header)                    */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center justify-center text-center space-y-1 pb-3 shrink-0">
          <div className="work-card-number flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-widest text-amber-400 uppercase font-semibold">
            <span>{project.number}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 font-normal">
              {project.category || 'SYSTEMS & AI'}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 font-normal">
              SHEET {index + 1} OF {totalCards}
            </span>
          </div>

          <div className="overflow-hidden py-0.5">
            <h3 className="work-card-title font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-none">
              {project.title}
            </h3>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER: Real Project Screenshot (Hero of the Card)        */}
        {/* ========================================================= */}
        <div
          onClick={() => onOpenModal(project)}
          className="work-card-image-wrap flex-1 w-full rounded-xl overflow-hidden bg-[#050608] border border-zinc-800/90 relative group cursor-pointer shadow-inner flex items-center justify-center my-1"
        >
          <img
            src={project.image}
            alt={project.title}
            className="work-card-image w-full h-full object-cover object-top transition-transform duration-700 ease-out will-change-transform"
            loading="lazy"
          />

          {/* Clean hover inspector chip */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-amber-400/50 text-amber-300 text-[10px] font-mono uppercase font-semibold shadow-lg">
              <span>Inspect Architecture</span>
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM: Caption, Technologies & Action Links              */}
        {/* ========================================================= */}
        <div className="pt-3.5 mt-2 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono shrink-0">
          
          {/* Left info: Concise description & technology tag line */}
          <div className="space-y-1 max-w-xl">
            <p className="work-card-desc text-zinc-300 font-sans text-xs sm:text-sm leading-snug line-clamp-1">
              {project.description}
            </p>
            
            <div className="work-card-tags flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="text-amber-400/95 font-medium">
                {project.tags.slice(0, 3).join(' / ')}
              </span>
              <span>•</span>
              <span className="text-zinc-400">{project.year || '2026'}</span>
            </div>
          </div>

          {/* Right info: Year & CTA buttons */}
          <div className="work-card-cta flex items-center gap-3 shrink-0 self-end sm:self-center">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                aria-label="View GitHub Repository"
              >
                <Github size={13} />
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-amber-400 hover:text-amber-300 transition-colors"
                aria-label="View Live Deployment"
              >
                <ExternalLink size={13} />
              </a>
            )}

            <button
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
            >
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

        </div>

      </div>
    );
  }
);

WorkCard.displayName = 'WorkCard';
