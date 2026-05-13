import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type FoodItem = {
  id?: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

type Props = {
  item: FoodItem;
};

export default function FoodCard({ item }: Props) {
  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/food-detail",
      params: {
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
          cache: "force-cache",
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
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: "gray",
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
