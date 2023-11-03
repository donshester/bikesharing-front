import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {BikeStatus, CreateBikeDto, HOST_NAME, Roles} from "../../../types/mocks";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MINSK_REGION} from "../../Map/mapConfig";
import {CreateBikeResponse} from "../../../types/Bike";
import SvgQRCode from 'react-native-qrcode-svg';
import QRCode from "react-native-qrcode-svg";
import {useNavigation} from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    modelName: Yup.string()
        .label('Model Name')
        .required()
        .min(3, 'Must have at least 3 characters'),
    description: Yup.string()
        .label('Description')
        .required()
        .min(10, 'Must have at least 10 characters'),
    hourlyPrice: Yup.number()
        .label('Hourly Price')
        .required()
        .min(0, 'Price cannot be negative'),
});

const CreateBikeScreen = () => {
    const [showQRCode, setShowQRCode] = useState(false);
    const [bikeToken, setBikeToken] = useState('');
    const navigation = useNavigation();

    const onSubmit = async (values: CreateBikeDto) => {
        try {
            values.latitude = MINSK_REGION.latitude;
            values.longitude = MINSK_REGION.longitude;
            values.isAvailable = true;
            values.hourlyPrice = Number(values.hourlyPrice);
            const response = await axios.post<CreateBikeResponse>(`${HOST_NAME}/bike/create`, values, {
                headers: {
                    Authorization: await AsyncStorage.getItem('authToken'),
                },
            });

            if (response.status === 201) {
                const bikeResponse = response.data;
                setBikeToken(bikeResponse.token);
                setShowQRCode(true);
                Alert.alert('Bike Created', 'The bike has been successfully created.');
            } else {
                throw new Error('Failed to create bike.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    const [status, setStatus] = useState<BikeStatus>(BikeStatus.OutOfOrder)
    const toggleStatus = () => {
        setStatus(prevStatus => prevStatus === BikeStatus.Serviceable ? BikeStatus.OutOfOrder : BikeStatus.Serviceable);
    }
    console.log('asdasd')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Bike</Text>
            {showQRCode ? (
                <View style={styles.qrCodeContainer}>
                    <Text style={styles.qrCodeTitle}>Bike QR Code:</Text>
                    <QRCode
                        value={bikeToken}
                        size={200}
                    />
                </View>
            ) : (
            <Formik
                initialValues={{
                    modelName: '',
                    description: '',
                    hourlyPrice: 0,
                    status: BikeStatus.Serviceable ,
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      isValid,
                  }) => (
                    <View>
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, margin: 10 }}
                            placeholder="Model Name"
                            onChangeText={handleChange('modelName')}
                            onBlur={handleBlur('modelName')}
                            value={values.modelName}
                        />
                        {touched.modelName && errors.modelName && (
                            <Text style={{ color: 'red' }}>{errors.modelName}</Text>
                        )}
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, margin: 10 }}
                            placeholder="Description"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                        />
                        {touched.description && errors.description && (
                            <Text style={{ color: 'red' }}>{errors.description}</Text>
                        )}
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, margin: 10 }}
                            placeholder="Hourly Price"
                            keyboardType="numeric"
                            onChangeText={handleChange('hourlyPrice')}
                            onBlur={handleBlur('hourlyPrice')}
                            value={values.hourlyPrice.toString()}
                        />
                        {touched.hourlyPrice && errors.hourlyPrice && (
                            <Text style={{ color: 'red' }}>{errors.hourlyPrice}</Text>
                        )}
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Text style={{ marginRight: 10 }}>Status:</Text>
                            <Switch
                                value={values.status === BikeStatus.Serviceable}
                                onValueChange={() =>
                                    setStatus(
                                        status === BikeStatus.Serviceable
                                            ? BikeStatus.OutOfOrder
                                            : BikeStatus.Serviceable
                                    )
                                }
                            />
                            <Text>{values.status === BikeStatus.Serviceable ? 'Serviceable' : 'Out of Order'}</Text>
                        </View>
                        <Button title="Submit" disabled={!isValid} onPress={()=>onSubmit(values)} />
                    </View>
                )}
            </Formik>)}
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop:50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    qrCodeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrCodeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default CreateBikeScreen;
