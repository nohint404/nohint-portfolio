<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '../data/projects';
  let { projects }: { projects: Project[] } = $props();
  let selected = $state(0);
  let ready = $state(false);
  let project = $derived(projects[selected]!);
  onMount(() => { ready = true; });
  function keys(event: KeyboardEvent, index: number) {
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    selected = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + projects.length) % projects.length;
    document.getElementById(`choose-${selected}`)?.focus();
  }
</script>
<div class="work-finder" class:monolith={project.slug === 'monolith'}>
  <div class="finder-top"><span class="path">❯ ls ~/work</span><span>Pick something apart.</span></div>
  <div class="finder-list" role="group" aria-label="Preview a project">
    <span class="selection-cursor" style={`--row:${selected}`} aria-hidden="true">❯</span>
    {#each projects as item, i}
      <button id={`choose-${i}`} disabled={!ready} aria-pressed={selected === i} onclick={() => selected = i} onkeydown={event => keys(event,i)}><span>{item.name}</span><small>{item.role}</small></button>
    {/each}
  </div>
  <div class="finder-preview" aria-live="polite">
    {#key project.slug}
      <div class="preview-resolve">
        <div class="preview-word" aria-hidden="true">{project.name}</div>
        <div class="preview-diagram" aria-hidden="true">
          {#if project.slug === 'vs-notrack'}<span>settings.json</span><i>↘</i><strong>Normal / Strict</strong><i>↗</i><span>state.vscdb</span>
          {:else if project.slug === 'monolith'}<span>capture + audio</span><i>↓</i><strong>encode → replay</strong><i>↓</i><span>files / local controls</span>
          {:else}<span>React components</span><i>↓</i><strong>interface / motion</strong><i>↓</i><span>Vite build</span>{/if}
        </div>
        <p class="role">{project.role} / {project.repositoryOwner}</p>
        <p>{project.summary}</p>
      </div>
    {/key}
    <a class="action-link" href={`/work/${project.slug}/`}>Open {project.name}<span aria-hidden="true">↗</span></a>
  </div>
  <noscript><p>Project previews need JavaScript. All projects and source links are below.</p></noscript>
</div>
