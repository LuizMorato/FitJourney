
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, StatusBar, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const foodCategories = {
  tubérculos: ['Batata', 'Cenoura', 'Abóbora', 'Batata-doce'],
  vegetais: ['Alface', 'Tomate', 'Espinafre', 'Brócolis', 'Couve', 'Pepino', 'Couve-flor', 'Vagem', 'Rúcula', 'Cebola', 'Alho', 'Cogumelo', 'Acelga', 'Almeirão'],
  temperos: ['Sal', 'Pimenta', 'Curry', 'Canela', 'Pimenta-do-reino', 'Gengibre', 'Hortelã', 'Manjericão', 'Tomilho', 'Orégano', 'Alecrim', 'Salsinha', 'Cebolinha'],
  suínos: ['Bacon', 'Salsicha', 'Linguiça', 'Mortadela', 'Peru'],
  bovinos: ['Carne', 'Frango', 'Carne moída', 'Cordeiro', 'Porco'],
  frutos: ['Abacaxi', 'Banana', 'Maçã', 'Morango', 'Uva', 'Manga', 'Laranja', 'Limão', 'Melancia', 'Kiwi', 'Mamão', 'Maracuja'],
  laticínios: ['Queijo', 'Leite', 'Iogurte', 'Manteiga', 'Creme de leite', 'Ricota', 'Leite condensado'],
  outros: ['Pizza', 'Lasanha', 'Cuscuz', 'Quinoa', 'Tapioca', 'Hamburguer', 'Coxinha', 'Açaí', 'Granola', 'Mel', 'Açúcar', 'Gelatina', 'Sopa', 'Chá', 'Café', 'Suco', 'Refrigerante', 'Água', 'Água de coco', 'Cerveja', 'Vinho', 'Whisky', 'Gin', 'Rum', 'Tequila', 'Vodka'],
};

const HomeScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [foodImage, setFoodImage] = useState(null);

  useEffect(() => {
    loadImage();
  }, []);

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'Precisamos de acesso à sua galeria para alterar a imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFoodImage(uri);
      await saveImage(uri);
    }
  };

  const saveImage = async (uri) => {
    try {
      await AsyncStorage.setItem('savedImage', uri);
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
    }
  };

  const loadImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('savedImage');
      if (savedImage) {
        setFoodImage(savedImage);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };

  const handleNext = () => {
    navigation.navigate('Details', {
      foodName,
      selectedTypes,
      foodImage,
      email
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AddFood', { email })} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar Alimento</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {foodImage ? (
              <Image source={{ uri: foodImage }} style={styles.foodImage} />
            ) : (
              <Ionicons name="camera" size={50} color="#ccc" />
            )}
          </TouchableOpacity>
          {foodImage && (
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Ionicons name="pencil" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.inputLabel}>Qual o nome?</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do alimento..."
          placeholderTextColor="#ccc"
          value={foodName}
          onChangeText={setFoodName}
        />
        <Text style={styles.inputLabel}>Selecione os ingredientes.</Text>
        {Object.keys(foodCategories).map(category => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            <View style={styles.tagsContainer}>
              {foodCategories[category].map(type => (
                !selectedTypes.includes(type) && (
                  <TouchableOpacity key={type} style={styles.tag} onPress={() => toggleType(type)}>
                    <Text style={styles.tagText}>{type}</Text>
                  </TouchableOpacity>
                )
              ))}
            </View>
            <View style={styles.tagsContainer}>
              {selectedTypes.filter(type => foodCategories[category].includes(type)).map(type => (
                <TouchableOpacity key={type} style={styles.selectedTag} onPress={() => toggleType(type)}>
                  <Text style={styles.selectedTagText}>{type}</Text>
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Avançar</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  imageUploadContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 5,
  },
  inputLabel: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 20,
    width: '100%',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tag: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    margin: 4,
  },
  tagText: {
    color: '#757575',
  },
  selectedTag: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    margin: 4,
  },
  selectedTagText: {
    color: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
});

export default HomeScreen;
