/*
 * DESIGN PHILOSOPHY: "Policy Brief" — Swiss International Typographic Style meets D.C. Think Tank Aesthetic
 * Colors: Deep Navy (#0D2240) primary, Steel Blue (#4A7FA5) accent, Off-white (#F8F9FA) backgrounds
 * Typography: Cormorant Garamond (display), Libre Baskerville (headings), Lato (body/UI)
 * Layout: Off-center editorial columns, horizontal banding, left-border accents
 */

import React, { useEffect, useState } from "react";
import { Menu, X, ExternalLink, Linkedin, ChevronDown, ChevronUp, BookOpen, Briefcase, Award, GraduationCap, Globe, Mail, Newspaper, Quote, ArrowUp, Users, Shield } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/hero_bg-E39Xv3dAoLSLwUSSr7GHbD.webp";
const MAP_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/map_bg-csabJgUBh7GraSoMYMWtE2.webp";
const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/crottyheadshot2_b48bea55.webp";

const publications = [
  { year: "2026", title: "Could Mexican Cartels Be Incentivized to Sell 'Safer' Drugs?", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2026/03/31/could-mexican-cartels-be-incentivized-to-sell-safer-drugs/",
    summary: "Explores the provocative idea of incentivizing drug trafficking organizations to shift away from highly lethal synthetic opioids toward less dangerous substances, examining whether a combination of enforcement pressure and cartel negotiations could reduce overdose deaths without eliminating illicit markets entirely."
  },
  { year: "2026", title: "The quiet resurgence of plant-based illicit drugs", outlet: "The Hill",
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
    year: "2026", title: "Mexico-U.S. cooperation reduces fentanyl flow", outlet: "The Hill",
    url: "https://thehill.com/opinion/criminal-justice/5698065-us-mexico-cartel-cooperation/",
    summary: "Argues that despite the Trump administration's confrontational posture, quiet diplomatic and intelligence cooperation between U.S. and Mexican authorities has been the real driver of recent reductions in fentanyl trafficking."
  },
  {
    year: "2025", title: "Commentary: Understanding the real deal about fentanyl", outlet: "Orlando Sentinel",
    url: "https://www.orlandosentinel.com/2025/12/20/commentary-understanding-the-real-deal-about-fentanyl/",
    summary: "Provides a clear-eyed assessment of the fentanyl crisis for a general audience, debunking common myths and offering practical guidance on how communities and families can respond to the ongoing threat."
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
    year: "2023", title: "Florida, in this new year, keep talking to kids about drugs", outlet: "Tampa Bay Times",
    url: "https://www.tampabay.com/opinion/2023/12/30/florida-this-new-year-keep-talking-kids-about-drugs-column/",
    summary: "Co-authored with Uttam Dhillon. Urges Florida parents and educators to maintain open conversations about drug risks with young people, warning that the fentanyl threat makes even casual experimentation potentially fatal."
  },
  {
    year: "2023", title: "Will 'Poor Man's Cocaine' Fuel the Next U.S. Drug Crisis?", outlet: "Undark Magazine",
    url: "https://undark.org/2023/09/21/will-poor-mans-cocaine-fuel-the-next-u-s-drug-crisis/",
    summary: "Investigates the spread of Captagon — a cheap amphetamine-type stimulant popular in the Middle East — and assesses whether it could become the next major drug threat to reach the United States."
  },
  {
    year: "2023", title: "Fentanyl is killing thousands of Americans. The DEA needs a clear strategy.", outlet: "Dallas Morning News",
    url: "https://www.dallasnews.com/opinion/commentary/2023/04/05/fentanyl-is-killing-thousands-of-americans-the-dea-needs-a-clear-strategy/",
    summary: "Co-authored with former DEA Acting Administrator Uttam Dhillon. Criticizes the DEA's delay in publishing a critical intelligence report and calls for a more transparent, data-driven strategy to combat fentanyl trafficking."
  },
  {
    year: "2023", title: "The US can learn from Portugal's drug policies, including decriminalization", outlet: "The Hill",
    url: "https://thehill.com/opinion/criminal-justice/4090780-the-us-can-learn-from-portugals-drug-policies-including-decriminalization/",
    summary: "Examines Portugal's landmark drug decriminalization model and its measurable public health outcomes, arguing that the U.S. should adopt elements of the approach to reduce overdose deaths and incarceration rates."
  },
  {
    year: "2023", title: "U.S. must exercise all its authority to bring Mexican cartels to heel", outlet: "Washington Times",
    url: "https://www.washingtontimes.com/news/2023/jan/19/us-must-exercise-all-its-authority-to-bring-mexica/",
    summary: "Argues that the U.S. must deploy the full range of diplomatic, economic, and law enforcement tools at its disposal to pressure Mexico into taking more decisive action against cartel operations."
  },
  {
    year: "2023", title: "Guest opinion: Opioid crisis not a red or blue state issue — it's an American issue", outlet: "AL.com",
    url: "https://www.al.com/opinion/2023/01/guest-opinion-opioid-crisis-not-a-red-or-blue-state-issue-its-an-american-issue.html",
    summary: "Calls for a bipartisan approach to the opioid epidemic, arguing that overdose deaths cut across political and geographic lines and that partisan gridlock is costing American lives."
  },
  {
    year: "2022", title: "Deadly fentanyl hybrids and substitutes could fuel 2023's opioid crisis", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/3789532-deadly-fentanyl-hybrids-and-substitutes-could-fuel-2023s-opioid-crisis/",
    summary: "Warns that drug traffickers are developing fentanyl analogues and hybrid compounds designed to evade detection and scheduling, predicting that these novel substances will drive a new wave of overdose deaths."
  },
  {
    year: "2022", title: "Finally, a much-needed glimmer of hope for the opioid crisis", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/3768725-finally-a-much-needed-glimmer-of-hope-for-the-opioid-crisis/",
    summary: "Cautiously welcomes early signs of declining overdose deaths while warning that structural vulnerabilities in the drug supply chain mean the crisis is far from over and sustained policy effort is still required."
  },
  {
    year: "2022", title: "Biden must do more to disrupt the fentanyl supply", outlet: "The Spectator World",
    url: "https://spectator.com/article/biden-must-do-more-to-disrupt-the-fentanyl-supply/",
    summary: "Argues that the Biden administration's counterdrug strategy lacks the urgency needed to disrupt fentanyl supply chains, calling for stronger pressure on China and Mexico to cut off precursor chemical flows."
  },
  {
    year: "2022", title: "Biden's prisoner swaps are setting a terrible precedent", outlet: "Washington Examiner",
    url: "https://www.washingtonexaminer.com/author/james-crotty/",
    summary: "Critiques the Biden administration's high-profile prisoner exchanges, arguing that trading convicted drug traffickers for American detainees signals weakness and incentivizes adversaries to take more U.S. citizens hostage."
  },
  {
    year: "2022", title: "The US Opioid Problem Is Also a China Problem", outlet: "The Diplomat",
    url: "https://thediplomat.com/2022/09/the-us-opioid-problem-is-also-a-china-problem/",
    summary: "Argues that China's role as the primary supplier of fentanyl precursor chemicals to Mexican cartels makes the opioid crisis a bilateral diplomatic issue requiring sustained U.S.-China counternarcotics engagement."
  },
  {
    year: "2022", title: "Ending telehealth cuts off a vital tool against opioid addiction", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/3636356-ending-telehealth-cuts-off-a-vital-tool-against-opioid-addiction/",
    summary: "Argues that rolling back pandemic-era telehealth flexibilities would eliminate a critical access point for addiction treatment, disproportionately harming rural and underserved communities."
  },
  {
    year: "2022", title: "We Need an All-of-the-Above Strategy to Fight the Opioid Crisis", outlet: "Newsweek",
    url: "https://www.newsweek.com/we-need-all-above-strategy-fight-opioid-crisis-opinion-1698234",
    summary: "Calls for a comprehensive, multi-pronged approach to the opioid epidemic that integrates supply reduction, demand treatment, and harm reduction rather than relying on any single policy lever."
  },
  {
    year: "2022", title: "The White House's new drug control strategy may have to work around Mexico", outlet: "The Hill",
    url: "https://thehill.com/opinion/white-house/3478544-the-white-houses-new-drug-control-strategy-may-have-to-work-around-mexico/",
    summary: "Assesses the Biden administration's National Drug Control Strategy in the context of deteriorating U.S.-Mexico counternarcotics cooperation, arguing that Washington must find ways to reduce supply without Mexican partnership."
  },
  {
    year: "2022", title: "Launching Missiles Is Easy, Drug Control Is Hard", outlet: "Lawfare",
    url: "https://www.lawfaremedia.org/article/launching-missiles-easy-drug-control-hard",
    summary: "Critiques proposals to use military force against Mexican drug cartels, arguing that the complexity of drug supply chains makes kinetic strikes an ineffective and counterproductive policy tool."
  },
  {
    year: "2022", title: "The next generation of illicit drugs? Think 'synthetic'", outlet: "STAT News",
    url: "https://www.statnews.com/2022/08/05/synthetic-drugs-fuel-next-wave-illicit-drug-use/",
    summary: "Predicts that synthetic drugs will define the next era of illicit drug trafficking, as their low production costs, high potency, and ease of global distribution make them far more dangerous than plant-based predecessors."
  },
  {
    year: "2022", title: "What the COVID pandemic can teach us about the drug pandemic", outlet: "The Hill",
    url: "https://thehill.com/opinion/healthcare/595290-what-the-covid-pandemic-can-teach-us-about-the-drug-pandemic/",
    summary: "Draws parallels between the federal government's response to COVID-19 and the ongoing drug crisis, arguing that the same whole-of-government urgency applied to the pandemic must now be directed at drug overdose deaths."
  },
  {
    year: "2022", title: "To prevent overdose deaths, focus on demand reduction in the U.S.", outlet: "STAT News",
    url: "https://www.statnews.com/2022/02/11/preventing-overdose-deaths-demand-reduction-at-home/",
    summary: "Argues that supply-side interdiction alone cannot end the overdose crisis and that the U.S. must invest far more heavily in treatment, recovery, and prevention to reduce the demand that sustains drug trafficking."
  },
  {
    year: "2022", title: "Congress Must Act to Permanently Control Fentanyl-Related Substances", outlet: "Newsweek",
    url: "https://www.newsweek.com/congress-must-act-permanently-control-fentanyl-related-substances-opinion-1677625",
    summary: "Urges Congress to make permanent the temporary scheduling of fentanyl analogues, warning that allowing the emergency order to lapse would create a legal loophole exploited by drug manufacturers to evade prosecution."
  },
  {
    year: "2022", title: "In Search of a Silver Bullet: Reducing the Supply of Synthetic Drugs to the U.S.", outlet: "Small Wars Journal",
    url: "https://smallwarsjournal.com/2022/04/04/search-silver-bullet-reducing-supply-synthetic-drugs-us/",
    summary: "Reviews the full range of supply-side interdiction strategies — from precursor chemical controls to international partnerships — and concludes that no single approach can solve the synthetic drug crisis."
  },
  {
    year: "2021", title: "If it's fentanyl, one pill can kill — talk to your family about drugs this New Year's Eve", outlet: "Tampa Bay Times",
    url: "https://www.tampabay.com/opinion/2021/12/31/if-its-fentanyl-one-pill-can-kill-so-this-new-years-eve-talk-to-your-family-about-drugs-column/",
    summary: "Urges families to use the New Year's holiday as an opportunity to have frank conversations about the lethal danger of fentanyl-laced counterfeit pills, warning that even a single pill can be fatal."
  },
];

