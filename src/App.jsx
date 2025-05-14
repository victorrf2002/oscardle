/*
  https://github.com/delventhalz/json-nominations
  along with TMBD API
*/

import './App.css';
import oscarData from "./data/oscar-nominations.json";
import {useEffect, useState} from 'react';




// Component for the answers rows
function GuessAnswerRow({guesses, status}) {
  
 return(
    <tbody>
      {guesses.map((guess, index) => {
        const currentStatus = status[index];
        return (
          <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
            
            <td className=""><img src={`${guess.poster}`} className="w-30"></img></td>
            <td  className={`px-6 py-4 ${currentStatus.title}`} >{guess.title}</td>
            <td  className={`px-6 py-4 ${currentStatus.director}`} >{guess.director}</td>
            <td  className={`px-6 py-4 ${currentStatus.year}`} >{guess.year}</td>
            <td  className={`px-6 py-4 ${currentStatus.genre}`} >{guess.genre}</td>
            <td  className={`px-6 py-4 ${currentStatus.wins}`} >{guess.wins}</td>
        </tr>
        ); 
        
      })}
    </tbody>

 )
  
}

// Component for the category row
function GuessCategoryRow() {

  return(
        
    <tr>
      <th scope="col" className="w-20"></th>
      <th scope="col" className="px-6 py-3">Title</th>
      <th scope="col" className="px-6 py-3">Director</th>
      <th scope="col" className="px-6 py-3">Year</th>
      <th scope="col" className="px-6 py-3">Genre</th>
      <th scope="col" className="px-6 py-3"># of Wins</th>
    </tr>
  )
}

// Component for the whole Guess table section
function GuessTable({guesses, status}) {
  return (

    <div className="relative overflow-x-auto">
      <table className=" mt-10 w-full text-left rtl:text-right text-lg table-auto ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <GuessCategoryRow/>
        </thead>

        <GuessAnswerRow guesses={guesses} status={status}/>
      
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
      <form onSubmit={handleSubmit} className="flex flex-row justify-center gap-2.5 mt-10">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="border-1 border-oscar-dark-gold bg-oscar-red/50 p-2 w-2xs text-xl" name="guess-input" type="text" id="guess-input" required placeholder='Enter movie...'/>
        <button type='submit' className="bg-oscar-light-gold p-6 text-xl">OK</button>
      </form>
  )

}

// Component for header
function Header() {
  return (
    <header className="flex flex-row justify-between border-b-2 pb-2 border-oscar-dark-gold">

      {/* this is just a placeholder CHANGE AFTER */}
      <p id='date' className='mb-0'>APRIL 9, 2025</p> 

      <button className="bg-oscar-dark-gold px-4 mb-2">HOW TO PLAY</button>
    </header>
  );
}

