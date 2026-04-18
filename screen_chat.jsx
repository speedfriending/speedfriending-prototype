/* global React, HC, H_StatusBarLight, H_PERSONAS, H_PersonaAvatar */
// Chat — to skjermer: oversikt og en-til-en detalj.
// Bruker personas_registry for avatarer og meldingshistorikk.
// Nav-prop forventes fra Prototype: nav.push(screenId, params).

// --- Felles byggeklosser ---------------------------------------------------

function CaveatFontLoader() {
  React.useEffect(() => {
    const id = 'caveat-font-link';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
}

function UnreadBadge({ count }) {
  if (!count) return null;
  return (
    <div style={{
      minWidth: 18, height: 18, borderRadius: 9,
      background: HC.coral, color: '#FFF3E0',
      fontSize: 10.5, fontWeight: 700,
      padding: '0 6px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 1px 4px ${HC.coral}55`,
    }}>{count}</div>
  );
}

function ReactionChip({ emoji, count = 1 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 7px', borderRadius: 11,
      background: HC.card, border: `1px solid ${HC.divider}`,
      fontSize: 11, lineHeight: 1,
      boxShadow: `0 1px 3px rgba(42,33,52,.06)`,
    }}>
      <span style={{ fontSize: 11 }}>{emoji}</span>
      {count > 1 && <span style={{ color: HC.fgDim, fontWeight: 600 }}>{count}</span>}
    </div>
  );
}

const REACTION_MAP = {
  heart: '\u2764\uFE0F',
  laugh: '\uD83D\uDE02',
  fire: '\uD83D\uDD25',
  thumbs: '\uD83D\uDC4D',
  party: '\uD83C\uDF89',
};

// --- Skjerm 1: Chat-oversikt ----------------------------------------------

function ScreenChatList({ nav, onOpenChat, onOpenFrida }) {
  const openPersona = (id) => {
    if (nav && typeof nav.push === 'function') {
      nav.push('chat-detail', { personaId: id });
    } else if (id === 'frida' && onOpenFrida) {
      onOpenFrida();
    } else if (onOpenChat) {
      onOpenChat(id);
    }
  };

  // Rekkefolge: Frida forst, deretter 11 andre
  const order = ['frida', 'kari', 'anja', 'erik', 'siri', 'magnus', 'thomas', 'linnea', 'ola', 'ida', 'jonas', 'marte'];

  // Syntetiske uleste: ikke alle
  const unread = { kari: 1, anja: 2, siri: 1, jonas: 3, frida: 1 };
  // Syntetisk tid ved siden av forhandsvisning
  const times = {
    frida: '09:14', kari: '22:08', anja: '20:18', erik: 'I gar', siri: '16:53',
    magnus: 'Man', thomas: '21:06', linnea: 'Ma', ola: 'Tor', ida: '12:13',
    jonas: '13:31', marte: '11:15',
  };

  const renderRow = (id) => {
    const p = H_PERSONAS[id];
    if (!p) return null;
    const isFrida = id === 'frida';
    const u = unread[id] || 0;
    return (
      <button
        key={id}
        onClick={() => openPersona(id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 13,
          width: '100%', padding: '12px 22px', border: 'none',
          background: 'transparent', cursor: 'pointer', textAlign: 'left',
          transition: 'background .15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(127,77,149,0.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <H_PersonaAvatar id={id} size={46} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontWeight: 700, color: HC.fg,
              fontFamily: isFrida ? "'Caveat', cursive" : 'inherit',
              fontSize: isFrida ? 20 : 14.5,
              lineHeight: isFrida ? 1 : 'inherit',
            }}>
              {isFrida ? 'Frida' : `${p.firstName} ${p.lastName}`.trim()}
            </span>
            {!isFrida && (
              <span style={{ fontSize: 10.5, color: HC.fgFaint, fontWeight: 500 }}>
                {p.age} . {p.bydel}
              </span>
            )}
            <span style={{
              marginLeft: 'auto', fontSize: 10.5,
              color: u ? HC.coral : HC.fgFaint,
              fontWeight: u ? 600 : 500,
            }}>
              {times[id] || ''}
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginTop: 3,
          }}>
            <span style={{
              flex: 1, minWidth: 0, overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              fontSize: 12.5,
              color: u ? HC.fg : HC.fgDim,
              fontWeight: u ? 500 : 400,
              lineHeight: 1.3,
              fontStyle: p.chatPreview === 'skriver...' ? 'italic' : 'normal',
            }}>
              {p.chatPreview}
            </span>
            {u > 0 && <UnreadBadge count={u} />}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: HC.bg }}>
      <CaveatFontLoader />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <H_StatusBarLight time="14:23" />

        <div style={{
          padding: '18px 22px 10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h1 style={{
            margin: 0, fontSize: 26, fontWeight: 700,
            letterSpacing: '-0.02em', color: HC.fg,
            fontFamily: "'Fraunces', Georgia, serif",
          }}>
            Samtaler
          </h1>
          <button style={{
            width: 38, height: 38, borderRadius: 19, border: 'none',
            background: HC.card, boxShadow: '0 1px 4px rgba(42,33,52,.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5.5" fill="none" stroke={HC.fgDim} strokeWidth="1.5" />
              <path d="M11 11l3.2 3.2" stroke={HC.fgDim} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

          {/* Frida-seksjon med plum-aksent */}
          <div style={{
            margin: '6px 16px 6px',
            borderRadius: 16,
            background: `linear-gradient(135deg, ${HC.plum}10, ${HC.lilac}18)`,
            border: `1px solid ${HC.plum}25`,
            overflow: 'hidden',
          }}>
            {renderRow('frida')}
          </div>

          <div style={{ padding: '10px 22px 4px' }}>
            <div style={{
              fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em',
              textTransform: 'uppercase', color: HC.plum,
            }}>
              Kontakter
            </div>
          </div>

          {order.filter(id => id !== 'frida').map(renderRow)}

        </div>
      </div>
    </div>
  );
}

