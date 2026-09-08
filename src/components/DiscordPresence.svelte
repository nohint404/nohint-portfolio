<script lang="ts">
  import { onMount } from 'svelte';

  export let userId: string;

  let refreshTick = 0;
  let failed = false;
  let theme: 'light' | 'dark' = 'light';

  const profileUrl = `https://discord.dog/${userId}`;

  $: embedWidth = refreshTick % 2 === 0 ? 800 : 799;
  $: cardUrl = `https://discord.dog/${userId}.png?theme=${theme}&type=discord&display=all&width=${embedWidth}&font=uni-sans`;

  function syncTheme() {
    theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function refresh() {
    failed = false;
    refreshTick += 1;
  }

  onMount(() => {
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const timer = window.setInterval(refresh, 30_000);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  });
</script>

<div class="discord-presence-card" aria-live="polite">
  <div class="discord-card-top">
    <div class="discord-card-label">
      <span class="discord-glyph" aria-hidden="true">⌁</span>
      <span>Discord presence</span>
    </div>
    <span class="discord-live-badge"><i aria-hidden="true"></i>Live profile</span>
  </div>

  <a class="discord-live-embed" href={profileUrl} target="_blank" rel="noreferrer" aria-label="Open my live Discord profile">
    {#if !failed}
      <img
        class="discord-profile-embed"
        src={cardUrl}
        alt="Live Discord profile showing avatar, status and public activity"
        decoding="async"
        loading="eager"
        referrerpolicy="no-referrer"
        on:error={() => (failed = true)}
      />
    {:else}
      <div class="discord-embed-fallback">
        <span class="discord-fallback-mark" aria-hidden="true">D</span>
        <div>
          <strong>Discord profile temporarily unavailable.</strong>
          <p>Open the profile directly to see the latest public status and activity.</p>
        </div>
      </div>
    {/if}
  </a>

  <div class="discord-live-foot">
    <span>avatar · status · activity · spotify</span>
    <a href={profileUrl} target="_blank" rel="noreferrer">open profile ↗</a>
  </div>
</div>
