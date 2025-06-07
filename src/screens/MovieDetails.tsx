import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { pixelHorizontal, pixelVertical, pixelModerado } from '../utils/responsive';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useMovieDetails } from '../hooks/useMoviesDetails';
import { CastCard } from '../components/CastCard';

type MovieDetailsProps = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export const MovieDetails = ({ route }: MovieDetailsProps) => {
  const { id } = route.params;
  const { data: movie, isLoading, isError } = useMovieDetails(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (isError || !movie) {
    return (
      <View style={styles.centered}>
        <Text>Error al cargar los detalles de la película</Text>
      </View>
    );
  }

  const cast = movie.credits?.cast || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : 'https://via.placeholder.com/780x439?text=No+Image',
          }}
          style={styles.backdrop}
        />
        <View style={styles.headerOverlay}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.genreContainer}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.overview}>{movie.overview || 'No hay sinopsis disponible.'}</Text>

        <Text style={styles.sectionTitle}>Reparto</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.castContainer}
        >
          {cast.slice(0, 10).map((actor) => (
            <CastCard key={actor.id} actor={actor} />
          ))}
        </ScrollView>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {movie.vote_average.toFixed(1)}/10
            </Text>
            <Text style={styles.statLabel}>Puntuación</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {movie.runtime} min
            </Text>
            <Text style={styles.statLabel}>Duración</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text style={styles.statLabel}>Año</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  header: {
    position: 'relative',
    height: pixelVertical(250),
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: pixelHorizontal(16),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: pixelModerado(24),
    fontWeight: 'bold',
    flex: 1,
  },
  bookmarkButton: {
    padding: pixelHorizontal(8),
  },
  content: {
    padding: pixelHorizontal(16),
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: pixelVertical(16),
  },
  genreTag: {
    backgroundColor: '#E3F2FD',
    borderRadius: pixelModerado(16),
    paddingHorizontal: pixelHorizontal(12),
    paddingVertical: pixelVertical(4),
    marginRight: pixelHorizontal(8),
    marginBottom: pixelVertical(8),
  },
  genreText: {
    color: '#1565C0',
    fontSize: pixelModerado(12),
  },
  sectionTitle: {
    fontSize: pixelModerado(18),
    fontWeight: '600',
    marginBottom: pixelVertical(8),
    marginTop: pixelVertical(16),
  },
  overview: {
    fontSize: pixelModerado(14),
    lineHeight: pixelVertical(20),
    color: '#333',
  },
  castContainer: {
    paddingVertical: pixelVertical(12),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: pixelVertical(24),
    marginBottom: pixelVertical(16),
    paddingTop: pixelVertical(16),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: pixelModerado(16),
    fontWeight: '600',
  },
  statLabel: {
    fontSize: pixelModerado(12),
    color: '#666',
    marginTop: pixelVertical(4),
  },
});