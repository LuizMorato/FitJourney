import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  })
});

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    });
  };

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Campos vazios.", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('https://fj-php-back-2.onrender.com/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const rawData = await response.text();
      console.log('Resposta do servidor:', rawData);

      let data = {};
      try {
        data = JSON.parse(rawData); // Tenta parsear o JSON
      } catch (e) {
        console.log('Erro ao parsear JSON:', e);
        // Exibe a resposta sem tentar fazer o parse se houver erro
        Alert.alert("Erro de servidor", "Resposta mal formatada do servidor.");
        return;
      }

      if (response.ok) {
        if (data.success) {
          Alert.alert("Login", "Login realizado com sucesso!");
          handleCallNotifications();
          navigation.replace('Home', { email });
        } else {
          Alert.alert("Erro no login", data.message || "Não foi possível fazer o login.");
        }
      } else {
        Alert.alert("Erro no servidor", data.message || "Houve um erro ao conectar com o servidor.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro de rede", "Não foi possível se conectar ao servidor.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>FitJourney</Text>
      <Text style={styles.slogan}>Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.</Text>
      <TextInput
        style={styles.input}
        placeholder='Email...'
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Senha...'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login Seguro</Text>
      </TouchableOpacity>
      <Text style={styles.notHaveAccount} onPress={() => navigation.navigate('RegisterStep0')}>
        Não tem uma conta? <Text style={styles.bold}>Crie uma!</Text>
      </Text>
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
    fontFamily: 'Inter_800ExtraBold',
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
    fontFamily: 'Inter_800ExtraBold',
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
    fontWeight: 'bold',
  },
});
