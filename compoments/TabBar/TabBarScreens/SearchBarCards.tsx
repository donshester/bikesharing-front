import React from "react";
import {Bike} from "../../../types/Bike";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import {Roles, UserInterface} from "../../../types/mocks";

// export interface BikeCardProps {
//     bike: Bike;
//     onPress: () => void;
//     onShowLastDrives: () => void;
//     onChangeStatus: () => void;
// }
//
// export const BikeCard: React.FC<BikeCardProps> = ({ bike, onPress, onShowLastDrives, onChangeStatus }) => {
//     return (
//         <TouchableOpacity style={styles.card} onPress={onPress}>
//             <Text style={styles.cardTitle}>Bike ID: {bike.id}</Text>
//             <Text style={styles.cardText}>Model Name: {bike.modelName}</Text>
//             <Text style={styles.cardText}>Description: {bike.description}</Text>
//             <Text style={styles.cardText}>Status: {bike.status}</Text>
//             <View style={styles.buttonsContainer}>
//                 <TouchableOpacity style={[styles.button, styles.showLastDrivesButton]} onPress={onShowLastDrives}>
//                     <Text style={styles.buttonText}>Show Last Drives</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.button, styles.changeStatusButton]} onPress={onChangeStatus}>
//                     <Text style={styles.buttonText}>Change Status</Text>
//                 </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     );
// };

export interface UserCardProps {
    user: UserInterface;
    onPress: () => void;
    onUpdateRole: () => void;
    onDeleteUser: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onPress, onDeleteUser, onUpdateRole }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {user.firstName} {user.secondName}
                </Text>
                <Text style={styles.cardText}>Email: {user.email}</Text>
            </View>
            <View style={styles.cardButtons}>
                {user.role === Roles.User &&
                    <>
                    <TouchableOpacity style={styles.updateRoleButton} onPress={onUpdateRole}>
                    <Text style={styles.updateRoleButtonText}>Update Role</Text>
                </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.deleteButton} onPress={onDeleteUser}>*/}
                    {/*    <Text style={styles.deleteButtonText}>Delete User</Text>*/}
                    {/*</TouchableOpacity>*/}
                </>
                }
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
    },
    cardButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
    },
    updateRoleButton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 20,
    },
    updateRoleButtonText: {
        color: '#fff',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showLastDrivesButton: {
        backgroundColor: '#1abc9c',
    },
    changeStatusButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
