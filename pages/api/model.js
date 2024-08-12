import { useState } from 'react';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000', // Example base URL
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const songIds = req.body.songIds;
        const gptSongs = req.body.gptSongs;
        const heartRate = req.body.heartRate;

        try {
            const response = await axiosInstance.post('http://127.0.0.1:5000/predict', {
                songIds: songIds,
                gptSongs: gptSongs,
                heartRate: heartRate
            });
            res.status(200).json(response.data)
        } catch (error) {
            console.error('Error making prediction:', error);
        }

    }
}