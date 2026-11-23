# GLab Loader

**Version:** 1.0.1  
**Owner:** GLab Enterprise (GLab Ent.)  
**Package type:** Private-use browser component  
**JavaScript class:** `GLabLoader`  
**Root CSS class:** `.glab-loader`

GLab Loader is a small, dependency-free loading overlay for authorised GLab applications. It is designed around the GLab website's heartbeat loader identity and is distributed as separate CSS and JavaScript files.

> **Proprietary component.** This package is intended only for GLab-owned or explicitly authorised private products and applications. Do not redistribute, publish, sublicense, sell, or reuse it in unrelated projects. Read `GLAB-PROPRIETARY-LICENSE.md` before integration.

## Package contents

```text
GLab-loader/
├── GLab-loader.css
├── GLab-loader.js
├── README.md
├── GLAB-PROPRIETARY-LICENSE.md
├── NOTICE.md
├── VERSION
├── demo/
│   └── index.html
└── tests/
    └── smoke.html
```

The GLab brand mark is loaded by default from the version-pinned raw image URL in the authorised GLab Assets repository:

- GitHub source page: https://github.com/Guang84/Glab-assets/blob/ce39ec186b8957275a8e973d6065a691a81d9f27/brand/logos/GLab%20Enterprise/glab-mark-256.png
- Direct image URL used by the loader: https://raw.githubusercontent.com/Guang84/Glab-assets/ce39ec186b8957275a8e973d6065a691a81d9f27/brand/logos/GLab%20Enterprise/glab-mark-256.png

The GitHub `blob` page is an HTML viewing page and must **not** be used as an `<img src>` value. The loader uses the `raw.githubusercontent.com` URL, which returns the PNG image bytes. Ordinary browser `<img>` display does not require CORS access.

For offline deployments, or to avoid depending on GitHub availability, copy the approved PNG into your application's own static assets and override `logoUrl` with that local path. The logo is not duplicated inside this loader ZIP; it remains a separately controlled GLab brand asset.

## 1. Add the files to an application

For example, place the two files in:

```text
my-app/
└── static/
    └── glab-loader/
        ├── GLab-loader.css
        └── GLab-loader.js
```

Use the application's correct static-asset paths; the paths below are examples.

```html
<link rel="stylesheet" href="/static/glab-loader/GLab-loader.css">
<script src="/static/glab-loader/GLab-loader.js" defer></script>
```

## 2. Create and show the loader

The script exposes a global JavaScript class named `GLabLoader`.

```html
<script defer>
  document.addEventListener("DOMContentLoaded", async () => {
    const loader = new GLabLoader({
      // Uses the pinned GLab Assets image URL by default. Override with a local path offline.
      message: "Loading application…",
      theme: "light",
      timeoutMs: 9000
    });

    loader.show();
    window.appLoader = loader;

    try {
      await initialiseApplication();
    } finally {
      loader.hide();
    }
  });
</script>
```

`initialiseApplication()` above is an example placeholder. Replace it with the real startup function in the application.

To use a local copy instead of the default remote image, set `logoUrl: "/static/brand/glab-mark-256.png"`. To disable the logo, set `logoUrl: ""`. For offline deployments, keep the image and both loader files inside the application rather than depending on a remote asset host.

## 3. API reference

```javascript
const loader = new GLabLoader(options);

loader.show("Connecting to server…");
loader.setMessage("Synchronising data…");
loader.setProgress(45);  // 0–100, determinate progress
loader.setProgress(null); // return to animated indeterminate progress
loader.hide();
loader.destroy();
```

| Method | Purpose |
|---|---|
| `show(message?)` | Show the full-screen overlay. An optional message replaces the current message. |
| `hide()` | Hide the overlay and clear its recovery timer. |
| `setMessage(message)` | Change the status message safely using text content. |
| `setProgress(number)` | Display a real progress value from 0 to 100. |
| `setProgress(null)` | Restore the animated indeterminate progress line. |
| `destroy()` | Hide and remove the generated loader element. |

### Constructor options

| Option | Default | Description |
|---|---|---|
| `element` | `null` | Existing DOM element or selector to use as the loader root. If omitted, a root element is created. |
| `container` | `document.body` | DOM element or selector in which to mount a generated loader. |
| `logoUrl` | GLab raw PNG URL | Path or URL to the approved GLab mark. Use a local path for offline deployments or `""` to hide the logo. |
| `logoAlt` | `""` | Alternative text for the logo; decorative by default. |
| `message` | `"Loading…"` | Initial status text. |
| `theme` | `"light"` | `"light"`, `"dark"`, or `"auto"`. |
| `timeoutMs` | `9000` | Recovery timeout in milliseconds. Set to `0` to disable automatic hiding. |
| `zIndex` | `99999` | Overlay stacking order. |
| `progressLabel` | `"Loading progress"` | Accessible name for determinate progress. |
| `autoShow` | `false` | Automatically show after construction. |

### Use an existing root element

```html
<div id="app-loader" class="glab-loader" aria-hidden="true"></div>
```

```javascript
const loader = new GLabLoader({
  element: "#app-loader",
  logoUrl: "/static/brand/glab-mark-256.png", // Optional local/offline override
  timeoutMs: 0
});

loader.show("Preparing workspace…");
```

The constructor builds the loader's internal markup inside that root element.

## 4. Styling and themes

The component uses the following namespaced classes:

- `.glab-loader`
- `.glab-loader__content`
- `.glab-loader__mark`
- `.glab-loader__label`
- `.glab-loader__track`
- `.glab-loader__track-fill`

You can override its CSS custom properties in your application stylesheet:

```css
.glab-loader {
  --glab-loader-bg: #f6f3ec;
  --glab-loader-ink: #102019;
  --glab-loader-muted: #56625b;
  --glab-loader-line: rgb(16 32 25 / 16%);
  --glab-loader-accent: #c75b31;
}
```

Use `theme: "dark"` for a dark overlay or `theme: "auto"` to follow the operating system's preferred colour scheme.

## 5. Django integration

Place the CSS and JS files in a Django static directory, for example:

```text
static/glab-loader/GLab-loader.css
static/glab-loader/GLab-loader.js
```

Then load them in the base template:

```django
{% load static %}
<link rel="stylesheet" href="{% static 'glab-loader/GLab-loader.css' %}">
<script src="{% static 'glab-loader/GLab-loader.js' %}" defer></script>
```

Create and control the loader from the relevant page or application startup script. Do not add global link interception to the component itself; let Django navigation or the application's own JavaScript control when it should appear.

## 6. Important integration notes

1. The component does not automatically intercept links, detect route changes, or decide when application data is ready. The host application controls its lifecycle.
2. Use `setProgress()` only when the application can calculate actual progress. Otherwise leave the progress line indeterminate.
3. The default nine-second timeout is a recovery safeguard. Set `timeoutMs: 0` for operations that can legitimately take longer and always call `hide()` in a `finally` block or equivalent cleanup path.
4. The loader uses a full-screen overlay and applies `overflow: hidden` while visible. Do not show it for small inline operations.
5. Keep the component and logo locally available for offline or ISP-station deployments.
6. Do not load multiple copies of the script on one page.

## Ownership and permissions

Copyright © 2026 GLab Enterprise (GLab Ent.). All rights reserved.

This package is proprietary. Its use is limited by `GLAB-PROPRIETARY-LICENSE.md`. Public repository visibility or access to a ZIP file does not grant permission to reuse or redistribute it.
