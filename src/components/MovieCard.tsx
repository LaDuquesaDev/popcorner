import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../types/interfaces';
import { pixelModerado, pixelVertical } from '../utils/responsive';
import { COLORS } from '../constants/colors';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export const MovieCard = ({ movie, onPress }: MovieCardProps) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/150x225?text=No+Image',
        }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '48%',
      marginBottom: pixelVertical(16),
      borderRadius: pixelModerado(8),
      backgroundColor: COLORS.textButton,
      shadowColor: COLORS.shadowColor,
      shadowOffset: { width: 0, height: pixelVertical(2) },
      shadowOpacity: 0.1,
      shadowRadius: pixelModerado(4),
      elevation: 2,
      overflow: 'hidden',
    },
    poster: {
      width: '100%',
      height: pixelVertical(200),
      resizeMode: 'cover',
    },
    infoContainer: {
      padding: pixelModerado(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      fontSize: pixelModerado(14),
      fontWeight: '600',
    },
});