// --- Skjerm 2: Chat-detalj ------------------------------------------------

function MessageBubble({ from, text, time, showTime, reaction }) {
  const mine = from === 'me';
  return (
    <div style={{
      display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start',
      padding: '2px 22px',
    }}>
      <div style={{
        maxWidth: '78%', display: 'flex', flexDirection: 'column',
        alignItems: mine ? 'flex-end' : 'flex-start',
        position: 'relative',
      }}>
        <div style={{
          padding: '9px 14px',
          borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: mine ? HC.plum : HC.card,
          color: mine ? '#FFF3E0' : HC.fg,
          fontSize: 14.5, lineHeight: 1.42,
          boxShadow: mine ? `0 2px 8px ${HC.plum}30` : '0 1px 3px rgba(42,33,52,.05)',
          border: mine ? 'none' : `1px solid ${HC.divider}`,
          position: 'relative',
        }}>
          {text}
        </div>
        {reaction && REACTION_MAP[reaction] && (
          <div style={{
            marginTop: -8,
            marginLeft: mine ? 0 : 10,
            marginRight: mine ? 10 : 0,
            alignSelf: mine ? 'flex-end' : 'flex-start',
          }}>
            <ReactionChip emoji={REACTION_MAP[reaction]} />
          </div>
        )}
        {showTime && (
          <div style={{
            fontSize: 10.5, color: HC.fgFaint,
            marginTop: reaction ? 6 : 3, padding: '0 4px',
          }}>
            {time}
          </div>
        )}
      </div>
    </div>
  );
}

function DayMarker({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 22px 8px' }}>
      <div style={{ flex: 1, height: 1, background: HC.divider }} />
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase', color: HC.fgFaint,
      }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 1, background: HC.divider }} />
    </div>
  );
}

