import { useState, useEffect } from 'react'
import '../styles/pages/SurveysGuide.css'

type QuizResult = 'yes' | 'maybe' | 'no' | null
type SectionId = 'overview' | 'earnings' | 'platforms' | 'adhd-tips' | 'action-plan' | null

const checklistItems = [
  { text: 'Sign up for User Interviews - The best one, do this first', xp: 20 },
  { text: 'Sign up for Prolific - Complete your "About You" survey', xp: 20 },
  { text: 'Sign up for Respondent - Add your professional info', xp: 15 },
  { text: 'Sign up for dscout - Take a fun profile video', xp: 15 },
  { text: 'Set up PayPal - Most platforms pay through this', xp: 10 },
  { text: 'Enable notifications - So you don\'t miss high-value studies', xp: 10 },
  { text: 'Do your first study - Start earning! 🎉', xp: 10 },
]

export default function SurveysGuide() {
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [achievement, setAchievement] = useState('')
  const [showAchievement, setShowAchievement] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult>(null)
  const [selectedQuizOption, setSelectedQuizOption] = useState<QuizResult>(null)
  const [openSection, setOpenSection] = useState<SectionId>(null)
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(checklistItems.length).fill(false))

  const triggerAchievement = (text: string) => {
    setAchievement(text)
    setShowAchievement(true)
    setTimeout(() => setShowAchievement(false), 3000)
  }

  const addXP = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount
      const maxXP = level * 100
      if (newXp >= maxXP) {
        setLevel(l => l + 1)
        triggerAchievement(`Level ${level + 1} Reached!`)
        return newXp - maxXP
      }
      return newXp
    })
  }

  const selectQuiz = (result: QuizResult) => {
    setSelectedQuizOption(result)
    setQuizResult(result)
    addXP(15)
  }

  const toggleSection = (section: SectionId) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
      addXP(5)
    }
  }

  const toggleCheck = (index: number) => {
    if (!checkedItems[index]) {
      const newItems = [...checkedItems]
      newItems[index] = true
      setCheckedItems(newItems)
      addXP(checklistItems[index].xp)
      if (newItems.every(Boolean)) {
        triggerAchievement('🎉 All Tasks Complete!')
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 80) {
        addXP(10)
      }
    }
    window.addEventListener('scroll', handleScroll, { once: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const maxXP = level * 100
  const xpPercent = (xp / maxXP) * 100

  return (
    <div className="surveys-guide">
      <div className="particles" id="particles" />

      <div className="xp-bar">
        <span className="level-badge">LVL {level}</span>
        <div className="xp-progress">
          <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
        </div>
        <span className="xp-label">{xp} / {maxXP} XP</span>
      </div>

      <div className={`achievement ${showAchievement ? 'show' : ''}`}>
        <span className="achievement-icon">🏆</span>
        <span className="achievement-text">{achievement}</span>
      </div>

      <div className="container">
        <div className="hero">
          <span className="hero-emoji">📊</span>
          <h1>Surveys &amp; Market Research</h1>
          <p className="subtitle">Turn your opinions into cash. No experience needed, just your honest thoughts.</p>
        </div>

        <div className="tldr">
          <div className="tldr-grid">
            <div className="tldr-stat">
              <div className="tldr-value">$20-200</div>
              <div className="tldr-label">per month (realistic)</div>
            </div>
            <div className="tldr-stat">
              <div className="tldr-value">5-20 min</div>
              <div className="tldr-label">per task</div>
            </div>
            <div className="tldr-stat">
              <div className="tldr-value">⭐⭐⭐</div>
              <div className="tldr-label">ADHD friendly</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <a href="#quiz" className="action-btn primary">🎯 Am I a Good Fit?</a>
          <a href="#platforms" className="action-btn">📱 Show Me Platforms</a>
          <a href="#action-plan" className="action-btn">🚀 Just Start</a>
        </div>

        <div className="quiz-card" id="quiz">
          <div className="quiz-question">⚡ Quick check: How do you feel about repetitive questions?</div>
          <div className="quiz-options">
            <div
              className={`quiz-option${selectedQuizOption === 'yes' ? ' selected' : ''}`}
              onClick={() => selectQuiz('yes')}
            >I can zone out and do it 🧘</div>
            <div
              className={`quiz-option${selectedQuizOption === 'maybe' ? ' selected' : ''}`}
              onClick={() => selectQuiz('maybe')}
            >Depends on my mood 🤷</div>
            <div
              className={`quiz-option${selectedQuizOption === 'no' ? ' selected' : ''}`}
              onClick={() => selectQuiz('no')}
            >Makes me want to scream 😤</div>
          </div>
          <div className={`quiz-result yes${quizResult === 'yes' ? ' show' : ''}`}>
            <strong>Perfect match!</strong> Survey work fits your style. You'll do great with the variety of topics and quick tasks.
          </div>
          <div className={`quiz-result maybe${quizResult === 'maybe' ? ' show' : ''}`}>
            <strong>Could work!</strong> Try the higher-paying platforms like Prolific first. They have more engaging research studies.
          </div>
          <div className={`quiz-result no${quizResult === 'no' ? ' show' : ''}`}>
            <strong>Maybe not your thing.</strong> That's okay! Check out our guides on Data Annotation or Transcription instead - more variety there.
          </div>
        </div>

        {/* Section: Overview */}
        <div className="section" id="overview">
          <div className={`section-header${openSection === 'overview' ? ' active' : ''}`} onClick={() => toggleSection('overview')}>
            <span className="section-icon">🎯</span>
            <div className="section-info">
              <div className="section-title">Is This Right For Me?</div>
              <div className="section-preview">Quick compatibility check + honest pros/cons</div>
            </div>
            <span className="section-time">2 min</span>
            <span className="section-arrow">▼</span>
          </div>
          <div className={`section-content${openSection === 'overview' ? ' open' : ''}`}>
            <div className="info-card success">
              <h4>✅ Good if you...</h4>
              <ul>
                <li>Like sharing opinions on products &amp; services</li>
                <li>Can focus for 5-20 minute bursts</li>
                <li>Get motivated by small, frequent rewards</li>
                <li>Want flexible "work when you want" income</li>
                <li>Are cool with $20-200/month supplemental income</li>
              </ul>
            </div>
            <div className="info-card danger">
              <h4>❌ Skip if you...</h4>
              <ul>
                <li>Get frustrated by boring, repetitive questions</li>
                <li>Need predictable, stable income</li>
                <li>Have severe rejection sensitivity (disqualifications happen a LOT)</li>
                <li>Are looking for serious money (this ain't it)</li>
              </ul>
            </div>
            <div className="info-card">
              <h4>🧠 ADHD Reality Check</h4>
              <p><strong>The good:</strong> Short tasks, topic variety, instant completion dopamine hits, work whenever you want</p>
              <p style={{ marginTop: '10px' }}><strong>The meh:</strong> Many surveys are mind-numbingly boring, you'll get kicked out of surveys a lot (screener fails), most pay $3-6/hour which can feel demoralizing</p>
            </div>
          </div>
        </div>

        {/* Section: Earnings */}
        <div className="section" id="earnings">
          <div className={`section-header${openSection === 'earnings' ? ' active' : ''}`} onClick={() => toggleSection('earnings')}>
            <span className="section-icon">💰</span>
            <div className="section-info">
              <div className="section-title">Real Earnings Breakdown</div>
              <div className="section-preview">No BS numbers + what actually pays well</div>
            </div>
            <span className="section-time">3 min</span>
            <span className="section-arrow">▼</span>
          </div>
          <div className={`section-content${openSection === 'earnings' ? ' open' : ''}`}>
            <div className="info-card money">
              <h4>💵 Monthly Expectations</h4>
              <p><strong>Casual (30 min/day):</strong> $20-60/month</p>
              <p><strong>Regular (1 hr/day):</strong> $60-120/month</p>
              <p><strong>Dedicated (2+ hrs/day):</strong> $150-300/month</p>
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>These are honest averages. Some months will be higher, some lower. Don't quit your day job.</p>
            </div>
            <div className="info-card success">
              <h4>🎯 The REAL Money Makers</h4>
              <ul>
                <li><strong>User Interviews:</strong> $50-200 per 30-60 min call (apply to EVERYTHING)</li>
                <li><strong>Focus Groups:</strong> $75-300 for 1-2 hour sessions</li>
                <li><strong>Product Testing:</strong> Free stuff + $20-50 bonus</li>
                <li><strong>Diary Studies:</strong> $50-200 for logging activities over a week</li>
              </ul>
              <p style={{ marginTop: '10px' }}>Regular surveys? Meh. Research studies? 💰</p>
            </div>
            <div className="info-card warning">
              <h4>⚠️ Pay Rate Cheat Sheet</h4>
              <p><strong>Excellent:</strong> $1+/minute ($60+/hr)</p>
              <p><strong>Good:</strong> $0.50-1/minute ($30-60/hr)</p>
              <p><strong>Meh:</strong> $0.15-0.50/minute ($9-30/hr)</p>
              <p><strong>Skip it:</strong> Under $0.15/minute (not worth your time)</p>
            </div>
          </div>
        </div>

        {/* Section: Platforms */}
        <div className="section" id="platforms">
          <div className={`section-header${openSection === 'platforms' ? ' active' : ''}`} onClick={() => toggleSection('platforms')}>
            <span className="section-icon">📱</span>
            <div className="section-info">
              <div className="section-title">Best Platforms (Ranked)</div>
              <div className="section-preview">Where to actually make money + signup links</div>
            </div>
            <span className="section-time">4 min</span>
            <span className="section-arrow">▼</span>
          </div>
          <div className={`section-content${openSection === 'platforms' ? ' open' : ''}`}>
            <p style={{ marginBottom: '20px', color: 'var(--text-dim)' }}>Ranked by ADHD-friendliness + actual pay. Sign up for all of these - more options = more money.</p>
            <div className="platform-grid">
              {[
                { name: '🥇 User Interviews', pay: '$50-200/session', desc: 'Video calls about products you use. High pay, engaging conversations.', adhd: '💜 ADHD Win: Talking > clicking. Way more interesting than surveys.', url: 'https://userinterviews.com', stars: 5 },
                { name: '🥈 Prolific', pay: '$8-18/hour', desc: 'Academic research studies. Actual interesting topics, fair pay.', adhd: '💜 ADHD Win: Studies are actually engaging! No boring ad surveys.', url: 'https://prolific.co', stars: 5 },
                { name: '🥉 Respondent', pay: '$75-300/study', desc: 'High-paying research for professionals. Best if you have industry experience.', adhd: '💜 ADHD Win: Fewer but higher-value opportunities. Quality > quantity.', url: 'https://respondent.io', stars: 4 },
                { name: '📱 dscout', pay: '$25-100/mission', desc: 'Mobile diary studies. Record video entries about your daily life.', adhd: '💜 ADHD Win: Creative expression! Better than clicking boxes.', url: 'https://dscout.com/participate-in-research-studies', stars: 4 },
                { name: '💎 PaidViewpoint', pay: '$5-10/week', desc: 'Ultra-short surveys (2-5 min). No screeners - every survey pays!', adhd: '💜 ADHD Win: Short bursts, guaranteed completion. No rejection frustration!', url: 'https://paidviewpoint.com', stars: 4 },
                { name: '📋 Survey Junkie', pay: '$3-6/hour', desc: 'Simple surveys. Good for mindless background work.', adhd: '⚠️ ADHD Warning: Repetitive. Good for low-energy days only.', url: 'https://surveyjunkie.com', stars: 2 },
              ].map((p, i) => (
                <div key={i} className="platform-card" onClick={() => window.open(p.url, '_blank')}>
                  <div className="platform-header">
                    <span className="platform-name">{p.name}</span>
                    <div className="platform-rating">
                      {Array(5).fill(null).map((_, si) => (
                        <span key={si} className={`star${si >= p.stars ? ' empty' : ''}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <span className="platform-pay">{p.pay}</span>
                  <p className="platform-desc">{p.desc}</p>
                  <div className="platform-adhd">{p.adhd}</div>
                  <a href={p.url} className="platform-link" target="_blank" rel="noreferrer">Sign up free →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: ADHD Tips */}
        <div className="section" id="adhd-tips">
          <div className={`section-header${openSection === 'adhd-tips' ? ' active' : ''}`} onClick={() => toggleSection('adhd-tips')}>
            <span className="section-icon">🧠</span>
            <div className="section-info">
              <div className="section-title">ADHD Survival Strategies</div>
              <div className="section-preview">Actually useful tips from people who get it</div>
            </div>
            <span className="section-time">3 min</span>
            <span className="section-arrow">▼</span>
          </div>
          <div className={`section-content${openSection === 'adhd-tips' ? ' open' : ''}`}>
            <div className="info-card">
              <h4>⚡ Match Your Energy</h4>
              <p><strong>Hyperfocus mode?</strong> Do User Interviews, focus groups, video missions</p>
              <p><strong>Medium energy?</strong> Prolific studies, dscout entries</p>
              <p><strong>Zombie mode?</strong> PaidViewpoint quick 2-5 minute surveys while watching TV</p>
              <p><strong>No energy?</strong> Don't force it. Take the day off.</p>
            </div>
            <div className="info-card success">
              <h4>🎯 The "Screener Strategy"</h4>
              <p>Getting kicked out of surveys sucks. Here's how to reduce it:</p>
              <ul>
                <li>Complete your profile 100% on every platform</li>
                <li>Be consistent with your answers (they track this)</li>
                <li>Don't rush - answer thoughtfully</li>
                <li>If you get screened out, move on fast. Don't dwell.</li>
              </ul>
            </div>
            <div className="info-card warning">
              <h4>⏰ Don't Fall Into The Trap</h4>
              <p>Easy to hyperfocus on surveys for hours chasing that next payout. Set boundaries:</p>
              <ul>
                <li>Timer: Max 1 hour per session</li>
                <li>Daily cap: Stop after $X earned</li>
                <li>Quality check: Only do surveys $0.50+/min</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Action Plan */}
        <div className="section" id="action-plan">
          <div className={`section-header${openSection === 'action-plan' ? ' active' : ''}`} onClick={() => toggleSection('action-plan')}>
            <span className="section-icon">🚀</span>
            <div className="section-info">
              <div className="section-title">Action Plan: Start NOW</div>
              <div className="section-preview">Step-by-step checklist to get earning today</div>
            </div>
            <span className="section-time">5 min</span>
            <span className="section-arrow">▼</span>
          </div>
          <div className={`section-content${openSection === 'action-plan' ? ' open' : ''}`}>
            <p style={{ marginBottom: '20px' }}>Complete each step to level up! ⬆️</p>
            <div className="checklist">
              {checklistItems.map((item, i) => (
                <div
                  key={i}
                  className={`check-item${checkedItems[i] ? ' checked' : ''}`}
                  onClick={() => toggleCheck(i)}
                >
                  <div className="check-box">{checkedItems[i] ? '✓' : ''}</div>
                  <span className={`check-text${checkedItems[i] ? ' checked' : ''}`}>
                    <strong>{item.text.split(' - ')[0]}</strong> - {item.text.split(' - ')[1]}
                  </span>
                </div>
              ))}
            </div>
            <div className="info-card success" style={{ marginTop: '20px' }}>
              <h4>🎯 Week 1 Goal</h4>
              <p>Get accepted to 3+ platforms and earn your first $10-20. That's it. Small wins build momentum!</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '40px 0', padding: '30px' }}>
          <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Ready to start?</p>
          <a href="https://userinterviews.com" className="action-btn primary" target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            🚀 Sign up for User Interviews (Best One)
          </a>
        </div>
      </div>
    </div>
  )
}
