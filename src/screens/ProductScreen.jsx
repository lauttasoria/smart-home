import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors'
//import products from '../data/products.json'
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService'


const ProductScreen = ({ route, navigation }) => {
 
    const { width, height } = useWindowDimensions()
    const productId = useSelector(state=>state.shopReducer.value.productId)

    const { data: productFound, error, isLoading } = useGetProductQuery(productId)

    const dispatch = useDispatch()

    return (
        <>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={colors.doradoApagado} />
                    :
                    error
                        ?
                        <Text>Error al cargar el producto</Text>
                        :
                        <ScrollView style={styles.container}>
                            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="reply" size={30} color="#fff" /></Pressable>
                            <View style={styles.productCard}>
                                <Text style={styles.title}>{productFound.title}</Text>

                                <Image
                                    source={{ uri: productFound.mainImage }}
                                    alt={productFound.title}
                                    width='100%'
                                    height={width * .7}
                                    resizeMode='contain'
                                />

                                <Text style={styles.longDescription}>
                                    {productFound.longDescription || 'Descripción no disponible'}
                                </Text>
                                <Text style={styles.price}>
                                    {productFound.price ? `$${productFound.price}` : 'Precio no disponible'}
                                </Text>
                                <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, styles.addCartButton]} onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))}>
                                    <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                                </Pressable>
                            </View>

                        </ScrollView>
            }
        </>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    backButton: {
        backgroundColor: '#2c9988',
        borderRadius: 20,
        padding: 8,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, // Aumenta la opacidad para hacer la sombra más fuerte
        shadowRadius: 8, // Aumenta el radio para una sombra más amplia
        elevation: 10, // Aumenta la elevación para Android
    },
    title: {
        fontFamily: 'Kanit',
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.azulPetroleo,
        marginBottom: 10,
        textAlign: 'center',
    },
    /*image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },*/
    longDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
        textAlign: 'justify',
        lineHeight: 22,
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#2c9988',
        textAlign: 'center',
    },
    addCartButton: {
        padding: 5,
        paddingHorizontal: 16,
        backgroundColor: colors.doradoApagado,
        borderRadius: 10,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.grisOscuro,
        fontSize: 18,
        textAlign: 'center',

    }
});