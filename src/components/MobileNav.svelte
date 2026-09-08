<script lang="ts">
  import { onMount } from 'svelte';
  import { navigation, profile } from '../data/profile';
  let { path }: { path: string } = $props();
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  let ready = $state(false);
  let previous: HTMLElement | null = null;
  function open() { previous = document.activeElement as HTMLElement; dialog.showModal(); }
  onMount(() => { ready = true; });
</script>
<button class="mobile-trigger" bind:this={trigger} hidden={!ready} onclick={open} aria-label="Open navigation" aria-haspopup="dialog">[ ~/ ]</button>
<dialog class="mobile-dialog" bind:this={dialog} aria-labelledby="mobile-title" onclose={() => (previous ?? trigger)?.focus()}>
  <div class="mobile-top"><h2 id="mobile-title">~/navigate</h2><button onclick={() => dialog.close()} aria-label="Close navigation">Close ×</button></div>
  <p class="path">Current: {path}</p>
  <nav aria-label="Mobile navigation"><a href="/" onclick={() => dialog.close()}>Index</a>{#each navigation as item}<a href={item.href} onclick={() => dialog.close()}>{item.name}</a>{/each}<a href={profile.github}>GitHub ↗</a></nav>
  <p>Choose a path. No commands required.</p>
</dialog>
