import React, { useContext } from 'react'
import {useState, useEffect} from 'react'
import { ThemeContext } from '../context/context'

interface AddNewPuppyProps {
    setNewPuppy: React.Dispatch<React.SetStateAction<any>>
    newPuppy: any
    postNewPuppy: (newPuppy: any) => void
    setAddNewPuppy: React.Dispatch<React.SetStateAction<Boolean>>
    addNewPuppy: Boolean
}

interface IImage {
    id: String;
    urls: {
        small: String;
        regular: String;
    };
    alt_description: String;
}

const AddNewPuppy = ({setNewPuppy, newPuppy, postNewPuppy, setAddNewPuppy, addNewPuppy}: AddNewPuppyProps) => {

    const [images, setImages] = useState<IImage[] | [] >([])
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=L3CidU1rHwiHMCusYMiYAz--VdxQ6ZGptgp93RpW0R4`)
            const data = await response.json();
            setImages(data.results)
            console.log(data.results);
            
        }
        fetchImages()
    }, [query, page])

  return (
    <div className='add-puppy-form column' >
        <form className="input column">
            <label>Name:</label>
            <input type="text" name="name" onChange={(e)=>setNewPuppy({...newPuppy, name: e.target.value})}/>
            <label>DOB:</label>
            <input type="date" name="dob" onChange={(e)=>setNewPuppy({...newPuppy, dob: e.target.value})}/>
            <label>Breed:</label>
            <input type="text" name="breed" onChange={(e)=>setNewPuppy({...newPuppy, breed: e.target.value})}/>
            <button onClick={(e)=>{setQuery(newPuppy.breed); setPage(1); e.preventDefault()}}>Search for images</button>
            <div className='chosen-image'>
            {newPuppy.image? <img className="image-small" onClick={()=>setNewPuppy({...newPuppy, image: ''})} src={newPuppy.image}></img> : null}
            </div>
        </form>
        <button onClick={()=>{postNewPuppy(newPuppy); setPage(0); setAddNewPuppy(!addNewPuppy); setNewPuppy(null)  }}>submit</button>
        <button onClick={()=>setAddNewPuppy(!addNewPuppy)}> cancel </button>
        
        {images?
            <div className='row'>
                {page>1? <button onClick={()=>setPage(Number(page-1))}>previous page</button> : null}
                <button onClick={()=>setPage(Number(page+1))}>next page</button>
            </div> : null
        }
        
        <div className='choose-image'>
            {images? 
            <>  {images.map((image, index) => {
            return (
                <div key={index}>
                    <img src={String(image.urls.small)} alt={String(image.urls.small)} onClick={()=>setNewPuppy({...newPuppy, image: image.urls.small.toString(), imageLarge: image.urls.regular.toString()})
                    }/>
                </div>
            )
            })}
            </>: <p>no photos</p>}
        </div>
    </div>
  )
}

export default AddNewPuppy