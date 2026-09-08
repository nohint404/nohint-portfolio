<script lang="ts">
  import { onMount } from 'svelte';
  import { terminalReply } from '../lib/terminal';
  let ready = $state(false), command = $state('');
  let history = $state<{ command: string; reply: string; ok: boolean }[]>([]);
  let status = $state('');
  onMount(() => { ready = true; });
  function run(value = command) {
    const reply = terminalReply(value);
    const key = value.trim().toLowerCase();
    const ok = key !== '' && key !== 'clear' && !reply.startsWith('Unknown');
    if (value.trim().toLowerCase() === 'clear') history = [];
    else if (value.trim()) history = [...history.slice(-7), { command: value.slice(0, 160), reply, ok }];
    status = value.trim().toLowerCase() === 'clear' ? 'Terminal cleared.' : reply;
    command = '';
  }
</script>
<div class="terminal">
  <div class="terminal-title"><span>Sandbox / local toy</span><span class="signal-dot" aria-hidden="true"></span></div>
  <p>No shell. No server. Just a few good answers.</p>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable history needs keyboard scrolling.) -->
  <div class="terminal-history" tabindex="0" role="region" aria-label="Command history">
    {#if !history.length}<p class="terminal-hint">$ help<br />A small door into the work.</p>{/if}
    {#each history as entry}<p class="typed-command">{#if entry.ok}<span class="term-ok" aria-hidden="true"></span>{/if}$ {entry.command}</p><pre>{entry.reply}</pre>{/each}
  </div>
  <form onsubmit={event => { event.preventDefault(); run(); }}><label for="terminal-command">Command</label><div class="terminal-input"><span aria-hidden="true">$</span><input id="terminal-command" bind:value={command} maxlength="160" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Try whoami" disabled={!ready} /><button disabled={!ready} type="submit">Run</button></div></form>
  <div class="terminal-shortcuts" aria-label="Example commands">{#each ['help', 'projects', 'neofetch', 'clear'] as example}<button disabled={!ready} onclick={() => run(example)}>{example}</button>{/each}</div>
  <p class="sr-only" role="status">{status}</p>
  <noscript><p>The terminal needs JavaScript. All projects, technologies and contacts are readable elsewhere on this page.</p></noscript>
</div>
