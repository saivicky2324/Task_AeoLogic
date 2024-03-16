import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native";

const Main = () => {
	const navigation = useNavigation()
		return (
				<View style={styles.container}>
						<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Map')}>
							  <Text>Area Calculation</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Photo')}>
							 <Text>Photo Upload</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Document')}>
							  <Text>Document Scan</Text>
						</TouchableOpacity>
				</View>
		)
}

export default Main

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
},
button:{
	width:100,
	height:40,
	marginTop:20,
	backgroundColor:"#eee",
	borderRadius:8,
	justifyContent:'center',
	alignItems:'center',
}
});