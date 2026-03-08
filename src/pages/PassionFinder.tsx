import { useState } from 'react'
import '../styles/pages/PassionFinder.css'

type EnergyLevel = 'overwhelmed' | 'ready' | 'motivated'
type TimeCommitment = 'minimal' | 'parttime' | 'serious' | 'flexible'
type Skill = 'communication' | 'writing' | 'creative' | 'tech' | 'social' | 'research' | 'helping' | 'sales'
type IncomeGoal = 'pocket-money' | 'bill-money' | 'serious-income' | 'replacement'
type Difficulty = 'easy' | 'medium' | 'hard'
type Screen = 'title' | 'quiz' | 'results'

interface Platform {
  name: string
  desc: string
  earning: string
  timeToStart: string
  difficulty: Difficulty
  skills: Skill[]
  timeCommitment: TimeCommitment[]
  energy: EnergyLevel[]
  income: IncomeGoal[]
  url: string
  category: string
}

interface Answers {
  energy: EnergyLevel | null
  timeCommitment: TimeCommitment | null
  skills: Skill[]
  income: IncomeGoal | null
}

const PLATFORMS: Platform[] = [
  { name: 'Swagbucks', desc: 'Surveys, watching videos, online shopping cashback - perfect for multitasking', earning: '$30-100/month', timeToStart: 'Start earning today', difficulty: 'easy', skills: ['research'], timeCommitment: ['minimal', 'flexible'], energy: ['overwhelmed'], income: ['pocket-money'], url: 'https://www.swagbucks.com/lp-savings-button?cmp=695&cxid=7178-join', category: 'Quick & Easy Money' },
  { name: 'UserTesting', desc: 'Test websites and share your honest opinion - $10 per 20-minute test', earning: '$60-300/month', timeToStart: '1-2 days approval', difficulty: 'easy', skills: ['research', 'communication'], timeCommitment: ['minimal', 'parttime', 'flexible'], energy: ['overwhelmed', 'ready'], income: ['pocket-money', 'bill-money'], url: 'https://www.usertesting.com/get-paid-to-test', category: 'Quick & Easy Money' },
  { name: 'Prolific', desc: 'Academic research studies - much better pay than typical surveys (may have waitlist)', earning: '$80-250/month', timeToStart: 'Instant approval (if open)', difficulty: 'easy', skills: ['research'], timeCommitment: ['minimal', 'parttime', 'flexible'], energy: ['overwhelmed', 'ready'], income: ['pocket-money', 'bill-money'], url: 'https://app.prolific.co/register/participant', category: 'Quick & Easy Money' },
  { name: 'Amazon Mechanical Turk', desc: 'Micro-tasks like data entry, transcription, simple research', earning: '$100-500/month', timeToStart: '1-3 days approval', difficulty: 'easy', skills: ['research', 'writing'], timeCommitment: ['minimal', 'parttime', 'flexible'], energy: ['overwhelmed', 'ready'], income: ['pocket-money', 'bill-money'], url: 'https://worker.mturk.com/', category: 'Quick & Easy Money' },
  { name: 'Cambly', desc: 'Casual English conversation - no teaching experience required, just be a native speaker', earning: '$200-800/month', timeToStart: '2-3 days', difficulty: 'easy', skills: ['communication'], timeCommitment: ['parttime', 'serious', 'flexible'], energy: ['ready', 'motivated'], income: ['bill-money'], url: 'https://www.cambly.com/en/tutors?lang=en', category: 'Communication & Teaching' },
  { name: 'Preply', desc: 'Teach any skill you know - languages, music, academic subjects, life skills', earning: '$400-2000/month', timeToStart: '1 week', difficulty: 'medium', skills: ['communication', 'helping'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income'], url: 'https://preply.com/en/become-a-tutor', category: 'Communication & Teaching' },
  { name: 'Rev Transcription', desc: 'Transcribe audio to text - work when you want, good for people who like detail work', earning: '$150-600/month', timeToStart: 'Pass skills test', difficulty: 'easy', skills: ['writing', 'research'], timeCommitment: ['minimal', 'parttime', 'flexible'], energy: ['overwhelmed', 'ready'], income: ['pocket-money', 'bill-money'], url: 'https://www.rev.com/freelancers/transcription', category: 'Communication & Teaching' },
  { name: 'Fiverr', desc: 'Sell any service you can do - writing, design, voice-overs, even lifestyle advice', earning: '$300-3000/month', timeToStart: 'Create profile today', difficulty: 'medium', skills: ['creative', 'writing', 'tech', 'helping'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income'], url: 'https://www.fiverr.com/start_selling', category: 'Creative & Content' },
  { name: 'Etsy Digital Products', desc: 'Create and sell digital downloads - printables, templates, guides, courses', earning: '$200-2000/month', timeToStart: '1-2 weeks to create', difficulty: 'medium', skills: ['creative', 'writing', 'tech'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income'], url: 'https://www.etsy.com/sell', category: 'Creative & Content' },
  { name: 'Medium Partner Program', desc: 'Get paid for writing articles about things you\'re passionate about', earning: '$100-1500/month', timeToStart: 'Start writing today', difficulty: 'easy', skills: ['writing'], timeCommitment: ['minimal', 'parttime', 'flexible'], energy: ['ready', 'motivated'], income: ['pocket-money', 'bill-money', 'serious-income'], url: 'https://medium.com/creators', category: 'Creative & Content' },
  { name: 'TikTok Creator Fund', desc: 'Create engaging short videos about your interests or expertise', earning: '$100-5000/month', timeToStart: 'Build audience first', difficulty: 'medium', skills: ['social', 'creative'], timeCommitment: ['parttime', 'serious'], energy: ['motivated'], income: ['bill-money', 'serious-income', 'replacement'], url: 'https://www.tiktok.com/creators/creator-portal/en-us/', category: 'Social Media & Content' },
  { name: 'YouTube', desc: 'Video content creation - tutorials, vlogs, reviews, or educational content', earning: '$200-10000+/month', timeToStart: '3-6 months to monetize', difficulty: 'hard', skills: ['communication', 'creative', 'tech'], timeCommitment: ['serious'], energy: ['motivated'], income: ['serious-income', 'replacement'], url: 'https://www.youtube.com/creators/how-things-work/making-money-on-youtube/', category: 'Social Media & Content' },
  { name: 'Upwork', desc: 'Freelance platform for all skills - writing, design, programming, virtual assistance', earning: '$500-5000+/month', timeToStart: 'Profile approval + first client', difficulty: 'medium', skills: ['tech', 'writing', 'creative', 'helping'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income', 'replacement'], url: 'https://www.upwork.com/freelance-jobs/', category: 'Professional Freelancing' },
  { name: 'Amazon FBA', desc: 'Private label products or retail arbitrage - Amazon handles storage and shipping', earning: '$500-5000+/month', timeToStart: '1-3 months setup', difficulty: 'hard', skills: ['research', 'sales'], timeCommitment: ['parttime', 'serious'], energy: ['motivated'], income: ['serious-income', 'replacement'], url: 'https://sellercentral.amazon.com/gp/homepage.html', category: 'E-commerce & Sales' },
  { name: 'Dropshipping', desc: 'Sell products online without holding inventory - focus on marketing', earning: '$300-3000+/month', timeToStart: '2-4 weeks setup', difficulty: 'medium', skills: ['sales', 'social', 'creative'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income'], url: 'https://www.shopify.com/start', category: 'E-commerce & Sales' },
  { name: 'Virtual Assistant', desc: 'Help businesses with admin tasks, email management, scheduling, research', earning: '$400-2500/month', timeToStart: '1-2 weeks', difficulty: 'easy', skills: ['helping', 'communication', 'research'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['bill-money', 'serious-income'], url: 'https://belay.com/become-a-belay-contractor/', category: 'Virtual Services' },
  { name: 'Online Bookkeeping', desc: 'Manage finances for small businesses - QuickBooks certification helpful', earning: '$800-3000/month', timeToStart: '1-2 months training', difficulty: 'medium', skills: ['research', 'helping'], timeCommitment: ['parttime', 'serious'], energy: ['ready', 'motivated'], income: ['serious-income', 'replacement'], url: 'https://quickbooks.intuit.com/accountants/training-certification/', category: 'Virtual Services' },
]

const CATEGORY_ICONS: Record<string, string> = {
  'Quick & Easy Money': '⚡',
  'Communication & Teaching': '💬',
  'Creative & Content': '🎨',
  'Social Media & Content': '📱',
  'Tech & Development': '💻',
  'Professional Freelancing': '💼',
  'E-commerce & Sales': '🛍️',
  'Virtual Services': '🤝',
}

export default function PassionFinder() {
  const [screen, setScreen] = useState<Screen>('title')
  const [question, setQuestion] = useState(1)
  const [answers, setAnswers] = useState<Answers>({ energy: null, timeCommitment: null, skills: [], income: null })

  const goToQuestion = (q: number) => {
    setQuestion(q)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startQuiz = () => {
    setScreen('quiz')
    setQuestion(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectEnergy = (value: EnergyLevel) => {
    setAnswers(a => ({ ...a, energy: value }))
    setTimeout(() => goToQuestion(2), 700)
  }

  const selectTime = (value: TimeCommitment) => {
    setAnswers(a => ({ ...a, timeCommitment: value }))
    setTimeout(() => goToQuestion(3), 700)
  }

  const toggleSkill = (value: Skill) => {
    setAnswers(a => ({
      ...a,
      skills: a.skills.includes(value) ? a.skills.filter(s => s !== value) : [...a.skills, value],
    }))
  }

  const selectIncome = (value: IncomeGoal) => {
    setAnswers(a => ({ ...a, income: value }))
    setTimeout(() => {
      setScreen('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 700)
  }

  const restart = () => {
    setAnswers({ energy: null, timeCommitment: null, skills: [], income: null })
    setQuestion(1)
    setScreen('title')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const findMatches = () => {
    return PLATFORMS.map(p => {
      let score = 0
      if (answers.energy && p.energy.includes(answers.energy)) score += 4
      if (answers.timeCommitment && p.timeCommitment.includes(answers.timeCommitment)) score += 3
      if (answers.income && p.income.includes(answers.income)) score += 3
      answers.skills.forEach(s => { if (p.skills.includes(s)) score += 2 })
      if (answers.energy === 'overwhelmed' && p.difficulty === 'easy') score += 2
      if (answers.energy === 'motivated' && p.difficulty === 'hard') score += 1
      return { ...p, score }
    }).filter(p => p.score > 2).sort((a, b) => b.score - a.score)
  }

  const progress = screen === 'results' ? 100 : (question / 4) * 100
  const progressLabel = screen === 'results' ? 'Complete!' : `Question ${question} of 4`

  return (
    <div className="passion-finder">

      {/* Title screen */}
      {screen === 'title' && (
        <div className="pf-title-screen">
          <div className="pf-card">
            <h1 className="pf-hero-title">
              <span className="pf-gradient-text">Passion Finder</span>
            </h1>
            <p className="pf-hero-subtitle">
              Find your perfect online income stream in just 4 questions.
              Get personalized recommendations based on your energy, skills, and goals.
            </p>
            <button className="pf-start-btn" onClick={startQuiz}>
              🚀 Start Assessment
            </button>
          </div>
        </div>
      )}

      {/* Quiz + Results */}
      {(screen === 'quiz' || screen === 'results') && (
        <>
          <div className="pf-progress-wrap">
            <div className="pf-progress-bar">
              <div className="pf-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="pf-progress-label">{progressLabel}</div>
          </div>

          <div className="pf-card">

            {/* Q1: Energy */}
            {screen === 'quiz' && question === 1 && (
              <div className="pf-question">
                <h2>What's Your Current Situation?</h2>
                <p className="pf-q-desc">Be honest — where are you at right now?</p>
                <div className="pf-options-grid">
                  {([
                    { value: 'overwhelmed', emoji: '😴', title: 'Overwhelmed/Low Energy', desc: 'Need something simple to start with' },
                    { value: 'ready',       emoji: '🎯', title: 'Ready to Learn',         desc: 'Willing to put in effort for better results' },
                    { value: 'motivated',   emoji: '🚀', title: 'Highly Motivated',        desc: 'Ready to build something significant' },
                  ] as const).map(opt => (
                    <div
                      key={opt.value}
                      className={`pf-option${answers.energy === opt.value ? ' selected' : ''}`}
                      onClick={() => selectEnergy(opt.value)}
                    >
                      <span className="pf-opt-emoji">{opt.emoji}</span>
                      <div className="pf-opt-title">{opt.title}</div>
                      <div className="pf-opt-desc">{opt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Q2: Time */}
            {screen === 'quiz' && question === 2 && (
              <div className="pf-question">
                <h2>How Much Time Can You Commit?</h2>
                <p className="pf-q-desc">Be realistic about your available time and preferred schedule</p>
                <div className="pf-options-grid">
                  {([
                    { value: 'minimal',  emoji: '⏰', title: '1-5 Hours/Week',      desc: 'Just starting, very limited time' },
                    { value: 'parttime', emoji: '📅', title: '5-15 Hours/Week',     desc: 'Steady side income goal' },
                    { value: 'serious',  emoji: '💼', title: '15+ Hours/Week',      desc: 'Serious about building income' },
                    { value: 'flexible', emoji: '🌍', title: 'Flexible Schedule',   desc: 'Need to work around life/other commitments' },
                  ] as const).map(opt => (
                    <div
                      key={opt.value}
                      className={`pf-option${answers.timeCommitment === opt.value ? ' selected' : ''}`}
                      onClick={() => selectTime(opt.value)}
                    >
                      <span className="pf-opt-emoji">{opt.emoji}</span>
                      <div className="pf-opt-title">{opt.title}</div>
                      <div className="pf-opt-desc">{opt.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="pf-nav">
                  <button className="pf-btn-secondary" onClick={() => goToQuestion(1)}>← Back</button>
                </div>
              </div>
            )}

            {/* Q3: Skills (multi-select) */}
            {screen === 'quiz' && question === 3 && (
              <div className="pf-question">
                <h2>What Are You Naturally Good At?</h2>
                <p className="pf-q-desc">Choose what feels easy or interesting to you — select multiple</p>
                <div className="pf-options-grid pf-options-grid--wide">
                  {([
                    { value: 'communication', emoji: '💬', title: 'Talking & Teaching',    desc: 'Explaining things, helping others' },
                    { value: 'writing',       emoji: '✍️',  title: 'Writing',               desc: 'Content, emails, social media' },
                    { value: 'creative',      emoji: '🎨', title: 'Creative Work',          desc: 'Design, art, making things' },
                    { value: 'tech',          emoji: '💻', title: 'Tech Skills',             desc: 'Websites, apps, digital tools' },
                    { value: 'social',        emoji: '📱', title: 'Social Media',            desc: 'Content creation, engagement' },
                    { value: 'research',      emoji: '🔍', title: 'Research & Analysis',     desc: 'Finding info, testing, reviewing' },
                    { value: 'helping',       emoji: '🤝', title: 'Helping Others',          desc: 'Support, customer service, assistance' },
                    { value: 'sales',         emoji: '🛍️', title: 'Sales & Marketing',       desc: 'Promoting products, persuading' },
                  ] as const).map(opt => (
                    <div
                      key={opt.value}
                      className={`pf-option${answers.skills.includes(opt.value) ? ' selected' : ''}`}
                      onClick={() => toggleSkill(opt.value)}
                    >
                      <span className="pf-opt-emoji">{opt.emoji}</span>
                      <div className="pf-opt-title">{opt.title}</div>
                      <div className="pf-opt-desc">{opt.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="pf-nav">
                  <button className="pf-btn-secondary" onClick={() => goToQuestion(2)}>← Back</button>
                  <button
                    className="pf-btn-primary"
                    disabled={answers.skills.length === 0}
                    onClick={() => goToQuestion(4)}
                  >
                    Next Question →
                  </button>
                </div>
              </div>
            )}

            {/* Q4: Income */}
            {screen === 'quiz' && question === 4 && (
              <div className="pf-question">
                <h2>What's Your Income Goal?</h2>
                <p className="pf-q-desc">What would feel like success to you?</p>
                <div className="pf-options-grid">
                  {([
                    { value: 'pocket-money',   emoji: '💵', title: '$50-200/month',    desc: 'Just some extra pocket money' },
                    { value: 'bill-money',      emoji: '📊', title: '$200-800/month',   desc: 'Cover some bills or expenses' },
                    { value: 'serious-income',  emoji: '💰', title: '$800-2500/month',  desc: 'Significant additional income' },
                    { value: 'replacement',     emoji: '🏆', title: '$2500+/month',     desc: 'Replace current job income' },
                  ] as const).map(opt => (
                    <div
                      key={opt.value}
                      className={`pf-option${answers.income === opt.value ? ' selected' : ''}`}
                      onClick={() => selectIncome(opt.value)}
                    >
                      <span className="pf-opt-emoji">{opt.emoji}</span>
                      <div className="pf-opt-title">{opt.title}</div>
                      <div className="pf-opt-desc">{opt.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="pf-nav">
                  <button className="pf-btn-secondary" onClick={() => goToQuestion(3)}>← Back</button>
                </div>
              </div>
            )}

            {/* Results */}
            {screen === 'results' && (() => {
              const matches = findMatches()
              const grouped = matches.reduce<Record<string, (typeof matches[0])[]>>((acc, p) => {
                if (!acc[p.category]) acc[p.category] = []
                acc[p.category].push(p)
                return acc
              }, {})

              return (
                <div className="pf-results">
                  <div className="pf-results-header">
                    <h2>🎉 Your Personalized Income Paths!</h2>
                    <p>Start with the Beginner Friendly options, then work your way up as you gain confidence.</p>
                  </div>

                  {matches.length === 0 ? (
                    <div className="pf-no-matches">
                      <p>🤔 Try going back and selecting more skills or adjusting your preferences.</p>
                    </div>
                  ) : (
                    Object.entries(grouped).map(([category, platforms]) => (
                      <div key={category} className="pf-category">
                        <div className="pf-category-title">
                          {CATEGORY_ICONS[category] || '💡'} {category}
                        </div>
                        <div className="pf-platform-grid">
                          {platforms.slice(0, 3).map(p => (
                            <div key={p.name} className="pf-platform-card">
                              <div className="pf-platform-header">
                                <div className="pf-platform-name">{p.name}</div>
                                <div className={`pf-badge pf-badge--${p.difficulty}`}>{p.difficulty.toUpperCase()}</div>
                              </div>
                              <div className="pf-platform-desc">{p.desc}</div>
                              <div className="pf-platform-stats">
                                <span className="pf-earning">{p.earning}</span>
                                <span className="pf-time">{p.timeToStart}</span>
                              </div>
                              <a href={p.url} target="_blank" rel="noopener noreferrer" className="pf-platform-link">
                                Start Earning →
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}

                  <div className="pf-nav">
                    <button className="pf-btn-restart" onClick={restart}>🔄 Start Over</button>
                  </div>
                </div>
              )
            })()}

          </div>
        </>
      )}
    </div>
  )
}
