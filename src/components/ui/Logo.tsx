interface LogoProps {
  size?: number;
}

export default function Logo({ size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CodLearn logo"
    >
      <defs>
        <filter id="eye-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background — white */}
      <rect width="32" height="32" rx="8" fill="#ffffff" />

      {/* ── Jacket body — black ── */}
      <path
        d="
          M 7,31
          C 7,31 5,28 5,23
          C 5,20 7,19 10,18
          C 12,17.5 14,17 16,18.5
          C 18,17 20,17.5 22,18
          C 25,19 27,20 27,23
          C 27,28 25,31 25,31
          Z
        "
        fill="#111827"
      />

      {/* Jacket collar V */}
      <path
        d="M 13,18 C 14.5,20.5 15.2,21.5 16,22.5 C 16.8,21.5 17.5,20.5 19,18"
        stroke="#374151"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── Hood — black ── */}
      <path
        d="
          M 10,18
          C 8,17 6,15 6,11
          C 6,5.5 10.5,2 16,2
          C 21.5,2 26,5.5 26,11
          C 26,15 24,17 22,18
          C 20,17.5 18,17 16,18.5
          C 14,17 12,17.5 10,18
          Z
        "
        fill="#111827"
      />

      {/* ── Face — light skin tone so it shows against white bg ── */}
      <ellipse cx="16" cy="13" rx="5.5" ry="6.2" fill="#fde8d0" />

      {/* Hood inner rim */}
      <path
        d="M 10.5,9.5 C 12.5,7 19.5,7 21.5,9.5"
        stroke="#374151"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* ── Glowing green eyes ── */}
      <circle cx="13.5" cy="13" r="1.5" fill="#16a34a" filter="url(#eye-glow)" />
      <circle cx="18.5" cy="13" r="1.5" fill="#16a34a" filter="url(#eye-glow)" />
    </svg>
  );
}
