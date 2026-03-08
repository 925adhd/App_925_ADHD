import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Guides.css';

const guides = [
  { to: '/start', img: 'images/start.webp', alt: 'How to Start Working Online', title: 'Start From Zero', sub: 'Beginner setup · Step-by-step', start: true },
  { to: '/surveys-guide', img: 'images/surveys.webp', alt: 'Surveys & Market Research', title: 'Fast, Low-Effort Cash', sub: 'Quick cash · No experience needed' },
  { to: '/transcription-guide', img: 'images/transcription.webp', alt: 'Transcription', title: 'Quiet, Independent Work', sub: 'Quiet work · Flexible hours' },
  { to: '/data-annotation', img: 'images/dataanotation.webp', alt: 'Data Annotation', title: 'Focus-Driven, Higher Pay', sub: 'Focus work · Higher pay' },
  { to: '/mystery-shopping', img: 'images/mysteryshopping.webp', alt: 'Mystery Shopping', title: 'Paid Local Tasks', sub: 'Local tasks · Flexible schedule' },
  { to: '/social-media-guide', img: 'images/socialmedia.webp', alt: 'Social Media', title: 'Create And Earn', sub: 'Create content · Grow accounts' },
];

export default function Guides() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState<string | null>(null);

  const handleClick = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (opening) return;
    setOpening(to);
    setTimeout(() => navigate(to), 300);
  };

  return (
    <div className="guides">
      <div className="hero-banner" />

      <div className="main-content">
        <h1 className="page-title">ADHD Friendly Earning Guides</h1>
        <p className="page-subtitle">Pick a path to learn how to begin earning online.</p>

        <div className="guides-grid">
          {guides.map((g) => (
            <a
              key={g.to}
              href={g.to}
              className={`guide-card${g.start ? ' guide-card--start' : ''}${opening === g.to ? ' guide-card--opening' : ''}`}
              onClick={handleClick(g.to)}
            >
              <img src={g.img} alt={g.alt} loading="lazy" decoding="async" />
              <h3>{g.title}</h3>
              <span className="guide-card-sub">{g.sub}</span>
              {opening === g.to && <span className="guide-card-opening">✨ Opening guide…</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
