import type { IntegerType } from 'mongodb';
import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(true);
export const userType = writable<Number>(3);
export const imieNazwisko = writable<string[]>();

