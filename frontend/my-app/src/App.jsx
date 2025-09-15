import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import CreatePuzzle from "./components/CreatePuzzle";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState(null);
  const [load, setLoad] = useState(true);
  const {email} = useUser();
  
  

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
          <p><strong>your coins: </strong>{email.coins}</p>
          <CreatePuzzle text={quote?.quote || ""} />
        </>
      )}
    </div>
  );
}

export default App;
