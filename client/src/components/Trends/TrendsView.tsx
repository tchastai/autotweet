import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import LargeTitle from "../Typography/LargeTitle";
import ProfilePicture from "./ProfilePicture";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, RootState } from "../../store";
import { getMetrics, getGraph } from "../../store/trends";
import Metrics from "./Metrics/Metrics";
import Graph from "./Graph/Graph";
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard/Leaderboard";

function TrendsView() {
  const dispatch = useAppDispatch();

  const username = useSelector(
    (state: RootState) => state.trends.accountInfo.username
  );

  useEffect(() => {
    username && dispatch(getMetrics(username));
    username && dispatch(getGraph({ username }));
  }, [username]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.view}>
        <View style={styles.titleView}>
          <LargeTitle>Trends</LargeTitle>
          <ProfilePicture />
        </View>
        <Metrics style={styles.widget} />
        <Graph style={styles.widget} />
        <Leaderboard style={styles.widget} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  titleView: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 16,
    alignSelf: "stretch",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widget: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 24,
    alignSelf: "stretch",
  },
});

export default TrendsView;
