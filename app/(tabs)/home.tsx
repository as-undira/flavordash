import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FoodCard from "@/src/components/FoodCard";
import { getToken } from "@/src/services/auth";
import { fetchFoods } from "@/src/services/foodApi";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkLogin();
    }, []),
  );

  useEffect(() => {
    loadFoods();
  }, []);

  const checkLogin = async () => {
    const token = await getToken();

    setIsLogin(!!token);
  };

  const loadFoods = async () => {
    try {
      const data = await fetchFoods();

      setFoods(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const makanan = foods.filter((item) => item.category === "Makanan");
  const minuman = foods.filter((item) => item.category === "Minuman");

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={{ marginTop: 10 }}>Memuat menu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Flavor Dash</Text>

        {isLogin ? (
          <Pressable
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="person" size={22} color="black" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={[
          {
            title: "Makanan",
            data: makanan,
          },
          {
            title: "Minuman",
            data: minuman,
          },
        ]}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.categoryTitle}>{item.title}</Text>

            {item.data.map((food, index) => (
              <FoodCard key={food.id ?? index} item={food} />
            ))}
          </View>
        )}
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
    backgroundColor: "#F3F4F6",
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
    paddingTop: 15,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 8,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  loginButton: {
    backgroundColor: "#000",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  loginText: {
    color: "#fff",
    fontWeight: "600",
  },
});
