import { useState, useRef } from 'react'
import '../styles/pages/Mindshift.css'

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
  { id: 'executive', icon: '🧠', title: "Can't get organized",   desc: 'Brain fog, can\'t plan, forget everything' },
  { id: 'emotional', icon: '🤯', title: 'Feelings are huge',     desc: 'Mad, sad, or scared feelings take over' },
  { id: 'focus',     icon: '🎯', title: "Can't focus",           desc: "Mind jumps around, can't stick with tasks" },
  { id: 'energy',    icon: '⚡', title: 'No energy',             desc: "Can't start things, feel tired or stuck" },
  { id: 'anxiety',   icon: '🌪️', title: "Everything's too much", desc: 'Sounds, lights, people are overwhelming' },
  { id: 'reward',    icon: '🎪', title: 'Super bored',           desc: 'Nothing feels fun or interesting' },
]

const strategies: Record<string, CategoryStrategy> = {
  executive: {
    title: 'Getting Organized',
    subtitle: 'Help your planning brain work better.',
    items: [
      { title: '📝 Write Everything Down', desc: "Your brain can't hold all the things. Put them somewhere safe.", steps: ['Get one notebook or phone app', 'Write down every task right when you think of it', 'Set phone alarms for important stuff', 'Check your list 3 times a day'], evidence: 'ADHD brains have weak working memory. Writing things down is like giving your brain a helper.' },
      { title: '✂️ Break Big Jobs Into Tiny Pieces', desc: 'Big tasks feel scary. Small ones feel doable.', steps: ['Pick one big task', 'Write down 3-5 tiny steps', 'Do just the first tiny step', 'Take a 5-minute break', 'Do the next tiny step'], evidence: "ADHD brains get overwhelmed easily. Small steps don't trigger the panic response." },
      { title: '🔄 Make Switching Tasks Easier', desc: 'Give your brain time to change gears.', steps: ['Set a timer for 5 minutes before you need to switch', 'When timer goes off, write where you left off', 'Take 3 deep breaths', 'Stand up and stretch', "Say out loud what you're switching to"], evidence: 'ADHD brains struggle with task switching. Rituals help the brain change modes.' },
    ],
  },
  emotional: {
    title: 'Managing Big Feelings',
    subtitle: 'Cool down your emotion brain.',
    items: [
      { title: '🛑 STOP Method', desc: 'Emergency brake for when feelings take over.', steps: ["Stop what you're doing right now", 'Take one big deep breath', 'Look around and notice where you are', 'Pick one small thing to do next'], evidence: 'Big feelings shut down your thinking brain. This method turns it back on.' },
      { title: '🏷️ Name the Feeling', desc: 'Put words to emotions to make them smaller.', steps: ["When upset, ask 'What feeling is this?'", 'Use specific words (frustrated, disappointed, worried)', 'Rate how big it feels from 1-10', "Ask 'What does this feeling need?'"], evidence: "Naming emotions calms the emotion center in your brain. It's like magic but real." },
      { title: '💔 Handle Rejection Feelings', desc: "ADHD brains feel rejection super strongly. Here's help.", steps: ['Notice the hurt feeling in your chest or stomach', "Remember: 'This is my ADHD brain, not the truth'", "Ask: 'What proof do I have this person rejects me?'", 'Think of 2 other reasons they might have acted that way', 'Wait 24 hours before doing anything big'], evidence: "99% of ADHD adults have rejection sensitivity. Your brain reads rejection where there isn't any." },
    ],
  },
  focus: {
    title: 'Focusing Better',
    subtitle: 'Train your attention brain.',
    items: [
      { title: '⏰ Focus Timer Method', desc: 'Work in short bursts with breaks.', steps: ['Pick ONE thing to work on', 'Set timer for 15-25 minutes', 'Work on only that thing', 'When distracted, write the thought down and keep going', "When timer rings, take a 5-minute moving break"], evidence: "ADHD attention comes in waves. Short bursts work with your brain's natural rhythm." },
      { title: '⚓ Focus Anchor', desc: 'Use something you can touch to bring attention back.', steps: ['Pick a small object to hold or wear', 'When your mind wanders, touch your anchor', 'Take one breath', 'Gently bring attention back to your task', "Don't be mean to yourself, this is normal"], evidence: 'Touch signals help the brain stay connected to the present moment.' },
      { title: '🎨 Make Boring Stuff Interesting', desc: "Work with your brain's need for fun.", steps: ['Find the most interesting part of the task', 'Start with that part first', 'Add music, different colors, or change locations', 'Connect boring tasks to things you care about', 'Reward yourself after finishing'], evidence: 'ADHD brains focus best on interesting things. Adding interest makes tasks easier.' },
    ],
  },
  energy: {
    title: 'Getting Energy Back',
    subtitle: 'Feed your motivation brain.',
    items: [
      { title: '🎁 Stack Good Feelings', desc: 'Add rewards to boring tasks.', steps: ['Pick a boring task you need to do', 'Add something nice (good music, favorite drink, comfy clothes)', 'Plan a small reward for when you finish', 'Make finishing feel good (check it off dramatically)', 'Do something fun right after'], evidence: 'ADHD brains have low motivation chemicals. Adding rewards helps make up for this.' },
      { title: '🌊 Work With Your Energy', desc: "Do hard things when you feel good, easy things when you don't.", steps: ['Notice when you feel most awake for one week', 'Save hard tasks for high-energy times', 'Do easy or fun tasks when energy is low', "Don't fight your natural rhythm", 'Plan rest time between hard tasks'], evidence: "ADHD energy goes up and down more than other people's. Fighting this wastes energy." },
      { title: '🏆 Make Tiny Wins', desc: 'Get lots of small victories to keep going.', steps: ['Break any task into 2-5 minute pieces', 'Mark each tiny completion off', 'Use a checklist or app to track progress', 'Focus on getting better, not being perfect', 'Start with the easiest piece first'], evidence: 'Your brain releases motivation chemicals when you complete things. More completions = more fuel.' },
    ],
  },
  anxiety: {
    title: 'Calming Down',
    subtitle: 'Turn off your alarm brain.',
    items: [
      { title: '🔢 5-4-3-2-1 Grounding', desc: 'Quick way to feel safe and present.', steps: ['Name 5 things you can see', 'Name 4 things you can touch', 'Name 3 things you can hear', 'Name 2 things you can smell', 'Name 1 thing you can taste'], evidence: 'Focusing on your senses turns off the panic response and brings you to the present.' },
      { title: '🛡️ Protect Your Senses', desc: 'Too much input makes everything harder.', steps: ['Notice what bothers you (loud sounds, bright lights, crowds)', 'Carry helpers (headphones, sunglasses, fidget toy)', 'Take sensory breaks before you get overwhelmed', 'Use heavy pressure (weighted blanket, tight hug) to calm down', 'Plan quiet time every day'], evidence: 'ADHD brains often take in too much sensory information. Protecting your senses prevents overload.' },
      { title: '🎯 Reduce Decisions', desc: 'Too many choices drain your brain.', steps: ['Pick 3 daily decisions to make automatic (clothes, breakfast, route)', 'Make similar decisions all at once', 'Create templates for things you do often', 'Remove choices from your space when possible', "Say 'let me think about it' instead of deciding right away"], evidence: 'Decision fatigue is real. ADHD brains get tired from choices faster than others.' },
    ],
  },
  reward: {
    title: 'Fighting Boredom',
    subtitle: 'Feed your reward brain.',
    items: [
      { title: '✨ Add Newness to Routine', desc: 'Your brain craves new experiences.', steps: ['Pick one boring daily task', 'Change one thing: where you do it, when, or how', "Try being a 'tourist in your own life', notice new things", 'Switch up your routine weekly', 'Keep track of what kinds of newness work best for you'], evidence: 'ADHD brains need more stimulation than others. Controlled newness gives you this without chaos.' },
      { title: '🎮 Build a Fun Menu', desc: 'Have healthy ways to get excitement ready to go.', steps: ['Make a list of 10 quick, positive activities that feel exciting', 'When you want stimulation, pick from your list instead of acting impulsively', 'Use exciting activities as rewards after boring tasks', 'Find the fun parts inside necessary activities', 'Connect with people who share your interests'], evidence: 'ADHD brains seek stimulation automatically. Having good options ready prevents poor choices.' },
      { title: '🚨 Stop Boredom Before It Starts', desc: 'Prevent the restless feeling that leads to problems.', steps: ['Learn your early warning signs of boredom', "Keep a 'boredom emergency kit' of quick engaging activities", "Schedule 15-minute 'interest breaks' throughout your day", 'Use just enough stimulation, not too much', 'Plan smooth transitions between activities'], evidence: 'Boredom in ADHD often leads to impulsive behavior. Preventing it stops problems before they start.' },
    ],
  },
}

