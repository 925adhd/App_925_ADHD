import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/pages/GigTracker.css';

interface HistoryItem {
  amount: number;
  category: string;
  time: string;
}

interface TrackerState {
  total: number;
  tasks: number;
  history: HistoryItem[];
  goal: number;
  workTime: number;
  timerStart: number | null;
  timerRunning: boolean;
  currentCategory: string;
  lastSave?: string;
}

const CATEGORIES: Record<string, { emoji: string; amounts: number[] }> = {
  Surveys:   { emoji: '📋', amounts: [0.50, 1.00, 2.00, 5.00] },
  Freelance: { emoji: '💻', amounts: [10.00, 25.00, 50.00, 100.00] },
  Testing:   { emoji: '🔬', amounts: [4.00, 10.00, 20.00, 60.00] },
  Local:     { emoji: '🚗', amounts: [5.00, 10.00, 20.00, 40.00] },
  Other:     { emoji: '🔀', amounts: [1.00, 5.00, 10.00, 25.00] },
};
const DEFAULT_AMOUNTS = [0.50, 2.00, 5.00, 15.00];

const INITIAL_STATE: TrackerState = {
  total: 0,
  tasks: 0,
  history: [],
  goal: 25,
  workTime: 0,
  timerStart: null,
  timerRunning: false,
  currentCategory: '',
};

function loadState(): TrackerState {
  try {
    const saved = localStorage.getItem('925_gigtracker');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      if (data.lastSave === today) {
        return { ...INITIAL_STATE, ...data };
      }
      return { ...INITIAL_STATE, goal: data.goal || 25 };
    }
  } catch { /* ignore */ }
  return { ...INITIAL_STATE };
}

