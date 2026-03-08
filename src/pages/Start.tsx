import { useState, useEffect, useRef, useCallback } from 'react';
import DOMPurify from 'dompurify';
import '../styles/pages/Start.css';

interface Step {
  num: number;
  title: string;
  preview: string;
  time: string;
  infoType: string;
  infoTitle: string;
  infoText: string;
  tasks: string[];
  links?: { href: string; label: string; primary?: boolean }[];
  completeBtnText?: string;
}

const STEPS: Step[] = [
  {
    num: 1,
    title: '📧 Work Email',
    preview: 'Separate work from personal spam',
    time: '2-3 min',
    infoType: 'tip',
    infoTitle: '💡 Why First?',
    infoText: "A dedicated work email keeps everything organized. You won't lose payment emails in your Netflix notifications.",
    tasks: ['Create a Gmail like firstname.lastname.work@gmail.com', 'Enable 2-factor authentication'],
    links: [{ href: 'https://accounts.google.com/signup', label: '✨ Create Gmail →', primary: true }],
  },
  {
    num: 2,
    title: '💳 Payment Setup',
    preview: 'Get ready to receive money',
    time: '5-7 min',
    infoType: '',
    infoTitle: '💰 Reality',
    infoText: '80%+ platforms pay through PayPal. Set up a business account for better tracking.',
    tasks: ['Create PayPal Business account', 'Link your bank account'],
    links: [{ href: 'https://paypal.com/business', label: '💳 PayPal Business →', primary: true }],
  },
  {
    num: 3,
    title: '🎯 Quick Win Platforms',
    preview: 'Sign up for the best ones',
    time: '10-15 min',
    infoType: 'tip',
    infoTitle: '⚡ Strategy',
    infoText: 'Sign up for ALL of these. More platforms = more money.',
    tasks: ['User Interviews - $50-200/session 🔥', 'Prolific - $8-18/hr studies', 'Respondent - Focus groups', 'UserTesting - $10/test'],
    links: [
      { href: 'https://userinterviews.com', label: '🎤 User Interviews', primary: true },
      { href: 'https://prolific.co', label: '📊 Prolific' },
      { href: 'https://respondent.io', label: '💼 Respondent' },
      { href: 'https://www.usertesting.com/signup', label: '🧪 UserTesting' },
    ],
  },
  {
    num: 4,
    title: '✨ Complete Profiles',
    preview: '100% profiles = more opportunities',
    time: '5-10 min',
    infoType: 'warning',
    infoTitle: '⚠️ Important',
    infoText: 'Incomplete profiles = fewer matches. Fill out EVERYTHING.',
    tasks: ['Upload a professional photo', 'Complete ALL demographic questions', 'List skills and experiences'],
  },
  {
    num: 5,
    title: '🚀 First Task',
    preview: 'Time to earn something!',
    time: '10-20 min',
    infoType: 'tip',
    infoTitle: '🎮 Mission',
    infoText: "Find ONE task and complete it. Doesn't matter if it pays $1 or $100. First completion matters most!",
    tasks: ['Check Prolific for studies', 'Apply to 3+ User Interviews projects', 'Complete first paid task 🎉'],
    completeBtnText: '🏆 Complete Setup',
  },
];

// Confetti
function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const launch = useCallback((opts: { duration?: number; particleCount?: number; origin?: { x: number; y: number } | null } = {}) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { duration = 4000, particleCount = 160, origin = null } = opts;
    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.display = 'block';

    const colors = ['#ff6b6b', '#ffd93d', '#00ff88', '#00d4ff', '#c56cf0', '#ff8fb1'];
    const org = origin || { x: W / 2, y: H / 3 };
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI - Math.PI / 2;
      const speed = 2 + Math.random() * 6;
      return {
        x: org.x + (Math.random() - 0.5) * 8,
        y: org.y + (Math.random() - 0.5) * 8,
        size: 6 + Math.random() * 8,
        rot: Math.random() * Math.PI * 2,
        velX: Math.cos(angle) * speed * (0.6 + Math.random() * 0.9),
        velY: Math.sin(angle) * speed * (0.6 + Math.random() * 0.9) - (2 + Math.random() * 2),
        rotVel: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
      };
    });

    const start = performance.now();
    let rafId: number;
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', onResize);

    function update(now: number) {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.velX; p.y += p.velY; p.velY += 0.06; p.velX *= 0.995; p.rot += p.rotVel; p.life++;
        const alpha = Math.max(0, 1 - t / duration - p.life / 800);
        ctx.save(); ctx.globalAlpha = alpha; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size * 0.25, p.size, p.size * 0.6); ctx.restore();
      }
      if (t < duration) { rafId = requestAnimationFrame(update); }
      else { setTimeout(() => { cancelAnimationFrame(rafId); ctx.clearRect(0, 0, W, H); canvas!.style.display = 'none'; }, 300); }
    }
    rafId = requestAnimationFrame(update);
    setTimeout(() => window.removeEventListener('resize', onResize), duration + 2000);
  }, []);

  return { canvasRef, launch };
}

