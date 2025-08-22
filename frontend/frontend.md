# ZipScan Frontend – System Overview

This document provides a comprehensive overview of the ZipScan frontend: architecture, components, pages, services, routing, and key data flows.

## Stack
- Framework: React 18 with Vite
- Router: React Router DOM v6
- Styling: Tailwind CSS
- Animations: Framer Motion
- HTTP Client: Axios
- Icons: Lucide React
- State Management: React Context (useAuth)
- Build Tool: Vite

## Project Layout
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── CodeNestLanding.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ResetPassword.jsx
│   │   └── VerifyResetCode.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── AnalysisResultPage.jsx
│   │   ├── BatchHistoryPage.jsx
│   │   ├── BatchResultPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── FacultyDashboard.jsx
│   │   ├── FacultyUploadPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   ├── Login.jsx
│   │   ├── PricingPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ProjectHistoryPage.jsx
│   │   ├── Register.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── StudentUploadPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Core Architecture

### Entry Point (`src/main.jsx`)
- Renders `App` component wrapped in `BrowserRouter`
- Applies global CSS from `index.css`

### App Component (`src/App.jsx`)
- Main routing configuration
- Wraps entire app in `AuthProvider` context
- Defines all routes with role-based access control
- Uses `ProtectedRoute` for authenticated pages

### Authentication Context (`src/context/AuthContext.jsx`)
- Global state management for user authentication
- Provides: `user`, `isAuthenticated`, `login`, `logout`, `register`
- Stores tokens in `localStorage`
- Handles token refresh via axios interceptor
- Auto-refreshes tokens on 401 responses

## Routing Structure

### Public Routes
- `/` - Landing page (CodeNestLanding)
- `/login` - Login page
- `/register` - Registration page
- `/features` - Features page
- `/pricing` - Pricing page
- `/contact` - Contact page
- `/forgot-password` - Password reset flow
- `/verify-reset-code` - Reset code verification
- `/reset-password` - New password setup

### Protected Routes (Role-based)
- `/profile` - User profile (all roles)
- `/blog` - Blog posts and comments (all roles)

### Faculty Routes
- `/faculty-dashboard` - Faculty dashboard
- `/faculty/upload` - Batch upload for plagiarism check
- `/faculty/history` - Batch analysis history

### Student Routes
- `/student-dashboard` - Student dashboard
- `/student/upload` - Single project upload
- `/student/history` - Project analysis history

### Dynamic Routes
- `/analysis-result/:projectId` - Student project analysis results
- `/batch-result/:batchId` - Faculty batch analysis results

## Key Components

### Header (`src/components/Header.jsx`)
- Responsive navigation with hamburger menu for mobile
- Conditional rendering based on authentication state
- Marketing links (Features, Pricing, Blog, Contact, Faculty, Student) only on landing page when logged out
- Authenticated users see: Upload, History, Blog (role-specific)
- User profile display with role badge
- Logout functionality

### ProtectedRoute (`src/components/ProtectedRoute.jsx`)
- Route protection wrapper
- Redirects to login if not authenticated
- Optional role-based access control
- Preserves intended destination for post-login redirect

### Loading (`src/components/Loading.jsx`)
- Reusable loading spinner component
- Used across pages during API calls
- Consistent styling with app theme

### Alert (`src/components/Alert.jsx`)
- Toast notification system
- Success, error, warning, info variants
- Auto-dismiss functionality

## Pages Overview

### Landing & Marketing
- **CodeNestLanding** (`src/components/CodeNestLanding.jsx`)
  - Hero section with call-to-action
  - Features overview
  - Registration/login buttons

- **FeaturesPage** (`src/pages/FeaturesPage.jsx`)
  - Detailed feature explanations
  - Comparison between faculty and student features

- **PricingPage** (`src/pages/PricingPage.jsx`)
  - Pricing plans and features
  - Call-to-action buttons

- **ContactPage** (`src/pages/ContactPage.jsx`)
  - Contact form and information
  - Support details

### Authentication
- **Login** (`src/pages/Login.jsx`)
  - Email/password login form
  - Links to registration and password reset
  - Error handling and validation

- **Register** (`src/pages/Register.jsx`)
  - User registration with role selection
  - Form validation and error handling
  - Email verification flow

- **ForgotPassword** (`src/components/ForgotPassword.jsx`)
  - Email-based password reset
  - Integration with backend reset flow

- **VerifyResetCode** (`src/components/VerifyResetCode.jsx`)
  - Reset code verification
  - Transition to password reset

- **ResetPassword** (`src/components/ResetPassword.jsx`)
  - New password setup
  - Password confirmation validation

### Dashboards
- **FacultyDashboard** (`src/pages/FacultyDashboard.jsx`)
  - Overview of recent batches
  - Quick upload access
  - Statistics and metrics
  - Navigation to detailed views

- **StudentDashboard** (`src/pages/StudentDashboard.jsx`)
  - Recent project analyses
  - Quick upload access
  - Project statistics
  - Navigation to detailed views

### Upload Pages
- **FacultyUploadPage** (`src/pages/FacultyUploadPage.jsx`)
  - Batch ZIP upload for plagiarism analysis
  - Form with batch name and topic
  - Progress tracking and error handling
  - Redirect to batch results

- **StudentUploadPage** (`src/pages/StudentUploadPage.jsx`)
  - Single project ZIP upload
  - Project name input
  - Progress tracking and error handling
  - Redirect to analysis results

### History Pages
- **BatchHistoryPage** (`src/pages/BatchHistoryPage.jsx`)
  - Paginated list of faculty batch analyses
  - Similarity rate display (using `summary.similarity_percentage`)
  - Batch metadata and timestamps
  - Navigation to detailed results

