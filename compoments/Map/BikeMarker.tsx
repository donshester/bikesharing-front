import React from "react";
import { Image, View } from "react-native";
import {LatLng, Marker, MarkerPressEvent} from "react-native-maps";
import {Bike} from "../../types/Bike";
import { MaterialIcons } from '@expo/vector-icons';
import {BikeStatus, Roles} from "../../types/mocks";

interface BikeMarkerProps {
    bike: Bike;
    onPress: () => void;
}

const BikeMarker: React.FC<BikeMarkerProps> = ({bike, onPress}) => {
    const latLang: LatLng = { latitude: bike.latitude, longitude: bike.longitude};

    return (
        <Marker coordinate={latLang} anchor={{ x: 0.5, y: 0.5 }} onPress={onPress}>
            <View style={{ width: 24, height: 24 }}>
                {bike.status === BikeStatus.OutOfOrder ? (
                    <MaterialIcons name="pedal-bike" size={24} color="red" />
                ) : (
                    <MaterialIcons name="pedal-bike" size={24} color="black" />
                )}

            </View>
        </Marker>
    );
};

export default BikeMarker;
