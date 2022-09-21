import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Mailbox from './Mailbox';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../styles.css';

const fetchEmails = (setEmails, setIsLoaded) => {
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('http://localhost:3010/v0/mail', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setEmails(json);
      setIsLoaded(true);
    });
};
/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const [emails, setEmails] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = React.useState(user ? user.name : '');
  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    setName('');
    history('/');
  };
  React.useEffect(() => {
    fetchEmails(setEmails, setIsLoaded);
  }, []);
  //  check if the email.from is equal to the users email
  return (
    <div>
      <Box sx={{flexGrow: 1}} id='topbar'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              {isLoaded ? user.name:''}
            </Typography>
              (
            <div>
              <IconButton
                position="sticky"
                top="0px"
                size="large"
                aria-label="logoutUser"
                label = "logoutUser"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                disabled={!name}
                onClick={logout}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

            </div>
              )
          </Toolbar>
        </AppBar>
      </Box>
      {isLoaded ? <Mailbox mail={emails} userName={user.email}/> : null}
    </div>
  );
}

export default Home;
