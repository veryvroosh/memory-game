function Header({ score, bestScore }) {
    return (
        <>
            <div>
                Score: {score} | Best Score: {bestScore}
            </div>
        </>
    )
}

export default Header;