const mediaOutlets = [
  "Wall Street Journal", "Washington Post", "Associated Press", "The Guardian",
  "Newsweek", "The Hill", "STAT News", "Lawfare", "The Diplomat", "Undark Magazine",
  "Tampa Bay Times", "Orlando Sentinel", "Dallas Morning News", "Washington Times",
  "Washington Examiner", "The Spectator World", "We Are The Mighty", "Fox News", "AL.com"
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
    outlet: "Washington Post",
    outletShort: "WaPo",
    logo: "WP",
    color: "#231f20",
    date: "August 20, 2022",
    title: "Colombia, largest cocaine supplier to U.S., considers decriminalizing",
    quote: "As we've seen before in Colombia and elsewhere, there's always someone to fill that vacuum.",
    context: "Crotty was quoted as a former DEA deputy chief of staff pushing back on Colombia's proposal to decriminalize cocaine, arguing that a legal cocaine trade would not eliminate the illegal market and that armed groups would continue to exploit any regulatory gap.",
    author: "Samantha Schmidt & Diana Durán",
    url: "https://www.washingtonpost.com/world/2022/08/20/colombia-cocaine-decriminalize-petro/",
  },
  {
    outlet: "Atlanta Journal-Constitution",
    outletShort: "AJC",
    logo: "AJC",
    color: "#1a1a1a",
    date: "January 21, 2025",
    title: "Opinion: We must hear the warnings about fentanyl",
    quote: "What we're seeing today is the single largest transformation in the drug trade ever.",
    context: "Crotty was quoted as a leading expert on the synthetic drug revolution, warning that the scale and speed of change in the illicit drug market demands urgent public attention and a coordinated policy response.",
    author: "Atlanta Journal-Constitution Editorial",
    url: "https://www.ajc.com/opinion/opinion-we-must-hear-the-warnings-about-fentanyl/MTEKNULXY5BC7HO7DVEFVSH2S4/",
  },
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
  { name: "United Against Fentanyl", role: "Advisory Board Member", desc: "Bipartisan non-profit focused on ending the U.S. opioid crisis.", url: "https://www.uniteagainstfentanyl.org", icon: "shield" },
  { name: "Global Initiative Against Transnational Organized Crime (GI-TOC)", role: "Network of Experts Member", desc: "International network of researchers and practitioners addressing organized crime.", url: "https://globalinitiative.net", icon: "users" },
  { name: "USF Global and National Security Institute (GNSI)", role: "Non-Resident Senior Fellow", desc: "University of South Florida research institute on national security.", url: "https://www.usf.edu/gnsi/", icon: "award" },
  { name: "Small Wars Journal – El Centro", role: "2026 Fellow / Associate", desc: "Leading journal on irregular warfare and national security strategy.", url: "https://smallwarsjournal.com", icon: "book" },
  { name: "Center for Advanced Defense Studies (C4ADS)", role: "Former Senior Fellow", desc: "Supported Organized Crime and Grand Corruption team on drug trafficking and money laundering.", url: "https://c4ads.org", icon: "users" },
  { name: "Presidential Management Fellows Program", role: "Former Fellow", desc: "Prestigious U.S. government leadership development program.", url: "https://www.pmf.gov", icon: "award" },
];

