import React, {useState, useEffect, useCallback, useMemo, createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservasProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // cargar las reservas que tengo guardadas, si no tengo nada me devuelve un arreglo vacio
    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                
                }

            } catch (error) {
                console.log('Error cargando reservas', error);
            } finally {
                setCargando(false);
            }
        };
        cargar();

        
    }, []);
}