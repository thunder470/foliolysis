import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Layers } from 'lucide-react';
import { INDIAN_STOCKS, searchIndianStocks } from '@/constants/stocks';
import { useClickOutside } from '@/hooks/useClickOutside';
import { EmptyState } from '@/components/common';

export default function StockSearchModal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useClickOutside(searchContainerRef, () => setIsSearchOpen(false));

  useEffect(() => {
    if (!searchQuery.trim()) {
      if (selectedCategory === 'ALL') {
        setSearchResults(INDIAN_STOCKS.slice(4, 12));
      } else {
        const filtered = INDIAN_STOCKS.filter((s) =>
          s.sector.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 8));
      }
    } else {
      let results = searchIndianStocks(searchQuery);
      if (selectedCategory !== 'ALL') {
        results = results.filter(
          (s) =>
            s.isCustom ||
            s.sector.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }
      setSearchResults(results.slice(0, 8));
    }
    setActiveIndex(-1);
  }, [searchQuery, selectedCategory]);

  const handleSelectStock = (ticker) => {
    navigate(`/strategies?ticker=${encodeURIComponent(ticker)}`);
    setSearchQuery('');
    setIsSearchOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isSearchOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsSearchOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        handleSelectStock(searchResults[activeIndex].symbol);
      } else if (searchQuery.trim()) {
        let ticker = searchQuery.trim().toUpperCase();
        if (!ticker.endsWith('.NS') && !ticker.startsWith('^')) {
          ticker = `${ticker}.NS`;
        }
        handleSelectStock(ticker);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      searchInputRef.current?.blur();
    }
  };

  const categories = ['ALL', 'Banking', 'IT', 'Auto', 'Energy', 'Pharma'];

  return (
    <div ref={searchContainerRef} style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          background: 'var(--bg-input)',
          border: isSearchOpen ? '1px solid var(--accent-blue)' : '1px solid var(--border-input)',
          borderRadius: 'var(--radius-md)',
          padding: '5px var(--space-2.5, 10px)',
          width: 'clamp(120px, 13vw, 190px)',
          boxShadow: isSearchOpen ? '0 0 0 3px rgba(37, 99, 235, 0.16)' : 'var(--shadow-xs)',
          transition: 'all 0.2s ease',
        }}
      >
        <Search size={14} color={isSearchOpen ? 'var(--accent-blue)' : 'var(--text-muted)'} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search NSE/BSE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          onKeyDown={handleKeyDown}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            boxShadow: 'none',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            width: '100%',
            fontWeight: 500,
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              searchInputRef.current?.focus();
            }}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {isSearchOpen && (
        <div
          role="dialog"
          aria-label="Stock Search Dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '360px',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-card)',
            boxShadow: 'var(--shadow-dropdown)',
            zIndex: 100,
            overflow: 'hidden',
            animation: 'modalSpringIn 0.2s var(--ease-spring)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-card-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              overflowX: 'auto',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--accent-blue)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '4px var(--space-2)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  border: selectedCategory === cat ? '1px solid transparent' : '1px solid var(--border-card)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div
            style={{
              padding: '6px var(--space-4)',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              background: 'var(--bg-card)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span>{searchQuery ? 'Search Results' : 'Trending Indian Stocks'}</span>
            <span style={{ fontSize: '0.65rem' }}>Enter to select</span>
          </div>

          <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {searchResults.length === 0 ? (
              <EmptyState
                icon={Layers}
                title={`No stocks matching "${searchQuery}"`}
                description="Try searching with a valid NSE symbol like RELIANCE, TCS, INFY or select a different sector."
                style={{ border: 'none', background: 'transparent', margin: 0, padding: 'var(--space-5)' }}
              />
            ) : (
              searchResults.map((stock, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <div
                    key={stock.symbol}
                    onClick={() => handleSelectStock(stock.symbol)}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--bg-hover)' : 'var(--bg-card)',
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 0.15s ease',
                      minHeight: '44px',
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: 'var(--radius-sm)',
                          background: stock.isCustom ? 'var(--accent-blue-subtle)' : 'var(--neutral-slate-bg)',
                          color: stock.isCustom ? 'var(--accent-blue)' : 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.68rem',
                        }}
                      >
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                          {stock.symbol}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', maxWidth: '170px' }} className="truncate">
                          {stock.name}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {stock.price > 0 ? (
                        <>
                          <div className="font-mono" style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                            ₹{stock.price.toLocaleString('en-IN')}
                          </div>
                          <div
                            className="font-mono"
                            style={{
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              color: stock.changePct >= 0 ? 'var(--gain-green)' : 'var(--loss-red)',
                            }}
                          >
                            {stock.changePct >= 0 ? `+${stock.changePct}%` : `${stock.changePct}%`}
                          </div>
                        </>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: 'var(--accent-blue)', fontWeight: 700 }}>
                          <span>Backtest</span>
                          <ArrowRight size={12} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
