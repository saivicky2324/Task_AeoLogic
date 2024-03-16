import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList,StyleSheet,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function PhotoUpload() {
  const [images, setImages] = useState([]);

		const pickImage = async () => {
			let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
			});

			console.log(result);

			if (!result.canceled) {
				setImages([...images, result.assets[0].uri]);
			}
	};

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
						console.log(result);
    }
  };


  return (
    <View style={styles.container}>
					<TouchableOpacity style={styles.button} onPress={()=>pickImage()}>
						  <Text>Pick Image</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={()=>takePhoto()}>
						  <Text>Take Photo</Text>
					</TouchableOpacity>
					{images?
      <Text>Selected Images:</Text>:null}
						<View style={{width:300,height:300,justifyContent:"center"}}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5 }}>
              <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
						</View>
    </View>
  );
}


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
},
image: {
	width: '100%',
	height: '100%',
}
});