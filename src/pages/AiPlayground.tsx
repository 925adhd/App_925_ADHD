import { useState, useEffect, useRef, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { supabase } from '../lib/supabase';
import '../styles/pages/AiPlayground.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Template {
  id: number;
  title: string;
  category: string;
  template: string;
}

const TEMPLATES: Template[] = [
  { id: 1, title: "Blog Post Outline", category: "content", template: "Create a blog post outline about [TOPIC]. Include an attention-grabbing intro, 3-5 main sections with key points, and a conclusion with a call-to-action. Target audience: [AUDIENCE]. Tone: [TONE - casual/professional/educational]." },
  { id: 2, title: "Social Media Caption", category: "social", template: "Write a [PLATFORM] caption for [TOPIC/PRODUCT]. Include: a hook in the first line, value or insight in the middle, and a clear call-to-action. Keep it under [LENGTH] characters. Tone: [TONE]." },
  { id: 3, title: "Client Check-In Email", category: "client", template: "Write a friendly check-in email to [CLIENT NAME] about [PROJECT]. I want to: get a status update / share progress / ask about next steps. Keep it professional but warm. Under 100 words." },
  { id: 4, title: "Project Proposal", category: "proposal", template: "Write a proposal for [PROJECT TYPE] for [CLIENT/COMPANY]. Include: my understanding of their needs, my proposed approach, timeline estimate of [TIMEFRAME], and why I'm the right fit. Budget range: [BUDGET]. Keep it under 300 words." },
  { id: 5, title: "LinkedIn Post - Win", category: "social", template: "Write a LinkedIn post sharing a recent win: [DESCRIBE WIN]. Make it feel genuine (not braggy), include a lesson others can learn from, and end with a question to encourage engagement. Under 150 words." },
  { id: 6, title: "Scope Change Response", category: "client", template: "Help me respond to a client who's asking for [NEW REQUEST] that's outside our original agreement. I want to: acknowledge their request / explain the scope impact / offer options (additional cost or revised timeline). Stay professional and solution-oriented." },
  { id: 7, title: "Problem Brainstorm", category: "problem", template: "I'm struggling with [DESCRIBE PROBLEM] in my freelance business. Give me 5 creative solutions I might not have considered. For each solution, include: how to implement it, potential challenges, and expected outcome." },
  { id: 8, title: "Pricing Response", category: "pricing", template: "A potential client asked about pricing for [SERVICE]. Help me write a response that: positions my value (not just cost), gives a range of [PRICE RANGE], explains what's included, and invites further discussion. Keep it confident but not salesy." },
  { id: 9, title: "Testimonial Request", category: "testimonial", template: "Write a message asking [CLIENT NAME] for a testimonial about [PROJECT WE COMPLETED]. Make it easy for them by: reminding them of specific results, suggesting what they might mention, and offering to draft something they can edit. Keep it under 100 words." },
  { id: 10, title: "Cold Outreach Message", category: "client", template: "Write a cold outreach message to [TARGET - specific company/person]. I offer [SERVICE] and noticed [SPECIFIC THING ABOUT THEM]. Keep it short (under 75 words), personal, and focused on their potential pain point, not my services." },
  { id: 11, title: "Service Description", category: "content", template: "Write a compelling description for my [SERVICE NAME] service. Target audience: [WHO]. Key benefits: [LIST 2-3]. Differentiator: [WHAT MAKES ME UNIQUE]. Include a clear call-to-action. Keep it under 150 words." },
  { id: 12, title: "Rate Increase Email", category: "pricing", template: "Help me write an email to [CLIENT] about increasing my rates from [OLD RATE] to [NEW RATE], effective [DATE]. Explain why (added experience, market rates, etc.) while emphasizing my commitment to their success. Keep it respectful and confident." },
  { id: 13, title: "Project Kickoff Message", category: "client", template: "Write a project kickoff message to [CLIENT] for [PROJECT]. Include: excitement about working together, what I need from them to start, my next steps, and expected first milestone. Professional but warm tone." },
  { id: 14, title: "Deadline Extension Request", category: "client", template: "Help me ask [CLIENT] for a deadline extension on [PROJECT]. Original deadline: [DATE]. New requested deadline: [NEW DATE]. Reason: [BRIEF REASON]. I want to be honest without oversharing, and offer something to make up for it." },
  { id: 15, title: "Weekly Content Ideas", category: "content", template: "Generate 5 content ideas for [PLATFORM] about [TOPIC/NICHE]. For each idea include: a catchy title/hook, 2-3 main points to cover, and best format (post, carousel, video, etc.). Target audience: [AUDIENCE]." },
  { id: 16, title: "Difficult Feedback Response", category: "client", template: "A client gave me this feedback: '[PASTE FEEDBACK]'. Help me write a professional response that: acknowledges their concerns, asks clarifying questions if needed, and proposes next steps. I want to stay calm and solution-focused." },
];

