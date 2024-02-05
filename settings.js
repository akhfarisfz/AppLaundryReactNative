import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext } from "react";

const VPN_REMOTE = false
export const BASE_URL = VPN_REMOTE ? "http://id-04.tunnel.web.id:3257/api/v1" : "http://192.168.100.86:4000/api/v1"

export const TOKEN_KEY = "token";
export const TOKEN_PREFIX = "Bearer";
export const CONTEXT_APP = createContext({});
export const STORAGE = AsyncStorage