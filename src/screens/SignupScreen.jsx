import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../services/authService';
import { setUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../validations/validationSchema';


const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser, setErrorAddUser] = useState(false)

    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error al agregar el usuario", result)
            setErrorAddUser("Ups! No se pudo agregar el usuario")
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito")
            dispatch(setUser(result.data))
        }
    }, [result])

    const onsubmit = () => {
        try {
            validationSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
        }
    }

    return (
        <LinearGradient
            colors={['#400962', '#11001B']}
            start={{ x: 0, y: 0 }} // esquina superior izquierda
            end={{ x: 1, y: 1 }}   // esquina inferior derecha
            style={styles.gradient}
        >
            <Text style={styles.title}>Smart Home</Text>
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                 {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={() => dispatch(setUser({ email: "demo@mundogeek.com", token: "demo" }))}>
                    <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
};

export default SignupScreen;

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
});
