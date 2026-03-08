import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard", { replace: true });
    });
  }, [navigate]);

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

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
    const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
    const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
      round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

    function ease(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function easedAnimation(ms: number, onProgress: (p: number) => void, onComplete?: () => void) {
      const start = performance.now();
      let canceled = false;
      (function loop() {
        if (canceled) return;
        const p = Math.min((performance.now() - start) / ms, 1);
        onProgress(ease(p));
        if (p < 1) requestAnimationFrame(loop);
        else onComplete?.();
      })();
      return { cancel: () => { canceled = true; } };
    }

    const update = (e: { clientX: number; clientY: number }) => {
      const r = card.getBoundingClientRect();
      const px = clamp((100 / r.width) * (e.clientX - r.left));
      const py = clamp((100 / r.height) * (e.clientY - r.top));
      const cx = px - 50, cy = py - 50;
      wrap.style.setProperty("--pointer-x", `${px}%`);
      wrap.style.setProperty("--pointer-y", `${py}%`);
      wrap.style.setProperty("--background-x", `${adjust(px, 0, 100, 35, 65)}%`);
      wrap.style.setProperty("--background-y", `${adjust(py, 0, 100, 35, 65)}%`);
      wrap.style.setProperty("--pointer-from-center", `${clamp(Math.sqrt(cy * cy + cx * cx) / 50, 0, 1)}`);
      wrap.style.setProperty("--pointer-from-top", `${py / 100}`);
      wrap.style.setProperty("--pointer-from-left", `${px / 100}`);
      wrap.style.setProperty("--rotate-x", `${round(-(cx / 3.5))}deg`);
      wrap.style.setProperty("--rotate-y", `${round(cy / 4)}deg`);
    };

    let easer: { cancel(): void } | null = null;
    const halfW = () => card.clientWidth / 2;
    const halfH = () => card.clientHeight / 2;

    const onEnter = () => { easer?.cancel(); card.classList.add("active"); wrap.classList.add("active"); };
    const onMove = (e: PointerEvent) => update(e);
    const onLeave = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const sx = e.clientX - r.left, sy = e.clientY - r.top;
      easer = easedAnimation(800, p => update({
        clientX: r.left + adjust(p, 0, 1, sx, halfW()),
        clientY: r.top + adjust(p, 0, 1, sy, halfH()),
      }), () => { card.classList.remove("active"); wrap.classList.remove("active"); });
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    const t = setTimeout(() => {
      const r = card.getBoundingClientRect();
      wrap.classList.add("active"); card.classList.add("active");
      easedAnimation(2000, p => update({
        clientX: r.left + adjust(p, 0, 1, r.width - 50, halfW()),
        clientY: r.top + adjust(p, 0, 1, 50, halfH()),
      }), () => { card.classList.remove("active"); wrap.classList.remove("active"); });
    }, 500);

    return () => {
      clearTimeout(t);
      easer?.cancel();
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

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
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    :root {\n      /* Pointer tracking vars */\n      --pointer-x: 50%;\n      --pointer-y: 50%;\n      --pointer-from-center: 0;\n      --pointer-from-top: 0.5;\n      --pointer-from-left: 0.5;\n      --card-opacity: 0;\n      --rotate-x: 0deg;\n      --rotate-y: 0deg;\n      --background-x: 50%;\n      --background-y: 50%;\n      \n      /* Brand colors */\n      --teal: #56C3AE;\n      --teal-light: #7EE0D6;\n      --teal-glow: #56C3AE;\n      --purple: #A855F7;\n      --pink: #EC4899;\n      --blue: #3B82F6;\n      --dark: #0a0a0f;\n      --card-bg: #1a1a24;\n      \n      /* Holographic spectrum - teal/purple/pink focused */\n      --holo-1: #56C3AE;\n      --holo-2: #7EE0D6;\n      --holo-3: #A855F7;\n      --holo-4: #EC4899;\n      --holo-5: #3B82F6;\n      --holo-6: #22D3EE;\n      \n      --card-radius: 24px;\n      --grain: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\");\n      --brain-pattern: url(\"/images/brainholographic.png\");\n    }\n    \n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n      /* Improve touch scrolling on mobile */\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    html {\n      /* Smooth scrolling for better mobile experience */\n      -webkit-overflow-scrolling: touch;\n      /* Prevent font size adjustments on orientation change */\n      -webkit-text-size-adjust: 100%;\n    }\n\n    body {\n      font-family: 'Outfit', system-ui, sans-font;\n      background: var(--dark);\n      min-height: 100vh;\n      min-height: 100dvh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 20px;\n      overflow-x: hidden;\n      position: relative;\n      background-size: 150px 150px;\n      background-repeat: space;\n      /* GPU acceleration for smoother animations */\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n      -webkit-backface-visibility: hidden;\n      backface-visibility: hidden;\n      -webkit-perspective: 1000px;\n      perspective: 1000px;\n    }\n    \n    /* Animated background */\n    body::before {\n      content: '';\n      position: fixed;\n      inset: 0;\n      background:\n        radial-gradient(ellipse 80% 50% at 20% 40%, rgba(86, 195, 174, 0.15) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 80% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),\n        radial-gradient(ellipse 40% 60% at 50% 100%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);\n      pointer-events: none;\n      animation: bgPulse 8s ease-in-out infinite;\n      will-change: opacity;\n      -webkit-backface-visibility: hidden;\n      backface-visibility: hidden;\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n    \n    @keyframes bgPulse {\n      0%, 100% { opacity: 1; }\n      50% { opacity: 0.7; }\n    }\n    \n    /* Floating particles */\n    .particles {\n      position: fixed;\n      inset: 0;\n      pointer-events: none;\n      overflow: hidden;\n      contain: layout style paint;\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n    }\n\n    .particle {\n      position: absolute;\n      width: 4px;\n      height: 4px;\n      background: var(--teal);\n      border-radius: 50%;\n      opacity: 0;\n      animation: float 15s infinite;\n      will-change: transform, opacity;\n      -webkit-backface-visibility: hidden;\n      backface-visibility: hidden;\n      contain: layout style paint;\n    }\n    \n    .particle:nth-child(1) { left: 10%; animation-delay: 0s; background: var(--teal); }\n    .particle:nth-child(2) { left: 20%; animation-delay: 2s; background: var(--purple); }\n    .particle:nth-child(3) { left: 30%; animation-delay: 4s; background: var(--pink); }\n    .particle:nth-child(4) { left: 40%; animation-delay: 1s; background: var(--teal-light); }\n    .particle:nth-child(5) { left: 50%; animation-delay: 3s; background: var(--blue); }\n    .particle:nth-child(6) { left: 60%; animation-delay: 5s; background: var(--teal); }\n    .particle:nth-child(7) { left: 70%; animation-delay: 2.5s; background: var(--purple); }\n    .particle:nth-child(8) { left: 80%; animation-delay: 4.5s; background: var(--pink); }\n    .particle:nth-child(9) { left: 90%; animation-delay: 1.5s; background: var(--teal); }\n    .particle:nth-child(10) { left: 15%; animation-delay: 3.5s; background: var(--blue); }\n    \n    @keyframes float {\n      0% {\n        transform: translate3d(0, 100vh, 0) scale(0);\n        opacity: 0;\n      }\n      10% {\n        opacity: 0.6;\n      }\n      90% {\n        opacity: 0.6;\n      }\n      100% {\n        transform: translate3d(0, -100vh, 0) scale(1);\n        opacity: 0;\n      }\n    }\n    \n    /* Card wrapper with perspective */\n    .card-wrapper {\n      perspective: 1000px;\n      transform: translate3d(0, 0, 0.1px);\n      position: relative;\n      touch-action: none;\n      z-index: 10;\n    }\n    \n    /* Glow effect behind card */\n    .card-wrapper::before {\n      content: \"\";\n      position: absolute;\n      inset: -20px;\n      border-radius: var(--card-radius);\n      background: \n        radial-gradient(\n          farthest-side circle at var(--pointer-x, 50%) var(--pointer-y, 50%),\n          rgba(86, 195, 174, calc(var(--card-opacity) * 0.6)) 0%,\n          rgba(168, 85, 247, calc(var(--card-opacity) * 0.4)) 25%,\n          rgba(236, 72, 153, calc(var(--card-opacity) * 0.2)) 50%,\n          transparent 70%\n        ),\n        radial-gradient(ellipse 60% 40% at 30% 20%, rgba(86, 195, 174, 0.4) 0%, transparent 50%),\n        radial-gradient(ellipse 50% 50% at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%);\n      filter: blur(40px);\n      opacity: 0.5;\n      transition: all 0.5s ease;\n      transform: scale(0.85) translate3d(0, 0, 0.1px);\n    }\n    \n    .card-wrapper:hover::before,\n    .card-wrapper.active::before {\n      opacity: 1;\n      transform: scale(0.95) translate3d(0, 0, 0.1px);\n    }\n    \n    /* The main card */\n    .login-card {\n      width: 100%;\n      max-width: 440px;\n      min-height: 560px;\n      border-radius: var(--card-radius);\n      position: relative;\n      z-index: 2;\n      display: grid;\n      /* nearly-opaque dark background to block holographic pattern */\n      background: rgba(13, 17, 23, 0.95);\n      box-shadow:\n        0 0 0 1px rgba(255, 255, 255, 0.1),\n        0 25px 50px -12px rgba(0, 0, 0, 0.8),\n        0 0 100px -20px rgba(86, 195, 174, 0.3);\n      transition: transform 0.5s ease, box-shadow 0.5s ease;\n      transform: translate3d(0, 0, 0.1px) rotateX(0deg) rotateY(0deg);\n      will-change: transform;\n      -webkit-backface-visibility: hidden;\n      backface-visibility: hidden;\n      overflow: hidden;\n    }\n    \n    .login-card:hover,\n    .login-card.active {\n      transition: transform 0.1s ease;\n      transform: translate3d(0, 0, 0.1px) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.15),\n        rgba(0, 0, 0, 0.9) calc((var(--pointer-from-left) * 30px) - 15px) calc((var(--pointer-from-top) * 40px) - 20px) 60px -10px,\n        0 0 120px -20px rgba(86, 195, 174, 0.5);\n    }\n    \n    .login-card > * {\n      grid-area: 1 / -1;\n    }\n    \n    /* Card inner background */\n    .card-inner {\n      border-radius: var(--card-radius);\n      background: \n        linear-gradient(135deg, rgba(86, 195, 174, 0.05) 0%, transparent 50%),\n        linear-gradient(225deg, rgba(168, 85, 247, 0.05) 0%, transparent 50%),\n        var(--card-bg);\n      padding: 48px 40px;\n      position: relative;\n      z-index: 1;\n    }\n    \n    /* Holographic shine layer */\n    .card-shine {\n      position: absolute;\n      inset: 0;\n      border-radius: var(--card-radius);\n      z-index: 2;\n      pointer-events: none;\n      mix-blend-mode: color-dodge;\n      /* make the pattern barely noticeable by default with a subtle shimmer */\n      opacity: 0.06;\n      transition: opacity 0.22s ease, filter 0.22s ease;\n      \n      background: \n        repeating-linear-gradient(\n          0deg,\n          var(--holo-1) 0%,\n          var(--holo-2) 14%,\n          var(--holo-3) 28%,\n          var(--holo-4) 42%,\n          var(--holo-5) 56%,\n          var(--holo-6) 70%,\n          var(--holo-1) 84%,\n          var(--holo-2) 100%\n        ),\n        repeating-linear-gradient(\n          133deg,\n          #0e152e 0%,\n          hsl(180, 10%, 60%) 3.8%,\n          hsl(180, 29%, 66%) 4.5%,\n          hsl(180, 10%, 60%) 5.2%,\n          #0e152e 10%,\n          #0e152e 12%\n        );\n      \n      background-size: 200% 400%, 300% 300%;\n      background-position: 0% var(--background-y), var(--background-x) var(--background-y);\n      background-blend-mode: color, hard-light;\n      /* subtle default brightness; slow shimmer animation keeps it alive */\n      filter: brightness(1.15) contrast(1.2) saturate(1.3);\n      mix-blend-mode: screen;\n      animation: shimmerSlow 8s ease-in-out infinite;\n      \n      mask-image: var(--brain-pattern);\n      mask-size: 100px 100px;\n      mask-repeat: repeat;\n      mask-position: center;\n      -webkit-mask-image: var(--brain-pattern);\n      -webkit-mask-size: 100px 100px;\n      -webkit-mask-repeat: repeat;\n      -webkit-mask-position: center;\n    }\n    \n    .card-wrapper:hover .card-shine,\n    .card-wrapper.active .card-shine {\n      /* full intensity on hover/active */\n      opacity: 1;\n      animation: shimmer 3s ease-in-out infinite;\n    }\n\n    @keyframes shimmerSlow {\n      0% { filter: brightness(1.08) contrast(1.15) saturate(1.2); }\n      50% { filter: brightness(1.22) contrast(1.22) saturate(1.35); }\n      100% { filter: brightness(1.08) contrast(1.15) saturate(1.2); }\n    }\n    \n    @keyframes shimmer {\n      0%, 100% { filter: brightness(0.7) contrast(1.2) saturate(1.5); }\n      50% { filter: brightness(0.9) contrast(1.4) saturate(2); }\n    }\n    \n    /* Glare/reflection layer */\n    .card-glare {\n      position: absolute;\n      inset: 0;\n      border-radius: var(--card-radius);\n      z-index: 3;\n      pointer-events: none;\n      opacity: 0;\n      transition: opacity 0.4s ease;\n      \n      background: \n        radial-gradient(\n          farthest-corner circle at var(--pointer-x) var(--pointer-y),\n          rgba(255, 255, 255, 0.25) 0%,\n          rgba(255, 255, 255, 0.1) 20%,\n          transparent 60%\n        );\n      \n      mix-blend-mode: overlay;\n    }\n    \n    .card-wrapper:hover .card-glare,\n    .card-wrapper.active .card-glare {\n      opacity: 1;\n    }\n    \n    /* Sparkle overlay */\n    .card-sparkle {\n      position: absolute;\n      inset: 0;\n      border-radius: var(--card-radius);\n      z-index: 4;\n      pointer-events: none;\n      opacity: 0;\n      transition: opacity 0.4s ease;\n      background: var(--grain);\n      background-size: 150px 150px;\n      mix-blend-mode: overlay;\n      filter: contrast(150%) brightness(200%);\n    }\n    \n    .card-wrapper:hover .card-sparkle,\n    .card-wrapper.active .card-sparkle {\n      opacity: 0.08;\n    }\n    \n    /* Border glow */\n    .card-border {\n      position: absolute;\n      inset: 0;\n      border-radius: var(--card-radius);\n      z-index: 5;\n      pointer-events: none;\n      opacity: 0;\n      transition: opacity 0.4s ease;\n      \n      border: 1px solid transparent;\n      background: \n        linear-gradient(var(--card-bg), var(--card-bg)) padding-box,\n        linear-gradient(\n          calc(var(--pointer-from-left) * 360deg),\n          var(--teal),\n          var(--purple),\n          var(--pink),\n          var(--teal)\n        ) border-box;\n    }\n    \n    .card-wrapper:hover .card-border,\n    .card-wrapper.active .card-border {\n      opacity: 0.6;\n    }\n    \n    /* Content styling */\n    .card-content {\n      position: relative;\n      z-index: 10;\n      display: flex;\n      flex-direction: column;\n      gap: 24px;\n    }\n    \n    /* Header section */\n    .card-header {\n      text-align: center;\n      margin-bottom: 8px;\n    }\n    \n    .logo-container {\n  width: 80px;\n  height: 80px;\n  margin: 0 auto 20px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.logo-glow {\n  position: absolute;\n  inset: -8px;\n  background: radial-gradient(circle, rgba(86, 195, 174, 0.4) 0%, transparent 70%);\n  border-radius: 50%;\n  animation: logoGlow 3s ease-in-out infinite;\n}\n\n.logo {\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n\n.logo img {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n}\n    \n    h1 {\n      font-family: 'Space Mono', monospace;\n      color: #fff;\n      font-size: 30px;\n      font-weight: 700;\n      letter-spacing: -0.5px;\n      margin-bottom: 8px;\n      background: linear-gradient(135deg, #fff 0%, var(--teal-light) 50%, var(--purple) 100%);\n      background-size: 200% 200%;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n      animation: titleShine 4s ease infinite;\n    }\n    \n    @keyframes titleShine {\n      0%, 100% { background-position: 0% 50%; }\n      50% { background-position: 100% 50%; }\n    }\n    \n    .subtitle {\n      color: rgba(255, 255, 255, 0.5);\n      font-size: 14px;\n      line-height: 1.6;\n      font-weight: 400;\n    }\n    \n    /* Form elements */\n    .input-group {\n      position: relative;\n    }\n    \n    input[type=\"email\"] {\n      width: 100%;\n      padding: 16px 20px;\n      background: rgba(255, 255, 255, 0.03);\n      border: 1px solid rgba(255, 255, 255, 0.1);\n      border-radius: 14px;\n      color: #fff;\n      font-family: 'Outfit', sans-serif;\n      font-size: 16px;\n      outline: none;\n      transition: all 0.3s ease;\n    }\n    \n    input[type=\"email\"]::placeholder {\n      color: rgba(255, 255, 255, 0.35);\n    }\n    \n    input[type=\"email\"]:focus {\n      border-color: var(--teal);\n      background: rgba(86, 195, 174, 0.05);\n      box-shadow: 0 0 0 3px rgba(86, 195, 174, 0.1), 0 0 20px -5px rgba(86, 195, 174, 0.3);\n    }\n    \n    /* Buttons */\n    .btn {\n      width: 100%;\n      padding: 16px 24px;\n      border: none;\n      border-radius: 14px;\n      font-family: 'Outfit', sans-serif;\n      font-size: 16px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .btn-primary {\n      background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);\n      color: #0a0a0f;\n      box-shadow: 0 4px 15px -3px rgba(86, 195, 174, 0.4);\n    }\n    \n    .btn-primary::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(135deg, var(--teal-light) 0%, #fff 50%, var(--teal-light) 100%);\n      opacity: 0;\n      transition: opacity 0.3s ease;\n    }\n    \n    .btn-primary:hover:not(:disabled) {\n      transform: translateY(-2px);\n      box-shadow: 0 8px 25px -5px rgba(86, 195, 174, 0.5);\n    }\n    \n    .btn-primary:hover:not(:disabled)::before {\n      opacity: 0.2;\n    }\n    \n    .btn-primary:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n    \n    .btn-primary span {\n      position: relative;\n      z-index: 1;\n    }\n    \n    .divider {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n    }\n    \n    .divider::before,\n    .divider::after {\n      content: '';\n      flex: 1;\n      height: 1px;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);\n    }\n    \n    .divider span {\n      color: rgba(255, 255, 255, 0.3);\n      font-size: 12px;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n    }\n    \n    .btn-google {\n      background: rgba(255, 255, 255, 0.03);\n      border: 1px solid rgba(255, 255, 255, 0.1);\n      color: rgba(255, 255, 255, 0.8);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 12px;\n    }\n    \n    .btn-google:hover {\n      background: rgba(255, 255, 255, 0.08);\n      border-color: rgba(255, 255, 255, 0.2);\n      transform: translateY(-2px);\n    }\n    \n    .btn-google img {\n      width: 20px;\n      height: 20px;\n    }\n\n    /* Make the holographic pattern visible behind the card, but keep controls opaque.\n       Card inner is semi-transparent so pattern shows; inputs/buttons stay above it. */\n    .card-inner,\n    .card-wrapper:hover .card-inner,\n    .card-wrapper.active .card-inner,\n    .card-wrapper.success .card-inner {\n      /* allow more of the pattern to show through the inner layer */\n      background: rgba(13,17,23,0.45) !important;\n      background-image: none !important;\n      position: relative;\n      z-index: 5;\n    }\n\n    input[type=\"email\"],\n    .card-wrapper:hover input[type=\"email\"],\n    .card-wrapper.active input[type=\"email\"],\n    .card-wrapper.success input[type=\"email\"] {\n      background: #0d1117 !important;\n      border-color: rgba(255,255,255,0.14) !important;\n      color: #ffffff !important;\n      box-shadow: inset 0 6px 18px rgba(0,0,0,0.7) !important;\n      mix-blend-mode: normal !important;\n      position: relative;\n      z-index: 30;\n    }\n\n    .btn-primary,\n    .card-wrapper:hover .btn-primary,\n    .card-wrapper.active .btn-primary,\n    .card-wrapper.success .btn-primary {\n      background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%) !important;\n      color: #071217 !important;\n      box-shadow: 0 12px 30px rgba(86,195,174,0.28) !important;\n      transform: translateY(0) !important;\n      mix-blend-mode: normal !important;\n      position: relative;\n      z-index: 30;\n    }\n\n    .btn-google,\n    .card-wrapper:hover .btn-google,\n    .card-wrapper.active .btn-google,\n    .card-wrapper.success .btn-google {\n      background: rgba(255,255,255,0.06) !important;\n      border-color: rgba(255,255,255,0.18) !important;\n      color: rgba(255,255,255,0.95) !important;\n      box-shadow: 0 8px 22px rgba(0,0,0,0.4) !important;\n      transform: translateY(0) !important;\n      mix-blend-mode: normal !important;\n      position: relative;\n      z-index: 30;\n    }\n    \n    /* Messages */\n    .message {\n      padding: 14px 18px;\n      border-radius: 12px;\n      font-size: 14px;\n      display: none;\n      text-align: center;\n    }\n    \n    .message.success {\n      background: rgba(34, 197, 94, 0.1);\n      border: 1px solid rgba(34, 197, 94, 0.2);\n      color: #4ADE80;\n      display: block;\n      animation: messageIn 0.4s ease;\n    }\n    \n    .message.error {\n      background: rgba(239, 68, 68, 0.1);\n      border: 1px solid rgba(239, 68, 68, 0.2);\n      color: #F87171;\n      display: block;\n      animation: messageIn 0.4s ease;\n    }\n    \n    .message a {\n      color: var(--teal);\n      text-decoration: none;\n      font-weight: 600;\n    }\n    \n    .message a:hover {\n      text-decoration: underline;\n    }\n    \n    @keyframes messageIn {\n      from { opacity: 0; transform: translateY(-10px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n    \n    /* Signup link */\n    .signup-link {\n      text-align: center;\n      color: rgba(255, 255, 255, 0.4);\n      font-size: 14px;\n    }\n    \n    .signup-link a {\n      color: var(--teal);\n      text-decoration: none;\n      font-weight: 600;\n      transition: color 0.2s ease;\n    }\n    \n    .signup-link a:hover {\n      color: var(--teal-light);\n    }\n    \n    /* Loading spinner */\n    .loading {\n      display: inline-block;\n      width: 18px;\n      height: 18px;\n      border: 2px solid transparent;\n      border-top-color: currentColor;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n      margin-right: 8px;\n      vertical-align: middle;\n    }\n    \n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n    \n    /* Member badge teaser */\n    .member-badge-teaser {\n      position: absolute;\n      bottom: -60px;\n      left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      color: rgba(255, 255, 255, 0.3);\n      font-size: 12px;\n      white-space: nowrap;\n    }\n    \n    .badge-icon {\n      width: 20px;\n      height: 20px;\n      background: linear-gradient(135deg, var(--teal) 0%, var(--purple) 100%);\n      border-radius: 4px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 10px;\n    }\n    \n    /* Success state - legendary reveal */\n    .card-wrapper.success .login-card {\n      animation: legendaryPulse 2s ease infinite;\n    }\n    \n    .card-wrapper.success .card-shine {\n      opacity: 0.8 !important;\n      animation: successShimmer 1s ease infinite !important;\n    }\n    \n    @keyframes legendaryPulse {\n      0%, 100% { box-shadow: 0 0 0 1px rgba(86, 195, 174, 0.3), 0 0 60px -10px rgba(86, 195, 174, 0.6); }\n      50% { box-shadow: 0 0 0 1px rgba(86, 195, 174, 0.5), 0 0 80px -10px rgba(168, 85, 247, 0.6); }\n    }\n    \n    @keyframes successShimmer {\n      0%, 100% { filter: brightness(1) contrast(1.5) saturate(2); }\n      50% { filter: brightness(1.2) contrast(1.8) saturate(2.5); }\n    }\n    \n    /* Larger screens - even bigger card */\n    @media (min-width: 768px) {\n      .login-card {\n        max-width: 480px;\n        min-height: 600px;\n      }\n      \n      .card-inner {\n        padding: 56px 48px;\n      }\n      \n      .card-content {\n        gap: 28px;\n      }\n      \n      h1 {\n        font-size: 32px;\n      }\n      \n      .subtitle {\n        font-size: 15px;\n      }\n      \n      input[type=\"email\"] {\n        padding: 18px 22px;\n        font-size: 17px;\n      }\n      \n      .btn {\n        padding: 18px 28px;\n        font-size: 17px;\n      }\n    }\n    \n    /* Mobile adjustments */\n    @media (max-width: 480px) {\n      body {\n        padding: 16px;\n        justify-content: flex-start;\n        padding-top: 40px;\n      }\n      \n      .login-card {\n        min-height: auto;\n      }\n      \n      .card-inner {\n        padding: 32px 24px;\n      }\n      \n      h1 {\n        font-size: 22px;\n      }\n      \n      .member-badge-teaser {\n        display: none;\n      }\n    }\n    \n    /* Mobile browser optimizations - disable all animations */\n    @media (max-width: 768px) {\n      /* Disable all animations and transitions on mobile */\n      *,\n      *::before,\n      *::after {\n        animation: none !important;\n        transition: none !important;\n      }\n\n      /* Hide particles on mobile */\n      .particles {\n        display: none;\n      }\n\n      /* Disable background animation */\n      body::before {\n        animation: none;\n        opacity: 1;\n      }\n\n      /* Static card on mobile */\n      .login-card {\n        transform: none !important;\n      }\n\n      .card-wrapper {\n        transform: none !important;\n      }\n    }\n\n    /* Reduced motion */\n    @media (prefers-reduced-motion: reduce) {\n      *, *::before, *::after {\n        animation-duration: 0.01ms !important;\n        transition-duration: 0.01ms !important;\n      }\n    }\n  "
    }}
  />
  {/* Floating particles background */}
  <div className="particles">
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
    <div className="particle" />
  </div>
  <div className="card-wrapper" ref={wrapRef}>
    <div className="login-card" ref={cardRef}>
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
</>
  );
}