function EmojiTray({ onPick }) {
  const emojis = ['\uD83D\uDE00', '\uD83D\uDE0D', '\uD83E\uDD70', '\uD83D\uDE02', '\u2764\uFE0F', '\uD83D\uDD25', '\uD83D\uDC4D', '\uD83C\uDF89', '\uD83D\uDE4C', '\uD83D\uDC40', '\u2728', '\uD83C\uDF7B', '\uD83C\uDF77', '\uD83C\uDF55', '\uD83C\uDFB5', '\uD83C\uDFBE'];
  return (
    <div style={{
      padding: '10px 16px 14px',
      borderTop: `1px solid ${HC.divider}`,
      background: HC.card,
    }}>
      <div style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase', color: HC.fgFaint, marginBottom: 8,
      }}>
        Emoji
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4,
      }}>
        {emojis.map((e, i) => (
          <button
            key={i}
            onClick={() => onPick && onPick(e)}
            style={{
              fontSize: 22, padding: '6px 0', border: 'none',
              background: 'transparent', cursor: 'pointer',
              borderRadius: 8,
            }}
            onMouseEnter={(el) => { el.currentTarget.style.background = HC.bg; }}
            onMouseLeave={(el) => { el.currentTarget.style.background = 'transparent'; }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

function StickerPanel() {
  const stickers = [
    { bg: `linear-gradient(135deg, ${HC.coral}, ${HC.plum})`, label: 'Hei' },
    { bg: `linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`, label: 'Oslo' },
    { bg: `linear-gradient(135deg, ${HC.amber}, ${HC.coral})`, label: 'Kaffe?' },
    { bg: `linear-gradient(135deg, ${HC.green}, #1F5A3C)`, label: 'Pa tur' },
    { bg: `linear-gradient(135deg, #C78BA6, ${HC.plum})`, label: 'Tusen takk' },
    { bg: `linear-gradient(135deg, ${HC.coralSoft}, ${HC.coralDeep})`, label: 'Solgt' },
  ];
  return (
    <div style={{
      padding: '10px 16px 14px',
      borderTop: `1px solid ${HC.divider}`,
      background: HC.card,
    }}>
      <div style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase', color: HC.plum, marginBottom: 8,
      }}>
        Klistremerker fra Speedfriending
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
      }}>
        {stickers.map((s, i) => (
          <div key={i} style={{
            aspectRatio: '1 / 1',
            borderRadius: 14,
            background: s.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFF3E0', fontWeight: 700,
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(42,33,52,.12)',
          }}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function InputBar({ value, onChange, onSend, tray, onToggleTray }) {
  return (
    <div>
      <div style={{
        padding: '10px 14px 12px',
        borderTop: `1px solid ${HC.divider}`,
        background: 'rgba(255,255,255,.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <button
          onClick={() => onToggleTray('emoji')}
          title="Emoji"
          style={{
            width: 34, height: 34, borderRadius: 17, border: 'none',
            background: tray === 'emoji' ? `${HC.plum}18` : 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="none" stroke={HC.fgDim} strokeWidth="1.5" />
            <circle cx="7.5" cy="8.5" r="1" fill={HC.fgDim} />
            <circle cx="12.5" cy="8.5" r="1" fill={HC.fgDim} />
            <path d="M7 12.5c.8 1.2 2 2 3 2s2.2-.8 3-2" stroke={HC.fgDim} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => onToggleTray('sticker')}
          title="Klistremerker"
          style={{
            width: 34, height: 34, borderRadius: 17, border: 'none',
            background: tray === 'sticker' ? `${HC.plum}18` : 'transparent',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="19" height="19" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h9l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" fill="none" stroke={HC.fgDim} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M13 3v4h4" fill="none" stroke={HC.fgDim} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          title="GIF"
          style={{
            height: 28, padding: '0 8px', borderRadius: 14,
            border: `1.5px solid ${HC.fgDim}`,
            background: 'transparent', cursor: 'pointer',
            fontSize: 10.5, fontWeight: 800, color: HC.fgDim,
            letterSpacing: '.06em',
          }}
        >
          GIF
        </button>
        <div style={{
          flex: 1,
          background: HC.card, borderRadius: 20,
          padding: '8px 14px',
          border: `1px solid ${HC.divider}`,
          fontSize: 13.5,
          color: value ? HC.fg : HC.fgDim,
          minHeight: 20,
          display: 'flex', alignItems: 'center',
        }}>
          {value || 'Skriv en melding'}
        </div>
        <button
          title="Kamera"
          style={{
            width: 34, height: 34, borderRadius: 17, border: 'none',
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <rect x="2" y="5.5" width="16" height="11" rx="2" fill="none" stroke={HC.fgDim} strokeWidth="1.5" />
            <circle cx="10" cy="11" r="3" fill="none" stroke={HC.fgDim} strokeWidth="1.5" />
            <rect x="7" y="3.5" width="6" height="2.4" rx="0.6" fill={HC.fgDim} />
          </svg>
        </button>
        <button
          onClick={onSend}
          style={{
            width: 36, height: 36, borderRadius: 18, border: 'none',
            background: HC.plum, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 2px 8px ${HC.plum}40`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 17 17">
            <path d="M2 8.5L14.5 2.5 11 15l-2.5-5L2 8.5z" fill="#FFF3E0" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ScreenChatDetail({ nav, personaId = 'kari', onBack }) {
  const p = H_PERSONAS[personaId] || H_PERSONAS.kari;
  const [draft, setDraft] = React.useState('');
  const [tray, setTray] = React.useState(null); // null | 'emoji' | 'sticker'
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [personaId]);

  const handleBack = () => {
    if (nav && typeof nav.pop === 'function') nav.pop();
    else if (nav && typeof nav.push === 'function') nav.push('chat');
    else if (onBack) onBack();
  };

  const openVideo = () => {
    if (nav && typeof nav.push === 'function') {
      nav.push('videochat', { personaId });
    }
  };

  const handleEmojiPick = (e) => {
    setDraft(d => d + e);
  };

  const messages = p.messages || [];

  // Grupper meldinger i to "dager" for visuell variasjon
  const cutoff = Math.max(1, messages.length - 3);
  const days = [
    { label: 'I gar', items: messages.slice(0, cutoff) },
    { label: 'I dag', items: messages.slice(cutoff) },
  ].filter(d => d.items.length > 0);

  const fullName = `${p.firstName} ${p.lastName}`.trim();
  const statusText = p.chatPreview === 'skriver...' ? 'skriver...' : (p.isAi ? 'alltid pa' : p.lastSeen);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', background: HC.bg }}>
      <CaveatFontLoader />
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <H_StatusBarLight time="14:23" />

        {/* Topp-bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px 12px',
          borderBottom: `1px solid ${HC.divider}`,
          background: HC.bg,
        }}>
          <button
            onClick={handleBack}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, marginLeft: -6 }}
          >
            <svg width="11" height="18" viewBox="0 0 11 18">
              <path d="M9 2L2 9l7 7" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <H_PersonaAvatar id={personaId} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontWeight: 700, color: HC.fg, lineHeight: 1.1,
              fontFamily: p.isAi ? "'Caveat', cursive" : 'inherit',
              fontSize: p.isAi ? 20 : 15,
            }}>
              {p.isAi ? 'Frida' : fullName}
            </div>
            <div style={{
              fontSize: 11, color: p.isAi ? HC.plum : HC.fgDim, marginTop: 2,
              fontWeight: p.isAi ? 600 : 400,
            }}>
              {statusText}
            </div>
          </div>
          {!p.isAi && (
            <button
              onClick={openVideo}
              title="Videosamtale"
              style={{
                width: 36, height: 36, borderRadius: 18, border: 'none',
                background: 'transparent', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22">
                <rect x="2" y="6" width="13" height="10" rx="2" fill="none" stroke={HC.plum} strokeWidth="1.6" />
                <path d="M15 10l5-3v8l-5-3z" fill={HC.plum} />
              </svg>
            </button>
          )}
          <button style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 6,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle cx="9" cy="3.5" r="1.4" fill={HC.fgDim} />
              <circle cx="9" cy="9" r="1.4" fill={HC.fgDim} />
              <circle cx="9" cy="14.5" r="1.4" fill={HC.fgDim} />
            </svg>
          </button>
        </div>

        {/* Scrollbar innhold */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>

          {!p.isAi && (
            <div style={{ padding: '14px 22px 0' }}>
              <div style={{
                background: HC.cream, borderRadius: 14, padding: '11px 14px',
                border: `1px solid ${HC.divider}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 16, background: `${HC.plum}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="15" height="15" viewBox="0 0 16 16">
                    <circle cx="8" cy="6" r="2.6" fill="none" stroke={HC.plum} strokeWidth="1.4" />
                    <path d="M3 14c.5-2.2 2.6-3.4 5-3.4s4.5 1.2 5 3.4" stroke={HC.plum} strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em',
                    textTransform: 'uppercase', color: HC.plum,
                  }}>
                    {p.bydel} . {p.age} ar
                  </div>
                  <div style={{ fontSize: 12, color: HC.fgDim, marginTop: 2, lineHeight: 1.35 }}>
                    {p.bio}
                  </div>
                </div>
              </div>
            </div>
          )}

          {days.map((d, di) => (
            <React.Fragment key={di}>
              <DayMarker label={d.label} />
              {d.items.map((m, mi) => {
                const next = d.items[mi + 1];
                const showTime = !next || next.from !== m.from;
                return (
                  <MessageBubble
                    key={mi}
                    from={m.from}
                    text={m.text}
                    time={m.time}
                    showTime={showTime}
                    reaction={m.reaction}
                  />
                );
              })}
            </React.Fragment>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 22px 0' }}>
            <span style={{ fontSize: 10.5, color: HC.fgFaint }}>Lest na</span>
          </div>
        </div>

        {/* Trays */}
        {tray === 'emoji' && <EmojiTray onPick={handleEmojiPick} />}
        {tray === 'sticker' && <StickerPanel />}

        {/* Input */}
        <InputBar
          value={draft}
          onChange={setDraft}
          onSend={() => setDraft('')}
          tray={tray}
          onToggleTray={(t) => setTray(cur => cur === t ? null : t)}
        />
      </div>
    </div>
  );
}

Object.assign(window, {
  H_ScreenChatList: ScreenChatList,
  H_ScreenChatDetail: ScreenChatDetail,
});
