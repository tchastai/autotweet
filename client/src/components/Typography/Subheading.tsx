import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../../constants";

function Subheading(props: PropsWithChildren<TextProps>) {
  return <Text {...props} style={styles.text} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    color: Colors.SECONDARY_LABEL,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: 16,
  },
});

export default Subheading;
