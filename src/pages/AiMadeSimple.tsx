import { useState, useEffect } from 'react';
import '../styles/pages/AiMadeSimple.css';

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(Math.round((scrollTop / docHeight) * 100), 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}

export default function AiMadeSimple() {
  const progress = useScrollProgress();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const prompts = [
    { emoji: '📧', text: 'Help me write a polite email to my landlord about a leaky faucet in my apartment.' },
    { emoji: '📚', text: 'Explain cryptocurrency to me like I\'m 12 years old, using simple examples.' },
    { emoji: '📋', text: 'Help me break down cleaning my entire apartment into small, manageable tasks.' },
    { emoji: '💼', text: 'Help me write a professional message declining a meeting because I have a conflict.' },
    { emoji: '🧠', text: 'I feel overwhelmed by my to-do list. Help me prioritize these 8 tasks by importance.' },
    { emoji: '🎨', text: 'Give me 10 unique birthday party ideas for a 25-year-old who loves video games.' },
  ];

  const copyPrompt = (idx: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ai-made-simple">
      <header className="page-header">
        <h1>🤖 AI <span>Made Simple</span></h1>
        <p>A beginner's guide that actually makes sense</p>
      </header>

      <div className="progress-bar">
        <span className="icon">📖</span>
        <div className="progress-info">
          <div className="label">Reading progress</div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        </div>
        <span className="progress-count">{progress}%</span>
      </div>

      <nav className="toc">
        <div className="toc-title">Jump to section</div>
        <div className="toc-list">
          {[['what-is-ai', 'What is AI?'], ['getting-started', 'Get Started'], ['tools', 'Tools'], ['tips', 'Tips'], ['examples', 'Examples']].map(([id, label]) => (
            <button key={id} className="toc-link" onClick={() => scrollToSection(id)}>{label}</button>
          ))}
        </div>
      </nav>

      <section className="section" id="what-is-ai">
        <div className="section-header">
          <span className="emoji">🤔</span>
          <div><h2>What is AI?</h2><p className="subtitle">The simple explanation</p></div>
        </div>
        <div className="big-text">Think of AI like a <span className="highlight">super smart helper</span> that can understand and create things for you</div>
        <div className="card-grid">
          <div className="card"><span className="emoji">💬</span><h3>Chatbots</h3><p>AI that talks to you like a person. Ask questions, get answers.</p></div>
          <div className="card"><span className="emoji">🎨</span><h3>Image Makers</h3><p>AI that creates pictures from your words.</p></div>
          <div className="card"><span className="emoji">✍️</span><h3>Writing Helpers</h3><p>AI that helps you write emails, stories, anything.</p></div>
          <div className="card"><span className="emoji">🎵</span><h3>Creative Tools</h3><p>AI that makes music, videos, and more.</p></div>
        </div>
        <div className="alert tip"><span className="icon">💡</span><div className="alert-content"><h4>Simple way to think about it</h4><p>AI is like having a really smart friend who never gets tired and knows a lot about everything!</p></div></div>
      </section>

      <section className="section" id="getting-started">
        <div className="section-header">
          <span className="emoji">🚀</span>
          <div><h2>How to Get Started</h2><p className="subtitle">Your first steps with AI</p></div>
        </div>
        <div className="steps">
          <div className="step"><span className="step-num">1</span><div className="step-content"><h3>Pick One Tool</h3><p>Start with ChatGPT or Claude. Both are free and easy. Don't try everything at once.</p></div></div>
          <div className="step"><span className="step-num">2</span><div className="step-content"><h3>Make an Account</h3><p>Sign up with your email. Takes 2 minutes.</p></div></div>
          <div className="step"><span className="step-num">3</span><div className="step-content"><h3>Ask Simple Questions</h3><p>Start easy: "Help me write an email" or "Explain this to me simply."</p></div></div>
          <div className="step"><span className="step-num">4</span><div className="step-content"><h3>Try Different Things</h3><p>Once comfortable, try work tasks, creative projects, or learning new things.</p></div></div>
        </div>
        <div className="alert tip"><span className="icon">🧠</span><div className="alert-content"><h4>ADHD Pro Tip</h4><p>AI can help you organize thoughts, break down big tasks, and stay focused. It's like a personal assistant!</p></div></div>
      </section>

      <section className="section" id="tools">
        <div className="section-header">
          <span className="emoji">🛠️</span>
          <div><h2>Best Tools to Try</h2><p className="subtitle">Start with these beginner-friendly options</p></div>
        </div>
        {[
          { name: 'ChatGPT', desc: 'Talk to AI like texting a friend. Great for writing and brainstorming.', cost: 'Free + $20/mo for faster', href: 'https://chat.openai.com' },
          { name: 'Claude', desc: 'Another smart chatbot. Great at writing and answering questions.', cost: 'Free + $20/mo for more', href: 'https://claude.ai' },
          { name: 'Canva AI', desc: 'Make designs, posters, and graphics with AI help.', cost: 'Free + $15/mo for pro', href: 'https://www.canva.com' },
          { name: 'Grammarly', desc: 'AI that fixes your writing. Checks spelling and grammar.', cost: 'Free + $12/mo for advanced', href: 'https://www.grammarly.com' },
        ].map(tool => (
          <div key={tool.name} className="tool-card">
            <div className="tool-info"><h3>{tool.name}</h3><p>{tool.desc}</p><span className="tool-cost">{tool.cost}</span></div>
            <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-link">Try it →</a>
          </div>
        ))}
        <div className="alert warning"><span className="icon">💰</span><div className="alert-content"><h4>Start Free!</h4><p>Most AI tools have free versions. Try them out before paying for anything!</p></div></div>
      </section>

      <section className="section" id="tips">
        <div className="section-header">
          <span className="emoji">💡</span>
          <div><h2>Tips for Better Results</h2><p className="subtitle">Get more out of AI with these tricks</p></div>
        </div>
        <div className="card-grid">
          <div className="card"><span className="emoji">🎯</span><h3>Be Specific</h3><p>Instead of "write something," try "write a friendly email asking for time off."</p></div>
          <div className="card"><span className="emoji">🔄</span><h3>Ask for Changes</h3><p>Say "make it shorter" or "make it more casual" if you don't like the first answer.</p></div>
          <div className="card"><span className="emoji">🎭</span><h3>Give It a Role</h3><p>"Act like a teacher" or "pretend you're a friend" changes how AI responds.</p></div>
          <div className="card"><span className="emoji">📝</span><h3>Break Tasks Down</h3><p>Instead of "help with my resume," try "write a summary for a marketing resume."</p></div>
        </div>
        <div className="alert danger"><span className="icon">⚠️</span><div className="alert-content"><h4>Important to Remember</h4><ul><li>AI can make mistakes - always double-check important stuff</li><li>Don't share passwords or personal info</li><li>AI doesn't know very recent events</li><li>It's a tool to help you, not replace your thinking</li></ul></div></div>
      </section>

      <section className="section" id="examples">
        <div className="section-header">
          <span className="emoji">💬</span>
          <div><h2>Copy-Paste Examples</h2><p className="subtitle">Tap any prompt to copy it</p></div>
        </div>
        <div className="prompt-grid">
          {prompts.map((p, i) => (
            <div key={i} className="prompt" onClick={() => copyPrompt(i, p.text)}>
              <span className="emoji">{p.emoji}</span>
              <div>
                <div className="prompt-text">{p.text}</div>
                <div className="copy-hint">{copiedIdx === i ? '✓ Copied!' : 'Tap to copy'}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="alert tip"><span className="icon">🎉</span><div className="alert-content"><h4>You're Ready!</h4><p>Pick one AI tool, try a few examples, and see what happens. The worst that can happen is you learn something new!</p></div></div>
      </section>

      {progress > 50 && (
        <button className="scroll-top visible" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}
    </div>
  );
}
