window.addEventListener('load', easy)
const asianList ='https://random-word-api.herokuapp.com/word?number=100&lang=zh'
const mediumList ='https://random-word-api.herokuapp.com/word?number=100'

const wordListElement = document.getElementById("word-list") 
const userInput = document.getElementById("user-input")
const timerElement = document.getElementById("timer")
const retry = document.getElementById('retry')

 const words = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
let result = "";
let score = 0;
let isPlaying = true;
let time = 15
timeCheck = setInterval(countdown, 1000)
typingCheck = setInterval(isTyping,1000)
let difficulty = 'medium'
let list = []
let typing = false;

function easy() {
  time = 15
  timerElement.innerText = time;
  clearInterval(timeCheck)
  clearInterval(typingCheck)
  score = 0
  typing = false
  init('easy')
  
}
function medium(){
  time = 15
  timerElement.innerText = time;
  clearInterval(timeCheck)
  clearInterval(typingCheck)
  score = 0
  typing = false
  init('medium')
  
}
function asian(){
  time = 5
  timerElement.innerText = time;
  clearInterval(timeCheck)
  clearInterval(typingCheck)
  score = 0
  typing = false
  init('asain')
  
}


async function getRandomWords(difficulty){
  if(difficulty === 'asain'){
    let response = await fetch(asianList)
    return response.json()
  }
  else if(difficulty === 'medium'){
    let response = await fetch(mediumList)
    return response.json()
  }
  else return words;
}

async function renderNextList(difficulty){
  list = []
  result = ""
  list = await getRandomWords(difficulty)
  console.log(list)
  list.forEach(word=>{
    result += word + " "
  })
  wordListElement.innerHTML = ''

  result.split('').forEach(character=>{
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    wordListElement.appendChild(characterSpan)
  })

  userInput.value = null
}

function countdown(){
  if(time > 0){
    time--;
  }
  else if(time === 0){
    isPlaying = false;
  }
  timerElement.innerText = time;
}

function checkStatus(){
  if(!isPlaying && time === 0){
    wordArray = wordListElement.querySelectorAll('span')
    inputValue = userInput.value.split('')
    wordArray.forEach((characterSpan, index) =>{
      const character = inputValue[index]
  
      if(character === characterSpan.innerText)
        score++
      })
    wordListElement.innerText = "Game over !!! \n "
    wordListElement.innerText += "Avg. WPM  " + (score/5)*4
    userInput.value = ''
    retry.style.visibility='visible'
  }
}

function isTyping(){
  if(userInput.value !== ""){
    typing = true
    timeCheck = setInterval(countdown, 1000)
    clearInterval(typingCheck)
  }
}

let wordArray = []
let inputValue = []


function init(difficulty){
  isPlaying = true
  
  renderNextList(difficulty)
  stat = setInterval(checkStatus, 50)
  if(!typing){
    typingCheck= setInterval(isTyping, 1000)
  }
  
  

  if(isPlaying){
    //timeCheck = setInterval(countdown, 1000) 
    
    userInput.addEventListener('input', ()=>{
    wordArray = wordListElement.querySelectorAll('span')
    inputValue = userInput.value.split('')
    wordArray.forEach((characterSpan, index) =>{
      const character = inputValue[index]
  
      if(character == null){
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
      } 
      else if(character === characterSpan.innerText){
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
        
      }
      else{
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        }
      })
    })
  }
}


