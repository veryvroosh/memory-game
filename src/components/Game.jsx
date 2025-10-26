import {useEffect, useState} from "react";

function Game({ score, bestScore, setScore, setBestScore }) {
    const initialCards = [
        {id: 1, name: "Yuji"},
        {id: 2, name: "Gojo"},
        {id: 3, name: "Sukuna"}
    ];

    const [cards, setCards] = useState(initialCards);
    const [clickedCards, setClickedCards] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const res = await fetch("https://api.jikan.moe/v4/anime/40748/characters");
                const data = await res.json();
                const sorted = data.data.sort((a, b) => b.favorites - a.favorites);
                const top12 = sorted.slice(0, 12).map((item) => {
                    const nameParts = item.character.name.split(", "); // ["Gojo", "Satoru"]
                    const properName =
                        nameParts.length === 2 ? `${nameParts[1]} ${nameParts[0]}` : item.character.name;

                    return {
                        id: item.character.mal_id,
                        name: properName,
                        img: item.character.images.jpg.image_url,
                        favorites: item.favorites
                    };
                });

                console.log(top12);
                setCards(top12);
            } catch(err) {
                console.error("error fetching data:", err)
            }
        }
        void fetchCharacters();
    }, []);

    const handleLose = () => {
        console.log("you lost")
        setClickedCards([]);
        setScore(0);
    }

    const updateScore = (card) => {
        const newScore = score + 1;
        setClickedCards([...clickedCards, card])
        setScore(newScore);
        if(newScore > bestScore) {
            setBestScore(newScore);
        }
    }

    const shuffleCards = () => {
        setCards(prevCards => [...prevCards].sort(() => Math.random() - 0.5))
    }

    const handleCardClick = (card) => {
        console.log(card.name)

        if(clickedCards.includes(card)) {
            handleLose();
        } else {
            updateScore(card);
            shuffleCards();
        }
    }

    return (
        <div id={"game"}>
            {
                cards.map((card) => (
                    <Card key={card.id} handleCardClick={() => handleCardClick(card)} card={card}></Card>
                ))
            }
        </div>
    )
}

function Card( {handleCardClick, card} ) {

    return (
        <div className={"card"} onClick={handleCardClick}>
            <img alt={card.name} src={card.img} className={"card-img"}/>
            <p>{card.name}</p>
        </div>
    )
}

export default Game