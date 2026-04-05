- [x] Make publication names bold and accent-colored in Featured In and In the News sections

## Design Consistency Fixes (Audit)
- [x] Fix In the News card top border color to use #4A7FA5 instead of item.color
- [x] Fix Hero Stats label "Experience Across Countries" → "Countries Served"
- [x] Add aria-label to LinkedIn nav icon
- [x] Set explicit font-size on In the News outlet name
- [x] Use varied icons in Affiliations cards
- [x] Align footer gold color to CSS token
- [x] Fix "View All Publications" button border-radius from 2px to 4px
- [x] Remove border from "View All Publications" button for CTA consistency
- [x] Improve Fox News On Camera card thumbnail styling

## New Features
- [x] Add hero section navigation tiles/cards for each section
- [x] Make all sections collapsible with animated toggle
- [x] Collapse sections by default on mobile, open on desktop

## Hero Section Edits
- [x] Truncate hero bio sentence at "advocacy"
- [x] Center the Contact tile in the hero grid
- [x] Rename Publications tile and section label to "Opinion & Analysis"
- [x] Remove the stats grid from the hero section
- [x] Align tile labels with their corresponding section header labels

## Tile & Section Title Alignment
- [x] Rename Publications tile/nav back to "Publications", subtitle "Opinion and Analysis"
- [x] Center Contact tile on bottom row of hero grid
- [x] Align all section header titles to match tile subtitles

## Layout Fixes
- [x] Remove blank right-side space in hero, shift content left
- [x] Update nav bar "About" label to "Profile"
- [x] Collapse all sections by default (not just on mobile)
- [x] Remove LinkedIn logo/link from nav bar
- [x] Change footer disclaimer text color to white

## Hero & Contact Enhancements
- [x] Move headshot from Profile section to hero section
- [x] Add direct email jcrotty@american.edu to Contact section
- [x] Add high-impact pull-quote to hero section
- [x] Build downloadable PDF one-pager and place button in hero section
- [x] Add new SWJ publication: "Could Mexican Cartels Be Incentivized to Sell 'Safer' Drugs?" (2026)
- [x] Update hero pull-quote to opioid crisis red/blue state quote
- [x] PDF: Update pull-quote to match hero section
- [x] PDF: Remove Meta "190+" inaccurate stat
- [x] PDF: Add email/LinkedIn/website icons to header contact line
- [x] Add "Advisory Board Member" and "Senior Fellow" to hero subtitle line
- [x] Move hero headshot down to align with left-column text
- [x] Fix Fox News broadcast thumbnail and link (currently shows Scripps News thumbnail)
- [x] Remove email contact option from Contact section
- [x] Audit and update PDF profile to match current website content
- [x] Add year filter to Publications section
- [ ] Find and add recent news quotes to In the News section
- [x] Add clickable links to hero section publication names
- [x] Add year filter to Publications section
- [x] Add new In the News quotes (Guardian Oct 2024, Baltimore Banner Mar 2025, STAT News May 2025)
- [x] Nav links auto-scroll to and open the target section
- [x] Add Guardian Oct 2024 and Baltimore Banner Mar 2025 quotes to PDF profile
- [x] Convert mobile menu to right-side drawer so it doesn't cover hero name
- [x] Remove headshot from Background & Bio section
- [x] Move Featured In below Research Areas in About section and match tag styles
- [x] Normalize all light section backgrounds to consistent color
- [x] Move PDF button below section tiles and make it smaller/more discrete
- [x] Align headshot top with Jim Crotty name text in hero
- [x] Final pre-publication audit: colors, fonts, copy, links
- [x] Align headshot top with lowercase letters in Jim Crotty
- [x] Build refined logo bar and integrate into footer

## Code Optimization (Audit)
- [x] Remove 11 unused LOGO_ and HERO_BG constants from Home.tsx
- [x] Remove unused StatBar component (defined but never rendered)
- [x] Remove unused featuredPublications constant
- [x] Remove unused bgOverlay prop from SectionWrapper
- [x] Remove unused outletShort field from all newsItems data
- [x] Remove unused icon field from all career data entries
- [x] Replace React namespace imports with named imports (ReactNode, CSSProperties, etc.)
- [x] Remove unused CSS classes from index.css
- [x] Remove unused fadeInUp @keyframes from index.css
- [x] Delete unused ComponentShowcase.tsx page file
- [x] Optimize Google Fonts URL: remove unused font variants

## Styling Refinements
- [x] Make Research Areas tags more subtle (softer bg, lighter border, lighter text weight)
- [x] Make Featured In links more subtle (remove heavy left border, use lighter text, softer bg)

## Visual Enhancements (Batch)
- [x] Gold rule under each section title (h2)
- [x] Active nav indicator (gold underline/dot on current section)
- [x] Staggered hero tile entrance animation
- [x] Parallax depth on hero background texture
- [x] Publication card hover lift (translateY + shadow)
- [x] Drop cap on bio opening paragraph
- [x] Pull-quote styling in Publications cards
- [x] Subtle column rule between bio and headshot in About
- [x] Back-to-top button (fixed, appears after hero)
- [x] Normalise letter-spacing on all all-caps labels to 0.1em

## Full Site Review Fixes
- [x] index.html: title tag still has & (should be "and")
- [x] index.html: add Open Graph and Twitter Card meta tags
- [x] index.html: add canonical URL meta tag
- [ ] Hero subtitle: "USF Global and National Security Institute" is very long — wrap gracefully on mobile
- [x] NavBar: logo/name link on left is an empty anchor (no visible content, no logo)
- [ ] NavBar: active section observer watches "about" but section id is "about" — verify all IDs match
- [ ] VideoSection: Fox News thumbnail uses eager loading — add loading="lazy"
- [x] InTheNewsSection: all news items use transitionDelay in seconds (0.1s * 9 = 0.9s) — cap at 0.4s
- [x] ContactSection: email in error message is jcrotty@american.edu but contact route sends to jamesmcrotty@hotmail.com — make consistent
- [x] ContactSection: contact form has no email field — user can't be replied to
- [x] Footer: copyright only — add LinkedIn link for completeness
- [ ] PDF route: title line truncates "Advisory Board Member" and "Senior Fellow" without full org names
- [x] CSS: .hero-stats class defined but never used (from old StatBar removal)
- [x] CSS: .back-to-top has duplicate rule blocks (lines 211-238 and 374-381) — merge them
- [ ] AboutSection: bio paragraph 3 ends abruptly (line 1060 is empty — missing content)
