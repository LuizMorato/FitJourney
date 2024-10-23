import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      await setDoc(doc(db, 'users', uid), {
        email,
        firstName,
        lastName,
        address,
        username: `${firstName}.${lastName}`,
      });

      console.log('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <View>
      <Text>Cadastro de Usuário</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Primeiro Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Último Nome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Criar Conta" onPress={handleSignUp} />
    </View>
  );
};

export default App;
