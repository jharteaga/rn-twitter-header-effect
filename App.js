import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <ScrollView style={styles.avatar}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/me.jpg')} style={styles.image} />
        </View>
        <View>
          <Text style={styles.name}>José Arteaga</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'lightskyblue',
    height: HEADER_MAX_HEIGHT,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  imageContainer: {
    height: PROFILE_IMAGE_MAX_HEIGHT,
    width: PROFILE_IMAGE_MAX_HEIGHT,
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
  },
});
