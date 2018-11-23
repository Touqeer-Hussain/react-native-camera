import React from 'react';
import { Text, View, TouchableOpacity, Switch } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

class QuizPage extends React.Component {

    static navigationOptions = {
        title: 'Quiz',
      }; 
    constructor(props){
        super(props);
        this.state = {
            res: null,
            val: false,
            count: 0,
            score: 0

        };

}

componentDidMount(){
    fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean`).then(res => {
        res.json().then(las => {
            this.setState({
                res: las
            })    
        })
    })
}
toggleSwitch1 = (value) => {
    this.setState({val: value})
    console.log('Switch 1 is: ' + value)
 }

renderResult(){
    const { score } = this.state
    return (
        <View style={{ flex: 1 }}>
            <Text>You Score is {score} out of {10}</Text>
            <TouchableOpacity
                
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  borderRadius: 10,
                  borderWidth: 2,
                  backgroundColor: '#00e5ff',
                  padding: 10
                
                  
                }}
                onPress={() => this.props.navigation.navigate('Home', {title: 'Home'})}>
                <View style={{alignItems: 'center', padding: 10}}>
                <Text
                  style={{ fontSize: 18, color: 'black' }}>
                  Try Again
                </Text>
                </View>
                
              </TouchableOpacity>
        </View>
    )
}

renderQuest(){
    const { res, val, count, score } = this.state;
    if(res){
        console.log(res.results[0])
    
    
    return (
        <View style={{ flex: 1 }}>
            <Text style={{fontSize: 20}}>
                Q{count + 1}: {res.results[count].question}
            </Text>
            <Switch style={{flex: 0.5}}
                onValueChange={this.toggleSwitch1}
                trackColor={{false: 'red', true: 'green'}}
                value = {val}/>
         <TouchableOpacity
                
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                  borderRadius: 10,
                  borderWidth: 2,
                  backgroundColor: count == 9 ? '#FFF' :  '#00e5ff',
                  padding: 10
                
                  
                }}
                onPress={() => {
                    if(count < 9 ){
                        var chk = val.toString();
                        console.log(res.results[count].correct_answer.toLocaleLowerCase(), val)
                        if(res.results[count].correct_answer.toLocaleLowerCase() ==  chk){
                            this.setState({
                                score: score + 1
                            })
                        }
                        
                        this.setState({count: count + 1})
                    }else{
                        console.log('Done', score)
                        
                    }

                    }
                    

                }
                >
                <View style={{alignItems: 'center', padding: 10}}>
                <Text
                  style={{ fontSize: 18, color: 'black' }}>
                  {count == 9 ? 'Done' : 'Next'}
                </Text>
                </View>
                
              </TouchableOpacity>
        </View>
    )
}
}


  render() {
      return (
        <View style={{ flex: 1 }}>
            
                {this.state.count < 9 ? this.renderQuest() : this.renderResult()}
            
        </View>
      );
    }
  }

export default QuizPage;

