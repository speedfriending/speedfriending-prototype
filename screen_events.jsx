/* global React, HC, H_StatusBarLight */
// Events-tab: kommende reserverte + tidligere + kuratert feed-inngang.
// Full interaktivitet: kort klikkbare, søk/filter-knapper navigerer,
// avatar-stack under tittel (overlappende, Facebook Events-stil).

function ScreenEvents({ nav = {} }) {
  const [filter, setFilter] = React.useState('kommende');

  // Oslo-venuer, med attendeeIds som peker på personas i window.H_PERSONAS
  const kommende = [
    {
      id: 1, dato: 'I kveld · 19:00', dateShort: 'I dag',
      title: 'Vinsmaking med Martine', venue: 'Søstrene Karlsen',
      host: 'Martine L.', yourSeat: 3,
      attendeeIds: ['kari','erik','anja','henrik','ingrid','martine'],
      tint: HC.coral, imminent: true,
    },
    {
      id: 2, dato: 'Fre 19. apr · 19:00', dateShort: 'I morgen',
      title: 'Brettspill på Bruket', venue: 'Bruket · Grünerløkka',
      host: 'Henrik A.', yourSeat: null,
      attendeeIds: ['kari','erik','henrik','karina','lars','mia','oskar','tore'],
      tint: HC.plum,
    },
    {
      id: 3, dato: 'Lør 20. apr · 11:00', dateShort: 'Lørdag',
      title: 'Nordmarka-tur', venue: 'Frognerseteren',
      host: 'Ingrid R.', yourSeat: null,
      attendeeIds: ['ingrid','kari','anja','lars','mia'],
      tint: HC.green,
    },
  ];

  const tidligere = [
    { id:10, dato:'Tor 18. apr', title:'Vinkvelden', venue:'Søstrene Karlsen', hrs:'2 t 31 min', folk:'Kari, Erik, Anja og 2 til', attendeeIds:['kari','erik','anja','henrik','martine'] },
    { id:11, dato:'Ons 10. apr', title:'Padel-kveld',  venue:'Hasle padelbane', hrs:'1 t 45 min', folk:'Kari, Erik', attendeeIds:['kari','erik'] },
    { id:12, dato:'Tor 4. apr',  title:'Jazzklubb',    venue:'Cosmopolite',     hrs:'3 t 10 min', folk:'Kari og 4 nye', attendeeIds:['kari','mia','oskar','lars','tore'] },
    { id:13, dato:'Lør 30. mar', title:'Fjelltur',     venue:'Nordmarka',       hrs:'4 t 22 min', folk:'Kari, Anja og 1 til', attendeeIds:['kari','anja','ingrid'] },
  ];

  const openEvent = (eventId) => nav.push?.('event-detail', { eventId });
  const openSearch = () => nav.push?.('search');
  const openFilter = () => nav.push?.('filter');

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="14:31"/>

        <div style={{padding:'20px 24px 0'}}>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Events</div>
          <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
            Dine kvelder
          </h1>
        </div>

        {/* Filter-pills + søk/filter-knapper */}
        <div style={{padding:'18px 24px 0', display:'flex', gap:8, alignItems:'center'}}>
          {[
            { key:'kommende', label:`Kommende · ${kommende.length}` },
            { key:'tidligere', label:`Tidligere · ${tidligere.length}` },
          ].map(f => (
            <button key={f.key} onClick={()=>setFilter(f.key)} style={{
              padding:'8px 14px', borderRadius:18, border:'none',
              background: filter===f.key ? HC.plum : HC.card,
              color: filter===f.key ? '#fff' : HC.fg,
              fontSize:13, fontWeight:600, cursor:'pointer',
              boxShadow: filter===f.key ? '0 4px 12px rgba(127,77,149,.25)' : '0 1px 4px rgba(42,33,52,.04)',
              fontFamily:'inherit',
            }}>{f.label}</button>
          ))}
          <div style={{flex:1}}/>
          <button aria-label="Søk" onClick={openSearch} style={{
            width:32, height:32, borderRadius:16, border:'none',
            background:HC.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.04)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="4" fill="none" stroke={HC.fg} strokeWidth="1.5"/>
              <path d="M9.5 9.5L12 12" stroke={HC.fg} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button aria-label="Filter" onClick={openFilter} style={{
            width:32, height:32, borderRadius:16, border:'none',
            background:HC.card, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 1px 4px rgba(42,33,52,.04)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M2 3h10M4 7h6M5.5 11h3" stroke={HC.fg} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {filter === 'kommende' ? (
          <>
            {/* Kommende events */}
            <div style={{padding:'22px 22px 0', display:'grid', gap:12}}>
              {kommende.map(e => (
                <button key={e.id} onClick={()=>openEvent(e.id)} style={{
                  all:'unset', boxSizing:'border-box', cursor:'pointer', display:'block',
                  background: HC.card, borderRadius:16, overflow:'hidden',
                  boxShadow: e.imminent ? `0 8px 22px ${e.tint}25, 0 0 0 1.5px ${e.tint}` : '0 2px 10px rgba(42,33,52,.06)',
                }}>
                  {/* Topp med dato */}
                  <div style={{padding:'14px 18px 12px', background:`${e.tint}0e`, borderBottom:`1px solid ${HC.divider}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{fontSize:11, fontWeight:700, letterSpacing:'.12em', color:e.tint}}>{e.dato.toUpperCase()}</div>
                    {e.imminent && (
                      <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:12, background:e.tint, color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.06em'}}>
                        <span style={{width:6, height:6, borderRadius:3, background:'#fff', animation:'sf_pulse 1.2s ease-in-out infinite'}}/>
                        SNART
                      </div>
                    )}
                  </div>

                  <div style={{padding:'16px 18px 16px'}}>
                    <div style={{fontSize:16, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{e.title}</div>
                    <div style={{fontSize:12, color:HC.fgDim, marginTop:3}}>{e.venue} · {e.host}</div>

                    {/* Avatar-stack + øvrige meta */}
                    <div style={{display:'flex', alignItems:'center', gap:12, marginTop:12, paddingTop:12, borderTop:`1px dashed ${HC.divider}`}}>
                      <SE_AvatarStack ids={e.attendeeIds} max={5} size={26}/>
                      <div style={{fontSize:11.5, color:HC.fgDim, fontWeight:500}}>
                        {e.attendeeIds.length} kommer
                      </div>
                      <div style={{flex:1}}/>
                      {e.yourSeat && (
                        <div style={{display:'inline-flex', alignItems:'center', gap:5, color:e.tint, fontWeight:700, fontSize:11.5}}>
                          <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="3" width="8" height="7" rx="1" fill="none" stroke={e.tint} strokeWidth="1.3"/><path d="M4 3V2h4v1" fill="none" stroke={e.tint} strokeWidth="1.3"/></svg>
                          Plass #{e.yourSeat}
                        </div>
                      )}
                    </div>

                    {e.imminent && (
                      <div
                        onClick={(ev)=>{ev.stopPropagation(); openEvent(e.id);}}
                        role="button"
                        style={{
                          marginTop:14, width:'100%', padding:'12px', borderRadius:22, border:'none',
                          background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
                          color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
                          boxShadow:`0 6px 16px ${HC.coral}30`,
                          textAlign:'center',
                        }}>
                        Vis QR for ankomst
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Finn flere */}
            <div style={{padding:'22px 22px 30px'}}>
              <button onClick={openSearch} style={{
                width:'100%', padding:'14px 16px', borderRadius:14, border:`1px dashed ${HC.fgFaint}`,
                background:'transparent', display:'flex', alignItems:'center', gap:12, cursor:'pointer',
                fontFamily:'inherit',
              }}>
                <div style={{width:34, height:34, borderRadius:17, background:`${HC.plum}14`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" fill="none" stroke={HC.plum} strokeWidth="1.4"/><path d="M9 9l3 3" stroke={HC.plum} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div style={{flex:1, textAlign:'left'}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Finn flere kvelder</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>4 kuraterte venter i Oppdag</div>
                </div>
                <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgDim} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Tidligere events */}
            <div style={{padding:'22px 22px 0'}}>
              <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
                {tidligere.map((e, i) => (
                  <button key={e.id} onClick={()=>openEvent(e.id)} style={{
                    all:'unset', boxSizing:'border-box', cursor:'pointer', display:'flex',
                    width:'100%', padding:'14px 0',
                    borderBottom: i < tidligere.length-1 ? `1px solid ${HC.divider}` : 'none',
                    gap:14, alignItems:'flex-start',
                  }}>
                    <div style={{width:44, textAlign:'center', flexShrink:0}}>
                      <div style={{fontSize:10, fontWeight:700, letterSpacing:'.08em', color:HC.fgFaint, textTransform:'uppercase'}}>{e.dato.split(' ')[0]}</div>
                      <div style={{fontSize:16, fontWeight:700, color:HC.fg, marginTop:2, lineHeight:1}}>{e.dato.split(' ')[1]}</div>
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{e.title}</div>
                      <div style={{fontSize:11, color:HC.fgDim, marginTop:2}}>{e.venue} · {e.hrs}</div>
                      <div style={{marginTop:8}}>
                        <SE_AvatarStack ids={e.attendeeIds} max={4} size={22}/>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total tid */}
            <div style={{padding:'22px 22px 30px'}}>
              <div style={{background:HC.cream, borderRadius:14, padding:'16px 18px', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Siden januar</div>
                <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:6}}>
                  <div style={{fontSize:28, fontWeight:700, color:HC.fg, letterSpacing:'-0.02em'}}>11 t 48 min</div>
                  <div style={{fontSize:12, color:HC.fgDim}}>med 7 mennesker</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Keyframes-anim */}
        <style>{`
          @keyframes sf_pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        `}</style>
      </div>
    </div>
  );
}

// Overlappende avatar-stack (Facebook Events-stil).
// Bruker window.H_PersonaAvatar hvis lastet, fallback til fargede sirkler m/ initialer.
function SE_AvatarStack({ ids = [], max = 5, size = 26 }) {
  const personas = (typeof window !== 'undefined' && window.H_PERSONAS) || null;
  const Avatar = (typeof window !== 'undefined' && window.H_PersonaAvatar) || null;
  const visible = ids.slice(0, max);
  const extra = Math.max(0, ids.length - max);
  const overlap = Math.round(size * 0.34);

  const fallbackHue = (id) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
    return h;
  };

  const initialFrom = (id) => {
    if (personas && personas[id] && personas[id].name) return personas[id].name.charAt(0).toUpperCase();
    return id.charAt(0).toUpperCase();
  };

  return (
    <div style={{display:'inline-flex', alignItems:'center'}}>
      {visible.map((id, i) => (
        <div key={id} style={{
          width:size, height:size, borderRadius:size/2,
          marginLeft: i === 0 ? 0 : -overlap,
          boxShadow:`0 0 0 2px ${HC.card}`,
          overflow:'hidden',
          background: HC.card,
          position:'relative',
          zIndex: visible.length - i,
        }}>
          {Avatar ? (
            <Avatar id={id} size={size}/>
          ) : (
            <div style={{
              width:'100%', height:'100%',
              background:`linear-gradient(135deg, hsl(${fallbackHue(id)} 55% 60%), hsl(${fallbackHue(id)} 50% 42%))`,
              color:'#FFF3E0', fontWeight:700, fontSize: Math.round(size * 0.42),
              display:'flex', alignItems:'center', justifyContent:'center',
              letterSpacing:'-0.01em',
            }}>{initialFrom(id)}</div>
          )}
        </div>
      ))}
      {extra > 0 && (
        <div style={{
          width:size, height:size, borderRadius:size/2,
          marginLeft: -overlap,
          boxShadow:`0 0 0 2px ${HC.card}`,
          background: HC.bgSoft, color: HC.fg,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize: Math.round(size * 0.38), fontWeight:700,
          zIndex: 0,
        }}>+{extra}</div>
      )}
    </div>
  );
}

window.H_ScreenEvents = ScreenEvents;
