import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState} from 'react';
//import TabNavigator from './src/navigation/TabNavigator';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import { createSessionsTable } from './src/db';

createSessionsTable()
  .then((result)=>console.log("Tabla creada o inicializada con éxito: ", result))
  .catch((error)=>console.log("Error al crear la tabla Sessions: ", error))

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'Kanit': require('./assets/fonts/Kanit-Regular.ttf'),
    'Aldrich': require('./assets/fonts/Aldrich-Regular.ttf')
  });


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="dark" />
    </Provider>
  )
}