import React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LoginPage = () => {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history('/mail');
      });
  };
  return (
    <div id='login'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" component="div">
          CSE186 Email
        </Typography>
        <TextField name="email" type="email"
          id="emailin" onChange={handleInputChange}
          variant="outlined"
          aria-label="emailin"
          label="Email" />
        <TextField name="password" onChange={handleInputChange}
          id="passin" aria-label="Password*" label="Password*"
          variant="outlined"
          inputProps={{'data-testid': 'content-input'}}
          required/>
        <Button id='logina'
          aria-label="submitlog" onClick={onSubmit}
          variant="outlined"
          label='submitlog'
        >Sign In</Button>
      </Box>
    </div>
  );
};

export default LoginPage;
