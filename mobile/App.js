import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
//todos os estilos (css) com "-" serão escritos juntos e a separacao deles será a letra maiuscula
//cada elemento precisa ter sua propria estilizacao
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Possible Unhandled',
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar barStyle='Light-content' backgroundColor='#7d40e7'/>
      <Routes />
    </>
  );
}
