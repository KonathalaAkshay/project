import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Box } from 'native-base';
import { ProgressBar } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default function ResumeLoader() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Scanning line animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Shimmer effect
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Dots animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(dotsAnim, {
        toValue: 3,
        duration: 1500,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 230], // document height
  });

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const dots = dotsAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ['.', '..', '...', ''],
  });

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="#f9fafb">
      {/* Circle border */}
      <View style={styles.circle}>
        {/* Document frame */}
        <Animated.View
          style={[styles.docFrame, { transform: [{ scale: pulseAnim }] }]}
        >
          {/* Fake text lines */}
          {Array.from({ length: 7 }).map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.textLine,
                {
                  width: `${65 + (i % 3) * 15}%`,
                  transform: [{ translateX: shimmerTranslate }],
                },
              ]}
            />
          ))}

          {/* Scanning line */}
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY }] }]}
          />
        </Animated.View>
      </View>

      {/* Processing text */}
      <Text style={styles.title}>
        Processing resume
        <Animated.Text>{dots}</Animated.Text>
      </Text>

      <Text style={styles.subtitle}>Extracting structured data</Text>

      {/* Progress bar */}
      <View style={{ width: '60%', marginTop: 20 }}>
        <ProgressBar
          progress={0.5}
          color="#3b82f6"
          style={{ height: 6, borderRadius: 5 }}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 6,
    borderColor: 'rgba(59,130,246,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  docFrame: {
    width: 180,
    height: 230,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 6,
    overflow: 'hidden',
  },
  textLine: {
    height: 12,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    marginTop: 16,
    marginHorizontal: 'auto',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 24,
    backgroundColor: 'rgba(59,130,246,0.25)',
  },
  title: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
});
