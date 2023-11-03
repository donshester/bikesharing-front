import MapView from 'react-native-maps'
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MINSK_REGION} from "./mapConfig";
import * as Location from 'expo-location';
import {LocationObject} from 'expo-location';
import BikeMarker from "./BikeMarker";
import ToggleUpBar from "./toggleUpBar";
import {Bike} from "../../types/Bike";
import {HOST_NAME, Roles} from "../../types/mocks";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "../TabBar/TabBar";
import {fetchUser} from "../../API/fetchUser";

interface MapScreenProps{
    isAdmin: boolean;
}
const MapScreen: React.FC<MapScreenProps> = ({isAdmin}) =>{
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
    const [showToggleUpBar, setShowToggleUpBar] = useState(false);
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [showAllBikes, setShowAllBikes] = useState(false);

    const handleMarkerPress = (bike: Bike) => {
        setSelectedBike(bike);
        setShowToggleUpBar(true);
    };
    const handleShowAllBikes = ()=>{
        setShowAllBikes(!showAllBikes);
    }
    const handleCloseToggleUpBar = () => {
        setShowToggleUpBar(false);
        setSelectedBike(null);
    };

    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                console.log(token);
                let url = `${HOST_NAME}/bike`;
                if (!showAllBikes) {
                    url += '/available';
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const bikes: Bike[] = response.data;

                setBikes(bikes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBikes();

        const interval = setInterval(() => {
            fetchBikes();
        }, 10000);

        return () => clearInterval(interval);
    }, [showAllBikes]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    return (
        <View style={{ flex: 1, width:'100%'}}>
            {location && (
                <MapView
                    style={{flex: 1, width: '100%', paddingTop: 60}}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={MINSK_REGION}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    userLocationPriority={"high"}
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    toolbarEnabled={false}
                >

                    {bikes.map((bike) => (
                        <BikeMarker key={bike.id} bike={bike} onPress={() => handleMarkerPress(bike)}/>
                    ))}

                </MapView>
            )}
            {isAdmin && (
                <TouchableOpacity style={styles.button} onPress={handleShowAllBikes}>
                    <Text style={styles.buttonText}>
                        {showAllBikes ? 'Hide' : 'All Bikes'}
                    </Text>
                </TouchableOpacity>
            )}
            {selectedBike && showToggleUpBar && (
                <ToggleUpBar bike={selectedBike} onClose={handleCloseToggleUpBar} isAdmin={isAdmin}/>
            )}
        </View>

    )
}
const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default MapScreen;