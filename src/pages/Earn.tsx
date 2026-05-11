import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Earn.css';
import {
  type Gig,
  gigs,
  categories,
  catOrder,
  energyMeta,
  handleGigImgError,
  gigDetailPath,
} from '../data/gigs';

export default function Earn() {
  const [activeEnergy, setActiveEnergy] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('925adhd_favorites') || '[]'); } catch { return []; }
  });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const INITIAL_SHOW = 6;

  const toggleSection = (cat: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const filterGigs = () => {
    return gigs.filter(gig => {
      if (activeCategory && gig.category !== activeCategory) return false;
      if (activeEnergy) {
        const energyMap: Record<string, string> = { low: 'low', ok: 'med', hyper: 'high' };
        if (gig.energy !== (energyMap[activeEnergy] || activeEnergy)) return false;
      }
      if (searchQuery) {
        const text = (gig.name + ' ' + gig.desc + ' ' + gig.category).toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });
  };

  const toggleFav = (gigId: string) => {
    const newFavs = favorites.includes(gigId)
      ? favorites.filter(f => f !== gigId)
      : [...favorites, gigId];
    setFavorites(newFavs);
    localStorage.setItem('925adhd_favorites', JSON.stringify(newFavs));
  };

  const clearAll = () => {
    setActiveEnergy(null);
    setActiveCategory(null);
    setSearchQuery('');
  };

  const filtered = filterGigs();
  const hasFilters = !!(activeEnergy || activeCategory || searchQuery);

  const grouped: Record<string, Gig[]> = {};
  filtered.forEach(gig => {
    if (!grouped[gig.category]) grouped[gig.category] = [];
    grouped[gig.category].push(gig);
  });
  // Sort: staff picks first, original order otherwise
  Object.keys(grouped).forEach(cat => {
    grouped[cat].sort((a, b) => Number(Boolean(b.fave)) - Number(Boolean(a.fave)));
  });

  return (
    <div className="earn-page">
      <div className="earn-content">

        {/* Energy filter */}
        <div className="energy-wrap" role="group" aria-label="Energy level">
          <p className="energy-title">What's your energy right now?</p>
          <div className="energy-pills">
            {(['low', 'ok', 'hyper'] as const).map(level => (
              <button
                key={level}
                className={`energy-pill${activeEnergy === level ? ' active' : ''}`}
                data-level={level}
                type="button"
                aria-pressed={activeEnergy === level}
                onClick={() => setActiveEnergy(activeEnergy === level ? null : level)}
              >
                <span className="energy-pill-label">{energyMeta[level].label}</span>
                <span className="energy-pill-desc">{energyMeta[level].desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search gigs"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value.toLowerCase().trim())}
          />
        </div>

        {/* Category tabs */}
        {(() => {
          const primaryKeys = catOrder.slice(0, 4);
          const moreKeys = catOrder.slice(4);
          const isMoreActive = moreKeys.includes(activeCategory || '');
          return (
            <div className="category-filter-bar">
              <div className="category-tabs-scroll">
                <div className="category-tabs" aria-label="Categories">
                  <button
                    type="button"
                    className={`tab-btn${activeCategory === null ? ' active' : ''}`}
                    onClick={() => setActiveCategory(null)}
                  >All</button>
                  {primaryKeys.map(key => {
                    const cat = categories[key];
                    if (!cat) return null;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`tab-btn${activeCategory === key ? ' active' : ''}`}
                        onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                      >{cat.name}</button>
                    );
                  })}
                  <button
                    type="button"
                    className={`tab-btn more-toggle${showMoreFilters || isMoreActive ? ' active' : ''}`}
                    onClick={() => setShowMoreFilters(p => !p)}
                  >More {showMoreFilters ? '▴' : '▾'}</button>
                </div>
              </div>
              {showMoreFilters && (
                <div className="more-filters-panel">
                  {moreKeys.map(key => {
                    const cat = categories[key];
                    if (!cat) return null;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`tab-btn${activeCategory === key ? ' active' : ''}`}
                        onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                      >{cat.name}</button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* Results count — only when filters are active */}
        {hasFilters && (
          <div className="results-bar">
            <span id="resultsText">{filtered.length} gig{filtered.length !== 1 ? 's' : ''}</span>
            <button className="clear-filters" type="button" onClick={clearAll}>Clear filters</button>
          </div>
        )}

        {/* Gig sections */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No gigs match those filters.</p>
            <button className="clear-filters" onClick={clearAll}>Clear filters</button>
          </div>
        ) : (
          <div className="gig-sections">
            {catOrder.map(catKey => {
              const catGigs = grouped[catKey];
              if (!catGigs) return null;
              const cat = categories[catKey];
              const isExpanded = expandedSections.has(catKey);
              const hasMore = catGigs.length > INITIAL_SHOW;
              const displayGigs = hasMore && !isExpanded ? catGigs.slice(0, INITIAL_SHOW) : catGigs;

              return (
                <section key={catKey} className="earn-section">
                  <div className="section-head">
                    <h3 className="section-title">{cat.name}</h3>
                  </div>
                  <div className="card-grid">
                    {displayGigs.map(gig => {
                      const isFav = favorites.includes(gig.id);
                      return (
                        <Link
                          key={gig.id}
                          to={gigDetailPath(gig)}
                          className={`gig-card${isFav ? ' favorite' : ''}`}
                        >
                          {gig.fave && <span className="best-for-badge fave">Staff pick</span>}
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
                              className={`fav-btn${isFav ? ' active' : ''}`}
                              onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleFav(gig.id); }}
                              aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
                            >{isFav ? '❤️' : '🤍'}</button>
                          </div>
                          <div className="gig-desc">{gig.desc}</div>
                        </Link>
                      );
                    })}
                  </div>
                  {hasMore && (
                    <button className="view-all-btn" type="button" onClick={() => toggleSection(catKey)}>
                      {isExpanded ? 'Show less' : `View all ${catGigs.length}`}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
