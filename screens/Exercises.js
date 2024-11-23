import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert, // Importando o Alert
} from 'react-native';
import Navbar from '../components/Navbar';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const handleAlert = () => {
    Alert.alert("🚧 Em Breve 🚧", "Esse treino será lançado em breve! Fique ligado!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Plano de Exercícios</Text>

        <Text style={styles.subHeader}>Exercícios Populares</Text>

        {/* Scroll horizontal para os banners */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={[styles.banner, styles.red]}
            onPress={() =>
              navigation.navigate('Atividades', { tipo: 'Treinar em Casa' })
            }>
            <Text style={styles.bannerText2}>Treinar em Casa</Text>
            <Text style={styles.subText}>3 Exercícios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.banner, styles.black]}
            onPress={() =>
              navigation.navigate('Alongamentos')
            }>
            <Text style={styles.bannerText2}>Alongamento em Casa</Text>
            <Text style={styles.subText}>3 Exercícios</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.subHeader}> (🚧 EM BREVE 🚧) Treinos da Comunidade</Text>

        {/* Centralizando os banners abaixo do "Em Breve" */}
        <View style={styles.bannersContainer}>
          {/* Banner 3 */}
          <TouchableOpacity
            style={[styles.banner, styles.orange, styles.spacedBanner]}
            onPress={handleAlert} // Exibindo o alerta
          >
            <Text style={styles.bannerText}>Treino de Peito e Braços</Text>
            <Text style={styles.subText}>10 Exercícios</Text>
          </TouchableOpacity>

          {/* Banner 4 */}
          <TouchableOpacity
            style={[styles.banner, styles.darkRed, styles.spacedBanner]}
            onPress={handleAlert} // Exibindo o alerta
          >
            <Text style={styles.bannerText}>Cardio em Casa</Text>
            <Text style={styles.subText}>10 Exercícios</Text>
          </TouchableOpacity>

          {/* Banner 5 */}
          <TouchableOpacity
            style={[styles.banner, styles.brown, styles.spacedBanner]}
            onPress={handleAlert} // Exibindo o alerta
          >
            <Text style={styles.bannerText}>Treino de Peito e Braços 2</Text>
            <Text style={styles.subText}>10 Exercícios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegação fixa */}
      <Navbar navigation={navigation} style={styles.navbarContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: height * 0.1, // 10% da altura
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: height * 0.1, // Deixa espaço para a navbar fixa
  },
  scrollContainer: {
    paddingHorizontal: 10, // Diminuindo a margem horizontal para centralizar mais
  },
  scrollContent: {
    justifyContent: 'center', // Centraliza os itens no ScrollView
    alignItems: 'center', // Garante que o conteúdo está centralizado no eixo horizontal
  },
  header: {
    fontSize: 20, // Diminuindo a fonte
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  subHeader: {
    fontSize: 14, // Diminuindo o tamanho da fonte
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannersContainer: {
    alignItems: 'center', // Centraliza os banners
  },
  banner: {
    width: width * 0.8, // Aumentando a largura dos banners para garantir o mesmo tamanho
    height: 150, // Altura fixa para garantir que todos os banners tenham o mesmo tamanho
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacedBanner: {
    marginVertical: 10, // Espaçamento vertical entre os banners
  },
  red: {
    backgroundColor: '#d9534f',
  },
  black: {
    backgroundColor: '#000',
  },
  orange: {
    backgroundColor: '#f0ad4e',
  },
  darkRed: {
    backgroundColor: '#c9302c',
  },
  brown: {
    backgroundColor: '#5e4b3a',
  },
  bannerText2: {
    color: '#fff',
    fontSize: 22, // Diminuindo o tamanho da fonte do texto do banner
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18, // Diminuindo o tamanho da fonte do texto do banner
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#fff',
    fontSize: 12, // Diminuindo o tamanho da fonte
    textAlign: 'center',
  },
});
