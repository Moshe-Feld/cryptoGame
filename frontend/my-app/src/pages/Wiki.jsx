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
        <div>
            <div className="game-header">
                <h1>Mystery Cipher</h1>
                <h2>{category.toUpperCase()}</h2>
                <h3>Level: {currentLevel}</h3>
            </div>
            {load ? <p>Loading...</p> : (
                <>
                    {/* <button onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"} hint
                    </button>
                    {show && <p><strong>Hint:</strong> {hiddenTitle}</p>} */}

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