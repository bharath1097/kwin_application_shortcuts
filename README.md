# Application Shortcuts

KWin 6 script installed in `~/.local/share/kwin/scripts/application-shortcuts`.

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

## Enable

1. Open System Settings → Keyboard → Shortcuts → KWin. Remove Meta+T from
   **Toggle Tiles Editor**, then apply. This shortcut is already assigned on this machine.
2. Open System Settings → Window Management → KWin Scripts, enable
   **Application Shortcuts**, and apply.
3. Under Keyboard → Shortcuts → KWin, check the five **Switch to …** actions
   and assign the keys above if any defaults were blocked by a conflict.

To enable from a normal desktop terminal instead:

```sh
kwriteconfig6 --file kwinrc --group Plugins --key application-shortcutsEnabled true
qdbus6 org.kde.KWin /KWin reconfigure
```

Resolve the Meta+T conflict in System Settings first. The Codex environment cannot
reach the desktop D-Bus session or write `~/.config`, so activation must happen
in your desktop session.

## Customize or disable

Edit the `applications` array in `contents/code/main.js` to add application
identities and default shortcuts. Existing shortcut assignments are retained by
KDE; change those in System Settings → Keyboard → Shortcuts → KWin.
After changing the script, disable it and apply, then enable it and apply again.
Disable **Application Shortcuts** in KWin Scripts to stop using it.

API reference: https://develop.kde.org/docs/plasma/kwin/api/
