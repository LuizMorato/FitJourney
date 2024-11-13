import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Exercicios = ({ route, navigation }) => {
  const { tipo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tipo}</Text>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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