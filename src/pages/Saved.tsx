import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  gigs,
  getEnergyLabel,
  handleGigImgError,
} from '../data/gigs'
import '../styles/pages/Earn.css'
import '../styles/pages/Saved.css'

export default function Saved() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('925adhd_favorites') || '[]') } catch { return [] }
  })

  useEffect(() => {
    document.title = 'Favorites'
  }, [])

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem('925adhd_favorites', JSON.stringify(next))
      return next
    })
  }

  const savedGigs = gigs.filter(g => favorites.includes(g.id))

  return (
    <div className="earn-page saved-page">
      <div className="earn-content">
        <h1 className="saved-title">Favorites</h1>

        {savedGigs.length === 0 ? (
          <div className="saved-empty">
            <div className="saved-empty-icon">❤️</div>
            <p>No saved gigs yet.</p>
            <Link to="/earn" className="saved-empty-cta">Browse opportunities</Link>
          </div>
        ) : (
          <div className="card-grid">
            {savedGigs.map(gig => (
              <a
                key={gig.id}
                href={gig.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gig-card favorite"
              >
                <div className="gig-top">
                  <img
                    src={`images/${gig.id}.png`}
                    className="gig-logo"
                    alt={gig.name}
                    loading="lazy"
                    onError={(e) => handleGigImgError(e, gig)}
                  />
                  <div className="gig-info">
                    <div className="gig-name">{gig.name}</div>
                    <div className="gig-rate">{gig.rate}</div>
                  </div>
                  <button
                    className="fav-btn active"
                    onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleFav(gig.id) }}
                    aria-label="Remove from favorites"
                  >
                    ❤️
                  </button>
                </div>
                <div className="gig-desc">{gig.desc}</div>
                <div className="gig-meta">
                  <span className="meta-item">💰 {gig.rate}</span>
                  <span className="meta-item">⚡ {getEnergyLabel(gig.energy)}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
