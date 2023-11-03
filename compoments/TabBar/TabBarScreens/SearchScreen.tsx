import React, { useState } from 'react';
import {View, Text, FlatList, Alert, StyleSheet} from 'react-native';
import SearchBar from './SearchBar';
import {UserCard, UserCardProps} from './SearchBarCards';
import { HOST_NAME, Roles, UserInterface} from '../../../types/mocks';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {

    const [searchResults, setSearchResults] = useState<UserInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const deleteUser = async (userId: number): Promise<void> => {
        const response = await axios.delete(`${HOST_NAME}/user/${userId}`, {
            headers: { Authorization: await AsyncStorage.getItem('authToken') },
        });

        if (response.status !== 204) {
            Alert.alert(`Failed to delete user with ID ${userId}`);
        }
    };
    const updateUserRole = async (userId: number)=> {
        const response = await axios.put(`${HOST_NAME}/user/${userId}/role`, {role: "admin"}, {
            headers: { Authorization: await AsyncStorage.getItem('authToken')},
        });

        if (response.status !== 200) {
            throw new Error(`Failed to update user role for user with ID ${userId}`);
        }
        else {
            Alert.alert('Updated');
            const updatedUsers= searchResults.map(user => {
                if (user.id === userId) {
                    return { ...user, role: "admin" };
                } else {
                    return user;
                }
            });
            setSearchResults(updatedUsers as UserInterface[]);
        }
    };


    const handleSearch = async (query: string) =>{
        try {
            setIsLoading(true);
            console.log(await AsyncStorage.getItem('authToken'));
            const response = await axios.get<UserInterface[]>(`${HOST_NAME}/user/search/users`, {
                params: {query},
                headers: { Authorization: await AsyncStorage.getItem('authToken')}
            })
            if(response.status!==200){
                Alert.alert('Error');
            }
            const users: UserInterface[] = response.data;
            setSearchResults(users);
        }
        catch (error: any){
            Alert.alert(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const renderItem = ({ item }: { item: UserInterface }) => {
        const userCardProps: UserCardProps = {
            user: { ...item },
            onPress: () => console.log('Pressed'),
            onUpdateRole: () => updateUserRole(item.id),
            onDeleteUser: () => deleteUser(item.id),
        };

        return <UserCard {...userCardProps} />;
    };

    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex:1
    }
})
export default SearchScreen;
