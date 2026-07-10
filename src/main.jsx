import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './styles.css';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <LanguageProvider>
        <Suspense fallback={<div className="page-loader" />}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);

function NotFound() {
  return (
    <main id="main-content" style={{ padding: '120px 0', textAlign: 'center' }}>
      <div className="container">
        <h1>404 — Page Not Found</h1>
        <p style={{ color: 'var(--text2)', margin: '12px 0 24px' }}>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="button primary">Back to Home</Link>
      </div>
    </main>
  );
}
