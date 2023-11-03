import React, {useEffect, useState} from "react";
import TabBar from "./TabBar/TabBar";
import {Alert, BackHandler, View} from "react-native";
import MapScreen from "./Map/MapScreen";
import {fetchUser} from "../API/fetchUser";
import {Roles} from "../types/mocks";
import {useNavigation} from "@react-navigation/native";

const MainScreen = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await fetchUser();
                if (!user) {
                    navigation.navigate("LoginScreen");
                }
                setIsAdmin(user?.role === Roles.Admin);

            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <MapScreen isAdmin={isAdmin}/>
            <TabBar IsAdmin={isAdmin} />
        </View>
    );
};

export default MainScreen;
