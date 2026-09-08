<script lang="ts">
  import { onMount } from 'svelte';
  import { assemble } from '../lib/motion';
  import type { Project } from '../data/projects';
  let { project }: { project: Project } = $props();
  let contributions = $state(false);
  let selected = $state('capture');
  let ready = $state(false);
  let node = $derived(project.architecture?.find(node => node.id === selected));
  let evidence = $derived(project.contributions?.filter(item => item.nodes.includes(selected)) ?? []);
  const touched = (id: string) => project.contributions?.some(item => item.nodes.includes(id));
  onMount(() => { ready = true; });
</script>
<figure class="system-map monolith-map" use:assemble>
  <figcaption><span>Monolith / implementation map</span><span>Project by fraa2a</span></figcaption>
  <div class="map-toolbar"><h3>Follow the signal.</h3><div class="segmented" role="group" aria-label="Architecture view"><button disabled={!ready} aria-pressed={!contributions} onclick={() => contributions = false}>Project architecture</button><button disabled={!ready} aria-pressed={contributions} onclick={() => { contributions = true; selected = 'game'; }}>My contributions</button></div></div>
  <p class="map-legend">Highlighted areas link to my commits, not ownership of the full system.</p>
  <div class="graph-lanes" class:contribution-view={contributions}>
    {#each ['media','control'] as group}
      <div class="graph-lane"><p class="lane-label">{group === 'media' ? 'Media path' : 'Control relationships'}</p>
      {#each project.architecture?.filter(node => node.group === group) ?? [] as item}
        <button data-step class="graph-node" class:touched={contributions && touched(item.id)} class:active={selected === item.id} aria-pressed={selected === item.id} disabled={!ready} onclick={() => selected = item.id}><span>{item.label}</span><small>{item.next}</small>{#if contributions && touched(item.id)}<em>Linked contribution</em>{/if}</button>
      {/each}</div>
    {/each}
  </div>
  <div class="node-inspector" aria-live="polite"><span class="path">❯ inspect {selected}</span><h4>{node?.label}</h4><p>{node?.detail}</p>{#if contributions}{#if evidence.length}<ul>{#each evidence as item}<li><a href={item.source}>{item.title} ↗</a><p>{item.text}</p></li>{/each}</ul>{:else}<p class="quiet">Project context. No personal contribution highlighted for this area.</p>{/if}{/if}</div>
  <p class="caveat">A simplified source map, not a running recorder. Media files hold video; SQLite holds catalog metadata and settings. Select any area to inspect it.</p>
</figure>
