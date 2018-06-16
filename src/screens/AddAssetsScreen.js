import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Spinner } from '../components/common';
import { coinChecked, coinUnchecked, assetSaved, assetChanged } from '../actions';
import AddAssetsDetail from '../components/AddAssetsDetail';

class AddAssetsScreen extends Component {
    state = { loading: false, coins: [] }

    componentWillMount() {
      // ASYNC HTTP Request to get coins from the API.
      this.setState({ loading: true });
      fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')
        .then(response => response.json())
        .then(responseData => this.setState({ coins: responseData }))
        .then(() => this.setState({ loading: false }));
    }

    onButtonPress() {
      const { coins } = this.props;
      this.props.assetSaved({ coins });
      Actions.pop();
      Actions.pop();
    }

    // Render all the coins that was fetched from the API.
    renderCoins() {
      const { checked } = this.props;
      return this.state.coins.map(coin =>
        (checked.indexOf(coin.symbol) > -1 ?
          <AddAssetsDetail
            key={coin.name}
            check={checked.indexOf(coin.symbol) > -1}
            coinProp={coin}
            onChangeText={val => this.props.assetChanged({ coin: coin.symbol, value: val })}
          /> : null));
      // coinProp variable can be named anything as long as we use that name in other functions
    }

    render() {
      if (this.state.loading) {
        return (
          <View style={styles.viewContainer}>
            <View style={{ flex: 1, height: 250 }}>
              <Spinner />
            </View>
          </View>
        );
      }

      return (
        <View style={styles.viewContainer}>
          <View style={{ backgroundColor: 'white' }}>
            <ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.onButtonPress()}
                >
                  <LinearGradient
                    style={styles.addAssetContainer}
                    colors={['#FF5637', '#FF444A', '#FF2D68']}
                  >
                    <Text style={styles.addButtonText}>Finish</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {this.renderCoins()}
            </ScrollView>
          </View>
        </View>
      );
    }
}

const styles = {
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAssetContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 300,
    height: 45,
    padding: 15,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
};

const mapStateToProps = ({ portfolio }) => {
  const { checked, coins } = portfolio;

  return {
    checked, coins,
  };
};
export default connect(mapStateToProps, {
  coinChecked, coinUnchecked, assetSaved, assetChanged,
})(AddAssetsScreen);
