import { Platform, Dimensions } from "react-native";

export function isIPhoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return (
    Platform.OS === "ios" &&
    ((Dimensions.get("window").height === X_HEIGHT &&
      Dimensions.get("window").width === X_WIDTH) ||
      (Dimensions.get("window").height === X_WIDTH &&
        Dimensions.get("window").width === X_HEIGHT))
  );
}

export function findUri (data) {
  return data.source
    ? data.source : data.uri
    ? { uri: data.uri } : data.URI
    ? { uri: data.URI } : data.url
    ? { uri: data.url } : data.URL
    ? { uri: data.URL } : undefined;
}
