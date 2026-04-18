/* global React, HC, H_StatusBarLight */
// Deg-tab — 4 skjermer for brukerens egen hage:
// 1) Profil-hoved, 2) Dine kontakter (vennskap), 3) Innstillinger, 4) Sosial helse (opt-in).
// Prinsipp: varm voksen tone. Ingen score på førstesiden. Slett-konto er synlig. Ingen "portfolio"-ord.

// ============================================================
// FELLES BYGGEKLOSSER
// ============================================================

function Y_Avatar({ initial = 'V', size = 104, ring = true, bg }) {
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

function Y_HeaderNav({ title, onBack, rightAction }) {
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

function Y_SectionLabel({ children, color }) {
  return (
    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color: color || HC.plum, marginBottom:10}}>
      {children}
    </div>
  );
}

// En "rad" — ikon, tittel, undertekst, chevron. Brukes i snarveier og innstillinger.
function Y_Row({ icon, title, subtitle, tint, onPress, right, danger, first, last, only }) {
  const borderRadius = only ? 14 : first ? '14px 14px 0 0' : last ? '0 0 14px 14px' : 0;
  return (
    <button onClick={onPress} style={{
      width:'100%', textAlign:'left', border:'none', background:HC.card,
      padding:'13px 14px', cursor:'pointer',
      borderTop: !first && !only ? `1px solid ${HC.divider}` : 'none',
      borderRadius,
      display:'flex', alignItems:'center', gap:12,
    }}>
      {icon && (
        <div style={{
          width:34, height:34, borderRadius:10, flexShrink:0,
          background: danger ? `${HC.coralDeep}14` : `${tint || HC.plum}14`,
          color: danger ? HC.coralDeep : (tint || HC.plum),
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {icon}
        </div>
      )}
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:700, color: danger ? HC.coralDeep : HC.fg, lineHeight:1.25}}>{title}</div>
        {subtitle && <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.35}}>{subtitle}</div>}
      </div>
      {right || <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </button>
  );
}

