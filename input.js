import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';

export default Input = ({submitHandler}) => {

    const [addressText, setAddressText] = useState('950 Park Ave');
    const [citystatezipText, setCitystatezipText] = useState('10028');

    const changeAdress = (text) => setAddressText(text);
    const changeCitystatezip = (text) => setCitystatezipText(text);

    

    return(

        <View style={styles.content}>
          <View>
            <TextInput
              style={styles.input}
              placeholder='e.g. 3012 13th Ave W'
              onChangeText={changeAdress}
            />
            <TextInput
              style={styles.input}
              placeholder='e.g. Seattle WA'
              onChangeText={changeCitystatezip}
            />
            <Button
              color='orange'
              onPress={submitHandler()}
              title='Show information'
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: 'blue',
    }
  });