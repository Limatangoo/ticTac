import logo from './logo.svg';
import './App.css';
import Grids from './game/Grids'
import Testing from './game/Testing'
import Block from './game/Block'
// import Gamelogic from './game/Gamelogic'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  
   <div className={`game container mx-my-auto`}>
    <div className={`row mt-5 p-5`}>
      <Grids />
    
    </div>
  
     
   </div>
   
  );
}

export default App;
