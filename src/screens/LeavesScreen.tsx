import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LeavesTab from "../components/LeavesScreen/LeavesTab";
import AskLeavesTab from "../components/LeavesScreen/AskLeavesTab";

const LeavesScreen = () => {
    const [activeTab, setActiveTab] = useState<"leaves" | "askLeaves">("leaves");

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Leaves Management</Text>

            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "leaves" && styles.activeTab]}
                    onPress={() => setActiveTab("leaves")}
                >
                    <Text style={[styles.tabText, activeTab === "leaves" && styles.activeTabText]}>Leaves</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "askLeaves" && styles.activeTab]}
                    onPress={() => setActiveTab("askLeaves")}
                >
                    <Text style={[styles.tabText, activeTab === "askLeaves" && styles.activeTabText]}>Ask Leaves</Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <View style={styles.contentContainer}>
                {activeTab === "leaves" ? (
                    <LeavesTab />
                ) : (
                    <AskLeavesTab />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "800",
        color: "#333",
        marginBottom: 15,
        marginTop: 10,
        marginLeft: 5,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        padding: 5,
        width: "100%",
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#007BFF",
    },
    tabText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    activeTabText: {
        color: "#fff",
    },
    contentContainer: {
        flex: 1,
    },
});

export default LeavesScreen;