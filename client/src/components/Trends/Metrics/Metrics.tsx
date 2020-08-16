import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import Indice from "./Indice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import IndiceSkeleton from "./IndiceSkeleton";

function Metrics(props: ViewProps) {
  const metrics = useSelector((state: RootState) => state.trends.metrics);

  if (!metrics.data) {
    return <MetricsSkeleton style={[styles.container, props.style]} />;
  }
  return (
    <View {...props} style={[styles.container, props.style]}>
      <View style={styles.row}>
        <Indice
          style={[styles.indice, styles.leftIndice]}
          label="Points"
          points={metrics.data?.points}
        />
        <Indice
          style={[styles.indice, styles.rightIndice]}
          label="Retweet"
          points={metrics.data?.retweets}
        />
      </View>
      <View style={styles.row}>
        <Indice
          style={[styles.indice, styles.leftIndice]}
          label="Favorite"
          points={metrics.data?.favorites}
        />
        <Indice
          style={[styles.indice, styles.rightIndice]}
          label="Reply"
          points={metrics.data?.replies}
        />
      </View>
    </View>
  );
}

function MetricsSkeleton(props: ViewProps) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <View style={styles.row}>
        <IndiceSkeleton style={[styles.indice, styles.leftIndice]} />
        <IndiceSkeleton style={[styles.indice, styles.rightIndice]} />
      </View>
      <View style={styles.row}>
        <IndiceSkeleton style={[styles.indice, styles.leftIndice]} />
        <IndiceSkeleton style={[styles.indice, styles.rightIndice]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  row: {
    width: "100%",
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
  },
  indice: {
    flexGrow: 1,
    flex: 1,
  },
  leftIndice: {
    marginRight: 4,
  },
  rightIndice: {
    marginLeft: 4,
  },
});

export default Metrics;
