import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Form = (props) => {
  const initialUser = {
    name: '',
    msgTitle: '',
    msgContent: ''
  };

  const [user, setUser] = useState(initialUser);
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveWishes = (e) => {
    e.preventDefault();
    const { name, msgTitle, msgContent } = user;
    axios({
      url: '/birthday-wishes/add',
      method: 'POST',
      data: {
        name,
        msgTitle,
        msgContent
      }
    })
      .then((response) => {
        let note = document.getElementById('formSubmit');
        setUser(initialUser);
        note.innerHTML = 'Message submitted successfully. Thank you! 💖'
        props.fetchUsers();
      })
      .catch(() => alert('Failed uploading data'))
  };
    return (
      <form className="form noValidate" autoComplete="off" onSubmit={saveWishes}>
        <h2>Please, Tell us about you</h2>
        <TextField
          id="standard-dense"
          value={user.name}
          label="Name"
          name="name"
          onChange={handleChange}
        />

        <TextField
          name="msgTitle"
          value={user.msgTitle}
          id="standard-dense"
          onChange={handleChange}
          label="Message Title"
        />
        
        <TextField
          name="msgContent"
          value={user.msgContent}
          id="standard-dense"
          onChange={handleChange}
          label="Message Content"
        />

        <p id='formSubmit'></p>
        <Button variant="contained" color="primary" onClick={saveWishes}> Submit </Button>

      </form>
    );
  }

export default Form;
