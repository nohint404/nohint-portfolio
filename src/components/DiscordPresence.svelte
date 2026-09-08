<script lang="ts">
  import { onMount } from 'svelte';

  export let userId: string;

  type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';
  type DiscordUser = {
    id: string;
    username: string;
    global_name?: string | null;
    display_name?: string | null;
    avatar?: string | null;
  };
  type Activity = {
    id?: string;
    name: string;
    type: number;
    state?: string | null;
    details?: string | null;
    timestamps?: { start?: number; end?: number } | null;
    emoji?: { id?: string | null; name?: string | null; animated?: boolean } | null;
  };
  type Spotify = {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    track_id?: string;
    timestamps?: { start?: number; end?: number };
  };
  type Presence = {
    discord_user: DiscordUser;
    discord_status: DiscordStatus;
    activities: Activity[];
    listening_to_spotify?: boolean;
    spotify?: Spotify | null;
    active_on_discord_desktop?: boolean;
    active_on_discord_mobile?: boolean;
    active_on_discord_web?: boolean;
  };
  type LanyardResponse = { success: boolean; data?: Presence };

  let presence: Presence | null = null;
  let loading = true;
  let unavailable = false;
  let now = Date.now();

  const statusLabels: Record<DiscordStatus, string> = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do not disturb',
    offline: 'Offline',
  };

  const statusClass = (status: DiscordStatus) => `status-${status}`;

  function avatarUrl(user: DiscordUser) {
    if (!user.avatar) return null;
    const extension = user.avatar.startsWith('a_') ? 'gif' : 'webp';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
  }

  function customStatus(activities: Activity[]) {
    return activities.find((activity) => activity.type === 4) ?? null;
  }

  function visibleActivities(activities: Activity[]) {
    return activities.filter((activity) => activity.type !== 4 && activity.name !== 'Spotify');
  }

  function customStatusText(activity: Activity | null) {
    if (!activity) return null;
    const emoji = activity.emoji?.id ? '' : activity.emoji?.name ?? '';
    const state = activity.state ?? '';
    return `${emoji}${emoji && state ? ' ' : ''}${state}`.trim() || null;
  }

  function elapsed(start?: number) {
    if (!start) return null;
    const seconds = Math.max(0, Math.floor((now - start) / 1000));
    if (seconds < 60) return 'just started';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
  }

  async function refresh() {
    try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Presence request failed: ${response.status}`);
      const payload = (await response.json()) as LanyardResponse;
      if (!payload.success || !payload.data) {
        unavailable = true;
        return;
      }
      presence = payload.data;
      unavailable = false;
    } catch {
      unavailable = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    void refresh();
    const presenceTimer = window.setInterval(() => void refresh(), 30_000);
    const clockTimer = window.setInterval(() => (now = Date.now()), 30_000);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(presenceTimer);
      window.clearInterval(clockTimer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  });

  $: user = presence?.discord_user ?? null;
  $: status = presence?.discord_status ?? 'offline';
  $: custom = customStatus(presence?.activities ?? []);
  $: customText = customStatusText(custom);
  $: activities = visibleActivities(presence?.activities ?? []);
  $: avatar = user ? avatarUrl(user) : null;
  $: displayName = user?.global_name || user?.display_name || user?.username || 'nohint404';
  $: platforms = presence
    ? [
        presence.active_on_discord_desktop ? 'desktop' : null,
        presence.active_on_discord_mobile ? 'mobile' : null,
        presence.active_on_discord_web ? 'web' : null,
      ].filter(Boolean)
    : [];
</script>

<div class="discord-presence-card" aria-live="polite" aria-busy={loading}>
  <div class="discord-card-top">
    <div class="discord-card-label">
      <span class="discord-glyph" aria-hidden="true">⌁</span>
      <span>Discord presence</span>
    </div>
    {#if presence}
      <span class="presence-status {statusClass(status)}"><i aria-hidden="true"></i>{statusLabels[status]}</span>
    {:else}
      <span class="presence-status status-offline"><i aria-hidden="true"></i>{loading ? 'Connecting' : 'Unavailable'}</span>
    {/if}
  </div>

  <div class="discord-profile-row">
    <div class="discord-avatar-wrap">
      {#if avatar}
        <img class="discord-avatar" src={avatar} alt={`${displayName} Discord avatar`} width="96" height="96" />
      {:else}
        <div class="discord-avatar discord-avatar-fallback" aria-hidden="true">n</div>
      {/if}
      <span class="avatar-status {statusClass(status)}" aria-hidden="true"></span>
    </div>
    <div class="discord-profile-copy">
      <strong>{displayName}</strong>
      <span>@{user?.username ?? 'nohint404'}</span>
      {#if customText}<p>{customText}</p>{/if}
    </div>
  </div>

  {#if presence?.spotify}
    <a class="discord-activity spotify-activity" href={`https://open.spotify.com/track/${presence.spotify.track_id ?? ''}`} target="_blank" rel="noreferrer">
      <img src={presence.spotify.album_art_url} alt="" width="72" height="72" />
      <div>
        <span>Listening to Spotify</span>
        <strong>{presence.spotify.song}</strong>
        <p>{presence.spotify.artist}</p>
      </div>
      <span class="activity-time">{elapsed(presence.spotify.timestamps?.start) ?? 'now'}</span>
    </a>
  {/if}

  {#if activities.length}
    <div class="discord-activity-list">
      {#each activities as activity}
        <div class="discord-activity">
          <div class="activity-icon" aria-hidden="true">{activity.name.slice(0, 1).toUpperCase()}</div>
          <div>
            <span>{activity.type === 0 ? 'Playing' : activity.type === 2 ? 'Listening to' : activity.type === 3 ? 'Watching' : 'Activity'}</span>
            <strong>{activity.name}</strong>
            {#if activity.details}<p>{activity.details}</p>{:else if activity.state}<p>{activity.state}</p>{/if}
          </div>
          {#if activity.timestamps?.start}<span class="activity-time">{elapsed(activity.timestamps.start)}</span>{/if}
        </div>
      {/each}
    </div>
  {:else if presence && !presence.spotify}
    <div class="discord-empty-activity">
      <span class="tiny-orbit" aria-hidden="true"></span>
      <p>{status === 'offline' ? 'Offline right now.' : 'Online, without a public activity right now.'}</p>
    </div>
  {/if}

  {#if platforms.length}
    <div class="discord-platforms" aria-label="Active Discord clients">
      <span>active on</span>
      {#each platforms as platform}<strong>{platform}</strong>{/each}
    </div>
  {/if}

  {#if unavailable && !presence}
    <div class="discord-provider-note">
      <strong>Presence is not available yet.</strong>
      <span>The card will start updating automatically as soon as the account is exposed to the presence service.</span>
    </div>
  {/if}
</div>
