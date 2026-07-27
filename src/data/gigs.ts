import type React from 'react'

export interface Gig {
  id: string
  name: string
  rate: string
  desc: string
  logo: string
  link: string
  category: string
  energy: string
  tags: string[]
  browser: boolean
  fave?: boolean
}

export const FALLBACK_SVG =
  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%232a2a2a%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22%23888%22 font-size=%2240%22>💼</text></svg>"

export function handleGigImgError(e: React.SyntheticEvent<HTMLImageElement>, gig: Gig) {
  const img = e.target as HTMLImageElement
  const src = img.src
  const base = `images/${gig.id}`
  if (src.endsWith(`${gig.id}.png`)) {
    img.src = `${base}.jpg`
  } else if (src.endsWith(`${gig.id}.jpg`)) {
    img.src = `${base}.webp`
  } else if (src.endsWith(`${gig.id}.webp`)) {
    img.src = gig.logo.includes('placeholder') ? FALLBACK_SVG : gig.logo
  } else {
    img.src = FALLBACK_SVG
  }
}

export function getEnergyLabel(energy: string): string {
  if (energy === 'low') return '5–10 min tasks'
  if (energy === 'med') return '15–30 min sessions'
  return '30+ min focused'
}

export function gigDetailPath(gig: Gig): string {
  return `/gig-detail?gig=${gig.id}`
}

