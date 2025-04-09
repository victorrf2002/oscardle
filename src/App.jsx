
import './App.css'

function GameBoard() {
  return (
    <h1></h1>
  );
}

function Header() {
  return (
    <header>

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
      <GameBoard />
    </div>
    
  );
}

export default App
