import React, { useEffect, useMemo, useRef, useState } from "react";
import "../css/CreatePuzzle.css";
import { useUser } from "../context/userContext";

function CreatePuzzle({ text }) {
  const {email, editUser} = useUser();
  const form = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26 };
  const [code, setCode] = useState(form);
  const [numbersState, setNumbersState] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintMode, setHintMode] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [initialHints, setInitialHints] = useState([]);
  const inputRefs = useRef([]);

  function createCode() {
    const chars = Object.keys(code);
    const nums = Object.values(code);

    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    const res = {};
    chars.forEach((char, i) => {
      res[char] = nums[i];
    });
    setCode(res);
  }

  useEffect(() => {
    createCode();
  }, []);

  const items = useMemo(() => {
    const parts = text.split(/(\s+)/);
    return parts.map((part) => {
      if (part.trim() === "") return { type: "space" };
      const chars = part.split("").map((ch) => {
        const key = ch.toLowerCase();
        if (code[key]) return { type: "enc", number: code[key], char: ch };
        return { type: "raw", char: ch };
      });
      return { type: "word", chars };
    });
  }, [text, code]);

  useEffect(() => {
    if (initialHints.length === 0) {
      const revealed = choseStartLetters(items);
      setInitialHints(revealed);
    }
  }, [items]);

  useEffect(() => {
    const codeNumbers = [];
    let inputIndex = 0;

    items.forEach((item) => {
      if (item.type === "word") {
        item.chars.forEach((ch) => {
          if (ch.type === "enc") {
            codeNumbers[inputIndex++] = ch.number;
          }
        });
      }
    });
    setNumbersState(codeNumbers);

    initialHints.forEach((idx) => {
      const input = inputRefs.current[idx];
      if (!input) return;
      const char = input.dataset.char;
      const number = Number(input.dataset.number);
      input.value = char.toUpperCase();
      input.disabled = true;
      const stillRemaining = remainingOccurrences(char);
      if (!stillRemaining) {
        setNumbersState((prev) => {
          const newState = prev.map(num => num === number ? null : num);
          return newState;
        })
      }
    });
  }, [items, resetTrigger, initialHints]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [items]);

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const getNextActiveIndex = (currentIndex, direction = 1) => {
    const refs = inputRefs.current;
    let next = currentIndex;

    do {
      next += direction;
      if (next >= refs.length) next = 0;
      if (next < 0) next = refs.length - 1;
    } while (refs[next].disabled && next !== currentIndex);

    return next;
  };

  const resetGame = () => {
    setMistakes(0);
    setGameCompleted(false);
    setHintMode(false);
    inputRefs.current.forEach((input) => {
      if (input) {
        input.value = "";
        input.disabled = false;
      }
    });

    setResetTrigger(prev => prev + 1);
  };

  const choseStartLetters = (items) => {
    if (!items || items.length === 0) return [];

    const chosen = new Set();
    let runningIndex = 0;

    items.forEach((item) => {
      if (item.type === "word" && item.chars.length >= 5) {
        const encs = item.chars
          .map((ch) => ({ ch, idx: runningIndex++ }))
          .filter(({ ch }) => ch.type === "enc");

        if (encs.length > 0) {
          const rand = encs[Math.floor(Math.random() * encs.length)];
          chosen.add(rand.idx);
        }
      } else if (item.type === "word") {
        item.chars.forEach((ch) => { if (ch.type === "enc") runningIndex++; });
      }
    });

    // בחר עוד 2–3 אותיות רנדומליות
    const encLetters = [];
    let globalIndex = 0;
    items.forEach((item) => {
      if (item.type === "word") {
        item.chars.forEach((ch) => {
          if (ch.type === "enc") {
            encLetters.push({ ch, index: globalIndex });
          }
          if (ch.type === "enc") globalIndex++;
        });
      }
    });

    const extraCount = Math.min(3, encLetters.length);
    for (let i = 0; i < extraCount; i++) {
      const rand = encLetters[Math.floor(Math.random() * encLetters.length)];
      chosen.add(rand.index);
    }

    return Array.from(chosen); // מחזירה רק אינדקסים
  };



  const remainingOccurrences = (char) => {
    const number = code[char.toLowerCase()];
    return inputRefs.current.some(
      (input) => input && !input.disabled && Number(input.dataset.number) === number
    );
  };

  const handleInput = (value, index) => {
    const inputChar = value.toLowerCase();

    const number = Number(inputRefs.current[index].dataset.number);

    if (code[inputChar] === number) {
      inputRefs.current[index].value = inputChar.toUpperCase();
      inputRefs.current[index].disabled = true;

      const stillRemaining = remainingOccurrences(inputChar);
      if (!stillRemaining) {
        setNumbersState((prev) => {
          const newState = prev.map(num => num === number ? null : num);

          const allCleared = newState.every(num => num === null);
          if (allCleared) {
            setGameCompleted(true);
            alert("well done 🎉");
            editUser(email.email);
           
          }
          return newState;
        });
      }

      setTimeout(() => focusInput(getNextActiveIndex(index, 1)));


    }
    else {
      setMistakes((prev) => {
        const newMistakes = prev + 1;
        if (newMistakes >= 3) {
          alert("Game Over ❌");
          resetGame();
        }
        return newMistakes;
      });
      setTimeout(() => (inputRefs.current[index].value = ""), 250);
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusInput(getNextActiveIndex(index, 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusInput(getNextActiveIndex(index, -1));
    }
  };

  const revealHint = (index) => {
    const input = inputRefs.current[index];
    if (!input || input.disabled) return;

    const char = input.dataset.char;
    const number = Number(input.dataset.number);

    input.value = char.toUpperCase();
    input.disabled = true;

    const stillRemaining = remainingOccurrences(char);
    if (!stillRemaining) {
      setNumbersState((prev) =>
        prev.map((num) => (num === number ? null : num))
      );
    }
  };


  let inputIndex = 0;

  return (
    <>
      <div className="mistakes">
        {[...Array(3)].map((_, i) => (
          <span key={i} className={i < mistakes ? "mistake active" : "mistake"}>
            ❌
          </span>
        ))}
      </div>
      <div className="puzzle-container">
        {items.map((item, i) => {
          if (item.type === "space") {
            return <div key={`space-${i}`} className="puzzle-space" />;
          }
          return (
            <div key={`word-${i}`} className="puzzle-word">
              {item.chars.map((ch, j) => {
                if (ch.type === "enc") {
                  const currentIndex = inputIndex++;
                  return (
                    <div
                      key={`enc-${i}-${j}`}
                      className="puzzle-cell-wrapper"
                    >
                      <div className="puzzle-cell">
                        <input
                          ref={(el) => (inputRefs.current[currentIndex] = el)}
                          className={`puzzle-input ${hintMode && !inputRefs.current[currentIndex]?.value ? "hint-available" : ""}`}
                          maxLength={1}
                          data-char={ch.char}
                          data-number={ch.number}
                          onChange={(e) => handleInput(e.target.value, currentIndex)}
                          onKeyDown={(e) => handleKeyDown(e, currentIndex)}
                          onClick={() => {
                            if (hintMode && !inputRefs.current[currentIndex].disabled) {
                              revealHint(currentIndex);
                              setHintMode(false);
                            }
                          }}
                        />
                      </div>
                      <div className="puzzle-number">{numbersState[currentIndex]}</div>
                    </div>
                  );
                }
                return (
                  <div key={`raw-${i}-${j}`} className="puzzle-cell-wrapper">
                    <div className="puzzle-cell">{ch.char}</div>
                    <div className="puzzle-number"></div> { }
                  </div>
                );


              })}
            </div>
          );
        })}
      </div>
      <button onClick={resetGame} className="restart-btn">
        🔄 Restart
      </button>
      <button onClick={() => setHintMode(!hintMode)} className="hint-btn">
        💡 Hint
      </button>

    </>
  );
}

export default CreatePuzzle;
