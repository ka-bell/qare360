/** Mini brand visuals for service cards — swap for photos via service.image later. */

const SCENES = {
  concept: (
    <>
      <rect x="28" y="36" width="88" height="58" rx="6" fill="#fff" stroke="#d3dde5" />
      <rect x="40" y="48" width="40" height="6" rx="2" fill="#0c6ecf" opacity="0.85" />
      <rect x="40" y="60" width="64" height="4" rx="2" fill="#d3dde5" />
      <rect x="40" y="70" width="52" height="4" rx="2" fill="#d3dde5" />
      <circle cx="150" cy="52" r="28" fill="#97e9ed" opacity="0.45" />
      <circle cx="168" cy="78" r="16" fill="#0c6ecf" opacity="0.25" />
      <path d="M120 110 Q160 70 200 95" stroke="#0c6ecf" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="120" cy="110" r="3" fill="#0c6ecf" />
      <circle cx="200" cy="95" r="3" fill="#97e9ed" />
    </>
  ),
  brand: (
    <>
      <rect x="36" y="40" width="148" height="70" rx="8" fill="#fff" stroke="#d3dde5" />
      <rect x="52" y="78" width="18" height="20" rx="2" fill="#0c6ecf" opacity="0.9" />
      <rect x="78" y="62" width="18" height="36" rx="2" fill="#97e9ed" />
      <rect x="104" y="54" width="18" height="44" rx="2" fill="#0c6ecf" opacity="0.55" />
      <rect x="130" y="68" width="18" height="30" rx="2" fill="#5a6b7d" opacity="0.35" />
      <rect x="156" y="48" width="18" height="50" rx="2" fill="#0c6ecf" opacity="0.75" />
      <circle cx="188" cy="36" r="14" fill="#97e9ed" opacity="0.5" />
    </>
  ),
  campaign: (
    <>
      <rect x="48" y="32" width="120" height="86" rx="8" fill="#fff" stroke="#d3dde5" />
      <rect x="60" y="44" width="96" height="36" rx="4" fill="#eef3f6" />
      <path d="M72 70 L96 52 L118 64 L144 46" stroke="#0c6ecf" strokeWidth="2" fill="none" />
      <circle cx="96" cy="52" r="3" fill="#0c6ecf" />
      <circle cx="144" cy="46" r="3" fill="#97e9ed" />
      <rect x="60" y="90" width="56" height="8" rx="2" fill="#0c6ecf" />
      <rect x="124" y="90" width="32" height="8" rx="2" fill="#d3dde5" />
      <circle cx="40" cy="100" r="18" fill="#97e9ed" opacity="0.4" />
    </>
  ),
  customer: (
    <>
      <circle cx="78" cy="58" r="22" fill="#fff" stroke="#d3dde5" strokeWidth="2" />
      <circle cx="78" cy="50" r="8" fill="#0c6ecf" opacity="0.7" />
      <path d="M62 74 Q78 64 94 74" stroke="#0c6ecf" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="128" cy="62" r="26" fill="#fff" stroke="#97e9ed" strokeWidth="2" />
      <circle cx="128" cy="52" r="9" fill="#97e9ed" />
      <path d="M110 82 Q128 70 146 82" stroke="#0b1527" strokeWidth="2" fill="none" opacity="0.35" />
      <circle cx="168" cy="88" r="14" fill="#0c6ecf" opacity="0.2" />
      <path d="M40 110 H180" stroke="#d3dde5" strokeWidth="1" />
    </>
  ),
  employee: (
    <>
      <rect x="40" y="38" width="140" height="74" rx="8" fill="#fff" stroke="#d3dde5" />
      <circle cx="68" cy="62" r="10" fill="#97e9ed" />
      <rect x="86" y="56" width="70" height="5" rx="2" fill="#d3dde5" />
      <rect x="86" y="66" width="48" height="4" rx="2" fill="#e6eef3" />
      <circle cx="68" cy="92" r="10" fill="#0c6ecf" opacity="0.55" />
      <rect x="86" y="86" width="70" height="5" rx="2" fill="#d3dde5" />
      <rect x="86" y="96" width="48" height="4" rx="2" fill="#e6eef3" />
      <rect x="168" y="48" width="8" height="40" rx="2" fill="#0c6ecf" opacity="0.35" />
    </>
  ),
  ux: (
    <>
      <rect x="78" y="24" width="64" height="102" rx="12" fill="#fff" stroke="#d3dde5" strokeWidth="2" />
      <rect x="86" y="38" width="48" height="70" rx="4" fill="#eef3f6" />
      <rect x="92" y="46" width="36" height="6" rx="2" fill="#0c6ecf" opacity="0.7" />
      <rect x="92" y="58" width="28" height="4" rx="2" fill="#d3dde5" />
      <rect x="92" y="68" width="32" height="4" rx="2" fill="#d3dde5" />
      <rect x="92" y="88" width="36" height="10" rx="3" fill="#97e9ed" />
      <circle cx="50" cy="70" r="12" fill="#0c6ecf" opacity="0.2" />
      <circle cx="178" cy="50" r="16" fill="#97e9ed" opacity="0.35" />
      <path d="M50 70 L78 55" stroke="#0c6ecf" strokeWidth="1.25" opacity="0.45" />
    </>
  ),
} as const;

export type ServiceVisualId = keyof typeof SCENES;

interface ServiceVisualProps {
  id: ServiceVisualId;
  className?: string;
}

export function ServiceVisual({ id, className = '' }: ServiceVisualProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(145deg,#f5f8fa_0%,#e8f4f8_45%,#f0f7fa_100%)] ${className}`}
    >
      <svg
        viewBox="0 0 220 140"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id={`glow-${id}`} cx="70%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#97e9ed" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#97e9ed" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="220" height="140" fill={`url(#glow-${id})`} />
        {SCENES[id]}
      </svg>
    </div>
  );
}
