/* global React, HC, H_StatusBarLight */
// Crew-tab: 3 skjermer (oversikt, detalj, chat) + medlems-profil. Navigasjon via nav-prop.

// --- Felles data ---
const CREW_MEMBERS = [
  { id:'viktor', i:'V', n:'Viktor', me:true, bg:'linear-gradient(135deg,#D4A85C,#8A5A3B)' },
  { id:'kari',   i:'K', n:'Kari',    bg:'linear-gradient(135deg,#E8B8A0,#B5694A)' },
  { id:'erik',   i:'E', n:'Erik',    bg:'linear-gradient(135deg,#7895C4,#2E4A75)' },
  { id:'anja',   i:'A', n:'Anja',    bg:'linear-gradient(135deg,#B890D4,#6A3F8A)' },
  { id:'simen',  i:'S', n:'Simen',   bg:'linear-gradient(135deg,#8FAE8A,#3F6B44)' },
];

// Utvida medlemsdata for profil-skjerm (brukes kun av ScreenMemberProfile)
const MEMBER_PROFILES = {
  kari:   { n:'Kari',   age:31, bydel:'Grünerløkka', bio:'Liker rolige kvelder med brettspill og en god rødvin. Jobber som bibliotekar. Har to katter.', met:5, lastMet:'5. apr', tags:['Brettspill','Rødvin','Bøker','Rolig tempo'] },
  erik:   { n:'Erik',   age:28, bydel:'Sagene',       bio:'Datautvikler som trives best i fjellet. Startet nettopp å klatre. Alltid klar for en tur.', met:5, lastMet:'5. apr', tags:['Fjelltur','Brettspill','Klatring','Kaffe'] },
  anja:   { n:'Anja',   age:33, bydel:'St. Hanshaugen', bio:'Kunsthistoriker og hobbysnekker. Elsker gamle kafeer og nye utstillinger. Organisert, men aldri stressa.', met:5, lastMet:'5. apr', tags:['Kunst','Kafe','Brettspill','Onsdager'] },
  simen:  { n:'Simen',  age:29, bydel:'Torshov',      bio:'Musiker og lydtekniker. Spiller jazz på kvelder, lager podcast på dagtid. Stillferdig, men full av historier.', met:5, lastMet:'5. apr', tags:['Jazz','Brettspill','Vin','Musikk'] },
  viktor: { n:'Viktor', age:30, bydel:'Majorstuen',   bio:'Du.', met:0, lastMet:'—', tags:['Brettspill','Rødvin','Onsdager','Fjelltur'] },
};

