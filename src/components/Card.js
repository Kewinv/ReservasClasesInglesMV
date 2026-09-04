import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import EtiquetaNivel from './EtiquetaNivel';
import { formatearPrecio } from '../data/clases';
import { spacing, color, typography, radius } from '../theme';

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.contenedor}>
      <View style={styles.contenido}>
        <EtiquetaNivel nivel={clase.nivel} />

        <Text style={styles.titulo}>{clase.titulo}</Text>

        <Text style={styles.descripcion} numberOfLines={2}>
          {clase.descripcion}
        </Text>

        <View style={styles.detalleFila}>
          <Text style={styles.detalle}>{clase.profesor.nombre}</Text>
          <Text style={styles.detalle}>{clase.duracion} min</Text>
        </View>

        <View style={styles.detalleFila}>
          <Text style={styles.detalle}>{clase.modalidad}</Text>
          <Text style={styles.detalle}>Cupos: {clase.cupos}</Text>
        </View>

        <Text style={styles.precio}>
          {formatearPrecio(clase.precio)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: color.superficie,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.border,
  },

  contenido: {
    padding: spacing.md,
  },

  titulo: {
    ...typography.subtitulo,
    marginBottom: spacing.sm,
  },

  descripcion: {
    color: color.textoSuave,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },

  detalleFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },

  detalle: {
    color: color.textoSuave,
    fontSize: 13,
    fontWeight: '600',
  },

  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primario,
    marginTop: spacing.sm,
  },
});
