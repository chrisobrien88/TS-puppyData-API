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
  const [newPuppy, setNewPuppy] = useState<IPuppy>({puppyId: 0, name: '', dob: '', breed: ''});
  const [puppies, setPuppies] = useState<IPuppies | null>(null);
  
  const [trigger, setTrigger] = useState<Boolean>(false);

  
  const fetchAllPuppiesTrigger = () => {
    setTrigger(!trigger);
  }


  useEffect(() => {
    const fetchAllPuppies = async () => {
      const response = await Axios.get('http://localhost:3000/api/puppies');
      const data = await response.data.puppies;
      console.log(data);
      
      setPuppies({
        puppies: data
      })
      setPuppy(null)
   }
    fetchAllPuppies();
  }, [trigger])
  
    const fetchAPuppy = async () => {
      const response = await Axios.get(`http://localhost:3000/api/puppies/${puppyId}`);
      
      const data = await response.data;
      console.log(data);
      setPuppies(null)
      setPuppy({
        puppyId: data.puppyId,
        name: data.name,
        dob: data.dob,
        breed: data.breed
      })
    }
   

  const postNewPuppy = async (newPuppy: IPuppy) => {
    const response = await Axios.post(`http://localhost:3000/api/puppies`, newPuppy);
    const data = await response.data;
    return data;
}
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Puppies</p>
        <img src={puppyLogo} className="App-logo" alt="logo" />
     
      <main>
        <p>
          Lets <code>see</code> some puppies.
        </p>
        <form >
          <label>
            or, search for an individual Puppy using their ID:
            <input type="text" name="puppyId" onChange={(e)=>setPuppyId(Number(e.target.value))}/>
          </label>
        </form>
        {puppy?
          <>
            <button onClick={fetchAPuppy}>Search again</button>
          </>
          :
          <>
            <button onClick={fetchAPuppy}>Search</button>
          </>
        }
        {!puppies?
          <button onClick={fetchAllPuppiesTrigger}>See ALL the Puppies</button> :
          null
        }
        
        <article>
          {puppy?
            <div>
              <p>{puppy.name}</p>
              <p>{puppy.dob}</p>
              <p>{puppy.breed}</p>
            </div> :
            <p>Enter a number to find a puppy</p>
            }
        </article>

        <article>
            {puppies?
              <div>
                {puppies.puppies.map((puppy) => {
                  return (
                    <div key={Number(puppy.puppyId)}>
                      <p>{puppy.name}</p>
                      <p>{puppy.dob}</p>
                      <p>{puppy.breed}</p>
                    </div>
                  )
                })}
              </div> :
              <button onClick={fetchAllPuppiesTrigger}>See ALL the Puppies</button>

            }
        </article>

        <article>
          <form>
            <label>
              Name:
              <input type="text" name="name" onChange={(e)=>setNewPuppy({...newPuppy, name: e.target.value})}/>
            </label>
            <label>
              DOB:
              <input type="text" name="dob" onChange={(e)=>setNewPuppy({...newPuppy, dob: e.target.value})}/>
            </label>
            <label>
              Breed:
              <input type="text" name="breed" onChange={(e)=>setNewPuppy({...newPuppy, breed: e.target.value})}/>
            </label>
          </form>
          <button onClick={()=>postNewPuppy(newPuppy)}>Add a Puppy</button>
        </article>

          
      </main>
      {/* header will be moved! */}
      </header>
    </div>
  );
}

export default App;
