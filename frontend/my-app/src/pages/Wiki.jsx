import { useEffect, useState, useMemo } from "react";
import { useUser } from "../context/userContext";
import { useParams } from "react-router-dom";
import CreatePuzzle from "../components/CreatePuzzle";
import axios from "axios";

function Wiki() {
    const [wikiText, setWikiText] = useState(null);
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const { user } = useUser();

    const memoWiki = useMemo(() => wikiText, [wikiText]);
    const { category } = useParams();



    useEffect(() => {
        let ignore = false;
        const fetchwiki = async () => {
            try {
                setLoad(true);
                const mainUrl = "https://en.wikipedia.org/w/api.php";
                const baseParams = {
                    action: "query",
                    format: "json",
                    generator: "random",
                    prop: "extracts|pageprops",
                    exintro: "true",
                    explaintext: "true",
                    origin: "*",
                };

                if (category === "Random") {
                    baseParams.grnnamespace = 0;
                }
                else {
                    baseParams.grncategory = `Category:${category}`;
                }
                const { data } = await axios.get(mainUrl, { params: baseParams });
                if (!ignore && data.query && data.query.pages) {
                    const pageId = Object.keys(data.query.pages)[0];
                    const page = data.query.pages[pageId];
                    if (page.extract && page.extract.trim() !== "" && !page.pageprops?.disambiguation) {
                        setWikiText(page.extract);
                        setTitle(page.title);
                    } else {
                        console.warn("Fetched empty extract, retrying...");
                        fetchwiki();
                    }
                }

            } catch (err) {
                console.error("Error fetching wiki:", err);
            } finally {
                if (!ignore) {
                    setLoad(false);
                }
            }
        };

        fetchwiki();
        return () => { ignore = true };
    }, [user?.wikiLevels, category]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Random wiki Game</h1>
            <h2>category:{category}</h2>
            <h2>{title}</h2>
            {load ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>wiki levels completed: {user.wikiLevels}</h3>
                    <p><strong>your coins: </strong>{user?.coins}</p>
                    <button style={{ margin: "10px" }} onClick={() => { setShow(!show) }}>show Qoute</button>
                    {show ? <><strong>wiki:</strong> {wikiText}</> : <></>}
                    <CreatePuzzle text={memoWiki} type={"wikiLevel"} />
                </>
            )}
        </div>
    );
}

export default Wiki;
