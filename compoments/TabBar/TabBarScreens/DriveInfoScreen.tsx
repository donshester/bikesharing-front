import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Alert, BackHandler} from 'react-native';
import {DriveInterface, HOST_NAME} from "../../../types/mocks";
import ScrollView = Animated.ScrollView;
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";
interface DriveCardProps {
    drive: DriveInterface;
}

const DriveCard: React.FC<DriveCardProps> = ({ drive }) => {
    return (
        <View style={styles.card}>
            <Text style={[styles.title, {fontSize: 24}]}>{drive.bike.modelName}</Text>
            <Text style={{fontSize: 16, marginTop: 10}}>{`${drive.user.firstName} ${drive.user.secondName}`}</Text>
            <Text style={{fontSize: 14, marginTop: 5}}>{`${drive.user.email}`}</Text>
            <Text style={{fontSize: 14, marginTop: 10}}>{`Start Time: ${moment(drive.startTime).format('MMMM Do, YYYY h:mm:ss A')}`}</Text>
            <Text style={{fontSize: 14, marginTop: 5}}>{`End Time: ${moment(drive.endTime).format('MMMM Do, YYYY h:mm:ss A')}`}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
            <Text style={{fontSize: 18}}>{`Cost: $${drive.cost}`}</Text>
        </View>
    );
};


const DriveInfoScreen = () => {
    const [drives, setDrives] = useState<DriveInterface[]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken')
                const response = await axios.get(`${HOST_NAME}/user/current/drives`, {
                    headers: {
                        Authorization: token as string,
                    },
                });
                const data = await response.data
                setDrives(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDrives();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.drivesTitle}>Drives</Text>
            {drives.length === 0 ? (
                <Text style={styles.noDrivesLabel}>No drives yet</Text>
            ) : (
                drives.map((drive) => <DriveCard key={drive.id} drive={drive} />)
            )}
            <View style={{height: 50}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        padding: 20,
        height: '100%',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    drivesTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        alignSelf: 'center',
        paddingTop: 30,
    },
    noDrivesLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});

export default DriveInfoScreen;