const totalCats = categories.length

const getOffset = (idx: number, activeIdx: number): number => {
  let d = idx - activeIdx
  if (d > totalCats / 2) d -= totalCats
  else if (d < -totalCats / 2) d += totalCats
  return d
}

export default function Mindshift() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const currentCat = categories[activeIndex]
  const currentStrat = strategies[currentCat.id]

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        setActiveIndex((prev) => (prev - 1 + totalCats) % totalCats)
      } else {
        setActiveIndex((prev) => (prev + 1) % totalCats)
      }
    }
    touchStartX.current = null
  }

  return (
    <div className="mindshift">
      <header className="page-header">
        <h1>MindShift</h1>
        <p>Pick what feels closest. Try one of the strategies.</p>
      </header>

      <div
        className="mood-arc"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {categories.map((cat, i) => {
          const offset = getOffset(i, activeIndex)
          return (
            <button
              key={cat.id}
              type="button"
              data-offset={offset}
              className={`mood-card${offset === 0 ? ' active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-pressed={offset === 0}
              aria-label={cat.title}
            >
              <span className="mood-icon" aria-hidden="true">{cat.icon}</span>
              <span className="mood-title">{cat.title}</span>
            </button>
          )
        })}
      </div>

      <div className="mood-dots">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            className={`mood-dot${i === activeIndex ? ' active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Select ${cat.title}`}
          />
        ))}
      </div>

      <div className="active-mood-info">
        <div className="active-mood-desc">{currentCat.desc}</div>
        <h2 className="active-mood-title">{currentStrat.title}</h2>
        <p className="active-mood-subtitle">{currentStrat.subtitle}</p>
      </div>

      <div className="strategies-list">
        {currentStrat.items.map((item, i) => (
          <div key={`${currentCat.id}-${i}`} className="strategy-card">
            <div className="strategy-header">
              <div className="strategy-number">{i + 1}</div>
              <div className="strategy-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
            <div className="steps-title">How to do it</div>
            <ol className="steps-list">
              {item.steps.map((step, j) => (
                <li key={j} data-step={j + 1}>{step}</li>
              ))}
            </ol>
            <div className="evidence-box">
              <strong>Why it works</strong>
              <p>{item.evidence}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="disclaimer">
        <p><strong>Note:</strong> These are tools, not medical advice. If you need more help, talk to a doctor or therapist.</p>
      </div>
    </div>
  )
}
