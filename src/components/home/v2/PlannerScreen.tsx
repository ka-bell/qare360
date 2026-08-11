import { useEffect, useRef, useState } from 'react';

/**
 * Live Research Planner UI — fills the laptop screen.
 * Designed at 800×520 and scaled to the screen rect.
 */
export function PlannerScreen() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const sync = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      setScale(Math.min(width / 800, height / 520));
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden bg-[#0A0A0C]">
      <div
        className="planner-screen origin-top-left"
        style={{
          width: 800,
          height: 520,
          transform: `scale(${scale})`,
        }}
      >
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 800 520"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <circle className="planner-blob planner-blob--1" cx="120" cy="120" r="150" fill="#006FF7" opacity="0.35" />
          <circle className="planner-blob planner-blob--2" cx="680" cy="90" r="120" fill="#C9FF6E" opacity="0.3" />
          <circle className="planner-blob planner-blob--3" cx="700" cy="430" r="170" fill="#FF1C77" opacity="0.25" />
          <circle className="planner-blob planner-blob--4" cx="90" cy="440" r="130" fill="#FF5B26" opacity="0.25" />
          <circle className="planner-blob planner-blob--5" cx="400" cy="480" r="110" fill="#C7B0FE" opacity="0.2" />
        </svg>

        <div className="relative flex h-full flex-col px-10 pb-8 pt-9">
          <div className="mb-10 flex items-center justify-between">
            <div className="text-[14px] font-semibold tracking-[-0.01em] text-[#e5e5e7]">QARE 360</div>
            <div className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3.5 py-1.5 text-[12.5px] font-medium text-[#a1a1a6]">
              Research planner
            </div>
            <div className="flex gap-1.5">
              <div className="px-3 py-1.5 text-[12.5px] font-medium text-[#a1a1a6]">Reset</div>
              <div className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[12.5px] font-medium text-[#e5e5e7]">
                Save &amp; exit
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[600px] text-center">
            <div className="mb-8 inline-flex rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-[3px]">
              <div className="rounded-[18px] bg-white px-5 py-2 text-[13px] font-semibold text-[#0a0a0c]">
                Help me decide
              </div>
              <div className="px-5 py-2 text-[13px] font-medium text-[#a1a1a6]">I know what I need</div>
            </div>

            <div className="mb-3.5 text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#f5f5f7]">
              What would you like to find out?
            </div>
            <div className="mb-8 text-[15px] leading-[1.6] text-[#8e8e93]">
              Tell us what you&apos;re working on. We&apos;ll shape the right research approach, timeline and
              cost.
            </div>

            <div className="mb-5 flex items-center gap-2.5 rounded-[28px] border border-white/[0.12] bg-white/[0.06] py-1.5 pl-5 pr-2 backdrop-blur-[20px]">
              <span className="flex-1 text-left text-[14px] text-[#8e8e93]">
                Describe what you&apos;re trying to understand
              </span>
              <div className="flex size-[34px] items-center justify-center rounded-full bg-white text-[15px] font-semibold text-[#0a0a0c]">
                ↑
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[12.5px]">
              <span className="text-[#8e8e93]">Try</span>
              <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-[#c7c7cc]">
                Validate an idea
              </span>
              <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-[#c7c7cc]">
                Measure campaign impact
              </span>
              <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-[#c7c7cc]">
                Understand an audience
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
