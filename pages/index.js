import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MessageCard from './components/message';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValue),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      setSuggestion(data.suggestion);
    }
  };
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container rowSpacing={2} >
          <Grid md={100}>
            <MessageCard key={'120'} className={styles.messageCard} type={'user'} timeStamp={"testing"} text={"Hello"}></MessageCard>
          </Grid>
          <Grid md={100}>
            <MessageCard key={'120'} className={styles.messageCard} type={'ai'} timeStamp={"testing"} text={"Hello"}></MessageCard>
          </Grid>
          <Grid md={100}>
            <MessageCard key={'120'} className={styles.messageCard} type={'user'} timeStamp={"testing"} text={"Hello"}></MessageCard>
          </Grid>
          <Grid md={100}>
            <MessageCard key={'120'} className={styles.messageCard} type={'ai'} timeStamp={"testing"} text={"Hello"}></MessageCard>
          </Grid>
        </Grid>
      </main>
      <div className={styles.textArea}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <IconButton sx={{ p: '10px' }} color="primary" >
            <AccountCircleIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Ask for music recommendations"
            inputProps={{ 'aria-label': 'ask for music recommendations' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type='submit'>
            <SendIcon />
          </IconButton>
        </Paper>
      </div>

    </div>
  );
}
