import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Activity, BarChart2 } from 'lucide-react';
import { simulationService } from '@/services/simulationService';
import { computeClientGBM } from '../utils/monteCarloEngine';
import SimulationControls from '../components/SimulationControls';
import TrajectoryFanChart from '../components/TrajectoryFanChart';
import TerminalHistogram from '../components/TerminalHistogram';

export default function SimulationsPage() {
  const [ticker, setTicker] = useState('RELIANCE.NS');
  const [iterations, setIterations] = useState(500);
  const [horizon, setHorizon] = useState('90d');
  const [volatilityOverride, setVolatilityOverride] = useState(22.5);
  const [initialCapital, setInitialCapital] = useState(1000000);

  const [activeRightTab, setActiveRightTab] = useState('fan');
  const [loading, setLoading] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [runCount, setRunCount] = useState(1);
  const [lastExecutedAt, setLastExecutedAt] = useState(null);
  const [isConfigDirty, setIsConfigDirty] = useState(false);

  const horizonDays = useMemo(() => {
    switch (horizon) {
      case '30d': return 30;
      case '90d': return 90;
      case '365d': return 252;
      default: return 90;
    }
  }, [horizon]);

  const executeSimulation = useCallback(
    async (targetTicker, targetHorizon, targetIterations, targetVol) => {
      const activeTicker = targetTicker || ticker;
      const days = targetHorizon === '30d' ? 30 : targetHorizon === '365d' ? 252 : 90;
      const paths = targetIterations || iterations;
      const vol = targetVol || volatilityOverride;

      setLoading(true);
      setToastMessage(null);

      try {
        const data = await simulationService.runMonteCarlo({
          ticker: activeTicker,
          days,
          simulations: paths,
          initialCapital,
          volatilityOverride: vol,
        });

        if (!data || !data.chartSeries) {
          throw new Error('Incomplete simulation payload received.');
        }

        setSimulationData(data);
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastExecutedAt(timeStr);
        setToastMessage(`Generated ${paths} stochastic projection paths for ${activeTicker} (${timeStr})`);
        setRunCount((prev) => prev + 1);
        setIsConfigDirty(false);
      } catch (err) {
        console.warn('Utilizing local stochastic calculation:', err.message);
        const clientData = computeClientGBM(activeTicker, days, paths, initialCapital, vol);
        setSimulationData(clientData);
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastExecutedAt(timeStr);
        setToastMessage(`Generated ${paths} stochastic projection paths for ${activeTicker} (${timeStr})`);
        setRunCount((prev) => prev + 1);
        setIsConfigDirty(false);
      } finally {
        setLoading(false);
      }
    },
    [ticker, iterations, horizon, volatilityOverride, initialCapital]
  );

  useEffect(() => {
    executeSimulation('RELIANCE.NS', '90d', 500, 22.5);
  }, []);

  const metrics = simulationData?.metrics || {
    medianTerminalWealth: 1180000,
    bestCaseP95: 1427500,
    worstCaseP5: 865000,
    var95Dollars: 135000,
    var95Pct: 13.5,
    cvar95Dollars: 168000,
    cvar95Pct: 16.8,
    probabilityOfProfit: 68.2,
    volatilityAnnualizedPct: volatilityOverride,
  };

  return (
    <div className="split-panel-layout">
      {/* LEFT COLUMN: SIMULATION CONTROLS */}
      <div className="panel-left-scrollable">
        <SimulationControls
          ticker={ticker}
          setTicker={setTicker}
          iterations={iterations}
          setIterations={setIterations}
          horizon={horizon}
          setHorizon={setHorizon}
          volatilityOverride={volatilityOverride}
          setVolatilityOverride={setVolatilityOverride}
          isConfigDirty={isConfigDirty}
          setIsConfigDirty={setIsConfigDirty}
          loading={loading}
          executeSimulation={executeSimulation}
          runCount={runCount}
          lastExecutedAt={lastExecutedAt}
          metrics={metrics}
        />
      </div>

      {/* RIGHT COLUMN: GRAPHS & VISUALIZATIONS */}
      <div className="panel-right-scrollable">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div
            style={{
              background: 'var(--gain-green-bg)',
              border: '1px solid var(--gain-green-border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px var(--space-4)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--gain-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'fadeInBackdrop 0.2s ease',
            }}
          >
            <span>● {toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              style={{ background: 'transparent', border: 'none', color: 'var(--gain-green)', cursor: 'pointer', fontWeight: 800 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Switcher Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px var(--space-4)',
            boxShadow: 'var(--shadow-card)',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setActiveRightTab('fan')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeRightTab === 'fan' ? 'var(--accent-blue)' : 'transparent',
                color: activeRightTab === 'fan' ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: activeRightTab === 'fan' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Activity size={15} />
              <span>{iterations}-Path Trajectory Fan</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRightTab('histogram')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: activeRightTab === 'histogram' ? 'var(--accent-blue)' : 'transparent',
                color: activeRightTab === 'histogram' ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: activeRightTab === 'histogram' ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <BarChart2 size={15} />
              <span>Terminal Wealth Distribution</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isConfigDirty && (
              <span className="badge badge-blue">
                Pending Run
              </span>
            )}
            <span className="badge badge-gain">
              {ticker} ({horizonDays}d)
            </span>
          </div>
        </div>

        {/* TAB 1: Fan Chart */}
        {activeRightTab === 'fan' && (
          <TrajectoryFanChart
            simulationData={simulationData}
            ticker={ticker}
            iterations={iterations}
            horizonDays={horizonDays}
            initialCapital={initialCapital}
            metrics={metrics}
          />
        )}

        {/* TAB 2: Terminal Wealth Distribution */}
        {activeRightTab === 'histogram' && (
          <TerminalHistogram
            simulationData={simulationData}
            iterations={iterations}
            ticker={ticker}
          />
        )}
      </div>
    </div>
  );
}
