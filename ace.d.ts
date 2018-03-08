declare namespace Ace {
  export type NewLineMode = 'auto' | 'unix' | 'windows';

  export interface Anchor extends EventEmitter {
    getPosition(): Position;
    getDocument(): Document;
    setPosition(row: number, column: number, noClip?: boolean): void;
    detach(): void;
    attach(doc: Document): void;
  }

  export interface Document extends EventEmitter {
    setValue(text: string): void;
    getValue(): string;
    createAnchor(row: number, column: number): Anchor;
    getNewLineCharacter(): string;
    setNewLineMode(newLineMode: NewLineMode): void;
    getNewLineMode(): NewLineMode;
    isNewLine(text: string): boolean;
    getLine(row: number): string;
    getLines(firstRow: number, lastRow: number): string[];
    getAllLines(): string[];
    getTextRange(range: Range): string;
    getLinesForRange(range: Range): string[];
    insert(position: Position, text: string): Position;
    insertInLine(position: Position, text: string): Position;
    clippedPos(row: number, column: number): Point;
    clonePos(pos: Point): Point;
    pos(row: number, column: number): Point;
    insertFullLines(row: number, lines: string[]): void;
    insertMergedLines(position: Position, lines: string[]): Point;
    remove(range: Range): Position;
    removeInLine(row: number, startColumn: number, endColumn: number): Position;
    removeFullLines(firstRow: number, lastRow: number): string[];
    removeNewLine(row: number): void;
    replace(range: Range, text: string): Position;
    applyDeltas(deltas: Delta[]): void;
    revertDeltas(deltas: Delta[]): void;
    applyDelta(delta: Delta, doNotValidate?: boolean): void;
    revertDelta(delta: Delta): void;
    indexToPosition(index: number, startRow: number): Position;
    positionToIndex(pos: Position, startRow?: number): number;
  }

  export interface FoldLine {
    folds: Fold[];
    range: Range;
    start: Point;
    end: Point;

    shiftRow(shift: number): void;
    addFold(fold: Fold): void;
    containsRow(row: number): boolean;
    walk(callback: Function, endRow?: number, endColumn?: number): void;
    getNextFoldTo(row: number, column: number): null | { fold: Fold, kind: string };
    addRemoveChars(row: number, column: number, len: number): void;
    split(row: number, column: number): FoldLine;
    merge(foldLineNext: FoldLine): void;
    idxToPosition(idx: number): Point;
  }

  export interface Fold {
    range: Range;
    start: Point;
    end: Point;
    foldLine?: FoldLine;
    sameRow: boolean;
    subFolds: Fold[];

    setFoldLine(foldLine: FoldLine): void;
    clone(): Fold;
    addSubFold(fold: Fold): Fold;
    restoreRange(range: Range): void;
  }

  export interface Range {
    start: Point;
    end: Point;

    isEqual(range: Range): boolean;
    toString(): string;
    contains(row: number, column: number): boolean;
    compareRange(range: Range): number;
    comparePoint(p: Point): number;
    containsRange(range: Range): boolean;
    intersects(range: Range): boolean;
    isEnd(row: number, column: number): boolean;
    isStart(row: number, column: number): boolean;
    setStart(row: number, column: number): void;
    setEnd(row: number, column: number): void;
    inside(row: number, column: number): boolean;
    insideStart(row: number, column: number): boolean;
    insideEnd(row: number, column: number): boolean;
    compare(row: number, column: number): number;
    compareStart(row: number, column: number): number;
    compareEnd(row: number, column: number): number;
    compareInside(row: number, column: number): number;
    clipRows(firstRow: number, lastRow: number): Range;
    extend(row: number, column: number): Range;
    isEmpty(): boolean;
    isMultiLine(): boolean;
    clone(): Range;
    collapseRows(): Range;
    toScreenRange(session: EditSession): Range;
    moveBy(row: number, column: number): void;
  }

  export interface EditorOptions {
    selectionStyle: string;
    highlightActiveLine: boolean;
    highlightSelectedWord: boolean;
    readOnly: boolean;
    copyWithEmptySelection: boolean;
    cursorStyle: 'ace' | 'slim' | 'smooth' | 'wide';
    mergeUndoDeltas: true | false | 'always';
    behavioursEnabled: boolean;
    wrapBehavioursEnabled: boolean;
    autoScrollEditorIntoView: boolean;
    keyboardHandler: string;
    value: string;
    session: EditSession;

    // Pass-through to VirtualRenderer
    hScrollBarAlwaysVisible: boolean;
    vScrollBarAlwaysVisible: boolean;
    highlightGutterLine: boolean;
    animatedScroll: boolean;
    showInvisibles: boolean;
    showPrintMargin: boolean;
    printMarginColumn: number;
    printMargin: boolean | number;
    fadeFoldWidgets: boolean;
    showFoldWidgets: boolean;
    showLineNumbers: boolean;
    showGutter: boolean;
    displayIndentGuides: boolean;
    fontSize: number;
    fontFamily: string;
    maxLines: number;
    minLines: number;
    scrollPastEnd: boolean;
    fixedWidthGutter: boolean;
    theme: string;
    hasCssTransforms: boolean;

    // Pass-through to MouseHandler
    scrollSpeed: number;
    dragDelay: number;
    dragEnabled: boolean;
    focusTimeout: number;
    tooltipFollowsMouse: boolean;

    // Pass-through to EditSession
    firstLineNumber: number;
    overwrite: boolean;
    newLineMode: NewLineMode;
    useWorker: boolean;
    useSoftTabs: boolean;
    navigateWithinSoftTabs: boolean;
    tabSize: number;
    wrap: boolean | number;
    indentedSoftWrap: boolean;
    foldStyle: 'markbegin' | 'markbeginend' | 'manual';
    mode: string;
  }

  export interface EditSessionOptions {
    wrap: string | number;
    wrapMethod: 'code' | 'text' | 'auto';
    indentedSoftWrap: boolean;
    firstLineNumber: number;
    useWorker: boolean;
    useSoftTabs: boolean;
    tabSize: number;
    navigateWithinSoftTabs: boolean;
    foldStyle: 'markbegin' | 'markbeginend' | 'manual';
    overwrite: boolean;
    newLineMode: NewLineMode;
    mode: string;
  }

  export interface SearchOptions {
    needle: string | RegExp;
    preventScroll: boolean;
    backwards: boolean;
    start: Range;
    skipCurrent: boolean;
    range: Range;
    preserveCase: boolean;
    regExp: RegExp;
    wholeWord: string;
    caseSensitive: boolean;
    wrap: boolean;
  }

  export interface EventEmitter {
    once(name: string, callback: Function): void;
    setDefaultHandler(name: string, callback: Function): void;
    removeDefaultHandler(name: string, callback: Function): void;
    on(name: string, callback: Function, capturing?: boolean): void;
    addEventListener(name: string, callback: Function, capturing?: boolean): void;
    off(name: string, callback: Function): void;
    removeListener(name: string, callback: Function): void;
    removeEventListener(name: string, callback: Function): void;
  }

  export interface Point {
    row: number;
    column: number;
  }

  export interface Delta {
    action: 'insert' | 'remove';
    start: Point;
    end: Point;
    lines: string[];
  }

  export interface Annotation {
    row?: number;
    column?: number;
    text: string;
    type: string;
  }

  export interface Command {
    name?: string;
    bindKey?: string | { mac?: string, win?: string };
    readOnly?: boolean;
    exec: (editor: Editor, args?: any) => void;
  }

  export type CommandLike = Command | ((editor: Editor) => void);

  export interface KeyboardHandler {
    handleKeyboard: Function;
  }

  export interface MarkerLike {
    range: Range;
    type: string;
    renderer?: MarkerRenderer;
    clazz: string;
    inFront: boolean;
    id: number;
    update?: (html: string[],
              // TODO maybe define Marker class
              marker: any,
              session: EditSession,
              config: any) => void;
  }

  export type MarkerRenderer = (html: string[],
                                range: Range,
                                left: number,
                                top: number,
                                config: any) => void;

  export interface Token {
    type: string;
    value: string;
    index?: number;
    start?: number;
  }

  export interface Completion {
    value: string;
    score: number;
    meta?: string;
    name?: string;
    caption?: string;
  }

  export interface Tokenizer {
    removeCapturingGroups(src: string): string;
    createSplitterRegexp(src: string, flag?: string): RegExp;
    getLineTokens(line: string, startState: string | string[]): Token[];
  }

  export interface TextMode {
    getTokenizer(): Tokenizer;
    toggleCommentLines(state: any,
                       session: EditSession,
                       startRow: number,
                       endRow: number): void;
    toggleBlockComment(state: any,
                       session: EditSession,
                       range: Range,
                       cursor: Position): void;
    getNextLineIndent(state: any, line: string, tab: string): string;
    checkOutdent(state: any, line: string, input: string): boolean;
    autoOutdent(state: any, doc: Document, row: number): void;
    // TODO implement WorkerClient types
    createWorker(session: EditSession): any;
    createModeDelegates(mapping: {[key: string]: string}): void;
    transformAction(state: string,
                    action: string,
                    editor: Editor,
                    session: EditSession,
                    text: string): any;
    getKeywords(append?: boolean): Array<string | RegExp>;
    getCompletions(state: string,
                   session: EditSession,
                   pos: Position,
                   prefix: string): Completion[];
  }

  export interface Config {
    get(key: string): any;
    set(key: string, value: any): void;
    all(): {[key: string]: any};
    moduleUrl(name: string, component?: string): string;
    setModuleUrl(name: string, subst: string): string;
    loadModule(moduleName: string | [string, string],
               onLoad: (module: any) => void): void;
    init(packaged: any): any;
    defineOptions(obj: any, path: string, options: {[key: string]: any}): Config;
    resetOptions(obj: any): void;
    setDefaultValue(path: string, name: string, value: any): void;
    setDefaultValues(path: string, optionHash: {[key: string]: any}): void;
  }

  export interface OptionsProvider {
    setOptions(optList: {[key: string]: any}): void;
    getOptions(optionNames?: string[] | {[key: string]: any}): {[key: string]: any};
    setOption(name: string, value: any): void;
    getOption(name: string): any;
  }

  export interface UndoManager {
    addSession(session: EditSession): void;
    add(delta: Delta, allowMerge: boolean, session: EditSession): void;
    addSelection(selection: string, rev?: number): void;
    startNewGroup(): void;
    markIgnored(from: number, to?: number): void;
    getSelection(rev: number, after?: boolean): { value: string, rev: number };
    getRevision(): number;
    getDeltas(from: number, to?: number): Delta[];
    undo(session: EditSession, dontSelect?: boolean): void;
    redo(session: EditSession, dontSelect?: boolean): void;
    reset(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    bookmark(rev?: number): void;
    isAtBookmark(): boolean;
  }

  export interface EditSession extends EventEmitter, OptionsProvider {
    selection: Selection;

    on(name: 'changeFold',
       callback: (obj: { data: Fold, action: string }) => void): void;
    on(name: 'changeScrollLeft', callback: (scrollLeft: number) => void): void;
    on(name: 'changeScrollTop', callback: (scrollTop: number) => void): void;
    on(name: 'tokenizerUpdate',
       callback: (obj: { data: { first: number, last: number } }) => void): void;


    setOption<T extends keyof EditSessionOptions>(name: T, value: EditSessionOptions[T]): void;
    getOption<T extends keyof EditSessionOptions>(name: T): EditSessionOptions[T];

    setDocument(doc: Document): void;
    getDocument(): Document;
    resetCaches(): void;
    setValue(text: string): void;
    getValue(): string;
    getSelection(): Selection;
    getState(row: number): string;
    getTokens(row: number): Token[];
    getTokenAt(row: number, column: number): Token | null;
    setUndoManager(undoManager: UndoManager): void;
    markUndoGroup(): void;
    getUndoManager(): UndoManager;
    getTabString(): string;
    setUseSoftTabs(val: boolean): void;
    getUseSoftTabs(): boolean;
    setTabSize(tabSize: number): void;
    getTabSize(): number;
    isTabStop(position: Position): boolean;
    setNavigateWithinSoftTabs(navigateWithinSoftTabs: boolean): void;
    getNavigateWithinSoftTabs(): boolean;
    setOverwrite(overwrite: boolean): void;
    getOverwrite(): boolean;
    toggleOverwrite(): void;
    addGutterDecoration(row: number, className: string): void;
    removeGutterDecoration(row: number, className: string): void;
    getBreakpoints(): string[];
    setBreakpoints(rows: number[]): void;
    clearBreakpoints(): void;
    setBreakpoint(row: number, className: string): void;
    clearBreakpoint(row: number): void;
    addMarker(range: Range,
              clazz: string,
              type: MarkerRenderer,
              inFront: boolean): number;
    addDynamicMarker(marker: MarkerLike, inFront: boolean): MarkerLike;
    removeMarker(markerId: number): void;
    getMarkers(inFront?: boolean): MarkerLike[];
    highlight(re: RegExp): void;
    highlightLines(startRow: number,
                   endRow: number,
                   clazz: string,
                   inFront?: boolean): Range;
    setAnnotations(annotations: Annotation[]): void;
    getAnnotations(): Annotation[];
    clearAnnotations(): void;
    getWordRange(row: number, column: number): Range;
    getAWordRange(row: number, column: number): Range;
    setNewLineMode(newLineMode: NewLineMode): void;
    getNewLineMode(): NewLineMode;
    setUseWorker(useWorker: boolean): void;
    getUseWorker(): boolean;
    setMode(mode: TextMode | string, callback?: () => void): void;
    getMode(): TextMode;
    setScrollTop(scrollTop: number): void;
    getScrollTop(): number;
    setScrollLeft(scrollLeft: number): void;
    getScrollLeft(): number;
    getScreenWidth(): number;
    getLineWidgetMaxWidth(): number;
    getLine(row: number): string;
    getLines(firstRow: number, lastRow: number): string[];
    getLength(): number;
    getTextRange(range: Range): string;
    insert(position: Position, text: string): void;
    remove(range: Range): void;
    removeFullLines(firstRow: number, lastRow: number): void;
    undoChanges(deltas: Delta[], dontSelect?: boolean): void;
    redoChanges(deltas: Delta[], dontSelect?: boolean): void;
    setUndoSelect(enable: boolean): void;
    replace(range: Range, text: string): void;
    moveText(fromRange: Range, toPosition: Position, copy?: boolean): void;
    indentRows(startRow: number, endRow: number, indentString: string): void;
    outdentRows(range: Range): void;
    moveLinesUp(firstRow: number, lastRow, number): void;
    moveLinesDown(firstRow: number, lastRow: number): void;
    duplicateLines(firstRow: number, lastRow: number): void;
    setUseWrapMode(useWrapMode: boolean): void;
    getUseWrapMode(): boolean;
    setWrapLimitRange(min: number, max: number): void;
    adjustWrapLimit(desiredLimit: number): boolean;
    getWrapLimit(): number;
    setWrapLimit(limit: number): void;
    getWrapLimitRange(): { min: number, max: number };
    getRowLineCount(row: number): number;
    getRowWrapIndent(screenRow: number): number;
    getScreenLastRowColumn(screenRow: number): number;
    getDocumentLastRowColumn(docRow: number, docColumn: number): number;
    getdocumentLastRowColumnPosition(docRow: number, docColumn: number): Position;
    getRowSplitData(row: number): string | undefined;
    getScreenTabSize(screenColumn: number): number;
    screenToDocumentRow(screenRow: number, screenColumn: number): number;
    screenToDocumentColumn(screenRow: number, screenColumn: number): number;
    screenToDocumentPosition(screenRow: number,
                             screenColumn: number,
                             offsetX?: number): Position;
    documentToScreenPosition(docRow, docColumn): Position;
    documentToScreenColumn(row: number, docColumn: number): number;
    documentToScreenRow(docRow: number, docColumn: number): number;
    getScreenLength(): number;
    destroy(): void;
  }

  export interface KeyBinding {
    setDefaultHandler(handler: KeyboardHandler): void;
    setKeyboardHandler(handler: KeyboardHandler): void;
    addKeyboardHandler(handler: KeyboardHandler, pos: number): void;
    removeKeyboardHandler(handler: KeyboardHandler): boolean;
    getKeyboardHandler(): KeyboardHandler;
    getStatusText(): string;
  }

  export interface CommandManager extends EventEmitter {
    on(name: 'exec', callback: (obj: {
                                  editor: Editor,
                                  command: Command,
                                  args: any[]
                               }) => void): void;
    once(name: string, callback: Function): void;
    setDefaultHandler(name: string, callback: Function): void;
    removeDefaultHandler(name: string, callback: Function): void;
    on(name: string, callback: Function, capturing?: boolean): void;
    addEventListener(name: string, callback: Function, capturing?: boolean): void;
    off(name: string, callback: Function): void;
    removeListener(name: string, callback: Function): void;
    removeEventListener(name: string, callback: Function): void;

    exec(command: string, editor: Editor, args: any): boolean;
    toggleRecording(editor: Editor): void;
    replay(editor: Editor): void;
    addCommand(command: Command): void;
    removeCommand(command: Command, keepCommand?: boolean): void;
    bindKey(key: string | { mac?: string, win?: string},
            command: CommandLike,
            position?: number): void;
  }

  export const CommandManager: {
    new(platform: 'mac' | 'win', commands: Array<string | CommandLike>): CommandManager;
  };

  export interface VirtualRenderer extends OptionsProvider, EventEmitter {
    container: HTMLElement;

    setSession(session: EditSession): void;
    updateLines(firstRow: number, lastRow: number, force?: boolean): void;
    updateText(): void;
    updateFull(force?: boolean): void;
    updateFontSize(): void;
    adjustWrapLimit(): boolean;
    setAnimatedScroll(shouldAnimate: boolean): void;
    getAnimatedScroll(): boolean;
    setShowInvisibles(showInvisibles: boolean): void;
    getShowInvisibles(): boolean;
    setDisplayIndentGuides(display: boolean): void;
    getDisplayIndentGuides(): boolean;
    setShowPrintMargin(showPrintMargin: boolean): void;
    getShowPrintMargin(): boolean;
    setPrintMarginColumn(showPrintMargin: boolean): void;
    getPrintMarginColumn(): boolean;
    setShowGutter(show: boolean): void;
    getShowGutter(): boolean;
    setFadeFoldWidgets(show: boolean): void;
    getFadeFoldWidgets(): boolean;
    setHighlightGutterLine(shouldHighlight: boolean): void;
    getHighlightGutterLine(): boolean;
    getContainerElement(): HTMLElement;
    getMouseEventTarget(): HTMLElement;
    getTextAreaContainer(): HTMLElement;
    getFirstVisibleRow(): number;
    getFirstFullyVisibleRow(): number;
    getLastFullyVisibleRow(): number;
    getLastVisibleRow(): number;
    setPadding(padding: number): void;
    setScrollMargin(top: number,
                    bottom: number,
                    left: number,
                    right: number): void;
    setHScrollBarAlwaysVisible(alwaysVisible: boolean): void;
    getHScrollBarAlwaysVisible(): boolean;
    setVScrollBarAlwaysVisible(alwaysVisible: boolean): void;
    getVScrollBarAlwaysVisible(): boolean;
    freeze(): void;
    unfreeze(): void;
    updateFrontMarkers(): void;
    updateBackMarkers(): void;
    updateBreakpoints(): void;
    setAnnotations(annotations: Annotation[]): void;
    updateCursor(): void;
    hideCursor(): void;
    showCursor(): void;
    scrollSelectionIntoView(anchor: Position,
                            lead: Position,
                            offset?: number): void;
    scrollCursorIntoView(cursor: Position, offset?: number): void;
    getScrollTop(): number;
    getScrollLeft(): number;
    getScrollTopRow(): number;
    getScrollBottomRow(): number;
    scrollToRow(row: number): void;
    alignCursor(cursor: Position | number, alignment: number): number;
    scrollToLine(line: number,
                 center: boolean,
                 animate: boolean,
                 callback: () => void): void;
    animateScrolling(fromValue: number, callback: () => void): void;
    scrollToY(scrollTop: number): void;
    scrollToX(scrollLeft: number): void;
    scrollTo(x: number, y: number): void;
    scrollBy(deltaX: number, deltaY: number): void;
    isScrollableBy(deltaX: number, deltaY: number): boolean;
    textToScreenCoordinates(row: number, column: number): { pageX: number, pageY: number};
    visualizeFocus(): void;
    visualizeBlur(): void;
    showComposition(position: number): void;
    setCompositionText(text: string): void;
    hideComposition(): void;
    setTheme(theme: string, callback?: () => void): void;
    getTheme(): string;
    setStyle(style: string, include?: boolean): void;
    unsetStyle(style: string): void;
    setCursorStyle(style: string): void;
    setMouseCursor(cursorStyle: string): void;
    attachToShadowRoot(): void;
    destroy(): void;
  }

  export interface Editor extends OptionsProvider, EventEmitter {
    container: HTMLElement;
    renderer: VirtualRenderer;
    id: string;
    commands: CommandManager;
    keyBinding: KeyBinding;
    session: EditSession;

    on(name: 'blur', callback: (e: Event) => void): void;
    on(name: 'change', callback: (delta: Delta) => void): void;
    on(name: 'changeSelectionStyle', callback: (obj: { data: string }) => void): void;
    on(name: 'changeSession',
       callback: (obj: { session: EditSession, oldSession: EditSession }) => void): void;
    on(name: 'copy', callback: (obj: { text: string }) => void): void;
    on(name: 'focus', callback: (e: Event) => void): void;
    on(name: 'paste', callback: (obj: { text: string }) => void): void;

    setOption<T extends keyof EditorOptions>(name: T, value: EditorOptions[T]): void;
    getOption<T extends keyof EditorOptions>(name: T): EditorOptions[T];

    setKeyboardHandler(keyboardHandler: string, callback?: () => void);
    getKeyboardHandler(): string;
    setSession(session: EditSession): void;
    getSession(): EditSession;
    setValue(val: string, cursorPos?: number): string;
    getValue(): string;
    getSelection(): Selection;
    resize(force?: boolean): void;
    setTheme(theme: string, callback?: () => void);
    getTheme(): string;
    setStyle(style: string): void;
    unsetStyle(style: string): void;
    getFontSize(): string;
    setFontSize(size: string): void;
    focus(): void;
    isFocused(): boolean;
    flur(): void;
    getSelectedText(): string;
    getCopyText(): string;
    execCommand(command: string | string[], args: any): boolean;
    insert(text: string, pasted?: boolean): void;
    setOverwrite(overwrite: boolean): void;
    getOverwrite(): boolean;
    toggleOverwrite(): void;
    setScrollSpeed(speed: number): void;
    getScrollSpeed(): number;
    setDragDelay(dragDelay: number): void;
    getDragDelay(): number;
    setSelectionStyle(val: string): void;
    getSelectionStyle(): string;
    setHighlightActiveLine(shouldHighlight: boolean): void;
    getHighlightActiveLine(): boolean;
    setHighlightGutterLine(shouldHighlight: boolean): void;
    getHighlightGutterLine(): boolean;
    setHighlightSelectedWord(shouldHighlight: boolean): void;
    getHighlightSelectedWord(): boolean;
    setAnimatedScroll(shouldAnimate: boolean): void;
    getAnimatedScroll(): boolean;
    setShowInvisibles(showInvisibles: boolean): void;
    getShowInvisibles(): boolean;
    setDisplayIndentGuides(display: boolean): void;
    getDisplayIndentGuides(): boolean;
    setShowPrintMargin(showPrintMargin: boolean): void;
    getShowPrintMargin(): boolean;
    setPrintMarginColumn(showPrintMargin: number): void;
    getPrintMarginColumn(): number;
    setReadOnly(readOnly: boolean): void;
    getReadOnly(): boolean;
    setBehavioursEnabled(enabled: boolean): void;
    getBehavioursEnabled(): boolean;
    setWrapBehavioursEnabled(enabled: boolean): void;
    getWrapBehavioursEnabled(): boolean;
    setShowFoldWidgets(show: boolean): void;
    getShowFoldWidgets(): boolean;
    setFadeFoldWidgets(fade: boolean): void;
    getFadeFoldWidgets(): boolean;
    remove(dir?: 'left' | 'right'): void;
    removeWordRight(): void;
    removeWordLeft(): void;
    removeLineToEnd(): void;
    splitLine(): void;
    transposeLetters(): void;
    toLowerCase(): void;
    toUpperCase(): void;
    indent(): void;
    blockIndent(): void;
    blockOutdent(): void;
    sortLines(): void;
    toggleCommentLines(): void;
    toggleBlockComment(): void;
    modifyNumber(amount: number): void;
    removeLines(): void;
    duplicateSelection(): void;
    moveLinesDown(): void;
    moveLinesUp(): void;
    moveText(range: Range, toPosition: Point, copy?: boolean): Range;
    copyLinesUp(): void;
    copyLinesDown(): void;
    getFirstVisibleRow(): number;
    getLastVisibleRow(): number;
    isRowVisible(row: number): boolean;
    isRowFullyVisible(row: number): boolean;
    selectPageDown(): void;
    selectPageUp(): void;
    gotoPageDown(): void;
    gotoPageUp(): void;
    scrollPageDown(): void;
    scrollPageUp(): void;
    scrollToRow(row: number): void;
    scrollToLine(line: number, center: boolean, animate: boolean, callback: () => void): void;
    centerSelection(): void;
    getCursorPosition(): Point;
    getCursorPositionScreen(): Point;
    getSelectionRange(): Range;
    selectAll(): void;
    clearSelection(): void;
    moveCursorTo(row: number, column: number): void;
    moveCursorToPosition(pos: Point): void;
    jumpToMatching(select: boolean, expand: boolean): void;
    gotoLine(lineNumber: number, column: number, animate: boolean): void;
    navigateTo(row: number, column: number): void;
    navigateUp(): void;
    navigateDown(): void;
    navigateLeft(): void;
    navigateRight(): void;
    navigateLineStart(): void;
    navigateLineEnd(): void;
    navigateFileEnd(): void;
    navigateFileStart(): void;
    navigateWordRight(): void;
    navigateWordLeft(): void;
    replace(replacement: string, options?: Partial<SearchOptions>): number;
    replaceAll(replacement: string, options?: Partial<SearchOptions>): number;
    getLastSearchOptions(): Partial<SearchOptions>;
    find(needle: string, options?: Partial<SearchOptions>, animate?: boolean): void;
    findNext(options?: Partial<SearchOptions>, animate?: boolean): void;
    findPrevious(options?: Partial<SearchOptions>, animate?: boolean): void;
    undo(): void;
    redo(): void;
    destroy(): void;
    setAutoScrollEditorIntoView(enable: boolean): void;
  }

  export interface AceStatic {
    version: string;
    require(name: string): any;
    edit(el: Element | string, options?: Partial<EditorOptions>): Editor;
    createEditSession(text: Document | string, mode: TextMode): EditSession;
    config: Config;

    Range: {
      new(startRow: number, startColumn: number, endRow: number, endColumn: number): Range;
      fromPoints(start: Point, end: Point): Range;
      comparePoints(p1: Point, p2: Point): number;
    };
    EditSession: {
      new(text: string | Document, mode?: TextMode): EditSession;
    };
    UndoManager: {
      new(): UndoManager;
    };
    VirtualRenderer: {
      new(container: HTMLElement, theme?: string): VirtualRenderer;
    };
  }
}

declare const ace: Ace.AceStatic;
export default ace;
export declare var Range: {
  new(startRow: number, startColumn: number, endRow: number, endColumn: number): Range;
  fromPoints(start: Ace.Point, end: Ace.Point): Range;
  comparePoints(p1: Ace.Point, p2: Ace.Point): number;
}
export declare var EditSession: Ace.EditSession
export declare var UndoManager: Ace.UndoManager
export declare var VirtualRenderer: Ace.VirtualRenderer

