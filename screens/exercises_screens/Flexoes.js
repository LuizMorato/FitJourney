import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Flexoes = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Flexões</Text>
      </View>

      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/fit.png')} style={styles.logo} />
          <Text style={styles.brandName}>Flexão Tradicional</Text>
        </View>
        <Text style={styles.description}>
          A flexão tradicional é um exercício básico que trabalha o peitoral, tríceps e ombros, ajudando a construir força na parte superior do corpo.
        </Text>
        
        <View style={styles.gifContainer}>
          <Image 
            source={require('./assets/flexao1.gif')} 
            style={styles.gif} 
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Card 1 Fim */}

      {/* Card 2 */}
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/fit.png')} style={styles.logo} />
          <Text style={styles.brandName}>Flexão Diamante</Text>
        </View>
        <Text style={styles.description}>
          A flexão diamante foca mais intensamente no tríceps, posicionando as mãos próximas em formato de diamante para uma ativação muscular mais profunda.
        </Text>
        
        <View style={styles.gifContainer}>
          <Image 
            source={require('./assets/flexao2.gif')} 
            style={styles.gif} 
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Card 2 Fim */}

      {/* Card 3 */}
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/fit.png')} style={styles.logo} />
          <Text style={styles.brandName}>Flexão Declinada</Text>
        </View>
        <Text style={styles.description}>
          A flexão declinada aumenta o foco nos músculos superiores do peitoral e ombros, elevando os pés em uma superfície elevada.
        </Text>
        
        <View style={styles.gifContainer}>
          <Image 
            source={require('./assets/flexao3.gif')} 
            style={styles.gif} 
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Card 3 Fim */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginVertical: 12,
    color: '#666',
  },
  gifContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
});

export default Flexoes;
