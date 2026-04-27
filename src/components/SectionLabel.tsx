interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{ background: 'var(--green-100)', color: 'var(--green-700)' }}
      >
        {children}
      </span>
    </div>
  );
}
