import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import puppyLogo from './puppy512.png';
import './App.css';
import './puppy.css'

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

  const [puppyId, setPuppyId] = useState<String>("");
  const [puppy, setPuppy] = useState<IPuppy | null>(null);
  const [newPuppy, setNewPuppy] = useState<IPuppy>({puppyId: 0, name: '', dob: '', breed: ''});
  const [puppies, setPuppies] = useState<IPuppies | null>(null);
  const [message, setMessage] = useState<String>("");
  
  const [trigger, setTrigger] = useState<Boolean>(false);
  const [puppyTrigger, setPuppyTrigger] = useState<Boolean>(false);
  const [addNewPuppy, setAddNewPuppy] = useState<Boolean>(false);

  
  const fetchAllPuppiesTrigger = () => {
    setTrigger(!trigger);
    setPuppy(null)
  }


  useEffect(() => {
    const fetchAllPuppies = async () => {
      const response = await Axios.get('http://localhost:8080/api/puppies');
      const data = await response.data.puppies;      
      setPuppies({
        puppies: data
      })
      // setPuppy(null)
   }
    fetchAllPuppies();
  }, [trigger])

  useEffect(() => {
    if(puppyId === "") return;
    const fetchAPuppy = async (id: String) => {
      const response = await Axios.get(`http://localhost:8080/api/puppies/${id}`);
      setPuppies(null)
      setPuppy(response.data)
    }
    fetchAPuppy(puppyId);
    setPuppyId("");
  }, [puppyTrigger])

  const postNewPuppy = async (newPuppy: IPuppy) => {
    const newPuppyPost = {
      method: 'POST',
      headers: { 'Origin': 'http://localhost:3001',
      'Content-Type': 'application/json',
     },
      data: JSON.stringify(newPuppy)
  };
    const response = await Axios.post(`http://localhost:8080/api/puppies`, newPuppyPost);
    const data = await response.data;
    setPuppyId(data.puppyId.toString())
    setPuppyTrigger(!puppyTrigger);
    setAddNewPuppy(false);
}

  const deletePuppy = async (id: String) => {
    const newPuppyPost = {
      method: 'DELETE',
      headers: { 'Origin': 'http://localhost:3001',
      'Content-Type': 'application/json',
     }
    }
    const response = await Axios.delete(`http://localhost:8080/api/puppies/${id}`);
    const data = await response.data;
    setMessage("Puppy " + data.name + " has been deleted!")
    const createMessage = () => {
      setTimeout (() => {
        setMessage("");
      }, 3000)
    }
    createMessage();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>Puppies</p>
        <img src={puppyLogo} className="App-logo" alt="logo" />
     
      <main>
        <form >
          <label>
            <p>search for an individual Puppy using their ID:</p>
            <input 
              type="text" 
              name="puppyId"
              value={puppyId.toString()} 
              onChange={(e)=>setPuppyId(e.target.value)} 
              placeholder='e.g. 1, 2, 3...'
            />
          </label>
        </form>
        {puppy?
          <>
            <button onClick={()=> {setPuppyTrigger(!puppyTrigger)}}>Search again</button>

          </>
          :
          <>
            <button onClick={()=> {setPuppyTrigger(!puppyTrigger)}}>Search</button>

          </>
        }
        {!puppies?
          <button onClick={fetchAllPuppiesTrigger}>See ALL the Puppies</button> :
          null
        }

        <article>
          {addNewPuppy?
          <>
            <form>
              <label>
                Name:
                <input type="text" name="name" onChange={(e)=>setNewPuppy({...newPuppy, name: e.target.value})}/>
              </label>
              <label>
                DOB:
                <input type="date" name="dob" onChange={(e)=>setNewPuppy({...newPuppy, dob: e.target.value})}/>
              </label>
              <label>
                Breed:
                <input type="text" name="breed" onChange={(e)=>setNewPuppy({...newPuppy, breed: e.target.value})}/>
              </label>
            </form>
            <button onClick={()=>postNewPuppy(newPuppy)}>Add a Puppy</button>
          </>
          : <button onClick={()=>setAddNewPuppy(!addNewPuppy)}><h2>Add a Puppy</h2></button>}
        </article>

        <article>
          {puppy?
            <>
              {message?
                <p>{message}</p> :
                null
              }
              <div className='puppy-list'>
                <div key={Number(puppy.puppyId)} className='puppy-card'>
                  <h3>{puppy.name}</h3>
                  <p>Born: {puppy.dob}</p>
                  <p>Breed: {puppy.breed}</p>
                  <p>Puppy Id number: {puppy.puppyId.toString()}</p>
                  <button onClick={()=>deletePuppy(puppy.puppyId.toString())}>Delete</button>
                </div>
              </div> 
            </> :
            null
            }
        </article>

        <article>
            {puppies?
              <div className='puppy-list'>
                {puppies.puppies.map((puppy) => {
                  return (
                    <div key={Number(puppy.puppyId)} className='puppy-card puppy-card-inlist' onClick={()=>{
                      setPuppyId(puppy.puppyId.toString());
                      setPuppyTrigger(!puppyTrigger);
                    }}>
                      <h4>{puppy.name}</h4>
                      <p>{puppy.name}'s Id number: {puppy.puppyId.toString()}</p>
                    </div>
                  )
                })}
              </div> :
              <button onClick={fetchAllPuppiesTrigger}>See ALL the Puppies</button>
            }
        </article>

          
      </main>
      {/* header will be moved! */}
      </header>
    </div>
  );
}

export default App;
