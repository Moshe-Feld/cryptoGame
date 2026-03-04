// import { useEffect, useState, useMemo } from "react";
// import { useUser } from "../context/userContext";
// import { useParams } from "react-router-dom";
// import CreatePuzzle from "../components/CreatePuzzle";
// import axios from "axios";

// function Wiki() {
//     const [wikiText, setWikiText] = useState(null);
//     const [title, setTitle] = useState("");
//     const [load, setLoad] = useState(true);
//     const [show, setShow] = useState(false);
//     const { user } = useUser();

//     const memoWiki = useMemo(() => wikiText, [wikiText]);
//     const { category } = useParams();



//     useEffect(() => {
//         let ignore = false;
//         const fetchwiki = async () => {
//             try {
//                 setLoad(true);
//                 const mainUrl = "https://en.wikipedia.org/w/api.php";
//                 const baseParams = {
//                     action: "query",
//                     format: "json",
//                     generator: "random",
//                     prop: "extracts|pageprops",
//                     exintro: "true",
//                     explaintext: "true",
//                     origin: "*",
//                 };

//                 if (category === "Random") {
//                     baseParams.grnnamespace = 0;
//                 }
//                 else {
//                     baseParams.grncategory = `Category:${category}`;
//                 }
//                 const { data } = await axios.get(mainUrl, { params: baseParams });
//                 if (!ignore && data.query && data.query.pages) {
//                     const pageId = Object.keys(data.query.pages)[0];
//                     const page = data.query.pages[pageId];
//                     if (page.extract && page.extract.trim() !== "" && !page.pageprops?.disambiguation) {
//                         setWikiText(page.extract);
//                         setTitle(page.title);
//                     } else {
//                         console.warn("Fetched empty extract, retrying...");
//                         fetchwiki();
//                     }
//                 }

//             } catch (err) {
//                 console.error("Error fetching wiki:", err);
//             } finally {
//                 if (!ignore) {
//                     setLoad(false);
//                 }
//             }
//         };

//         fetchwiki();
//         return () => { ignore = true };
//     }, [user?.wikiLevels, category]);

//     return (
//         <div style={{ padding: 20 }}>
//             <h1>Random wiki Game</h1>
//             <h2>category:{category}</h2>
//             <h2>{title}</h2>
//             {load ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <h3>wiki levels completed: {user.wikiLevels}</h3>
//                     <p><strong>your coins: </strong>{user?.coins}</p>
//                     <button style={{ margin: "10px" }} onClick={() => { setShow(!show) }}>show Qoute</button>
//                     {show ? <><strong>wiki:</strong> {wikiText}</> : <></>}
//                     <CreatePuzzle text={memoWiki} type={"wikiLevel"} />
//                 </>
//             )}
//         </div>
//     );
// }

// export default Wiki;

// import { useEffect, useState } from "react";
// import { useUser } from "../context/userContext";
// import { useParams } from "react-router-dom";
// import CreatePuzzle from "../components/CreatePuzzle";
// import axios from "axios";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// function getFirstSentence(text) {
//     const match = text.match(/^[^.!?]*[.!?]/);
//     return match ? match[0].trim() : text.slice(0, 200);
// }

// function hideTitleInSentence(sentence, title) {
//     const cleanTitle = title.replace(/\s*\(.*?\)/g, "").trim();
//     const escaped = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     return sentence.replace(new RegExp(escaped, "gi"), "???");
// }

// function Wiki() {
//     const [puzzleText, setPuzzleText] = useState(null);
//     const [hiddenTitle, setHiddenTitle] = useState("");
//     const [title, setTitle] = useState("");
//     const [load, setLoad] = useState(true);
//     const [show, setShow] = useState(false);
//     const [guessInput, setGuessInput] = useState("");
//     const [guessResult, setGuessResult] = useState(null);
//     const { user, editUser } = useUser();
//     const { category } = useParams();

//     const levelKey = category === "films" ? "filmLevel"
//         : category === "people" ? "peopleLevel"
//             : "placesLevel";

