import { useState } from 'react'
import '../styles/pages/Mindshift.css'

const quotes = [
  "You've got the power to thrive, not just survive.",
  "You're not stuck. You just need a moment.",
  "One thing. Right now. That's enough.",
  "Small steps still move you forward.",
  "Progress isn't linear — and that's okay.",
  "Chaos is just creativity with nowhere to go yet.",
  "Different, not less.",
  "Who's going to stop me?",
]


interface StrategyItem {
  title: string
  desc: string
  steps: string[]
  evidence: string
}

interface CategoryStrategy {
  title: string
  subtitle: string
  items: StrategyItem[]
}

const categories = [
  { id: 'executive', icon: '🧠', title: "Can't Get Organized", desc: 'Brain fog, can\'t plan, forget everything' },
  { id: 'emotional', icon: '🌊', title: 'Feelings Are Huge', desc: 'Mad, sad, or scared feelings take over' },
  { id: 'focus', icon: '🎯', title: "Can't Focus", desc: "Mind jumps around, can't stick with tasks" },
  { id: 'energy', icon: '⚡', title: 'No Energy', desc: "Can't start things, feel tired or stuck" },
  { id: 'anxiety', icon: '🌪️', title: "Everything's Too Much", desc: 'Sounds, lights, people are overwhelming' },
  { id: 'reward', icon: '🎪', title: 'Super Bored', desc: 'Nothing feels fun or interesting' },
]

