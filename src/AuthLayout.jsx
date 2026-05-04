import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CoinbaseLogo from "./assets/coinbaseLogoNavigation-4.svg";
import WarningBanner from "./components/general/WarningBanner";

function AuthLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0a0b0d' }}>
        <WarningBanner />
        <div className="min-h-[calc(100vh-2.5rem)] flex items-center justify-center">
          <img
            src={CoinbaseLogo}
            alt="Coinbase"
            className="w-10 h-10"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0b0d' }}>
      <WarningBanner />
      <Outlet />
    </main>
  );
}

export default AuthLayout;
