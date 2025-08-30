# 🌿 SustainAlign Frontend (React 19 + Vite + Tailwind)

Beautiful, fast, and data-rich CSR/ESG management UI – built for hackathons and production-ready refinement with comprehensive AI agent workflows and modern UX patterns.

> Eco-green + corporate blue theme, smooth charts, modular widgets, polished auth flows, and AI-powered decision support.

---

## ✨ Highlights
- ⚡️ **React 19** + Vite-powered dev experience (HMR)
- 🎨 **Tailwind v4** with subtle animations, gradients, and modern UI components
- 📈 **Highcharts** dashboards and interactive widgets
- 🧭 **React Router v6** app shell with global TopNav and role-based navigation
- 🔐 **JWT Authentication** ready (login, signup, forgot password, profile setup)
- 🤖 **AI Agent Integration** - 6 specialized agents for CSR/ESG lifecycle
- 📱 **Responsive Design** - Mobile-first approach with beautiful layouts
- 🎯 **Component Library** - Reusable, accessible components with consistent styling

---

## 📦 Tech Stack
- **React 19** + Vite 7
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Highcharts** (+ `highcharts-react-official`)
- **React Router v6** with nested routing
- **Custom Hooks** for state management and API integration
- **Modern JavaScript** (ES6+ features, async/await)

---

## 🚀 Quick Start
Requirements: Node 18+

```bash
# from sustainalign/frontend
npm install
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000` (CORS enabled)
- **Sample Data**: Pre-loaded with realistic CSR/ESG scenarios

---

## 🧱 App Structure (Comprehensive)

### **Core Architecture**
```
src/
├── components/              # Global reusable components
│   ├── TopNav.jsx          # Role-aware navigation (Corporate/NGO/Admin)
│   ├── AnimatedBackground.jsx # Ambient gradient backgrounds
│   └── Icon.jsx            # SVG icon system
├── layouts/
│   └── AppLayout.jsx       # App shell (TopNav + content + sidebar)
├── lib/                    # Utility libraries and API helpers
│   ├── api.js              # apiPost/apiGet helpers with error handling
│   ├── auth.js             # JWT utilities and authentication helpers
│   ├── projectApi.js       # Project-specific API functions
│   └── ui.js               # UI utility functions and constants
├── pages/                  # Feature-based page organization
│   ├── auth/               # Authentication flows
│   ├── dashboard/          # Admin dashboard with widgets
│   ├── discovery/          # Project discovery and search
│   ├── alignment/          # AI matching and evaluation
│   ├── decision/           # Approval workflows and rationale
│   ├── monitoring/         # Impact tracking and alerts
│   ├── reporting/          # Report generation and audit trails
│   ├── marketplace/        # NGO profiles and collaboration
│   ├── profile/            # Company setup and management
│   ├── settings/           # User and system configuration
│   └── support/            # Help, FAQ, and feedback
└── main.jsx                # App bootstrap + Router configuration
```

### **Page Organization by Feature**

#### **🔐 Authentication (`/auth/*`)**
- **Login/Signup** - Beautiful animated forms with validation
- **Profile Setup** - Multi-step company onboarding wizard
- **Forgot Password** - Password recovery flow
- **Role-based Access** - Corporate, NGO, Admin, Regulator

#### **🏠 Dashboard (`/dashboard`)**
- **Admin Dashboard** - Comprehensive CSR/ESG overview
- **Widgets**: KPIs, charts, active projects, compliance alerts
- **AI Insights** - Recommendations and impact forecasts
- **Quick Actions** - Common tasks and shortcuts

#### **🔍 Discovery (`/discovery/*`)**
- **Project Search** - Advanced filtering and search
- **Project Cards** - Rich project information display
- **Project Add** - Public project submission form
- **SDG Selector** - Sustainable Development Goals interface

#### **🎯 Alignment (`/alignment/*`)**
- **AI Matching** - Company-project alignment engine
- **Comparison Matrix** - Project comparison and evaluation
- **Risk Scoring** - NGO credibility and risk assessment
- **AI Recommendations** - Intelligent project suggestions

#### **🧑‍⚖️ Decision (`/decision/*`)**
- **Approval Workflow** - Project approval with AI insights
- **Rationale** - Decision explanation and analysis
- **Workflow Timeline** - Multi-step approval process
- **Approved Projects List** - Project selection interface

#### **📊 Monitoring (`/monitoring/*`)**
- **Impact Dashboard** - Real-time impact metrics
- **Project Tracker** - Timeline and milestone tracking
- **Alerts** - Risk notifications and compliance warnings
- **Regional Maps** - Geographic impact visualization

#### **📑 Reporting (`/reporting/*`)**
- **Report Generator** - Automated compliance reports
- **Audit Trail** - Complete decision and action history
- **Compliance Tracking** - Regulatory requirement monitoring
- **Export Options** - PDF, Excel, PowerPoint formats

#### **🤝 Marketplace (`/marketplace/*`)**
- **NGO Profiles** - Comprehensive NGO information
- **Bidding/Matching** - Project funding and collaboration
- **Collaboration** - Partnership opportunities
- **NGO Onboarding** - Registration and verification

