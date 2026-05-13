import { getToken, getUserEmail, logoutUser } from "@/src/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function ProfileScreen() {
  const [email, setEmail] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    const userEmail = await getUserEmail();
    setEmail(userEmail);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = await getToken();

    if (!token) {
      router.replace("/(auth)/login");
      return;
    }
    await loadUser();
  }, [loadUser]);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Profil</Text>
        <View
          style={{
            width: 24,
          }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color="black" />
        </View>

        <Text style={styles.title}>Akun Saya</Text>
        <Text style={styles.email}>{email}</Text>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
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

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    marginTop: 10,
    marginBottom: 30,
    color: "gray",
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
