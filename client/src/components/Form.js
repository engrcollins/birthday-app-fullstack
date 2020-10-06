import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Form = (props) => {
  const initialUser = {
    name: '',
    position: '',
    company: ''
  };

  const [user, setUser] = useState(initialUser);
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveWishes = (e) => {
    e.preventDefault();
    const { name, position, company } = user;
    axios({
      url: '/birthday-wishes/add',
      method: 'POST',
      data: {
        name,
        position,
        company
      }
    })
      .then((response) => {
        let note = document.getElementById('formSubmit');
        setUser(initialUser);
        note.innerHTML = 'Message submitted. Thank you! 💖'
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
          name="company"
          value={user.company}
          id="standard-dense"
          onChange={handleChange}
          label="Company"
        />

        <TextField
          name="position"
          value={user.position}
          id="standard-dense"
          onChange={handleChange}
          label="Position"
        />
        <p id='formSubmit'></p>
        <Button variant="contained" color="primary" onClick={saveWishes}> Submit </Button>

      </form>
    );
  }

export default Form;
