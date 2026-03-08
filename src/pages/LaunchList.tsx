import '../styles/pages/LaunchList.css'

const cards = [
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'Prolific', desc: 'High-paying academic studies — quick onboarding' },
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'Survey Junkie', desc: 'Easy surveys you can do on mobile' },
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'Fiverr', desc: 'Create simple gigs and sell services' },
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'Clickworker', desc: 'Microtasks for flexible earnings' },
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'TranscribeMe', desc: 'Short transcription tasks, pay per clip' },
  { href: '#', img: 'https://via.placeholder.com/320x180.png?text=App', title: 'iVueit', desc: 'Real-world photo tasks—secret shopper style' },
]

export default function LaunchList() {
  return (
    <div className="launch-list">
      <header style={{ marginBottom: '12px' }}>
        <a href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>← Back</a>
      </header>

      <section className="intro">
        <small>Your Low-Effort Launch List</small>
        <div>
          🔑 Here's a solid lineup of ADHD-friendly apps and platforms to help you start earning from home. Think of this as your soft launch—zero pressure, just easy wins while you explore what actually excites you. Try a few, follow the dopamine, and see what sticks.
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.04)', margin: '12px 0' }} />
      </section>

      <section className="cards" aria-label="card-collection">
        {cards.map((card, i) => (
          <a key={i} className="card" href={card.href}>
            <img src={card.img} alt="App" />
            <h4>{card.title}</h4>
            <p>{card.desc}</p>
          </a>
        ))}
      </section>

      <a className="see-all" href="#">See All</a>
    </div>
  )
}
