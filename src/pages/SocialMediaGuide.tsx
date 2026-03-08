import { useState } from 'react'
import '../styles/pages/SocialMediaGuide.css'

function Section({ icon, title, desc, badge, defaultOpen = false, children }: any) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  return (
    <div className="section">
      <div className={`section-header${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="section-icon">{icon}</span>
        <div className="section-info"><div className="section-title">{title}</div><div className="section-desc">{desc}</div></div>
        <span className="section-badge">{badge}</span>
        <span className="section-arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="section-body show">{children}</div>}
    </div>
  )
}
function CheckItem({ children }: any) {
  const [checked, setChecked] = useState(false)
  return <div className={`check-item${checked ? ' checked' : ''}`} onClick={() => setChecked(c => !c)}><div className="check-box">✓</div><span className="check-text">{children}</span></div>
}

export default function SocialMediaGuide() {
  return (
    <div className="social-media-guide">
      <div className="reality-banner">
        <span className="reality-icon">⚠️</span>
        <div className="reality-text">
          <h3>The Honest Truth About Influencer Income</h3>
          <p>48% of influencers earn under $15,000/year. Only 15% make over $100k. This guide gives realistic expectations, not hype.</p>
        </div>
      </div>
      <div className="hero">
        <div className="hero-icon">📱</div>
        <h1><span>Social Media Income</span></h1>
        <p className="subtitle">The realistic, ADHD-honest guide to making money online.</p>
      </div>
      <div className="income-ladder">
        {[['500-10K','Nano Influencer','$10-100/post • $100-800/month','Most achievable','good'],
          ['10K-100K','Micro Influencer','$100-1K/post • $800-5K/month','Consistent posting needed','hard'],
          ['100K-1M','Macro Influencer','$1K-10K/post • $5K-50K/month','High pressure','vhard'],
          ['1M+','Mega Influencer','$10K+/post • $50K+/month','Extremely rare','vhard']].map(([f,n,r,l,c])=>(
          <div key={n} className="income-tier">
            <span className="tier-followers">{f}</span>
            <div className="tier-info"><div className="tier-name">{n}</div><div className="tier-range">{r}</div></div>
            <span className={`tier-reality ${c}`}>{l}</span>
          </div>
        ))}
      </div>
      <Section icon="🧠" title="ADHD & Social Media: The Real Talk" desc="Why this can be amazing or terrible for you" badge="3 min">
        <div className="card green"><h4>✅ ADHD Advantages</h4><ul><li><strong>Creativity bursts:</strong> Great for content ideation during hyperfocus</li><li><strong>Authenticity:</strong> ADHD brains often come across as genuine</li><li><strong>Trend-spotting:</strong> Novelty-seeking = early trend detection</li></ul></div>
        <div className="card pink"><h4>❌ ADHD Danger Zones</h4><ul><li><strong>Doom-scrolling:</strong> Platforms are designed to trap your attention</li><li><strong>Consistency struggle:</strong> Algorithms reward daily posting</li><li><strong>Burnout:</strong> The "always on" pressure is real</li></ul></div>
      </Section>
      <Section icon="📱" title="Platform Breakdown for ADHD" desc="Which ones work with your brain" badge="4 min">
        <div className="platforms">
          <div className="platform"><div className="platform-top"><span className="platform-name">📺 YouTube</span><span className="platform-adhd good">ADHD: Best</span></div><div className="platform-adhd-note">💜 <strong>Why it works:</strong> Weekly posting is sustainable. Algorithm rewards consistency, not daily grind.</div></div>
          <div className="platform"><div className="platform-top"><span className="platform-name">💼 LinkedIn</span><span className="platform-adhd good">ADHD: Great</span></div><div className="platform-adhd-note">💜 <strong>Why it works:</strong> Text-based = low production barrier. Less addictive algorithm.</div></div>
          <div className="platform"><div className="platform-top"><span className="platform-name">📸 Instagram</span><span className="platform-adhd ok">ADHD: Medium</span></div><div className="platform-adhd-note">⚠️ <strong>Caution:</strong> Comparison culture is brutal. Can trigger perfectionism spirals.</div></div>
          <div className="platform"><div className="platform-top"><span className="platform-name">🎵 TikTok</span><span className="platform-adhd hard">ADHD: Risky</span></div><div className="platform-adhd-note">🚨 <strong>Warning:</strong> Highly addictive algorithm. ADHD kryptonite. Proceed with extreme caution.</div></div>
        </div>
      </Section>
      <Section icon="🚀" title="Sustainable Start Plan" desc="Start small, stay sane" badge="3 min" defaultOpen>
        <div className="checklist">
          <CheckItem><strong>Pick ONE platform</strong> - YouTube or LinkedIn for ADHD</CheckItem>
          <CheckItem><strong>Choose your niche</strong> - What you could talk about forever</CheckItem>
          <CheckItem><strong>Set up creator account</strong> - Separate from personal</CheckItem>
          <CheckItem><strong>Install app timers</strong> - Protect your brain</CheckItem>
          <CheckItem><strong>Create first piece</strong> - Done &gt; perfect</CheckItem>
          <CheckItem><strong>Schedule posting days</strong> - 2x/week max to start</CheckItem>
        </div>
      </Section>
      <div style={{textAlign:'center',padding:'40px 20px',color:'var(--text-dim)'}}><p>Build something real. Stay consistent. Be patient.</p><p>And remember: Your worth isn't your follower count. 💜</p></div>
    </div>
  )
}
