import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return(
		<View style={styles.containerStyle}>
		{props.children}
		</View>
	);
};

const styles = {
	containerStyle:{
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#23213F',
		justifyContent: 'center',
		flexDirection: 'row',
		borderColor: '#2A2948',
		position: 'relative'
	}
};
export {CardSection};