//последняя клетка не нажимается
//счётчик кораблей
//определение победы и вывод сообщения
//координаты рядом с подстреленными кораблями

let playerCells = []
let computerCells = []
let computerCoordinates = []
let playerCoordinates = []

class Ship {
  size
  player
  coordinates = []
}

let firstMoveIsHuman = false

let shipIcon = 'O'
let hitIcon = 'X'
let missIcon = '·'

shipsCheck = 0

let playerOneDeckCounter = 0
let playerTwoDeckCounter = 0
let playerThreeDeckCounter = 0
let playerFourDeckCounter = 0

let computerOneDeckCounter = 0
let computerTwoDeckCounter = 0
let computerThreeDeckCounter = 0
let computerFourDeckCounter = 0

let player4DeckCell
let player3DeckCell
let player2DeckCell
let player1DeckCell

let computer4DeckCell
let computer3DeckCell
let computer2DeckCell
let computer1DeckCell

onload = function () {
  playerCells = document.getElementsByClassName('playerCell')
  computerCells = document.getElementsByClassName('computerCell')

player4DeckCell = document.getElementById('player4Deck')
player3DeckCell = document.getElementById('player3Deck')
player2DeckCell = document.getElementById('player2Deck')
player1DeckCell = document.getElementById('player1Deck')

computer4DeckCell = document.getElementById('computer4Deck')
computer3DeckCell = document.getElementById('computer3Deck')
computer2DeckCell = document.getElementById('computer2Deck')
computer1DeckCell = document.getElementById('computer1Deck')

  const random = randomNum(1)
  if (random === 1) {
    firstMoveIsHuman = true
  }

  shipsPlacing(playerCoordinates)
  shipsPlacing(computerCoordinates)

  for (let i = 0; i < computerCells.length; i++) {
    computerCells[i].addEventListener('click', function () {
      humanMove(this, i)
    })
  }

  if (!firstMoveIsHuman) {
    computerMove(playerCells)
  }
}

humanMove = function (item, i) {
  if (item.hasChildNodes()) {
    return false
  }
  if (computerCoordinates.includes(i)) {
    createHitCell(item)
    return true
  } else {
    createMissCell(item)
    computerMove(playerCells)
  }
}

computerMove = function (table) {
  while (true) {
    const random = randomNum(table.length - 1)
    if (!table[random].hasChildNodes()) {
      createMissCell(table[random])
      return false
    } else {
      if (table[random].innerHTML === shipIcon) {
        createHitCell(table[random])
      }
    }
  }
}

shipsPlacing = function (table) {
  shipsCheck = 0
  while (shipsCheck < 1) {
    shipPlacing(table, 4)
  }

  for (let i = 0; i < 2; i++) {
    shipsCheck = 0
    while (shipsCheck < 1) {
      shipPlacing(table, 3)
    }
  }

  check = false
  for (let i = 0; i < 3; i++) {
    shipsCheck = 0
    while (shipsCheck < 1) {
      shipPlacing(table, 2)
    }
  }

  check = false
  for (let i = 0; i < 4; i++) {
    shipsCheck = 0
    while (shipsCheck < 1) {
      shipPlacing(table, 1)
    }
  }

  if (table === playerCoordinates) {
    for (let i = 0; i < playerCoordinates.length; i++) {
      createShipCell(playerCells, playerCoordinates, i)
    }
  }
}

