import styles from '../../styles/Home.module.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';
export default function MessageCard({
    text, type, timestamp
}) {
    if (type == 'user') {
        return (
            <Card className={styles.userCard} sx={{ width: '100%'}}>
                <CardHeader
                    avatar={
                        <Avatar className={styles.userAvatar} sx={{ bgcolor: blue[500] }} aria-label="message">
                            A
                        </Avatar>
                    }
                    title={<Box sx={{ textAlign: 'right', width: '100%' }}>
                        User
                    </Box>
                    }
                    subheader={<Box sx={{ textAlign: 'right', width: '100%' }}>
                        {timestamp}
                    </Box>}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card className={styles.aiCard}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="message">
                            AI
                        </Avatar>
                    }
                    title="OpenAI"
                    subheader={timestamp}

                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="replay">
                        <ReplayIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

}