// ================================================================
// SKJERM 1 — Crew-oversikt (liste over dine crews + invitasjoner)
// ================================================================
function ScreenCrewList({ nav = {}, onOpenCrew, onOpenChat, empty = false }) {
  const [showEmpty, setShowEmpty] = React.useState(empty);
  const go = (target, params) => nav.push?.(target, params);

  const openCrew = () => {
    if (onOpenCrew) return onOpenCrew();
    go('crew-detail', { crewId: 'onsdag' });
  };
  const openChat = () => {
    if (onOpenChat) return onOpenChat();
    go('crew-chat');
  };

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:23"/>

        {/* Topp */}
        <div style={{padding:'20px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
          <div>
            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum}}>Crew</div>
            <h1 style={{margin:'4px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.15}}>
              De du går med.
            </h1>
          </div>
          {/* Demo-toggle (diskret): skift mellom tom og fylt tilstand */}
          <button
            onClick={() => setShowEmpty(v => !v)}
            title="Demo: bytt tilstand"
            style={{border:`1px solid ${HC.divider}`, background:HC.card, color:HC.fgFaint, fontSize:10, fontWeight:600, padding:'6px 10px', borderRadius:12, cursor:'pointer', letterSpacing:'.04em'}}
          >
            {showEmpty ? 'Vis fylt' : 'Vis tom'}
          </button>
        </div>

        {showEmpty ? (
          <CrewEmptyState onCreateCrew={() => go('crew-create')}/>
        ) : (
          <>
            {/* Aktivt crew — hovedkortet */}
            <div style={{padding:'22px 22px 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim}}>
                  Ditt crew
                </div>
                <button
                  onClick={() => go('crew-create')}
                  style={{border:`1px solid ${HC.divider}`, background:HC.card, color:HC.plum, fontSize:11, fontWeight:700, padding:'5px 10px', borderRadius:12, cursor:'pointer', fontFamily:'inherit'}}
                >
                  + Nytt crew
                </button>
              </div>
              <div
                onClick={openCrew}
                style={{
                  background:HC.card, borderRadius:20, padding:'20px 20px 18px',
                  boxShadow:'0 4px 16px rgba(42,33,52,.06)', cursor:'pointer',
                  border:`1px solid ${HC.divider}`,
                }}
              >
                {/* Tittel + status-pill */}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12}}>
                  <div>
                    <div style={{fontSize:18, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>Onsdags-crewet</div>
                    <div style={{fontSize:12, color:HC.fgDim, marginTop:3}}>5 medlemmer · 5 events siden januar</div>
                  </div>
                  <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 9px', borderRadius:12, background:`${HC.green}18`, color:HC.green, fontSize:10, fontWeight:700, letterSpacing:'.08em'}}>
                    <span style={{width:6, height:6, borderRadius:3, background:HC.green}}/>
                    AKTIV
                  </div>
                </div>

                {/* Medlemsavatarer (overlappet) */}
                <div style={{display:'flex', marginTop:16, alignItems:'center'}}>
                  {CREW_MEMBERS.map((m, i) => (
                    <div
                      key={i}
                      onClick={(e) => { e.stopPropagation(); if (!m.me) go('member-profile', { memberId: m.id }); }}
                      style={{
                        width:36, height:36, borderRadius:18, background:m.bg,
                        border:`2.5px solid ${HC.card}`, marginLeft: i === 0 ? 0 : -10,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#FFF3E0', fontWeight:700, fontSize:13,
                        boxShadow:'0 2px 6px rgba(42,33,52,.12)',
                        zIndex: CREW_MEMBERS.length - i,
                        cursor: m.me ? 'default' : 'pointer',
                      }}
                    >{m.i}</div>
                  ))}
                  <div style={{flex:1}}/>
                  <div style={{fontSize:11, color:HC.fgFaint, fontWeight:600}}>Sist: tor 18/4</div>
                </div>

                {/* Neste-forslag */}
                <div style={{marginTop:16, padding:'12px 14px', borderRadius:12, background:`${HC.coral}0c`, border:`1px dashed ${HC.coralSoft}`}}>
                  <div style={{fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.coralDeep}}>Neste mulighet</div>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg, marginTop:3}}>Brettspillkvelden på fredag</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>5 av 5 kan — Frida foreslo i chat</div>
                </div>

                {/* Åpne-knapper */}
                <div style={{display:'flex', gap:8, marginTop:14}}>
                  <button
                    onClick={(e) => { e.stopPropagation(); openCrew(); }}
                    style={{
                      flex:1, height:40, borderRadius:20, border:`1px solid ${HC.divider}`,
                      background:HC.bgSoft, color:HC.fg, fontSize:12.5, fontWeight:700, cursor:'pointer',
                      fontFamily:'inherit',
                    }}
                  >
                    Se crew
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); openChat(); }}
                    style={{
                      flex:1, height:40, borderRadius:20, border:'none',
                      background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
                      color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer',
                      boxShadow:`0 6px 14px ${HC.coral}30`, fontFamily:'inherit',
                    }}
                  >
                    Chat · 3 nye
                  </button>
                </div>
              </div>
            </div>

            {/* Invitasjoner */}
            <div style={{padding:'26px 22px 0'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
                Invitasjoner · 1
              </div>
              <div
                onClick={() => go('crew-detail', { crewId: 'lordag' })}
                style={{background:HC.card, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, boxShadow:'0 1px 6px rgba(42,33,52,.04)', cursor:'pointer'}}
              >
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{display:'flex'}}>
                    {['#B890D4,#6A3F8A','#7895C4,#2E4A75','#8FAE8A,#3F6B44','#E8B8A0,#B5694A'].map((g, i) => (
                      <div key={i} style={{
                        width:28, height:28, borderRadius:14,
                        background:`linear-gradient(135deg,${g})`,
                        border:`2px solid ${HC.card}`, marginLeft: i === 0 ? 0 : -8,
                      }}/>
                    ))}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>Lørdagsturen</div>
                    <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>Ingrid + 3 vil gjerne ha deg med</div>
                  </div>
                </div>
                <div style={{display:'flex', gap:8, marginTop:12}}>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{flex:1, height:34, borderRadius:17, border:`1px solid ${HC.divider}`, background:'transparent', color:HC.fgDim, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit'}}
                  >
                    Kanskje senere
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); go('crew-detail', { crewId: 'lordag' }); }}
                    style={{flex:1, height:34, borderRadius:17, border:'none', background:HC.plum, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit'}}
                  >
                    Se forslag
                  </button>
                </div>
              </div>
            </div>

            {/* Tidligere crews — small print */}
            <div style={{padding:'26px 22px 0'}}>
              <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
                Tidligere
              </div>
              <div
                onClick={() => go('crew-detail', { crewId: 'hostcrewet' })}
                style={{background:HC.cream, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.divider}`, display:'flex', alignItems:'center', gap:12, cursor:'pointer'}}
              >
                <div style={{width:34, height:34, borderRadius:17, background:`${HC.fgFaint}1c`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={HC.fgDim} strokeWidth="1.4"/><path d="M8 4v4l2.5 1.5" stroke={HC.fgDim} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12.5, fontWeight:700, color:HC.fg}}>Høst-crewet</div>
                  <div style={{fontSize:11, color:HC.fgFaint, marginTop:1}}>Oppløst i februar · 7 events sammen</div>
                </div>
              </div>
            </div>

            {/* Hvordan crews fungerer — mild forklaring */}
            <div style={{padding:'22px 22px 0'}}>
              <div style={{background:`${HC.plum}08`, borderRadius:14, padding:'14px 16px', border:`1px solid ${HC.plum}18`, display:'flex', gap:12}}>
                <div style={{width:30, height:30, borderRadius:15, background:`${HC.plum}16`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="none" stroke={HC.plum} strokeWidth="1.3"/><path d="M7 4v3.5M7 9.5v.01" stroke={HC.plum} strokeWidth="1.3" strokeLinecap="round"/></svg>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12, color:HC.fgDim, lineHeight:1.5}}>
                    Et crew er 4–6 som går på events sammen over tid. Ingen leder, ingen forpliktelser — bare folk du møter ofte nok til at det begynner å bety noe.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CrewEmptyState({ onCreateCrew }) {
  return (
    <div style={{padding:'36px 26px 0', textAlign:'center'}}>
      {/* Illustrasjon: 5 sirkler i ring */}
      <div style={{position:'relative', width:180, height:180, margin:'0 auto'}}>
        <div style={{position:'absolute', inset:'25%', borderRadius:'50%', border:`1.5px dashed ${HC.fgFaint}`}}/>
        {[0,1,2,3,4].map(i => {
          const a = (i/5) * Math.PI * 2 - Math.PI/2;
          const x = 50 + Math.cos(a) * 38;
          const y = 50 + Math.sin(a) * 38;
          return (
            <div key={i} style={{
              position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)',
              width:32, height:32, borderRadius:16,
              background: i === 0 ? `linear-gradient(135deg,${HC.coral},${HC.plum})` : HC.card,
              border: i === 0 ? 'none' : `1.5px dashed ${HC.fgFaint}`,
              boxShadow: i === 0 ? `0 4px 12px ${HC.coral}40` : 'none',
            }}/>
          );
        })}
      </div>
      <h2 style={{margin:'24px 0 0', fontSize:22, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em', lineHeight:1.2}}>
        Du har ikke et crew ennå.
      </h2>
      <p style={{margin:'10px auto 0', fontSize:13.5, color:HC.fgDim, lineHeight:1.55, maxWidth:300}}>
        Crews oppstår av seg selv — når du har vært på noen events og funnet folk du vil møte igjen, foreslår vi en sammensetning.
      </p>
      <button
        onClick={onCreateCrew}
        style={{
          marginTop:24, padding:'14px 28px', borderRadius:28, border:'none',
          background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`, color:'#fff',
          fontSize:14, fontWeight:700, cursor:'pointer',
          boxShadow:`0 10px 24px ${HC.coral}40`, fontFamily:'inherit',
        }}
      >
        Se kveldens events
      </button>
      <div style={{marginTop:16, fontSize:11.5, color:HC.fgFaint}}>
        Første event er på oss — vi booker plass.
      </div>
    </div>
  );
}

