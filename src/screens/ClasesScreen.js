import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import useResponsive from '../hooks/useResponsive';
import { spacing, colors, typography, radius } from '../theme';
import { CLASES, NIVELES } from '../data/clases';
import NivelFiltro from '../components/NivelFiltro';
import { Card } from 'react-native-paper';
import EstadoVacio from '../components/EstadoVacio';

export default function ClasesScreen() {
  const insets = useSafeAreaInsets();
  const {columnas, paddingHorizontal} = useResponsive();

  const [nivel, setNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const resultados = useMemo (() =>{
    const textoBusqueda = busqueda.trim().toLowerCase();
    return CLASES.filter((clase)=>{
      const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
      const coincideTextoBusqueda = textoBusqueda === '' ||
       clase.titulo.toLowerCase().includes(textoBusqueda)||
       clase.profesor.nombre.toLowerCase().includes(textoBusqueda)
       return coincideNivel && coincideTextoBusqueda;
    });

  },[nivel, busqueda]);

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
        
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Card
              clase={item}
              onPress={()=> navigation.navigate('DetalleClase', {clase: item})}
            />
          )}
          numColumns={columnas}
          showsVerticalScrollIndicator = {false}
          contentContainerStyle = {{paddingHorizontal,
             flexGrow: 1,
             paddingBottom: spacing.xl
            }}
          ListEmptyComponent={
            <EstadoVacio
              icono="search-outline"
              titulo="No encontramos valores de busqueda"
              Mensaje="Prueba con otro valor de busqueda, nombre del docente o cambia las palabras"
              textoAccion="Quitar filtros"
              onAction={()=>{
                setNivel('Todos');
                setBusqueda('')
              }}
            />
          }
        />
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
