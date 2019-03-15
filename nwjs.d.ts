declare namespace nw {
    const App: NWApp;
    class NWApp {
        public readonly argv: string[];
        public readonly fullArgv: string[];
        public readonly filteredArgv: string[];
        public readonly startPath: string;
        public readonly manifest: object;
        clearCache(): void;
        clearAppCache(manifest_url: string): void;
        closeAllWindows(): void;
        crashBrowser(): void;
        crashRenderer(): void;
        getProxyForURL(url: string): void;
        setProxyConfig(config: string, pac_url: string): void;
        quit(): void;
        setCrashDumpDir(dir: string): void;
        addOriginAccessWhitelistEntry(sourceOrigin: string, destinationProtocol: string, destinationHost: string, allowDestinationSubdomain: boolean): void;
        removeOriginAccessWhitelistEntry(sourceOrigin: string, destinationProtocol: string, destinationHost: string, allowDestinationSubdomain: boolean): void;
        registerGlobalHotKey(shortcut: Shortcut): void;
        unregisterGlobalHotKey(shortcut: Shortcut): void;
        on(event: "open", listener: (args: string) => void): this;
        on(event: "reopen", listener: () => void): this;
    }
    namespace Shortcut {
        interface IShortcutOptions {
            key: string;
            active?: Function;
            failed?: Function;
        }
    }
    class Shortcut {
        public active?: Function;
        public failed?: Function;
        public key: string;
        constructor(option: {
            key: string;
            active?: Function;
            failed?: Function;
        });
        on(name: "active", ...args: any[]): this;
        on(name: "failed", ...args: any[]): this;
    }
    namespace Clipboard {
        function get(): Clipboard;
        interface IClipboardData {
            data: string;
            type?: "text" | "png" | "jpeg" | "html" | "rtf";
            raw?: boolean;
        }
    }
    class Clipboard {
        set(data: string, type?: "text" | "png" | "jpeg" | "html" | "rtf", raw?: boolean): this;
        set(clipboardData: Clipboard.IClipboardData): this;
        set(clipboardDataList: Clipboard.IClipboardData[]): this;
        get(type?: string, raw?: boolean): string;
        get(clipboardData: Clipboard.IClipboardData): string;
        get(clipboardDataList: Clipboard.IClipboardData[]): Clipboard.IClipboardData[];
        readAvailableTypes(): "text" | "png" | "jpeg" | "html" | "rtf"[];
        clear(): this;
    }
    class MenuItem {
        public readonly type: "normal" | "checkbox" | "separator";
        public label: string;
        public icon: string;
        public iconIsTemplate: boolean;
        public tooltip: string;
        public checked: boolean;
        public enabled: boolean;
        public readonly submenu: Menu;
        public click: Function;
        public key: string;
        public modifiers: string;
        constructor(option?: {
            label?: string;
            icon?: string;
            tooltip?: string;
            type?: "normal" | "checkbox" | "separator";
            click?: Function;
            enabled?: boolean;
            checked?: boolean;
            submenu?: Menu;
            key?: string;
            modifiers?: string;
        });
        on(event: "click", listener: (...args: any[]) => void): this;
    }
    class Menu {
        public items: MenuItem[];
        constructor(option?: {
            type?: string;
        });
        append(item: MenuItem): this;
        insert(item: MenuItem, i: number): this;
        remove(item: MenuItem): this;
        removeAt(i: number): this;
        popup(x: number, y: number): this;
        createMacBuiltin(appname: string, options?: {
            hideEdit?: boolean;
            hideWindow?: boolean;
        }): this;
    }
    interface IScreenData {
        id: number;
        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        work_area: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        scaleFactor: number;
        isBuiltIn: boolean;
        rotation: number;
        touchSupport: number;
    }
    class NWDesktopCaptureMonitor {
        public started: boolean;
        constructor();
        start(should_include_screens: boolean, should_include_windows: boolean): this;
        stop(): this;
        registerStream(id: string): this;
        on(event: "added", listener: (id: string, name: string, order: number, type: "screen" | "window" | "other" | "unknown", primary: boolean) => void): this;
        on(event: "removed", listener: (order: number) => void): this;
        on(event: "orderchanged", listener: (id: string, new_order: number, old_order: number) => void): this;
        on(event: "namechanged", listener: (id: string, name: string) => void): this;
        on(event: "thumbnailchanged", listener: (id: string, thumbnail: string) => void): this;
    }
    const Screen: NWScreen;
    class NWScreen {
        public readonly screens: IScreenData[];
        public readonly DesktopCaptureMonitor: NWDesktopCaptureMonitor;
        constructor();
        Init(): void;
        chooseDesktopMedia(sources: "window" | "screen" [], callback: (streamId: number | false) => void): this;
        on(event: "displayBoundsChanged", listener: (screen: IScreenData) => void): this;
        on(event: "displayAdded", listener: (screen: IScreenData) => void): this;
        on(event: "displayRemoved", listener: (screen: IScreenData) => void): this;
    }
    interface IWindowSubfields {
        id?: string;
        title?: string;
        width?: number;
        height?: number;
        icon?: string;
        position?: "null" | "center" | "mouse";
        min_width?: number;
        min_height?: number;
        max_width?: number;
        max_height?: number;
        as_desktop?: boolean;
        resizable?: boolean;
        always_on_top?: boolean;
        visible_on_all_workspaces?: boolean;
        fullscreen?: boolean;
        show_in_taskbar?: boolean;
        frame?: boolean;
        show?: boolean;
        kiosk?: boolean;
        transparent?: boolean;
    }
    interface IWindowOptions extends IWindowSubfields {
        new_instance?: boolean;
        inject_js_start?: string;
        inject_js_end?: string;
    }
    class Window {
        public readonly window: any;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public title: string;
        public menu: Menu;
        public readonly isAlwaysOnTop: boolean;
        public readonly isFullscreen: boolean;
        public readonly isTransparent: boolean;
        public readonly isKioskMode: boolean;
        public zoomLevel: number;
        public cookies: {
            [key: string]: Function;
        }
        constructor();
        static get(window_object: any): Window;
        static open(url: string, options?: IWindowOptions, callback?: (win: Window) => void): Window;
        moveTo(x: number, y: number): this;
        moveBy(x: number, y: number): this;
        resizeTo(width: number, height: number): this;
        resizeBy(width: number, height: number): this;
        focus(): this;
        blur(): this;
        show(is_show?: boolean): this;
        hide(): this;
        close(force?: boolean): this;
        reload(): this;
        reloadDev(): this;
        reloadIgnoringCache(): this;
        maximize(): this;
        minimize(): this;
        restore(): this;
        enterFullscreen(): this;
        leaveFullscreen(): this;
        toggleFullscreen(): this;
        enterKioskMode(): this;
        leaveKioskMode(): this;
        toggleKioskMode(): this;
        setShadow(shadow: boolean): this;
        showDevTools(iframe?: string | HTMLFrameElement, callback?: (dev_win: Window) => void): this;
        closeDevTools(): this;
        getPrinters(callback: object[]): this;
        isDevToolsOpen(): boolean;
        print(options: {
            autoprint: boolean;
            printer: string;
            pdf_path: string;
            headerFooterEnabled: boolean;
            landscape: boolean;
            mediaSize: object;
            shouldPrintBackgrounds: boolean;
            marginsType: 0 | 1 | 2| 3;
            marginsCustom: object;
            copies: number;
            scaleFactor: number;
            headerString: string;
            footerString: string;
        } | {}): this;
        setMaximumSize(width: number, height: number): this;
        setMinimumSize(width: number, height: number): this;
        setResizable(resizable: boolean): this;
        setAlwaysOnTop(top: boolean): this;
        setVisibleOnAllWorkspaces(visible: boolean): this;
        canSetVisibleOnAllWorkspaces(): boolean;
        setPosition(position: "null" | "center" | "mouse"): this;
        setShowInTaskbar(show: boolean): this;
        requestAttention(attention: boolean | number): this;
        capturePage(callback: Function, config?: "png" | "jpeg" | {
            format?: "png" | "jpeg";
            datatype?: "raw" | "buffer" | "datauri";
        }): this;
        setProgressBar(progress: number): this;
        setBadgeLabel(label: string): this;
        eval(frame: HTMLFrameElement | null, script: string): this;
        evalNWBin(frame: HTMLFrameElement | null, path: string | ArrayBuffer | Buffer): this;
        evalNWBinModule(frame: HTMLFrameElement | null, path: string | ArrayBuffer | Buffer, module_path: string): this;
        on(event: "close", listener: () => void): this;
        on(event: "closed", listener: () => void): this;
        on(event: "loading", listener: () => void): this;
        on(event: "loaded", listener: () => void): this;
        on(event: "document-start", listener: (frame: HTMLFrameElement | null) => void): this;
        on(event: "document-end", listener: (frame: HTMLFrameElement | null) => void): this;
        on(event: "focus", listener: () => void): this;
        on(event: "blur", listener: () => void): this;
        on(event: "minimize", listener: () => void): this;
        on(event: "restore", listener: () => void): this;
        on(event: "maximize", listener: () => void): this;
        on(event: "move", listener: (x: number, y: number) => void): this;
        on(event: "resize", listener: (width: number, height: number) => void): this;
        on(event: "enter-fullscreen", listener: () => void): this;
        on(event: "zoom", listener: () => void): this;
        on(event: "devtools-closed", listener: () => void): this;
        on(event: "new-win-policy", listener: (frame: HTMLFrameElement | null, url: string, policy: {
            ignore(): void;
            forceCurrent(): void;
            forceDownload(): void;
            forceNewWindow(): void;
            forceNewPopup(): void;
            setNewWindowManifest(m: IWindowSubfields): void;
        }) => void): this;
        on(event: "navigation", listener: (frame: HTMLFrameElement | null, url: string, policy: {
            ignore(): void;
        }) => void): this;
    }
    namespace Shell {
        function openExternal(uri: string): void;
        function openItem(file_path: string): void;
        function showItemInFolder(file_path: string): void;
    }
    class Tray {
        public title: string;
        public tooltip: string;
        public icon: string;
        public alticon: string;
        public menu: Menu;
        constructor(option: {
            title: string;
            tooltip: string;
            icon: string;
            alticon: string;
            iconsAreTemplates: boolean;
            menu: Menu;
        });
        remove(): void;
        on(event: "click", listener: (...args: any[]) => void): this;
    }
}