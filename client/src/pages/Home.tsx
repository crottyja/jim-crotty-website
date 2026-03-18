/*
 * DESIGN PHILOSOPHY: "Policy Brief" — Swiss International Typographic Style meets D.C. Think Tank Aesthetic
 * Colors: Deep Navy (#0D2240) primary, Steel Blue (#4A7FA5) accent, Off-white (#F8F9FA) backgrounds
 * Typography: Cormorant Garamond (display), Libre Baskerville (headings), Lato (body/UI)
 * Layout: Off-center editorial columns, horizontal banding, left-border accents
 */

import { useEffect, useState } from "react";
import { Menu, X, ExternalLink, Linkedin, ChevronDown, BookOpen, Briefcase, Award, GraduationCap, Globe, Mail, Newspaper, Quote } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/hero_bg-E39Xv3dAoLSLwUSSr7GHbD.webp";
const MAP_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/map_bg-csabJgUBh7GraSoMYMWtE2.webp";
const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/crottyheadshot2_b48bea55.webp";

const publications = [
  {
    year: "2026", title: "The quiet resurgence of plant-based illicit drugs", outlet: "The Hill",
    url: "https://thehill.com/opinion/criminal-justice/5777092-synthetic-vs-plant-based-drugs/",
    summary: "Argues that despite the dominance of synthetic drugs, plant-based substances like cocaine and cannabis are quietly regaining market share, driven by the economics of the illicit drug trade."
  },
  {
    year: "2026", title: "Beyond Illicit Drugs: How the US is Expanding the Scope of Armed Conflict", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2026/01/13/beyond-illicit-drugs-how-the-us-is-expanding-the-scope-of-armed-conflict/",
    summary: "Examines how U.S. policy is broadening the definition of armed conflict to encompass drug trafficking organizations, raising legal and strategic questions about militarizing the war on drugs."
  },
  {
    year: "2026", title: "Operation Absolute Resolve: A Rendition Revival?", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2026/01/06/operation-absolute-resolve-a-rendition-revival/",
    summary: "Analyzes the Trump administration's use of military renditions to extradite cartel leaders, questioning whether this controversial tactic can meaningfully reduce drug trafficking into the U.S."
  },
  {
    year: "2025", title: "What if pharma companies made 'safe' recreational drugs?", outlet: "STAT News",
    url: "https://www.statnews.com/2025/07/08/pharmaceutical-companies-recreational-drugs-safe-legal-high-dea-expert/",
    summary: "Explores the provocative idea of pharmaceutical companies producing regulated recreational drugs as an alternative to dangerous illicit substances, weighing public health benefits against regulatory and moral risks."
  },
  {
    year: "2025", title: "The New Militarized War on Drugs — Time to View Cartels as National Security Threats?", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2025/10/21/the-new-militarized-war-on-drugs-time-to-view-cartels-as-national-security-threats/",
    summary: "Makes the case for formally designating major drug cartels as national security threats, arguing that their power, violence, and geopolitical reach demand a military-grade strategic response."
  },
  {
    year: "2025", title: "'Narconomics,' not prohibition, is behind the rise in synthetic drugs", outlet: "The Hill",
    url: "https://thehill.com/opinion/criminal-justice/5545108-synthetic-drugs-rise-narconomics/",
    summary: "Contends that the explosion of synthetic drugs is driven by market economics — low production costs and high profit margins — not the failure of prohibition, requiring economic rather than purely punitive policy responses."
  },
  {
    year: "2025", title: "Could Illicit Drug Production Shift to US?", outlet: "Small Wars Journal / El Centro",
    url: "https://smallwarsjournal.com/2025/02/19/could-illicit-drug-production-shift-to-us/",
    summary: "Warns that tightening border enforcement and tariffs on Mexico could incentivize drug trafficking organizations to shift synthetic drug manufacturing operations to within the United States."
  },
  {
    year: "2024", title: "Overdose deaths are down, but the crisis is far from resolved", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/5032647-us-drug-overdose-deaths-decline/",
    summary: "Cautions against complacency as overdose death numbers decline, arguing that the underlying structural drivers of the drug crisis — including supply chains and addiction — remain largely unaddressed."
  },
  {
    year: "2024", title: "Welcome to the global synthetic drug revolution", outlet: "The Hill",
    url: "https://thehill.com/opinion/international/4863417-global-drug-trade-synthetic/",
    summary: "Charts how the global drug trade has been fundamentally transformed by synthetic substances, arguing that what began as an American opioid crisis has become a worldwide public health and security emergency."
  },
  {
    year: "2024", title: "How DEA is tackling our greatest national security threat", outlet: "We Are The Mighty",
    url: "https://www.wearethemighty.com/military-news/how-dea-is-tackling-our-greatest-national-security-threat/",
    summary: "Describes how the DEA has evolved from a traditional drug enforcement agency into a key national security actor, confronting transnational criminal organizations that rival the threat posed by foreign states."
  },
  {
    year: "2024", title: "9/11 makes the case for a Department of Treatment and Recovery", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/4567590-9-11-makes-the-case-for-a-department-of-treatment-and-recovery/",
    summary: "Draws on the post-9/11 reorganization of national security to argue that the U.S. needs a dedicated cabinet-level Department of Treatment and Recovery to coordinate the federal response to the addiction crisis."
  },
  {
    year: "2023", title: "Will 'Poor Man's Cocaine' Fuel the Next U.S. Drug Crisis?", outlet: "Undark Magazine",
    url: "https://undark.org/2023/09/21/will-poor-mans-cocaine-fuel-the-next-u-s-drug-crisis/",
    summary: "Investigates the spread of Captagon — a cheap amphetamine-type stimulant popular in the Middle East — and assesses whether it could become the next major drug threat to reach the United States."
  },
  {
    year: "2022", title: "We Need an All-of-the-Above Strategy to Fight the Opioid Crisis", outlet: "Newsweek",
    url: "https://www.newsweek.com/we-need-all-above-strategy-fight-opioid-crisis-opinion-1698234",
    summary: "Calls for a comprehensive, multi-pronged approach to the opioid epidemic that integrates supply reduction, demand treatment, and harm reduction rather than relying on any single policy lever."
  },
  {
    year: "2022", title: "The US Opioid Problem Is Also a China Problem", outlet: "The Diplomat",
    url: "https://thediplomat.com/2022/09/the-us-opioid-problem-is-also-a-china-problem/",
    summary: "Argues that China's role as the primary supplier of fentanyl precursor chemicals to Mexican cartels makes the opioid crisis a bilateral diplomatic issue requiring sustained U.S.-China counternarcotics engagement."
  },
  {
    year: "2022", title: "Launching Missiles Is Easy, Drug Control Is Hard", outlet: "Lawfare",
    url: "https://www.lawfaremedia.org/article/launching-missiles-easy-drug-control-hard",
    summary: "Critiques proposals to use military force against Mexican drug cartels, arguing that the complexity of drug supply chains makes kinetic strikes an ineffective and counterproductive policy tool."
  },
  {
    year: "2022", title: "In Search of a Silver Bullet: Reducing the Supply of Synthetic Drugs to the U.S.", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2022/04/04/search-silver-bullet-reducing-supply-synthetic-drugs-us/",
    summary: "Reviews the full range of supply-side interdiction strategies — from precursor chemical controls to international partnerships — and concludes that no single approach can solve the synthetic drug crisis."
  },
  {
    year: "2022", title: "Congress Must Act to Permanently Control Fentanyl-Related Substances", outlet: "Newsweek",
    url: "https://www.newsweek.com/congress-must-act-permanently-control-fentanyl-related-substances-opinion-1677625",
    summary: "Urges Congress to make permanent the temporary scheduling of fentanyl analogues, warning that allowing the emergency order to lapse would create a legal loophole exploited by drug manufacturers to evade prosecution."
  },
];

