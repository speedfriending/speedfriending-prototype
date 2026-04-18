/* global React, HC, H_PERSONAS, H_PersonaAvatar */
// Videosamtale — mock skjerm med live-feel: pulserende gradient-bakgrunn,
// PIP-vindu nede hoyre, kontroll-linje, flytende reaksjoner.

function VideoGradientBg() {
  // Subtil animert gradient som simulerer at personen er i et rom med lys.
  React.useEffect(() => {
    const id = 'videochat-anim-style';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes vchatDrift {
        0%   { background-position: 0% 30%; }
        50%  { background-position: 100% 70%; }
        100% { background-position: 0% 30%; }
      }
      @keyframes vchatFloat {
        0%   { transform: translateY(0) scale(.9); opacity: 0; }
        15%  { opacity: 1; }
        100% { transform: translateY(-220px) scale(1.2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

function FraunceFontLoader() {
  React.useEffect(() => {
    const id = 'fraunces-font-link';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
}

function ControlButton({ onClick, active, danger, size = 52, children, label }) {
  const bg = danger
    ? '#D9443A'
    : active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.18)';
  const color = danger ? '#FFF' : active ? HC.fg : '#FFF';
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: size, height: size, borderRadius: size / 2,
        border: danger ? 'none' : '1px solid rgba(255,255,255,0.2)',
        background: bg,
        color,
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: danger
          ? '0 6px 16px rgba(217,68,58,0.5)'
          : '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'transform .12s',
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.94)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {children}
    </button>
  );
}

function FloatingReaction({ emoji, left, delay }) {
  return (
    <span style={{
      position: 'absolute',
      bottom: 10,
      left,
      fontSize: 34,
      pointerEvents: 'none',
      animation: `vchatFloat 2.2s ease-out ${delay}ms forwards`,
    }}>{emoji}</span>
  );
}

function ScreenVideoChat({ nav, personaId = 'kari', onBack }) {
  const p = H_PERSONAS[personaId] || H_PERSONAS.kari;
  const [muted, setMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  const [reactions, setReactions] = React.useState([]);
  const [timer, setTimer] = React.useState(167); // 02:47
  const reactionIdRef = React.useRef(0);

  // Counter for samtaletid
  React.useEffect(() => {
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  };

  const handleEnd = () => {
    if (nav && typeof nav.pop === 'function') nav.pop();
    else if (nav && typeof nav.push === 'function') nav.push('chat-detail', { personaId });
    else if (onBack) onBack();
  };

  const EMOJIS = ['\u2764\uFE0F', '\uD83D\uDE02', '\uD83D\uDD25', '\uD83D\uDC4D', '\uD83C\uDF89', '\u2728'];

  const triggerReaction = () => {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const id = ++reactionIdRef.current;
    const left = 40 + Math.random() * 60;
    const delay = Math.random() * 120;
    setReactions(rs => [...rs, { id, emoji, left, delay }]);
    setTimeout(() => {
      setReactions(rs => rs.filter(r => r.id !== id));
    }, 2400);
  };

  const fullName = `${p.firstName} ${p.lastName}`.trim();

  return (
    <div style={{
      position: 'relative', height: '100%', overflow: 'hidden',
      background: '#0E0A14',
    }}>
      <VideoGradientBg />
      <FraunceFontLoader />

      {/* "Video-feed" — stor avatar med pulserende gradient-bg */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '75%',
        background: `${p.gradient || `linear-gradient(135deg, ${HC.plum}, ${HC.plumDeep})`}`,
        backgroundSize: '220% 220%',
        animation: 'vchatDrift 14s ease-in-out infinite',
        overflow: 'hidden',
      }}>
        {/* Dekorativ overlay for "rom-feel" */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.35), transparent 60%)',
        }} />

        {/* Navn topp-venstre */}
        <div style={{
          position: 'absolute', top: 52, left: 20,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px 6px 6px',
          background: 'rgba(0,0,0,0.32)',
          borderRadius: 22,
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: 4,
            background: '#6DD68B',
            boxShadow: '0 0 8px #6DD68B',
          }} />
          <span style={{
            color: '#FFF3E0', fontSize: 13, fontWeight: 600,
            letterSpacing: '-0.01em',
          }}>
            {fullName}
          </span>
        </div>

        {/* Timer topp-senter */}
        <div style={{
          position: 'absolute', top: 54, left: '50%',
          transform: 'translateX(-50%)',
          padding: '5px 12px',
          background: 'rgba(0,0,0,0.32)',
          borderRadius: 14,
          backdropFilter: 'blur(8px)',
          color: '#FFF3E0',
          fontSize: 12.5, fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '.04em',
        }}>
          {formatTime(timer)}
        </div>

        {/* Meny-knapp topp-hoyre */}
        <button
          onClick={handleEnd}
          style={{
            position: 'absolute', top: 50, right: 18,
            width: 32, height: 32, borderRadius: 16,
            background: 'rgba(0,0,0,0.32)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
          title="Minimer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 3l8 8M11 3l-8 8" stroke="#FFF3E0" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Avataren stor i midten */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>
          {videoOff ? (
            <div style={{
              width: 180, height: 180, borderRadius: 90,
              background: 'rgba(0,0,0,0.35)',
              border: '2px solid rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFF3E0', fontSize: 14, fontWeight: 600,
            }}>
              Kamera av
            </div>
          ) : (
            <div style={{
              borderRadius: 110,
              boxShadow: '0 10px 40px rgba(0,0,0,0.35), 0 0 0 3px rgba(255,255,255,0.12)',
            }}>
              <H_PersonaAvatar id={personaId} size={200} />
            </div>
          )}
          <div style={{
            color: '#FFF3E0', opacity: 0.88,
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 22, fontWeight: 500,
            letterSpacing: '-0.01em',
          }}>
            {fullName}
          </div>
          <div style={{
            color: '#FFF3E0', opacity: 0.58,
            fontSize: 12, fontWeight: 500,
            letterSpacing: '.04em',
          }}>
            {p.bydel}
          </div>
        </div>

        {/* PIP — din egen video */}
        <div style={{
          position: 'absolute', right: 16, bottom: 16,
          width: 92, height: 120, borderRadius: 16,
          background: `linear-gradient(135deg, ${HC.plum}, ${HC.plumDeep})`,
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
          border: '2px solid rgba(255,255,255,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: `linear-gradient(135deg, ${HC.coral}, ${HC.coralDeep})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFF3E0', fontSize: 24, fontWeight: 700,
            fontFamily: "'Fraunces', Georgia, serif",
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            V
          </div>
          <div style={{
            position: 'absolute', bottom: 4, left: 0, right: 0,
            textAlign: 'center', fontSize: 9.5,
            color: '#FFF3E0', opacity: 0.75, fontWeight: 600,
            letterSpacing: '.06em',
          }}>
            DEG
          </div>
        </div>
      </div>

      {/* Kontroll-linje */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '25%',
        background: 'linear-gradient(180deg, rgba(14,10,20,0.92), #0E0A14)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 20px 28px',
      }}>
        {/* Flytende reaksjoner laget over kontrollene */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          height: '100%', pointerEvents: 'none', overflow: 'hidden',
        }}>
          {reactions.map(r => (
            <FloatingReaction key={r.id} emoji={r.emoji} left={`${r.left}%`} delay={r.delay} />
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          position: 'relative', zIndex: 2,
        }}>
          <ControlButton
            onClick={() => setMuted(m => !m)}
            active={muted}
            label="Mikrofon"
          >
            {muted ? (
              <svg width="22" height="22" viewBox="0 0 22 22">
                <path d="M4 4l14 14" stroke={muted ? HC.fg : '#FFF'} strokeWidth="2" strokeLinecap="round" />
                <rect x="8" y="3" width="6" height="11" rx="3" fill={muted ? HC.fg : '#FFF'} />
                <path d="M5 10.5a6 6 0 0012 0" stroke={muted ? HC.fg : '#FFF'} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22">
                <rect x="8" y="3" width="6" height="11" rx="3" fill="#FFF" />
                <path d="M5 10.5a6 6 0 0012 0" stroke="#FFF" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M11 17v2" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </ControlButton>

          <ControlButton
            onClick={() => setVideoOff(v => !v)}
            active={videoOff}
            label="Kamera"
          >
            <svg width="22" height="22" viewBox="0 0 22 22">
              <rect x="3" y="6" width="12" height="10" rx="2" fill="none" stroke={videoOff ? HC.fg : '#FFF'} strokeWidth="1.8" />
              <path d="M15 10.5l4-2.5v6l-4-2.5z" fill={videoOff ? HC.fg : '#FFF'} />
              {videoOff && <path d="M3 3l16 16" stroke={HC.fg} strokeWidth="2" strokeLinecap="round" />}
            </svg>
          </ControlButton>

          <ControlButton onClick={handleEnd} danger size={64} label="Avslutt">
            <svg width="26" height="26" viewBox="0 0 26 26">
              <path d="M4 15c3-3 9-5 15-3 3 1 3 3 2 5l-2 2-3-2v-3c-3-1-6-1-9 0v3l-3 2-2-2c-1-1-1-2 2-2z" fill="#FFF" transform="rotate(135 13 13)" />
            </svg>
          </ControlButton>

          <ControlButton label="Snu kamera">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path d="M4 8a5 5 0 019-3M18 14a5 5 0 01-9 3" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M4 5v3h3M18 17v-3h-3" stroke="#FFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ControlButton>

          <ControlButton onClick={triggerReaction} label="Reaksjon">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path d="M11 18C6 14 3 11 3 8a4 4 0 017-2.5A4 4 0 0117 8c0 3-3 6-6 10z"
                fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { H_ScreenVideoChat: ScreenVideoChat });
