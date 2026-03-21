import React from "react";

const tabs = [
  { id: "tracks", label: "Tracks", icon: "\u266B" },
  { id: "scope", label: "Scope", icon: "\u25CE" },
  { id: "about", label: "About", icon: "\u24D8" },
];

function MobileTabBar({ active, onSelect }) {
  return (
    <nav id="mobile-tabbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`mobile-tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onSelect(tab.id)}
        >
          <span className="mobile-tab-icon">{tab.icon}</span>
          <span className="mobile-tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default React.memo(MobileTabBar);
