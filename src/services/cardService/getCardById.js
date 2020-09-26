import cardData from '../../znd.json';

const getCardById = (id) => cardData.find(({ arena_id }) => (parseInt(id, 10) === arena_id)) || null;
  
export default getCardById;