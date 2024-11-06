const state = {
  view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
  },
  values:{
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
    currentLife: 3,
  },
  actions:{
    timeId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
}


function countDown(){
  state.values.currentTime --;
  state.view.timeLeft.textContent = state.values.currentTime;
// Verifica se o tempo ou a vida está menor ou igual a zero, dando gameover
  if(state.values.currentTime <= 0 || state.values.currentLife <= 0){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    state.values.hitPosition = null;
    alert("Game over! O seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName){
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}


function randomSquare(){
  // Remove a classe "enemy" de todos os quadrados
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
  // Escolhe um quadrado aleatório e o define como "enemy"
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", ()=>{
      if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        // Perde uma vida, se não acertar a posição correta
      }else if(state.values.currentLife > 0){
        state.values.currentLife--;
        state.view.life.textContent = state.values.currentLife;
      };
    });
  });
}

function init(){
  addListenerHitBox();
}

init();