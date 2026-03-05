import { useState, useRef, useEffect } from "react";

const INITIAL_GUESTS = [
  { id: 1, name: "Cesar", emoji: "🤵", role: "THE GROOM", roleClass: "groom", desc: "The man, the myth, the soon-to-be-married legend. This is HIS weekend." },
  { id: 2, name: "Chris", emoji: "🏆", role: "BEST MAN", roleClass: "bestman", desc: "The best man. Holding it down for Cesar since day one." },
  { id: 3, name: "Michael", emoji: "💻", role: "WEBSITE GUY", roleClass: "webguy", desc: "Built this whole site so y'all wouldn't be lost. You're welcome." },
  { id: 4, name: "Nate", emoji: "🏴‍☠️", role: "OG HOMIE", roleClass: "og", desc: "The One Piece glazer. Him and Michael are the OG homies. Certified day-one." },
  { id: 5, name: "Omar", emoji: "🃏", role: "CREW", roleClass: "crew", desc: "" },
  { id: 6, name: "Kevin", emoji: "🎯", role: "CREW", roleClass: "crew", desc: "" },
  { id: 7, name: "Anthony", emoji: "🎰", role: "CREW", roleClass: "crew", desc: "" },
  { id: 8, name: "Adrian", emoji: "💰", role: "MASTER GAMBLER", roleClass: "gambler", desc: "Will bet on anything. Will win on anything. Just don't push him in the pool — this man CANNOT swim. 🚫🏊" },
  { id: 9, name: "Justin", emoji: "🥊", role: "CREW", roleClass: "crew", desc: "" },
  { id: 10, name: "Vladimir", emoji: "🐻", role: "CREW", roleClass: "crew", desc: "" },
  { id: 11, name: "Steve", emoji: "🎸", role: "CREW", roleClass: "crew", desc: "" },
  { id: 12, name: "TBD", emoji: "❓", role: "MYSTERY SOLDIER", roleClass: "mystery", desc: "Nobody knows who this guy is. Not even Michael. But he's coming." },
];

