let playerCells = []
let computerCells = []
let firstMoveIsHuman = false
hitIcon = 'X'
missIcon = '·'

onload = function () {
  playerCells = document.getElementsByClassName('playerCell')

  computerCells = document.getElementsByClassName('computerCell')

  const random = Math.floor(Math.random() * 2) + 1
  if (random === 1) {
    firstMoveIsHuman = true
  }

  for (let i = 0; i < playerCells.length; i++) {
    playerCells[i].addEventListener('click', function () {
      humanMove(this)
    })
  }

  if (!firstMoveIsHuman) {
    computerMove()
  }
}

humanMove = function (item) {
  if (item.hasChildNodes()) {
    return false
  }
  item.innerHTML = hitIcon;
  winnerFound = winChk()

  if (!winnerFound) {
    computerMove()
    winnerFound = winChk()
    if (!winnerFound) {
      if (!checkFreeSpace()) {
        drawShowing()
      }
    } else {
      winShowing()
    }
  } else {
    winShowing()
  }
}