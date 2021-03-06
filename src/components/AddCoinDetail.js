import React from 'react';
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { CardSection } from './common';

const AddCoinDetail = ({ coinProp, check, onChecked }) => {
  // Destructure references for nicer code
  const { name, symbol } = coinProp; // receive objects from api
  const {
    headerContentLeftStyle,
    headerContentRightStyle,
    headerTextStyle,
  } = styles;

  return (
    <CardSection>
      <View style={headerContentLeftStyle}>
        <Text style={headerTextStyle}>{name}</Text>
        <Text style={styles.textSymbolStyle}>{symbol}</Text>
      </View>
      <View style={headerContentRightStyle}>
        <CheckBox
          checked={check}
                    // action to add to reducer for firebase pushing
          onPress={onChecked}
          containerStyle={{ borderColor: 'white', backgroundColor: 'white' }}
        />
      </View>
    </CardSection>
  );
};

const styles = {
  headerContentLeftStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 15,
  },
  headerContentRightStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#434343',
  },
  textSymbolStyle: {
    color: '#555974',
  },
};

export default AddCoinDetail;
