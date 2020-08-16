import React from "react";

import Svg, { Path } from "react-native-svg";
import { View, ViewProps } from "react-native";
import { Colors } from "../../constants";

function Arrow(props: ViewProps) {
  return (
    <View {...props}>
      <Svg height={24} viewBox="0 0 24 24" width={24}>
        <Path
          fill={Colors.WHITE}
          d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
        />
      </Svg>
    </View>
  );
}

export default Arrow;
