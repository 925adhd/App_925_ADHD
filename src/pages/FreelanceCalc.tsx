import { useState } from 'react'
import '../styles/pages/FreelanceCalc.css'

const FIELDS = ['hourlyRate','hoursPerWeek','weeksPerYear','monthlyExpenses','taxRate','desiredSavings'] as const
type Field = typeof FIELDS[number]
const DEFAULTS: Record<Field, string> = { hourlyRate:'', hoursPerWeek:'', weeksPerYear:'48', monthlyExpenses:'', taxRate:'30', desiredSavings:'' }

function fmt(n: number) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') }

export default function FreelanceCalc() {
  const [tab, setTab] = useState<'income'|'expenses'|'results'>('income')
  const [v, setV] = useState<Record<Field, string>>(() => {
    const out = { ...DEFAULTS }
    FIELDS.forEach(f => { const s = localStorage.getItem('925_calc_' + f); if (s) out[f] = s })
    return out
  })
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState('')

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setV(prev => ({ ...prev, [f]: val }))
    localStorage.setItem('925_calc_' + f, val)
    if (error) setError('')
  }

  const calculate = () => {
    const r = parseFloat(v.hourlyRate) || 0, h = parseFloat(v.hoursPerWeek) || 0
    const wk = parseFloat(v.weeksPerYear) || 48, exp = parseFloat(v.monthlyExpenses) || 0
    const tax = parseFloat(v.taxRate) || 30, sav = parseFloat(v.desiredSavings) || 0
    if (!r || !h) { setError('Enter your hourly rate and hours per week to continue.'); return }
    setError('')
    const annual = r * h * wk, monthly = annual / 12, monthTax = monthly * (tax / 100)
    setResults({ annual, monthly, monthTax, exp, sav, take: monthly - monthTax - exp - sav, projects: Math.ceil((exp + sav + monthTax) / (r * 10)) })
    setTab('results')
  }

  const steps = ['income','expenses','results']
  const idx = steps.indexOf(tab)

  return (
    <div className="freelance-calc">
      <header className="page-header"><h1>Freelance Calculator</h1><p>Figure out your rates &amp; take-home pay</p></header>
      <div className="progress-steps">
        {steps.map((s, i) => (
          <div key={s} className={`step${i===idx?' active':i<idx?' complete':''}`}>
            <div className="step-dot">{i+1}</div>
            <span className="step-label">{s.charAt(0).toUpperCase()+s.slice(1)}</span>
          </div>
        ))}
      </div>

      {tab === 'income' && (
        <div className="tab-content active">
          <div className="form-group"><label>Your Hourly Rate ($)</label><input type="number" value={v.hourlyRate} onChange={set('hourlyRate')} placeholder="e.g., 50" min="0" /><div className="form-hint">What you charge clients per hour</div></div>
          <div className="form-group"><label>Hours Per Week</label><input type="number" value={v.hoursPerWeek} onChange={set('hoursPerWeek')} placeholder="e.g., 30" min="0" max="168" step="0.5" /><div className="form-hint">Be realistic about your ADHD capacity</div></div>
          <div className="form-group"><label>Weeks Per Year</label><input type="number" value={v.weeksPerYear} onChange={set('weeksPerYear')} placeholder="e.g., 48" min="0" max="52" /></div>
          <div className="tip-box"><strong>ADHD Tip</strong><p>Factor in recovery time and unexpected down days.</p></div>
          {error && <div className="form-error">{error}</div>}
          <button className="btn btn-primary" onClick={() => setTab('expenses')}>Next: Expenses →</button>
        </div>
      )}

      {tab === 'expenses' && (
        <div className="tab-content active">
          <div className="form-group"><label>Monthly Expenses ($)</label><input type="number" value={v.monthlyExpenses} onChange={set('monthlyExpenses')} placeholder="e.g., 500" min="0" /></div>
          <div className="form-group"><label>Estimated Tax Rate (%)</label><input type="number" value={v.taxRate} onChange={set('taxRate')} placeholder="e.g., 30" min="0" max="100" /></div>
          <div className="form-group"><label>Monthly Savings Goal ($)</label><input type="number" value={v.desiredSavings} onChange={set('desiredSavings')} placeholder="e.g., 500" min="0" /></div>
          <div className="tip-box"><strong>ADHD Tip</strong><p>Setting aside tax money in advance prevents last-minute panic!</p></div>
          {error && <div className="form-error">{error}</div>}
          <div className="btn-row">
            <button className="btn btn-secondary" onClick={() => setTab('income')}>← Back</button>
            <button className="btn btn-primary" onClick={calculate}>Calculate</button>
          </div>
        </div>
      )}

      {tab === 'results' && results && (
        <div className="tab-content active">
          <div className="results-card">
            <div className="results-title">Your Freelance Breakdown</div>
            <div className="result-item"><span className="result-label">Annual Income (Gross)</span><span className="result-value">{fmt(results.annual)}</span></div>
            <div className="result-item"><span className="result-label">Monthly Income (Gross)</span><span className="result-value">{fmt(results.monthly)}</span></div>
            <div className="result-item"><span className="result-label">Monthly Tax (~)</span><span className="result-value">{fmt(results.monthTax)}</span></div>
            <div className="result-item"><span className="result-label">Business Expenses</span><span className="result-value">{fmt(results.exp)}</span></div>
            <div className="result-item"><span className="result-label">Savings</span><span className="result-value">{fmt(results.sav)}</span></div>
            <div className="result-item highlight"><span className="result-label">Monthly Take-Home</span><span className="result-value">{fmt(results.take)}</span></div>
            <div className="result-item"><span className="result-label">Projects Needed/Month</span><span className="result-value">{results.projects}</span></div>
            <div className="results-tip"><strong>Pro Tip</strong><p>Charge 20-30% more than you think you need to account for energy fluctuations.</p></div>
          </div>
          <div className="btn-row" style={{ marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => setTab('expenses')}>← Back</button>
            <button className="btn btn-primary" onClick={() => { setV({...DEFAULTS}); setTab('income') }}>Start Over</button>
          </div>
        </div>
      )}
    </div>
  )
}
