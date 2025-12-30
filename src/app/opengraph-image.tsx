import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Logic Mastery - The Art of Clear Thinking";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAF8F3",
          padding: "60px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "3px solid #1A1814",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50px",
            right: "50px",
            bottom: "50px",
            border: "1px solid #1A1814",
            display: "flex",
          }}
        />

        {/* Large decorative symbol */}
        <div
          style={{
            position: "absolute",
            right: "100px",
            bottom: "100px",
            fontSize: "400px",
            color: "#1A1814",
            opacity: 0.05,
            fontFamily: "Georgia, serif",
            display: "flex",
          }}
        >
          ∴
        </div>

        {/* Logic symbols decoration */}
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "100px",
            display: "flex",
            gap: "20px",
          }}
        >
          <span style={{ fontSize: "48px", color: "#C84C3B", opacity: 0.3 }}>
            ∧
          </span>
          <span style={{ fontSize: "36px", color: "#1E4158", opacity: 0.3 }}>
            ∨
          </span>
          <span style={{ fontSize: "42px", color: "#C5A572", opacity: 0.4 }}>
            →
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingLeft: "40px",
            paddingTop: "60px",
          }}
        >
          {/* Main title */}
          <div
            style={{
              fontSize: "72px",
              color: "#1A1814",
              fontStyle: "italic",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            Logic Mastery
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#5C5A56",
              marginBottom: "30px",
              display: "flex",
            }}
          >
            The Art of Clear Thinking
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: "400px",
              height: "3px",
              backgroundColor: "#C84C3B",
              marginBottom: "30px",
              display: "flex",
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#5C5A56",
              marginBottom: "10px",
              fontFamily: "Arial, sans-serif",
              display: "flex",
            }}
          >
            An interactive course in formal logic
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#5C5A56",
              fontFamily: "Arial, sans-serif",
              display: "flex",
            }}
          >
            From propositional calculus to real-world applications
          </div>
        </div>

        {/* Corner accent */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            bottom: "80px",
            width: "60px",
            height: "60px",
            backgroundColor: "#C5A572",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "36px", color: "#1A1814" }}>∴</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
