import React from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { Flex, Text } from 'native-base';

const TopNavBar = () => {
  return (
    <View style={styles.navBar}>
      <Flex direction="row" justify="space-between" align="center" px={4} py={4} marginTop={5}>
        <Text fontSize="25px" bold color="white">
          RI8FIT
        </Text>
        <Pressable onPress={() => Alert.alert('Profile')}>
          <Text fontSize="25px" color="white">👤</Text>
        </Pressable>
      </Flex>
    </View>
  ); 
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#9989',
  },
});

export default TopNavBar;
