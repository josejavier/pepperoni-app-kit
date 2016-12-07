import {connect} from 'react-redux';
import LocationView from './LocationView';

export default connect(
  state => ({
    office: state.getIn(['city', 'value']),
    loading: state.getIn(['city', 'loading']),
    place: state.getIn(['city', 'place'])
  })
)(LocationView);
