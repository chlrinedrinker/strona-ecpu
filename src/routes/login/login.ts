// src/scripts/login.ts
import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { isLoggedIn } from '../stores/stores';

export let username = writable('');
export let password = writable('');
export let error = writable<string | null>(null);

export function login() {
  isLoggedIn.set(true);
}

export async function handleSubmit(event: Event) {
  event.preventDefault();
  error.set(null);

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: get(username), password: get(password) })
    });

    const result = await response.json();

    if (result.success) {
      // Przekierowanie na nową stronę po zalogowaniu
      login();
      goto('../');
    } else {
      error.set(result.message);
    }
  } catch (err) {
    error.set('Wystąpił błąd podczas logowania');
  }
}
