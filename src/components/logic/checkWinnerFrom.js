import { winCombinations } from "../../constants";

/**
* | funcion para checkear el ganador
* @param {Array} boardToCheck a revisar
*/
const checkWinner = (boardToCheck) => { 
    for (const combination of winCombinations) {
        // console.log(combination);
        const [a, b, c] = combination;
        if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a];
        }
    }
    return null;
};

export default checkWinner;