const TIPS = [
  "Tip: The more specific you are with AI, the better results you'll get. Include context!",
  "Tip: Don't like the first response? Ask AI to 'make it shorter' or 'more casual' to refine it.",
  "Tip: Starting with 'Act as a...' helps AI adopt the right expertise and tone.",
  "Tip: Save prompts that work well for you — you'll reuse them more than you think!",
  "Tip: Break big tasks into smaller prompts for better quality results.",
  "Tip: Include examples of what you want when possible — AI learns from patterns.",
  "Tip: Tell AI what NOT to do: 'Don't use jargon' or 'Avoid being salesy' really helps.",
  "Tip: You can copy any AI response and paste it into your own documents!",
];

const QUICK_PROMPTS = [
  { prompt: "Write a polite but firm email to a client whose payment is 2 weeks overdue. Keep it professional and mention that I'll need to pause work until payment is received.", category: "client", icon: "💰", label: "Ask for Payment" },
  { prompt: "Write a proposal for a website redesign project. Include an introduction about my approach, estimated timeline of 4-6 weeks, and why I'm a good fit. Keep it under 200 words.", category: "proposal", icon: "📋", label: "Make a Proposal" },
  { prompt: "Help me write a response to a client who keeps adding new requests outside the original scope. I want to be firm but not lose the relationship.", category: "client", icon: "🛑", label: "Handle Extra Requests" },
  { prompt: "Write a LinkedIn post about landing my first freelance client. Make it engaging, authentic, and include a subtle call-to-action. Keep it under 150 words.", category: "content", icon: "📱", label: "Write a LinkedIn Post" },
  { prompt: "Help me write a polite but confident response declining a project offer because the budget is too low. Suggest that I'd be happy to discuss if their budget changes.", category: "client", icon: "🙅", label: "Say No to Low Pay" },
  { prompt: "I'm stuck on how to find my first clients as a new freelancer. Can you help me brainstorm 3 different solutions with pros and cons for each?", category: "problem", icon: "🧠", label: "Brainstorm Ideas" },
];

const CATEGORY_LABELS: Record<string, string> = {
  content: 'Write: blog or post',
  client: 'Message a client',
  proposal: 'Make a proposal',
  social: 'Write a social post',
  problem: 'Fix a problem',
  pricing: 'Talk about price',
  testimonial: 'Ask for a review',
};

