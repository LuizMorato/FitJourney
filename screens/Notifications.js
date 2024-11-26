import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ícone de voltar

// Aqui você faria a chamada para o backend ou a fonte de dados das notificações.
export default function Notifications({ route, navigation }) {
    const { email } = route.params; // Recebe o parâmetro email

    // Simulando a chamada para obter as notificações
    const [notifications, setNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState(new Set()); // Estado para controlar as notificações vistas

    // UseEffect para simular a busca de notificações
    useEffect(() => {
        // Simulando o carregamento de notificações
        const fetchNotifications = async () => {
            const fetchedNotifications = [
                { id: 0, title: 'TCC', description: 'Hoje é dia de me apresentar. #FitJourney', isToday: true },
                { id: 1, title: 'Água', description: 'Beber 300mL de água às 8:00.', isToday: true },
                { id: 2, title: 'Café da Manhã', description: 'Não esqueça de comer alimentos nutritivos!', isToday: true },
            ];
            setNotifications(fetchedNotifications); // Atualiza o estado com as notificações
        };

        fetchNotifications();
    }, []);

    // Função para marcar notificações como vistas e removê-las
    const markAsRead = () => {
        const newReadNotifications = new Set(todayNotifications.map(n => n.id)); // Marca todas as notificações de hoje
        setReadNotifications(newReadNotifications); // Atualiza o estado de notificações vistas
        // Remove as notificações de hoje da lista
        const updatedNotifications = notifications.filter(notification => !newReadNotifications.has(notification.id));
        setNotifications(updatedNotifications); // Atualiza as notificações para remover as vistas
    };

    // Verifica se existem notificações
    const todayNotifications = notifications.filter(n => n.isToday);
    const yesterdayNotifications = notifications.filter(n => !n.isToday);

    // Função para verificar se a notificação foi marcada como vista
    const isNotificationRead = (id) => readNotifications.has(id);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home', { email })}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notificações</Text>
                <TouchableOpacity onPress={markAsRead}>
                    <Text style={styles.markAsRead}>Marcar como visto</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Se houver notificações de hoje */}
                {todayNotifications.length > 0 ? (
                    <>
                        <Text style={styles.sectionTitle}>Hoje</Text>
                        {todayNotifications.map(notification => (
                            <View
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    isNotificationRead(notification.id) && styles.notificationRead, // Aplica o estilo para notificações vistas
                                ]}
                            >
                                <Text style={styles.notificationTitle}>{notification.title}</Text>
                                <Text style={styles.notificationDescription}>{notification.description}</Text>
                            </View>
                        ))}
                    </>
                ) : (
                    <Text style={styles.noNotificationsText}>Não há notificações para hoje</Text>
                )}

                {/* Se houver notificações de ontem */}
                {yesterdayNotifications.length > 0 ? (
                    <>
                        <Text style={styles.sectionTitle}>Ontem</Text>
                        {yesterdayNotifications.map(notification => (
                            <View
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    isNotificationRead(notification.id) && styles.notificationRead, // Aplica o estilo para notificações vistas
                                ]}
                            >
                                <Text style={styles.notificationTitle}>{notification.title}</Text>
                                <Text style={styles.notificationDescription}>{notification.description}</Text>
                            </View>
                        ))}
                    </>
                ) : (
                    <Text style={styles.noNotificationsText}>Não há notificações de ontem</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    markAsRead: {
        fontSize: 14,
        color: '#007BFF',
    },
    scrollView: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    notificationCard: {
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
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationDescription: {
        fontSize: 14,
        color: '#757575',
    },
    noNotificationsText: {
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
        marginTop: 20,
    },
    notificationRead: {
        backgroundColor: '#e0e0e0', // Cor de fundo para notificações marcadas como vistas
    },
});
