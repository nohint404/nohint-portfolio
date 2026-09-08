<script lang="ts">
  import { onMount } from 'svelte';
  import { matches, type Command } from '../lib/commands';
  import { profile, navigation } from '../data/profile';
  let { projectLinks }: { projectLinks: { name: string; slug: string }[] } = $props();
  let dialog: HTMLDialogElement;
  let input: HTMLInputElement;
  let trigger: HTMLButtonElement;
  let query = $state('');
  let selected = $state(0);
  let feedback = $state('');
  let ready = $state(false);
  let previous: HTMLElement | null = null;
  const commands: Command[] = $derived([
    { label: 'Home', href: '/', aliases: 'home index cd home' },
    { label: 'Current path', action: 'pwd', aliases: 'pwd path' },
    ...navigation.map(item => ({ label: item.name, href: item.href, aliases: item.name === 'Work' ? 'ls projects cd work' : item.name === 'About' ? 'whoami man me cd about' : 'cd contact' })),
    ...projectLinks.map(project => ({ label: project.name, href: `/work/${project.slug}/`, aliases: `open project ${project.name}` })),
    { label: 'GitHub', aliases: 'github source', href: profile.github },
    ...(profile.email ? [{ label: 'Copy email', aliases: 'copy email', action: 'copy' as const }] : []),
    { label: 'Help', aliases: 'help commands ?', action: 'help' },
    { label: 'Close palette', aliases: 'clear exit', action: 'clear' },
  ]);
  let results = $derived(commands.filter(command => matches(query, `${command.label} ${command.aliases}`)));
  function open() {
    previous = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    query = ''; selected = 0; feedback = '';
    dialog.showModal(); input.focus();
  }
  function close() { dialog.close(); }
  async function execute(command?: Command) {
    if (!command) return;
    if (command.action === 'pwd') { feedback = '~' + location.pathname + location.hash; return; }
    if (command.action === 'help') { query = ''; selected = 0; feedback = 'Try: ls, cd work, whoami, open monolith, pwd. ↑ ↓ select, Enter opens, Tab completes, Esc closes.'; input.focus(); return; }
    if (command.action === 'copy' && profile.email) {
      try { await navigator.clipboard.writeText(profile.email); feedback = 'Email copied to clipboard.'; }
      catch { feedback = `Could not copy. Email: ${profile.email}`; }
      return;
    }
    close();
    if (command.href) window.location.assign(command.href);
  }
  function inputKeys(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length) selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
      document.getElementById(`command-${selected}`)?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') { event.preventDefault(); execute(results[selected]); }
    else if (event.key === 'Tab' && !event.shiftKey && query && results[selected]) { event.preventDefault(); query = results[selected].label; selected = 0; }
  }
  onMount(() => {
    ready = true;
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.closest('input,textarea,select,[contenteditable="true"]')) && !dialog.open) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); dialog.open ? close() : open(); }
    };
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  });
</script>

<button bind:this={trigger} class="command-trigger" onclick={open} hidden={!ready} aria-label="Open command palette" aria-haspopup="dialog">Commands <kbd>⌘ / Ctrl K</kbd></button>
<dialog bind:this={dialog} onclose={() => previous?.focus()} aria-labelledby="command-title">
  <div class="dialog-top"><h2 id="command-title">❯ Go somewhere.</h2><button class="close" onclick={close} aria-label="Close command palette">Esc</button></div>
  <label for="command-input">Search pages or type a command</label>
  <div class="prompt-input"><span aria-hidden="true">❯</span><input bind:this={input} id="command-input" name="command" bind:value={query} oninput={() => selected = 0} onkeydown={inputKeys} autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="command-results" aria-activedescendant={results.length ? `command-${selected}` : undefined} /></div>
  <div id="command-results" role="listbox" aria-label="Commands">
    {#each results as command, index}
      <div id={`command-${index}`} role="option" aria-selected={selected === index}>
        <button tabindex="-1" class:chosen={selected === index} onpointermove={() => selected = index} onclick={() => execute(command)}><span>{command.label}</span><span class="alias">{command.aliases.split(' ')[0]}</span></button>
      </div>
    {/each}
    {#if !results.length}<p class="empty">Command not found. Try “work” or “help”.</p>{/if}
  </div>
  <p class="dialog-help">↑ ↓ select · Enter open · Tab complete · Esc close</p>
  <p aria-live="polite" class="feedback">{feedback}</p>
</dialog>

<style>
  .command-trigger{font:inherit;background:none;color:var(--text);border:1px solid var(--line);padding:.65rem .85rem;cursor:pointer;display:flex;gap:1.5rem;align-items:center}.command-trigger:hover{border-color:var(--accent);color:var(--accent)}.close:hover{background:#3c4144}.command-trigger[hidden]{display:none}kbd{font:11px monospace;color:var(--muted)}
  dialog{width:min(600px,calc(100% - 32px));max-height:85dvh;overscroll-behavior:contain;background:var(--bg);color:var(--text);border:1px solid #59605d;padding:24px;margin:auto;box-shadow:0 24px 100px #0009}dialog::backdrop{background:#080a0cbb;}
  .dialog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}h2{font-size:28px;margin:0}.close{background:var(--surface);color:var(--text);border:0;padding:12px;cursor:pointer}label{font-size:14px;color:var(--muted)}.prompt-input{display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--accent);margin:8px 0 16px;color:var(--accent)}input{width:100%;min-width:0;background:none;border:0;color:var(--text);font:inherit;font-size:20px;padding:14px 0}input:focus-visible{outline-offset:3px}#command-results{max-height:40dvh;overflow:auto;overscroll-behavior:contain}#command-results button{display:flex;justify-content:space-between;gap:12px;width:100%;padding:14px 12px;background:none;border:0;color:var(--text);font:inherit;text-align:left;cursor:pointer}#command-results button.chosen{background:var(--surface);box-shadow:inset 1px 0 var(--accent)}.alias,.dialog-help{color:var(--muted);font-size:12px}.alias{font-family:monospace}.dialog-help{margin:20px 0 0}.feedback,.empty{font-size:14px;color:var(--accent)}.feedback:empty{display:none}@media(max-width:600px){.command-trigger{font-size:12px;gap:8px}.command-trigger kbd{display:none}dialog{padding:20px}}
</style>
