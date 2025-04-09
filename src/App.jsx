
import './App.css'

// Component for guess input
function Guess() {

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
      <Guess />
    </div>
    
  );
}

export default App
