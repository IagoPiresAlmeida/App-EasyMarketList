import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const App = () => {
  const [compras, setCompras] = useState('');
  const [comprasList, setComprasList] = useState([]);

  const handleAddCompra = () => {
    if (compras.trim()) {
      setComprasList([...comprasList, { id: Date.now(), text: compras }]);
      setCompras('');
    }
  };

  const handleDeleteCompra = (id) => {
    setComprasList(comprasList.filter((compra) => compra.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.compraItemContainer}>
      <Text style={styles.compraItem}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteCompra(item.id)}>
        <FontAwesome name="check" size={30} color="#79DF68" style={{shadowColor:'black', shadowOpacity: 0.4,shadowOffset:{width:1,height:2}}}/>

      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={compras}
          onChangeText={setCompras}
          placeholder="Adicione um item na lista de compras"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCompra}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comprasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.comprasList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "mediumslateblue"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    marginTop: 50,
  },
  input: {
    flex: 1,
    height: 43,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "white"
  },
  addButton: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    color: 'green'

  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    width: 25,
    height: 25,
    textAlign: 'center'
  },
  comprasList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  compraItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white'
  },
  compraItem: {
    fontSize: 16,
    flex: 1,    
  },
});

export default App;
