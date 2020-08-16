import React from "react";
import { ViewProps, View, StyleSheet } from "react-native";
import { Colors } from "../../../constants";

function LeaderboardSkeleton(props: ViewProps) {
  return (
    <View {...props}>
      <View style={styles.title} />
      <View style={styles.container}>
        <View style={styles.subtitle} />
        <View style={styles.graph} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    width: 80,
    height: 24,
    backgroundColor: Colors.SKELETON,
    borderRadius: 12,
    marginBottom: 8,
  },
  container: {
    backgroundColor: Colors.GREY,
    borderRadius: 12,
    height: 256,
  },
  subtitle: {
    width: 80,
    height: 24,
    backgroundColor: Colors.SKELETON,
    borderRadius: 12,
    margin: 16,
  },
  graph: {
    height: 168,
    backgroundColor: Colors.SKELETON,
    borderRadius: 12,
    margin: 16,
  },
});

export default LeaderboardSkeleton;
