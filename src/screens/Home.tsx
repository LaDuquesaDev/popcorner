import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../services/api';
import { Movie } from '../types/movie';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => getPopularMovies(),
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Películas Populares</Text>
      <FlatList
        data={data?.results}
        keyExtractor={(item: Movie) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.movieItem}>{item.title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  movieItem: {
    fontSize: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
  },
});