import { useState, useEffect } from 'react'
import '../styles/pages/ReceiptStacker.css'

const APPS = [
  { name: 'Ibotta', url: 'https://ibotta.com/get-the-app', earnings: '$0.10–$5.00', action: 'Activate offers + upload receipt', tip: 'Tap offers, activate matching ones, then upload receipt' },
  { name: 'Fetch Rewards', url: 'https://fetch.com', earnings: '$0.01–$0.50', action: 'Upload receipt', tip: 'Scan barcode or upload image to earn points' },
  { name: 'Benjamin', url: 'https://www.benjaminone.com', earnings: '$0.05–$16.00', action: 'Upload receipt + link card', tip: 'Also earn from games, surveys, and linked cards' },
  { name: 'CoinOut', url: 'https://coinout.com', earnings: '$0.01–$0.10', action: 'Upload receipt', tip: 'Snap a photo for instant cash back' },
  { name: 'Receipt Hog', url: 'https://receipthog.com', earnings: '$0.01–$0.05', action: 'Upload receipt', tip: 'Earn coins, sweepstakes entries, and rewards' },
  { name: 'Amazon Panel', url: 'https://panel.amazon.com', earnings: '~$1 / 10 receipts', action: 'Upload (invite only)', tip: 'Amazon invites you to upload for extra rewards' },
  { name: 'Swagbucks', url: 'https://www.swagbucks.com', earnings: '$0.10–$0.50', action: 'Activate + upload', tip: 'Activate offers first, then upload receipts for points' },
  { name: 'InboxDollars', url: 'https://www.inboxdollars.com', earnings: '$0.10–$0.50', action: 'Activate + upload', tip: 'Activate offers and upload for cash rewards' },
  { name: 'Shopkick', url: 'https://www.shopkick.com', earnings: '$0.01–$0.10', action: 'Scan receipt (if listed)', tip: 'Scan barcode if eligible to earn points' },
]

export default function ReceiptStacker() {
  const [completed, setCompleted] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('925_receipts') || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('925_receipts', JSON.stringify(completed)) }, [completed])

  const toggle = (i: number) => {
    setCompleted(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
    if (navigator.vibrate) navigator.vibrate(30)
  }

  const pct = (completed.length / APPS.length) * 100
  const done = completed.length === APPS.length

  return (
    <div className="receipt-stacker">
      <header className="page-header"><span className="emoji">🧾</span><h1>Receipt Stacker</h1><p>Upload each receipt to ALL apps for max cashback</p></header>

      <div className="progress-card">
        <div className="progress-header"><span>Progress</span><span className="progress-count"><span>{completed.length}</span> / <span>{APPS.length}</span> apps</span></div>
        <div className="progress-bar"><div className={`progress-fill${done?' complete':''}`} style={{ width: `${pct}%` }} /></div>
      </div>

      {done && (
        <div className="celebration show">
          <span className="emoji">🎉</span>
          <h3>Receipt fully stacked!</h3>
          <p>You've maximized your cashback on this receipt</p>
        </div>
      )}

      <div className="apps-grid">
        {APPS.map((app, i) => (
          <div key={app.name} className={`app-card${completed.includes(i)?' completed':''}`} onClick={() => toggle(i)}>
            <div className="app-checkbox">{completed.includes(i) ? '✓' : ''}</div>
            <div className="app-content">
              <div className="app-header">
                <div className="app-name"><a href={app.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{app.name}</a></div>
                <div className="app-earnings">💰 {app.earnings}</div>
              </div>
              <div className="app-action">{app.action}</div>
              <div className="app-tip">💡 {app.tip}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={() => setCompleted([])}>🔄 Reset for Next Receipt</button>
      <div className="footer-tip">💡 Stack that receipt gold ✨ One scan at a time</div>
    </div>
  )
}
