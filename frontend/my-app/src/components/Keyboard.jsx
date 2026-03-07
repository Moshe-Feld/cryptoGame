import React, { useState } from "react";
import "../css/keyboard.css";

export default function Keyboard({ alphabet, revealedLetters = [], fullyRevealedLetters = [], onLetterClick }) {
    const [open, setOpen] = useState(false);

    const renderKey = (ltr) => {
        const lower = ltr.toLowerCase();
        const isFull = fullyRevealedLetters.includes(lower);
        const isPartial = !isFull && revealedLetters.includes(lower);
        const cls = "key" + (isFull ? " key-full" : isPartial ? " key-partial" : " key-hidden");

        return (
            <button
                key={ltr}
                className={cls}
                tabIndex={-1}
                onMouseDown={(e) => { e.preventDefault(); onLetterClick(lower); }}
                onTouchStart={(e) => { e.preventDefault(); onLetterClick(lower); }}
                type="button"
            >
                {ltr}
            </button>
        );
    };

    return (
        <div className={`keyboard-drawer ${open ? "open" : ""}`}>
            <button className="keyboard-tab" onClick={() => setOpen(o => !o)}>
                ⌨️ {open ? "Hide" : "Keyboard"}
            </button>
            <div className="keyboard">
                <div className="keyboard-row">{alphabet.slice(0, 10).map(renderKey)}</div>
                <div className="keyboard-row">{alphabet.slice(10, 19).map(renderKey)}</div>
                <div className="keyboard-row">{alphabet.slice(19).map(renderKey)}</div>
            </div>
        </div>
    );
}