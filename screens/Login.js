import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  })
})

export default function App({navigation}) {
    const auth = getAuth();

    const handleCallNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert("Notificações", "Não deixou as notificações ativas");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "FitJourney: Boas-vindas!",
          body: "Seja bem-vindo ao FitJourney!",
        },
        trigger: {
          seconds: 5,
        },
      })
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    loginUser = async (email, password) => {
      // Verifica se os campos estão vazios
      if (!email || !password) {
        Alert.alert("Campos vazios.", "Por favor, preencha todos os campos.");
        return; // Sai da função se os campos estiverem vazios
      }
    
      try {
        // Tenta fazer o login com email e senha
        await signInWithEmailAndPassword(auth, email, password); // Certifique-se de passar o auth
        Alert.alert("Login.","Login realizado com sucesso!"); // Alerta de sucesso
        handleCallNotifications();
      } catch (error) {
        // Trata diferentes tipos de erro
        if (error.code === 'auth/user-not-found') {
          Alert.alert("Usuário não encontrado!","Não há nenhum usuário cadastrado com este e-mail.");
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert("Senha incorreta.", "A senha informada está incorreta.");
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert("E-mail inválido.", "O E-mail informado é inválido.");
        } else if (error.code === 'auth/invalid-credential') {
          Alert.alert("E-mail ou senha errados.", "E-mail não cadastrado ou senha incorreta.");
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert("Várias tentativas.", "Seu acesso foi temporariamente desativado devido as tentativas falhas de login.");
        } else {
          Alert.alert("Erro", "Erro ao fazer login: " + error.message); // Mensagem de erro genérica
        }
      }
    }
    
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>FitJourney</Text>
        <Text style={styles.slogan}>Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.</Text>
        <TextInput
          style={styles.input}
          placeholder='Email...'
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha...'
          onChangeText={password => setPassword(password)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => loginUser(email, password)}>
          <Text style={styles.buttonText}>Login Seguro</Text>
        </TouchableOpacity>
        <Text style={styles.notHaveAccount} onPress={() => navigation.navigate('Register')}>Não tem uma conta? <Text style={styles.bold}>Crie uma!</Text></Text>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 45,
      fontFamily: 'Inter_800ExtraBold'
    },
    input: {
      height: 55,
      width: 320,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 100,
      marginBottom: 10,
      paddingLeft: 10,
    },
    button: {
      height: 55,
      width: 320,
      borderWidth: 2,
      borderColor: 'black', 
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      fontFamily: 'Inter_800ExtraBold'
    },
    phrase: {
      color: "#0DE347",
    },
    slogan: {
      fontSize: 13,
      fontFamily: 'Inter_700Bold',
      marginBottom: 20,
    },
    notHaveAccount: {
      fontFamily: 'Inter_400Regular',
      marginTop: 40,
    },
    bold: {
      fontWeight: 'bold'
    }
});