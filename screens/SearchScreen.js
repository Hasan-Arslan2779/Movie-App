import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedbackComponent,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { searchMovies } from "../api/moviedb";
import debounce from "lodash.debounce";
var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setresults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setresults(data.results);
      });
    } else {
      setLoading(false);
      setresults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="mx-4 mb-3 mt-12
      flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
          onChangeText={handleTextDebounce}
          className="pb-1 pl-6 text-base font-semibold text-white tracking-wider "
          placeholder="Search Movie  "
          placeholderTextColor={"lightgray"}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 bg-neutral-500 m-1"
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>
      {/* result */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-2"
        >
          <Text className="text-white font-semibold ml-1">
            Result( {results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Movie", item)}
                  key={index}
                >
                  <View className="space-y-2 mb-4 ">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item?.poster_path} `,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 text-center">
                      {item?.title.length > 20
                        ? item?.title.slice(0, 20) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image source={require("../assets/2.jpeg")} className="h-96 w-96" />
        </View>
      )}
    </SafeAreaView>
  );
}
