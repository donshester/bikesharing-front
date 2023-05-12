import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import MapScreen from "./compoments/Map/MapScreen";
import React, {useState} from "react";
import NavigationMenu from "./compoments/MenuPanel";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handlePressMenu = () => {
    setShowMenu(!showMenu);
  };

  const handlePressProfile = () => {
    // handle profile button press
  };

  const handlePressHistory = () => {
    // handle history button press
  };

  const handlePressLogout = () => {
    // handle logout button press
  };

  return (
      <View style={styles.container}>
        <MapScreen />
        {showMenu && (
            <NavigationMenu
                onPressProfile={handlePressProfile}
                onPressHistory={handlePressHistory}
                onPressLogout={handlePressLogout}
            />
        )}
        <TouchableOpacity style={styles.menuButton} onPress={handlePressMenu}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
    elevation: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default App;