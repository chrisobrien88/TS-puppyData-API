import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import puppyLogo from './puppy512.png';
import './App.css';

interface IPuppy {
  puppyId: Number;
  name: String;
  dob: String;
  breed: String;
}

interface IPuppies {
  puppies: IPuppy[];
}

function App() {

  const [puppyId, setPuppyId] = useState<Number>(0);
  const [puppy, setPuppy] = useState<IPuppy | null>(null);
  const [puppies, setPuppies] = useState<IPuppies | null>(null);
  const [lookupPuppy, setLookupPuppy] = useState<Boolean>(false);

  const triggerSearch = () => {
    setLookupPuppy(!lookupPuppy);
    console.log(puppyId)
  }

  const fetchPuppies = async () => {
      const response = await Axios.get('http://localhost:3000/api/puppies');
      const data = await response.data.puppies;
      setPuppies({
        puppies: data
      })
   }
  
  useEffect (() => {
    const fetchAPuppy = async (id: Number) => {
      const response = await Axios.get(`http://localhost:3000/api/puppies/${id}`);
      
      const data = await response.data;
      console.log(data);
      
      setPuppy({
        puppyId: data.puppyId,
        name: data.name,
        dob: data.dob,
        breed: data.breed
      })
      }
      fetchAPuppy(puppyId);
    
  }, [triggerSearch])
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={puppyLogo} className="App-logo" alt="logo" />
        <p>
          Lets <code>fetch</code> some puppies.
        </p>
        <button onClick={fetchPuppies}>Fetch Puppies</button>
        <form >
          <label>
            Puppy ID:
            <input type="text" name="puppyId" onChange={(e)=>setPuppyId(Number(e.target.value))}/>
          </label>
        </form>
          <button onClick={triggerSearch}>Fetch a Puppy</button>
       

        {puppy?
          <div>
            <p>{puppy.name}</p>
            <p>{puppy.dob}</p>
            <p>{puppy.breed}</p>
          </div> :
          <p>Enter a number to find a puppy</p>
          }
        {puppies?
          <div>
            {puppies.puppies.map((puppy) => {
              return (
                <div>
                  <p>{puppy.name}</p>
                  <p>{puppy.dob}</p>
                  <p>{puppy.breed}</p>
                </div>
              )
            })}
          </div> :
          <p>Click the button to fetch puppies</p>
          }
          
      </header>
    </div>
  );
}

export default App;
