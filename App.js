import * as React from 'react';
import IndexScreen from './src/IndexScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <IndexScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


