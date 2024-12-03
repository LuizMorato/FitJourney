import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FitJourneyPlano = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plano FitJourney</Text>
      </View>

      {/* Destaque */}
      <View style={styles.highlightSection}>
        <View style={styles.iconContainer}>
          <Icon name="star" size={50} color="#4CAF50" />
        </View>
        <Text style={styles.priceText}>Apenas R$ 9,90/mês</Text>
        <Text style={styles.subtitle}>Transforme sua saúde com o FitJourney Premium!</Text>
      </View>

      {/* Benefícios */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Com o plano Premium, você pode:</Text>

        <View style={styles.featureItem}>
          <Icon name="line-chart" size={24} color="#2E7D32" style={styles.featureIcon} />
          <Text style={styles.featureText}>
            Acompanhar sua <Text style={styles.boldText}>nutrição diária</Text> com gráficos detalhados.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon name="calendar" size={24} color="#2E7D32" style={styles.featureIcon} />
          <Text style={styles.featureText}>
            Observar relatórios <Text style={styles.boldText}>diários, semanais, mensais e anuais</Text> de proteínas, carboidratos e gorduras.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon name="plus-circle" size={24} color="#2E7D32" style={styles.featureIcon} />
          <Text style={styles.featureText}>
            Adicionar <Text style={styles.boldText}>novos produtos</Text> à análise de rótulos de forma prática.
          </Text>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaText}>
          Invista em você! Acesse ferramentas exclusivas para alcançar seus objetivos.
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert(
            'Aguarde!',
            'As funcionalidades premium ainda estão em desenvolvimento. Fique atento às próximas atualizações!'
          )}  style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Assinar agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
    textAlign: 'center',
  },
  highlightSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  featuresSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#4CAF50',
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  ctaSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  ctaText: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FitJourneyPlano;
