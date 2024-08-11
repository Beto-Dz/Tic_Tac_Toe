import { useState } from 'react'
import './App.css'
import Square from './components/Square';
import confetti from 'canvas-confetti';
import { TURNS } from './constants';
import checkWinner from './components/logic/checkWinnerFrom';
import WinnerModal from './components/WinnerModal';
import {saveGameLocalStorage, removeGameFromLocalStorage} from './components/logic/UtilitysLocalStorage';


function App() {
  // ! estado para el tablero, recupera el tablero si existe en el localStorage
  const [board, setBoard] = useState(() => {
    const boardFromLS = localStorage.getItem('board');
    return boardFromLS ? JSON.parse(boardFromLS) : Array(9).fill(null);
  });
  // ! estado para definir el turno
  const [turn, setTurn] = useState(() => { 
      const turnFromLocal = localStorage.getItem('turn');
      return turnFromLocal || TURNS.X;
  });
  // ! estado para el ganador
  const [winner, setWinner] = useState(null);
  //define la clase para el fondo del span turno
  const turnActive = (turnSpan) =>  turn === turnSpan ? "turn_active" : "";

  /**
   * | Funcion para reinciiar el juego / resetea los estados
   */
  const resetGame = () => { 
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    removeGameFromLocalStorage('board', 'turn');
  };

  /**
   *| Funcion para checkear si el juego ha terminado
   * @param {Array} board 
   */
  const checkEndGame = (board) => { 
    //si todos los elementos de array tienen un valor diferente de null, el juego ha terminado
    return board.every(square =>  square !==  null );
  };


  /**
   * | Funcion para actualizar el tablero
   * @param {Number} index del array/celda donde se va a actualizar el valor
   */
  const helperUpdateBoard = (index) => {
      // si ya existe un valor en el indice al que hicimos click, salimos (para no sobreescribir) o si existe un ganador
      if(board[index] || winner) return;
      // desestructuramos el array del estado
      const newBoard = [...board];
      //modificamos el valor del array en el que se hizo click con el turno actual
      newBoard[index] = turn;
      //actualizamos el tablero
      setBoard(newBoard);
      //definimos el siguiente turno
      const nextTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      //actualizamos el turno
      setTurn(nextTurn);
      //checkeamos si existe un ganador
      const newWinner = checkWinner(newBoard);
      saveGameLocalStorage(newBoard, nextTurn);
      // si existe un resultado de ganador, actualiza el estado
      if(newWinner){
        setWinner(newWinner);
        confetti();
      }else if(checkEndGame(newBoard)){
        setWinner(false); 
      }
  };

  return (
    <>
      <main className='main'>
        <h1 className='title'>Tic Tac Toe</h1>
        <button className='resetGameBtn' onClick={resetGame}>Reiniciar Juego</button>
        <div className='container'>
          {
            board.map((valor , index) => {
              return (
                < Square updateBoard={helperUpdateBoard} index={index} key={index}>
                  {valor}
                  {/* {board[index]} */}
                </Square>
              )
            })
          }
        </div>
        <h3 className='title_turn'>Turno: <span className={`turn ${turnActive(TURNS.X)}`}>{TURNS.X}</span>
          <span className={`turn ${turnActive(TURNS.O)}`}>{TURNS.O}</span>
        </h3>
      </main>
      < WinnerModal winner={winner} resetGame={resetGame} />
    </>
  )
}

export default App
