import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Favorites.css';

interface Gig {
  id: string;
  name: string;
  rate: string;
  desc: string;
  logo: string;
  category: string;
  energy: string;
  tags: string[];
}

const allGigs: Gig[] = [
  { id: "pressplay", name: "PressPlay", rate: "🎁 $0.60–$5/hr", desc: "Watch unreleased trailers & screenings for Amazon vouchers.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/WUBBxNlrGzQLgbYSo2ns.png", category: "fun", energy: "low", tags: ["beginner", "quick"] },
  { id: "slicethepie", name: "Slice The Pie", rate: "$1–$8/hr", desc: "Paid reviews on music, fashion, and commercials.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/N5HyBECr8SGscfvrXhHs.jpg", category: "fun", energy: "low", tags: ["beginner", "quick"] },
  { id: "methinks", name: "Methinks", rate: "$5–$100+/gig", desc: "Video interviews, app testing, and surveys for product research.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/alNW7pxDjaH7vy1c9gwt.png", category: "surveys", energy: "med", tags: ["highpay"] },
  { id: "influenster", name: "Influenster", rate: "🎁 Free products", desc: "Test and review products through VoxBoxes; earn freebies, not cash.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4A7UA3KtSXUkc9ueckJH.png", category: "fun", energy: "low", tags: ["beginner"] },
  { id: "prolific", name: "Prolific", rate: "$8–$18/hr", desc: "High-paying academic studies. Guaranteed minimum pay and PayPal cashouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/immy0sOGu8FJH0lgD7VN.png", category: "surveys", energy: "low", tags: ["beginner", "quick", "highpay"] },
  { id: "dscout", name: "Dscout", rate: "$25–$250/mission", desc: "Video diaries, app testing, and live interviews for top brands.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ir5Usfji0u0VtJf8iXTn.png", category: "surveys", energy: "med", tags: ["highpay"] },
  { id: "respondentio", name: "Respondent.io", rate: "$50–$250+/study", desc: "High-paying research studies for professionals.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/tHrBfm7B9TRyDq7uZh73.png", category: "surveys", energy: "med", tags: ["highpay"] },
  { id: "usertesting", name: "UserTesting", rate: "$10–$60/hr", desc: "Test websites and apps for bigger payouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/THI1IS5clNzV8HIJ96gn.png", category: "surveys", energy: "med", tags: ["highpay"] },
  { id: "outlier", name: "Outlier", rate: "$15–$35/hr", desc: "Improve AI by rating responses, comparing outputs, and evaluating models.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/261LHUjlubG5IjYr0LZv.png", category: "ai", energy: "med", tags: ["highpay"] },
  { id: "appen", name: "Appen", rate: "$3–$14/hr", desc: "Specializes in AI training data with data labeling gigs.", logo: "https://cdn-images.himalayas.app/vmlva5ltollcahuby442urxngpau", category: "ai", energy: "med", tags: ["beginner"] },
  { id: "rev", name: "Rev", rate: "$10–$20/hr", desc: "Transcription, captions, and subtitles.", logo: "https://logosandtypes.com/wp-content/uploads/2022/04/Rev.png", category: "transcription", energy: "high", tags: [] },
  { id: "transcribeme", name: "TranscribeMe", rate: "$15–$22/hr", desc: "Short audio clips (2-4 min) and flexible transcription tasks.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6CTYiprr2sytaztxIqjN.jpg", category: "transcription", energy: "high", tags: ["highpay"] },
  { id: "etsy", name: "Etsy", rate: "Self-set", desc: "Global marketplace for handmade, vintage, and creative goods.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/pvvTqqHXOWCv5aaHVeWe.jpg", category: "handmade", energy: "high", tags: [] },
  { id: "rover", name: "Rover", rate: "$20–$40/hr", desc: "Dog walking, pet sitting, boarding.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/n8yzcHBxOVGYzZeYTAPc.png", category: "care", energy: "med", tags: ["highpay", "beginner"] },
  { id: "wag", name: "Wag", rate: "$13–$25/hr", desc: "Quick dog walks, drop-ins. On-demand gigs, fast bookings.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Cw1AUklnSjvwc5cFkDgL.png", category: "care", energy: "med", tags: ["quick", "beginner"] },
];

const gigsById: Record<string, Gig> = {};
allGigs.forEach(g => { gigsById[g.id] = g; });

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('925adhd_favorites') || '[]'); } catch { return []; }
  });

  const removeFavorite = (gigId: string) => {
    const newFavs = favorites.filter(id => id !== gigId);
    setFavorites(newFavs);
    localStorage.setItem('925adhd_favorites', JSON.stringify(newFavs));
  };

  return (
    <div className="favorites">
      <div className="main-content">
        <div id="content">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">❤️</div>
              <h2 className="empty-title">No saved opportunities yet</h2>
              <p className="empty-text">
                Tap the heart on any opportunity to save it here.<br />
                Your favorites will be waiting for you!
              </p>
              <Link to="/earn" className="empty-btn">Browse Opportunities</Link>
            </div>
          ) : (
            <div className="gig-list">
              {favorites.map(gigId => {
                const gig = gigsById[gigId];
                if (!gig) return null;
                return (
                  <Link key={gigId} to={`/gig-detail?gig=${gig.id}`} className="gig-card" data-id={gig.id}>
                    <img src={gig.logo} alt={gig.name} className="gig-logo" />
                    <div className="gig-info">
                      <div className="gig-name">{gig.name}</div>
                      <div className="gig-rate">{gig.rate}</div>
                      <div className="gig-desc">{gig.desc}</div>
                      <div className="gig-tags">
                        {gig.tags.includes('quick') && <span className="tag quick">⚡ Quick start</span>}
                        {gig.tags.includes('highpay') && <span className="tag highpay">💰 High pay</span>}
                        {gig.tags.includes('beginner') && <span className="tag beginner">🌱 Beginner</span>}
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={e => { e.preventDefault(); e.stopPropagation(); removeFavorite(gig.id); }}
                    >✕</button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
