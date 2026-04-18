/* global React, HC, H_StatusBarLight */
// Ekstra profilskjermer — bygges på toppen av screen_you.jsx
// 1) Profil-offentlig (slik andre ser deg) — når du trykker på avataren
// 2) Profil-redigering — når du trykker på blyant-ikonet
// 3) Events-historikk — når du trykker på "Events: 14"-boksen

// ============================================================
// Felles små byggeklosser (gjenbrukt mønster fra screen_you.jsx)
// ============================================================

function P_Avatar({ initial = 'V', size = 104, ring = true, bg }) {
  const gradient = bg || 'linear-gradient(135deg,#D4A85C,#8A5A3B)';
  const fontSize = Math.round(size * 0.38);
  const shadow = ring
    ? `0 0 0 3px ${HC.card}, 0 0 0 5px ${HC.coralSoft}, 0 10px 24px rgba(42,33,52,.14)`
    : '0 2px 8px rgba(42,33,52,.1)';
  return (
    <div style={{
      width:size, height:size, borderRadius:size/2, background:gradient,
      display:'flex', alignItems:'center', justifyContent:'center',
      color:'#FFF3E0', fontWeight:700, fontSize, letterSpacing:'-0.01em',
      boxShadow:shadow, flexShrink:0,
    }}>{initial}</div>
  );
}

function P_HeaderNav({ title, onBack, rightAction }) {
  return (
    <div style={{padding:'22px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      {onBack ? (
        <button onClick={onBack} style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M10 2L4 8l6 6" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      ) : <div style={{width:38}}/>}
      <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.fgDim}}>{title}</div>
      {rightAction || <div style={{width:38}}/>}
    </div>
  );
}

// ============================================================
// 1) PROFIL-OFFENTLIG — "slik andre ser deg"
// ============================================================

