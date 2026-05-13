import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { ProtectedRoute } from '../components/ui/ProtectedRoute';
import { AdminLeadsPage } from '../pages/AdminLeadsPage';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ResultsPage } from '../pages/ResultsPage';
import { ShareAuditPage } from '../pages/ShareAuditPage';

export default function App() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/share/:slug" element={<ShareAuditPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <AdminLeadsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AppLayout>
    </ErrorBoundary>
  );
}