#### **⚙️ Settings (`/settings/*`)**
- **User Management** - Role and permission configuration
- **AI Agents** - Agent configuration and optimization
- **API Integration** - External system connections
- **System Configuration** - Platform settings

#### **💬 Support (`/support/*`)**
- **AI Chat Assistant** - Intelligent help and guidance
- **FAQ** - Common questions and answers
- **Feedback** - User suggestions and improvements
- **Documentation** - User guides and tutorials

---

## 🎨 UI/UX Design System

### **Color Palette**
- **Primary**: Eco-green (#10b981) - Sustainability focus
- **Secondary**: Corporate blue (#3b82f6) - Trust and professionalism
- **Accent**: Amber (#f59e0b) - Energy and innovation
- **Neutral**: Gray scale for text and backgrounds

### **Component Patterns**
- **Cards**: Soft shadows, rounded corners, subtle borders
- **Gradients**: Ambient backgrounds with smooth transitions
- **Animations**: Subtle hover effects and micro-interactions
- **Typography**: Clear hierarchy with proper contrast
- **Spacing**: Consistent 4px grid system

### **Responsive Design**
- **Mobile-first** approach with progressive enhancement
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** that adapt to different screen sizes
- **Touch-friendly** interactions for mobile devices

---

## 🔑 Authentication & Authorization

### **JWT Implementation**
- **Token Storage**: `localStorage` with automatic refresh
- **Role-based Access**: Corporate, NGO, Admin, Regulator
- **Protected Routes**: Automatic redirection for unauthorized access
- **Session Management**: Persistent login with secure token handling

### **User Roles & Permissions**
- **Corporate Users**: Company profiles, project discovery, approval workflows
- **NGO Representatives**: Project submission, impact reporting, profile management
- **Administrators**: Full platform access, user management, system configuration
- **Regulators**: Compliance monitoring, audit access, reporting oversight

---

## 📊 Dashboard & Analytics

### **Admin Dashboard Components**
- **Header Section**: Welcome message, current date, KPI overview
- **Financial Overview**: Budget allocation vs utilization charts
- **ESG & SDG Section**: Sustainability metrics and goal tracking
- **Active Projects**: Real-time project status and impact KPIs
- **Compliance Alerts**: Risk indicators and compliance warnings
- **AI Insights**: Intelligent recommendations and forecasts
- **Quick Actions**: Common tasks and workflow shortcuts

### **Chart Integration**
- **Highcharts**: Professional-grade data visualization
- **Interactive Elements**: Zoom, pan, tooltips, and drill-down
- **Real-time Updates**: Live data feeds and automatic refresh
- **Export Options**: PNG, JPEG, PDF, SVG formats

---

## 🔌 API Integration

### **API Client Architecture**
- **Centralized API**: `lib/api.js` with error handling and retry logic
- **Authentication**: Automatic JWT token inclusion in requests
- **Error Handling**: User-friendly error messages and fallbacks
- **Loading States**: Skeleton screens and progress indicators

### **API Endpoints Integration**
- **Backend Sync**: All major backend endpoints integrated
- **Real-time Updates**: WebSocket support for live data
- **Offline Support**: Graceful degradation when API unavailable
- **Caching**: Intelligent data caching for performance

---

## 🧩 Component Library

### **Core Components**
- **Navigation**: TopNav, Sidebar, Breadcrumbs
- **Forms**: Input fields, selectors, file uploads, validation
- **Data Display**: Tables, cards, lists, charts
- **Feedback**: Modals, notifications, alerts, tooltips
- **Layout**: Grids, containers, dividers, spacing

### **Specialized Components**
- **Project Cards**: Rich project information display
- **AI Matching Interface**: Intelligent project alignment
- **Workflow Timeline**: Step-by-step process visualization
- **Impact Metrics**: Real-time sustainability indicators
- **Risk Assessment**: Visual risk scoring and analysis

---

## 🎭 Custom Hooks

### **State Management Hooks**
- **useDashboardData**: Dashboard data fetching and caching
- **useAiMatching**: AI matching engine integration
- **useProjectSearch**: Project discovery and filtering
- **useAuditTrail**: Compliance and audit data management
- **useImpact**: Impact metrics and monitoring
- **useCompanyProfile**: Company profile management

### **Utility Hooks**
- **useAuth**: Authentication state and user management
- **useApi**: API call management with loading states
- **useLocalStorage**: Persistent local storage management
- **useDebounce**: Input debouncing for search and forms

---

## 🗺️ Routing & Navigation

### **Route Structure**
```javascript
// Main application routes
<Route path="/" element={<AppLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="discovery/*" element={<DiscoveryRoutes />} />
  <Route path="alignment/*" element={<AlignmentRoutes />} />
  <Route path="decision/*" element={<DecisionRoutes />} />
  <Route path="monitoring/*" element={<MonitoringRoutes />} />
  <Route path="reporting/*" element={<ReportingRoutes />} />
  <Route path="marketplace/*" element={<MarketplaceRoutes />} />
  <Route path="profile/*" element={<ProfileRoutes />} />
  <Route path="settings/*" element={<SettingsRoutes />} />
  <Route path="support/*" element={<SupportRoutes />} />
</Route>

// Authentication routes (no app shell)
<Route path="/auth/*" element={<AuthLayout />} />
```

### **Navigation Features**
- **Breadcrumbs**: Clear navigation hierarchy
- **Active States**: Visual indication of current location
- **Role-based Menu**: Different navigation for different user types
- **Quick Actions**: Shortcuts to frequently used features

---

## 🚀 Performance & Optimization

### **Code Splitting**
- **Route-based**: Each major feature loads independently
- **Component-based**: Heavy components loaded on demand
- **Lazy Loading**: Images and media loaded progressively

### **State Optimization**
- **Memoization**: React.memo and useMemo for expensive calculations
- **Callback Optimization**: useCallback for stable function references
- **Local State**: Component-level state for UI interactions
- **Global State**: Context API for shared application state

---

## 🛠️ Development Scripts

### **Available Commands**
```bash
npm run dev          # Start development server with HMR
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
npm run test         # Run test suite (when implemented)
```

### **Development Workflow**
1. **Feature Development**: Create new pages and components
2. **Component Testing**: Test individual components in isolation
3. **Integration Testing**: Test feature workflows end-to-end
4. **Performance Testing**: Monitor bundle size and load times
5. **Accessibility Testing**: Ensure WCAG compliance

---

## 🔧 Configuration

### **Environment Variables**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=SustainAlign
VITE_APP_VERSION=1.0.0
```

### **Build Configuration**
- **Vite Config**: Optimized for production builds
- **Tailwind Config**: Custom design system configuration
- **ESLint Config**: Code quality and consistency rules
- **PostCSS Config**: CSS processing and optimization

---

## 🧪 Testing Strategy

### **Testing Levels**
- **Unit Tests**: Individual component testing
- **Integration Tests**: Feature workflow testing
- **E2E Tests**: Complete user journey testing
- **Accessibility Tests**: Screen reader and keyboard navigation

### **Testing Tools**
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **Accessibility**: Automated accessibility testing

---

## 📱 Mobile & Responsive

### **Mobile-First Approach**
- **Touch Interactions**: Optimized for mobile devices
- **Responsive Images**: Adaptive image loading and sizing
- **Mobile Navigation**: Collapsible menus and touch-friendly controls
- **Performance**: Optimized for slower mobile networks

### **Cross-Platform Compatibility**
- **Browser Support**: Modern browsers with graceful degradation
- **Device Support**: Desktop, tablet, and mobile optimization
- **Accessibility**: Screen reader and keyboard navigation support

---

## 🚀 Deployment

### **Build Process**
```bash
npm run build
# Creates optimized dist/ folder
```

### **Deployment Options**
- **Netlify**: Drag-and-drop deployment with SPA routing
- **Vercel**: Automatic deployments with preview URLs
- **Nginx**: Custom server configuration with SPA fallback
- **CDN**: Static asset optimization and global distribution

### **Production Considerations**
- **Environment Variables**: Production API endpoints
- **Error Tracking**: Sentry or similar error monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **Security Headers**: CSP, HSTS, and other security measures

---

## 🔍 Troubleshooting

### **Common Issues**

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version compatibility
node --version  # Should be 18+
```

**Runtime Errors:**
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Check authentication token validity
- Clear browser cache and localStorage

**Performance Issues:**
- Monitor bundle size with `npm run build`
- Check for memory leaks in React DevTools
- Optimize image sizes and formats
- Implement code splitting for large features

---

## 🌟 Key Features & Benefits

### **For Developers**
- **Modern Stack**: React 19, Vite 7, Tailwind v4
- **Component Library**: Reusable, accessible components
- **Type Safety**: PropTypes and ESLint for code quality
- **Performance**: Optimized builds and lazy loading

### **For Users**
- **Beautiful UI**: Modern, professional design
- **Intuitive UX**: Clear navigation and workflows
- **AI Integration**: Intelligent project matching and insights
- **Mobile Ready**: Responsive design for all devices

### **For Stakeholders**
- **Professional Appearance**: Enterprise-grade user interface
- **Feature Completeness**: All major CSR/ESG workflows
- **Scalability**: Built for growth and expansion
- **Compliance Ready**: Built-in audit trails and reporting

---

## 📚 Additional Resources

- **Component Documentation**: Inline JSDoc comments
- **API Integration**: `lib/api.js` for backend communication
- **Design System**: Tailwind configuration and custom components
- **Backend Integration**: Comprehensive API endpoint coverage

---

## 🙌 Contributing

### **Development Guidelines**
- **Component Design**: Keep components modular and reusable
- **State Management**: Use appropriate hooks and context
- **Performance**: Optimize for bundle size and runtime performance
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Testing**: Write tests for new features and components

### **Code Quality**
- **ESLint**: Follow established code style rules
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit linting and formatting
- **Code Review**: Peer review for all changes

---

**Made with care for sustainability-minded teams 🌍**
