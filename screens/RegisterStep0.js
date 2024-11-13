import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function App({ navigation }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }
    setStep(1);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
    }
  };

  const handleProfileSetup = () => {
    setStep(2);
  };

  const handleSavePhysicalInfo = async () => {
    try {
      const response = await fetch("https://fj-register.onrender.com/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name,
          surname,
          age,
          profileImage,
          height,
          weight,
          gender,
        })
      });
    
      // Verifique o tipo de resposta
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);
  
      try {
        // Se a resposta for JSON, tentamos analisá-la
        const data = JSON.parse(responseText);
        if (data.success) {
          alert('Informações salvas!');
          navigation.replace('Home', { email });
        } else {
          alert(data.message || "Erro ao salvar informações.");
        }
      } catch (jsonError) {
        console.error('Erro ao analisar JSON:', jsonError);
        alert("Erro ao processar a resposta do servidor.");
      }
    
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert("Erro ao conectar ao servidor.");
    }
  };    

  return (
    <KeyboardAvoidingView style={styles.container}>
      {step === 0 && (
        <>
          <Text style={styles.title}>FitJourney</Text>
          <TextInput
            style={styles.input}
            placeholder='Email...'
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder='Senha...'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Cadastro Seguro</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 1 && (
        <>
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
          <TouchableOpacity style={styles.button} onPress={handleProfileSetup}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#0DE347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addImageText: {
    fontSize: 24,
    color: '#fff',
  },
  inputContainer: {
    marginVertical: 10,
    width: '80%',
  },
  picker: {
    width: '100%',
    height: 50,  // Ajuste a altura para garantir que o Picker seja visível
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
  },
});
