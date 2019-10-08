import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const StyledColorIndicator = styled.View`
	width: 10;
	height: 40;
	margin-right: 10;
`;

const ColorIndicator = ({ color }) => (
	<StyledColorIndicator style={{ backgroundColor: color }} />
);

ColorIndicator.propTypes = {
	color: PropTypes.string.isRequired
};

export default ColorIndicator;