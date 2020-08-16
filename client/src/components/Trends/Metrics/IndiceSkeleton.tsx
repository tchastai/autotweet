import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

import { Colors } from "../../../constants";


function IndiceSkeleton(props: ViewProps) {
    return (
        <View {...props} style={[styles.container, props.style]}>
            <View
                style={styles.arrow}
            />
            <View style={styles.information}>
                <View style={styles.number} />
                <View style={styles.label} />
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
    arrow: {
        marginEnd: 16,
        backgroundColor: Colors.SKELETON,
        width: 40,
        height: 40,
        borderRadius: 12,
    },
    number: {
        backgroundColor: Colors.SKELETON,
        borderRadius: 10,
        width: 64,
        height: 20
    },
    label: {
        backgroundColor: Colors.SKELETON,
        borderRadius: 10,
        width: 64,
        height: 14
    },
    information: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        height: 40,
    }
});

export default IndiceSkeleton;