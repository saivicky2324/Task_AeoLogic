import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet,Text,FlatList } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function App() {
  const [scannedImage, setScannedImage] = useState([]);

  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages.length > 0) {
								// console.log(scannedImages);
        setScannedImage(scannedImages);
      }
      console.log(scannedImages)
    } catch (error) {
      console.error('Error scanning document:', error);
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
<View style={styles.container}>
      {scannedImage && (
        	<View style={{width:300,height:300,justifyContent:"center"}}>
									<FlatList
											data={scannedImage}
											renderItem={({ item }) => (
													<View style={{ marginVertical: 5 }}>
																	<Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
													</View>
											)}
											keyExtractor={(item, index) => index.toString()}
									/>
									</View>
      )}
      <Text>Document</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