//     const currentLevel = user[levelKey] ?? 0;

//     useEffect(() => {
//         let ignore = false;
//         const fetch = async () => {
//             try {
//                 setLoad(true);
//                 setGuessResult(null);
//                 setGuessInput("");

//                 let pageTitle = "";

//                 if (category === "films") {
//                     const { data } = await axios.get(FILM_API);
//                     const members = data.query.categorymembers.filter(p =>
//                         !p.title.includes("Academy Award") &&
//                         !p.title.includes("List of")
//                     );
//                     const index = currentLevel % members.length;
//                     pageTitle = members[index - 1].title;

//                 } else if (category === "people") {
//                     const { data } = await axios.get(
//                         `https://randomincategory.toolforge.org/?category=Wikipedia%20level-3%20vital%20articles%20in%20People&server=en.wikipedia.org&returntype=subject&format=json&origin=*`
//                     );
//                     pageTitle = data.title;

//                 } else if (category === "places") {
//                     const { data } = await axios.get(
//                         `https://randomincategory.toolforge.org/?category=Wikipedia%20level-3%20vital%20articles%20in%20Geography&server=en.wikipedia.org&returntype=subject&format=json&origin=*`
//                     );
//                     pageTitle = data.title;
//                 }

//                 const wikiRes = await axios.get("https://en.wikipedia.org/w/api.php", {
//                     params: {
//                         action: "query",
//                         format: "json",
//                         titles: pageTitle,
//                         prop: "extracts",
//                         exintro: true,
//                         explaintext: true,
//                         origin: "*",
//                     }
//                 });

//                 if (!ignore) {
//                     const pages = wikiRes.data.query.pages;
//                     const page = pages[Object.keys(pages)[0]];
//                     if (page?.extract) {
//                         const sentence = getFirstSentence(page.extract);
//                         const hidden = hideTitleInSentence(sentence, page.title);
//                         setTitle(page.title);
//                         setHiddenTitle(hidden);
//                         setPuzzleText(hidden);
//                     }
//                 }
//             } catch (err) {
//                 console.error("Error fetching:", err);
//             } finally {
//                 if (!ignore) setLoad(false);
//             }
//         };

//         fetch();
//         return () => { ignore = true };
//     }, [currentLevel, category]);

//     const handleGuess = () => {
//         const cleanTitle = title.replace(/\s*\(.*?\)/g, "").trim().toLowerCase();
//         if (guessInput.trim().toLowerCase() === cleanTitle) {
//             setGuessResult("correct");
//             editUser(user, levelKey);
//         } else {
//             setGuessResult("wrong");
//         }
//     };
//     return (
//         <div style={{ padding: 20 }}>
//             <h1>Wiki Cipher</h1>
//             <h2>{category.toUpperCase()}</h2>
//             <h3>Level: {currentLevel}</h3>
//             <p><strong>Coins: </strong>{user?.coins}</p>

//             {load ? <p>Loading...</p> : (
//                 <>
//                     <button onClick={() => setShow(!show)}>
//                         {show ? "Hide" : "Show"} original sentence
//                     </button>
//                     {show && <p><strong>Original:</strong> {hiddenTitle}</p>}

//                     <CreatePuzzle
//                         text={puzzleText}
//                         type={levelKey}
//                     />

