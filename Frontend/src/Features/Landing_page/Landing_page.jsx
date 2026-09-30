import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Landing_page.css";
import axios from "axios";
import {
  Sparkles,
  ArrowRight,
  Upload,
  CheckCircle2,
  Star,
  ShieldCheck,
  Zap,
  Layers,
  Code2,
  BrainCircuit,
  Compass,
  FileText,
  BarChart3,
  MessageSquare,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Briefcase,
  Award,
  Clock,
  Quote,
  Check,
  TrendingUp,
  Sliders,
  Target,
  Mail,
  Phone,
  MapPin,
  Flame
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Demo Tab State
  const [activeTab, setActiveTab] = useState("technical");
  const [openDemoAccordion, setOpenDemoAccordion] = useState(0);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(0);

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ state: "loading", message: "Sending your message..." });

    const payload = { name, email, subject, message };

    try {
      const response = await axios.post("http://localhost:8000/api/auth/contact", payload);
      setFormStatus({
        state: "success",
        message: response?.data?.message || "Thank you! Your message has been sent successfully."
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setFormStatus({
        state: "error",
        message:
          err.response?.data?.message ||
          "Could not connect to backend server right now. Message noted!"
      });
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus(false), 4000);
    }
  };

  const demoData = {
    technical: [
      {
        question: "How would you design a distributed caching layer using Redis to avoid cache stampede & cache penetration?",
        intention: "Assess deep concurrency knowledge, distributed systems reliability patterns (Mutex locks, probabilistic early expiration), and bloom filters for missing keys.",
        answer: "To handle cache stampede (thundering herd), I implement mutual exclusion via Redis distributed locks with exponential backoff or Probabilistic Early Expiration (XFetch algorithm). For cache penetration, I place a Bloom filter in front of Redis and cache null values with short TTLs."
      },
      {
        question: "Explain the internal event loop phases in Node.js and how process.nextTick() behaves relative to Promise microtasks.",
        intention: "Evaluates your runtime architecture comprehension and ability to debug asynchronous race conditions and memory performance.",
        answer: "The Node.js event loop consists of Timers, Pending Callbacks, Idle/Prepare, Poll, Check (setImmediate), and Close callbacks. process.nextTick() queue is processed immediately after the current operation finishes before any other microtask or macro phase transition."
      }
    ],
    behavioral: [
      {
        question: "Describe a high-stakes production incident you led and how you handled team communication.",
        situation: "During Black Friday deployment, an un-indexed query spike caused 99.9th percentile latency to shoot to 14s.",
        task: "Restore latency to <150ms within 20 minutes without dropping live payment transactions.",
        action: "Initiated war-room, rolled back the canary release immediately, published 10-minute status cadence to stakeholders, and staged a hotfix with targeted DB indexing.",
        result: "Zero customer cart drops, full recovery in 14 minutes, followed by a blameless post-mortem that introduced mandatory query EXPLAIN linter in CI/CD."
      }
    ],
    roadmap: [
      {
        day: "Day 01 - 02",
        focus: "System Architecture & High-Scale Caching",
        tasks: ["Redis locking strategies & cache stampede drills", "Sharding & replication failure recovery scenarios", "Mock design: 10M concurrent users notifications"]
      },
      {
        day: "Day 03 - 04",
        focus: "Core Framework Deep Dive & Concurrency",
        tasks: ["Node.js / Go concurrency models & memory profiling", "Database index optimization (B-Tree vs LSM trees)", "API rate limiting & token bucket algorithms"]
      },
      {
        day: "Day 05 - 07",
        focus: "Executive Behavioral & Live Mock Rounds",
        tasks: ["5 STAR stories structured on leadership & incident management", "Salary negotiation framing & questions for hiring manager", "Full simulated 45-minute timed interview drill"]
      }
    ],
    score: {
      overall: 92,
      skills: [
        { name: "Distributed Systems", score: 95, level: "Advanced" },
        { name: "Database Optimization", score: 88, level: "Proficient" },
        { name: "Incident Leadership", score: 94, level: "Mastery" },
        { name: "Cloud Infrastructure (AWS/K8s)", score: 82, level: "Growth Area" }
      ]
    }
  };

  const faqs = [
    {
      q: "How does PrepAI analyze my resume and target job role?",
      a: "PrepAI uses advanced LLM intelligence to cross-reference your specific technical projects, years of experience, and tech stack against the exact requirements and seniority expectations of your target job description. It generates tailored questions you are 90%+ likely to be asked."
    },
    {
      q: "What file formats can I upload?",
      a: "We support PDF and DOCX documents up to 10MB. Our intelligent parser strips formatting noise and extracts structured work experience, skill matrices, and project outcomes instantly."
    },
    {
      q: "What makes the 'Recruiter Intention' feature so unique?",
      a: "Most candidates fail interviews because they answer what was asked instead of what the interviewer is evaluating. Intention Decoders explain what hiring managers look for—whether it's code scalability, tradeoff awareness, or cultural leadership."
    },
    {
      q: "Can I customize my preparation timeframe?",
      a: "Yes! PrepAI dynamically structures daily learning goals whether you have 3 days for a fast-track interview loop or 3 weeks for an exhaustive FAANG onsite cycle."
    },
    {
      q: "Is my resume information safe and private?",
      a: "Absolutely. We do not sell your personal data or share your resume with external recruiters. Your documents are securely processed with end-to-end encryption."
    }
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Senior Software Engineer",
      company: "Ex-Stripe Offer",
      avatar: "AR",
      quote: "The recruiter intention breakdown was a game changer. I stopped giving textbook answers and spoke directly to architectural tradeoffs. Landed an L5 offer within 2 weeks!",
      highlight: "Landed $240k Offer"
    },
    {
      name: "Priya Sharma",
      role: "Full-Stack Developer",
      company: "Fintech Unicorn",
      avatar: "PS",
      quote: "The 7-Day customized roadmap saved me dozens of hours. Instead of wandering aimlessly across LeetCode, I focused strictly on the gaps between my resume and the JD.",
      highlight: "10x Faster Prep"
    },
    {
      name: "David Chen",
      role: "Engineering Manager",
      company: "Cloud Scale AI",
      avatar: "DC",
      quote: "The STAR format answers generated from my actual previous projects were insanely sharp. It helped me articulate my team leadership metrics with crisp clarity.",
      highlight: "3 Offers in 1 Month"
    }
  ];

  return (
    <div className="landing-root">
      {/* Background Decorative Glows */}
      <div className="glow-mesh glow-1" />
      <div className="glow-mesh glow-2" />
      <div className="glow-mesh glow-3" />

      {/* =========================
          NAVBAR
      ========================= */}
      <header className="navbar-wrapper">
        <nav className="navbar-container">
          <Link to="/" className="brand-logo">
            <div className="brand-icon-box">
              <Sparkles size={20} className="brand-sparkle" />
            </div>
            <span className="brand-title">
              Prep<span className="gradient-text">AI</span>
            </span>
            <span className="brand-pill">v2.0</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop">
            <a href="#features" className="nav-link">Features</a>
            <a href="#preview" className="nav-link">Live Preview</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#testimonials" className="nav-link">Success Stories</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Nav CTA Buttons */}
          <div className="nav-actions-desktop">
            <Link to="/login" className="btn-nav-secondary">
              Sign In
            </Link>
            <Link to="/register" className="btn-nav-primary">
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)}>Live Preview</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
            <div className="mobile-drawer-actions">
              <Link to="/login" className="btn-mobile-secondary">Sign In</Link>
              <Link to="/register" className="btn-mobile-primary">Get Started Free</Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge animate-fade-in">
            <span className="hero-badge-dot" />
            <Sparkles size={15} className="hero-badge-icon" />
            <span>AI-POWERED INTERVIEW INTELLIGENCE 2.0</span>
            <span className="hero-badge-tag">94% Success</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            Ace Technical & Behavioral Rounds.
            <br />
            <span className="gradient-hero-text">
              Land Your Dream Tech Role.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="hero-subtext">
            Upload your resume and target Job Description for instant AI-driven
            question predictions, recruiter intention breakdowns, STAR model answers,
            and a day-by-day tailored roadmap in under 30 seconds.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <Link to="/register" className="btn-hero-primary">
              <span>Generate Your Prep Plan</span>
              <ArrowRight size={20} className="btn-icon-right" />
            </Link>

            <a href="#preview" className="btn-hero-secondary">
              <span>Explore Interactive Demo</span>
            </a>
          </div>

          {/* Hero Social Proof Metrics */}
          <div className="hero-proof-bar">
            <div className="proof-item">
              <div className="proof-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="proof-label"><strong>4.9/5</strong> from 15,000+ engineers</span>
            </div>

            <div className="proof-divider" />

            <div className="proof-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span className="proof-label">Tailored for FAANG, Startups & Global Tech</span>
            </div>

            <div className="proof-divider" />

            <div className="proof-item">
              <ShieldCheck size={16} className="text-indigo" />
              <span className="proof-label">No Credit Card Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          INTERACTIVE LIVE PREVIEW / DEMO
      ==================================== */}
      <section className="preview-section" id="preview">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>INTERACTIVE REPORT DEMO</span>
          </div>
          <h2 className="section-title">
            See How <span className="gradient-text">PrepAI Generates</span> Your Report
          </h2>
          <p className="section-subtitle">
            Toggle between report modules to preview what your personalized AI interview battle-kit looks like.
          </p>
        </div>

        <div className="mockup-window-card">
          {/* Mockup Header Bar */}
          <div className="mockup-header-bar">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="mockup-address">
              <span>https://prepai.io/interview/report-live-preview</span>
            </div>
            <div className="mockup-badge">
              <Zap size={13} className="text-amber" />
              <span>AI Analysis Complete</span>
            </div>
          </div>

          {/* Mockup Tab Selectors */}
          <div className="mockup-tabs">
            <button
              className={`mockup-tab ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              <Code2 size={16} />
              <span>Technical Questions</span>
              <span className="tab-pill">12 Questions</span>
            </button>

            <button
              className={`mockup-tab ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("behavioral")}
            >
              <BrainCircuit size={16} />
              <span>Behavioral STAR</span>
              <span className="tab-pill">STAR Method</span>
            </button>

            <button
              className={`mockup-tab ${activeTab === "roadmap" ? "active" : ""}`}
              onClick={() => setActiveTab("roadmap")}
            >
              <Compass size={16} />
              <span>7-Day Roadmap</span>
              <span className="tab-pill">Personalized</span>
            </button>

            <button
              className={`mockup-tab ${activeTab === "score" ? "active" : ""}`}
              onClick={() => setActiveTab("score")}
            >
              <BarChart3 size={16} />
              <span>Skill Gap & Score</span>
              <span className="tab-pill tab-pill-green">92% Match</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="mockup-viewport">
            {activeTab === "technical" && (
              <div className="demo-technical-panel">
                {demoData.technical.map((item, idx) => {
                  const isOpen = openDemoAccordion === idx;
                  return (
                    <div key={idx} className={`demo-q-card ${isOpen ? "open" : ""}`}>
                      <div
                        className="demo-q-header"
                        onClick={() => setOpenDemoAccordion(isOpen ? -1 : idx)}
                      >
                        <span className="demo-q-num">Q{idx + 1}</span>
                        <h4 className="demo-q-title">{item.question}</h4>
                        <span className="demo-chevron">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </div>

                      {isOpen && (
                        <div className="demo-q-body">
                          <div className="demo-subblock intention-block">
                            <div className="demo-badge-tag tag-intention">
                              <Target size={13} />
                              <span>Interviewer's Hidden Intention</span>
                            </div>
                            <p>{item.intention}</p>
                          </div>

                          <div className="demo-subblock answer-block">
                            <div className="demo-badge-tag tag-answer">
                              <Check size={13} />
                              <span>Model Answer (Engineered for Impact)</span>
                            </div>
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "behavioral" && (
              <div className="demo-behavioral-panel">
                {demoData.behavioral.map((item, idx) => (
                  <div key={idx} className="demo-star-card">
                    <div className="star-question-header">
                      <span className="star-pill">Leadership & Conflict</span>
                      <h3>{item.question}</h3>
                    </div>

                    <div className="star-grid">
                      <div className="star-item">
                        <div className="star-letter s">S</div>
                        <div>
                          <h5>Situation</h5>
                          <p>{item.situation}</p>
                        </div>
                      </div>

                      <div className="star-item">
                        <div className="star-letter t">T</div>
                        <div>
                          <h5>Task</h5>
                          <p>{item.task}</p>
                        </div>
                      </div>

                      <div className="star-item">
                        <div className="star-letter a">A</div>
                        <div>
                          <h5>Action</h5>
                          <p>{item.action}</p>
                        </div>
                      </div>

                      <div className="star-item">
                        <div className="star-letter r">R</div>
                        <div>
                          <h5>Result</h5>
                          <p>{item.result}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="demo-roadmap-panel">
                <div className="roadmap-grid">
                  {demoData.roadmap.map((day, idx) => (
                    <div key={idx} className="roadmap-card">
                      <div className="roadmap-day-tag">
                        <Clock size={14} />
                        <span>{day.day}</span>
                      </div>
                      <h4>{day.focus}</h4>
                      <ul className="roadmap-task-list">
                        {day.tasks.map((task, tidx) => (
                          <li key={tidx}>
                            <CheckCircle2 size={15} className="text-emerald" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "score" && (
              <div className="demo-score-panel">
                <div className="score-top-grid">
                  <div className="score-circle-card">
                    <div className="score-ring">
                      <span className="score-number">{demoData.score.overall}%</span>
                      <span className="score-sub">JD Match</span>
                    </div>
                    <h4>Strong Hire Probability</h4>
                    <p>Based on 40+ competence checkpoints extracted from your resume.</p>
                  </div>

                  <div className="score-breakdown-list">
                    <h4>Competency Radar</h4>
                    {demoData.score.skills.map((skill, sidx) => (
                      <div key={sidx} className="skill-meter-row">
                        <div className="meter-info">
                          <span>{skill.name}</span>
                          <span className="meter-badge">{skill.level} ({skill.score}%)</span>
                        </div>
                        <div className="meter-bar-track">
                          <div
                            className="meter-bar-fill"
                            style={{ width: `${skill.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mockup Footer Callout */}
          <div className="mockup-footer-cta">
            <div className="mockup-footer-text">
              <Sparkles size={18} className="text-indigo" />
              <span>Ready to generate your custom interview intelligence report?</span>
            </div>
            <Link to="/register" className="btn-mockup-action">
              <span>Start Free Now</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================
          CORE FEATURES GRID
      ==================================== */}
      <section className="features-section" id="features">
        <div className="section-header">
          <div className="section-tag">
            <Zap size={14} />
            <span>INTELLIGENCE SUITE</span>
          </div>
          <h2 className="section-title">
            Engineered For Candidates Who <span className="gradient-text">Refuse To Settle</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to predict interviewer behavior, communicate complex systems, and leave zero doubt about your competence.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-box box-purple">
              <FileText size={24} />
            </div>
            <span className="feature-badge">Instant Precision</span>
            <h3>Resume & JD Parser</h3>
            <p>
              Upload your resume and paste any job spec. Our AI scans 40+ dimensions
              to extract deep overlap, seniority expectations, and tech stack alignment.
            </p>
            <div className="feature-footer-tags">
              <span>PDF/DOCX Parser</span>
              <span>Tech Stack Matrix</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-box box-cyan">
              <Target size={24} />
            </div>
            <span className="feature-badge">Recruiter Insight</span>
            <h3>Hidden Intention Decoders</h3>
            <p>
              Understand why an interviewer is asking a question. Decode whether they
              are testing architectural tradeoffs, leadership maturity, or edge-case rigor.
            </p>
            <div className="feature-footer-tags">
              <span>Tradeoff Analysis</span>
              <span>Hiring Criteria</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-box box-emerald">
              <CheckCircle2 size={24} />
            </div>
            <span className="feature-badge">High Impact</span>
            <h3>STAR Model Answers</h3>
            <p>
              Get production-grade model answers structured around your actual past
              projects. Master the STAR technique with clear business metrics and outcomes.
            </p>
            <div className="feature-footer-tags">
              <span>STAR Method</span>
              <span>Metric-Driven</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-box box-amber">
              <Compass size={24} />
            </div>
            <span className="feature-badge">Actionable Plan</span>
            <h3>Day-by-Day Battle Roadmap</h3>
            <p>
              No more guessing what to study next. Receive a personalized, structured
              study calendar that guides you from Day 1 fundamentals through final mock drills.
            </p>
            <div className="feature-footer-tags">
              <span>Custom Timeline</span>
              <span>Daily Milestones</span>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon-box box-pink">
              <BarChart3 size={24} />
            </div>
            <span className="feature-badge">Gap Diagnosis</span>
            <h3>Skill Gap & Readiness Score</h3>
            <p>
              Spot your weak spots before the interviewer does. Get a granular match
              percentage and actionable fast-track recommendations to bridge knowledge gaps.
            </p>
            <div className="feature-footer-tags">
              <span>Readiness %</span>
              <span>Targeted Fixes</span>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon-box box-blue">
              <ShieldCheck size={24} />
            </div>
            <span className="feature-badge">100% Confidential</span>
            <h3>Private & Encrypted</h3>
            <p>
              Your career history and interview data belong solely to you. Processed with
              enterprise-grade encryption and never shared with third-party recruiters.
            </p>
            <div className="feature-footer-tags">
              <span>End-to-End Secure</span>
              <span>Zero Data Selling</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          HOW IT WORKS (4 STEPS)
      ==================================== */}
      <section className="steps-section" id="how-it-works">
        <div className="section-header">
          <div className="section-tag">
            <Flame size={14} />
            <span>SIMPLE PROCESS</span>
          </div>
          <h2 className="section-title">
            From Resume To Offer <span className="gradient-text">In 4 Easy Steps</span>
          </h2>
          <p className="section-subtitle">
            A frictionless workflow designed to save you weeks of unfocused prep time.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-num-badge">01</div>
            <div className="step-icon-circle">
              <Briefcase size={22} />
            </div>
            <h4>Create Account</h4>
            <p>Sign up in 30 seconds. No credit card required. Instant access to your prep workspace.</p>
          </div>

          <div className="step-arrow-divider">
            <ArrowRight size={20} />
          </div>

          <div className="step-card">
            <div className="step-num-badge">02</div>
            <div className="step-icon-circle">
              <Upload size={22} />
            </div>
            <h4>Upload Resume & JD</h4>
            <p>Drop your PDF/DOCX resume and paste the target job description or role requirements.</p>
          </div>

          <div className="step-arrow-divider">
            <ArrowRight size={20} />
          </div>

          <div className="step-card">
            <div className="step-num-badge">03</div>
            <div className="step-icon-circle">
              <BrainCircuit size={22} />
            </div>
            <h4>AI Deep Scan</h4>
            <p>Our engine maps competencies, crafts tailor-made questions, and builds your custom daily plan.</p>
          </div>

          <div className="step-arrow-divider">
            <ArrowRight size={20} />
          </div>

          <div className="step-card">
            <div className="step-num-badge">04</div>
            <div className="step-icon-circle">
              <Award size={22} />
            </div>
            <h4>Practice & Ace It</h4>
            <p>Master the recruiter intention behind every question, practice model answers, and get hired.</p>
          </div>
        </div>

        <div className="steps-cta-center">
          <Link to="/register" className="btn-hero-primary">
            <span>Start Your 4-Step Prep Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ====================================
          METRICS & PROOF BANNER
      ==================================== */}
      <section className="metrics-section" id="metrics">
        <div className="metrics-glass-card">
          <div className="metric-stat-box">
            <span className="metric-number">15k+</span>
            <span className="metric-title">Interviews Prepped</span>
            <p className="metric-desc">Candidates prepared across 40+ countries</p>
          </div>

          <div className="metric-divider" />

          <div className="metric-stat-box">
            <span className="metric-number">94%</span>
            <span className="metric-title">Offer Success Rate</span>
            <p className="metric-desc">Reported by active PrepAI candidates</p>
          </div>

          <div className="metric-divider" />

          <div className="metric-stat-box">
            <span className="metric-number">&lt;30s</span>
            <span className="metric-title">Generation Speed</span>
            <p className="metric-desc">Instant deep AI report synthesis</p>
          </div>

          <div className="metric-divider" />

          <div className="metric-stat-box">
            <span className="metric-number">3.5x</span>
            <span className="metric-title">Faster Preparation</span>
            <p className="metric-desc">Compared to traditional manual research</p>
          </div>
        </div>
      </section>

      {/* ====================================
          TESTIMONIALS / SOCIAL PROOF
      ==================================== */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header">
          <div className="section-tag">
            <Star size={14} />
            <span>COMMUNITY FEEDBACK</span>
          </div>
          <h2 className="section-title">
            Loved By <span className="gradient-text">Top Engineers & Leaders</span>
          </h2>
          <p className="section-subtitle">
            See how candidates used PrepAI to transition into high-paying roles at world-class companies.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-top">
                <div className="user-avatar-circle">{t.avatar}</div>
                <div className="user-meta">
                  <h4>{t.name}</h4>
                  <span>{t.role} • <strong className="text-indigo">{t.company}</strong></span>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(5)].map((_, rIdx) => (
                  <Star key={rIdx} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
                <span className="highlight-tag">{t.highlight}</span>
              </div>

              <p className="testimonial-quote">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================
          FAQ SECTION
      ==================================== */}
      <section className="faq-section" id="faq">
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>HAVE QUESTIONS?</span>
          </div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about PrepAI, accuracy, and preparation workflows.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => setActiveFaq(isOpen ? -1 : idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================
          CONTACT US SECTION
      ==================================== */}
      <section className="contact-section" id="contact">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="section-title">
            Have Questions or Need <span className="gradient-text">Enterprise Support?</span>
          </h2>
          <p className="section-subtitle">
            Our team of engineering leaders and support specialists is ready to help you.
          </p>
        </div>

        <div className="contact-box-container">
          {/* Info Side */}
          <div className="contact-info-panel">
            <div className="contact-info-header">
              <span className="contact-accent-badge">Direct Contact</span>
              <h3>Let's Connect</h3>
              <p>
                Whether you have product feedback, feature requests, or university/enterprise partnerships, we'd love to hear from you.
              </p>
            </div>

            <div className="contact-points">
              <div className="contact-point-item">
                <div className="point-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h5>Email Support</h5>
                  <p>support@prepai.io</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="point-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h5>Phone & WhatsApp</h5>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-point-item">
                <div className="point-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5>HQ Location</h5>
                  <p>Kanpur, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>

            <div className="contact-guarantee-card">
              <Zap size={18} className="text-amber" />
              <div>
                <h6>Typical Response Time</h6>
                <span>We typically respond to candidates and queries in &lt; 2 hours.</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-panel">
            <h3>Send Us a Message</h3>

            {formStatus.state === "success" && (
              <div className="form-alert alert-success">
                <CheckCircle2 size={18} />
                <span>{formStatus.message}</span>
              </div>
            )}

            {formStatus.state === "error" && (
              <div className="form-alert alert-error">
                <HelpCircle size={18} />
                <span>{formStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="contact-form-grid">
              <div className="input-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priyanshu Sahu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Your Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Subject *</label>
                <input
                  type="text"
                  placeholder="e.g. Feature request / Partnership / Feedback"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Your Message *</label>
                <textarea
                  rows="5"
                  placeholder="Write your thoughts or questions here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-form-submit"
                disabled={formStatus.state === "loading"}
              >
                {formStatus.state === "loading" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================
          FINAL CTA HERO BANNER
      ==================================== */}
      <section className="cta-banner-section">
        <div className="cta-banner-inner">
          <div className="cta-banner-badge">
            <Sparkles size={14} />
            <span>START PREPARING TODAY</span>
          </div>
          <h2>Ready To Turn Your Next Interview Into A Dream Job Offer?</h2>
          <p>
            Join 15,000+ ambitious developers, product managers, and leaders who prep with intelligence, not guesswork.
          </p>
          <div className="cta-banner-buttons">
            <Link to="/register" className="btn-cta-white">
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-cta-outline">
              <span>Sign In To Existing Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================
          FOOTER
      ==================================== */}
      <footer className="footer-root">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo footer-logo">
              <div className="brand-icon-box">
                <Sparkles size={18} />
              </div>
              <span className="brand-title">
                Prep<span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="footer-tagline">
              The premier AI-powered interview intelligence platform. Transforming resumes and job specs into winning interview preparation.
            </p>
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Code2 size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Briefcase size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Feature Suite</a></li>
              <li><a href="#preview">Interactive Demo</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#metrics">Success Metrics</a></li>
              <li><Link to="/generate-report">Generate Report</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#testimonials">Success Stories</a></li>
              <li><a href="#faq">Interview FAQ</a></li>
              <li><Link to="/login">Candidate Portal</Link></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h4>Stay Updated</h4>
            <p>Get weekly curated tech interview questions, STAR templates, and engineering roadmap tips.</p>
            {newsletterStatus ? (
              <div className="newsletter-success">
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PrepAI Inc. All rights reserved. Built for top tech candidates.</p>
          <div className="footer-legal-links">
            <a href="#hero">Privacy Policy</a>
            <span>•</span>
            <a href="#hero">Terms of Service</a>
            <span>•</span>
            <a href="#hero">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;