const SCHEDULE = [
  {
    day: "Friday", date: "March 13, 2026", color: "#C9A84C",
    events: [
      { time: "3:00 PM", title: "Hotel Check-In", emoji: "🏨", tag: "MANDATORY", tagType: "mandatory",
        location: "The LINQ Hotel + Experience",
        address: "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "We're staying at The LINQ, right across from Caesars Palace. Smack in the middle of the Strip. Drop your bags, check in, and get your head right — the weekend starts the second you walk through that door. If you're flying in, coordinate your rides beforehand. No one's playing Uber driver." },
      { time: "Afternoon → Evening", title: "Eat. Drink. Gamble.", emoji: "🎰",
        location: "The Strip & LINQ Promenade",
        address: "3545 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "Free reign. Hit the tables, find a steakhouse, post up at a bar, or explore the Strip. The LINQ Promenade is right there — High Roller, bars, food, all of it. This is your warmup. Pace yourself... Friday night hasn't even started yet.",
        note: "Pro tip: Eat a real meal. Don't be the guy who's done by 9pm because you skipped lunch and had 4 tequilas." },
      { time: "9:55 PM Sharp", title: "Party Bus — Bar Hopping", emoji: "🚌", tag: "DON'T BE LATE", tagType: "warning",
        location: "Pickup: LINQ Hotel Front Entrance",
        address: "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "The party bus picks us up at 9:55 PM. Not 10. Not \"on my way.\" If you are not standing outside at 9:50, you are getting left behind. The bus takes us bar hopping across Vegas. Dress to impress — no flip flops, no gym shorts.",
        note: "Lobby call: 9:45 PM. Bus departs: 9:55 PM. No exceptions." },
    ]
  },
  {
    day: "Saturday", date: "March 14, 2026", color: "#C9A84C",
    events: [
      { time: "11:00 AM", title: "Off-Roading in the Desert", emoji: "🏜️", tag: "ADVENTURE", tagType: "mandatory",
        location: "Desert Off-Road Experience",
        address: "Pickup from LINQ Hotel Lobby at 10:30 AM",
        desc: "We're taking it off-road. Buggies, dust, desert, chaos — this is gonna be one of the highlights of the trip. About 30–45 min outside the city. Transportation is handled. Just show up ready to get dirty.",
        callout: { title: "⚠️ Outfit Advisory — Read This", text: "Wear a hoodie or long sleeve — it gets WINDY out there and the sand hits different at 40mph. You WILL get dusty. Do NOT wear anything nice. Leave the Jordans at the hotel. Wear shoes you don't care about. Bring sunglasses and sunscreen." } },
      { time: "2:00 PM", title: "Back to Hotel — Recharge", emoji: "🚿",
        location: "The LINQ Hotel",
        address: "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "Shower. Eat. Nap if you need to. Saturday night is a big one so use this time wisely. Plenty of food spots at the LINQ and nearby — grab lunch, hydrate, and get ready for dinner.",
        note: "The LINQ food court and Hash House A Go Go are solid lunch moves." },
      { time: "8:00 PM", title: "Dinner @ Carmine's", emoji: "🍝", tag: "MANDATORY", tagType: "mandatory",
        location: "Carmine's Italian Restaurant — Forum Shops at Caesars",
        address: "3500 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "Italian family-style dinner. Literally across the street from our hotel. Portions are MASSIVE, meant to share. Come hungry. This is the squad dinner so everyone needs to be there. Look presentable. Reservation for 12." },
      { time: "After Dinner", title: "After Dinner Plans", emoji: "🤫", tag: "TO BE ANNOUNCED", tagType: "tba",
        location: "TBA",
        address: "Details coming soon",
        desc: "Something is in the works. Details are being finalized. Stay ready so you don't have to get ready." },
    ]
  },
  {
    day: "Sunday", date: "March 15, 2026", color: "#C9A84C",
    events: [
      { time: "8:00 AM", title: "Pool Cabana @ Circa", emoji: "🏊", tag: "MANDATORY", tagType: "mandatory",
        location: "Stadium Swim — Circa Resort & Casino",
        address: "8 Fremont St, Las Vegas, NV 89101",
        desc: "Yes it's early. Yes you're probably hungover. Too bad — we have a cabana reserved at Circa's Stadium Swim. One of the best pool setups in all of Vegas. Multiple tiers, a massive screen, and bottle service vibes. This is the recovery session.",
        callout: { title: "🏊 Pool Reminder", text: "Bring swim trunks, sunscreen, and sunglasses. Towels provided. If you didn't pack trunks, the hotel gift shop has overpriced ones. Adrian — stay in the shallow end. We mean it." } },
      { time: "8:30 PM", title: "Dinner @ Hell's Kitchen", emoji: "🔥", tag: "MANDATORY", tagType: "mandatory",
        location: "Gordon Ramsay Hell's Kitchen — Caesars Palace",
        address: "3570 S Las Vegas Blvd, Las Vegas, NV 89109",
        desc: "The last supper. Cesar's final dinner as a free man. This is the one you dress up for — collared shirts, clean shoes, look sharp. The food is elite and the experience is worth it. Reservation for 12.",
        note: "Dress code: Smart casual minimum. No shorts, no sneakers, no excuses." },
    ]
  }
];

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const css = `
  :root {
    --gold: #C9A84C;
    --gold-light: #E8D48B;
    --gold-dim: #8B7531;
    --ruby: #8B2942;
    --ruby-light: #C74B6F;
    --ivory: #F0EAE0;
    --dark: #0A0A0F;
    --dark-card: #111118;
    --dark-card-hover: #161620;
    --muted: #8A8A9A;
    --muted-light: #A0A0AE;
    --border: rgba(201,168,76,0.12);
  }

  .app * { margin: 0; padding: 0; box-sizing: border-box; }
  .app {
    background: var(--dark);
    color: var(--ivory);
    font-family: 'Libre Baskerville', Georgia, serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    line-height: 1.6;
  }

  /* ===== TOP NAV ===== */
  .top-nav {
    position: sticky; top: 0; z-index: 200;
    background: rgba(10,10,15,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; justify-content: center; gap: 0;
    padding: 0;
  }
  .top-nav::after {
    content: ''; position: absolute; bottom: 0; left: 5%; right: 5%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.25;
  }
  .tn-btn {
    font-family: 'Cinzel', serif;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 3px;
    padding: 1.1rem 1.8rem;
    background: none; border: none;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.3s;
    text-transform: uppercase;
    position: relative;
    border-bottom: 2px solid transparent;
  }
  .tn-btn:hover { color: var(--ivory); }
  .tn-btn.active {
    color: var(--gold);
    border-bottom-color: var(--gold);
  }

  /* ===== COUNTDOWN PAGE ===== */
  .countdown-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 2rem 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .countdown-page::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(139,41,66,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(139,41,66,0.04) 0%, transparent 50%);
    pointer-events: none;
  }

  .cd-ornament {
    font-size: 1.8rem; color: var(--gold-dim); opacity: 0.35;
    letter-spacing: 12px; margin-bottom: 1.5rem;
    font-family: 'Cinzel Decorative', serif;
  }
  .cd-label {
    font-family: 'Cinzel', serif;
    font-weight: 500; font-size: 1rem;
    letter-spacing: 8px; color: var(--gold-dim);
    text-transform: uppercase; margin-bottom: 2rem;
  }
  .cd-grid {
    display: flex; justify-content: center;
    gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem;
  }
  .cd-item { display: flex; flex-direction: column; align-items: center; min-width: 100px; }
  .cd-num {
    font-family: 'Cinzel Decorative', serif;
    font-weight: 900;
    font-size: clamp(4rem, 10vw, 7rem);
    color: var(--gold);
    line-height: 1;
  }
  .cd-unit {
    font-family: 'Cinzel', serif;
    font-weight: 500; font-size: 0.85rem;
    letter-spacing: 6px; color: var(--gold-dim);
    margin-top: 0.5rem; text-transform: uppercase;
  }
  .cd-done {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--gold); margin-bottom: 3rem;
  }
  .cd-divider {
    width: 80px; height: 1px; margin: 0 auto 2.5rem;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.3;
  }
  .cd-title {
    font-family: 'Cinzel Decorative', serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 8vw, 5.5rem);
    line-height: 1.05; color: var(--ivory);
    margin-bottom: 0.3rem;
  }
  .cd-title .gold {
    display: block;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    font-weight: 600;
    font-size: clamp(1.2rem, 4vw, 2.2rem);
    letter-spacing: 12px;
    margin-bottom: 0.5rem;
  }
  .cd-sub {
    font-family: 'Cinzel', serif; font-weight: 400;
    font-size: 1.1rem; letter-spacing: 8px;
    color: var(--muted); margin-top: 1.5rem; text-transform: uppercase;
  }
  .cd-hotel {
    font-size: 0.95rem; font-style: italic;
    color: var(--gold-dim); margin-top: 1.2rem; letter-spacing: 1px;
  }
  .cd-badge {
    display: inline-block; border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-family: 'Cinzel', serif;
    font-size: 0.8rem; font-weight: 600;
    letter-spacing: 5px; padding: 0.6rem 2rem;
    margin-top: 2rem; border-radius: 100px;
    position: relative; text-transform: uppercase;
  }

  /* ===== CONTENT WRAPPER ===== */
  .page { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; animation: fadeIn 0.3s ease; }
  .page-title {
    font-family: 'Cinzel Decorative', serif; font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    color: var(--gold); margin-bottom: 0.4rem;
  }
  .page-sub {
    font-family: 'Cinzel', serif; font-weight: 400;
    font-size: 0.8rem; letter-spacing: 5px;
    color: var(--muted); margin-bottom: 0.8rem; text-transform: uppercase;
  }
  .page-divider { width: 50px; height: 1px; background: var(--gold); opacity: 0.25; margin-bottom: 2.5rem; }

  /* ===== SCHEDULE — VIEW TOGGLE ===== */
  .view-toggle { display: flex; gap: 0; margin-bottom: 2.5rem; }
  .vt-btn {
    font-family: 'Cinzel', serif; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 3px; padding: 0.7rem 1.5rem;
    background: none; border: 1px solid rgba(255,255,255,0.06);
    color: var(--muted); cursor: pointer; transition: all 0.3s; text-transform: uppercase;
  }
  .vt-btn:first-child { border-radius: 6px 0 0 6px; }
  .vt-btn:last-child { border-radius: 0 6px 6px 0; }
  .vt-btn.active { border-color: rgba(201,168,76,0.3); color: var(--gold); background: rgba(201,168,76,0.06); }

  /* ===== DAY SECTION (Cards & Agenda) ===== */
  .day-block { margin-bottom: 3rem; }
  .day-label {
    font-family: 'Cinzel Decorative', serif; font-weight: 700;
    font-size: 1.8rem; color: var(--gold); margin-bottom: 0.2rem;
  }
  .day-date-label {
    font-family: 'Cinzel', serif; font-weight: 400;
    font-size: 0.8rem; letter-spacing: 4px;
    color: var(--muted); margin-bottom: 1.5rem; text-transform: uppercase;
  }

  /* ===== EVENT CARD ===== */
  .ev-card {
    background: var(--dark-card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.8rem; margin-bottom: 1.2rem;
    position: relative; transition: all 0.3s; overflow: hidden;
  }
  .ev-card:hover {
    background: var(--dark-card-hover); transform: translateY(-2px);
    border-color: rgba(201,168,76,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .ev-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, var(--gold), var(--gold-dim));
    border-radius: 3px 0 0 3px;
  }
  .ev-emoji { font-size: 1.6rem; position: absolute; top: 1.5rem; right: 1.5rem; }
  .ev-time {
    font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.75rem; letter-spacing: 4px;
    color: var(--gold); margin-bottom: 0.5rem; text-transform: uppercase;
  }
  .ev-title {
    font-family: 'Cinzel', serif; font-weight: 700;
    font-size: 1.35rem; margin-bottom: 0.4rem;
    padding-right: 2.5rem; color: var(--ivory); line-height: 1.3;
  }
  .ev-location {
    font-family: 'Cinzel', serif; font-weight: 500;
    font-size: 0.8rem; color: var(--muted-light);
    margin-bottom: 0.15rem;
  }
  .ev-address {
    font-size: 0.78rem; color: var(--muted);
    font-style: italic; margin-bottom: 0.8rem;
  }
  .ev-desc { font-size: 0.9rem; color: var(--muted-light); line-height: 1.85; }
  .ev-note {
    font-size: 0.82rem; color: rgba(240,234,224,0.35);
    line-height: 1.6; margin-top: 0.7rem; font-style: italic;
  }
  .ev-tag {
    display: inline-block; font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.6rem; letter-spacing: 3px; padding: 0.3rem 1rem;
    border-radius: 100px; margin-top: 1rem; text-transform: uppercase;
  }
  .tag-mandatory { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25); color: var(--gold); }
  .tag-warning { background: rgba(139,41,66,0.1); border: 1px solid rgba(139,41,66,0.3); color: var(--ruby-light); }
  .tag-tba { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: var(--muted); }

  .callout {
    background: rgba(201,168,76,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    border-left: 3px solid var(--gold-dim);
    border-radius: 0 8px 8px 0;
    padding: 1.2rem 1.5rem; margin-top: 1rem;
  }
  .callout-title {
    font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.7rem; letter-spacing: 3px;
    color: var(--gold); margin-bottom: 0.5rem; text-transform: uppercase;
  }
  .callout-text { font-size: 0.85rem; color: var(--muted); line-height: 1.75; }

  /* ===== HORIZONTAL TIMELINE ===== */
  .htl-day { margin-bottom: 3rem; }
  .htl-day-header {
    display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
  }
  .htl-day-title {
    font-family: 'Cinzel Decorative', serif; font-weight: 700;
    font-size: 1.4rem; color: var(--gold); white-space: nowrap;
  }
  .htl-day-date {
    font-family: 'Cinzel', serif; font-size: 0.7rem;
    letter-spacing: 3px; color: var(--muted); text-transform: uppercase;
  }
  .htl-day-line { flex: 1; height: 1px; background: var(--border); }

  .htl-scroll {
    display: flex; gap: 1.2rem;
    overflow-x: auto; padding-bottom: 1rem;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  }
  .htl-scroll::-webkit-scrollbar { height: 4px; }
  .htl-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
  .htl-scroll::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 4px; }

  .htl-card {
    min-width: 300px; max-width: 340px; flex-shrink: 0;
    scroll-snap-align: start;
    background: var(--dark-card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.5rem;
    position: relative; transition: all 0.3s;
  }
  .htl-card:hover {
    background: var(--dark-card-hover); transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    border-color: rgba(201,168,76,0.2);
  }
  .htl-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-dim));
    border-radius: 12px 12px 0 0;
  }
  .htl-emoji { font-size: 1.8rem; margin-bottom: 0.8rem; }
  .htl-time {
    font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.7rem; letter-spacing: 3px;
    color: var(--gold); margin-bottom: 0.5rem; text-transform: uppercase;
  }
  .htl-title {
    font-family: 'Cinzel', serif; font-weight: 700;
    font-size: 1.15rem; color: var(--ivory); margin-bottom: 0.4rem; line-height: 1.3;
  }
  .htl-location {
    font-family: 'Cinzel', serif; font-weight: 500;
    font-size: 0.75rem; color: var(--muted-light); margin-bottom: 0.1rem;
  }
  .htl-address { font-size: 0.72rem; color: var(--muted); font-style: italic; margin-bottom: 0.6rem; }
  .htl-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.7; }
  .htl-tag { margin-top: 0.8rem; }

  /* ===== AGENDA VIEW ===== */
  .ag-row {
    display: flex; gap: 1.5rem; padding: 1.5rem 0;
    border-bottom: 1px solid var(--border); align-items: flex-start;
  }
  .ag-time-col { min-width: 100px; text-align: right; padding-top: 4px; flex-shrink: 0; }
  .ag-time {
    font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.7rem; letter-spacing: 3px;
    color: var(--gold); text-transform: uppercase;
  }
  .ag-bar { width: 2px; border-radius: 2px; min-height: 50px; flex-shrink: 0; align-self: stretch; background: linear-gradient(to bottom, var(--gold), var(--gold-dim)); }
  .ag-info { flex: 1; }
  .ag-title {
    font-family: 'Cinzel', serif; font-weight: 700;
    font-size: 1.1rem; color: var(--ivory); margin-bottom: 0.2rem;
  }
  .ag-location { font-size: 0.82rem; color: var(--muted-light); margin-bottom: 0.1rem; }
  .ag-address { font-size: 0.78rem; color: var(--muted); font-style: italic; margin-bottom: 0.4rem; }
  .ag-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

  /* ===== ROSTER ===== */
  .roster-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
  .r-card {
    background: var(--dark-card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.5rem 1.2rem;
    text-align: center; transition: all 0.3s; position: relative; overflow: hidden;
  }
  .r-card:hover { background: var(--dark-card-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .r-card.groom { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.04); }
  .r-card.bestman { border-color: rgba(240,234,224,0.2); background: rgba(240,234,224,0.02); }
  .r-card.og { border-color: rgba(139,41,66,0.3); background: rgba(139,41,66,0.04); }
  .r-card.webguy { border-color: rgba(100,149,237,0.25); background: rgba(100,149,237,0.03); }
  .r-card.gambler { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.03); }
  .r-card.mystery { border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.01); }

  .r-avatar {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(201,168,76,0.06); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 0.8rem; font-size: 1.6rem;
  }
  .r-card.groom .r-avatar { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.3); }
  .r-name { font-family: 'Cinzel', serif; font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; color: var(--ivory); }
  .r-role { font-family: 'Cinzel', serif; font-weight: 500; font-size: 0.6rem; letter-spacing: 3px; margin-top: 0.3rem; text-transform: uppercase; }
  .role-groom { color: var(--gold); } .role-bestman { color: var(--ivory); }
  .role-og { color: var(--ruby-light); } .role-webguy { color: #6495ED; }
  .role-gambler { color: var(--gold); } .role-mystery { color: var(--muted); } .role-crew { color: var(--muted); }
  .r-desc { font-size: 0.78rem; color: var(--muted); margin-top: 0.6rem; line-height: 1.55; font-style: italic; }
  .r-edit-btn {
    position: absolute; top: 10px; right: 10px;
    background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15);
    color: var(--gold-dim); font-family: 'Cinzel', serif;
    font-size: 0.6rem; font-weight: 600; letter-spacing: 2px;
    padding: 5px 12px; border-radius: 4px;
    cursor: pointer; transition: all 0.2s; text-transform: uppercase;
  }
  .r-edit-btn:hover { background: rgba(201,168,76,0.12); color: var(--gold); }
  .r-crown { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); font-size: 1.2rem; }

  /* ===== MODAL ===== */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(6px); }
  .modal {
    background: #141420; border: 1px solid rgba(201,168,76,0.2);
    border-radius: 14px; padding: 2rem; width: 100%; max-width: 440px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  }
  .modal-title { font-family: 'Cinzel', serif; font-weight: 700; font-size: 1.2rem; margin-bottom: 1.2rem; color: var(--gold); }
  .modal label {
    display: block; font-family: 'Cinzel', serif; font-size: 0.6rem; font-weight: 600;
    letter-spacing: 3px; color: var(--gold-dim); margin-bottom: 0.3rem; margin-top: 1rem; text-transform: uppercase;
  }
  .modal input, .modal textarea {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.12);
    border-radius: 8px; padding: 0.75rem 1rem; color: var(--ivory);
    font-family: 'Libre Baskerville', serif; font-size: 0.9rem; outline: none; transition: border 0.2s;
  }
  .modal input:focus, .modal textarea:focus { border-color: rgba(201,168,76,0.4); }
  .modal textarea { min-height: 90px; resize: vertical; }
  .modal-btns { display: flex; gap: 0.8rem; margin-top: 1.5rem; }
  .btn-save {
    flex: 1; padding: 0.8rem; background: linear-gradient(135deg, var(--gold), var(--gold-dim));
    color: var(--dark); border: none; border-radius: 8px;
    font-family: 'Cinzel', serif; font-weight: 700; font-size: 0.75rem;
    letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
  }
  .btn-save:hover { filter: brightness(1.1); }
  .btn-cancel {
    flex: 1; padding: 0.8rem; background: none; border: 1px solid rgba(255,255,255,0.08);
    color: var(--muted); border-radius: 8px; font-family: 'Cinzel', serif; font-weight: 600;
    font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
  }
  .btn-cancel:hover { border-color: rgba(255,255,255,0.15); color: var(--ivory); }

  /* ===== PHOTOS ===== */
  .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
  .photo-item { aspect-ratio: 1; border-radius: 10px; overflow: hidden; position: relative; cursor: pointer; border: 1px solid var(--border); }
  .photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .photo-item:hover img { transform: scale(1.06); }
  .photo-delete {
    position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: 50%;
    background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.15);
    color: var(--ivory); font-size: 0.75rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;
  }
  .photo-item:hover .photo-delete { opacity: 1; }
  .photo-upload {
    aspect-ratio: 1; border-radius: 10px; border: 1px dashed rgba(201,168,76,0.2);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.3s; background: rgba(201,168,76,0.01);
  }
  .photo-upload:hover { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.04); }
  .photo-upload-icon { font-size: 2.2rem; margin-bottom: 0.5rem; }
  .photo-upload-text { font-family: 'Cinzel', serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 3px; color: var(--gold-dim); text-transform: uppercase; }

  .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.94); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 2rem; cursor: pointer; }
  .lightbox img { max-width: 92%; max-height: 90vh; object-fit: contain; border-radius: 8px; }
  .lightbox-close { position: absolute; top: 1.5rem; right: 2rem; color: var(--gold-dim); font-size: 2.2rem; cursor: pointer; background: none; border: none; }

  /* ===== RULES ===== */
  .rule-item { display: flex; gap: 1.2rem; align-items: flex-start; padding: 1.3rem 0; border-bottom: 1px solid var(--border); }
  .rule-num { font-family: 'Cinzel Decorative', serif; font-weight: 700; font-size: 1.5rem; color: var(--gold); opacity: 0.3; min-width: 2.5rem; }
  .rule-text { font-size: 0.95rem; color: var(--muted); line-height: 1.75; }

  .footer { text-align: center; padding: 3rem 1.5rem; border-top: 1px solid var(--border); }
  .footer-text { font-family: 'Cinzel', serif; font-weight: 500; font-size: 0.7rem; letter-spacing: 5px; color: var(--muted); opacity: 0.35; text-transform: uppercase; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  @media (max-width: 640px) {
    .tn-btn { font-size: 0.65rem; padding: 0.9rem 0.7rem; letter-spacing: 1px; }
    .page { padding: 2rem 1rem 4rem; }
    .cd-grid { gap: 1rem; }
    .cd-num { font-size: clamp(3rem, 12vw, 5rem); }
    .cd-unit { font-size: 0.7rem; letter-spacing: 4px; }
    .htl-card { min-width: 270px; }
    .roster-grid { grid-template-columns: repeat(2, 1fr); }
    .photo-grid { grid-template-columns: repeat(2, 1fr); }
    .ag-time-col { min-width: 75px; }
    .ag-row { gap: 1rem; }
  }
`;

export default function App() {
  const [tab, setTab] = useState("countdown");
  const [schedView, setSchedView] = useState("cards");
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [editGuest, setEditGuest] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", desc: "" });
  const [photos, setPhotos] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [cd, setCd] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  const fileRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const target = new Date("2026-03-13T15:00:00-07:00");
      const diff = target - new Date();
      if (diff <= 0) { setCd({ d: 0, h: 0, m: 0, s: 0, done: true }); return; }
      setCd({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
        done: false
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openEdit = (g) => { setEditGuest(g); setEditForm({ name: g.name, role: g.role, desc: g.desc }); };
  const saveEdit = () => {
    setGuests(prev => prev.map(g => g.id === editGuest.id ? { ...g, name: editForm.name, role: editForm.role, desc: editForm.desc } : g));
    setEditGuest(null);
  };
  const handlePhoto = (e) => {
    Array.from(e.target.files).forEach(f => {
      const r = new FileReader();
      r.onload = (ev) => setPhotos(prev => [...prev, { src: ev.target.result, name: f.name }]);
      r.readAsDataURL(f);
    });
    e.target.value = "";
  };

  const tabs = [["countdown","HOME"],["schedule","SCHEDULE"],["roster","THE CREW"],["photos","PHOTOS"],["rules","RULES"]];

  return (
    <div className="app">
      <style>{css}</style>

      {/* TOP NAV */}
      <nav className="top-nav">
        {tabs.map(([k,l]) => (
          <button key={k} className={`tn-btn ${tab===k?"active":""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </nav>

      {/* COUNTDOWN / HOME */}
      {tab === "countdown" && (
        <section className="countdown-page">
          <div className="cd-ornament">♠ ♦ ♣ ♥</div>
          <div className="cd-label">Countdown to Chaos</div>
          {cd.done ? (
            <div className="cd-done">🎰 It's Go Time 🎰</div>
          ) : (
            <div className="cd-grid">
              <div className="cd-item"><div className="cd-num">{cd.d}</div><div className="cd-unit">Days</div></div>
              <div className="cd-item"><div className="cd-num">{String(cd.h).padStart(2,"0")}</div><div className="cd-unit">Hours</div></div>
              <div className="cd-item"><div className="cd-num">{String(cd.m).padStart(2,"0")}</div><div className="cd-unit">Minutes</div></div>
              <div className="cd-item"><div className="cd-num">{String(cd.s).padStart(2,"0")}</div><div className="cd-unit">Seconds</div></div>
            </div>
          )}
          <div className="cd-divider" />
          <div className="cd-title">
            <span className="gold">Cesar's</span>
            Last Ride
          </div>
          <div className="cd-sub">Las Vegas, Nevada</div>
          <div className="cd-hotel">📍 The LINQ Hotel — Across from Caesars Palace</div>
          <div className="cd-badge">👥 12 Deep · March 13–16</div>
        </section>
      )}

      {/* SCHEDULE */}
      {tab === "schedule" && (
        <div className="page">
          <div className="page-title">The Itinerary</div>
          <div className="page-sub">Three Days of Controlled Chaos</div>
          <div className="page-divider" />

          <div className="view-toggle">
            {[["cards","CARDS"],["timeline","TIMELINE"],["agenda","AGENDA"]].map(([k,l]) => (
              <button key={k} className={`vt-btn ${schedView===k?"active":""}`} onClick={() => setSchedView(k)}>{l}</button>
            ))}
          </div>

          {/* CARDS VIEW */}
          {schedView === "cards" && SCHEDULE.map((day, di) => (
            <div key={di} className="day-block">
              <div className="day-label">{day.day}</div>
              <div className="day-date-label">{day.date}</div>
              {day.events.map((ev, ei) => (
                <div key={ei} className="ev-card">
                  <div className="ev-emoji">{ev.emoji}</div>
                  <div className="ev-time">{ev.time}</div>
                  <div className="ev-title">{ev.title}</div>
                  <div className="ev-location">📍 {ev.location}</div>
                  <div className="ev-address">{ev.address}</div>
                  <div className="ev-desc">{ev.desc}</div>
                  {ev.note && <div className="ev-note">💡 {ev.note}</div>}
                  {ev.callout && (
                    <div className="callout">
                      <div className="callout-title">{ev.callout.title}</div>
                      <div className="callout-text">{ev.callout.text}</div>
                    </div>
                  )}
                  {ev.tag && <span className={`ev-tag tag-${ev.tagType||"mandatory"}`}>{ev.tag}</span>}
                </div>
              ))}
            </div>
          ))}

          {/* HORIZONTAL TIMELINE */}
          {schedView === "timeline" && SCHEDULE.map((day, di) => (
            <div key={di} className="htl-day">
              <div className="htl-day-header">
                <div className="htl-day-title">{day.day}</div>
                <div className="htl-day-date">{day.date}</div>
                <div className="htl-day-line" />
              </div>
              <div className="htl-scroll">
                {day.events.map((ev, ei) => (
                  <div key={ei} className="htl-card">
                    <div className="htl-emoji">{ev.emoji}</div>
                    <div className="htl-time">{ev.time}</div>
                    <div className="htl-title">{ev.title}</div>
                    <div className="htl-location">📍 {ev.location}</div>
                    <div className="htl-address">{ev.address}</div>
                    <div className="htl-desc">{ev.desc}</div>
                    {ev.tag && <div className="htl-tag"><span className={`ev-tag tag-${ev.tagType||"mandatory"}`}>{ev.tag}</span></div>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* AGENDA VIEW */}
          {schedView === "agenda" && SCHEDULE.map((day, di) => (
            <div key={di} className="day-block">
              <div className="day-label">{day.day}</div>
              <div className="day-date-label">{day.date}</div>
              {day.events.map((ev, ei) => (
                <div key={ei} className="ag-row">
                  <div className="ag-time-col"><div className="ag-time">{ev.time}</div></div>
                  <div className="ag-bar" />
                  <div className="ag-info">
                    <div className="ag-title">{ev.emoji} {ev.title}</div>
                    <div className="ag-location">📍 {ev.location}</div>
                    <div className="ag-address">{ev.address}</div>
                    <div className="ag-desc">{ev.desc}</div>
                    {ev.tag && <span className={`ev-tag tag-${ev.tagType||"mandatory"}`} style={{marginTop:"0.6rem"}}>{ev.tag}</span>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ROSTER */}
      {tab === "roster" && (
        <div className="page">
          <div className="page-title">The Crew</div>
          <div className="page-sub">12 Soldiers — Tap Edit to Update</div>
          <div className="page-divider" />
          <div className="roster-grid">
            {guests.map(g => (
              <div key={g.id} className={`r-card ${g.roleClass}`}>
                {g.roleClass==="groom" && <div className="r-crown">👑</div>}
                <button className="r-edit-btn" onClick={() => openEdit(g)}>Edit</button>
                <div className="r-avatar">{g.emoji}</div>
                <div className="r-name">{g.name}</div>
                <div className={`r-role role-${g.roleClass}`}>{g.role}</div>
                {g.desc && <div className="r-desc">{g.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editGuest && (
        <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) setEditGuest(null); }}>
          <div className="modal">
            <div className="modal-title">Edit — {editGuest.name}</div>
            <label>Name</label>
            <input value={editForm.name} onChange={e => setEditForm(p=>({...p,name:e.target.value}))} />
            <label>Role / Title</label>
            <input value={editForm.role} onChange={e => setEditForm(p=>({...p,role:e.target.value}))} />
            <label>Description</label>
            <textarea value={editForm.desc} onChange={e => setEditForm(p=>({...p,desc:e.target.value}))} />
            <div className="modal-btns">
              <button className="btn-cancel" onClick={() => setEditGuest(null)}>Cancel</button>
              <button className="btn-save" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTOS */}
      {tab === "photos" && (
        <div className="page">
          <div className="page-title">Trip Photos</div>
          <div className="page-sub">Upload Pics from the Weekend</div>
          <div className="page-divider" />
          <div className="photo-grid">
            <div className="photo-upload" onClick={() => fileRef.current?.click()}>
              <div className="photo-upload-icon">📷</div>
              <div className="photo-upload-text">Add Photos</div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handlePhoto} />
            {photos.map((p,i) => (
              <div key={i} className="photo-item" onClick={() => setLightboxIdx(i)}>
                <img src={p.src} alt={p.name} />
                <button className="photo-delete" onClick={e => { e.stopPropagation(); setPhotos(prev=>prev.filter((_,j)=>j!==i)); }}>✕</button>
              </div>
            ))}
          </div>
          {photos.length===0 && <div style={{textAlign:"center",marginTop:"2.5rem",color:"var(--muted)",fontSize:"0.95rem",opacity:0.4,fontStyle:"italic"}}>No photos yet — the trip hasn't happened yet 📸</div>}
        </div>
      )}

      {lightboxIdx !== null && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <button className="lightbox-close">✕</button>
          <img src={photos[lightboxIdx].src} alt="" />
        </div>
      )}

      {/* RULES */}
      {tab === "rules" && (
        <div className="page">
          <div className="page-title">House Rules 🎲</div>
          <div className="page-sub">Break These at Your Own Risk</div>
          <div className="page-divider" />
          {[
            "If it says MANDATORY — it's mandatory. No excuses. No \"I'm tired.\" No \"I'll catch up.\"",
            "If the bus says 9:55, be there at 9:45. We are not circling back for you. You will be roasted in the group chat.",
            "Cesar doesn't pay for ANYTHING. Drinks, food, cabs — that man's wallet stays in his pocket all weekend.",
            "What happens on this trip stays on this trip. Phones on silent. Screenshots will be treated as treason.",
            "Hydrate. Vegas will humble you faster than you think. Drink water between drinks.",
            "Don't be the guy who disappears. If you're leaving the group, text the chat.",
            "Adrian stays out of the deep end. Non-negotiable. 🚫🏊",
          ].map((r,i) => (
            <div key={i} className="rule-item">
              <div className="rule-num">{String(i+1).padStart(2,"0")}</div>
              <div className="rule-text">{r}</div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <div className="footer-text">Cesar's Last Ride — Vegas 2026</div>
      </footer>
    </div>
  );
}
