import "../styles/Header.css"
import {useState, useEffect} from 'react'
import Logo from '../img/Logo.png';
import {MdWbSunny, MdNightlight} from "react-icons/md";
export default function Header({currencys, fun, cur}) {
  const [theme, setTheme] = useState(true)
  const toggleTheme = _ => {
    setTheme(!theme)
  }
  useEffect(() => {
    if(!theme){
      document.documentElement.style.setProperty("--bg","white")
      document.documentElement.style.setProperty("--colorS","#00add8")
      document.documentElement.style.setProperty("--colorTxtCR","#455f7c") 
    }else{
      document.documentElement.style.setProperty("--bg","#030B15")
      document.documentElement.style.setProperty("--colorS","#00C4F44D")
      document.documentElement.style.setProperty("--colorTxtCR","#white")  
    }
  },[theme])
  return (
    <header className='app-header'>
      <img src={Logo} alt="logo" />
      <p>Crypto View!</p>
      <div className='select-button'>
      <select value={cur} id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className="toogleMode" onClick={toggleTheme}>
      {!theme ? (
            <MdNightlight size={20} style={{ fill: '#455f7c' }} />
          ) : (
            <MdWbSunny size={20} style={{ fill: 'white' }} />
          )}
      </button>
      </div>
    </header>
  )
}