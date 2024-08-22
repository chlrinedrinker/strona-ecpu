import type { IntegerType } from 'mongodb';
import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(true);
export const userType = writable<Number>(3);
export const imieNazwisko = writable<string[]>();
export const exportDate = writable<string | null>(null);
export const showFiltered = writable<boolean>(false);
export const totalHours = writable<number>(0);
