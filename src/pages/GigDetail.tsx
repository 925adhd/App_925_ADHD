import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gigData } from '../data/gigData';
import '../styles/pages/GigDetail.css';

const FALLBACK_SVG = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%232a2a2a%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23888%22 font-size=%2240%22>💼</text></svg>";

const imageMap: Record<string, string> = {
  respondentio: 'respondent.png',
  pineconeresearch: 'pinecone.png',
  prestoshopper: 'presto.jpg',
  timeetc: 'timeect.png',
  fancyhands: 'fancy hand.jpg',
  belaysolutions: 'belay.png',
  freelancer: 'freelancer.png',
  carecom: 'care.jpg',
  chewy: 'Chewy.png',
  cloudresearchconnect: 'cloudresearch.webp',
  'big-cartel': 'bigcartel.png',
};

/** Parse TL;DR markdown into snap blocks: [{label, text}].
 *  Skips pay-focused labels — the hero rate and Payout Info table cover that. */
function parseTldrSnaps(tldr: string): { label: string; text: string }[] {
  const skipLabels = new Set(['the pay', 'what you earn']);
  const blocks: { label: string; text: string }[] = [];

  const regex = /\*\*([^*]+?):\*\*\s*([\s\S]*?)(?=\*\*[^*]+?:\*\*|$)/g;
  let match;
  while ((match = regex.exec(tldr)) !== null) {
    const label = match[1].trim();
    if (skipLabels.has(label.toLowerCase())) continue;
    const text = match[2].trim().replace(/<[^>]+>/g, '').replace(/\n/g, ' ');
    blocks.push({ label, text });
  }
  return blocks;
}

