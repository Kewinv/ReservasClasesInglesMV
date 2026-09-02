import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { spacing, color } from '../theme';

export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    backgroundColor: color.primario,
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    marginBottom: spacing.sm,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
