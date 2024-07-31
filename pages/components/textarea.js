import { useState } from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TextArea() {
    const [expanded, setExpanded] = useState('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <IconButton sx={{ p: '10px' }} color="primary" >
                <AccountCircleIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Ask for music recommendations"
                inputProps={{ 'aria-label': 'ask for music recommendations' }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
