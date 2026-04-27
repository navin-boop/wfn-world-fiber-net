import Link from 'next/link';

interface LogoProps {
  dark?: boolean;
  className?: string;
}

export default function Logo({ dark = false, className = '' }: LogoProps) {
  const textColor = dark ? '#ededed' : '#0d0d0d';

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
        <path d="M4 18 Q4 6 16 6" stroke="#18E299" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 18 Q4 10 16 10" stroke="#18E299" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M4 18 Q4 14 16 14" stroke="#18E299" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="16" cy="17" r="2.5" fill="#18E299" />
      </svg>
      <span
        className="text-[15px] font-semibold tracking-tight"
        style={{ color: textColor, letterSpacing: '-0.015em' }}
      >
        World Fiber Net
      </span>
    </Link>
  );
}
