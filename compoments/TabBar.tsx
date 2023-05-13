import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";



const TabBar: React.FC= () => {

    const navigation = useNavigation();

    const handleUserPress = () => {

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabButton}  onPress={handleUserPress}>
                <FontAwesome name="user" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} /**onPress={onUserPress}**/>
                <FontAwesome name="history" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} /**onPress={onUserPress}**/>
                <FontAwesome name="sign-out" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
});

export default TabBar;
