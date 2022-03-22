import { View, Animated, StyleSheet, Easing} from 'react-native';
import styles from '../../app.css';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';

export default function SkeletonComp() {

    const AnimateLG = Animated.createAnimatedComponent(LinearGradient)

    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.inOut.inOut,
                useNativeDriver: true,
            })
        ).start();
    })

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-180, 180]
    })

    return (
        <View style={styles.skeletonParent}>
            <View style={styles.skeleton}>
                <AnimateLG
                    colors={['#fff', '#b0b0b0', '#a0a0a0', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0}}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
            </View>
            <View style={styles.skeleton}>
               <AnimateLG
                    colors={['#fff', '#b0b0b0', '#a0a0a0', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0}}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
            </View>
            <View style={styles.skeleton}>
                <AnimateLG
                    colors={['#fff', '#b0b0b0', '#a0a0a0', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0}}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
            </View>
            <View style={styles.skeleton}>
                <AnimateLG
                    colors={['#fff', '#b0b0b0', '#a0a0a0', '#fff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0}}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
            </View>

        </View>
    )
}

