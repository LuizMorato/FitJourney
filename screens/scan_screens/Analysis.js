import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function App() {
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
    <ScrollView style={styles.container}>
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

      {/* Informações nutricionais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Nutricionais</Text>
        <Text style={styles.nutritionText}>Calorias: {nutrition.calories_kcal} kcal</Text>
        <Text style={styles.nutritionText}>Carboidratos: {nutrition.carbohydrates_g} g</Text>
        <Text style={styles.nutritionText}>Açúcares Totais: {nutrition.total_sugars_g} g</Text>
        <Text style={styles.nutritionText}>Açúcares Adicionados: {nutrition.added_sugars_g} g</Text>
        <Text style={styles.nutritionText}>Proteína: {nutrition.protein_g} g</Text>
        <Text style={styles.nutritionText}>Gordura Total: {nutrition.total_fat_g} g</Text>
        <Text style={styles.nutritionText}>Gordura Saturada: {nutrition.saturated_fat_g} g</Text>
        <Text style={styles.nutritionText}>Sódio: {nutrition.sodium_mg} mg</Text>
        <Text style={styles.nutritionText}>Vitamina A: {nutrition.vitamin_A_ug} µg</Text>
        <Text style={styles.nutritionText}>Vitamina D: {nutrition.vitamin_D_ug} µg</Text>
        <Text style={styles.nutritionText}>Cálcio: {nutrition.calcium_mg} mg</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutritionText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
