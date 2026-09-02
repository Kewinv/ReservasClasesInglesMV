import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import { spacing, color, typography } from '../theme';
import { CLASES, NIVELES } from '../data/clases';

export default function ClasesScreen() {
  const { columns, paddingHorizontal } = useResponsive();
  const insets = useSafeAreaInsets();
  const [nivel, setNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const textoBusqueda = busqueda.trim().toLowerCase();
  const clasesFiltradas = CLASES.filter((clase) => {
    const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
    const coincideBusqueda =
      textoBusqueda.length === 0 ||
      clase.titulo.toLowerCase().includes(textoBusqueda) ||
      clase.nivel.toLowerCase().includes(textoBusqueda) ||
      clase.profesor.nombre.toLowerCase().includes(textoBusqueda);

    return coincideNivel && coincideBusqueda;
  });

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <View style={[styles.contenedor, { paddingHorizontal }]}>
        <Text style={styles.titulo}>Aplicación de clases de inglés</Text>
        <Text style={styles.subtitulo}>Encuentra una clase por nivel o profesor.</Text>

        <View style={styles.buscador}>
          <Text style={styles.iconoBusqueda}>Buscar</Text>
          <TextInput
            placeholder="Nivel, clase o profesor"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            autoComplete="off"
            style={styles.input}
          />

          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda('')} style={styles.botonLimpiar}>
              <Text style={styles.textoLimpiar}>X</Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtros}
        >
          {NIVELES.map((item) => (
            <NivelFiltro
              key={item}
              etiqueta={item}
              activo={nivel === item}
              onPress={() => setNivel(item)}
            />
          ))}
        </ScrollView>

        <FlatList
          data={clasesFiltradas}
          key={columns}
          numColumns={columns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.item, columns > 1 && styles.itemGrid]}>
              <Card clase={item} />
            </View>
          )}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.sinResultados}>No hay clases con ese filtro.</Text>
          }
        />
      </View>
    </View>
  );
}

function useResponsive() {
  const { width } = useWindowDimensions();
  const columns = width >= 720 ? 2 : 1;
  const paddingHorizontal = width >= 720 ? spacing.xl : spacing.md;

  return { columns, paddingHorizontal };
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: color.fondo,
  },
  contenedor: {
    flex: 1,
  },
  titulo: {
    ...typography.titulo,
    marginBottom: spacing.xs,
  },
  subtitulo: {
    color: color.textoSuave,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.superficie,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  iconoBusqueda: {
    color: color.textoSuave,
    fontSize: 12,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: color.texto,
  },
  botonLimpiar: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoLimpiar: {
    color: color.textoSuave,
    fontWeight: '800',
  },
  filtros: {
    paddingBottom: spacing.md,
  },
  lista: {
    paddingBottom: spacing.xl,
  },
  item: {
    flex: 1,
  },
  itemGrid: {
    marginRight: spacing.md,
  },
  sinResultados: {
    color: color.textoSuave,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
