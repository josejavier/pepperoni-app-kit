import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image
} from 'react-native';

export default React.createClass({
  displayName: 'TabBarButton',
  propTypes: {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  },

  render() {
    const Label = ({value}) => {
      const labelValue = Platform.OS === 'android' ? value.toUpperCase() : value;
      return <Text style={[styles.title, this.props.isSelected && styles.selectedTitle]}>{labelValue}</Text>;
    };

    var iconTab = (<View/>);
    if (Platform.OS === 'ios') {
      var iconImage = null;
      if (this.props.text === 'Where to eat') {
        iconImage = (require('../../images/icon-eat.png'));
      } else if (this.props.text === 'Profile') {
        iconImage = (require('../../images/icon-profile.png'));
      } else {
        iconImage = (require('../../images/icon-info.png'));
      }
      iconTab = (<Image style={[styles.icon, this.props.isSelected && styles.iconSelected]}
        source={iconImage} />);
    }

    return (
      <TouchableOpacity
        onPress={this.props.action}
        style={[styles.button, this.props.isSelected && styles.selectedButton]}>
        {iconTab}
        <Label value={this.props.text}/>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: '#eee'
      },
      android: {
        backgroundColor: '#39babd'
      }
    })
  },
  icon: {
    height: 25,
    width: 25
  },
  iconSelected: {
    tintColor: '#39babd'
  },
  selectedButton: {
    ...Platform.select({
      android: {
        borderBottomColor: 'white',
        borderBottomWidth: 3
      }
    })
  },
  title: {
    fontFamily: 'System', //San Francisco for iOS & Roboto for Android
    ...Platform.select({
      ios: {
        color: 'black',
        fontSize: 10
      },
      android: {
        color: 'white'
      }
    })
  },
  selectedTitle: {
    ...Platform.select({
      ios: {
        color: '#39babd'
      }
    })
  }
});
