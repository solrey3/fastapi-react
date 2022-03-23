import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import { ModalHealthFactorLatest } from './ModalHealthfactorLatest'; 
// import { Modal } from './Modal';
import styled from 'styled-components';
import { GlobalStyle } from '../globalStyles';
import {
  // Paper,
  // Grid,
  TextField,
  // Button,
  // FormControlLabel,
  // Checkbox,
} from '@material-ui/core';

import { getMessage, getHealthFactorLatest, getTotalBorrowLatest, getTotalCollateralLatest  } from '../utils/api';
import { isAuthenticated, isAdministrator } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#61dafb',
  },
  button: {
    textTransform: 'none',
  },
}));

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  height: flex;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export const Home: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const [showModal, setShowModal] = useState(false);
  // const [showModalHealthFactorLatest, setShowModalHealthFactorLatest] = useState(false);
  const classes = useStyles();
  const [user, setUser] = useState<string>('');
  const [healthFactorLatest, setHealthFactorLatest] = useState<string>('');
  const [totalBorrowLatest, setTotalBorrowLatest] = useState<string>('');
  const [totalCollateralLatest, setTotalCollateralLatest] = useState<string>('');


  const queryBackend = async () => {
    try {
      const message = await getMessage();
      setMessage(message);
    } catch (err) {
      setError(String(err));
    }
  };

  const queryHealthFactorLatest = async (user: string) => {
    setError('');
    try {
      const result = await getHealthFactorLatest(user);
      
      var valueHealthFactorLatest = Object.values(result)[0];

    } catch (err) {
      setError(String(err));
    }

  setHealthFactorLatest(String(valueHealthFactorLatest));
  };

  const queryTotalBorrowLatest = async (user: string) => {
    setError('');
    try {
      const result = await getTotalBorrowLatest(user);
      
      var valueTotalBorrowLatest = Object.values(result)[0];

    } catch (err) {
      setError(String(err));
    }

  setTotalBorrowLatest(String(valueTotalBorrowLatest));
  };

  const queryTotalCollateralLatest = async (user: string) => {
    setError('');
    try {
      const result = await getTotalCollateralLatest(user);
      
      var valueTotalCollateralLatest = Object.values(result)[0];

    } catch (err) {
      setError(String(err));
    }

  setTotalCollateralLatest(String(valueTotalCollateralLatest));
  };

  return (
    <>
      <h1>incyd</h1><br></br>
      {isAdministrator() &&
        <>
          <br></br>
          <a className={classes.link} href="/admin">
          Admin Dashboard
          </a>
          <br></br>
        </>
      }
      {isAuthenticated() ? (
        <>
          <div>
            <h3>Healthfactor Latest Data</h3>
              <p>Provide a user wallet address to calculate the health factor.</p>
              <TextField
                id="user"
                label="User Wallet Address"
                type="text"
                value={user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser(e.currentTarget.value)
                }
                fullWidth
                required
              />
              <br />
              <Button
                type="submit"
                color="primary"
                onClick={() => queryHealthFactorLatest(user)}
              >
                Calculate
              </Button>
              <p>The Health Factor is: {healthFactorLatest}</p>
              <br />
          </div>
          <div>
            <h3>Totalborrow Latest Data</h3>
              <p>Provide a user wallet address to calculate the total borrow.</p>
              <TextField
                id="user"
                label="User Wallet Address"
                type="text"
                value={user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser(e.currentTarget.value)
                }
                fullWidth
                required
              />
              <br />
              <Button
                type="submit"
                color="primary"
                onClick={() => queryTotalBorrowLatest(user)}
              >
                Calculate
              </Button>
              <p>The Total Borrow is: {totalBorrowLatest}</p>
              <br />
          </div>
          <div>
            <h3>Totalcollateral Latest Data</h3>
              <p>Provide a user wallet address to calculate the total collateral.</p>
              <TextField
                id="user"
                label="User Wallet Address"
                type="text"
                value={user}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUser(e.currentTarget.value)
                }
                fullWidth
                required
              />
              <br />
              <Button
                type="submit"
                color="primary"
                onClick={() => queryTotalCollateralLatest(user)}
              >
                Calculate
              </Button>
              <p>The Total Collateral is: {totalCollateralLatest}</p>
              <br />
          </div>
          <br></br>
          <Container>
            <Button >Healthfactor Historical Data</Button>
            <GlobalStyle />
          </Container>
          <br></br>
          <Container>
            <Button >Totalborrow Historical Data</Button>
            <GlobalStyle />
          </Container>
          <br></br>
          <Container>
            <Button >Totalcollateral Historical Data</Button>
            <GlobalStyle />
          </Container>
          <br></br>
          {!message && !error && (
            
            // <a className={classes.link} href="#" onClick={() => queryBackend()}>
            //   Click to make request to backend
            // </a>
            <button className={classes.button} onClick={() => queryBackend()}>Click to make request to backend</button>
          )}
          {message && (
            <p>
              <code>{message}</code>
            </p>
          )}
          {error && (
            <p>
              Error: <code>{error}</code>
            </p>
          )}
          <br></br>
          <a className={classes.link} href="/protected">
            Protected Route
          </a>
          <a className={classes.link} href="/api/docs">
            API Docs
          </a>
          <a className={classes.link} href="/logout">
            Logout
          </a>
        </>
      ) : (
        <>
          <a className={classes.link} href="/login">
            Login
          </a>
          <a className={classes.link} href="/signup">
            Sign Up
          </a>
        </>
      )}
      
    </>
  );
};
