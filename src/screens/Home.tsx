import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { Movie } from '../types/movie';
import { MovieCard } from '../components/MovieCard';
import {
  pixelHorizontal,
  pixelVertical,
  pixelModerado,
} from '../utils/responsive';

export const Home = () => {
  const popularMoviesQuery = usePopularMovies();

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} />
  );

  const isLoading = popularMoviesQuery.isLoading;
  const isError = popularMoviesQuery.isError;

  const movies =
    popularMoviesQuery.data?.pages.flatMap((page) => page.results) || [];

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error al cargar las películas</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          onEndReached={() => {
            if (popularMoviesQuery.hasNextPage) {
              popularMoviesQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            popularMoviesQuery.isFetchingNextPage ? (
              <ActivityIndicator
                size="large"
                color="#2196F3"
                style={styles.loader}
              />
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No se encontraron películas</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: pixelHorizontal(16),
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
  loader: {
    marginVertical: pixelVertical(16),
  },
  errorText: {
    fontSize: pixelModerado(16),
    color: '#D32F2F',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: pixelModerado(16),
    color: '#666',
    textAlign: 'center',
  },
});
