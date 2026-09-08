<script lang="ts">
  import { onMount } from 'svelte';
  import { assemble } from '../lib/motion';
  let ready = $state(false);
  let mode = $state<'normal' | 'strict'>('normal');
  let inspected = $state('settings');
  const nodes = [
    {id:'settings',name:'Settings',detail:'Embedded Python merges editor settings into JSON. Timestamp backups precede changes; invalid JSON resets the loaded object, so preservation is not unconditional.'},
    {id:'state',name:'Extension state',detail:'The script backs up state.vscdb, reads disabled-extension identifiers and appends missing entries with parameterized SQLite writes.'},
    {id:'product',name:'Product config',detail:'Strict mode writes Open VSX gallery URLs; Normal mode leaves default marketplace configuration alone.'},
    {id:'hosts',name:'Optional hosts',detail:'Where permissions allow, system-level host entries can be modified. Strict mode extends the optional blocklist. These changes do not establish a network-privacy guarantee.'},
  ];
  onMount(() => {
    ready = true;
    const sync = () => mode = new URL(location.href).searchParams.get('mode') === 'strict' ? 'strict' : 'normal';
    sync(); window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  });
  function select(value: 'normal' | 'strict') {
    if (mode === value) return;
    mode = value; const url = new URL(location.href);
    if (value === 'strict') url.searchParams.set('mode', value); else url.searchParams.delete('mode');
    history.pushState(null, '', url); inspected = 'product';
  }
</script>
<figure class="system-map execution-map" use:assemble>
  <figcaption><span>vs-notrack / implementation map</span><span>Source, not execution</span></figcaption>
  <div class="map-toolbar"><h3>Same editor.<br />Different decisions.</h3><div class="segmented" role="group" aria-label="Explore configuration mode"><button disabled={!ready} aria-pressed={mode === 'normal'} onclick={() => select('normal')}>Normal</button><button disabled={!ready} aria-pressed={mode === 'strict'} onclick={() => select('strict')}>Strict</button></div></div>
  <div class="flow-command"><span class="path">./vs-notrack</span><span>mode selection</span><strong>{mode}</strong></div>
  <div class="execution-branches">
    {#each nodes as node}<button data-step class="execution-node" class:changed={mode === 'strict' && ['product','hosts'].includes(node.id)} aria-pressed={inspected === node.id} disabled={!ready} onclick={() => inspected = node.id}><span>{node.name}</span><small>{node.id === 'product' ? mode === 'strict' ? 'Open VSX gallery' : 'Default gallery unchanged' : node.id === 'hosts' ? mode === 'strict' ? 'Extended optional blocklist' : 'Optional system changes' : node.id === 'settings' ? 'JSON preferences' : 'SQLite identifiers'}</small></button>{/each}
  </div>
  <div class="node-inspector" aria-live="polite"><span class="path">❯ inspect {inspected}</span><p>{nodes.find(node => node.id === inspected)?.detail}</p></div>
  <p class="caveat">A map of the Linux/macOS script. Neither mode guarantees network privacy. Nothing runs here; read the source before using system-modifying software.</p>
</figure>
