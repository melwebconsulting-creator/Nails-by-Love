import React, { useState, useEffect } from 'react';

const INSTAGRAM_URL = 'https://www.instagram.com/nailsbylove_yyc/';
const INSTAGRAM_HANDLE = '@nailsbylove_yyc';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  shape: string;
  length: string;
  technique: string;
  description: string;
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'set-chrome-french',
    title: 'Molten Chrome French Tips',
    category: 'chrome',
    categoryLabel: 'Glazed Chrome',
    image: 'assets/images/hero_nail_artistry_1793074977263.jpg',
    shape: 'Medium Almond',
    length: 'Medium',
    technique: 'GelX Extension + Mirror Chrome Finish',
    description: 'High-shine reflective chrome tips over an ethereal translucent nude base. Clean micro-apex with flawless cuticle lines. Send inspo photo for quote.'
  },
  {
    id: 'set-clean-micro-french',
    title: 'Micro French Minimalist Line',
    category: 'french',
    categoryLabel: 'French & Micro-Tips',
    image: 'assets/images/nail_minimalist_french_1793074979102.jpg',
    shape: 'Short Squoval',
    length: 'Natural / Short',
    technique: 'BIAB Structured Overlay + Crisp Micro-Tip',
    description: 'Understated luxury. A hairline micro-tip that elongates natural nail beds with BIAB reinforcement for lasting strength.'
  },
  {
    id: 'set-pearl-glazed',
    title: 'Pearlescent Glazed Donut Nude',
    category: 'chrome',
    categoryLabel: 'Glazed Chrome',
    image: 'assets/images/nail_chrome_glazed_1793074978410.jpg',
    shape: 'Soft Almond',
    length: 'Medium',
    technique: 'BIAB / Shellac Base + Glazed Pearl Powder',
    description: 'Radiant lavender-pink shimmer with an opalescent glaze that catches golden daylight. Silky smooth chip-resistant finish.'
  },
  {
    id: 'set-3d-celestial-droplets',
    title: 'Bespoke 3D Fluid Swirls & Water Droplets',
    category: 'custom-3d',
    categoryLabel: 'Bespoke 3D Art',
    image: 'assets/images/nail_custom_art_1793074980060.jpg',
    shape: 'Almond',
    length: 'Medium',
    technique: 'GelX Full Set + Sculpted 3D Texture & Chrome',
    description: 'Tactile gel sculpting with chrome curves, metallic accents, and glass-like dew drop accents on neutral milky base.'
  },
  {
    id: 'set-milky-clean-nude',
    title: 'Milky Sheer Syrup Overlay',
    category: 'minimalist',
    categoryLabel: 'Minimalist & Nude',
    image: 'assets/images/atelier_studio_space_1793074980459.jpg',
    shape: 'Natural Oval',
    length: 'Short',
    technique: 'BIAB Natural Strength Overlay',
    description: 'Clean girl aesthetic perfected. Multiple sheer milky layers cured over BIAB structured base for healthy, glassy natural nails.'
  }
];

