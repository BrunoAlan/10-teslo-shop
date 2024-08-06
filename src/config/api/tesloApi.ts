import axios from 'axios';

import { Platform } from 'react-native';

const EXPO_PUBLIC_STAGE = process.env.EXPO_PUBLIC_STAGE;
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_API_URL_IOS = process.env.EXPO_PUBLIC_API_URL_IOS;
const EXPO_PUBLIC_API_URL_ANDROID = process.env.EXPO_PUBLIC_API_URL_ANDROID;

export const API_URL =
  EXPO_PUBLIC_STAGE === 'production'
    ? EXPO_PUBLIC_API_URL
    : Platform.OS === 'ios'
      ? EXPO_PUBLIC_API_URL_IOS
      : EXPO_PUBLIC_API_URL_ANDROID;

const tesloApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//TODO add interceptors

export { tesloApi };
