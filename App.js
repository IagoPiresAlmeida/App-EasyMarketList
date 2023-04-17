import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const App = () => {
  const [compras, setCompras] = useState('');
  const [comprasList, setComprasList] = useState([]);
  const [filteredCompras, setFilteredCompras] = useState([]);
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);

  const handleAddCompra = () => {
    if (compras.trim()) {
      setComprasList([...comprasList, { id: Date.now(), text: compras }]);
      setFilteredCompras([...filteredCompras, { id: Date.now(), text: compras }]);
      setCompras('');
    }
  };

  const handleDeleteCompra = (id) => {
    setComprasList(comprasList.filter((compra) => compra.id !== id));
    setFilteredCompras(filteredCompras.filter((compra) => compra.id !== id));
  };

  const handleFilter = (text) => {
    setFilteredCompras(
      comprasList.filter((compra) =>
        compra.text.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const maxTotal = 999999;
  const minTotal = 0;

  const handleCalculation = () => {
    const result = parseFloat(value) * parseFloat(quantity);
    const newTotal = total + result;

    if (newTotal > maxTotal) {
      setTotal(maxTotal);
    } else {
      setTotal(newTotal);
    }

    setValue('');
    setQuantity('');
  };

  const handleSubtraction = () => {
    const result = parseFloat(value) * parseFloat(quantity);
    const newTotal = total - result;
  
    if (newTotal < minTotal) {
      setTotal(minTotal);
    } else {
      setTotal(newTotal);
    }
  
    setValue('');
    setQuantity('');
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.compraItemContainer}>
      <Text style={styles.compraItem}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteCompra(item.id)}>
        <FontAwesome name="check" size={30} color="#79DF68" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.headerlogo}>
    <Image source={require('./assets/marketlist.png')} />
  </View>
  <View style={styles.header}>
    <TextInput
      style={styles.input}
      value={compras}
      onChangeText={setCompras}
      placeholder="Adicione um item na lista de compras"
    />
    <TouchableOpacity style={styles.addButton} onPress={handleAddCompra}>
      <Ionicons name="add-outline" size={30} color="black" style={styles.add} />
    </TouchableOpacity>
  </View>

  <View style={styles.searchContainer}>
    <Feather name="search" size={20} color="black" />
    <TextInput
      style={styles.searchInput}
      onChangeText={handleFilter}
      placeholder="Pesquisar                                                                                                                                                                                                                                                                                                             "
    />
  </View>

  <View style={styles.line} />
  <FlatList
    data={filteredCompras}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.comprasList}
  />
  <View style={styles.line} />

  <View style={styles.calculatorContainer}>
    <View style={styles.inputsContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder="Valor"
      />
      <Text>X</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Quantidade"
      />
    </View>
    <View style={styles.calculobox}>
      <TouchableOpacity
        style={styles.calcButton}
        onPress={handleCalculation}
        disabled={!value || !quantity}
      >
        <Text style={styles.calcText}>Somar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.calcButton}
        onPress={handleSubtraction}
        disabled={!value || !quantity}
      >
        <Text style={styles.calcText}>Subtrair</Text>
      </TouchableOpacity>

      <Text style={styles.total}>Total da compra: R$ {total.toFixed(2).slice(0, 6)}</Text>
    </View>
  </View>
</View>

</SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 10,
    marginTop: 50,
    elevation: 10,
    shadowColor:'black',
    shadowOpacity: 5,
    shadowOffset:{width:1,height:2},
    
  },
  headerlogo:{
    alignItems:'center',
    marginBottom:-50,
    marginTop:40,
  },
  add:{
    color:'white',
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop:-4,
    marginBottom: 10,
    borderColor: '#ccc',
    
  },
  searchInput:{
    marginStart: 5,
    marginRight:100,

  },
  line:{
  height:5,
  backgroundColor: '#0080ff',
  marginHorizontal: 20,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#0080ff',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
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
    backgroundColor: 'white',
    elevation: 10,
    shadowColor:'black',
    shadowOpacity: 5,
    shadowOffset:{width:1,height:2},
    borderColor: '#ccc',
  },
  compraItem: {
    fontSize: 16,
    flex: 1,    
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  calcButton:{
  
    borderWidth: 1,
    height: 40,
    width:70,
    borderColor: '#ccc',
    backgroundColor: '#0080ff',
    marginRight:10,
    borderRadius: 5, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold', 
  },
  calculobox:{
    flexDirection: 'row',
    marginHorizontal:20,
    marginBottom:20,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  }
});

export default App;