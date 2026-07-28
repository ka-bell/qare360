interface QareLogoProps {
  className?: string;
  /**
   * `navy` — dark blue PNG for light backgrounds (header)
   * `cyan` — original cyan-on-transparent for dark backgrounds
   */
  variant?: 'navy' | 'cyan';
}

export function QareLogo({ className = '', variant = 'navy' }: QareLogoProps) {
  const src =
    variant === 'cyan' ? '/brand/qare-360-logo-cyan.png' : '/brand/qare-360-logo-navy.png';

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={src}
        alt="Qare 360°"
        className="h-7 w-auto object-contain object-left sm:h-8"
      />
    </span>
  );
}
