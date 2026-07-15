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
import { useCart } from "@/src/context/CartContext";

export default function OrdersScreen() {
  const { orderItems } = useCart();
  const calculateTotal = (price: string, quantity: number) => {
    const numberPrice = parseInt(price.replace(/\D/g, ""));
    return (numberPrice * quantity).toLocaleString("id-ID");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Empty */}
      {orderItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada pesanan</Text>
        </View>
      ) : (
        <FlatList
          data={orderItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Gambar Menu */}
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              />

              <View style={styles.info}>
                {/* Nama */}
                <Text style={styles.name}>{item.name}</Text>

                {/* Qty */}
                <Text>Qty: {item.quantity}</Text>

                {/* Total */}
                <Text style={styles.total}>
                  Total: Rp {calculateTotal(item.price, item.quantity)}
                </Text>

                {/* Catatan */}
                {item.note && (
                  <Text style={styles.note}>Catatan: {item.note}</Text>
                )}

                {/* Status */}
                <View
                  style={[
                    styles.statusBox,

                    item.status === "Selesai"
                      ? styles.finishedStatus
                      : styles.processStatus,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>

                {/* Bukti Foto */}
                {item.proofImage && (
                  <View style={styles.proofContainer}>
                    <Text style={styles.proofTitle}>Bukti Penerimaan</Text>

                    <Image
                      source={{
                        uri: item.proofImage,
                      }}
                      style={styles.proofImage}
                    />
                  </View>
                )}

                {/* Tombol Camera */}
                {item.status !== "Selesai" && (
                  <Pressable
                    style={styles.cameraButton}
                    onPress={() =>
                      router.push({
                        pathname: "/camera",

                        params: {
                          id: item.id,
                        },
                      })
                    }
                  >
                    <Ionicons name="camera" size={18} color="#fff" />

                    <Text style={styles.cameraText}>Bukti Penerimaan</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        />
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
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
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
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  total: {
    marginTop: 8,
    fontWeight: "bold",
  },

  note: {
    marginTop: 6,
    color: "gray",
  },

  statusBox: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },

  processStatus: {
    backgroundColor: "#FFF3CD",
  },

  finishedStatus: {
    backgroundColor: "#D1FAE5",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
  },

  cameraText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  proofContainer: {
    marginTop: 14,
  },

  proofTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },

  proofImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
});
