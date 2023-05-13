import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {DriveInterface} from "../types/mocks";
import ScrollView = Animated.ScrollView;


interface DriveCardProps {
    drive: DriveInterface;
}

const DriveCard: React.FC<DriveCardProps> = ({ drive }) => {
    return (
        <View style={styles.card}>
            <Text style={[styles.title, {fontSize: 24}]}>{drive.bike.modelName}</Text>
            <Text style={{fontSize: 16, marginTop: 10}}>{`${drive.user.firstName} ${drive.user.lastName}`}</Text>
            <Text style={{fontSize: 14, marginTop: 5}}>{`${drive.user.email}`}</Text>
            <Text style={{fontSize: 14, marginTop: 10}}>{`Start Time: ${drive.startTime}`}</Text>
            <Text style={{fontSize: 14, marginTop: 5}}>{`End Time: ${drive.endDate}`}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 10 }} />
            <Text style={{fontSize: 18}}>{`Cost: $${drive.cost}`}</Text>
        </View>
    );
};

interface DriveListProps {
    drives: DriveInterface[];
}

const DriveList: React.FC<DriveListProps> = ({ drives }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.drivesTitle}>Drives</Text>
            {drives.map((drive) => (
                <DriveCard key={drive.id} drive={drive} />
            ))}
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
    }
});

export default DriveList;
