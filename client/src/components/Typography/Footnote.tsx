import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../../constants";

function Footnote(props: PropsWithChildren<TextProps>) {
  return <Text {...props} style={[props.style, styles.text]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    color: Colors.SECONDARY_LABEL,
    fontSize: 13,
    letterSpacing: -0.08,
  },
});

export default Footnote;
