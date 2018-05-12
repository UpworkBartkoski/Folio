import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Spinner } from '../common';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-cointracker-bb394.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: '', code: '', status: null, loading: false };

    handleSubmit = async () => {
        // Create User w/ Phone Number
        // Second Request runs even if first request was failed
        // With aync/await, requests are only ran if previous requests finished
        try {
            this.setState({ loading: true })
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
            // Send OTP Code to Phone Number
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
            this.setState({ status: 'Code Sent' })
            this.setState({ loading: false })
        } catch (err) {
            this.setState({ loading: false })
            this.setState({ status: 'False Input or Phone # Already Exists' })
        }
    }

    renderStatus() {
        if (this.state.status !== null) {
            return (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusTextStyle}>
                        {this.state.status}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="large" />
                </View>
            );
        }

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onPress={() => this.handleSubmit()}
                    title="SIGN UP "
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
            </View>
        );
    }


    render() {
        return (
            <View style={styles.inputsContatiner}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}
                    >
                        Sign Up with Phone Number
                    </Text>
                </View>
                <View style={styles.cardContainer}>
                    <Input
                        label="Phone #"
                        placeholder="123-456-7890"
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                {this.renderButton()}
                {this.renderStatus()}
            </View>
        );
    }
}

const styles = {
    statusContainer: {
        backgroundColor: '#2A033E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF',
        fontWeight: 'bold'
    },
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#2A033E'
    },
    inputsContatiner: {
        paddingTop: 10
    },
    buttonStyle: {
        alignItems: 'center'
    },
    cardContainer: {
        padding: 10,
        backgroundColor: '#2A033E',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 20,
        position: 'relative'
    }
};
//             <View>
//                 <View style={{ marginBottom: 10 }}>
//                     <FormLabel>Enter Phone Number</FormLabel>
//                     <Input
//                         value={this.state.phone}
//                         onChangeText={phone => this.setState({ phone })}
//                     />
//                 </View>

//                 <View style={{ marginBottom: 10 }}>
//                     <FormLabel>Enter Code</FormLabel>
//                     <Input
//                         value={this.state.code}
//                         onChangeText={code => this.setState({ code })}
//                     />
//                 </View>
//                 <Button onPress={this.handleSubmit} title="Submit" />
//             </View>
//         )
//     }
// }

export default SignInForm;

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { FormLabel, FormInput, Button } from 'react-native-elements';
// import axios from 'axios';

// const ROOT_URL = 'https://us-central1-one-time-password-6f767.cloudfunctions.net';

// class SignUpForm extends Component {
//     state = { phone: '' };

    // handleSubmit = async () => {
    //     // Create User w/ Phone Number
    //     // Second Request runs even if first request was failed
    //     // With aync/await, requests are only ran if previous requests finished
    //     try {
    //         await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
    //         // Send OTP Code to Phone Number
    //         await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

//     render() {
//         return (
//             <View>
//                 <View style={{ marginBottom: 10 }}>
//                     <FormLabel>Enter Phone Number</FormLabel>
//                     <FormInput
//                         value={this.state.phone}
//                         onChangeText={phone => this.setState({ phone })}
//                     />
//                 </View>
//                 <Button onPress={this.handleSubmit} title="Submit" />
//             </View>
//         )
//     }
// }

// export default SignUpForm;