export default function GigDetail() {
  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('gig') || '';
  const [isFav, setIsFav] = useState(false);
  const gig = gigId ? gigData[gigId] : null;
  const [imgSrc, setImgSrc] = useState(gig?.logo || `images/${gigId}.png`);
  const [imgAttempt, setImgAttempt] = useState<'logo' | 'png' | 'jpg' | 'webp' | 'fallback'>(gig?.logo ? 'logo' : 'png');

  useEffect(() => {
    const favs: string[] = JSON.parse(localStorage.getItem('925adhd_favorites') || '[]');
    setIsFav(favs.includes(gigId));
    if (gig) {
      document.title = gig.name;
    }
  }, [gigId, gig]);

  const toggleFavorite = () => {
    const favs: string[] = JSON.parse(localStorage.getItem('925adhd_favorites') || '[]');
    let newFavs: string[];
    if (favs.includes(gigId)) {
      newFavs = favs.filter(f => f !== gigId);
    } else {
      newFavs = [...favs, gigId];
    }
    localStorage.setItem('925adhd_favorites', JSON.stringify(newFavs));
    setIsFav(newFavs.includes(gigId));
  };

  const handleImgError = () => {
    if (imgAttempt === 'logo') {
      // External logo failed — try local imageMap or png
      if (imageMap[gigId]) {
        setImgSrc(`images/${imageMap[gigId]}`);
        setImgAttempt('fallback');
      } else {
        setImgSrc(`images/${gigId}.png`);
        setImgAttempt('png');
      }
    } else if (imgAttempt === 'png') {
      if (imageMap[gigId]) {
        setImgSrc(`images/${imageMap[gigId]}`);
        setImgAttempt('fallback');
      } else {
        setImgSrc(`images/${gigId}.jpg`);
        setImgAttempt('jpg');
      }
    } else if (imgAttempt === 'jpg') {
      setImgSrc(`images/${gigId}.webp`);
      setImgAttempt('webp');
    } else {
      setImgSrc(FALLBACK_SVG);
      setImgAttempt('fallback');
    }
  };

  if (!gig) {
    return (
      <div className="gig-detail">
        <div id="mainContent">
          <div className="not-found">
            <h2>Opportunity Not Found</h2>
            <p>We couldn't find details for this opportunity yet.</p>
            <Link to="/earn">← Browse All Opportunities</Link>
          </div>
        </div>
      </div>
    );
  }

  const allIdealFor = (gig.idealFor || []).slice(0, 3);
  const allWhyAdhd = (gig.whyAdhd || []).slice(0, 3);
  const tldrSnaps = gig.tldr ? parseTldrSnaps(gig.tldr) : [];

  return (
    <div className="gig-detail">
      <div id="mainContent">

        {/* === HERO === */}
        <div className="hero">
          <img
            src={imgSrc}
            className="hero-logo"
            alt={gig.name}
            onError={handleImgError}
          />
          <div className="hero-info">
            <div className="hero-title-row">
              <h1>{gig.name}</h1>
              <button
                className="hero-fav-btn"
                onClick={toggleFavorite}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFav ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="hero-rate">{gig.rate}</div>
            <div className="hero-desc">{gig.description}</div>
            {gig.tags?.length > 0 && (
              <div className="hero-tags">
                {gig.tags.includes('favorite') && <span className="hero-tag favorite">🥰 Favorite</span>}
                {gig.tags.includes('passive') && <span className="hero-tag passive">😴 Passive</span>}
                {gig.tags.includes('gift') && <span className="hero-tag gift">🎁 Gift Cards</span>}
                {gig.tags.includes('fitness') && <span className="hero-tag fitness">🏃 Fitness</span>}
                {gig.tags.includes('delivery') && <span className="hero-tag delivery">🚗 Delivery</span>}
                {gig.tags.includes('microgig') && <span className="hero-tag microgig">⚡ Microgig</span>}
              </div>
            )}
            <a
              href={gig.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-top"
            >
              Try this now →
            </a>
          </div>
        </div>

        {/* === SNAP BLOCKS (TL;DR) === */}
        {tldrSnaps.length > 0 && (
          <div className="snap-section">
            <div className="snap-header">Quick Breakdown</div>
            <div className="snap-grid">
              {tldrSnaps.map((snap, i) => (
                <div key={i} className="snap-block">
                  <div className="snap-label">{snap.label}</div>
                  <div className="snap-text">{snap.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === FILTER ROW: persona + ADHD reasons (side-by-side on desktop) === */}
        <div className="filter-row">
          {/* === BEST FOR YOU IF… === */}
          {allIdealFor.length > 0 && (
            <div className="best-for-block">
              <div className="best-for-title">Best for you if…</div>
              {allIdealFor.map((item: string, i: number) => (
                <div key={i} className="best-for-row">{item}</div>
              ))}
              <a
                href={gig.link}
                target="_blank"
                rel="noopener noreferrer"
                className="best-for-cta"
              >
                Sign up →
              </a>
            </div>
          )}

          {/* === ADHD-Friendly === */}
          {allWhyAdhd.length > 0 && (
            <div className="section section-alt">
              <div className="section-header">
                <div className="section-icon adhd">🧠</div>
                <h2 className="section-title">Why It's ADHD-Friendly</h2>
              </div>
              <div className="section-content card-grid">
                {allWhyAdhd.map((item: string, i: number) => (
                  <div key={i} className="info-card">
                    <span className="info-card-text" dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === Payout Info === */}
        {gig.payout && Object.keys(gig.payout).length > 0 && (
          <div className="section">
            <div className="section-header">
              <div className="section-icon payout">💸</div>
              <h2 className="section-title">Payout Info</h2>
            </div>
            <div className="section-content">
              <dl className="payout-grid">
                {Object.entries(gig.payout as Record<string, string>).map(([key, value]) => (
                  <div key={key} className="payout-row">
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* === Pros / Cons side-by-side === */}
        {(gig.pros?.length > 0 || gig.cons?.length > 0) && (
          <div className="section">
            <div className="pros-cons-grid">
              {gig.pros?.length > 0 && (
                <div className="pros-card">
                  <div className="pros-cons-header">
                    <span className="pros-cons-icon">👍</span>
                    <h3>Pros</h3>
                  </div>
                  <ul>
                    {gig.pros.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {gig.cons?.length > 0 && (
                <div className="cons-card">
                  <div className="pros-cons-header">
                    <span className="pros-cons-icon">⚠️</span>
                    <h3>Cons</h3>
                  </div>
                  <ul>
                    {gig.cons.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === Final Take === */}
        {gig.finalTake && (
          <div className="section section-alt">
            <div className="section-header">
              <div className="section-icon verdict">🔥</div>
              <h2 className="section-title">Final Take</h2>
            </div>
            <div
              className="section-content final-take-content"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(gig.finalTake) }}
            />
          </div>
        )}

        {/* === FINAL CTA === */}
        <div id="ctaSection" className="cta-section">
          <p className="final-cta-headline">Start earning with {gig.name}</p>
          <a href={gig.link} target="_blank" rel="noopener noreferrer" className="cta-btn">
            Try this opportunity →
          </a>
        </div>
      </div>
    </div>
  );
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}
