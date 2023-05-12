import React from "react";
import { Image, View } from "react-native";
import {LatLng, Marker, MarkerPressEvent} from "react-native-maps";
import {Bike} from "../../types/Bike";
import {bikes} from "../../types/mocks";


interface BikeMarkerProps {
    bike: Bike;
    onPress: () => void;
}

const BikeMarker: React.FC<BikeMarkerProps> = ({bike, onPress}) => {
    const latLang: LatLng = { latitude: bike.latitude, longitude: bike.longitude};

    return (
        <Marker coordinate={latLang} anchor={{ x: 0.5, y: 0.5 }} onPress={onPress}>
            <View style={{ width: 24, height: 24 }}>
                <Image
                    source={require('../../defaults/bike.png')}
                    style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                />
            </View>
        </Marker>
    );
};

export default BikeMarker;