- **ProjectHistoryPage** (`src/pages/ProjectHistoryPage.jsx`)
  - Paginated list of student project analyses
  - Project metadata and analysis timestamps
  - Navigation to detailed results

### Result Pages
- **BatchResultPage** (`src/pages/BatchResultPage.jsx`)
  - Detailed batch analysis results
  - Tabbed interface: Overview, Detailed Comparison, Student Projects
  - Similarity matrices and hierarchical views
  - Export functionality

- **AnalysisResultPage** (`src/pages/AnalysisResultPage.jsx`)
  - Student project analysis details
  - Technology stack with confidence badges
  - Libraries and features detected
  - File statistics including largest files
  - Analysis details (dependency/content frameworks)

### Blog System
- **BlogPage** (`src/pages/BlogPage.jsx`)
  - Blog posts listing with filtering (All, Professor, Student)
  - Create, edit, delete posts (author-only)
  - Comment system with CRUD operations
  - Responsive grid layout (3 cards per row)
  - Role-based filtering and display

### Profile
- **ProfilePage** (`src/pages/ProfilePage.jsx`)
  - User profile information
  - Statistics cards (total projects, batches, blogs)
  - Recent projects/batches and blogs side-by-side
  - Profile editing capabilities
  - Navigation to detailed views

## Services

### API Service (`src/services/api.js`)
- Centralized API configuration
- Axios instance with base URL and interceptors
- Token management and refresh logic
- Error handling and response processing
- Methods:
  - `authAPI` - Authentication endpoints
  - `plagiarismAPI` - Faculty batch analysis
  - `analysisAPI` - Student project analysis
  - `blogAPI` - Blog posts and comments

## Styling & UI

### Tailwind CSS Configuration
- Custom color scheme with gradients
- Responsive design utilities
- Dark theme with glassmorphism effects
- Consistent spacing and typography

### Design System
- Color palette: Slate, purple, blue gradients
- Glassmorphism cards with backdrop blur
- Consistent border radius and shadows
- Responsive breakpoints (sm, md, lg, xl)

### Animations (Framer Motion)
- Page transitions and micro-interactions
- Loading states and hover effects
- Smooth scrolling and navigation
- Card animations and list transitions

## State Management

### Authentication State
- Global user state via React Context
- Token storage in localStorage
- Automatic token refresh
- Role-based access control

### Local State
- Form data and validation
- Loading states and error handling
- UI state (modals, tabs, filters)
- Pagination and data caching

## Data Flow Patterns

### Authentication Flow
1. User submits login/register form
2. API call to backend authentication endpoints
3. Tokens stored in localStorage
4. User state updated in context
5. Redirect to intended destination

### File Upload Flow
1. User selects file and fills form
2. Form data validated
3. Multipart upload to backend
4. Progress tracking and error handling
5. Redirect to results page on success

### Data Fetching Flow
1. Component mounts or user action triggers
2. Loading state activated
3. API call with authentication headers
4. Data processed and state updated
5. UI re-renders with new data

### Blog CRUD Flow
1. User creates/edits/deletes post/comment
2. API call with proper authentication
3. Optimistic UI updates
4. Success/error feedback
5. Data refresh if needed

## Error Handling

### API Errors
- Axios interceptors catch 401/403/500 errors
- Automatic token refresh on 401
- User-friendly error messages
- Fallback states for failed requests

### Form Validation
- Client-side validation with immediate feedback
- Server-side error display
- Field-specific error highlighting
- Form submission prevention on errors

### Network Errors
- Offline detection and handling
- Retry mechanisms for failed requests
- Graceful degradation of features
- User notification of connectivity issues

## Performance Optimizations

### Code Splitting
- Route-based code splitting
- Lazy loading of pages
- Component-level optimizations

### Data Caching
- API response caching
- Pagination state preservation
- Optimistic updates for better UX

### Bundle Optimization
- Vite build optimization
- Tree shaking of unused code
- Asset optimization and compression

## Security Considerations

### Token Management
- Secure token storage in localStorage
- Automatic token refresh
- Token blacklisting on logout
- XSS protection measures

### Input Validation
- Client-side validation for UX
- Server-side validation for security
- Sanitization of user inputs
- CSRF protection via tokens

### Route Protection
- Authentication checks on protected routes
- Role-based access control
- Redirect handling for unauthorized access

## Responsive Design

### Mobile-First Approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized form inputs for mobile

### Breakpoint Strategy
- sm: 640px (mobile)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)

## Accessibility

### ARIA Labels
- Proper labeling of interactive elements
- Screen reader compatibility
- Keyboard navigation support
- Focus management

### Color Contrast
- WCAG compliant color combinations
- High contrast mode support
- Alternative text for images
- Semantic HTML structure

## Testing Strategy

### Component Testing
- Unit tests for utility functions
- Component rendering tests
- User interaction testing
- Error boundary testing

### Integration Testing
- API integration tests
- Authentication flow testing
- Form submission testing
- Navigation testing

## Deployment

### Build Process
- Vite build optimization
- Environment variable configuration
- Asset optimization
- Bundle analysis

### Environment Configuration
- Development vs production settings
- API endpoint configuration
- Feature flags and toggles
- Error reporting setup

## Future Enhancements

### Planned Features
- Real-time notifications
- Advanced search and filtering
- Export functionality improvements
- Offline mode support

### Technical Improvements
- Service worker for caching
- Progressive Web App features
- Advanced analytics integration
- Performance monitoring

---

This frontend architecture provides a robust, scalable foundation for the ZipScan application with modern React patterns, comprehensive error handling, and excellent user experience across all devices.
