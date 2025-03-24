import './App.css';
import { useEffect, useState } from 'react';
import MemoryCard from './components/MemoryCard';

const cardList = [
  {"path":"img/allman.png",matched:false},
  {"path":"img/emo.png",matched:false},
  {"path":"img/mert.png",matched:false},
  {"path":"img/neco.png",matched:false},
  {"path":"img/sleva.png",matched:false},
  {"path":"img/sve.png",matched:false},
  {"path":"img/rafa.png",matched:false},
  {"path":"img/juliaaa.jpg",matched:false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const prepareCards = () => {
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  };

  const handleSelected = (card) => {
    if (!disabled) {
      selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
    }
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);
      if (selectedOne.path === selectedTwo.path) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore(prevScore => prevScore + 1); // Sadece eşleşme olduğunda skor artıyor
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
  };

  return (
    <div className="container">
      <h1>Memory App</h1>
      <button className='startButton' onClick={prepareCards}>Oyunu Başlat</button>
      <p className='score'>Skor: {score}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <MemoryCard 
            key={card.id} 
            card={card} 
            handleSelected={handleSelected} 
            disabled={disabled}
            rotated={card === selectedOne || card === selectedTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
