<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '../data/projects';
  let { projects }: { projects: Project[] } = $props();
  let selected = $state('tooling');
  let ready = $state(false);
  const groups = [
    {id:'tooling',name:'Local tooling',slug:'vs-notrack',text:'Bash orchestration, Python JSON / SQLite edits, PowerShell and fixture-based checks.'},
    {id:'interfaces',name:'Web interfaces',slug:'portfolio',text:'Astro pages with small Svelte islands, in this portfolio.'},
    {id:'contribution',name:'Contributed systems',slug:'monolith',text:'Specific C++ audio/runtime changes, Preact UI feedback and TypeScript Stream Deck wiring. Contributions — I touched these parts, fraa2a owns the whole thing.'},
  ];
  let group = $derived(groups.find(item => item.id === selected)!);
  let project = $derived(projects.find(item => item.slug === group.slug));
  onMount(() => { ready = true; });
</script>
<div class="capability-explorer">
  <div role="group" aria-label="Explore capabilities">{#each groups as item}<button disabled={!ready} aria-pressed={selected === item.id} onclick={() => selected = item.id}>{item.name}</button>{/each}</div>
  <div aria-live="polite" class="capability-detail"><p>{group.text}</p>{#if project}<a href={`/work/${project.slug}/`}>Evidence in {project.name} ↗</a>{/if}</div>
</div>
