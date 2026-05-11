import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Guides from './pages/Guides'
import Earn from './pages/Earn'
import Tools from './pages/Tools'
import GigDetail from './pages/GigDetail'
import GigTracker from './pages/GigTracker'
import AiPlayground from './pages/AiPlayground'
import Feedback from './pages/Feedback'
import Saved from './pages/Saved'
import Start from './pages/Start'

// Guide pages
import AdhdHacks from './pages/AdhdHacks'
import CryptoMadeSimple from './pages/CryptoMadeSimple'
import DataAnnotationGuide from './pages/DataAnnotationGuide'
import MysteryShoppingGuide from './pages/MysteryShoppingGuide'
import SocialMediaGuide from './pages/SocialMediaGuide'
import SurveysGuide from './pages/SurveysGuide'
import TranscriptionGuide from './pages/TranscriptionGuide'

// Tool/calculator pages
import DailyFlow from './pages/DailyFlow'
import FreelanceCalc from './pages/FreelanceCalc'
import SleepCalc from './pages/SleepCalc'
import ReceiptStacker from './pages/ReceiptStacker'
import Breathwork from './pages/Breathwork'
import Mindshift from './pages/Mindshift'
import Playlist from './pages/Playlist'

// List pages
import BeginnerList from './pages/BeginnerList'
import Essentials from './pages/Essentials'
import PassionFinder from './pages/PassionFinder'

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* Public login page — no layout */}
      <Route path="/" element={<Index />} />

      {/* All other pages share the Layout (header + nav) */}
      <Route element={<Layout />}>
        {/* Protected routes */}
        <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tools"         element={<ProtectedRoute><Tools /></ProtectedRoute>} />
        <Route path="/ai-playground" element={<ProtectedRoute><AiPlayground /></ProtectedRoute>} />

        {/* Public routes */}
        <Route path="/guides"        element={<Guides />} />
        <Route path="/earn"          element={<Earn />} />
        <Route path="/apps"          element={<Navigate to="/earn" replace />} />
        <Route path="/app-detail"    element={<Navigate to="/earn" replace />} />
        <Route path="/favorites"     element={<Navigate to="/saved" replace />} />
        <Route path="/saved"         element={<Saved />} />
        <Route path="/gig-detail"    element={<GigDetail />} />
        <Route path="/gig-tracker"   element={<GigTracker />} />
        <Route path="/feedback"      element={<Feedback />} />
        <Route path="/start"         element={<Start />} />

        {/* Guide pages */}
        <Route path="/adhd-hacks"          element={<AdhdHacks />} />
        <Route path="/crypto-made-simple"  element={<CryptoMadeSimple />} />
        <Route path="/data-annotation"     element={<DataAnnotationGuide />} />
        <Route path="/mystery-shopping"    element={<MysteryShoppingGuide />} />
        <Route path="/social-media-guide"  element={<SocialMediaGuide />} />
        <Route path="/surveys-guide"       element={<SurveysGuide />} />
        <Route path="/transcription-guide" element={<TranscriptionGuide />} />

        {/* Tool/calculator pages */}
        <Route path="/daily-flow"       element={<DailyFlow />} />
        <Route path="/hourly-optimizer" element={<Navigate to="/daily-flow" replace />} />
        <Route path="/energy-match"     element={<Navigate to="/daily-flow" replace />} />
        <Route path="/daily-schedule"   element={<Navigate to="/daily-flow" replace />} />
        <Route path="/freelance-calc"   element={<FreelanceCalc />} />
        <Route path="/sleep-calc"       element={<SleepCalc />} />
        <Route path="/receipt-stacker"  element={<ReceiptStacker />} />
        <Route path="/breathwork"       element={<Breathwork />} />
        <Route path="/mindshift"        element={<Mindshift />} />
        <Route path="/playlist"         element={<Playlist />} />

        {/* List pages */}
        <Route path="/beginner-list" element={<BeginnerList />} />
        <Route path="/essentials"    element={<Essentials />} />
        <Route path="/passion-finder" element={<PassionFinder />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
    </>
  )
}
