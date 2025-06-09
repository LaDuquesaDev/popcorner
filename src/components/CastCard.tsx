import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../types/interfaces';
import { pixelHorizontal, pixelVertical, pixelModerado } from '../utils/responsive';
import { COLORS } from '../constants/colors';

interface CastCardProps {
  actor: Cast;
}

export const CastCard = ({ actor }: CastCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : 'https://via.placeholder.com/100x150?text=No+Image',
        }}
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={2}>
        {actor.name}
      </Text>
      <Text style={styles.character} numberOfLines={1}>
        {actor.character}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: pixelHorizontal(100),
    marginRight: pixelHorizontal(12),
  },
  image: {
    width: pixelHorizontal(100),
    height: pixelVertical(150),
    borderRadius: pixelModerado(8),
    marginBottom: pixelVertical(4),
  },
  name: {
    fontSize: pixelModerado(12),
    fontWeight: '600',
  },
  character: {
    fontSize: pixelModerado(11),
    color: COLORS.icon,
  },
});
