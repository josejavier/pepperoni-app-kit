import * as CityState from './CityState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

const CityView = React.createClass({
  propTypes: {
    office: PropTypes.string.isRequired,
    place: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const cities = require('../../data/sampleLocations.json'); // City offices
    return {
      dataSource: ds.cloneWithRows(cities)
    };
  },

  selectCity(city) {
    this.props.dispatch(CityState.selectCity(city));
  },

  renderRow(rowData) {
    return (
      <View style={styles.cityCard}>
        <Image source={{uri: rowData.picture}}>
          <TouchableOpacity style={styles.cityCard}
            onPress={() => {
              if (!this.props.loading) { // To avoid multiples onPress events
                this.selectCity(rowData.city);
              }
            }}
          >
            <Text style={styles.cityText}>
              {rowData.city.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  },

  render() {
    var spinner = this.props.loading
      ? (<ActivityIndicator style={styles.spinner} size='large' color='white'/>)
      : (<View/>);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.swiper}
          vertical={true}
          alwaysBounceVertical={false}
          horizontal={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          bounces={false}
          loop={false}
        />
        {spinner}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  swiper: {
    flex: 1
  },
  cityCard: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    height: 200,
    backgroundColor: 'rgba(0,0,0,.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'System', //San Francisco for iOS & Roboto for Android
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8F4F5'
  }
});

export default CityView;
