import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

export default function splash() {
  const scheme = useColorScheme();
  return (
    <View style={{backgroundColor: scheme == 'dark'? '#1a1a2e': '#ffff',flex:1}}>
      <StatusBar hidden={true} />
      <Image style={styles.img} source={require('@image/xapiens.png')} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          textAlign: 'center',
          color: scheme == 'dark' ? '#ffff' : 'rgb(28, 28, 30)',
        }}>XNews</Text>
    </View>
  );
}

let {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
    marginTop: height * 0.2,
  },
});
