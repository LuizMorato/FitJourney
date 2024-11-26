import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Exercicios = ({ route, navigation }) => {
  const { tipo } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{tipo}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Alongamentos')}
      >
        <Image source={require('./assets/alongamento_icon.png')} style={styles.icon} /> 
        <Text style={styles.buttonText}>Alongamentos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Agachamentos')}
      >
        <Image source={require('./assets/agachamento_icon.png')} style={styles.icon} /> 
        <Text style={styles.buttonText}>Agachamentos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Flexoes')}
      >
        <Image source={require('./assets/flexao_icon.png')} style={styles.icon} /> 
        <Text style={styles.buttonText}>Flexões</Text>
      </TouchableOpacity>
    </View>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default Exercicios;
