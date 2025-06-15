import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { requestPasswordReset } from '../services/api';


type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }: Props) => {
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async() => {
        // Handle forgot password logic here
        console.log('Forgot Password:', { fullName, department, role, message });

        // api call
        try{
            const response = await requestPasswordReset(fullName, department, role, message);
            console.log(response.data.message);
            Alert.alert("Success", response.data.message);

            // clear the input fields
            setFullName("");
            setDepartment("");
            setRole("");
            setMessage("");
        }catch(error){
            Alert.alert("Something went wrong!", String(error))
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Department"
                    value={department}
                    onChangeText={setDepartment}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Role"
                    value={role}
                    onChangeText={setRole}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleForgotPassword}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;