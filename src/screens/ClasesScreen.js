import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import { spacing, color, typography } from '../theme';
import { clases } from '../data/clases';

export default function ClasesScreen({ navigation }) {
  const { columns, paddingHorizontal } = useResponsive();
  const [nivel, setNivel] = useState('Todos');

  return (
    <View>
      <View>
        <Text>Aplicación de clases de inglés</Text>

        <View>
            <Ionicons name="search" size={20}/>
            <TextInput
                placeholder="Buscar por nivel o profesor"
                values='{nivel}'
                onChangeText={setNivel}
                autocorrect={false}
            />
        </View>
      </View>

      <View>
      </View>
    </View>
  );
}