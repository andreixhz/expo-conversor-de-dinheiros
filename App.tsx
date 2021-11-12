import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [locales, setLocale] = useState([]);
  const [value, setValue] = useState(0);
  const [converted, setConverted] = useState(1)
  const [selectedFrom, setSelectedFrom] = useState("BRL")

  return (
    <View style={styles.container}>

      <Text>Valor</Text>
      <TextInput onChange={(e: any) => setValue(e.target.value)}></TextInput>

      <Text>De</Text>
      <Picker
        onValueChange={(item: any) => setSelectedFrom(item)}
      >
        <Picker.Item key="BRL" value="BRL" label="Real"></Picker.Item>
        <Picker.Item key="DOLAR" value="EUR" label="Euro"></Picker.Item>
        <Picker.Item key="USD" value="USD" label="Dolar"></Picker.Item>
      </Picker>
      <Text>Para</Text>
      <Picker
        onValueChange={(item: any) => result(item)}
      >
        <Picker.Item key="BRL" value="BRL" label="Real"></Picker.Item>
        <Picker.Item key="DOLAR" value="EUR" label="Euro"></Picker.Item>
        <Picker.Item key="USD" value="USD" label="Dolar"></Picker.Item>
      </Picker>

      <Text>{(value * converted).toFixed(2)}</Text>
      <StatusBar style="auto" />
    </View>
  );

  async function result(item: any) {

    if (item === selectedFrom) {
      setConverted(1)
      return;
    }

    const ask = (await axios.get(`https://economia.awesomeapi.com.br/json/last/${selectedFrom}-${item}`)).data[(selectedFrom + item)].ask

    setConverted(ask);

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 10
  },
});
