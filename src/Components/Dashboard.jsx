import React, { useState, useEffect } from 'react';
// Axios est utilisé pour récupérer des données depuis les API
import axios from 'axios';

const Dashboard = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [quote, setQuote] = useState('');
  const [joke, setJoke] = useState('');
  const [events, setEvents] = useState([]); 
  const [mocktail, setMocktail] = useState(''); 
  const [mocktailImage, setMocktailImage] = useState(''); 
  const [recipe, setRecipe] = useState(''); 
  const [recipeImage, setRecipeImage] = useState(''); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 60000); // Mise à jour toutes les 60 secondes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Récupérer une citation aléatoire
    axios
      .get('https://api.adviceslip.com/advice')
      .then(response => setQuote(response.data.slip.advice))
      .catch(error => console.error('Erreur lors de la récupération de la citation :', error));

    // Récupérer une blague aléatoire
    axios
      .get('https://official-joke-api.appspot.com/random_joke')
      .then(response => setJoke(response.data.setup + ' ' + response.data.punchline))
      .catch(error => console.error('Erreur lors de la récupération de la blague :', error));

    // Récupérer des événements historiques du jour
    axios
      .get('https://history.muffinlabs.com/date')
      .then(response => setEvents(response.data.data.Events))
      .catch(error => console.error('Erreur lors de la récupération des événements historiques :', error));

    // Récupérer un mocktail aléatoire
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
      .then(response => {
        const randomMocktail = response.data.drinks[Math.floor(Math.random() * response.data.drinks.length)];
        setMocktail(randomMocktail.strDrink);
        setMocktailImage(randomMocktail.strDrinkThumb);
      })
      .catch(error => console.error('Erreur lors de la récupération du mocktail :', error));

    // Récupérer une recette aléatoire
    axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => {
        setRecipe(response.data.meals[0].strMeal);
        setRecipeImage(response.data.meals[0].strMealThumb);
      })
      .catch(error => console.error('Erreur lors de la récupération de la recette :', error));
  }, []); // Cette fonction ne s'exécute qu'une seule fois au chargement du composant

  return (
    <div className="container">
      <div className="dashboard">
        <header>
          <h1>Dashboard</h1> 
        </header>
        <div className="date-time">
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
        <div className="quote">
          <h2>Citation du Jour</h2>
          <p>"{quote}"</p>
        </div>
        <div className="joke">
          <h2>Blague du Jour</h2>
          <p>{joke}</p>
        </div>
        <div className="events">
          <h2>Événements Historiques</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.text}</li>
            ))}
          </ul>
        </div>
        <div className="mocktail">
          <h2>Mocktail du Jour</h2>
          <p>{mocktail}</p>
          {mocktailImage && <img src={mocktailImage} alt="Mocktail" />}
        </div>
        <div className="recipe">
          <h2>Recette du Jour</h2>
          <p>{recipe}</p>
          {recipeImage && <img src={recipeImage} alt="Recipe" />}
          <button>Voir Détails</button>
        </div>
      </div>

      <div className="editor">
        <header>
          <h1>Éditeur de Document Markdown</h1>
        </header>
        <div className="editor-content">
          <label htmlFor="docTitle">Titre du Document:</label>
          <input
            type="text"
            id="docTitle"
            placeholder="Entrez le titre du document"
          />
          <textarea
            id="docContent"
            placeholder="Écrivez votre contenu Markdown ici..."
          ></textarea>
          <button>Prévisualiser</button>
          <div id="preview">
          </div>
          <div className="file-actions">
            <h3>Gestion du fichier Markdown</h3>
            <input
              type="file"
              accept=".md"
               // Cette partie est juste pour l'interface concernant les fichiers
              onChange={() => alert('Fichier sélectionné pour importation')}
            />
            <button onClick={() => alert('Exporter le fichier Markdown')}>Exporter</button> {/* Exporter le fichier */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
