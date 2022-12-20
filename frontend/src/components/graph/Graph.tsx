import {
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Brush,
    LineChart,
    Line,
} from 'recharts'
import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface StockGraphProps {
    data: any[]
    graphColor?: string
    dataKeyY: string
    dataKeyX: string
    width?: number | string
    height?: number | string | string[]
}

export function Graph({
    data,
    graphColor = '#649149',
    dataKeyY,
    dataKeyX,
    width = '100%',
    height = ['200px', '300px', '300px'],
}: StockGraphProps) {
    const [dataForGraph, setDataForGraph] = useState(() => data)
    const [isZoomedOut, setIsZoomedOut] = useState(false)
    useEffect(() => {
        setDataForGraph(data)
    }, [data])
    const zoomLevel = () => {
        setIsZoomedOut((value) => !value)
        if (!isZoomedOut) {
            const resultData = []
            for (let i = 0; i < data.length; i += 4) {
                resultData.push(data[i])
            }
            setDataForGraph(resultData)
        } else setDataForGraph(data)
    }
    return (
        <Box width={width} height={height} p={4}>
            <Button
                variant="signInButton"
                size="sm"
                onClick={() => zoomLevel()}
            >
                {isZoomedOut ? 'Zoom In' : 'Zoom Out'}
            </Button>
            <ResponsiveContainer>
                <LineChart
                    data={dataForGraph}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <Line
                        type="basisOpen"
                        dataKey={dataKeyY}
                        dot={false}
                        stroke={graphColor}
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={graphColor}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={graphColor}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey={dataKeyX} />
                    <YAxis dataKey={dataKeyY} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'transparent' }}
                    />
                    <Brush />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}
