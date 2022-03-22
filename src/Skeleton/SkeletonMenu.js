import { View, Animated, StyleSheet, Easing} from 'react-native';
import styles from '../../app.css';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect} from 'react';

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
        outputRange: [-500, 500]
    })

    const loop = []
    for (let i = 0; i < 14; i++) {
        loop.push(i)
    }

    return (
        <>
        <View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View>
        <View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View><View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View><View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View><View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#c4c4c4', '#c4c4c4', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View><View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View><View style={styles.MenuskeletonParent}>
                <AnimateLG
                    colors={['#8f8f8f', '#dddd', '#dddd', '#8f8f8f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
        </View>
        </>
    )
}

