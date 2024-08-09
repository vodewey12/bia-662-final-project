import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'


export default function MusicCard({
    name, artists
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 140}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                    {name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {/* {artists} */}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                    <SkipNextIcon />
                </IconButton>
            </Box>
        </Box>
    )
}