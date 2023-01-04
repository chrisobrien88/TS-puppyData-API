import Axios from 'axios';

export const fetchPuppies = async () => {
    const response = await Axios.get('http://localhost:3000/api/puppies');
    const data = await response.data.puppies;
    return data;
    }

export const fetchAPuppy = async (id: Number) => {
    const response = await Axios.get(`http://localhost:3000/api/puppies/${id}`);
    console.log('clicked');
    
    const data = await response.data;
    
    return data;
    }
