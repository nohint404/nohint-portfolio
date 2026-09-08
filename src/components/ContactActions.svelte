<script lang="ts">
  import { onMount } from 'svelte';
  import { profile } from '../data/profile';
  import { physical } from '../lib/motion/physical';
  let ready = $state(false), feedback = $state('');
  onMount(() => { ready = true; });
  async function copy(text: string, label: string) {
    try { await navigator.clipboard.writeText(text); feedback = `${label} copied.`; }
    catch { feedback = `Clipboard unavailable. Select and copy: ${text}`; }
  }
</script>
<div class="contact-actions">
  <a class="contact-github" href={profile.github}>Find me on GitHub <span aria-hidden="true">↗</span></a>
  {#if profile.email}<a use:physical class="email-link" href={`mailto:${profile.email}`}>{profile.email}<span class="contact-dot" aria-hidden="true"></span></a>{/if}
  <div class="contact-small"><p>Discord <strong>{profile.discord}</strong></p><button hidden={!ready} onclick={() => copy(profile.discord, 'Discord username')}>Copy Discord</button>{#if profile.email}<button hidden={!ready} onclick={() => copy(profile.email!, 'Email')}>Copy email</button>{/if}</div>
  <p class="copy-feedback" role="status">{feedback}</p>
</div>
