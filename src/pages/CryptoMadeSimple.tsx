import { useState, useEffect } from 'react';
import '../styles/pages/CryptoMadeSimple.css';

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

export default function CryptoMadeSimple() {
  const progress = useScrollProgress();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="crypto-made-simple">
      <header className="page-header">
        <h1>🪙 Crypto <span>Made Simple</span></h1>
        <p>A beginner's guide that actually makes sense</p>
      </header>

      <div className="disclaimer">
        <span className="icon">⚠️</span>
        <div className="disclaimer-text">
          <strong>Not Financial Advice:</strong> I'm not a financial advisor! This is just compiled research to help beginners understand crypto basics. Always do your own research and never invest more than you can afford to lose.
        </div>
      </div>

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
          {[['what-is-crypto', 'What is Crypto?'], ['how-it-works', 'How it Works'], ['getting-started', 'Get Started'], ['staying-safe', 'Stay Safe'], ['adhd-tips', 'ADHD Tips']].map(([id, label]) => (
            <button key={id} className="toc-link" onClick={() => scrollToSection(id)}>{label}</button>
          ))}
        </div>
      </nav>

      <section className="section" id="what-is-crypto">
        <div className="section-header"><span className="emoji">🤔</span><div><h2>What is Crypto?</h2><p className="subtitle">The simple explanation</p></div></div>
        <div className="big-text">Think of crypto like <span className="highlight">digital money</span> that lives on the internet</div>
        <div className="comparison">
          <div className="card traditional"><h3><span className="emoji" style={{ fontSize: '20px' }}>🏦</span> Regular Money</h3><p>You keep it in a bank. The bank controls it. You need the bank to send it.</p></div>
          <div className="card crypto"><h3><span className="emoji" style={{ fontSize: '20px' }}>🪙</span> Crypto Money</h3><p>You keep it in a digital wallet. You control it. Send directly to anyone.</p></div>
        </div>
        <div className="alert tip"><span className="icon">💡</span><div className="alert-content"><h4>Simple way to think about it</h4><p>Crypto is like having cash, but digital. No banks needed!</p></div></div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--muted)' }}>Popular cryptos you might know:</h3>
        <div className="coin-list">
          <div className="coin"><span className="emoji">🟠</span><div className="coin-info"><h4>Bitcoin (BTC)</h4><p>The first and most famous one</p></div><span className="coin-tag limited">21M limit</span></div>
          <div className="coin"><span className="emoji">🔷</span><div className="coin-info"><h4>Ethereum (ETH)</h4><p>Can do more than just payments</p></div><span className="coin-tag unlimited">No limit</span></div>
          <div className="coin"><span className="emoji">🐕</span><div className="coin-info"><h4>Dogecoin (DOGE)</h4><p>Started as a joke, became popular</p></div><span className="coin-tag unlimited">No limit</span></div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-header"><span className="emoji">⚙️</span><div><h2>How Does Crypto Work?</h2><p className="subtitle">The magic behind digital money</p></div></div>
        <div className="card-grid">
          <div className="card"><span className="emoji">📚</span><h3>The Blockchain</h3><p>A notebook everyone can see. Every transaction gets written down. No one can erase it.</p></div>
          <div className="card"><span className="emoji">👥</span><h3>No Single Owner</h3><p>Thousands of computers keep copies. Super hard to hack or break.</p></div>
          <div className="card"><span className="emoji">🔐</span><h3>Your Wallet</h3><p>Like a mailbox with an address. You have a key to open it and send crypto out.</p></div>
          <div className="card"><span className="emoji">⛏️</span><h3>Mining</h3><p>Computers compete to verify transactions. Winners earn new crypto as reward.</p></div>
        </div>
        <div className="big-text">It's like a <span className="highlight">super secure group chat</span> where everyone can see the messages, but only you can send from your account</div>
        <div className="card-grid">
          <div className="card"><span className="emoji">🏦</span><h3>No Bank Needed</h3><p>No permission required. No waiting 3-5 business days.</p></div>
          <div className="card"><span className="emoji">🌍</span><h3>Works Everywhere</h3><p>Send money to Japan or your neighbor - same speed, same cost.</p></div>
          <div className="card"><span className="emoji">👀</span><h3>Everything Visible</h3><p>All transactions are public. Hard to cheat or lie.</p></div>
          <div className="card"><span className="emoji">🔒</span><h3>You Own It</h3><p>Can't be frozen by a bank. No one can take it if you keep keys safe.</p></div>
        </div>
        <div className="alert tip"><span className="icon">💡</span><div className="alert-content"><h4>Think About It</h4><p>Imagine sending $20 to a friend in another country instantly, for less than a penny, without asking anyone's permission. That's crypto!</p></div></div>
      </section>

      <section className="section" id="getting-started">
        <div className="section-header"><span className="emoji">🚀</span><div><h2>How to Get Started</h2><p className="subtitle">Your first steps into crypto</p></div></div>
        <div className="steps">
          <div className="step"><span className="step-num">1</span><div className="step-content"><h3>Choose an App</h3><p>Start with Coinbase, Cash App, or Robinhood. These are like training wheels for crypto.</p></div></div>
          <div className="step"><span className="step-num">2</span><div className="step-content"><h3>Verify Your Identity</h3><p>Just like opening a bank account, you'll need to show ID. Normal and required by law.</p></div></div>
          <div className="step"><span className="step-num">3</span><div className="step-content"><h3>Start Small</h3><p>Buy $10-20 worth of Bitcoin first. Think of it as paying for a lesson, not an investment.</p></div></div>
          <div className="step"><span className="step-num">4</span><div className="step-content"><h3>Learn and Explore</h3><p>Watch how the price moves. Read about different cryptos. Take your time.</p></div></div>
        </div>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--muted)' }}>Beginner-friendly apps:</h3>
        <div className="app-grid">
          {[{ emoji: '🔵', name: 'Coinbase', desc: 'Most beginner-friendly. Great for learning.', href: 'https://www.coinbase.com' }, { emoji: '💚', name: 'Cash App', desc: 'Simple Bitcoin buying. You might already have it.', href: 'https://cash.app' }, { emoji: '🪶', name: 'Robinhood', desc: 'Easy interface. Good for stocks + crypto.', href: 'https://robinhood.com' }].map(app => (
            <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className="app-card">
              <span className="emoji">{app.emoji}</span>
              <div className="app-info"><h4>{app.name}</h4><p>{app.desc}</p></div>
              <span className="app-arrow">→</span>
            </a>
          ))}
        </div>
        <div className="alert warning"><span className="icon">⚠️</span><div className="alert-content"><h4>Start Slow!</h4><p>Only invest money you can afford to lose. Crypto prices go up and down a lot!</p></div></div>
      </section>

      <section className="section" id="staying-safe">
        <div className="section-header"><span className="emoji">🛡️</span><div><h2>How to Stay Safe</h2><p className="subtitle">Protect yourself from scams</p></div></div>
        <div className="card-grid">
          <div className="card"><span className="emoji">🔒</span><h3>Keep Keys Safe</h3><p>Your wallet password is like car keys. If someone gets them, they take everything.</p></div>
          <div className="card"><span className="emoji">🎯</span><h3>Stick to Known Apps</h3><p>Use popular apps like Coinbase. Avoid random sites promising "easy money."</p></div>
          <div className="card"><span className="emoji">🚨</span><h3>Watch for Scams</h3><p>If someone promises you'll get rich quick, it's probably a scam.</p></div>
          <div className="card"><span className="emoji">🐢</span><h3>Go Slow</h3><p>Real crypto investing is slow and boring. Fast money = fast losses.</p></div>
        </div>
        <div className="alert danger"><span className="icon">🚫</span><div className="alert-content"><h4>Red Flags to Avoid</h4><ul><li>Anyone asking for your wallet password</li><li>Promises of guaranteed profits</li><li>Pressure to buy RIGHT NOW</li><li>Celebrity endorsements on social media</li><li>"Send me crypto and I'll send back double"</li></ul></div></div>
        <div className="big-text">Remember: <span className="highlight">If it sounds too good to be true, it probably is!</span></div>
      </section>

      <section className="section" id="adhd-tips">
        <div className="section-header"><span className="emoji">🧠</span><div><h2>Tips for ADHD Brains</h2><p className="subtitle">Make crypto work with your brain</p></div></div>
        <div className="card-grid">
          <div className="card"><span className="emoji">📱</span><h3>Set Price Alerts</h3><p>Use notifications instead of constantly checking. Your brain will thank you.</p></div>
          <div className="card"><span className="emoji">⏰</span><h3>Schedule Check-ins</h3><p>Pick one day a week to look at your crypto. Daily checking = emotional decisions.</p></div>
          <div className="card"><span className="emoji">📝</span><h3>Write Down Your Plan</h3><p>Before buying, write why you're buying and when you might sell. Stick to it.</p></div>
          <div className="card"><span className="emoji">🧘</span><h3>Stay Calm</h3><p>Prices go up and down. This is normal. Don't make big decisions when emotional.</p></div>
        </div>
        <div className="alert tip"><span className="icon">🎉</span><div className="alert-content"><h4>You've Got This!</h4><p>Crypto might seem scary at first, but you can learn it step by step. Start small, stay safe, and take your time.</p></div></div>
      </section>

      {progress > 50 && (
        <button className="scroll-top visible" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}
    </div>
  );
}
