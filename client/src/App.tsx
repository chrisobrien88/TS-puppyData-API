import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import puppyLogo from './puppy512.png';
import puppyFavicon from './assets/favicon-32x32.png'
import './App.css';
import './puppy.css'
import EditPuppy from './components/EditPuppy';

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
  const [editPuppy, setEditPuppy] = useState<Boolean>(false);
  const [editPuppyName, setEditPuppyName] = useState<Boolean>(false);
  const [editPuppyDOB, setEditPuppyDOB] = useState<Boolean>(false);
  const [editPuppyBreed, setEditPuppyBreed] = useState<Boolean>(false);

  const [more, setMore] = useState<Boolean>(false);

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

  const updatePuppy = async (id: String) => {
    const newPuppyPost = {
      method: 'PUT',
      headers: { 'Origin': 'http://localhost:3001',
      'Content-Type': 'application/json',
     },
     data: JSON.stringify(puppy)
    }
    const response = await Axios.put(`http://localhost:8080/api/puppies/${id}`, newPuppyPost);
    const data = await response.data;
    setPuppyId(data.puppyId.toString())
    setEditPuppy(false);
  }

  const handleEditPuppy = (type: String) => {
    if(type === 'cancel') {
      setEditPuppyName(false);
      setEditPuppyDOB(false);
      setEditPuppyBreed(false);
      setEditPuppy(false);
    } else {
      setEditPuppyName(true);
      setEditPuppyDOB(true);
      setEditPuppyBreed(true);
      setEditPuppy(true);
    }
  }

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  };

  
  const allPuppiesSection = useRef<HTMLDivElement>(null);

  const scrollToPuppies = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: allPuppiesSection.current?.offsetTop
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='row nav-search'>
          <img src={puppyFavicon} alt="puppy" />
          <form >
            <label>
              <input 
                type="text" 
                name="puppyId"
                value={puppyId.toString()} 
                onChange={(e)=>setPuppyId(e.target.value)} 
                placeholder='Search for a Puppy using their Id'
              />
            </label>
          </form>
          <button onClick={()=> {setPuppyTrigger(!puppyTrigger)}}>Search</button>
          <button onClick={()=> {fetchAllPuppiesTrigger(); scrollToPuppies()}}>See all Puppies</button>
        </div>
        <button onClick={()=>setAddNewPuppy(!addNewPuppy)}> Add a Puppy </button>
      </header>
     
      <main>
        <article>
          {addNewPuppy?
          <div className='add-puppy-form column' >
            <form className="input column">
              <label>Name:</label>
              <input type="text" name="name" onChange={(e)=>setNewPuppy({...newPuppy, name: e.target.value})}/>
              <label>DOB:</label>
              <input type="date" name="dob" onChange={(e)=>setNewPuppy({...newPuppy, dob: e.target.value})}/>
              <label>Breed:</label>
              <input type="text" name="breed" onChange={(e)=>setNewPuppy({...newPuppy, breed: e.target.value})}/>
            </form>
            <button onClick={()=>postNewPuppy(newPuppy)}>Submit</button>
            <button onClick={()=>setAddNewPuppy(!addNewPuppy)}> X </button>
          </div> : 
          null}
        </article>

        <article className='welcome-page'>
            <section className='welcome-page-section'>
              <div className='welcome-page-text-container'>
                <h1>showmethedoggos.com</h1>
                <h2>Because the internet needs another place to put your pet photos and data</h2>
                <button className='welcome-page-button' onClick={scrollToPuppies}>See Doggos</button>
              </div>
            </section>
          </article>

        <article>
          {puppy?
            <>
              {message?
                <p>{message}</p> :
                null
              }
              <div className='puppy'>
                <div key={Number(puppy.puppyId)} className='puppy-card-solo'>
               
                  <>
                    <form>
                      <EditPuppy 
                        editState={editPuppyName} 
                        puppyValue={puppy.name} 
                        editTarget="name" 
                        setPuppy={setPuppy} 
                        puppy={puppy} 
                        setEditState={setEditPuppyName}
                        puppyId={puppyId}
                        updatePuppy={updatePuppy}
                        inputType="text"
                     
                      />
                      <EditPuppy
                        editState={editPuppyDOB}
                        puppyValue={puppy.dob}
                        editTarget="dob"
                        setPuppy={setPuppy}
                        puppy={puppy}
                        setEditState={setEditPuppyDOB}
                        puppyId={puppyId}
                        updatePuppy={updatePuppy}
                        inputType="date"
                      />
                      <EditPuppy
                        editState={editPuppyBreed}
                        puppyValue={puppy.breed}
                        editTarget="breed"
                        setPuppy={setPuppy}
                        puppy={puppy}
                        setEditState={setEditPuppyBreed}
                        puppyId={puppyId}
                        updatePuppy={updatePuppy}
                        inputType="text"
                      />
                      <p>Puppy Id number: {puppy.puppyId.toString()}</p>
                    </form>
                  </> 
                  
                  {more?
                    <>
                      <button onClick={()=>deletePuppy(puppy.puppyId.toString())}>Delete</button>
                      {editPuppy?
                        <button onClick={()=>handleEditPuppy('cancel')}>Cancel</button> :
                      <button onClick={()=>handleEditPuppy('edit')}>Edit puppy</button>}
                      <br></br>
                      <button onClick={()=>setMore(false)}>^</button>
                    </> : 
                    <button onClick={()=>setMore(true)}>options</button>
                  }
                </div>
              </div> 
            </> :
            null
            }
        </article>

        <article>
            {puppies?
              <div className='puppy-list' ref={allPuppiesSection}>
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
      <button onClick={goToTop}>Back to Top</button>
      
    </div>
  );
}

export default App;
