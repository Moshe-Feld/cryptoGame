import { useEffect, useState } from "react";
import { useUser } from "./context/userContext";
import CreatePuzzle from "../src/components/CreatePuzzle"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [quote, setQuote] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate()


  useEffect(() => {
    let ignore = false;
    const fetchQuote = async () => {
      try {
        if(user.level >= 1400){
          alert("no more levels for you");
          navigate('/home');
          return
        }
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
  }, [user.level]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Random Quote Game</h1>
      {load ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Level: {user.level}</h3>
          <p><strong>your coins: </strong>{user?.coins}</p>
          <button style={{ margin: "10px" }} onClick={() => { setShow(!show) }}>show Qoute</button>
          {show ? <><strong>Quote:</strong> {quote?.quote}</> : <></>}
          <CreatePuzzle text={quote?.quote || ""} type={"level"} />
        </>
      )}
    </div>
  );
}

export default App;
