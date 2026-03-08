import { useState } from 'react'
import '../styles/pages/Essentials.css'

interface Tool {
  id: string
  icon: string
  iconClass: string
  title: string
  subtitle: string
  category: string
  description: string
  features: string[]
  tip: string
  link?: { url: string; text: string }
}

const tools: Tool[] = [
  {
    id: 'browser',
    icon: '🌐',
    iconClass: 'browser',
    title: 'Opera Browser',
    subtitle: 'Your secret productivity weapon',
    category: 'Browser',
    description: 'Opera gives you a competitive edge with built-in tools that directly impact your earnings.',
    features: [
      '<strong>Free Built-in VPN:</strong> Access higher-paying international surveys (2-3x more)',
      '<strong>Native Ad Blocker:</strong> Pages load 40% faster = more tasks per hour',
      '<strong>Workspaces:</strong> Keep different gig platforms completely separate',
      '<strong>Sidebar Messengers:</strong> Stay responsive without losing your flow',
      '<strong>Tab Islands:</strong> Organize related tasks for faster switching',
    ],
    tip: 'Create workspaces: "High-Pay Surveys" (Prolific, Swagbucks), "Client Work" (Upwork, Fiverr). Use VPN for Canadian/UK survey sites that pay $15-25/hr vs $8-12 domestic.',
    link: { url: 'https://opera.com', text: '📥 Download Opera Free' },
  },
  {
    id: 'extensions',
    icon: '🧩',
    iconClass: 'extensions',
    title: 'Power Extensions',
    subtitle: 'Automate everything',
    category: 'Extensions',
    description: 'These browser extensions are proven income multipliers used by successful gig workers.',
    features: [
      '<strong>Bitwarden (Free):</strong> Auto-fill forms instantly - saves 2-3 minutes per survey',
      '<strong>Honey:</strong> Automatic coupon codes for any purchases',
      '<strong>Grammarly:</strong> Perfect writing for higher approval rates',
      '<strong>RescueTime:</strong> Track exactly how much time on each platform',
      '<strong>Text Blaze:</strong> Create text shortcuts for common responses',
    ],
    tip: 'Use Bitwarden to store pre-filled forms with your demographics. Create Text Blaze shortcuts for your address and standard responses. This combo saves 5+ minutes per task.',
    link: { url: 'https://chrome.google.com/webstore', text: '🛍️ Browse Extensions' },
  },
  {
    id: 'mobile',
    icon: '📱',
    iconClass: 'mobile',
    title: 'Mobile Arsenal',
    subtitle: 'Earn anywhere, anytime',
    category: 'Mobile',
    description: 'Your phone can generate $10-30/day in "dead time" - commutes, waiting in lines, TV breaks.',
    features: [
      '<strong>Top Earners:</strong> Swagbucks, InboxDollars, Branded Surveys',
      '<strong>Receipt Scanning:</strong> Ibotta, Fetch Rewards - passive income from shopping',
      '<strong>Location-Based:</strong> Field Agent, Gigwalk for $3-15 local tasks',
      '<strong>Quick Surveys:</strong> Google Opinion Rewards for 30-second tasks',
      '<strong>Cashback:</strong> Rakuten, Dosh for automatic earnings',
    ],
    tip: "Keep 3-4 survey apps logged in. Check during peak hours (lunch 12-1pm, evening 6-8pm). Set up all receipt apps and scan every purchase - it's literally free money.",
  },
  {
    id: 'security',
    icon: '🛡️',
    iconClass: 'security',
    title: 'Security Fortress',
    subtitle: 'Protect your digital assets',
    category: 'Security',
    description: 'Gig workers are prime targets for scams. A single breach can lock you out for weeks.',
    features: [
      '<strong>2FA on Everything:</strong> Use Google Authenticator - especially PayPal, banking',
      '<strong>Separate Work Email:</strong> Create one just for gig work to contain breaches',
      '<strong>VPN for Public WiFi:</strong> Never do gig work on coffee shop WiFi unprotected',
      '<strong>Password Manager:</strong> Unique passwords for every platform',
      '<strong>Backup Payment Methods:</strong> Have 2-3 ways to get paid',
    ],
    tip: 'Watch for fake "training fee" requests, checks that need "processing," and jobs requiring upfront purchases. Legitimate platforms never ask for money via email.',
    link: { url: 'https://bitwarden.com', text: '🔒 Get Bitwarden' },
  },
  {
    id: 'organize',
    icon: '📊',
    iconClass: 'organize',
    title: 'Command Center',
    subtitle: 'Data-driven success',
    category: 'Organization',
    description: "Most gig workers fail because they don't track what actually makes money.",
    features: [
      '<strong>Earnings Tracker:</strong> Date, Platform, Time Spent, Earnings, Hourly Rate',
      '<strong>Tax Organization:</strong> Separate folder for 1099s, expenses, mileage',
      '<strong>Platform Bookmarks:</strong> Organize by highest hourly rate first',
      '<strong>Weekly Review:</strong> 15 minutes every Sunday to analyze what worked',
      '<strong>Goal Tracking:</strong> Daily dollar targets, not "hours worked"',
    ],
    tip: 'Track everything for 2 weeks, then find which 20% of activities generate 80% of income. Drop low-performers and scale what works. This can double your hourly rate.',
    link: { url: 'https://docs.google.com/spreadsheets', text: '📊 Start Google Sheets' },
  },
  {
    id: 'hardware',
    icon: '💻',
    iconClass: 'hardware',
    title: 'Hardware Investment',
    subtitle: 'Speed equals money',
    category: 'Hardware',
    description: 'Your hardware directly impacts earnings. Slow equipment = fewer completed tasks.',
    features: [
      '<strong>Reliable Internet:</strong> 25+ Mbps for video tasks ($10+ per test)',
      '<strong>Decent Headphones:</strong> $50 pair for transcription work ($15-22/hr)',
      '<strong>External Monitor:</strong> Even a cheap 22" doubles multitasking efficiency',
      '<strong>Comfortable Chair:</strong> Back pain kills productivity',
      '<strong>Backup Internet:</strong> Mobile hotspot for when main connection fails',
    ],
    tip: 'Start with internet speed and a second monitor - you can find good used monitors for $50-80. The productivity boost pays for itself in the first week.',
  },
]

