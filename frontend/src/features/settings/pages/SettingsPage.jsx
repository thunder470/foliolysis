import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, Save } from 'lucide-react';
import ProfileSettingsCard from '../components/ProfileSettingsCard';
import TradingRulesCard from '../components/TradingRulesCard';
import BrokerageCard from '../components/BrokerageCard';
import NotificationCard from '../components/NotificationCard';

export default function SettingsPage() {
  const { user, isGuest, updateUser, setIsAuthModalOpen, logout, loginAsGuest, loginAsPro } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [handle, setHandle] = useState(user.handle);
  const [initialCapital, setInitialCapital] = useState(user.initialCapital || 1000000);
  const [riskTolerance, setRiskTolerance] = useState(user.riskTolerance || 'Moderate');
  const [defaultBenchmark, setDefaultBenchmark] = useState(user.defaultBenchmark || '^NSEI');
  const [defaultStopLoss, setDefaultStopLoss] = useState(user.defaultStopLoss || 2.5);
  const [maxOrderAllocationPct, setMaxOrderAllocationPct] = useState(user.maxOrderAllocationPct || 15);

  const [brokerKey, setBrokerKey] = useState(user.broker?.apiKey || 'zk_live_994827103a8f');
  const [brokerConnected, setBrokerConnected] = useState(user.broker?.connected ?? true);

  const [notifications, setNotifications] = useState(user.notifications || {
    stopLossAlerts: true,
    vixSpikeAlerts: true,
    signalAlerts: true,
    dailyDigest: true,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      handle,
      initialCapital: Number(initialCapital),
      riskTolerance,
      defaultBenchmark,
      defaultStopLoss: Number(defaultStopLoss),
      maxOrderAllocationPct: Number(maxOrderAllocationPct),
      broker: {
        ...user.broker,
        apiKey: brokerKey,
        connected: brokerConnected,
      },
      notifications,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="grid-12">
      {/* Page Header */}
      <div className="col-span-12 fintech-card" style={{ gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              User Account & Trading Settings
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', margin: 0 }}>
              Manage your trader profile, authentication status, default Indian equity capital, and broker connections
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {saveSuccess && (
              <span className="badge badge-gain" style={{ animation: 'pageFadeIn 0.2s ease' }}>
                <CheckCircle2 size={13} />
                <span>Preferences Saved!</span>
              </span>
            )}
            <button
              onClick={handleSave}
              className="btn-primary"
              id="save-settings-btn"
            >
              <Save size={15} />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </div>

      <ProfileSettingsCard
        user={user}
        isGuest={isGuest}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        handle={handle}
        setHandle={setHandle}
        setIsAuthModalOpen={setIsAuthModalOpen}
        loginAsGuest={loginAsGuest}
      />

      <TradingRulesCard
        initialCapital={initialCapital}
        setInitialCapital={setInitialCapital}
        defaultBenchmark={defaultBenchmark}
        setDefaultBenchmark={setDefaultBenchmark}
        riskTolerance={riskTolerance}
        setRiskTolerance={setRiskTolerance}
        defaultStopLoss={defaultStopLoss}
        setDefaultStopLoss={setDefaultStopLoss}
        maxOrderAllocationPct={maxOrderAllocationPct}
        setMaxOrderAllocationPct={setMaxOrderAllocationPct}
      />

      <BrokerageCard
        brokerConnected={brokerConnected}
        setBrokerConnected={setBrokerConnected}
        brokerKey={brokerKey}
        setBrokerKey={setBrokerKey}
      />

      <NotificationCard
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </div>
  );
}
