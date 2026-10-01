import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { GameLayout } from '../layouts/GameLayout';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Loader } from '../components/common/Loader/Loader';

// Lazy loading all pages according to Code Standards
const SplashPage = lazy(() => import('../pages/Splash/SplashPage').then((m) => ({ default: m.SplashPage })));
const LandingPage = lazy(() => import('../pages/Landing/LandingPage').then((m) => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('../pages/Login/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/Register/RegisterPage').then((m) => ({ default: m.RegisterPage })));

const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const LearnPage = lazy(() => import('../pages/Learn/LearnPage').then((m) => ({ default: m.LearnPage })));
const LessonPage = lazy(() => import('../pages/Lesson/LessonPage').then((m) => ({ default: m.LessonPage })));
const QuizPage = lazy(() => import('../pages/Quiz/QuizPage').then((m) => ({ default: m.QuizPage })));
const CodingPage = lazy(() => import('../pages/Coding/CodingPage').then((m) => ({ default: m.CodingPage })));
const LevelCompletePage = lazy(() => import('../pages/LevelComplete/LevelCompletePage').then((m) => ({ default: m.LevelCompletePage })));

const LeaderboardPage = lazy(() => import('../pages/Leaderboard/LeaderboardPage').then((m) => ({ default: m.LeaderboardPage })));
const FriendsPage = lazy(() => import('../pages/Friends/FriendsPage').then((m) => ({ default: m.FriendsPage })));
const AchievementsPage = lazy(() => import('../pages/Achievements/AchievementsPage').then((m) => ({ default: m.AchievementsPage })));
const ProfilePage = lazy(() => import('../pages/Profile/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen text="Loading Py-Spark Module..." />}>
      <Routes>
        {/* Splash & Landing */}
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Public Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* Protected Application & Game Routes */}
        <Route element={<PrivateRoute />}>
          {/* Game Layout (Dedicated full screen interactive flow) */}
          <Route element={<GameLayout />}>
            <Route path="/learn/:topicId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/quiz/:quizId" element={<QuizPage />} />
            <Route path="/coding/:challengeId" element={<CodingPage />} />
          </Route>

          {/* Level Complete Special Celebration Screen */}
          <Route path="/level-complete" element={<LevelCompletePage />} />

          {/* Dashboard Main Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};
