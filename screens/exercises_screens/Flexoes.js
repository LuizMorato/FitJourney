import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Flexoes = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Flexoes</Text>

      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/fit.png')} style={styles.logo} />
          <Text style={styles.brandName}>Flexão Tradicional</Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
          <Text style={styles.brandName}>Flexão Declinada </Text>
        </View>
        <Text style={styles.description}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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