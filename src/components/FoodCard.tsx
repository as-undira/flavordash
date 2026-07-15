import { getToken } from "@/src/services/auth";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  item: any;
};

export default function FoodCard({ item }: Props) {
  const handlePress = async () => {
    const token = await getToken();

    if (!token) {
      router.push("/(auth)/login");

      return;
    }

    router.push({
      pathname: "/(tabs)/food-detail",

      params: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
      },
    });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 18,
  },

  info: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: "#7A7A7A",
    marginTop: 6,
    fontSize: 15,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
