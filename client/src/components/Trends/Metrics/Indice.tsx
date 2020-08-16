import React from "react";
import { View, StyleSheet, Text, ViewProps } from "react-native";

import TrendArrow from "./TrendArrow";
import { Colors } from "../../../constants";
import IndiceSkeleton from "./IndiceSkeleton";

interface IndiceProps extends ViewProps {
  points: number;
  label: string;
}

function generateIndiceDisplay(n: number) {
  return `${n > 0 ? "+" : ""}${n}`;
}

function Indice(props: IndiceProps) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <TrendArrow points={props.points} style={styles.arrow} />
      <View>
        <Text style={styles.number}>{generateIndiceDisplay(props.points)}</Text>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREY,
    minWidth: 128,
    height: 56,
    borderRadius: 12,
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  number: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.WHITE,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  label: {
    fontSize: 12,
    color: Colors.SECONDARY_LABEL,
    lineHeight: 16,
    letterSpacing: 0,
  },
  arrow: {
    marginEnd: 16,
  },
});

export default Indice;
