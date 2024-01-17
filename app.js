let randomSort
const cardsArray = [
    {
        name:'bee',
        img:'images/bee.png'
    },
    {
        name:'beetle',
        img:'images/beetle.png'
    },
    {
        name:'bird',
        img:'images/bird.png'
    },
    {
        name:'leaf',
        img:'images/leaf.png'
    },
    {
        name:'orange-flower',
        img:'images/orange-flower.png'
    },
    {
        name:'pink-flower',
        img:'images/pink-flower.png'
    },
    {
        name:'slug',
        img:'images/slug.png'
    },
    {
        name:'watering-pot',
        img:'images/watering-pot.png'
    },
    {
        name:'bee',
        img:'images/bee.png'
    },
    {
        name:'beetle',
        img:'images/beetle.png'
    },
    {
        name:'bird',
        img:'images/bird.png'
    },
    {
        name:'leaf',
        img:'images/leaf.png'
    },
    {
        name:'orange-flower',
        img:'images/orange-flower.png'
    },
    {
        name:'pink-flower',
        img:'images/pink-flower.png'
    },
    {
        name:'slug',
        img:'images/slug.png'
    },
    {
        name:'watering-pot',
        img:'images/watering-pot.png'
    }
]

randomSort = cardsArray.sort(() => 0.5 - Math.random())

//advanced way to shuffle (use shuffle theoretically) using fisher-yates for shuffle algorithm (more unbiasd to any sorting algorithm) 

// let newArray = [...cardsArray];
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//         console.log('shuffle process', [array[i], array[j]] );
//         console.log(`process newArray i=${i} i step ${array.length-i}`, JSON.stringify(array))
//     }
// }
// shuffleArray(newArray)
// console.log('shuffle result', newArray)
// console.log('cardsArray', cardsArray)
let selectedCards = []
let selectedCardsId = []
const winArray =[]

const gridDiv = document.querySelector('#grid')
const score = document.querySelector('#score')
let currentScore = 0
score.innerHTML= currentScore
function initiateElements () {
    
    for(let i = 0 ; i < randomSort.length ; i++){
        const card = document.createElement('img')
        card.setAttribute('src', randomSort[i].img)
        card.setAttribute('data-id' , i)
        // card.setAttribute('class', 'card')
        card.classList.add('card')
        gridDiv.appendChild(card)
        setTimeout(() => {
            card.setAttribute('src', 'images/blank.png')
         }, 100 * (i+1))
         setTimeout( () => {
            card.classList.add('pointer')
            card.addEventListener('click', onCardClick)
            }, 4000)
    }
    //or by forEach
    // randomSort.forEach((_, i) => {
    //     const card = document.createElement('img')
    //     card.setAttribute('src', 'images/blank.png')
    //     card.setAttribute('data-id' , i)
    // card.setAttribute('class', 'card')
    //     gridDiv.appendChild(card)
    // })
}
initiateElements()

function chackMatch () {
    const cards = document.querySelectorAll('img')
    if (selectedCardsId[0] == selectedCardsId[1]){
        const audio = new Audio('sounds/same.wav')
        audio.play()
        const alert = document.querySelector('.alert-div1')
        alert.classList.remove('displayNone')
        cards[selectedCardsId[0]].setAttribute('src', 'images/blank.png')
        selectedCards = []
        selectedCardsId = []
        return
    }
    if(selectedCards[0] == selectedCards [1]) {
        const audio = new Audio('sounds/correct.wav')
        audio.play()
        cards[selectedCardsId[0]].setAttribute('src', 'images/correct.png')
        cards[selectedCardsId[1]].setAttribute('src', 'images/correct.png')
        cards[selectedCardsId[0]].removeEventListener('click', onCardClick)
        cards[selectedCardsId[1]].removeEventListener('click', onCardClick)  
        currentScore += 2
        score.innerHTML= currentScore
        winArray.push(selectedCards)
        if(winArray.length === randomSort.length/2){
            const winAudio = new Audio('sounds/win.wav')
            winAudio.play()
            const alert = document.querySelector('.alert-div')
            alert.classList.remove('displayNone')
        }
    } else {
        const audio = new Audio('sounds/wrong.wav')
        audio.play()
        cards[selectedCardsId[0]].setAttribute('src', 'images/blank.png')
        cards[selectedCardsId[1]].setAttribute('src', 'images/blank.png')
        currentScore -= 1
        score.innerHTML= currentScore
    }
    selectedCards= []
    selectedCardsId = []
}

function onCardClick () {
    const audio = new Audio('sounds/click.wav')
    audio.play()
    const cardId = this.getAttribute('data-id')
    selectedCards.push(randomSort[cardId].name)
    selectedCardsId.push(cardId)
    this.classList.add('border')
    // selectedCards.push(cardId)
    this.setAttribute('src', randomSort[cardId].img)
    if(selectedCards.length === 2) {
        setTimeout(chackMatch, 500)
    }
}

