"use client";

import { pricingData } from "../data";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

export default function ItemDetail() {
  const params = useParams();
  
  // Ensure we have a string ID from the dynamic route [id]
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Find the item within all groups based on the URL ID
  const item = pricingData
    .flatMap((group) => group.items)
    .find((i) => i.id === id);

  // If the ID doesn't match any item in our data, show 404
  if (!item) {
    return notFound();
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "40px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Link 
          href="/server-tools" 
          style={{ color: "#00ff66", textDecoration: "none", fontSize: 12, fontFamily: "monospace" }}
        >
          &lt; BACK_TO_CONSOLE
        </Link>
        
        <div style={{ marginTop: 40, border: "1px solid #1a1a1a", padding: 30, borderRadius: 8, background: "#080808" }}>
          <h1 style={{ fontSize: 24, marginBottom: 20, color: "#00ff66" }}>Service Details</h1>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ color: "#555", fontSize: 11, display: "block", marginBottom: 5 }}>SERVICE_NAME</label>
              <div style={{ fontSize: 16, lineHeight: 1.5 }}>{item.name}</div>
            </div>

            <div style={{ display: "flex", gap: 40 }}>
              <div>
                <label style={{ color: "#555", fontSize: 11, display: "block", marginBottom: 5 }}>EST_DELIVERY</label>
                <div style={{ color: "#bbb" }}>{item.delivery}</div>
              </div>
              <div>
                <label style={{ color: "#555", fontSize: 11, display: "block", marginBottom: 5 }}>CREDITS_REQUIRED</label>
                <div style={{ color: "#00ff66", fontWeight: "bold", fontFamily: "monospace" }}>{item.price}</div>
              </div>
            </div>
            
            <div style={{ borderTop: "1px solid #1a1a1a", marginTop: 10, paddingTop: 20 }}>
              <label style={{ color: "#555", fontSize: 11, display: "block", marginBottom: 5 }}>INTERNAL_ID</label>
              <div style={{ color: "#444", fontSize: 12, fontFamily: "monospace" }}>{item.id}</div>
            </div>
          </div>

          <button 
            style={{ 
              marginTop: 40, 
              width: "100%", 
              background: "#00ff66", 
              color: "#000",
              border: "none", 
              padding: "12px", 
              borderRadius: 4, 
              fontWeight: "bold", 
              cursor: "pointer",
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            INITIALIZE SERVICE
          </button>
        </div>
      </div>
    </div>
  );
}
