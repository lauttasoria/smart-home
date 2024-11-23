import { View, Text, StyleSheet, FlatList, Image, Pressable, Animated } from 'react-native';
//import cart from '../data/cart.json'
import { colors } from "../global/colors";
import FlatCard from '../components/FlatCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart } from '../features/cart/cartSlice';

const CartScreen = ({navigation}) => {
    
    const cart = useSelector(state => state.cartReducer.value.cartItems)
    const total = useSelector(state=>state.cartReducer.value.total)
    const [triggerPost, result] = usePostReceiptMutation()

    const cartLength = useSelector(state => state.cartReducer.value.cartLength)

    const dispatch = useDispatch()

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotal}>Total: $ {total} </Text>
            <Pressable style={styles.confirmButton} onPress={()=>{
                triggerPost({cart,total,createdAt: Date.now()})
                dispatch(clearCart())
                navigation.navigate("Receipts")
            }} >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.cartImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
            </View>
        </FlatCard>
    )

    return (
        <>
        {
        cartLength>0
        ?
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
        :
        <View style={styles.cartEmpty}><Text style={styles.cartEmptyText} >Aún no hay productos en el carrito</Text></View>
        }
        </>
    )
};

export default CartScreen;

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 16,
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    cartImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    cartDescription: {
        flex: 1,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
        color: '#333',
    },
    description: {
        color: '#666',
        marginBottom: 8,
    },
    price: {
        color: '#333',
        marginBottom: 4,
    },
    quantity: {
        color: '#333',
        marginBottom: 8,
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.doradoApagado,
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginTop: 10,
        color: '#333333',
    },
    footerContainer: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    footerTotal: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
    },
    confirmButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: colors.doradoApagado,
        borderRadius: 25,
    },
    confirmButtonText: {
        color: colors.blancoHumo,
        fontSize: 18,
        fontWeight: '700',
    },
    cartScreenTitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 16,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 16,
    },
});