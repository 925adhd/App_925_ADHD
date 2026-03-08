import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Apps.css';

export default function Apps() {
  const [searchQuery, setSearchQuery] = useState('');

  const matchesSearch = (name: string, tags?: string) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || (tags || '').toLowerCase().includes(q);
  };

  const sections = [
    {
      id: 'microtasks',
      title: '📍 Real-World Microtasks',
      count: 3,
      bestFor: 'Best for quick errands and short in-person tasks.',
      info: 'Get paid for quick local tasks like taking photos, audits, and mystery shopping. Perfect for combining with errands!',
      apps: [
        { id: 'fieldagent', name: 'Field Agent', rate: '$3–$20/task', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bJvEwgxE41M5YKf5NNUc.png', tags: 'field agent', contextTags: ['Quick Tasks', 'Local', 'Errands'], energy: 'Low–Medium' },
        { id: 'ivueit', name: 'ivueit', rate: '$7–$50/task', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/er56Fd22kM8MbO3mU1Az.png', tags: 'ivueit', contextTags: ['Photos', 'Local', 'Flexible'], energy: 'Low' },
        { id: 'proxypics', name: 'ProxyPics', rate: '$42–$78/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zkc8z9Vsbr0yqMVfYHiK.png', tags: 'proxypics', contextTags: ['Photos', 'Property', 'Local'], energy: 'Low' },
      ],
    },
    {
      id: 'delivery',
      title: '🚗 Delivery Services',
      count: 5,
      bestFor: 'Best for people who like driving and flexible schedules.',
      info: 'Drive on your own schedule. Great for ADHD brains that need movement and variety!',
      apps: [
        { id: 'doordash', name: 'DoorDash', rate: '$10–$25/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/gX3qkpfWt1KW1Voi4Nfl.png', tags: 'doordash', contextTags: ['Flexible', 'Tips', 'Driving'], energy: 'Medium' },
        { id: 'instacart', name: 'Instacart', rate: '$18–$23/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/3GFZJ6HCfDr2O27WKzSb.png', tags: 'instacart', contextTags: ['Groceries', 'Flexible', 'Shopping'], energy: 'Medium' },
        { id: 'amazonflex', name: 'Amazon Flex', rate: '$19–$25/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mZvl7S4O63tkqCfwYh7b.png', tags: 'amazon flex', contextTags: ['Packages', 'Scheduled', 'Driving'], energy: 'Medium–High' },
        { id: 'sparkdriver', name: 'Spark Driver', rate: '$15–$25/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/KRzWH9SN42Im32S7MV5b.png', tags: 'spark driver walmart', contextTags: ['Walmart', 'Flexible', 'Driving'], energy: 'Medium' },
        { id: 'ubereats', name: 'Uber Eats', rate: '$15–$25/hr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mTdTqcZhnOuJB5FcChLb.png', tags: 'uber eats rideshare', contextTags: ['Food', 'Flexible', 'Driving'], energy: 'Medium' },
      ],
    },
    {
      id: 'rewards',
      title: '🎮 Reward Apps',
      count: 4,
      bestFor: 'Best for earning passively while gaming or browsing.',
      info: '🚫 Pro tip: Don\'t download random apps from ads inside these—they\'re usually paid placements!',
      apps: [
        { id: 'modeearn', name: 'Mode Earn', rate: '$5–$30/week (free app)', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/x2dOwyvRkTLnqbXD6fee.jpg', tags: 'mode earn', contextTags: ['Passive', 'Games', 'Music'], energy: 'Very Low' },
        { id: 'justplay', name: 'JustPlay', rate: '$1–$5/day', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/HGRph2COAlLKrmVczKxH.jpg', tags: 'justplay', contextTags: ['Games', 'PayPal', 'Passive'], energy: 'Very Low' },
        { id: 'mistplay', name: 'MistPlay', rate: '$1–$5/week', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rCXLcdy5K4EBVE2fQPdW.jpg', tags: 'mistplay', contextTags: ['Mobile Games', 'Gift Cards', 'Android'], energy: 'Very Low' },
        { id: 'freecash', name: 'Freecash', rate: '$1–$10/day', logo: 'images/freecash.png', tags: 'freecash', contextTags: ['Surveys', 'Offers', 'Cash'], energy: 'Low' },
      ],
    },
    {
      id: 'cashback',
      title: '🧾 Cashback & Receipts',
      count: 6,
      bestFor: 'Best for shoppers who want money back on everyday spending.',
      info: 'Stack these together! Scan one receipt with multiple apps to maximize rewards.',
      apps: [
        { id: 'fetch', name: 'Fetch Rewards', rate: '$20–$50/yr', logo: 'https://play-lh.googleusercontent.com/E0T0M0dd9w6v7X9_CFaaxlaFjyrGxSLGKxks9NWuAkcQoVckHsGnA_F50SzRSSoMlzs=w240-h480-rw', tags: 'fetch rewards', contextTags: ['Receipts', 'Points', 'Passive'], energy: 'Very Low' },
        { id: 'ibotta', name: 'Ibotta', rate: '$100–$300/yr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bY1HhCITQgsYsrOOgCGz.png', tags: 'ibotta', contextTags: ['Groceries', 'Cashback', 'Receipts'], energy: 'Very Low' },
        { id: 'rakuten', name: 'Rakuten', rate: '$190–$300/yr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/YAoQtLxBaX1cdRNsICoB.jpg', tags: 'rakuten ebates', contextTags: ['Shopping', 'Cashback', 'Online'], energy: 'Very Low' },
        { id: 'swagbucks', name: 'Swagbucks', rate: '$100–$1,200/yr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kV1Ic0B8nEXPNSAGTtA6.png', tags: 'swagbucks', contextTags: ['Surveys', 'Shopping', 'Videos'], energy: 'Low' },
        { id: 'benjamin', name: 'Benjamin', rate: '$200–$800/yr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/0hWbGOHwB4EZpe2zuThK.jpg', tags: 'benjamin', contextTags: ['Games', 'Shopping', 'Surveys'], energy: 'Low' },
        { id: 'pogo', name: 'Pogo', rate: '$25–$125/yr', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6vibzs1oxfjhXTaySH0N.jpg', tags: 'pogo joinpogo', contextTags: ['Auto-Cashback', 'Cards', 'Passive'], energy: 'Very Low' },
      ],
    },
    {
      id: 'passive',
      title: '📡 Bandwidth Sharing',
      count: 1,
      bestFor: 'Best for earning in the background with zero active effort.',
      info: '⚠️ These won\'t make you rich—expect pennies to a few bucks. But they run in the background with zero effort!',
      apps: [
        { id: 'honeygain', name: 'Honeygain', rate: '$5–$10/mo', logo: 'https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/XFzVcPA2ZQRwdAl1iyVM.png', tags: 'honeygain', contextTags: ['Passive', 'Background', 'WiFi'], energy: 'None' },
      ],
    },
    {
      id: 'movement',
      title: '🏃 Movement',
      count: 1,
      bestFor: 'Best for people who want to get paid just for moving.',
      info: 'Walk, move, and earn — apps that reward physical activity.',
      apps: [
        { id: 'weward', name: 'Weward', rate: '$5–$15/mo', logo: 'images/weward.png', tags: 'weward walking fitness', contextTags: ['Walking', 'Fitness', 'Outdoor'], energy: 'Low–Medium' },
      ],
    },
  ];

  return (
    <div className="apps-page">
      <div className="main-content">
        <div className="page-header-row">
          <p className="updated-badge">Updated January 2026</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            id="mainSearch"
            placeholder="Search delivery, surveys, tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {sections.map(section => {
          const visibleApps = section.apps.filter(a => matchesSearch(a.name, a.tags));
          if (visibleApps.length === 0) return null;
          return (
            <section key={section.id} className="section" data-category={section.id}>
              <div className="section-header">
                <div className="header-left">
                  <h2 className="section-title">{section.title}</h2>
                  <span className="section-count">{visibleApps.length} app{visibleApps.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <p className="section-best-for">{section.bestFor}</p>
              <div className="info-card">{section.info}</div>
              <div className="apps-grid">
                {visibleApps.map(app => (
                  <Link key={app.id} to={`/app-detail?app=${app.id}`} className="app-card" data-name={app.tags}>
                    <div className="app-logo-container">
                      <img src={app.logo} alt={app.name} className="app-logo" />
                    </div>
                    <h3 className="app-name">{app.name}</h3>
                    <p className="app-rate">{app.rate}</p>
                    <div className="app-context-tags">
                      {app.contextTags.map(tag => (
                        <span key={tag} className="app-tag">{tag}</span>
                      ))}
                    </div>
                    <p className="app-energy">⚡ {app.energy}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {sections.every(s => s.apps.filter(a => matchesSearch(a.name, a.tags)).length === 0) && (
          <div className="no-results">
            <div className="emoji">🔍</div>
            <p>No apps found. Try a different search!</p>
          </div>
        )}
      </div>
    </div>
  );
}
