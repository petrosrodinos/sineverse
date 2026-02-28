import axios from 'axios'
import { isTokenExpired } from '@/lib/token';
import { environments } from '@/config/environments';
import { getSession, signOut } from 'next-auth/react';
import { Routes } from '../routes';

const axiosInstance = axios.create({
    baseURL: environments.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const session: any = await getSession();
    const { access_token, expires_in } = session || {};

    if (expires_in && isTokenExpired(expires_in)) {
        signOut({ callbackUrl: Routes.auth.sign_in })
        return Promise.reject(new Error('Token expired'));
    }

    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
});

export default axiosInstance