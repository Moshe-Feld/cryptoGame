import React, { useState } from "react";
import "../css/keyboard.css";

export default function Keyboard({ alphabet, revealedLetters = [], fullyRevealedLetters = [], onLetterClick }) {
    const [visible, setVisible] = useState(true);

    const renderKey = (ltr) => {
        const lower = ltr.toLowerCase();
        const isFull = fullyRevealedLetters.includes(lower);
        const isPartial = !isFull && revealedLetters.includes(lower);

        const cls =
            "key" +
            (isFull ? " key-full" : isPartial ? " key-partial" : " key-hidden");

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

    if (!visible) {
        return (
            <button className="toggle-keyboard" onClick={() => setVisible(true)}>
                ⌨ Show Keyboard
            </button>
        );
    }

    return (
        <>
            <button className="toggle-keyboard" onClick={() => setVisible(false)}>
                ⌨ Hide Keyboard
            </button>
            <div className="keyboard">
                <div className="keyboard-row">
                    {alphabet.slice(0, 10).map(renderKey)}
                </div>
                <div className="keyboard-row">
                    {alphabet.slice(10, 19).map(renderKey)}
                </div>
                <div className="keyboard-row">
                    {alphabet.slice(19).map(renderKey)}
                </div>
            </div>
        </>
    );
}