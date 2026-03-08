import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  ListChecks,
  BookOpen,
  Bot,
  Lightbulb,
  Rocket,
  Wind,
  Sparkles,
  MessageCircle,
  Flame,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";
import "../styles/pages/Dashboard.css";

// True only during `npm run dev` — automatically false in production builds
const DEV_BYPASS = import.meta.env.DEV;

export default function Dashboard() {
  const [loading, setLoading] = useState(!DEV_BYPASS);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (DEV_BYPASS) return;
    checkAuth();
  }, []);

  useEffect(() => {
    document.body.classList.add("on-dashboard");
    return () => { document.body.classList.remove("on-dashboard"); };
  }, []);

  async function checkAuth() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Paid")
        .select("email,status,is_premium")
        .ilike("email", user.email!)
        .eq("status", "active")
        .single();

      if (error) {
        const { data: fallback } = await supabase
          .from("Paid")
          .select("email,status")
          .ilike("email", user.email!)
          .eq("status", "active")
          .single();

        if (!fallback) {
          await supabase.auth.signOut();
          navigate("/", { replace: true, state: { error: "no-access" } });
          return;
        }
      } else if (!data) {
        await supabase.auth.signOut();
        navigate("/", { replace: true, state: { error: "no-access" } });
        return;
      } else {
        setIsPremium(data.is_premium || false);
      }
    } catch (_err) {
      await supabase.auth.signOut();
      navigate("/", { replace: true });
      return;
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Floating Particles */}
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

      <div className="dashboard-glow" />

      <div className="dashboard-container">
        <div className="main-content">
          <h2 className="section-title">Start Here</h2>

          <div className="quick-actions">
            {([
              { to: "/passion-finder", icon: <Rocket size={32} />,     label: "Passion Finder", desc: "Find what fits you",              extra: "" },
              { to: "/beginner-list", icon: <ListChecks size={32} />, label: "Beginner List", desc: "Easy starters to get momentum",   extra: "" },
              { to: "/guides",        icon: <BookOpen size={32} />,   label: "Guides",        desc: "Step-by-step help",               extra: "" },
              { to: "/adhd-hacks",    icon: <Lightbulb size={32} />,  label: "ADHD Hacks",    desc: "Tips & strategies",               extra: "" },
              { to: "/ai-playground", icon: <Bot size={32} />,        label: "AI Playground", desc: "Practice prompts & templates",    extra: !isPremium ? " premium-required" : "" },
              { to: "/breathwork",    icon: <Wind size={32} />,       label: "Breathwork",    desc: "Calm your brain in 60 seconds",         extra: "" },
            ] as const).map(({ to, icon, label, desc, extra }) => (
              <Link
                key={to}
                to={to}
                className={`action-card${extra}`}
              >
                <span className="card-icon">{icon}</span>
                <h3 className="card-title">{label}</h3>
                <p className="card-description">{desc}</p>
              </Link>
            ))}
          </div>

          <h2 className="section-title section-title-secondary">Recommended for You</h2>

          <div className="activity-list">
            <Link to="/ai-made-simple" className="activity-item">
              <span className="activity-icon" style={{ color: '#A855F7' }}>
                <BrainCircuit size={20} />
              </span>
              <div className="activity-text">
                <span className="activity-label">New AI prompts added</span>
                <span className="activity-meta">AI Made Simple guide updated</span>
              </div>
            </Link>

            <Link to="/earn" className="activity-item">
              <span className="activity-icon" style={{ color: 'var(--brand)' }}>
                <TrendingUp size={20} />
              </span>
              <div className="activity-text">
                <span className="activity-label">3 new earning methods</span>
                <span className="activity-meta">Fresh side hustles just dropped</span>
              </div>
            </Link>

            <Link to="/beginner-list" className="activity-item">
              <span className="activity-icon" style={{ color: '#EC4899' }}>
                <Flame size={20} />
              </span>
              <div className="activity-text">
                <span className="activity-label">Continue your momentum</span>
                <span className="activity-meta">Pick up where you left off</span>
              </div>
            </Link>
          </div>

          <Link to="/mindshift" className="featured-card">
            <span className="card-icon featured-icon">
              <Sparkles size={28} />
            </span>
            <div>
              <h3 className="card-title">Get back in the zone</h3>
              <p className="card-description">Quotes, tools & a focus playlist &rarr;</p>
            </div>
          </Link>

          <a
            href="https://discord.gg/N26dcsUz3b"
            target="_blank"
            rel="noopener noreferrer"
            className={`discord-card${!isPremium ? " premium-required" : ""}`}
          >
            <span className="card-icon discord-icon">
              <MessageCircle size={28} />
            </span>
            <div className="content">
              <h3 className="card-title">Join the Community</h3>
              <p className="card-description">Connect with ADHD brains who get it</p>
            </div>
            <span className="discord-btn">Join</span>
          </a>
        </div>
      </div>
    </div>
  );
}