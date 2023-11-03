import React, {useEffect, useState} from 'react';
import UserInfoScreen from "./compoments/TabBar/TabBarScreens/UserInfoScreen";
import LoginSignupScreen from "./compoments/LoginSignupScreen";
import CreateBikeScreen from "./compoments/TabBar/TabBarScreens/CreateBikeScreen";
import SearchScreen from "./compoments/TabBar/TabBarScreens/SearchScreen";
import {NavigationContainer, useFocusEffect, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {fetchUser} from "./API/fetchUser";
import MainScreen from "./compoments/MainScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DriveInfoScreen from "./compoments/TabBar/TabBarScreens/DriveInfoScreen";
import BikeScreen from "./compoments/BikeScreen";
const Stack = createStackNavigator();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        const user = await fetchUser();
        if(user?.role){
            setIsAuthenticated(true);
        }

    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('bikeToken')
        setIsAuthenticated(false);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginSignupScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateBikeScreen" component={CreateBikeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DriveInfoScreen" component={DriveInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name={"BikeScreen"} component={BikeScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;