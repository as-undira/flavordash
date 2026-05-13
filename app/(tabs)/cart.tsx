import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useCart } from "@/src/context/CartContext";
import { getToken } from "@/src/services/auth";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const [note, setNote] = useState("");

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    checkoutCart,
    getTotalPrice,
  } = useCart();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getToken();

    if (!token) {
      router.replace("/(auth)/login");
    }
  };

  const handleCheckout = () => {
    checkoutCart(note);
    router.push("/(tabs)/orders");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Keranjang Saya</Text>
        <View
          style={{
            width: 24,
          }}
        />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Keranjang kosong</Text>

          <Text>Silakan pilih menu terlebih dahulu</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.image}
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.price}</Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text>-</Text>
                    </Pressable>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />

          <Text style={styles.noteLabel}>Catatan Pesanan</Text>

          <TextInput
            placeholder="contoh: pedas"
            placeholderTextColor="#666"
            value={note}
            onChangeText={setNote}
            style={styles.noteInput}
          />

          <View style={styles.totalBox}>
            <Text>Total Pembayaran</Text>
            <Text style={styles.totalPrice}>
              Rp {getTotalPrice().toLocaleString("id-ID")}
            </Text>
          </View>

          <Pressable style={styles.button} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Bayar</Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  card: {
    flexDirection: "row",
    marginBottom: 20,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  name: {
    fontWeight: "bold",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  quantity: {
    marginHorizontal: 15,
    fontWeight: "bold",
  },

  noteLabel: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  totalBox: {
    marginBottom: 20,
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
