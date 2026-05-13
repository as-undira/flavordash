import { useCart } from "@/src/context/CartContext";
import { getToken } from "@/src/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function FoodDetailScreen() {
  const { name, description, price, image } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = async () => {
    const token = await getToken();

    if (!token) {
      router.push("/(auth)/login");
      return;
    }

    addToCart({
      id: Date.now().toString(),
      name: name as string,
      price: price as string,
      image: image as string,
      quantity,
    });

    Alert.alert("Berhasil", `${name} berhasil masuk ke keranjang`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>

        <Text style={styles.headerTitle}>Detail Menu</Text>

        <View
          style={{
            width: 24,
          }}
        />
      </View>

      <Image
        source={{
          uri: image as string,
        }}
        style={styles.image}
      />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.qtyLabel}>Jumlah Pesanan</Text>

      <View style={styles.quantityRow}>
        <Pressable
          style={styles.qtyButton}
          onPress={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <Text style={styles.qtyText}>-</Text>
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>

        <Pressable
          style={styles.qtyButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.qtyText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Tambah ke Keranjang</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginTop: 30,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  description: {
    color: "gray",
    marginTop: 10,
    fontSize: 16,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  qtyLabel: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  quantityRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: 22,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
