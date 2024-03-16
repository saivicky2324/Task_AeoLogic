import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PhotoUpload from "./Screens/PhotoUpload";
import DocumentScanner from "./Screens/DocScanner";
import MapDistance from  './Screens/MapDistance';
import Main from "./Screens/Main";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
			<NavigationContainer>
					<Stack.Navigator>
				  	<Stack.Screen name="Dashboard" component={Main} />
							<Stack.Screen name="Photo" component={PhotoUpload} />
							<Stack.Screen name="Document" component={DocumentScanner} />
							<Stack.Screen name="Map" component={MapDistance} />
					</Stack.Navigator>
	 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
