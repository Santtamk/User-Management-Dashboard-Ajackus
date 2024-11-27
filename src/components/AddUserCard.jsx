import React, { useState } from 'react'

const AddUserCard = ({ addUser }) => {
  const [showAdd, setShowAdd] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        addUser(e.target.name.value, e.target.email.value, e.target.company.value)
        e.target.name.value = '';
        e.target.email.value = '';
        e.target.company.value = '';
    }


  return (
    <div>
      {showAdd ? (
        <form onSubmit={handleOnSubmit}>
          <br/>
            <input placeholder='Name' name='name' required/>
            <input placeholder='Email' name='email' required/>
            <input placeholder='Company' name='company' required/>
            <button onSubmit={handleOnSubmit} className='btn btn-info'>Add User</button>
        </form>
      ) : (
        <>
        <button onClick={() => setShowAdd(!showAdd)} className='btn btn-info'>Create New User</button>
        </>
      )}
        
    </div>
  )
}

export default AddUserCard