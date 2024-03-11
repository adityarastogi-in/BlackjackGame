let cards = []
let sum = 0
let betVal = 0
let hasBlackJack = false
let isAlive = false
let message = ""
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const warnEl = document.getElementById("warning-el")
const betEl = document.getElementById("betMoney")

// console.log(betVal)

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    betVal = betEl.value
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = cards[0] + cards[1]
    betVal -= 10
    betEl.value = betVal
    if(betVal === 0){
        setTimeout(function() {
            warnEl.textContent = "YOU lose!!!";
            warnEl.classList.add("warning")
          }, 0); 
        setTimeout(function() {
            location.reload()
          }, 1500);
          
    }else{
        renderGame()
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: -"
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + "-"
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        betVal *= 2
        betEl.value = betVal
        setTimeout(function() {
            warnEl.textContent = "YOU WON!!!";
            warnEl.classList.add("warning")
          }, 0); 
          setTimeout(function() {
            warnEl.textContent = "";
          }, 1500);
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }else{
        setTimeout(function() {
            warnEl.textContent = "**Start a new a game**";
            warnEl.classList.add("warning")
          }, 0); 
          setTimeout(function() {
            warnEl.textContent = "";
          }, 1500);
    }
}