const strategies: Record<string, CategoryStrategy> = {
  executive: {
    title: 'Getting Organized',
    subtitle: 'Help your planning brain work better',
    items: [
      { title: '📝 Write Everything Down', desc: "Your brain can't hold all the things. Put them somewhere safe.", steps: ['Get one notebook or phone app', 'Write down every task right when you think of it', 'Set phone alarms for important stuff', 'Check your list 3 times a day'], evidence: 'ADHD brains have weak working memory. Writing things down is like giving your brain a helper.' },
      { title: '✂️ Break Big Jobs Into Tiny Pieces', desc: 'Big tasks feel scary. Small ones feel doable.', steps: ['Pick one big task', 'Write down 3-5 tiny steps', 'Do just the first tiny step', 'Take a 5-minute break', 'Do the next tiny step'], evidence: "ADHD brains get overwhelmed easily. Small steps don't trigger the panic response." },
      { title: '🔄 Make Switching Tasks Easier', desc: 'Give your brain time to change gears.', steps: ['Set a timer for 5 minutes before you need to switch', 'When timer goes off, write where you left off', 'Take 3 deep breaths', 'Stand up and stretch', "Say out loud what you're switching to"], evidence: 'ADHD brains struggle with task switching. Rituals help the brain change modes.' },
    ],
  },
  emotional: {
    title: 'Managing Big Feelings',
    subtitle: 'Cool down your emotion brain',
    items: [
      { title: '🛑 STOP Method', desc: 'Emergency brake for when feelings take over.', steps: ["Stop what you're doing right now", 'Take one big deep breath', 'Look around and notice where you are', 'Pick one small thing to do next'], evidence: 'Big feelings shut down your thinking brain. This method turns it back on.' },
      { title: '🏷️ Name the Feeling', desc: 'Put words to emotions to make them smaller.', steps: ["When upset, ask 'What feeling is this?'", 'Use specific words (frustrated, disappointed, worried)', 'Rate how big it feels from 1-10', "Ask 'What does this feeling need?'"], evidence: "Naming emotions calms the emotion center in your brain. It's like magic but real." },
      { title: '💔 Handle Rejection Feelings', desc: "ADHD brains feel rejection super strongly. Here's help.", steps: ['Notice the hurt feeling in your chest or stomach', "Remember: 'This is my ADHD brain, not the truth'", "Ask: 'What proof do I have this person rejects me?'", 'Think of 2 other reasons they might have acted that way', 'Wait 24 hours before doing anything big'], evidence: "99% of ADHD adults have rejection sensitivity. Your brain reads rejection where there isn't any." },
    ],
  },
  focus: {
    title: 'Focusing Better',
    subtitle: 'Train your attention brain',
    items: [
      { title: '⏰ Focus Timer Method', desc: 'Work in short bursts with breaks.', steps: ['Pick ONE thing to work on', 'Set timer for 15-25 minutes', 'Work on only that thing', 'When distracted, write the thought down and keep going', "When timer rings, take a 5-minute moving break"], evidence: "ADHD attention comes in waves. Short bursts work with your brain's natural rhythm." },
      { title: '⚓ Focus Anchor', desc: 'Use something you can touch to bring attention back.', steps: ['Pick a small object to hold or wear', 'When your mind wanders, touch your anchor', 'Take one breath', 'Gently bring attention back to your task', "Don't be mean to yourself - this is normal"], evidence: 'Touch signals help the brain stay connected to the present moment.' },
      { title: '🎨 Make Boring Stuff Interesting', desc: "Work with your brain's need for fun.", steps: ['Find the most interesting part of the task', 'Start with that part first', 'Add music, different colors, or change locations', 'Connect boring tasks to things you care about', 'Reward yourself after finishing'], evidence: 'ADHD brains focus best on interesting things. Adding interest makes tasks easier.' },
    ],
  },
  energy: {
    title: 'Getting Energy Back',
    subtitle: 'Feed your motivation brain',
    items: [
      { title: '🎁 Stack Good Feelings', desc: 'Add rewards to boring tasks.', steps: ['Pick a boring task you need to do', 'Add something nice (good music, favorite drink, comfy clothes)', 'Plan a small reward for when you finish', 'Make finishing feel good (check it off dramatically)', 'Do something fun right after'], evidence: 'ADHD brains have low motivation chemicals. Adding rewards helps make up for this.' },
      { title: '🌊 Work With Your Energy', desc: "Do hard things when you feel good, easy things when you don't.", steps: ['Notice when you feel most awake for one week', 'Save hard tasks for high-energy times', 'Do easy or fun tasks when energy is low', "Don't fight your natural rhythm", 'Plan rest time between hard tasks'], evidence: "ADHD energy goes up and down more than other people's. Fighting this wastes energy." },
      { title: '🏆 Make Tiny Wins', desc: 'Get lots of small victories to keep going.', steps: ['Break any task into 2-5 minute pieces', 'Celebrate each tiny completion', 'Use a checklist or app to track progress', 'Focus on getting better, not being perfect', 'Start with the easiest piece first'], evidence: 'Your brain releases happy chemicals when you complete things. More completions = more fuel.' },
    ],
  },
  anxiety: {
    title: 'Calming Down',
    subtitle: 'Turn off your alarm brain',
    items: [
      { title: '🔢 5-4-3-2-1 Grounding', desc: 'Quick way to feel safe and present.', steps: ['Name 5 things you can see', 'Name 4 things you can touch', 'Name 3 things you can hear', 'Name 2 things you can smell', 'Name 1 thing you can taste'], evidence: 'Focusing on your senses turns off the panic response and brings you to the present.' },
      { title: '🛡️ Protect Your Senses', desc: 'Too much input makes everything harder.', steps: ['Notice what bothers you (loud sounds, bright lights, crowds)', 'Carry helpers (headphones, sunglasses, fidget toy)', 'Take sensory breaks before you get overwhelmed', 'Use heavy pressure (weighted blanket, tight hug) to calm down', 'Plan quiet time every day'], evidence: 'ADHD brains often take in too much sensory information. Protecting your senses prevents overload.' },
      { title: '🎯 Reduce Decisions', desc: 'Too many choices drain your brain.', steps: ['Pick 3 daily decisions to make automatic (clothes, breakfast, route)', 'Make similar decisions all at once', 'Create templates for things you do often', 'Remove choices from your space when possible', "Say 'let me think about it' instead of deciding right away"], evidence: 'Decision fatigue is real. ADHD brains get tired from choices faster than others.' },
    ],
  },
  reward: {
    title: 'Fighting Boredom',
    subtitle: 'Feed your reward brain',
    items: [
      { title: '✨ Add Newness to Routine', desc: 'Your brain craves new experiences.', steps: ['Pick one boring daily task', 'Change one thing: where you do it, when, or how', "Try being a 'tourist in your own life' - notice new things", 'Switch up your routine weekly', 'Keep track of what kinds of newness work best for you'], evidence: 'ADHD brains need more stimulation than others. Controlled newness gives you this without chaos.' },
      { title: '🎮 Build a Fun Menu', desc: 'Have healthy ways to get excitement ready to go.', steps: ['Make a list of 10 quick, positive activities that feel exciting', 'When you want stimulation, pick from your list instead of acting impulsively', 'Use exciting activities as rewards after boring tasks', 'Find the fun parts inside necessary activities', 'Connect with people who share your interests'], evidence: 'ADHD brains seek stimulation automatically. Having good options ready prevents poor choices.' },
      { title: '🚨 Stop Boredom Before It Starts', desc: 'Prevent the restless feeling that leads to problems.', steps: ['Learn your early warning signs of boredom', "Keep a 'boredom emergency kit' of quick engaging activities", "Schedule 15-minute 'interest breaks' throughout your day", 'Use just enough stimulation - not too much', 'Plan smooth transitions between activities'], evidence: 'Boredom in ADHD often leads to impulsive behavior. Preventing it stops problems before they start.' },
    ],
  },
}