const mediaOutlets = [
  "Washington Post", "Wall Street Journal", "Associated Press", "USA Today",
  "Newsweek", "The Guardian", "The Hill", "Lawfare", "STAT News", "The Independent",
  "Fox News", "Tampa Bay Times", "Dallas Morning News", "The Diplomat", "Undark Magazine"
];

const career = [
  {
    period: "2024 – Present",
    role: "Law Enforcement Outreach Manager",
    org: "Meta Platforms, Inc.",
    location: "Washington, D.C.",
    description: "Develops and maintains strategic relationships with law enforcement agencies across North America to help combat online criminal activity and prevent real-world harm.",
    icon: "meta"
  },
  {
    period: "2024 – Present",
    role: "Adjunct Professor / Lecturer",
    org: "American University, School of Public Affairs",
    location: "Washington, D.C.",
    description: "Teaches JLC-451: Drugs, Crime & Public Policy and JLC-313: Organized Crime in the Department of Justice, Law & Criminology.",
    icon: "edu"
  },
  {
    period: "2023 – 2024",
    role: "Head, Investigative Support Section",
    org: "DC Metropolitan Police Department (MPD)",
    location: "Washington, D.C.",
    description: "Led a team of Criminal Research Specialists providing real-time intelligence on major crimes across the District of Columbia.",
    icon: "law"
  },
  {
    period: "2021 – 2023",
    role: "Associate Vice President",
    org: "The Cohen Group",
    location: "Washington, D.C.",
    description: "Led multiple client teams across defense, cybersecurity, healthcare, energy, and national security sectors at the strategic advisory firm founded by former Secretary of Defense William Cohen.",
    icon: "advisory"
  },
  {
    period: "2009 – 2021",
    role: "Deputy Chief of Staff & Multiple Roles",
    org: "U.S. Drug Enforcement Administration (DEA)",
    location: "Washington, D.C. | Chicago | London | Afghanistan",
    description: "Over 12 years of distinguished service. Final role: Deputy Chief of Staff and Executive Assistant to the Administrator. Prior roles included Group Supervisor (Chicago Field Division), Liaison Officer (London Country Office, 2013–2018), Tactical Intelligence Analyst with FAST-Alpha (Afghanistan, 2010), and Strategic Intelligence Analyst focused on South America.",
    icon: "dea"
  },
  {
    period: "Pre-2009",
    role: "Associate, National Security Practice",
    org: "PRTM Management Consultants",
    location: "Washington, D.C.",
    description: "Provided strategic and operational advice to clients in the Intelligence Community, Department of Homeland Security, and Department of Defense.",
    icon: "consulting"
  },
];

