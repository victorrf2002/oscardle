import './App.css'

function GuessAnswerRow() {
 return(
  <tr>
    <td>The Social Network</td>
    <td>David Fincher</td>
    <td>2011</td>
    <td>Best Director</td>
    <td>Yes</td>
  </tr> 
 )
  
}

function GuessCategoryRow() {

  return(
        
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Director</th>
      <th scope="col">Year</th>
      <th scope="col">Nomination</th>
      <th scope="col">Win</th>
    </tr>
  )
}

// Component for the whole Guess table section
function GuessTable() {
  return (

    <div class="relative overflow-x-auto">
      <table class=" mt-10 w-full text-left rtl:text-right text-lg table-auto">
        <thead>
          <GuessCategoryRow/>
        </thead>

        <tbody>
          <GuessAnswerRow/>
        </tbody>
      
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

function Header() {
  return (
    <header class="flex flex-row justify-between border-b-2 pb-2 border-oscar-dark-gold">

      {/* this is just a placeholder CHANGE AFTER */}
      <p id='date' class='mb-0'>APRIL 9, 2025</p> 

      <button class="bg-oscar-dark-gold px-4 mb-2">HOW TO PLAY</button>
    </header>
  );
}

function App() {

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
