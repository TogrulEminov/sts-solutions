"use client"
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#292525",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "60px",
          height: "60px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: "3px solid transparent",
              borderTopColor: "#f5ac43",
              borderRadius: "50%",
              animation: `spin ${1 + i * 0.3}s linear infinite`,
              opacity: 1 - i * 0.3,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
