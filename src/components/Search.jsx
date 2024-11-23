import { StyleSheet, View, Text, TextInput } from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearch}) => {
  return (

      <TextInput
        placeholder="Busca un producto"
        onChangeText={(text)=>setSearch(text)}
        style={styles.searchInput}
      />

  )
}

export default Search

const styles = StyleSheet.create({
    searchInput:{
        padding:7,
        margin: 10,
        borderWidth:1.5,
        borderColor: colors.azulPetroleo,
        borderRadius:15,
        paddingLeft: 10,
        backgroundColor: colors.grisClaro,
    }
})