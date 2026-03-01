import { useEffect, useState } from "react";
import { useUser } from "../context/userContext"
import CreatePuzzle from "../components/CreatePuzzle"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Game() {
  const [quote, setQuote] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [load, setLoad] = useState(true);
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
      <p>{quote}</p>
      <h1>Cipher Game</h1>
      {load ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Level: {user.level}</h3>
          <p><strong>your coins: </strong>{user?.coins}</p>
          <CreatePuzzle text={quote?.quote || ""} type={"level"} />
        </>
      )}
    </div>
  );
}

export default Game;
