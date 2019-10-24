import React from 'react';
import {Provider} from 'react-redux'
import { hydrate, render } from 'react-dom';
import 'materialize-css/sass/materialize.scss'
import {store} from './Redux/store'
import App from './App';
import './Assets/style.scss'

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate( 
      <Provider store={store}>
        <App />
      </Provider>
     , rootElement);
} else {
    render( 
    <Provider store={store}>
      <App />
    </Provider>
     , rootElement);
}