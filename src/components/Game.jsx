import {useState} from "react";

function Game({ score, bestScore, setScore, setBestScore }) {
    const initialCards = [
        {id: 1, name: "Yuji"},
        {id: 2, name: "Gojo"},
        {id: 3, name: "Sukuna"}
    ];


    const [cards, setCards] = useState(initialCards);
    const [clickedCards, setClickedCards] = useState([]);

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
        <>
            {
                cards.map((card) => (
                    <Card key={card.id} handleCardClick={() => handleCardClick(card)} card={card.name}></Card>
                ))
            }
        </>
    )
}

function Card( {handleCardClick, card} ) {

    return (
        <>
            <div onClick={handleCardClick}>{card}</div>
        </>
    )
}

export default Game