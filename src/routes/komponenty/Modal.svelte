<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="max-w-lg rounded-lg border-none p-0 backdrop:bg-black/30 open:animate-zoom open:backdrop:animate-fade"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-4 flex flex-col items-center justify-center" on:click|stopPropagation>
		<slot name="header" />
		<hr class="w-full my-2 border-t" />
		<slot />
		<hr class="w-full my-2 border-t" />
		<!-- svelte-ignore a11y-autofocus -->
		<button class="px-4 py-2 bg-blue-500 text-white rounded my-2 focus:outline-none" autofocus on:click={() => dialog.close()}>Nie</button>
	</div>
</dialog>

<style>
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
