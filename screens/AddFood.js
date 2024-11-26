import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';

const AddFood = ({ route, navigation }) => {
  const { email } = route.params;
  const [foodData, setFoodData] = useState(null);
  const [savedFoodData, setSavedFoodData] = useState([]);

  useEffect(() => {
    const loadFoodData = async () => {
      try {
        const savedFoodData = await AsyncStorage.getItem('foodData');
        if (savedFoodData) {
          setFoodData(JSON.parse(savedFoodData));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de comida:', error);
      }
    };
    loadFoodData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Adicionar Alimento</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Histórico</Text>
        {foodData && (
          <View style={styles.foodCard}>
            {foodData.foodImage && <Image source={{ uri: foodData.foodImage }} style={styles.foodIcon} />}
            <View style={styles.foodInfo}>
              <Text style={styles.foodTitle}>{foodData.foodName}</Text>
              <Text style={styles.foodDescription}>
                Tipos selecionados: {foodData.selectedTypes.join(', ')}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Recipes', {email})}
      >
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
      <Navbar navigation={navigation} email={email} style={styles.navbarContainer}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  foodIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  foodInfo: {
    flex: 1,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodDescription: {
    fontSize: 14,
    color: '#757575',
  },
  moreButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 110, // Ajustado para ficar acima da navbar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2, // Garante que o botão fique acima da navbar
  },
});

export default AddFood;
