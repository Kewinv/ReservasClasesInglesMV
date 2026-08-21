import react from 'react';
import {view, text, pressable, stylesheet} from 'react-native'
import EtiquetaVivel from './EtiquetaNivel';
import {spacing, color, typography} from '../theme';
import{} from '../data/clases'

export default function Card(){clase, onPress}) {
    return(
        <pressable onPress={onPress}>
            <image source={{uri: clase.image}}
            <view>
                <EtiquetaVivel nivel={clase.nivel}/>
            
            </view>
        </pressable>
    )}
    