import React from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes} from 'react-native'

const Container = (props) => {
  const {children, hide, style} = props;

  if (hide) return null;

  return (
    <View {...props} style={style}>
      {children}
    </View>
  );
};

Container.propTypes = {
  hide: PropTypes.bool,
  style: ViewPropTypes.style,
};

export default Container;
