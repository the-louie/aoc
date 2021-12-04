const fs = require('fs')
const c = require('../common')

const testData = c.bufToStrArr(fs.readFileSync('./testData2.txt'))
const realData = c.bufToStrArr(fs.readFileSync('./input.txt'))

const sumAllUnmarked = (board) => board.reduce((rowAcc, row) => rowAcc + row.reduce((colAcc, col) => col !== undefined ? colAcc + col : colAcc, 0), 0)

const one = (data) => {
  const numbers = data.shift().split(',').map(n => Number(n))
  let boards = []
  while (data.length > 0) {
    boards.push(data.splice(0, 5).map(row => row.replace(/ +/g, ' ').replace(/^ +/, '').split(' ').map(c => Number(c))))
  }

  numbers.some((number) => {
    // Update board
    boards = boards.map((board, i) => board.map((row) => row.map(boardNum => boardNum === number ? undefined : boardNum)))

    return boards.some((board, i) => {
      // check cols and rows
      const bingo = board.some(boardRow => boardRow.every(boardNum => boardNum === undefined)) || transpose(board).some(boardRow => boardRow.every(boardNum => boardNum === undefined))

      // If we had bingo, then we're done!
      if (bingo) {
        console.log('result 1', number * sumAllUnmarked(board))
        return true
      }
      return false
    })
  })
}

const transpose = arr => arr[0].map((_x, i) => arr.map(x => x[i]))

const two = (data) => {
  const numbers = data.shift().split(',').map(n => Number(n))
  let boards = []
  while (data.length > 0) {
    boards.push(data.splice(0, 5).map(row => row.replace(/ +/g, ' ').replace(/^ +/, '').split(' ').map(c => Number(c))))
  }
  const winningBoards = []
  return numbers.some((number) => {
    // Update board
    boards = boards.map((board) => board.map((row) => row.map(boardNum => boardNum === number ? undefined : boardNum)))

    return boards.some((board, boardI) => {
      // skip already winning boards
      if (winningBoards.includes(boardI)) { return false }

      // check cols and rows
      const bingo = board.some(boardRow => boardRow.every(boardNum => boardNum === undefined)) || transpose(board).some(boardRow => boardRow.every(boardNum => boardNum === undefined))

      // If we had bingo, and it is the last board, then we're done!
      if (bingo) {
        winningBoards.push(boardI)
        if (winningBoards.length === boards.length) {
          console.log('result 2', number * sumAllUnmarked(boards[winningBoards[winningBoards.length - 1]]))
          return true
        }
      }

      return false
    })
  })
}

one(testData.slice())
one(realData.slice())
two(testData.slice())
two(realData.slice())
