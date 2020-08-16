import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../../constants";

function Title(props: PropsWithChildren<TextProps>) {
  return <Text {...props} style={[props.style, styles.text]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    fontWeight: "bold",
    color: Colors.WHITE,
    fontSize: 22,
    letterSpacing: 0.35,
  },
});

export default Title;