const newsItems = [
  {
    outlet: "The Guardian",
    outletShort: "Guardian",
    logo: "G",
    color: "#052962",
    date: "March 8, 2025",
    title: "Trump policies could fuel illicit drug trade despite vow to curb fentanyl",
    quote: "We're seeing this decrease in overdose deaths and everyone's still trying to suss out exactly why. I don't think now is the time that we want to stop any of those existing efforts because we know that at least some, or a combination of them, have been working.",
    context: "Crotty criticized Trump's tariffs on Mexico, Canada, and China as 'coercive,' warning they could disrupt existing anti-drug efforts and undermine intelligence-sharing partnerships critical to intercepting drug shipments.",
    author: "Hannah Harris Green",
    url: "https://www.theguardian.com/us-news/2025/mar/08/trump-policies-drug-trade-fentanyl",
  },
  {
    outlet: "The Guardian",
    outletShort: "Guardian",
    logo: "G",
    color: "#052962",
    date: "October 17, 2025",
    title: "How Chicago succeeded in reducing drug overdose deaths",
    quote: "A lot of this stuff just isn't being tested for. It's a big blind spot.",
    context: "Crotty highlighted the critical gap in national drug surveillance, noting that newer adulterants like medetomidine and nitazenes are going undetected in most parts of the country outside of cities with advanced testing infrastructure.",
    author: "Hannah Harris Green & Matt Kiefer",
    url: "https://www.theguardian.com/us-news/2025/oct/17/chicago-reduced-drug-overdose-deaths",
  },
  {
    outlet: "Wall Street Journal",
    outletShort: "WSJ",
    logo: "WSJ",
    color: "#0D2240",
    date: "August 30, 2022",
    title: "How Two Mexican Drug Cartels Came to Dominate America's Fentanyl Supply",
    quote: "If it were an athlete, people would call it 'The G.O.A.T.' It is in fact the most pernicious, the most devastating drug that we have ever seen.",
    context: "Quoted as a leading expert on the Sinaloa and Jalisco cartels' dominance of the U.S. fentanyl supply, as the WSJ investigated how the two cartels cornered the market after China cracked down on fentanyl production.",
    author: "Jon Kamp, José de Córdoba & Julie Wernau",
    url: "https://www.wsj.com/world/americas/mexico-drug-cartels-fentanyl-overdose-sinaloa-jalisco-11661866903",
  },
  {
    outlet: "Associated Press",
    outletShort: "AP",
    logo: "AP",
    color: "#0D2240",
    date: "March 9, 2022",
    title: "A look inside the 1st official 'safe injection sites' in US",
    quote: "The goal can't simply be to keep people alive. If you believe, like me, that doing drugs is very destructive, then the goal has to be to stop doing drugs.",
    context: "Crotty offered a counterpoint to harm-reduction advocates in this landmark AP investigation into New York City's first official overdose prevention centers, arguing that policymakers should concentrate on expanding drug treatment rather than supervised consumption.",
    author: "Jennifer Peltz",
    url: "https://apnews.com/article/inside-nyc-supervised-drug-injection-sites-7ad93117d1566fda53909c0f70984d1b",
  },
  {
    outlet: "STAT News",
    outletShort: "STAT",
    logo: "STAT",
    color: "#0D2240",
    date: "May 7, 2025",
    title: "Fentanyl busts saved 258 million lives? Experts say that's implausible",
    quote: "Potential exposure to these substances is still quite small, thank goodness. When you use hyperbole, you can actually lose the audience and the message.",
    context: "Crotty pushed back on Attorney General Pam Bondi's claim that Trump-era drug busts saved 258 million lives, calling the figure implausible and warning that exaggerated statistics undermine public trust in law enforcement messaging.",
    author: "Lev Facher",
    url: "https://www.statnews.com/2025/05/07/pam-bondi-fentanyl-experts-say-attorney-general-claims-false-implausible-misleading/",
  },
  {
    outlet: "Fox News",
    outletShort: "Fox",
    logo: "FOX",
    color: "#0D2240",
    date: "August 26, 2022",
    title: "Narcan vending machines are the latest weapon against opioid overdoses",
    quote: "And sadly, it's probably going to get a lot worse before it gets better.",
    context: "Crotty warned that the fentanyl crisis was far from over, even as harm-reduction advocates celebrated the rollout of Narcan vending machines across the country as a life-saving measure.",
    author: "Fox News Health",
    url: "https://www.foxnews.com/health/narcan-vending-machines-latest-weapon-opioid-overdoses",
  },
];

