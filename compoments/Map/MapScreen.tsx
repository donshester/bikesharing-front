import MapView, {MarkerPressEvent} from 'react-native-maps'
import React, {useEffect, useState} from "react";
import {View} from "react-native";
import { MINSK_REGION} from "./mapConfig";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import BikeMarker from "./BikeMarker";
import ToggleUpBar from "./toggleUpBar";
import {Bike} from "../../types/Bike";
import {bikes} from "../../types/mocks";


const MapScreen: React.FC = () =>{
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
    const [showToggleUpBar, setShowToggleUpBar] = useState(false);
    const handleMarkerPress = (bike: Bike) => {
        setSelectedBike(bike);
        setShowToggleUpBar(true);
    };

    const handleCloseToggleUpBar = () => {
        setShowToggleUpBar(false);
        setSelectedBike(null);
    };
    const handleStartDrive = () => {
        // Implement the logic to start the drive
    };
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
                    style={{ flex: 1, width:'100%' }}
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
                    >

                    {bikes.map((bike) => (
                        <BikeMarker key={bike.id} bike={bike} onPress={() => handleMarkerPress(bike)}/>
                    ))}
                </MapView>
            )}
            {selectedBike && showToggleUpBar && (
                <ToggleUpBar bike={selectedBike} onPress={handleStartDrive} onClose={handleCloseToggleUpBar}/>
            )}
        </View>
    )
}

export default MapScreen;