import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, TextInput, Button, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import { parseString } from 'react-native-xml2js';
import Header from './header';
import Input from './input'


export default App = () => {
  const host = 'http://www.zillow.com';
  const searchEndPoint = '/webservice/GetSearchResults.htm';
  const zwsId = 'X1-ZWz1934km3rsp7_a9fju';

  const [addressText, setAddressText] = useState('950 Park Ave');
  const [citystatezipText, setCitystatezipText] = useState('10028');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);  

  const changeAdress = (text) => setAddressText(text);
  const changeCitystatezip = (text) => setCitystatezipText(text);

  makeCardItem = (xmlData) => {
    const addr = xmlData.address[0];

    return {
      street: addr.street[0],
      city: addr.city[0],
      state: addr.state[0],
      amount: xmlData.zestimate[0].amount[0]["_"],
    }
  }

  processSearchResults = (responseData) => {
    const response = responseData["SearchResults:searchresults"].response;
    console.log(response)
    const xmlPropertiesList = response[0].results[0].result;

    const findedResult = xmlPropertiesList.map((xmlPropertyItem) => makeCardItem(xmlPropertyItem));
    setData(findedResult)
  }

  submitHandler = () => {
    const url = `${host}${searchEndPoint}?zws-id=${zwsId}&address=${encodeURIComponent(addressText)}&citystatezip=${encodeURIComponent(citystatezipText)}`;
    console.log(url);

    fetch(url)
      .then((response) => response.text())
      .then((xmlText) => {
        const json = parseString(xmlText, (err, result) => {
          processSearchResults(result);
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  printCard = (cardData) => {
    return (
      <View>
        <Text style={styles.list}>{cardData.street}</Text>
        <Text style={styles.list}>{cardData.city}</Text>
        <Text style={styles.list}>{cardData.state}</Text>
        <Text style={styles.list}>{cardData.amount}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>        
        <Header></Header>
        <View style={styles.content}>
          <Input submitHandler={submitHandler}></Input>
        </View>
        <View style={styles.list}>
          {data.map((dataItem) => printCard(dataItem))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 40,
    flex: 1
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10
  },
  list: {
    marginTop: 20,
    flex: 1
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  text: {
    textAlign: 'center',
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold'
  },
  content: {
    padding: 40,
    flex: 1
  }
});


