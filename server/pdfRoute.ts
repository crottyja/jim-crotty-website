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
  const GOLD = "#C8860A";
  const GRAY = "#6b7280";
  const LIGHT = "#f8f9fa";

  const W = doc.page.width - 120; // usable width

  // ─── Header band ─────────────────────────────────────────────────
  doc.rect(0, 0, doc.page.width, 110).fill(NAVY);

  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(28)
    .text("Jim Crotty", 60, 28);

  doc
    .fillColor(STEEL)
    .font("Helvetica")
    .fontSize(9.5)
    .text(
      "Law Enforcement Outreach Manager, Meta Platforms  ·  Former DEA Deputy Chief of Staff  ·  Adjunct Professor, American University",
      60,
      64,
      { width: W }
    );

  doc
    .fillColor("rgba(255,255,255,0.55)")
    .font("Helvetica")
    .fontSize(8.5)
    .text(
      "jamesmcrotty@hotmail.com  ·  jcrotty@american.edu  ·  linkedin.com/in/jamesmcrotty  ·  jcrotty.com",
      60,
      84,
      { width: W }
    );

  // ─── Pull-quote ───────────────────────────────────────────────────
  doc.moveDown(0);
  const qY = 126;
  doc.rect(60, qY, 3, 36).fill(STEEL);
  doc
    .fillColor(NAVY)
    .font("Helvetica-Oblique")
    .fontSize(10)
    .text(
      '"The next generation of illicit drugs will not be grown in a field — they will be synthesized in a lab, shipped in an envelope, and delivered to your door."',
      70,
      qY + 2,
      { width: W - 10 }
    );
  doc
    .fillColor(STEEL)
    .font("Helvetica")
    .fontSize(7.5)
    .text("— STAT News", 70, qY + 28);

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
      org: "Meta Platforms",
      period: "2022 – Present",
      detail:
        "Leads global law enforcement engagement strategy, supporting criminal investigations across 190+ countries.",
    },
    {
      title: "Adjunct Professor, School of International Service",
      org: "American University",
      period: "2021 – Present",
      detail:
        "Teaches graduate-level courses on transnational organized crime, drug policy, and national security.",
    },
    {
      title: "Deputy Chief of Staff",
      org: "U.S. Drug Enforcement Administration (DEA)",
      period: "2019 – 2022",
      detail:
        "Senior advisor to DEA leadership; coordinated cross-agency counternarcotics strategy and intelligence operations.",
    },
    {
      title: "Intelligence Research Specialist",
      org: "Metropolitan Police Department, Washington D.C.",
      period: "2010 – 2019",
      detail:
        "Conducted strategic intelligence analysis on transnational criminal organizations and drug trafficking networks.",
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
      .text(`${job.org}  ·  ${job.period}`, 60, curY, { width: W });
    curY = doc.y + 1;
    bodyText(job.detail);
    curY += 3;
  }

  // ─── Selected Publications ────────────────────────────────────────
  sectionHeader("Selected Publications (Opinion & Analysis)");

  const pubs = [
    { year: "2026", title: "The quiet resurgence of plant-based illicit drugs", outlet: "The Hill" },
    { year: "2026", title: "Beyond Illicit Drugs: How the US is Expanding the Scope of Armed Conflict", outlet: "Small Wars Journal" },
    { year: "2025", title: "The New Militarized War on Drugs — Time to View Cartels as National Security Threats?", outlet: "Small Wars Journal" },
    { year: "2025", title: "'Narconomics,' not prohibition, is behind the rise in synthetic drugs", outlet: "The Hill" },
    { year: "2024", title: "Welcome to the global synthetic drug revolution", outlet: "The Hill" },
    { year: "2024", title: "9/11 makes the case for a Department of Treatment and Recovery", outlet: "The Hill" },
    { year: "2023", title: "Will 'Poor Man's Cocaine' Fuel the Next U.S. Drug Crisis?", outlet: "Undark Magazine" },
    { year: "2022", title: "The next generation of illicit drugs? Think 'synthetic'", outlet: "STAT News" },
    { year: "2022", title: "Launching Missiles Is Easy, Drug Control Is Hard", outlet: "Lawfare" },
    { year: "2022", title: "The US Opioid Problem Is Also a China Problem", outlet: "The Diplomat" },
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
    { name: "Global Initiative Against Transnational Organized Crime (GI-TOC)", role: "Research Affiliate" },
    { name: "Small Wars Journal", role: "Contributing Author" },
    { name: "Center for Advanced Defense Studies (C4ADS)", role: "Research Contributor" },
    { name: "University of South Florida, Global National Security Institute", role: "Affiliated Researcher" },
    { name: "Partnership for a Drug-Free America", role: "Advisory Board" },
  ];

  for (const aff of affiliations) {
    bullet(aff.name, `— ${aff.role}`);
  }

  curY += 4;

  // ─── Featured In ─────────────────────────────────────────────────
  sectionHeader("Media Coverage & Featured In");
  bodyText(
    "The Washington Post  ·  Newsweek  ·  The Hill  ·  Wall Street Journal  ·  Associated Press  ·  The Guardian  ·  Fox News  ·  STAT News  ·  Lawfare  ·  The Diplomat  ·  Undark Magazine  ·  Dallas Morning News  ·  Tampa Bay Times  ·  Orlando Sentinel  ·  Washington Times  ·  Washington Examiner  ·  The Spectator World  ·  We Are The Mighty  ·  AL.com"
  );

  doc.end();
});

export default router;
