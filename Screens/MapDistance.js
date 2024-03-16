import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

function MapDistance() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [area, setArea] = useState(null);
  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   // Get current location
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setCurrentPosition({ latitude, longitude });
  //     },
  //     error => alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // }, []);

   useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

     const { latitude, longitude } = await Location.getCurrentPositionAsync({});
       setCurrentPosition({ latitude, longitude });
    })();
  }, []);

  const handlePress = (event) => {
    const { coordinate } = event.nativeEvent;
    setPolygonCoordinates([...polygonCoordinates, coordinate]);
  };

  const calculateArea = () => {
    if (polygonCoordinates.length >= 4) {
      let totalArea = 0;
      for (let i = 0; i < polygonCoordinates.length - 1; i++) {
        const lat1 = polygonCoordinates[i].latitude;
        const lon1 = polygonCoordinates[i].longitude;
        const lat2 = polygonCoordinates[i + 1].latitude;
        const lon2 = polygonCoordinates[i + 1].longitude;
        totalArea += (lat1 * lon2) - (lon1 * lat2);
      }
      totalArea = Math.abs(totalArea / 2);
      setArea(totalArea);
      alert("Total Area :  " + totalArea + "square units");
    } else {
      alert('At least 3 coordinates are required to calculate area');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handlePress}
        showsUserLocation={true}
        initialRegion={{
          latitude: currentPosition ? currentPosition.latitude : 0,
          longitude: currentPosition ? currentPosition.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {polygonCoordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} />
        ))}
        {polygonCoordinates.length >= 3 && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 200, 0, 0.5)"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={calculateArea}>
        <Text style={styles.buttonText}>Calculate Area</Text>
      </TouchableOpacity>
      {/* {area && (
        <Text style={styles.areaText}>Area: {area} square units</Text>
      )} */}
    </View>
  );
}
export default MapDistance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  areaText: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    fontSize: 16,
  },
});
