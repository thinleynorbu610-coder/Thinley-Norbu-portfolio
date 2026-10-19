# Portfolio site — structure

```
myapp/
├─ index.html              Page markup (structure only)
├─ css/
│  └─ style.css             All styling
├─ js/
│  ├─ data.js               ← Edit THIS to change any text or add images
│  └─ main.js                Rendering + interactivity (no content to edit here)
├─ images/
│  ├─ profile/               Your profile photo (bg.png)
│  ├─ projects/               Project screenshots
└─ README.md                 This file
```

## Project images

Project cover images are bundled in `images/projects/` and assigned through
each project's `image` field in `js/data.js`. Visitors cannot upload or
replace project images from the page. See
[images/projects/README.md](images/projects/README.md) for details.

The portrait in the hero and About section is referenced directly in
`index.html` at `images/profile/bg.png`. Replace that file (same name) to
swap it, or edit the image `src` values in `index.html` to point elsewhere.
The small brand mark is `images/profile/logo.png`.

## Editing content

Everything else — stats, timeline, projects, tech stack, skills, learning
logs, garden notes, and roadmap — lives in the `DATA` object in
`js/data.js`. Each section has a comment above it in that file.

## Running locally

Just open `index.html` in a browser, or serve the folder with any static
server (e.g. `npx serve myapp`) if you want it on a local URL.
