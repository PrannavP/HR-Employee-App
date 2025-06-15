import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimerComponentProps {
	emp_id: number;
	checkInTime: string; // ISO string
}

const TimerComponent: React.FC<TimerComponentProps> = ({
	emp_id,
	checkInTime,
}) => {
	const [elapsedTime, setElapsedTime] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const start = new Date(checkInTime).getTime();
			const now = new Date().getTime();
			const diff = now - start;

			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			const formatted = `${String(hours).padStart(2, "0")}:${String(
				minutes
			).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

			setElapsedTime(formatted);
		}, 1000);

		return () => clearInterval(interval);
	}, [checkInTime]);

	return (
		<View style={styles.timerContainer}>
			<Text style={styles.timerLabel}>Active Time</Text>
			<Text style={styles.timerText}>{elapsedTime}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	timerContainer: {
		alignItems: "center",
		marginBottom: 16,
	},
	timerLabel: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 4,
	},
	timerText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#1f2937",
	},
});

export default TimerComponent;