export default function App() {
  // Navigation & Scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter & Portfolio
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  // Estimator / Inspo Guide State
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [estimatorBase, setEstimatorBase] = useState<'GelX' | 'BIAB' | 'Shellac'>('GelX');
  const [estimatorArt, setEstimatorArt] = useState<string>('Tier I: Minimalist / French');
  const [estimatorSoakOff, setEstimatorSoakOff] = useState(false);

  // Interactive DM Inquiry Builder Form State
  const [formName, setFormName] = useState('');
  const [formInstagram, setFormInstagram] = useState('');
  const [formService, setFormService] = useState<'GelX' | 'BIAB' | 'Shellac'>('GelX');
  const [formNailState, setFormNailState] = useState('Bare natural nails (Ready for set)');
  const [formShape, setFormShape] = useState('Almond');
  const [formLength, setFormLength] = useState('Medium');
  const [formPreferredWindow, setFormPreferredWindow] = useState('Afternoon');
  const [formNotes, setFormNotes] = useState('');

  // Summary Modal & Toast
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [summaryMessage, setSummaryMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // Track scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleServiceSelect = (service: 'GelX' | 'BIAB' | 'Shellac') => {
    setFormService(service);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Hi Nails by Love! I'd love to request an appointment in NE Calgary:
- Name: ${formName || 'Client'}
- Instagram: ${formInstagram ? (formInstagram.startsWith('@') ? formInstagram : '@' + formInstagram) : 'N/A'}
- Service: ${formService}
- Preferred Shape & Length: ${formShape}, ${formLength}
- Current Nails: ${formNailState}
- Preferred Time Window: ${formPreferredWindow}
- Design Notes: ${formNotes || 'Sending inspiration photos in DM!'}
(Ready to send inspiration photos for price quote)`;

    setSummaryMessage(formattedMessage);
    setSummaryModalOpen(true);
    setHasCopied(false);
  };

  const handleCopySummary = () => {
    if (!summaryMessage) return;
    navigator.clipboard.writeText(summaryMessage).then(() => {
      setHasCopied(true);
      triggerToast('Inquiry copied to clipboard! Paste in Instagram DM.');
      setTimeout(() => setHasCopied(false), 3000);
    });
  };

  const filteredPortfolio = activeCategory === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#27201C]">
      {/* ======================================================================
          1. Header (3-Zone Top Bar Contract)
          ====================================================================== */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-wrapper">
          {/* Zone 1: Wordmark */}
          <a href="#" className="brand-wordmark flex items-center gap-2">
            <span>Nails by Love</span>
            <span className="text-[0.68rem] tracking-wider uppercase font-sans px-2 py-0.5 rounded border border-[#BAA99E]/40 text-[#7E726A] hidden sm:inline-block">
              NE Calgary
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#policies" className="nav-link">Studio Policies</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Zone 3: Primary CTA & Mobile Toggle */}
          <div className="header-action">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Book via Instagram DM</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <button
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services (GelX, BIAB, Shellac)</a></li>
            <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Lookbook Portfolio</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About Nails by Love</a></li>
            <li><a href="#policies" onClick={() => setMobileMenuOpen(false)}>Studio Policies</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact & Location</a></li>
          </ul>
          <div className="mobile-drawer-actions">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
            >
              <span>DM on Instagram @nailsbylove_yyc</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-[80px]">
        {/* ======================================================================
            2. Hero Section
            ====================================================================== */}
        <section className="hero-section">
          <div className="hero-glow"></div>
          <div className="container hero-grid">
            {/* Left Column */}
            <div className="hero-content">
              <div className="unboxed-meta">
                <span>NE Calgary</span>
                <span className="separator">·</span>
                <span>Private Studio</span>
                <span className="separator">·</span>
                <span>By Appointment Only</span>
              </div>

              <h1 className="hero-headline">
                Elevated nail artistry, GelX extensions &amp; BIAB care.
              </h1>

              <p className="hero-description">
                An intimate private nail studio in NE Calgary dedicated to pristine nail preparation, GelX extensions, structured BIAB overlays, and durable Shellac. Send your inspiration photos via Instagram DM for custom pricing and scheduling.
              </p>

              <div className="hero-cta-group">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Book via Instagram DM</span>
                </a>
                <a href="#services" className="btn-secondary">
                  Explore Services &amp; Inspo
                </a>
              </div>

              <div className="hero-strip">
                <div className="strip-item">
                  <h4>GelX</h4>
                  <p>Damage-free soft-gel extensions</p>
                </div>
                <div className="strip-item">
                  <h4>BIAB</h4>
                  <p>Builder in a Bottle strength</p>
                </div>
                <div className="strip-item">
                  <h4>Shellac</h4>
                  <p>Flawless high-shine gel finish</p>
                </div>
                <div className="strip-item">
                  <h4>Inspo Pricing</h4>
                  <p>DM photos for custom quotes</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="hero-image-wrap">
              <div className="hero-image-frame">
                <img
                  src="assets/images/hero_nail_artistry_1793074977263.jpg"
                  alt="Glazed chrome French tip nail artistry by Nails by Love in NE Calgary"
                  loading="eager"
                  className="w-full h-auto object-cover"
                />
                <div className="hero-image-scrim">
                  <div className="scrim-flex">
                    <div>
                      <div className="scrim-title">Signature Glazed Chrome French</div>
                      <div className="scrim-sub">Medium Almond GelX Enhancement</div>
                    </div>
                    <div className="scrim-brand">Nails by Love</div>
                  </div>
                </div>
              </div>

              <div className="floating-badge">
                <div className="badge-label">Private Studio Standard</div>
                <div className="badge-text">
                  Hospital-grade sanitation, meticulous cuticle prep &amp; tailored nail care in NE Calgary.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
            3. Services Section & Interactive Inspo Guide
            ====================================================================== */}
        <section id="services" className="section bg-ivory">
          <div className="container">
            {/* Section Heading */}
            <div className="section-header-row">
              <div>
                <div className="section-eyebrow">Menu &amp; Offerings</div>
                <h2 className="section-title">Curated Nail Services</h2>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsEstimatorOpen(!isEstimatorOpen)}
                  className="btn-secondary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                    <line x1="8" y1="6" x2="16" y2="6"></line>
                    <line x1="16" y1="14" x2="16" y2="18"></line>
                    <path d="M16 10h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M8 14h.01"></path>
                    <path d="M12 18h.01"></path>
                    <path d="M8 18h.01"></path>
                  </svg>
                  <span>{isEstimatorOpen ? 'Hide Inspo Guide' : 'Inspiration & Quote Guide'}</span>
                </button>
              </div>
            </div>

            {/* Pricing Policy Notice */}
            <div className="notice-banner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#BAA99E' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <div>
                <strong>Pricing Information:</strong> Every nail set is uniquely customized to your desired length, shape, and nail art complexity. Customers should send inspiration photos via Instagram DM (<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#27201C]">@nailsbylove_yyc</a>) for personalized pricing and booking.
              </div>
            </div>

            {/* Interactive Inspo & Quote Guide (Toggleable) */}
            {isEstimatorOpen && (
              <div className="estimator-card active">
                <div className="estimator-header">
                  <div>
                    <h3 className="estimator-title">Set &amp; Inspo Planner</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                      Configure your desired foundation and art level to prepare your quote inquiry for Instagram DM.
                    </p>
                  </div>
                  <div className="estimator-total-wrap">
                    <div className="estimator-total-label">Pricing Method</div>
                    <div className="estimator-total-val text-sm font-serif">Inspo Photo Quote</div>
                  </div>
                </div>

                <div className="estimator-grid">
                  {/* Column 1: Base Service */}
                  <div>
                    <div className="estimator-col-label">1. Foundation Service</div>
                    <div className="radio-pill-group">
                      <label className={`radio-choice ${estimatorBase === 'GelX' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_base"
                            checked={estimatorBase === 'GelX'}
                            onChange={() => setEstimatorBase('GelX')}
                          />
                          <span>GelX Full Set</span>
                        </span>
                        <span className="price-indicator text-xs">Soft-gel length</span>
                      </label>
                      <label className={`radio-choice ${estimatorBase === 'BIAB' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_base"
                            checked={estimatorBase === 'BIAB'}
                            onChange={() => setEstimatorBase('BIAB')}
                          />
                          <span>BIAB Overlay</span>
                        </span>
                        <span className="price-indicator text-xs">Builder strength</span>
                      </label>
                      <label className={`radio-choice ${estimatorBase === 'Shellac' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_base"
                            checked={estimatorBase === 'Shellac'}
                            onChange={() => setEstimatorBase('Shellac')}
                          />
                          <span>Shellac Manicure</span>
                        </span>
                        <span className="price-indicator text-xs">High-shine gel</span>
                      </label>
                    </div>
                  </div>

                  {/* Column 2: Art Tier */}
                  <div>
                    <div className="estimator-col-label">2. Nail Art Level</div>
                    <div className="radio-pill-group">
                      <label className={`radio-choice ${estimatorArt === 'Solid Color (No Art)' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_art"
                            checked={estimatorArt === 'Solid Color (No Art)'}
                            onChange={() => setEstimatorArt('Solid Color (No Art)')}
                          />
                          <span>Solid Single Color (No Art)</span>
                        </span>
                        <span className="price-indicator text-xs">Classic</span>
                      </label>
                      <label className={`radio-choice ${estimatorArt === 'Tier I: Minimalist / French' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_art"
                            checked={estimatorArt === 'Tier I: Minimalist / French'}
                            onChange={() => setEstimatorArt('Tier I: Minimalist / French')}
                          />
                          <span>Tier I: Minimalist / French</span>
                        </span>
                        <span className="price-indicator text-xs">Micro-tips / dots</span>
                      </label>
                      <label className={`radio-choice ${estimatorArt === 'Tier II: Chrome & Swirls' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_art"
                            checked={estimatorArt === 'Tier II: Chrome & Swirls'}
                            onChange={() => setEstimatorArt('Tier II: Chrome & Swirls')}
                          />
                          <span>Tier II: Chrome &amp; Swirls</span>
                        </span>
                        <span className="price-indicator text-xs">Molten chrome</span>
                      </label>
                      <label className={`radio-choice ${estimatorArt === 'Tier III: Bespoke 3D Art' ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="radio"
                            name="estimator_art"
                            checked={estimatorArt === 'Tier III: Bespoke 3D Art'}
                            onChange={() => setEstimatorArt('Tier III: Bespoke 3D Art')}
                          />
                          <span>Tier III: Bespoke 3D Art</span>
                        </span>
                        <span className="price-indicator text-xs">Sculpted details</span>
                      </label>
                    </div>
                  </div>

                  {/* Column 3: Care & Book */}
                  <div>
                    <div className="estimator-col-label">3. Care &amp; Booking</div>
                    <div className="radio-pill-group" style={{ marginBottom: '1.25rem' }}>
                      <label className={`radio-choice ${estimatorSoakOff ? 'selected' : ''}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            checked={estimatorSoakOff}
                            onChange={(e) => setEstimatorSoakOff(e.target.checked)}
                          />
                          <span>Gentle Gel Removal &amp; Reset</span>
                        </span>
                        <span className="price-indicator text-xs">Soak-off</span>
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormService(estimatorBase);
                        setFormNotes(`Planned design: ${estimatorArt}${estimatorSoakOff ? ' + Gentle soak-off' : ''}`);
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-primary"
                      style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                    >
                      Use Plan to Request Inspo Quote
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Service Cards Grid (GelX, BIAB, Shellac) */}
            <div className="services-grid">
              {/* Card 1: GelX */}
              <div className="service-card">
                <div>
                  <div className="service-meta-top">
                    <span className="duration-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>1h 45m</span>
                    </span>
                    <span className="category-tag">Extensions</span>
                  </div>
                  <h3 className="service-name">GelX</h3>
                  <div className="service-price-wrap">
                    <span className="service-price font-serif text-lg">Send Inspo Photo</span>
                    <span className="service-price-note">Quote via Instagram DM</span>
                  </div>
                  <p className="service-desc">
                    Lightweight full-cover soft-gel tips custom fitted to each natural nail bed. Includes comprehensive cuticle dry prep, shaping, apex reinforcement, and solid gel finish without acrylic damage.
                  </p>
                  <ul className="feature-list">
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Tailored nail sizing &amp; balanced apex</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Gentle dry manicure &amp; cuticle neatening</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Damage-free soft-gel adhesion</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="recommended-box">
                    Best for: Clients desiring instant, durable length and natural flexibility without heavy acrylics.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('GelX')}
                    className="card-action-btn"
                  >
                    Select GelX &amp; Prepare DM
                  </button>
                </div>
              </div>

              {/* Card 2: BIAB */}
              <div className="service-card">
                <div>
                  <div className="service-meta-top">
                    <span className="duration-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>1h 30m</span>
                    </span>
                    <span className="category-tag">Natural Overlay</span>
                  </div>
                  <h3 className="service-name">BIAB</h3>
                  <div className="service-price-wrap">
                    <span className="service-price font-serif text-lg">Send Inspo Photo</span>
                    <span className="service-price-note">Quote via Instagram DM</span>
                  </div>
                  <p className="service-desc">
                    Builder in a Bottle structured overlay applied directly over natural nails to build a seamless apex and allow thin, brittle, or peeling nails to grow long, resilient, and healthy.
                  </p>
                  <ul className="feature-list">
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Reinforces thin, bendable, or peeling natural nails</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Flawless cuticle clearance and contouring</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Promotes 3–4 weeks durable growth retention</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="recommended-box">
                    Best for: Clients growing out their natural nails who need chip-resistant strength and structure.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('BIAB')}
                    className="card-action-btn"
                  >
                    Select BIAB &amp; Prepare DM
                  </button>
                </div>
              </div>

              {/* Card 3: Shellac */}
              <div className="service-card">
                <div>
                  <div className="service-meta-top">
                    <span className="duration-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>45m – 1h</span>
                    </span>
                    <span className="category-tag">Classic Gel</span>
                  </div>
                  <h3 className="service-name">Shellac</h3>
                  <div className="service-price-wrap">
                    <span className="service-price font-serif text-lg">Send Inspo Photo</span>
                    <span className="service-price-note">Quote via Instagram DM</span>
                  </div>
                  <p className="service-desc">
                    High-shine, long-lasting gel polish manicure cured under LED light. Perfect for clean, groomed natural nails with rich pigmentation, zero smudge drying time, and lasting mirror gloss.
                  </p>
                  <ul className="feature-list">
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Gentle natural nail plate preparation</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Neat cuticle cleaning and nail shaping</span>
                    </li>
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>Durable chip-free color lasting up to 2+ weeks</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="recommended-box">
                    Best for: Clients who love polished natural nails with instant dry time and classic elegance.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleServiceSelect('Shellac')}
                    className="card-action-btn"
                  >
                    Select Shellac &amp; Prepare DM
                  </button>
                </div>
              </div>
            </div>

            {/* Nail Art Tiers Strip */}
            <div className="tiers-container">
              <div className="tiers-heading-wrap">
                <div className="section-eyebrow">Customization &amp; Art Levels</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--color-espresso)', marginTop: '0.2rem' }}>
                  Nail Art Tiers &amp; Inspiration Guide
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                  Nail art can be paired with your GelX, BIAB, or Shellac set. Send your reference pictures via Instagram DM for an accurate quote.
                </p>
              </div>

              <div className="tiers-grid">
                <div className="tier-card">
                  <div>
                    <div className="tier-header">
                      <span className="tier-code">Tier I Art</span>
                      <span className="tier-rate">Send Inspo</span>
                    </div>
                    <h4 className="tier-title">Minimalist &amp; French</h4>
                    <p className="tier-desc">
                      Understated elegance. Includes micro French tips, glazed pearlescent chrome powder, aura airbrush effects, or clean geometric dots.
                    </p>
                  </div>
                  <div className="tier-footer">
                    <span>Pricing</span>
                    <span className="font-mono text-xs">Based on photos</span>
                  </div>
                </div>

                <div className="tier-card">
                  <div>
                    <div className="tier-header">
                      <span className="tier-code">Tier II Art</span>
                      <span className="tier-rate">Send Inspo</span>
                    </div>
                    <h4 className="tier-title">Fluid Chrome &amp; Swirls</h4>
                    <p className="tier-desc">
                      Textured molten silver/gold chrome swirls, Japanese tortoiseshell, celestial stars, or two-tone layered modern French designs.
                    </p>
                  </div>
                  <div className="tier-footer">
                    <span>Pricing</span>
                    <span className="font-mono text-xs">Based on photos</span>
                  </div>
                </div>

                <div className="tier-card">
                  <div>
                    <div className="tier-header">
                      <span className="tier-code">Tier III Art</span>
                      <span className="tier-rate">Send Inspo</span>
                    </div>
                    <h4 className="tier-title">Bespoke 3D Artistry</h4>
                    <p className="tier-desc">
                      Complex custom nail artistry. Intricate hand-painted details, 3D water droplets, encapsulated charms, and multi-layered mixed media.
                    </p>
                  </div>
                  <div className="tier-footer">
                    <span>Pricing</span>
                    <span className="font-mono text-xs">Based on photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
            4. Portfolio Lookbook Section
            ====================================================================== */}
        <section id="portfolio" className="section">
          <div className="container">
            <div className="center-heading">
              <div className="section-eyebrow">Selected Works</div>
              <h2 className="section-title">Artistry &amp; Lookbook</h2>
              <p className="section-subtitle">
                Handcrafted GelX extensions, BIAB overlays, and bespoke designs from our private NE Calgary studio.
              </p>
            </div>

            {/* Filter Bar (Segmented Control) */}
            <div className="filter-bar">
              <div className="segmented-control" role="tablist">
                <button
                  type="button"
                  className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Sets
                </button>
                <button
                  type="button"
                  className={`filter-btn ${activeCategory === 'french' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('french')}
                >
                  French &amp; Micro-Tips
                </button>
                <button
                  type="button"
                  className={`filter-btn ${activeCategory === 'minimalist' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('minimalist')}
                >
                  Minimalist &amp; Nude
                </button>
                <button
                  type="button"
                  className={`filter-btn ${activeCategory === 'chrome' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('chrome')}
                >
                  Glazed Chrome
                </button>
                <button
                  type="button"
                  className={`filter-btn ${activeCategory === 'custom-3d' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('custom-3d')}
                >
                  Bespoke 3D Art
                </button>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="portfolio-grid">
              {filteredPortfolio.map(item => (
                <div
                  key={item.id}
                  className="gallery-card cursor-pointer"
                  onClick={() => setActiveModalItem(item)}
                >
                  <div className="gallery-media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="gallery-badge">{item.categoryLabel}</span>
                    <div className="gallery-hover-overlay">
                      <span className="zoom-icon-circle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="gallery-body">
                    <div>
                      <h3 className="gallery-title">{item.title}</h3>
                      <p className="gallery-snippet">{item.description}</p>
                    </div>
                    <div className="gallery-meta-foot">
                      <span className="gallery-shape">{item.shape}</span>
                      <span className="gallery-link-text">View Details &amp; Inspo →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================================
            5. About Section
            ====================================================================== */}
        <section id="about" className="section bg-ivory">
          <div className="container about-grid">
            {/* Studio Photo */}
            <div>
              <div className="about-img-frame">
                <img
                  src="assets/images/atelier_studio_space_1793074980459.jpg"
                  alt="Nails by Love private studio space in NE Calgary"
                  loading="lazy"
                />
                <div className="about-img-foot">
                  <div className="section-eyebrow" style={{ marginBottom: '0.15rem' }}>The Studio Space</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-espresso)' }}>
                    Private 1-on-1 setting in NE Calgary
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div>
              <div className="section-eyebrow">The Studio &amp; Artistry</div>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Dedicated nail care and custom artistry in NE Calgary.
              </h2>

              <div className="about-prose">
                <p>
                  Welcome to <strong>Nails by Love</strong>, an intimate private studio located in <strong>NE Calgary</strong> offering specialized nail care in a calm, 1-on-1 setting.
                </p>
                <p>
                  We focus on high-quality <strong>GelX extensions, BIAB (Builder in a Bottle) structured overlays, and Shellac</strong> manicures. Each service is centered on nail health, careful shaping, and meticulous cuticle preparation.
                </p>
                <p>
                  Because every set is unique, we work directly from your inspiration photos. Customers are invited to send their dream nail designs, preferred lengths, and styles directly via Instagram DM to receive personalized pricing and reserve their appointment.
                </p>
              </div>

              <div className="principles-grid">
                <div className="principle-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <div>
                    <h4>Health-First Nail Care</h4>
                    <p>Gentle dry prep with zero harsh mechanical filing on bare natural nails.</p>
                  </div>
                </div>

                <div className="principle-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <div>
                    <h4>GelX, BIAB &amp; Shellac</h4>
                    <p>Tailored systems matching your lifestyle, natural nail goals, and desired length.</p>
                  </div>
                </div>

                <div className="principle-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <div>
                    <h4>Inspo-Based Pricing</h4>
                    <p>Send your inspiration photos on Instagram DM for transparent, personalized quotes.</p>
                  </div>
                </div>

                <div className="principle-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <div>
                    <h4>Private 1-on-1 Studio</h4>
                    <p>A tranquil NE Calgary private session with unhurried, focused attention.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
            6. Booking Section & Instagram DM Inquiry Builder
            ====================================================================== */}
        <section id="booking" className="section">
          <div className="container booking-wrap">
            <div className="center-heading">
              <div className="section-eyebrow">Booking &amp; Inquiries</div>
              <h2 className="section-title">DM on Instagram to Book</h2>
              <p className="section-subtitle">
                All appointments are booked exclusively via Instagram DM. Send your inspiration photos to @nailsbylove_yyc for pricing and availability.
              </p>
            </div>

            {/* Direct Link Banner */}
            <div className="booking-header-bar">
              <div className="bar-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <div className="bar-text">
                  <strong>Booking Instructions:</strong> Contact <strong>@nailsbylove_yyc</strong> on Instagram. Attach your inspiration photos in your DM to receive pricing for your desired set!
                </div>
              </div>

              <div className="bar-actions">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Open Instagram DM</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Interactive DM Inquiry Builder */}
            <div className="booking-form-box">
              <div className="mb-4 pb-3 border-b border-[#E8DCD4]">
                <h3 className="font-serif text-xl text-[#27201C]">Prepare Your Instagram DM</h3>
                <p className="text-xs text-[#7E726A] mt-1">
                  Fill in your preferences below to generate a pre-formatted message. You can copy it directly into Instagram DM along with your inspiration photos.
                </p>
              </div>

              <form onSubmit={handleFormSubmit}>
                {/* Contact Details */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="bookingName">Your Name</label>
                    <input
                      type="text"
                      id="bookingName"
                      className="form-input"
                      placeholder="e.g. Jessica"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bookingInstagram">Your Instagram Handle *</label>
                    <input
                      type="text"
                      id="bookingInstagram"
                      className="form-input"
                      placeholder="@yourhandle"
                      value={formInstagram}
                      onChange={(e) => setFormInstagram(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Service & Condition */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="bookingServiceSelect">Desired Service *</label>
                    <select
                      id="bookingServiceSelect"
                      className="form-select"
                      value={formService}
                      onChange={(e) => setFormService(e.target.value as 'GelX' | 'BIAB' | 'Shellac')}
                    >
                      <option value="GelX">GelX (Soft-Gel Full Set Extensions)</option>
                      <option value="BIAB">BIAB (Builder in a Bottle Structured Overlay)</option>
                      <option value="Shellac">Shellac (Classic Long-Lasting Gel Manicure)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bookingNailState">Current Nail State *</label>
                    <select
                      id="bookingNailState"
                      className="form-select"
                      value={formNailState}
                      onChange={(e) => setFormNailState(e.target.value)}
                    >
                      <option value="Bare natural nails (Ready for set)">Bare natural nails (Ready for full set)</option>
                      <option value="Existing GelX / BIAB (Needs soak-off)">Existing GelX / BIAB (Needs soak-off)</option>
                      <option value="Natural nails with simple gel">Natural nails with simple gel</option>
                    </select>
                  </div>
                </div>

                {/* Shape & Length Preference */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Preferred Nail Shape</label>
                    <div className="btn-group-row">
                      {['Almond', 'Squoval', 'Square', 'Oval', 'Coffin', 'Natural'].map((shape) => (
                        <button
                          key={shape}
                          type="button"
                          className={`select-btn ${formShape === shape ? 'selected' : ''}`}
                          onClick={() => setFormShape(shape)}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Length</label>
                    <div className="btn-group-row">
                      {['Natural', 'Short', 'Medium', 'Long'].map((length) => (
                        <button
                          key={length}
                          type="button"
                          className={`select-btn ${formLength === length ? 'selected' : ''}`}
                          onClick={() => setFormLength(length)}
                        >
                          {length}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferred Window */}
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="bookingTime">Preferred Time Window</label>
                  <select
                    id="bookingTime"
                    className="form-select"
                    value={formPreferredWindow}
                    onChange={(e) => setFormPreferredWindow(e.target.value)}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening / Flexible">Evening / Flexible</option>
                  </select>
                </div>

                {/* Design Notes */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="bookingArtNotes">Design Inspiration &amp; Style Notes</label>
                  <textarea
                    id="bookingArtNotes"
                    className="form-textarea"
                    rows={3}
                    placeholder="Describe your design vision (e.g. glazed chrome French, milky syrup nude, minimal dots, inspo photo ready to send in DM)..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                  ></textarea>
                </div>

                {/* Footer Row */}
                <div className="form-footer-row">
                  <div className="form-policy-note">
                    Remember to send your inspiration photos via DM for pricing.
                  </div>
                  <button type="submit" className="btn-primary">
                    <span>Preview &amp; Copy DM Inquiry</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ======================================================================
            7. Studio Policies & Contact
            ====================================================================== */}
        <section id="policies" className="section bg-ivory">
          <div className="container">
            {/* Policies */}
            <div className="section-header-row" style={{ marginBottom: '2rem' }}>
              <div>
                <div className="section-eyebrow">Client Experience</div>
                <h2 className="section-title">Studio Policies &amp; Etiquette</h2>
                <p className="section-subtitle">
                  To ensure every client receives attentive, meticulous care, please review our private studio policies.
                </p>
              </div>
            </div>

            <div className="policies-grid">
              <div className="policy-card">
                <div className="policy-card-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <h3 className="policy-title">Arrival &amp; Clean Nails</h3>
                </div>
                <div className="policy-summary">Please arrive with bare natural nails unless you requested a soak-off.</div>
                <div className="policy-details">
                  To ensure proper adhesion and keep schedules accurate, let us know in advance if you require removal of existing gel or extensions.
                </div>
              </div>

              <div className="policy-card">
                <div className="policy-card-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <h3 className="policy-title">Inspo Photos for Pricing</h3>
                </div>
                <div className="policy-summary">Send your inspiration photos on Instagram DM for pricing.</div>
                <div className="policy-details">
                  Pricing depends on the base service (GelX, BIAB, or Shellac) and your custom nail art level. Sending clear inspiration photos allows us to quote you accurately before booking.
                </div>
              </div>

              <div className="policy-card">
                <div className="policy-card-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <h3 className="policy-title">Appointment Scheduling</h3>
                </div>
                <div className="policy-summary">Appointments are scheduled exclusively via Instagram DM.</div>
                <div className="policy-details">
                  As an intimate private studio in NE Calgary, sessions are dedicated 1-on-1. Please give advance notice if you need to adjust your appointment date or time.
                </div>
              </div>

              <div className="policy-card">
                <div className="policy-card-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <h3 className="policy-title">Hygiene &amp; Cleanliness</h3>
                </div>
                <div className="policy-summary">Hospital-grade sanitization and sterilized tools.</div>
                <div className="policy-details">
                  Your safety is our top priority. All implements undergo thorough disinfection and sanitization between clients.
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div id="contact" className="contact-banner" style={{ marginTop: '3rem' }}>
              <div className="contact-grid">
                <div>
                  <div className="section-eyebrow">Connect &amp; Book</div>
                  <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Nails by Love | NE Calgary</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: '1.6' }}>
                    Private studio in NE Calgary. Address details are provided upon appointment confirmation. Send a direct message on Instagram with your inspiration photos to get pricing and arrange your booking.
                  </p>

                  <div className="contact-meta-list">
                    <div className="contact-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      <span>NE Calgary, Alberta</span>
                    </div>
                    <div className="contact-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      <span>By Appointment Only (Direct Message on Instagram)</span>
                    </div>
                    <div className="contact-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, textDecoration: 'underline' }}>
                        {INSTAGRAM_HANDLE} (Direct Messaging)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-buttons-col">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span>DM on Instagram @nailsbylove_yyc</span>
                  </a>
                  <a href="#services" className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    <span>View GelX, BIAB &amp; Shellac Services</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================================
          8. Footer
          ====================================================================== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#" className="footer-brand">Nails by Love</a>
              <p className="footer-desc">
                Private 1-on-1 nail studio in NE Calgary. Specializing in GelX, BIAB, and Shellac with custom pricing tailored to your inspiration photos.
              </p>
              <div className="footer-social-links">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span>Instagram @nailsbylove_yyc</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Studio Services</h4>
              <ul className="footer-links-list">
                <li><a href="#services">GelX Full Set</a></li>
                <li><a href="#services">BIAB Natural Overlay</a></li>
                <li><a href="#services">Shellac Gel Manicure</a></li>
                <li><a href="#portfolio">Lookbook Portfolio</a></li>
                <li><a href="#policies">Studio Policies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Studio Location</h4>
              <div className="footer-location-info">
                <p>NE Calgary, Alberta</p>
                <p style={{ color: 'var(--color-taupe)', marginTop: '0.5rem' }}>
                  By Appointment Only
                </p>
                <p style={{ fontSize: '0.72rem', color: '#7E726A', marginTop: '0.35rem' }}>
                  Bookings &amp; pricing handled via Instagram DM: @nailsbylove_yyc
                </p>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p>© 2026 Nails by Love | NE Calgary. All rights reserved.</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-top"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
          </div>
        </div>
      </footer>

      {/* ======================================================================
          9. Modals (Lightbox & Summary)
          ====================================================================== */}
      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label="Nail Set Details">
          <div className="modal-content-box">
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="modal-close-btn"
              aria-label="Close dialog"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="modal-inner-grid">
              <div className="modal-img-col">
                <img src={activeModalItem.image} alt={activeModalItem.title} />
              </div>
              <div className="modal-info-col">
                <div>
                  <div className="section-eyebrow" style={{ color: 'var(--color-taupe)', marginBottom: '0.25rem' }}>
                    {activeModalItem.categoryLabel}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
                    {activeModalItem.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {activeModalItem.description}
                  </p>

                  <div style={{ borderTop: '1px solid var(--color-sand)', paddingTop: '0.75rem' }}>
                    <div className="modal-spec-row">
                      <span className="spec-label">Shape:</span>
                      <span className="spec-val">{activeModalItem.shape}</span>
                    </div>
                    <div className="modal-spec-row">
                      <span className="spec-label">Length:</span>
                      <span className="spec-val">{activeModalItem.length}</span>
                    </div>
                    <div className="modal-spec-row" style={{ flexDirection: 'column', gap: '0.25rem' }}>
                      <span className="spec-label">Technique &amp; Style:</span>
                      <span className="spec-val" style={{ marginTop: '0.15rem' }}>{activeModalItem.technique}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid var(--color-sand)' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setFormNotes(`Inquiry style: ${activeModalItem.title} (${activeModalItem.shape})`);
                      setActiveModalItem(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                    style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>Request This Look in DM</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instagram DM Summary Modal */}
      {summaryModalOpen && (
        <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label="Appointment Summary Ready">
          <div className="modal-content-box" style={{ maxWidth: '520px', padding: '2rem' }}>
            <button
              type="button"
              onClick={() => setSummaryModalOpen(false)}
              className="modal-close-btn"
              aria-label="Close dialog"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="section-eyebrow" style={{ color: 'var(--color-taupe)', marginBottom: '0.25rem' }}>
              Inquiry Prepared
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-espresso)', marginBottom: '0.65rem' }}>
              Your Instagram DM Message is Ready
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Copy this summary and paste it directly into a direct message to <strong>@nailsbylove_yyc</strong> on Instagram. Don't forget to attach your inspiration photos!
            </p>

            <div style={{ backgroundColor: 'var(--color-ivory)', border: '1px solid var(--color-sand)', padding: '1rem', borderRadius: '2px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div className="modal-spec-row"><span className="spec-label">Client Name:</span><span className="spec-val">{formName || 'Jessica'}</span></div>
              <div className="modal-spec-row"><span className="spec-label">Instagram:</span><span className="spec-val">{formInstagram || '@yourhandle'}</span></div>
              <div className="modal-spec-row"><span className="spec-label">Service:</span><span className="spec-val">{formService}</span></div>
              <div className="modal-spec-row"><span className="spec-label">Shape &amp; Length:</span><span className="spec-val">{formShape} · {formLength}</span></div>
              <div className="modal-spec-row"><span className="spec-label">Time Window:</span><span className="spec-val">{formPreferredWindow}</span></div>
              <div style={{ fontSize: '0.75rem' }}><span className="spec-label" style={{ display: 'block', marginBottom: '0.2rem' }}>Design &amp; Notes:</span><span className="spec-val" style={{ fontStyle: 'italic' }}>{formNotes || 'Sending inspiration photos in DM!'}</span></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={handleCopySummary}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {hasCopied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#059669' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span style={{ color: '#059669' }}>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy Message for Instagram DM</span>
                  </>
                )}
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
              >
                <span>Open Instagram @nailsbylove_yyc</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice show">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
