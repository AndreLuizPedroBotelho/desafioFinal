import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import App from './App';

export default function Index() {
  console.disableYellowBox = true;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <App />
    </>
  );
}