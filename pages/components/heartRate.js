import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Title from './title';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const data = [
    { value: 100, label: 'A' },
,
];

const palette = [blue[500], 'blue', 'green'];

const size = {
    width: 400,
    height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontFamily: 'Roboto',
    fontSize: 50,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}


export default function HeartChart() {
    const theme = useTheme();

    return (
        <div style={{ width: '60%', flexGrow: 1, overflow: 'hidden' }}>
            <PieChart series={[{ data, innerRadius: 80 }]}
                colors={palette}
                slotProps={{
                    legend: { hidden: true },
                }} {...size}>
                <PieCenterLabel>120</PieCenterLabel>
            </PieChart>
        </div>
    );
}




