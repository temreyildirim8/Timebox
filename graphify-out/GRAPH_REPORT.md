# Graph Report - .  (2026-04-16)

## Corpus Check
- Large corpus: 23 files · ~1,137,566 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 100 nodes · 100 edges · 19 communities detected
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Architecture|App Architecture]]
- [[_COMMUNITY_UI Layout|UI Layout]]
- [[_COMMUNITY_Sidebar & Toast|Sidebar & Toast]]
- [[_COMMUNITY_Social Icons|Social Icons]]
- [[_COMMUNITY_TaskItem Component|TaskItem Component]]
- [[_COMMUNITY_Schedule Component|Schedule Component]]
- [[_COMMUNITY_App Root|App Root]]
- [[_COMMUNITY_Hero Design|Hero Design]]
- [[_COMMUNITY_Brand Identity|Brand Identity]]
- [[_COMMUNITY_Database Layer|Database Layer]]
- [[_COMMUNITY_React Framework|React Framework]]
- [[_COMMUNITY_TaskList|TaskList]]
- [[_COMMUNITY_Notes|Notes]]
- [[_COMMUNITY_Heatmap|Heatmap]]
- [[_COMMUNITY_Build Tools|Build Tools]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Entry Point|Entry Point]]
- [[_COMMUNITY_Type Definitions|Type Definitions]]

## God Nodes (most connected - your core abstractions)
1. `Timebox Personal Planner Application` - 15 edges
2. `Timebox Project` - 6 edges
3. `SVG Sprite Sheet Container` - 6 edges
4. `IndexedDB Local Storage via Dexie.js` - 5 edges
5. `Social Media Integration Pattern` - 5 edges
6. `Task Items with Checkboxes` - 5 edges
7. `Three Panel Layout` - 4 edges
8. `handleEditKeyDown()` - 3 edges
9. `showToast()` - 3 edges
10. `useStore()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Local-First Philosophy` --semantically_similar_to--> `IndexedDB Local Storage via Dexie.js`  [INFERRED] [semantically similar]
  README.md → GEMINI.md
- `Timebox Project` --semantically_similar_to--> `Timebox Personal Planner Application`  [INFERRED] [semantically similar]
  README.md → GEMINI.md
- `Daily Planning Feature` --semantically_similar_to--> `Notes Component (Daily scratchpad)`  [INFERRED] [semantically similar]
  README.md → GEMINI.md
- `Rapid Scheduling Feature` --semantically_similar_to--> `Schedule Component (FullCalendar implementation)`  [INFERRED] [semantically similar]
  README.md → GEMINI.md
- `Data Portability Feature` --semantically_similar_to--> `Built-in Backup System (Export/Import JSON)`  [INFERRED] [semantically similar]
  README.md → GEMINI.md

## Hyperedges (group relationships)
- **UI Component Architecture** — gemini_sidebar_component, gemini_schedule_component, gemini_notes_component, gemini_heatmap_component [EXTRACTED 1.00]
- **Database Layer (tasks, timeBlocks, notes tables via Dexie.js)** — gemini_db_tables, gemini_dexie_js, gemini_usestore_hook [EXTRACTED 1.00]
- **Core Feature Set (Daily Planning, Rapid Scheduling, Data Portability)** — readme_daily_planning, readme_rapid_scheduling, readme_data_portability [EXTRACTED 1.00]
- **Social Platform Icons** — icons_bluesky_icon, icons_discord_icon, icons_github_icon, icons_x_icon [INFERRED 0.90]
- **SVG Symbol Sprite Pattern** — icons_svg_sprite_sheet, icons_bluesky_icon, icons_discord_icon, icons_documentation_icon, icons_github_icon, icons_social_icon, icons_x_icon [EXTRACTED 1.00]
- **UI Panel Composition** — task_list_panel, calendar_panel, daily_notes_panel [EXTRACTED 1.00]
- **Task Management Features** — task_items, today_later_sections, task_timestamps, task_action_icons [EXTRACTED 1.00]
- **Time Blocking Workflow** — task_items, time_blocks, calendar_panel [INFERRED 0.85]
- **Favicon Design System** — timebox_favicon, calendar_icon_visual, blue_color_scheme, timebox_brand_identity [INFERRED 0.75]

## Communities

### Community 0 - "App Architecture"
Cohesion: 0.1
Nodes (25): Built-in Backup System (Export/Import JSON), Color Management (react-color ChromePicker with floating-ui), Database Tables (tasks, timeBlocks, notes), Dexie.js Library, @dnd-kit/core Drag & Drop, FullCalendar with TimeGrid View, Heatmap Component (Activity history), IndexedDB Local Storage via Dexie.js (+17 more)

### Community 1 - "UI Layout"
Cohesion: 0.16
Nodes (14): Calendar Time-Block Panel, Daily Notes Panel, Dark Theme UI, Date Selector, Distractions Notes Section, Markdown Notes, Task Action Icons (color, link, delete), Task Items with Checkboxes (+6 more)

### Community 2 - "Sidebar & Toast"
Cohesion: 0.29
Nodes (3): handleExport(), handleFileChange(), showToast()

### Community 3 - "Social Icons"
Cohesion: 0.46
Nodes (8): BlueSky Social Icon, Discord Icon, Documentation Icon, GitHub Icon, Generic Social/User Icon, Social Media Integration Pattern, SVG Sprite Sheet Container, X (Twitter) Icon

### Community 4 - "TaskItem Component"
Cohesion: 0.47
Nodes (3): handleEditCancel(), handleEditKeyDown(), handleEditSave()

### Community 5 - "Schedule Component"
Cohesion: 0.33
Nodes (0): 

### Community 6 - "App Root"
Cohesion: 0.33
Nodes (3): App(), EventContextMenu(), useStore()

### Community 7 - "Hero Design"
Cohesion: 0.4
Nodes (5): Brand Identity Visual, Hero Image, Isometric Layout, Layered Box Motif, Purple Gradient Accent

### Community 8 - "Brand Identity"
Cohesion: 0.67
Nodes (4): Blue (#3b82f6) Color Scheme, Calendar Icon Visual, Timebox Brand Identity, Timebox Favicon

### Community 9 - "Database Layer"
Cohesion: 0.67
Nodes (1): TimeboxDatabase

### Community 10 - "React Framework"
Cohesion: 0.67
Nodes (3): React Framework Brand, React Logo SVG, Timebox Project

### Community 11 - "TaskList"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Notes"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Heatmap"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Build Tools"
Cohesion: 1.0
Nodes (2): Vite Build Tool, Vite Logo

### Community 15 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Type Definitions"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **25 isolated node(s):** `PM2 Deployment Process`, `@dnd-kit/core Drag & Drop`, `React 18 with Vite and TypeScript`, `Database Tables (tasks, timeBlocks, notes)`, `3-Column Layout (30/40/30 ratio)` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `TaskList`** (2 nodes): `TaskList.tsx`, `handleAdd()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Notes`** (2 nodes): `Notes()`, `Notes.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Heatmap`** (2 nodes): `getDayIntensity()`, `ActivityHeatmap.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Build Tools`** (2 nodes): `Vite Build Tool`, `Vite Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Entry Point`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Definitions`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 5 inferred relationships involving `Social Media Integration Pattern` (e.g. with `BlueSky Social Icon` and `Discord Icon`) actually correct?**
  _`Social Media Integration Pattern` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PM2 Deployment Process`, `@dnd-kit/core Drag & Drop`, `React 18 with Vite and TypeScript` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._