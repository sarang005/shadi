import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MatchesFilterPanel from '@/features/matches/components/MatchesFilterPanel';
import MatchesProfileCardsDynamic from '@/features/matches/components/MatchesProfileCardsDynamic';
import { fetchMatches, sendInterest } from '@/features/matches/matchesThunk';
import { useFilterInteractions } from '@/hooks/useFilterInteractions';
import './Matches.scss';

const Matches = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { profiles, totalCount, loading, error } = useSelector((state) => state.matches);
  const [filterOpen, setFilterOpen] = useState(false);
  const [likedState, setLikedState] = useState({});

  useFilterInteractions();

  useEffect(() => {
    dispatch(fetchMatches({ page: 1, limit: 12 }));
  }, [dispatch]);

  const handleLike = (id) => {
    const liked = !likedState[id];
    setLikedState((prev) => ({ ...prev, [id]: liked }));
    dispatch(sendInterest({ id, liked }));
  };

  return (
    <div className="matches-page">
      <header className="topbar">
        <h1>Find Matches</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button type="button" className="icon-btn">
            🔔
            <div className="notif-dot" />
          </button>
          <button type="button" className="icon-btn">
            💬
          </button>
          <div className="topbar-avatar">{user?.avatar ?? '👩'}</div>
        </div>
      </header>

      <div className="search-hero">
        <h2>
          Discover Your <em>Perfect</em> Match
        </h2>
        <p>
          Browse from {(totalCount || 470000).toLocaleString('en-IN')}+ verified profiles
          across India and worldwide
        </p>
        <div className="search-box">
          <div className="search-fields">
            <div className="sf">
              <div className="sf-label">Looking For</div>
              <div className="sf-value">Bride (Female)</div>
            </div>
            <div className="sf">
              <div className="sf-label">Age Range</div>
              <div className="sf-value">24 – 32 yrs</div>
            </div>
            <div className="sf">
              <div className="sf-label">Religion</div>
              <div className="sf-value ph">Any Religion</div>
            </div>
            <div className="sf">
              <div className="sf-label">Mother Tongue</div>
              <div className="sf-value ph">Any Language</div>
            </div>
            <div className="sf">
              <div className="sf-label">Location</div>
              <div className="sf-value ph">Anywhere in India</div>
            </div>
            <button type="button" className="search-btn">
              🔍 Search
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: 'var(--muted)',
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Active Filters:
            </span>
            <div className="search-chips">
              <div className="chip-active">Hindu ✕</div>
              <div className="chip-active">26–34 yrs ✕</div>
              <div className="chip-active">Delhi NCR ✕</div>
              <div className="chip-inactive">+ Add Filter</div>
            </div>
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 12,
                color: 'var(--rose)',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Clear All Filters
            </span>
          </div>
        </div>
      </div>

      <div className="content-area">
        <button
          type="button"
          className="filter-toggle"
          onClick={() => setFilterOpen((o) => !o)}
        >
          🔍 Filters
        </button>

        <aside className={`filter-panel${filterOpen ? ' open' : ''}`} id="filterPanel">
          <MatchesFilterPanel />
        </aside>

        <div className="results-area">
          <div className="results-bar">
            <div className="results-count">
              <strong>1,24,840</strong> profiles found based on your preferences
            </div>
            <div className="sort-row">
              <span className="sort-label">Sort by:</span>
              <select className="sort-select" defaultValue="best">
                <option>Best Match</option>
                <option>Newest First</option>
                <option>Recently Active</option>
                <option>Age: Low to High</option>
              </select>
              <div className="view-toggle">
                <button type="button" className="vt-btn on">
                  ⊞
                </button>
                <button type="button" className="vt-btn">
                  ☰
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 20,
              borderBottom: '1px solid var(--border)',
              paddingBottom: 0,
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--rose)',
                borderBottom: '2px solid var(--rose)',
                cursor: 'pointer',
                marginBottom: -1,
              }}
            >
              All Matches (1,24,840)
            </div>
            <div
              style={{
                padding: '10px 20px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              Mutual Interest (36)
            </div>
            <div
              style={{
                padding: '10px 20px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              New Profiles (284)
            </div>
            <div
              style={{
                padding: '10px 20px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              Premium (4,820)
            </div>
            <div
              style={{
                padding: '10px 20px',
                fontSize: 13,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              Near Me (920)
            </div>
          </div>

          {loading && (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 24 }}>
              Loading matches...
            </p>
          )}
          {error && (
            <p style={{ textAlign: 'center', color: 'var(--rose)', padding: 24 }}>{error}</p>
          )}
          <MatchesProfileCardsDynamic
            profiles={profiles}
            onLikeClick={handleLike}
            likedState={likedState}
          />

          <div className="pagination">
            <button type="button" className="page-btn">
              ‹
            </button>
            <button type="button" className="page-btn on">
              1
            </button>
            <button type="button" className="page-btn">
              2
            </button>
            <button type="button" className="page-btn">
              3
            </button>
            <button type="button" className="page-btn">
              4
            </button>
            <button type="button" className="page-btn">
              5
            </button>
            <span style={{ color: 'var(--light-muted)', fontSize: 14 }}>···</span>
            <button type="button" className="page-btn">
              48
            </button>
            <button type="button" className="page-btn">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
