import { Camera } from 'expo-camera'; // Correção aqui, importando Camera diretamente de 'expo-camera'
import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function App() {
  // Função para alternar o tipo de câmera
  const toggleCameraType = () => {
    setType((prevType) => (prevType === CameraType.back ? CameraType.front : CameraType.back));
  };

  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState(CameraType.back); // Inicializando com a câmera traseira
  const cameraRef = useRef(null);
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.errorPermission}>
        <Text style={styles.errorPermission}>Você precisa de permissão para acessar a câmera.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    console.log('Código EAN13 lido:', data); // Exibe o código EAN13 no console
  };

  return (
    <View style={styles.container}>
      <Camera
        barcodeScannerSettings={{
          barCodeTypes: ['ean13'], // Leitura do tipo EAN13
        }}
        type={type}
        ratio="16:9"
        style={{ height, width: '100%' }} // Ajuste para a câmera ocupar a largura total da tela
        ref={cameraRef}
        onBarCodeScanned={handleBarCodeScanned} // Função para lidar com códigos de barra lidos
        autoFocus={true} // Ativando autofocus
      />

      {/* Botão para alternar a câmera */}
      <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
        <Text style={styles.buttonText}>Alternar Câmera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPermission: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'red',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
