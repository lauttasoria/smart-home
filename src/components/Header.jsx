import { StyleSheet, Text, View, Pressable } from 'react-native'
import {colors} from '../global/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { clearSessions } from '../db'

const Header = ({subtitle}) => {

  const user = useSelector(state=>state.authReducer.value.email)
  const dispatch = useDispatch()

  const onLogout = ()=>{
    dispatch(clearUser())
    clearSessions()
      .then(()=>console.log("Sesión eliminada"))
      .catch((error)=>console.log("Error al eliminar la sesión"))
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title} >Smart Home</Text>
      {
        user &&  <Pressable onPress={onLogout} style={styles.access}><Icon name="logout" size={16} color="#fff" /></Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height: 150,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: colors.azulPetroleo
    },
    title:{
        fontSize:34,
        color: colors.blancoHumo,
        fontFamily: 'Kanit'
    },
    access:{
      alignSelf: "flex-end",
      paddingRight: 16
    } 
})