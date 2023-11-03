import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {CommonActions, StackActions, useNavigation} from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const TabBar: React.FC<{ IsAdmin: boolean}>= ({ IsAdmin }) => {
    const navigation = useNavigation();

    const handleUserPress = () => {
        navigation.navigate('UserInfoScreen');
    };

    const handleDrivePress = () => {
        navigation.navigate('DriveInfoScreen');
    };

    const handleCreateBikePress = () => {
        navigation.navigate('CreateBikeScreen');
    };

    const handleSearchPress = () => {
        navigation.navigate('SearchScreen');
    };

    const handleLogoutPress = async () => {
        await AsyncStorage.removeItem('authToken');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        );
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.tabButton} onPress={handleUserPress}>
                <FontAwesome name="user" size={24} color="black" />
            </TouchableOpacity>
            {IsAdmin && (
                <>
                    <TouchableOpacity style={styles.tabButton} onPress={handleCreateBikePress}>
                        <MaterialIcons name="create" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton} onPress={handleSearchPress}>
                        <FontAwesome name="search" size={24} color="black"/>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.tabButton} onPress={handleDrivePress}>
                <FontAwesome name="history" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={handleLogoutPress}>
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
        verticalAlign: "bottom"
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
});

export default TabBar;
