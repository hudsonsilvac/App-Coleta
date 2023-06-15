import React from "react";

import './src/services/reactotron'
import Routes from './src/routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './src/services/redux';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
}