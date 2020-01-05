import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin';

import HelpOrderAnswer from './pages/HelpOrder/HelpOrderAnswer';
import HelpOrderList from './pages/HelpOrder/HelpOrderList';
import HelpOrderQuestion from './pages/HelpOrder/HelpOrderQuestion';


export default () =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator({
                Checkin
              },
                {
                  headerLayoutPreset: 'center',
                  headerTitleAlign: 'center',
                }
              ),

              navigationOptions: {
                title: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              }
            },
            HelpOrder: {
              screen: createStackNavigator({
                HelpOrderList,
                HelpOrderAnswer,
                HelpOrderQuestion,
              },
                {
                  headerLayoutPreset: 'center',
                  headerTitleAlign: 'center',
                },
              ),
              navigationOptions: {
                title: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
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
