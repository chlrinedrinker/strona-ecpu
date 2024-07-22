<script lang="ts">
  import type { IntegerType } from 'mongodb';
  import { isLoggedIn } from '../stores/stores';
  import { onDestroy } from 'svelte';
  
  let loggedIn;
  
  const unsubscribe = isLoggedIn.subscribe(value => {
    loggedIn = value;
  });
    
  onDestroy(() => {
    unsubscribe();
  });
  
  function login() {
     isLoggedIn.set(1);
  }
  
  function logout() {
    isLoggedIn.set(0);
  }

  </script>