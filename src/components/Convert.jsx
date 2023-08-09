import { useEffect, useState } from "react";
import axios from "axios";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "../styles/Convert.css"; // Estilos

export default function Convert() {
  const [coin, setCoin] = useState([]) //Se guarda el resultado de API con axios, reemplazado por el fetch con la promesa de json
  const [selCoin1, setSelCoin1] = useState("btc") // Valores asignados en los valores
  const [selCoin2, setSelCoin2] = useState("eth") // Valores asignados en los valores
  const [mainTxt, setMainTxt] = useState(0) // Guarda el resultado introducido
  const [res, setRes] = useState(0) // Resultado de la conversión

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Petición a la API
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );

    // Establecer el valor de los datos obtenidos
    setCoin(result.data);
    //console.log(result.data);
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);
  // Si a tiene un valor lo acercamos a un cero, y si tiene un valor diferente se situa en el valor en b
  useEffect(_ => {
    let a,b
    coin.forEach(({symbol, current_price}) =>{
      if(symbol == selCoin1){
        a = (mainTxt * current_price) / 1 
      }else if(symbol == selCoin2){
        b = current_price
      }
    })
     a ? setRes(a / b) : setRes(0)
  },[mainTxt,selCoin1,selCoin2])
  // Verificar que no se seleccione la misma moneda, el text hace que una de ellas no sea editable
  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

        <FaExchangeAlt className="icono" />

        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}