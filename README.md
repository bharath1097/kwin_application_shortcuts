# Application Shortcuts

A KWin 6 script for switching to open application windows with keyboard shortcuts.
It identifies applications by their window class, resource name, or desktop file
name rather than their window titles.

## Default shortcuts

| Shortcut | Application |
| --- | --- |
| Meta+F | Firefox |
| Meta+C | Google Chrome |
| Meta+E | Emacs |
| Meta+K | Konsole |
| Meta+T | Thunderbird |

Focuses the most recently used matching window, restores minimized windows,
and switches to their desktop and activity when necessary. Pressing an application's
shortcut while it is focused cycles through its windows. If the application has
no open windows, the shortcut does nothing. Emacs must have a graphical window;
Emacs running inside a terminal is identified as the terminal application.

## Installation and setup

1. Place the script files in `~/.local/share/kwin/scripts/application-shortcuts/`,
   with `metadata.json` at the top level and `contents/code/main.js` beneath it.
2. Open System Settings → Window Management → KWin Scripts, enable
   **Application Shortcuts**, and apply.
3. Under Keyboard → Shortcuts → KWin, find the **Switch to …** actions and
   check their assignments. If a default shortcut conflicts with another action,
   remove that assignment or choose a different shortcut.

Alternatively, enable the installed script from a terminal in your KDE desktop session:

```sh
kwriteconfig6 --file kwinrc --group Plugins --key application-shortcutsEnabled true
qdbus6 org.kde.KWin /KWin reconfigure
```

## Customize or disable

Edit the `applications` array in `contents/code/main.js` to add application
identities and default shortcuts. Existing shortcut assignments are retained by
KDE; change those in System Settings → Keyboard → Shortcuts → KWin.
After changing the script, disable it and apply, then enable it and apply again.
Disable **Application Shortcuts** in KWin Scripts to stop using it.

API reference: [KWin scripting API](https://develop.kde.org/docs/plasma/kwin/api/).
