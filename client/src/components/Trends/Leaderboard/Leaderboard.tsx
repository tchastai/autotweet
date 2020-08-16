import React from "react";
import { ViewProps } from "react-native";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

function Leaderboard(props: ViewProps) {
  return <LeaderboardSkeleton {...props} />;
}

export default Leaderboard;
