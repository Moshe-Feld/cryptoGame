import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [Quote, setQuote] = useState("");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchQuote = async () => {
      const randomData = await axios.get('https://dummyjson.com/quotes/random');
      if (!ignore) {
        setQuote(randomData.data);
      }
      setLoad(false);
    }
    fetchQuote();
    return () => {
      ignore = true;
    }

  }, [])
  return (
    <>
      {load ? <p>loading</p> : <p><strong>my random quote:</strong> {Quote.quote}</p>}
    </>
  )
}

export default App
