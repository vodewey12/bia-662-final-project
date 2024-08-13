import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
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
import Title from './components/title'
import MusicCard from './components/musicCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

function gptSongParser(songString) {
  const songList = songString
    .slice(1, -1) // Remove the starting and ending brackets
    .split(/,\s*(?=\")/); // Split the string by comma followed by a space and a double quote

  return songList.map(song => {
    const match = song.match(/"(.*?)" by/);
    return match ? match[1] : '';
  });
}

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [songs, setSongs] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [targetHeartRate, setTargetHeartRate] = useState(100);
  const [visibleItems, setVisibleItems] = useState([]);
  const handleAddHeartRate = (event) => {
    setTargetHeartRate(targetHeartRate + 1)
  }
  const handleMinusHeartRate = (event) => {
    setTargetHeartRate(targetHeartRate - 1)
  }


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    if (songs.length > 0) {
      setSongs([])
      setVisibleItems([])
    }
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, { text: inputValue, type: 'user', id: 'user' + Date.now().toString(), timestamp: new Date(Date.now()).toLocaleString() }]);
    setInputValue("")

    /* First Call to GPT for songs recommendation */
    const aiRes = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        initialRole: "User will provide an activity for song recommendation. Recommend Provide 5 song name in a string array for easy parsing",
        inputValue: inputValue
      }),
    });

    const aiData = await aiRes.json();
    if (aiData) {
      const gptSongs = gptSongParser(aiData.quote.choices[0].message.content)


      // Classic Rock
      // const payload = {
      //   songIds: ['1ZUv3ISx2nFaz0JimVdcoT', '6zmQ8bzlDIfngjy0Ba3w46', '7f1X6tauagdeqpfNuNOYWr', '2ckXnzyvgva2oE9FWjb405', '0emd9tHSVP4dK6UG4pcOFD'],
      //   gptSongs: gptSongs,
      //   heartRate: targetHeartRate
      // };

      // Classical music
      // const payload = {
      //   songIds: ['1SCWBjhk5WmXPxhDduD3HM', '2SPOwMPEXB4Jm1MKzDH8Wc', '7mqytyJkLxRlywbwSHFvic', '0bIl07xePQKNUUaF9GQHIl', '0zzGHfLjR6rcQhF0Oo1k8i', '7cXjrcVIhug5vZxQ9IAhG8', '4exmbinJUBL4qaM4fPzN9y', '3KD6IGlsy0OmvQ5EZVSGwf', '34y6Gie19NTeapGMoqCHhl', '5WpawpylBtPOL0PBkHVH7W'],
      //   gptSongs: gptSongs,
      //   heartRate: targetHeartRate
      // };

      // Pop
      const payload = {
        songIds: ['0t1kP63rueHleOhQkYSXFY', '35mvY5S1H3J2QZyna3TFe0', '6Im9k8u9iIzKMrmV7BWtlF', '2U5WueTLIK5WJLD7mvDODv', '249gnXrbfmV8NG6jTEMSwD', '285pBltuF7vW8TeWk8hdRR', '3UoULw70kMsiVXxW0L3A33', '4HBZA5flZLE435QTztThqH', '6Hj9jySrnFppAI0sEMCZpJ', '5GkQIP5mWPi4KZLLXeuFTT'],
        gptSongs: gptSongs,
        heartRate: targetHeartRate
      };


      /* Call the API model to get recommendations from users' liked music and heart rate */
      const modelRes = await fetch('/api/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const modelData = await modelRes.json();
      if (modelData) {
        const shuffledList = getShuffledSubset(modelData.songList, 4)
        setSongs(shuffledList)

        const songNames = shuffledList.map(song => song.name).join(", ");
        /* Second call to chat gpt to format the songs recieved from the model and tells the user in a conversational way */
        const finalAiRes = await fetch('/api/chatgpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initialRole: "You will be provided a list of songs. Re state it and say it in a nice way for the user",
            inputValue: songNames
          }),
        });

        const aiMessage = await finalAiRes.json()
        if (aiMessage) {
          setMessages((prevMessages) => [...prevMessages, { text: aiMessage.quote.choices[0].message.content, type: 'ai', id: 'ai' + Date.now().toString(), timestamp: new Date(Date.now()).toLocaleString() }]);
        }
      }

    }
  }

  useEffect(() => {
    songs.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prevItems) => [...prevItems, item]);
      }, index * 500); // Adjust delay for each item
    });
  }, [songs]);


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
              flexGrow: 1,
              height: '100vh'
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chat */}
                <Grid item xs={12} md={9}>
                  <Title>Chat</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Paper sx={{ p: 2, height: '350px', maxHeight: '350px', overflowY: 'auto', backgroundColor: '#000000' }}>
                        <MessageCard key="123123" className={styles.messageCard} type='ai' timestamp={new Date(Date.now()).toLocaleString(([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }))} text='Tell the recommender about your current activiy'></MessageCard>
                        {messages.map((message) => (
                          <MessageCard key={message.id} className={styles.messageCard} type={message.type} timestamp={message.timestamp} text={message.text}></MessageCard>
                        ))}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#000000' }}
                      >
                        <IconButton sx={{ p: '10px' }} color="primary" >
                          <AccountCircleIcon />
                        </IconButton>
                        <InputBase
                          sx={{ ml: 1, flex: 1, color: 'white' }}
                          placeholder="Set your target health rate or tell us what you are about to do or what you are currently doing"
                          inputProps={{ 'aria-label': 'ask for music recommendations' }}
                          value={inputValue}
                          onChange={handleInputChange}
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

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Title>Current Heart Rate</Title>

                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 120,
                          justifyContent: 'center',
                          backgroundColor: '#000000'
                        }}
                      >
                        <Typography variant="h2" color='white'> 120 bpm</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Title>Set Target Heart Rate</Title>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 204,
                          justifyContent: 'center',
                          backgroundColor: '#000000'
                        }}
                      >
                        <div style={{ width: '100%', flexGrow: 1 }}>
                          <div style={{ alignContent: 'center', height: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                              <IconButton size="large" sx={{ color: 'white' }} onClick={handleAddHeartRate}>
                                <ArrowUpwardIcon />
                              </IconButton>
                              <Box>
                                <Typography variant="h2" color='white'>{targetHeartRate}</Typography>
                              </Box>
                              <IconButton size="large" sx={{ color: 'white' }} onClick={handleMinusHeartRate}>
                                <ArrowDownwardIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} >
                  <Title>Music Recommendations</Title>
                  <Grid container spacing={3} direction="row">
                    {visibleItems.map((song) => (
                      <Grid item xs={3}>
                        <MusicCard name={song.name} year={song.year} artists={song.artists} />
                      </Grid>

                    ))}
                  </Grid>
                </Grid>
                {/* {songs.map((song) => (
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <MusicCard name={song.name} artists={song.artists} />
                    </Paper>
                  </Grid>
                ))}
 */}
              </Grid>
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
          </Box>
        </Box>
      </main>

    </div >
  );
}
