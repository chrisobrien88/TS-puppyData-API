// import React, { MouseEventHandler } from 'react'

interface IPuppy {
    puppyId: Number;
    name: String;
    dob: String;
    breed: String;
  }

interface IEditPuppy {
    editState: Boolean;
    puppyValue: String;
    editTarget: String;
    setPuppy: Function;
    puppy: IPuppy;
    setEditState: Function;
    puppyId: String;
    updatePuppy: Function;
    inputType: String;
}

const EditPuppy = ({editState, puppyValue, editTarget, setPuppy, puppy, setEditState, puppyId, updatePuppy, inputType}: IEditPuppy) => {
  return (
    <div>
        {editState?
                <div className='row'>
                    <p><input className='edit-puppy-text' type={inputType.toString()} name={editTarget.toString()} value={puppyValue.toString()} 
                    onChange={(e)=>setPuppy({...puppy, [e.target.name]: e.target.value})}/></p>
                    <button onClick={(e)=>{
                    e.preventDefault();
                    setEditState(false);
                    updatePuppy(puppyId)}
                    }>confirm</button>
                </div> :
                <div className='row'>
                    <p className='edit-puppy-text' onClick={()=>setEditState(true)}>{puppyValue}</p>
                    <button onClick={(e)=>{setEditState(true); e.preventDefault()}}>edit</button>
                </div>
                }
    </div>
  )
}

export default EditPuppy