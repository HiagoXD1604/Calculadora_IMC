import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';

import {niveis,calcularImc, nivel} from "./helpers/imc"
const App = () =>{
  const [altura,setAltura] = useState<number>(0);
  const [peso,setPeso] = useState<number>(0);
  const [mostrarValor,setMostrarValor] = useState<nivel | null>(null);

  const calculaImc = () =>{
    if(altura && peso){
      setMostrarValor(calcularImc(altura,peso));
    }else{
      alert("Insira os valores de Altura e/ou Peso para serem calculados!")
    }
  }

  const voltarCalculo = () =>{
    setMostrarValor(null);
    setAltura(0);
    setPeso(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea e bla bla bla</p>
        
          <input 
            type="number"
            placeholder="Digite a sua altura. Ex: 1,5 (Métros)"
            value={altura > 0 ? altura : ''}
            onChange={e => setAltura(parseFloat(e.target.value))}
            disabled={mostrarValor ? true : false}
          />
          <input 
            type="number"
            placeholder="Digite seu peso. Ex: 75 (KG)"
            value={peso > 0 ? peso : ''}
            onChange={e => setPeso(parseFloat(e.target.value))}
            disabled={mostrarValor ? true : false}
          />
          <button onClick={calculaImc} disabled={mostrarValor ? true : false}>Calcular IMC</button>
        </div>
        <div className={styles.rightSide}>
          {!mostrarValor &&
            <div className={styles.grid}>
            {niveis.map((item,key)=>(
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }
          {mostrarValor &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={voltarCalculo}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={mostrarValor} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;