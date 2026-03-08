import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/pages/AppDetail.css';

interface AppData {
  name: string;
  rate: string;
  logo: string;
  link: string;
  tags: string[];
  intro: string;
  adhd?: string[];
  howItWorks?: string[];
  importantNotes?: string[];
  payout?: Record<string, string>;
  activities?: string[];
  redditQuotes?: { text: string; user: string }[];
  pros?: string[];
  cons?: string[];
  finalTake?: string;
  idealFor?: string[];
  bottomLine?: string;
}

const apps: Record<string, AppData> = {
  "fieldagent": {
    name: "Field Agent", rate: "$3–$20 per task",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bJvEwgxE41M5YKf5NNUc.png",
    link: "https://app.fieldagent.net/",
    tags: ["favorite", "microgig"],
    intro: "Field Agent is a microtask app that pays you cash to complete small in-person jobs—like price checks, shelf audits, mystery shops, and product trials—while you're already out running errands.",
    adhd: ["Tasks are <strong>short and varied</strong>—from simple audits to \"buy & try\" opportunities.", "No fixed schedule—<strong>work when it suits you</strong>.", "Quick wins and immediate payouts provide <strong>motivation boosts</strong>."],
    howItWorks: ["<strong>Download the app</strong> and complete your profile.", "<strong>Browse local tasks</strong>, filtering by proximity or payout.", "<strong>Reserve a job</strong>, complete it (photo, purchase, survey, etc.).", "<strong>Submit and get paid via direct deposit/PayPal</strong> once approved."],
    importantNotes: ["Typical tasks pay <strong>$2–$12</strong>, occasionally up to <strong>$20+</strong>.", "You often have about <strong>2 hours</strong> to complete a reserved job.", "Task availability varies—more jobs in urban areas.", "Requires <strong>careful attention</strong>—mistakes lead to rejections."],
    payout: { "Payout method": "Direct deposit or PayPal", "Typical pay": "$2–$12 per task, up to $20+", "Processing time": "1–3 days post-approval", "Minimum withdrawal": "None—cash out anytime" },
    activities: ["<strong>Audits</strong>: Take store photos and price-checks.", "<strong>Buy & Try</strong>: Purchase a product then give feedback.", "<strong>Mystery Shopping</strong>: Report on store service.", "<strong>Scavenger Hunts</strong>: UPC-based searches."],
    pros: ["Real money via direct deposit/PayPal", "Works while running errands", "Multiple job types keep it interesting", "Good app reviews (4.5★+)"],
    cons: ["Inconsistent opportunities depending on location", "Strict task instructions; rejections hurt your accuracy", "Gas and time may outweigh earnings for distant tasks"],
    finalTake: "Field Agent is legit and fairly well-reviewed. It's ideal for <strong>casual side income</strong>—especially if you're already out shopping.",
    idealFor: ["Urban users with easy access to chain stores", "People who like gamifying errands into paid missions", "ADHD folks who appreciate quick tasks with immediate rewards"],
    bottomLine: "If Field Agent is the \"real-world cousin\" of mystery shopping apps, it's a dopamine-hit mini side hustle—snap photos, shop, earn cash—all in your comfy jeans."
  },
  "ivueit": {
    name: "ivueit", rate: "$7–$50 per task",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/er56Fd22kM8MbO3mU1Az.png",
    link: "https://ivueit.com/become-a-vuer",
    tags: ["microgig"],
    intro: "iVueit is a platform that pays you to take photos of businesses, properties, and displays for brands and property managers.",
    adhd: ["<strong>Clear, structured missions</strong> — step-by-step photo checklists reduce confusion.", "<strong>Short tasks</strong> — most take only 5–20 minutes.", "<strong>Flexible schedule</strong> — accept or skip opportunities based on your energy level."],
    howItWorks: ["Download the <strong>iVueit app</strong> and create an account.", "Browse available \"Vues\" in your local area.", "Claim a Vue, travel to the location, and follow the photo checklist.", "Get paid once your Vue is approved."],
    importantNotes: ["<strong>U.S. only</strong> — not available internationally.", "<strong>Travel required</strong>.", "<strong>Limited availability</strong> outside major cities."],
    payout: { "Payout method": "PayPal", "Typical pay": "$5–$20 per Vue", "Higher-paying assignments": "$50+ for complex assignments" },
    pros: ["Clear, structured instructions reduce overwhelm", "Short tasks perfect for ADHD bursts", "Flexible—accept only what you want"],
    cons: ["U.S. only", "Requires transportation", "Limited availability outside metro areas"],
    finalTake: "iVueit is perfect for ADHD-friendly side hustlers who like <strong>short, structured, on-the-go opportunities</strong>.",
    bottomLine: "If Streetbees is about micro-surveys from your couch, iVueit is about real-world photo tasks that get you outside and moving."
  },
  "proxypics": {
    name: "ProxyPics", rate: "$42–$78/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zkc8z9Vsbr0yqMVfYHiK.png",
    link: "https://ppcrowdsource.app.link/",
    tags: ["microgig"],
    intro: "ProxyPics is a gig app where companies pay you to take on-demand photos of real-world locations, properties, and businesses.",
    adhd: ["<strong>Clear instructions</strong> — every task has a photo checklist.", "<strong>Short, simple jobs</strong> — most tasks take 5–15 minutes.", "<strong>Flexible schedule</strong> — pick only the gigs you want."],
    payout: { "Payout method": "Direct deposit or PayPal", "Typical pay": "$5–$20 per task", "Higher-paying gigs": "$30–$50+ for property verification" },
    pros: ["Quick tasks with fast payouts", "Clear checklists reduce confusion", "Flexible—work when you want"],
    cons: ["U.S.-focused only", "Requires transportation", "Limited volume of opportunities"],
    bottomLine: "If iVueit is about structured retail and property audits, ProxyPics is about on-demand photography for people who need eyes on the ground."
  },
  "doordash": {
    name: "DoorDash", rate: "$10–$25/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/gX3qkpfWt1KW1Voi4Nfl.png",
    link: "https://dasher.doordash.com/en-us",
    tags: ["delivery"],
    intro: "DoorDash is a popular gig economy app that pays drivers (\"Dashers\") to deliver food and groceries from local restaurants and stores straight to customers' doors.",
    adhd: ["<strong>Flexible hours</strong> let you dash when you want—no fixed shifts.", "<strong>Variety of tasks</strong>—picking up, driving, delivering—keeps it engaging.", "<strong>Quick payouts and frequent tips</strong> provide motivation boosts."],
    payout: { "Base pay": "$3–$10 per delivery, plus 100% of tips", "Average earnings": "$10–$25/hr after expenses", "Payment options": "Weekly direct deposit or instant cashout" },
    pros: ["Flexible schedule—work whenever you want", "Easy to start, no special skills needed", "Fast payments with tip income"],
    cons: ["Vehicle wear and fuel costs reduce net earnings", "Inconsistent order flow in less busy areas", "Occasional app glitches"],
    bottomLine: "DoorDash is a legit, flexible side hustle for people who enjoy driving and want to earn money on their own time."
  },
  "instacart": {
    name: "Instacart", rate: "$18–$23/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/3GFZJ6HCfDr2O27WKzSb.png",
    link: "https://shoppers.instacart.com/role/full-service",
    tags: ["delivery"],
    intro: "Instacart is a grocery delivery platform where shoppers pick up and deliver groceries for customers.",
    adhd: ["<strong>Active, on-the-go work</strong>—no sitting still for hours.", "<strong>Structured system</strong>—the app tells you exactly what to shop for.", "<strong>Flexible hours</strong>—you log in and work when you want."],
    payout: { "Payout method": "Direct deposit weekly", "Typical earnings": "$10–$25/hour depending on demand and tips" },
    pros: ["Active work keeps you moving", "Structured app guides every step", "Flexible schedule"],
    cons: ["Physically demanding", "Earnings depend heavily on tips", "Slow during off-peak hours"],
    bottomLine: "If Uber Eats is about quick food deliveries, Instacart is about bigger shopping trips with higher earning potential from tips."
  },
  "modeearn": {
    name: "Mode Earn", rate: "$5–$30/week (free app)",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/x2dOwyvRkTLnqbXD6fee.jpg",
    link: "https://play.google.com/store/apps/details?id=us.current.android",
    tags: ["passive"],
    intro: "Mode Mobile is a blend of tech, advertising, and passive income. You get paid for everyday phone use—charging your phone, listening to music, playing games, and more.",
    adhd: ["You earn just for existing with your phone", "16+ earning activities = lots of variety = low boredom risk", "Passive background tasks = no memory load"],
    payout: { "Casual users": "$2–$10/week", "Regular users": "$15–$30/week", "Cashout minimum": "$0.10", "Payout methods": "PayPal, Amazon, Target, Walmart gift cards" },
    pros: ["$15–$30/week realistic on free version", "Many ways to earn", "Very low cashout threshold ($0.10)"],
    cons: ["Android only—no iOS support", "Requires a lot of permissions", "May drain battery"],
    bottomLine: "Mode Mobile pays you to live your regular phone life—but only in pennies. For an ADHD brain, it might be worth it for the fun of watching your screen time turn into spare change."
  },
  "mistplay": {
    name: "MistPlay", rate: "$1–$5/week",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rCXLcdy5K4EBVE2fQPdW.jpg",
    link: "https://play.google.com/store/apps/details?id=com.mistplay.mistplay",
    tags: ["rewards"],
    intro: "Mistplay is a long-standing 'get paid to play' app where you earn units by playing recommended mobile games and redeem them for gift cards.",
    adhd: ["Rotating game suggestions help prevent boredom", "Simple reward loops = clear goalposts", "No timers or pressure — play at your own pace"],
    payout: { "Light users": "$1–$3/week", "Dedicated users": "$5–$10/week" },
    pros: ["Legit app with a long track record", "No surveys or weird tasks—just games"],
    cons: ["Slow earnings", "Gift-card-only payouts", "Android-only availability"],
    bottomLine: "If you play mobile games anyway, Mistplay makes that time pay off — slowly but reliably."
  },
  "fetch": {
    name: "Fetch Rewards", rate: "$20–$50/year",
    logo: "https://play-lh.googleusercontent.com/E0T0M0dd9w6v7X9_CFaaxlaFjyrGxSLGKxks9NWuAkcQoVckHsGnA_F50SzRSSoMlzs=w240-h480-rw",
    link: "https://fetchrewards.com/",
    tags: ["favorite", "gift"],
    intro: "Fetch Rewards is one of the easiest receipt-scanning apps out there. Just snap a pic of any receipt and earn points toward gift cards.",
    adhd: ["<strong>Super simple</strong>—just scan any receipt, no matching required.", "<strong>Instant gratification</strong>—see points add up immediately.", "<strong>Gamified</strong>—streaks and bonuses keep you coming back."],
    payout: { "Payout method": "Gift cards only", "Minimum redemption": "3,000 points ($3)", "Typical earnings": "$5–$25/month for regular users" },
    pros: ["Easiest receipt app—any receipt works", "No product matching needed", "Gamified with streaks and bonuses"],
    cons: ["Gift cards only, no cash", "Points accumulate slowly for non-grocery receipts"],
    bottomLine: "If you want the absolute lowest-effort receipt app, Fetch is it. Scan anything, earn points, get gift cards."
  },
  "ibotta": {
    name: "Ibotta", rate: "$100–$300/year",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bY1HhCITQgsYsrOOgCGz.png",
    link: "https://home.ibotta.com/",
    tags: ["favorite"],
    intro: "Ibotta is a long-standing cashback app that pays you real money—not points—for your grocery hauls, online orders, and more.",
    adhd: ["You don't need to chase down codes—just click + on an offer", "The <strong>dopamine hit</strong> of watching savings add up is real", "<strong>Small, repeatable routines</strong>: shop → scan → save"],
    payout: { "Payout method": "PayPal, gift cards, or direct deposit", "Minimum withdrawal": "$20", "Typical earnings": "~$261/year for average users" },
    pros: ["Real cash, not confusing point systems", "Works for everyday shopping", "Easy to use with visual cues"],
    cons: ["Can be tedious if you forget to select offers before shopping", "Need to hit $20 before withdrawing"],
    bottomLine: "With Ibotta, your ADHD grocery runs finally get to pay you back."
  },
  "rakuten": {
    name: "Rakuten", rate: "$190–$300/year",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/YAoQtLxBaX1cdRNsICoB.jpg",
    link: "https://www.rakuten.com/",
    tags: ["favorite"],
    intro: "Rakuten (formerly Ebates) is one of the biggest cashback platforms online. Shop at thousands of stores and automatically earn cash back.",
    adhd: ["<strong>Install the browser extension</strong> and forget it—it activates automatically.", "Cash back happens in the background.", "Quarterly 'Big Fat Checks' feel like a surprise windfall."],
    payout: { "Cashback rate": "1%–40% depending on store", "Payout frequency": "Quarterly via PayPal or check", "Sign-up bonus": "$30 after first $30 purchase" },
    pros: ["Works automatically with browser extension", "Wide store coverage", "Real cash payouts"],
    cons: ["Only quarterly payouts", "Doesn't work in physical stores"],
    bottomLine: "Rakuten is the easiest set-and-forget cashback platform for online shopping."
  },
  "swagbucks": {
    name: "Swagbucks", rate: "$100–$1,200/year",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kV1Ic0B8nEXPNSAGTtA6.png",
    link: "https://www.swagbucks.com/",
    tags: [],
    intro: "Swagbucks is one of the OG online rewards platforms. Earn SB points for surveys, watching videos, shopping online, searching the web, and more.",
    adhd: ["Multiple ways to earn = always something to do when bored", "Daily goals and streaks provide structure", "Visual progress tracking"],
    payout: { "Payout method": "PayPal cash or gift cards", "Minimum withdrawal": "$3 (for gift cards)", "Points to dollar": "100 SB = $1" },
    pros: ["Many ways to earn", "Low minimum redemption", "Trustworthy platform since 2008"],
    cons: ["Many tasks pay very little", "Survey disqualifications are frustrating"],
    bottomLine: "Swagbucks is the Swiss Army knife of rewards apps—useful, but no single tool is the sharpest."
  },
  "benjamin": {
    name: "Benjamin", rate: "$200–$800/year",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/0hWbGOHwB4EZpe2zuThK.jpg",
    link: "https://www.benjamin.co/",
    tags: [],
    intro: "Benjamin is a rewards app that pays you through games, shopping, and short surveys. It's designed for quick bursts of earning throughout the day.",
    adhd: ["Short, varied activities = no single boring grind", "Multiple daily earning modes", "Quick satisfaction from completing mini-tasks"],
    payout: { "Payout method": "PayPal or gift cards", "Typical earnings": "$200–$800/year with regular use" },
    pros: ["Varied earning opportunities", "Fun mini-game elements", "Real PayPal cashouts"],
    cons: ["Earnings can be inconsistent", "Requires regular engagement"],
    bottomLine: "Benjamin is a versatile rewards app that turns everyday phone habits into real cash."
  },
  "pogo": {
    name: "Pogo", rate: "$25–$125/year",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6vibzs1oxfjhXTaySH0N.jpg",
    link: "https://www.joinpogo.com/",
    tags: [],
    intro: "Pogo automatically earns cashback from your linked debit and credit cards when you shop at participating stores.",
    adhd: ["<strong>100% automatic</strong>—no receipts, no apps to open", "Works in the background while you shop normally", "Surprise cashback deposited automatically"],
    payout: { "Payout method": "Direct deposit", "Cashback rate": "Varies by store", "Setup time": "~5 minutes" },
    pros: ["Fully automatic—zero effort after setup", "Works with cards you already use", "No minimum to cash out"],
    cons: ["Limited store coverage", "Small cashback amounts"],
    bottomLine: "Pogo is the ultimate passive cashback—link your card once, earn forever."
  },
  "honeygain": {
    name: "Honeygain", rate: "$5–$10/mo",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/XFzVcPA2ZQRwdAl1iyVM.png",
    link: "https://honeygain.com/",
    tags: ["passive"],
    intro: "Honeygain is a passive income app that pays you for sharing your unused internet bandwidth. Once installed, it quietly runs in the background.",
    adhd: ["Completely <strong>passive</strong>—set it and forget it", "Daily task bonus = <strong>small dopamine hit</strong>", "No schedules, no tracking—just install and let it run"],
    payout: { "Rate": "$0.10 per GB shared", "Minimum payout": "$20 via PayPal or crypto", "Sign-up bonus": "Free $2" },
    pros: ["Truly hands-off once installed", "Safe: traffic is encrypted and vetted", "Free $2 sign-up bonus"],
    cons: ["Low earnings unless you have high-speed, unlimited data", "Content Delivery can slow your internet"],
    bottomLine: "Sweet side cash... if you've got the patience for the drip."
  },
  "weward": {
    name: "Weward", rate: "$5–$15/month",
    logo: "images/weward.png",
    link: "https://www.wewardapp.com",
    tags: ["fitness"],
    intro: "Weward is a move-to-earn app that pays you real money for walking. You earn Wards (points) for every 1,000 steps.",
    adhd: ["<strong>Automatic step tracking</strong>—runs passively in the background", "<strong>Daily challenges and games</strong> provide dopamine boosts", "<strong>Real cash payouts</strong> via PayPal offer tangible rewards"],
    payout: { "Payout method": "PayPal or charity donation", "Monthly earnings": "$5-$15 with 10,000 steps/day", "Minimum cashout": "~$20" },
    pros: ["Real cash payouts via PayPal", "Runs passively—no manual input needed", "Daily challenges keep it engaging"],
    cons: ["High minimum cashout (~$20)", "Takes 1-3 months to reach payout", "GPS tracking drains battery"],
    bottomLine: "If Sweatcoin is gamified motivation without real money, Weward is the app that actually pays you cash to walk."
  },
  "freecash": {
    name: "Freecash", rate: "$1–$10/day",
    logo: "images/freecash.png",
    link: "https://freecash.com/",
    tags: [],
    intro: "Freecash is a rewards platform where you earn coins by completing surveys, playing games, and doing offers. Coins convert to cash via PayPal or crypto.",
    adhd: ["Wide variety of tasks keeps things interesting", "Clear progress bars and milestones", "Flexible—do as much or as little as you want"],
    payout: { "Minimum cashout": "$5 for crypto, $20 for PayPal", "Payout speed": "Within 24 hours typically" },
    pros: ["Fast payouts compared to other platforms", "Wide task variety", "Real PayPal cash"],
    cons: ["Some offers can be misleading", "Survey disqualifications happen"],
    bottomLine: "Freecash is one of the faster-paying reward sites if you're willing to try various offers."
  },
  "amazonflex": {
    name: "Amazon Flex", rate: "$19–$25/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mZvl7S4O63tkqCfwYh7b.png",
    link: "https://flex.amazon.com/",
    tags: ["delivery"],
    intro: "Amazon Flex lets you deliver Amazon packages in your own vehicle. You choose your own schedule by picking up 2-8 hour delivery blocks.",
    adhd: ["<strong>Choose your own blocks</strong>—work when it fits your mood", "<strong>Clear route optimization</strong> via the app", "<strong>Guaranteed hourly rate</strong>—know what you'll earn before you start"],
    payout: { "Hourly rate": "$19–$25/hr (guaranteed)", "Extras": "Tips for Whole Foods and Amazon Fresh orders", "Payment": "Direct deposit twice weekly" },
    pros: ["Guaranteed hourly rate (not per-delivery)", "Flexible scheduling", "Steady work in most metro areas"],
    cons: ["Competitive block grabbing", "Need reliable vehicle", "Occasional app issues"],
    bottomLine: "Amazon Flex offers the predictability of an hourly rate with the flexibility of gig work."
  },
  "sparkdriver": {
    name: "Spark Driver", rate: "$15–$25/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/KRzWH9SN42Im32S7MV5b.png",
    link: "https://www.walmart.com/cp/spark-driver/1231928",
    tags: ["delivery"],
    intro: "Spark Driver is Walmart's gig delivery program. You deliver Walmart curbside pickup orders and grocery deliveries.",
    adhd: ["<strong>Choose your trips</strong>—accept or decline any offer", "<strong>Structured orders</strong>—Walmart packs the groceries, you deliver", "Predictable work in suburban areas with lots of Walmart locations"],
    payout: { "Base pay": "Varies by order size and distance", "Tips": "100% kept by driver", "Payment": "Weekly direct deposit or instant pay" },
    pros: ["Less competitive than DoorDash/Uber", "Good suburban opportunity", "Keep 100% of tips"],
    cons: ["Limited to Walmart orders only", "Pay varies significantly by order"],
    bottomLine: "Spark Driver is a solid alternative to food delivery with less competition and steady suburban demand."
  },
  "ubereats": {
    name: "Uber Eats", rate: "$15–$25/hr",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mTdTqcZhnOuJB5FcChLb.png",
    link: "https://www.uber.com/us/en/drive/delivery/",
    tags: ["delivery"],
    intro: "Uber Eats lets you deliver food from restaurants to customers in your city, on your own schedule.",
    adhd: ["<strong>Ultimate flexibility</strong>—log on and log off whenever you want", "<strong>Clear navigation</strong>—the app guides every delivery", "<strong>Instant pay option</strong>—cash out any time"],
    payout: { "Base pay": "Per delivery + 100% of tips", "Instant cashout": "Available for $0.50 fee", "Surge pricing": "Higher earnings during busy times" },
    pros: ["Very flexible—no minimum hours", "Works in most cities", "Instant cashout option"],
    cons: ["Earnings vary widely", "Vehicle expenses eat into profit"],
    bottomLine: "Uber Eats is the most flexible delivery gig—work whenever the mood strikes."
  },
  "justplay": {
    name: "JustPlay", rate: "$1–$5/day",
    logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/HGRph2COAlLKrmVczKxH.jpg",
    link: "https://justplay.com/",
    tags: [],
    intro: "JustPlay pays you to play games on your phone. You earn in-app currency by playing, which converts to real PayPal cash.",
    adhd: ["Simple game loop provides clear dopamine hits", "No complex strategies—just play and earn", "Daily rewards keep you coming back"],
    payout: { "Payout method": "PayPal", "Typical earnings": "$1–$5/day with regular play", "Minimum cashout": "Low threshold for quick rewards" },
    pros: ["Real PayPal payouts", "Simple concept", "Daily bonus rewards"],
    cons: ["Time-intensive for small rewards", "Not available on all devices"],
    bottomLine: "JustPlay is a fun way to earn a few bucks if you're already a mobile gamer."
  },
};

