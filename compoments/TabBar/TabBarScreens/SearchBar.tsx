import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={'Search Users'}
                onChangeText={setSearchTerm}
                value={searchTerm}
                onSubmitEditing={()=>onSearch(searchTerm)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 5,

    },
    button: {
        padding: 8,
        borderRadius: 10,
    },
    activeButton: {
        backgroundColor: '#4c4c4c',
    },
    buttonText: {
        color: '#4c4c4c',
        fontWeight: 'bold',
    },
    activeButtonText: {
        color: '#fff',
    },
    input: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
});

export default SearchBar;
