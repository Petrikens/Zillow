import React, { useState } from 'react';
import {View, TouchableWithoutFeedback, Text, TextInput, Button, StyleSheet, Keyboard, ActivityIndicator} from 'react-native';
import { parseString } from 'react-native-xml2js';


export default App = () => {


  const http = 'http://www.zillow.com/webservice/GetSearchResults.htm';
  const zwsId = 'X1-ZWz1934km3rsp7_a9fju';

  const[addressText, setAddressText] = useState('');
  const[citystatezipText, setCitystatezipText] = useState('');
  const[data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const changeAdress= (text) => setAddressText(text);

  const changeCitystatezip = (text) => setCitystatezipText(text);

  const URL = `${http}?zws-id=${zwsId}&address=${encodeURIComponent(addressText)}&citystatezip=${encodeURIComponent(citystatezipText)}`

  console.log(URL);


    submitHandler = () => {
      fetch(URL)
          .then((response) => {
            const text = response.text()
            return text
          })
          .then((xmlText) => {
            let resultJSON = {};
            const json = parseString(xmlText, (err, result) => {
              resultJSON = result;
            });
            let obj = ((JSON.stringify(resultJSON["SearchResults:searchresults"])));
            let objStreet = obj.response[0].results[0].result[0].address[0].street[0];
            let objCity = obj.response[0].results[0].result[0].address[0].city[0];
            let objState = obj.response[0].results[0].result[0].address[0].state[0];
            let objAmout = obj.response[0].results[0].result[0].zestimate[0].amount[0]._;
            setData((prevData) => {
              return [
                {
                  street: objStreet,
                  city: objCity,
                  state: objState,
                  amount: objAmout,
                },
                ...prevData
              ];
            });
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    };

    console.log(data);


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Zillow</Text>
        </View>
        <View style={styles.content}>
          <View>
            <TextInput
              style={styles.input} 
              placeholder = 'e.g. 3012 13th Ave W'
              onChangeText={changeAdress}
            />
            <TextInput
              style={styles.input} 
              placeholder = 'e.g. Seattle WA'
              onChangeText={changeCitystatezip}
            />
            <Button 
              color= 'orange'
              onPress = {() => submitHandler()}
              title = 'Show information'
            />
            <View style={styles.list}>
              {isLoading ? <ActivityIndicator></ActivityIndicator> : ( 
                    <Text style={styles.item}>
                      {data}
                    </Text>
              )}
            </View>
          </View>
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
  header: {
    height: 80,
    padding: 38,
    backgroundColor: 'coral',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  }
});


