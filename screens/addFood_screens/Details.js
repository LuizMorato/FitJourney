import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route, navigation }) => {
  const { foodName, selectedTypes, foodImage } = route.params;

  const handleSaveAndNavigate = async () => {
    const foodData = {
      foodName,
      selectedTypes,
      foodImage
    };
    try {
      await AsyncStorage.setItem('foodData', JSON.stringify(foodData));
      navigation.navigate('AddFood');
    } catch (error) {
      console.error('Erro ao salvar dados de comida:', error);
    }
  };

  // Função para renderizar o campo específico para cada tipo de alimento
  const renderTypeSpecificFields = () => {
    if (selectedTypes.includes('Pães')) {
      return (
        <>
          <Text style={styles.inputLabel}>Quantas fatias?</Text>
          <TextInput style={styles.input} placeholder="0" keyboardType="numeric" />
        </>
      );
    }

    if (selectedTypes.includes('Salada')) {
      return (
        <>
          <Text style={styles.inputLabel}>Selecione os ingredientes da salada.</Text>
          <View style={styles.ingredientTagsContainer}>
            {['Alface', 'Tomate', 'Cebola', 'Outros'].map(ingredient => (
              <TouchableOpacity key={ingredient} style={styles.ingredientTag}>
                <Text style={styles.ingredientTagText}>{ingredient}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={styles.input} placeholder="Digite outro ingrediente (se tiver)..." />
        </>
      );
    }

     if (selectedTypes.includes('Sopa')) {
      return (
        <>
          <Text style={styles.inputLabel}>Selecione os ingredientes da Sopa.</Text>
          <View style={styles.ingredientTagsContainer}>
            {['Carne', 'Mandioca', 'Batata', 'Outros'].map(ingredient => (
              <TouchableOpacity key={ingredient} style={styles.ingredientTag}>
                <Text style={styles.ingredientTagText}>{ingredient}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={styles.input} placeholder="Digite outro ingrediente (se tiver)..." />
        </>
      );
    }

    if (selectedTypes.includes('Fruta')) {
      return (
        <>
          <Text style={styles.inputLabel}>Qual a quantidade da fruta (em gramas)?</Text>
          <TextInput style={styles.input} placeholder="0g" keyboardType="numeric" />
        </>
      );
    }

    if (selectedTypes.some(type => ['Frango', 'Bovinos', 'Suínos'].includes(type))) {
      return (
        <>
          <Text style={styles.inputLabel}>Qual é a quantidade (em gramas)?</Text>
          <TextInput style={styles.input} placeholder="0g" keyboardType="numeric" />
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar Alimento</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {foodImage && (
            <Image source={{ uri: foodImage }} style={styles.foodImageLarge} />
          )}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={foodName}
          placeholder="Sanduíche de Frango"
          editable={false}
        />
        
        <View style={styles.tagsContainer}>
          {selectedTypes.map(type => (
            <View key={type} style={styles.selectedTag}>
              <Text style={styles.selectedTagText}>{type}</Text>
              <Ionicons name="close" size={16} color="white" style={{ marginLeft: 4 }} />
            </View>
          ))}
        </View>

        {renderTypeSpecificFields()}
      </View>

      <TouchableOpacity onPress={handleSaveAndNavigate} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Adicionar</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  foodImageLarge: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#333',
  },
  input: {
    width: '100%',
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'center',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#00A32C',
    margin: 4,
  },
  selectedTagText: {
    color: '#fff',
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 16,
    alignSelf: 'flex-start',
    color: '#333',
    marginBottom: 8,
  },
  ingredientTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ingredientTag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  ingredientTagText: {
    color: '#333',
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

export default DetailsScreen;
