import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lokasi Restoran</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -6.2088,
          longitude: 106.8456,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: -6.2088,
            longitude: 106.8456,
          }}
          title="FlavorDash Restaurant"
          description="Lokasi restoran utama"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  map: {
    flex: 1,
  },
});
