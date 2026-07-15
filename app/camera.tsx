import { useCart } from "@/src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
  const { id } = useLocalSearchParams();
  const { updateOrderStatus } = useCart();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Izin kamera diperlukan</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Berikan Izin</Text>
        </Pressable>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();

    if (photo?.uri) {
      setPhotoUri(photo.uri);
    }
  };

  const handleConfirm = () => {
    if (photoUri) {
      updateOrderStatus(id as string, photoUri);
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={{
              uri: photoUri,
            }}
            style={styles.preview}
          />

          <Pressable style={styles.button} onPress={() => setPhotoUri(null)}>
            <Text style={styles.buttonText}>Ambil Ulang</Text>
          </Pressable>

          <Pressable style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Konfirmasi</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <CameraView ref={cameraRef} style={styles.camera} />

          <Pressable style={styles.captureButton} onPress={takePhoto}>
            <Ionicons name="camera" size={32} color="#fff" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  camera: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  preview: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
  },

  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#444",
    margin: 20,
    padding: 16,
    borderRadius: 10,
  },

  confirmButton: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
