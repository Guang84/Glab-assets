/*
 * GLab Loader v1.0.1
 * Copyright (c) 2026 GLab Enterprise (GLab Ent.). All rights reserved.
 * Private-use package. See GLAB-PROPRIETARY-LICENSE.md.
 */
(function (global) {
  "use strict";

  // Version-pinned GLab brand mark from the authorised GLab Assets repository.
  // For offline/private-network deployments, override logoUrl with a local asset path.
  const DEFAULT_LOGO_URL = "https://raw.githubusercontent.com/Guang84/Glab-assets/ce39ec186b8957275a8e973d6065a691a81d9f27/brand/logos/GLab%20Enterprise/glab-mark-256.png";

  class GLabLoader {
    constructor(options = {}) {
      if (typeof document === "undefined") {
        throw new Error("GLabLoader requires a browser document.");
      }

      const defaults = {
        element: null,
        container: document.body,
        logoUrl: DEFAULT_LOGO_URL,
        logoAlt: "",
        message: "Loading…",
        theme: "light", // "light", "dark", or "auto"
        timeoutMs: 9000, // Set to 0 to disable automatic recovery hiding.
        zIndex: 99999,
        progressLabel: "Loading progress",
        autoShow: false,
      };

      this.options = Object.assign({}, defaults, options);
      this._timer = null;
      this._createdElement = false;
      this.element = this._resolveElement(this.options.element);
      this._build();

      if (this.options.autoShow) this.show();
    }

    _resolveElement(value) {
      if (!value) return null;
      if (typeof value === "string") {
        const found = document.querySelector(value);
        if (!found) {
          throw new Error(`GLabLoader could not find element: ${value}`);
        }
        return found;
      }
      if (value instanceof Element) return value;
      throw new TypeError("GLabLoader option 'element' must be a selector or DOM element.");
    }

    _build() {
      const root = this.element || document.createElement("div");
      if (!this.element) this._createdElement = true;

      root.classList.add("glab-loader");
      root.setAttribute("role", "status");
      root.setAttribute("aria-live", "polite");
      root.setAttribute("aria-hidden", "true");
      root.dataset.theme = ["light", "dark", "auto"].includes(this.options.theme)
        ? this.options.theme
        : "light";
      root.style.setProperty("--glab-loader-z-index", String(this.options.zIndex));

      const content = document.createElement("div");
      content.className = "glab-loader__content";

      const mark = document.createElement("img");
      mark.className = "glab-loader__mark";
      mark.alt = this.options.logoAlt || "";
      mark.setAttribute("aria-hidden", "true");
      mark.decoding = "async";
      mark.loading = "eager";
      if (this.options.logoUrl) {
        mark.src = this.options.logoUrl;
      } else {
        mark.hidden = true;
      }
      mark.addEventListener("error", () => {
        mark.hidden = true;
      });

      const label = document.createElement("span");
      label.className = "glab-loader__label";
      label.textContent = String(this.options.message || "Loading…");

      const track = document.createElement("span");
      track.className = "glab-loader__track";
      track.setAttribute("aria-hidden", "true");

      const fill = document.createElement("span");
      fill.className = "glab-loader__track-fill";
      track.append(fill);

      content.append(mark, label, track);
      root.replaceChildren(content);

      this.element = root;
      this._mark = mark;
      this._label = label;
      this._track = track;
      this._fill = fill;

      if (!root.isConnected) {
        const target = typeof this.options.container === "string"
          ? document.querySelector(this.options.container)
          : this.options.container;
        if (!target || typeof target.append !== "function") {
          throw new Error("GLabLoader requires a valid container element (normally document.body).");
        }
        target.append(root);
      }
    }

    show(message) {
      if (this._timer !== null) {
        global.clearTimeout(this._timer);
        this._timer = null;
      }
      if (typeof message === "string") this.setMessage(message);
      this.setProgress(null);
      this.element.setAttribute("aria-hidden", "false");
      this.element.classList.add("is-visible");
      document.documentElement.classList.add("glab-loader-active");

      const timeout = Number(this.options.timeoutMs);
      if (Number.isFinite(timeout) && timeout > 0) {
        this._timer = global.setTimeout(() => this.hide(), timeout);
      }
      return this;
    }

    hide() {
      if (this._timer !== null) {
        global.clearTimeout(this._timer);
        this._timer = null;
      }
      if (!this.element) return this;

      this.element.classList.remove("is-visible");
      this.element.setAttribute("aria-hidden", "true");

      const anotherVisibleLoader = document.querySelector(".glab-loader.is-visible");
      if (!anotherVisibleLoader) {
        document.documentElement.classList.remove("glab-loader-active");
      }
      return this;
    }

    setMessage(message) {
      this._label.textContent = String(message == null ? "" : message);
      return this;
    }

    setProgress(value) {
      if (value === null || value === undefined || value === "") {
        this.element.dataset.progress = "indeterminate";
        this._fill.style.removeProperty("width");
        this._track.setAttribute("aria-hidden", "true");
        this._track.removeAttribute("role");
        this._track.removeAttribute("aria-label");
        this._track.removeAttribute("aria-valuemin");
        this._track.removeAttribute("aria-valuemax");
        this._track.removeAttribute("aria-valuenow");
        return this;
      }

      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        throw new TypeError("GLabLoader.setProgress(value) expects a number from 0 to 100, or null.");
      }

      const progress = Math.min(100, Math.max(0, numeric));
      this.element.dataset.progress = "determinate";
      this._fill.style.width = `${progress}%`;
      this._track.removeAttribute("aria-hidden");
      this._track.setAttribute("role", "progressbar");
      this._track.setAttribute("aria-label", String(this.options.progressLabel));
      this._track.setAttribute("aria-valuemin", "0");
      this._track.setAttribute("aria-valuemax", "100");
      this._track.setAttribute("aria-valuenow", String(Math.round(progress)));
      return this;
    }

    destroy() {
      this.hide();
      if (this._createdElement && this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
      this._mark = null;
      this._label = null;
      this._track = null;
      this._fill = null;
    }
  }

  global.GLabLoader = GLabLoader;
})(window);