const ALLOWED_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'qwen/qwen3-32b',
  'meta-llama/llama-4-maverick-17b-128e-instruct',
];
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;
const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/ai-chat`;

function formatMessage(content: string): string {
  const html = content
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
  return DOMPurify.sanitize(html);
}

function highlightBlanks(text: string): string {
  return text.replace(/\[([^\]]+)\]/g, '<span class="blank">[$1]</span>');
}

export default function AiPlayground() {
  const [activeTab, setActiveTab] = useState<'playground' | 'templates' | 'learn'>('playground');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [error, setError] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const [templateFilter, setTemplateFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [dontShowCopy, setDontShowCopy] = useState(false);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex(prev => (prev + 1) % TIPS.length);
        setTipVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const maxH = Math.max(200, Math.floor(window.innerHeight * 0.45));
    el.style.height = Math.min(el.scrollHeight, maxH) + 'px';
  };

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const sendMessage = async () => {
    const content = inputValue.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content || isLoading) return;

    setInputValue('');
    setError('');
    // Cap history to prevent sending enormous payloads on every request
    const cappedHistory = messages.slice(-MAX_HISTORY_MESSAGES);
    const newMessages: Message[] = [...cappedHistory, { role: 'user', content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Please sign in to use the AI Playground.');
      }
      const authToken = session.access_token;

      // Validate model against whitelist before sending
      const safeModel = ALLOWED_MODELS.includes(model) ? model : ALLOWED_MODELS[0];

      const response = await fetch(AI_FUNCTION_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, model: safeModel }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to get response. Please try again.';
      setError(msg);
      setMessages(newMessages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const copyLastAssistant = () => {
    const assistantMsgs = messages.filter(m => m.role === 'assistant');
    if (assistantMsgs.length === 0) { showToast('No AI response to copy'); return; }
    const text = assistantMsgs[assistantMsgs.length - 1].content;
    const dontShow = localStorage.getItem('ai_copy_reminder_hide') === '1';
    navigator.clipboard.writeText(text).then(() => {
      if (!dontShow) setShowCopyModal(true);
    }).catch(() => {
      if (!dontShow) setShowCopyModal(true);
      showToast('Copy failed — try selecting text manually');
    });
  };

  const handleCopyModalOk = () => {
    if (dontShowCopy) localStorage.setItem('ai_copy_reminder_hide', '1');
    setShowCopyModal(false);
  };

  const usePrompt = (prompt: string) => {
    setInputValue(prompt);
    setActiveTab('playground');
    setTimeout(autoResizeTextarea, 60);
  };

  const filteredTemplates = templateFilter === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === templateFilter);

  return (
    <div className="ai-playground">
      <div className="bg-effects">
        <div className="grid-pattern" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="container">
        <section className="hero">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            Free AI Practice Zone
          </div>
          <h1>AI Playground for Freelancers</h1>
          <p>Learn to use AI for client emails, proposals, pricing, and more. Real practice with pre-built templates — no experience needed.</p>
        </section>

        <div className="tabs-container">
          <div className="tabs">
            <button className={`tab${activeTab === 'playground' ? ' active' : ''}`} onClick={() => setActiveTab('playground')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2c3 2 5 5 5 9 0 4-2 7-5 9-3-2-5-5-5-9 0-4 2-7 5-9z" />
                <circle cx="12" cy="11" r="1.5" />
                <path d="M7 14l-3 3" />
                <path d="M17 14l3 3" />
                <path d="M12 20c-.8 1-1.5 2-1.5 2s1 .5 1.5.5 1.5-.5 1.5-.5-0.7-1-1.5-2z" />
              </svg>
              <span className="tab-text">Playground</span>
            </button>
            <button className={`tab${activeTab === 'templates' ? ' active' : ''}`} onClick={() => setActiveTab('templates')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
              <span className="tab-text">Templates</span>
            </button>
            <button className={`tab${activeTab === 'learn' ? ' active' : ''}`} onClick={() => setActiveTab('learn')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              <span className="tab-text">Learn</span>
            </button>
          </div>
        </div>

        <div className="tips-banner">
          <div className="tips-icon">💡</div>
          <div className="tips-text" style={{ opacity: tipVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
            {TIPS[tipIndex]}
          </div>
        </div>

        {/* Playground Tab */}
        {activeTab === 'playground' && (
          <div className="tab-content active" id="playground-tab">
            <div className="ready-banner">
              <div className="prompt-scroll-wrapper" style={{ width: '100%' }}>
                <div className="prompts-scroll">
                  {QUICK_PROMPTS.map((qp, i) => (
                    <button key={i} className="prompt-btn" onClick={() => usePrompt(qp.prompt)}>
                      <span className="icon">{qp.icon}</span>
                      <span>{qp.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="error-message show">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                <span>{error}</span>
              </div>
            )}

            <div className="chat-container">
              <div className="chat-header">
                <div className="model-select-wrapper">
                  <label htmlFor="modelSelect">Model:</label>
                  <select className="model-select" id="modelSelect" value={model} onChange={e => setModel(e.target.value)}>
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Best)</option>
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B (Fast)</option>
                    <option value="qwen/qwen3-32b">Qwen 3 32B (Strong)</option>
                    <option value="meta-llama/llama-4-maverick-17b-128e-instruct">Llama 4 Maverick (High Quality)</option>
                  </select>
                </div>
                <div className="chat-actions">
                  <button className="btn btn-ghost" onClick={() => setMessages([])}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    Clear
                  </button>
                  <button className="copy-btn" onClick={copyLastAssistant} title="Copy last AI response">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    Copy
                  </button>
                </div>
              </div>

              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.length === 0 && !isLoading ? (
                  <div className="empty-chat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <h4>Ready to practice!</h4>
                    <p>Type a prompt below or click a quick prompt to get started.</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, i) => (
                      <div key={i} className={`message ${msg.role}`}>
                        <div className="message-header">
                          <div className="message-avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
                          <span className="message-sender">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                        </div>
                        <div className="message-content" dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                      </div>
                    ))}
                    {isLoading && (
                      <div className="message assistant">
                        <div className="message-header">
                          <div className="message-avatar">🤖</div>
                          <span className="message-sender">AI Assistant</span>
                        </div>
                        <div className="typing-indicator"><span /><span /><span /></div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="chat-input-area">
                <div className="input-wrapper">
                  <textarea
                    ref={textareaRef}
                    className="chat-input"
                    placeholder="Ask AI to help with a freelance task..."
                    value={inputValue}
                    onChange={e => { setInputValue(e.target.value); autoResizeTextarea(); }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  />
                  <button className="btn btn-primary send-btn" onClick={sendMessage} disabled={isLoading}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="tab-content active" id="templates-tab">
            <div className="category-filter">
              {['all', 'content', 'client', 'proposal', 'social', 'problem', 'pricing', 'testimonial'].map(f => (
                <button
                  key={f}
                  className={`filter-btn${templateFilter === f ? ' active' : ''}`}
                  onClick={() => setTemplateFilter(f)}
                >
                  {f === 'all' ? 'All' : CATEGORY_LABELS[f] || f}
                </button>
              ))}
            </div>
            <div className="templates-grid">
              {filteredTemplates.map(t => (
                <div
                  key={t.id}
                  className={`template-card category-${t.category}`}
                  onClick={() => usePrompt(t.template)}
                >
                  <div className="template-header">
                    <div className="template-title">{t.title}</div>
                    <span className="template-category">{CATEGORY_LABELS[t.category] || t.category}</span>
                  </div>
                  <div className="template-preview" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightBlanks(t.template)) }} />
                  <div className="template-use-hint">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    Click to use this template
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <div className="tab-content active" id="learn-tab">
            <div className="learn-grid">
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">🎯</div><h3>Be Specific</h3></div>
                <p>Vague prompts get vague answers. Include details like tone, length, audience, and context for much better results.</p>
                <div className="example-prompt"><strong>❌ Weak:</strong> "Write an email to a client"<br /><br /><strong>✅ Better:</strong> "Write a friendly but professional email to a client who hasn't responded in a week. I want to check in without being pushy. Keep it under 100 words."</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Write a friendly but professional email to a client who hasn't responded in a week. I want to check in without being pushy. Keep it under 100 words.")}>Try this prompt →</button>
              </div>
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">🎭</div><h3>Give AI a Role</h3></div>
                <p>Starting with "Act as..." helps AI adopt the right expertise and tone. It's like hiring a specialist for your specific need.</p>
                <div className="example-prompt"><strong>Example:</strong> "Act as an experienced freelance copywriter. Review my portfolio description and suggest improvements to attract higher-paying clients."</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Act as an experienced freelance copywriter. Review this portfolio description and suggest improvements to attract higher-paying clients: 'I write content for businesses.'")}>Try this prompt →</button>
              </div>
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">🔄</div><h3>Iterate & Refine</h3></div>
                <p>Your first prompt rarely gives perfect results. Follow up with requests like "make it shorter," "more casual," or "add more detail about X."</p>
                <div className="example-prompt"><strong>Follow-ups that work:</strong><br />• "Make this more conversational"<br />• "Shorten to 3 sentences"<br />• "Add a specific example"<br />• "Make it sound more confident"</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Write a short bio for my freelance profile. I'm a graphic designer who specializes in branding for small businesses.")}>Try a prompt to refine →</button>
              </div>
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">📚</div><h3>Use Examples</h3></div>
                <p>Show AI what you want by including an example of the style, format, or tone you're going for.</p>
                <div className="example-prompt"><strong>Example:</strong> "Write a project update email in this style: 'Hey [Name]! Quick update on where we're at...' Keep it casual and upbeat like talking to a friendly colleague."</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Write a project update email in this style: 'Hey [Name]! Quick update on where we're at...' Keep it casual and upbeat like talking to a friendly colleague. The project is a website redesign that's 60% complete.")}>Try this prompt →</button>
              </div>
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">🚫</div><h3>Tell It What NOT to Do</h3></div>
                <p>Sometimes it's easier to specify what you don't want. "Don't use jargon" or "avoid being salesy" can really help.</p>
                <div className="example-prompt"><strong>Example:</strong> "Write a cold outreach message to a potential client. Don't be pushy or use phrases like 'touch base' or 'synergy.' Keep it human and genuine."</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Write a cold outreach message to a potential client who might need a virtual assistant. Don't be pushy or use phrases like 'touch base' or 'synergy.' Keep it human and genuine.")}>Try this prompt →</button>
              </div>
              <div className="learn-card">
                <div className="learn-card-header"><div className="learn-icon">🧩</div><h3>Break Down Big Tasks</h3></div>
                <p>For complex projects, break them into steps. Ask AI to help with one piece at a time for better quality results.</p>
                <div className="example-prompt"><strong>Instead of:</strong> "Create my entire business plan"<br /><br /><strong>Try:</strong> "Help me define my target audience for my freelance [service] business. Who would benefit most and why?"</div>
                <button className="try-prompt-btn" onClick={() => usePrompt("Help me define my target audience for my freelance writing business. Who would benefit most from hiring a freelance writer, and what problems do they have that I can solve?")}>Try this prompt →</button>
              </div>
            </div>
          </div>
        )}

        <footer className="page-footer">
          <p>AI Playground by <a href="https://925adhd.com">925 ADHD</a> • Powered by Llama AI</p>
        </footer>
      </div>

      {toast && <div className="toast show success">{toast}</div>}

      {showCopyModal && (
        <div className="copy-modal show" role="dialog" aria-modal="true">
          <div className="backdrop" onClick={handleCopyModalOk} />
          <div className="dialog" role="document">
            <h4>Copied!</h4>
            <p>
              <span className="reminder-label"><span className="icon">💡</span> Reminder</span>
              <span className="reminder-text">remove any extra AI response lines or assistant labels before pasting this into your documents.</span>
            </p>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <input type="checkbox" checked={dontShowCopy} onChange={e => setDontShowCopy(e.target.checked)} />
                Do not show this again
              </label>
              <button className="ok-btn" onClick={handleCopyModalOk}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
