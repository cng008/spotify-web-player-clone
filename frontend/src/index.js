import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { StateProvider } from './StateProvider';
import reducer, { INITIAL_STATE } from './common/reducer';

ReactDOM.render(
  <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root') // DOM node to render the component to
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
