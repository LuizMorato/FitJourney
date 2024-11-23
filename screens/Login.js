import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Certifique-se de importar corretamente
import Icon from 'react-native-vector-icons/FontAwesome';  // Importa o ícone de olho

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Estado para controlar a visibilidade da senha

  // Função para login
  const loginUser = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Campos vazios.", "Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      console.log('Tentando login...', trimmedEmail);
      console.log('Tentando login...', trimmedPassword);
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;
      console.log('Usuário autenticado:', user.uid);
      Alert.alert("Login", "Login realizado com sucesso!");
      navigation.replace('Home', { email: user.email });
  
    } catch (error) {
      console.log('Erro de login:', error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Erro de login", "Este email não está cadastrado.");
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert("Erro de login", "Senha incorreta.");
      } else {
        Alert.alert("Erro de login", "Não foi possível realizar o login. Tente novamente.");
      }
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder='Senha...'
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}  // Controla a visibilidade da senha
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
