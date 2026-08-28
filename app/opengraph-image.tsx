import { ImageResponse } from "next/og";

export const alt = "nohint404 — Engineering, without the guesswork";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#050507",
          color: "#f5f7ff",
          border: "1px solid #34384d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 22, letterSpacing: ".12em" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#5ae5ff", boxShadow: "0 0 18px #5ae5ff" }} />
          NOHINT404 / PERSONAL ARCHIVE
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 94, lineHeight: 0.95, letterSpacing: "-.05em", fontWeight: 700 }}>
          <span>Work you can</span>
          <span style={{ color: "#91a5ff" }}>inspect.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#a7acbf" }}>
          <span>VERIFIED WORK · INSPECTABLE SOURCE</span>
          <span>NOHINT.DEV</span>
        </div>
      </div>
    ),
    size,
  );
}