//                     <div style={{
//                         marginTop: 24,
//                         padding: "16px 20px",
//                         background: "#f0f4ff",
//                         borderRadius: 12,
//                         display: "inline-block",
//                         minWidth: 300
//                     }}>
//                         <h3 style={{ margin: "0 0 12px 0" }}>🎬 Guess the title!</h3>
//                         <div style={{ display: "flex", gap: 8 }}>
//                             <input
//                                 value={guessInput}
//                                 onChange={e => {
//                                     setGuessInput(e.target.value);
//                                     setGuessResult(null);
//                                 }}
//                                 onKeyDown={e => e.key === "Enter" && handleGuess()}
//                                 placeholder="Type your guess..."
//                                 style={{
//                                     padding: "8px 12px",
//                                     borderRadius: 8,
//                                     border: "1px solid #ccc",
//                                     fontSize: 16,
//                                     flex: 1
//                                 }}
//                             />
//                             <button
//                                 onClick={handleGuess}
//                                 style={{
//                                     padding: "8px 16px",
//                                     borderRadius: 8,
//                                     background: "#4f46e5",
//                                     color: "white",
//                                     border: "none",
//                                     cursor: "pointer",
//                                     fontSize: 16
//                                 }}
//                             >
//                                 Guess
//                             </button>
//                         </div>
//                         {guessResult === "correct" && (
//                             <p style={{ color: "green", marginTop: 10 }}>✅ Correct! It was: <strong>{title}</strong></p>
//                         )}
//                         {guessResult === "wrong" && (
//                             <p style={{ color: "red", marginTop: 10 }}>❌ Wrong, try again!</p>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Wiki;

import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { useParams } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB = "https://api.themoviedb.org/3";

function maskTitle(text, title) {
    const cleanTitle = title.replace(/\s*\(.*?\)/g, "").trim();
    const escaped = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const masked = cleanTitle.split("").map(ch => ch === " " ? " " : "_").join("");
    return text.replace(new RegExp(escaped, "gi"), masked);
}

function buildKnownForSentence(person) {
    const titles = person.known_for
        .map(item => item.title || item.name)
        .filter(Boolean);
    return `This person is known for ${titles.join(", ")}.`;
}

function Wiki() {
    const [puzzleText, setPuzzleText] = useState(null);
    const [hiddenTitle, setHiddenTitle] = useState("");
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const { user } = useUser();
    const { category } = useParams();

    const levelKey = category === "films" ? "filmLevel"
        : category === "people" ? "peopleLevel"
            : "tvLevel";

    const currentLevel = user[levelKey] ?? 0;

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            try {
                setLoad(true);

                const page = Math.floor(currentLevel / 20) + 1;
                const index = currentLevel % 20;

                if (category === "films") {
                    const { data } = await axios.get(
                        `${TMDB}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
                    );
                    const film = data.results[index - 1];
                    if (!ignore) {
                        const masked = maskTitle(film.overview, film.title);
                        setTitle(film.title);
                        setHiddenTitle(masked);
                        setPuzzleText(masked);
                    }

                } else if (category === "people") {
                    const { data } = await axios.get(
                        `${TMDB}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
                    );
                    const people = data.results.filter(p =>
                        p.known_for && p.known_for.length > 0 &&
                        p.profile_path !== null
                    );
                    const person = people[(index % people.length) - 1];
                    if (!ignore) {
                        const sentence = buildKnownForSentence(person);
                        const masked = maskTitle(sentence, person.name);
                        setTitle(person.name);
                        setHiddenTitle(masked);
                        setPuzzleText(masked);
                    }

                } else if (category === "tv") {
                    const { data } = await axios.get(
                        `${TMDB}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
                    );
                    const show = data.results[index - 1];
                    if (!ignore) {
                        const masked = maskTitle(show.overview, show.name);
                        setTitle(show.name);
                        setHiddenTitle(masked);
                        setPuzzleText(masked);
                    }
                }

            } catch (err) {
                console.error("Error fetching:", err);
            } finally {
                if (!ignore) setLoad(false);
            }
        };

        fetchData();
        return () => { ignore = true };
    }, [currentLevel, category]);


    return (
        <div style={{ padding: 20 }}>
            <h1>Wiki Cipher</h1>
            <h2>{category.toUpperCase()}</h2>
            <h3>Level: {currentLevel}</h3>
            <p><strong>Coins: </strong>{user?.coins}</p>

            {load ? <p>Loading...</p> : (
                <>
                    <button onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"} hint
                    </button>
                    {show && <p><strong>Hint:</strong> {hiddenTitle}</p>}

                    <CreatePuzzle
                        text={puzzleText}
                        type={levelKey}
                        titleToGuess={title}
                    />
                </>
            )}
        </div>
    );
}

export default Wiki;