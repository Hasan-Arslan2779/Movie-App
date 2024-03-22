import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    // call the movie details api
  }, [item]);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900 "
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* back button and movie poster */}
      <View className="w-ful ">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-14">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="p-1 rounded-xl"
          >
            <ChevronLeftIcon color={"white"} size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavorite)}>
            <HeartIcon
              size={40}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require("../assets/1.jpeg")}
            style={{ width, height: height * 0.55 }}
          />
          {/* Gradient */}
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>
      {/* Movie Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          SpderMan
        </Text>
        {/* Status ,relese runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 170 min
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4  space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action -
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill -
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* Descripiton */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
          doloribus impedit blanditiis expedita ut quasi temporibus dicta
          asperiores debitis aliquam officiis, cumque iste sit repellendus!
        </Text>
      </View>
      {/* Cast */}
      <Cast cast={cast} />
    </ScrollView>
  );
}
