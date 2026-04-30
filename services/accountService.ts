import axiosInstance from './axiosInstance';
import { Address, Order, UserProfile, Wishlist, PaginatedResponse } from './types';

// Profile
export const getProfile = (): Promise<UserProfile> => 
    axiosInstance.get('/api/v1/accounts/profile/').then(res => res.data);

export const updateProfile = (data: Partial<UserProfile>): Promise<UserProfile> => 
    axiosInstance.put('/api/v1/accounts/profile/', data).then(res => res.data);

export const patchProfile = (data: Partial<UserProfile>): Promise<UserProfile> => 
    axiosInstance.patch('/api/v1/accounts/profile/', data).then(res => res.data);

// Addresses
export const getAddresses = (): Promise<Address[]> => 
    axiosInstance.get('/api/v1/accounts/addresses/').then(res => res.data);

export const createAddress = (data: Omit<Address, 'id'>): Promise<Address> => 
    axiosInstance.post('/api/v1/accounts/addresses/', data).then(res => res.data);

export const updateAddress = (id: number, data: Address): Promise<Address> => 
    axiosInstance.put(`/api/v1/accounts/addresses/${id}/`, data).then(res => res.data);

export const patchAddress = (id: number, data: Partial<Address>): Promise<Address> => 
    axiosInstance.patch(`/api/v1/accounts/addresses/${id}/`, data).then(res => res.data);

export const deleteAddress = (id: number) => 
    axiosInstance.delete(`/api/v1/accounts/addresses/${id}/`);

export const setDefaultAddress = (id: number) => 
    axiosInstance.patch(`/api/v1/accounts/addresses/${id}/set-default/`);

// Orders
export const getMyOrders = (params?: any): Promise<PaginatedResponse<Order>> => 
    axiosInstance.get('/api/v1/accounts/orders/', { params }).then(res => res.data);

// Wishlist
export const getWishlist = (): Promise<Wishlist[]> => 
    axiosInstance.get('/api/v1/accounts/wishlist/').then(res => res.data);

export const addToWishlist = (productId: number) => 
    axiosInstance.post('/api/v1/accounts/wishlist/add/', { product_id: productId });

export const removeFromWishlist = (productId: number) => 
    axiosInstance.delete(`/api/v1/accounts/wishlist/remove/${productId}/`);

// Password
export const changeAccountPassword = (data: any) => 
    axiosInstance.post('/api/v1/accounts/change-password/', data);
