import { useGlobalContext } from "../Context";
import {BsHandThumbsUp} from "react-icons/bs";

const Meals = () =>{

  const { meals, loading, selectMeal, selectFavorite } = useGlobalContext();

     if(loading){
       return <section className="section">
        <h4>Loading.... </h4>
      </section>
     } 
     if(meals===null){
        return (
          <section className="section">
            <h4>No data </h4>
          </section>
        );
     }
     
return <section className="section-center">

        {meals.map((meal) => {
          const {idMeal , strMeal : title, strMealThumb:image} = meal;
          return (
            <article key={idMeal} className="single-meal">
              <img
                src={image}
                alt={title}
                className="img"
                onClick={() => {
                  selectMeal(meal);
                }}
              />
              <footer>
                <h5>{title}</h5>
                <button
                  className="like-btn"
                  onClick={()=>selectFavorite(meal)}
                >
                  <BsHandThumbsUp />
                </button>
              </footer>
            </article>
          );
      })}
    </section>
  

}

export default Meals;