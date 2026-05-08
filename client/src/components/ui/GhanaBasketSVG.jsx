/**
 * GhanaBasketSVG — shared SVG scene used by both
 * BasketAnimation (homepage) and IntroScreen.
 *
 * Matches the reference image:
 *  - Wide Kente-woven bowl basket (centre-bottom)
 *  - Gari bottle  → top-left,  tilted right  ~45°
 *  - Palm Oil     → top-centre, tilted down  ~30°
 *  - Coconut Oil  → top-right,  tilted left  ~45°
 *  - Each pours a stream + particles into the basket
 *
 * Props:
 *  scene  0-5  (same scene machine as BasketAnimation)
 *  idSuffix     string — makes SVG filter/gradient IDs unique per instance
 *  isMobile     bool
 */

const GARI_PARTICLES = [
    { x: 118, dx: -10, delay: 0.00, dur: 0.9, r: 2.5 },
    { x: 124, dx: -6, delay: 0.10, dur: 1.0, r: 2.0 },
    { x: 130, dx: -8, delay: 0.20, dur: 0.85, r: 3.0 },
    { x: 136, dx: -5, delay: 0.05, dur: 1.1, r: 2.0 },
    { x: 122, dx: -12, delay: 0.15, dur: 0.95, r: 2.5 },
    { x: 128, dx: -7, delay: 0.25, dur: 0.88, r: 2.0 },
    { x: 134, dx: -9, delay: 0.08, dur: 1.0, r: 2.5 },
    { x: 120, dx: -6, delay: 0.30, dur: 0.9, r: 2.0 },
];

const GARI_PARTICLES_MOBILE = GARI_PARTICLES.slice(0, 4);

const SPARKLES = [
    { cx: 108, cy: 210, r: 3, delay: 0.0 },
    { cx: 220, cy: 208, r: 2.5, delay: 0.3 },
    { cx: 164, cy: 205, r: 3.5, delay: 0.6 },
    { cx: 138, cy: 215, r: 2, delay: 0.9 },
    { cx: 192, cy: 212, r: 2.5, delay: 0.2 },
    { cx: 152, cy: 208, r: 2, delay: 0.5 },
    { cx: 178, cy: 213, r: 2.5, delay: 0.8 },
];

