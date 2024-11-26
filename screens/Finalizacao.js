import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const App = ({route, navigation}) => {
  const { email } = route.params;

  const handleFinish = () => {
    // Navega para a tela Home e passa o email como parâmetro
    navigation.replace('Home', { email });
  };

  return (
    <View style={styles.container}>
      {/* Título e descrição */}
      <Text style={styles.title}>
        Encare <Text style={styles.highlight}>desafios</Text> para melhorar sua saúde
      </Text>

      {/* Texto explicativo sobre o FitJourney */}
      <Text style={styles.explanationText}>
        No FitJourney, você pode analisar rótulos de produtos e o app avalia de 0 a 100 a qualidade deles.
        Além disso, você pode adicionar e ver os macronutrientes das suas receitas para acompanhar sua dieta!
      </Text>

      {/* Imagens de perfil */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://picsum.photos/100' }} style={styles.profileImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://picsum.photos/101' }} style={styles.profileImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://picsum.photos/102' }} style={styles.profileImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://picsum.photos/103' }} style={styles.profileImage} />
        </View>
      </View>

      {/* Texto do grupo */}
      <Text style={styles.groupText}>Faça parte de um grupo saudável.</Text>

      {/* Botão finalizar */}
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finalizar!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    paddingTop: 50,
  },

  pageIndicator: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  highlight: {
    color: '#0DE347',
  },
  explanationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
    fontWeight: '500',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#0DE347', 
    marginLeft: -20, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 80, 
    height: 80, 
    borderRadius: 50, 
    marginLeft: 10, 
  },
  groupText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFF',
    borderColor: '#0DE347',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0DE347',
  },
});

export default App;
