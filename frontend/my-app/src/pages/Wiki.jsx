import { useEffect, useState, useMemo } from "react";
import { useUser } from "../context/userContext";
import CreatePuzzle from "../components/CreatePuzzle";
import axios from "axios";

function Wiki() {
    const [wiki, setWiki] = useState(null);
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(false);
    const { user } = useUser();

    const memoWiki = useMemo(() => wiki?.wiki || "", [wiki?.wiki]);



    useEffect(() => {
        let ignore = false;
        const fetchwiki = async () => {
            try {
                setLoad(true);
                // const topicList = [
                //     "Computer", "Internet", "Artificial intelligence", "Israel", "Music",
                //     "Physics", "Mathematics", "History", "Science", "Technology"
                // ];
                // const topic = topicList[user.level % topicList.length];

                const mainUrl = `https://en.wikipedia.org/api/rest_v1/page/random/summary`;
                try {
                    const { data } = await axios.get(mainUrl);
                    if (!ignore) {
                        setWiki({ wiki: data.extract });
                        setTitle(data.title);
                    }
                    return;
                } catch (err) {
                    console.warn("Main Wikipedia API failed:", err.message);
                }

            } catch (err) {
                console.error("Error fetching wiki:", err);
            } finally {
                setLoad(false);
            }
        };

        fetchwiki();
        return () => { ignore = true };
    }, [user?.wikiLevels]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Random wiki Game</h1>
            <h2>{title}</h2>
            {load ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>wiki levels completed: {user.wikiLevels}</h3>
                    <p><strong>your coins: </strong>{user?.coins}</p>
                    <button style={{ margin: "10px" }} onClick={() => { setShow(!show) }}>show Qoute</button>
                    {show ? <><strong>wiki:</strong> {wiki?.wiki}</> : <></>}
                    <CreatePuzzle text={memoWiki} type={"wikiLevel"} />
                </>
            )}
        </div>
    );
}

export default Wiki;
