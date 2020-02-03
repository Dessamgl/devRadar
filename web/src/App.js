import React, { useEffect, useState }from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';
import DevItem from '../src/components/DevItem/index';
import DevForm from '../src/components/DevForm/index';
//COMPONENTE: (Uma função que retorna algum conteúdo HTML, css, interface(botoes e etc)) (é um bloco isolado de HTML, CSS e JS, o qual nao interfere no restante da aplicação )
//PROPRIEDADE:  Informações que um componente PAI passa para o componente FILHO (func, straings, variaveis e etc)
//ESTADO: uma função mantida pelo componente. Informacoes mantidas pelo componente (imutabilidade)

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
   async function loadDevs() {
     const response = await api.get('/devs');
     setDevs(response.data)
   }
   loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit = {handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
