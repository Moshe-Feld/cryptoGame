import { useEffect, useState } from "react";
import CipherSquares from "./components/CipherSquares";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState(null);
  const [load, setLoad] = useState(true);

  const code = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7,
    h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14,
    o: 15, p: 16, q: 17, r: 18, s: 19, t: 20,
    u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
  };

  useEffect(() => {
    let ignore = false;
    const fetchQuote = async () => {
      try {
        const randomData = await axios.get(
          "https://dummyjson.com/quotes/random"
        );
        if (!ignore) setQuote(randomData.data);
      } catch (err) {
        console.error("Error fetching quote:", err);
      } finally {
        setLoad(false);
      }
    };
    fetchQuote();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Random Quote Game</h1>
      {load ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            <strong>Quote:</strong> {quote?.quote}
          </p>
          <CipherSquares text={quote?.quote || ""} mapping={code} />
        </>
      )}
    </div>
  );
}

export default App;