export default function GigTracker() {
  const [state, setState] = useState<TrackerState>(loadState);
  const [manualValue, setManualValue] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState('00:00:00');
  const [quickAmounts, setQuickAmounts] = useState<number[]>(DEFAULT_AMOUNTS);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showToast = useCallback((msg: string, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  }, []);

  const saveState = useCallback((s: TrackerState) => {
    const toSave = { ...s, lastSave: new Date().toDateString() };
    localStorage.setItem('925_gigtracker', JSON.stringify(toSave));
  }, []);

  const updateTimerDisplay = useCallback((s: TrackerState) => {
    let totalSeconds: number;
    if (s.timerRunning && s.timerStart) {
      const elapsed = Math.floor((Date.now() - s.timerStart) / 1000);
      totalSeconds = s.workTime * 60 + elapsed;
    } else {
      totalSeconds = s.workTime * 60;
    }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    setTimerDisplay(
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    );
  }, []);

  useEffect(() => {
    if (state.timerRunning) {
      timerRef.current = setInterval(() => updateTimerDisplay(state), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      updateTimerDisplay(state);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.timerRunning, state.timerStart, state.workTime, updateTimerDisplay, state]);

  const addEarning = useCallback((amount: number, currentState: TrackerState) => {
    const category = currentState.currentCategory || 'Quick add';
    const newHistory = [
      { amount, category, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...currentState.history,
    ].slice(0, 20);

    const newState: TrackerState = {
      ...currentState,
      total: currentState.total + amount,
      tasks: currentState.tasks + 1,
      history: newHistory,
    };
    saveState(newState);
    showToast(`+$${amount.toFixed(2)} added`, 'success');
    if (navigator.vibrate) navigator.vibrate(50);
    return newState;
  }, [saveState, showToast]);

  const handleAddEarning = (amount: number) => {
    setState(prev => addEarning(amount, prev));
  };

  const handleManualAdd = () => {
    const amount = parseFloat(manualValue);
    if (amount && amount > 0) {
      setState(prev => addEarning(amount, prev));
      setManualValue('');
    }
  };

  const handleSelectCategory = (name: string) => {
    setState(prev => ({
      ...prev,
      currentCategory: prev.currentCategory === name ? '' : name,
    }));
    setQuickAmounts(
      state.currentCategory === name ? DEFAULT_AMOUNTS : CATEGORIES[name].amounts
    );
  };

  const handleUndo = () => {
    setState(prev => {
      if (prev.history.length === 0) return prev;
      const [last, ...rest] = prev.history;
      const newState = {
        ...prev,
        total: Math.max(0, prev.total - last.amount),
        tasks: Math.max(0, prev.tasks - 1),
        history: rest,
      };
      saveState(newState);
      showToast(`Undid $${last.amount.toFixed(2)}`, 'error');
      return newState;
    });
  };

  const handleToggleTimer = () => {
    setState(prev => {
      if (prev.timerRunning) {
        const elapsed = Math.round((Date.now() - (prev.timerStart || Date.now())) / 60000);
        const newState = { ...prev, workTime: prev.workTime + elapsed, timerRunning: false, timerStart: null };
        saveState(newState);
        showToast(`Session ended (+${elapsed} min)`, 'success');
        return newState;
      } else {
        const newState = { ...prev, timerRunning: true, timerStart: Date.now() };
        showToast('Timer started', 'success');
        return newState;
      }
    });
  };

  const handleGoalChange = (val: string) => {
    const newGoal = parseFloat(val);
    if (newGoal && newGoal > 0) {
      setState(prev => {
        const newState = { ...prev, goal: newGoal };
        saveState(newState);
        return newState;
      });
    }
  };

  const handleExport = () => {
    const today = new Date().toLocaleDateString();
    const hourly = state.workTime > 0 ? (state.total / (state.workTime / 60)).toFixed(2) : '0.00';
    const text = `Gig Tracker
${today}

Total: $${state.total.toFixed(2)}
Tasks: ${state.tasks}
Work time: ${state.workTime} min
Hourly: $${hourly}/hr
Goal progress: ${Math.round((state.total / state.goal) * 100)}%

History:
${state.history.map(h => `${h.time}  ${h.category}  $${h.amount.toFixed(2)}`).join('\n') || 'No entries'}
`;
    navigator.clipboard.writeText(text).then(
      () => showToast('Copied', 'success'),
      () => showToast('Copy failed', 'error')
    );
  };

  const handleConfirmReset = () => {
    if (state.timerRunning) {
      setState(prev => ({ ...prev, timerRunning: false, timerStart: null }));
    }
    const newState: TrackerState = { ...INITIAL_STATE, goal: state.goal };
    saveState(newState);
    setQuickAmounts(DEFAULT_AMOUNTS);
    setState(newState);
    setShowModal(false);
    showToast('Reset', 'success');
  };

  const progress = Math.min((state.total / state.goal) * 100, 100);
  const goalReached = state.total >= state.goal;
  const hourlyRate = state.workTime > 0 ? (state.total / (state.workTime / 60)) : 0;

  return (
    <div className="gig-tracker">
      {toast && (
        <div className={`toast show ${toast.type}`}>{toast.msg}</div>
      )}

      {showModal && (
        <div className="modal-overlay show">
          <div className="modal">
            <h3>Reset today's data?</h3>
            <p>Clears earnings and history. Your goal stays.</p>
            <div className="modal-btns">
              <button className="modal-btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-btn confirm" onClick={handleConfirmReset}>Reset</button>
            </div>
          </div>
        </div>
      )}

      <header className="page-header">
        <h1>Gig Tracker</h1>
        <p>Track today's earnings.</p>
      </header>

      <div className={`total-display${goalReached ? ' goal-reached' : ''}`}>
        <div className="total-amount">${state.total.toFixed(2)}</div>
        <div className="total-info">
          {goalReached
            ? 'Goal reached.'
            : `$${(state.goal - state.total).toFixed(2)} to goal`}
        </div>
        <div className="total-sub">
          {state.tasks} task{state.tasks !== 1 ? 's' : ''} · ${hourlyRate.toFixed(2)}/hr
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <div className="goal-display">
            <span>Goal: $</span>
            <input
              type="number"
              value={state.goal}
              min={1}
              step={1}
              onChange={e => handleGoalChange(e.target.value)}
            />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className={`progress-fill${goalReached ? ' complete' : ''}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="timer-section">
        <div>
          <div className="timer-label">Work session</div>
          <div className="timer-display">{timerDisplay}</div>
        </div>
        <button className={`timer-btn${state.timerRunning ? ' running' : ''}`} onClick={handleToggleTimer}>
          {state.timerRunning ? 'Stop' : 'Start'}
        </button>
      </div>

      <h3 className="snap-label">Category</h3>
      <div className="category-grid">
        {Object.entries(CATEGORIES).map(([name, data]) => (
          <button
            key={name}
            className={`category-btn${state.currentCategory === name ? ' active' : ''}`}
            onClick={() => handleSelectCategory(name)}
          >
            <span className="emoji">{data.emoji}</span>
            <span className="name">{name}</span>
          </button>
        ))}
      </div>

      <h3 className="snap-label">Quick add</h3>
      <div className="quick-grid">
        {quickAmounts.map(amt => (
          <button
            key={amt}
            className={`quick-btn${state.currentCategory ? ' category-active' : ''}`}
            onClick={() => handleAddEarning(amt)}
          >
            ${amt.toFixed(2)}
          </button>
        ))}
      </div>

      <div className="manual-section">
        <input
          type="number"
          className="manual-input"
          placeholder="Custom amount"
          step="0.01"
          min="0"
          value={manualValue}
          onChange={e => setManualValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && parseFloat(manualValue) > 0) handleManualAdd(); }}
        />
        <button
          className="manual-btn"
          onClick={handleManualAdd}
          disabled={!parseFloat(manualValue)}
        >
          Add
        </button>
      </div>

      <h3 className="snap-label">Today</h3>
      <div className="history-section">
        <div className="history-list">
          {state.history.length === 0 ? (
            <div className="empty-state">No entries yet.</div>
          ) : (
            state.history.map((h, i) => (
              <div key={i} className="history-item">
                <div>
                  <div className="history-category">{h.category}</div>
                  <div className="history-time">{h.time}</div>
                </div>
                <div className="history-amount">+${h.amount.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="action-grid">
        <button className="action-btn undo" onClick={handleUndo} disabled={state.history.length === 0}>
          ↩ Undo
        </button>
        <button className="action-btn export" onClick={handleExport}>Export</button>
        <button className="action-btn reset" onClick={() => setShowModal(true)}>Reset</button>
      </div>
    </div>
  );
}
