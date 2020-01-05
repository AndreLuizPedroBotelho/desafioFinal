import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin';

import HelpOrderAnswer from './pages/HelpOrder/HelpOrderAnswer';
import HelpOrderList from './pages/HelpOrder/HelpOrderList';
import HelpOrderQuestion from './pages/HelpOrder/HelpOrderQuestion';

const helpOrderIcon = ({ tintColor }) => (
  <Icon name="live-help" size={20} color={tintColor} />
);

const checkinIcon = ({ tintColor }) => (
  <Icon name="edit-location" size={20} color={tintColor} />
);

helpOrderIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
checkinIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default () =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  headerLayoutPreset: 'center',
                  headerTitleAlign: 'center',
                }
              ),

              navigationOptions: {
                title: 'Check-ins',
                tabBarIcon: checkinIcon,
              },
            },
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderAnswer,
                  HelpOrderQuestion,
                },
                {
                  headerLayoutPreset: 'center',
                  headerTitleAlign: 'center',
                }
              ),
              navigationOptions: {
                title: 'Pedir ajuda',
                tabBarIcon: helpOrderIcon,
              },
            },
          },
          {
            resetOnBlur: true,
            headerTitleAlign: 'center',
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              labelStyle: {
                fontSize: 14,
              },
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: 'Sign',
      }
    )
  );
