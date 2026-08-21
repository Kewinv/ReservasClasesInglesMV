import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';

import EtiquetaNivel from './EtiquetaNivel';
import { spacing, color, typography } from '../theme';

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.contenedor}>
      <Image
        source={{ uri: clase.image }}
        style={styles.imagen}
      />

      <View style={styles.contenido}>
        <EtiquetaNivel nivel={clase.nivel} />

        <Text style={styles.titulo}>
          {clase.titulo}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    titulo: {fontSize: 18, fontWeight: 'bold', marginBottom: spacing.sm},
    contenedor: {
    backgroundColor: color.fondo,
    borderRadius: 10,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },

  imagen: {
    width: '100%',
    height: 200,
  },

  contenido: {
    padding: spacing.md,
  },

  titulo: {
    ...typography.titulo,
    marginBottom: spacing.sm,
  },
});

*// precio, nivel, nombre del docente    