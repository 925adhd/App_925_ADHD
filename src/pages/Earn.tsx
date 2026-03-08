import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/pages/Earn.css';

interface Gig {
  id: string;
  name: string;
  rate: string;
  desc: string;
  logo: string;
  link: string;
  category: string;
  energy: string;
  tags: string[];
  browser: boolean;
  fave?: boolean;
}

const gigs: Gig[] = [
  { id: "pressplay", name: "PressPlay", rate: "$0.60–$5/hr", desc: "Watch unreleased trailers & screenings for Amazon vouchers. Low pay but fun for movie fans.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/WUBBxNlrGzQLgbYSo2ns.png", link: "https://us.mypressplay.com", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "slicethepie", name: "Slice The Pie", rate: "$1–$8/hr", desc: "Paid reviews on music, fashion, and commercials.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/N5HyBECr8SGscfvrXhHs.jpg", link: "https://www.slicethepie.com/", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "methinks", name: "Methinks", rate: "$5–$100+/gig", desc: "Video interviews, app testing, and surveys for product research.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/alNW7pxDjaH7vy1c9gwt.png", link: "https://www.methinks.io/thinker", category: "surveys", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "influenster", name: "Influenster", rate: "Free products", desc: "Test and review products through VoxBoxes; earn freebies, not cash.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4A7UA3KtSXUkc9ueckJH.png", link: "https://www.influenster.com/", category: "fun", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "prolific", name: "Prolific", rate: "$8–$18/hr", desc: "High-paying academic studies. Guaranteed minimum pay and PayPal cashouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/immy0sOGu8FJH0lgD7VN.png", link: "https://www.prolific.com/participants", category: "surveys", energy: "low", tags: ["beginner", "quick", "highpay"], browser: true, fave: true },
  { id: "cloudresearchconnect", name: "CloudResearch Connect", rate: "$6–$15/hr", desc: "University and corporate research surveys with fair pay.", logo: "images/cloudresearch.webp", link: "https://www.cloudresearch.com/products/connect-for-participants/", category: "surveys", energy: "low", tags: ["beginner", "highpay"], browser: true },
  { id: "dscout", name: "Dscout", rate: "$25–$250/mission", desc: "Video diaries, app testing, and live interviews for top brands.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ir5Usfji0u0VtJf8iXTn.png", link: "https://dscout.com/participate-in-research-studies", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "respondentio", name: "Respondent.io", rate: "$50–$250+/study", desc: "High-paying research studies for professionals.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/tHrBfm7B9TRyDq7uZh73.png", link: "https://www.respondent.io/signup", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "usertesting", name: "UserTesting", rate: "$10–$60/hr", desc: "Test websites and apps for bigger payouts. Share your screen and voice.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/THI1IS5clNzV8HIJ96gn.png", link: "https://www.usertesting.com/get-paid-to-test", category: "surveys", energy: "med", tags: ["highpay"], browser: false },
  { id: "playtestcloud", name: "PlaytestCloud", rate: "$10–$50/hr", desc: "Paid playtests and prototype feedback for games and apps.", logo: "https://via.placeholder.com/150?text=PlaytestCloud", link: "https://playtestcloud.com/", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "trymata", name: "Trymata", rate: "$10–$60/hr", desc: "Unmoderated and moderated playtesting for apps and prototypes.", logo: "https://via.placeholder.com/150?text=Trymata", link: "https://trymata.com/", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "testbirds", name: "Testbirds", rate: "$10–$50/test", desc: "Find bugs and test websites/apps for $10–$50 per test; $1 per approved bug.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/xxx.png", link: "https://nest.testbirds.com/home", category: "testing", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "mturk", name: "Amazon MTurk", rate: "$2–$6/hr avg", desc: "Amazon's massive microtask marketplace with endless small jobs; median earnings ~$2/hr, experienced workers $6–15/hr.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/xxx.png", link: "https://www.mturk.com/worker", category: "microtasks", energy: "low", tags: ["quick","beginner"], browser: false },
  { id: "lionbridge", name: "Lionbridge", rate: "$3–$20/hr", desc: "Language, search evaluation and AI data tasks from a major vendor.", logo: "https://via.placeholder.com/150?text=Lionbridge", link: "https://lionbridge.ai/", category: "ai", energy: "med", tags: ["beginner"], browser: false },
  { id: "justanswer", name: "JustAnswer", rate: "$10–$50/hr", desc: "Answer questions as an expert for paid consultations and advice.", logo: "https://via.placeholder.com/150?text=JustAnswer", link: "https://www.justanswer.com/experts", category: "expert", energy: "high", tags: ["highpay"], browser: false },
  { id: "pineconeresearch", name: "Pinecone Research", rate: "$3–$12/hr", desc: "High payouts for surveys and product tests. Invite-only but worth it.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bibC3v0lT4ryuYu9LMCr.png", link: "https://members.pineconeresearch.com/#/", category: "surveys", energy: "low", tags: ["beginner", "highpay"], browser: false },
  { id: "surveyjunkie", name: "Survey Junkie", rate: "$1–$5/hr", desc: "Trusted, steady survey earnings. One of the most popular platforms.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4sv9XSwPHs8dV9zETDsd.jpg", link: "https://www.surveyjunkie.com/", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "toluna", name: "Toluna", rate: "$3–$5/hr", desc: "Community-based surveys with polls, games, and discussions.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/El5li3CDmxyW2lFaPwyz.png", link: "https://www.toluna.com/home", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "lifepoints", name: "LifePoints", rate: "$1.50–$3/hr", desc: "Steady earnings from surveys. Mobile-friendly with 5M+ members.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/cAodh8wHqXuLW7PoRjgR.png", link: "https://www.lifepointspanel.com/", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "paidviewpoint", name: "Paid Viewpoint", rate: "$1–$3/hr", desc: "Short surveys, pays even if you don't finish. PayPal or Venmo.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/X4p6CA7iYfoM0LyEDUxQ.png", link: "https://paidviewpoint.com/", category: "surveys", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "outlier", name: "Outlier", rate: "$15–$35/hr", desc: "Improve AI by rating responses, comparing outputs, and evaluating models.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/261LHUjlubG5IjYr0LZv.png", link: "https://outlier.ai", category: "ai", energy: "med", tags: ["highpay"], browser: false },
  { id: "appen", name: "Appen", rate: "$3–$14/hr", desc: "Specializes in AI training data with data labeling gigs.", logo: "https://cdn-images.himalayas.app/vmlva5ltollcahuby442urxngpau", link: "https://jobs.lever.co/appen", category: "ai", energy: "med", tags: ["beginner"], browser: false },
  { id: "clickworker", name: "Clickworker", rate: "$5–$12/hr", desc: "Freelance platform offering tasks like text creation & annotation.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/C1vyAjM6bkaR4bcNeCeA.png", link: "https://www.clickworker.com/clickworker/", category: "ai", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "neevo", name: "Neevo", rate: "$5–$12/hr", desc: "Help improve AI by completing simple tasks involving text, audio, images.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zbigllQ1z7hix1BDq2XT.png", link: "https://www.neevo.ai/", category: "ai", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "bestmark", name: "BestMark", rate: "$10–$25/assignment", desc: "One of the biggest platforms for mystery shoppers with wide variety.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/M19p9QumhG9pef4jnC4G.jpg", link: "https://www.bestmark.com/become-a-mystery-shopper/", category: "mystery", energy: "med", tags: ["beginner"], browser: false },
  { id: "isecretshop", name: "iSecretShop", rate: "$5–$20/assignment", desc: "Flexible mystery shopping with mobile-friendly assignments.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/MUcOeiXW3P0e1CGmmUos.jpg", link: "https://www.isecretshop.com/register", category: "mystery", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "marketforce", name: "Market Force", rate: "$5–$15/assignment", desc: "Earn by visiting locations and filling out surveys. Free food perks!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SxHLTnmhZ2kYE3ShRn4Y.png", link: "https://shopper.marketforce.com/#/login/newShopper/Apply", category: "mystery", energy: "med", tags: ["beginner"], browser: false },
  { id: "gigspot", name: "Gigspot", rate: "$5–$20/assignment", desc: "Hub for mystery shopping and evaluation gigs from multiple providers.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/PkdyJvLxQhLJzuLbbnAu.jpg", link: "https://www.gigspot.com/", category: "mystery", energy: "med", tags: ["beginner"], browser: false },
  { id: "prestoshopper", name: "Presto Shopper", rate: "$5–$15/assignment", desc: "Fast, map-based mystery shopping. Get paid same day!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DvyAgPosZi8eWjHhb77J.jpg", link: "https://insta.prestomobilesurveys.com/site", category: "mystery", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "rev", name: "Rev", rate: "$10–$20/hr", desc: "Transcription, captions, and subtitles. Clients include Google & Amazon.", logo: "https://logosandtypes.com/wp-content/uploads/2022/04/Rev.png", link: "https://www.rev.com/freelancers", category: "transcription", energy: "high", tags: ["highpay"], browser: false },
  { id: "transcribeme", name: "TranscribeMe", rate: "$15–$22/hr", desc: "Short audio clips (2-4 min) and flexible transcription tasks.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/6CTYiprr2sytaztxIqjN.jpg", link: "https://www.transcribeme.com/legal-transcriptionists-jobs/", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "gotranscript", name: "GoTranscript", rate: "$10–$20/hr", desc: "Transcribe audio & video in 40+ languages. Weekly PayPal payouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/2dkvf9pM4iw2a2GqOY2A.png", link: "https://gotranscript.com/transcription-jobs#apply-now", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "scribie", name: "Scribie", rate: "$5–$15/hr", desc: "Transcription jobs for beginners. (Temporarily on hold)", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/LPDr1SXNANI6HXdPTP3K.jpg", link: "https://scribie.com/transcription/freelance", category: "transcription", energy: "high", tags: ["beginner"], browser: false },
  { id: "tigerfish", name: "Tigerfish", rate: "$5–$15/hr", desc: "High editorial standards. Interviews, focus groups, legal depositions.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/0a6l1YHXaIwBGINRrlEb.jpg", link: "https://tigerfish.com/transcription-jobs/", category: "transcription", energy: "high", tags: ["beginner"], browser: false },
  { id: "castingwords", name: "CastingWords", rate: "$8–$12/hr", desc: "Flexible transcription with project choices. Weekly PayPal payouts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Vw2FEfsJFflaRP1c5VAk.png", link: "https://workshop.castingwords.com/", category: "transcription", energy: "high", tags: ["beginner", "quick"], browser: false },
  { id: "speechpad", name: "SpeechPad", rate: "$10–$25/hr", desc: "General, legal, and medical transcription. Twice-weekly pay!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SzYR5rgBweNs9sJ4811F.jpg", link: "https://www.speechpad.com/worker", category: "transcription", energy: "high", tags: ["highpay", "quick"], browser: false },
  { id: "quicktate", name: "Quicktate", rate: "$5–$10/hr", desc: "Short voicemails, medical and legal recordings. Quick tasks.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/uadmcUQtwAJA4ZC3LRHv.png", link: "https://typists.quicktate.com/transcribers/signup", category: "transcription", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "voices", name: "Voices", rate: "$200–$5,000+/project", desc: "Professional voice work for commercials, audiobooks, video games.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/wcEU9y1lRWTp9LrNAyMq.png", link: "https://www.voices.com/talent", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "voice123", name: "Voice123", rate: "$100–$2,000+/project", desc: "Global voice marketplace. Set your own rates, no platform fees.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jpwPeaMTIVCxow6FaQJY.png", link: "https://voice123.com/#how-to-search", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "acx", name: "ACX (Amazon)", rate: "$200–$800+/hr", desc: "Audiobook narration for Audible. Royalty share options available!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/3cyNkaHvJa798oxeZ7n0.jpg", link: "https://www.acx.com/mp/how-it-works/narrators-and-studios", category: "voice", energy: "high", tags: ["highpay"], browser: false },
  { id: "clearvoice", name: "ClearVoice", rate: "$100–$400+/article", desc: "Connect with brands for content. Clients come to you—no bidding.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kRJCNp4S56RIYwZjvhWN.png", link: "https://clearvoice.com/signup", category: "writing", energy: "high", tags: ["highpay"], browser: false },
  { id: "scripted", name: "Scripted", rate: "$15–$50+/hr", desc: "Curated job board—pick gigs you want. No bidding wars.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/oHFDNcszl0MjisQF0KgJ.png", link: "https://www.scripted.com/become-a-scripted-writer", category: "writing", energy: "high", tags: ["highpay"], browser: false },
  { id: "writeraccess", name: "WriterAccess", rate: "$0.10–$1+/word", desc: "Star rating system—level up for better pay. 20K+ writers.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jrkeq8izQRqzi3czUPvx.png", link: "https://www.writeraccess.com/talent-overview/", category: "writing", energy: "high", tags: ["beginner"], browser: false },
  { id: "wyzant", name: "Wyzant", rate: "$30–$100+/hr", desc: "Academic subjects & test prep. Premium rates, U.S. based.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/4CdttfiOOk3ESSjWBGO7.jpg", link: "https://www.wyzant.com/tutorsignupstart", category: "teaching", energy: "high", tags: ["highpay"], browser: false },
  { id: "preply", name: "Preply", rate: "$10–$40/hr", desc: "120+ subjects, global reach. Build ongoing student relationships.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/v0v44KBbRCrOhwJeveYj.png", link: "https://preply.com/en/teach", category: "teaching", energy: "high", tags: ["beginner"], browser: false },
  { id: "italki", name: "iTalki", rate: "$5–$80/hr", desc: "Language tutoring focus. Only 15% commission!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rZ25jNe1Ex4MYF20nh15.png", link: "https://teach.italki.com/application", category: "teaching", energy: "high", tags: ["beginner"], browser: false },
  { id: "cambly", name: "Cambly", rate: "$10–$12/hr", desc: "Casual English conversations. No lesson planning needed!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/qghhXnqBdMEruH5bEWuL.png", link: "https://www.cambly.com/en/tutors?lang=en", category: "teaching", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "belaysolutions", name: "Belay Solutions", rate: "$15–$25/hr", desc: "US-based VAs, vetted professionals. Long-term remote careers.", logo: "https://media.licdn.com/dms/image/v2/D4E10AQHq0VJgaQKacA/image-shrink_800/image-shrink_800/0/1729178105794?e=2147483647&v=beta&t=9ly-pcP9eBsjgqN-2HEIdRa6hp99y98oJxR1z_ZfGnc", link: "https://belaysolutions.com/work-with-us/?=undefined", category: "va", energy: "high", tags: ["highpay"], browser: false },
  { id: "timeetc", name: "Time Etc", rate: "$15–$30/hr", desc: "Established client relationships. US/UK only, part-time friendly.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/l5f859tQVXgDlX2aIqTN.png", link: "https://www.timeetc.com/work-for-us", category: "va", energy: "high", tags: ["highpay"], browser: false },
  { id: "fancyhands", name: "Fancy Hands", rate: "$10–$15/hr", desc: "Quick, on-demand microtasks. Great for ADHD quick wins!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/asHamvyp91UGgroT69Si.jpg", link: "https://www.fancyhands.com/jobs", category: "va", energy: "med", tags: ["quick", "beginner"], browser: false },
  { id: "toptal", name: "Toptal", rate: "$60–$150+/hr", desc: "Elite 3% acceptance. Premium clients, long-term contracts.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/z6xQQ7MZhH05Jephsdwo.png", link: "https://toptal.com/", category: "freelance", energy: "high", tags: ["highpay"], browser: false },
  { id: "fiverr", name: "Fiverr", rate: "$5–$500+/project", desc: "Gig-based marketplace. Clients come to you—no bidding!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Tji9gPHOWc8JX0Fr7lI6.png", link: "https://fiverr.com/", category: "freelance", energy: "high", tags: ["beginner"], browser: false },
  { id: "freelancer", name: "Freelancer", rate: "$10–$80+/hr", desc: "Competitive bidding platform. Huge variety of projects.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/zp6u2DdwP3cg0mFJxlSy.png", link: "https://freelancer.com/", category: "freelance", energy: "high", tags: ["beginner"], browser: false },
  { id: "youtube", name: "YouTube", rate: "$100–$50,000+/video", desc: "Video content. Ads, sponsorships, passive income potential.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/hIE0fwA9FyxSmGRkM0DU.png", link: "https://www.youtube.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "tiktok", name: "TikTok", rate: "$50–$20,000+/post", desc: "Short-form video. Fast growth, viral potential.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/aUgg51uy2GH9tSe5bMN9.png", link: "https://www.tiktok.com/", category: "social", energy: "high", tags: ["beginner", "highpay"], browser: false },
  { id: "instagram", name: "Instagram", rate: "$200–$10,000+/post", desc: "Visual platform. Sponsored posts, affiliate links, ads.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/SHQ0QHgRlMhnXMFMaEhC.jpg", link: "https://www.instagram.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "twitch", name: "Twitch", rate: "$50–$5,000+/stream", desc: "Live streaming. Subs, donations, sponsorships.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/aIgY0lJtG2Y2UqbbaZ1h.png", link: "https://www.twitch.tv/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "patreon", name: "Patreon", rate: "$5–$5,000+/month", desc: "Fan memberships. Recurring income from supporters.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ytr18NnJQrCOhaCW2MYY.png", link: "https://www.patreon.com/", category: "social", energy: "high", tags: ["beginner"], browser: false },
  { id: "kofi", name: "Ko-fi", rate: "$1–$1,000+/tip", desc: "Digital tip jar. 0% fees on tips! Sell products too.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/rV3EmPqdyk7oLMwji0FC.png", link: "https://ko-fi.com/", category: "social", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "facebook", name: "Facebook", rate: "$100–$10,000+/post", desc: "Marketplace, groups, sponsored content. Huge reach.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/joOXU3pGdlKULwwTQ7K7.png", link: "https://www.facebook.com/", category: "social", energy: "med", tags: ["beginner"], browser: false },
  { id: "x", name: "X (Twitter)", rate: "$50–$5,000+/tweet", desc: "Microblogging. Sponsored tweets, ad revenue sharing.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/bvwxaR2mEAAX605zQhsx.png", link: "https://www.x.com/", category: "social", energy: "med", tags: ["beginner"], browser: false },
  { id: "linkedin", name: "LinkedIn", rate: "$500–$20,000+/gig", desc: "Professional networking. Speaking gigs, courses, clients.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/DiQhmMBQMIupg107v1KD.png", link: "https://www.linkedin.com/", category: "social", energy: "high", tags: ["highpay"], browser: false },
  { id: "etsy", name: "🥰 Etsy", rate: "Self-set", desc: "Global marketplace for handmade, vintage, and creative goods.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/pvvTqqHXOWCv5aaHVeWe.jpg", link: "https://etsy.com/", category: "handmade", energy: "high", tags: ["beginner"], fave: true, browser: false },
  { id: "amazonhandmade", name: "Amazon Handmade", rate: "Self-set", desc: "Sell artisan products on Amazon's massive customer base.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/vXq9tx9PrQnlM3UYpxcQ.png", link: "https://amzn.to/4iuPkoW", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "printify", name: "Printify", rate: "Self-set", desc: "Print-on-demand. Design products, no inventory needed!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/EqIVRaEWxVI0Zx1EETTB.png", link: "https://printify.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "shopify", name: "Shopify", rate: "Self-set", desc: "Build your own online store. Full control, no marketplace fees.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/btCVM7WHtPjyDkOzTYM9.png", link: "https://www.shopify.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "bigcartel", name: "Big Cartel", rate: "Self-set", desc: "Simple store for artists. Free plan with 5 products!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/ewYZW2h7UsgFBwovET4X.png", link: "https://www.bigcartel.com/", category: "handmade", energy: "high", tags: ["beginner", "quick"], browser: false },
  { id: "folksy", name: "Folksy", rate: "Self-set", desc: "UK handmade marketplace. Charming village market vibes.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/kkiMUUFxv2vhogMosyDK.png", link: "https://folksy.com/", category: "handmade", energy: "high", tags: ["beginner"], browser: false },
  { id: "carecom", name: "Care.com", rate: "$20–$35/hr", desc: "Babysitting, elder care, special needs. Flexible compassionate work.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/5I3e2N4NAjdUE4PJqfKY.dat", link: "https://www.care.com", category: "care", energy: "high", tags: ["highpay"], browser: false },
  { id: "rover", name: "Rover", rate: "$20–$40/hr", desc: "Dog walking, pet sitting, boarding. \"Airbnb for pets\"!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/n8yzcHBxOVGYzZeYTAPc.png", link: "https://rover.com", category: "care", energy: "med", tags: ["beginner", "highpay"], browser: false },
  { id: "wag", name: "Wag", rate: "$13–$25/hr", desc: "Quick dog walks, drop-ins. On-demand gigs, fast bookings.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Cw1AUklnSjvwc5cFkDgL.png", link: "https://wagwalking.com", category: "care", energy: "med", tags: ["beginner", "quick"], browser: false },
  { id: "taskrabbit", name: "TaskRabbit", rate: "$17.50–$50+/hr", desc: "Cleaning, handyman, moving, IKEA assembly, errands.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/Y0lwF8oCSOa0ygsFLxiQ.jpg", link: "https://taskrabbit.com", category: "care", energy: "high", tags: ["highpay"], browser: false },
  { id: "papa", name: "Papa", rate: "$13–$20/hr", desc: "Senior companionship, errands, friendly conversation.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/OdxfBWuzWg2E3ANzr6ua.jpg", link: "https://papa.com", category: "care", energy: "med", tags: ["beginner"], browser: false },
  { id: "trustedhousesitters", name: "Trusted Housesitters", rate: "Free lodging", desc: "Pet & house sit worldwide. Travel exchange, membership required.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/jIeyGBhuLLHKbK542yIO.png", link: "https://trustedhousesitters.com", category: "care", energy: "med", tags: ["beginner"], browser: false },
  { id: "neighbor", name: "Neighbor", rate: "$50–$600/month", desc: "Rent out storage space, garages, driveways. Passive income!", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/N6RhLYI5sYTjDX1HUQYO.png", link: "https://neighbor.com", category: "care", energy: "low", tags: ["beginner", "quick"], browser: false },
  { id: "chewy", name: "Chewy (Remote Jobs)", rate: "$16–$19.50/hr", desc: "Remote customer service. ADHD-friendly, pet-positive culture.", logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/bIquIPZf7ZEXDA4vlm8R/pub/QNRVyClen6pxcHI6ygv0.png", link: "https://careers.chewy.com/us/en/c/customer-service-jobs", category: "care", energy: "med", tags: ["beginner"], browser: false },
];

const categories: Record<string, { icon: string; name: string }> = {
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
};

const catOrder = ['fun','surveys','ai','testing','microtasks','mystery','transcription','voice','writing','teaching','va','freelance','expert','social','handmade','care'];

const proTips = [
  { strong: "🧠 ADHD tip:", text: "Pick ONE option that fits your energy. Sign up while you're motivated. Future you says thanks." },
  { strong: "💡 Decision Fatigue Fix:", text: "Use the energy filter above. Low? Stick to surveys. Hyperfocus mode? Try Etsy or freelancing!" },
  { strong: "❤️ Dopamine Hack:", text: "Save your favorites (tap the heart) so you can come back without decision paralysis." },
  { strong: "📈 Stacking Strategy:", text: "Sign up for 2-3 survey sites now. More options = more available tasks when you need them." },
  { strong: "⚡ Quick Win:", text: "Prolific + Survey Junkie + PaidViewpoint = solid survey stack you can set up in 15 minutes." },
];

const energyMeta: Record<string, { label: string; desc: string }> = {
  low:   { label: '😴 Low energy',   desc: '5–10 minute tasks' },
  ok:    { label: '🙂 Medium',       desc: 'Short focused work' },
  hyper: { label: '⚡ Focus mode',   desc: 'Higher paying tasks' },
};

const startHereIds = ['prolific', 'surveyjunkie', 'paidviewpoint', 'neighbor'];

function getEnergyLabel(energy: string): string {
  if (energy === 'low') return '5–10 min tasks';
  if (energy === 'med') return '15–30 min sessions';
  return '30+ min focused';
}

export default function Earn() {
  const [activeEnergy, setActiveEnergy] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('925adhd_favorites') || '[]'); } catch { return []; }
  });
  const [tipIndex, setTipIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const INITIAL_SHOW = 6;

  // Momentum engine state
  const [recommendation, setRecommendation] = useState<Gig | null>(null);
  const [recentPicks, setRecentPicks] = useState<string[]>([]);
  const [recHighlight, setRecHighlight] = useState(false);
  const [finding, setFinding] = useState(false);
  const recCardRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if ((location.state as { scrollTo?: string })?.scrollTo === 'resultsText') {
      document.getElementById('resultsText')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const pickRecommendation = () => {
    setFinding(true);
    const energy = activeEnergy || 'low';
    const energyMap: Record<string, string> = { low: 'low', ok: 'med', hyper: 'high' };
    const targetEnergy = energyMap[energy] || energy;

    // Score each gig based on energy-appropriate criteria
    const scored = gigs
      .filter(g => !recentPicks.includes(g.id))
      .map(g => {
        let score = 0;
        if (g.energy === targetEnergy) score += 10;
        if (g.tags.includes('beginner')) score += 5;
        if (g.tags.includes('quick')) score += (energy === 'low' ? 6 : 3);
        if (g.tags.includes('highpay')) score += (energy === 'hyper' ? 6 : 2);
        if (g.fave) score += 4;
        // Slight randomness to keep it fresh
        score += Math.random() * 3;
        return { gig: g, score };
      })
      .sort((a, b) => b.score - a.score);

    const pick = scored[0]?.gig;
    if (pick) {
      setTimeout(() => {
        setRecommendation(pick);
        setRecentPicks(prev => {
          const next = [...prev, pick.id];
          return next.length > 20 ? [pick.id] : next;
        });
        setFinding(false);
        // Scroll to recommendation card and highlight
        setTimeout(() => {
          recCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setRecHighlight(true);
          setTimeout(() => setRecHighlight(false), 1500);
        }, 100);
      }, 400);
    } else {
      setFinding(false);
    }
  };

  const dismissRecommendation = () => setRecommendation(null);

  const startHereGigs = gigs.filter(g => startHereIds.includes(g.id));

  const toggleSection = (cat: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % proTips.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const filterGigs = () => {
    return gigs.filter(gig => {
      if (activeCategory && gig.category !== activeCategory) return false;
      if (activeTags.size > 0) {
        for (const t of activeTags) {
          if (!gig.tags || !gig.tags.includes(t)) return false;
        }
      }
      if (activeEnergy) {
        const energyMap: Record<string, string> = { low: 'low', ok: 'med', hyper: 'high' };
        if (gig.energy !== (energyMap[activeEnergy] || activeEnergy)) return false;
      }
      if (searchQuery) {
        const text = (gig.name + ' ' + gig.desc + ' ' + gig.category).toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }
      return true;
    });
  };

  const toggleFav = (gigId: string) => {
    const newFavs = favorites.includes(gigId)
      ? favorites.filter(f => f !== gigId)
      : [...favorites, gigId];
    setFavorites(newFavs);
    localStorage.setItem('925adhd_favorites', JSON.stringify(newFavs));
  };

  const toggleTag = (tag: string) => {
    const next = new Set(activeTags);
    if (next.has(tag)) next.delete(tag); else next.add(tag);
    setActiveTags(next);
  };

  const clearAll = () => {
    setActiveEnergy(null);
    setActiveCategory(null);
    setActiveTags(new Set());
    setSearchQuery('');
  };

  const filtered = filterGigs();
  const tip = proTips[tipIndex];

  const grouped: Record<string, Gig[]> = {};
  filtered.forEach(gig => {
    if (!grouped[gig.category]) grouped[gig.category] = [];
    grouped[gig.category].push(gig);
  });

  const hasFilters = !!(activeEnergy || activeCategory || activeTags.size > 0 || searchQuery);

  return (
    <div className="earn-page">
      <div className="earn-content">

        {/* Energy Selector */}
        <span className="updated-badge">Updated January 2026</span>
        <div className="energy-wrap" role="group" aria-label="What's your energy level?">
          <p className="energy-title">What's your energy right now?</p>
          <div className="energy-pills">
            {[
              { level: 'low' },
              { level: 'ok' },
              { level: 'hyper' },
            ].map(({ level }) => (
              <button
                key={level}
                className={`energy-pill${activeEnergy === level ? ' active' : ''}`}
                data-level={level}
                type="button"
                aria-pressed={activeEnergy === level}
                onClick={() => setActiveEnergy(activeEnergy === level ? null : level)}
              >
                <span className="energy-pill-label">{energyMeta[level].label}</span>
                <span className="energy-pill-desc">{energyMeta[level].desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Momentum Button */}
        <div className="momentum-wrap">
          <button className="momentum-btn" type="button" onClick={pickRecommendation}>
            <span className="momentum-icon">✨</span>
            <span className="momentum-label">Find me something I can actually do right now</span>
          </button>
        </div>

        {/* Finding indicator */}
        {finding && (
          <p className="finding-msg">✨ Finding a good option for your energy...</p>
        )}

        {/* Recommendation Card */}
        {recommendation && (
          <div className={`rec-card${recHighlight ? ' rec-highlight' : ''}`} ref={recCardRef}>
            <div className="rec-header">
              <span className="rec-label">🎯 Your next move</span>
              <button className="rec-dismiss" type="button" onClick={dismissRecommendation} aria-label="Dismiss">×</button>
            </div>
            <div className="rec-body">
              <img
                src={`images/${recommendation.id}.png`}
                className="rec-logo"
                alt={recommendation.name}
                onError={(e) => { (e.target as HTMLImageElement).src = recommendation.logo; }}
              />
              <div className="rec-info">
                <div className="rec-name">{recommendation.name}</div>
                <div className="rec-desc">{recommendation.desc}</div>
                <div className="rec-signals">
                  <span className="rec-signal">💰 {recommendation.rate}</span>
                  <span className="rec-signal">⚡ {getEnergyLabel(recommendation.energy)}</span>
                  {recommendation.tags.includes('beginner') && <span className="rec-signal">🌱 Beginner friendly</span>}
                </div>
              </div>
            </div>
            <div className="rec-actions">
              <Link to={`/gig-detail?gig=${recommendation.id}`} className="rec-start-btn">Start here →</Link>
              <button className="rec-another-btn" type="button" onClick={pickRecommendation}>Show me another</button>
            </div>
          </div>
        )}

        {/* ADHD Tip */}
        <div className="adhd-hint">
          <span><strong>{tip.strong}</strong> {tip.text}</span>
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search apps, tasks, or payouts…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value.toLowerCase().trim())}
          />
        </div>

        {/* Category Tabs */}
        {(() => {
          const primaryKeys = catOrder.slice(0, 4);
          const moreKeys = catOrder.slice(4);
          const isMoreActive = moreKeys.includes(activeCategory || '');
          return (
            <div className="category-filter-bar">
              <p className="category-label">Browse by Category</p>
              <div className="category-tabs" aria-label="Categories">
                <button
                  type="button"
                  className={`tab-btn${activeCategory === null ? ' active' : ''}`}
                  onClick={() => setActiveCategory(null)}
                >All</button>
                {primaryKeys.map(key => {
                  const cat = categories[key];
                  if (!cat) return null;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`tab-btn${activeCategory === key ? ' active' : ''}`}
                      onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className={`tab-btn more-toggle${showMoreFilters || isMoreActive ? ' active' : ''}`}
                  onClick={() => setShowMoreFilters(p => !p)}
                >
                  More Filters {showMoreFilters ? '▴' : '▾'}
                </button>
              </div>
              {showMoreFilters && (
                <div className="more-filters-panel">
                  {moreKeys.map(key => {
                    const cat = categories[key];
                    if (!cat) return null;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`tab-btn${activeCategory === key ? ' active' : ''}`}
                        onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* Start Here */}
        {!hasFilters && (
          <section className="start-here">
            <div className="section-head">
              <h2 className="section-title">⭐ Start Here</h2>
              <span className="section-count">The easiest ways to earn right now</span>
            </div>
            <div className="card-grid start-here-grid">
              {startHereGigs.map(gig => {
                const isFav = favorites.includes(gig.id);
                return (
                  <Link
                    key={gig.id}
                    to={`/gig-detail?gig=${gig.id}`}
                    className={`gig-card start-here-card${isFav ? ' favorite' : ''}`}
                  >
                    <span className="best-for-badge starter">⭐ Recommended for beginners</span>
                    <div className="gig-top">
                      <img
                        src={`images/${gig.id}.png`}
                        className="gig-logo"
                        alt={gig.name}
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = gig.logo; }}
                      />
                      <div className="gig-info">
                        <div className="gig-name">{gig.name}</div>
                        <div className="gig-rate">{gig.rate}</div>
                      </div>
                      <button
                        className={`fav-btn${isFav ? ' active' : ''}`}
                        onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleFav(gig.id); }}
                      >{isFav ? '❤️' : '🤍'}</button>
                    </div>
                    <div className="gig-desc">{gig.desc}</div>
                    <div className="gig-meta">
                      <span className="meta-item">💰 {gig.rate}</span>
                      <span className="meta-item">⚡ {getEnergyLabel(gig.energy)}</span>
                    </div>
                    <div className="gig-tags">
                      {gig.tags.includes('quick') && <span className="tag quick">⚡ Fast</span>}
                      {gig.tags.includes('highpay') && <span className="tag highpay">💰 Top Pay</span>}
                      {gig.tags.includes('beginner') && <span className="tag beginner">🌱 Easy</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Results Bar */}
        <div className="results-bar">
          <span id="resultsText">Showing {filtered.length} option{filtered.length !== 1 ? 's' : ''}</span>
          <div className="results-controls">
            <div className="filter">
              <button className="filter-label" type="button">
                <span className="filter-text">Tags{activeTags.size > 0 ? ` (${activeTags.size})` : ''}</span>
              </button>
              {hasFilters && (
                <button className="pill-x" type="button" aria-label="Clear filter" onClick={clearAll}>×</button>
              )}
              <div className="filter-menu" role="menu" aria-label="Tag filters">
                {[
                  { value: 'quick', label: '⚡ Fast', cls: 'quick' },
                  { value: 'highpay', label: '💰 Top Pay', cls: 'highpay' },
                  { value: 'beginner', label: '🌱 Easy', cls: 'beginner' },
                ].map(({ value, label, cls }) => (
                  <button
                    key={value}
                    className={`tag-chip ${cls}${activeTags.has(value) ? ' active' : ''}`}
                    type="button"
                    data-value={value}
                    onClick={() => toggleTag(value)}
                  >{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gig Sections */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <p>No opportunities match your filters</p>
            <button className="clear-filters" onClick={clearAll}>Clear all filters</button>
          </div>
        ) : (
          <div className="gig-sections">
            {catOrder.map(catKey => {
              const catGigs = grouped[catKey];
              if (!catGigs) return null;
              const cat = categories[catKey];
              const isExpanded = expandedSections.has(catKey);
              const hasMore = catGigs.length > INITIAL_SHOW;
              const displayGigs = hasMore && !isExpanded ? catGigs.slice(0, INITIAL_SHOW) : catGigs;

              return (
                <section key={catKey} className="earn-section">
                  <div className="section-head">
                    <h3 className="section-title">{cat.icon} {cat.name}</h3>
                    <span className="section-count">{catGigs.length} platform{catGigs.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="card-grid">
                    {displayGigs.map(gig => {
                      const isFav = favorites.includes(gig.id);
                      return (
                        <Link
                          key={gig.id}
                          to={`/gig-detail?gig=${gig.id}`}
                          className={`gig-card${isFav ? ' favorite' : ''}`}
                        >
                          {gig.fave && <span className="best-for-badge fave">🥰 Staff Pick</span>}
                          {!gig.fave && gig.tags.includes('beginner') && gig.tags.includes('quick') && <span className="best-for-badge starter">⭐ Best for beginners</span>}
                          {!gig.fave && gig.tags.includes('highpay') && !gig.tags.includes('beginner') && <span className="best-for-badge fire">🔥 Fastest payout</span>}
                          {!gig.fave && !gig.tags.includes('highpay') && gig.category === 'ai' && <span className="best-for-badge ai">🤖 AI tasks</span>}
                          {!gig.fave && !gig.tags.includes('highpay') && gig.category !== 'ai' && !gig.browser && gig.tags.includes('beginner') && !gig.tags.includes('quick') && <span className="best-for-badge mobile">📱 Mobile friendly</span>}
                          <div className="gig-top">
                            <img
                              src={`images/${gig.id}.png`}
                              className="gig-logo"
                              alt={gig.name}
                              loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).src = gig.logo; }}
                            />
                            <div className="gig-info">
                              <div className="gig-name">{gig.name}</div>
                              <div className="gig-rate">{gig.rate}</div>
                            </div>
                            <button
                              className={`fav-btn${isFav ? ' active' : ''}`}
                              onClick={ev => { ev.preventDefault(); ev.stopPropagation(); toggleFav(gig.id); }}
                            >{isFav ? '❤️' : '🤍'}</button>
                          </div>
                          <div className="gig-desc">{gig.desc}</div>
                          <div className="gig-meta">
                            <span className="meta-item">💰 {gig.rate}</span>
                            <span className="meta-item">⚡ {getEnergyLabel(gig.energy)}</span>
                          </div>
                          <div className="gig-tags">
                            {gig.tags.includes('quick') && <span className="tag quick">⚡ Fast</span>}
                            {gig.tags.includes('highpay') && <span className="tag highpay">💰 Top Pay</span>}
                            {gig.tags.includes('beginner') && <span className="tag beginner">🌱 Easy</span>}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {hasMore && (
                    <button className="view-all-btn" type="button" onClick={() => toggleSection(catKey)}>
                      {isExpanded ? 'Show Less' : `View All ${catGigs.length}`}
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
