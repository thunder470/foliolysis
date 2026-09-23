import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, ToastProvider, ThemeProvider } from '@/context';
import { ErrorBoundary, OfflineBanner, PageSkeleton } from '@/components/common';
import { AuthModal } from '@/features/auth';
import { Sidebar, GlobalHeader, MobileNav } from '@/components/layout';
import { api } from '@/services/apiClient';

// Route-level Code Splitting for Performance & Core Web Vitals (<150KB initial chunks)
const LandingPage = lazy(() => import('@/features/landing').then((m) => ({ default: m.LandingPage })));
const Dashboard = lazy(() => import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })));
const Strategies = lazy(() => import('@/features/strategies').then((m) => ({ default: m.StrategiesPage })));
const RiskAnalysis = lazy(() => import('@/features/risk').then((m) => ({ default: m.RiskAnalysisPage })));
const Simulations = lazy(() => import('@/features/simulations').then((m) => ({ default: m.SimulationsPage })));
const Reports = lazy(() => import('@/features/reports').then((m) => ({ default: m.ReportsPage })));
const Settings = lazy(() => import('@/features/settings').then((m) => ({ default: m.SettingsPage })));

function AppLayout({ marketOverview, history, fetchGlobalData }) {
  const location = useLocation();
  const isLanding = location.pathname === '/' || location.pathname === '/landing' || location.pathname === '/welcome';

  if (isLanding) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<PageSkeleton />}>
          <LandingPage />
        </Suspense>
        <AuthModal />
      </ErrorBoundary>
    );
  }

  return (
    <div className="app-shell">
      {/* 260px Fixed Sidebar with Active Route Highlighting & User Profile */}
      <Sidebar />

      {/* Dynamic Canvas with Global Header and Route-based Suspense */}
      <div className="canvas-scrollable">
        <GlobalHeader marketOverview={marketOverview} />

        <main
          key={location.pathname}
          className="page-transition-container"
          style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <Routes location={location}>
                <Route
                  path="/dashboard"
                  element={<Dashboard marketOverview={marketOverview} history={history} />}
                />
                <Route
                  path="/strategies"
                  element={<Strategies onRefreshHistory={fetchGlobalData} />}
                />
                <Route
                  path="/risk-analysis"
                  element={<RiskAnalysis />}
                />
                <Route
                  path="/simulations"
                  element={<Simulations />}
                />
                <Route
                  path="/reports"
                  element={<Reports history={history} />}
                />
                <Route
                  path="/settings"
                  element={<Settings />}
                />

                {/* Backward compatibility redirects */}
                <Route path="/backtest" element={<Navigate to="/strategies" replace />} />
                <Route path="/analytics" element={<Navigate to="/risk-analysis" replace />} />
                <Route path="/portfolios" element={<Navigate to="/risk-analysis" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Global User Authentication Modal */}
      <AuthModal />

      {/* Responsive Mobile Bottom Navigation & Slide-over Drawer (<= 768px) */}
      <MobileNav />
    </div>
  );
}

export default function App() {
  const [marketOverview, setMarketOverview] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchGlobalData = async () => {
    try {
      const [mData, hData] = await Promise.allSettled([
        api.get('/api/market/overview', { staleTime: 20000 }),
        api.get('/api/backtest/history', { staleTime: 20000 }),
      ]);

      if (mData.status === 'fulfilled' && mData.value) {
        setMarketOverview(mData.value);
      }
      if (hData.status === 'fulfilled' && hData.value?.records) {
        setHistory(hData.value.records || []);
      }
    } catch (e) {
      console.warn('[Global Data Polling Notice]', e.message);
    }
  };

  useEffect(() => {
    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <OfflineBanner />
            <BrowserRouter>
              <AppLayout
                marketOverview={marketOverview}
                history={history}
                fetchGlobalData={fetchGlobalData}
              />
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
