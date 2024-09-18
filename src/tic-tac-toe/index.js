import "./index.css";
import useTicTacToe from "./hooks";

const TicTacToe = () => {
  const { board, handleButton, getStatus } = useTicTacToe();
  return (
    <section>
      <p>{getStatus()}</p>
      <section className="section">
        {board.map((b, i) => {
          return (
            <button
              disabled={b !== null}
              onClick={() => handleButton(i)}
              key={i}
              className="button"
            >
              {b}
            </button>
          );
        })}
      </section>
    </section>
  );
};

export default TicTacToe;
