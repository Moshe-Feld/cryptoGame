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
                const topicList = [
                    "Computer", "Internet", "Artificial intelligence", "Israel", "Music",
                    "Physics", "Mathematics", "History", "Science", "Technology"
                ];
                const topic = topicList[user.level % topicList.length];

                // 1️⃣ ניסיון ראשון: ויקיפדיה ישירה
                const mainUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
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

                // // // 2️⃣ ניסיון שני: דרך פרוקסי ציבורי
                // try {
                //     const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(mainUrl)}`;
                //     const { data } = await axios.get(proxyUrl);
                //     const parsed = JSON.parse(data.contents);
                //     if (!ignore) setWiki({ wiki: parsed.extract });
                //     return;
                // } catch (err) {
                //     console.warn("Proxy Wikipedia API failed:", err.message);
                // }

                // // 3️⃣ ניסיון שלישי: גיבוי מקומי
                // const backupSummaries = [
                //     { wiki: "Albert Einstein was a theoretical physicist who developed the theory of relativity." },
                //     { wiki: "A computer is an electronic device that manipulates information or data." },
                //     { wiki: "The Internet is a global system of interconnected computer networks." }
                // ];
                // const randomBackup = backupSummaries[Math.floor(Math.random() * backupSummaries.length)];
                // if (!ignore) setWiki(randomBackup);

            } catch (err) {
                console.error("Error fetching wiki:", err);
            } finally {
                setLoad(false);
            }
        };

        fetchwiki();
        return () => { ignore = true };
    }, [user.level]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Random wiki Game</h1>
            <h2>{title}</h2>
            {load ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>Level: {user.level}</h3>
                    <p><strong>your coins: </strong>{user?.coins}</p>
                    <button style={{ margin: "10px" }} onClick={() => { setShow(!show) }}>show Qoute</button>
                    {show ? <><strong>wiki:</strong> {wiki?.wiki}</> : <></>}
                    <CreatePuzzle text={memoWiki} />
                </>
            )}
        </div>
    );
}

export default Wiki;
