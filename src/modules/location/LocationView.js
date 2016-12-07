import * as CityState from '../city/CityState';
import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
const window = Dimensions.get('window');

const LocationView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    office: PropTypes.string.isRequired,
    place: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  },

  onNextPress() {
    this.props.dispatch(CityState.retryPlace(this.props.office, this.props.place));
  },

  render() {
    const Label = ({value}) => {
      const labelValue = Platform.OS === 'android' ? value.toUpperCase() : value;
      return <Text style={styles.buttonText}>{labelValue}</Text>;
    };

    var spinner = this.props.loading
      ? (<ActivityIndicator style={styles.spinner} size='large' color='white'/>)
      : (<View/>);

    const url = 'https://maps.google.com?q=' + this.props.place.latitude + ',' + this.props.place.longitude;

    const iconAddress = (Platform.OS === 'ios')
      ? require('../../../images/icon-marker-ios.png')
      : require('../../../images/icon-marker-android.png');
    const iconType = (Platform.OS === 'ios')
      ? require('../../../images/icon-food-ios.png')
      : require('../../../images/icon-food-android.png');
    const iconDistance = (Platform.OS === 'ios')
      ? require('../../../images/icon-distance-ios.png')
      : require('../../../images/icon-distance-android.png');
    const iconExternal = (Platform.OS === 'ios')
      ? require('../../../images/icon-external-ios.png')
      : require('../../../images/icon-external-android.png');

    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.place.picture}}
          style={styles.image}
        />
        <View style={styles.containerTitle}>
          <Text numberOfLines={2} style={styles.title}>
            {this.props.place.name}
          </Text>
        </View>
        <View style={styles.containerDescription}>
          <Text numberOfLines={3} style={styles.text}>
            {this.props.place.description}
          </Text>
        </View>
        <View style={styles.separator}/>
        <TouchableOpacity style={styles.containerField}
          onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))}>
          <Image style={styles.icon} source={iconAddress} />
          <Text
            numberOfLines={2}
            style={styles.text}
          >
            {this.props.place.address}
          </Text>
          <Image style={styles.icon} source={iconExternal} />
        </TouchableOpacity>
        <View style={styles.separator}/>
        <View style={styles.containerField}>
          <Image style={styles.icon} source={iconType} />
          <Text numberOfLines={1} style={styles.text}>
            {this.props.place.type}
          </Text>
        </View>
        <View style={styles.separator}/>
        <View style={styles.containerField}>
          <Image style={styles.icon} source={iconDistance} />
          <Text numberOfLines={1} style={styles.text}>
            {this.props.place.distance} away from the office
          </Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(url).catch(err => console.error('An error occurred', err))}>
            <Label value='Yeah, take me there!'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onNextPress}>
            <Label value='Nah, try another one'/>
          </TouchableOpacity>
        </View>
        {spinner}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  containerTitle: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39babd'
  },
  containerDescription: {
    flex: 1,
    flexDirection: 'row',
    width: window.width,
    alignItems: 'center',
    padding: 20
  },
  containerField: {
    flex: 1,
    flexDirection: 'row',
    width: window.width,
    alignItems: 'center',
    padding: 10
  },
  separator: {
    backgroundColor: '#39babd',
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width - 100,
    height: 1
  },
  title: {
    fontSize: 18,
    fontFamily: 'System',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'System',
    color: 'black',
    overflow: 'hidden'
  },
  icon: {
    height: 24,
    width: 24,
    margin: 5
  },
  image: {
    height: 180,
    width: window.width
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    height: 20
  },
  button: {
    backgroundColor: '#39babd',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'System',
    color: 'white',
    padding: 5
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,.8)'
  }
});

export default LocationView;
