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
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';

export default function MessageCard({
    text, type, timestamp
}) {
    if (type == 'user') {
        return (
            <Card className={styles.userCard} sx={{ minWidth: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar className={styles.userAvatar} sx={{ bgcolor: blue[500] }} aria-label="message">
                            R
                        </Avatar>
                    }
                    title={<Box sx={{ textAlign: 'right', width: '100%' }}>
                        User
                    </Box>
                    }
                    subheader={timestamp}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
                            R
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
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

}