export interface AvatarOption {
  id: string;
  label: string;
  svg: string;
}

export const avatars: AvatarOption[] = [
  {
    id: 'hacker',
    label: 'Hacker',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Hood -->
  <ellipse cx="16" cy="14" rx="11" ry="12" fill="#1a1a2e"/>
  <path d="M5 14 Q5 4 16 3 Q27 4 27 14 L27 20 Q27 26 16 27 Q5 26 5 20 Z" fill="#16213e"/>
  <!-- Hood shadow inner -->
  <ellipse cx="16" cy="13" rx="8" ry="9" fill="#0d1117"/>
  <!-- Face area -->
  <ellipse cx="16" cy="16" rx="6" ry="7" fill="#0f3460"/>
  <!-- Glowing green eyes -->
  <ellipse cx="13" cy="15" rx="1.8" ry="1.8" fill="#00ff88"/>
  <ellipse cx="19" cy="15" rx="1.8" ry="1.8" fill="#00ff88"/>
  <!-- Eye glow -->
  <ellipse cx="13" cy="15" rx="1" ry="1" fill="#ffffff" opacity="0.8"/>
  <ellipse cx="19" cy="15" rx="1" ry="1" fill="#ffffff" opacity="0.8"/>
  <!-- Hood outline -->
  <path d="M5 14 Q5 4 16 3 Q27 4 27 14 L27 20 Q27 26 16 27 Q5 26 5 20 Z" fill="none" stroke="#00ff88" stroke-width="0.5" opacity="0.5"/>
</svg>`,
  },
  {
    id: 'astronaut',
    label: 'Astronauta',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Helmet outer -->
  <circle cx="16" cy="16" r="13" fill="#e8e8f0"/>
  <circle cx="16" cy="16" r="12" fill="#f0f0f8"/>
  <!-- Helmet visor -->
  <ellipse cx="16" cy="17" rx="8" ry="7" fill="#1a6bc7"/>
  <ellipse cx="16" cy="17" rx="7" ry="6" fill="#2180e8"/>
  <!-- Visor reflection -->
  <ellipse cx="13" cy="14" rx="2.5" ry="1.5" fill="#5aaeff" opacity="0.6" transform="rotate(-20 13 14)"/>
  <ellipse cx="19" cy="13" rx="1.2" ry="0.8" fill="#5aaeff" opacity="0.5" transform="rotate(-20 19 13)"/>
  <!-- Helmet ring -->
  <circle cx="16" cy="16" r="13" fill="none" stroke="#c0c0d0" stroke-width="1.5"/>
  <!-- Helmet bolts -->
  <circle cx="5" cy="14" r="1.2" fill="#c0c0d0"/>
  <circle cx="27" cy="14" r="1.2" fill="#c0c0d0"/>
  <!-- NASA-like stripe -->
  <path d="M5 20 Q16 24 27 20" stroke="#e84040" stroke-width="1.5" fill="none"/>
</svg>`,
  },
  {
    id: 'robot',
    label: 'Robô',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Antenna -->
  <line x1="16" y1="3" x2="16" y2="7" stroke="#8899aa" stroke-width="1.5"/>
  <circle cx="16" cy="2.5" r="1.5" fill="#ff4444"/>
  <!-- Head -->
  <rect x="5" y="7" width="22" height="18" rx="3" fill="#7090b0"/>
  <rect x="6" y="8" width="20" height="16" rx="2" fill="#90aac0"/>
  <!-- LED Eyes -->
  <rect x="9" y="12" width="5" height="4" rx="1" fill="#00ddff"/>
  <rect x="18" y="12" width="5" height="4" rx="1" fill="#00ddff"/>
  <!-- Eye glow inner -->
  <rect x="10" y="13" width="3" height="2" rx="0.5" fill="#aaffff" opacity="0.8"/>
  <rect x="19" y="13" width="3" height="2" rx="0.5" fill="#aaffff" opacity="0.8"/>
  <!-- Mouth/speaker grille -->
  <rect x="10" y="19" width="12" height="3" rx="1" fill="#5070a0"/>
  <line x1="12" y1="19" x2="12" y2="22" stroke="#7090b0" stroke-width="0.7"/>
  <line x1="14" y1="19" x2="14" y2="22" stroke="#7090b0" stroke-width="0.7"/>
  <line x1="16" y1="19" x2="16" y2="22" stroke="#7090b0" stroke-width="0.7"/>
  <line x1="18" y1="19" x2="18" y2="22" stroke="#7090b0" stroke-width="0.7"/>
  <line x1="20" y1="19" x2="20" y2="22" stroke="#7090b0" stroke-width="0.7"/>
  <!-- Side bolts -->
  <circle cx="5.5" cy="14" r="1" fill="#50708a"/>
  <circle cx="26.5" cy="14" r="1" fill="#50708a"/>
</svg>`,
  },
  {
    id: 'wizard',
    label: 'Mago',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Hat -->
  <polygon points="16,2 8,14 24,14" fill="#5b2d8e"/>
  <rect x="6" y="13" width="20" height="3" rx="1.5" fill="#7b3dbe"/>
  <!-- Hat stars -->
  <polygon points="12,6 12.5,7.5 14,7.5 12.8,8.4 13.3,10 12,9 10.7,10 11.2,8.4 10,7.5 11.5,7.5" fill="#ffd700" transform="scale(0.5) translate(10,2)"/>
  <circle cx="18" cy="7" r="1" fill="#ffd700"/>
  <circle cx="14" cy="9" r="0.7" fill="#ff80ff"/>
  <!-- Face -->
  <ellipse cx="16" cy="20" rx="7" ry="8" fill="#ffd5a8"/>
  <!-- Eyes -->
  <circle cx="13" cy="19" r="1.5" fill="#4040c0"/>
  <circle cx="19" cy="19" r="1.5" fill="#4040c0"/>
  <circle cx="13.5" cy="18.5" r="0.5" fill="white"/>
  <circle cx="19.5" cy="18.5" r="0.5" fill="white"/>
  <!-- Smile -->
  <path d="M13 23 Q16 25 19 23" stroke="#c07050" stroke-width="1" fill="none" stroke-linecap="round"/>
  <!-- Beard hint -->
  <path d="M12 26 Q16 29 20 26" fill="#d0c090" opacity="0.6"/>
  <!-- Wand sparkle -->
  <line x1="24" y1="24" x2="29" y2="19" stroke="#ffd700" stroke-width="1"/>
  <circle cx="29" cy="19" r="1.5" fill="#ffd700"/>
  <line x1="29" y1="17" x2="29" y2="16" stroke="#ffd700" stroke-width="0.8"/>
  <line x1="31" y1="19" x2="32" y2="19" stroke="#ffd700" stroke-width="0.8"/>
  <line x1="30.5" y1="17.5" x2="31" y2="17" stroke="#ffd700" stroke-width="0.8"/>
</svg>`,
  },
  {
    id: 'ninja',
    label: 'Ninja',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Head/mask base -->
  <circle cx="16" cy="16" r="13" fill="#1a1a1a"/>
  <!-- Headband -->
  <rect x="4" y="11" width="24" height="4" rx="1" fill="#cc2222"/>
  <!-- Headband knot -->
  <rect x="24" y="10" width="4" height="6" rx="1" fill="#ee3333"/>
  <!-- Eyes area (visible skin) -->
  <rect x="9" y="14" width="14" height="6" rx="2" fill="#f5c5a0"/>
  <!-- Eyes -->
  <ellipse cx="13" cy="17" rx="2" ry="1.5" fill="#1a1a1a"/>
  <ellipse cx="19" cy="17" rx="2" ry="1.5" fill="#1a1a1a"/>
  <!-- Eye shine -->
  <circle cx="13.8" cy="16.3" r="0.6" fill="white"/>
  <circle cx="19.8" cy="16.3" r="0.6" fill="white"/>
  <!-- Lower mask -->
  <rect x="6" y="20" width="20" height="8" rx="4" fill="#1a1a1a"/>
  <!-- Mask texture lines -->
  <path d="M10 22 Q16 24 22 22" stroke="#333" stroke-width="0.5" fill="none"/>
</svg>`,
  },
  {
    id: 'cat',
    label: 'Gato',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Ears -->
  <polygon points="7,12 4,3 13,9" fill="#ff9050"/>
  <polygon points="25,12 28,3 19,9" fill="#ff9050"/>
  <!-- Ear inner -->
  <polygon points="7.5,11 5.5,5 12,9" fill="#ffb080"/>
  <polygon points="24.5,11 26.5,5 20,9" fill="#ffb080"/>
  <!-- Head -->
  <ellipse cx="16" cy="18" rx="12" ry="11" fill="#ff9050"/>
  <!-- Face -->
  <ellipse cx="16" cy="19" rx="10" ry="9" fill="#ffb070"/>
  <!-- Eyes -->
  <ellipse cx="12" cy="17" rx="2.5" ry="2.5" fill="#50c050"/>
  <ellipse cx="20" cy="17" rx="2.5" ry="2.5" fill="#50c050"/>
  <!-- Pupils -->
  <ellipse cx="12" cy="17" rx="1" ry="2" fill="#1a1a1a"/>
  <ellipse cx="20" cy="17" rx="1" ry="2" fill="#1a1a1a"/>
  <!-- Eye shine -->
  <circle cx="12.7" cy="16" r="0.7" fill="white"/>
  <circle cx="20.7" cy="16" r="0.7" fill="white"/>
  <!-- Nose -->
  <ellipse cx="16" cy="21" rx="1.5" ry="1" fill="#ff6080"/>
  <!-- Mouth -->
  <path d="M16 22 L14 23.5" stroke="#cc4060" stroke-width="0.8" stroke-linecap="round" fill="none"/>
  <path d="M16 22 L18 23.5" stroke="#cc4060" stroke-width="0.8" stroke-linecap="round" fill="none"/>
  <!-- Whiskers -->
  <line x1="4" y1="21" x2="13" y2="21.5" stroke="#cc7030" stroke-width="0.7" opacity="0.7"/>
  <line x1="4" y1="23" x2="13" y2="22.5" stroke="#cc7030" stroke-width="0.7" opacity="0.7"/>
  <line x1="28" y1="21" x2="19" y2="21.5" stroke="#cc7030" stroke-width="0.7" opacity="0.7"/>
  <line x1="28" y1="23" x2="19" y2="22.5" stroke="#cc7030" stroke-width="0.7" opacity="0.7"/>
</svg>`,
  },
  {
    id: 'fox',
    label: 'Raposa',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Ears -->
  <polygon points="7,13 3,2 14,10" fill="#e05820"/>
  <polygon points="25,13 29,2 18,10" fill="#e05820"/>
  <!-- Ear inner -->
  <polygon points="7.5,12 5,5 13,9.5" fill="#ffaa60"/>
  <polygon points="24.5,12 27,5 19,9.5" fill="#ffaa60"/>
  <!-- Head -->
  <ellipse cx="16" cy="18" rx="12" ry="11" fill="#e05820"/>
  <!-- White face marking -->
  <ellipse cx="16" cy="20" rx="7" ry="8" fill="#fff5e0"/>
  <!-- Eyes -->
  <ellipse cx="12" cy="16" rx="2.5" ry="2.5" fill="#d4a000"/>
  <ellipse cx="20" cy="16" rx="2.5" ry="2.5" fill="#d4a000"/>
  <!-- Pupils -->
  <ellipse cx="12" cy="16" rx="1" ry="2" fill="#1a1a1a"/>
  <ellipse cx="20" cy="16" rx="1" ry="2" fill="#1a1a1a"/>
  <!-- Eye shine -->
  <circle cx="12.8" cy="15" r="0.7" fill="white"/>
  <circle cx="20.8" cy="15" r="0.7" fill="white"/>
  <!-- Nose -->
  <ellipse cx="16" cy="21" rx="1.8" ry="1.2" fill="#1a1a1a"/>
  <!-- Mouth -->
  <path d="M14.5 22.5 Q16 24 17.5 22.5" stroke="#333" stroke-width="0.8" fill="none" stroke-linecap="round"/>
  <!-- Whiskers -->
  <line x1="4" y1="20" x2="12.5" y2="21" stroke="#c04010" stroke-width="0.7" opacity="0.6"/>
  <line x1="4" y1="22" x2="12.5" y2="22" stroke="#c04010" stroke-width="0.7" opacity="0.6"/>
  <line x1="28" y1="20" x2="19.5" y2="21" stroke="#c04010" stroke-width="0.7" opacity="0.6"/>
  <line x1="28" y1="22" x2="19.5" y2="22" stroke="#c04010" stroke-width="0.7" opacity="0.6"/>
</svg>`,
  },
  {
    id: 'alien',
    label: 'Alienígena',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Head - big oval -->
  <ellipse cx="16" cy="15" rx="12" ry="14" fill="#70d060"/>
  <ellipse cx="16" cy="15" rx="11" ry="13" fill="#88e878"/>
  <!-- Head shine -->
  <ellipse cx="12" cy="8" rx="4" ry="3" fill="#aaffaa" opacity="0.4" transform="rotate(-20 12 8)"/>
  <!-- Large eyes -->
  <ellipse cx="11" cy="15" rx="4" ry="5" fill="#0a0a1a"/>
  <ellipse cx="21" cy="15" rx="4" ry="5" fill="#0a0a1a"/>
  <!-- Eye iris -->
  <ellipse cx="11" cy="15" rx="3" ry="4" fill="#1a1a4a"/>
  <ellipse cx="21" cy="15" rx="3" ry="4" fill="#1a1a4a"/>
  <!-- Eye shine -->
  <ellipse cx="12.5" cy="12.5" rx="1.5" ry="2" fill="white" opacity="0.7"/>
  <ellipse cx="22.5" cy="12.5" rx="1.5" ry="2" fill="white" opacity="0.7"/>
  <!-- Small nose dots -->
  <circle cx="15" cy="22" r="0.8" fill="#50b040"/>
  <circle cx="17" cy="22" r="0.8" fill="#50b040"/>
  <!-- Small smile -->
  <path d="M12 25 Q16 27.5 20 25" stroke="#40a030" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <!-- Antenna-like bumps -->
  <ellipse cx="8" cy="4" rx="2" ry="3" fill="#70d060"/>
  <ellipse cx="24" cy="4" rx="2" ry="3" fill="#70d060"/>
  <circle cx="8" cy="2" r="1.5" fill="#ffdd00"/>
  <circle cx="24" cy="2" r="1.5" fill="#ffdd00"/>
</svg>`,
  },
];

export function getAvatarById(id: string): AvatarOption {
  return avatars.find((a) => a.id === id) ?? avatars[0];
}
