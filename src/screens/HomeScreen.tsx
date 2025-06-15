import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { checkIn, checkOut, getSyncedTime } from "../services/api";
import { useUser } from "../hooks/useUser";
import TimerComponent from "../components/HomeScreen/TimerComponent";

const HomeScreen: React.FC = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [status, setStatus] = useState<string>("");
	const [checkInTime, setCheckInTime] = useState<string | null>(null);
	const { user } = useUser();

	// Get location on mount
	useEffect(() => {
		(async () => {
			let { status: locationStatus } =
				await Location.requestForegroundPermissionsAsync();
			if (locationStatus !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let currentLocation = await Location.getCurrentPositionAsync({});
			setLocation(currentLocation);
		})();
	}, []);

	// Get active check-in if exists
	useEffect(() => {
		if (!user) return;

		const fetchCheckInStatus = async () => {
			try {
				const response = await getSyncedTime(user.id);
				if (
					response.status === 200 &&
					response.data.getTimerData?.is_active
				) {
					setCheckInTime(response.data.getTimerData.check_in_time);
				}
			} catch (error) {
				console.log("Error checking active check-in:", error);
			}
		};

		fetchCheckInStatus();
	}, [user]);

	const handleCheckInOut = async (action: "checkin" | "checkout") => {
		if (!location) return;

		if (!user) {
			setStatus("User information is missing.");
			return;
		}

		try {
			const response =
				action === "checkin"
					? await checkIn(
							location.coords.latitude,
							location.coords.longitude,
							user.emp_id,
							user.id
					  )
					: await checkOut(user.emp_id, user.id);

			setStatus(response.data.message);

			if (action === "checkin") {
				const now = new Date().toISOString();
				setCheckInTime(now);
			} else {
				setCheckInTime(null);
			}
		} catch (error: any) {
			console.log(error);
			setStatus(
				error.response?.data?.message ||
					"An error occurred during check-in/out"
			);
		}
	};

	if (errorMsg) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{errorMsg}</Text>
			</View>
		);
	}

	if (!location) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.mapContainer}>
				<MapView
					key={location.coords.latitude + location.coords.longitude}
					provider="google"
					style={styles.map}
					userInterfaceStyle="dark"
					showsPointsOfInterest={false}
					showsBuildings={false}
					zoomEnabled={false}
					rotateEnabled={false}
					zoomTapEnabled={false}
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
				>
					<Marker
						coordinate={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						}}
						title="You are here"
					/>
				</MapView>
			</View>

			{/* Check-in/out Component */}
			<View style={styles.checkInOutContainer}>
				<Text style={styles.sectionTitle}>Check-in & Check-out</Text>

				{/* Timer shown if check-in is active */}
				{checkInTime && user && (
					<TimerComponent
						emp_id={user.id}
						checkInTime={checkInTime}
					/>
				)}

				{!checkInTime ? (
					<TouchableOpacity
						style={styles.checkInButton}
						onPress={() => handleCheckInOut("checkin")}
					>
						<Text style={styles.buttonText}>Check-In</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.checkOutButton}
						onPress={() => handleCheckInOut("checkout")}
					>
						<Text style={styles.buttonText}>Check-Out</Text>
					</TouchableOpacity>
				)}

				<Text style={styles.statusText}>{status}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapContainer: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, 0.2)",
	},
	text: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 8,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	checkInOutContainer: {
		padding: 16,
		backgroundColor: "#f8f9fa",
		borderBottomWidth: 1,
		borderBottomColor: "#dee2e6",
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 16,
		textAlign: "center",
	},
	checkInButton: {
		backgroundColor: "#16a34a",
		padding: 12,
		borderRadius: 4,
		// marginBottom: 8,
	},
	checkOutButton: {
		backgroundColor: "#dc2626",
		padding: 12,
		borderRadius: 4,
		// marginBottom: 8,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "500",
	},
	statusText: {
		textAlign: "center",
		marginTop: 8,
		color: "#6b7280",
	},
});

export default HomeScreen;
