import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {
  ViewProps,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Colors } from "../../../constants";
import Title from "../../Typography/Title";
import Headline from "../../Typography/Headline";
import { useAppDispatch, RootState } from "../../../store";
import { getGraph } from "../../../store/trends";
import { useSelector } from "react-redux";
import GraphSkeleton from "./GraphSkeleton";

type SelectedValue = 20 | 40 | 60 | 80;

function Range(
  props: TouchableOpacityProps & { value: SelectedValue; selected?: boolean }
) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.55}
      style={[styles.range, props.selected && styles.rangeSelected]}
    >
      <Text style={styles.rangeText}>{props.value}</Text>
    </TouchableOpacity>
  );
}

function Graph(props: ViewProps) {
  const [selectedValue, setSelectedValue] = useState<SelectedValue>(20);
  const [isWebViewLoading, setIsWebViewLoading] = useState(false);

  const username = useSelector(
    (state: RootState) => state.trends.accountInfo.username
  );
  const html = useSelector((state: RootState) => state.trends.graph.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsWebViewLoading(true);
    username && dispatch(getGraph({ username, count: selectedValue }));
  }, [selectedValue]);

  if (html) {
    return (
      <View {...props}>
        <Title style={styles.title}>Graph</Title>
        <View style={styles.container}>
          <View style={styles.header}>
            <Headline>Popularity</Headline>
            <View style={styles.rangeRow}>
              <Range
                value={80}
                selected={selectedValue === 80}
                onPress={() => setSelectedValue(80)}
              />
              <Range
                value={60}
                selected={selectedValue === 60}
                onPress={() => setSelectedValue(60)}
              />
              <Range
                value={40}
                selected={selectedValue === 40}
                onPress={() => setSelectedValue(40)}
              />
              <Range
                value={20}
                selected={selectedValue === 20}
                onPress={() => setSelectedValue(20)}
              />
            </View>
          </View>
          <View style={styles.webview}>
            <WebView
              source={{ html }}
              style={[styles.webview, isWebViewLoading && { display: "none" }]}
              onLoadEnd={() => setIsWebViewLoading(false)}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View {...props}>
      <GraphSkeleton />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  container: {
    backgroundColor: Colors.GREY,
    borderRadius: 12,
    height: 256,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
  },
  graph: {
    height: 168,
    backgroundColor: Colors.SKELETON,
    borderRadius: 12,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  rangeRow: {
    width: 132,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  range: {
    width: 24,
    height: 24,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rangeSelected: {
    backgroundColor: Colors.SELECTED_GREY,
  },
  rangeText: {
    color: Colors.WHITE,
    fontSize: 13,
    fontWeight: "500",
  },
  webview: {
    height: 185,
    overflow: "hidden",
  },
});

export default Graph;
