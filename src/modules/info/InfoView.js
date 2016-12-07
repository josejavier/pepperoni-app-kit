import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

const InfoView = React.createClass({
  renderHeader() {
    const pepperoniImage = require('../../../images/pepperoni.png');
    return (
        <View style={styles.header}>
          <Image source={pepperoniImage} style={styles.logo}/>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Pepperoni</Text>
            <Text style={styles.headerSubtitle}>Sample App</Text>
          </View>
        </View>);
  },
  renderBody() {
    return (
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Pepperoni is a free and open-source blueprint
            to kickstart your mobile product development for Android and iOS,
            powered by React Native
          </Text>
        </View>);
  },
  renderFooter() {
    const futuriceImage = require('../../../images/futurice.png');
    return (
        <View style={styles.footer}>
          <Text style={styles.bodyText}>
            Brought to you by
          </Text>
          <Image source={futuriceImage} style={styles.futurice}/>
        </View>);
  },
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8F4F5'
  },
  header: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pepperoniLogo: {
    height: 80,
    width: 80,
    margin: 10
  },
  futuriceLogo: {
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  headerTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'System'
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'System'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  bodyText: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'System'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default InfoView;
