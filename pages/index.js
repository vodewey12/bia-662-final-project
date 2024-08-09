import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import MessageCard from './components/message';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HeartChart from './components/heartChart';
import HeartRate from './components/heartRate';
import Title from './components/title'
import Slider from '@mui/material/Slider'
import MusicCard from './components/musicCard';

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to shuffle the array and select the first N elements
function getShuffledSubset(array, numElements) {
  const shuffledArray = shuffleArray([...array]); // Create a copy and shuffle
  return shuffledArray.slice(0, numElements); // Select the first N elements
}

const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numberOfElements = 4;


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [songs, setSongs] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [formDisabled, setFormDisabled] = useState([false]);
  const [value, setValue] = useState([50]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDisable = () => {
    setFormDisabled(true)
  }
  const handleSubmit = async (e) => {
    setFormDisabled(false)

    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, { text: inputValue, type: 'user', id: 'user' + Date.now().toString(), timestamp: new Date(Date.now()).toLocaleString() }]);

    // Call the model
    const modelRes = await fetch('/api/model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['1ZUv3ISx2nFaz0JimVdcoT', '6zmQ8bzlDIfngjy0Ba3w46', '7f1X6tauagdeqpfNuNOYWr', '2ckXnzyvgva2oE9FWjb405', '0emd9tHSVP4dK6UG4pcOFD']),
    });
    const modelData = await modelRes.json();
    if (modelData) {
      const shuffledList = getShuffledSubset(modelData.songList, 4)
      setSongs(shuffledList)
    }


    // const aiRes = await fetch('/api/chatgpt', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(inputValue),
    // });

    // const aiData = await aiRes.json();
    // if (aiData) {
    //   setMessages((prevMessages) => [...prevMessages, { text: data.quote.choices[0].message.content, type: 'ai', id: 'ai' + Date.now().toString(), timestamp: new Date(Date.now()).toLocaleString() }]);
    // }
    // setFormDisabled(false)
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>


                {/* Heart Rate Chart */}
                <Grid item xs={12}>
                  <Title>Heart Chart</Title>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      height: 200,
                    }}
                  >
                    <HeartRate />
                    <HeartChart />
                  </Paper>
                </Grid>

                {/* Chat */}
                <Grid item xs={12} md={9}>
                  <Title>Chat</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Paper sx={{ p: 2, height: '240px', maxHeight: '240px', overflowY: 'auto' }}>
                        <MessageCard key="123123" className={styles.messageCard} type='ai' timestamp={new Date(Date.now()).toLocaleString()} text='Tell the recommender about your current activiy'></MessageCard>
                        {messages.map((message) => (
                          <MessageCard key={message.id} className={styles.messageCard} type={message.type} timestamp={message.timestamp} text={message.text}></MessageCard>
                        ))}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                      >
                        <IconButton sx={{ p: '10px' }} color="primary" >
                          <AccountCircleIcon />
                        </IconButton>
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Set your target health rate and tell us what you are about to do or what you are currently doing"
                          inputProps={{ 'aria-label': 'ask for music recommendations' }}
                          value={inputValue}
                          onChange={handleInputChange}
                          disabled={handleDisable}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type='submit'>
                          <SendIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Set Heart Rate */}
                <Grid item xs={12} md={3} lg={3}>
                  <Title>Set Target Heart Rate</Title>

                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 307,
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ width: '100%', flexGrow: 1 }}>
                      <div style={{ alignContent: 'center', height: '70%' }}>
                        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                          <Box mb={2}>
                            <Typography variant="h2">{value}</Typography>
                          </Box>
                        </div>
                        <Slider
                          value={value}
                          onChange={handleSliderChange}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          min={0}
                          max={100}
                          style={{ width: '90%' }}
                        />
                      </div>
                    </div>
                  </Paper>
                </Grid>
                {/* <Grid container spacing={3} direction="row">
                  <Grid item xs={3}>
                    {songs.map((song) => (
                      <MusicCard name={song.name} artists={song.artists} />
                    ))}
                  </Grid>
                </Grid> */}
                {songs.map((song) => (
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                      <MusicCard name={song.name} artists={song.artists}/>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
          </Box>
        </Box>
      </main>

    </div >
  );
}
