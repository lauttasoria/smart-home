import { View, Text, StyleSheet } from 'react-native'
import {colors} from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default FlatCard;

const styles = StyleSheet.create({
    cardContainer:{
        shadowColor: colors.grisClaro,
        shadowOpacity:1,
        shadowRadius:1,
        shadowOffset: {width: 3,height:5},
        elevation:10,
    }
})