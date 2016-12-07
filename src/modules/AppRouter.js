/*eslint-disable react/prop-types*/

import React from 'react';
import CityViewContainer from './city/CityViewContainer';
import LocationViewContainer from './location/LocationViewContainer';
import ProfileViewContainer from './profile/ProfileViewContainer';
import InfoView from './info/InfoView';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const route = props.scene.route;
  const key = route.key;

  if (key === 'City') {
    return <CityViewContainer />;
  }

  if (key === 'Location') {
    return (
      <LocationViewContainer
        place={route.place}
      />
    );
  }

  if (key === 'Profile') {
    return <ProfileViewContainer />;
  }

  if (key === 'Info') {
    return <InfoView />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
