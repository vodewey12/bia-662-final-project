import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextArea from './components/textarea';
import MessageCard from './components/message';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {

  const [heartRate, setHeartRate] = useState('');
  const [activity, setActivity] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ heartRate, activity }),
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
        </Grid>
      </main>
      <div className={styles.textArea}>
        <TextArea>
        </TextArea>
      </div>

    </div>
  );
}
