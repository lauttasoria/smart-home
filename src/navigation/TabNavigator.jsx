import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MyPlacesNavigator from "./MyPlacesNavigator";
import { StyleSheet } from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (

    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tab.Screen
        name="Shop"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="local-mall" size={32} color={focused ? colors.blancoHumo : colors.grisOscuro} />)
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={32} color={focused ? colors.blancoHumo : colors.grisOscuro} />)
        }}
      />
      <Tab.Screen
        name="Receipts"
        component={ReceiptsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="receipt-long" size={32} color={focused ? colors.grisOscuro : colors.grisMedio} />)
        }}
      />
      <Tab.Screen
        name="Places"
        component={MyPlacesNavigator}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="location-on" size={32} color={focused ? colors.blancoHumo : colors.grisOscuro} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (<Icon name="account-circle" size={32} color={focused ? colors.blancoHumo : colors.grisOscuro} />)
        }}
      />


    </Tab.Navigator>

  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    backgroundColor: colors.azulPetroleo
  }
})