const GhanaBasketSVG = ({ scene = 5, idSuffix = 'a', isMobile = false, className = '' }) => {
    const p = (id) => `${id}_${idSuffix}`;
    const particles = isMobile ? GARI_PARTICLES_MOBILE : GARI_PARTICLES;

    return (
        <svg
            viewBox="0 0 340 360"
            className={`ghana-svg ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                {/* ── Filters ── */}
                <filter id={p('glow')} x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id={p('softglow')} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id={p('shadow')} x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.25)" />
                </filter>

                {/* ── Gradients ── */}
                {/* Kente basket — warm straw base */}
                <linearGradient id={p('basketBody')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4a843" />
                    <stop offset="40%" stopColor="#c49a35" />
                    <stop offset="100%" stopColor="#a07828" />
                </linearGradient>
                <linearGradient id={p('basketRim')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8c060" />
                    <stop offset="100%" stopColor="#b8882a" />
                </linearGradient>
                {/* Marble surface */}
                <linearGradient id={p('marble')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f8f8f8" />
                    <stop offset="100%" stopColor="#e8e8e8" />
                </linearGradient>
                {/* Palm oil — deep red-orange */}
                <linearGradient id={p('palm')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c0392b" />
                    <stop offset="50%" stopColor="#e74c3c" />
                    <stop offset="100%" stopColor="#922b21" />
                </linearGradient>
                {/* Palm bottle glass */}
                <linearGradient id={p('palmBottle')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="30%" stopColor="#A0522D" />
                    <stop offset="70%" stopColor="#6B3410" />
                    <stop offset="100%" stopColor="#4a2008" />
                </linearGradient>
                {/* Coconut oil — clear glass */}
                <linearGradient id={p('cocoBottle')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d0e8f0" />
                    <stop offset="40%" stopColor="#e8f4f8" />
                    <stop offset="70%" stopColor="#c0d8e8" />
                    <stop offset="100%" stopColor="#a8c8d8" />
                </linearGradient>
                <linearGradient id={p('cocoLiquid')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(220,240,248,0.8)" />
                </linearGradient>
                {/* Gari bottle — amber brown */}
                <linearGradient id={p('gariBottle')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7B4F1A" />
                    <stop offset="35%" stopColor="#9B6A2A" />
                    <stop offset="65%" stopColor="#6B4015" />
                    <stop offset="100%" stopColor="#4a2a08" />
                </linearGradient>
                {/* Inner glow */}
                <radialGradient id={p('innerGlow')} cx="50%" cy="70%" r="55%">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </radialGradient>

                {/* ── Clip paths ── */}
                <clipPath id={p('basketClip')}>
                    {/* Wide bowl shape */}
                    <ellipse cx="170" cy="268" rx="118" ry="22" />
                </clipPath>
                <clipPath id={p('basketBodyClip')}>
                    <path d="M52 248 Q170 238 288 248 L272 318 Q170 328 68 318 Z" />
                </clipPath>
            </defs>

            {/* ══ MARBLE SURFACE ══ */}
            <ellipse cx="170" cy="338" rx="130" ry="14" fill="url(#marble_a)" opacity="0.4" />
            <rect x="40" y="330" width="260" height="20" rx="4" fill="url(#marble_a)" opacity="0.25" />

            {/* ══ GROUND SHADOW ══ */}
            <ellipse cx="170" cy="334" rx="110" ry="10"
                fill="#0f9f57" opacity="0.1"
                className={scene >= 5 ? 'ghana-shadow-breath' : ''} />

            {/* ══ KENTE BOWL BASKET ══ */}
            <g className={`ghana-basket${scene >= 1 ? ' ghana-basket--in' : ''}`}>
                {/* Bowl body */}
                <path d="M52 248 Q170 238 288 248 L272 318 Q170 328 68 318 Z"
                    fill="url(#basketBody_a)" />

                {/* ── Kente pattern bands ── */}
                {/* Band 1 — red */}
                <path d="M58 258 Q170 250 282 258 L278 268 Q170 260 62 268 Z" fill="#c0392b" opacity="0.75" />
                {/* Band 2 — green */}
                <path d="M62 270 Q170 262 278 270 L274 280 Q170 272 66 280 Z" fill="#27ae60" opacity="0.75" />
                {/* Band 3 — blue */}
                <path d="M65 282 Q170 274 275 282 L271 292 Q170 284 69 292 Z" fill="#2980b9" opacity="0.75" />
                {/* Band 4 — yellow */}
                <path d="M68 294 Q170 286 272 294 L268 304 Q170 296 72 304 Z" fill="#f39c12" opacity="0.75" />
                {/* Band 5 — red again */}
                <path d="M70 306 Q170 298 270 306 L266 316 Q170 308 74 316 Z" fill="#c0392b" opacity="0.65" />

                {/* Kente diamond/zigzag overlays */}
                {[80, 110, 140, 170, 200, 230, 260].map((x, i) => (
                    <g key={x}>
                        <polygon
                            points={`${x},258 ${x + 8},268 ${x},278 ${x - 8},268`}
                            fill={['#f1c40f', '#e74c3c', '#27ae60', '#3498db', '#f39c12', '#9b59b6', '#e74c3c'][i]}
                            opacity="0.6"
                        />
                    </g>
                ))}

                {/* Vertical weave ribs */}
                {[75, 100, 125, 150, 170, 190, 215, 240, 265].map((x, i) => (
                    <line key={x}
                        x1={x} y1={250}
                        x2={x + (i < 4 ? -4 : i > 4 ? 4 : 0)} y2={316}
                        stroke="rgba(0,0,0,0.12)" strokeWidth="1"
                    />
                ))}

                {/* Rim — thick coil */}
                <path d="M50 248 Q170 236 290 248"
                    fill="none" stroke="url(#basketRim_a)" strokeWidth="10" strokeLinecap="round" />
                {/* Rim highlight */}
                <path d="M56 245 Q170 234 284 245"
                    fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
                {/* Rim shadow */}
                <path d="M56 252 Q170 242 284 252"
                    fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* ══ INNER GLOW (scene 4+) ══ */}
            {scene >= 4 && (
                <g clipPath={`url(#${p('basketBodyClip')})`}>
                    <ellipse cx="170" cy="285" rx="100" ry="35"
                        fill={`url(#${p('innerGlow')})`} className="ghana-inner-glow" />
                </g>
            )}

            {/* ══ BASKET FILL CONTENTS (scene 4+) ══ */}
            <g clipPath={`url(#${p('basketBodyClip')})`}
                className={scene >= 4 ? 'ghana-fill-in' : ''} opacity="0">
                {/* Gari grains — left third */}
                {[...Array(isMobile ? 14 : 22)].map((_, i) => (
                    <circle key={i}
                        cx={72 + (i % 8) * 14}
                        cy={268 + Math.floor(i / 8) * 12}
                        r={3} fill="#f0c040" opacity="0.8" />
                ))}
                {/* Palm oil pool — centre */}
                <ellipse cx="170" cy="285" rx="42" ry="14" fill="#c0392b" opacity="0.55" />
                <ellipse cx="170" cy="282" rx="38" ry="10" fill="#e74c3c" opacity="0.35" />
                {/* Coconut oil pool — right */}
                <ellipse cx="240" cy="280" rx="30" ry="10" fill="rgba(220,240,248,0.7)" />
            </g>

            {/* ══ GARI BOTTLE — top-left, tilted ~45° right ══ */}
            <g className={`ghana-gari-bottle${scene >= 2 ? ' ghana-gari--in' : ''}${scene === 3 ? ' ghana-gari--tilt' : ''}`}
                style={{ transformOrigin: '95px 160px' }}>
                {/* Bottle body — amber brown */}
                <rect x="72" y="80" width="28" height="90" rx="8" fill={`url(#${p('gariBottle')})`} />
                {/* Liquid inside */}
                <rect x="75" y="100" width="22" height="65" rx="5"
                    fill="#d4a843" opacity="0.6"
                    className={scene >= 2 ? 'ghana-liquid-rise' : ''}
                    style={{ transformOrigin: '86px 165px' }} />
                {/* Bottle neck */}
                <rect x="79" y="66" width="14" height="18" rx="4" fill={`url(#${p('gariBottle')})`} />
                {/* Cap */}
                <rect x="77" y="58" width="18" height="12" rx="5" fill="#8B6914" />
                {/* Label */}
                <rect x="74" y="108" width="24" height="32" rx="4" fill="rgba(255,245,200,0.85)" />
                <text x="86" y="120" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#5a3a00">GARI</text>
                <text x="86" y="128" textAnchor="middle" fontSize="4" fill="#7a5a10">Premium</text>
                <circle cx="86" cy="136" r="6" fill="none" stroke="#c8a020" strokeWidth="1.5" />
                <text x="86" y="139" textAnchor="middle" fontSize="4" fill="#c8a020">FB</text>
                {/* Shine */}
                <rect x="75" y="84" width="5" height="30" rx="2.5" fill="rgba(255,255,255,0.25)" />
                {/* Gari grain pour stream */}
                <path d="M86 170 Q100 195 118 220 Q130 238 148 248"
                    fill="none" stroke="#d4a843" strokeWidth="4"
                    strokeLinecap="round" opacity="0.7"
                    className={scene === 3 ? 'ghana-stream-draw' : ''}
                    style={{ '--sd': 120 }} />
            </g>

            {/* ══ GARI PARTICLES (scene 3) ══ */}
            {scene >= 3 && particles.map((p2, i) => (
                <circle key={i}
                    cx={p2.x + 30} cy={175} r={p2.r}
                    fill="#d4a843"
                    className="ghana-particle"
                    style={{
                        animationDelay: `${p2.delay}s`,
                        animationDuration: `${p2.dur}s`,
                        '--pdx': `${p2.dx + 30}px`,
                        '--pdy': '75px',
                        willChange: 'transform, opacity',
                    }} />
            ))}

            {/* ══ PALM OIL BOTTLE — top-centre, tilted ~30° forward ══ */}
            <g className={`ghana-palm-bottle${scene >= 2 ? ' ghana-palm--in' : ''}${scene === 3 ? ' ghana-palm--tilt' : ''}`}
                style={{ transformOrigin: '170px 155px' }}>
                {/* Bottle body — dark amber/brown glass */}
                <rect x="152" y="60" width="36" height="100" rx="10" fill={`url(#${p('palmBottle')})`} />
                {/* Palm oil liquid */}
                <rect x="155" y="82" width="30" height="72" rx="7"
                    fill={`url(#${p('palm')})`} opacity="0.85"
                    className={scene >= 2 ? 'ghana-liquid-rise' : ''}
                    style={{ transformOrigin: '170px 154px' }} />
                {/* Bottle neck */}
                <rect x="160" y="44" width="20" height="20" rx="5" fill={`url(#${p('palmBottle')})`} />
                {/* Cap — gold */}
                <rect x="158" y="36" width="24" height="12" rx="5" fill="#c8a020" />
                <rect x="160" y="38" width="20" height="8" rx="3" fill="#e8c040" />
                {/* Label */}
                <rect x="154" y="90" width="32" height="36" rx="5" fill="rgba(255,245,220,0.9)" />
                <text x="170" y="103" textAnchor="middle" fontSize="6" fontWeight="900" fill="#8B0000">PALM</text>
                <text x="170" y="112" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#8B0000">OIL</text>
                <text x="170" y="120" textAnchor="middle" fontSize="3.5" fill="#a04020">Fresh Basket</text>
                {/* Shine */}
                <rect x="155" y="65" width="7" height="35" rx="3.5" fill="rgba(255,255,255,0.2)" />
                {/* Palm oil pour stream — thick red */}
                <path d="M170 160 Q170 185 170 210 Q170 232 170 248"
                    fill="none" stroke="#c0392b" strokeWidth="8"
                    strokeLinecap="round" opacity="0.8"
                    className={scene === 3 ? 'ghana-stream-draw ghana-stream-palm' : ''}
                    style={{ '--sd': 100 }} />
                {/* Stream highlight */}
                <path d="M167 160 Q167 185 167 210 Q167 232 167 248"
                    fill="none" stroke="rgba(231,76,60,0.5)" strokeWidth="3"
                    strokeLinecap="round"
                    className={scene === 3 ? 'ghana-stream-draw ghana-stream-palm' : ''}
                    style={{ '--sd': 100 }} />
            </g>

            {/* ══ COCONUT OIL BOTTLE — top-right, tilted ~45° left ══ */}
            <g className={`ghana-coco-bottle${scene >= 2 ? ' ghana-coco--in' : ''}${scene === 3 ? ' ghana-coco--tilt' : ''}`}
                style={{ transformOrigin: '248px 160px' }}>
                {/* Bottle body — clear glass */}
                <rect x="230" y="78" width="30" height="92" rx="9" fill={`url(#${p('cocoBottle')})`} />
                {/* Coconut oil liquid — near-clear */}
                <rect x="233" y="98" width="24" height="66" rx="6"
                    fill={`url(#${p('cocoLiquid')})`} opacity="0.75"
                    className={scene >= 2 ? 'ghana-liquid-rise' : ''}
                    style={{ transformOrigin: '245px 164px', animationDelay: '0.25s' }} />
                {/* Bottle neck */}
                <rect x="237" y="62" width="16" height="20" rx="4" fill={`url(#${p('cocoBottle')})`} />
                {/* Cap — green */}
                <rect x="235" y="54" width="20" height="12" rx="5" fill="#27ae60" />
                <rect x="237" y="56" width="16" height="8" rx="3" fill="#2ecc71" />
                {/* Label */}
                <rect x="232" y="106" width="26" height="34" rx="4" fill="rgba(240,255,248,0.9)" />
                <text x="245" y="117" textAnchor="middle" fontSize="4.2" fontWeight="900" fill="#1a5c35">COCONUT</text>
                <text x="245" y="125" textAnchor="middle" fontSize="5" fontWeight="900" fill="#1a5c35">OIL</text>
                <text x="245" y="133" textAnchor="middle" fontSize="3.5" fill="#27ae60">Pure</text>
                {/* Glass shine */}
                <rect x="233" y="82" width="5" height="28" rx="2.5" fill="rgba(255,255,255,0.45)" />
                {/* Coconut oil pour stream — clear/white */}
                <path d="M245 170 Q232 195 210 220 Q196 236 192 248"
                    fill="none" stroke="rgba(200,235,248,0.9)" strokeWidth="7"
                    strokeLinecap="round"
                    className={scene === 3 ? 'ghana-stream-draw ghana-stream-coco' : ''}
                    style={{ '--sd': 120 }} />
                <path d="M245 170 Q232 195 210 220 Q196 236 192 248"
                    fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3"
                    strokeLinecap="round"
                    className={scene === 3 ? 'ghana-stream-draw ghana-stream-coco' : ''}
                    style={{ '--sd': 120 }} />
            </g>

            {/* ══ SPARKLES (scene 4+) ══ */}
            {scene >= 4 && SPARKLES.map((s, i) => (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r}
                    fill="#4ade80"
                    className="ghana-sparkle"
                    style={{ animationDelay: `${s.delay}s` }}
                    filter={`url(#${p('softglow')})`} />
            ))}
        </svg>
    );
};

export default GhanaBasketSVG;
