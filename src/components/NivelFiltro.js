import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { spacing, color, radius } from '../theme';

export default function NivelFiltro({ etiqueta, activo, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        activo && styles.chipActivo,
        pressed && styles.chipPresionado,
      ]}
    >
      <Text style={[styles.texto, activo && styles.textoActivo]}>{etiqueta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: color.superficie,
    borderWidth: 1,
    borderColor: color.borde,
    marginRight: spacing.sm,
  },
  chipActivo: {
    backgroundColor: color.primario,
    borderColor: color.primario,
  },
  chipPresionado: {
    opacity: 0.7,
  },
  texto: {
    fontSize: 13,
    fontWeight: '600',
    color: color.textoSuave,
  },
  textoActivo: {
    color: '#FFFFFF',
  },
});
