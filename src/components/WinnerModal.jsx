const WinnerModal = ({ winner, resetGame }) => {
    if (winner === null) return;

    const winnerText = winner === false ? "Empate!" : winner;

    return (
        <section className="modal">
        <h4>Ganó: </h4>
        <span className="turn">{winnerText}</span>
        <button className="resetGameBtn" onClick={resetGame}>
            Reiniciar Juego
        </button>
        </section>
    );
};

export default WinnerModal;
