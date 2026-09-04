import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import { spacing, colors, typography, radius } from '../theme';
import { NIVELES } from '../data/clases';
import NivelFiltro from '../components/NivelFiltro';

export default function ClasesScreen() {
  const insets = useSafeAreaInsets();
  const { paddingHorizontal } = useResponsive();
  const [nivel, setNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  return (
    <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <View style={{ paddingHorizontal }}>
        <Text style={typography.titulo}>Aplicación de clases de inglés</Text>

        <View style={style.buscador}>
          <Ionicons name="search" size={20} color={colors.textoSuave} />

          <TextInput
            placeholder="Buscar por nivel o profesor"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            autoComplete="off"
            style={style.input}
          />

          {busqueda.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.textoSuave}
              onPress={() => setBusqueda('')}
            />
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={style.filtros}
        >
          {NIVELES.map((item) => (
            <NivelFiltro
              key={item}
              etiqueta={item}
              activo={item === nivel}
              onPress={() => setNivel(item)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.texto,
    paddingVertical: 0,
  },
  filtros: {
    paddingTop: spacing.xs,
  },
});
