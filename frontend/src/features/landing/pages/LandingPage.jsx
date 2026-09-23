import React from 'react';
import { useAuth } from '@/context/AuthContext';
import HeroThreeCanvas from '../components/HeroThreeCanvas';
import LandingHeader from '../components/LandingHeader';
import LandingHeroSection from '../components/LandingHeroSection';
import LandingFeaturesGrid from '../components/LandingFeaturesGrid';
import LandingFooter from '../components/LandingFooter';

export default function LandingPage() {
  const { user, isGuest, setIsAuthModalOpen } = useAuth();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
        fontFamily: "'Inter', sans-serif",
        overflowX: 'hidden',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      {/* Three.js Calm Wave Canvas Layer */}
      <HeroThreeCanvas />

      {/* Minimal Top Header */}
      <LandingHeader
        user={user}
        isGuest={isGuest}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />

      {/* Main Content Area */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1080px',
          width: '100%',
          boxSizing: 'border-box',
          margin: '0 auto',
          padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px) 50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LandingHeroSection setIsAuthModalOpen={setIsAuthModalOpen} />
        <LandingFeaturesGrid />
      </main>

      {/* Minimal Footer */}
      <LandingFooter />
    </div>
  );
}
