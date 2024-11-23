import { StyleSheet, Text, View, TextInput, Pressable, Dimensions,Platform, KeyboardAvoidingView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../db';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const [triggerSignup, result] = useLoginMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    
    if (result.isSuccess) {
      console.log("Usuario logueado con éxito")
      console.log(result.data)
      dispatch(setUser(result.data))

      if (rememberMe) {
        clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
        console.log("result data:", result.data)
        insertSession({
          localId: result.data.localId,
          email: result.data.email,
          token: result.data.idToken
        })
          .then(res => console.log("Usuario insertado con éxito", res))
          .catch(error => console.log("Error al insertar usuario", error))
      }

    }
  }, [result, rememberMe])

  const onsubmit = () => {
    console.log(email, password);
    triggerSignup({ email, password })
  }

  return (
    <LinearGradient
      colors={['#2b3a42', '#000000']} // gradient azul petróleo y negro
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>Smart Home</Text>
        <Text style={styles.subTitle}>Crea tu cuenta</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#D9D9D9"
            placeholder="Correo Electrónico"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#D9D9D9"
            placeholder='Contraseña'
            style={styles.textInput}
            secureTextEntry
          />
        </View>


        <View style={styles.rememberMeContainer}>
          <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
          {
            rememberMe
              ?
              <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.doradoApagado} /></Pressable>
              :
              <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.grisClaro} /></Pressable>
          }
        </View>
        <View style={styles.footTextContainer}>
          <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={
              {
                ...styles.whiteText,
                ...styles.underLineText
              }
            }>
              Crea una
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.btn} onPress={onsubmit}>
          <Text style={styles.btnText}>Registrarse</Text>
        </Pressable>
        <View style={styles.footTextContainer}>
          <Text style={styles.footText}>¿Ya tienes una cuenta?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{ ...styles.footText, ...styles.underLineText }}>
              Iniciar sesión
            </Text>
          </Pressable>
        </View>
        <View style={styles.guestOptionContainer}>
          <Text style={styles.footText}>¿Quieres explorar como invitado?</Text>
          <Pressable onPress={() => dispatch(setUser({ email: "demo@mundogeek.com", token: "demo" }))}>
            <Text style={{ ...styles.footText, ...styles.strongText }}>Modo Invitado</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  title: {
    color: colors.blancoHumo,
    fontFamily: "Aldrich",
    fontSize: 50, // aumenté el tamaño
    marginBottom: 28,
    padding: 10
  },
  subTitle: {
    fontFamily: "Kanit",
    fontSize: 20,
    color: colors.blancoHumo,
    fontWeight: '600',
    marginBottom: 24,
    letterSpacing: 2,
  },
  inputContainer: {
    gap: 16,
    width: '100%',
  },
  textInput: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#3C3C3C",
    color: colors.blanco,
    borderWidth: 1,
    borderColor: colors.blancoHumo,
    marginBottom: 12,
  },
  btn: {
    width: '100%',
    padding: 14,
    backgroundColor: colors.blancoHumo,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  btnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  footText: {
    color: colors.blancoHumo,
    fontSize: 14,
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  strongText: {
    fontWeight: '700',
    fontSize: 16,
  },
  guestOptionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  error: {
    color: colors.doradoApagado,
    fontSize: 12,
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 8,
  }
});
