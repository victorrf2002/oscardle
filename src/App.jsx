/*
  https://github.com/delventhalz/json-nominations
  along with TMBD API
*/

import './App.css';
import oscarData from "./data/oscar-nominations.json";
import {useEffect, useState} from 'react';
// import axios from 'axios';


// Component for the answers rows
function GuessAnswerRow() {
 return(
  <tbody>
    <tr class=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td class=""><img src="src/assets/518zV7F39qL._AC_UF894,1000_QL80_.jpg" class="w-30"></img></td>
      <td class="px-6 py-4 bg-oscar-emerald">The Social Network</td>
      <td class="px-6 py-4 bg-oscar-red">David Fincher</td>
      <td class="px-6 py-4 bg-oscar-light-gold">2011</td>
      <td class="px-6 py-4 bg-oscar-emerald">Best Director</td>
      <td class="px-6 py-4 bg-oscar-red">Yes</td>
    </tr>

    <tr class=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td class=""><img src="src/assets/518zV7F39qL._AC_UF894,1000_QL80_.jpg" class="w-30"></img></td>
      <td class="px-6 py-4 bg-oscar-emerald">The Social Network</td>
      <td class="px-6 py-4 bg-oscar-red">David Fincher</td>
      <td class="px-6 py-4 bg-oscar-light-gold">2011</td>
      <td class="px-6 py-4 bg-oscar-emerald">Best Director</td>
      <td class="px-6 py-4 bg-oscar-red">Yes</td>
    </tr>

    <tr class=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <td class=""><img src="src/assets/uQ538BfYLDJh3GXlzRZLo0j7PFj.webp" class="w-30"></img></td>
      <td class="px-6 py-4 bg-oscar-emerald">The King's Speech</td>
      <td class="px-6 py-4 bg-oscar-emerald">Tom Hooper</td>
      <td class="px-6 py-4 bg-oscar-emerald">2011</td>
      <td class="px-6 py-4 bg-oscar-emerald">Best Picture</td>
      <td class="px-6 py-4 bg-oscar-emerald">Yes</td>
    </tr>
  </tbody>
 )
  
}

// Component for the category row
function GuessCategoryRow() {

  return(
        
    <tr>
      <th scope="col" class="w-20"></th>
      <th scope="col" class="px-6 py-3">Title</th>
      <th scope="col" class="px-6 py-3">Director</th>
      <th scope="col" class="px-6 py-3">Year</th>
      <th scope="col" class="px-6 py-3">Nomination</th>
      <th scope="col" class="px-6 py-3">Win</th>
    </tr>
  )
}

// Component for the whole Guess table section
function GuessTable() {
  return (

    <div class="relative overflow-x-auto">
      <table class=" mt-10 w-full text-left rtl:text-right text-lg table-auto ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <GuessCategoryRow/>
        </thead>

        <GuessAnswerRow/>
      
      </table>
    </div>
    
    
  )
}

// Component for guess input taking the onGuessSubmit function from App as a prop
function GuessBar({onGuessSubmit}) {

  const[input, setInput] = useState('');

  // setting onGuessSubmit as the user's input
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuessSubmit(input);
    setInput("");
  }

 

  return (
      <form onSubmit={handleSubmit} class="flex flex-row justify-center gap-2.5 mt-10">
        <input value={input} onChange={(e) => setInput(e.target.value)} class="border-1 border-oscar-dark-gold bg-oscar-red/50 p-2 w-2xs text-xl" name="guess-input" type="text" id="guess-input" required placeholder='Enter movie...'/>
        <button type='submit' class="bg-oscar-light-gold p-6 text-xl">OK</button>
      </form>
  )

}

// Component for header
function Header() {
  return (
    <header class="flex flex-row justify-between border-b-2 pb-2 border-oscar-dark-gold">

      {/* this is just a placeholder CHANGE AFTER */}
      <p id='date' class='mb-0'>APRIL 9, 2025</p> 

      <button class="bg-oscar-dark-gold px-4 mb-2">HOW TO PLAY</button>
    </header>
  );
}