export default function AppDetail() {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get('app') || '';
  const app = apps[appId];

  if (!app) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
        <h2 style={{ marginBottom: '12px' }}>App Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>We couldn't find details for this app.</p>
        <Link to="/apps" style={{ display: 'inline-block', background: 'var(--brand)', color: '#0F0F0F', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>Browse All Apps</Link>
      </div>
    );
  }

  const tagsHtml: React.ReactElement[] = [];
  if (app.tags?.includes('favorite')) tagsHtml.push(<span key="fav" className="tag favorite">🥰 Favorite</span>);
  if (app.tags?.includes('gift')) tagsHtml.push(<span key="gift" className="tag gift">🎁 Gift Cards</span>);
  if (app.tags?.includes('passive')) tagsHtml.push(<span key="passive" className="tag passive">😴 Passive</span>);
  if (app.tags?.includes('fitness')) tagsHtml.push(<span key="fit" className="tag fitness">🏃 Fitness</span>);

  return (
    <div className="app-detail">
      <div className="main-content" id="content">
        <div className="app-hero">
          <img
            src={app.logo}
            alt={app.name}
            className="app-logo"
            onError={e => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/80/1a1a1a/5BBFB5?text=${encodeURIComponent(app.name.charAt(0))}`; }}
          />
          <h1 className="app-name">{app.name}</h1>
          <p className="app-rate">{app.rate}</p>
          <div className="app-tags">{tagsHtml}</div>
          {app.link && <a href={app.link} target="_blank" rel="noopener noreferrer" className="visit-btn">Visit App →</a>}
        </div>

        <p className="intro-text">{app.intro}</p>

        {app.adhd && (
          <section className="section">
            <h2 className="section-title">🧠 Why It's ADHD-Friendly</h2>
            <ul>{app.adhd.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
          </section>
        )}

        {app.howItWorks && (
          <section className="section">
            <h2 className="section-title">💡 How It Works</h2>
            <ol>{app.howItWorks.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ol>
          </section>
        )}

        {app.importantNotes && (
          <section className="section">
            <h2 className="section-title">🚩 Important Notes</h2>
            <ul>{app.importantNotes.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
          </section>
        )}

        {app.payout && (
          <section className="section">
            <h2 className="section-title">💸 Payout Info</h2>
            <table className="payout-table">
              <tbody>
                {Object.entries(app.payout).map(([key, value]) => (
                  <tr key={key}><td>{key}</td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {app.activities && (
          <section className="section">
            <h2 className="section-title">🔍 Types of Activities</h2>
            <ul>{app.activities.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
          </section>
        )}

        {(app.pros || app.cons) && (
          <div className="pros-cons">
            {app.pros && (
              <div className="pros">
                <h3 className="section-title">👍 Pros</h3>
                <ul>{app.pros.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            )}
            {app.cons && (
              <div className="cons">
                <h3 className="section-title">⚠️ Cons</h3>
                <ul>{app.cons.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            )}
          </div>
        )}

        {app.finalTake && (
          <section className="section final-take">
            <h2 className="section-title">🔥 Final Take</h2>
            <p dangerouslySetInnerHTML={{ __html: app.finalTake }} />
          </section>
        )}

        {app.idealFor && (
          <section className="section ideal-for">
            <h2 className="section-title">✅ Ideal For</h2>
            <ul>{app.idealFor.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
          </section>
        )}

        {app.bottomLine && (
          <div className="quote-box" dangerouslySetInnerHTML={{ __html: app.bottomLine }} />
        )}
      </div>
    </div>
  );
}
