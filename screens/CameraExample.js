import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';



class CameraExample extends React.Component {
 
  static navigationOptions = {
    title: 'Camera Trivia App',
  };  


    constructor(props){
      super(props);
      this.state = {
        face: true,

        //
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
      };
    }
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}
           onFacesDetected={(obj) => {
              if(obj.faces.length > 0){
                this.setState({
                  face: false
                })
              }else{
                this.setState({
                  face: true
                })
              }
           }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                paddingHorizontal: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                disabled={this.state.face}
                style={{
                  flex: 0.4,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  backgroundColor: this.state.face ? '#FFF' :  '#00e5ff',
                  padding: 10
                
                  
                }}
                onPress={() => this.props.navigation.navigate('QuizPage', {title: 'Quiz'})}
                >
                <View style={{alignItems: 'center', padding: 10}}>
                <Text
                  style={{ fontSize: 18, color: 'black' }}>
                  Take Photo
                </Text>
                </View>
                
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraExample;