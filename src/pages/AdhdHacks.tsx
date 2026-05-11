import { useState } from 'react';
import '../styles/pages/AdhdHacks.css';

interface Hack {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  type: string;
  image: string;
  steps: string[];
}



const HACKS: Hack[] = [
  { id: "task-bracelet", title: "Task Bracelet System", description: "Your brain needs to see progress to feel it. This makes invisible tasks physical. That changes everything.", category: "productivity", time: "5 min setup", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/tb.png", steps: ["Get colorful elastic bands or simple bracelets", "Put one bracelet on your wrist for each task", "When you finish a task, move it to a bowl", "Watch the bowl fill up over the day"] },
  { id: "shower-clock", title: "Analog Shower Clock", description: "ADHD brains lose track of time because they can't feel it passing. This one object rewires that.", category: "focus", time: "2 min setup", type: "One-time", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/Untitled%20design-af0aebe.png", steps: ["Buy a waterproof analog clock (dollar store works)", "Mount it in your shower where you can see it", "Glance at it while showering to build time awareness", "Time will start to feel more real"] },
  { id: "finch-pet", title: "Finch Virtual Pet", description: "Your brain will do almost anything for a reward it cares about. What if that reward was a tiny bird that needed you?", category: "energy", time: "10 min setup", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/finch.png", steps: ["Download the Finch app (free)", "Set up your virtual pet and customize it", "Add your daily self-care tasks", "Complete real tasks to keep your pet happy"] },
  { id: "influencer-cleaning", title: "Inner Influencer Cleaning", description: "Boring tasks feel unbearable because there's no story. Give yourself a character to play and the resistance fades.", category: "energy", time: "No setup", type: "As needed", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/infuencer%20clean.png", steps: ["Browse cleaning TikToks for 2 mins. Set a timer so you don't fall in.", "Set a 25-min timer for the cleaning itself", "Narrate your cleaning like you're filming content", "Focus on making it look aesthetic"] },
  { id: "shoes-indoors", title: "Shoes Indoors = Work Mode", description: "Your environment shapes your brain state more than willpower ever will. One small costume change flips the switch.", category: "productivity", time: "No setup", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/shoes.png", steps: ["Put on real shoes (not slippers) when you start work", "Keep them on during your productive hours", "Take them off to signal rest time", "Your brain will start treating shoes-on as work mode"] },
  { id: "dopamine-anchoring", title: "Dopamine Anchoring", description: "Stop fighting tasks you hate. Teach your brain to want them by pairing them with something it already loves.", category: "focus", time: "No setup", type: "Ongoing", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/music.png", steps: ["Pick a task you always avoid", "Choose something enjoyable: music, snacks, fancy coffee", "Only allow that treat while doing the dreaded task", "Repeat until your brain links the treat with the task"] },
  { id: "dry-erase-everywhere", title: "Dry-Erase Markers Everywhere", description: "Put reminders where your eyes already go. The mirror, the fridge, the bathroom window.", category: "productivity", time: "5 min setup", type: "One-time", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/dry%20eraser%20markers.png", steps: ["Buy several packs of dry-erase markers", "Place them in every room", "Write reminders on mirrors, windows, any smooth surface", "Erase and update as you go"] },
  { id: "laundry-hampers", title: "Pre-Sorted Laundry Hampers", description: "Decision fatigue is real. Eliminate a decision you make every single week by making it once, permanently.", category: "productivity", time: "10 min setup", type: "One-time", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/laundry.png", steps: ["Get three hampers and label them: Lights, Darks, Towels", "Sort clothes as you take them off (takes 1 second)", "When any hamper is full, wash that load immediately", "No more decision fatigue at laundry time"] },
  { id: "morning-cardio", title: "Morning Cardio Boost", description: "Movement is the closest thing to a legal focus drug. 30 minutes in the morning buys you hours of clarity.", category: "energy", time: "30 min daily", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/run.png", steps: ["Set alarm 30 mins earlier (or start with 10 mins)", "Do any cardio: walk, dance, jumping jacks, yoga", "Don't overthink it. Movement is movement.", "Focus and mood get better through the day"] },
  { id: "easy-wins-first", title: "Easy Wins First", description: "Momentum is more powerful than motivation. Get it from small wins before your brain even realizes it started.", category: "productivity", time: "No setup", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/frog.png", steps: ["List 2-3 tasks you can finish in under 10 minutes", "Do these first when you start working", "Mark each one done", "Ride that momentum into bigger tasks"] },
  { id: "morning-anchor", title: "Morning Anchor Ritual", description: "Your brain needs a reliable on-ramp. One consistent activity tells it: this is where the day begins.", category: "focus", time: "5-10 min daily", type: "Daily habit", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/morning.png", steps: ["Pick a 5-10 minute activity you actually enjoy", "Do it at the exact same time every morning", "Keep it simple: Wordle, stretching, journaling, singing", "This becomes your daily 'brain warm-up'"] },
  { id: "beauty-dopamine", title: "Beauty as Dopamine Fuel", description: "Your brain engages more with what looks good. Make one space pretty and you'll want to spend time there.", category: "energy", time: "Varies", type: "Ongoing", image: "https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/desk.png", steps: ["Pick one space where you spend a lot of time", "Add a few things: plants, good lighting, colors you like", "Work in pretty places when possible: parks, cafes", "You'll spend more time there without forcing it"] },
];

export default function AdhdHacks() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (hackId: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(hackId)) next.delete(hackId); else next.add(hackId);
      return next;
    });
  };

  const filtered = filter === 'all' ? HACKS : HACKS.filter(h => h.category === filter);

  return (
    <div className="adhd-hacks">
      <header className="page-header">
        <h1>ADHD Hacks</h1>
        <p>Community-tested strategies that actually work</p>
      </header>

      <div className="quick-tip">
        <strong>ADHD rule:</strong> Don't try everything. Pick <strong>one</strong> hack that sounds fun. Try it for a week. Then come back.
      </div>

      <div className="filters">
        {['all', 'productivity', 'focus', 'energy'].map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'productivity' ? 'Productivity' : f === 'focus' ? 'Focus' : 'Energy'}
          </button>
        ))}
      </div>

      <div className="hack-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <p>No hacks found in this category</p>
          </div>
        ) : (
          filtered.map(hack => {
            const isExpanded = expanded.has(hack.id);
            return (
              <div key={hack.id} className="hack-card">
                <div className="hack-header" onClick={() => toggleExpand(hack.id)}>
                  <img className="hack-img" src={hack.image} alt={hack.title} loading="lazy" />
                  <div className="hack-info">
                    <h3 className="hack-title">{hack.title}</h3>
                    <div className="hack-meta">
                      <span className={`tag category ${hack.category}`}>{hack.category}</span>
                      <span className="tag time">{hack.time}</span>
                      <span className="tag time">{hack.type}</span>
                    </div>
                    <p className="hack-desc">{hack.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="expand-indicator"
                  onClick={() => toggleExpand(hack.id)}
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Hide steps' : 'See the steps'}</span>
                  <span className="arrow">{isExpanded ? '↑' : '→'}</span>
                </button>
                {isExpanded && (
                  <div className="hack-steps">
                    <div className="steps-content">
                      <h4>Steps</h4>
                      <ol className="step-list">
                        {hack.steps.map((step, i) => (
                          <li key={i}>
                            <span className="step-num">{i + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
