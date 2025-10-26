function Header({ score, bestScore }) {
    return (
        <>
            <div id={"header"}>
                <div id={"logo"}>Memory Game</div>
                <div id={"scores"}>Score: {score} | Best Score: {bestScore}</div>
            </div>
        </>
    )
}

export default Header;