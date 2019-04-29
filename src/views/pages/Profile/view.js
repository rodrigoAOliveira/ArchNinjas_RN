import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Center, HelloText, HomeIcon} from "../../assets/styles/styles";
import Colors from "../../assets/styles/colors";

export default class ProfilePage extends Component {
  state = {

  };

  render() {
    return <Center>
      <HomeIcon name='star' size={150} color={Colors.primary}/>
      <HelloText> Hello Ninjas </HelloText>


      <Text>User Data Json: </Text>

    </Center>;
  }
}
