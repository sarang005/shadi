import { Link } from 'react-router-dom';
import useRegistrationFormInteractions from '@/hooks/useRegistrationFormInteractions';
import './ProfileRegistration.scss';

export default function ProfileRegistration() {
  useRegistrationFormInteractions();

  return (
    <>
      <nav className="topnav">
        <div className="logo">
          <div className="logo-mark">♥</div>
          <span className="logo-text">
            Shadi<span>Sampanna</span>
          </span>
        </div>
        <Link className="nav-link" to="/signin">
          ← Back to Sign In
        </Link>
      </nav>

      <div className="layout">
        <aside className="left-panel">
          <div className="lp-title">
            Create your<br />
            <em>sacred profile</em>
          </div>
          <p className="lp-sub">
            Fill in your details honestly. Our AI will match you with the most
            compatible life partners based on your profile.
          </p>

          <div className="steps-nav">
            <div className="step-item done">
              <div className="step-circle">✓</div>
              <div>
                <div className="step-label">Basic Details</div>
                <div className="step-desc">Name, age, religion</div>
              </div>
            </div>
            <div className="step-connector" />
            <div className="step-item active">
              <div className="step-circle">2</div>
              <div>
                <div className="step-label">Personal Info</div>
                <div className="step-desc">Education, career, lifestyle</div>
              </div>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">3</div>
              <div>
                <div className="step-label">Family Background</div>
                <div className="step-desc">Parents, siblings, values</div>
              </div>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">4</div>
              <div>
                <div className="step-label">Partner Preferences</div>
                <div className="step-desc">What you&apos;re looking for</div>
              </div>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">5</div>
              <div>
                <div className="step-label">Photos & Horoscope</div>
                <div className="step-desc">Upload photos, kundli details</div>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Profile Completion</span>
              <strong style={{ color: 'white' }}>33%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '33%' }} />
            </div>
            <div className="lp-trust">
              <div className="trust-item-sm">🔒 Your data is fully encrypted</div>
              <div className="trust-item-sm">✓ Profile reviewed in 24 hours</div>
              <div className="trust-item-sm">💝 Trusted by 3.2M+ families</div>
            </div>
          </div>
        </aside>

        <main className="right-panel">
          <div className="form-header">
            <div className="step-eyebrow">Step 2 of 5 · Personal Information</div>
            <h1 className="form-title">
              Tell us about <em>yourself</em>
            </h1>
            <p className="form-subtitle">
              This helps us find the most compatible matches for you. All fields
              marked <span style={{ color: 'var(--rose)' }}>*</span> are required.
            </p>
          </div>

          <div className="tip-box">
            <div className="tip-icon">💡</div>
            <div className="tip-text">
              <strong>Pro tip:</strong> Profiles with complete education and
              career details get <strong>3x more interests</strong> from quality
              matches. Be honest and specific!
            </div>
          </div>

          <div className="form-section">
            <div className="section-divider">
              <div className="sd-icon">🎓</div>
              <div className="sd-label">Education & Career</div>
              <div className="sd-line" />
            </div>

            <div className="form-grid-2" style={{ marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">
                  Highest Education <span className="req">*</span>
                </label>
                <select className="form-input form-select" defaultValue="">
                  <option value="">Select qualification</option>
                  <option>Post Graduate (M.Tech / MBA / MCA)</option>
                  <option>Graduate (B.Tech / BA / BSc)</option>
                  <option>Doctorate (PhD)</option>
                  <option>MBBS / MD / MS</option>
                  <option>LLB / LLM</option>
                  <option>CA / ICWA / CS</option>
                  <option>Diploma</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  College / University <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. IIT Bombay, Delhi University"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Specialization / Field <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Computer Science, Finance"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Year of Completion</label>
                <select className="form-input form-select" defaultValue="2024">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018 or earlier</option>
                </select>
              </div>
            </div>

            <div className="form-grid-3" style={{ marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">
                  Occupation <span className="req">*</span>
                </label>
                <select className="form-input form-select" defaultValue="">
                  <option value="">Select occupation</option>
                  <option>Software / IT Professional</option>
                  <option>Doctor / Medical</option>
                  <option>Engineer</option>
                  <option>Chartered Accountant</option>
                  <option>Government Employee</option>
                  <option>Business Owner</option>
                  <option>Teacher / Professor</option>
                  <option>Banking / Finance</option>
                  <option>Civil Services (IAS/IPS)</option>
                  <option>Other Professional</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Employer / Company</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. TCS, AIIMS, Govt of India"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Annual Income (₹) <span className="req">*</span>
                </label>
                <select className="form-input form-select" defaultValue="₹7–10 Lakh">
                  <option>Below ₹3 Lakh</option>
                  <option>₹3–5 Lakh</option>
                  <option>₹5–7 Lakh</option>
                  <option>₹7–10 Lakh</option>
                  <option>₹10–15 Lakh</option>
                  <option>₹15–25 Lakh</option>
                  <option>₹25–50 Lakh</option>
                  <option>₹50 Lakh+</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Work Location / City <span className="req">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Current city of work e.g. Bangalore, Mumbai"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-divider">
              <div className="sd-icon">🌟</div>
              <div className="sd-label">Personality & Lifestyle</div>
              <div className="sd-line" />
            </div>

            <div className="form-grid-2" style={{ marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">
                  Diet Preference <span className="req">*</span>
                </label>
                <div className="radio-pills">
                  <label className="radio-pill">
                    <input type="radio" name="diet" defaultChecked />
                    <span className="radio-pill-label">🥗 Vegetarian</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="diet" />
                    <span className="radio-pill-label">🍗 Non-Vegetarian</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="diet" />
                    <span className="radio-pill-label">🍱 Eggetarian</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="diet" />
                    <span className="radio-pill-label">🌱 Vegan</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Smoking Habits <span className="req">*</span>
                </label>
                <div className="radio-pills">
                  <label className="radio-pill">
                    <input type="radio" name="smoke" defaultChecked />
                    <span className="radio-pill-label">✓ Non-Smoker</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="smoke" />
                    <span className="radio-pill-label">Occasional</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="smoke" />
                    <span className="radio-pill-label">Smoker</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Drinking Habits</label>
                <div className="radio-pills">
                  <label className="radio-pill">
                    <input type="radio" name="drink" defaultChecked />
                    <span className="radio-pill-label">✓ Non-Drinker</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="drink" />
                    <span className="radio-pill-label">Occasional</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="drink" />
                    <span className="radio-pill-label">Social Drinker</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Physical Status</label>
                <div className="radio-pills">
                  <label className="radio-pill">
                    <input type="radio" name="physical" defaultChecked />
                    <span className="radio-pill-label">Normal</span>
                  </label>
                  <label className="radio-pill">
                    <input type="radio" name="physical" />
                    <span className="radio-pill-label">Differently Abled</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Hobbies & Interests</label>
              <div className="checkbox-pills">
                <label className="cb-pill">
                  <input type="checkbox" defaultChecked />
                  <span className="cb-pill-label">📚 Reading</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" defaultChecked />
                  <span className="cb-pill-label">✈️ Travelling</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🎵 Music</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🍳 Cooking</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🏋️ Fitness</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" defaultChecked />
                  <span className="cb-pill-label">🎨 Art & Craft</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🎭 Theatre</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🏊 Swimming</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">📸 Photography</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🧘 Yoga</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">🎮 Gaming</span>
                </label>
                <label className="cb-pill">
                  <input type="checkbox" />
                  <span className="cb-pill-label">+ More</span>
                </label>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">
                About Me <span className="req">*</span>
              </label>
              <textarea
                className="form-input form-textarea"
                placeholder="Write a warm, genuine description about yourself — your personality, values, what makes you unique, and what you're looking for in a partner. This is the first thing your matches will read!"
              />
              <div className="helper-text">
                💡 Tip: Write 100–200 words. Profiles with a detailed &quot;About Me&quot;
                get 4x more responses.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Languages Known</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hindi, English, Tamil, Bengali"
              />
              <div className="helper-text">
                Separate multiple languages with commas
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-divider">
              <div className="sd-icon">📍</div>
              <div className="sd-label">Location Details</div>
              <div className="sd-line" />
            </div>

            <div className="form-grid-3" style={{ marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">
                  Country <span className="req">*</span>
                </label>
                <select className="form-input form-select" defaultValue="India">
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UAE</option>
                  <option>Singapore</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  State <span className="req">*</span>
                </label>
                <select className="form-input form-select" defaultValue="">
                  <option value="">Select state</option>
                  <option>Delhi</option>
                  <option>Maharashtra</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                  <option>Uttar Pradesh</option>
                  <option>Gujarat</option>
                  <option>Rajasthan</option>
                  <option>West Bengal</option>
                  <option>Telangana</option>
                  <option>Kerala</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  City <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Mumbai, New Delhi"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Status</label>
              <div className="radio-pills">
                <label className="radio-pill">
                  <input type="radio" name="resident" defaultChecked />
                  <span className="radio-pill-label">Indian Resident</span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="resident" />
                  <span className="radio-pill-label">NRI – USA</span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="resident" />
                  <span className="radio-pill-label">NRI – UK</span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="resident" />
                  <span className="radio-pill-label">NRI – Other</span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="resident" />
                  <span className="radio-pill-label">Citizen Abroad</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn-back">
              ← Previous Step
            </button>
            <div className="step-counter">Step 2 of 5</div>
            <button type="button" className="btn-next">
              Save & Continue →
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
