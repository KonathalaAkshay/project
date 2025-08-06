import React from 'react';
import {useState,useEffect} from 'react';
import { Center, Image, Pressable } from 'native-base';
import { Dimensions, Linking } from 'react-native';


const { width, height } = Dimensions.get('window');

const OpenScreen = () => {
  const [, setShowSplash] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);
  return <Center flex={1} bg="white">
              <Pressable
                onPress={() => Linking.openURL('https://frontend.invotrx.com')}
              >
                <Image
                  source={{
                    uri: 'https://frontend.invotrx.com/static/media/logo.e7351a94c10df23dd703.jpeg',
                  }}
                  alt="Ri8fit Logo"
                  width={width}
                  height={height}
                  resizeMode="contain"
                />
              </Pressable>
            </Center>;
};

export default OpenScreen;
