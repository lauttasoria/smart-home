import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopService'
import { setProductId } from '../features/shop/shopSlice'


const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [search, setSearch] = useState("")

    //const productsFilteredByCategory = useSelector(state=>state.shopReducer.value.productsFilteredByCategory)

    const category = useSelector(state => state.shopReducer.value.categorySelected)

    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)

    dispatch = useDispatch()

    useEffect(() => {
        setProductsFiltered(productsFilteredByCategory)
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search,productsFilteredByCategory]);

    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setProductId(item.id))
                navigation.navigate("Producto")
            }}>
                <View style={styles.productCard}>
                    <View>
                        <Image
                            source={{ uri: item.mainImage }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    </View>
                    <FlatCard style={styles.productContainer}>
                        <View style={styles.productDescription}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                            <View style={styles.tagsContainer}>
                                <Text style={styles.tagText}>Tags:</Text>
                                <FlatList
                                    style={styles.tags}
                                    data={item.tags}
                                    keyExtractor={(_, index) => index.toString()} // Cambio aquí para un keyExtractor único
                                    renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                                />
                            </View>
                            {item.discount > 0 && (
                                <View style={styles.discount}>
                                    <Text style={styles.discountText}>Descuento: {item.discount}%</Text>
                                </View>
                            )}
                            {item.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                            <Text style={styles.price}>Precio: ${item.price}</Text>
                        </View>
                    </FlatCard>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={colors.doradoApagado} />
                    :
                    error
                        ?
                        <Text>Error al cargar las categorías</Text>
                        :
                        <>
                            <Pressable onPress={() => navigation.goBack()}><Icon name="reply" size={40} color="#2c9988" /></Pressable>
                            <Search setSearch={setSearch} />
                            <FlatList
                                data={productsFiltered}
                                keyExtractor={item => item.id.toString()} // Asegúrate de que el ID sea un string
                                renderItem={renderProductItem}
                            />
                        </>
            }

        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Fondo oscuro para todo el contenedor
        padding: 10,
    },
    productCard: {
        marginVertical: 15,
        marginHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#1E1E1E', // Fondo oscuro para la tarjeta del producto
        padding: 15,
        shadowColor: '#FFFFFF', // Sombra blanca para que destaque en el fondo oscuro
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5, // Aumenta la opacidad para hacer la sombra más visible
        shadowRadius: 10,
        elevation: 8, // Para Android, asegura que la sombra sea visible
    },
    productContainer: {
        flexDirection: 'column', // Cambiamos a columna
        alignItems: 'center',
    },
    productImage: {
        width: '100%', // Usamos todo el ancho disponible
        height: 200, // Aumentamos la altura para mayor tamaño
        borderRadius: 12,
        marginBottom: 10, // Espacio entre la imagen y el título
    },
    productDescription: {
        width: '100%',
        padding: 10,
        gap: 10,
    },
    productTitle: {
        fontFamily: 'Kanit',
        fontWeight: '700',
        fontSize: 17,
        color: '#FFFFFF',
        flexWrap: 'wrap', // Permite que el texto se ajuste a varias líneas
    },
    shortDescription: {
        fontFamily: 'Aldrich',
        fontSize: 15,
        color: '#CCCCCC',
        flexWrap: 'wrap', // Asegura que el texto se mantenga dentro del contenedor
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontFamily: 'Kanit',
        fontWeight: '600',
        fontSize: 14,
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    price: {
        fontWeight: '700',
        fontSize: 20,
        color: '#2c9988',
        textAlign: 'center',
    },
    discount: {
        backgroundColor: '#2c9988',
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    discountText: {
        color: '#FFFFFF',
    },
    noStockText: {
        color: '#FF6347',
        textAlign: 'center',
    },
});