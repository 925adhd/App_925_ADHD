import { useState } from 'react'
import '../styles/pages/DataAnnotationGuide.css'

function Section({ icon, title, desc, time, defaultOpen = false, children }: any) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  return (
    <div className={`section${open ? ' open' : ''}`}>
      <button className={`section-toggle${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="section-icon">{icon}</span>
        <div className="section-info">
          <div className="section-title">{title}</div>
          <div className="section-desc">{desc}</div>
        </div>
        <span className="section-time">{time}</span>
        <span className="section-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="section-content show">{children}</div>}
    </div>
  )
}

function CheckItem({ children }: any) {
  const [checked, setChecked] = useState(false)
  return (
    <div className={`check-item${checked ? ' checked' : ''}`} onClick={() => setChecked(c => !c)}>
      <div className="check-box">✓</div>
      <span className="check-text">{children}</span>
    </div>
  )
}

export default function DataAnnotationGuide() {
  return (
    <div className="data-annotation-guide">
      <div className="hero">
        <div className="hero-icon">🤖</div>
        <h1><span>Data Annotation</span></h1>
        <p className="subtitle">Teach AI to be smarter. Get paid for your brain.</p>
      </div>

      <div className="quick-stats">
        <div className="stat-card"><div className="stat-value">$15-40</div><div className="stat-label">per hour (top platforms)</div></div>
        <div className="stat-card"><div className="stat-value">⭐⭐⭐⭐</div><div className="stat-label">ADHD friendly</div></div>
        <div className="stat-card"><div className="stat-value">Flexible</div><div className="stat-label">work when you want</div></div>
      </div>

      <div className="nav-pills">
        <a href="#whatisit" className="nav-pill">🤔 What is it?</a>
        <a href="#platforms" className="nav-pill">📱 Platforms</a>
        <a href="#adhd" className="nav-pill">🧠 ADHD Tips</a>
        <a href="#start" className="nav-pill active">🚀 Start Now</a>
      </div>

      <Section icon="🤔" title="What is Data Annotation?" desc="The quick explanation + why ADHD brains can rock this" time="2 min" id="whatisit">
        <div className="box blue"><h4>🎯 The One-Sentence Version</h4><p>You teach AI systems what things are by labeling data, rating responses, or correcting mistakes.</p></div>
        <div className="box green"><h4>✅ Examples of What You'd Do</h4><ul><li><strong>Label images:</strong> "This is a cat" / "This is a dog"</li><li><strong>Rate AI responses:</strong> "This answer is helpful" / "This is incorrect"</li><li><strong>Compare outputs:</strong> "Response A is better than Response B"</li><li><strong>Write prompts:</strong> Create questions to test AI systems</li><li><strong>Fix AI mistakes:</strong> Correct grammar, facts, or tone</li></ul></div>
        <div className="box pink"><h4>💜 Why ADHD Brains Can Excel</h4><ul><li><strong>Pattern recognition:</strong> You're literally built for spotting inconsistencies</li><li><strong>Variety:</strong> Different task types prevent boredom</li><li><strong>Hyperfocus bonus:</strong> Complex tasks can trigger productive flow states</li><li><strong>Flexibility:</strong> Work when your brain is ON, stop when it's not</li></ul></div>
        <div className="box yellow"><h4>⚠️ ADHD Watch-Outs</h4><ul><li>Some tasks ARE repetitive (skip those when you can)</li><li>Guidelines can be complex and change often</li><li>Quality requirements are strict - careless = banned</li><li>Work availability is inconsistent</li></ul></div>
      </Section>

      <Section icon="📱" title="Best Platforms (Ranked)" desc="Where to actually make decent money" time="4 min" id="platforms">
        <div className="box blue"><h4>💡 Strategy</h4><p>Sign up for the top 3. Don't spread yourself thin. Focus on one until you're good, then add more.</p></div>
        <div className="platforms">
          <div className="platform">
            <div className="platform-header"><span className="platform-name">🥇 DataAnnotation.tech</span><span className="platform-badge hot">🔥 HOT</span></div>
            <div className="platform-pay">💰 $15-40/hour</div>
            <p className="platform-desc">AI training tasks, especially coding and writing. Currently the best-paying with consistent work.</p>
            <a href="https://app.dataannotation.tech/users/sign_up" className="platform-link" target="_blank" rel="noreferrer">Sign up →</a>
          </div>
          <div className="platform">
            <div className="platform-header"><span className="platform-name">🥈 Outlier</span><span className="platform-badge">GROWING</span></div>
            <div className="platform-pay">💰 $15-40/hour</div>
            <p className="platform-desc">Expert-level AI training. Best for people with specific knowledge areas.</p>
            <a href="https://app.outlier.ai/en/expert/signup" className="platform-link" target="_blank" rel="noreferrer">Sign up →</a>
          </div>
          <div className="platform">
            <div className="platform-header"><span className="platform-name">🥉 Remotasks</span><span className="platform-badge">ENTRY</span></div>
            <div className="platform-pay">💰 $5-20/hour</div>
            <p className="platform-desc">Wide variety of task types. Good for beginners to learn the ropes.</p>
            <a href="https://www.remotasks.com/en/signup" className="platform-link" target="_blank" rel="noreferrer">Sign up →</a>
          </div>
        </div>
        <div className="box yellow"><h4>⚠️ Platforms to Avoid (for ADHD)</h4><ul><li><strong>Amazon MTurk:</strong> Low pay, mind-numbing repetition</li><li><strong>Clickworker:</strong> Boring tasks, inconsistent work</li></ul></div>
      </Section>

      <Section icon="🧠" title="ADHD Success Strategies" desc="Actual tips that work, not generic advice" time="3 min" id="adhd">
        <div className="box green"><h4>⚡ The Energy Matching System</h4><ul><li><strong>Hyperfocus mode:</strong> Tackle complex, high-paying tasks</li><li><strong>Medium energy:</strong> Standard labeling, comparisons</li><li><strong>Low energy:</strong> Simple yes/no tasks or skip entirely</li></ul></div>
        <div className="box pink"><h4>🛡️ Protect Your Account</h4><p>These platforms WILL ban you for low quality.</p><ul><li>Read guidelines carefully</li><li>When in doubt, skip the task</li><li>Never work in "zombie mode"</li></ul></div>
      </Section>

      <Section icon="🚀" title="Start Right Now" desc="Your action checklist" time="10 min" defaultOpen>
        <div className="box green"><h4>🎯 The Quick Start</h4><p>Don't overthink this. Sign up, do the training, complete one task. That's it.</p></div>
        <div className="checklist">
          <CheckItem><strong>Sign up for DataAnnotation.tech</strong> - Best one, start here</CheckItem>
          <CheckItem><strong>Complete onboarding quiz</strong> - They test you first</CheckItem>
          <CheckItem><strong>Read guidelines carefully</strong> - Yes, really</CheckItem>
          <CheckItem><strong>Complete your first task</strong> - Any task counts!</CheckItem>
          <CheckItem><strong>Sign up for Outlier as backup</strong> - More options = more money</CheckItem>
        </div>
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a href="https://app.dataannotation.tech/users/sign_up" className="cta" target="_blank" rel="noreferrer">🚀 Sign Up for DataAnnotation.tech</a>
        </div>
      </Section>

      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
        <p>Remember: This is real work that takes effort.</p>
        <p>But if you can focus for 30-60 minute bursts, you can absolutely do this. 💪</p>
      </div>
    </div>
  )
}
