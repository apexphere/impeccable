/*
 * ds/card.js — shared theme toggle for every preview card.
 *
 * Injects a fixed dark/light switch that flips the <html> class between
 * `dark` and `light`. All cards read var(--ks-*)/var(--color-*), which remap
 * under html.light in tokens.css, so both modes render live — the same
 * mechanism the real site uses. Default mode is whatever class the card ships
 * with (`dark`); the choice persists per browser via localStorage.
 */
(function () {
  var root = document.documentElement;
  var KEY = "ds-theme";

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  if (saved === "light" || saved === "dark") {
    root.classList.remove("light", "dark");
    root.classList.add(saved);
  } else if (!root.classList.contains("light") && !root.classList.contains("dark")) {
    root.classList.add("dark");
  }

  function isLight() { return root.classList.contains("light"); }

  var btn = document.createElement("button");
  btn.type = "button";
  btn.style.cssText = [
    "position:fixed", "top:16px", "right:16px", "z-index:9999",
    "font-family:var(--ks-mono)", "font-size:11px", "letter-spacing:0.1em",
    "text-transform:uppercase", "cursor:pointer",
    "padding:7px 12px", "border-radius:999px",
    "border:1px solid var(--ks-rule)",
    "background:var(--ks-lacquer-raised)", "color:var(--ks-text-muted)",
    "transition:color var(--duration-fast) var(--ease-out)"
  ].join(";");

  function render() {
    btn.textContent = isLight() ? "☾ Dark" : "☀ Light";
  }

  btn.addEventListener("click", function () {
    var next = isLight() ? "dark" : "light";
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    render();
  });

  render();
  document.body.appendChild(btn);
})();
