import React, { useState,useContext, useEffect } from "react";
import axios from "axios";


const AppContext = React.createContext();


const AppProvider = ({children}) =>{
    
const [meals, setMeals] = useState([]);
const [loading,setLoading] = useState(false);
const [searchTerm,setSearchTerm] = useState('');
const [showModal,setShowModal] = useState(false);
const [selectedMeal,setSelectedMeal] = useState(null);
const [favorites, setFavourites] = useState(
  JSON.parse(localStorage.getItem("favoritesItem")) || []
);

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";


     const fetchMeals = async(url)=>{
        setLoading(true);
        try{

            const {data} = await axios(url);
            setMeals(data.meals)
        }catch(e){
            console.log("Error is : "+e.response);
        }
        setLoading(false);
     }

    useEffect(()=>{
         fetchMeals(allMealsUrl);
    },[])

    useEffect(()=>{
        if(!searchTerm) return
         fetchMeals(`${allMealsUrl}${searchTerm}`);
    },[searchTerm])

    useEffect(()=>{
       localStorage.setItem('favoritesItem',JSON.stringify(favorites));
    },[favorites])

  
    function selectMeal(meal){
            setSelectedMeal(meal);
            setShowModal(true);
        }

    const selectFavorite = (favMeal)=>{

        const alreadyFavourite =  favorites.find((meal)=> meal === favMeal)
        if (alreadyFavourite) return;
        var updatedFavourite = [...favorites,favMeal];
        setFavourites(updatedFavourite);
    }

    const removeFromFavorites = (Meal)=>{
           var updatedFavourite = favorites.filter((meal)=> meal !== Meal);
           setFavourites(updatedFavourite);
    }


    // const fetchRandomMeal = async()=>{
    //     const rand = Math.floor(Math.random()*25)
    //     console.log(rand)
    //     meals.map((meal,index)=>{
    //          index == rand
    //            ? setSearchTerm(meal)
    //            : console.log(index);
    //     });
    // }

    const fetchRandomMeal = async()=>{
        fetchMeals(randomMealUrl);
    }

    const closeModal = ()=>{
        setShowModal(false);
    }

    return (
      <AppContext.Provider
        value={{
          meals,
          loading,
          setSearchTerm,
          fetchRandomMeal,
          showModal,
          selectMeal,
          selectedMeal,
          closeModal,
          selectFavorite,
          favorites,
          removeFromFavorites
        }}
      >
        {children}
      </AppContext.Provider>
    );
}

export const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export  {AppContext,AppProvider};

