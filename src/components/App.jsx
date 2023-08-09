import {useEffect, useState} from 'react'
import "../styles/App.css"; 
import { Line } from "react-chartjs-2";
import axios from 'axios'; 
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'

export default function App() {
  const [coins, setCoins] = useState() // Estado para almacenar los datos de las criptomonedas
  const [currency, setCurrency] = useState() // Estado para almacenar las monedas disponibles
  const [selCur, setSelCur] = useState("usd") // Estado para la moneda seleccionada
  
  /* Función para obtener datos de la API, datos de 
  las criptomonedas y obetener monedas disponibles */
  const getData = async () =>{
    /* const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h")
    console.log(res.data);
    setCoins(res.data); */
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json()
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()

    // Actualizar estados con los datos obtenidos
    setCoins(json)
    setCurrency(cur)
  }

  /* Llamada a la función de obtención de datos al montar 
  el componente y cuando cambia la moneda seleccionada */
  useEffect(() => {
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])
  return (
    !coins ? "Cargando..." :(
    <div className='App'>
        <Header currencys={currency} fun={setSelCur} cur={selCur}/>
      <main>
        <CardPrincipal json={coins[0]} cur={selCur}/>
        <div className="cards_con">
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            if(index != 0) {
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      <Convert />
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  )
  )

}
// Redondear a un número específico de decimales 
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
// Asignar un color basado en si el número es positivo o negativo
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
// Formateador de números con el formato específico
export const numberF = Intl.NumberFormat("es-ES")