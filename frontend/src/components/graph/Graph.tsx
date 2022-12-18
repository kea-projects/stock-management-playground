import {
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Area,
    Brush,
} from 'recharts'
import { Box } from '@chakra-ui/react'

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
    graphColor = '#908cde',
    dataKeyY,
    dataKeyX,
    width = '100%',
    height = ['200px', '300px', '300px'],
}: StockGraphProps) {
    return (
        <Box width={width} height={height} p={4}>
            <ResponsiveContainer>
                <ComposedChart data={data}>
                    <Area
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
                </ComposedChart>
            </ResponsiveContainer>
        </Box>
    )
}
