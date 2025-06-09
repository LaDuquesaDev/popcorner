import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWatchlist } from '../store/useWatchlist';
import { MovieCard } from '../components/MovieCard';
import { COLORS } from '../constants/colors';
import { Movie } from '../types/interfaces';
import { useNavigation } from '@react-navigation/native';
import { WatchlistNavigationProp } from '../navigation/types';
import { pixelHorizontal, pixelModerado, pixelVertical } from '../utils/responsive';

export const WatchlistScreen = () => {
  const navigation = useNavigation<WatchlistNavigationProp>();
  const { watchlist } = useWatchlist();

   const navigateToDetails = (movie: Movie) => {
      navigation.navigate('MovieDetails', {
        id: movie.id,
        title: movie.title,
        from: 'Watchlist',
      });
    };

  const renderItem = ({ item }: any) => (
    <MovieCard movie={item} onPress={() => navigateToDetails(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Películas por ver</Text>
      {watchlist.length === 0 ? (
        <Text style={styles.empty}>No tienes películas guardadas.</Text>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundInput },
  title: {
    fontSize: pixelModerado(18),
    color: COLORS.backgroundInput,
    textAlign: 'center',
    marginVertical: pixelVertical(16),
  },
  empty: {
    color: COLORS.icon,
    textAlign: 'center',
    marginTop: pixelVertical(20),
  },
  list: {
    paddingHorizontal: pixelHorizontal(16),
    paddingBottom: pixelVertical(24),
    paddingTop: pixelVertical(8),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: pixelVertical(16),
  },
});
