import { useState } from 'react'
import '../styles/pages/TranscriptionGuide.css'

type SectionId = 'fit' | 'platforms' | 'tips' | 'start' | null

interface QuizState {
  currentQuestion: number
  answers: Record<number, number>
  showResults: boolean
}

const questions = [
  {
    num: 1,
    text: 'How fast can you type?',
    options: [
      { emoji: '🐢', text: 'Under 40 WPM (hunt and peck)', score: 0 },
      { emoji: '🚶', text: '40-60 WPM (average)', score: 1 },
      { emoji: '🏃', text: '60-80 WPM (good)', score: 2 },
      { emoji: '⚡', text: '80+ WPM (speedy!)', score: 3 },
    ],
  },
  {
    num: 2,
    text: 'How well do you understand unclear audio?',
    options: [
      { emoji: '😵', text: 'I ask "what?" a lot in conversations', score: 0 },
      { emoji: '🤔', text: 'Accents trip me up sometimes', score: 1 },
      { emoji: '👂', text: 'Pretty good - I follow podcasts easily', score: 2 },
      { emoji: '🦻', text: 'Excellent - I catch mumbles and accents', score: 3 },
    ],
  },
  {
    num: 3,
    text: 'How long can you focus on one task?',
    options: [
      { emoji: '🦋', text: '5-10 minutes max, then I drift', score: 0 },
      { emoji: '⏰', text: '15-20 minutes with effort', score: 1 },
      { emoji: '🎯', text: '30-45 minutes when interested', score: 2 },
      { emoji: '🔥', text: 'I can hyperfocus for hours', score: 3 },
    ],
  },
  {
    num: 4,
    text: 'How do you feel about repetitive work?',
    options: [
      { emoji: '😫', text: 'Hate it - I need constant variety', score: 0 },
      { emoji: '😐', text: 'Can tolerate it in short bursts', score: 1 },
      { emoji: '😌', text: "It's fine - kind of meditative actually", score: 2 },
      { emoji: '😊', text: 'I find rhythm in repetition', score: 3 },
    ],
  },
  {
    num: 5,
    text: 'What are your income expectations?',
    options: [
      { emoji: '💰', text: 'I need to replace a full-time job', score: 0 },
      { emoji: '💵', text: 'Want a solid part-time income ($500+/mo)', score: 1 },
      { emoji: '🪙', text: 'Extra spending money ($150-400/mo)', score: 2 },
      { emoji: '✨', text: 'Any extra income helps!', score: 3 },
    ],
  },
]

const categoryLabels: Record<number, { label: string; icon: string }> = {
  1: { label: 'Typing Speed', icon: '⌨️' },
  2: { label: 'Audio Understanding', icon: '👂' },
  3: { label: 'Focus Duration', icon: '🎯' },
  4: { label: 'Repetition Tolerance', icon: '🔄' },
  5: { label: 'Income Expectations', icon: '💰' },
}

