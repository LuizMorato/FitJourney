import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/trabalhos-etec/api-fitjourney/db');
        const data = await response.json();
        const product = data.product;
        setProductData(product);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const { name, portion, nutrition_facts, image_url, rating } = productData;

  // Dados de nutrição para 200ml
  const nutrition = nutrition_facts && nutrition_facts.values ? nutrition_facts.values['200 ml'] : {};

  // Definir a cor do fundo do nome do produto com base no rating
  let productBackgroundColor = '#FF5733'; // vermelho
  if (rating >= 50 && rating < 80) {
    productBackgroundColor = '#FFA500'; // laranja
  } else if (rating >= 80) {
    productBackgroundColor = '#4CAF50'; // verde
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho fixo com o botão de voltar e título "Análise" */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Análise</Text>
      </View>

      {/* ScrollView para o conteúdo */}
      <ScrollView style={styles.scrollViewContent}>
        {/* Header com imagem e informações do produto */}
        <View style={[styles.productHeader, { backgroundColor: productBackgroundColor }]}>
          <Image style={styles.productImage} source={{ uri: image_url }} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{name}</Text>
            <Text style={styles.productSize}>{portion.quantity} ({portion.unit})</Text>
            <View style={[styles.productRating, { backgroundColor: '#FFF' }]}>
              <Text style={[styles.productScore]}>{rating}</Text>
            </View>
          </View>
        </View>

        {/* Informações nutricionais com cards */}
        <View style={styles.nutritionSection}>
          <Text style={styles.sectionTitle}>Informações Nutricionais</Text>

          {/* Card de Calorias */}
          <View style={styles.nutritionCard}>
            <Ionicons name="flame" size={24} color="#FF5733" />
            <Text style={styles.nutritionText}>Calorias: {nutrition.calories_kcal} kcal</Text>
          </View>

          {/* Card de Carboidratos */}
          <View style={styles.nutritionCard}>
            <Ionicons name="carb" size={24} color="#FFA500" />
            <Text style={styles.nutritionText}>Carboidratos: {nutrition.carbohydrates_g} g</Text>
          </View>

          {/* Card de Açúcares Totais */}
          <View style={styles.nutritionCard}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <Text style={styles.nutritionText}>Açúcares Totais: {nutrition.total_sugars_g} g</Text>
          </View>

          {/* Card de Açúcares Adicionados */}
          <View style={styles.nutritionCard}>
            <Ionicons name="pizza" size={24} color="#FF5722" />
            <Text style={styles.nutritionText}>Açúcares Adicionados: {nutrition.added_sugars_g} g</Text>
          </View>

          {/* Card de Proteína */}
          <View style={styles.nutritionCard}>
            <Ionicons name="egg" size={24} color="#FFC107" />
            <Text style={styles.nutritionText}>Proteína: {nutrition.protein_g} g</Text>
          </View>

          {/* Card de Gordura Total */}
          <View style={styles.nutritionCard}>
            <Ionicons name="ios-pizza" size={24} color="#FF5722" />
            <Text style={styles.nutritionText}>Gordura Total: {nutrition.total_fat_g} g</Text>
          </View>

          {/* Card de Gordura Saturada */}
          <View style={styles.nutritionCard}>
            <Ionicons name="flash" size={24} color="#FFC107" />
            <Text style={styles.nutritionText}>Gordura Saturada: {nutrition.saturated_fat_g} g</Text>
          </View>

          {/* Card de Sódio */}
          <View style={styles.nutritionCard}>
            <Ionicons name="alert" size={24} color="#FF5722" />
            <Text style={styles.nutritionText}>Sódio: {nutrition.sodium_mg} mg</Text>
          </View>

          {/* Card de Vitaminas e Minerais */}
          <View style={styles.nutritionCard}>
            <Ionicons name="medkit" size={24} color="#4CAF50" />
            <Text style={styles.nutritionText}>Vitamina A: {nutrition.vitamin_A_ug} µg</Text>
          </View>

          <View style={styles.nutritionCard}>
            <Ionicons name="medkit" size={24} color="#4CAF50" />
            <Text style={styles.nutritionText}>Vitamina D: {nutrition.vitamin_D_ug} µg</Text>
          </View>

          <View style={styles.nutritionCard}>
            <Ionicons name="medkit" size={24} color="#4CAF50" />
            <Text style={styles.nutritionText}>Cálcio: {nutrition.calcium_mg} mg</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productSize: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  productRating: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  productScore: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nutritionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutritionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nutritionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  scrollViewContent: {
    marginTop: 80,  // Garantir que o conteúdo não fique atrás do header fixo
    padding: 16,
  },
});
