import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Bike} from "../../types/Bike";

type ToggleUpBarProps = {
    bike: Bike;
    onPress: () => void;
    onClose: () => void;
};

const ToggleUpBar: React.FC<ToggleUpBarProps> = ({ bike, onPress, onClose }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.model}>{bike.modelName}</Text>
                <Text style={styles.description}>{bike.description}</Text>
                <Text style={styles.hourlyPrice}>${bike.hourlyPrice}/hour</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Start Drive</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginRight: 16,
    },
    model: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    hourlyPrice: {
        fontSize: 14,
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 8,
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    closeButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        position: 'absolute',
        top: 8,
        right: 8,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});



export default ToggleUpBar;
