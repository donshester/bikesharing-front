import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {HOST_NAME, UserInterface} from "../types/mocks";

export const fetchUser = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get<UserInterface>(`${HOST_NAME}/user/current`, {
            headers: {
                Authorization: `${token}`,
            },
        });

        const user:UserInterface = response.data;
        return user;
    } catch (error) {
        return null;
    }
};