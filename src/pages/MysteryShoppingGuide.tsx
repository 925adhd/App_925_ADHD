import { useState } from 'react'
import '../styles/pages/MysteryShoppingGuide.css'

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

export default function MysteryShoppingGuide() {
  return (
    <div className="mystery-shopping-guide">
      <div className="hero">
        <div className="hero-icon">🕵️</div>
        <h1><span>Mystery Shopping</span></h1>
        <p className="subtitle">Get paid to eat, shop, and pretend you're a spy.</p>
      </div>
      <div className="shop-types">
        {[['🍔','Restaurants','$15-50 + meal'],['🛒','Retail','$8-25'],['🏦','Banks','$15-40'],['🚗','Car Dealers','$25-100+'],['🏠','Apartments','$20-50'],['🎬','Movies','$10 + tickets']].map(([i,n,p])=>(
          <div key={n} className="shop-type"><div className="shop-type-icon">{i}</div><div className="shop-type-name">{n}</div><div className="shop-type-pay">{p}</div></div>
        ))}
      </div>
      <div className="stats">
        <div className="stat"><div className="stat-value">$200-800</div><div className="stat-label">monthly (part-time)</div></div>
        <div className="stat"><div className="stat-value">⭐⭐⭐⭐</div><div className="stat-label">ADHD friendly</div></div>
        <div className="stat"><div className="stat-value">+ Free Stuff</div><div className="stat-label">meals, products</div></div>
      </div>
      <Section icon="🤔" title="Is This For Me?" desc="Requirements + ADHD compatibility" badge="2 min">
        <div className="card green"><h4>✅ You'll Love It If...</h4><ul><li>You have reliable transportation</li><li>You notice details others miss (ADHD superpower!)</li><li>You can write clear, detailed reports</li></ul></div>
        <div className="card pink"><h4>❌ Skip It If...</h4><ul><li>No reliable transportation</li><li>Can't afford upfront spending (wait 30-45 days for reimbursement)</li><li>Hate writing detailed reports</li></ul></div>
        <div className="card orange"><h4>💜 ADHD Perspective</h4><p><strong>Why it works:</strong> Every shop is different! Novelty, real-world tasks, immediate purpose.</p><p style={{marginTop:10}}><strong>Watch out:</strong> Report writing can be tedious. Don't overcommit.</p></div>
      </Section>
      <Section icon="🏢" title="Best Companies" desc="Where to sign up (all are free)" badge="4 min">
        <div className="companies">
          <div className="company"><div className="company-top"><span className="company-name">🥇 iSecretShop (Presto)</span><span className="company-badge">TOP PICK</span></div><p className="company-desc">Best mobile app experience. Wide variety of shops. Fast payments.</p><a href="https://isecretshop.com/register" className="company-link" target="_blank" rel="noreferrer">Sign up →</a></div>
          <div className="company"><div className="company-top"><span className="company-name">🥈 Market Force Information</span><span className="company-badge">RELIABLE</span></div><p className="company-desc">Large established company. Restaurants, retail, banking, movies.</p><a href="https://www.marketforce.com/become-a-shopper" className="company-link" target="_blank" rel="noreferrer">Sign up →</a></div>
          <div className="company"><div className="company-top"><span className="company-name">🥉 BestMark</span><span className="company-badge">HIGH VOLUME</span></div><p className="company-desc">One of the oldest mystery shopping companies. Good pay, lots of assignments nationwide.</p><a href="https://www.bestmark.com/become-a-mystery-shopper/" className="company-link" target="_blank" rel="noreferrer">Sign up →</a></div>
        </div>
        <div className="card yellow"><h4>⚠️ Scam Alert</h4><p><strong>NEVER pay to become a mystery shopper.</strong> Legitimate companies are always free to join.</p></div>
      </Section>
      <Section icon="🧠" title="ADHD Success Tips" desc="Make this work for your brain" badge="3 min">
        <div className="card green"><h4>⚡ Use Your ADHD Superpowers</h4><ul><li><strong>Detail radar:</strong> You notice things others miss</li><li><strong>Novelty seeking:</strong> Each shop is a new adventure</li></ul></div>
        <div className="card orange"><h4>⏰ Report Writing Hack</h4><ol><li>Do the shop</li><li>Voice-record your observations in the car</li><li>Write the report SAME DAY</li><li>Set a 30-min timer - makes it a game</li></ol></div>
      </Section>
      <Section icon="🚀" title="Start This Week" desc="Your action plan" badge="10 min" defaultOpen>
        <div className="checklist">
          <CheckItem><strong>Sign up for iSecretShop</strong></CheckItem>
          <CheckItem><strong>Sign up for Market Force</strong></CheckItem>
          <CheckItem><strong>Sign up for BestMark</strong></CheckItem>
          <CheckItem><strong>Download a mileage tracking app</strong></CheckItem>
          <CheckItem><strong>Claim your first shop</strong></CheckItem>
          <CheckItem><strong>Complete it and submit report</strong></CheckItem>
        </div>
        <div style={{textAlign:'center',margin:'30px 0'}}>
          <a href="https://isecretshop.com/register" className="cta" target="_blank" rel="noreferrer">🕵️ Sign Up for iSecretShop</a>
        </div>
      </Section>
    </div>
  )
}
