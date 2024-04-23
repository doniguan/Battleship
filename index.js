//последняя клетка не нажимается
//счётчик кораблей
//определение победы и вывод сообщения
//координаты рядом с подстреленными кораблями

let playerCells = []
let computerCells = []
let computerCoordinates = []
let playerCoordinates = []

let firstMoveIsHuman = false

let shipIcon = 'O'
let hitIcon = 'X'
let missIcon = '·'

shipsCheck = 0

onload = function () {
  playerCells = document.getElementsByClassName('playerCell')
  computerCells = document.getElementsByClassName('computerCell')

  const random = randomNum(1)
  if (random === 1) {
    firstMoveIsHuman = true
  }

  shipsPlacing(playerCoordinates)
  shipsPlacing(computerCoordinates)

  for (let i = 0; i < computerCells.length; i++) {
    computerCells[i].addEventListener("click", function () {
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

  for (let j = 0; j < size; j++) {
    if (table === playerCoordinates) {
      playerCoordinates.push(i + j * mult)
    } else {
      computerCoordinates.push(i + j * mult)
    }
  }

  shipsCheck++
  return true
}

checkShipsNear = function (table, random) {
  if (random === 0) {
    return (
      table.includes(random + 1) ||
      table.includes(random + 10) ||
      table.includes(random + 11)
    )
  }

  if (random === 9) {
    return (
      table.includes(random - 1) ||
      table.includes(random + 10) ||
      table.includes(random + 9)
    )
  }

  if (random === 90) {
    return (
      table.includes(random + 1) ||
      table.includes(random - 10) ||
      table.includes(random - 9)
    )
  }

  if (random === 99) {
    return (
      table.includes(random - 1) ||
      table.includes(random - 10) ||
      table.includes(random - 11)
    )
  }

  if (random > 0 && random < 9) {
    return (
      table.includes(random - 1) ||
      table.includes(random + 1) ||
      table.includes(random + 9) ||
      table.includes(random + 10) ||
      table.includes(random + 11)
    )
  }

  if (random > 90 && random < 99) {
    return (
      table.includes(random - 1) ||
      table.includes(random + 1) ||
      table.includes(random - 9) ||
      table.includes(random - 10) ||
      table.includes(random - 11)
    )
  }

  if (random % 10 === 0 && random !== 0 && random !== 90) {
    return (
      table.includes(random - 10) ||
      table.includes(random - 9) ||
      table.includes(random + 1) ||
      table.includes(random + 10) ||
      table.includes(random + 11)
    )
  }

  if ((random + 1) % 10 === 0 && random !== 9 && random !== 99) {
    return (
      table.includes(random - 10) ||
      table.includes(random - 11) ||
      table.includes(random - 1) ||
      table.includes(random + 10) ||
      table.includes(random + 9)
    )
  }
  return (
    table.includes(random - 11) ||
    table.includes(random - 10) ||
    table.includes(random - 9) ||
    table.includes(random - 1) ||
    table.includes(random + 1) ||
    table.includes(random + 9) ||
    table.includes(random + 10) ||
    table.includes(random + 11)
  )
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
  return Math.round(Math.random() * max);
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
