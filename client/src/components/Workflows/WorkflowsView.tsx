import React from "react";
import { StyleSheet } from "react-native";
import LargeTitle from "../Typography/LargeTitle";
import { SafeAreaView } from "react-native-safe-area-context";

function WorkflowsView() {
  return (
    <SafeAreaView style={styles.view}>
      <LargeTitle style={styles.viewTitle}>Workflows</LargeTitle>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewTitle: {
    marginStart: 20,
    marginTop: 16,
    alignSelf: "flex-start",
  },
});

export default WorkflowsView;