shipPlacing = function (table, size) {
  const randomPlus = randomNum(1)

  let mult = 1

  if (randomPlus === 0) {
    mult = 10
  }
  let randomX = randomNum(9)
  let randomY = randomNum(9)

  let i = randomX + randomY * 10

  if (table === playerCoordinates) {
    if (table.value?.includes(i)) {
      return false
    }
  }
  if (mult === 1) {
    if (randomX + size * mult > 10) {
      return false
    }
  }
  if (mult === 10) {
    if (randomY * 10 + size * mult > 100) {
      return false
    }
  }

  for (let j = 0; j < size; j++) {
    if (checkShipsNear(table, i + j * mult)) {
      return false
    }
  }

  shipCounter(table, size)

  let ship = new Ship()
  ship.size = size

  for (let j = 0; j < size; j++) {
    table.push(i + j * mult)
    ship.coordinates.push(i + j * mult)
  }
  if (table === playerCoordinates) {
    ship.player = true
  } else {
    ship.player = false
  }

  shipsCheck++
  return true
}

shipCounter = function(table, size) {
  if (table === playerCoordinates) {
    if (size === 4) {
      playerFourDeckCounter++
    }
    if (size === 3) {
      playerThreeDeckCounter++
    }
    if (size === 2) {
      playerTwoDeckCounter++
    }
    if (size === 1) {
      playerOneDeckCounter++
    }
  } else {
    if (size === 4) {
      computerFourDeckCounter++
    }
    if (size === 3) {
      computerThreeDeckCounter++
    }
    if (size === 2) {
      computerTwoDeckCounter++
    }
    if (size === 1) {
      computerOneDeckCounter++
    }
  }
}

checkShipsNear = function (table, random) {
  let cellsToCheck = []
  if (random === 0) {
    cellsToCheck = [random + 1, random + 10, random + 11]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random === 9) {
    cellsToCheck = [random - 1, random + 10, random + 9]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random === 90) {
    cellsToCheck = [random + 1, random - 10, random - 9]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random === 99) {
    cellsToCheck = [random - 1, random - 10, random - 11]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random > 0 && random < 9) {
    cellsToCheck = [
      random + 1,
      random + 10,
      random + 11,
      random - 1,
      random + 9,
    ]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random > 90 && random < 99) {
    cellsToCheck = [
      random + 1,
      random - 10,
      random - 11,
      random - 1,
      random - 9,
    ]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if (random % 10 === 0 && random !== 0 && random !== 90) {
    cellsToCheck = [
      random + 1,
      random + 10,
      random + 11,
      random - 10,
      random - 9,
    ]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  if ((random + 1) % 10 === 0 && random !== 9 && random !== 99) {
    cellsToCheck = [
      random - 11,
      random - 10,
      random + 11,
      random - 1,
      random + 9,
    ]
    return cellsToCheck.some((cell) => {
      return table.includes(cell)
    })
  }

  cellsToCheck = [
    random + 1,
    random + 10,
    random + 11,
    random - 1,
    random + 9,
    random - 9,
    random - 10,
    random - 11,
  ]
  return cellsToCheck.some((cell) => {
    return table.includes(cell)
  })
}

createShipCell = function (table, coordinates, i) {
  table[coordinates[i]].innerHTML = shipIcon
  table[coordinates[i]].style.outline = '3px dotted'
}

createHitCell = function (item) {
  item.innerHTML = hitIcon
  item.style.outline = '3px dotted'
  item.style.backgroundColor = '#FA8072'
}

createMissCell = function (item) {
  item.style.fontSize = '70px'
  item.innerHTML = missIcon
}

randomNum = function (max) {
  return Math.round(Math.random() * max)
}

// winnerChk = function (item) {
//   if (item.innerHTML === humanIcon) {
//     return true;
//   } else {
//     return false;
//   }
// };

// winShowing = function () {
//   resultMessage.style.display = "block";

//   if (winnerIsHuman) {
//     resultMessage.innerHTML = "Ð’Ñ‹ Ð²Ñ‹Ð¸Ð³Ñ€Ð°Ð»Ð¸!";
//     resultMessage.style.color = "green";
//   } else {
//     resultMessage.innerHTML = "Ð’Ñ‹ Ð¿Ñ€Ð¾Ð¸Ð³Ñ€Ð°Ð»Ð¸.";
//     resultMessage.style.color = "red";
//   }
// };
