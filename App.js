import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function App() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, { height: headerHeight }]}
      ></Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.avatar}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.imageContainer}>
          <Image source={require('./assets/me.jpg')} style={styles.image} />
        </View>
        <View>
          <Text style={styles.name}>José Arteaga</Text>
        </View>
        <View style={{ height: 1000 }}></View>
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
