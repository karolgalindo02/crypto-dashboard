import "../styles/CardPrincipal.css"
import {FaPlay} from 'react-icons/fa'
import {deleteDec, colorDec} from './App'
import Graph from './Graph'

 // Representa la información de una criptomoneda con gráficos y estadísticas
export default function CardPrincipal({ json: { id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency}, cur = "usd" }){
        
    return (
        <>
            <article className="cripto-first">
                <div className="cripto-title">
                    <img src={image} alt="Icono de cripto" />
                    <h2>{symbol} - {deleteDec(current_price,0)} {cur}</h2>
                    <h2 className={colorDec(price_change_percentage_30d_in_currency)}><FaPlay className={`icon-arrow `}/>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</h2>
                </div>
                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                 <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    )
}