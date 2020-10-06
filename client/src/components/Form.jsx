import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';

const Form = () => {
  const initialUser = {
    name: '',
    position: '',
    company: ''
  };

  const [user, setUser] = useState('initialUser');
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveWishes = e => {
    e.preventDefault();
    const { name, position, company } = user;
    axios({
      url: 'birthday-wishes/add',
      method: 'POST',
      data: {
        name,
        position,
        company
      }
    })
      .then((response) => {
        props.addUser(response.data);
        setUser({
          name: '',
          company: '',
          position: ''
        });
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

        <Button variant="contained" color="primary" onClick={saveWishes}> Submit </Button>

      </form>
    );
  }

export default Form;
