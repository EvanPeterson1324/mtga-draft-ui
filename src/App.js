import React, { useEffect, useState } from 'react';
import './App.css';
import { draftOrder } from './sampleData/0a06a0bd-84a6-420f-ab68-3fcd960f133c.json';
import { getCardById } from './services/cardService/index.js';

const Card = ({ cardKey, isHighlighted, children }) => {
  const cardClassNames = isHighlighted
    ? "Card HighlightCard"
    : "Card";

  return (<div className={cardClassNames} key={cardKey}>{children}</div>);
}

function App() {
  const [packPickPosition, setPackPickPosition] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showSelectedCard, setShowSelectedCard] = useState(false);

  const { packNumber, pickNumber, cardsInPack, selectedCardId } = draftOrder[packPickPosition];
  
  const getCardImages = (cardIds, highlightSelected = false) => cardIds
    .map((cardId) => getCardById(cardId, 'ZNR'))
    .filter(Boolean)
    .map(({ name, card_faces, image_uris, arena_id }, index) => {
      const imgSrc = card_faces
        ? card_faces[0].image_uris.small
        : image_uris.small;

      const isHighlighted = (highlightSelected && selectedCardId === arena_id);
      const image = <img src={imgSrc} alt={name} />
        
      return (<Card isHighlighted={isHighlighted} cardKey={`${name}-${index}`}>{image}</Card>)
    })
    .reverse();

  const onPrevOrNextClick = (newSelectedCards, newPackPickPosition) => {
    setSelectedCards(newSelectedCards);
    setPackPickPosition(newPackPickPosition);
  }

  useEffect(() => {
    console.log("SELECTED", selectedCards)
  }, [selectedCards]);

  return (
    <div className="App">
      <div className="TopBar">
        <div className="PackInfo"> Pack #: {packNumber} Pick #: {pickNumber} </div>
        <div className="PackButtons">
          <button 
            disabled={packPickPosition === 0} 
            onClick={() => {onPrevOrNextClick(selectedCards.slice(0, -1), packPickPosition - 1)}}
          >Previous</button>
          <button 
            disabled={(packPickPosition === draftOrder.length - 1)}
            onClick={() => {onPrevOrNextClick([...selectedCards, selectedCardId], packPickPosition + 1)}}
          >Next</button>
          <button onClick={() => setShowSelectedCard(!showSelectedCard)}>{`${showSelectedCard ? 'Hide' : 'Show'} selected card`}</button>
        </div>
      </div>
      
      <br/>

      <div className="DraftCardsContainer">
        {getCardImages(cardsInPack, showSelectedCard)}
      </div>

      <br/>

      <div className="DraftCardsContainer SelectedCardsContainer">
        {getCardImages(selectedCards)}
      </div>
    </div>
  );
}

export default App;
