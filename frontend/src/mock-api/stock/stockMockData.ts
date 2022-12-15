export const stockMockData = [
    {
        _id: '6389d13ff0e16703966733ed',
        name: 'TEST',
        stock_ticker: 'TEST',
        current_price: 142.45154930245602,
        description: 'Stock fetched from Finnhub API',
        percentage_change: 0.17379919957394724,
        last_updated: '2022-12-02T12:40:28.263000',
        history: [
            {
                price: 135.02356770975905,
                percentage_change: 0.1899565598617059,
                recorded_at: '2022-12-02T11:34:52.883000',
            },
            {
                price: 151.94690777736656,
                percentage_change: 0.1756505677547303,
                recorded_at: '2022-12-02T11:39:54.197000',
            },
            {
                price: 157.25944996306612,
                percentage_change: 0.19721387743076324,
                recorded_at: '2022-12-02T12:17:48.655000',
            },
        ],
        external_fetch: true,
    },
    {
        _id: '638f407c12da9709c4242f4d',
        name: 'AAPL',
        stock_ticker: 'AAPL',
        current_price: 149.07772838429855,
        description: 'Stock fetched from Finnhub API',
        percentage_change: -1.463815333434391,
        last_updated: '2022-12-08T10:11:13.078000',
        history: [
            {
                price: 136.93361119320033,
                percentage_change: -0.7530394538347257,
                recorded_at: '2022-12-06T13:15:40.574000',
            },
            {
                price: 132.68336837265673,
                percentage_change: -0.8453862747174483,
                recorded_at: '2022-12-06T13:18:28.291000',
            },
            {
                price: 150.6197295427458,
                percentage_change: -0.8305326248252011,
                recorded_at: '2022-12-06T13:18:36.300000',
            },
        ],
        external_fetch: true,
    },
    {
        _id: '6391b73b5a464d4ed800010b',
        name: 'TSLA',
        stock_ticker: 'TSLA',
        current_price: 187.2223958311593,
        description: 'Stock fetched from Finnhub API',
        percentage_change: -2.9871653166131575,
        last_updated: '2022-12-08T10:11:15.512000',
        history: [
            {
                price: 175.92434544001014,
                percentage_change: -3.4007488548310683,
                recorded_at: '2022-12-08T10:06:51.971000',
            },
        ],
        external_fetch: true,
    },
    {
        _id: '6391b74c5a464d4ed800010c',
        name: 'GOOGL',
        stock_ticker: 'GOOGL',
        current_price: 92.57847118348273,
        description: 'Stock fetched from Finnhub API',
        percentage_change: -1.938016375345451,
        last_updated: '2022-12-08T10:11:14.254000',
        history: [
            {
                price: 102.46518788876996,
                percentage_change: -2.225473811987908,
                recorded_at: '2022-12-08T10:07:08.914000',
            },
        ],
        external_fetch: true,
    },
    {
        _id: '6391b7605a464d4ed800010d',
        name: 'MSFT',
        stock_ticker: 'MSFT',
        current_price: 255.46781458806223,
        description: 'Stock fetched from Finnhub API',
        percentage_change: -0.27831587298579397,
        last_updated: '2022-12-08T10:11:11.716000',
        history: [
            {
                price: 268.1446142574842,
                percentage_change: -0.28330681327803897,
                recorded_at: '2022-12-08T10:07:28.774000',
            },
            {
                price: 246.28231071129787,
                percentage_change: -0.3093275410168343,
                recorded_at: '2022-12-08T10:10:59.117000',
            },
            {
                price: 252.31556953927742,
                percentage_change: -0.3184935549833597,
                recorded_at: '2022-12-08T10:11:06.262000',
            },
        ],
        external_fetch: true,
    },
]

export const stocksSymbolsMockData = ['MSFT', 'AAPL', 'GOOGL', 'TSLA', 'TEST']
