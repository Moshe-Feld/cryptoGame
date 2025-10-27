import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import CreatePuzzle from "../src/components/CreatePuzzle"
import axios from "axios";

function App() {
  const [quote, setQuote] = useState(null);
  const [load, setLoad] = useState(true);
  const[show, setShow] = useState(false);
  const {user} = useUser();
  
  

  useEffect(() => {
    let ignore = false;
    const fetchQuote = async () => {
      try {
        console.log(user);
        const randomData = await axios.get(
          `https://dummyjson.com/quotes/${user.level}`
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
          <p><strong>your coins: </strong>{user?.coins}</p> 
          <button style={{margin:"10px"}} onClick={() => {setShow(!show)}}>show Qoute</button>
          {show ? <><strong>Quote:</strong> {quote?.quote}</> : <></>}
          <CreatePuzzle text={quote?.quote || ""} />
        </>
      )}
    </div>
  );
}

export default App;