// En gruppe av rader i ett kort.
function Y_RowGroup({ children }) {
  const arr = React.Children.toArray(children);
  const n = arr.length;
  return (
    <div style={{borderRadius:14, overflow:'hidden', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
      {arr.map((c, i) => React.cloneElement(c, {
        first: i === 0 && n > 1,
        last: i === n - 1 && n > 1,
        only: n === 1,
      }))}
    </div>
  );
}

// Ikoner (inline SVG)
const YI = {
  heart: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 14s-5-3-5-7a3 3 0 015-2 3 3 0 015 2c0 4-5 7-5 7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  people: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="6" cy="6" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="11.5" cy="6.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M2 13c0-1.8 1.8-3 4-3s4 1.2 4 3M10 12c.3-1.3 1.8-2 3-2s2.7.7 3 2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  pulse: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h2.5l1.5-4 2 7 1.5-3h4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  gear: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  user: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="6" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M3 14c0-2.5 2.2-4 5-4s5 1.5 5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="4" width="12" height="9" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 5l5.5 4 5.5-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  lock: <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3.5" y="7" width="9" height="7" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>,
  shield: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2l5 1.5v4.5c0 3-2 5.5-5 6-3-.5-5-3-5-6V3.5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  download: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 2v8M4.5 7l3.5 3.5L11.5 7M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trash: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4.5h10M5.5 4.5V3a1 1 0 011-1h3a1 1 0 011 1v1.5M6 7v5M10 7v5M4.5 4.5l.5 9a1 1 0 001 1h4a1 1 0 001-1l.5-9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 11V7.5a4 4 0 018 0V11l1.5 1.5h-11L4 11zM6.5 13.5a1.5 1.5 0 003 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  globe: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>,
  glass: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 3h8l-1 6c0 1.5-1.5 2.5-3 2.5s-3-1-3-2.5L4 3zM8 11.5v2.5M6 14h4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  help: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M6.2 6.5a1.8 1.8 0 013.6 0c0 1.2-1.8 1.3-1.8 2.5M8 11.5v.01" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  info: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v4M8 5v.01" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  pause: <svg width="16" height="16" viewBox="0 0 16 16"><rect x="4.5" y="3.5" width="2.2" height="9" rx=".6" fill="currentColor"/><rect x="9.3" y="3.5" width="2.2" height="9" rx=".6" fill="currentColor"/></svg>,
  chevron: <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ============================================================
// 1) PROFIL-HOVED
// ============================================================

function ScreenProfile({ nav = {} }) {
  const go = (target, params) => nav.push?.(target, params);
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto'}}>
        <H_StatusBarLight time="14:23"/>

        <Y_HeaderNav title="Deg" rightAction={
          <button onClick={() => go('profile-edit')} style={{width:38, height:38, borderRadius:19, background:HC.card, border:'none', boxShadow:'0 2px 8px rgba(42,33,52,.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}} aria-label="Rediger profil">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M10 2l-8 8v2h2l8-8zM9 3l2 2" stroke={HC.fg} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        }/>

        {/* Hero med avatar, navn, bio */}
        <div style={{padding:'28px 28px 0', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <button onClick={() => go('profile-public')} style={{border:'none', background:'transparent', cursor:'pointer', padding:0, borderRadius:52}} aria-label="Se profilen slik andre ser den">
            <Y_Avatar initial="V" size={104} ring={true}/>
          </button>
          <h1 style={{margin:'18px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg}}>
            Viktor Sanden
          </h1>
          <p style={{margin:'6px 22px 0', textAlign:'center', fontSize:13.5, lineHeight:1.5, color:HC.fgDim, maxWidth:310}}>
            Bygger ting som folk faktisk møtes rundt. Liker kaffe, bøker og rolige samtaler som varer.
          </p>
          <button onClick={() => go('profile-public')} style={{marginTop:10, padding:'6px 12px', borderRadius:14, border:`1px solid ${HC.divider}`, background:'transparent', cursor:'pointer', fontSize:11.5, fontWeight:600, color:HC.plum, fontFamily:'inherit'}}>
            Se slik andre ser deg →
          </button>
        </div>

        {/* Vitalstatistikk — klikkbar, hver boks går et sted */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'4px', border:`1px solid ${HC.divider}`, display:'flex', alignItems:'stretch', gap:0}}>
            <div style={{flex:1, padding:'10px 4px', textAlign:'center'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgDim}}>Aktiv siden</div>
              <div style={{fontSize:13.5, fontWeight:700, color:HC.fg, marginTop:3}}>jan 2026</div>
            </div>
            <div style={{width:1, background:HC.divider, margin:'8px 0'}}/>
            <button onClick={() => go('events-history')} style={{flex:1, padding:'10px 4px', textAlign:'center', border:'none', background:'transparent', cursor:'pointer', borderRadius:10, fontFamily:'inherit'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.plum}}>Events ›</div>
              <div style={{fontSize:17, fontWeight:700, color:HC.fg, marginTop:1, letterSpacing:'-0.02em'}}>14</div>
            </button>
            <div style={{width:1, background:HC.divider, margin:'8px 0'}}/>
            <button onClick={() => go('portfolio')} style={{flex:1, padding:'10px 4px', textAlign:'center', border:'none', background:'transparent', cursor:'pointer', borderRadius:10, fontFamily:'inherit'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.plum}}>Kontakter ›</div>
              <div style={{fontSize:17, fontWeight:700, color:HC.fg, marginTop:1, letterSpacing:'-0.02em'}}>7</div>
            </button>
          </div>
        </div>

        {/* Snarveier */}
        <div style={{padding:'24px 22px 0'}}>
          <Y_SectionLabel>Din hage</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row
              icon={YI.people}
              tint={HC.coral}
              title="Dine kontakter"
              subtitle="14 mennesker du har møtt"
              onPress={() => go('portfolio')}
            />
            <Y_Row
              icon={YI.pulse}
              tint={HC.green}
              title="Sosial helse"
              subtitle="En stille månedsrapport til deg selv"
              onPress={() => go('health')}
            />
            <Y_Row
              icon={YI.gear}
              tint={HC.plum}
              title="Innstillinger"
              subtitle="Konto, personvern, varsler"
              onPress={() => go('settings')}
            />
          </Y_RowGroup>
        </div>

        {/* "Bli vertinne?" — klikkbar, går til ambassadør-flowet */}
        <div style={{padding:'22px 22px 0'}}>
          <button onClick={() => go('ambassador-land')} style={{
            width:'100%', border:'none', cursor:'pointer', textAlign:'left',
            background:`linear-gradient(135deg, ${HC.lilac}22, ${HC.coral}18)`,
            borderRadius:16, padding:'16px 18px',
            display:'flex', alignItems:'center', gap:14,
            fontFamily:'inherit',
          }}>
            <div style={{width:42, height:42, borderRadius:21, background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'#fff'}}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 2l1.9 4.4 4.8.4-3.6 3.2 1.1 4.7L9 12.3 4.8 14.7l1.1-4.7L2.3 6.8l4.8-.4z" fill="currentColor"/></svg>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.plumDeep}}>Ny rolle</div>
              <div style={{fontSize:14, fontWeight:700, color:HC.fg, marginTop:2, lineHeight:1.3}}>Bli vertinne?</div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, lineHeight:1.4}}>
                Du har vært på nok events til å vite hva som funker. Vil du arrangere?
              </div>
            </div>
            <span style={{color:HC.plum}}>{YI.chevron}</span>
          </button>
        </div>

        {/* Privacy-påminnelse nederst */}
        <div style={{padding:'18px 24px 24px'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, justifyContent:'center'}}>
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1.5l4 1.2v3.6c0 2.4-1.6 4.4-4 4.8-2.4-.4-4-2.4-4-4.8V2.7z" fill="none" stroke={HC.fgFaint} strokeWidth="1.2" strokeLinejoin="round"/></svg>
            <div style={{fontSize:11, color:HC.fgFaint, fontWeight:500, textAlign:'center'}}>
              Profilen din er bare synlig for folk du møter på event
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// 2) DINE KONTAKTER — enkel liste gruppert etter frekvens
// ============================================================

const Y_CONTACTS = {
  nære: [
    { n:'Kari Bratt',       m:8, sist:'i går',        bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
    { n:'Erik Nordli',      m:6, sist:'18. april',    bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
    { n:'Anja Lundgren',    m:5, sist:'10. april',    bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
  ],
  regelmessig: [
    { n:'Magnus Øen',       m:4, sist:'5. april',     bg:'linear-gradient(135deg,#9FB87F,#4D7045)' },
    { n:'Siri Haaland',     m:3, sist:'29. mars',     bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)' },
    { n:'Thomas Berg',      m:2, sist:'22. mars',     bg:'linear-gradient(135deg,#C77E8C,#7A3449)' },
    { n:'Linnea Vik',       m:2, sist:'15. mars',     bg:'linear-gradient(135deg,#7FA8B8,#345968)' },
  ],
  engang: [
    { n:'Ola Rønning',      m:1, sist:'12. feb',      bg:'linear-gradient(135deg,#B6A284,#6F5C42)' },
    { n:'Ida Sandmo',       m:1, sist:'8. feb',       bg:'linear-gradient(135deg,#D4889E,#80334B)' },
    { n:'Jonas Krog',       m:1, sist:'3. feb',       bg:'linear-gradient(135deg,#8A95D4,#3F4880)' },
    { n:'Marte Lien',       m:1, sist:'28. jan',      bg:'linear-gradient(135deg,#CFA07C,#7A5032)' },
  ],
};

function Y_ContactRow({ c, first, last, only }) {
  const borderRadius = only ? 14 : first ? '14px 14px 0 0' : last ? '0 0 14px 14px' : 0;
  return (
    <button style={{
      width:'100%', textAlign:'left', border:'none', background:HC.card,
      padding:'12px 14px', cursor:'pointer',
      borderTop: !first && !only ? `1px solid ${HC.divider}` : 'none',
      borderRadius,
      display:'flex', alignItems:'center', gap:12,
    }}>
      <Y_Avatar initial={c.n[0]} size={40} ring={false} bg={c.bg}/>
      <div style={{flex:1, minWidth:0}}>
        <div style={{fontSize:13.5, fontWeight:700, color:HC.fg}}>{c.n}</div>
        <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>
          {c.m} {c.m === 1 ? 'møte' : 'møter'} · sist {c.sist}
        </div>
      </div>
      <span style={{color:HC.fgFaint}}>{YI.chevron}</span>
    </button>
  );
}

function Y_ContactSection({ label, sub, tint, contacts }) {
  const n = contacts.length;
  return (
    <div style={{padding:'22px 22px 0'}}>
      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10}}>
        <div>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:tint}}>{label}</div>
          <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2, fontWeight:500}}>{sub}</div>
        </div>
        <div style={{fontSize:13, fontWeight:700, color:HC.fgDim}}>{n}</div>
      </div>
      <div style={{borderRadius:14, overflow:'hidden', boxShadow:'0 1px 8px rgba(42,33,52,.05)'}}>
        {contacts.map((c, i) => (
          <Y_ContactRow
            key={i} c={c}
            first={i === 0 && n > 1}
            last={i === n - 1 && n > 1}
            only={n === 1}
          />
        ))}
      </div>
    </div>
  );
}

function ScreenPortfolio({ nav = {} }) {
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>
        <Y_HeaderNav title="Dine kontakter" onBack={() => nav.pop?.()}/>

        {/* Intro */}
        <div style={{padding:'22px 24px 4px'}}>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Menneskene du kjenner
          </h1>
          <p style={{margin:'6px 0 0', fontSize:13, lineHeight:1.5, color:HC.fgDim}}>
            14 i alt. Sortert etter hvor ofte dere har møttes.
          </p>
        </div>

        <Y_ContactSection
          label="Nære"
          sub="5+ møter"
          tint={HC.coralDeep}
          contacts={Y_CONTACTS.nære}
        />
        <Y_ContactSection
          label="Regelmessig"
          sub="2–4 møter"
          tint={HC.plum}
          contacts={Y_CONTACTS.regelmessig}
        />
        <Y_ContactSection
          label="En gang"
          sub="Ett møte"
          tint={HC.fgDim}
          contacts={Y_CONTACTS.engang}
        />

        <div style={{height:16}}/>
      </div>
    </div>
  );
}

// ============================================================
// 3) INNSTILLINGER-HOVED
// ============================================================

function ScreenSettings({ nav = {} }) {
  const go = (target) => nav.push?.(target);
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>
        <Y_HeaderNav title="Innstillinger" onBack={() => nav.pop?.()}/>

        <div style={{height:10}}/>

        {/* Konto */}
        <div style={{padding:'14px 22px 0'}}>
          <Y_SectionLabel>Konto</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row icon={YI.user}  tint={HC.plum}  title="Rediger profil"  subtitle="Navn, bio, bilde" onPress={() => go('profile-edit')}/>
            <Y_Row icon={YI.mail}  tint={HC.plum}  title="E-post"           subtitle="viktor@speedfriending.com"/>
            <Y_Row icon={YI.lock}  tint={HC.plum}  title="Passord"          subtitle="Sist endret 12. mars"/>
          </Y_RowGroup>
        </div>

        {/* Personvern */}
        <div style={{padding:'22px 22px 0'}}>
          <Y_SectionLabel>Personvern</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row icon={YI.shield}    tint={HC.green}  title="Hva vi lagrer"          subtitle="Hvilke data appen tar vare på"/>
            <Y_Row icon={YI.download}  tint={HC.green}  title="Last ned dataene dine"  subtitle="Alt som ligger hos oss, i én fil"/>
            <Y_Row icon={YI.pause}     tint={HC.amber}  title="Sett kontoen på pause"  subtitle="Forsvinn for andre, vend tilbake når du vil"/>
            <Y_Row icon={YI.trash}     danger           title="Slett kontoen"          subtitle="Permanent. Alt blir borte innen 30 dager."/>
          </Y_RowGroup>
        </div>

        {/* Varsler */}
        <div style={{padding:'22px 22px 0'}}>
          <Y_SectionLabel>Varsler</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row
              icon={YI.bell}
              tint={HC.coral}
              title="Varsler fra appen"
              subtitle="Aldri mer enn ett per måned. Løfte."
            />
          </Y_RowGroup>
        </div>

        {/* Preferanser */}
        <div style={{padding:'22px 22px 0'}}>
          <Y_SectionLabel>Preferanser</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row
              icon={YI.globe}
              tint={HC.plum}
              title="Språk"
              subtitle="Norsk"
              right={<div style={{fontSize:12, color:HC.fgDim, fontWeight:600}}>NO</div>}
            />
            <Y_Row
              icon={YI.glass}
              tint={HC.amber}
              title="Alkohol"
              subtitle="Vis events uten alkohol øverst"
              right={<Y_Toggle active={true}/>}
            />
          </Y_RowGroup>
        </div>

        {/* Hjelp og om */}
        <div style={{padding:'22px 22px 0'}}>
          <Y_SectionLabel>Hjelp og om</Y_SectionLabel>
          <Y_RowGroup>
            <Y_Row icon={YI.help}  tint={HC.plum}   title="Hjelp og support"  subtitle="Vi svarer innen 24 timer"/>
            <Y_Row icon={YI.info}  tint={HC.plum}   title="Om appen"          subtitle="Versjon, vilkår, personvern"/>
          </Y_RowGroup>
        </div>

        {/* Logg ut — nøytral, ikke rød */}
        <div style={{padding:'22px 22px 8px'}}>
          <button style={{
            width:'100%', background:HC.card, border:'none',
            padding:'14px', borderRadius:14, cursor:'pointer',
            fontSize:13.5, fontWeight:700, color:HC.fgDim,
            boxShadow:'0 1px 6px rgba(42,33,52,.04)',
            letterSpacing:'.02em',
          }}>
            Logg ut
          </button>
        </div>

        <div style={{padding:'10px 24px 18px', textAlign:'center'}}>
          <div style={{fontSize:10.5, color:HC.fgFaint, fontWeight:500}}>Speedfriending · 3.6.1</div>
        </div>

      </div>
    </div>
  );
}

// Liten toggle-komponent for alkohol/etc
function Y_Toggle({ active }) {
  return (
    <div style={{
      width:38, height:22, borderRadius:12,
      background: active ? HC.green : HC.fgFaint,
      position:'relative', transition:'background .2s',
      flexShrink:0,
    }}>
      <div style={{
        position:'absolute', top:2, left: active ? 18 : 2,
        width:18, height:18, borderRadius:9, background:'#fff',
        boxShadow:'0 1px 3px rgba(0,0,0,.2)', transition:'left .2s',
      }}/>
    </div>
  );
}

// ============================================================
// 4) SOSIAL HELSE — opt-in, respektfull
// ============================================================

function ScreenHealth({ activated = false, nav = {} }) {
  // "activated" styrer om bruker har slått på månedsrapport.
  // Vi viser BÅDE aktivert-versjonen og opt-in-versjonen i demo ved å default'e til false.
  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>
        <Y_HeaderNav title="Sosial helse" onBack={() => nav.pop?.()}/>

        {/* Intro — rolig tone */}
        <div style={{padding:'26px 28px 0'}}>
          <h1 style={{margin:0, fontSize:24, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.2}}>
            Et stille blikk,<br/>én gang i måneden
          </h1>
          <p style={{margin:'10px 0 0', fontSize:13.5, lineHeight:1.55, color:HC.fgDim}}>
            Et brev fra deg, til deg. Vi måler ingenting uten at du sier ja først, og du kan skru det av når som helst.
          </p>
        </div>

        {activated ? (
          <Y_HealthActive/>
        ) : (
          <Y_HealthOptIn/>
        )}

        {/* Alltid synlig: forklaring på hva dette IKKE er */}
        <div style={{padding:'26px 22px 0'}}>
          <div style={{background:HC.cream, borderRadius:14, padding:'16px 18px', border:`1px solid ${HC.divider}`}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:8}}>
              Hva dette er og ikke er
            </div>
            <ul style={{margin:0, padding:0, listStyle:'none'}}>
              {[
                'Du får et kort brev en gang i måneden — ikke en score som følger deg rundt.',
                'Du kan skjule det helt. Ingenting er synlig for andre.',
                'Vi selger aldri dataene. De ligger på din enhet og i vår database, kryptert.',
                'Du kan slette alt med ett trykk, når som helst.',
              ].map((t, i) => (
                <li key={i} style={{display:'flex', gap:10, fontSize:12.5, color:HC.fg, lineHeight:1.55, padding:'4px 0'}}>
                  <span style={{color:HC.plum, flexShrink:0, marginTop:6}}>
                    <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{height:20}}/>
      </div>
    </div>
  );
}

// Opt-in variant — den vi viser first-time
function Y_HealthOptIn() {
  return (
    <div style={{padding:'24px 22px 0'}}>
      <div style={{
        background:`linear-gradient(160deg, ${HC.lilac}22 0%, ${HC.coral}16 100%)`,
        borderRadius:20, padding:'24px', position:'relative', overflow:'hidden',
        border:`1px solid ${HC.plum}22`,
      }}>
        <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:`${HC.plum}10`}}/>

        <div style={{position:'relative'}}>
          <div style={{
            width:48, height:48, borderRadius:24,
            background:HC.card,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:HC.plum,
            boxShadow:'0 4px 12px rgba(42,33,52,.08)',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 19s-7-4-7-10a4 4 0 017-3 4 4 0 017 3c0 6-7 10-7 10z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
          </div>

          <h2 style={{margin:'16px 0 0', fontSize:17, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em', lineHeight:1.3}}>
            Vil du ha en månedsrapport?
          </h2>
          <p style={{margin:'8px 0 0', fontSize:12.5, lineHeight:1.55, color:HC.fgDim}}>
            Vi bruker noen få forskningsbaserte spørsmål og lar deg reflektere — ikke en test du kan bestå eller stryke på.
          </p>

          <button style={{
            marginTop:18, padding:'12px 20px', borderRadius:22, border:'none',
            background:HC.plum, color:'#fff', fontSize:13.5, fontWeight:700,
            cursor:'pointer', letterSpacing:'.01em',
            boxShadow:`0 6px 14px ${HC.plum}40`,
          }}>
            Aktiver månedsrapport
          </button>

          <button style={{
            marginTop:10, marginLeft:10, padding:'12px 16px', borderRadius:22, border:'none',
            background:'transparent', color:HC.fgDim, fontSize:13, fontWeight:600,
            cursor:'pointer',
          }}>
            Ikke nå
          </button>
        </div>
      </div>
    </div>
  );
}

// Aktivert variant — vises hvis brukeren har slått på
function Y_HealthActive() {
  return (
    <div style={{padding:'24px 22px 0'}}>
      {/* Brevet */}
      <div style={{
        background:HC.card, borderRadius:18, padding:'22px',
        boxShadow:'0 2px 12px rgba(42,33,52,.06)',
      }}>
        <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>
          Mars 2026 · klar for deg
        </div>
        <h2 style={{margin:'8px 0 0', fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em', lineHeight:1.3}}>
          Du har vært litt mer ute av hulen denne måneden
        </h2>
        <p style={{margin:'10px 0 0', fontSize:13, lineHeight:1.6, color:HC.fgDim}}>
          Du møtte 4 mennesker i mars — to nye, to du kjente fra før. Det virker som du trives best i rolige settinger med 3–5 andre.
        </p>

        <button style={{
          marginTop:16, padding:'10px 16px', borderRadius:20, border:`1px solid ${HC.divider}`,
          background:'transparent', color:HC.plum, fontSize:12.5, fontWeight:700,
          cursor:'pointer',
        }}>
          Les hele brevet →
        </button>
      </div>

      {/* Innstilling */}
      <div style={{marginTop:18}}>
        <Y_RowGroup>
          <Y_Row
            icon={YI.pulse}
            tint={HC.plum}
            title="Skjul sosial helse"
            subtitle="Fjern fanen fra profilen din"
            right={<Y_Toggle active={false}/>}
          />
        </Y_RowGroup>
      </div>
    </div>
  );
}

// ============================================================
// EKSPORT
// ============================================================

window.H_ScreenProfile  = ScreenProfile;
window.H_ScreenPortfolio = ScreenPortfolio;
window.H_ScreenSettings = ScreenSettings;
window.H_ScreenHealth   = ScreenHealth;