function SectionWrapper({
  id,
  children,
  label,
  title,
  defaultOpen = true,
  dark = false,
  bgOverlay,
}: {
  id: string;
  children: React.ReactNode;
  label: string;
  title: string;
  defaultOpen?: boolean;
  dark?: boolean;
  bgOverlay?: string;
}) {
  // On mobile (< 768px), sections start collapsed; on desktop they start open
  const getInitialOpen = () => false;
  const [open, setOpen] = useState(getInitialOpen);
  const overlay = bgOverlay ?? (dark ? "rgba(13,34,64,0.88)" : "rgba(255,255,255,0.96)");
  const labelColor = dark ? "rgba(255,255,255,0.5)" : "#4A7FA5";
  const titleColor = dark ? "#ffffff" : "#0D2240";
  const borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(13,34,64,0.1)";
  const chevronColor = dark ? "rgba(255,255,255,0.5)" : "#4A7FA5";

  return (
    <section
      id={id}
      className="relative"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div className="container relative z-10">
        {/* Collapsible header */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between py-8 group text-left"
          style={{ borderBottom: open ? `1px solid ${borderColor}` : "none" }}
          aria-expanded={open}
        >
          <div>
            <div className="section-label mb-1" style={{ color: labelColor }}>{label}</div>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: titleColor,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h2>
          </div>
          <span
            className="flex-shrink-0 ml-4 transition-transform duration-300"
            style={{ color: chevronColor, transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          >
            {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </span>
        </button>

        {/* Collapsible body */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? "9999px" : "0",
            transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="py-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

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
    { label: "Profile", href: "#about" },
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
    { value: "14+", label: "Years in Law Enforcement" },
    { value: "35+", label: "Publications & Op-Eds" },
    { value: "6", label: "Fellowships" },
    { value: "19+", label: "Media Outlets" },
    { value: "3", label: "Degrees" },
    { value: "30+", label: "Countries Served" },
  ];
  return (
    <div className="grid grid-cols-3 gap-0 w-full">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center py-4 px-4 text-center"
          style={{
            borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
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
      thumbnail: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2022/08/1024/512/Narcan-Vending-Machine-8.jpg?ve=1&tl=1",
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
    <SectionWrapper
      id="media"
      label="04 / On Camera"
      title="Broadcast Appearances"
      dark={true}
      bgOverlay="rgba(13,34,64,0.91)"
    >
      <p className="text-sm max-w-md mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
        Selected broadcast and documentary appearances.
      </p>
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
                  style={{ backgroundColor: "#0D2240", minHeight: "220px", backgroundImage: v.thumbnail ? `url(${v.thumbnail})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,34,64,0.75)" }} />
                  <div className="relative z-10 text-center px-8">
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
    </SectionWrapper>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${MAP_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(13,34,64,0.90)" }}
      />


      <div className="container relative z-10 pt-24 pb-8">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left column: text content */}
          <div className="flex-1 min-w-0">
          {/* Name */}
          <h1
            className="hero-name text-white mb-4 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Jim{" "}
            <span style={{ fontWeight: 600, fontStyle: "italic" }}>Crotty</span>
          </h1>

          {/* Title */}
          <p
            className="hero-titles text-white/70 mb-8 text-lg"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, letterSpacing: "0.02em" }}
          >
            Law Enforcement Outreach Manager, Meta Platforms &nbsp;·&nbsp; Former DEA Deputy Chief of Staff &nbsp;·&nbsp; Adjunct Professor, American University &nbsp;·&nbsp; Advisory Board Member &nbsp;·&nbsp; Senior Fellow
          </p>

          {/* Bio snippet */}
          <p
            className="hero-bio text-white/60 mb-8 leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "1rem" }}
          >
            A global thought leader and subject matter expert in law enforcement, intelligence, transnational organized crime, and drug policy — with over 14 years in law enforcement, including a distinguished career at the U.S. Drug Enforcement Administration, and a record of public service, academic scholarship, and policy advocacy.
          </p>

          {/* Pull-quote */}
          <blockquote
            className="mb-8 pl-4 border-l-2"
            style={{ borderColor: "#4A7FA5" }}
          >
            <p
              className="text-white/80 italic leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400 }}
            >
              "The opioid crisis is not a red or blue state issue — it’s an American issue."
            </p>
            <cite
              className="block mt-2 text-xs not-italic tracking-widest uppercase"
              style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}
            >
              — Jim Crotty, AL.com
            </cite>
          </blockquote>

          {/* PDF Download button */}
          <div className="mb-10">
            <a
              href="/api/download-cv"
              download="Jim_Crotty_Profile.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "rgba(74,127,165,0.15)",
                border: "1px solid rgba(74,127,165,0.5)",
                color: "#ffffff",
                fontFamily: "'Lato', sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Profile PDF
            </a>
          </div>

          {/* Section navigation tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Profile", sub: "Background & Bio", href: "#about", icon: <GraduationCap size={20} /> },
              { label: "Career", sub: "Professional History", href: "#career", icon: <Briefcase size={20} /> },
              { label: "Publications", sub: "Opinion and Analysis", href: "#publications", icon: <BookOpen size={20} /> },
              { label: "On Camera", sub: "Broadcast Appearances", href: "#media", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> },
              { label: "In the News", sub: "Media Coverage", href: "#in-the-news", icon: <Newspaper size={20} /> },
              { label: "Affiliations", sub: "Fellowships & Networks", href: "#affiliations", icon: <Award size={20} /> },
              { label: "Contact", sub: "Get in Touch", href: "#contact", icon: <Mail size={20} />, center: true },
            ].map((tile) => (
              <a
                key={tile.href}
                href={tile.href}
                className={`group flex flex-col gap-2 p-4 transition-all duration-200 hover:-translate-y-0.5${'center' in tile && tile.center ? ' col-span-2 sm:col-span-1' : ''}`}
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderTop: "2px solid rgba(74,127,165,0.6)",
                }}
              >
                <span style={{ color: "#4A7FA5" }} className="group-hover:text-white transition-colors">{tile.icon}</span>
                <div>
                  <div
                    className="font-semibold text-white text-sm leading-tight"
                    style={{ fontFamily: "'Lato', sans-serif", letterSpacing: "0.03em" }}
                  >
                    {tile.label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lato', sans-serif" }}
                  >
                    {tile.sub}
                  </div>
                </div>
              </a>
            ))}
          </div>{/* end tiles grid */}
          </div>{/* end left column */}

          {/* Right column: headshot */}
          <div className="hidden lg:flex lg:w-72 xl:w-80 flex-shrink-0 justify-center items-start pt-20">
            <div className="relative">
              <img
                src={PROFILE_IMG}
                alt="Jim Crotty"
                className="w-64 xl:w-72 object-cover"
                style={{
                  filter: "grayscale(15%)",
                  boxShadow: "8px 8px 0 rgba(74,127,165,0.4)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(74,127,165,0.3)" }}
              />
            </div>
          </div>

        </div>{/* end flex row */}

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

const CAROUSEL_PHOTOS = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/speaking_podium_a053b602.jpg",
    caption: "Keynote Address",
    label: "Speaking Engagement",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/speech_mic_094dd872.jpg",
    caption: "Congressional Briefing",
    label: "Policy Testimony",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/speech_conference_4282e5d6.jpg",
    caption: "National Security Conference",
    label: "Expert Panel",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/capitol_hill_6170f8f1.jpg",
    caption: "U.S. Capitol, Washington D.C.",
    label: "Policy Work",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451950503/iBHV5ZcZsrLaWgHahkPnfq/badge_5d5114ea.jpg",
    caption: "14 Years in Federal Law Enforcement",
    label: "DEA Career",
  },
];

function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const total = CAROUSEL_PHOTOS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="mt-10 pt-8 border-t" style={{ borderColor: "#e5e7eb" }}>
      <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>In the Field</div>
      <div className="relative overflow-hidden" style={{ borderTop: "2px solid #4A7FA5" }}>
        {/* Main image */}
        <div className="relative" style={{ aspectRatio: "16/9", backgroundColor: "#0D2240" }}>
          {CAROUSEL_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(20%)" }}
              />
              {/* Caption overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-3"
                style={{ background: "linear-gradient(to top, rgba(13,34,64,0.92) 0%, rgba(13,34,64,0.0) 100%)" }}
              >
                <div
                  className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                  style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}
                >
                  {photo.label}
                </div>
                <div
                  className="text-sm text-white/80"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  {photo.caption}
                </div>
              </div>
            </div>
          ))}

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-all hover:scale-110"
            style={{ backgroundColor: "rgba(13,34,64,0.7)", border: "1px solid rgba(74,127,165,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-all hover:scale-110"
            style={{ backgroundColor: "rgba(13,34,64,0.7)", border: "1px solid rgba(74,127,165,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Dot indicators + thumbnail strip */}
        <div className="flex items-center gap-3 mt-3">
          {CAROUSEL_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to photo ${i + 1}`}
              className="flex-1 relative overflow-hidden transition-all duration-200"
              style={{
                height: "52px",
                border: i === active ? "2px solid #4A7FA5" : "2px solid transparent",
                opacity: i === active ? 1 : 0.5,
              }}
            >
              <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      label="01 / Profile"
      title="Background & Bio"
      dark={false}
    >
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
                Jim's distinguished public service career includes over <strong style={{ fontWeight: 700, color: "#0D2240" }}>14 years in law enforcement</strong>, anchored by a career at the <strong style={{ fontWeight: 700, color: "#0D2240" }}>U.S. Drug Enforcement Administration (DEA)</strong>, where he served in strategic, tactical, and operational positions domestically and internationally across more than 30 countries. His final DEA assignment was as Deputy Chief of Staff and Executive Assistant to the Administrator — the agency's top leadership position.
              </p>
              <p>
                He is an <strong style={{ fontWeight: 700, color: "#0D2240" }}>Adjunct Professor at American University's School of Public Affairs</strong>, teaching courses on Drugs, Crime, and Public Policy and Organized Crime. His commentary and analysis have been featured in the <em>Washington Post</em>, <em>Wall Street Journal</em>, <em>Newsweek</em>, <em>The Hill</em>, <em>STAT News</em>, <em>The Guardian</em>, and many other leading publications.
              </p>
            </div>

            {/* Featured in strip */}
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "#e5e7eb" }}>
              <div className="section-label mb-4" style={{ color: "#4A7FA5" }}>Featured In</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {mediaOutlets.map((outlet) => (
                  <span
                    key={outlet}
                    className="text-sm font-bold"
                    style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif", letterSpacing: "0.02em" }}
                  >
                    {outlet}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo carousel */}
            <PhotoCarousel />
          </div>
        </div>
    </SectionWrapper>
  );
}

function CareerSection() {
  return (
    <SectionWrapper
      id="career"
      label="02 / Career"
      title="Professional History"
      dark={true}
    >
        <div className="max-w-4xl mx-auto">

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
    </SectionWrapper>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={18} />
    </button>
  );
}

function PublicationsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? publications : publications.slice(0, 8);

  return (
    <SectionWrapper
      id="publications"
      label="03 / Publications"
      title="Opinion and Analysis"
      dark={false}
      bgOverlay="rgba(245,247,250,0.95)"
    >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((pub, i) => (
            <a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-card group block p-6 reveal-on-scroll"
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
    </SectionWrapper>
  );
}

function InTheNewsSection() {
  return (
    <SectionWrapper
      id="in-the-news"
      label="05 / In the News"
      title="Media Coverage"
      dark={false}
    >
      <p className="text-sm max-w-md text-gray-500 mb-8" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
        Jim's expert analysis has been sought by the world's leading news organizations on drug policy, cartels, and national security.
      </p>
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
                  borderTop: "4px solid #4A7FA5",
                }}
              >
                {/* Outlet badge + date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center font-black text-white text-xs px-2 py-1 min-w-[2.5rem]"
                      style={{
                        backgroundColor: "#0D2240",
                        fontFamily: "'Lato', sans-serif",
                        letterSpacing: item.logo.length > 1 ? "0.05em" : "0",
                        fontSize: item.logo === "G" ? "1rem" : "0.65rem",
                      }}
                    >
                      {item.logo}
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem" }}
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
    </SectionWrapper>
  );
}

function AffiliationsSection() {
  return (
    <SectionWrapper
      id="affiliations"
      label="06 / Affiliations"
      title="Fellowships & Networks"
      dark={true}
      bgOverlay="rgba(13,34,64,0.91)"
    >
      <p className="text-sm max-w-md mb-8" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
        Jim is affiliated with several leading research institutions, policy organizations, and national security networks focused on drug policy, transnational organized crime, and law enforcement.
      </p>
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
                {aff.icon === "shield" && <Shield size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#4A7FA5" }} />}
                {aff.icon === "users" && <Users size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#4A7FA5" }} />}
                {aff.icon === "book" && <BookOpen size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#4A7FA5" }} />}
                {aff.icon === "award" && <Award size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#4A7FA5" }} />}
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
    </SectionWrapper>
  );
}

function ContactSection() {
  const contactLinks = [
    {
      icon: <Linkedin size={22} style={{ color: '#4A7FA5' }} />,
      label: "LinkedIn",
      description: "Connect and send a direct message on LinkedIn.",
      href: "https://www.linkedin.com/in/jamesmcrotty",
      cta: "View Profile",
    },
    {
      icon: <GraduationCap size={22} style={{ color: '#4A7FA5' }} />,
      label: "Academic Email",
      description: "For academic collaboration, research, or university inquiries.",
      href: "mailto:jcrotty@american.edu",
      cta: "Send Email",
    },
  ];

  return (
    <SectionWrapper
      id="contact"
      label="07 / Contact"
      title="Get in Touch"
      dark={false}
    >
        <p className="mb-8 leading-relaxed" style={{ color: '#6b7280', fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: '1.05rem' }}>
          For media inquiries, speaking engagements, academic collaboration, or general questions, reach out directly via LinkedIn or email.
        </p>
        <div className="max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-6 reveal-on-scroll transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid rgba(13,34,64,0.1)',
                  borderTop: '3px solid #4A7FA5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {link.icon}
                  <span
                    className="font-bold text-base"
                    style={{ fontFamily: "'Libre Baskerville', serif", color: '#0D2240' }}
                  >
                    {link.label}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#6b7280', fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  {link.description}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase group-hover:underline"
                  style={{ color: '#4A7FA5', fontFamily: "'Lato', sans-serif" }}
                >
                  {link.cta} <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
    </SectionWrapper>
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
              style={{ color: "#ffffff", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
        >
          © {new Date().getFullYear()} Jim Crotty. All rights reserved.
        </span>

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
      <BackToTop />
    </div>
  );
}
