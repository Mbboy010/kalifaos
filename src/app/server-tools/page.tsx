"use client";

import { useState } from "react";
import { pricingData, PricingGroup } from "./data";

export default function ResellerPricingIMEI() {
  const [search, setSearch] = useState<string>("");
  // Fixed: Explicit type for state to prevent 'any' mapping errors
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [showHotOnly, setShowHotOnly] = useState<boolean>(false);

  // Fixed: Explicitly typed 'cat' as string to resolve build error
  const toggle = (cat: string) =>
    setOpenGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const filtered = pricingData.filter((group: PricingGroup) => {
    if (showHotOnly && !group.hot) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      group.category.toLowerCase().includes(q) ||
      group.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#050505", minHeight: "100vh", color: "#e0e0e0" }}>
      <div style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)", borderBottom: "1px solid #1a1a1a", padding: "40px 24px 30px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00ff66", boxShadow: "0 0 10px #00ff66" }} />
            <span style={{ color: "#666", fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>TERMINAL SECURE ACCESS</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, color: "#fff" }}>
            IMEI <span style={{ color: "#00ff66" }}>Services</span>
          </h1>
          <p style={{ margin: 0, color: "#888", fontSize: 14 }}>Managed Pricing API • Secure Distributor Console</p>
        </div>
      </div>

      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(5, 5, 5, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "16px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 16, alignItems: "center" }}>
          <input
            type="text"
            placeholder="FILTER_DATABASE_SCAN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 4, padding: "10px 16px", color: "#00ff66", fontSize: 13, outline: "none", fontFamily: "monospace" }}
          />
          <button
            onClick={() => setShowHotOnly(!showHotOnly)}
            style={{ background: showHotOnly ? "#00ff66" : "transparent", border: `1px solid ${showHotOnly ? "#00ff66" : "#333"}`, borderRadius: 4, padding: "10px 20px", color: showHotOnly ? "#000" : "#888", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
          >
            🔥 URGENT_PRIORITY
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "30px 24px 80px" }}>
        {filtered.map((group) => {
          const isOpen = openGroups[group.id] !== false;
          return (
            <div key={group.id} style={{ marginBottom: 12, border: "1px solid #111", borderRadius: 4, background: "#080808" }}>
              <button onClick={() => toggle(group.id)} style={{ width: "100%", background: "transparent", border: "none", padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {group.hot && <span style={{ background: "#00ff66", color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 2 }}>HOT</span>}
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{group.category}</span>
                </div>
                <span style={{ color: "#00ff66", fontSize: 18, fontFamily: "monospace" }}>{isOpen ? "[−]" : "[+]"}</span>
              </button>
              {isOpen && (
                <div style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
                  {group.items.map((item, i) => (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 130px 100px", padding: "14px 20px", borderBottom: i < group.items.length - 1 ? "1px solid #111" : "none" }}>
                      <span style={{ color: "#bbb", fontSize: 13 }}>{item.name}</span>
                      <span style={{ color: "#666", fontSize: 12 }}>{item.delivery}</span>
                      <span style={{ color: item.price === "$0.00" ? "#333" : "#00ff66", fontSize: 14, fontWeight: 700, textAlign: "right", fontFamily: "monospace" }}>
                        {item.price === "$0.00" ? "FREE" : item.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
