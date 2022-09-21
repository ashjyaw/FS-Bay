//  import React, {useState} from 'react';

import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';


/**
 * @return {object} JSX Table
 */
const Demo = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
}));

/**
 * @return {object} JSX Table
 * @param {props} props
 */
function Mailbox(props) {
  const curEmails = props.mail[0];
  return (
    <div style={{padding: '20px'}}>
      <Box sx={{flexGrow: 1, maxWidth: 800}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>
              {''}
            </Typography>
            <Demo>
              <List >
                {
                  curEmails.mail.sort((a, b) => (a.received < b.received) ?
                    1 : -1).map( (mail) => {
                    return (
                      props.userName === mail.to.email ? (<ListItem>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                          className='top'
                          aria-label='mailpiece'
                          label='mailpiece'
                          primary={mail.from.name}
                          secondary={mail.subject +'...   '+
                        (new Date(mail.received).toLocaleDateString('en-US')===
                            new Date().toLocaleDateString('en-US') ?
                          'today' :
                          new Date(mail.received).toLocaleDateString('en-US'))}
                        />
                      </ListItem>) : null
                    );
                  })
                }
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Mailbox;
