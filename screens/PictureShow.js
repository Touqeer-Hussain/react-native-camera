import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class PictureShow extends React.Component {
  state = {
  };


  render() {
      return (
        <View style={{ flex: 1 }}>
            <Text>
                Pictures
            </Text>
        </View>
      );
    }
  }