// ================================================================
// SKJERM 2 — Crew-detalj (sirkulær layout, historikk, planer)
// ================================================================
function ScreenCrewDetail({ nav = {}, onBack, onOpenChat }) {
  const go = (target, params) => nav.push?.(target, params);
  const back = () => (onBack ? onBack() : nav.pop?.());
  const openChat = () => (onOpenChat ? onOpenChat() : go('crew-chat'));

  const pastMeetings = [
    { id:'m1', d:'15.01', t:'Brettspill · Trekroneren', h:'2t 10m' },
    { id:'m2', d:'01.02', t:'Vinsmaking · Søstrene',    h:'2t 45m' },
    { id:'m3', d:'22.02', t:'Fjelltur · Bymarka',        h:'3t 20m' },
    { id:'m4', d:'14.03', t:'Padel · Nidarø',            h:'1t 45m' },
    { id:'m5', d:'05.04', t:'Jazz · Antikvariatet',      h:'2t 40m' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:24"/>

        {/* Header */}
        <div style={{padding:'20px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button
            onClick={back}
            style={{width:38,height:38,borderRadius:19,background:HC.card,border:'none',boxShadow:'0 2px 8px rgba(42,33,52,.08)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <svg width="15" height="15" viewBox="0 0 15 15"><path d="M11 3L4 7.5 11 12" stroke={HC.fg} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.plum}}>Crew</div>
          <button style={{width:38,height:38,borderRadius:19,background:HC.card,border:'none',boxShadow:'0 2px 8px rgba(42,33,52,.08)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="3" cy="8" r="1.4" fill={HC.fg}/><circle cx="8" cy="8" r="1.4" fill={HC.fg}/><circle cx="13" cy="8" r="1.4" fill={HC.fg}/></svg>
          </button>
        </div>

        {/* Tittel */}
        <div style={{padding:'18px 26px 0'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:12, background:`${HC.green}18`, color:HC.green, fontSize:10, fontWeight:700, letterSpacing:'.08em'}}>
            <span style={{width:6, height:6, borderRadius:3, background:HC.green}}/>
            AKTIV SIDEN JANUAR
          </div>
          <h1 style={{margin:'12px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg, lineHeight:1.1}}>
            Onsdags-crewet
          </h1>
          <p style={{margin:'8px 0 0', fontSize:13, color:HC.fgDim, lineHeight:1.55}}>
            Dere har funnet hverandre. 5 kvelder siden januar — brettspill, vin, et par fjellturer.
          </p>
        </div>

        {/* Ring-oppsett (varm versjon) */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{
            position:'relative', height:260, borderRadius:20, overflow:'hidden',
            background:`radial-gradient(circle at center, ${HC.cream} 0%, ${HC.card} 70%)`,
            border:`1px solid ${HC.divider}`,
            boxShadow:'0 4px 18px rgba(42,33,52,.05)',
          }}>
            {/* Varme ringer bak */}
            <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:150, height:150, borderRadius:'50%', background:`radial-gradient(circle, ${HC.coral}10, transparent 70%)`}}/>
            <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:110, height:110, borderRadius:'50%', border:`1px dashed ${HC.fgFaint}`}}/>

            {/* Medlemmer i ring */}
            {CREW_MEMBERS.map((p, i) => {
              const a = (i / CREW_MEMBERS.length) * Math.PI * 2 - Math.PI/2;
              const x = 50 + Math.cos(a) * 36;
              const y = 50 + Math.sin(a) * 34;
              return (
                <div
                  key={i}
                  onClick={() => { if (!p.me) go('member-profile', { memberId: p.id }); }}
                  style={{position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor: p.me ? 'default' : 'pointer'}}
                >
                  <div style={{
                    width: p.me ? 52 : 46, height: p.me ? 52 : 46, borderRadius:'50%',
                    background:p.bg,
                    border:`2.5px solid ${p.me ? HC.coral : HC.card}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#FFF3E0', fontWeight:700, fontSize: p.me ? 18 : 16,
                    boxShadow:'0 6px 14px rgba(0,0,0,.18)',
                  }}>{p.i}</div>
                  <div style={{fontSize:11, fontWeight:700, color:HC.fg}}>{p.me ? 'Du' : p.n}</div>
                </div>
              );
            })}

            {/* Midten: samlet tid */}
            <div style={{
              position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
              display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
              pointerEvents:'none',
            }}>
              <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.18em', color:HC.fgFaint}}>SAMMEN</div>
              <div style={{fontSize:18, fontWeight:700, color:HC.plum, marginTop:2, letterSpacing:'-0.01em'}}>12 t 40 m</div>
            </div>
          </div>
        </div>

        {/* Historikk-statistikk */}
        <div style={{padding:'20px 22px 0'}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
            {[
              { label:'Events', value:'5' },
              { label:'Snitt/kveld', value:'2t 32m' },
              { label:'Siden', value:'15. jan' },
            ].map((s, i) => (
              <div key={i} style={{background:HC.card, borderRadius:12, padding:'12px 10px', textAlign:'center', border:`1px solid ${HC.divider}`}}>
                <div style={{fontSize:9.5, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:HC.fgFaint}}>{s.label}</div>
                <div style={{fontSize:15, fontWeight:700, color:HC.fg, marginTop:4, letterSpacing:'-0.01em'}}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Felles tags */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>Felles</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:7}}>
            {['Brettspill','Rolig tempo','Onsdager','Nidarø','Rødvin'].map((t,i)=>(
              <div key={i} style={{padding:'7px 12px', borderRadius:999, background:HC.card, border:`1px solid ${HC.divider}`, fontSize:12, fontWeight:600, color:HC.fg}}>{t}</div>
            ))}
          </div>
        </div>

        {/* Delt historikk — liste over tidligere events */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>Sammen så langt</div>
          <div style={{background:HC.card, borderRadius:14, padding:'4px 16px', boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            {pastMeetings.map((e, i, arr) => (
              <div
                key={i}
                onClick={() => go('crew-meeting-detail', { meetingId: e.id })}
                style={{
                  padding:'12px 0', display:'flex', alignItems:'center', gap:14,
                  borderBottom: i < arr.length-1 ? `1px solid ${HC.divider}` : 'none',
                  cursor:'pointer',
                }}
              >
                <div style={{width:42, textAlign:'center'}}>
                  <div style={{fontSize:11, fontWeight:700, color:HC.plum, letterSpacing:'.04em'}}>{e.d}</div>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{e.t}</div>
                  <div style={{fontSize:11, color:HC.fgDim, marginTop:1}}>{e.h}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke={HC.fgFaint} strokeWidth="1.2" strokeLinecap="round" transform="rotate(45 7 7)"/></svg>
              </div>
            ))}
          </div>
        </div>

        {/* Foreslåtte kvelder fremover */}
        <div style={{padding:'22px 22px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.coralDeep}}>Forslag fremover</div>
            <button
              onClick={() => go('crew-schedule')}
              style={{border:`1px solid ${HC.coralSoft}`, background:HC.card, color:HC.coralDeep, fontSize:11, fontWeight:700, padding:'5px 10px', borderRadius:12, cursor:'pointer', fontFamily:'inherit'}}
            >
              + Plan nytt møte
            </button>
          </div>
          <div style={{display:'grid', gap:8}}>
            {[
              { id:'s1', d:'Fre 19/4', v:'Brettspill · Trekroneren', can:5,  tint:HC.green },
              { id:'s2', d:'Lør 27/4', v:'Naturvin-smaking · Aune',  can:3,  tint:HC.amber },
              { id:'s3', d:'Tor 2/5',  v:'Bymarka-tur · Skistua',    can:4,  tint:HC.plum },
            ].map((p, i) => (
              <div
                key={i}
                onClick={() => go('crew-schedule', { proposalId: p.id })}
                style={{display:'flex', alignItems:'center', gap:12, background:HC.card, borderRadius:14, padding:'12px 14px', boxShadow:'0 1px 8px rgba(42,33,52,.04)', border:`1px solid ${HC.divider}`, cursor:'pointer'}}
              >
                <div style={{fontSize:11, fontWeight:700, letterSpacing:'.06em', color:HC.plum, minWidth:58}}>{p.d}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>{p.v}</div>
                  <div style={{display:'flex', alignItems:'center', gap:6, marginTop:4}}>
                    {/* Mini-dots viser hvem som kan */}
                    <div style={{display:'flex', gap:3}}>
                      {[0,1,2,3,4].map(n => (
                        <div key={n} style={{
                          width:6, height:6, borderRadius:3,
                          background: n < p.can ? p.tint : HC.fgFaint,
                          opacity: n < p.can ? 1 : .3,
                        }}/>
                      ))}
                    </div>
                    <span style={{fontSize:10.5, color:HC.fgDim, fontWeight:600}}>{p.can} av 5 kan</span>
                  </div>
                </div>
                <svg width="10" height="14" viewBox="0 0 10 14"><path d="M2 2l6 5-6 5" stroke={HC.fgFaint} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            ))}
          </div>
        </div>

        {/* Til chat */}
        <div style={{padding:'22px 22px 0'}}>
          <button
            onClick={openChat}
            style={{
              width:'100%', height:50, borderRadius:25, border:'none',
              background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
              color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer',
              boxShadow:`0 10px 24px ${HC.coral}40`, fontFamily:'inherit',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H7l-3 3v-3H4a2 2 0 01-2-2V4z" fill="#fff"/></svg>
            Chat med crew
          </button>
        </div>

        {/* Diskret forlat-lenke */}
        <div style={{padding:'22px 30px 24px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', fontSize:11.5, color:HC.fgFaint, fontWeight:500, cursor:'pointer', padding:0, textDecoration:'underline', fontFamily:'inherit'}}>
            Forlat crew
          </button>
          <div style={{fontSize:10.5, color:HC.fgFaint, marginTop:6, lineHeight:1.5}}>
            Et crew kan oppløses når som helst. Uten forklaring.
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// SKJERM 3 — Crew-chat (privat gruppchat + Frida-forslag)
// ================================================================
function ScreenCrewChat({ nav = {}, onBack }) {
  const [text, setText] = React.useState('');
  const go = (target, params) => nav.push?.(target, params);
  const back = () => (onBack ? onBack() : nav.pop?.());

  // Hjelp: finn avatar-bg for et navn
  const bgFor = (name) => (CREW_MEMBERS.find(m => m.n === name) || {}).bg || 'linear-gradient(135deg,#ccc,#888)';
  const idFor = (name) => (CREW_MEMBERS.find(m => m.n === name) || {}).id;

  const messages = [
    { type:'day', label:'I går' },
    { who:'Kari',  t:'Hei folkens — noen som har lyst på noe i uka?', time:'20:14' },
    { who:'Erik',  t:'Jeg er åpen torsdag og fredag', time:'20:18' },
    { who:'Anja',  t:'Fredag blir bra for meg òg. Har tenkt litt på Trekroneren igjen', time:'20:22' },
    { type:'frida', t:'Brettspillkvelden på fredag er ledig for dere alle fem. Det er 3 uker siden sist — vil dere at jeg holder av et bord?' },
    { who:'Simen', t:'Frida leser tankene', time:'20:26' },
    { who:'Viktor', me:true, t:'Ja, book det.', time:'20:28' },
    { who:'Kari',  t:'Yes', time:'20:29' },
    { type:'system', t:'Bord holdt av på Trekroneren · fredag 19:00 · 5 plasser' },
    { type:'day', label:'I dag' },
    { who:'Erik',  t:'Noen som vil gå sammen? Jeg starter fra sentrum ca 18:45', time:'09:02' },
    { who:'Anja',  t:'Jeg henger meg på — møtes utenfor Nordre?', time:'09:14' },
  ];

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:25"/>

        {/* Header */}
        <div style={{
          padding:'14px 18px 14px', display:'flex', alignItems:'center', gap:12,
          background:HC.card, borderBottom:`1px solid ${HC.divider}`,
        }}>
          <button
            onClick={back}
            style={{width:36,height:36,borderRadius:18,background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <svg width="15" height="15" viewBox="0 0 15 15"><path d="M11 3L4 7.5 11 12" stroke={HC.fg} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {/* Overlappede avatarer */}
          <div style={{display:'flex'}}>
            {CREW_MEMBERS.slice(0,4).map((m, i) => (
              <div key={i} style={{
                width:28, height:28, borderRadius:14, background:m.bg,
                border:`2px solid ${HC.card}`, marginLeft: i === 0 ? 0 : -8,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#FFF3E0', fontWeight:700, fontSize:11,
              }}>{m.i}</div>
            ))}
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:14, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>Onsdags-crewet</div>
            <div style={{fontSize:10.5, color:HC.fgDim, marginTop:1}}>5 medlemmer · Kari skriver …</div>
          </div>
          {/* Video-call */}
          <button
            onClick={() => go('videochat', { groupCall: true })}
            title="Videochat"
            style={{width:34,height:34,borderRadius:17,background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="5" width="10" height="8" rx="1.5" fill="none" stroke={HC.plum} strokeWidth="1.5"/><path d="M12 8l4-2v6l-4-2V8z" fill="none" stroke={HC.plum} strokeWidth="1.5" strokeLinejoin="round"/></svg>
          </button>
          <button style={{width:34,height:34,borderRadius:17,background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke={HC.fgDim} strokeWidth="1.4"/><path d="M8 5v3.5M8 11v.01" stroke={HC.fgDim} strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Meldings-område */}
        <div style={{flex:1, overflowY:'auto', padding:'16px 14px 10px'}}>
          {messages.map((m, i) => {
            if (m.type === 'day') {
              return (
                <div key={i} style={{display:'flex', alignItems:'center', gap:10, margin:'14px 0 10px'}}>
                  <div style={{flex:1, height:1, background:HC.divider}}/>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.fgFaint}}>{m.label}</div>
                  <div style={{flex:1, height:1, background:HC.divider}}/>
                </div>
              );
            }
            if (m.type === 'system') {
              return (
                <div key={i} style={{margin:'10px auto', maxWidth:'85%', padding:'10px 14px', borderRadius:12, background:`${HC.green}0e`, border:`1px dashed ${HC.green}55`, textAlign:'center'}}>
                  <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:HC.green, marginBottom:4}}>Bekreftet</div>
                  <div style={{fontSize:12, color:HC.fg, lineHeight:1.45}}>{m.t}</div>
                </div>
              );
            }
            if (m.type === 'frida') {
              return (
                <div key={i} style={{display:'flex', gap:10, margin:'10px 0', alignItems:'flex-start'}}>
                  <div style={{
                    width:32, height:32, borderRadius:16, flexShrink:0,
                    background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
                    display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:13,
                    boxShadow:`0 4px 10px ${HC.coral}30`,
                  }}>F</div>
                  <div style={{flex:1, minWidth:0, maxWidth:'80%'}}>
                    <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.1em', color:HC.plum, marginBottom:4, textTransform:'uppercase'}}>Frida · forslag</div>
                    <div style={{
                      padding:'12px 14px', borderRadius:'4px 16px 16px 16px',
                      background:HC.card,
                      border:`1.5px solid ${HC.coralSoft}`,
                      fontSize:13, color:HC.fg, lineHeight:1.5,
                      boxShadow:`0 4px 14px ${HC.coral}18`,
                    }}>
                      {m.t}
                    </div>
                    <div style={{display:'flex', gap:6, marginTop:8}}>
                      <button style={{padding:'6px 12px', borderRadius:14, border:'none', background:HC.plum, color:'#fff', fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit'}}>
                        Ja, book
                      </button>
                      <button style={{padding:'6px 12px', borderRadius:14, border:`1px solid ${HC.divider}`, background:HC.card, color:HC.fgDim, fontSize:11.5, fontWeight:600, cursor:'pointer', fontFamily:'inherit'}}>
                        Ikke denne gang
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Vanlig melding
            const isMe = m.me;
            const mid = idFor(m.who);
            return (
              <div key={i} style={{display:'flex', gap:8, margin:'6px 0', flexDirection: isMe ? 'row-reverse' : 'row', alignItems:'flex-end'}}>
                {!isMe && (
                  <div
                    onClick={() => mid && go('member-profile', { memberId: mid })}
                    style={{
                      width:28, height:28, borderRadius:14, flexShrink:0,
                      background:bgFor(m.who),
                      display:'flex', alignItems:'center', justifyContent:'center', color:'#FFF3E0', fontWeight:700, fontSize:11,
                      cursor:'pointer',
                    }}
                  >{m.who[0]}</div>
                )}
                <div style={{maxWidth:'72%'}}>
                  {!isMe && (
                    <div style={{fontSize:10.5, fontWeight:700, color:HC.fgDim, marginBottom:3, marginLeft:4}}>{m.who}</div>
                  )}
                  <div style={{
                    padding:'9px 13px',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    background: isMe ? `linear-gradient(135deg, ${HC.coral}, ${HC.plum})` : HC.card,
                    color: isMe ? '#fff' : HC.fg,
                    fontSize:13, lineHeight:1.45,
                    boxShadow: isMe ? `0 4px 10px ${HC.coral}25` : '0 1px 4px rgba(42,33,52,.05)',
                    border: isMe ? 'none' : `1px solid ${HC.divider}`,
                  }}>
                    {m.t}
                  </div>
                  <div style={{fontSize:9.5, color:HC.fgFaint, marginTop:3, textAlign: isMe ? 'right' : 'left', paddingLeft: isMe ? 0 : 4, paddingRight: isMe ? 4 : 0}}>
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div style={{
          padding:'10px 14px 14px', background:HC.card, borderTop:`1px solid ${HC.divider}`,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <button style={{width:36, height:36, borderRadius:18, background:HC.bgSoft, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke={HC.fgDim} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
          <div style={{
            flex:1, background:HC.bgSoft, borderRadius:20,
            padding:'8px 14px', display:'flex', alignItems:'center', gap:8,
          }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Skriv til crewet …"
              style={{
                flex:1, border:'none', outline:'none', background:'transparent',
                fontSize:13.5, color:HC.fg, fontFamily:'inherit', minWidth:0,
              }}
            />
            <button style={{background:'transparent', border:'none', cursor:'pointer', padding:0, display:'flex'}}>
              <svg width="18" height="18" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" fill="none" stroke={HC.fgDim} strokeWidth="1.4"/><circle cx="6.5" cy="7.5" r="1" fill={HC.fgDim}/><circle cx="11.5" cy="7.5" r="1" fill={HC.fgDim}/><path d="M6 11c1 1.2 2 1.8 3 1.8s2-.6 3-1.8" stroke={HC.fgDim} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>
            </button>
          </div>
          <button style={{
            width:40, height:40, borderRadius:20, border:'none', cursor:'pointer',
            background: text ? `linear-gradient(135deg, ${HC.coral}, ${HC.plum})` : HC.bgSoft,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            boxShadow: text ? `0 4px 10px ${HC.coral}30` : 'none',
            transition:'all .15s',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8l12-5-4 12-2-5-6-2z" fill={text ? '#fff' : HC.fgFaint} stroke={text ? '#fff' : HC.fgFaint} strokeWidth="1" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// SKJERM 4 — Medlems-profil (vises når du tapper på en crew-medlem)
// ================================================================
function ScreenMemberProfile({ nav = {}, memberId }) {
  const go = (target, params) => nav.push?.(target, params);
  const back = () => nav.pop?.();

  const member = CREW_MEMBERS.find(m => m.id === memberId) || CREW_MEMBERS[1];
  const profile = MEMBER_PROFILES[member.id] || MEMBER_PROFILES.kari;

  // Bruk persona-avatar hvis tilgjengelig, ellers gradient + initial
  const PersonaAvatar = (typeof window !== 'undefined') ? window.H_PersonaAvatar : null;

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', overflowY:'auto', paddingBottom:16}}>
        <H_StatusBarLight time="14:26"/>

        {/* Header */}
        <div style={{padding:'20px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button
            onClick={back}
            style={{width:38,height:38,borderRadius:19,background:HC.card,border:'none',boxShadow:'0 2px 8px rgba(42,33,52,.08)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <svg width="15" height="15" viewBox="0 0 15 15"><path d="M11 3L4 7.5 11 12" stroke={HC.fg} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', color:HC.plum}}>Om {profile.n}</div>
          <div style={{width:38}}/>
        </div>

        {/* Stor avatar + navn */}
        <div style={{padding:'28px 24px 0', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
          {PersonaAvatar ? (
            <PersonaAvatar personaId={member.id} size={120}/>
          ) : (
            <div style={{
              width:120, height:120, borderRadius:60, background:member.bg,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#FFF3E0', fontWeight:700, fontSize:44,
              boxShadow:'0 10px 28px rgba(42,33,52,.2)',
              border:`3px solid ${HC.card}`,
            }}>{member.i}</div>
          )}
          <h1 style={{margin:'18px 0 0', fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color:HC.fg}}>
            {profile.n}
          </h1>
          <div style={{fontSize:13, color:HC.fgDim, marginTop:4}}>
            {profile.age} år · {profile.bydel}
          </div>
        </div>

        {/* Bio */}
        <div style={{padding:'22px 26px 0'}}>
          <div style={{background:HC.card, borderRadius:16, padding:'16px 18px', border:`1px solid ${HC.divider}`, boxShadow:'0 1px 8px rgba(42,33,52,.04)'}}>
            <p style={{margin:0, fontSize:13.5, color:HC.fg, lineHeight:1.6}}>
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Møter-statistikk */}
        <div style={{padding:'18px 22px 0'}}>
          <div style={{
            background:`${HC.coral}0c`, borderRadius:14, padding:'14px 16px',
            border:`1px dashed ${HC.coralSoft}`,
            display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{
              width:36, height:36, borderRadius:18,
              background:`linear-gradient(135deg, ${HC.coral}, ${HC.plum})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontWeight:700, fontSize:15,
              flexShrink:0,
            }}>{profile.met}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, fontWeight:700, color:HC.fg}}>
                Dere har møttes {profile.met} ganger
              </div>
              <div style={{fontSize:11.5, color:HC.fgDim, marginTop:2}}>
                Sist: {profile.lastMet}
              </div>
            </div>
          </div>
        </div>

        {/* Felles interesser */}
        <div style={{padding:'22px 24px 0'}}>
          <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.plum, marginBottom:10}}>
            Felles interesser
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:7}}>
            {profile.tags.map((t, i) => (
              <div key={i} style={{padding:'7px 12px', borderRadius:999, background:HC.card, border:`1px solid ${HC.divider}`, fontSize:12, fontWeight:600, color:HC.fg}}>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Handlingsknapper */}
        <div style={{padding:'28px 22px 0', display:'flex', gap:10}}>
          <button
            onClick={() => go('chat-detail', { personaId: member.id })}
            style={{
              flex:1, height:48, borderRadius:24, border:`1px solid ${HC.divider}`,
              background:HC.card, color:HC.fg, fontSize:13.5, fontWeight:700, cursor:'pointer',
              fontFamily:'inherit',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H7l-3 3v-3H4a2 2 0 01-2-2V4z" fill="none" stroke={HC.fg} strokeWidth="1.4"/></svg>
            Send melding
          </button>
          <button
            onClick={() => go('videochat', { personaId: member.id })}
            style={{
              flex:1, height:48, borderRadius:24, border:'none',
              background:`linear-gradient(100deg, ${HC.coral}, ${HC.plum})`,
              color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer',
              boxShadow:`0 8px 20px ${HC.coral}35`, fontFamily:'inherit',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="4" width="10" height="8" rx="1.5" fill="#fff"/><path d="M11 7l4-2v6l-4-2V7z" fill="#fff"/></svg>
            Videochat
          </button>
        </div>

        {/* Diskret blokk-lenke */}
        <div style={{padding:'28px 30px 24px', textAlign:'center'}}>
          <button style={{background:'transparent', border:'none', fontSize:11.5, color:HC.fgFaint, fontWeight:500, cursor:'pointer', padding:0, textDecoration:'underline', fontFamily:'inherit'}}>
            Skjul {profile.n} fra forslag
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// Eksport
// ================================================================
window.H_ScreenCrewList = ScreenCrewList;
window.H_ScreenCrewDetail = ScreenCrewDetail;
window.H_ScreenCrewChat = ScreenCrewChat;
window.H_ScreenMemberProfile = ScreenMemberProfile;