// Main component
function App() {
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterPath, setMoviePosterPath] = useState(null);
  const [movieGenre, setMovieGenre] = useState(null);

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
  useEffect( () => {
     fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${apiKey}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
         setMoviePosterPath(data);
      });
  }, []);

  // Fetch movie genre from TMDB
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      setMovieGenre(data);
    });
  }, []);

  const director = (movieCredits && movieCredits.crew.find((element) => element.job === 'Director').name);
  const moviePoster = (moviePosterPath?.posters?.length > 0)
                      ? 'https://image.tmdb.org/t/p/original/' + moviePosterPath.posters[0].file_path
                      : null;
  const genre = (movieGenre) ? movieGenre.genres[0].name : null;

  // Get number of wins
  function getWins(movie) {
    var count = 0;
    for (var i = 0; i < arrayLength; i++) {
      if(oscarData[i].movies[0].title == movie && oscarData[i].won) {
        count++;
      }
    }
    return count;
  };

  const wins = getWins(movie);

  console.log(moviePoster);
  console.log(movie);
  console.log(director);
  console.log(genre);
  console.log(year);
  console.log("Number of Wins: " + wins);


  // Handle the user's guess to see if it matches the movie
  const handleGuess = (userGuess) => {
    setGuessCredits(null);
    setGuessPosterPath(null);
    setGuessMovieGenre(null);
    
    if(userGuess.toLowerCase() === movie.toLowerCase()) {
      console.log("Correct!");
      setGuessTmdbId(tmdbId);
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
  const [guessMovieGenre, setGuessMovieGenre] = useState(null);

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
  }, [guessTmdbId, apiKey]);

  // Fetching Poster Path of movie guess.
  useEffect(() => {
    if (!guessTmdbId) return;
  
    const fetchGuessPoster = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${guessTmdbId}/images?api_key=${apiKey}`);
      const data = await res.json();
      setGuessPosterPath(data);
    };
  
    fetchGuessPoster();
  }, [guessTmdbId, apiKey]);

  // Fetching Genre of movie guess
  useEffect(() => {
    if (!guessTmdbId) return;

    const fetchGuessMovieGenre = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${guessTmdbId}?api_key=${apiKey}`);
      const data = await res.json();
      setGuessMovieGenre(data);
    };

    fetchGuessMovieGenre();
  }, [guessTmdbId, apiKey]);

  // Keep track of guesses
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState([]);

  // Gathering info of movie guess.
  useEffect(() => {
    if(!guessTmdbId || !guessCredits || !guessPosterPath || !guessMovieGenre) return;

    const guessMovie = oscarData.find(m => m.movies?.[0]?.tmdb_id === guessTmdbId);

    if(!guessMovie) return;


    const guessTitle = guessMovie.movies[0].title;
    const guessYear = guessMovie.year;
    var guessWins = getWins(guessTitle);
    const guessDirector = guessCredits.crew.find(person => person.job === 'Director')?.name;
    const guessPoster = (guessPosterPath?.posters?.length > 0)
                        ? 'https://image.tmdb.org/t/p/original/' + guessPosterPath.posters[0].file_path
                        : null;
    const guessGenre = guessMovieGenre.genres[0].name;


    console.log("Movie Guess: " + guessTitle + ". ID: " + guessTmdbId + ". Director: " + guessDirector + ". Year: " + guessYear + ". Win: " + guessWins + ". Poster: " + guessPoster + ". Genre: " + guessGenre);

    // Checking matches between guessed movie and actual movie.
    if(guessTitle === movie) {
      titleStatus = 'bg-oscar-emerald';
      guessWins = wins;
    };

    if(guessDirector === director) {
      directorStatus = 'bg-oscar-emerald';
    };

    if(guessYear === year) {
      yearStatus = 'bg-oscar-emerald';
    }
    else if((guessYear <= parseInt(year) + 5) && (guessYear >= parseInt(year) - 5)) {
      yearStatus = 'bg-oscar-light-gold';
    };

    if(guessGenre === genre) {
      genreStatus = 'bg-oscar-emerald';
    }

    if(guessWins === wins) {
      winStatus = 'bg-oscar-emerald';
    }
    else if((guessWins <= parseInt(wins) + 3) && (guessWins >= parseInt(wins) - 3)) {
      winStatus = 'bg-oscar-light-gold';
    }
    
    setGuesses(prev => [...prev, {
      title: guessTitle,
      director: guessDirector,
      year: guessYear,
      genre: guessGenre,
      wins: guessWins,
      poster: guessPoster
    }]);

    setStatus(prev => [...prev, {
      title: titleStatus,
      director: directorStatus,
      year: yearStatus,
      genre: genreStatus,
      wins: winStatus
    }]);

    console.log('Title Status: ' + titleStatus + '. Director Status: ' + directorStatus + '. Year Status: ' + yearStatus + ". Win Status: " + winStatus + ". Genre Status: " + genreStatus);

    console.log("Status object: " + status);

  }, [guessCredits, guessPosterPath]);

  // Status is either green, yellow, or red. For the category columns
  var titleStatus = 'bg-oscar-red';
  var directorStatus = 'bg-oscar-red';
  var yearStatus = 'bg-oscar-red';
  var winStatus = 'bg-oscar-red';
  var genreStatus = 'bg-oscar-red';

  return (
    <div>
      <Header/>
      <h1 className="text-oscar-light-gold text-9xl mt-6">OSCARDLE</h1>
      <GuessBar onGuessSubmit={handleGuess}/> 
      <GuessTable guesses={guesses} status={status}/>
    </div>
    
  );
}

export default App
