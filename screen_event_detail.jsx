/* global React, HC, H_StatusBarLight */
// Event-detail — egen detaljskjerm. Hero, dato/sted, host, attendees,
// "Om kvelden", "Hva du kan snakke om", progress, sticky CTA.

function ScreenEventDetail({ nav = {}, eventId = 1 }) {
  // Events-registeret. Speiler kommende i screen_events.jsx, med rikere felter.
  const EVENTS = {
    1: {
      id: 1, title:'Vinsmaking med Martine',
      dato:'Torsdag 18. april', tid:'19:00–22:00', duration:'3 timer',
      venue:'Søstrene Karlsen', area:'Grünerløkka, Oslo',
      tint: HC.coral,
      hostId:'martine', hostName:'Martine L.', hostBio:'Vertinne siden januar · Vin og naturvin',
      price:199, seatsTotal:8, seatsTaken:6,
      attendeeIds:['kari','erik','anja','henrik','ingrid','martine'],
      about:'Seks nye mennesker, tre naturviner og en vertinne som vet hva hun snakker om. Martine har kuratert kvelden med fokus på orange vin og lavintervensjonsprodusenter fra Nord-Italia. Du trenger ingen forkunnskap — bare nysgjerrighet.',
      starters:[
        'Hva var den beste vinen du har smakt — og hvorfor?',
        'Foretrekker du hvit eller rødvin, og har det endret seg med årene?',
        'Hva er favorittmåltidet ditt å nyte med vin?',
        'Har du vært på vingård? Hvor?',
      ],
    },
    2: {
      id: 2, title:'Brettspill på Bruket',
      dato:'Fredag 19. april', tid:'19:00–23:00', duration:'4 timer',
      venue:'Bruket', area:'Grünerløkka, Oslo',
      tint: HC.plum,
      hostId:'henrik', hostName:'Henrik A.', hostBio:'Vert · Brettspill & strategi',
      price:149, seatsTotal:12, seatsTaken:8,
      attendeeIds:['kari','erik','henrik','karina','lars','mia','oskar','tore'],
      about:'Henrik har plukket fem spill for kvelden — fra rask-lette isbrytere til to timers strategi. Du blir plassert i grupper på 4 så alle får snakket sammen. Øl og kaffe kan kjøpes i baren.',
      starters:[
        'Hvilket spill spilte du mest som barn?',
        'Er du mest strategisk eller intuitiv når du spiller?',
        'Vinner-instinkt eller prosess-kos — hva driver deg?',
        'Hva er siste spillet du ble skikkelig fanget av?',
      ],
    },
    3: {
      id: 3, title:'Nordmarka-tur',
      dato:'Lørdag 20. april', tid:'11:00–15:00', duration:'4 timer',
      venue:'Frognerseteren', area:'Nordmarka, Oslo',
      tint: HC.green,
      hostId:'ingrid', hostName:'Ingrid R.', hostBio:'Vertinne · Fjell og friluft',
      price:99, seatsTotal:10, seatsTaken:5,
      attendeeIds:['ingrid','kari','anja','lars','mia'],
      about:'Vi møtes ved Frognerseteren T-bane kl. 11:00, går en rolig runde på ca. 8 km med utsikt over Oslofjorden, og avslutter med vafler og kaffe før retur. Passer for alle som tåler en lett tur — ikke noe råkjør.',
      starters:[
        'Når gikk du sist tur i marka — og hvorfor?',
        'Hva er favoritttopen din i Oslo-området?',
        'Sommer- eller vintertur?',
        'Hva har du lært om deg selv på en tur?',
      ],
    },
  };

  const e = EVENTS[eventId] || EVENTS[1];
  const seatsLeft = e.seatsTotal - e.seatsTaken;
  const progressPct = (e.seatsTaken / e.seatsTotal) * 100;

  const personas = (typeof window !== 'undefined' && window.H_PERSONAS) || null;
  const Avatar = (typeof window !== 'undefined' && window.H_PersonaAvatar) || null;

  const nameFor = (id) => (personas && personas[id]?.name) || id.charAt(0).toUpperCase() + id.slice(1);
  const initialFor = (id) => nameFor(id).charAt(0).toUpperCase();
  const hueFor = (id) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
    return h;
  };

  const back = () => nav.pop?.();
  const reserve = () => nav.push?.('confirmation');

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:HC.bg}}>
      <div style={{position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column'}}>
        <H_StatusBarLight time="14:34"/>

        {/* Scroll-container */}
        <div style={{flex:1, overflowY:'auto', paddingBottom:120}}>

          {/* Hero med gradient */}
          <div style={{
            position:'relative',
            background:`linear-gradient(135deg, ${e.tint} 0%, ${HC.plum} 100%)`,
            padding:'24px 24px 28px',
            color:'#fff',
          }}>
            <button onClick={back} aria-label="Tilbake" style={{
              width:36, height:36, borderRadius:18, border:'none',
              background:'rgba(255,255,255,.22)', backdropFilter:'blur(10px)',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              marginBottom:22,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M9 2L3 7l6 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div style={{fontSize:11, fontWeight:700, letterSpacing:'.16em', textTransform:'uppercase', opacity:.85}}>
              {e.dato}
            </div>
            <h1 style={{margin:'8px 0 0', fontSize:28, fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.15}}>
              {e.title}
            </h1>
            <div style={{marginTop:10, fontSize:13, opacity:.9}}>
              {e.venue} · {e.area}
            </div>

            {/* Dato/tid/varighet rad */}
            <div style={{
              marginTop:20, display:'flex', gap:10,
              background:'rgba(255,255,255,.14)', backdropFilter:'blur(10px)',
              borderRadius:14, padding:'12px 14px',
            }}>
              <ED_Meta icon="cal" label="Dato" value={e.dato.split(' ')[0]}/>
              <div style={{width:1, background:'rgba(255,255,255,.25)'}}/>
              <ED_Meta icon="clock" label="Tid" value={e.tid.split('–')[0]}/>
              <div style={{width:1, background:'rgba(255,255,255,.25)'}}/>
              <ED_Meta icon="dur" label="Varighet" value={e.duration}/>
            </div>
          </div>

          {/* Host */}
          <div style={{padding:'22px 24px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
              Vertinne
            </div>
            <div style={{
              display:'flex', alignItems:'center', gap:14,
              background:HC.card, padding:'14px 16px', borderRadius:14,
              boxShadow:'0 2px 10px rgba(42,33,52,.05)',
            }}>
              <div style={{width:48, height:48, borderRadius:24, overflow:'hidden', flexShrink:0, background:HC.bgSoft}}>
                {Avatar ? (
                  <Avatar id={e.hostId} size={48}/>
                ) : (
                  <div style={{
                    width:'100%', height:'100%',
                    background:`linear-gradient(135deg, hsl(${hueFor(e.hostId)} 55% 60%), hsl(${hueFor(e.hostId)} 50% 42%))`,
                    color:'#FFF3E0', fontWeight:700, fontSize:20,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>{initialFor(e.hostId)}</div>
                )}
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:15, fontWeight:700, color:HC.fg, letterSpacing:'-0.01em'}}>{e.hostName}</div>
                <div style={{fontSize:12, color:HC.fgDim, marginTop:2}}>{e.hostBio}</div>
              </div>
            </div>
          </div>

          {/* Attendees — horisontal scroll med navn under */}
          <div style={{padding:'22px 0 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10, padding:'0 24px'}}>
              {e.attendeeIds.length} deltakere
            </div>
            <div style={{display:'flex', gap:14, overflowX:'auto', padding:'0 24px 6px', scrollbarWidth:'none'}}>
              {e.attendeeIds.map(id => (
                <div key={id} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0, width:56}}>
                  <div style={{width:52, height:52, borderRadius:26, overflow:'hidden', background:HC.bgSoft, boxShadow:`0 0 0 2px ${HC.card}`}}>
                    {Avatar ? (
                      <Avatar id={id} size={52}/>
                    ) : (
                      <div style={{
                        width:'100%', height:'100%',
                        background:`linear-gradient(135deg, hsl(${hueFor(id)} 55% 60%), hsl(${hueFor(id)} 50% 42%))`,
                        color:'#FFF3E0', fontWeight:700, fontSize:19,
                        display:'flex', alignItems:'center', justifyContent:'center',
                      }}>{initialFor(id)}</div>
                    )}
                  </div>
                  <div style={{fontSize:11, color:HC.fg, fontWeight:500, textAlign:'center', letterSpacing:'-0.01em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', width:'100%'}}>
                    {nameFor(id).split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Om kvelden */}
          <div style={{padding:'24px 24px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
              Om kvelden
            </div>
            <div style={{fontSize:14, color:HC.fg, lineHeight:1.6, letterSpacing:'-0.005em'}}>
              {e.about}
            </div>
          </div>

          {/* Hva du kan snakke om */}
          <div style={{padding:'24px 24px 0'}}>
            <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:HC.fgDim, marginBottom:10}}>
              Hva du kan snakke om
            </div>
            <div style={{
              background:HC.card, borderRadius:14, padding:'4px 16px',
              boxShadow:'0 1px 8px rgba(42,33,52,.04)',
            }}>
              {e.starters.map((s, i) => (
                <div key={i} style={{
                  padding:'14px 0',
                  borderBottom: i < e.starters.length-1 ? `1px solid ${HC.divider}` : 'none',
                  display:'flex', gap:12, alignItems:'flex-start',
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:11, background:`${e.tint}18`,
                    color:e.tint, fontSize:11, fontWeight:700,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0, marginTop:1,
                  }}>{i+1}</div>
                  <div style={{fontSize:13.5, color:HC.fg, lineHeight:1.5, letterSpacing:'-0.005em'}}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress: plasser igjen */}
          <div style={{padding:'24px 24px 30px'}}>
            <div style={{
              background:HC.cream, borderRadius:14, padding:'16px 18px',
              border:`1px solid ${HC.divider}`,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div style={{fontSize:10.5, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:e.tint}}>
                  Plasser igjen
                </div>
                <div style={{fontSize:13, color:HC.fgDim, fontWeight:500}}>
                  {seatsLeft} av {e.seatsTotal}
                </div>
              </div>
              <div style={{fontSize:22, fontWeight:700, color:HC.fg, letterSpacing:'-0.02em', marginTop:6}}>
                {e.seatsTaken} har reservert
              </div>
              <div style={{height:8, borderRadius:4, background:HC.divider, marginTop:12, overflow:'hidden'}}>
                <div style={{
                  width:`${progressPct}%`, height:'100%',
                  background:`linear-gradient(90deg, ${e.tint}, ${HC.plum})`,
                  borderRadius:4,
                  transition:'width .4s ease',
                }}/>
              </div>
              {seatsLeft <= 2 && seatsLeft > 0 && (
                <div style={{fontSize:11.5, color:e.tint, fontWeight:600, marginTop:10, letterSpacing:'-0.005em'}}>
                  Kun {seatsLeft} {seatsLeft === 1 ? 'plass' : 'plasser'} igjen — reserver nå
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky bunn-CTA */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          padding:'16px 22px 22px',
          background:'rgba(244,237,231,.96)', backdropFilter:'blur(20px)',
          borderTop:`1px solid ${HC.divider}`,
        }}>
          <button onClick={reserve} style={{
            width:'100%', padding:'16px', borderRadius:28, border:'none',
            background:`linear-gradient(100deg, ${e.tint}, ${HC.plum})`,
            color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer',
            letterSpacing:'.01em',
            boxShadow:`0 8px 20px ${e.tint}40`,
            fontFamily:'inherit',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            <span>Reserver plass</span>
            <span style={{opacity:.85, fontWeight:600}}>· {e.price} kr</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ED_Meta({ icon, label, value }) {
  const svgProps = {width:14, height:14, viewBox:'0 0 14 14', fill:'none', stroke:'#fff', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round'};
  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
      <div style={{display:'flex', alignItems:'center', gap:5, opacity:.85}}>
        {icon === 'cal' && (
          <svg {...svgProps}><rect x="2" y="3" width="10" height="9" rx="1"/><path d="M5 1.5v3M9 1.5v3M2 6h10"/></svg>
        )}
        {icon === 'clock' && (
          <svg {...svgProps}><circle cx="7" cy="7" r="5"/><path d="M7 4v3l2 1.5"/></svg>
        )}
        {icon === 'dur' && (
          <svg {...svgProps}><path d="M2 7h10M8 3l4 4-4 4"/></svg>
        )}
        <span style={{fontSize:10.5, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase'}}>{label}</span>
      </div>
      <div style={{fontSize:13.5, fontWeight:700, letterSpacing:'-0.01em'}}>{value}</div>
    </div>
  );
}

window.H_ScreenEventDetail = ScreenEventDetail;
