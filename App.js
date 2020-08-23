import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Animated from 'react-native-reanimated';

// // core Snoopy
// import Snoopy from 'rn-snoopy';

// // some Snoopy goodies we're going to use
// import filter from 'rn-snoopy/stream/filter';

// import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

// //If you are using React 0.48 or below, then you should import:
// //import EventEmitter from 'react-native/Libraries/EventEmitter/EventEmitter';

// const emitter = new EventEmitter();

// const events = Snoopy.stream(emitter);
// filter({ method: 'updateView' }, true)(events).subscribe();

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 50;

const { Value, Extrapolate } = Animated;

export default function App() {
  const [scrollY] = useState(new Value(0));
  const [headerHeight, setHeaderHeight] = useState();
  const [profileImageHeight, setProfileImageHeight] = useState();
  const [profileImageMarginTop, setProfileImageMarginTop] = useState();
  const [headerZindex, setHeaderZindex] = useState();
  const [headerTitleBottom, setHeaderTitleBottom] = useState();

  useEffect(() => {
    setHeaderHeight(
      scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
      })
    );

    setProfileImageHeight(
      scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
      })
    );

    setProfileImageMarginTop(
      scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [
          HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
          HEADER_MAX_HEIGHT + 5,
        ],
        extrapolate: Extrapolate.CLAMP,
      })
    );

    setHeaderZindex(
      scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
        outputRange: [0, 0, 1000],
        extrapolate: Extrapolate.CLAMP,
      })
    );

    setHeaderTitleBottom(
      scrollY.interpolate({
        inputRange: [
          0,
          HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
          HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
          HEADER_MAX_HEIGHT -
            HEADER_MIN_HEIGHT +
            5 +
            PROFILE_IMAGE_MIN_HEIGHT +
            26,
        ],
        outputRange: [-1000, -1000, -1000, 5],
        extrapolate: Extrapolate.CLAMP,
      })
    );
  }, []);

  return (
    <View style={{ flex: 1, shadowColor: 'white' }}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex,
            alignItems: 'center',
          },
        ]}
      >
        <Animated.View
          style={{ position: 'absolute', bottom: headerTitleBottom }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            José Arteaga
          </Text>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              height: profileImageHeight,
              width: profileImageHeight,
              marginTop: profileImageMarginTop,
            },
          ]}
        >
          <Image source={require('./assets/me.jpg')} style={styles.image} />
        </Animated.View>
        <View>
          <Text style={styles.name}>José Arteaga</Text>
        </View>
        <View style={{ height: 1000 }}></View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
  },
});
