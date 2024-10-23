import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

export default function UserInfo({ navigation }) {
  const route = useRoute();
  
  // Pegando o email e a senha passados pela navegação
  const { email } = route.params;

  // Definindo os estados para os campos que você solicitou
  const [age, setAge] = useState("");
  const [genre, setGenre] = useState("");
  const [height, setHeight] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  const db = getFirestore();

  const handleSaveUserInfo = async () => {
    try {
      // Salvando os dados adicionais no Firestore, usando o email como identificador
      const userDocRef = doc(db, 'users', email);
      await setDoc(userDocRef, {
        email,
        age,
        genre,
        height,
        last_name: lastName,
        name,
        weight,
      });
  
      // Exibindo no console o email e todas as outras informações
      console.log('Informações do usuário salvas com sucesso!');
      console.log('Email:', email);
      console.log('Nome:', name);
      console.log('Sobrenome:', lastName);
      console.log('Idade:', age);
      console.log('Gênero:', genre === 1 ? 'Masculino' : 'Feminino');
      console.log('Altura:', height);
      console.log('Peso:', weight);
  
    } catch (error) {
      console.error('Erro ao salvar informações adicionais:', error);
    }
  };  

  return (
    <View style={styles.container}>
      <Text>Informações do Usuário</Text>
      <TextInput
        placeholder="Idade"
        keyboardType="numeric"
        value={age.toString()}
        onChangeText={(value) => setAge(Number(value))}
      />
      <TextInput
        placeholder="Gênero (1 = Masculino, 2 = Feminino)"
        keyboardType="numeric"
        value={genre.toString()}
        onChangeText={(value) => setGenre(Number(value))}
      />
      <TextInput
        placeholder="Altura (em cm)"
        keyboardType="numeric"
        value={height.toString()}
        onChangeText={(value) => setHeight(Number(value))}
      />
      <TextInput
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Peso (em kg)"
        keyboardType="numeric"
        value={weight.toString()}
        onChangeText={(value) => setWeight(Number(value))}
      />
      <Button title="Salvar Informações" onPress={handleSaveUserInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo mais suave
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  }
})
