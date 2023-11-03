import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';
import axios from "axios/index";
import {HOST_NAME} from "../types/mocks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text, Alert} from "react-native";
import Toast from "react-native-toast-message";
const LocationScreen: React.FC = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>('');
    useEffect(() => {
        const sendLocation = async () => {
            if (location) {
                const { latitude, longitude } = location.coords;
                const token = await AsyncStorage.getItem('bikeToken');
                const config = {
                    headers: { Authorization: token },
                };
                try {
                    const response = await axios.put(
                        `${HOST_NAME}/bike/location`,
                        { latitude, longitude },
                        config
                    );

                    console.log(response.data);

                } catch (error) {
                    console.log('Error sending location:', error);
                }
            }
        };

        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                await sendLocation();
                const intervalId = setInterval(() => {
                    sendLocation();
                }, 5000);

                return () => {
                    clearInterval(intervalId);
                };
            } catch (error) {
                setErrorMsg('Failed to get location');
            }
        };

        (async () => {
            await getLocation();
        })();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>You are bike</Text>
            {errorMsg ? <Text>{errorMsg}</Text> : null}
        </View>
    );
};

export default LocationScreen;
