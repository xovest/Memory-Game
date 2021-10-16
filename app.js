//grabbin the things we need
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
  { imgSrc: './images/chicago.jpg', name: 'chicago' },
  { imgSrc: './images/courtPurple.jpg', name: 'court purple' },
  { imgSrc: './images/dior.jpg', name: 'dior' },
  { imgSrc: './images/mocha.jpg', name: 'mocha' },
  { imgSrc: './images/pineGreen.jpg', name: 'pine green' },
  { imgSrc: './images/pollen.jpg', name: 'pollen' },
  { imgSrc: './images/smokeGrey.jpg', name: 'smoke grey' },
  { imgSrc: './images/universityBlue.jpg', name: 'university blue' },
  { imgSrc: './images/chicago.jpg', name: 'chicago' },
  { imgSrc: './images/courtPurple.jpg', name: 'court purple' },
  { imgSrc: './images/dior.jpg', name: 'dior' },
  { imgSrc: './images/mocha.jpg', name: 'mocha' },
  { imgSrc: './images/pineGreen.jpg', name: 'pine green' },
  { imgSrc: './images/pollen.jpg', name: 'pollen' },
  { imgSrc: './images/smokeGrey.jpg', name: 'smoke grey' },
  { imgSrc: './images/universityBlue.jpg', name: 'university blue' }
];

//randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//card generator function
const cardGenerator = () => {
  const cardData = randomize();
  
  //generating the html
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';

    //attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);

    //attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    });
  });
};

//check cards
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');

  //logic
  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
      console.log('match');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      console.log('wrong');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (!playerLives)
        restart('You lost, try again dawg');
    }
  }
  //run a check to see if you won or not
  if (toggleCard.length === 16) {
    restart('Yo ya won dude');
  }
};

//restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    //randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();