export const gigs: Gig[] = [
  { id: "pressplay", name: "PressPlay", rate: "$0.60–$5/hr", desc: "Watch movie trailers for Amazon credit. Fun if you love movies.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/WUBBxNlrGzQLgbYSo2ns.png", link: "https://us.mypressplay.com", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "slicethepie", name: "Slice The Pie", rate: "$1–$8/hr", desc: "Get paid to review music, ads, and fashion clips.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/N5HyBECr8SGscfvrXhHs.jpg", link: "https://www.slicethepie.com/", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "methinks", name: "Methinks", rate: "$5–$100+/gig", desc: "Video interviews and app tests for product research.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/alNW7pxDjaH7vy1c9gwt.png", link: "https://www.methinks.io/thinker", category: "surveys", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "influenster", name: "Influenster", rate: "Free products", desc: "Test products and keep them. Free stuff, no cash.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4A7UA3KtSXUkc9ueckJH.png", link: "https://www.influenster.com/", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "prolific", name: "Prolific", rate: "$8–$18/hr", desc: "Paid college studies. Guaranteed pay, fast PayPal.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/immy0sOGu8FJH0lgD7VN.png", link: "https://www.prolific.com/participants", category: "surveys", energy: "low", tags: ["beginner", "quick", "highpay"], browser: true, fave: true },
  { id: "cloudresearchconnect", name: "CloudResearch Connect", rate: "$6–$15/hr", desc: "Research surveys from universities and companies. Fair pay.", logo: "images/cloudresearch.webp", link: "https://www.cloudresearch.com/products/connect-for-participants/", category: "surveys", energy: "low", tags: ["beginner", "highpay"], browser: true, fave: true },
  { id: "dscout", name: "Dscout", rate: "$25–$250/mission", desc: "Video diaries and app tests for big brands.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ir5Usfji0u0VtJf8iXTn.png", link: "https://dscout.com/participate-in-research-studies", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "respondentio", name: "Respondent.io", rate: "$50–$250+/study", desc: "Big-pay studies if you have a real job or skill.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/tHrBfm7B9TRyDq7uZh73.png", link: "https://www.respondent.io/signup", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "usertesting", name: "UserTesting", rate: "$10–$60/hr", desc: "Test sites and apps with your voice and screen. Pays well.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/THI1IS5clNzV8HIJ96gn.png", link: "https://www.usertesting.com/get-paid-to-test", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "playtestcloud", name: "PlaytestCloud", rate: "$10–$50/hr", desc: "Play new games before they launch and share what you think.", logo: "images/playtestcloud.webp", link: "https://playtestcloud.com/", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "trymata", name: "Trymata", rate: "$10–$60/hr", desc: "Test new apps on your own time. Easy to start.", logo: "images/trymata.jpg", link: "https://trymata.com/", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "testbirds", name: "Testbirds", rate: "$10–$50/test", desc: "Test sites and apps. Get paid per test, plus $1 for each bug you find.", logo: "images/testbirds.jpeg", link: "https://nest.testbirds.com/home", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "mturk", name: "Amazon MTurk", rate: "$2–$6/hr avg", desc: "Amazon's giant pile of tiny tasks. Slow start, but it builds up.", logo: "images/mturk.png", link: "https://www.mturk.com/worker", category: "microtasks", energy: "low", tags: ["quick","beginner"], browser: false },
  { id: "lionbridge", name: "Lionbridge", rate: "$3–$20/hr", desc: "Language and AI tasks from a big company.", logo: "images/lionbridge.png", link: "https://lionbridge.ai/", category: "ai", energy: "med", tags: ["beginner"], browser: false },
  { id: "justanswer", name: "JustAnswer", rate: "$10–$50/hr", desc: "Get paid to answer questions if you're an expert in something.", logo: "images/justanswer.png", link: "https://www.justanswer.com/experts", category: "expert", energy: "high", tags: ["highpay"], browser: false },
  { id: "pineconeresearch", name: "Pinecone Research", rate: "$3–$12/hr", desc: "Pays well for surveys and product tests. Invite only.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bibC3v0lT4ryuYu9LMCr.png", link: "https://members.pineconeresearch.com/#/", category: "surveys", energy: "low", tags: ["beginner", "highpay"], browser: false },
  { id: "surveyjunkie", name: "Survey Junkie", rate: "$1–$5/hr", desc: "Steady survey pay. One of the most trusted apps.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4sv9XSwPHs8dV9zETDsd.jpg", link: "https://www.surveyjunkie.com/", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "toluna", name: "Toluna", rate: "$3–$5/hr", desc: "Surveys plus polls and games. More fun than most.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/El5li3CDmxyW2lFaPwyz.png", link: "https://www.toluna.com/home", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "lifepoints", name: "LifePoints", rate: "$1.50–$3/hr", desc: "Steady survey pay. Works great on your phone.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/cAodh8wHqXuLW7PoRjgR.png", link: "https://www.lifepointspanel.com/", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "paidviewpoint", name: "Paid Viewpoint", rate: "$1–$3/hr", desc: "Short surveys. Still pays you even if you don't qualify.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/X4p6CA7iYfoM0LyEDUxQ.png", link: "https://paidviewpoint.com/landing/?r=925adhd", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "outlier", name: "Outlier", rate: "$15–$35/hr", desc: "Help train AI by rating its answers. Pays well.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/261LHUjlubG5IjYr0LZv.png", link: "https://outlier.ai", category: "ai", energy: "med", tags: ["highpay"], browser: false },
  { id: "appen", name: "Appen", rate: "$3–$14/hr", desc: "Label data to help train AI models.", logo: "https://cdn-images.himalayas.app/vmlva5ltollcahuby442urxngpau", link: "https://jobs.lever.co/appen", category: "ai", energy: "med", tags: ["beginner"], browser: false },
  { id: "clickworker", name: "Clickworker", rate: "$5–$12/hr", desc: "Small writing and labeling tasks. Easy to start.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/C1vyAjM6bkaR4bcNeCeA.png", link: "https://clickworker.app/EnMUcv", category: "ai", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "neevo", name: "Neevo", rate: "$5–$12/hr", desc: "Simple text, image, and audio tasks for AI training.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zbigllQ1z7hix1BDq2XT.png", link: "https://www.neevo.ai/", category: "ai", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "bestmark", name: "BestMark", rate: "$10–$25/assignment", desc: "Mystery shopping at lots of stores and restaurants.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/M19p9QumhG9pef4jnC4G.jpg", link: "https://www.bestmark.com/become-a-mystery-shopper/", category: "mystery", energy: "med", tags: ["beginner"], browser: false },
  { id: "isecretshop", name: "iSecretShop", rate: "$5–$20/assignment", desc: "Mystery shopping you can do from your phone.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/MUcOeiXW3P0e1CGmmUos.jpg", link: "https://www.isecretshop.com/register", category: "mystery", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "marketforce", name: "Market Force", rate: "$5–$15/assignment", desc: "Visit stores or restaurants, fill out a quick form. Free food perk.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SxHLTnmhZ2kYE3ShRn4Y.png", link: "https://shopper.marketforce.com/#/login/newShopper/Apply", category: "mystery", energy: "med", tags: ["beginner"], browser: false },
  { id: "gigspot", name: "Gigspot", rate: "$5–$20/assignment", desc: "One app to find mystery shopping gigs from many companies.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/PkdyJvLxQhLJzuLbbnAu.jpg", link: "https://www.gigspot.com/", category: "mystery", energy: "med", tags: ["beginner"], browser: false, fave: true },
  { id: "prestoshopper", name: "Presto Shopper", rate: "$5–$15/assignment", desc: "Mystery shopping near you. Get paid the same day.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DvyAgPosZi8eWjHhb77J.jpg", link: "https://insta.prestomobilesurveys.com/site", category: "mystery", energy: "med", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "rev", name: "Rev", rate: "$10–$20/hr", desc: "Transcribe audio for big clients like Google and Amazon.", logo: "https://logosandtypes.com/wp-content/uploads/2022/04/Rev.png", link: "https://www.rev.com/freelancers", category: "transcription", energy: "high", tags: ["highpay"], browser: false },
  { id: "transcribeme", name: "TranscribeMe", rate: "$15–$22/hr", desc: "Short audio clips. Flexible hours, easy to start.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6CTYiprr2sytaztxIqjN.jpg", link: "https://www.transcribeme.com/legal-transcriptionists-jobs/", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "gotranscript", name: "GoTranscript", rate: "$10–$20/hr", desc: "Transcribe audio and video. Paid weekly through PayPal.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/2dkvf9pM4iw2a2GqOY2A.png", link: "https://gotranscript.com/transcription-jobs#apply-now", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "scribie", name: "Scribie", rate: "$5–$15/hr", desc: "Beginner transcription work. Currently on hold.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/LPDr1SXNANI6HXdPTP3K.jpg", link: "https://scribie.com/transcription/freelance", category: "transcription", energy: "high", tags: ["beginner"], browser: false },
  { id: "tigerfish", name: "Tigerfish", rate: "$5–$15/hr", desc: "Interviews, focus groups, and legal recordings. Strict on quality.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/0a6l1YHXaIwBGINRrlEb.jpg", link: "https://tigerfish.com/transcription-jobs/", category: "transcription", energy: "high", tags: ["beginner"], browser: false },
  { id: "castingwords", name: "CastingWords", rate: "$8–$12/hr", desc: "Pick the projects you want. Paid weekly through PayPal.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Vw2FEfsJFflaRP1c5VAk.png", link: "https://workshop.castingwords.com/", category: "transcription", energy: "high", tags: ["beginner", "quick"], browser: false },
  { id: "speechpad", name: "SpeechPad", rate: "$10–$25/hr", desc: "General, legal, and medical transcription. Paid twice a week.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SzYR5rgBweNs9sJ4811F.jpg", link: "https://www.speechpad.com/worker", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "quicktate", name: "Quicktate", rate: "$5–$10/hr", desc: "Short voicemails plus medical and legal clips. Quick tasks.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/uadmcUQtwAJA4ZC3LRHv.png", link: "https://typists.quicktate.com/transcribers/signup", category: "transcription", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "voices", name: "Voices", rate: "$200–$5,000+/project", desc: "Voice work for ads, audiobooks, and games.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/wcEU9y1lRWTp9LrNAyMq.png", link: "https://www.voices.com/talent", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "voice123", name: "Voice123", rate: "$100–$2,000+/project", desc: "Set your own voice acting rates. No platform fees.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jpwPeaMTIVCxow6FaQJY.png", link: "https://voice123.com/#how-to-search", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "acx", name: "ACX (Amazon)", rate: "$200–$800+/hr", desc: "Narrate audiobooks for Audible. Earn royalties or flat pay.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/3cyNkaHvJa798oxeZ7n0.jpg", link: "https://www.acx.com/mp/how-it-works/narrators-and-studios", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "clearvoice", name: "ClearVoice", rate: "$100–$400+/article", desc: "Brands come to you for content. No bidding wars.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kRJCNp4S56RIYwZjvhWN.png", link: "https://clearvoice.com/signup", category: "writing", energy: "high", tags: ["highpay"], browser: false },
  { id: "scripted", name: "Scripted", rate: "$15–$50+/hr", desc: "Pick the writing jobs you want. No bidding.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/oHFDNcszl0MjisQF0KgJ.png", link: "https://www.scripted.com/become-a-scripted-writer", category: "writing", energy: "high", tags: ["highpay"], browser: false },
  { id: "writeraccess", name: "WriterAccess", rate: "$0.10–$1+/word", desc: "Rated by stars. Higher rating means better pay.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jrkeq8izQRqzi3czUPvx.png", link: "https://www.writeraccess.com/talent-overview/", category: "writing", energy: "high", tags: ["beginner"], browser: false },
  { id: "wyzant", name: "Wyzant", rate: "$30–$100+/hr", desc: "Tutor school subjects and test prep. Pays well, US only.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4CdttfiOOk3ESSjWBGO7.jpg", link: "https://www.wyzant.com/tutorsignupstart", category: "teaching", energy: "high", tags: ["highpay"], browser: false },
  { id: "preply", name: "Preply", rate: "$10–$40/hr", desc: "Tutor anything to students worldwide.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/v0v44KBbRCrOhwJeveYj.png", link: "https://preply.com/en/teach", category: "teaching", energy: "high", tags: ["beginner"], browser: false },
  { id: "italki", name: "iTalki", rate: "$5–$80/hr", desc: "Teach languages. You keep 85% of what you earn.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rZ25jNe1Ex4MYF20nh15.png", link: "https://teach.italki.com/application", category: "teaching", energy: "high", tags: ["beginner"], browser: false },
  { id: "cambly", name: "Cambly", rate: "$10–$12/hr", desc: "Just chat in English with students. No lesson planning.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/qghhXnqBdMEruH5bEWuL.png", link: "https://www.cambly.com/en/tutors?lang=en", category: "teaching", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "belaysolutions", name: "Belay Solutions", rate: "$15–$25/hr", desc: "Long term virtual assistant work for US clients.", logo: "https://media.licdn.com/dms/image/v2/D4E10AQHq0VJgaQKacA/image-shrink_800/image-shrink_800/0/1729178105794?e=2147483647&v=beta&t=9ly-pcP9eBsjgqN-2HEIdRa6hp99y98oJxR1z_ZfGnc", link: "https://belaysolutions.com/work-with-us/?=undefined", category: "va", energy: "high", tags: ["highpay"], browser: false },
  { id: "timeetc", name: "Time Etc", rate: "$15–$30/hr", desc: "Steady virtual assistant work, US and UK only.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/l5f859tQVXgDlX2aIqTN.png", link: "https://www.timeetc.com/work-for-us", category: "va", energy: "high", tags: ["highpay"], browser: false },
  { id: "fancyhands", name: "Fancy Hands", rate: "$10–$15/hr", desc: "Quick virtual assistant tasks. Great for ADHD wins.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/asHamvyp91UGgroT69Si.jpg", link: "https://www.fancyhands.com/jobs", category: "va", energy: "med", tags: ["quick", "beginner"], browser: false },
  { id: "toptal", name: "Toptal", rate: "$60–$150+/hr", desc: "Top tier freelance work. Hard to get in, pays a lot.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/z6xQQ7MZhH05Jephsdwo.png", link: "https://toptal.com/", category: "freelance", energy: "high", tags: ["highpay"], browser: false },
  { id: "fiverr", name: "Fiverr", rate: "$5–$500+/project", desc: "List your service. Clients come find you. No bidding.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Tji9gPHOWc8JX0Fr7lI6.png", link: "https://fiverr.com/", category: "freelance", energy: "high", tags: ["beginner"], browser: false },
  { id: "freelancer", name: "Freelancer", rate: "$10–$80+/hr", desc: "Lots of projects, but you have to bid against others.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zp6u2DdwP3cg0mFJxlSy.png", link: "https://freelancer.com/", category: "freelance", energy: "high", tags: ["beginner"], browser: false },
  { id: "youtube", name: "YouTube", rate: "$100–$50,000+/video", desc: "Make videos and earn from ads or sponsors.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/hIE0fwA9FyxSmGRkM0DU.png", link: "https://www.youtube.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "tiktok", name: "TikTok", rate: "$50–$20,000+/post", desc: "Short videos that can blow up fast.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/aUgg51uy2GH9tSe5bMN9.png", link: "https://www.tiktok.com/", category: "social", energy: "high", tags: ["beginner", "highpay"], browser: false },
  { id: "instagram", name: "Instagram", rate: "$200–$10,000+/post", desc: "Photos and reels for brand deals and affiliate links.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SHQ0QHgRlMhnXMFMaEhC.jpg", link: "https://www.instagram.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "twitch", name: "Twitch", rate: "$50–$5,000+/stream", desc: "Live stream for tips, subs, and sponsors.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/aIgY0lJtG2Y2UqbbaZ1h.png", link: "https://www.twitch.tv/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "patreon", name: "Patreon", rate: "$5–$5,000+/month", desc: "Fans pay you monthly to support your work.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ytr18NnJQrCOhaCW2MYY.png", link: "https://www.patreon.com/", category: "social", energy: "high", tags: ["beginner"], browser: false },
  { id: "kofi", name: "Ko-fi", rate: "$1–$1,000+/tip", desc: "Tip jar for creators. No fees on tips. Sell stuff too.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rV3EmPqdyk7oLMwji0FC.png", link: "https://ko-fi.com/", category: "social", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "facebook", name: "Facebook", rate: "$100–$10,000+/post", desc: "Sell in groups, run a page, or land brand deals.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/joOXU3pGdlKULwwTQ7K7.png", link: "https://www.facebook.com/", category: "social", energy: "med", tags: ["beginner"], browser: false },
  { id: "x", name: "X (Twitter)", rate: "$50–$5,000+/tweet", desc: "Short posts with ad revenue or sponsor deals.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bvwxaR2mEAAX605zQhsx.png", link: "https://www.x.com/", category: "social", energy: "med", tags: ["beginner"], browser: false },
  { id: "linkedin", name: "LinkedIn", rate: "$500–$20,000+/gig", desc: "Find clients, speaking gigs, and course buyers.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DiQhmMBQMIupg107v1KD.png", link: "https://www.linkedin.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "etsy", name: "Etsy", rate: "Self-set", desc: "Sell handmade, vintage, or craft goods to a global crowd.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/pvvTqqHXOWCv5aaHVeWe.jpg", link: "https://etsy.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "amazonhandmade", name: "Amazon Handmade", rate: "Self-set", desc: "Sell crafts on Amazon. Huge customer reach.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/vXq9tx9PrQnlM3UYpxcQ.png", link: "https://amzn.to/4iuPkoW", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "printify", name: "Printify", rate: "Self-set", desc: "Design shirts and goods. They print and ship for you.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/EqIVRaEWxVI0Zx1EETTB.png", link: "https://printify.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "shopify", name: "Shopify", rate: "Self-set", desc: "Build your own online store. No marketplace fees.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/btCVM7WHtPjyDkOzTYM9.png", link: "https://www.shopify.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "bigcartel", name: "Big Cartel", rate: "Self-set", desc: "Simple shop for artists. Free for up to 5 products.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ewYZW2h7UsgFBwovET4X.png", link: "https://www.bigcartel.com/", category: "handmade", energy: "high", tags: ["beginner", "quick"], browser: false },
  { id: "folksy", name: "Folksy", rate: "Self-set", desc: "UK handmade shop with a small market feel.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kkiMUUFxv2vhogMosyDK.png", link: "https://folksy.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "carecom", name: "Care.com", rate: "$20–$35/hr", desc: "Babysitting, elder care, and more. Flexible hours.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/5I3e2N4NAjdUE4PJqfKY.dat", link: "https://www.care.com", category: "care", energy: "high", tags: ["highpay"], browser: false },
  { id: "rover", name: "Rover", rate: "$20–$40/hr", desc: "Dog walking and pet sitting. Like Airbnb for pets.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/n8yzcHBxOVGYzZeYTAPc.png", link: "https://rover.com", category: "care", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "wag", name: "Wag", rate: "$13–$25/hr", desc: "Quick dog walks and drop in visits. Fast bookings.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Cw1AUklnSjvwc5cFkDgL.png", link: "https://wagwalking.com", category: "care", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "taskrabbit", name: "TaskRabbit", rate: "$17.50–$50+/hr", desc: "Cleaning, moving, IKEA assembly, and errands.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Y0lwF8oCSOa0ygsFLxiQ.jpg", link: "https://taskrabbit.com", category: "care", energy: "high", tags: ["highpay"], browser: false },
  { id: "papa", name: "Papa", rate: "$13–$20/hr", desc: "Hang out with seniors. Errands and friendly chats.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/OdxfBWuzWg2E3ANzr6ua.jpg", link: "https://papa.com", category: "care", energy: "med", tags: ["beginner"], browser: false },
  { id: "trustedhousesitters", name: "Trusted Housesitters", rate: "Free lodging", desc: "Sit pets and houses while owners travel. Lodging is the pay.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jIeyGBhuLLHKbK542yIO.png", link: "https://trustedhousesitters.com", category: "care", energy: "med", tags: ["beginner"], browser: false },
  { id: "neighbor", name: "Neighbor", rate: "$50–$600/month", desc: "Rent out your garage, attic, or driveway for storage.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/N6RhLYI5sYTjDX1HUQYO.png", link: "https://neighbor.com", category: "care", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "chewy", name: "Chewy (Remote Jobs)", rate: "$16–$19.50/hr", desc: "Remote customer service. Pet friendly company culture.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/QNRVyClen6pxcHI6ygv0.png", link: "https://careers.chewy.com/us/en/c/customer-service-jobs", category: "care", energy: "med", tags: ["beginner"], browser: false },

  // --- Migrated from Apps page: real-world microtasks ---
  { id: "fieldagent", name: "Field Agent", rate: "$3–$20/task", desc: "Quick in-person tasks while you're out. Price checks, photos, store audits.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bJvEwgxE41M5YKf5NNUc.png", link: "https://usapp.fieldagent.net/applinks/invite/?code=j65bwhd", category: "realtasks", energy: "low", tags: ["quick", "beginner"], browser: false, fave: true },
  { id: "ivueit", name: "iVueit", rate: "$7–$50/task", desc: "Get paid to take photos of buildings or displays. Each gig is 5 to 20 minutes.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/er56Fd22kM8MbO3mU1Az.png", link: "https://ivueit.com/become-a-vuer", category: "realtasks", energy: "low", tags: ["quick", "beginner"], browser: false },
  { id: "proxypics", name: "ProxyPics", rate: "$14–$50/task", desc: "Property photo gigs. Homes pay $14 flat. Commercial pays more.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zkc8z9Vsbr0yqMVfYHiK.png", link: "https://ppcrowdsource.app.link/", category: "realtasks", energy: "low", tags: ["quick", "beginner"], browser: false },

  // --- Migrated from Apps page: delivery ---
  { id: "doordash", name: "DoorDash", rate: "$10–$20/hr", desc: "Biggest food delivery app in the US. Real pay is closer to $11/hr.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/gX3qkpfWt1KW1Voi4Nfl.png", link: "https://dasher.doordash.com/en-us", category: "delivery", energy: "med", tags: ["beginner"], browser: false },
  { id: "instacart", name: "Instacart", rate: "$15–$25/hr", desc: "Shop and deliver groceries. Tips can boost pay, but the system is tricky.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/3GFZJ6HCfDr2O27WKzSb.png", link: "https://shoppers.instacart.com/role/full-service", category: "delivery", energy: "med", tags: ["beginner"], browser: false },
  { id: "amazonflex", name: "Amazon Flex", rate: "$18–$25/hr", desc: "Deliver Amazon packages in set time blocks. Hardest part is grabbing blocks.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mZvl7S4O63tkqCfwYh7b.png", link: "https://flex.amazon.com/", category: "delivery", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "sparkdriver", name: "Spark Driver", rate: "$15–$25/hr", desc: "Walmart's delivery gig. Quieter in suburbs, but pay has dropped lately.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/KRzWH9SN42Im32S7MV5b.png", link: "https://www.walmart.com/cp/spark-driver/1231928", category: "delivery", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "ubereats", name: "Uber Eats", rate: "$15–$25/hr", desc: "Food delivery on your schedule. Real pay after gas is $8 to $15/hr.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/mTdTqcZhnOuJB5FcChLb.png", link: "https://www.uber.com/us/en/drive/delivery/", category: "delivery", energy: "med", tags: ["beginner"], browser: false },

  // --- Migrated from Apps page: reward apps ---
  { id: "modeearn", name: "Mode Earn", rate: "$10–$50/mo", desc: "Android only. Earns in the background while you charge or scroll.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/x2dOwyvRkTLnqbXD6fee.jpg", link: "https://crrnt.me/YhtvwsOw64b", category: "rewards", energy: "low", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "justplay", name: "JustPlay", rate: "$0.25–$2/day", desc: "Play games for instant PayPal. Big first week, then drops fast.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/HGRph2COAlLKrmVczKxH.jpg", link: "https://justplay.com/", category: "rewards", energy: "low", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "mistplay", name: "Mistplay", rate: "$5–$20/mo", desc: "Play games for rewards. Now on iOS too. Slower than it used to be.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rCXLcdy5K4EBVE2fQPdW.jpg", link: "https://mistplay.onelink.me/ZGRQ/8wftysuq", category: "rewards", energy: "low", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "freecash", name: "Freecash", rate: "$1–$10/day", desc: "Tasks and offers for crypto or PayPal. Watch out for cashout issues.", logo: "images/freecash.png", link: "https://freecash.com/", category: "rewards", energy: "low", tags: ["beginner"], browser: false },

  // --- Migrated from Apps page: cashback & receipts ---
  { id: "fetch", name: "Fetch Rewards", rate: "$25–$150/yr", desc: "Scan any receipt for points. Easiest one. Best pay is from Special Offers.", logo: "https://play-lh.googleusercontent.com/E0T0M0dd9w6v7X9_CFaaxlaFjyrGxSLGKxks9NWuAkcQoVckHsGnA_F50SzRSSoMlzs=w240-h480-rw", link: "https://referral.fetch.com/vvv3/referralqr?code=4CVA47", category: "cashback", energy: "low", tags: ["beginner", "quick"], browser: false, fave: true },
  { id: "ibotta", name: "Ibotta", rate: "$100–$360/yr", desc: "Cash back on groceries. Auto tracks Walmart and Kroger loyalty cards.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bY1HhCITQgsYsrOOgCGz.png", link: "https://home.ibotta.com/", category: "cashback", energy: "low", tags: ["beginner"], browser: false, fave: true },
  { id: "rakuten", name: "Rakuten", rate: "$30–$300/yr", desc: "Set and forget online cashback. Install the extension, get paid quarterly.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/YAoQtLxBaX1cdRNsICoB.jpg", link: "https://www.rakuten.com/", category: "cashback", energy: "low", tags: ["beginner"], browser: true },
  { id: "swagbucks", name: "Swagbucks", rate: "$50–$600/yr", desc: "Old school rewards site. Skip the surveys, use the shopping portal.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kV1Ic0B8nEXPNSAGTtA6.png", link: "https://www.swagbucks.com/", category: "cashback", energy: "low", tags: ["beginner"], browser: false },
  { id: "pogo", name: "Pogo", rate: "$5–$40/yr", desc: "Passive cashback linked to your card. Small pay, set and forget.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6vibzs1oxfjhXTaySH0N.jpg", link: "https://www.joinpogo.com/", category: "cashback", energy: "low", tags: ["beginner", "quick"], browser: false },

  // --- Migrated from Apps page: passive + movement ---
  { id: "honeygain", name: "Honeygain", rate: "$2–$8/mo", desc: "Earns pennies for sharing your unused internet. Slow payouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/XFzVcPA2ZQRwdAl1iyVM.png", link: "https://join.honeygain.com/KGIBS7A0B7", category: "passive", energy: "low", tags: ["beginner"], browser: false, fave: true },
  { id: "weward", name: "WeWard", rate: "$5–$15/mo", desc: "Get PayPal cash for walking. Slow to verify each cashout.", logo: "images/weward.png", link: "https://www.wewardapp.com", category: "movement", energy: "med", tags: ["beginner"], browser: false },
]

export const categories: Record<string, { icon: string; name: string }> = {
  fun: { icon: "🎮", name: "Fun or Interesting" },
  surveys: { icon: "📊", name: "Surveys & Market Research" },
  ai: { icon: "🤖", name: "AI Training & Data Work" },
  testing: { icon: "🕹️", name: "Playtesting & App Testing" },
  microtasks: { icon: "⚙️", name: "Microtasks & Crowdsourcing" },
  expert: { icon: "🧑‍⚕️", name: "Expert Consultations" },
  mystery: { icon: "🕵️", name: "Mystery Shoppers" },
  transcription: { icon: "🎧", name: "Transcription" },
  voice: { icon: "🎙️", name: "Voice & Audio Work" },
  writing: { icon: "✍️", name: "Content Writing" },
  teaching: { icon: "👩‍🏫", name: "Online Teaching" },
  va: { icon: "💼", name: "Virtual Assistant" },
  freelance: { icon: "🌐", name: "Freelancing Marketplaces" },
  social: { icon: "📱", name: "Social Media" },
  handmade: { icon: "🎨", name: "Handmade Goods" },
  care: { icon: "🐾", name: "Care & Service" },
  // Real-world app categories (migrated from /apps)
  realtasks: { icon: "📍", name: "Real-World Microtasks" },
  delivery: { icon: "🚗", name: "Delivery" },
  rewards: { icon: "🎮", name: "Reward Apps" },
  cashback: { icon: "🧾", name: "Cashback & Receipts" },
  passive: { icon: "📡", name: "Passive / Bandwidth" },
  movement: { icon: "🏃", name: "Movement" },
}

export const catOrder = [
  // Quick dopamine: low friction, instant feedback
  'surveys', 'cashback', 'rewards', 'microtasks',
  // Variety / short tasks
  'realtasks', 'mystery', 'testing', 'ai', 'delivery', 'movement', 'fun',
  // Skill-based: medium commitment
  'transcription', 'voice', 'writing', 'social', 'handmade',
  // High commitment: sustained focus, schedules
  'teaching', 'va', 'expert', 'freelance', 'care',
  // Passive: set-and-forget
  'passive',
]

export const proTips = [
  { strong: "🧠 ADHD tip:", text: "Pick ONE option that fits your energy. Sign up while you're motivated. Future you says thanks." },
  { strong: "💡 Decision Fatigue Fix:", text: "Use the energy filter above. Low? Stick to surveys. Hyperfocus mode? Try Etsy or freelancing!" },
  { strong: "❤️ Dopamine Hack:", text: "Save your favorites (tap the heart) so you can come back without decision paralysis." },
  { strong: "📈 Stacking Strategy:", text: "Sign up for 2-3 survey sites now. More options = more available tasks when you need them." },
  { strong: "⚡ Quick Win:", text: "Prolific + Survey Junkie + PaidViewpoint = solid survey stack you can set up in 15 minutes." },
]

export const energyMeta: Record<string, { label: string; desc: string }> = {
  low:   { label: '😴 Low',     desc: '5–10 min tasks' },
  ok:    { label: '🙂 Medium', desc: 'Focused work' },
  hyper: { label: '⚡ Focus',  desc: 'Higher pay' },
}

export const startHereIds = ['paidviewpoint', 'cloudresearchconnect', 'prolific']

export const gigsById: Record<string, Gig> = Object.fromEntries(gigs.map(g => [g.id, g]))
