import React from 'react'
import {useState, useEffect} from 'react'

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
    };
    alt_description: String;
}

const AddNewPuppy = ({setNewPuppy, newPuppy, postNewPuppy, setAddNewPuppy, addNewPuppy}: AddNewPuppyProps) => {

    const [images, setImages] = useState<IImage[] | [] >([])
    const [query, setQuery] = useState<string>('labrador')
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=L3CidU1rHwiHMCusYMiYAz--VdxQ6ZGptgp93RpW0R4`)
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
            <input type="text" name="breed" onChange={(e)=>{setNewPuppy({...newPuppy, breed: e.target.value}); setQuery(e.target.value)}}/>
            <div className='chosen-image'>
            {newPuppy.image? <img src={newPuppy.image}></img> : null}
            </div>
        </form>
        <button onClick={()=>postNewPuppy(newPuppy)}>Submit</button>
        <button onClick={()=>setAddNewPuppy(!addNewPuppy)}> X </button>
        <div className='choose-image'>
            
            {images? 
            <> {images.map((image, index) => {
            return (
                <div key={index}>
                    <img src={String(image.urls.small)} alt={String(image.urls.small)} onClick={()=>setNewPuppy({...newPuppy, image: image.urls.small.toString()})}/>
                </div>
                
            )
            })}
            <button onClick={()=>setPage(Number(page+1))}>More photos</button>
            <p>{page}</p>
            </>: <p>no images match that breed</p>}
        </div>
    </div>
  )
}

export default AddNewPuppy