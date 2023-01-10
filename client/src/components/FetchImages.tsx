import {useState, useEffect} from 'react'

interface IImage {
    id: String;
    urls: {
        small: String;
    };
    alt_description: String;
}


const FetchImages = () => {
    const [images, setImages] = useState<IImage[] | [] >([])
    const [query, setQuery] = useState<string>('labrador')

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=2&query=dog&client_id=L3CidU1rHwiHMCusYMiYAz--VdxQ6ZGptgp93RpW0R4`)
            const data = await response.json();
            setImages(data.results)
        }
        fetchImages()
    }, [])

  return (
    <>
    <div>fetchImages</div>
    {images.map((image, index) => {
        return (
            <div key={index}>
                <img src={image.urls.small.toString()} alt={image.alt_description.toString()}/>
                <p>{image.urls.small}</p>
            </div>
        )
    })}
    </>
  )
};

export default FetchImages;