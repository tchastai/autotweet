import React from "react";

import Svg, { Path } from "react-native-svg";
import { View, ViewProps, StyleSheet } from "react-native";
import { Colors } from "../../../constants";

interface TrendArrowProps extends ViewProps {
    points: number;
}

function getContainerStyle(points: number) {
    if (points === 0) {
        return styles.neutral
    } else if (points > 0) {
        return styles.up
    }
    return styles.down
}

function TrendArrow(props: TrendArrowProps) {
    const { points } = props

    const Circle = () => <View style={styles.circle} />


    return (
        <View
            {...props}
            style={[styles.container, getContainerStyle(points), props.style]}
        >
            {
                points !== 0 ?
                    <Svg height="24" viewBox="0 0 24 24" width="24">
                        <Path d="M0 0h24v24H0V0z" fill="none" />
                        <Path
                            fill={points > 0 ? Colors.PURPLE : Colors.RED}
                            d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                        />
                    </Svg>
                    :
                    <Circle />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    up: {
        backgroundColor: Colors.SECONDARY_PURPLE,
    },
    down: {
        transform: [{ rotateX: "180deg" }],
        backgroundColor: Colors.SECONDARY_RED,
    },
    neutral: {
        backgroundColor: Colors.SECONDARY_ORANGE
    },
    circle: {
        borderWidth: 2,
        borderColor: Colors.ORANGE,
        width: 16,
        height: 16,
        borderRadius: 16
    }
});

export default TrendArrow;
