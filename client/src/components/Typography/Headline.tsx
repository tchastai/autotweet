import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../../constants";

function Headline(props: PropsWithChildren<TextProps>) {
  return <Text {...props} style={[props.style, styles.text]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    fontWeight: "600",
    color: Colors.WHITE,
    fontSize: 17,
    letterSpacing: -0.41,
  },
});

export default Headline;
