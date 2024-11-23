import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { createUserWithEmailAndPassword, auth } from '../firebase';

export default function App({ navigation }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      const request = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (request.status !== 'granted') {
        showAlert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos.');
        return;
      }
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
    } else {
      showAlert('Imagem não selecionada', 'Nenhuma imagem foi escolhida.');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      showAlert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }
  
    if (!isValidEmail(email)) {
      showAlert('E-mail inválido', 'Insira um e-mail válido.');
      return;
    }
  
    if (password.length < 6) {
      showAlert('Senha inválida', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }
  
    // Remove spaces from email
    const trimmedEmail = email.trim();
  
    // Verifique se o e-mail já está cadastrado no Firestore
    try {
      const userDocRef = doc(db, 'users', trimmedEmail); // Use trimmed email
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        showAlert('E-mail já cadastrado', 'Este e-mail já está em uso. Por favor, escolha outro.');
        return;
      }
  
      // Criação do usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;
  
      // Agora salve as informações no Firestore
      await setDoc(doc(db, 'users', trimmedEmail), {
        email: trimmedEmail,
        name: name.trim(),
        surname: surname.trim(),
        age: age.trim(),
        profileImage,
        height: height.trim(),
        weight: weight.trim(),
        gender,
        uid: user.uid, // Salve também o UID do usuário no Firestore
      });
  
      showAlert('Cadastro realizado com sucesso', 'Você foi registrado com sucesso!');
      setStep(1); // Passa para a próxima etapa de preenchimento
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      showAlert('Erro', 'Erro ao criar a conta. Tente novamente.');
    }
  };  

  const handleNextStep = () => {
    const trimmedName = name.trim();
    const trimmedSurname = surname.trim();
    const trimmedAge = age.trim();

    if (!trimmedName || !trimmedSurname || !trimmedAge || !profileImage) {
      showAlert('Campos obrigatórios', 'Preencha todos os campos e adicione uma imagem de perfil.');
      return;
    }

    if (isNaN(trimmedAge) || trimmedAge <= 0) {
      showAlert('Idade inválida', 'Insira uma idade válida.');
      return;
    }

    setStep(2);
  };

  const handleSavePhysicalInfo = async () => {
    const trimmedHeight = height.trim();
    const trimmedWeight = weight.trim();
    const trimmedGender = gender.trim();

    if (!trimmedHeight || !trimmedWeight || !trimmedGender) {
      showAlert('Campos obrigatórios', 'Preencha todos os campos!');
      return;
    }

    if (isNaN(trimmedHeight) || trimmedHeight <= 0) {
      showAlert('Altura inválida', 'Insira uma altura válida.');
      return;
    }

    if (isNaN(trimmedWeight) || trimmedWeight <= 0) {
      showAlert('Peso inválido', 'Insira um peso válido.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', email), {
        email,
        password,
        name: name.trim(),
        surname: surname.trim(),
        age: age.trim(),
        profileImage,
        height: trimmedHeight,
        weight: trimmedWeight,
        gender: trimmedGender,
      });

      showAlert('Sucesso', 'Informações salvas com sucesso!');
      navigation.replace('Home', { email });
    } catch (error) {
      console.error('Erro ao salvar informações no Firestore:', error);
      showAlert('Erro', 'Erro ao salvar informações. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {step === 0 && (
        <>
          <Text style={styles.progressIndicator}>1 de 3</Text>
          <Text style={styles.title}>FitJourney</Text>
          <Text style={styles.slogan}>
            Seu parceiro pra uma <Text style={styles.phrase}>vida saudável</Text>.
          </Text>
          <Text style={styles.callToAction}>
            Comece sua <Text style={styles.phrase}>jornada</Text> agora mesmo!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email..."
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha..."
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastro Seguro</Text>
          </TouchableOpacity>
          <Text
            style={styles.haveAccount}
            onPress={() => navigation.navigate('Login')}
          >
            Já possui cadastro? <Text style={styles.bold}>Entre na conta!</Text>
          </Text>
        </>
      )}

  
      {step === 1 && (
        <>
          <Text style={styles.progressIndicator}>2 de 3</Text>
          <Text style={styles.header}>Criar perfil</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.addImageText}>+</Text>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            onChangeText={setSurname}
            value={surname}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            keyboardType="numeric"
            onChangeText={setAge}
            value={age}
          />
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </>
      )}
  
      {step === 2 && (
        <>
          <Text style={styles.progressIndicator}>3 de 3</Text>
          <Text style={styles.title}>Informações Importantes</Text>
          <TextInput
            style={styles.input}
            placeholder="Altura (cm)"
            keyboardType="numeric"
            onChangeText={setHeight}
            value={height}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            keyboardType="numeric"
            onChangeText={setWeight}
            value={weight}
          />
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={setGender}
              style={styles.picker}
            >
              <Picker.Item label="Feminino" value="feminino" />
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Outro" value="outro" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSavePhysicalInfo}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );
  
}

const styles = StyleSheet.create({
  slogan: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginTop: 5, // Pequeno espaço acima do slogan
    marginBottom: 20, // Mais espaço abaixo do slogan
  },
  phrase: {
    color: "#0DE347",
  },
  progressIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 0, // Sem espaço abaixo do título
  },
  input: {
    height: 55,
    width: 320,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 10, // Adiciona espaçamento acima dos campos
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
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: 'black',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  addImageText: {
    fontSize: 50,
    color: 'gray',
  },
  inputContainer: {
    width: 320,
    marginBottom: 20,
  },

  picker: {
    height: 60,
    width: '100%',
    backgroundColor: '#f0f0f0', // Fundo cinza claro
    borderRadius: 10, // Bordas arredondadas
    marginTop: 5, // Espaçamento superior
    paddingHorizontal: 10, // Espaçamento interno
    color: 'black', // Cor do texto do Picker
  },

  callToAction: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    margin: 30, // Espaçamento entre o texto e os campos de entrada
    color: 'black',
  },
  haveAccount: {
    fontFamily: 'Inter_400Regular',
    marginTop: 50, // Espaço acima do texto
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold' // Se preferir o texto destacado em preto
  },

});
