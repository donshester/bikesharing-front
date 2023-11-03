import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bike} from "../../types/Bike";
import {BikeStatus, DriveInterface, HOST_NAME, Roles, UserInterface} from "../../types/mocks";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchUser} from "../../API/fetchUser";

type ToggleUpBarProps = {
    bike: Bike;
    onClose: () => void;
    isAdmin: boolean;
};
const ToggleUpBar: React.FC<ToggleUpBarProps> = ({ bike, onClose, isAdmin }) => {
    const [driveInProgress, setDriveInProgress] = useState(false);
    const [driveId, setDriveId] = useState<number | null>(null);
    const [cost, setCost] = useState<number>(0);
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (driveInProgress) {
            intervalId = setInterval(async () => {
                try {
                    const response = await fetch(`${HOST_NAME}/drive/${driveId}`, {
                        headers: {
                            Authorization: `${await AsyncStorage.getItem('authToken')}`,
                        },
                    });
                    const drive: DriveInterface = await response.json();
                    setCost(drive.cost);
                } catch (error) {
                    console.error(error);
                }
            }, 5000);
        }
        return () => clearInterval(intervalId);
    }, [driveInProgress, driveId]);

    const startDrive = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.post<DriveInterface>(
                `${HOST_NAME}/drive/start/${bike.id}`,null,{
                    headers: {
                        Authorization:token
                    },
                }
            );

            const drive: DriveInterface = await response.data;
            setDriveInProgress(true);
            setDriveId(drive.id);
            setCost(drive.cost);
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const endDrive = async () => {
        try {
            const response = await fetch(`${HOST_NAME}/drive/${driveId}/end`, {
                method: 'PUT',
                headers: {
                    Authorization: `${await AsyncStorage.getItem('authToken')}`,
                },
            });
            const drive: DriveInterface = await response.json();
            setDriveInProgress(false);
            setCost(drive.cost);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleDrive = () => {
        if (driveInProgress) {
            endDrive();
        } else {
            startDrive();
        }
    };
    const handleChangeBikeStatus = async (bikeId: number,status: BikeStatus) => {
        const newStatus = status === BikeStatus.Serviceable ? BikeStatus.OutOfOrder : BikeStatus.Serviceable;
        console.log(bikeId)
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.put(
                `${HOST_NAME}/bike/${bikeId}`,
                { status: newStatus },
                { headers: { Authorization: authToken } }
            );

            if (response.status === 200) {
                Alert.alert('Success', `Bike status updated for bike with ID ${bikeId}`);
            } else {
                Alert.alert('Error', `Failed to change bike status for bike with ID ${bikeId}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };
    return (
        <TouchableOpacity style={styles.container} onPress={toggleDrive} disabled={driveInProgress}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose} disabled={driveInProgress}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.model}>{bike.modelName}</Text>
                <Text style={styles.description}>{bike.description}</Text>
                {driveInProgress ? (
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{"$" + cost.toFixed(2)}</Text>
                        <Text style={styles.timerLabel}>Current Cost</Text>
                    </View>
                ) : (
                    <Text style={styles.hourlyPrice}>${bike.hourlyPrice}/hour</Text>
                )}
            </View>
            <View style={{flexDirection: "column"}}>
            <TouchableOpacity style={styles.button} onPress={toggleDrive}>
                <Text style={styles.buttonText}>
                    {driveInProgress ? 'End Drive' : 'Start Drive'}
                </Text>
            </TouchableOpacity>
            {isAdmin && (
                <TouchableOpacity style={styles.buttonChange} onPress={() => handleChangeBikeStatus(bike.id, bike.status)}>
                    <Text style={styles.buttonText}>
                        Change Bike Status
                    </Text>
                </TouchableOpacity>
            )}
            </View>
        </TouchableOpacity>
    );
};

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
        marginRight: 10,
        width: 120,
    },
    buttonChange: {
        backgroundColor: 'gray',
        borderRadius: 8,
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 20,
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
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    timerLabel: {
        fontSize: 12,
        color: '#888',
    },
});



export default ToggleUpBar;
