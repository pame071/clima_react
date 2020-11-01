import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Fromulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
function App() {

  //State
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const [ consulta, guardarConsulta ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);

    //extraer ciudad, pais
    const { ciudad, pais } = busqueda

    useEffect(() => {
      const consultarApi = async () =>{
        if(consulta){
          const appId ='8b4d9b12516dcab050f9558cf018503e';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsulta(false);

          //Detecta si hay error
          if(resultado.cod === "404"){
            guardarError(true);
          }else{
            guardarError(false);
          }
        }
      }
      consultarApi();
    },[consulta,ciudad,pais]);

    let componente;
    if(error){
      componente = <Error mensaje="No hay resultado" />
    }else{
      componente =  <Clima resultado={resultado} />
    }


  return (
    <>
      <Header
        titulo='Clima React app'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Fromulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
