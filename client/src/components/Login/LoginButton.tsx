import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import { Strings, Colors } from "../../constants";
import TwitterLogo from "../../../assets/TwitterLogo";
import { useAppDispatch, RootState } from "../../store";
import { login, AccessTokenState } from "../../store/login";
import { useSelector } from "react-redux";

function LoginButton(props: TouchableOpacityProps) {
  const accessTokenState = useSelector((state: RootState) => state.login.accessToken)

  const dispatch = useAppDispatch()

  return (
    <TouchableOpacity
      {...props}
      style={styles.button}
      activeOpacity={0.55}
      onPress={() => dispatch(login())}
    >
      {accessTokenState === AccessTokenState.Fetching ?
        <ActivityIndicator color={Colors.WHITE} /> :
        (
          <>
            <Text style={styles.text}>{Strings.AUTHENTICATION_BUTTON_TEXT}</Text>
            <TwitterLogo style={styles.logo} />
          </>
        )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.BLUE,
    width: 300,
    height: 50,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "System",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.WHITE,
    fontSize: 20,
  },
  logo: {
    paddingHorizontal: 4,
  },
});

export default LoginButton;
