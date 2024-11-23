import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
//import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'


const CategoriesScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions()

  //const categories = useSelector(state=>state.shopReducer.value.categories)

  const { data: categories, error, isLoading } = useGetCategoriesQuery()

  const dispatch = useDispatch()

  const renderCategoryItem = ({ item, index }) => {

    return (
      <Pressable onPress={() => {
        dispatch(setCategory(item.title))
        navigation.navigate('Productos')
      }}>
        <FlatCard style={
          index % 2 == 0
            ?
            { ...styles.categoryItemContainer, ...styles.row }
            :
            { ...styles.categoryItemContainer, ...styles.rowReverse }

        }>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode='contain'
          />
          <Text style={styles.categoryTitle}>{item.title} </Text>
        </FlatCard>
      </Pressable>
    )
  }

  return (
    <>
      {
        isLoading
          ?
          <ActivityIndicator size="large" color={colors.doradoApagado} />
          :
          error
            ?
            <Text>Error al cargar las categorías</Text>
            :
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={renderCategoryItem}
            />

      }

    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  categoryItemContainer: {
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 8,
    flexDirection: "row",
    backgroundColor: colors.blancoHumo, // Fondo claro para las categorías
    borderRadius: 15, // Bordes redondeados para un diseño más suave
    shadowColor: "#000000", // Sombra negra para que contraste con el fondo claro
    shadowOffset: { width: 0, height: 3 }, // Sombra suave hacia abajo
    shadowOpacity: 0.3, // Opacidad baja para que no sea muy intensa
    shadowRadius: 6, // Radio de sombra más difuso para un efecto suave
    elevation: 6, // Elevación moderada para Android
  },
  categoryTitle: {
    fontSize: 19,
    color: colors.azulPetroleo, // Texto en un azul que resalte
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: 'Kanit', // Fuente estilizada para mayor elegancia
  },
  image: {
    width: 120,
    height: 110,
    borderRadius: 15, // Redondear las esquinas de la imagen para un look consistente
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});