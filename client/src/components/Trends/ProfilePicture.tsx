import React, { useEffect, useRef } from "react";

import {
  StyleSheet,
  Image,
  Easing,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Colors, Strings } from "../../constants";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { logout } from "../../store/login";

function isURIReady(uri: any): uri is string {
  return typeof uri === "string";
}

const createLogOutAlert = (dispatch: Function) =>
  Alert.alert(
    Strings.LOG_OUT_ALERT_TITLE,
    Strings.LOG_OUT_ALERT_MESSAGE,
    [
      {
        text: Strings.LOG_OUT_ALERT_CANCEL,
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => dispatch(logout()),
      },
    ],
    { cancelable: false }
  );

function ProfilePicture() {
  const uri = useSelector(
    (state: RootState) => state.trends.accountInfo.profilePictureURL
  );
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.55}
      style={styles.container}
      onPress={createLogOutAlert.bind(null, dispatch)}
    >
      {isURIReady(uri) && <Image source={{ uri }} style={[styles.container]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SKELETON,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default ProfilePicture;
