import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Dashboard.css";

const PASSION_FINDER = {
  to: "/passion-finder",
  img: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/V9fFmHmj0sNrFWEZxvre.png",
  label: "Passion Finder",
  desc: "4 questions. Real gig matches. No more “where do I even start?”",
};

const QUICK_ACTIONS = [
  {
    to: "/beginner-list",
    img: "/images/begin.png",
    label: "Beginner List",
    desc: "Skip the quiz. 15 ready gigs.",
  },
  {
    to: "/earn",
    img: "/images/earnicon.png",
    label: "Earn",
    desc: "50+ ways to earn online.",
  },
  {
    to: "/playlist",
    img: "/images/brainfm.jpg",
    label: "Focus Music",
    desc: "Brain.fm audio. Press play, lock in.",
  },
  {
    to: "/adhd-hacks",
    img: "/images/hacks.png",
    label: "ADHD Hacks",
    desc: "Tiny tricks that actually stick.",
  },
];

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("on-dashboard");
    return () => { document.body.classList.remove("on-dashboard"); };
  }, []);

  return (
    <div className="dashboard">
      <section className="dash-hero">
        <h1 className="dash-welcome">Welcome back!</h1>
      </section>

      <main className="main-content">
        <p className="dash-section-label">Quick Actions</p>

        <Link to={PASSION_FINDER.to} className="featured-card featured-card--hero">
          <span className="featured-icon">
            <img src={PASSION_FINDER.img} alt="" />
          </span>
          <div className="featured-copy">
            <h3>{PASSION_FINDER.label}</h3>
            <p>{PASSION_FINDER.desc}</p>
          </div>
        </Link>

        <div className="dash-quick-grid">
          {QUICK_ACTIONS.map(({ to, img, label, desc }) => (
            <Link key={to} to={to} className="action-card">
              <span className="action-icon"><img src={img} alt="" /></span>
              <h3>{label}</h3>
              <p>{desc}</p>
            </Link>
          ))}
        </div>

        <Link to="/mindshift" className="featured-card featured-card--muted">
          <span className="featured-icon">
            <img src="/images/logo.png" alt="" />
          </span>
          <div className="featured-copy">
            <h3>Need a boost?</h3>
            <p>Tap your mood, reset your brain →</p>
          </div>
        </Link>
      </main>
    </div>
  );
}
