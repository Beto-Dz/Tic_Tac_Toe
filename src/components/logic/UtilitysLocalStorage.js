export const saveGameLocalStorage = (board, turn) => { 
    //guardamos la partida en el localStorage
    window.localStorage.setItem('board', JSON.stringify(board));
    //guardamos directamente el turn como string
    window.localStorage.setItem('turn', turn);
};

export const removeGameFromLocalStorage = (board, turn) => { 
    window.localStorage.removeItem(board);
    window.localStorage.removeItem(turn);
};