// Main component
function App() {
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterPath, setMoviePosterPath] = useState(null);

  // Types of category
  const categoryTypes = [
    ['Best Actor', 'Best Actress', 'Best Supporting Actor', 'Best Supporting Actress'],
    ['Best Director', 'Best Picture', 'Best International Feature Film', 'Best Animated Feature', 'Best Documentary Feature'],
    ['Best Original Screenplay', 'Best Adapted Screenplay', 'Best Original Story'],
    ['Best Sound Editing', 'Best Sound Mixing', 'Best Score', 'Best Original Song'],
    ['Best Cinematography (Black and White)', 'Best Cinematography (Color)', 'Best Production Design (Black and White)', 'Best Production Design (Color)',
      'Best Costume Design (Black and White)', 'Best Costume Design (Color)', 'Best Makeup and Hairstyling', 'Best Visual/Special Effects', 'Best Film Editing'
    ],
    ['Best Animated Short', 'Best Documentary Short', 'Best Live Action Short (Comedy or One Reel or Regular)']
  ];

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const arrayLength = oscarData.length;

  // Get today's date and hash it to get random seed
  function getDateHashIndex(arrayLength) {
    const today = new Date().toISOString().split('T')[0];
    // const today = '2025-04-26';
    let hash = 0;

    for(let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
      
    return Math.abs(hash) % arrayLength;
  }

  const index = getDateHashIndex(oscarData.length);
  console.log("index: " + index);
  const randomMovie = oscarData[index]; // getting random oscar nomination from json file given the seed
  

  const tmdbId = randomMovie.movies[0].tmdb_id;
  const movie = randomMovie.movies[0].title;
  const year = randomMovie.year;
  const category = randomMovie.category;
  const win = randomMovie.won;
  
  console.log("Id: " + tmdbId);

  // Fetch movie director from TMDB
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${apiKey}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log(data);
        setMovieCredits(data);
      });
  }, []);

  // Fetch movie poster path from TMDB
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${apiKey}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setMoviePosterPath(data);
      });
  }, []);

  const director = (movieCredits && movieCredits.crew.find((element) => element.job === 'Director').name);
  const moviePoster = (movieCredits && 'https://image.tmdb.org/t/p/original/' + moviePosterPath.posters[0].file_path); // Link to movie poster

  console.log(moviePoster);
  console.log(movie);
  console.log(director);
  console.log(year);
  console.log(category);
  console.log("Win: " + win);

  // Handle the user's guess to see if it matches the movie
  const handleGuess = (userGuess) => {

    if(userGuess.toLowerCase() === movie.toLowerCase()) {
      console.log("Correct!");
      // ADD FUNCTION FOR WIN
    }
    else if (oscarData.find(m => m.nominees.toString().toLowerCase() == userGuess.toLowerCase())) {
      console.log("Try again.");

      const guessMovie = oscarData.find(m => m.nominees.toString().toLowerCase() == userGuess.toLowerCase());

      setGuessTmdbId(guessMovie.movies[0].tmdb_id);
      
    }
    else {
      console.log("Invalid Guess (movie not nominated)");
    }
  };

  const [guessTmdbId, setGuessTmdbId] = useState(null);
  const [guessCredits, setGuessCredits] = useState(null);
  const [guessPosterPath, setGuessPosterPath] = useState(null);

  // Fetching Credits (Director) of movie guess.
  useEffect(() => {
    if(!guessTmdbId)
      return;

    const fetchGuessCredits = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${guessTmdbId}/credits?api_key=${apiKey}`);
      const data = await res.json();
      setGuessCredits(data);
    }

    fetchGuessCredits();
  }, [guessTmdbId]);

  // Fetching Poster Path of movie guess.
  useEffect(() => {
    if(!guessTmdbId)
      return;

    const fetchGuessPosterPath = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${apiKey}`);
      const data = await res.json();
      setGuessPosterPath(data);
    }

    fetchGuessPosterPath();
  }, [guessTmdbId]);

  // Gathering info of movie guess.
  useEffect(() => {
    if(!guessTmdbId || !guessCredits) return;

    const guessMovie = oscarData.find(m => m.movies?.[0]?.tmdb_id === guessTmdbId);

    if(!guessMovie) return;

    const guessTitle = guessMovie.movies[0].title;
    const guessYear = guessMovie.year;
    const guessCategory = guessMovie.category;
    const guessWin = guessMovie.won;
    const guessDirector = guessCredits.crew.find(person => person.job === 'Director')?.name;
    // const guessPoster = 'https://image.tmdb.org/t/p/original/' + guessPosterPath.posters[0].file_path // Not Working rn

    console.log("Movie Guess: " + guessTitle + ". ID: " + guessTmdbId + ". Director: " + guessDirector + ". Year: " + guessYear + ". Category: " + guessCategory + ". Win: " + guessWin + ". Poster: ");

    // checkStatus(guessTitle);

    // Checking matches between guessed movie and actual movie.
    if(guessTitle === movie) {
      titleStatus = 'green';
    };

    if(guessDirector === director) {
      directorStatus = 'green';
    };

    if(guessYear === year) {
      yearStatus = 'green';
    }
    else if((guessYear < (year + 5)) && (guessYear > (year - 5))) { // FIX THIS
      yearStatus = 'yellow';
    };

    if(guessCategory === category) {
      categoryStatus = 'green';
    } 
    else {
      for (let i = 0; i < categoryTypes.length; i++) {
        if(categoryTypes[i].includes(category) && categoryTypes[i].includes(guessCategory)) {
          categoryStatus = 'yellow';
        }
      };
    };

    if(guessWin === win) {
      winStatus = 'green';
    }
    //

    console.log('Title Status: ' + titleStatus + '. Director Status: ' + directorStatus + '. Year Status: ' + yearStatus + '. Category Status: ' + categoryStatus
      + ". Win Status: " + winStatus + ".");

  }, [guessCredits]);

  // Status is either green, yellow, or red. For the category columns
  var status = null;
  var titleStatus = 'red';
  var directorStatus = 'red';
  var yearStatus = 'red';
  var categoryStatus = 'red';
  var winStatus = 'red';

  return (
    <div>
      <Header/>
      <h1 class="text-oscar-light-gold text-9xl mt-6">OSCARDLE</h1>
      <GuessBar onGuessSubmit={handleGuess}/> 
      <GuessTable/>
    </div>
    
  );
}

export default App
