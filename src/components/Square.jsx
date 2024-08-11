import './square.css'

const Square = ({children, updateBoard, index}) => {

  return (
    <div className='cell' onClick={() => { updateBoard(index) }}>
      <span>{children}</span>
    </div>
  )
}

export default Square
