import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/pages/Index.css";

// Module-level tracker — survives localStorage.clear() within the same tab session
const _inMemorySends: Record<string, number[]> = {};
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour
const RATE_LIMIT_MAX = 2;

function getRecentSends(addr: string): number[] {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  // Merge in-memory + localStorage, filter to recent window
  const stored: number[] = (() => {
    try { return JSON.parse(localStorage.getItem("magicLinkSends") || "{}")[addr] ?? []; }
    catch { return []; }
  })();
  const memory = _inMemorySends[addr] ?? [];
  return [...new Set([...stored, ...memory])].filter(t => t > cutoff);
}

function recordSend(addr: string): void {
  const now = Date.now();
  // Write to both stores so both layers have the record
  _inMemorySends[addr] = [...(getRecentSends(addr)), now];
  try {
    const map = JSON.parse(localStorage.getItem("magicLinkSends") || "{}");
    map[addr] = _inMemorySends[addr];
    localStorage.setItem("magicLinkSends", JSON.stringify(map));
  } catch { /* non-fatal */ }
}

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const wrapRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    (location.state as any)?.error === "no-access"
      ? { text: "This account doesn't have access. Purchase a membership to get in.", type: "error" }
      : null
  );

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

  // Remove sidebar body padding — this page has no sidebar
  useEffect(() => {
    document.body.style.setProperty('padding-left', '0', 'important');
    return () => { document.body.style.removeProperty('padding-left'); };
  }, []);

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    if (type === "success" && wrapRef.current) {
      wrapRef.current.classList.add("success");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (getRecentSends(email).length >= RATE_LIMIT_MAX) {
      showMessage("You have reached the limit of 2 magic-link emails per hour. Please wait or contact support.", "error");
      return;
    }
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectUrl } });
      if (error) throw error;
      recordSend(email);
      showMessage("✦ Check your email for a magic login link!", "success");
      setEmail("");
    } catch (err: any) {
      showMessage(err.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectUrl } });
      if (error) throw error;
    } catch (err: any) {
      showMessage(err.message || "Google sign-in failed. Please try again.", "error");
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, nofollow" />
  <title>Login - 925 ADHD</title>
  {/* PWA Meta Tags */}
  <link rel="manifest" href="manifest.json" />
  <meta name="theme-color" content="#0a0a0f" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <meta name="apple-mobile-web-app-title" content="925 ADHD" />
  <link
    rel="apple-touch-icon"
    href="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png"
  />
  {/* Favicon */}
  <link
    rel="icon"
    type="image/png"
    href="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png"
  />
  {/* Fonts */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <div className="login-page">
  <div className="card-wrapper" ref={wrapRef}>
    <div className="login-card">
      {/* Holographic effect layers */}
      <div className="card-shine" />
      <div className="card-glare" />
      <div className="card-sparkle" />
      <div className="card-border" />
      {/* Content */}
      <div className="card-inner">
        <div className="card-content">
          <div className="card-header">
            <div className="logo-container">
              <div className="logo-glow" />
              <div className="logo">
                <img
                  src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/SmartSelect_20241218_055052_Gallery.png"
                  alt="925 ADHD"
                />
              </div>
            </div>
            <h1>925 ADHD</h1>
            <p className="subtitle">
              Your portal to ADHD-friendly income.
              <br />
              Unlock your dashboard below.
            </p>
          </div>
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="card-content" style={{ gap: 16 }}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span><span className="loading" /> Sending...</span>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <button className="btn btn-google" onClick={handleGoogle}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>
          <p className="signup-link">
            Don't have an account?{" "}
            <a href="https://buy.stripe.com/28E3cw1B33logABev67Zu02">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</>
  );
}
