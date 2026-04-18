/* global React, HC */
// Personas registry — 12 fiktive Oslo-personer for chat-prototypen.
// Avatarer hentes fra DiceBear "personas"-settet (fri tilgang, ingen auth).

const H_PERSONAS = {
  kari: {
    id: 'kari',
    firstName: 'Kari',
    lastName: 'Bratt',
    age: 31,
    bydel: 'Grunerlokka',
    bio: 'Journalist i Dagsavisen. Liker naturvin og lange spaserturer langs Akerselva.',
    tags: ['journalist', 'vin', 'sopptur'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=kari-bratt&backgroundColor=F0826B',
    gradient: 'linear-gradient(135deg,#E8B8A0,#B5694A)',
    chatPreview: 'Godt a se deg i gar. Takk for vinen.',
    lastSeen: 'sist aktiv: i gar',
    messages: [
      { from: 'kari', text: 'Tusen takk for i kveld, vinen var bedre enn jeg trodde.', time: '22:08' },
      { from: 'me',   text: 'Enig! Martine kan faget sitt.', time: '22:11' },
      { from: 'kari', text: 'Skal vi teste Sostrene Karlsen igjen? De har jazzkveld pa torsdager.', time: '22:14', reaction: 'heart' },
      { from: 'me',   text: 'Ja, gjerne. Neste torsdag?', time: '09:02' },
      { from: 'kari', text: 'Funker for meg. Setter det i kalenderen na.', time: '09:04' },
      { from: 'kari', text: 'Og, hvordan var brettspillkvelden sist?', time: '09:04' },
      { from: 'me',   text: 'Varmere enn jeg trodde. Erik vant i Codenames, haha.', time: '09:07', reaction: 'laugh' },
    ],
  },
  erik: {
    id: 'erik',
    firstName: 'Erik',
    lastName: 'Nordli',
    age: 34,
    bydel: 'Torshov',
    bio: 'Produktleder i Kahoot. Loper halvmaraton og samler pa LPer.',
    tags: ['produkt', 'lopng', 'vinyl'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=erik-nordli&backgroundColor=7895C4',
    gradient: 'linear-gradient(135deg,#7895C4,#2E4A75)',
    chatPreview: 'Skulle vi ikke prove det brettspillstedet?',
    lastSeen: 'sist aktiv: 2 timer siden',
    messages: [
      { from: 'erik', text: 'Hei! Husker du at vi snakket om Tilt pa Gronland?', time: '18:24' },
      { from: 'me',   text: 'Brettspillstedet? Ja, jeg har ikke vaert der enda.', time: '18:26' },
      { from: 'erik', text: 'Jeg booket bord fredag 19:00. Du, meg og Jonas. Er det lurt?', time: '18:27' },
      { from: 'me',   text: 'Topp. Jeg tar med Catan-ekspansjonen.', time: '18:32', reaction: 'fire' },
      { from: 'erik', text: 'Ha. Da taper jeg sikkert igjen.', time: '18:33' },
    ],
  },
  anja: {
    id: 'anja',
    firstName: 'Anja',
    lastName: 'Lundgren',
    age: 29,
    bydel: 'Majorstuen',
    bio: 'Yogalaerer pa Yoga Sky. Svensk, flyttet til Oslo for fire ar siden.',
    tags: ['yoga', 'mindfulness', 'te'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=anja-lundgren&backgroundColor=B788C9',
    gradient: 'linear-gradient(135deg,#B890D4,#6A3F8A)',
    chatPreview: 'skriver...',
    lastSeen: 'skriver...',
    messages: [
      { from: 'anja', text: 'Hei du! Kommer du pa morgenyoga i morgen?', time: '20:10' },
      { from: 'me',   text: 'Klokka seks er tidlig, men ja.', time: '20:14' },
      { from: 'anja', text: 'Haha. Etterpa drar vi pa Supreme Roastworks for kaffe.', time: '20:15', reaction: 'heart' },
      { from: 'me',   text: 'Solgt.', time: '20:16' },
      { from: 'anja', text: 'Tar med ekstra matte hvis du trenger.', time: '20:18' },
    ],
  },
  magnus: {
    id: 'magnus',
    firstName: 'Magnus',
    lastName: 'Oen',
    age: 38,
    bydel: 'Nordberg',
    bio: 'Snekker og smabarnsfar. Fikser alt fra kjokken til terrasser.',
    tags: ['hender', 'familie', 'tur'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=magnus-oen&backgroundColor=7AA374',
    gradient: 'linear-gradient(135deg,#8FB07C,#4C7147)',
    chatPreview: 'Jeg tar med grillkull til Sognsvann.',
    lastSeen: 'sist aktiv: i dag 11:02',
    messages: [
      { from: 'magnus', text: 'Far jeg lane sykkelhengeren din til helgen?', time: '14:02' },
      { from: 'me',     text: 'Klart det. Henter du den pa torsdag?', time: '14:10' },
      { from: 'magnus', text: 'Topp. Tar med en sekspakning Schouskjelleren som takk.', time: '14:11', reaction: 'thumbs' },
      { from: 'me',     text: 'Sjenerost. Hvordan gar det med Live?', time: '14:20' },
      { from: 'magnus', text: 'Sover endelig igjennom natta. Livet snur.', time: '14:22' },
    ],
  },
  siri: {
    id: 'siri',
    firstName: 'Siri',
    lastName: 'Haaland',
    age: 35,
    bydel: 'Sagene',
    bio: 'Designer i Bakken & Baeck. Kjoper for mange notisboker.',
    tags: ['design', 'keramikk', 'kino'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=siri-haaland&backgroundColor=C78BA6',
    gradient: 'linear-gradient(135deg,#C78BA6,#7A3E5A)',
    chatPreview: 'Vernissage pa Kunstnerforbundet i kveld?',
    lastSeen: 'sist aktiv: 15 min',
    messages: [
      { from: 'siri', text: 'Du, det er apning pa Kunstnerforbundet i kveld.', time: '16:40' },
      { from: 'siri', text: 'Gratis vin og keramikk. Orker du?', time: '16:40' },
      { from: 'me',   text: 'Nar starter det?', time: '16:52' },
      { from: 'siri', text: '19. Mote utenfor 18:45?', time: '16:53', reaction: 'heart' },
      { from: 'me',   text: 'Ses da.', time: '16:55' },
    ],
  },
  thomas: {
    id: 'thomas',
    firstName: 'Thomas',
    lastName: 'Berg',
    age: 32,
    bydel: 'Frogner',
    bio: 'Corporate finance i DNB. Tennisspiller pa Frogner Tennisklubb.',
    tags: ['finans', 'tennis', 'italia'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=thomas-berg&backgroundColor=D4A85C',
    gradient: 'linear-gradient(135deg,#D4A85C,#8A5A3B)',
    chatPreview: 'Padel sondag 11?',
    lastSeen: 'sist aktiv: 3 timer siden',
    messages: [
      { from: 'thomas', text: 'Padelbane ledig sondag 11:00 pa Hasle. Du inne?', time: '21:00' },
      { from: 'me',     text: 'Ja! Spiller vi 2 sett?', time: '21:04' },
      { from: 'thomas', text: 'Tre. Og bror min blir med.', time: '21:05' },
      { from: 'me',     text: 'Deal. Taper nok som vanlig.', time: '21:06', reaction: 'laugh' },
    ],
  },
  linnea: {
    id: 'linnea',
    firstName: 'Linnea',
    lastName: 'Vik',
    age: 28,
    bydel: 'Bjolsen',
    bio: 'Tekstforfatter i byra, skriver noveller ved siden av. Eier katten Bror.',
    tags: ['tekst', 'litteratur', 'katt'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=linnea-vik&backgroundColor=F0826B',
    gradient: 'linear-gradient(135deg,#F4A28D,#C45A44)',
    chatPreview: 'Fant en ny bokkafe pa Torshov.',
    lastSeen: 'sist aktiv: i gar',
    messages: [
      { from: 'linnea', text: 'Gutta pa Skur 13 har apnet bokkafe. Helt magisk.', time: '10:15' },
      { from: 'me',     text: 'Venter de pa oss neste lordag?', time: '10:20' },
      { from: 'linnea', text: 'Haha ja. Jeg har med den nye Tokarczuk-boka du ma lane.', time: '10:22', reaction: 'heart' },
    ],
  },
  ola: {
    id: 'ola',
    firstName: 'Ola',
    lastName: 'Ronning',
    age: 36,
    bydel: 'Ulleval',
    bio: 'Fastlege i Oslo kommune. Lost trail runner pa fritiden.',
    tags: ['lege', 'lopng', 'jazz'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=ola-ronning&backgroundColor=7AA374',
    gradient: 'linear-gradient(135deg,#7AA374,#3E6B3C)',
    chatPreview: 'Du: Ja! Jazzklubben blir topp',
    lastSeen: 'sist aktiv: 5 timer siden',
    messages: [
      { from: 'ola', text: 'Herr Nilsen har Tord Gustavsen-trio torsdag.', time: '19:00' },
      { from: 'me',  text: 'Gustavsen live er rent religios.', time: '19:08' },
      { from: 'ola', text: 'Jeg bestiller to billetter na.', time: '19:09' },
      { from: 'me',  text: 'Ja! Jazzklubben blir topp.', time: '19:10', reaction: 'fire' },
    ],
  },
  ida: {
    id: 'ida',
    firstName: 'Ida',
    lastName: 'Sandmo',
    age: 30,
    bydel: 'Sofienberg',
    bio: 'Norsklaerer pa Elvebakken. Baker surdeig i helgene.',
    tags: ['laerer', 'baking', 'hage'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=ida-sandmo&backgroundColor=D4A85C',
    gradient: 'linear-gradient(135deg,#E8C98F,#8E6C3E)',
    chatPreview: 'Bakte fokkacia, kom innom.',
    lastSeen: 'sist aktiv: i dag 08:30',
    messages: [
      { from: 'ida', text: 'Har bakt for mye fokkacia. Vil du ha et brett?', time: '12:05' },
      { from: 'me',  text: 'Ja takk! Kommer innom etter jobb.', time: '12:12', reaction: 'heart' },
      { from: 'ida', text: 'Jeg er hjemme fra 17. Sofienberggata 8.', time: '12:13' },
    ],
  },
  jonas: {
    id: 'jonas',
    firstName: 'Jonas',
    lastName: 'Krog',
    age: 33,
    bydel: 'Kampen',
    bio: 'Gitarist i bandet Nordre Pol. Selger platespiller pa dagtid.',
    tags: ['musikk', 'vinyl', 'kampen'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=jonas-krog&backgroundColor=7F4D95',
    gradient: 'linear-gradient(135deg,#9A6FB3,#5E3071)',
    chatPreview: 'Nordre Pol spiller pa Revolver 3. mai.',
    lastSeen: 'sist aktiv: 30 min',
    messages: [
      { from: 'jonas', text: 'Vi spiller pa Revolver 3. mai. Kommer du?', time: '13:22' },
      { from: 'me',    text: 'Selvsagt! Setter det i kalenderen.', time: '13:28' },
      { from: 'jonas', text: 'Takk du. Setter opp gjesteliste + ekstra ol.', time: '13:29', reaction: 'fire' },
      { from: 'me',    text: 'Tar med Erik og Kari.', time: '13:31' },
    ],
  },
  marte: {
    id: 'marte',
    firstName: 'Marte',
    lastName: 'Lien',
    age: 27,
    bydel: 'St. Hanshaugen',
    bio: 'Marinbiolog i Havforskningsinstituttet. Dykkerinstruktor i Hvaler.',
    tags: ['biologi', 'dykking', 'hav'],
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=marte-lien&backgroundColor=7895C4',
    gradient: 'linear-gradient(135deg,#8DB1D4,#3A628C)',
    chatPreview: 'Tang-tur pa Hvaler 27. april?',
    lastSeen: 'sist aktiv: i dag 09:41',
    messages: [
      { from: 'marte', text: 'Organiserer tang-tur pa Hvaler 27. april. Bli med!', time: '11:00' },
      { from: 'me',    text: 'Hva gjor man pa en tang-tur?', time: '11:11', reaction: 'laugh' },
      { from: 'marte', text: 'Plukker, lager suppe og snakker om havet. Det blir deilig.', time: '11:12' },
      { from: 'me',    text: 'Ok, jeg er med.', time: '11:15' },
    ],
  },
  frida: {
    id: 'frida',
    firstName: 'Frida',
    lastName: '',
    age: null,
    bydel: 'Oslo',
    bio: 'Din AI-venninne pa Speedfriending. Foreslar mote og sender hyggelige paminnelser.',
    tags: ['ai', 'guide', 'frida'],
    avatarUrl: null,
    gradient: 'linear-gradient(135deg,#B788C9,#5E3071)',
    chatPreview: 'Foreslo en vinkveld, vil du se?',
    lastSeen: 'alltid pa',
    isAi: true,
    messages: [
      { from: 'frida', text: 'God morgen, Viktor. Jeg sa at du hadde en fin kveld med Kari.', time: '09:12' },
      { from: 'frida', text: 'Har du lyst pa et forslag til torsdag?', time: '09:13' },
      { from: 'me',    text: 'Ja, gjerne.', time: '09:20' },
      { from: 'frida', text: 'Vinkveld med Martine pa Sostrene Karlsen. Kari kommer.', time: '09:21', reaction: 'heart' },
    ],
  },
};

// Helper: rendrer et <img> med DiceBear. Fallback til gradient + initial ved feil.
function H_PersonaAvatar({ id, size = 44, ring, fridaStyle }) {
  const p = H_PERSONAS[id];
  const [failed, setFailed] = React.useState(false);
  const s = size;

  if (!p) {
    return (
      <div style={{
        width: s, height: s, borderRadius: s/2,
        background: 'linear-gradient(135deg,#CCC,#999)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFF', fontWeight: 700, fontSize: s*0.34,
      }}>?</div>
    );
  }

  // Frida har egen stjerne-stil (aldri DiceBear-img)
  if (p.isAi || fridaStyle) {
    return (
      <div style={{
        width: s, height: s, borderRadius: s/2,
        background: `linear-gradient(135deg, ${HC.lilac}, ${HC.plum})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 2px 10px ${HC.plum}40`,
        position: 'relative',
      }}>
        <svg width={s*0.5} height={s*0.5} viewBox="0 0 20 20">
          <path d="M10 2l1.8 5.4L17 9l-5.2 1.6L10 16l-1.8-5.4L3 9l5.2-1.6z" fill="#FFF3E0" opacity="0.95"/>
          <circle cx="15.5" cy="4.5" r="1.2" fill="#FFF3E0" opacity="0.75"/>
          <circle cx="4" cy="15" r="0.9" fill="#FFF3E0" opacity="0.6"/>
        </svg>
      </div>
    );
  }

  const ringStyle = ring ? { boxShadow: `0 0 0 2px ${HC.bg}, 0 0 0 3px ${ring}` } : {};

  if (failed || !p.avatarUrl) {
    const initial = (p.firstName || '?')[0];
    return (
      <div style={{
        width: s, height: s, borderRadius: s/2,
        background: p.gradient || 'linear-gradient(135deg,#B890D4,#6A3F8A)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFF3E0', fontWeight: 700, fontSize: s*0.34,
        ...ringStyle,
      }}>{initial}</div>
    );
  }

  return (
    <div style={{
      width: s, height: s, borderRadius: s/2,
      background: p.gradient,
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...ringStyle,
    }}>
      <img
        src={p.avatarUrl}
        alt={p.firstName}
        width={s}
        height={s}
        onError={() => setFailed(true)}
        style={{ width: s, height: s, objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

Object.assign(window, { H_PERSONAS, H_PersonaAvatar });
