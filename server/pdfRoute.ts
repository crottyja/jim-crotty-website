import { Router } from "express";
import PDFDocument from "pdfkit";

const router = Router();

router.get("/api/download-cv", (_req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Jim_Crotty_Profile.pdf"'
  );

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 54, bottom: 54, left: 60, right: 60 },
    info: {
      Title: "Jim Crotty — Professional Profile",
      Author: "Jim Crotty",
      Subject: "Law Enforcement & Drug Policy Expert",
    },
  });

  doc.pipe(res);

  // ─── Color palette ───────────────────────────────────────────────
  const NAVY = "#0D2240";
  const STEEL = "#4A7FA5";
  const GRAY = "#6b7280";

  const W = doc.page.width - 120; // usable width

  // ─── Header band ─────────────────────────────────────────────────
  doc.rect(0, 0, doc.page.width, 128).fill(NAVY);

  // Name
  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(28)
    .text("Jim Crotty", 60, 22);

  // Title line — matches hero subtitle exactly
  doc
    .fillColor(STEEL)
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Law Enforcement Outreach Manager, Meta Platforms  ·  Former DEA Deputy Chief of Staff  ·  Adjunct Professor, American University  ·  Advisory Board Member  ·  Senior Fellow",
      60,
      60,
      { width: W }
    );

  // Contact line — academic email + LinkedIn + website (personal email removed)
  const contactY = 100;
  const iconColor = "rgba(255,255,255,0.70)";
  const linkColor = "rgba(255,255,255,0.55)";

  doc.fillColor(iconColor).font("Helvetica-Bold").fontSize(8).text("✉", 60, contactY, { continued: true });
  doc.fillColor(linkColor).font("Helvetica").fontSize(8).text("  jcrotty@american.edu", { continued: true });

  doc.fillColor(iconColor).font("Helvetica-Bold").text("   in", { continued: true });
  doc.fillColor(linkColor).font("Helvetica").text("  linkedin.com/in/jamesmcrotty", { continued: true });

  doc.fillColor(iconColor).font("Helvetica-Bold").text("   ⊕", { continued: true });
  doc.fillColor(linkColor).font("Helvetica").text("  jcrotty.com");

  // ─── Pull-quote ───────────────────────────────────────────────────
  const qY = 144;
  doc.rect(60, qY, 3, 30).fill(STEEL);
  doc
    .fillColor(NAVY)
    .font("Helvetica-Oblique")
    .fontSize(10)
    .text(
      '"The opioid crisis is not a red or blue state issue — it\'s an American issue."',
      70,
      qY + 4,
      { width: W - 10 }
    );
  doc
    .fillColor(STEEL)
    .font("Helvetica")
    .fontSize(7.5)
    .text("— Jim Crotty, AL.com", 70, qY + 22);

  // ─── Section helper ───────────────────────────────────────────────
  let curY = qY + 52;

  function sectionHeader(title: string) {
    doc
      .rect(60, curY, W, 0.5)
      .fillColor(STEEL)
      .fill();
    curY += 6;
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(title.toUpperCase(), 60, curY, { characterSpacing: 1.2 });
    curY += 16;
  }

  function bodyText(text: string, indent = 0) {
    doc
      .fillColor(GRAY)
      .font("Helvetica")
      .fontSize(8.5)
      .text(text, 60 + indent, curY, { width: W - indent });
    curY = doc.y + 4;
  }

  function bullet(label: string, value: string) {
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .text(label + "  ", 60, curY, { continued: true, width: W });
    doc
      .fillColor(GRAY)
      .font("Helvetica")
      .text(value);
    curY = doc.y + 3;
  }

  // ─── Summary ─────────────────────────────────────────────────────
  sectionHeader("Profile");
  bodyText(
    "A global thought leader and subject matter expert in law enforcement, intelligence, transnational organized crime, and drug policy — with over 14 years in law enforcement, including a distinguished career at the U.S. Drug Enforcement Administration, and a record of public service, academic scholarship, and policy advocacy."
  );
  curY += 4;

  // ─── Career ──────────────────────────────────────────────────────
  sectionHeader("Professional History");

  const career = [
    {
      title: "Law Enforcement Outreach Manager",
      org: "Meta Platforms, Inc.",
      period: "2024 – Present",
      location: "Washington, D.C.",
      detail:
        "Develops and maintains strategic relationships with law enforcement agencies across North America to help combat online criminal activity and prevent real-world harm.",
    },
    {
      title: "Adjunct Professor / Lecturer",
      org: "American University, School of Public Affairs",
      period: "2024 – Present",
      location: "Washington, D.C.",
      detail:
        "Teaches JLC-451: Drugs, Crime & Public Policy and JLC-313: Organized Crime in the Department of Justice, Law & Criminology.",
    },
    {
      title: "Head, Investigative Support Section",
      org: "DC Metropolitan Police Department (MPD)",
      period: "2023 – 2024",
      location: "Washington, D.C.",
      detail:
        "Led a team of Criminal Research Specialists providing real-time intelligence on major crimes across the District of Columbia.",
    },
    {
      title: "Associate Vice President",
      org: "The Cohen Group",
      period: "2021 – 2023",
      location: "Washington, D.C.",
      detail:
        "Led multiple client teams across defense, cybersecurity, healthcare, energy, and national security sectors at the strategic advisory firm founded by former Secretary of Defense William Cohen.",
    },
    {
      title: "Deputy Chief of Staff & Multiple Roles",
      org: "U.S. Drug Enforcement Administration (DEA)",
      period: "2009 – 2021",
      location: "Washington, D.C. | Chicago | London | Afghanistan",
      detail:
        "Over 12 years of distinguished service. Final role: Deputy Chief of Staff and Executive Assistant to the Administrator. Prior roles included Group Supervisor (Chicago Field Division), Liaison Officer (London Country Office, 2013–2018), Tactical Intelligence Analyst with FAST-Alpha (Afghanistan, 2010), and Strategic Intelligence Analyst focused on South America.",
    },
    {
      title: "Associate, National Security Practice",
      org: "PRTM Management Consultants",
      period: "Pre-2009",
      location: "Washington, D.C.",
      detail:
        "Provided strategic and operational advice to clients in the Intelligence Community, Department of Homeland Security, and Department of Defense.",
    },
  ];

  for (const job of career) {
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .text(job.title, 60, curY, { width: W });
    curY = doc.y;
    doc
      .fillColor(STEEL)
      .font("Helvetica")
      .fontSize(8)
      .text(`${job.org}  ·  ${job.period}  ·  ${job.location}`, 60, curY, { width: W });
    curY = doc.y + 1;
    bodyText(job.detail);
    curY += 3;
  }

  // ─── Education ───────────────────────────────────────────────────
  sectionHeader("Education");

  const education = [
    { degree: "JD", school: "University of Alabama School of Law", year: "2008" },
    { degree: "MA, Political Science", school: "Boston College", year: "2005" },
    { degree: "BA, Political Science", school: "Auburn University", year: "2003", note: "Summa Cum Laude" },
  ];

  for (const ed of education) {
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .text(ed.degree, 60, curY, { continued: true, width: W });
    doc
      .fillColor(GRAY)
      .font("Helvetica")
      .text(`  —  ${ed.school}, ${ed.year}${ed.note ? `  (${ed.note})` : ""}`);
    curY = doc.y + 3;
  }

  curY += 4;

  // ─── Selected Publications ────────────────────────────────────────
  sectionHeader("Selected Publications (Opinion & Analysis)");

  const pubs = [
    { year: "2026", title: "Could Mexican Cartels Be Incentivized to Sell 'Safer' Drugs?", outlet: "Small Wars Journal" },
    { year: "2026", title: "The quiet resurgence of plant-based illicit drugs", outlet: "The Hill" },
    { year: "2026", title: "Beyond Illicit Drugs: How the US is Expanding the Scope of Armed Conflict", outlet: "Small Wars Journal" },
    { year: "2026", title: "Operation Absolute Resolve: A Rendition Revival?", outlet: "Small Wars Journal" },
    { year: "2026", title: "Mexico-U.S. cooperation reduces fentanyl flow", outlet: "The Hill" },
    { year: "2025", title: "Commentary: Understanding the real deal about fentanyl", outlet: "Orlando Sentinel" },
    { year: "2025", title: "What if pharma companies made 'safe' recreational drugs?", outlet: "STAT News" },
    { year: "2025", title: "The New Militarized War on Drugs — Time to View Cartels as National Security Threats?", outlet: "Small Wars Journal" },
    { year: "2025", title: "'Narconomics,' not prohibition, is behind the rise in synthetic drugs", outlet: "The Hill" },
    { year: "2025", title: "Could Illicit Drug Production Shift to US?", outlet: "Small Wars Journal / El Centro" },
    { year: "2024", title: "Overdose deaths are down, but the crisis is far from resolved", outlet: "The Hill" },
    { year: "2024", title: "Welcome to the global synthetic drug revolution", outlet: "The Hill" },
    { year: "2024", title: "How DEA is tackling our greatest national security threat", outlet: "We Are The Mighty" },
    { year: "2024", title: "9/11 makes the case for a Department of Treatment and Recovery", outlet: "The Hill" },
    { year: "2023", title: "Will 'Poor Man's Cocaine' Fuel the Next U.S. Drug Crisis?", outlet: "Undark Magazine" },
    { year: "2023", title: "Fentanyl is killing thousands of Americans. The DEA needs a clear strategy.", outlet: "Dallas Morning News" },
    { year: "2023", title: "The US can learn from Portugal's drug policies, including decriminalization", outlet: "The Hill" },
    { year: "2022", title: "Launching Missiles Is Easy, Drug Control Is Hard", outlet: "Lawfare" },
    { year: "2022", title: "The US Opioid Problem Is Also a China Problem", outlet: "The Diplomat" },
    { year: "2022", title: "We Need an All-of-the-Above Strategy to Fight the Opioid Crisis", outlet: "Newsweek" },
  ];

  for (const pub of pubs) {
    doc
      .fillColor(STEEL)
      .font("Helvetica-Bold")
      .fontSize(7.5)
      .text(`[${pub.year}]  `, 60, curY, { continued: true, width: W });
    doc
      .fillColor(NAVY)
      .font("Helvetica")
      .text(`${pub.title}  `, { continued: true });
    doc
      .fillColor(GRAY)
      .font("Helvetica-Oblique")
      .text(pub.outlet);
    curY = doc.y + 2;
  }

  curY += 4;

  // ─── Affiliations ─────────────────────────────────────────────────
  sectionHeader("Affiliations & Fellowships");

  const affiliations = [
    { name: "United Against Fentanyl", role: "Advisory Board Member" },
    { name: "Global Initiative Against Transnational Organized Crime (GI-TOC)", role: "Network of Experts Member" },
    { name: "USF Global and National Security Institute (GNSI)", role: "Non-Resident Senior Fellow" },
    { name: "Small Wars Journal – El Centro", role: "2026 Fellow / Associate" },
    { name: "Center for Advanced Defense Studies (C4ADS)", role: "Former Senior Fellow" },
    { name: "Presidential Management Fellows Program", role: "Former Fellow" },
  ];

  for (const aff of affiliations) {
    bullet(aff.name, `— ${aff.role}`);
  }

  curY += 4;

  // ─── Selected Media Quotes ────────────────────────────────────────
  sectionHeader("Selected Media Quotes");

  const mediaQuotes = [
    {
      outlet: "The Baltimore Banner",
      date: "March 18, 2025",
      quote: "It's sort of a tragic story, really, to see that despite years of this opioid crisis, we still have such a long way to go, particularly in carceral settings.",
      context: "On the DEA's accountability audits of the Baltimore jail and Maryland women's prison over missing methadone pills.",
    },
    {
      outlet: "The Guardian",
      date: "October 6, 2024",
      quote: "These products could be appealing to vulnerable populations with limited income like youth and unhoused people, who might find legal dispensary products unaffordable.",
      context: "On illicit synthetic cannabinoid vapes flooding the unregulated hemp market.",
    },
    {
      outlet: "STAT News",
      date: "May 7, 2025",
      quote: "When you use hyperbole, you can actually lose the audience and the message.",
      context: "Pushing back on AG Pam Bondi's claim that drug busts saved 258 million lives.",
    },
    {
      outlet: "The Guardian",
      date: "March 8, 2025",
      quote: "I don't think now is the time that we want to stop any of those existing efforts because we know that at least some, or a combination of them, have been working.",
      context: "On Trump tariffs potentially disrupting anti-drug cooperation with Mexico, Canada, and China.",
    },
    {
      outlet: "Wall Street Journal",
      date: "August 30, 2022",
      quote: "If it were an athlete, people would call it 'The G.O.A.T.' It is in fact the most pernicious, the most devastating drug that we have ever seen.",
      context: "On fentanyl and the Sinaloa and Jalisco cartels' dominance of the U.S. drug supply.",
    },
    {
      outlet: "Washington Post",
      date: "August 20, 2022",
      quote: "As we've seen before in Colombia and elsewhere, there's always someone to fill that vacuum.",
      context: "On Colombia's proposal to decriminalize cocaine production.",
    },
  ];

  for (const mq of mediaQuotes) {
    // Outlet + date line
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(8)
      .text(`${mq.outlet}  `, 60, curY, { continued: true, width: W });
    doc
      .fillColor(GRAY)
      .font("Helvetica")
      .fontSize(7.5)
      .text(mq.date);
    curY = doc.y + 1;
    // Pull quote
    doc
      .fillColor(NAVY)
      .font("Helvetica-Oblique")
      .fontSize(8.5)
      .text(`"${mq.quote}"`, 66, curY, { width: W - 6 });
    curY = doc.y + 1;
    // Context
    doc
      .fillColor(GRAY)
      .font("Helvetica")
      .fontSize(7.5)
      .text(mq.context, 66, curY, { width: W - 6 });
    curY = doc.y + 5;
  }

  curY += 2;

  // ─── Featured In ─────────────────────────────────────────────────
  sectionHeader("Featured In");
  bodyText(
    "Wall Street Journal  ·  Washington Post  ·  Associated Press  ·  The Guardian  ·  Newsweek  ·  The Hill  ·  STAT News  ·  Lawfare  ·  The Diplomat  ·  Undark Magazine  ·  Tampa Bay Times  ·  Orlando Sentinel  ·  Dallas Morning News  ·  Washington Times  ·  Washington Examiner  ·  The Spectator World  ·  We Are The Mighty  ·  Fox News  ·  AL.com  ·  The Baltimore Banner  ·  Atlanta Journal-Constitution"
  );

  doc.end();
});

export default router;
