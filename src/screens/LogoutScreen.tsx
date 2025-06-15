import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { fetchEmployeeProfile } from '../services/api';
import { useUser } from "../hooks/useUser";

const LogoutScreen: React.FC = () => {
    const { user } = useUser();
    const [profile, setProfile] = useState<any>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const getProfile = async () => {
            if (user) {
                try {
                    const response = await fetchEmployeeProfile(user.id);
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching employee profile:', error);
                }
            }
        };

        getProfile();
    }, [user]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            console.log('userToken removed');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error removing userToken:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Employee Profile</Text>
            {profile ? (
                <View style={styles.profileContainer}>
                    <Text style={styles.profileItem}><Text style={styles.label}>Employee ID:</Text> {profile.emp_id}</Text>
                    <Text style={styles.profileItem}><Text style={styles.label}>Name:</Text> {profile.first_name} {profile.last_name}</Text>
                    <Text style={styles.profileItem}><Text style={styles.label}>Email:</Text> {profile.email}</Text>
                    <Text style={styles.profileItem}><Text style={styles.label}>Department:</Text> {profile.department}</Text>
                    <Text style={styles.profileItem}><Text style={styles.label}>Role:</Text> {profile.role}</Text>
                    <Text style={styles.profileItem}><Text style={styles.label}>Join Date:</Text> {new Date(profile.join_date).toLocaleDateString()}</Text>
                </View>
            ) : (
                <Text>Loading profile...</Text>
            )}
            <Button title='Logout' onPress={handleLogout} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    profileItem: {
        fontSize: 16,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
    },
});

export default LogoutScreen;