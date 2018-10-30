import { AsyncStorage } from "react-native";

export const USER_KEY = "token";

export const saveToken = token => AsyncStorage.setItem(USER_KEY, token);

export const removeToken = () => AsyncStorage.removeItem(USER_KEY);

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};
