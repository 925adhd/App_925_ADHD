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
  freelancer: 'freelanmcer.png',
  carecom: 'care.jpg',
  chewy: 'chewy.png',
  cloudresearchconnect: 'cloudresearch.webp',
};

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

export default function GigDetail() {
  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('gig') || '';
  const [isFav, setIsFav] = useState(false);
  const [imgSrc, setImgSrc] = useState(`images/${gigId}.png`);
  const [imgAttempt, setImgAttempt] = useState<'png' | 'jpg' | 'webp' | 'fallback'>('png');

  const gig = gigId ? gigData[gigId] : null;

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
    if (imageMap[gigId]) {
      setImgSrc(`images/${imageMap[gigId]}`);
      return;
    }
    if (imgAttempt === 'png') {
      setImgSrc(`images/${gigId}.jpg`);
      setImgAttempt('jpg');
    } else if (imgAttempt === 'jpg') {
      setImgSrc(`images/${gigId}.webp`);
      setImgAttempt('webp');
    } else {
      setImgSrc(FALLBACK_SVG);
      setImgAttempt('fallback');
    }
  };

  const heart = isFav ? '❤️' : '🤍';

  return (
    <div className="gig-detail">
      <button className="page-fav-btn" onClick={toggleFavorite} aria-label="Save">{heart}</button>

      <div id="mainContent">
        {!gig ? (
          <div className="not-found">
            <h2>Opportunity Not Found</h2>
            <p>We couldn't find details for this opportunity yet.</p>
            <Link to="/earn">← Browse All Opportunities</Link>
          </div>
        ) : (
          <>
            <div className="hero">
              <img
                src={gig.logo || imgSrc}
                className="hero-logo"
                alt={gig.name}
                onError={handleImgError}
              />
              <div className="hero-info">
                <h1>{gig.name}</h1>
                <div className="hero-rate">{gig.rate}</div>
                <div className="hero-desc">{gig.description}</div>
              </div>
            </div>

            {gig.tldr && (
              <div className="tldr-box">
                <span className="tldr-label">TL;DR:</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(gig.tldr) }} />
              </div>
            )}

            {gig.intro && (
              <div className="intro-section">
                <p dangerouslySetInnerHTML={{ __html: renderMarkdown(gig.intro) }} />
              </div>
            )}

            {gig.whyAdhd && gig.whyAdhd.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon adhd">🧠</div>
                  <h2 className="section-title">Why It's ADHD-Friendly</h2>
                </div>
                <div className="section-content">
                  <ul>{gig.whyAdhd.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
                </div>
              </div>
            )}

            {gig.standOut && gig.standOut.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon standout">💡</div>
                  <h2 className="section-title">What Makes It Stand Out</h2>
                </div>
                <div className="section-content">
                  <ul>{gig.standOut.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
                </div>
              </div>
            )}

            {gig.importantNotes && gig.importantNotes.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon warning">🚩</div>
                  <h2 className="section-title">Important Notes</h2>
                </div>
                <div className="section-content warning">
                  <ul>{gig.importantNotes.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
                </div>
              </div>
            )}

            {gig.payoutInfo && gig.payoutInfo.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon payout">💸</div>
                  <h2 className="section-title">Payout Info</h2>
                </div>
                <div className="section-content">
                  <ul>{gig.payoutInfo.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
                </div>
              </div>
            )}

            {gig.taskTypes && gig.taskTypes.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon tasks">🔍</div>
                  <h2 className="section-title">Types of Tasks</h2>
                </div>
                <div className="section-content">
                  <ul>{gig.taskTypes.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>
                </div>
              </div>
            )}

            {gig.finalTake && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon verdict">🔥</div>
                  <h2 className="section-title">Final Take</h2>
                </div>
                <div
                  className="section-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(gig.finalTake) }}
                />
              </div>
            )}

            {gig.idealFor && gig.idealFor.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <div className="section-icon ideal">✅</div>
                  <h2 className="section-title">Ideal For</h2>
                </div>
                <div className="section-content">
                  <div className="ideal-tags">
                    {gig.idealFor.map((item: string, i: number) => (
                      <span key={i} className="ideal-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div id="ctaSection" className="cta-section">
              <a href={gig.link} target="_blank" rel="noopener noreferrer" className="cta-btn">
                Get Started →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
