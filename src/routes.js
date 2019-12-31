import React from 'react';
import { Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import logo from './assets/logos/instagram.png';

import Feed from './pages/Feed';
import New from './pages/New';

const Routes = createAppContainer(
    createStackNavigator({
        Feed,
        New,
    }, {
        headerLayoutPreset: 'left',
        defaultNavigationOptions: {
            headerTitle: <Image style={ { marginHorizontal: 20 } } source={logo} />,
            headerStyle: {
                backgroundColor: '#f5f5f5',
            }
    },
    mode: 'card',
    })
);

export default Routes;