const affiliations = [
  { name: "United Against Fentanyl", role: "Advisory Board Member", desc: "Bipartisan non-profit focused on ending the U.S. opioid crisis.", url: "https://www.uniteagainstfentanyl.org" },
  { name: "Global Initiative Against Transnational Organized Crime (GI-TOC)", role: "Network of Experts Member", desc: "International network of researchers and practitioners addressing organized crime.", url: "https://globalinitiative.net" },
  { name: "USF Global and National Security Institute (GNSI)", role: "Non-Resident Senior Fellow", desc: "University of South Florida research institute on national security.", url: "https://www.usf.edu/gnsi/" },
  { name: "Small Wars Journal – El Centro", role: "2026 Fellow / Associate", desc: "Leading journal on irregular warfare and national security strategy.", url: "https://smallwarsjournal.com" },
  { name: "Center for Advanced Defense Studies (C4ADS)", role: "Former Senior Fellow", desc: "Supported Organized Crime and Grand Corruption team on drug trafficking and money laundering.", url: "https://c4ads.org" },
  { name: "Presidential Management Fellows Program", role: "Former Fellow", desc: "Prestigious U.S. government leadership development program.", url: "https://www.pmf.gov" },
];

function useScrollReveal() {
  useEffect(() => {
    const observe = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.revealed)");
      elements.forEach((el) => observer.observe(el));
      return observer;
    };

    // Initial observation
    let observer = observe();

    // Re-observe when new elements are added to DOM
    const mutationObserver = new MutationObserver(() => {
      observer.disconnect();
      observer = observe();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Career", href: "#career" },
    { label: "Publications", href: "#publications" },
    { label: "On Camera", href: "#media" },
    { label: "In the News", href: "#in-the-news" },
    { label: "Affiliations", href: "#affiliations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#0D2240" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#" aria-label="Back to top" />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/80 hover:text-white text-sm font-body tracking-widest uppercase transition-colors duration-200"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/jamesmcrotty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#0D2240", borderColor: "rgba(255,255,255,0.1)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function NumbersBarInline() {
  const stats = [
    { value: "12+", label: "Years at DEA" },
    { value: "40+", label: "Publications" },
    { value: "6", label: "Fellowships" },
    { value: "15+", label: "Media Outlets" },
    { value: "3", label: "Degrees" },
    { value: "4", label: "Countries Served" },
    { value: "2", label: "Courses Taught" },
    { value: "10+", label: "Years in Policy" },
    { value: "3", label: "Gov't Agencies" },
  ];
  return (
    <div className="grid grid-cols-3 gap-0 w-full">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center py-4 px-4 text-center"
          style={{
            borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.1)" : "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {s.value}
          </span>
          <span
            className="mt-1 uppercase tracking-widest"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function VideoSection() {
  const videos = [
    {
      id: "fox-narcan",
      outlet: "Fox News",
      date: "August 26, 2022",
      title: "Narcan Vending Machines Are the Latest Weapon Against Opioid Overdoses",
      description: "Jim Crotty, former DEA Deputy Chief of Staff, weighs in on the proliferation of Narcan vending machines as a harm-reduction strategy, arguing that while keeping people alive is important, the ultimate goal must be ending drug use.",
      embedType: "link",
      url: "https://www.foxnews.com/health/narcan-vending-machines-latest-weapon-opioid-overdoses",
      quote: "We should be carpet-bombing the country with Narcan. But the goal can't simply be to keep people alive — the goal has to be to stop doing drugs.",
    },
    {
      id: "scripps-fentanyl",
      outlet: "Scripps News",
      date: "2024",
      title: "To Save a Life: A National Fentanyl Alarm",
      description: "Jim Crotty appears as a featured expert in this Scripps News documentary on the fentanyl crisis, tracing the origins of the epidemic from prescription drug over-marketing through the heroin wave to the current synthetic drug catastrophe.",
      embedType: "youtube",
      youtubeId: "iZkaBqpxHuk",
      url: "https://www.youtube.com/watch?v=iZkaBqpxHuk",
      quote: "The drug trade is a profit-driven enterprise. The lethality of fentanyl is a calculated risk for dealers — and that's what makes it so dangerous.",
    },
  ];

  return (
    <section
      id="media"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(13,34,64,0.91)" }} />
      <div className="container relative z-10">
        <div className="section-label mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>03 / Video Appearances</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            On Camera
          </h2>
          <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Selected broadcast and documentary appearances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {videos.map((v) => (
            <div
              key={v.id}
              className="reveal-on-scroll flex flex-col"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              {/* Video embed or thumbnail */}
              {v.embedType === "youtube" ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center group"
                  style={{ backgroundColor: "#0D2240", minHeight: "220px" }}
                >
                  <div className="text-center px-8">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>Watch on Fox News</p>
                  </div>
                  <div
                    className="absolute top-3 left-3 px-2 py-1 text-white text-xs font-bold"
                    style={{ backgroundColor: "#c00", fontFamily: "'Lato', sans-serif", letterSpacing: "0.05em" }}
                  >
                    FOX NEWS
                  </div>
                </a>
              )}

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold tracking-wide uppercase px-2 py-1"
                    style={{ backgroundColor: "rgba(74,127,165,0.3)", color: "rgba(255,255,255,0.85)", fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em", border: "1px solid rgba(74,127,165,0.4)" }}
                  >
                    {v.outlet}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif" }}>{v.date}</span>
                </div>

                <h3
                  className="font-bold mb-3 leading-snug"
                  style={{ fontFamily: "'Libre Baskerville', serif", color: "#ffffff", fontSize: "1rem" }}
                >
                  {v.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {v.description}
                </p>

                {/* Pull quote */}
                <blockquote
                  className="relative p-4 mt-auto"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderLeft: "3px solid #4A7FA5",
                  }}
                >
                  <Quote size={14} className="absolute top-2 right-3 opacity-20" style={{ color: "#4A7FA5" }} />
                  <p
                    className="text-sm italic leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.75)", fontSize: "1rem" }}
                  >
                    "{v.quote}"
                  </p>
                </blockquote>

                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-xs font-semibold tracking-wide uppercase hover:underline"
                  style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}
                >
                  Watch / Read <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(13,34,64,0.92) 0%, rgba(13,34,64,0.75) 60%, rgba(13,34,64,0.6) 100%)" }}
      />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Section label */}
          <div className="section-label mb-6 text-white/60 tracking-widest uppercase text-xs" style={{ fontFamily: "'Lato', sans-serif" }}>
            Law Enforcement · Intelligence · Drug Policy
          </div>

          {/* Name */}
          <h1
            className="text-white mb-4 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Jim{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Crotty</span>
          </h1>

          {/* Title */}
          <p
            className="text-white/70 mb-8 text-lg"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, letterSpacing: "0.02em" }}
          >
            Law Enforcement Outreach Manager, Meta Platforms &nbsp;·&nbsp; Former DEA Deputy Chief of Staff &nbsp;·&nbsp; Adjunct Professor, American University
          </p>

          {/* Bio snippet */}
          <p
            className="text-white/60 mb-10 leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1rem" }}
          >
            A global thought leader and subject matter expert in law enforcement, intelligence, transnational organized crime, and drug policy — with over 12 years of service at the U.S. Drug Enforcement Administration and a distinguished record of public service, academic scholarship, and policy advocacy.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#publications"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#4A7FA5",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
              }}
            >
              <BookOpen size={14} />
              Publications
            </a>
            <a
              href="#career"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm tracking-widest uppercase transition-all duration-200 hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.4)",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
              }}
            >
              <Briefcase size={14} />
              Career
            </a>
          </div>
        </div>

        {/* By the Numbers — inline within hero */}
        <div
          className="w-full text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "2rem",
          }}
        >
          <NumbersBarInline />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.96)" }} />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Portrait + credentials */}
          <div className="lg:col-span-4 reveal-on-scroll">
            <div className="relative mb-8">
              <img
                src={PROFILE_IMG}
                alt="Jim Crotty"
                className="w-full max-w-xs object-cover"
                style={{
                  filter: "grayscale(15%)",
                  boxShadow: "8px 8px 0 #0D2240",
                }}
              />
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <div className="section-label mb-3" style={{ color: "#4A7FA5" }}>Education</div>
              {[
                { degree: "JD", school: "University of Alabama School of Law", year: "2008" },
                { degree: "MA, Political Science", school: "Boston College", year: "2005" },
                { degree: "BA, Political Science", school: "Auburn University", year: "2003", note: "Summa Cum Laude" },
              ].map((ed) => (
                <div key={ed.school} className="border-l-2 pl-4" style={{ borderColor: "#4A7FA5" }}>
                  <div className="font-semibold text-sm" style={{ color: "#0D2240", fontFamily: "'Lato', sans-serif" }}>
                    {ed.degree}
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: "'Lato', sans-serif" }}>
                    {ed.school}, {ed.year}
                  </div>
                  {ed.note && (
                    <div className="text-xs italic text-gray-500" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {ed.note}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t" style={{ borderColor: "#e5e7eb" }}>
                <div className="section-label mb-3" style={{ color: "#4A7FA5" }}>Research Areas</div>
                <div className="flex flex-wrap gap-2">
                  {["Drug Policy", "Transnational Organized Crime", "Global Drug Trends", "Money Laundering", "Law Enforcement", "Cyber & Online Drug Trafficking"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1"
                      style={{
                        backgroundColor: "#f0f4f8",
                        color: "#0D2240",
                        fontFamily: "'Lato', sans-serif",
                        border: "1px solid #d1dde8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio text */}
          <div className="lg:col-span-8 reveal-on-scroll" style={{ transitionDelay: "0.15s" }}>
            <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>01 / Profile</div>
            <h2
              className="mb-8"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#0D2240",
                lineHeight: 1.2,
              }}
            >
              Global Thought Leader in Law Enforcement & Drug Policy
            </h2>

            <div className="space-y-5 text-gray-700 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}>
              <p>
                Jim Crotty is a recognized subject matter expert in law enforcement, intelligence, transnational organized crime, and drug policy. He currently serves as <strong style={{ fontWeight: 700, color: "#0D2240" }}>Law Enforcement Outreach Manager at Meta Platforms, Inc.</strong>, where he develops and maintains strategic relationships with law enforcement agencies across North America to help combat online criminal activity and prevent real-world harm.
              </p>
              <p>
                Before joining Meta, Jim led the Investigative Support Section at the <strong style={{ fontWeight: 700, color: "#0D2240" }}>DC Metropolitan Police Department (MPD)</strong>, managing a team of Criminal Research Specialists providing real-time intelligence on major crimes across the District of Columbia. He also served as Associate Vice President at <strong style={{ fontWeight: 700, color: "#0D2240" }}>The Cohen Group</strong>, a strategic advisory firm founded by former Secretary of Defense William Cohen, where he led client teams across defense, cybersecurity, healthcare, energy, and national security.
              </p>
              <p>
                Jim's distinguished public service career includes over <strong style={{ fontWeight: 700, color: "#0D2240" }}>12 years with the U.S. Drug Enforcement Administration (DEA)</strong>, serving in strategic, tactical, and operational positions domestically and internationally. His final DEA assignment was as Deputy Chief of Staff and Executive Assistant to the Administrator — the agency's top leadership position.
              </p>
              <p>
                He is an <strong style={{ fontWeight: 700, color: "#0D2240" }}>Adjunct Professor at American University's School of Public Affairs</strong>, teaching courses on Drugs, Crime, and Public Policy. His commentary and analysis have been featured in the <em>Washington Post</em>, <em>Wall Street Journal</em>, <em>Newsweek</em>, <em>The Hill</em>, <em>STAT News</em>, <em>The Guardian</em>, and many other leading publications.
              </p>
            </div>

            {/* Featured in strip */}
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "#e5e7eb" }}>
              <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>Featured In</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {mediaOutlets.map((outlet) => (
                  <span
                    key={outlet}
                    className="text-sm font-semibold"
                    style={{ color: "#6b7280", fontFamily: "'Lato', sans-serif", letterSpacing: "0.02em" }}
                  >
                    {outlet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerSection() {
  return (
    <section
      id="career"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(13,34,64,0.88)" }} />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>02 / Career</div>
          <h2
            className="text-white mb-12"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.2,
            }}
          >
            Professional Experience
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "rgba(74,127,165,0.3)", left: "140px" }}
            />

            <div className="space-y-10">
              {career.map((item, i) => (
                <div
                  key={i}
                  className="reveal-on-scroll md:flex gap-8"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Period */}
                  <div
                    className="hidden md:block flex-shrink-0 text-right"
                    style={{ width: "130px", paddingTop: "2px" }}
                  >
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* Dot */}
                  <div
                    className="hidden md:flex flex-shrink-0 items-start justify-center"
                    style={{ width: "20px", marginTop: "4px" }}
                  >
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{ backgroundColor: "#0D2240", borderColor: "#4A7FA5" }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 p-6"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderLeft: "3px solid #4A7FA5",
                    }}
                  >
                    <div className="md:hidden text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
                      {item.period}
                    </div>
                    <div
                      className="font-bold text-white mb-1"
                      style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem" }}
                    >
                      {item.role}
                    </div>
                    <div
                      className="font-semibold mb-1"
                      style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem" }}
                    >
                      {item.org}
                    </div>
                    <div
                      className="text-xs mb-3 flex items-center gap-1"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Lato', sans-serif" }}
                    >
                      <Globe size={11} />
                      {item.location}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicationsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? publications : publications.slice(0, 8);

  return (
    <section
      id="publications"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(245,247,250,0.95)" }} />
      <div className="container relative z-10">
        <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>03 / Writing & Commentary</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#0D2240",
              lineHeight: 1.2,
            }}
          >
            Selected Publications & Op-Eds
          </h2>
          <p
            className="text-sm max-w-md text-gray-500"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            Jim is a prolific writer and commentator on drug policy, synthetic drugs, transnational crime, and national security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((pub, i) => (
            <a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 transition-all duration-200 hover:-translate-y-0.5 reveal-on-scroll"
              style={{
                borderLeft: "3px solid #4A7FA5",
                backgroundColor: "#f8fafc",
                transitionDelay: `${(i % 4) * 0.05}s`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5"
                      style={{
                        backgroundColor: "#0D2240",
                        color: "white",
                        fontFamily: "'Lato', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {pub.year}
                    </span>
                    <span
                      className="text-xs font-semibold tracking-wide"
                      style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}
                    >
                      {pub.outlet}
                    </span>
                  </div>
                  <h3
                    className="font-semibold leading-snug group-hover:text-blue-700 transition-colors mb-2"
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      color: "#0D2240",
                      fontSize: "0.95rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {pub.title}
                  </h3>
                  {pub.summary && (
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "#6b7280",
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      {pub.summary}
                    </p>
                  )}
                </div>
                <ExternalLink
                  size={14}
                  className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#4A7FA5" }}
                />
              </div>
            </a>
          ))}
        </div>

        {!showAll && publications.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-gray-100"
              style={{
                border: "1px solid #0D2240",
                color: "#0D2240",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
              }}
            >
              View All Publications
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function InTheNewsSection() {
  return (
    <section
      id="in-the-news"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.96)" }} />
      <div className="container relative z-10">
        <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>03 / Media Coverage</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#0D2240",
              lineHeight: 1.2,
            }}
          >
            In the News
          </h2>
          <p
            className="text-sm max-w-md text-gray-500"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            Jim's expert analysis has been sought by the world's leading news organizations on drug policy, cartels, and national security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsItems.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block reveal-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="h-full p-6 transition-all duration-200 group-hover:-translate-y-1"
                style={{
                  backgroundColor: "#f8fafc",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  borderTop: `4px solid ${item.color}`,
                }}
              >
                {/* Outlet badge + date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center font-black text-white text-xs px-2 py-1 min-w-[2.5rem]"
                      style={{
                        backgroundColor: item.color,
                        fontFamily: "'Lato', sans-serif",
                        letterSpacing: item.logo.length > 1 ? "0.05em" : "0",
                        fontSize: item.logo === "G" ? "1rem" : "0.65rem",
                      }}
                    >
                      {item.logo}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: item.color, fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.outlet}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs"
                      style={{ color: "#9ca3af", fontFamily: "'Lato', sans-serif" }}
                    >
                      {item.date}
                    </span>
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#9ca3af" }}
                    />
                  </div>
                </div>

                {/* Article title */}
                <h3
                  className="mb-4 leading-snug group-hover:opacity-80 transition-opacity"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    color: "#0D2240",
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>

                {/* Pull quote */}
                <div
                  className="mb-4 py-3 px-4 relative"
                  style={{
                    backgroundColor: "rgba(13,34,64,0.04)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  <Quote
                    size={14}
                    className="absolute top-2 right-3 opacity-20"
                    style={{ color: item.color }}
                  />
                  <p
                    className="italic leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#374151",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Context */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "#6b7280",
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {item.context}
                </p>

                {/* Byline */}
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "#9ca3af", fontFamily: "'Lato', sans-serif" }}
                >
                  <Newspaper size={11} />
                  <span>By {item.author}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AffiliationsSection() {
  return (
    <section
      id="affiliations"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(13,34,64,0.91)" }} />
      <div className="container relative z-10">
        <div className="section-label mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>04 / Affiliations</div>
        <h2
          className="mb-12"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          Professional Affiliations & Fellowships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliations.map((aff, i) => (
            <div
              key={i}
              className="p-6 reveal-on-scroll"
              style={{
                transitionDelay: `${i * 0.08}s`,
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderTop: "3px solid #4A7FA5",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <Award size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#4A7FA5" }} />
                <div>
                  <h3
                    className="font-bold leading-snug"
                    style={{ fontFamily: "'Libre Baskerville', serif", color: "#ffffff", fontSize: "0.95rem" }}
                  >
                    <a
                      href={aff.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline transition-colors"
                      style={{ color: "#ffffff" }}
                    >
                      {aff.name}
                      <ExternalLink size={11} className="flex-shrink-0 opacity-50" />
                    </a>
                  </h3>
                  <div
                    className="text-xs font-semibold mt-1 tracking-wide"
                    style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {aff.role}
                  </div>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
              >
                {aff.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.96)" }} />
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>05 / Connect</div>
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#0D2240",
              lineHeight: 1.2,
            }}
          >
            Connect with Jim
          </h2>
          <p
            className="mb-10 leading-relaxed"
            style={{ color: "#6b7280", fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1.05rem" }}
          >
            For media inquiries, speaking engagements, or academic collaboration, please reach out via LinkedIn or through American University's School of Public Affairs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/jamesmcrotty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 text-white font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#0D2240",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              <Linkedin size={18} />
              LinkedIn Profile
            </a>
            <a
              href="https://www.american.edu/spa/faculty/jcrotty.cfm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-200 hover:bg-navy/10"
              style={{
                border: "1px solid rgba(13,34,64,0.3)",
                color: "#0D2240",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              <GraduationCap size={18} />
              American University Profile
            </a>
          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: "rgba(13,34,64,0.12)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={14} style={{ color: "#4A7FA5" }} />
              <span className="section-label" style={{ color: "#4A7FA5" }}>Media Inquiries</span>
            </div>
            <p
              className="text-sm"
              style={{ color: "#6b7280", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            >
              For media requests, contact AU Communications at{" "}
              <a href="tel:2028855950" className="underline hover:text-navy transition-colors" style={{ color: "#4A7FA5" }}>
                202-885-5950
              </a>{" "}
              or visit the{" "}
              <a
                href="https://www.american.edu/spa/faculty/jcrotty.cfm"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-navy transition-colors"
                style={{ color: "#4A7FA5" }}
              >
                AU Faculty Media Guide
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{ backgroundColor: "#0D2240", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-sm"
          style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
        >
          © {new Date().getFullYear()} Jim Crotty. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/jamesmcrotty"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            style={{ color: "#C9A84C" }}
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://www.american.edu/spa/faculty/jcrotty.cfm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors hover:text-white"
            style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}
          >
            American University
          </a>
          <a
            href="https://globalinitiative.net/profile/jim-crotty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors hover:text-white"
            style={{ color: "#C9A84C", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}
          >
            GI-TOC
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <PublicationsSection />
      <VideoSection />
      <InTheNewsSection />
      <AffiliationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