export default function Mindshift() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [quoteFading, setQuoteFading] = useState(false)

  const nextQuote = () => {
    setQuoteFading(true)
    setTimeout(() => {
      setQuoteIndex(i => (i + 1) % quotes.length)
      setQuoteFading(false)
    }, 150)
  }

  const openCategory = (catId: string) => {
    setCurrentCategory(catId)
    setCurrentIndex(0)
  }

  const closeCategory = () => setCurrentCategory(null)

  const nextStrategy = () => {
    if (!currentCategory) return
    setCurrentIndex(prev => (prev + 1) % strategies[currentCategory].items.length)
  }

  const currentStrat = currentCategory ? strategies[currentCategory] : null
  const currentItem = currentStrat ? currentStrat.items[currentIndex] : null

  return (
    <div className="mindshift">
      <div className="container">

        {currentCategory && currentStrat && currentItem ? (
          <div className="strategy-detail">
            <div className="detail-top">
              <button className="detail-back" onClick={closeCategory}>← MindShift</button>
              <h2 className="detail-title">{currentStrat.title}</h2>
            </div>

            <div className="strategy-card">
              <div className="strategy-header">
                <div className="strategy-number">{currentIndex + 1}</div>
                <div className="strategy-info">
                  <h3>{currentItem.title}</h3>
                  <p>{currentItem.desc}</p>
                </div>
              </div>
              <div className="steps-title">How to do it:</div>
              <ol className="steps-list">
                {currentItem.steps.map((step, i) => (
                  <li key={i} data-step={i + 1}>{step}</li>
                ))}
              </ol>
              <div className="evidence-box">
                <strong>💡 Science bit:</strong>
                <p>{currentItem.evidence}</p>
              </div>
            </div>

            <div className="strategy-progress">
              {currentStrat.items.map((_, i) => (
                <div key={i} className={`strategy-dot${i === currentIndex ? ' active' : ''}`} />
              ))}
            </div>

            <div className="action-bar">
              <button className="next-btn" onClick={nextStrategy}>
                🔄 Try Something Else
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="page-header">
              <h1>MindShift</h1>
            </header>

            <p className="intro-text">What feels closest right now?</p>

            <div className="category-grid">
              {categories.map(cat => (
                <div key={cat.id} className="category-card" data-cat={cat.id} onClick={() => openCategory(cat.id)}>
                  <div className="category-icon">{cat.icon}</div>
                  <div className="category-info">
                    <div className="category-title">{cat.title}</div>
                    <div className="category-desc">{cat.desc}</div>
                  </div>
                  <div className="category-arrow">›</div>
                </div>
              ))}
            </div>

            <div className="quote-widget">
              <p className={`quote-text${quoteFading ? ' fading' : ''}`}>"{quotes[quoteIndex]}"</p>
              <button className="quote-next-btn" onClick={nextQuote}>New quote →</button>
            </div>

            <div className="disclaimer">
              <p><strong>💡 Note:</strong> These are helpful tools, not medical advice. If you need more help, talk to a doctor or therapist.</p>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
