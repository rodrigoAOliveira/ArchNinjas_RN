import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Center, HelloText, HomeIcon} from "../../assets/styles/styles";
import Colors from "../../assets/styles/colors";
import NinjaControler from "./controller";
import {NinjaList} from './styles'
import {finalize} from "rxjs/operators";
import Container from "../../components/Container/view";

export default class NinjaPage extends Component {
  _controller = new NinjaControler();
  state = {
    ninjas: [],
    loading: false,
  };

  _loadNinjas() {
    this._showLoading();
    this._controller
      .getNinjas()
      .pipe(finalize(this._hideLoading.bind(this)))
      .subscribe(ninjas => this.setState({
        ...this.state,
        ninjas
      }));
  }

  _saveNinjas() {
    const {ninjas} = this.state;

    this._controller
      .saveNinjas(ninjas)
      .subscribe(() => console.tron.log('Success inserting ninjas'),
        error => console.tron.log('Fail inserting ninjas', error));
  }

  _showLoading() {
    this.setState({
      ...this.state,
      loading: true
    })
  }

  _hideLoading() {
    this.setState({
      ...this.state,
      loading: false
    })
  }

  _renderNinja({item}) {
    return (<Text> {item.name} </Text>)
  }

  render() {
    const {ninjas} = this.state;

    return <Center>
      <TouchableOpacity onPress={this._loadNinjas.bind(this)}>
        <HomeIcon name='star' size={150} color={Colors.primary}/>
      </TouchableOpacity>
      <HelloText> Hello Ninjas </HelloText>

      <Container style={{maxHeight: 270}} hide={ninjas.length === 0}>
        <NinjaList
          data={ninjas}
          renderItem={this._renderNinja.bind(this)}
        />
        <TouchableOpacity onPress={this._saveNinjas.bind(this)}>
          <HelloText> Save </HelloText>
        </TouchableOpacity>
      </Container>
    </Center>;
  }
}
