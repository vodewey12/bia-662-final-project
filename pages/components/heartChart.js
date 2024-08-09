import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Title from './title';

// import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount: amount ?? null };
}

const data = [
    createData('15:00', 75),
    createData('15:05', 78),
    createData('15:10', 90),
    createData('15:15', 104),
    createData('15:20', 113),
    createData('15:25', 115),
    createData('15:30', 124),
    createData('15:35', 132),
];

export default function HeartChart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden', height: '98%' }}>
                <LineChart
                    dataset={data}
                    margin={{
                        top: 16,
                        right: 20,
                        left: 16,
                        bottom: 60,
                    }}
                    xAxis={[
                        {
                            scaleType: 'point',
                            dataKey: 'time',
                            tickNumber: 2,
                            tickLabelStyle: theme.typography.body2,
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Heart Rate (BPM)',
                            labelStyle: {
                                ...theme.typography.body1,
                                fill: theme.palette.text.primary,
                            },
                            tickLabelStyle: theme.typography.body2,
                            max: 200,
                            tickNumber: 3,
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'amount',
                            showMark: false,
                            color: theme.palette.primary.light,
                        },
                    ]}
                    sx={{
                        [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                        [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translateX(-25px)',
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}