import React, { useState } from 'react';
import './App.css';
import { draftOrder } from './sampleData/0a06a0bd-84a6-420f-ab68-3fcd960f133c.json';
import { getCardById } from './services/cardService/index.js';

function App() {
  const [num, setNum] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  const { packNumber, pickNumber, cardsInPack, selectedCardId } = draftOrder[num];
  
  const listOfCardNames = cardsInPack
    .map((cardId) => getCardById(cardId, 'ZNR'))
    .filter(Boolean)
    .map(({ name, card_faces, image_uris}) => {
      if (card_faces) console.log(name, card_faces)
      if(image_uris) console.log(name, image_uris.small)
      const image = card_faces ?
        <img src={card_faces[0].image_uris.small} alt={name} /> :
        <img src={image_uris.small} alt={name} />
      return (<div className="Card">{image}</div>)
      
      //console.log(`${index} TEST small`, name)
      
    })
    .reverse();
  
    
  return (
    <div className="App">
      <div className="TopBar">
        <div className="PackInfo"> Pack #: {packNumber} Pick #: {pickNumber} </div>
        <div className="PackButtons">
          <button disabled={num === 0}onClick={() => setNum(num - 1)}>Previous</button>
          <button disabled={(num === draftOrder.length - 1)}onClick={() => setNum(num + 1)}>Next</button>
        </div>
      </div>
      
      <br/>

      <div className="DraftCardsContainer">
        {listOfCardNames}
      </div>
    </div>
  );
}

export default App;
