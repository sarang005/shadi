const MatchesFilterPanel = () => (
  <>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>
        Refine Results
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--rose)',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Reset All
      </div>
    </div>

    <div className="filter-section">
      <div className="filter-title">
        Age <span className="filter-reset">Edit</span>
      </div>
      <div className="range-labels">
        <span>18 yrs</span>
        <span className="range-val">24 – 32 yrs</span>
        <span>60 yrs</span>
      </div>
      <input type="range" className="range-slider" min="18" max="60" defaultValue="32" />
    </div>

    <div className="filter-section">
      <div className="filter-title">Height</div>
      <div className="range-labels">
        <span>4&apos;6&quot;</span>
        <span className="range-val">5&apos;2&quot; – 5&apos;8&quot;</span>
        <span>6&apos;6&quot;</span>
      </div>
      <input type="range" className="range-slider" min="0" max="100" defaultValue="65" />
    </div>

    <div className="filter-section">
      <div className="filter-title">Religion / Community</div>
      <div className="filter-options">
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          <div className="custom-check">✓</div>
          <span className="filter-opt-label">Hindu</span>
          <span className="filter-opt-count">2,14,680</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Muslim</span>
          <span className="filter-opt-count">98,240</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Christian</span>
          <span className="filter-opt-count">42,810</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Sikh</span>
          <span className="filter-opt-count">28,490</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Jain</span>
          <span className="filter-opt-count">16,320</span>
        </label>
      </div>
    </div>

    <div className="filter-section">
      <div className="filter-title">Education</div>
      <div className="filter-options">
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          <div className="custom-check">✓</div>
          <span className="filter-opt-label">Post Graduate</span>
          <span className="filter-opt-count">86,420</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          <div className="custom-check">✓</div>
          <span className="filter-opt-label">Graduate</span>
          <span className="filter-opt-count">1,24,600</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Doctorate (PhD)</span>
          <span className="filter-opt-count">12,340</span>
        </label>
      </div>
    </div>

    <div className="filter-section">
      <div className="filter-title">Annual Income</div>
      <div className="pill-filters">
        <div className="filter-pill on">Any</div>
        <div className="filter-pill">3–6L</div>
        <div className="filter-pill">6–10L</div>
        <div className="filter-pill">10–20L</div>
        <div className="filter-pill">20L+</div>
        <div className="filter-pill">50L+</div>
      </div>
    </div>

    <div className="filter-section">
      <div className="filter-title">Lifestyle</div>
      <div className="filter-options">
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          <div className="custom-check">✓</div>
          <span className="filter-opt-label">Non-smoker</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Vegetarian</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">No alcohol</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">Fitness-oriented</span>
        </label>
      </div>
    </div>

    <div className="filter-section">
      <div className="filter-title">Show Only</div>
      <div className="filter-options">
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          <div className="custom-check">✓</div>
          <span className="filter-opt-label">✓ Verified Profiles</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">💎 Premium Members</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">🟢 Active This Week</span>
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          <div className="custom-check" />
          <span className="filter-opt-label">📸 With Photos Only</span>
        </label>
      </div>
    </div>

    <button
      type="button"
      className="apply-filters-btn"
      style={{
        width: '100%',
        padding: 13,
        background: 'linear-gradient(135deg, var(--rose), var(--deep-rose))',
        color: 'white',
        border: 'none',
        borderRadius: 14,
        fontFamily: '"Jost", sans-serif',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 18px rgba(194, 24, 91, 0.35)',
      }}
    >
      Apply Filters ✦
    </button>
  </>
);

export default MatchesFilterPanel;
