import { View, Text } from 'react-native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import SliderBarData from './SliderBarData';
import styles from '../../app.css';
import { useState } from 'react';

export default function Navbar({setButton}) {
    
    const openMenu = () => {
        setButton(true)
    }

    return (
        <View>
            <View>
                <AntIcons name="menu-fold" size={26} color={"#feffff"} onPress={()=> openMenu()}/>
            </View>
        </View>
    )
}