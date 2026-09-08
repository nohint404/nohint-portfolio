<script lang="ts">
  import { onMount } from 'svelte';
  import { physical } from '../lib/motion/physical';
  let ready = $state(false), spread = $state(false), selected = $state(0);
  const sheets = [
    { name: 'vs-notrack', file: 'settings.json + state.vscdb', lines: ['Normal / Strict', 'JSON preferences', 'SQLite extension state'], color: 'blue' },
    { name: 'Monolith', file: 'contribution map', lines: ['Game + audio controls', 'Desktop feedback', 'Local RPC wiring'], color: 'yellow' },
    { name: 'nohint-portfolio', file: 'src/pages/index.astro', lines: ['Astro → static pages', 'Svelte → small islands', 'Bun → build + checks'], color: 'paper' },
  ];
  onMount(() => { ready = true; });
</script>
<div class="workspace" class:spread>
  <div class="workspace-sheets">
    {#each sheets as sheet, i}<button use:physical data-draggable aria-describedby="workspace-instructions" class={`workspace-sheet ${sheet.color}`} class:selected={selected === i} style={`--sheet:${i}`} disabled={!ready} aria-pressed={selected === i} onclick={() => selected = i}>
      <span class="sheet-top"><span>{sheet.file}</span><span class="window-dot" aria-hidden="true"></span></span>
      <strong>{sheet.name}</strong><span class="sheet-content">{#each sheet.lines as line}<span>{line}</span>{/each}</span>
      <span class="sheet-foot">{i === 1 ? 'fraa2a’s project / my contributions' : 'Owned work'}<span aria-hidden="true">↗</span></span>
    </button>{/each}
  </div>
  <div class="workspace-controls"><button disabled={!ready} aria-pressed={spread} onclick={() => spread = !spread}>{spread ? 'Stack the workspace' : 'Take it apart'}</button><button disabled={!ready} onclick={() => { spread = false; selected = (selected + 1) % 3; }}>Shuffle</button><button disabled={!ready} onclick={() => { spread = false; selected = 0; }}>Reset</button></div>
  <p id="workspace-instructions" class="workspace-caption">Source diagrams, not screenshots. Drag sideways or use arrow keys; Home resets. Buttons rearrange the stack.</p>
</div>
