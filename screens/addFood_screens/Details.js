import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route, navigation }) => {
  const { foodName, selectedTypes, foodImage, email } = route.params;
  
  // Log do email recebido
  useEffect(() => {
    console.log('Email recebido:', email);
  }, [email]);
  
  const [calories, setCalories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const caloriesData = await Promise.all(selectedTypes.map(async (ingredient) => {
          const response = await fetch(`https://caloriasporalimentoapi.herokuapp.com/api/calorias/?descricao=${ingredient}`);
          const data = await response.json();
          if (data.length > 0) {
            return {
              ingredient,
              calories: parseInt(data[0].calorias.replace(' kcal', '').replace(',', ''), 10), // Remove ' kcal' and convert to int
            };
          }
          return { ingredient, calories: 0 }; // Caso a API não retorne dados válidos
        }));

        setCalories(caloriesData);
        const total = caloriesData.reduce((sum, item) => sum + item.calories, 0);
        setTotalCalories(total);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter calorias:', error);
        setLoading(false);
      }
    };

    fetchCalories();
  }, [selectedTypes]);

  const handleSaveAndNavigate = async () => {
    // Função para exibir o alert
    Alert.alert(
      'Você comeu essa receita?',
      'Deseja adicionar as calorias dessa receita?',
      [
        {
          text: 'Não',
          onPress: () => {
            console.log('Nada enviado');
            navigation.navigate('Home'); // Vai para a tela Home sem parâmetros
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            console.log('Calorias enviadas:', totalCalories);
            try {
              // Envia as calorias totais para a tela "Home"
              navigation.navigate('Home', { total_calories: totalCalories });
            } catch (error) {
              console.error('Erro ao enviar calorias para a Home:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
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
          placeholder="Nome do Alimento"
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

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          calories.map(({ ingredient, calories }) => (
            <View key={ingredient} style={styles.calorieContainer}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
              <Text style={styles.calorieText}>{calories} kcal</Text>
            </View>
          ))
        )}

        {loading ? null : (
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCaloriesText}>Calorias Totais: {totalCalories} kcal</Text>
          </View>
        )}
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
  calorieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  calorieText: {
    fontSize: 16,
    color: '#333',
  },
  totalCaloriesContainer: {
    marginTop: 16,
  },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
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