export default function TranscriptionGuide() {
  const [openSection, setOpenSection] = useState<SectionId>('fit')
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 1,
    answers: {},
    showResults: false,
  })
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(6).fill(false))

  const toggleSection = (section: SectionId) => {
    setOpenSection(prev => (prev === section ? null : section))
  }

  const selectOption = (questionNum: number, score: number) => {
    const newAnswers = { ...quizState.answers, [questionNum]: score }
    if (questionNum < 5) {
      setTimeout(() => {
        setQuizState({ currentQuestion: questionNum + 1, answers: newAnswers, showResults: false })
      }, 400)
    } else {
      setTimeout(() => {
        setQuizState({ currentQuestion: questionNum, answers: newAnswers, showResults: true })
      }, 400)
    }
    setQuizState(prev => ({ ...prev, answers: newAnswers }))
  }

  const restartQuiz = () => {
    setQuizState({ currentQuestion: 1, answers: {}, showResults: false })
  }

  const toggleCheck = (i: number) => {
    const next = [...checkedItems]
    next[i] = !next[i]
    setCheckedItems(next)
  }

  const total = Object.values(quizState.answers).reduce((a, b) => a + b, 0)
  const getResult = () => {
    if (total >= 12) return { icon: '🎉', title: 'Great Fit!', titleClass: 'great', advice: "<h4>🚀 You're Set Up for Success</h4><p>Your skills and expectations align well with transcription work. Start with TranscribeMe for ADHD-friendly short files, or GoTranscript for immediate access.</p><p style='margin-top:10px'><strong>Next step:</strong> Apply to 2-3 platforms today while you're motivated!</p>" }
    if (total >= 8) return { icon: '👍', title: 'Good Potential', titleClass: 'good', advice: "<h4>📈 You Can Make This Work</h4><p>You have some strengths for transcription. Focus on building up any weaker areas - especially typing speed if that's your gap.</p><p style='margin-top:10px'><strong>Next step:</strong> Practice typing for a week, then apply to GoTranscript.</p>" }
    if (total >= 5) return { icon: '🤔', title: 'Maybe Consider Alternatives', titleClass: 'maybe', advice: '<h4>⚖️ Honest Assessment</h4><p>Transcription might be frustrating with your current profile. Consider building typing speed first (keybr.com) or trying other gigs.</p>' }
    return { icon: '🔄', title: 'Probably Not Your Thing', titleClass: 'skip', advice: "<h4>💡 Good News: There Are Better Options</h4><p>Transcription likely isn't your best path. Check out user testing, short surveys, or creative work instead.</p>" }
  }

  const result = getResult()

  return (
    <div className="transcription-guide">
      <div className="warning-banner">
        <span className="warning-icon">⚠️</span>
        <div className="warning-text">
          <h3>Real Talk: AI Changed This Industry</h3>
          <p>Transcription isn't what it was 5 years ago. AI now does 80% of the work. Human transcriptionists mainly edit AI output or handle complex audio. Expect $150-400/month, not thousands. This guide gives honest expectations.</p>
        </div>
      </div>

      <div className="hero">
        <div className="hero-icon">🎧</div>
        <h1><span>Transcription</span></h1>
        <p className="subtitle">Type what you hear. Work when you want.</p>
      </div>

      <div className="stats">
        <div className="stat"><div className="stat-value">$150-400</div><div className="stat-label">realistic monthly</div></div>
        <div className="stat"><div className="stat-value">⭐⭐⭐</div><div className="stat-label">ADHD friendly</div></div>
        <div className="stat"><div className="stat-value">60+ WPM</div><div className="stat-label">typing needed</div></div>
      </div>

      <div className="quick-nav">
        <a href="#fit" className="nav-btn">🎯 Take the Quiz</a>
        <a href="#platforms" className="nav-btn">📱 Platforms</a>
        <a href="#tips" className="nav-btn">🧠 ADHD Tips</a>
        <a href="#start" className="nav-btn">🚀 Start</a>
      </div>

      {/* Quiz Section */}
      <div className="section" id="fit">
        <div className={`section-header${openSection === 'fit' ? ' open' : ''}`} onClick={() => toggleSection('fit')}>
          <span className="section-icon">🎯</span>
          <div className="section-info">
            <div className="section-title">Is Transcription Right For You?</div>
            <div className="section-desc">Quick 5-question quiz • Get your honest answer</div>
          </div>
          <span className="section-badge">1 min</span>
          <span className="section-arrow">▼</span>
        </div>
        <div className={`section-body${openSection === 'fit' ? ' show' : ''}`}>
          <div className="quiz-container" id="quiz">
            {!quizState.showResults && (
              <>
                <div className="quiz-progress">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div
                      key={n}
                      className={`progress-dot${n === quizState.currentQuestion ? ' active' : n < quizState.currentQuestion ? ' complete' : ''}`}
                      data-q={n}
                    />
                  ))}
                </div>
                {questions.map(q => (
                  <div
                    key={q.num}
                    className={`quiz-question${quizState.currentQuestion === q.num ? ' active' : ''}`}
                    data-question={q.num}
                  >
                    <div className="question-number">Question {q.num} of 5</div>
                    <div className="question-text">{q.text}</div>
                    <div className="quiz-options">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`quiz-option${quizState.answers[q.num] === opt.score ? ' selected' : ''}`}
                          data-score={opt.score}
                          onClick={() => selectOption(q.num, opt.score)}
                        >
                          <span className="option-emoji">{opt.emoji}</span>
                          <span className="option-text">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}

            {quizState.showResults && (
              <div className="quiz-results active" id="quizResults">
                <div className="result-icon">{result.icon}</div>
                <h3 className={`result-title ${result.titleClass}`}>{result.title}</h3>
                <div className="result-score">{total}/15 points</div>
                <div className="result-breakdown">
                  {[1, 2, 3, 4, 5].map(q => {
                    const score = quizState.answers[q] ?? 0
                    const scoreClass = score >= 2 ? 'high' : score === 1 ? 'med' : 'low'
                    const scoreLabel = score >= 2 ? 'Good' : score === 1 ? 'OK' : 'Gap'
                    return (
                      <div key={q} className="breakdown-item">
                        <span className="breakdown-icon">{categoryLabels[q].icon}</span>
                        <span className="breakdown-text">{categoryLabels[q].label}</span>
                        <span className={`breakdown-score ${scoreClass}`}>{scoreLabel}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="result-advice" dangerouslySetInnerHTML={{ __html: result.advice }} />
                <button className="quiz-restart" onClick={restartQuiz}>🔄 Take Quiz Again</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="section" id="platforms">
        <div className={`section-header${openSection === 'platforms' ? ' open' : ''}`} onClick={() => toggleSection('platforms')}>
          <span className="section-icon">📱</span>
          <div className="section-info">
            <div className="section-title">Best Platforms (Ranked)</div>
            <div className="section-desc">Where to actually make money in 2025</div>
          </div>
          <span className="section-badge">4 min</span>
          <span className="section-arrow">▼</span>
        </div>
        <div className={`section-body${openSection === 'platforms' ? ' show' : ''}`}>
          <div className="card yellow">
            <h4>⚠️ Platform Reality</h4>
            <p>Many transcription platforms have waitlists or hiring freezes. Sign up for all of them - you might wait weeks to get in.</p>
          </div>
          <div className="platforms">
            {[
              { name: '🥇 TranscribeMe', status: 'limited', statusLabel: 'Limited spots', pay: '$15-22/audio hour', desc: 'Short files (2-4 min). Clean interface. Best for ADHD attention spans.', adhd: '💜 ADHD: ⭐⭐⭐⭐⭐ - Short bursts = perfect', url: 'https://www.transcribeme.com/jobs/', linkText: 'Apply →' },
              { name: '🥈 GoTranscript', status: 'waitlist', statusLabel: 'Paused', pay: '$0.60/audio minute', desc: 'Most accessible. Regular work available. Longer files though.', adhd: '💜 ADHD: ⭐⭐⭐ - Can be repetitive', url: 'https://gotranscript.com/transcription-jobs', linkText: 'Apply →' },
              { name: '🥉 Rev', status: 'waitlist', statusLabel: 'Waitlist', pay: '$0.30-0.75/audio minute', desc: 'Big name, but competitive. 72,000+ freelancers. Low pay now.', adhd: '💜 ADHD: ⭐⭐⭐ - Clean interface, low motivation pay', url: 'https://www.rev.com/freelancers', linkText: 'Join waitlist →' },
              { name: 'Scribie', status: 'waitlist', statusLabel: 'Paused', pay: '$5-25/audio hour', desc: 'Short files. Great for ADHD. But hiring is paused right now.', adhd: '💜 ADHD: ⭐⭐⭐⭐⭐ - Best format, but unavailable', url: 'https://legacy.scribie.com/transcription/freelance', linkText: 'Check status →' },
            ].map((p, i) => (
              <div key={i} className="platform">
                <div className="platform-top">
                  <span className="platform-name">{p.name}</span>
                  <span className={`platform-status ${p.status}`}>{p.statusLabel}</span>
                </div>
                <div className="platform-pay">💰 {p.pay}</div>
                <p className="platform-desc">{p.desc}</p>
                <div className="platform-adhd">{p.adhd}</div>
                <a href={p.url} className="platform-link" target="_blank" rel="noreferrer">{p.linkText}</a>
              </div>
            ))}
          </div>
          <div className="card purple">
            <h4>🚀 The New Opportunity: AI Editing</h4>
            <p>Instead of transcribing from scratch, many platforms now need people to <strong>edit AI transcriptions</strong>. This can be:</p>
            <ul>
              <li>Less tedious (skeleton already done)</li>
              <li>Higher hourly rate (less time per file)</li>
              <li>Good fit for detail-oriented ADHD pattern-spotting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ADHD Tips */}
      <div className="section" id="tips">
        <div className={`section-header${openSection === 'tips' ? ' open' : ''}`} onClick={() => toggleSection('tips')}>
          <span className="section-icon">🧠</span>
          <div className="section-info">
            <div className="section-title">ADHD Survival Guide</div>
            <div className="section-desc">Actually helpful strategies</div>
          </div>
          <span className="section-badge">3 min</span>
          <span className="section-arrow">▼</span>
        </div>
        <div className={`section-body${openSection === 'tips' ? ' show' : ''}`}>
          <div className="card green">
            <h4>⚡ Match Work to Energy</h4>
            <ul>
              <li><strong>Hyperfocus:</strong> Tackle complex audio (accents, technical content)</li>
              <li><strong>Medium energy:</strong> Clear audio, straightforward content</li>
              <li><strong>Low energy:</strong> Skip it. Tired transcription = errors = banned.</li>
            </ul>
          </div>
          <div className="card">
            <h4>🎧 Audio That Works for ADHD</h4>
            <ul>
              <li>Choose interesting topics (podcasts &gt; boring meetings)</li>
              <li>Start with clear audio first (build confidence)</li>
              <li>Avoid multi-speaker chaos when tired</li>
              <li>Pick short files when focus is shaky</li>
            </ul>
          </div>
          <div className="card pink">
            <h4>⏰ Session Structure</h4>
            <ol>
              <li><strong>2 min:</strong> Pick your file, read guidelines</li>
              <li><strong>25-30 min:</strong> Transcribe (set timer!)</li>
              <li><strong>5 min:</strong> Proofread carefully</li>
              <li><strong>5 min:</strong> Break - walk, stretch, snack</li>
              <li><strong>Repeat max 3x:</strong> Then stop for the day</li>
            </ol>
          </div>
          <div className="card yellow">
            <h4>⚠️ ADHD Pitfall Prevention</h4>
            <ul>
              <li><strong>Rushing:</strong> Slow down. Accuracy matters more than speed.</li>
              <li><strong>Skipping proofreading:</strong> Always review. Always.</li>
              <li><strong>Working tired:</strong> Mistakes = bad ratings = fewer jobs.</li>
              <li><strong>Long sessions:</strong> Diminishing returns after 2 hours.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Start */}
      <div className="section" id="start">
        <div className={`section-header${openSection === 'start' ? ' open' : ''}`} onClick={() => toggleSection('start')}>
          <span className="section-icon">🚀</span>
          <div className="section-info">
            <div className="section-title">Get Started Today</div>
            <div className="section-desc">Your action plan</div>
          </div>
          <span className="section-badge">5 min</span>
          <span className="section-arrow">▼</span>
        </div>
        <div className={`section-body${openSection === 'start' ? ' show' : ''}`}>
          <div className="card">
            <h4>🎯 Week 1 Goals</h4>
            <p><strong>Apply:</strong> Sign up for all platforms (some have waitlists)</p>
            <p><strong>Practice:</strong> Get typing to 60+ WPM if you're not there</p>
            <p><strong>Expect:</strong> $0-50 (mostly onboarding and practice)</p>
          </div>
          <div className="checklist">
            {[
              'Test typing speed - Know where you stand',
              'Apply to GoTranscript - Most accessible',
              'Apply to TranscribeMe - Best for ADHD',
              'Join Rev waitlist - Backup option',
              'Get good headphones - Seriously worth it',
              'Complete your first file - Any file!',
            ].map((item, i) => (
              <div key={i} className={`check-item${checkedItems[i] ? ' done' : ''}`} onClick={() => toggleCheck(i)}>
                <div className="check-box">{checkedItems[i] ? '✓' : ''}</div>
                <span className="check-text">
                  <strong>{item.split(' - ')[0]}</strong> - {item.split(' - ')[1]}
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a href="https://www.transcribeme.com/jobs/" className="cta" target="_blank" rel="noreferrer">
              🎧 Apply to TranscribeMe (Open Now)
            </a>
            <p style={{ marginTop: '15px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>TranscribeMe often has openings — try applying there while others are paused.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
        <p>Transcription won't make you rich in 2026.</p>
        <p>But if you like audio work and typing, it's decent supplemental income. 🎧</p>
      </div>
    </div>
  )
}
