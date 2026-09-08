import type { Project } from './projects';
const source = 'https://github.com/fraa2a/Monolith/blob/6232dc2e5c0424f731f6d31c2a962fdebdd2765d/';
const commit = 'https://github.com/fraa2a/Monolith/commit/';
export const monolith: Project = {
  slug: 'monolith', name: 'Monolith', kind: 'Recording / replay / desktop controls', role: 'Contributed work', repositoryOwner: 'fraa2a',
  description: 'Behind the recording button, a whole conversation.',
  summary: 'A Windows recording and replay app by fraa2a. I contributed active-game detection, audio controls, desktop UI and initial Stream Deck / local RPC integration.',
  technologies: ['C++', 'Preact', 'TypeScript', 'Tauri', 'SQLite'], repository: 'https://github.com/fraa2a/Monolith',
  architecture: [
    {id:'capture',label:'Windows capture',detail:'Windows capture supplies BGRA frames to frame pacing, then the video encoder.',group:'media',next:'Video encoder'},
    {id:'audio',label:'WASAPI audio',detail:'Audio takes a direct route or TrackMixer path into AAC encoding. My linked changes concern detection, audio configuration and runtime state, not authorship of the audio engine.',group:'media',next:'Audio encoder'},
    {id:'encoding',label:'Encoded packets',detail:'VideoEncoder and AudioEncoder feed encoded packets to ReplayBuffer and ManualRecorder. This is not a raw-frame storage boundary.',group:'media',next:'Replay / recording'},
    {id:'files',label:'Replay / recording',detail:'Replay clips and manual recordings are written as media files. SQLite catalogs store metadata; they do not contain the video byte stream.',group:'media',next:'Media files + catalog metadata'},
    {id:'game',label:'Game detection',detail:'Configured process lists and fullscreen, foreground and audio signals inform candidate scoring and active-game switching.',group:'control',next:'Recorder configuration'},
    {id:'ui',label:'Desktop UI',detail:'Preact interface and Tauri host exchange recorder controls and status over local RPC. The UI also reads clip catalogs.',group:'control',next:'Tauri host ↔ local RPC'},
    {id:'rpc',label:'Local RPC',detail:'Newline-delimited JSON-RPC 2.0 over TCP loopback carries recorder controls and status. No WebSocket or remote cloud is implied.',group:'control',next:'Recorder controls / status'},
    {id:'deck',label:'Stream Deck',detail:'Controller actions include save replay, toggle recording and pause/resume. The source describes an implemented scaffold with runtime verification still pending.',group:'control',next:'Local RPC ↔ recorder'},
  ],
  contributions: [
    {title:'Active game + audio controls',text:'Candidate scoring, process lists, switching and runtime configuration/status. The audio-mode UI changes in this commit belong to the historical WinUI/C# interface, not today’s Preact widgets.',source:commit+'3fbe425de2a611eafcac48c8e857fb52a7c5578c',nodes:['game','audio']},
    {title:'Desktop connection + error feedback',text:'Tauri connection state, disconnected feedback and UI error handling for recording-detail actions, plus supporting build tooling.',source:commit+'a12268b0b958cca84f6595539e17859f27539fd7',nodes:['ui']},
    {title:'Desktop controls + editing',text:'Favorites with rollback, tag editing, status polling and recording controls in the Preact interface.',source:commit+'c03cd0778f1d148f197963c9303cf33585d1e0dd',nodes:['ui']},
    {title:'Stream Deck + local RPC wiring',text:'Initial controller action implementations, local IPC client/server and recorder wiring. This is contribution evidence, not a claim of certified integration.',source:commit+'3d8a6541f2090235f755908c85140279a1d261b2',nodes:['rpc','deck']},
  ],
  sections: [
    {title:'A recorder, with a separate control surface.',text:'The current native C++ recorder handles Windows capture, audio, encoding, replay and recording. A Tauri host and Preact interface control it through local JSON-RPC. Stream Deck is another controller, not another recording engine.',source:source+'docs/ARCHITECTURE.md',label:'Read the project architecture'},
    {title:'Media files are not database rows.',text:'Encoded packets feed the replay buffer and manual recorder. Saved media remains in files. SQLite holds clip catalogs and settings; the desktop interface reads catalog information. This diagram simplifies the application, not a future headless-engine design.',source:source+'app/recorder/src/main.cpp',label:'Inspect the recorder wiring'},
    {title:'Small fixes at important boundaries.',text:'A separate contribution adds guarded WinRT access, preserves silent audio packet sizes and fixes replay packet ownership. These are targeted changes within existing subsystems, not a claim that I built the capture or replay engine.',source:commit+'96ac2fe6ab463b4569b70ead7dc74f8796f80bdb',label:'Inspect capture / replay fixes'},
    {title:'Two generations of interface.',text:'The active-game and audio-mode contribution includes historical WinUI/C# controls. Later commits cover the Tauri/Preact desktop UI. Both are part of my contribution history, but they are not the same implementation. Monolith is fraa2a’s project throughout.',source:commit+'3fbe425de2a611eafcac48c8e857fb52a7c5578c',label:'Read the historical audio-mode patch'},
  ],
};
