import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import AddContact from './src/screens/AddContact';
import store from './src/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Add Contact" component={AddContact} />
            <Stack.Screen
              name="Edit Contact"
              component={AddContact}
              initialParams={{ isEdit: true }}
            />
          </Stack.Navigator>
        </ApplicationProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
