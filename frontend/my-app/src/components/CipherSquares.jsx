import React from "react";

function CipherSquares({ text, mapping, cellSize = 48 }) {
  // הפוך את הטקסט למערך תווים
  const items = text.split("").map((ch) => {
    if (ch === " ") return null; // רווח
    const key = ch.toLowerCase();
    if (mapping[key]) return { number: mapping[key], char: ch };
    return { char: ch }; // סימני פיסוק או תו שלא במיפוי
  });

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {items.map((item, i) => {
        if (item === null) {
          return <div key={i} style={{ width: cellSize / 2 }} />;
        }

        if (item.number) {
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: cellSize,
                  height: cellSize,
                  border: "2px solid black",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
               {item.char !== null ? <input style={{width: cellSize,
                  height: cellSize}}/> : <></>}
              </div>
              <div style={{ marginTop: 4, fontSize: 12 }}>{item.number}</div>
            </div>
          );
        }

        // סימני פיסוק
        return (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                width: cellSize,
                height: cellSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {item.char}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CipherSquares;
