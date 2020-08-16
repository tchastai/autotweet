import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  maybeCompleteAuthSession,
  WebBrowserAuthSessionResult as AuthSessionResult,
  WebBrowserRedirectResult as RedirectResult
} from "expo-web-browser";

import { Strings, Colors } from "../../constants";
import Subheading from "../Typography/Subheading";
import LoginButton from "./LoginButton";
import Footnote from "../Typography/Footnote";
import Arrow from "./Arrow";

function LoginView() {
  maybeCompleteAuthSession();

  return (
    <View style={styles.view}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{Strings.WELCOME_MESSAGE}</Text>
        <Subheading>{Strings.WELCOME_INSTRUCTIONS}</Subheading>
      </View>
      <View style={styles.actionView}>
        <View style={styles.arrowView}>
          <Arrow style={styles.arrow} />
          <LoginButton />
          <Footnote style={styles.footnote}>{Strings.DATA_DISCLAIMER}</Footnote>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.BLACK
  },
  titleView: {
    marginTop: 128,
    width: 300,
  },
  title: {
    fontFamily: "System",
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 44,
    lineHeight: 41,
    letterSpacing: 0.484,
  },
  actionView: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  arrow: {
    marginBottom: 16,
  },
  arrowView: {
    display: "flex",
    alignItems: "center",
  },
  footnote: {
    textAlign: "center",
    marginStart: 38,
    marginTop: 16,
    paddingEnd: 38,
  },
});

export default LoginView;
