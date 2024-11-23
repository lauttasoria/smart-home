import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import * as Location from 'expo-location';
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from 'react-native-toast-message';
import { colors } from "../global/colors";
import FlatCard from '../components/FlatCard';
import MapView, { Marker } from 'react-native-maps';

const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState("");
    const [places, setPlaces] = useState([]);

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        });
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            showToast("error", "Permisos de ubicación denegados.");
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const permissionOk = await getPermissions();
        if (!permissionOk) return;

        try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            if (currentLocation) {
                setLocation(currentLocation.coords);
                showToast("success", "¡Ubicación obtenida!");
            }
        } catch (error) {
            console.error("Error al obtener la ubicación:", error);
            showToast("error", "No se pudo obtener la ubicación.");
        }
    };

    const savePlace = () => {
        if (location && title) {
            const newPlace = {
                id: Date.now().toString(), // ID único basado en timestamp
                title,
                coords: { latitude: location.latitude, longitude: location.longitude },
            };
            setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
            setTitle("");
            setLocation(null); // Limpia el estado después de guardar
            showToast("success", "Lugar guardado correctamente.");
        } else {
            showToast("error", "Por favor completa el título y obtén la ubicación.");
        }
    };

    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: item.coords.latitude,
                            longitude: item.coords.longitude,
                        }}
                        title={item.title}
                    />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>
                    Lat: {item.coords.latitude.toFixed(4)}, Lng: {item.coords.longitude.toFixed(4)}
                </Text>
            </View>
        </FlatCard>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tiendas favoritas:</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa un título"
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
                <Pressable onPress={getLocation}>
                    <Icon name="location-on" color={colors.doradoApagado} size={29} />
                </Pressable>
                <Pressable onPress={savePlace}>
                    <Icon name="add-circle" color={colors.doradoApagado} size={28} />
                </Pressable>
            </View>
            <Text style={styles.subtitle}>Tus lugares:</Text>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={renderPlaceItem}
            />
            <Toast />
        </View>
    );
};

export default MyPlacesScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1e2a32", // Azul petróleo oscuro para el fondo
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0288d1", // Azul petróleo brillante para resaltar
        textAlign: "center",
        marginBottom: 10,
        textTransform: "uppercase",
    },
    subtitle: {
        fontSize: 16,
        color: "#b0bec5", // Gris claro para contraste
        marginVertical: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#2c3e50", // Azul grisáceo para el fondo del contenedor
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#0288d1",
        borderRadius: 25,
        padding: 12,
        width: "70%",
        paddingLeft: 16,
        color: "#ffffff",
        backgroundColor: "#34495e", // Azul oscuro para el fondo del input
    },
    placesContainer: {
        marginTop: 16,
    },
    placeContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#273746", // Fondo azul petróleo suave
        borderRadius: 15,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1,
        borderColor: "#0288d1",
    },
    mapContainer: {
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "#1e272e", // Azul oscuro para el mapa
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    map: {
        width: 120,
        height: 120,
    },
    mapTitle: {
        fontWeight: "bold",
        color: "#0288d1", // Azul petróleo brillante para títulos
        fontSize: 16,
        marginBottom: 4,
        textTransform: "uppercase",
    },
    address: {
        color: "#b0bec5", // Gris claro para las direcciones
        fontSize: 14,
    },
    placeDescriptionContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
});