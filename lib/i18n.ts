export const locales = ["en", "it"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const copy = {
  en: {
    nav: { work: "Work", stack: "Stack", about: "About", contact: "Contact", labs: "Labs", menu: "Menu", close: "Close" },
    command: { open: "Open command palette", title: "Navigate nohint404", description: "Search pages and source links", placeholder: "Type a destination…", empty: "No matching destination." },
    hero: {
      title: "nohint404",
      line: "A developer portfolio, set in motion.",
      body: "Selected web work, systems experiments and inspectable source — made with care for the details that make software feel considered.",
      work: "See selected work",
      github: "GitHub profile",
      specimen: "A–Z / 0–9 / TypeScript / Rust / Next.js / React",
    },
    work: { title: "Selected work", intro: "A small archive of things that can be opened, inspected and verified.", source: "Source", live: "Open live site", repository: "Repository", all: "View GitHub" },
    stack: { title: "The working alphabet", body: "Languages and tools I return to when the problem needs a clear shape." },
    about: { title: "A short introduction", body: "I’m nohint404, a developer focused on the web with interests in systems and tooling. I like interfaces that stay calm while the work gets complex.", note: "This site keeps the record small on purpose: real projects, real source, no invented proof." },
    contact: { title: "Keep in touch", body: "GitHub is the best place to follow the work, inspect a repository or start a conversation.", github: "Visit nohint404 on GitHub" },
    labs: { title: "Quiet, for now.", label: "No experiments published", body: "This shelf stays empty until an experiment has source, context and something useful to teach.", back: "Return to selected work" },
    notFound: { title: "404", body: "This page is not part of the archive.", home: "Return home", work: "Selected work" },
    footer: "nohint404 · Engineering without the guesswork.",
  },
  it: {
    nav: { work: "Progetti", stack: "Stack", about: "Profilo", contact: "Contatti", labs: "Lab", menu: "Menu", close: "Chiudi" },
    command: { open: "Apri la palette comandi", title: "Naviga nohint404", description: "Cerca pagine e link al codice", placeholder: "Scrivi una destinazione…", empty: "Nessun risultato." },
    hero: {
      title: "nohint404",
      line: "Un portfolio di sviluppo, messo in movimento.",
      body: "Progetti web selezionati, esperimenti sui sistemi e codice ispezionabile — con attenzione ai dettagli che rendono il software più curato.",
      work: "Vedi i progetti",
      github: "Profilo GitHub",
      specimen: "A–Z / 0–9 / TypeScript / Rust / Next.js / React",
    },
    work: { title: "Progetti selezionati", intro: "Un piccolo archivio di cose da aprire, ispezionare e verificare.", source: "Codice", live: "Apri il sito", repository: "Repository", all: "Vai a GitHub" },
    stack: { title: "L’alfabeto di lavoro", body: "Linguaggi e strumenti a cui torno quando un problema ha bisogno di una forma chiara." },
    about: { title: "Una breve introduzione", body: "Sono nohint404, uno sviluppatore focalizzato sul web con interessi nei sistemi e nel tooling. Mi piacciono le interfacce che restano calme mentre il lavoro diventa complesso.", note: "Questo sito resta intenzionalmente piccolo: progetti reali, codice reale, nessuna prova inventata." },
    contact: { title: "Restiamo in contatto", body: "GitHub è il posto migliore per seguire il lavoro, ispezionare un repository o iniziare una conversazione.", github: "Visita nohint404 su GitHub" },
    labs: { title: "Silenzioso, per ora.", label: "Nessun esperimento pubblicato", body: "Questo scaffale rimane vuoto finché un esperimento non ha codice, contesto e qualcosa di utile da insegnare.", back: "Torna ai progetti" },
    notFound: { title: "404", body: "Questa pagina non fa parte dell’archivio.", home: "Torna alla home", work: "Progetti selezionati" },
    footer: "nohint404 · Engineering without the guesswork.",
  },
} as const;

export type Copy = (typeof copy)[Locale];
