import {Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import React, {useState} from "react";
import * as yup from 'yup'
import {Formik} from "formik";
import { useNavigation } from '@react-navigation/native';
interface Props {
    isSignup: boolean;
    onSubmit: (values: { email: string; password: string; firstName: string; lastName: string; phone: string }) => void;
}
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});
const signupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().required('Phone is required')
});


export default function LoginSignupScreen({ isSignup, onSubmit }: Props){

    const [showPassword, setShowPassword] = useState(false);
    const validationSchema = isSignup ? signupSchema : loginSchema;
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <Text  style={styles.title}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
            <Formik
                initialValues={{ email: '', password: '', firstName: '', lastName: '', phone:'' }}
                onSubmit={onSubmit}
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
                                    placeholder="Last Name"
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                />
                                </View>
                                {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
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
                        <TouchableOpacity style={styles.button} /*onPress={handleSubmit}*/>
                            <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
            <TouchableOpacity onPress={() => navigation.navigate()}>
                <Text style={styles.switchText}>
                    {isSignup ? 'Already have an account? Log In' : "Don't have an account?"}
                </Text>
            </TouchableOpacity>
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