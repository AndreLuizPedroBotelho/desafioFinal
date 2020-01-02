import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin';
import HelpOrder from './pages/HelpOrder';
import logo from '~/assets/logo-header.png';
import { Image } from 'react-native';

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
              }
            },
            HelpOrder: {
              screen: createStackNavigator({
                HelpOrder
              },
                {
                  headerLayoutPreset: 'center',
                  headerTitleAlign: 'center',
                },
              ),
              navigationOptions: {
                title: 'Pedir ajuda',
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
