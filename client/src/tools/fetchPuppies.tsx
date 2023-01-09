import Axios from 'axios';

interface IPuppy {
    puppyId: Number;
    name: String;
    dob: String;
    breed: String;
  }

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



export const postNewPuppy = async (puppy: IPuppy) => {
    const response = await Axios.post(`http://localhost:3000/api/puppies`, puppy);
    const data = await response.data;
    return data;
}
