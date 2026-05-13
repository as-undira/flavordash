import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import FoodCard from "@/src/components/FoodCard";
import { fetchFoods } from "../../src/services/foodApi";

export default function HomeScreen() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      const data = await fetchFoods();
      setFoods(data);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text
          style={{
            marginTop: 10,
          }}
        >
          Memuat menu...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Selamat datang</Text>

        <Pressable
          style={styles.profileButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person" size={22} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={({ item }) => <FoodCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
