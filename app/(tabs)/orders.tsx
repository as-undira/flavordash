import { useEffect } from "react";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { getToken } from "@/src/services/auth";
import { useCart } from "@/src/context/CartContext";
export default function OrdersScreen() {
  const { orderItems } = useCart();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getToken();

    if (!token) {
      router.replace("/(auth)/login");
    }
  };

  const calculateTotal = (price: string, quantity: number) => {
    const numberPrice = parseInt(price.replace(/\D/g, ""));
    return (numberPrice * quantity).toLocaleString("id-ID");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
        <View
          style={{
            width: 24,
          }}
        />
      </View>

      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />

            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text style={styles.total}>
                Total: Rp {calculateTotal(item.price, item.quantity)}
              </Text>

              {item.note && (
                <Text style={styles.note}>Catatan: {item.note}</Text>
              )}

              <View style={styles.statusBox}>
                <Text style={styles.statusText}>Sedang Diproses</Text>
              </View>
            </View>
          </View>
        )}
      />
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
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 14,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  total: {
    marginTop: 6,
    fontWeight: "bold",
  },

  note: {
    marginTop: 6,
    color: "gray",
  },

  statusBox: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF3CD",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
