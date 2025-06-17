/*
  https://github.com/delventhalz/json-nominations
  along with TMBD API
*/

import './App.css';
import oscarData from "./data/oscar-nominations.json";
import {useEffect, useState} from 'react';
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop} from '@headlessui/react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';

// Component for Win Modal
function WinModal({openWinModal, setOpenWinModal, chosenMovie}) {
  return(
    <>
      {/* <button onClick={() => setOpenWinModal(true)}>Open Dialog</button> */}
      <Dialog open={openWinModal} onClose={() => setOpenWinModal(false)} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/80 duration-300 data-closed:opacity-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-gray-700">
        
          <DialogPanel className="w-200 h-150 space-y-4 border bg-white rounded-2xl p-12">
            <DialogTitle className="text-oscar-dark-gold text-center text-2xl sm:text-5xl">And the award goes to...</DialogTitle>
            <DialogTitle className="text-oscar-dark-gold text-center text-5xl sm:text-8xl">You!</DialogTitle>
            <div className='flex gap-2 justify-center mt-15'>
              <img className="w-40" src={`${chosenMovie.moviePoster}`}></img>
              <Description className="self-end">
                <p><span className='font-bold'>Film:</span> {chosenMovie.title}</p>
                <p><span className='font-bold'>Director:</span> {chosenMovie.director}</p>
                <p><span className='font-bold'>Year of Release:</span> {chosenMovie.year}</p>
                <p><span className='font-bold'>Genre:</span> {chosenMovie.genre}</p>
                <p><span className='font-bold'>Number of Wins:</span> {chosenMovie.wins}</p>
              </Description>
            </div>
              
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

// Component for Loss Modal
function LossModal({openLossModal, setOpenLossModal, chosenMovie}) {
  return(
    <>
      {/* <button onClick={() => setOpenWinModal(true)}>Open Dialog</button> */}
      <Dialog open={openLossModal} onClose={() => setOpenLossModal(false)} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/80 duration-300 data-closed:opacity-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-gray-700">
        
          <DialogPanel className="w-200 h-150 space-y-4 border bg-white rounded-2xl p-12">
            <DialogTitle className="text-oscar-red text-center text-5xl">Better luck tomorrow...</DialogTitle>
            <div className='flex gap-2 justify-center mt-20 sm:mt-30'>
              <img className="w-40" src={`${chosenMovie.moviePoster}`}></img>
              <Description className="self-end">
                <p><span className='font-bold'>Film:</span> {chosenMovie.title}</p>
                <p><span className='font-bold'>Director:</span> {chosenMovie.director}</p>
                <p><span className='font-bold'>Year of Release:</span> {chosenMovie.year}</p>
                <p><span className='font-bold'>Genre:</span> {chosenMovie.genre}</p>
                <p><span className='font-bold'>Number of Wins:</span> {chosenMovie.wins}</p>
              </Description>
            </div>
              
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

// Component for Rules Modal
function RulesModal({openRulesModal, setOpenRulesModal}) {

  return (
    <>
      {/* <button onClick={() => setOpenRulesModal(true)}>Open dialog</button> */}
      <Dialog open={openRulesModal} onClose={() => setOpenRulesModal(false)} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/80 data-closed:opacity-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-gray-700">
        
          <DialogPanel className="w-230 h-150 space-y-4 border bg-white rounded-2xl p-12">
            <DialogTitle className="text-oscar-dark-gold text-center text-5xl">How to Play</DialogTitle>
              <Description className="sm:text-2xl">
                <p className="mt-10">You have <b>8</b> tries to guess the Oscar nominated movie.</p>
                <p className="mt-6"><b className='text-oscar-emerald'>Green</b> means it's a correct match for the given columns.</p>
                <p className="mt-6"><b className='text-oscar-red'>Red</b> means it's wrong.</p>
                <p className="mt-6"><b className='text-oscar-dark-gold'>Yellow</b> in the <b>Year</b> column means it's within 10 years of the actual release date of the movie.</p>
                <p className="mt-6"><b className='text-oscar-dark-gold'>Yellow</b> in the <b>Wins</b> column means it's within 3 wins of the actual number of wins the movie has.</p>
                <p className="mt-6"> Up arrow in the <b>Year</b> column means your guess is older. Down arrow if it's newer.</p>
                <p className="mt-6 pb-6 font-bold">Have fun :)</p>
              </Description>
              
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

function GuessAnswerRow({ guesses }) {
  return (
    <tbody>
      {guesses.toReversed().map((guess, index) => (
        <tr className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={index}>
          <td className=" w:20 sm:w-30">
            <img
              src={`${guess.poster}`}
              className="w-full h-auto"
              alt="Poster"
            />
          </td>
          <td className={`px-2 py-2 sm:px-6 sm:py-4 text-center truncate text-xs sm:text-base max-w-[50px] sm:max-w-none ${guess.status.title}`}>{guess.title}</td>
          <td className={`px-2 py-2 sm:px-6 sm:py-4 text-center ${guess.status.director}`}>{guess.director}</td>
          {/* <td className={` text-center flex justify-center items-center h-45 flex-row ${guess.status.year}`}><div className="">{guess.year}</div> {guess.status.yearSymbol} </td> */}
          <td className={` text-center flex justify-center items-center h-45 flex-row ${guess.status.year}`}>
            <div className="">{guess.year}</div>
            {guess.status.yearSymbol === "up" && (
              <img className="w-6 ml-[10px]" src="src/assets/arrow-up-svgrepo-com.svg" />
            )}
            {guess.status.yearSymbol === "down" && (
              <img className='w-6 ml-[10px]' src="src/assets/arrow-down-svgrepo-com.svg" />
            )}
          </td>
          <td className={`px-2 py-2 sm:px-6 sm:py-4 text-center ${guess.status.genre}`}>{guess.genre}</td>
          <td className={`px-2 py-2 sm:px-6 sm:py-4 text-center ${guess.status.wins}`}>{guess.wins}</td>
        </tr>
      ))}
    </tbody>
  );
}

function GuessCategoryRow() {
  return (
    <tr>
      <th scope="col" className="w-20 sm:w-30"></th>
      <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-center">Title</th>
      <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-center">Director</th>
      <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-center">Year</th>
      <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-center">Genre</th>
      <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3 text-center"># of Wins</th>
    </tr>
  );
}

function GuessTable({ guesses, status}) {
  return (
    <div className="mt-10 overflow-x-auto w-full">
      <table className="w-full text-left text-sm sm:text-base table-auto border-collapse">
        <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <GuessCategoryRow />
        </thead>
        <GuessAnswerRow guesses={guesses} status={status} />
      </table>
    </div>
  );
}

// Component for guess input taking the onGuessSubmit function from App as a prop
function GuessBar({onGuessSubmit, numberOfGuesses}) {

  // Implementing HeadlessUI's ComboBox for a dropwdown autocomplete search bar.
  const [selectedMovie, setSelectedMovie] = useState(oscarData[0]);
  const [input, setInput] = useState('');

  // Remove duplicates from dropwdown
  const uniqueMovies = Object.values(
    oscarData.reduce((acc, entry) => {
      const id = entry.movies[0].tmdb_id;
      if(!acc[id]) {
        acc[id] = entry;
      }
      return acc;
    }, {})
  );

  // Filter through data set depending on what the user is typing.
  const filteredMovies = 
    input === ''
      ? uniqueMovies
      : uniqueMovies.filter((movie) => {
        return movie.movies[0].title.toLowerCase().includes(input.toLowerCase())
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedMovie) {
      onGuessSubmit(selectedMovie.movies[0].title, selectedMovie.year);
      setInput("");
    }
  }

  return (
      <form onSubmit={handleSubmit} className="justify-center gap-2.5 mt-10 sm:flex sm:flex-row">
        <h6 className="pr-2 sm:pr-6 sm:pb-6 sm:pt-6 sm:text-xl" >Guess {numberOfGuesses}/8</h6>

        <Combobox value={selectedMovie} onChange={(movie) => {
          setSelectedMovie(movie); setInput(movie.movies[0].title + ', ' + movie.year);
        }}>
        <ComboboxInput
          className="h-12 border-1 border-oscar-dark-gold bg-oscar-red/50 p-2 w-2xs text-xl sm:h-20 active: outline-none "
          aria-label="Assignee"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='Enter movie...'
          displayValue={() => input}
          
          
        />
        <ComboboxOptions anchor="bottom" className=" overflow-visible border-1 border-oscar-dark-gold bg-oscar-red p-2 w-2xs text-xl empty:invisible " >
          {filteredMovies.slice(0, 5).map((movie) => (
            <ComboboxOption key={`${movie.year} - ${movie.movies[0].tmdb_id}`} value={movie} className="data-focus:bg-oscar-light-gold">
              {movie.movies[0].title + ', ' + movie.year}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
        </Combobox>
        <button type='submit' className="bg-oscar-light-gold pl-6 pr-6 sm:p-6 text-lg sm:text-xl mt-3 sm:mt-0 h-12 sm:h-20">OK</button>
      </form>
  )

}

// Component for header
function Header() {
  let [openRulesModal, setOpenRulesModal] = useState(false);
  const date = new Date().toDateString();
  return (
    <>
      <header className="flex flex-row justify-between border-b-2 pb-2 border-oscar-dark-gold">
        <p id='date' className='mb-0'>{date}</p> 

        <button className="bg-oscar-dark-gold px-4 mb-2" onClick={() => setOpenRulesModal(true)}>HOW TO PLAY</button>
      </header>
      <RulesModal openRulesModal={openRulesModal} setOpenRulesModal={setOpenRulesModal}/>
    </>
  );
}

// Main component
function App() {
  const [movieCredits, setMovieCredits] = useState(null);
  const [moviePosterPath, setMoviePosterPath] = useState(null);
  const [movieGenre, setMovieGenre] = useState(null);

  const [chosenMovie, setChosenMovie] = useState({});

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const arrayLength = oscarData.length;

  // Seedable PRNG
  function mulberry32(seed) {
    return function() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Use the seedable PRNG to Fisher-Yates shuffle
  function shuffle(array, seed) {
    const random = mulberry32(seed);
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j =  Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // Combine shuffled number with hashed date
  function hashString(str) {
    let hash = 5381;
    for(let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  }

  // Get today's date and hash it to get random seed
  const today = new Date().toISOString().split('T')[0];
  // const today = '2025-05-29';
  const seed = hashString(today);
  const shuffledData = shuffle(oscarData, seed);
  const randomMovie = shuffledData[0];

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
  const genre = (movieGenre) ? ((movieGenre.genres[0]) ? (movieGenre.genres[0].name) : 'undefined') : null;

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
  let[openLossModal, setOpenLossModal] = useState(false);

  // Handle the user's guess to see if it matches the movie
  const handleGuess = (userGuess, userYear) => {
    if(gameWon || gameLoss) return;
    
    setGuessCredits(null);
    setGuessPosterPath(null);
    setGuessMovieGenre(null);

    let matchedMovie = null;
    
    if(userGuess.toLowerCase() === movie.toLowerCase() && userYear === year) {
      console.log("Correct!");
      matchedMovie = {movies: [{tmdb_id: tmdbId}], year};
    } else {
      matchedMovie = oscarData.find(
        m => (m.movies[0].title.toString().toLowerCase() === userGuess.toLowerCase() && 
          m.year === userYear
        )
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

  // Keep track of guesses and load from localStorage
  const [guesses, setGuesses] = useState(() => {
    const saved = localStorage.getItem('oscardle-guesses');
    return saved ? JSON.parse(saved) : [];
  });

  // Save guesses to localStorage
  useEffect(() => {
    localStorage.setItem('oscardle-guesses', JSON.stringify(guesses));
  }, [guesses]);

  // Keep track of the number of guesses and load from localStorage
  const [numberOfGuesses, setNumberOfGuesses] = useState(() => {
    const saved = localStorage.getItem('oscardle-number-of-guesses');
    return saved ? JSON.parse(saved) : 0;
  });

  // Save number of guesses made to localStorage
  useEffect(() => {
    localStorage.setItem('oscardle-number-of-guesses', JSON.stringify(numberOfGuesses));
  }, [numberOfGuesses]);

  // Keep track of win/loss and load from localStorage
  let [gameWon, setGameWon] = useState(() => {
    const saved = localStorage.getItem('oscardle-game-won');
    return saved ? JSON.parse(saved) : false;
  });
  let [gameLoss, setGameLoss] = useState(() => {
    const saved = localStorage.getItem('oscardle-game-loss');
    return saved ? JSON.parse(saved) : false;
  });

  // Save win/loss states to localStorage
  useEffect(() => {
    localStorage.setItem('oscardle-game-won', JSON.stringify(gameWon));
  }, [gameWon]);
  useEffect(() => {
    localStorage.setItem('oscardle-game-loss', JSON.stringify(gameLoss));
  }, [gameLoss]);

  // Gathering info of movie guess.
  useEffect(() => {
    if(!guessTmdbId || !guessCredits || !guessPosterPath || !guessMovieGenre) return;

    setChosenMovie({
      title: movie,
      director: director,
      genre: genre,
      year: year,
      wins: wins,
      moviePoster: moviePoster,
    });

    const guessMovie = oscarData.find(m => m.movies?.[0]?.tmdb_id === guessTmdbId);

    if(!guessMovie) return;

    const guessTitle = guessMovie.movies[0].title;
    const guessYear = guessMovie.year;


    // Skip if the movie was already guessed
    if (guesses.find(g => g.title.toLowerCase() === guessTitle.toLowerCase() && g.year === guessYear)) {
      console.log("Duplicate guess. Ignoring.");
      return;
    }

    // Number of guesses
    if (numberOfGuesses >= 8) {
      console.log("Maximum number of guesses reached.");
      setGameLoss(true);
      setOpenLossModal(true);
      return;
    }

    // Check if game is won
    if(gameWon === true) return;
    
    setNumberOfGuesses(guesses.length +1);
    console.log("Number of guesses: " + numberOfGuesses + "/8");

    var guessWins = getWins(guessTitle);
    const guessDirector = guessCredits.crew.find(person => person.job === 'Director')?.name;
    const guessPoster = (guessPosterPath?.posters?.length > 0)
                        ? 'https://image.tmdb.org/t/p/original/' + guessPosterPath.posters[0].file_path
                        : null;
    const guessGenre = (guessMovieGenre.genres[0]) ? guessMovieGenre.genres[0].name : 'undefined';
    
    console.log("Movie Guess: " + guessTitle + ". ID: " + guessTmdbId + ". Director: " + guessDirector + ". Year: " + guessYear + ". Win: " + guessWins + ". Poster: " + guessPoster + ". Genre: " + guessGenre);

    const guessStatus = {
      title: guessTitle === movie ? 'bg-oscar-emerald' : 'bg-oscar-red',
      director: guessDirector === director ? 'bg-oscar-emerald' : 'bg-oscar-red',
      year: guessYear === year ? 'bg-oscar-emerald' : ((guessYear <= parseInt(year) + 10) && guessYear >= parseInt(year) -10) ? 'bg-oscar-light-gold' : 'bg-oscar-red',
      yearSymbol: guessYear < parseInt(year)
        ? "up"
        : guessYear > parseInt(year)
          ? "down"
          : "",
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
      {/* <Example/> */}
      <h1 className="text-oscar-light-gold text-5xl sm:text-9xl mt-6">OSCARDLE</h1>
      <GuessBar onGuessSubmit={handleGuess} numberOfGuesses={numberOfGuesses}/> 
      <GuessTable guesses={guesses}/>
      <WinModal openWinModal={openWinModal} setOpenWinModal={setOpenWinModal} chosenMovie={chosenMovie}/>
      <LossModal openLossModal={openLossModal} setOpenLossModal={setOpenLossModal} chosenMovie={chosenMovie}/>
    </div>
  );
}

export default App
