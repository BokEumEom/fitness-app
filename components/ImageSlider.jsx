import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { sliderImages } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PAGE_WIDTH = wp(100);
const PAGE_HEIGHT = hp(25);
const PARALLAX_FACTOR = 0.4; // Adjust this value to control the parallax effect

const CustomItem = ({ item, index, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#000000dd", "transparent", "#000000dd"]
    );
    return { backgroundColor };
  }, [animationValue]);

  const imageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [PAGE_WIDTH * PARALLAX_FACTOR, 0, -PAGE_WIDTH * PARALLAX_FACTOR]
    );
    return { transform: [{ translateX }] };
  }, [animationValue]);

  return (
    <View style={styles.itemContainer}>
      <Animated.Image
        source={item}
        style={[styles.image, imageStyle]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.mask, maskStyle]}
      />
    </View>
  );
};

const ImageSlider = () => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const animationStyle = useCallback((value) => {
    'worklet';
    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );
    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  return (
    <View>
      <Carousel
        loop
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        autoPlay={isAutoPlay}
        autoPlayInterval={4000}
        data={sliderImages}
        scrollAnimationDuration={1200}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item, index, animationValue }) => (
          <CustomItem
            key={index}
            item={item}
            index={index}
            animationValue={animationValue}
          />
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    overflow: 'hidden',
    // borderRadius: 30,
  },
  image: {
    width: PAGE_WIDTH + (PAGE_WIDTH * PARALLAX_FACTOR * 2),
    height: PAGE_HEIGHT,
    resizeMode: 'cover',
    // borderRadius: 30,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ImageSlider;