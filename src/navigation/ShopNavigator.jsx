
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CategoriesScreen, ProductScreen, ProductsScreen } from "../screens"
import  Header from "../components/Header"


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
    
      <Stack.Navigator
        screenOptions={{
          header: ()=><Header />
        }} >
        <Stack.Screen name="Categorias" component={CategoriesScreen} />
        <Stack.Screen name="Productos" component={ProductsScreen} />
        <Stack.Screen name="Producto" component={ProductScreen} />
      </Stack.Navigator>
    
  )
}

export default ShopNavigator
