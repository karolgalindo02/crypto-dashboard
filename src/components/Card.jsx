import "../styles/Card.css"
import Graph from "./Graph"
import {colorDec} from './App'

/* Definir y exportar el componente Card, añadir HTML con los elementos de la Card
   como imagen, precio, porcentaje y renderizado de la gráfica */
export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}