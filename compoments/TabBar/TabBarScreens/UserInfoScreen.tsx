import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Formik } from 'formik';
import moment from 'moment';
import {HOST_NAME, UserInterface} from "../../../types/mocks";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center'
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    value: {
        marginBottom: 10,
    },
});

const UserInfo:React.FC = () => {
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const response = await axios.get(`${HOST_NAME}/user/current`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setUser(response.data);
                console.log(user);
            } catch (error) {
                console.error(error);
                Alert.alert('Can not update');
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (values: any) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (
                values.firstName !== user?.firstName ||
                values.lastName !== user?.secondName ||
                values.phone !== user?.phone ||
                values.email !== user?.email ||
                values.password !== ''
            ) {
                const response = await axios.put<UserInterface>(
                    `${HOST_NAME}/user/update`,
                    values,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setUser(response.data);
                await AsyncStorage.setItem('authToken', response.data.token);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Can not update');
        }
    };

    const creationTime = user ? moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a') : '';
    const lastUpdateTime = user ? moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a') : '';

    console.log(user?.email);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Info</Text>
            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>{creationTime}</Text>
            <Text style={styles.label}>Last Updated:</Text>
            <Text style={styles.value}>{lastUpdateTime}</Text>
            <Formik
                initialValues={{
                    firstName: user?.firstName || '',
                    lastName: user?.secondName || '',
                    phone: user?.phone || '',
                    email: user?.email || '',
                    password: ''
                }}
                onSubmit={handleUpdate}
            >
                {({ handleChange, handleBlur, values }) => (
                    <>
                        <Text>{values.lastName}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleUpdate(values)}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default UserInfo;
