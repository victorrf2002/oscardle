/*
  https://github.com/delventhalz/json-nominations
  along with TMBD API
*/

import './App.css';
import oscarData from "./data/oscar-nominations.json";
import {useEffect, useState} from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

function WinModal({openWinModal, setOpenWinModal}) {

  return(
    <>
      <button onClick={() => setOpenWinModal(true)}>Open Dialog</button>
      <Dialog open={openWinModal} onClose={() => setOpenWinModal(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-gray-700">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Desactivate Account</DialogTitle>
            <Description>This will permanently desactivate your account</Description>
            <p>Are you sure you want to desactivate your account? All of your data will be lost.</p>
            <div className="flex gap-4">
              <button onClick={() => setOpenWinModal(false)}>Cancel</button>
              <button onClick={() => setOpenWinModal(false)}>Desactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

// Component for the answers rows
function GuessAnswerRow({guesses}) {
  
 return(
    <tbody>
      {guesses.toReversed().map((guess, index) => {
        return (
          <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
            
            <td className=""><img src={`${guess.poster}`} className="w-30"></img></td>
            <td  className={`px-6 py-4 ${guess.status.title}`} >{guess.title}</td>
            <td  className={`px-6 py-4 ${guess.status.director}`} >{guess.director}</td>
            <td  className={`px-6 py-4 ${guess.status.year}`} >{guess.year}</td>
            <td  className={`px-6 py-4 ${guess.status.genre}`} >{guess.genre}</td>
            <td  className={`px-6 py-4 ${guess.status.wins}`} >{guess.wins}</td>
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
function GuessBar({onGuessSubmit, numberOfGuesses}) {

  const[input, setInput] = useState('');

  // setting onGuessSubmit as the user's input
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuessSubmit(input);
    setInput("");
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-row justify-center gap-2.5 mt-10">
        <h6 className="pr-6 pb-6 pt-6 text-xl" >Guess {numberOfGuesses}/8</h6>
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

  console.log(`Chosen Film Id: ${tmdbId}. Title: ${movie}. Director: ${director}. Genre: ${genre}. Year: ${year}. Number of wins: ${wins}. Poster link: ${moviePoster}.`);

  const [guessTrigger, setGuessTrigger] = useState(0);

  let [openWinModal, setOpenWinModal] = useState(false);

  // Handle the user's guess to see if it matches the movie
  const handleGuess = (userGuess) => {
    setGuessCredits(null);
    setGuessPosterPath(null);
    setGuessMovieGenre(null);

    let matchedMovie = null;
    
    if(userGuess.toLowerCase() === movie.toLowerCase()) {
      console.log("Correct!");
      matchedMovie = {movies: [{tmdb_id: tmdbId}], year};
      // ADD FUNCTION FOR WIN
    } else {
      matchedMovie = oscarData.find(
        m => m.movies[0].title.toString().toLowerCase() === userGuess.toLowerCase()
      );
      if (!matchedMovie) {
        console.log("Invalid Guess. Not nominated.");
        return;
      }
      console.log("Try again.")
    }

    const newGuessId = matchedMovie.movies[0].tmdb_id;
    setGuessTmdbId(newGuessId);
    setGuessTrigger(prev => prev+1);
    fetchGuessData(newGuessId);
  };

  const fetchGuessData = async (id) => {
    try {
      const [creditRes, posterRes, genreRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`).then(res => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).then(res => res.json())
      ]);

      setGuessCredits(creditRes);
      setGuessPosterPath(posterRes);
      setGuessMovieGenre(genreRes);
    } catch (error) {
      console.error("Failed to fetch guess data: ", error);
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
  }, [guessTmdbId, apiKey, guessTrigger]);

  // Fetching Poster Path of movie guess.
  useEffect(() => {
    if (!guessTmdbId) return;
  
    const fetchGuessPoster = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${guessTmdbId}/images?api_key=${apiKey}`);
      const data = await res.json();
      setGuessPosterPath(data);
    };
  
    fetchGuessPoster();
  }, [guessTmdbId, apiKey, guessTrigger]);

  // Fetching Genre of movie guess
  useEffect(() => {
    if (!guessTmdbId) return;

    const fetchGuessMovieGenre = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${guessTmdbId}?api_key=${apiKey}`);
      const data = await res.json();
      setGuessMovieGenre(data);
    };

    fetchGuessMovieGenre();
  }, [guessTmdbId, apiKey, guessTrigger]);

  // Keep track of guesses
  const [guesses, setGuesses] = useState([]);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);

  // Keep track of win/loss
  let [gameWon, setGameWon] = useState(false);
  let [gameLoss, setGameLoss] = useState(false);

  // Gathering info of movie guess.
  useEffect(() => {
    if(!guessTmdbId || !guessCredits || !guessPosterPath || !guessMovieGenre) return;

    const guessMovie = oscarData.find(m => m.movies?.[0]?.tmdb_id === guessTmdbId);

    if(!guessMovie) return;

    const guessTitle = guessMovie.movies[0].title;

    // Skip if the movie was already guessed
    if (guesses.find(g => g.title.toLowerCase() === guessTitle.toLowerCase())) {
      console.log("Duplicate guess. Ignoring.");
      return;
    }

    // Number of guesses
    if (numberOfGuesses >= 8) {
      console.log("Maximum number of guesses reached.");
      return;
    }

    // Check if game is won
    if(gameWon === true) return;
    

    setNumberOfGuesses(guesses.length +1);
    console.log("Number of guesses: " + numberOfGuesses + "/8");

    const guessYear = guessMovie.year;
    var guessWins = getWins(guessTitle);
    const guessDirector = guessCredits.crew.find(person => person.job === 'Director')?.name;
    const guessPoster = (guessPosterPath?.posters?.length > 0)
                        ? 'https://image.tmdb.org/t/p/original/' + guessPosterPath.posters[0].file_path
                        : null;
    const guessGenre = guessMovieGenre.genres[0].name;
    
    console.log("Movie Guess: " + guessTitle + ". ID: " + guessTmdbId + ". Director: " + guessDirector + ". Year: " + guessYear + ". Win: " + guessWins + ". Poster: " + guessPoster + ". Genre: " + guessGenre);

    const guessStatus = {
      title: guessTitle === movie ? 'bg-oscar-emerald' : 'bg-oscar-red',
      director: guessDirector === director ? 'bg-oscar-emerald' : 'bg-oscar-red',
      year: guessYear === year ? 'bg-oscar-emerald' : ((guessYear <= parseInt(year) + 5) && guessYear >= parseInt(year) -5) ? 'bg-oscar-light-gold' : 'bg-oscar-red',
      genre: guessGenre === genre ? 'bg-oscar-emerald' : 'bg-oscar-red',
      wins: guessWins === wins ? 'bg-oscar-emerald' : ((guessWins <= parseInt(wins) + 3) && (guessWins >= parseInt(wins) - 3)) ? 'bg-oscar-light-gold' : 'bg-oscar-red',
    };
    
    setGuesses(prev => [...prev, {
      title: guessTitle,
      director: guessDirector,
      year: guessYear,
      genre: guessGenre,
      wins: guessWins,
      poster: guessPoster,
      status: guessStatus,
    }]);

    // If movie is guessed correctly, open the win modal
    if (guessTitle === movie) {
      setOpenWinModal(true);
      setGameWon(true);
    };

  }, [guessCredits, guessPosterPath]);

  return (
    <div>
      <Header/>
      <h1 className="text-oscar-light-gold text-9xl mt-6">OSCARDLE</h1>
      <GuessBar onGuessSubmit={handleGuess} numberOfGuesses={numberOfGuesses}/> 
      <GuessTable guesses={guesses}/>
      <WinModal openWinModal={openWinModal} setOpenWinModal={setOpenWinModal}/>
    </div>
  );
}

export default App
