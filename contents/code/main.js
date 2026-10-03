// KWin 6. Match application identity rather than window titles.
var applications = [
    { id: "firefox", name: "Firefox", key: "Meta+F", pattern: /^(?:org\.mozilla\.)?firefox(?:-esr|-bin)?$/ },
    { id: "chrome", name: "Google Chrome", key: "Meta+C", pattern: /^(?:com\.google\.chrome|google-chrome(?:-stable|-beta|-unstable)?)$/ },
    { id: "emacs", name: "Emacs", key: "Meta+E", pattern: /^(?:org\.gnu\.)?emacs$/ },
    { id: "konsole", name: "Konsole", key: "Meta+K", pattern: /^(?:org\.kde\.)?konsole$/ },
    { id: "thunderbird", name: "Thunderbird", key: "Meta+T", pattern: /^(?:org\.mozilla\.)?thunderbird(?:-esr|-bin)?$/ }
];

var activationCounter = 0;
var lastActivated = {};

function rememberWindow(window) {
    if (window) {
        lastActivated[String(window.internalId)] = ++activationCounter;
    }
}

workspace.windowActivated.connect(rememberWindow);
workspace.windowRemoved.connect(function (window) {
    delete lastActivated[String(window.internalId)];
});
rememberWindow(workspace.activeWindow);

function normalizedIdentity(value) {
    return String(value || "").toLowerCase().replace(/^.*\//, "").replace(/\.desktop$/, "");
}

function matches(window, application) {
    return !window.deleted && (window.normalWindow || window.dialog)
        && (application.pattern.test(normalizedIdentity(window.resourceClass))
            || application.pattern.test(normalizedIdentity(window.resourceName))
            || application.pattern.test(normalizedIdentity(window.desktopFileName)));
}

function switchTo(application) {
    // windowList has a stable order, so cycling does not depend on stacking changes.
    var windows = workspace.windowList().filter(function (window) {
        return matches(window, application);
    });
    if (windows.length === 0) {
        return; // These shortcuts only switch to applications already open.
    }

    var currentIndex = windows.indexOf(workspace.activeWindow);
    var target;
    if (currentIndex >= 0) {
        target = windows[(currentIndex + 1) % windows.length];
    } else {
        // Return to the most recently focused window of this application.
        target = windows[0];
        for (var i = 1; i < windows.length; ++i) {
            if ((lastActivated[String(windows[i].internalId)] || 0)
                    > (lastActivated[String(target.internalId)] || 0)) {
                target = windows[i];
            }
        }
    }

    // Visit the window's activity and desktop instead of moving the window.
    if (target.activities.length > 0
            && target.activities.indexOf(workspace.currentActivity) < 0) {
        workspace.currentActivity = target.activities[0];
    }
    if (target.desktops.length > 0
            && target.desktops.indexOf(workspace.currentDesktop) < 0) {
        workspace.currentDesktop = target.desktops[0];
    }
    target.minimized = false;
    workspace.activeWindow = target;
    workspace.raiseWindow(target);
}

applications.forEach(function (application) {
    registerShortcut("ApplicationShortcuts-" + application.id,
        "Switch to " + application.name, application.key, function () {
            switchTo(application);
        });
});
