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
import { HomeStackParamList, WatchlistStackParamList } from '../navigation/types';
import { useMovieDetails } from '../hooks/useMoviesDetails';
import { CastCard } from '../components/CastCard';
import { COLORS } from '../constants/colors';

type MovieDetailsProps =
  | NativeStackScreenProps<HomeStackParamList, 'MovieDetails'>
  | NativeStackScreenProps<WatchlistStackParamList, 'MovieDetails'>;

export const MovieDetailsScreen = ({ route }: MovieDetailsProps) => {
  const { id } = route.params;
  const { data: movie, isLoading, isError, smartCast } = useMovieDetails(id);

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
          <Text style={styles.errorText}>Failed to load movie details.</Text>
        </View>
      );
    }

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

        {/* Overview Section */}
        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.overview}>{movie.overview || 'No synopsis available.'}</Text>

        {/* Cast Section */}
        <Text style={styles.sectionTitle}>Cast</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.castContainer}
        >
          {smartCast.map(actor => (
            <CastCard key={actor.id} actor={actor} />
          ))}
        </ScrollView>

        {/* Movie Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{movie.vote_average.toFixed(1)}/10</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{movie.runtime} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{new Date(movie.release_date).getFullYear()}</Text>
            <Text style={styles.statLabel}>Year</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundInput,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: pixelModerado(14),
    textAlign: 'center',
    paddingHorizontal: pixelHorizontal(20),
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
    color: COLORS.textButton,
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
    backgroundColor: COLORS.filterInfoBackground,
    borderRadius: pixelModerado(16),
    paddingHorizontal: pixelHorizontal(12),
    paddingVertical: pixelVertical(4),
    marginRight: pixelHorizontal(8),
    marginBottom: pixelVertical(8),
  },
  genreText: {
    color: COLORS.buttonActive,
    fontSize: pixelModerado(12),
  },
  sectionTitle: {
    fontSize: pixelModerado(18),
    fontWeight: '600',
    marginBottom: pixelVertical(8),
    marginTop: pixelVertical(16),
    color: COLORS.inputColor,
  },
  overview: {
    fontSize: pixelModerado(14),
    lineHeight: pixelVertical(20),
    color: COLORS.inputColor,
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
    borderTopColor: COLORS.placeholder,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: pixelModerado(16),
    fontWeight: '600',
    color: COLORS.inputColor,
  },
  statLabel: {
    fontSize: pixelModerado(12),
    color: COLORS.icon,
    marginTop: pixelVertical(4),
  },
});
