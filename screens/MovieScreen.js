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
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCredit,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // call the movie details api
    console.log(item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovie(item.id);
  }, [item]);
  // Get Movie Details
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };
  // Get Movie Credits
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredit(id);
    if (data && data.cast) setCast(data.cast);
  };

  /// Get similar Movies
  const getSimilarMovie = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900 "
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* back button and movie poster */}
      <View className="w-ful ">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 mt-14"
          }
        >
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

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/1.jpeg")}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path} `,
              }}
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
        )}
      </View>
      {/* Movie Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {/* Status ,relese runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* Genres */}
        <View className="flex-row justify-center mx-4  space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.lenght;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? " •" : null}
              </Text>
            );
          })}

          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill -
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text> */}
        </View>
        {/* Descripiton */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      {/* Cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
      {/* Similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          data={similarMovies}
          title={"Similar Movies"}
          hideSeeAll={true}
        />
      )}
    </ScrollView>
  );
}
