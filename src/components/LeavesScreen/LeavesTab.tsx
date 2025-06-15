import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { fetchLeaveRequests } from "../../services/api";
import { useUser } from "../../hooks/useUser";

type Leave = {
    id: string;
    leave_type: string;
    starting_date: string;
    ending_date: string;
    status: "Approved" | "Pending" | "Rejected";
    reason: string;
};

const LeavesTab: React.FC = () => {
    const [leavesData, setLeavesData] = useState<Leave[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<string>("");
    const { user } = useUser();

    useEffect(() => {
        const getLeaveRequests = async () => {
            if (!user) {
                setStatus("User information is missing.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetchLeaveRequests(user.id.toString());
                setLeavesData(response.data.fetchEmployeeLeaves);
            } catch (error) {
                console.error("Error fetching leave requests:", error);
            } finally {
                setLoading(false);
            }
        };

        getLeaveRequests();
    }, [user]);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Approved":
                return { backgroundColor: "#28a745", color: "#fff" };
            case "Pending":
                return { backgroundColor: "#ff9800", color: "#fff" };
            case "Rejected":
                return { backgroundColor: "#dc3545", color: "#fff" };
            default:
                return {};
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={leavesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardType}>{item.leave_type} Leave</Text>
                        <Text style={[styles.statusBadge, getStatusStyle(item.status)]}>{item.status}</Text>
                    </View>
                    <Text style={styles.cardDate}>{new Date(item.starting_date).toLocaleDateString()} - {new Date(item.ending_date).toLocaleDateString()}</Text>
                    <Text style={styles.cardDesc}>{item.reason}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1.5,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10, // Add spacing between header and dates
    },
    cardType: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDate: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10, // Add spacing between dates and reason
    },
    cardDesc: {
        fontSize: 12,
        color: "#666",
    },
});

export default LeavesTab;