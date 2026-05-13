import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";

const EMAIL_KEY = "user_email";

const saveData = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
};

const getData = async (key: string) => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const removeData = async (key: string) => {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
};

export const loginUser = async (email: string) => {
  await saveData(TOKEN_KEY, "jwt_demo_token_123");
  await saveData(EMAIL_KEY, email);
};

export const registerUser = async (email: string) => {
  await saveData(TOKEN_KEY, "jwt_demo_token_123");
  await saveData(EMAIL_KEY, email);
};

export const getToken = async () => {
  return await getData(TOKEN_KEY);
};

export const getUserEmail = async () => {
  return await getData(EMAIL_KEY);
};

export const logoutUser = async () => {
  await removeData(TOKEN_KEY);

  await removeData(EMAIL_KEY);
};
