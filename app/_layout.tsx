import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { CartProvider } from "@/src/context/CartContext";
import { getToken } from "@/src/services/auth";

export default function RootLayout() {
  return (
    <CartProvider>
      <AuthMiddleware />
    </CartProvider>
  );
}

function AuthMiddleware() {
  const router = useRouter();
  const segments = useSegments() as string[];

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const inAuthGroup = segments[0] === "(auth)";
      const protectedRoute =
        segments.includes("orders") ||
        segments.includes("profile") ||
        segments.includes("camera");

      if (!token && protectedRoute && !inAuthGroup) {
        router.replace("/(auth)/login");
      }
    };

    checkAuth();
  }, [segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
