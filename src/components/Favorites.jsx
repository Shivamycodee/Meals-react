import {useGlobalContext} from '../Context';  


const Favorites = () => {
 
   const { selectMeal,favorites, removeFromFavorites } = useGlobalContext();

  return <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((item) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} className="favorite-item">
                <img
                  src={image}
                  alt={idMeal}
                  onClick={() => selectMeal(item)}
                  className="favorites-img img"
                />
                <button
                  className="remove-btn"
                  onClick={()=>removeFromFavorites(item)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
};

export default Favorites;