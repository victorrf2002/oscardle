
import './App.css'

// Component for guess input
function GuessBar() {

  return (
    <div>
        <form>
          <input name="guess-input" type="text" id="guess-input" required placeholder='Enter movie...'/>
          <button>Ok</button>
        </form>
    </div>
  )

}

function Header() {
  return (
    <header class="flex flex-row justify-between border-b-2 pb-2">

      {/* this is just a placeholder CHANGE AFTER */}
      <p id='date'>APRIL 9, 2025</p> 

      <button class="bg-amber-300">HOW TO PLAY</button>
    </header>
  );
}

function App() {

  return (
    <div>
      <Header/>
      <h1>OSCARDLE</h1>
      <GuessBar />
    </div>
    
  );
}

export default App
