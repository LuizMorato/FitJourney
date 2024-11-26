import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth'; // Importe para manipulação de autenticação

const { width } = Dimensions.get('window');

export default function Settings({ route, navigation }) {
  const { email } = route.params;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log('Documento do usuário não encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserProfile();
    }
  }, [email]);

  const saveChanges = async (field, value) => {
    try {
      const docRef = doc(db, 'users', email);
      await updateDoc(docRef, { [field]: value });
      setProfileData({ ...profileData, [field]: value });
      Alert.alert('Sucesso!', 'Informação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o Firestore:', error);
      Alert.alert('Erro!', 'Não foi possível atualizar a informação.');
    } finally {
      setEditingField(null);
    }
  };

  const handleChangeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      await saveChanges('profileImage', newUri);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirmação',
      'Você tem certeza que quer deslogar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deslogar',
          onPress: async () => {
            try {
              await signOut(getAuth()); // Faz o logout usando Firebase Authentication
              navigation.navigate('Login'); // Redireciona para a tela de login após o logout
            } catch (error) {
              console.error('Erro ao realizar logout:', error);
              Alert.alert('Erro!', 'Não foi possível deslogar.');
            }
          },
        },
      ],
      { cancelable: false } // Impede que o alerta seja fechado ao clicar fora dele
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { email })} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header_Profile}>
          <TouchableOpacity onPress={handleChangeProfilePicture}>
            <View style={styles.profileImageContainer}>
              {profileData?.profileImage ? (
                <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
              ) : (
                <Icon name="user-circle" size={70} color="#ccc" />
              )}
              <Icon
                name="pencil"
                size={16}
                color="#000"
                style={styles.editIcon}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>
            {profileData?.name || 'Usuário'} {profileData?.surname || ''}
          </Text>
          <Text style={styles.planText}>Plano: Free</Text>
        </View>

        {[
          { field: 'name', label: 'NOME', value: profileData?.name },
          { field: 'surname', label: 'SOBRENOME', value: profileData?.surname },
          { field: 'gender', label: 'GÊNERO', value: profileData?.gender ? profileData?.gender.charAt(0).toUpperCase() + profileData?.gender.slice(1) : '' },
          { field: 'age', label: 'IDADE', value: profileData?.age },
          { field: 'height', label: 'ALTURA', value: profileData?.height + ' cm' },
          { field: 'weight', label: 'PESO', value: profileData?.weight + ' kg' },
          { field: 'email', label: 'EMAIL', value: profileData?.email },
        ].map(({ field, label, value }) => (
          <View key={field} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{label}:</Text>
            <View style={styles.fieldContent}>
              {editingField === field ? (
                <TextInput
                  style={styles.input}
                  value={tempValue}
                  onChangeText={setTempValue}
                  onBlur={() => {
                    setEditingField(null);
                    saveChanges(field, tempValue);
                  }}
                  autoFocus
                />
              ) : (
                <Text style={styles.fieldValue}>{value || 'Não informado'}</Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  setEditingField(field);
                  setTempValue(value || '');
                }}
              >
                <Icon name="pencil" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Botão FitJourney Premium */}
        <TouchableOpacity onPress={() => navigation.navigate('Plans')} style={styles.premiumButton}>
          <Text style={styles.premiumText}>FitJourney Premium</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginTop: 20,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10, // Espaço entre a imagem e o nome
    textAlign: 'center', // Centraliza o texto
  },
  fieldContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  fieldContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginTop: 20,
  },
  header_Profile: {
    alignItems: 'center', // Centraliza todos os elementos no eixo vertical
    padding: 15,
    marginBottom: 15, // Espaçamento adicional entre o header e o restante
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
    planText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  premiumButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  premiumText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
