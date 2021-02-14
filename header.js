import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default Header = () => {

    return (
        <View style={styles.header}>
          <Text style={styles.title}>Zillow</Text>
        </View>
    )

}

const styles = StyleSheet.create({
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
      }
})