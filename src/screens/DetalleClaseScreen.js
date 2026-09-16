import React, { useLayoutEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useResponsive from "../hooks/useResponsive";
import { colors, spacing, typography, radius } from "../theme";
import { formatearPrecio } from "../data/clases";

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos)
    const { isTablet } = useResponsive();

    const realizarReserva = () => {
        if(cuposDisponibles <= 0){
            Alert.alert(
                'Sin cupos',
                'Esta clase ya no tiene cupos disponibles.'
            );
            return;
        }
    
            Alert.alert(
                'Confirmar reserva',
                'Desea realizar la reserva?',
                [
                    {
                        text: 'No',
                        style: 'cancel',
                        onPress: ()=>{
                            Alert.alert(
                                'Reserva cancelada',
                                'Se ha cancelado la reserva'
                            );
                        },
                    },
                    {
                        text: 'Si',
                        onPress: () =>{
                            setCuposDisponibles((cuposActuales) => cuposActuales -1);

                            Alert.alert(
                                'Reserva realizada',
                                'La reserva se ha realizado correctamente'
                            );
                        },
                    },
                ]
            );
        }

    useLayoutEffect(() => {
        navigation.setOptions({ title: clase.titulo });
    }, [navigation, clase.titulo]);

    return (
        <View style={styles.pantalla}>
            <ScrollView
                contentContainerStyle={[styles.contenidoScroll, { paddingBottom: 120 + insets.bottom }]}
                showsVerticalScrollIndicator={false}
            >
                <Image
                    source={{uri: clase.imagen}}
                    style={[styles.portada, { height: isTablet ? 300 : 200 }]}
                    resizeMode="cover"
                />

                <View style={styles.contenido}>
                    <Text style={styles.titulo}>{clase.titulo}</Text>

                    <View style={styles.profesor}>
                        <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                        <View>
                            <Text style={styles.etiqueta}>Profesor</Text>
                            <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                        </View>
                    </View>

                    <Text style={styles.seccion}>Descripción</Text>
                    <Text style={styles.descripcion}>{clase.descripcion}</Text>

                    <View style={styles.datos}>
                        <View style={styles.dato}>
                            <Ionicons name="time-outline" size={20} color={colors.primario} />
                            <Text style={styles.datoValor}>{clase.duracion} min</Text>
                        </View>
                        <View style={styles.dato}>
                            <Ionicons name="people-outline" size={20} color={colors.primario} />
                            <Text style={styles.datoValor}>{cuposDisponibles} cupos</Text>
                        </View>
                    </View>

                    <Text style={styles.seccion}>Horario</Text>
                    <Text style={styles.descripcion}>{clase.horarios.join(', ')}</Text>
                </View>
            </ScrollView>

            <View style={[styles.barra, { paddingBottom: Math.max(spacing.lg, insets.bottom) }]}>
                <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                <Pressable
                    style={({ pressed }) => [styles.botonReserva, pressed && styles.botonPresionado]}
                    onPress={realizarReserva}
                >
                    <Text style={styles.textoBoton}>Realizar reserva</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  contenidoScroll: { flexGrow: 1 },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  contenido: { padding: spacing.md },
  titulo: { ...typography.subtitulo, marginBottom: spacing.md },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  etiqueta: { fontSize: 13, color: colors.textoSuave, marginBottom: 2 },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  seccion: { ...typography.subtitulo, fontSize: 18, marginTop: spacing.sm },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
  botonReserva: {
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  botonPresionado: { opacity: 0.7 },
  textoBoton: { color: colors.superficie, fontWeight: '800' },
});
