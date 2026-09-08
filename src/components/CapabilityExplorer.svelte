<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '../data/projects';
  let { projects }: { projects: Project[] } = $props();
  let selected = $state('tooling');
  let ready = $state(false);
  const groups = [
    {id:'tooling',name:'Local tooling',slug:'vs-notrack',text:'Bash orchestration, Python JSON / SQLite edits, PowerShell and fixture-based checks.'},
    {id:'interfaces',name:'Web interfaces',slug:'portfolio',text:'React composition, JavaScript and Tailwind in the earlier portfolio.'},
    {id:'contribution',name:'Contributed systems',slug:'monolith',text:'Specific C++ audio/runtime changes, Preact UI feedback and TypeScript Stream Deck wiring. Contributions, not authorship of every subsystem.'},
    {id:'site',name:'This portfolio',slug:'',text:'Astro renders the content. Svelte powers these small interactions. TypeScript and Bun support the build. Native scrolling does the rest.'},
  ];
  let group = $derived(groups.find(item => item.id === selected)!);
  let project = $derived(projects.find(item => item.slug === group.slug));
  onMount(() => { ready = true; });
</script>
<div class="capability-explorer">
  <div role="group" aria-label="Explore capabilities">{#each groups as item}<button disabled={!ready} aria-pressed={selected === item.id} onclick={() => selected = item.id}>{item.name}</button>{/each}</div>
  <div aria-live="polite" class="capability-detail"><p>{group.text}</p>{#if project}<a href={`/work/${project.slug}/`}>Evidence in {project.name} ↗</a>{:else}<span class="path">You’re using it.</span>{/if}</div>
</div>
