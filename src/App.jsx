/*
  ACTUALLY NEVERMIND USE THIS
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

// Component for guess input
function GuessBar() {

  return (
      <form class="flex flex-row justify-center gap-2.5 mt-10">
        <input class="border-1 border-oscar-dark-gold bg-oscar-red/50 p-2 w-2xs text-xl" name="guess-input" type="text" id="guess-input" required placeholder='Enter movie...'/>
        <button class="bg-oscar-light-gold p-6 text-xl">OK</button>
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
  
  console.log(tmdbId);

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

 


  return (
    <div>
      <Header/>
      <h1 class="text-oscar-light-gold text-9xl mt-6">OSCARDLE</h1>
      <GuessBar />
      <GuessTable/>
    </div>
    
  );
}

export default App