export default function Start() {
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [tasksDone, setTasksDone] = useState<Record<number, Set<number>>>({});
  const [toast, setToast] = useState<{ icon: string; text: string } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [finalTime, setFinalTime] = useState('00:00');

  const { canvasRef, launch } = useConfetti();
  const stepRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const timerDisplay = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  const showToastMsg = useCallback((icon: string, text: string) => {
    setToast({ icon, text });
    setTimeout(() => setToast(null), 1200);
  }, []);

  const toggleTask = (stepNum: number, taskIdx: number) => {
    setTasksDone(prev => {
      const stepSet = new Set(prev[stepNum] || []);
      if (stepSet.has(taskIdx)) stepSet.delete(taskIdx);
      else stepSet.add(taskIdx);
      return { ...prev, [stepNum]: stepSet };
    });
  };

  const completeStep = (stepNum: number) => {
    setCompletedSteps(prev => new Set([...prev, stepNum]));
    showToastMsg('✅', `Step ${stepNum} complete!`);
    launch({ duration: 900, particleCount: 36 });

    if (stepNum < 5) {
      const next = stepNum + 1;
      setCurrentStep(next);
      setTimeout(() => {
        stepRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const finishRun = () => {
    setTimerRunning(false);
    setCompletedSteps(prev => new Set([...prev, 5]));
    setFinalTime(timerDisplay);
    setShowVictory(true);
    launch({ duration: 4000, particleCount: 220 });
  };

  return (
    <div className="start-page">
      <div className="bg-gradient" />

      <div className="timer-bar">
        <div className="timer-left">
          <span className="speed-badge">⚡ SPEED RUN</span>
          <span className="timer-display">{timerDisplay}</span>
        </div>
        <span className="step-counter">Step <span>{currentStep}</span> of <span>5</span></span>
      </div>

      {toast && (
        <div className="toast show">
          <span>{toast.icon}</span>
          <span>{toast.text}</span>
        </div>
      )}

      <div className="container">
        <div className="hero">
          <div className="hero-badge">🎮 Interactive Setup Guide</div>
          <h1 className="highlight">Get Set Up to Work Online</h1>
          <p className="hero-sub">Do one step at a time. No guesswork. No overwhelm.</p>
        </div>

        {!showVictory ? (
          <div id="stepsContainer">
            {STEPS.map(step => {
              const isActive = currentStep === step.num && !completedSteps.has(step.num);
              const isCompleted = completedSteps.has(step.num);
              const doneTasks = tasksDone[step.num] || new Set<number>();
              return (
                <div
                  key={step.num}
                  className={`step${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                  ref={el => { stepRefs.current[step.num] = el; }}
                >
                  <div className="step-card">
                    <div className="step-header">
                      <div className="step-number">{step.num}</div>
                      <div className="step-info">
                        <div className="step-title">{step.title}</div>
                        <div className="step-preview">{step.preview}</div>
                      </div>
                      <span className="step-time-badge">{step.time}</span>
                    </div>
                    <div className="step-content">
                      <div className={`info-box${step.infoType ? ' ' + step.infoType : ''}`}>
                        <h4>{step.infoTitle}</h4>
                        <p>{step.infoText}</p>
                      </div>
                      <div className="task-list">
                        {step.tasks.map((taskText, idx) => (
                          <div
                            key={idx}
                            className={`task${doneTasks.has(idx) ? ' done' : ''}`}
                            onClick={() => toggleTask(step.num, idx)}
                          >
                            <div className="task-check">✓</div>
                            <span className="task-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(taskText) }} />
                          </div>
                        ))}
                      </div>
                      {step.links && (
                        <div className="quick-links">
                          {step.links.map((link, i) => (
                            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={`quick-link${link.primary ? ' primary' : ''}`}>
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                      {step.num < 5 ? (
                        <button className="complete-btn" onClick={() => completeStep(step.num)}>
                          Complete Step {step.num} →
                        </button>
                      ) : (
                        <button className="complete-btn" onClick={finishRun}>
                          {step.completeBtnText || '🏆 Complete Setup'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="victory show">
            <div className="victory-icon">🏆</div>
            <h2>Setup Complete!</h2>
            <p style={{ color: 'var(--text-dim)' }}>You're ready to start earning online!</p>
            <div className="victory-stats">
              <div className="victory-stat">
                <div className="victory-stat-value">{finalTime}</div>
                <div className="victory-stat-label">Time</div>
              </div>
              <div className="victory-stat">
                <div className="victory-stat-value">5</div>
                <div className="victory-stat-label">Steps</div>
              </div>
              <div className="victory-stat">
                <div className="victory-stat-value">4+</div>
                <div className="victory-stat-label">Platforms</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <canvas id="confettiCanvas" ref={canvasRef} aria-hidden="true" style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />
    </div>
  );
}
