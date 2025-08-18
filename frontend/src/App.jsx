import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/dashboard/dashboard.jsx'
import LoginPage from './pages/auth/login.jsx'
import SignupPage from './pages/auth/signup.jsx'
import ForgotPasswordPage from './pages/auth/forgot-password.jsx'
import ProfileSetupPage from './pages/auth/profile-setup.jsx'

// Profile Setup pages
import CompanyDetailsPage from './pages/profile/company-details/company-details.jsx'
import CsrHistoryPage from './pages/profile/csr-history/csr-history.jsx'
import SdgSelectorPage from './pages/profile/sdg-selector/sdg-selector.jsx'

// Discovery pages
import ProjectSearchPage from './pages/discovery/project-search/project-search.jsx'
import ProjectCardsPage from './pages/discovery/project-cards/project-cards.jsx'

// Alignment & Evaluation
import AiMatchingPage from './pages/alignment/ai-matching/ai-matching.jsx'
import ComparisonMatrixPage from './pages/alignment/comparison-matrix/comparison-matrix.jsx'
import RiskScoringPage from './pages/alignment/risk-scoring/risk-scoring.jsx'

// Decision Support
import RecommendationRationalePage from './pages/decision/rationale/rationale.jsx'
import ApprovalWorkflowPage from './pages/decision/approval/approval.jsx'

// Monitoring & Tracking
import ProjectTrackerPage from './pages/monitoring/tracker/tracker.jsx'
import ImpactDashboardPage from './pages/monitoring/impact/impact.jsx'
import MonitoringAlertsPage from './pages/monitoring/alerts/alerts.jsx'

// Reporting & Compliance
import ReportGeneratorPage from './pages/reporting/generator/generator.jsx'
import AuditTrailPage from './pages/reporting/audit-trail/audit-trail.jsx'

// Marketplace
import NgoDashboardPage from './pages/marketplace/ngo/ngo.jsx'
import MatchingEnginePage from './pages/marketplace/matching/matching.jsx'
import CollaborationToolsPage from './pages/marketplace/collaboration/collaboration.jsx'

// Settings & Admin
import UserManagementPage from './pages/settings/users/users.jsx'
import AgentControlsPage from './pages/settings/agents/agents.jsx'
import IntegrationSetupPage from './pages/settings/integrations/integrations.jsx'
import ApiManagementPage from './pages/settings/apis/apis.jsx'

// Help & Support
import AiChatAssistantPage from './pages/support/chat/chat.jsx'
import FaqPage from './pages/support/faq/faq.jsx'
import FeedbackPage from './pages/support/feedback/feedback.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Corporate Profile Setup */}
      <Route path="/profile/company-details" element={<CompanyDetailsPage />} />
      <Route path="/profile/csr-history" element={<CsrHistoryPage />} />
      <Route path="/profile/sdg-selector" element={<SdgSelectorPage />} />

      {/* Project Discovery */}
      <Route path="/discovery/search" element={<ProjectSearchPage />} />
      <Route path="/discovery/cards" element={<ProjectCardsPage />} />

      {/* Alignment & Evaluation */}
      <Route path="/alignment/matching" element={<AiMatchingPage />} />
      <Route path="/alignment/comparison" element={<ComparisonMatrixPage />} />
      <Route path="/alignment/risk" element={<RiskScoringPage />} />

      {/* Decision Support */}
      <Route path="/decision/rationale" element={<RecommendationRationalePage />} />
      <Route path="/decision/approval" element={<ApprovalWorkflowPage />} />

      {/* Monitoring & Tracking */}
      <Route path="/monitoring/tracker" element={<ProjectTrackerPage />} />
      <Route path="/monitoring/impact" element={<ImpactDashboardPage />} />
      <Route path="/monitoring/alerts" element={<MonitoringAlertsPage />} />

      {/* Reporting & Compliance */}
      <Route path="/reporting/generator" element={<ReportGeneratorPage />} />
      <Route path="/reporting/audit-trail" element={<AuditTrailPage />} />

      {/* Marketplace */}
      <Route path="/marketplace/ngo" element={<NgoDashboardPage />} />
      <Route path="/marketplace/matching" element={<MatchingEnginePage />} />
      <Route path="/marketplace/collaboration" element={<CollaborationToolsPage />} />

      {/* Settings & Admin */}
      <Route path="/settings/users" element={<UserManagementPage />} />
      <Route path="/settings/agents" element={<AgentControlsPage />} />
      <Route path="/settings/integrations" element={<IntegrationSetupPage />} />
      <Route path="/settings/apis" element={<ApiManagementPage />} />

      {/* Help & Support */}
      <Route path="/support/chat" element={<AiChatAssistantPage />} />
      <Route path="/support/faq" element={<FaqPage />} />
      <Route path="/support/feedback" element={<FeedbackPage />} />
    </Routes>
  )
}
