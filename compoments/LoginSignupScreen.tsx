import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import * as yup from 'yup'
import {Formik} from "formik";
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HOST_NAME, Roles} from "../types/mocks";
import axios from "axios";
import {fetchUser} from "../API/fetchUser";
import {BarCodeScanner} from "expo-barcode-scanner";

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});
const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First name is required'),
    secondName: yup.string().required('Second name is required'),
    phone: yup.string().required('Phone is required')
});
interface Response {
    id: string;
    email: string;
    firstName: string;
    secondName: string;
    phone: string;
    token: string;
}
interface LoginValues {
    email: string;
    password: string;
}
type Values = LoginValues | SignupValues;
type SignupValues = {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    phone: string;
};
type QRCodeData = {
    token: string
};


export default function LoginSignupScreen(){
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const validationSchema = isSignup ? signupSchema : loginSchema;
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const navigation = useNavigation();
    const handleScanQRCode = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
            setIsCameraOpen(true);
        } else {
            console.log('Permission to access camera denied');
        }
    };

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        setIsCameraOpen(false);
        await AsyncStorage.setItem('bikeToken', data);
        navigation.navigate('BikeScreen');
    };


    const createSubmitHandler = (endpoint: string) => async (values: Values) => {
        try {
            const response = await axios.post<Response>(endpoint, values);
            const { id, email, firstName, secondName, phone, token } = response.data;

            if(response.status == 201){
                await AsyncStorage.setItem('authToken', token);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainScreen' }],
                    })
                );
            }
        } catch (error:any) {
            console.log(error);
            if (error.response.status === 422) {
                console.log(`Error: ${error.response.status}`);
                Alert.alert('Error', 'Invalid input values');
            } else {
                console.log(`Unexpected error: ${error.message}`);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            }
        }
    }

    const onSubmitLogin = (values: Values) =>{
        createSubmitHandler(`${HOST_NAME}/user/login`)(values);
    };
    const onSubmitSignup =(values: Values) =>{
        createSubmitHandler(`${HOST_NAME}/user/create`)(values);
    };


    return (
        <View style={styles.container}>
            {isCameraOpen ? (
                <>
                    <BarCodeScanner
                        style={StyleSheet.absoluteFillObject}
                        onBarCodeScanned={handleBarCodeScanned}
                    />
                    <TouchableOpacity style={styles.exitButton} onPress={() => setIsCameraOpen(false)}>
                        <Text style={styles.exitButtonText}>Exit Camera</Text>
                    </TouchableOpacity>
                </>
            ): (
                <>
            <Text  style={styles.title}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
            <Formik
                initialValues={{ email: '', password: '', firstName: '', secondName: '', phone:'' }}
                onSubmit={()=>{}}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        {isSignup && (
                            <>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    />
                                </View>
                                {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
                                <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Second Name"
                                    onChangeText={handleChange('secondName')}
                                    onBlur={handleBlur('secondName')}
                                    value={values.secondName}
                                />
                                </View>
                                {touched.secondName && errors.secondName && <Text style={styles.error}>{errors.secondName}</Text>}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Phone Number"
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                            </>
                        )}
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
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text>{showPassword ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                        <TouchableOpacity style={styles.button} onPress={()=> {
                            isSignup ? onSubmitSignup(values) : onSubmitLogin(values)}}>
                            <Text style={styles.buttonText} >{isSignup ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
            <TouchableOpacity style={{paddingTop:10}} onPress={handleScanQRCode}>
                <Text style={styles.buttonQR}>Scan QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsSignup(!isSignup)}>
                <Text style={styles.switchText}>
                    {isSignup ? 'Already have an account? Log In' : "Don't have an account?"}
                </Text>
            </TouchableOpacity>
                </>
                )}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        flex: 1,
        height: '100%',
    },
    exitButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center',
    },
    exitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
    },
    button: {
        backgroundColor: '#4285F4',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonQR:{
        color: 'gray',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    switchText: {
        color: '#4285F4',
        marginTop: 20,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});