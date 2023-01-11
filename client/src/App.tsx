import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import Axios from 'axios';
// import puppyLogo from './puppy512.png';
import puppyFavicon from './assets/favicon-32x32.png'
import './App.css';
import './puppy.css';
import EditPuppy from './components/EditPuppy';
import AddNewPuppy from './components/AddNewPuppy';
import PuppyModal from './components/PuppyModal';
import { ThemeContext } from './context/context'
import { fetchPuppies } from './tools/fetchPuppies';



interface IPuppy {
  puppyId: Number;
  name: String;
  dob: String;
  breed: String;
  image: String;
}

interface IPuppies {
  puppies: IPuppy[];
}


function App() {

  const [puppyId, setPuppyId] = useState<string>("");
  const [puppy, setPuppy] = useState<IPuppy | null>(null);
  const [newPuppy, setNewPuppy] = useState<IPuppy>({puppyId: 0, name: '', dob: '', breed: '', image: ''});
  const [puppies, setPuppies] = useState<IPuppies | null>(null);
  const [message, setMessage] = useState<String>("");
  
  const [trigger, setTrigger] = useState<Boolean>(false);
  const [puppyTrigger, setPuppyTrigger] = useState<Boolean>(false);
  const [addNewPuppy, setAddNewPuppy] = useState<Boolean>(false);
  const [editPuppy, setEditPuppy] = useState<Boolean>(false);
  const [editPuppyName, setEditPuppyName] = useState<Boolean>(false);
  const [editPuppyDOB, setEditPuppyDOB] = useState<Boolean>(false);
  const [editPuppyBreed, setEditPuppyBreed] = useState<Boolean>(false);
  const [searchError, setSearchError] = useState<string>('');

  const [more, setMore] = useState<Boolean>(false);

  // const fetchAllPuppiesTrigger = () => {
  //   setTrigger(!trigger);
  //   setPuppy(null)
  // }

  const fetchAllPuppies = async () => {
    const response = await Axios.get('http://localhost:8080/api/puppies');
    const data = await response.data.puppies;      
    setPuppies({
      puppies: data
    })
 }

  useEffect(() => {
    fetchAllPuppies();
  }, [trigger])

  function containsNumbers(id: string) {
    return /\D/.test(id);
  }

  useEffect(() => {
    if(puppyId === "") return;
    const fetchAPuppy = async (id: string) => {
      if(!containsNumbers(id)) {
        const response = await Axios.get(`http://localhost:8080/api/puppies/${id}`);
        {response.status === 204 ? 
          setSearchError(`Sorry, puppy with Id number ${id} could not be found. Please try again or click 'see all puppies'`) : 
        setPuppy(response.data)}
      } else {
        const response = await Axios.get(`http://localhost:8080/api/puppies/name/${id}`);
        {response.status === 204 ? 
           setSearchError(`Sorry, "${id}" could not be found. Please try again or click 'see all puppies'`) : 
        setPuppy(response.data)
        setPuppyId(response.data.puppyId.toString())}
      }
    }
    setPuppy(null);
    fetchAPuppy(puppyId); 
    setTimeout(() => {
      scrollToPuppy();
    }, 400)  
    setTimeout(() => {
      setSearchError('');
    }, 4000)  
  }, [puppyTrigger])

  const postNewPuppy = async (newPuppy: IPuppy) => {
    const newPuppyPost = {
      method: 'POST',
      headers: { 'Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
     },
      data: JSON.stringify(newPuppy)
  };
    const response = await Axios.post(`http://localhost:8080/api/puppies`, newPuppyPost);
    const data = await response.data;
    setPuppyId(data.puppyId.toString())
    setPuppyTrigger(!puppyTrigger);
    setTrigger(!trigger);
    setAddNewPuppy(false);
}

  const deletePuppy = async (id: String) => {
    const deletePuppy = {
      method: 'DELETE',
      headers: { 'Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
     }
    }    
    const response = await Axios.delete(`http://localhost:8080/api/puppies/${id}`, deletePuppy);
    const data = await response.data;
    setMessage("Puppy " + data.name + " has been deleted!")
    const createMessage = () => {
      setTimeout (() => {
        setMessage("");
      }, 2000)
    }
    createMessage();
    setTrigger(!trigger);
    setTimeout(() => {
      scrollToPuppies();
    }, 1000)
    setTimeout(() => {
      setPuppy(null);
    }, 2000)
    
  }

  const updatePuppy = async (id: String) => {    
    const newPuppyPost = {
      method: 'PUT',
      headers: { 'Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
     },
     data: JSON.stringify(puppy)
    }
    console.log(id, puppyId)
    const response = await Axios.put(`http://localhost:8080/api/puppies/${id}`, newPuppyPost);
    console.log('response',response);
    
    const data = await response.data;
    setPuppyId(data.puppyId.toString())
    // setEditPuppy(false);
  }

  const handleEditPuppy = (type: String) => {
    if(type === 'set to false') {
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
  const puppySection = useRef<HTMLDivElement>(null);

  const scrollToPuppies = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: allPuppiesSection.current?.offsetTop
    });
  };

  const scrollToPuppy = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: puppySection.current?.offsetTop
    });
  };

  const seePuppies = async () => {
    if(!puppies) fetchAllPuppies();
    setTimeout(() => {
      scrollToPuppies();
    }, 500)
  }

  
  return (
    <div className="App">
      {searchError? <p className="error-message-dropdown">{searchError}</p> : null}
      <header className="App-header">
        <div className='row nav-search'>
          <img src={puppyFavicon} alt="puppy" />
          <div className='search-bar'>
                <input 
                  type="text" 
                  name="puppyId"
                  value={puppyId.toString()} 
                  onChange={(e)=>setPuppyId(e.target.value)} 
                  placeholder='name or Id number' />
            <button onClick={()=> {setPuppyTrigger(!puppyTrigger)}}>search</button>
          </div>
        </div>
        <div className='row m10'>
          <button onClick={seePuppies}>See all Puppies</button>
          <button onClick={()=>setAddNewPuppy(!addNewPuppy)}> Add a Puppy </button>
        </div>

      </header>
     
      <main>
        
        <article>
          {addNewPuppy?
          <>
          <AddNewPuppy setNewPuppy={setNewPuppy} newPuppy={newPuppy} postNewPuppy={postNewPuppy} setAddNewPuppy={setAddNewPuppy} addNewPuppy={addNewPuppy}>
            <p>hello world</p>
          </AddNewPuppy>
          </> : 
          null}
        </article>

        <article className='welcome-page'>
            <section className='welcome-page-section'>
              <div className='welcome-page-text-container'>
                <h1>showmethedoggos.com</h1>
                <h2>Because the internet needs another place to put your pet photos and data</h2>
                <button className='welcome-page-button' onClick={seePuppies}>See all Doggos</button>
                <p>or</p>
                <form>
                  <label>
                  <input 
                    type="text" 
                    name="puppyId"
                    value={puppyId.toString()} 
                    onChange={(e)=>setPuppyId(e.target.value)} 
                    placeholder='insert Id number...'
                  />
                  </label>
                </form>
                <button onClick={()=> {setPuppyTrigger(!puppyTrigger)}}>Search</button>

              </div>
            </section>
          </article>
        

        
          {puppy?
            <>
              <div key={Number(puppy.puppyId)} className='puppy-card-solo' ref={puppySection}>
                <img src={puppy.image.toString()}></img>
                <div className="column puppy-details">
                  <button onClick={()=>{setPuppy(null); handleEditPuppy("set to false");}}>close</button>
                  
                    <EditPuppy 
                      editState={editPuppyName} 
                      puppyValue={puppy.name} 
                      editTarget="name" 
                      setPuppy={setPuppy} 
                      puppy={puppy} 
                      setEditState={setEditPuppyName}
                      puppyId={puppyId}
                      updatePuppy={updatePuppy}
                      inputType="text">
                        
                      </EditPuppy>
                    <EditPuppy
                      editState={editPuppyDOB}
                      puppyValue={puppy.dob}
                      editTarget="dob"
                      setPuppy={setPuppy}
                      puppy={puppy}
                      setEditState={setEditPuppyDOB}
                      puppyId={puppyId}
                      updatePuppy={updatePuppy}
                      inputType="date">
                        date of birth:
                    </EditPuppy>
                    <EditPuppy
                      editState={editPuppyBreed}
                      puppyValue={puppy.breed}
                      editTarget="breed"
                      setPuppy={setPuppy}
                      puppy={puppy}
                      setEditState={setEditPuppyBreed}
                      puppyId={puppyId}
                      updatePuppy={updatePuppy}
                      inputType="text">
                        breed:
                    </EditPuppy>
                  
                    <p>Puppy Id number: {puppy.puppyId.toString()}</p>
                  { more?
                      <>
                        
                        {message?
                          <p>{message}</p> :
                          null
                        }
                        {editPuppy?
                        <>
                          <button onClick={()=>setTrigger(!trigger)}>Update puppy</button>
                          <button onClick={()=>handleEditPuppy('set to false')}>Cancel</button>
                        </> :
                        <button onClick={()=>handleEditPuppy('edit')}>Edit puppy</button>}
                        <br></br>
                        <button onClick={()=>deletePuppy(puppy.puppyId.toString())}>Delete {puppy.name}</button>
                        <button onClick={()=>setMore(false)}>^</button>
                      </> : 
                      <button onClick={()=>setMore(true)}>options</button>
                    }
                </div>
              </div> 
            </> :
            null
            }

        <article className='column'>
            {puppies?
              <div className='puppy-list' ref={allPuppiesSection}>
                {puppies.puppies.map((puppy) => {
                  return (
                    <div 
                      key={Number(puppy.puppyId)} 
                      className='puppy-card puppy-card-inlist' 
                      onClick={()=>{
                        setPuppyId(puppy.puppyId.toString());
                        setPuppyTrigger(!puppyTrigger);
                      }}>
                      {puppy.image? <img src={puppy.image.toString()}></img>: null}
                      <h5 className='m10'>{puppy.name}</h5>
                    </div>
                  )
                })}
              </div> :
              <button onClick={seePuppies}>See ALL the Puppies</button>
            }
        </article>          
      </main>
      <button onClick={goToTop}>Back to Top</button>
      
    </div>
  );
}

export default App;
