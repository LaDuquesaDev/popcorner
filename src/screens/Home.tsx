import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Movie } from '../types/interfaces';
import { MovieCard } from '../components/MovieCard';
import {
  pixelHorizontal,
  pixelVertical,
  pixelModerado,
} from '../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';
import { FilterInput } from '../components/FilterInput';
import { CustomSpinner } from '../components/CustomSpinner';
import { COLORS } from '../constants/colors';
import { useHome } from '../hooks/useHome';

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    filterLetter,
    setFilterLetter,
    handleFilterSubmit,
    handleClearFilter,
    isFiltering,
    filteredMovies,
    isLoading,
    isError,
    movies,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useHome();

  const navigateToDetails = (movie: Movie) => {
    navigation.navigate('MovieDetails', {
      id: movie.id,
      title: movie.title,
    });
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={() => navigateToDetails(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FilterInput
        value={filterLetter}
        onChangeText={setFilterLetter}
        onSubmit={handleFilterSubmit}
      />

      {isFiltering && (
        <View style={styles.filterInfo}>
          <Text style={styles.filterText}>
            Showing movies starting with "{filterLetter.toUpperCase()}" ({filteredMovies.length} found)
          </Text>
          <Text style={styles.clearFilter} onPress={handleClearFilter}>
            Clear filter
          </Text>
        </View>
      )}

      {isLoading ? (
        <View style={styles.centered}>
          <CustomSpinner />
        </View>
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error loading movies</Text>
        </View>
      ) : isEmpty ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {isFiltering
              ? `No movies found starting with "${filterLetter.toUpperCase()}"`
              : 'No movies found'
            }
          </Text>
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
            if (!isFiltering && hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundInput,
    marginTop: pixelVertical(-30),
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
  errorText: {
    fontSize: pixelModerado(16),
    color: COLORS.error,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: pixelModerado(16),
    color: COLORS.icon,
    textAlign: 'center',
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pixelHorizontal(16),
    paddingVertical: pixelVertical(8),
    backgroundColor: COLORS.filterInfoBackground,
  },
  filterText: {
    flex: 1,
    fontSize: pixelModerado(12),
    color: COLORS.buttonActive,
  },
  clearFilter: {
    fontSize: pixelModerado(12),
    color: COLORS.buttonActive,
    fontWeight: '600',
    marginLeft: pixelHorizontal(8),
  },
});
