import "../styles/Graph.css"
import {useState, useEffect, useRef} from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment/moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { numberF } from "./App";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
)
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    // Definir opciones de escala comunes
    const optionScale = {
        grid: {
            display: false
        },
        border: {
            display: false
        },
        ticks: {
            display: false
        }
    }

    // Definir variables de estado
    let data, options
    const [dates, setDates] = useState()
    const [prices, setPrices] = useState()
    const [gradient, setGradient] = useState()
    const graphRef = useRef(null)

    // Obtener datos de la API
    const getData = async _ => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`)
        const json = await res.json()
        setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        setPrices(json.prices.map(item => Math.round(item[1])))
    }

    // Efecto de montaje para obtener datos y definir gradiente
    useEffect(_ => {
        getData()
        const canvas = graphRef.current.firstChild
        let BGradient = canvas.getContext("2d").createLinearGradient(0,0,0, canvas.height)
        BGradient.addColorStop(0, "rgba(4, 191, 157, 1)")
        BGradient.addColorStop(1, "rgba(4, 191, 157, 0)")
        setGradient(BGradient)
    },[])

    // Seleccionar tipo de gráfico y definir datos y opciones
    switch(type){
        case 0:
            data = {
                labels: dates,
                datasets: [
                {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    pointRadius: 0,
                    tension: .4,
                    fill: true
                }
                ]
            }
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${numberF.format(value)} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
            }
            break
        case 1:
            data = {
                labels: dates,
                datasets: [
                {
                    data: prices,
                    borderColor: color,
                    pointRadius: 0,
                    tension: .4,
                }
                ]
            }
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: optionScale,
                    y: optionScale
                }
            }
    }
    
    return (
        <div ref={graphRef} className="graph">
            <Line data={data} options={options} />
        </div>
    )
}