import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  FadeInDown,
} from 'react-native-reanimated';

const exerciseDetails = () => {
  const item = useLocalSearchParams();
  console.log('got item: ', item);
  
  return (
    <View className="flex flex-1">
      <View className="shadow-md bg-neutral-200 rou-b-[40px]">
        <Image
          source={{uri: item.gitUrl}}
          contentFit='conver'
          style={{width: wp(100), height: wp(100)}}
          className="rounded-b-[40px]"
        />
      </View>

      <TouchableOpacity
        onPress={()=> router.back()}
        className="mx-2 absolute rounded-full mt-2 right-0"
      >
        <Ionicons name="close-circle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>

      {/* details */}
      <ScrollView className="mx-4 space-y-2 mt-3" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 60}}>
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{fontSize: hp(3.5)}}
          className="font-semibold text-neutral-800 tracking-wide"
        >
          {item.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{fontSize: hp(2)}}
          className="font-semibold text-neutral-800 tracking-wide"
        >
          Equipment <Text className="font-bold text-neutral-800">
            {item?.equipment}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{fontSize: hp(2)}}
          className="font-semibold text-neutral-800 tracking-wide">
          Secondary Muscles <Text className="font-bold text-neutral-800">
            {item?.secondaryMyscles}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{fontSize: hp(2)}}
          className="font-semibold text-neutral-800 tracking-wide">
          Target <Text className="font-bold text-neutral-800">
            {item?.target}
          </Text>
        </Animated.Text>
        <Text style={{fontSize: hp(2)}} className="font-semibold text-neutral-800 tracking-wide">
          Instructions
        </Text>
        {
          item.instructions.split(',').map((instruction, index)=>{
            return (
              <Animated.Text
                entering={FadeInDown.delay(500).duration(300).springify()}
                key={instruction}
                style={{fontSize: hp(1.7)}}
                className="text-neutral-800"
              >
                {instruction}
              </Animated.Text>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default exerciseDetails