import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  IconArrowRight,
  IconLungs,
  IconMusic,
} from "@tabler/icons-react";
import "../styles/pages/Dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("on-dashboard");
    return () => { document.body.classList.remove("on-dashboard"); };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <main className="main-content">

          <Link to="/passion-finder" className="dash-hero-card" style={{ ["--stagger" as any]: "80ms" }}>
            <div className="dhc-bg" aria-hidden />
            <div className="dhc-grain" aria-hidden />
            <div className="dhc-inner">
              <div className="dhc-left">
                <h2 className="dhc-title">
                  Find ways to earn that <em>actually</em> fit your brain.
                </h2>
                <p className="dhc-desc">
                  4 questions, real gig matches. No more &ldquo;where do I even start?&rdquo;
                </p>
                <span className="dhc-cta">
                  Start the quiz <IconArrowRight size={18} />
                </span>
              </div>
              <div className="dhc-art" aria-hidden>
                <img src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/V9fFmHmj0sNrFWEZxvre.png" alt="" />
              </div>
            </div>
          </Link>

          <Link to="/breathwork" className="dash-quick-reset" aria-label="Breathwork">
            <span className="dqr-icon"><IconLungs size={22} stroke={1.8} /></span>
            <span className="dqr-text">
              <span className="dqr-title">Breathwork</span>
              <span className="dqr-sub">Overwhelmed? Breathe first.</span>
            </span>
            <span className="dqr-arrow"><IconArrowRight size={16} /></span>
          </Link>

          <div className="dash-cards">
            {([
              {
                to: "/beginner-list",
                img: "/images/begin.png",
                label: "Beginner List",
                desc: "Skip the quiz. 15 ready-to-go gigs.",
                tone: "lemon",
                delay: "160ms",
              },
              {
                to: "/adhd-hacks",
                img: "/images/hacks.png",
                label: "ADHD Hacks",
                desc: "Tiny tricks that actually stick.",
                tone: "lilac",
                delay: "220ms",
              },
              {
                to: "/playlist",
                Icon: IconMusic,
                label: "Focus Music",
                desc: "Brain.fm audio. Press play, lock in.",
                tone: "mint",
                delay: "280ms",
              },
            ] as const).map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={`dash-card tone-${card.tone}`}
                style={{ ["--stagger" as any]: card.delay }}
              >
                <div className="dc-art">
                  {"Icon" in card
                    ? <card.Icon size={36} stroke={1.8} className="dc-icon" />
                    : <img src={card.img} alt="" className="dc-img" />}
                </div>
                <div className="dc-body">
                  <h3 className="dc-title">{card.label}</h3>
                  <p className="dc-desc">{card.desc}</p>
                </div>
                <span className="dc-arrow" aria-hidden>
                  <IconArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="dash-cta-row">
            <Link to="/mindshift" className="dash-cta dash-cta--zone" style={{ ["--stagger" as any]: "340ms" }}>
              <span className="dcta-icon">
                <img src="/images/brainholographic.png" alt="" className="dcta-img" />
              </span>
              <span className="dcta-copy">
                <span className="dcta-title">Reset your brain</span>
                <span className="dcta-desc">Tap your mood, get a science&#8209;backed step.</span>
              </span>
              <span className="dcta-arrow"><IconArrowRight size={16} /></span>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
