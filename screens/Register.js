import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function App({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
  
    function signUpFirebase() {
      // Verificação de campos vazios
      if (!email || !password) {
        alert("Campos vazios.", "Por favor, preencha todos os campos.");
        return; // Interrompe a execução da função se houver campos vazios
      }
    
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert(`Usuário criado com sucesso! UID: ${user.uid}`);
          navigation.replace('UserInfo', { email, password });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
    
          // Verifica se o erro é de e-mail já cadastrado
          if (errorCode === 'auth/email-already-in-use') {
            alert('Este email já está cadastrado. Tente fazer login.');
          } else {
            // Exibe outros erros
            alert(errorMessage);
          }

          if (errorCode === 'auth/weak-password') {
            alert('A senha deve ter mais de 6 caracteres.');
          }
        });
    }
    
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>FitJourney</Text>
        <Text style={styles.slogan}>
          Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.
        </Text>
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
        <TouchableOpacity style={styles.button} onPress={signUpFirebase}>
          <Text style={styles.buttonText}>Cadastro Seguro</Text>
        </TouchableOpacity>
        <Text style={styles.notHaveAccount}>Já possui cadastro?<Text style={styles.bold}
          onPress={() => {
            navigation.navigate('Login');
          }}
          > Entre na conta!</Text>
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