import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Feedback.css';

type FeedbackKind = 'feature' | 'bug' | 'other';

interface Submission {
  title: string;
  kind: FeedbackKind;
  date: string;
  status: string;
}

export default function Feedback() {
  const [kind, setKind] = useState<FeedbackKind>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wantResponse, setWantResponse] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getSubmissions = (): Submission[] => {
    try { return JSON.parse(localStorage.getItem('925_feedback_submissions') || '[]'); } catch { return []; }
  };

  const saveSubmission = (payload: Omit<Submission, 'status'>) => {
    const submissions = getSubmissions();
    submissions.unshift({ ...payload, status: 'received' });
    localStorage.setItem('925_feedback_submissions', JSON.stringify(submissions.slice(0, 5)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setStatus('Just need a quick summary!'); setIsError(true); return; }
    if (!description.trim()) { setStatus('Tell me a bit more about it!'); setIsError(true); return; }
    if (wantResponse && !email.trim()) { setStatus('Add your email so I can respond!'); setIsError(true); return; }

    setIsError(false);
    setStatus('Sending...');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY || '');
    formData.append('name', wantResponse && email.trim() ? email.trim() : 'Anonymous User');
    formData.append('email', wantResponse && email.trim() ? email.trim() : 'anonymous@925adhd.com');
    formData.append('subject', `[${kind.toUpperCase()}] ${title}`);

    const timestamp = new Date().toLocaleString();
    let message = `Feedback Type: ${kind}\nTitle: ${title}\nSubmitted: ${timestamp}\nWants Response: ${wantResponse ? 'Yes' : 'No'}\n`;
    if (wantResponse && email.trim()) message += `Reply To: ${email.trim()}\n`;
    message += `\n--- Details ---\n${description}`;
    formData.append('message', message);
    formData.append('redirect', 'false');

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.success) {
        saveSubmission({ title, kind, date: new Date().toISOString() });
        setIsSuccess(true);
        setStatus('');
      } else {
        setStatus(`Error: ${data.message || 'Server error'}`);
        setIsError(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setStatus(`Error: ${msg}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const charWarning = description.length > 900
  const charDanger = description.length > 970

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setWantResponse(false)
    setEmail('')
    setStatus('')
    setIsError(false)
    setIsSuccess(false)
    setKind('feature')
  }

  return (
    <div className="feedback">
      <header className="page-header">
        <h1>Got feedback?</h1>
        <p>Your ideas shape what gets built next. Even rough ideas help — you don't have to write something perfect.</p>
      </header>

      <div className="form-card">
        {!isSuccess ? (
              <form id="feedbackForm" onSubmit={handleSubmit}>
                <input type="checkbox" name="botcheck" id="botcheck" style={{ display: 'none' }} />

                <div className="form-group">
                  <label>What's this about? <span className="hint">Helps me prioritize</span></label>
                  <div className="type-selector">
                    {([['feature', '💡', 'Feature idea'], ['bug', '🐛', 'Bug report'], ['other', '💬', 'Other']] as const).map(([val, emoji, label]) => (
                      <div
                        key={val}
                        className={`type-btn${kind === val ? ' active' : ''}`}
                        onClick={() => setKind(val)}
                        role="button"
                        aria-pressed={kind === val}
                      >
                        <span className="emoji">{emoji}</span>
                        <span className="label">{label}</span>
                        {kind === val && <span className="type-check">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Quick summary</label>
                  <input type="text" id="title" name="title" placeholder="Example: Add a timer tool for focus sessions" maxLength={100} value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Tell me more <span className="hint">Even one sentence helps</span></label>
                  <textarea id="description" name="description" placeholder={"Explain your idea, describe the problem, or just brain-dump here.\nEven one or two sentences helps."} maxLength={1000} value={description} onChange={e => setDescription(e.target.value)} />
                  <div className={`char-count${description.length > 0 ? ' visible' : ''}${charDanger ? ' danger' : charWarning ? ' warning' : ''}`}>
                    <span>{description.length}</span> / 1000
                  </div>
                </div>

                <div className="form-group">
                  <div className="checkbox-row" onClick={() => setWantResponse(!wantResponse)}>
                    <input type="checkbox" id="wantResponse" checked={wantResponse} onChange={e => setWantResponse(e.target.checked)} onClick={e => e.stopPropagation()} />
                    <label htmlFor="wantResponse" onClick={e => e.stopPropagation()}>
                      I'd like a response
                      <span className="hint">Let me know if you want feedback or follow-up.</span>
                    </label>
                  </div>
                  {wantResponse && (
                    <div className="email-section visible">
                      <label htmlFor="email">Your email</label>
                      <input type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  )}
                </div>

                <button type="submit" className="submit-btn" id="submitBtn" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send feedback ✨'}
                </button>
                {status && <div className={`status${isError ? ' error' : ''}`}>{status}</div>}
              </form>
            ) : (
              <div className="success-state visible">
                <span className="success-emoji">✨</span>
                <h2>Feedback received!</h2>
                <p>Thanks for helping improve the app.</p>
                <div className="success-actions">
                  <button className="send-another-btn" onClick={resetForm}>Send another</button>
                  <Link to="/" className="back-btn">Back to Home</Link>
                </div>
              </div>
        )}
      </div>
    </div>
  );
}