export default function Essentials() {
  const [openTool, setOpenTool] = useState<string | null>(null)

  const toggleTool = (id: string) => {
    setOpenTool(prev => (prev === id ? null : id))
  }

  return (
    <div className="essentials">
      <header className="page-header">
        <h1>Gig Work Essentials</h1>
        <p>Tools and strategies to maximize your online earnings</p>
      </header>

      <div className="tools-list">
        {tools.map(tool => (
          <div
            key={tool.id}
            className={`tool-card${openTool === tool.id ? ' open' : ''}`}
            onClick={() => toggleTool(tool.id)}
          >
            <div className="tool-header">
              <div className={`tool-icon ${tool.iconClass}`}>{tool.icon}</div>
              <div className="tool-info">
                <div className="tool-title">{tool.title}</div>
                <div className="tool-subtitle">{tool.subtitle}</div>
              </div>
              <div className="tool-toggle">▼</div>
            </div>
            {openTool === tool.id && (
              <div className="tool-content">
                <div className="tool-body">
                  <span className="category-badge">{tool.category}</span>
                  <p>{tool.description}</p>
                  <ul className="feature-list">
                    {tool.features.map((f, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: f }} />
                    ))}
                  </ul>
                  <div className="pro-tip">
                    <div className="pro-tip-title">💡 Pro Tip</div>
                    <p>{tool.tip}</p>
                  </div>
                  {tool.link && (
                    <a href={tool.link.url} target="_blank" rel="noreferrer" className="link-btn">
                      {tool.link.text}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
