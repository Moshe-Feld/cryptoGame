import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import CreatePuzzle from "../components/CreatePuzzle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Game.css';

function Game() {
  const [quote, setQuote] = useState("");
  const [load, setLoad] = useState(true);
  const [showModel, setShowModal] = useState(false)
  const { user } = useUser();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        if (user.level >= 1400) {
          navigate("/home");
          return;
        }
        const randomData = await axios.get(
          `https://dummyjson.com/quotes/${user.level}`
        );
        setQuote(randomData.data);
      } catch (err) {
        console.error("Error fetching quote:", err);
      } finally {
        setLoad(false);
      }
    };
    fetchQuote();
  }, [user.level]);

  if (load) {
    return (
      <div className="loading-container">
        <p>Loading your challenge...</p>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Cipher Game</h1>
        <h3>Level: {user.level}</h3>
        <p><strong>Your coins:</strong> {user?.coins || 0}</p>
      </div>


      <CreatePuzzle text={quote?.quote || ""} type={"level"} author={quote.author} />
    </div>
  );
}

export default Game;