function ScreenProfilePublic({ nav = {} }) {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:24"/>
        <P_HeaderNav title="Slik andre ser deg" onBack={() => nav.pop?.()}/>

        {/* Varsel-banner */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{background:`${HC.plum}10`, borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{flexShrink:0, color:HC.plum}}><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v4M8 5v.01" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <div style={{fontSize:12, color:HC.fg, lineHeight:1.4}}>
              Slik ser <strong style={{color:HC.plum}}>Kari Bratt</strong> profilen din før dere skal møtes på et event.
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{padding:'28px 28px 0', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <P_Avatar initial="V" size={108} ring={true}/>
          <h1 style={{margin:'18px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg}}>
            Viktor
          </h1>
          <div style={{fontSize:13, color:HC.fgDim, marginTop:4, fontWeight:600}}>
            38 år · Oslo
          </div>
          <p style={{margin:'14px 22px 0', textAlign:'center', fontSize:14, lineHeight:1.55, color:HC.fg, maxWidth:320}}>
            Bygger ting som folk faktisk møtes rundt. Liker kaffe, bøker og rolige samtaler som varer.
          </p>
        </div>

        {/* Hva Kari kan se */}
        <div style={{padding:'28px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Det dere har felles
          </div>
          <div style={{background:HC.card, borderRadius:14, padding:'16px 18px', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, paddingBottom:12, borderBottom:`1px solid ${HC.divider}`}}>
              <div style={{width:34, height:34, borderRadius:10, background:`${HC.coral}18`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{color:HC.coral}}><circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>3 events sammen</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>Sist: Vinkvelden 18. april</div>
              </div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:`1px solid ${HC.divider}`}}>
              <div style={{width:34, height:34, borderRadius:10, background:`${HC.plum}18`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{color:HC.plum}}><path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>2 felles interesser</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>Bøker, rolige samtaler</div>
              </div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:12, paddingTop:12}}>
              <div style={{width:34, height:34, borderRadius:10, background:`${HC.green}18`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{color:HC.green}}><path d="M8 3L3 6v4l5 3 5-3V6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>1 felles kontakt</div>
                <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>Erik Nordli</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interesse-tags */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Det du liker
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {['Kaffe', 'Bøker', 'Rolig tempo', 'Brettspill', 'Vinsmaking', 'Bymarka'].map(tag => (
              <div key={tag} style={{
                padding:'7px 12px', borderRadius:14,
                background: HC.card, border:`1px solid ${HC.divider}`,
                fontSize:12, fontWeight:600, color:HC.fg,
              }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Hva dere kan prøve */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Frida foreslår
          </div>
          <div style={{background:`linear-gradient(135deg, ${HC.lilac}20, ${HC.coral}15)`, borderRadius:14, padding:'16px 18px', border:`1px solid ${HC.plum}22`}}>
            <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, marginBottom:4}}>
              Neste event: Brettspill på Trekroneren
            </div>
            <div style={{fontSize:12, color:HC.fgDim, lineHeight:1.5}}>
              Dere begge har "Brettspill" i profilen. Fredag 19. april, 14 plasser igjen.
            </div>
          </div>
        </div>

        {/* Footer - bekreftelse */}
        <div style={{padding:'24px 24px 14px', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, lineHeight:1.5}}>
            Andre ser aldri adresse, telefonnummer eller full fødselsdato. Bare fornavn + aldersgruppe.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2) PROFIL-REDIGERING
// ============================================================

function P_InputRow({ label, value, placeholder, onPress }) {
  return (
    <button onClick={onPress} style={{
      width:'100%', textAlign:'left', border:'none', background:HC.card,
      padding:'12px 16px', cursor:'pointer', borderRadius:12,
      display:'flex', flexDirection:'column', gap:2,
      boxShadow:'0 1px 6px rgba(42,33,52,.04)',
    }}>
      <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>{label}</div>
      <div style={{fontSize:14, fontWeight:600, color: value ? HC.fg : HC.fgFaint}}>
        {value || placeholder}
      </div>
    </button>
  );
}

function ScreenProfileEdit({ nav = {} }) {
  const [tagState, setTagState] = React.useState({
    'Kaffe': true, 'Bøker': true, 'Rolig tempo': true,
    'Brettspill': true, 'Vinsmaking': true, 'Bymarka': true,
    'Padel': false, 'Jazz': false, 'Fjellturer': false, 'Løping': false,
    'Kunstutstillinger': false, 'Film': false, 'Matkurs': false,
  });
  const toggleTag = (tag) => setTagState(s => ({...s, [tag]: !s[tag]}));

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:25"/>
        <P_HeaderNav
          title="Rediger profil"
          onBack={() => nav.pop?.()}
          rightAction={
            <button onClick={() => nav.pop?.()} style={{
              padding:'8px 14px', borderRadius:18, border:'none',
              background:HC.plum, color:'#fff', fontSize:12.5, fontWeight:700,
              cursor:'pointer',
            }}>
              Lagre
            </button>
          }
        />

        {/* Avatar med endre-knapp */}
        <div style={{padding:'24px 28px 0', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <P_Avatar initial="V" size={104} ring={true}/>
            <button style={{
              position:'absolute', bottom:-4, right:-4,
              width:36, height:36, borderRadius:18,
              background:HC.plum, border:'2px solid #fff',
              boxShadow:'0 4px 12px rgba(127,77,149,.35)',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M10 2l-8 8v2h2l8-8zM9 3l2 2" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div style={{marginTop:10, fontSize:12, color:HC.plum, fontWeight:600}}>
            Trykk for å endre bilde
          </div>
        </div>

        {/* Basis-info */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Om deg
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <P_InputRow label="Fornavn" value="Viktor"/>
            <P_InputRow label="Alder" value="38 år"/>
            <P_InputRow label="Bydel" value="Nordre Aker"/>
            <div style={{background:HC.card, borderRadius:12, padding:'12px 16px', boxShadow:'0 1px 6px rgba(42,33,52,.04)'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgDim}}>
                Bio
              </div>
              <div style={{fontSize:13.5, color:HC.fg, lineHeight:1.5, marginTop:6, fontStyle:'italic'}}>
                "Bygger ting som folk faktisk møtes rundt. Liker kaffe, bøker og rolige samtaler som varer."
              </div>
              <div style={{marginTop:10, fontSize:11, color:HC.fgFaint, display:'flex', justifyContent:'space-between'}}>
                <span>Trykk for å redigere</span>
                <span>112 / 160 tegn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interesser */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
              Interesser
            </div>
            <div style={{fontSize:11, color:HC.fgDim, fontWeight:600}}>
              {Object.values(tagState).filter(Boolean).length} valgt
            </div>
          </div>
          <div style={{fontSize:12, color:HC.fgDim, marginBottom:12, lineHeight:1.5}}>
            Vi bruker disse for å foreslå events og personer du matcher med.
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {Object.entries(tagState).map(([tag, on]) => (
              <button key={tag} onClick={() => toggleTag(tag)} style={{
                padding:'8px 13px', borderRadius:16,
                background: on ? HC.plum : HC.card,
                color: on ? '#fff' : HC.fg,
                border: on ? 'none' : `1px solid ${HC.divider}`,
                fontSize:12.5, fontWeight:600, cursor:'pointer',
                fontFamily:'inherit',
                boxShadow: on ? '0 3px 8px rgba(127,77,149,.25)' : '0 1px 3px rgba(42,33,52,.03)',
                transition:'all .15s',
              }}>{on ? '✓ ' : ''}{tag}</button>
            ))}
          </div>
        </div>

        {/* Samtalestyle */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Samtale-stil
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            {[
              {k:'rolig', label:'Rolig tempo', sub:'Lengre og dypere samtaler'},
              {k:'energisk', label:'Energisk', sub:'Variert og flere emner'},
            ].map(s => (
              <button key={s.k} style={{
                width:'100%', textAlign:'left', padding:'12px 16px', borderRadius:12,
                background: s.k==='rolig' ? `${HC.plum}14` : HC.card,
                border: s.k==='rolig' ? `1.5px solid ${HC.plum}` : `1px solid ${HC.divider}`,
                cursor:'pointer', display:'flex', alignItems:'center', gap:10,
                fontFamily:'inherit',
              }}>
                <div style={{
                  width:18, height:18, borderRadius:9,
                  border: s.k==='rolig' ? `5px solid ${HC.plum}` : `2px solid ${HC.fgFaint}`,
                  background:'#fff', flexShrink:0,
                }}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{s.label}</div>
                  <div style={{fontSize:11.5, color:HC.fgDim, marginTop:1}}>{s.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{height:22}}/>
      </div>
    </div>
  );
}

// ============================================================
// 3) EVENTS-HISTORIKK — alle 14 events du har vært på
// ============================================================

const P_EVENTS_HISTORY = [
  { id:1, dato:'Tor 18. apr', title:'Vinsmaking med Martine', venue:'Søstrene Karlsen', hrs:'2 t 31 min', folk:'Kari, Erik, Anja og 2 til', tint:'#F0826B' },
  { id:2, dato:'Ons 10. apr', title:'Padel-kveld', venue:'Hasle padelbane', hrs:'1 t 45 min', folk:'Kari, Erik', tint:'#7F4D95' },
  { id:3, dato:'Tor 4. apr', title:'Jazzklubb', venue:'Cosmopolite', hrs:'3 t 10 min', folk:'Kari og 4 nye', tint:'#D9A24A' },
  { id:4, dato:'Lør 30. mar', title:'Nordmarka-tur', venue:'Frognerseteren', hrs:'4 t 22 min', folk:'Kari, Anja og 1 til', tint:'#3E8F65' },
  { id:5, dato:'Tor 21. mar', title:'Brettspill', venue:'Bruket', hrs:'2 t 45 min', folk:'Anja, Magnus, 2 nye', tint:'#7F4D95' },
  { id:6, dato:'Lør 16. mar', title:'Kunstomvisning', venue:'Astrup Fearnley', hrs:'1 t 30 min', folk:'Siri og 4 nye', tint:'#B788C9' },
  { id:7, dato:'Fre 8. mar', title:'Kvinnedag-mingle', venue:'Territoriet', hrs:'2 t 55 min', folk:'Kari, Siri, Linnea og 3 til', tint:'#F0826B' },
  { id:8, dato:'Ons 28. feb', title:'Bokklubb — "Wild Problems"', venue:'Bokhandelen Tronsmo', hrs:'2 t 10 min', folk:'Anja, Thomas, 2 nye', tint:'#D9A24A' },
  { id:9, dato:'Tor 22. feb', title:'Matkurs — pasta fra bunn', venue:'Mathallen', hrs:'3 t 0 min', folk:'Erik og 5 nye', tint:'#F0826B' },
  { id:10, dato:'Fre 16. feb', title:'Vinkveld', venue:'Vinslottet', hrs:'2 t 30 min', folk:'Kari, Anja, 3 nye', tint:'#C45A44' },
  { id:11, dato:'Ons 7. feb', title:'Filmkveld — Bergman', venue:'Vega Scene', hrs:'2 t 45 min', folk:'Magnus og 3 nye', tint:'#7F4D95' },
  { id:12, dato:'Lør 3. feb', title:'Vinterbading + badstue', venue:'Sjølyst', hrs:'1 t 45 min', folk:'Erik, Thomas, 4 nye', tint:'#3E8F65' },
  { id:13, dato:'Tor 25. jan', title:'Kaffe & bøker', venue:'Jacobsen og Svart Holmen', hrs:'1 t 40 min', folk:'Marte (første møte)', tint:'#D9A24A' },
  { id:14, dato:'Tor 18. jan', title:'Første event: Tapas & mingle', venue:'Territoriet', hrs:'2 t 20 min', folk:'Kari (første møte!), Jonas, Ida og 3 nye', tint:'#F0826B' },
];

function P_EventRow({ ev, first, last, only }) {
  const borderRadius = only ? 14 : first ? '14px 14px 0 0' : last ? '0 0 14px 14px' : 0;
  return (
    <button style={{
      width:'100%', textAlign:'left', border:'none', background:HC.card,
      padding:'14px 16px', cursor:'pointer',
      borderTop: !first && !only ? `1px solid ${HC.divider}` : 'none',
      borderRadius,
      display:'flex', alignItems:'flex-start', gap:12,
      fontFamily:'inherit',
    }}>
      <div style={{
        width:44, height:44, borderRadius:12, flexShrink:0,
        background:`${ev.tint}18`, color:ev.tint,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        fontSize:10, fontWeight:700, lineHeight:1.15,
      }}>
        <div>{ev.dato.split(' ')[0]}</div>
        <div style={{fontSize:13, marginTop:1}}>{ev.dato.split(' ')[1]}</div>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, lineHeight:1.3}}>{ev.title}</div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:3, lineHeight:1.4}}>
          {ev.venue} · {ev.hrs}
        </div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
          Med: {ev.folk}
        </div>
      </div>
      <svg width="10" height="14" viewBox="0 0 10 14" style={{flexShrink:0, marginTop:4}}><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

function ScreenEventsHistory({ nav = {} }) {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:26"/>
        <P_HeaderNav title="Events du har vært på" onBack={() => nav.pop?.()}/>

        {/* Intro */}
        <div style={{padding:'20px 24px 4px'}}>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            14 events · 3 måneder
          </h1>
          <p style={{margin:'6px 0 0', fontSize:13, lineHeight:1.5, color:HC.fgDim}}>
            Fra første mingle på Territoriet til gårsdagens vinsmaking. 31 timer sammen med andre.
          </p>
        </div>

        {/* Stats-rad */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, display:'flex', alignItems:'center', justifyContent:'space-around', gap:8, textAlign:'center'}}>
            <div>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Totalt</div>
              <div style={{fontSize:16, fontWeight:700, color:HC.fg, marginTop:3, letterSpacing:'-0.01em'}}>31 t 23 min</div>
            </div>
            <div style={{width:1, height:32, background:HC.divider}}/>
            <div>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Snitt</div>
              <div style={{fontSize:16, fontWeight:700, color:HC.fg, marginTop:3, letterSpacing:'-0.01em'}}>2 t 15 min</div>
            </div>
            <div style={{width:1, height:32, background:HC.divider}}/>
            <div>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Ny / kjente</div>
              <div style={{fontSize:16, fontWeight:700, color:HC.fg, marginTop:3, letterSpacing:'-0.01em'}}>25 / 38</div>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div style={{padding:'24px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Kronologisk (nyeste først)
          </div>
          <div style={{borderRadius:14, overflow:'hidden', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
            {P_EVENTS_HISTORY.map((ev, i) => (
              <P_EventRow
                key={ev.id} ev={ev}
                first={i === 0}
                last={i === P_EVENTS_HISTORY.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Første-event-markør */}
        <div style={{padding:'22px 22px 18px', textAlign:'center'}}>
          <div style={{fontSize:11, color:HC.fgFaint, fontWeight:500, lineHeight:1.5}}>
            Du startet 18. januar 2026. Det er <strong>93 dager</strong> med Speedfriending.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EKSPORT
// ============================================================

window.H_ScreenProfilePublic  = ScreenProfilePublic;
window.H_ScreenProfileEdit    = ScreenProfileEdit;
window.H_ScreenEventsHistory  = ScreenEventsHistory;
