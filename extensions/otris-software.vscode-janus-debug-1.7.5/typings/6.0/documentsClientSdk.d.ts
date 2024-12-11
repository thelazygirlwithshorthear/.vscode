declare namespace documents {
    namespace sdk {
        namespace utils {
            /**
             * Parses a number string and returns it as number. If any of the optional `decimalSeparator` or `groupingSeparator` parameters is not set, this function will automatically use the default value of the current user locale configured in the Documents Manager.
             * @param value the number string value to be parsed
             * @param decimalSeparator the decimal separator character
             * @param groupingSeparator the grouping separator character
             */
            function parseNumber(value: string, decimalSeparator?: string, groupingSeparator?: string): number;

            /**
             * Formats a number and returns it as string. If any of the optional `decimalSeparator`, `groupingSeparator` or `decimalPrecision` parameters is not set, this function will use the default value of the current user locale configured in the Documents Manager.
             * @param value the number value to be formatted
             * @param decimalSeparator_or_options the decimal separator character that should be used or an object that contains any of the `decimalSeparator`, `groupingSeparator` or `decimalPrecision` options
             * @param groupingSeparator the grouping separator character
             * @param decimalPrecision the decimal precision, if set to -1, it is left untouched
             */
            function formatNumber(value: number, decimalSeparator_or_options?: string | Object, groupingSeparator?: string, decimalPrecision?: number): string;

            /**
             * Parses a date string and returns either a ECMAScript or a [Moment.js]{@link https://momentjs.com/docs/} Date object. This method expects a string with the date format of the current user, for example by using {@link FileContext#getFileFieldValue} on a Date or Timestamp field.
             * @param date the date/timestamp string value to be parsed
             * @param options
             * @param options.fieldType The type of the string to parse. Either "date" (default) or "timestamp".
             * @param options.dateType The type of the return object. Either "ecma" (default) or "moment"
             */
            function parseDate(date: string, options?: parseDate_options): Date | moment.Moment;

            /**
             * Formats an ECMAScript Date or a [Moment.js]{@link https://momentjs.com/docs/} Date object and returns it as a string using the date format for the current user. This string is accepted by date fields.
             * @param date the date value to be formatted
             * @param options
             * @param options.fieldType The type the Date object should be formatted to. Either "date" or "timestamp"
             * @param options.dateType The input type of the Date. Either "ecma" (default) or "moment"
             */
            function formatDate(date: Date | moment.Moment, options?: formatDate_options): string;

            /**
             * Creates and returns a new [`DocumentsContext`]{@link documents.sdk.DocumentsContext}.
             * @returns the new `DocumentsContext`
             */
            function createDocumentsContext(): documents.sdk.DocumentsContext;

            /**
             * Parses localized input (e.g. "en:my input;de::meine Eingabe") into a an object containing the language as a key and the text as a value. If a default value is given, it is available by retrunValue.default
             * @param localizedString The text to be parsed
             * @returns object containing the language as key and the language-text as value.
             */
            function parseLocalizedString(localizedString: String): { [key: ("de"|"en"|string)]: string };

            /**
             * Parses localized input (e.g. "en:my input;de::meine Eingabe") and returns the text of the given language.
             * @param localizedString The text to be parsed.
             * @param lang The language of the String. Falls back to the users system language.
             * @returns text of the language or default text, if no language is found.
             */
            function getLocaleValue(localizedString: String, lang?: String): String;

            /**
             * Globally hides or displays tooltips of file fields for a user. The setting will be saved at the user.
             * @param hide Optional Setting of the state of the tooltips. If `true` tooltips will be disabled. If `false` they will be displayed. If no value is given the setting switches to the one that is currently not set.
             */
            function toggleFieldTooltips(hide?: boolean): void;

            /**
             * Copies the given text to the users clipboard.
             * @param text text to be copied to clipboard
             * @param options
             * @param options.showNotification If `true` a notification will be shown on success. Defaults to `true`
             * @param options.title title of the shown notification
             * @param options.message message of the shown notification. It is possible to pass HTML as the message. If no message is given, the copied text will be used (html escaped).
             * @param options.timeout time the notification is shown in milliseconds
             * @param options.sticky defines whether the notification is sticky
             * @returns Resolved after text is added to clipboard and notification is shown
             */
            function copyToClipboard(text: string, options?: copyToClipboard_options): Promise;

            /**
             * Closes the overlay at a given region and destroys the displayed module
             * @param region defines which overlay should be closed. Available are `file` or `MAIN2` and `folder` or `MAIN`
             */
            function closeOverlay(region: string): void;

        }

        namespace gentable {
            namespace grid {
                class GentableGridColumnModel extends GridColumnModel {
                    constructor();

                    /**
                     * Returns the key of the current column.
                     */
                    getName(): string;

                    /**
                     * Returns the localized label of the current column.
                     */
                    getLabel(): string;

                    /**
                     * Returns the data type of the current column.
                     */
                    getDataType(): string;

                    /**
                     * Returns the button label of the current column.
                     */
                    getButtonLabel(): string;

                    /**
                     * Returns the number format of the current column.
                     */
                    getNumberFormat(): string;

                    /**
                     * Returns the tooltip of the current column.
                     */
                    getTooltip(): string;

                    /**
                     * Returns the number of decimal places of the current column.
                     */
                    getDecimalPlaces(): number;

                    /**
                     * Checks if the current column is focusable.
                     */
                    isFocusable(): boolean;

                    /**
                     * Checks if the current column is editable.
                     */
                    isEditable(): boolean;

                    /**
                     * Checks if the current column is visible.
                     */
                    isVisible(): boolean;

                }

                class GentableGridRowModel extends GridRowModel {
                    constructor();

                    /**
                     * Returns a (shallow) copy of the entire row for JSON serialization. For example this method can be used for persistence, serialization or augmentation before being sent to the server.
                     */
                    toJSON(): Object;

                    /**
                     * 
                     * @param val - Values to set for this row.
                     * @param options - Options for modifying the backbone row model.
                     * @param options.resetColumnAggregators - Reset grid column aggregators when setting a row value. This is enabled by default. (since DOCUMENTS 5.0i)
                     * @param options.silent - Set model data silently without triggering a re-render of the grid.
                     */
                    set(val: object, options?: set_options): void;

                    /**
                     * Reloads the current row and returns a <code>Promise</code> for the reload process to be completed. Notice that reloading a row implies an full AJAX request/response to/from the server behind the scenes which is always performed <i>asynchronously</i>. As a result, any code following a <code>reload()</code> statement will be executed <i>immediately</i> while not waiting the reload process to be completed. Code can be synchronized with the returned <code>Promise</code> object which lets you provide a callback function that is called when the <code>Promise</code> is fulfilled.
                     */
                    reload(): Promise<any>;

                    /**
                     * Returns if the row is visible or not.
                     */
                    isVisible(): boolean;

                    /**
                     * Returns the value of the given column as a <code>number</code>. If the optional parameters <code>decimalSeparator</code> and <code>groupingSeparator</code> are not set, this method will use localized values by default.
                     * @param columnName the name of the column
                     * @param decimalSeparator the decimal separator
                     * @param groupingSeparator the grouping separator
                     */
                    getNumber(columnName: string, decimalSeparator?: string, groupingSeparator?: string): number;

                }

                class GentableGridColumnCollection extends GridColumnCollection {
                    constructor();

                }

                class GentableGridRowCollection extends GridRowCollection {
                    constructor();

                }

                class GentableGridModel extends GridModel {
                    constructor();

                    /**
                     * Returns a backbone collection of all currently selected grid row models.
                     * @see [setSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#setSelectedRows}
                     * @see [resetSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#resetSelectedRows}
                     * @see http://backbonejs.org/#Collection
                     */
                    getSelectedRows(): documents.sdk.gentable.grid.GentableGridRowCollection;

                    /**
                     * Sets the selected grid rows by their row indexes.
                     * @param indexes {number[]} all row indexes to be selected
                     * @see [getSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#getSelectedRows}
                     * @see [resetSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#resetSelectedRows}
                     */
                    setSelectedRows(indexes: number[]): void;

                    /**
                     * Removes the selected state of all grid rows. After calling this method, none of the grid rows is selected anymore.
                     * @see [getSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#getSelectedRows}
                     * @see [setSelectedRows]{@link documents.sdk.gentable.grid.GentableGridModel#setSelectedRows}
                     */
                    resetSelectedRows(): void;

                    /**
                     * Edits the specified cell and marks the content.
                     * @param options Must contain the row index and cell index to be edited.
                     */
                    setEditCell(options: Object): void;

                    /**
                     * Sets the active grid row by its row index.
                     * @param index the row index to be activated
                     * @see [getActiveRow]{@link documents.sdk.gentable.grid.GentableGridModel#getActiveRow}
                     * @see [resetActiveRow]{@link documents.sdk.gentable.grid.#resetActiveRow}
                     */
                    setActiveRow(index: number): void;

                    /**
                     * Returns the currently active grid row model.
                     * @see [setActiveRow]{@link documents.sdk.gentable.grid.GentableGridModel#setActiveRow}
                     * @see [resetActiveRow]{@link documents.sdk.gentable.grid.GentableGridModel#resetActiveRow}
                     */
                    getActiveRow(): documents.sdk.gentable.grid.GentableGridRowModel;

                    /**
                     * Removes the active state of all grid rows. After calling this method, none of the grid rows is activated anymore.
                     * @see [getActiveRow]{@link documents.sdk.gentable.grid.GentableGridModel#getActiveRow}
                     * @see [setActiveRow]{@link documents.sdk.gentable.grid.GentableGridModel#setActiveRow}
                     */
                    resetActiveRow(): void;

                    /**
                     * Creates a key for the current row.
                     */
                    createRowKey(): string;

                    /**
                     * Returns the column with the given name.
                     * @returns the column with the given name
                     * @param name
                     */
                    getColumn(name: string): GentableGridColumnModel;

                    /**
                     * Returns the row at the given index.
                     * @param index
                     */
                    getRow(index: number): GentableGridRowModel;

                    /**
                     * Adds the given row.
                     * @param row values of the row that should be added
                     * @param options
                     * @param options.index the index where the row should be added
                     * @returns
                     */
                    addRow(row?: Object, options?: addRow_options): GentableGridRowModel;

                    /**
                     * Removes the row at the given index.
                     * @param index
                     */
                    removeRow(index: number): void;

                    /**
                     * Copies the row from the srcIndex to the dstIndex.
                     * @param srcIndex The index of the row that should be copied.
                     * @param dstIndex The index where the row should be copied to.
                     * @param options Options that will be applied to the newly created row.
                     * @param options.forced Immediately re-render grid after copying the row. (since 5.0i HF III)
                     */
                    copyRow(srcIndex: number, dstIndex: number, options: copyRow_options): GentableGridRowModel;

                    /**
                     * Moves a row from the srcIndex to the dstIndex.
                     * @param srcIndex The index of the row that should be moved.
                     * @param dstIndex The index where the row should be moved to.
                     */
                    moveRow(srcIndex: number, dstIndex: number): void;

                    /**
                     * Returns the number of all grid columns.
                     */
                    columnsSize(): number;

                    /**
                     * Returns the number of all grid rows.
                     */
                    rowsSize(): number;

                    /**
                     * Resets all column aggregators to 0. This is needed if changes will trigger the column aggregators to be executed so they will start at 0 instead of their last value.
                     */
                    resetColumnAggregators(): void;

                }

            }

            namespace gentableRegistry {
                /**
                 * Returns a register definition.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 */
                function getDefinition(tableDefName: string): string;

                /**
                 * Registers a callback function that can be attached to a gentable related exit event.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param event the name of the event referenced as <code>&lt;function&gt;</code> or <code>&lt;event&gt;</code> in the xml configuration file or one of the valid identifiers listed below<br><br> <code>Gentable.beforeRender</code><br> <code>Gentable.afterRender</code><br> <code>Gentable.beforeStore</code> (optionally cancels the gentable store and file edit commit action if callback `fn` returns `false`)<br> <code>Gentable.afterStore</code><br> <code>Gentable.afterRowSelect</code><br> <code>Gentable.cellFormatter</code><br> <code>Gentable.rowStyle</code><br> <code>Gentable.comparators</code><br> <code>Gentable.onRowActivated</code> (since: `5.0i`)<br> <code>Gentable.postprocessCell</code><br>
                 * @param fn the function (or callback) that will be called if the exit event occurs<br>Notice: Any callback will be executed according to the function signature listed below.
                 * @see [getCallback]{@link documents.sdk.gentable.gentableRegistry.getCallback}
                 * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
                 * @see [GentableContext]{@link documents.sdk.gentable.GentableContext}
                 */
                function registerCallback(tableDefName: string, event: string, fn: GentableCallback): void;

                /**
                 * Returns a callback function that is registered to a gentable related exit event.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param event the name of the event
                 * @see [registerCallback]{@link documents.sdk.gentable.gentableRegistry.registerCallback}
                 */
                function getCallback(tableDefName: string, event: string): Function;

                /**
                 * Returns a callback function that is registered to a gentable related exit event.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param event the name of the event
                 * @see [registerCallback]{@link documents.sdk.gentable.gentableRegistry.registerCallback}
                 */
                function getCallbacks(tableDefName: string, event: string): Function;

                /**
                 * Registers a column aggregator.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param title title in the gentable field definition
                 * @param columnAggregator Function returning a doby-grid column aggregator
                 */
                function registerGridColumnAggregator(tableDefName: string, title: string, columnAggregator: Function): void;

                /**
                 * Returns the column aggregator for the give column.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param title title in the gentable field definition
                 */
                function getGridColumnAggregator(tableDefName: string, title: string): Function;

                /**
                 * Registers a grid cell renderer.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param type
                 * @param cellRenderer Function returning a html string
                 */
                function registerGridCellRenderer(tableDefName: string, type: string, cellRenderer: Function): void;

                /**
                 * Returns the cell renderer with the given type.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param type type in the gentable field definition
                 */
                function getGridCellRenderer(tableDefName: string, type: string): Function;

                /**
                 * Registers a grid cell editor.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param type
                 * @param cellEditor doby-grid editor constructor
                 */
                function registerGridCellEditor(tableDefName: string, type: string, cellEditor: Function): void;

                /**
                 * Returns the cell editor with the given type.
                 * @param tableDefName the gentable definition name(s) specified in the gentable xml configuration file by <code>&lt;table_def name=""&gt;</code>, each separated by <code>,</code> or <code>*</code> for any definition name <br><strong>Caution:</strong> This parameter is <strong>not</strong> a file type or archive type name!
                 * @param type Type in the gentable field definition
                 */
                function getGridCellEditor(tableDefName: string, type: string): Function;

            }

            class GentableContext {
                /**
                 * The GentableContext provides full access to the {@link documents.sdk.gentable.grid.GentableGridModel|GentableGridModel}, {@link documents.sdk.gentable.grid.GentableGridColumnModel|GentableGridColumnModel} and the {@link documents.sdk.gentable.grid.GentableGridRowModel|GentableGridRowModel}. It also provides basic functions like copyRow, moveRow and resetSelection.
                 */
                constructor();

                /**
                 * Returns a jQuery reference to a div that is rendered above the gentable toolbar that can be filled with custom html.
                 * @returns Container that can be modified
                 */
                getCustomContainerNorth(): JQuery;

                /**
                 * Returns a jQuery reference to a div that is rendered between the gentable toolbar and the gentable that can be filled with custom html.
                 * @returns Container that can be modified
                 */
                getCustomContainerCenter(): JQuery;

                /**
                 * Returns a jQuery reference to a div that is rendered beneath the gentable that can be filled with custom html.
                 * @returns Container that can be modified
                 */
                getCustomContainerSouth(): JQuery;

                /**
                 * Returns a gentable grid model.
                 * @returns A gentable grid model
                 */
                getGridModel(): documents.sdk.gentable.grid.GentableGridModel;

            }

        }

        namespace grid {
            /**
             * Erweiterung des Backbone Models: <a href="https://backbonejs.org/#Model">https://backbonejs.org/#Model</a>
             */
            class GridColumnModel {
                constructor();

            }

            /**
             * Erweiterung des Backbone Models: <a href="https://backbonejs.org/#Model">https://backbonejs.org/#Model</a>
             */
            class GridRowModel {
                constructor();

                /**
                 * Returns the current index of the row.
                 */
                index(): number;

            }

            class GridCollection {
                constructor();

            }

            class GridColumnCollection extends GridCollection {
                constructor();

            }

            class GridRowCollection extends GridCollection {
                constructor();

            }

            /**
             * Erweiterung des Backbone Models: <a href="https://backbonejs.org/#Model">https://backbonejs.org/#Model</a>
             */
            class GridModel {
                constructor();

                /**
                 * Creates a key for the current row.
                 */
                createRowKey(): string;

                /**
                 * Returns a [Backbone.Collection]{@link http://backbonejs.org/#Collection} of all grid row models.
                 * @see [Backbone.Collection]{@link http://backbonejs.org/#Collection}
                 */
                getRows(): any;

                /**
                 * Returns a [Backbone.Collection]{@link http://backbonejs.org/#Collection} of all grid column models.
                 * @see [Backbone.Collection]{@link http://backbonejs.org/#Collection}
                 */
                getColumns(): any;

            }

        }

        namespace exitRegistry {
            /**
             * Registers a callback function that can be attached to a file related exit event.
             * @param fileTypeName the technical name(s) of the file type(s), each separated by <code>,</code> or <code>*</code> for any file type name
             * @param event the exit event name, i.e. one of the valid event identifiers listed below<br><br> <code>File.afterSetModelData</code> (e.g. for modifications of the `FileFormModel`)<br> <code>File.beforeFileRender</code><br> <code>File.afterFileRender</code><br> <code>File.afterFileOpen</code><br> <code>File.beforeFileEditStart</code> (optionally aborts the file edit start action if `fn` returns `false`)<br> <code>File.afterFileEditStart</code><br> <code>File.beforeFileEditCancel</code> (optionally aborts the file edit cancel action if `fn` returns `false`)<br> <code>File.afterFileEditCancel</code><br> <code>File.beforeFileEditCommit</code> (optionally aborts the file edit commit action if `fn` returns `false`)<br> <code>File.afterFileEditCommit</code><br> <code>File.beforeFileCustomAction</code> (optionally aborts the file custom action if `fn` returns `false`)<br> <code>File.afterFileCustomAction</code><br> <code>File.beforeFileWorkflowAction</code> (optionally aborts the file workflow action if `fn` returns `false`)<br> <code>File.afterFileWorkflowAction</code><br> <code>File.beforeFileAction</code><br> <code>File.afterFileAction</code><br> <code>File.afterUpdateFileAction</code> triggers after a portalscript return with the retrunType `updateFile` or after FileContext.updateFile is used.<br> <code>FileEmail.recipients</code> (file action dialog "send file as email")<br> <code>FileEmail.beforeOpen</code> (before opening "send file as email" dialog, see example, <em>since 5.0h</em>)<br> <code>FileEmail.beforeSend</code> (before sending the "send file as email" form data, see example, <em>since 5.0h</em>)<br> <code>FileEmail.afterSetModelData</code> (used to change the model) <em>since 6.0.1</em><br><br>
             * @param fn the function (or callback) that will be executed if the exit `event` occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             * @see [FileContext]{@link documents.sdk.FileContext}
             */
            function registerFileExitCallback(fileTypeName: string, event: string, fn: fileExitCallback, options?: registerFileExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a file related exit event.
             * @param fileTypeName the technical name of the file type
             * @param event the exit event name
             * @see [registerFileExitCallback]{@link documents.sdk.exitRegistry.registerFileExitCallback}
             */
            function getFileExitCallbacks(fileTypeName: string, event: string): any[];

            /**
             * Registers a callback function that can be attached to a search related exit event.
             * @param event the exit event name, i.e. one of the valid identifiers listed below<br><br> <code>ExtendedSearch.afterSetModelData</code> (e.g. for modifications of the `ExtendedSearchFormModel`)<br> <code>ExtendedSearch.beforeRenderSearchForm</code><br> <code>ExtendedSearch.afterRenderSearchForm</code><br> <code>ExtendedSearch.beforeRenderSearchSourceTree</code><br> <code>ExtendedSearch.afterRenderSearchSourceTree</code><br> <code>ExtendedSearch.beforeExecuteSearch</code> (optionally aborts the search action if `fn` returns `false`)<br> <code>ExtendedSearch.afterExecuteSearch</code><br> <code>ExtendedSearch.beforeClearSearchForm</code><br> <code>ExtendedSearch.afterClearSearchForm</code><br> <code>ExtendedSearch.beforeToggleSearchSource</code><br> <code>ExtendedSearch.afterToggleSearchSource</code><br> <code>ExtendedSearch.beforeToggleMainSearchSource</code><br> <code>ExtendedSearch.afterToggleMainSearchSource</code><br> <code>ExtendedSearch.beforeToggleSearchMask</code><br> <code>ExtendedSearch.afterToggleSearchMask</code><br> <code>ExtendedSearch.beforeToggleHitListMask</code><br> <code>ExtendedSearch.afterToggleHitListMask</code><br> <code>DefaultSearch.beforeExecuteSearch</code> (optionally aborts the search action if `fn` returns `false`)<br> <code>DefaultSearch.afterExecuteSearch</code><br><br>
             * @param fn the function (or callback) that will be executed if the exit `event` occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             * @see [ExtendedSearchContext]{@link documents.sdk.ExtendedSearchContext}
             */
            function registerSearchExitCallback(event: string, fn: searchExitCallback, options?: registerSearchExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a search related exit event.
             * @param event the exit event name
             * @see [registerSearchExitCallback]{@link documents.sdk.exitRegistry.registerSearchExitCallback}
             */
            function getSearchExitCallbacks(event: string): any[];

            /**
             * Registers a callback function that can be attached to a search field related exit event.
             * @param fieldName the technical name(s) of the search field(s), each separated by <code>,</code> or <code>*</code> for any search field name
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             * @see [ExtendedSearchContext]{@link documents.sdk.ExtendedSearchContext}
             */
            function registerSearchFieldExitCallback(fieldName: string, fn: searchFieldExitCallback, options?: registerSearchFieldExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a search field related exit event.
             * @param fieldName the fields name
             * @see [registerSearchFieldExitCallback]{@link documents.sdk.exitRegistry.registerSearchFieldExitCallback}
             */
            function getSearchFieldExitCallbacks(fieldName: string): any[];

            /**
             * Registers a callback function that can be attached to a file field related exit event.
             * @param fileTypeName the technical name(s) of the file type(s), each separated by <code>,</code> or <code>*</code> for any file type name
             * @param fieldName the technical name(s) of the file field(s), each separated by <code>,</code> or <code>*</code> for any file field name
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             * @see [FileContext]{@link documents.sdk.FileContext}
             */
            function registerFileFieldExitCallback(fileTypeName: string, fieldName: string, fn: fileFieldExitCallback, options?: registerFileFieldExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a file field related exit event.
             * @param fileTypeName the technical name of the file type
             * @param fieldName the technical name of the file field
             * @see [registerFileFieldExitCallback]{@link documents.sdk.exitRegistry.registerFileFieldExitCallback}
             */
            function getFileFieldExitCallbacks(fileTypeName: string, fieldName: string): any[];

            /**
             * Registers a callback function that can be attached to a list related exit event.
             * @param event the exit event name, i.e. one of the valid event identifiers listed below<br><br>
             * @param fn the function (or callback) that will be called if the exit event occurs<br>Notice: Any callback will be executed according to the function signature listed below.
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             */
            var listRegistryName: any;

            /**
             * Registers a callback function that can be attached to an outbar related exit event.
             * @param outbarName the technical name(s) of the outbar(s), each separated by <code>,</code> or <code>*</code> for any outbar name <br> The following are the names of the default outbars: <code>DlcOutbarPrivateFolder</code><br> <code>DlcOutbarPublicFolder</code><br> <code>HIT_TREE</code><br> <code>DlcOutbarFolder</code><br>
             * @param event the exit event name, i.e. one of the valid event identifiers listed below<br><br> <code>Outbar.beforeOutbarOpen</code><br> <code>Outbar.afterOutbarOpen</code><br> <code>Outbar.beforeOutbarRender</code><br> <code>Outbar.afterOutbarRender</code><br> <code>Outbar.beforeTreeRender</code><br> <code>Outbar.afterTreeRender</code><br>
             * @param fn the function (or callback) that will be called if the exit event occurs<br>Notice: Any callback will be executed according to the function signature listed below.
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             */
            function registerOutbarExitCallback(outbarName: string, event: string, fn: outbarExitCallback, options?: registerOutbarExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to an outbar related exit event.
             * @param outbarName the technical name of the outbar
             * @param event the exit event name, i.e. one of the valid event identifiers listed in {@link registerOutbarExitCallback}<br><br>
             * @see [registerOutbarExitCallback]{@link documents.sdk.exitRegistry.registerOutbarExitCallback}
             */
            function getOutbarExitCallbacks(outbarName: string, event: string): any[];

            /**
             * Registers a callback function that can be attached to a script parameter related exit event.
             * @param scriptName the technical name(s) of the script(s), each separated by <code>,</code> or <code>*</code> for any script name
             * @param event the exit event name, i.e. one of the valid identifiers listed below<br><br> <code>ScriptParameter.afterSetModelData</code> (e.g. for modifications of the `ScriptParameterFormModel`)<br> <code>ScriptParameter.beforeRender</code><br> <code>ScriptParameter.afterRender</code><br> <code>ScriptParameter.beforeExecuteScript</code> (optionally aborts the script action if `fn` returns `false`)<br><br>
             * @param fn the function (or callback) that will be executed if the exit `event` occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             */
            function registerScriptParameterExitCallback(scriptName: string, event: string, fn: scriptParameterExitCallback, options?: registerScriptParameterExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a script parameter related exit event.
             * @param scriptName the name(s) of the script configered in the manager
             * @param event the exit event name, i.e. one of the valid event identifiers listed in {@link registerScriptParameterExitCallback}<br><br>
             * @see [registerScriptParameterExitCallback]{@link documents.sdk.exitRegistry.registerScriptParameterExitCallback}
             */
            function getScriptParameterExitCallbacks(scriptName: string, event: string): any[];

            /**
             * Registers a callback function that can be attached to a script parameter field related exit event.
             * @param scriptName the technical name(s) of the script(s), each separated by <code>,</code> or <code>*</code> for any script name
             * @param fieldName the technical name of the script parameter field
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             */
            function registerScriptParameterFieldExitCallback(scriptName: string, fieldName: string, fn: scriptParameterFieldExitCallback, options?: registerScriptParameterFieldExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a ScriptParameterField related exit event.
             * @param scriptName the name(s) of the script configered in the manager
             * @param fieldName the exit field name, i.e. the name of a parameter of the script<br><br>
             * @see [registerScriptParameterFieldExitCallback]{@link documents.sdk.exitRegistry.registerScriptParameterFieldExitCallback}
             */
            function getScriptParameterFieldExitCallbacks(scriptName: string, fieldName: string): any[];

            /**
             * Registers a callback function that can be executed on certain TreeChart events.
             * @param event exit event for which this callback is called<br> <code>TreeChart.beforeLoadConfig</code> Is called before the config is loaded for a TreeChart and can be used to change the configuration for the TreeChart.<br> <code>TreeChart.afterChangeConfig</code> Is called after the config has been changed and can be used to save the changed config.
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.config Configuration used for this TreeChart.<br>In the callback <strong>TreeChart.beforeLoadConfig</strong> the configuration can be changed to affect the rendering of the displayed TreeChart.
             * @param options.priority (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             * @see [DocumentsContext]{@link documents.sdk.DocumentsContext}
             */
            function registerTreeChartExitCallback(event: string, fn: treeChartExitCallback, options?: registerTreeChartExitCallback_options): void;

            /**
             * Returns all callback functions that are registered to a TreeChart related exit event.
             * @param event exit event name
             * @see [registerTreeChartExitCallback]{@link documents.sdk.exitRegistry.registerTreeChartExitCallback}
             */
            function getTreeChartExitCallbacks(event: string): any[];

            /**
             * Registers a callback function that can be used to replace the default field renderer of a field with the property "alternativeRendering". Examples are available in the how-to section
             * @param fieldName identifier of the new field-type.
             * @param fieldType
             * @param moduleName name of the module
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             */
            function registerAlternativeRenderingCallback(fieldName: string, fieldType: documents.sdk.FileFieldTypes, moduleName: string, fn: alternativeRenderingExitCallback, options?: registerAlternativeRenderingCallback_options): void;

            /**
             * Returns all callback-functions that can be used to replace the default field renderer of a field with the property "alternativeRendering".
             * @param fieldName identifier of the new field-type.
             * @param fieldType
             * @param moduleName name of the module
             */
            function getAlternativeRenderingCallbacks(fieldName: string, fieldType: documents.sdk.FileFieldTypes, moduleName: string): any[];

            /**
             * Registers a callback function that can be used to replace the default cell renderer of a field with the property "alternativeCellRendering" or all file fields with a certain type.
             * @param callbackName Identifier of the callback. Use * if the callback should be used for all fields.
             * @param fieldType Type of the field
             * @param moduleName Name of the module  in which this callback should be used or * to allow this callback for all list modules.<br> List modules: *: any module, FileLink, FileMultiLink, FileFieldReference, FileMultiLinkReference, FilingPlan, Folder, Search
             * @param fn the function (or callback) that will be executed if the exit event occurs<br>`fn` will be called according to the function signature listed below
             * @param options the options passed in the function
             * @param options.priority Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value): <code>low</code>  -100<br> <code>medium</code>  0<br> <code>high</code>  100<br> <code>critical</code>  200<br>
             */
            function registerAlternativeCellRenderingCallback(callbackName: string, fieldType: documents.sdk.FileFieldTypes, moduleName: string, fn: alternativeCellRenderingExitCallback, options?: registerAlternativeCellRenderingCallback_options): void;

            /**
             * Returns all callback-functions that can be used to set a field cell renderer of a field with the property "alternativeCellRendering".
             * @param callbackName Identifier of the callback.
             * @param fieldType Type of the field
             * @param moduleName name of the module
             */
            function getAlternativeCellRenderingCallbacks(callbackName: string, fieldType: documents.sdk.FileFieldTypes, moduleName: string): any[];

        }

        namespace gadget {
            class GadgetTree {
                /**
                 * The gadget client object for gadget tree. Provides gadget tree related functions for the client side scripting
                 */
                constructor();

                /**
                 * Get the ids of the currently selected nodes.
                 * @returns array of ids
                 */
                getSelectedIds(): string[];

            }

            class GadgetForm {
                /**
                 * The gadget client object for gadget forms. Provides gadget form related functions for the client side scripting
                 */
                constructor();

                /**
                 * Submit the form data to the defined gadget. The following attributes, `gadgetId`, `gadgetScript` and `gadgetAction`, are always added from the *current gadgetConfig*, if they were missing in the given gadgetConfig parameter.
                 * @param targetGadgetConfig gadgetConfig (e.g. {gadgetAction: 'processForm'})
                 * @param options custom options
                 * @param options.validateForm validate the form before submit
                 * @param options.showBusyPanel show a busy panel on the container after submitting the form
                 * @param options.async the submit process will be executed asynchronous (in favour of long form validations)
                 */
                submitForm(targetGadgetConfig?: object, options?: submitForm_options): void;

                /**
                 * Creates a ValidationResult object to be returned by a custom form validator
                 * @param result if the validation has failed or succeeded
                 * @param errorMessage displayed if the validation failed
                 * @param options option object to add additional information
                 * @returns object containing result of the validation
                 */
                createFormValidatorResult(result: boolean, errorMessage?: string, options?: object): validationResult;

                /**
                 * Validate form based on default and custom set validators
                 * @param validationOptions
                 * @param validationOptions.async
                 * @returns true if the form is valid and false if the form is invalid
                 */
                validateForm(validationOptions?: validateForm_validationOptions): boolean | Promise<boolean>;

                /**
                 * Returns the current data for every element of the form
                 */
                getFormData(): Object;

                /**
                 * Open a horizontal ruler.
                 * @param rulerName name of the ruler field
                 */
                openHorizontalRuler(rulerName: string): void;

                /**
                 * Close a horizontal ruler.
                 * @param rulerName name of the ruler field
                 */
                closeHorizontalRuler(rulerName: string): void;

                /**
                 * Toggle the state of a horizontal ruler.
                 * @param rulerName name of the ruler field
                 */
                toggleHorizontalRuler(rulerName: string): void;

            }

        }

        /**
         * The dialogRegistry provides the context of the different dialogs.
         */
        namespace dialogRegistry {
            /**
             * Supported dialog names
             */
            enum dialogNameKey {
                ExtendedSearch = "ExtendedSearchDialog",
                ScriptParameter = "ScriptParameterDialog",
                AbsenceSettings = "AbsenceSettingsDialog",
                FileEmail = "FileEmailDialog",
                ChangeFileType = "ChangeFileTypeDialog",
                FileCreation = "FileCreationDialog",
            }

            /**
             * Checks whether a dialog is registered and returns the corresponding DialogContext.
             * @param dialogName
             * @returns returns the DialogContext corresponding to the Dialog. For the extended-search-dialog the response is the ExtendedSearchDialog.
             * @see
             * @see
             */
            function getDialogContext(dialogName: dialogNameKey): documents.sdk.ExtendedSearchContext;

            /**
             * Checks whether a dialog is registered. Only the dialogs listed within {@link documents.sdk.dialogRegistry.dialogNameKey} are supported.
             * @param dialogName
             * @returns true if the registry is registered, false otherwise
             */
            function hasDialogContext(dialogName: dialogNameKey): boolean;

        }

        class DefaultDialogContext {
            /**
             * The DefaultDialogContext provides general information or functions related to a dialog.
             */
            constructor();

            /**
             * Returns the Backbone Model of the dialog. Be aware: Not every dialog has a model.
             * @returns [Backbone.Model]{@link http://backbonejs.org/#Model} the backbone-model can be used to edit displayed values.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             */
            getDialogModel: any;

            /**
             * focusses a button of a dialog
             * @param identifier object to identify the button
             */
            focusButton(identifier: Object): void;

            /**
             * This function locks this dialog.  For furhter information and examples see {@link documents.sdk.DocumentsContext#startBusyPanel}
             * @see [startBusyPanel]{@link documents.sdk.DocumentsContext#startBusyPanel}
             * @see [stopBusyPanel]{@link documents.sdk.DefaultDialogContext#stopBusyPanel}
             */
            startBusyPanel(): void;

            /**
             * This function unlocks this dialog
             * @see [startBusyPanel]{@link documents.sdk.DefaultDialogContext#startBusyPanel}
             */
            stopBusyPanel(): void;

        }

        class DocumentsContext {
            /**
             * The universal interface for user-exits, gentable and gadgets. It includes opening of dialogs and navigation to folders, files, the extended search other etc. Additional interfaces are available via the {@link documents.sdk.UserContext|UserContext}, {@link documents.sdk.FileContext|FileContext}, {@link documents.sdk.I18nContext|I18nContext}, {@link documents.sdk.LayoutContext|LayoutContext}, {@link documents.sdk.GadgetContext|GadgetContext} and the {@link documents.sdk.gentable.GentableContext|GentableContext}.
             */
            constructor();

            /**
             * Returns the [`UserContext`]{@link documents.sdk.UserContext} of the current system user.
             * @returns the `UserContext`
             */
            getUserContext(): documents.sdk.UserContext;

            /**
             * Returns a [`FileContext`]{@link documents.sdk.FileContext}.
             * @returns the `FileContext`
             */
            getFileContext(): documents.sdk.FileContext;

            /**
             * Returns an [`ExtendedSearchContext`]{@link documents.sdk.ExtendedSearchContext}.
             * @returns the `ExtendedSearchContext`
             */
            getExtendedSearchContext(): documents.sdk.ExtendedSearchContext;

            /**
             * Returns a [`GentableContext`]{@link documents.sdk.GentableContext}.
             * @returns the `GentableContext`
             */
            getGentableContext(): documents.sdk.gentable.GentableContext;

            /**
             * Returns the gadgetId if defined.
             * @returns
             */
            getGadgetId(): string;

            /**
             * Returns a {@link documents.sdk.GadgetContext}.
             * @returns the `GadgetContext`
             */
            getGadgetContext(): documents.sdk.GadgetContext;

            /**
             * Returns an [`I18nContext`]{@link documents.sdk.I18nContext}.
             * @returns the `I18nContext`
             */
            getI18nContext(): documents.sdk.I18nContext;

            /**
             * Get information about the layout. Currently contains information about the `toolbarDesign` and `Menubar` size info * Returns a [`LayoutContext`]{@link documents.sdk.LayoutContext}.
             * @returns
             */
            getLayoutContext(): documents.sdk.LayoutContext;

            /**
             * Changes the current view to the start screen view. Caution: This function will not process any actions if the user is currently in edit mode.
             */
            openHomeView(): void;

            /**
             * Opens the outbar with the given name.
             * @param options
             * @param options.name Possible values: *OutbarPublicFolder*  //The outbar for public folders (Documents Manager - Settings - Documents (display) - Combined folder tree not checked) *OutbarPrivateFolder*  //The outbar for private folders (Documents Manager - Settings - Documents (display) - Combined folder tree not checked) *OutbarCombinedFolder*  //The outbar for a combination of public and private folders (Documents Manager - Settings - Documents (display) - Combined folder tree checked) *OutbarHitTree*  //The outbar for a hit tree (Documents Manager - Settings - Global Settings - Hit tree checked) User defined outbars can be accessed by their name (Documents Manager - settings - Outbars).
             */
            openOutbar(options: openOutbar_options): void;

            /**
             * Changes the current view to a folder view. It is allowed to navigate to any private or public folder. Caution: This function will not process any actions if the user is currently in edit mode.
             * @param folderId the id of the folder
             */
            openFolderView(folderId: string): void;

            /**
             * Changes the current view to a file view. It is allowed to navigate to a file (cover), to a register or to a document. Caution: This function will not process any actions if the user is currently in edit mode.
             * @param fileId the id of the file
             * @param registerId the id of the file register
             * @param documentId the id of the file document
             * @param options
             * @param options.autoOpenDocumentMode , default: `true`
             * @param options.checkConstraints if constraints should be checked or not, default: `true`
             * @param options.startFileEditMode if file edit mode should be start ed or not, default: `false`
             * @param options.externalMode if file should be opened in the external view-mode (popup), default: `false` (**since 5.0h-hf2**)
             * @param options.registerBarState "open", "min", "closed", default :
             * @param options.useMainWindow Opens the file in the main window. Only relevant for decoupled windows (popups). (**since 5.0i-hf2**)*
             */
            openFileView(fileId: string, registerId?: string, documentId?: string, options?: openFileView_options): void;

            /**
             * Updates the current file view. In file edit mode, this operation automatically stores the values of all visible file fields while ignoring any constraints.  Opened dialogs will be closed.
             * @param options {object} Options for updating the current file view only if a file ID matches. If omitted the file view will always be updated.
             * @param options.fileId {string} ID of the file that should be updated. If the current file view doesn't match this file ID it won't be updated.
             * @param options.fileIds {string[]} List of file IDs that should be updated. If the current file view's file ID is not in the list, it won't be updated.
             */
            updateFileView(options: updateFileView_options): void;

            /**
             * Changes the current view to the extended search view. Caution: This function will not process any actions if the kiosk view-mode is used.
             */
            openExtendedSearchView(): void;

            /**
             * Displays a dialog window that requests the current system user for confirmation. The dialog window is displayed in front of the main window and system users always have to interact with it before they can return to the main window. Note that unlike a <code>window.prompt()</code> dialog, the execution of the current program flow is <i>not</i> paused until the user cancels or confirms the dialog.
             * @param title the title of the dialog window
             * @param message the confirmation message text
             * @param onOk a function that is executed if the user clicks "OK"
             * @param onCancel a function that is executed if the user clicks "Cancel"
             * @param onClose a function that is executed if the user clicks "OK", "Cancel" or "X". The function is executed after the onOk or onCancel function.
             * @see [closeDialog]{@link documents.sdk.DocumentsContext#closeDialog}
             */
            openConfirmationDialog(title: string, message: string, onOk: Function, onCancel?: Function, onClose?: Function): void;

            /**
             * Creates and returns a documents application servlet url by a defined type. Optional parameters must be provided in some cases.
             * @param type the type of the servlet url that should be returned<br> <code>annotation</code> (<code>options</code>: <code>fileId</code>, <code>documentId</code>) URL to access the annotations of a pdf/tif file <code>controlSheet</code> (<code>options</code>: <code>fileId</code>, <code>registerId</code>) URL for a control sheet <code>docDownload</code> URL to download a file (<code>options</code>: <code>fileId</code>, <code>documentId</code>, <code>attachmentType</code>, <code>versionId</code>, <code>attachmentMode</code>) <code>docUpload</code> URL to access the upload servlet <code>gadget</code> URL for a gadget <code>pdfjsViewer</code> URL to access the pdfjs viewer <code>report</code> URL for a report <code>system</code> URL for the system <code>userLogin</code> URL to login the current user <code>userLogout</code> URL to logout the current user
             * @param options additional options needed for some types
             * @param options.absolute default false, if true the function will return an absolute url, otherwise a relative url
             * @param options.fileId the id of the file
             * @param options.documentId the id of the file document
             * @param options.registerId the id of the file register
             * @param options.filename the file name of a file document
             * @param options.attachmentType
             * @param options.versionId the id of a file document version
             */
            getURL(type: string, options?: getURL_options): boolean;

            /**
             * Displays a message dialog window. The dialog window is displayed in front of the main window and system users always have to interact with it before they can return to the main window. Note that unlike a <code>window.alert()</code> dialog, the execution of the current program flow is <i>not</i> paused until the user cancels or confirms the dialog.
             * @param title the title of the dialog window
             * @param message the message text
             * @param onOk a function that is executed if the user clicks "OK"
             * @param onClose a function that is executed if the user clicks "OK" or "X". The function is executed after the onOk function.
             * @see [closeDialog]{@link documents.sdk.DocumentsContext#closeDialog}
             */
            openMessageDialog(title: string, message: string, onOk?: Function, onClose?: Function): void;

            /**
             * Displays a html dialog window. The dialog window is displayed in front of the main window and system users always have to interact with it before they can return to the main window. Note that unlike a <code>window.alert()</code> dialog, the execution of the current program flow is <i>not</i> paused until the user cancels or confirms the dialog.
             * @param title the title of the dialog window
             * @param html the inner html content source
             * @param onOk a function that is executed if the user clicks "OK"
             * @param onClose a function that is executed if the user clicks "OK" or "X". The function is executed after the onOk function.
             * @see [closeDialog]{@link documents.sdk.DocumentsContext#closeDialog}
             */
            openHtmlDialog(title: string, html: string, onOk?: Function, onClose?: Function): void;

            /**
             * Displays a dialog with an embedded iframe.
             * @param title the title of the dialog window
             * @param frameSrc the url of the embedded iframe
             * @param options
             * @param options.width the width of the dialog, default: 400
             * @param options.height the height of the dialog, default: 300
             * @param options.top the distance from the top of the window
             * @param options.left the distance from the left of the window
             * @param options.frameStyles the styles of the dialog
             * @param options.frameStyleClasses the classes of the dialog
             * @param options.onClose function to execute when close is clicked
             * @param options.onOk function to execute when ok is clicked
             * @param options.onCancel function to execute when cancel is clicked
             */
            openFrameDialog(title: string, frameSrc: string, options?: openFrameDialog_options): void;

            /**
             * Closes any dialog that is currently displayed.
             */
            closeDialog(): void;

            /**
             * Opens a dedicated dialog for the tabledata plugin. Basically, there are two different dialog types available, one (internal) iframe dialog (default) and another (external) popup window dialog. The internal iframe dialog appears like an ordinary DOCUMENTS 5 dialog, the external popup window dialog is the more traditional way. This function supports fully automatic setting of file field data, gentable row data or email dialog recipient data on a tabledata row selection. Alternatively, a custom handler function can be implemented which will be executed on tabledata row selection. If the automatic field setting should be used, the <code>exitOptions</code> option must be specified. Otherwise, if a custom row selection handler should be used, the the <code>onSelect</code> option must be specified. If both options are set by accident, <code>onSelect</code> option overrides the <code>exitOptions</code> option and also any automatic data setting. See the examples below for recommended implementations of <code>detail.jsp</code>. Legacy D5 implementations of <code>detail.jsp</code> are fully supported so updating the code is not mandatory in most cases.
             * @param title the title of the dialog window
             * @param url the url of the <code>table.jsp</code>
             * @param options
             * @param options.onSelect custom handler function that is executed after the selection of a tabledata row entry, the selected data is available as a function parameter. Notice: If this option is set, none of the fields will be set automatically.
             * @param options.exitOptions the <code>options</code> object of the registered exit callback function, see examples below for details. Should be provided if <code>options.onSelect</code> option is not set.
             * @param options.popupWin <code>true</code>, if an (external) popup window should be used to display the tabledata, otherwise an (internal) iframe dialog is used (default)
             * @param options.width the width of the dialog, default: 400
             * @param options.height the height of the dialog, default: 300
             * @param options.top the top position of the dialog
             * @param options.left the left position of the dialog
             * @param options.onClose custom handler function that is executed when the dialog is closed, not available if <code>popupWin: true</code> is set
             * @param options.sortColumn the column that sorts the tabledata, add '+' or '-' at the end of the column name to set the sort order. Default: '+'
             * @param options.searchText the default search text, tabledata is searched on opening
             * @param options.searchColumn the column to search the searchText in
             * @param options.params additional parameter that will be added to the url
             */
            openTableDataDialog(title: string, url: string, options?: openTableDataDialog_options): void;

            /**
             * Returns a transient session web storage by its key. If the key is omitted, a "custom" session storage is returned by default.
             * @param key the key of the storage
             */
            getSessionStorage(key: string): SessionStorage;

            /**
             * Returns a persistent local web storage by its key. If the key is omitted, a "custom" local storage is returned by default.
             * @param key the key of the storage
             */
            getLocalStorage(key: string): LocalStorage;

            /**
             * Starts a new gadget. Requires a gadgetConfig as a parameter.
             * @param gadgetConfig a JSON-Object to configure the settings of the gadget
             * @param gadgetConfig.gadgetScript name of the gadget-script on server
             * @param gadgetConfig.gadgetAction name of the function of the gadgetScript that will be executed
             * @param gadgetConfig.gadgetId id of the gadget. If there is already a gadget opended with the same id, the old gadget will be replaced, regardless of the `gadgetDestination`.
             * @param gadgetConfig.gadgetDestination location the gadget will be displayed at. Available are: `dialog`, `folder` and `file`. Defaults to `dialog`.
             */
            callGadget(gadgetConfig?: callGadget_gadgetConfig): void;

            /**
             * Closes a gadget. Currently only useful when the gadget is used in a popup dialog.
             */
            closeGadget(): void;

            /**
             * Executes a server-side global script by its name. Any defined script parameters can be transmitted alike. The script can either be called <i>synchronous</i> (default) or <i>asynchronous</i> (via options parameter). If the script result has a defined <code>returnType</code> (defined by context.returnType in the portal script) the function has <strong>no return value</strong> and the output depends on the returnType. With the option <code>dispatch</code> it is possible to always retrieve the script result even if a returnType is defined. options.dispatch must be set to <strong>false</strong> (defaults to true) to use the script result as return value. With <code>option.async = true</code> the function always returns a Promise object. If this option is set it is also possible to input script parameters defined in the Documents Manager via a dialog. Script parameters added via dialog will override duplicate <code>scriptParams</code> keys.
             * @param scriptName - the name of the script
             * @param scriptParams - the input parameters for the script
             * @param options - additional options
             * @param options.dispatch if false scriptResult is returned even if the script has a returnType
             * @param options.async if true the script will be executed asynchronous and will return a promise
             * @param options.defaultErrorHandling if set to false documents defaultErrorHandling, like opening an error-dialog will be prevented, only works if options.async = true. (**Since:** `5.0f`)
             * @param options.useScriptParameterDialog if true a script parameter dialog will always be displayed if the script has defined parameter, only works if options.async = true
             * @param options.dialogTitle the title of the script parameter dialog
             */
            executeScript(scriptName: string, scriptParams?: Object, options?: executeScript_options): Promise<any> | string | undefined;

            /**
             * Encodes an URL by adding the <code>jsessionid</code> and the <code>cnvid</code> to it. A <code>jsessionid</code> is provided if cookies are disabled only. URLs must be encoded always if calling custom servlets or jsps and access to the tomcat server session is required.
             * @param url the url to be encoded
             * @see [getBaseParams]{@link documents.sdk.DocumentsContext#getBaseParams}
             * @see [getBaseParamsQueryString]{@link documents.sdk.DocumentsContext#getBaseParamsQueryString}
             */
            encodeURL(url: string): string;

            /**
             * Returns all documents application related base parameters as object. It includes both the principal (<code>pri</code>) and the language (<code>lang</code>) parameter.
             * @see [encodeURL]{@link documents.sdk.DocumentsContext#encodeURL}
             * @see [getBaseParamsQueryString]{@link documents.sdk.DocumentsContext#getBaseParamsQueryString}
             */
            getBaseParams(): Object;

            /**
             * Returns the query string of all documents application related base parameters as query string. It includes both the principal (<code>pri</code>) and the language (<code>lang</code>) parameter.
             * @see [encodeURL]{@link documents.sdk.DocumentsContext#encodeURL}
             * @see [getBaseParams]{@link documents.sdk.DocumentsContext#getBaseParams}
             */
            getBaseParamsQueryString(): string;

            /**
             * This function locks a defined view for the current user by a view identifier. Valid view identifiers are <code>Dialog</code>, <code>Gadget</code>, <code>MainFile</code>, <code>MainFileGentable</code>, <code>MainList</code>, <code>MainTree</code>, <code>Workspace</code>.
             * @param view the identifier of the view that is to be locked
             * @see [stopBusyPanel]{@link documents.sdk.DocumentsContext#stopBusyPanel}
             */
            startBusyPanel(view: string): void;

            /**
             * This function unlocks a defined view for the current user by a view identifier. Valid view identifiers are <code>Dialog</code>, <code>Gadget</code>, <code>MainFile</code>, <code>MainFileGentable</code>, <code>MainList</code>, <code>MainTree</code>, <code>Workspace</code>.
             * @param view the identifier of the view that is to be unlocked
             * @see [startBusyPanel]{@link documents.sdk.DocumentsContext#startBusyPanel}
             */
            stopBusyPanel(view: string): void;

            /**
             * This function logs out the user. By default it does not return to the login screen. This can be used when the user is logged into a gadget view without any documents functionality available.
             * @param toLoginScreen Redirects to the login screen if `true` (**Since:** `5.0h`). Default `false`.
             */
            logoutUser(toLoginScreen: boolean): void;

            /**
             * This function clears the property-cache of the tomcat. It does not trigger a reload of the page, therefore properties that are requested once initially will not be refreshed on client-side.
             * @param options - additional options
             * @param options.reload if true a reload is triggered after clearing the cache
             */
            cacheEventClearAll(options?: cacheEventClearAll_options): Promise<any>;

            /**
             * Returns ids of currently opened modules and information about the viewport
             */
            getContextParameter(): Object;

        }

        class ExtendedSearchContext {
            /**
             * The ExtendedSearchContext provides access to the Extended Search Dialog and gives access to various GUI functions like get/set field values, change the color of fields, change the focus to a specific field etc.
             */
            constructor();

            /**
             * Returns the DOM element of the entire search form view.
             * @returns the DOM element of the search form view
             */
            getSearchFormViewEl(): Element;

            /**
             * Returns the jQuery object of the entire search form view.
             * @returns the jQuery object of the search form view
             */
            getSearchFormView$El(): JQuery;

            /**
             * Returns the DOM element of a search field's input field by its name.
             * @param fieldName the name of the field
             * @returns the DOM element of the input field
             */
            getSearchFieldEl(fieldName: string): Element;

            /**
             * Returns the jQuery object of a search field's input field by its name.
             * @param fieldName the name of the field
             * @returns the jQuery object of the input field
             */
            getSearchField$El(fieldName: string): JQuery;

            /**
             * Returns the jQuery object of a search field's label by its name.
             * @param fieldName the name of the field
             * @returns the jQuery object of the label
             */
            getSearchFieldLabel$El(fieldName: string): JQuery;

            /**
             * Gets the value of a search field by its name.
             * @param fieldName the search field name
             */
            getSearchFieldValue(fieldName: string): string;

            /**
             * Gets the values for an array of search fields by their names.
             * @param fieldNames the search field names
             */
            getSearchFieldValues(fieldNames: string[]): Object;

            /**
             * Gets the value of a search field as a Number. If the parameters decimalSeparator and groupingSeparator are not set the method will use localized values.
             * @param fieldName - the file field name
             * @param decimalSeparator the decimal separator
             * @param groupingSeparator the grouping separator
             */
            getSearchFieldNumberValue(fieldName: string, decimalSeparator?: string, groupingSeparator?: string): number;

            /**
             * Sets the value of a search field to the specified value by its name.
             * @param fieldName the search field name
             * @param value the new value of the search field
             */
            setSearchFieldValue(fieldName: string, value: string): string;

            /**
             * Sets the value of multiple search fields to the specified value by its name.
             * @param fieldValues
             */
            setSearchFieldValues(fieldValues: Object): void;

            /**
             * Sets the options for a select menu.
             * @param fieldName the name of the select field
             * @param value the values for the select field
             * @param options keepSelected === true: the previously selected value will be kept even if not inside the value String (default), false: the previously selected value will be removed except when inside the value String
             */
            setSearchFieldOptions(fieldName: string, value: string | string[] | Object, options: Object): void;

            /**
             * Checks if a search field is currently displayed or not.
             * @param fieldName the name of the field
             */
            isSearchFieldVisible(fieldName: string): boolean;

            /**
             * Sets the focus to a search field by its name.
             * @param fieldName the name of the field
             */
            setSearchFieldFocus(fieldName: string): void;

            /**
             * Sets the text-color of a search field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setSearchFieldColor(fieldName: string, color: string): void;

            /**
             * Sets the background-color of a search field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setSearchFieldBgColor(fieldName: string, color: string): void;

            /**
             * Sets the border-color of a search field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setSearchFieldBorderColor(fieldName: string, color: string): void;

            /**
             * Sets the text-color of a search field label by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setSearchFieldLabelColor(fieldName: string, color: string): void;

            /**
             * Returns a shallow array of all currently available search source items. Each item contains (at least) the attributes <code>id</code>, <code>name</code>, <code>type</code>, <code>label</code>, <code>selected</code> and <code>opened</code>.
             * @param options
             * @param options.filter a filter
             */
            getSearchSources(options?: getSearchSources_options): void;

            /**
             * Changes the visibility of a search-source entry.
             * @param ids an Array of ids or a single id of the nodes whose visibility should be changes
             */
            setSearchSourcesVisibility(ids: string | string[]): boolean;

            /**
             * Returns a shallow array of all currently selected search source items. Each item contains (at least) the attributes <code>id</code>, <code>name</code>, <code>type</code>, <code>label</code>, <code>selected</code> and <code>opened</code>.
             * @param options
             * @param options.filter a filter
             */
            getSelectedSearchSources(options?: getSelectedSearchSources_options): void;

            /**
             * Returns a shallow array of all currently available search source names.
             * @param options
             * @param options.filter a filter
             */
            getSearchSourceNames(options?: getSearchSourceNames_options): void;

            /**
             * Returns a shallow array of all currently selected search source names.
             * @param options
             * @param options.filter a filter
             */
            getSelectedSearchSourceNames(options?: getSelectedSearchSourceNames_options): void;

            /**
             * Returns the current search form model. To modify the current search form _before_ being displayed, it is recommended to use this function combined with (while not limited to) the exit event `ExtendedSearch.afterSetModelData`.
             * @returns the extended search form model
             * @see [exitRegistry.registerSearchExitCallback]{@link documents.sdk.exitRegistry#registerSearchExitCallback}
             */
            getSearchFormModel(): documents.sdk.ExtendedSearchFormModel;

        }

        class FieldModel {
            /**
             * The FieldModel is the abstract model for form fields. It provides various methods to inspect and manipulate the field model data. Every FieldModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             */
            constructor();

            /**
             * Returns the id of the field.
             * @returns the field id
             */
            getId(): string;

            /**
             * Returns the technical name of the field.
             * @returns the technical field name
             */
            getName(): string;

            /**
             * Sets the technical name of the field.
             * @param name the technical field name
             */
            setName(name: string): void;

            /**
             * Returns the label of the field.
             * @returns the field label
             */
            getLabel(): string;

            /**
             * Sets the label of the field.
             * @param label the field label
             */
            setLabel(label: string): void;

            /**
             * Returns the type of the field.
             * @returns the field type
             * @see Types
             */
            getType(): string;

            /**
             * Sets the type of the field. In case of changing a field into a checkbox or a radio-group, the displayed options will be set to a default value. If you want to change them, please use the method {@link documents.sdk.FieldModel#setEnumValues|setEnumValues}.
             * @param type the field type
             * @see
             */
            setType(type: Type): void;

            /**
             * Returns if the field is gui readonly or not. Gui-Readonly is a client-side only state and does not effect the server-side readonly handling. This method is equivalent to {@link documents.sdk.FieldModel#isGuiReadonly|isGuiReadonly}. To check if a method is server-side reanonly use {@link documents.sdk.FieldModel#isServerReadonly|isServerReadonly}.
             * @returns <code>true</code> if the field is readonly, <code>false</code> otherwise
             * @see
             * @see
             * @see
             */
            isReadonly(): boolean;

            /**
             * Returns if the field is set readonly on server-side. It is not possible to change this state on the client.
             * @returns readonly * @see {@link documents.sdk.FieldModel#isGuiReadonly|isGuiReadonly}
             */
            isServerReadonly(): boolean;

            /**
             * Sets the field to Gui-readonly. Gui-Readonly is a client-side only state and does not effect the server-side readonly handling. This method is eqaul to {@link documents.sdk.FieldModel#setGuiReadonly|setGuiReadonly}.
             * @param readonly <code>true</code> for readonly,  <code>false</code> otherwise
             * @see
             */
            setReadonly(readonly: boolean): void;

            /**
             * Returns if the field is gui readonly or not. Gui-Readonly is a client-side only state and does not effect the server-side readonly handling. This method is equivalent to {@link documents.sdk.FieldModel#isGuiReadonly|isGuiReadonly}. To check if a method is server-side reanonly use {@link documents.sdk.FieldModel#isServerReadonly|isServerReadonly}.
             * @returns <code>true</code> if the field is gui readonly, <code>false</code> otherwise
             * @see
             */
            isGuiReadonly(): boolean;

            /**
             * Sets the field to gui readonly.Gui-Readonly is a client-side only state and does not effect the server-side readonly handling.
             * @param guiReadonly <code>true</code> for gui readonly,  <code>false</code> otherwise
             * @see
             */
            setGuiReadonly(guiReadonly: boolean): void;

            /**
             * Returns if the field is mandatory or not.
             * @returns <code>true</code> if the field is mandatory, <code>false</code> otherwise
             */
            isMandatory(): boolean;

            /**
             * Returns if the field is hidden or not. Hidden fields are not visible on the file-view-
             * @returns <code>true</code> if the field is hidden, <code>false</code> otherwise
             */
            isHiddenField(): boolean;

            /**
             * Sets the field to hidden or visible. Can be used to hide a field. Beware: The state is only used on client-side, therefore a change of registers and a few other actions set this state back to its original value.
             * @param hidden <code>true</code> for a hidden field, <code>false</code> otherwise
             * @see
             */
            setHiddenField(hidden: boolean): void;

            /**
             * Returns the value(s) of the field.
             * @returns the field value
             * @see
             */
            getValue(): string | string[] | boolean;

            /**
             * Sets the value(s) of the field. Any matching enum values will be updated automatically.
             * @param value the field value
             * @param options
             * @param options.silent When  <code>true</code> the silent mode is active, no backbone events will be triggered, if the  model changes
             * @see
             */
            setValue(value: string | string[] | boolean, options?: setValue_options): void;

            /**
             * Returns the optional enum values of the field.
             * @returns the field enum values
             */
            getEnumValues(): Object[];

            /**
             * Sets the optional enum values of the field. Supported input-formats can be viewed in the examples.
             * @param enumValues the field enum values
             * @param options the options passed
             * @param options.keepSelected `true` if the current selected entry should be set as the next selected entry. If it is not included within the enumValues it will be added. Default is `false`.
             * @param options.addEmptyEntry `true` if an empty entry should be added to the enumValues. Default is `false`
             */
            setEnumValues(enumValues: Object | Object[] | string | string[], options?: setEnumValues_options): void;

            /**
             * Returns if the field is in the same line as the preceding field or not.
             * @returns <code>true</code> if the field is in the same line as the preceding field, <code>false</code> otherwise
             */
            isSameLine(): boolean;

            /**
             * Sets the field to the same line as the preceding field.
             * @param sameLine <code>true</code> for same line as the preceding field,  <code>false</code> otherwise
             */
            setSameLine(sameLine: boolean): void;

            /**
             * Sets an exit configuration of the field. A trigger type of the exit must always be set. Valid types are <code>focusin</code>, <code>focusout</code>, <code>change</code> and <code>button</code>. If an exit configuration is set, a corresponding field exit callback must be registered in the [exitRegistry]{@link documents.sdk.exitRegistry}.
             * @param options the exit configuration options
             * @param options.type the exit trigger type
             * @param options.image the exit button image, if the <code>type</code> equals <code>button</code>
             * @param options.tooltip the exit button image tooltip, if the <code>type</code> equals <code>button</code>
             * @see [exitRegistry.registerFileFieldExitCallback]{@link documents.sdk.exitRegistry.registerFileFieldExitCallback}
             * @see [exitRegistry.registerSearchFieldExitCallback]{@link documents.sdk.exitRegistry.registerSearchFieldExitCallback}
             * @see [exitRegistry.registerScriptParameterFieldExitCallback]{@link documents.sdk.exitRegistry.registerScriptParameterFieldExitCallback}
             */
            setExit(options?: setExit_options): void;

            /**
             * Adds autocomplete to a field. Only works for STRING fields.
             * @param options the autocomplete config
             * @param options.scriptName the name of the script
             * @param options.minQueryChars amount of letters after which autocomplete starts
             * @param options.queryDelay time interval, after which autocomplete starts
             * @param options.maxResults max amount of autocomplete entries
             * @param options.autoFocusResult focus on the first autocomplete entry
             * @param options.scriptParams additional parameter for the script
             */
            setAutoComplete(options?: setAutoComplete_options): void;

            /**
             * Returns the tooltip of the field.
             * @returns the field tooltip
             */
            getTooltip(): string;

            /**
             * Sets the tooltip of the field.
             * @param tooltip the field tooltip
             */
            setTooltip(tooltip: string): void;

            /**
             * Returns the font color of the field.
             * @returns the field font color
             */
            getColor(): string;

            /**
             * Sets the font color of the field.
             * @param color the field font color. All color definitions available in CSS3 are supported as parameters.
             */
            setColor(color: string): void;

            /**
             * Returns the background color of the field.
             * @returns the field background color
             */
            getBgColor(): string;

            /**
             * Sets the background color of the field.
             * @param color the field background color. All color definitions available in CSS3 are supported as parameters.
             */
            setBgColor(color: string): void;

            /**
             * Returns the border color of the field.
             * @returns the field border color
             */
            getBorderColor(): string;

            /**
             * Sets the border color of the field.
             * @param color the field border color. All color definitions available in CSS3 are supported as parameters.
             */
            setBorderColor(color: string): void;

            /**
             * Returns the font color of the fields label.
             * @returns the font color of the fields label
             */
            getLabelColor(): string;

            /**
             * Sets the font color of the fields label.
             * @param color the font color of the fields label. All color definitions available in CSS3 are supported as parameters.
             */
            setLabelColor(color: string): void;

            static Types: Type;

        }

        interface FieldModelType {
            CHECKBOX: "CHECKBOX";
            CUSTOM: "CUSTOM";
            DATE: "DATE";
            DOUBLE_LIST: "DOUBLE_LIST";
            EMAIL: "EMAIL";
            ENUM: "ENUM";
            FILING_PLAN: "FILING_PLAN";
            GADGET: "GADGET";
            HISTORY: "HISTORY";
            HTML: "HTML";
            NUMBER: "NUMBER";
            PASSWORD: "PASSWORD";
            RADIO: "RADIO";
            REFERENCE: "REFERENCE";
            SEPARATOR: "SEPARATOR";
            STRING: "STRING";
            TEXT: "TEXT";
            TEXT_FIXED: "TEXT_FIXED";
            TIMESTAMP: "TIMESTAMP";
            URL: "URL";
            MULTI_LINK: "MULTI_LINK";
        }

        class FileFieldModel extends FieldModel {
            /**
             * The FileFieldModel represents a file field in a file form and provides various methods to inspect and manipulate the field model data. Every FileFieldModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             */
            constructor();

            /**
             * Returns the width of a field.
             * @returns the fields width
             */
            getWidth(): string;

            /**
             * Sets the width of a field.
             * @param width the fields width
             */
            setWidth(width: string): void;

            /**
             * Returns the height of a field.
             * @returns the fields height
             */
            getHeight(): string;

            /**
             * Sets the height of a field.
             * @param height the fields height
             */
            setHeight(height: string): void;

            /**
             * Returns the maximum length of a field.
             * @returns the fields maximum length
             */
            getMaxLength(): string;

            /**
             * Sets the maximum length of a field.
             * @param maxLength the fields maximum length
             */
            setMaxLength(maxLength: string): void;

            /**
             * Returns the reference-key of a Reference-field. Only implemented for Reference-fields
             * @returns reference-key of a Reference-field
             */
            getReferenceKey(): string;

            /**
             * Returns the font-color of the history field
             * @returns font-color of the history field
             */
            getHistoryFieldColor(): string;

            /**
             * Sets the font-color of the history field
             * @param fontcolor of the history field
             */
            setHistoryFieldColor(fontcolor: string): void;

            /**
             * Returns the background-color of the history field
             * @returns background-color of the history field
             */
            getHistoryFieldBgColor(): string;

            /**
             * Sets the background-color of the history field
             * @param backgroundcolor of the history field
             */
            setHistoryFieldBgColor(backgroundcolor: string): void;

            /**
             * Returns the border-color of the history field
             * @returns border-color of the history field
             */
            getHistoryFieldBorderColor(): string;

            /**
             * Sets the border-color of the history field
             * @param bordercolor of the history field
             */
            setHistoryFieldBorderColor(bordercolor: string): void;

        }

        class SearchFieldModel extends FieldModel {
            /**
             * The SearchFieldModel represents a search field in a search form and provides various methods to inspect and manipulate the field model data. Every SearchFieldModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             */
            constructor();

        }

        class ScriptFieldModel extends FieldModel {
            /**
             * The ScriptFieldModel represents a script field in a script parameter form and provides various methods to inspect and manipulate the field model data. Every ScriptFieldModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             */
            constructor();

        }

        class FormModel {
            /**
             * The FormModel is the abstract model for forms. It provides various methods to inspect and manipulate the form model data. It should be used as the base model for models containing collections of fields such as FileFormModel or ExtendedSearchFormModel. The initialize function should be overridden, if you plan to use a different Collection than the [Backbone.Collection]{@link http://backbonejs.org/#Collection}. Every FormModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}. It contains a Collection of {@link documents.sdk.FieldModel|FieldModels} representing the fields.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             * @see
             */
            constructor();

            /**
             * Returns a [Backbone.Collection]{@link http://backbonejs.org/#Collection} of all field models containing this form model.
             * @returns [Backbone.Collection]{@link http://backbonejs.org/#Collection} the collection of all field models
             * @see [Backbone.Collection]{@link http://backbonejs.org/#Collection}
             */
            getFields(): any;

            /**
             * Searches for and returns a field model by its id.
             * @param id the id of the field model to be searched for
             * @returns the field model if it could be found, <code>null</code> otherwise
             */
            getFieldById(id: string): FieldModel;

            /**
             * Searches for and returns an array of all field models by its ids.
             * @param ids the array of all field model ids to be searched for
             * @returns the array of all fields models that could be found
             */
            getFieldsById(ids: string[]): FieldModel[];

            /**
             * Searches for and returns a field model by its name.
             * @param name the name of the field model to be searched for
             * @returns the field model if it could be found, <code>null</code> otherwise {@link documents.sdk.FileFieldModel}
             */
            getFieldByName(name: string): FieldModel;

            /**
             * Searches for and returns an array of all field models by its names.
             * @param names the array of all field model names to be searched for
             * @returns the array of all fields models that could be found
             */
            getFieldsByName(names: string[]): FieldModel[];

            /**
             * Sets the values of multiple fields. A key of the parameter-object defines the field-id and the corresponding value the new value.
             * @param object the objects keys is defines the fields and the values define the values.
             */
            setFieldValuesById(object: Object): void;

            /**
             * Sets the values of multiple fields. A key of the parameter-object defines the field-name and the corresponding value the new value.
             * @param object the objects keys is defines the fields and the values define the values.
             */
            setFieldValuesByName(object: Object): void;

        }

        class FileFormModel extends FormModel {
            /**
             * The FileFormModel is the representing model for file forms. It provides various methods to inspect and manipulate the form model data. Every FileFormModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}. It contains a collection of {@link documents.sdk.FileFieldModel|FileFieldModels} representing the form fields.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             * @see
             */
            constructor();

            /**
             * Returns the id of the representing file.
             * @returns the id of the representing file
             */
            getFileId(): string;

        }

        class ExtendedSearchFormModel extends FormModel {
            /**
             * The ExtendedSearchFormModel is the representing model for extended search forms. It provides various methods to inspect and manipulate the form model data. Every ExtendedSearchFormModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}. It contains a collection of {@link documents.sdk.SearchFieldModel|SearchFieldModels} representing the form fields.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             * @see
             */
            constructor();

            /**
             * Returns the [Backbone.Collection]{@link http://backbonejs.org/#Collection} of all search-fields within this model.
             * @returns [Backbone.Collection]{@link http://backbonejs.org/#Collection} the collection of fields
             */
            getSearchFields(): any;

            /**
             * Returns the search-field with matching the id.
             * @param id the id of the search-field to be searched
             * @returns the first matching search-field
             */
            getSearchFieldById(id: string): documents.sdk.SearchFieldModel;

            /**
             * Returns an Array of all fields within an extended search filtered by the field-id.
             * @param ids an Array of ids of the search-fields to be searched
             * @returns an Array of matching search-fields
             */
            getSearchFieldsById(ids: string[]): any[];

            /**
             * Returns the search-field with matching the name.
             * @param name the name of the search-field to be searched
             * @returns the first matching search-field
             */
            getSearchFieldByName(name: string): documents.sdk.SearchFieldModel;

            /**
             * Returns an Array of all search-fields within a file filtered by the field-names.
             * @param names an Array of names of the search-fields to be searched
             * @returns an Array of matching search-fields
             */
            getSearchFieldsByName(names: string[]): any[];

            /**
             * getExtendedSearchId return the id of the representing extended search
             * @returns id
             */
            getExtendedSearchId(): string;

            /**
             * Returns the [Backbone.Collection]{@link http://backbonejs.org/#Collection} of all sort-fields within this model.
             * @returns [Backbone.Collection]{@link http://backbonejs.org/#Collection} the collection of fields
             */
            getSortFields(): any;

        }

        class ScriptParameterFormModel extends FormModel {
            /**
             * The ScriptParameterFormModel is the representing model for script parameter forms. It provides various methods to inspect and manipulate the form model data. Every ScriptParameterFormModel is a [Backbone.Model]{@link http://backbonejs.org/#Model}. It contains a collection of {@link documents.sdk.ScriptFieldModel|ScriptFieldModels} representing the form fields.
             * @see [Backbone.Model]{@link http://backbonejs.org/#Model}
             * @see
             */
            constructor();

            /**
             * Returns the name of the associated script.
             * @returns the name of the associated script
             */
            getScriptName(): string;

        }

        class FileContext {
            /**
             * The FileContext provides general information about a document, the possibility to execute scripts, control the edit mode and gives access to various GUI functions like get/set field values, change the color of fields, change the focus to a specific field etc.
             */
            constructor();

            /**
             * Returns the current value of a file field by its name. If, for any reason, the field is currently not visible, the field value will be retrieved from the file instance on the server. This default fallback behaviour can be disabled by the `serverMode` option.
             * @param fieldName the technical file field name
             * @param options
             * @param options.serverMode if true (default) and the field is currently not visible, gets the field value from the server
             */
            getFileFieldValue(fieldName: string, options?: getFileFieldValue_options): string | string[];

            /**
             * Returns the current value of a file field as a number by its name. If, for any reason, the field is currently not visible, the field value will be retrieved from the file instance on the server. This default fallback behaviour can be disabled by the `serverMode` option. If any of the optional `decimalSeparator` or `groupingSeparator` parameters is not set, this function will automatically use the default value of the current user locale configured in the Documents Manager.
             * @param fieldName the technical file field name
             * @param decimalSeparator the decimal separator character
             * @param groupingSeparator the grouping separator character
             * @param options
             * @param options.serverMode if true (default) and the field is currently not visible, gets the field value from the server
             */
            getFileFieldNumberValue(fieldName: string, decimalSeparator?: string, groupingSeparator?: string, options?: getFileFieldNumberValue_options): number;

            /**
             * Gets all available options of a select menu or a double list.
             * @param fieldName - the file field name
             */
            getFileFieldOptions(fieldName: string): Object;

            /**
             * Gets the values for an array of file fields by their names.
             * @param fieldNames the file field names
             * @param options
             * @param options.serverMode get the field value from the server if the field is not visible, default true
             */
            getFileFieldValues(fieldNames: string[], options?: getFileFieldValues_options): Object;

            /**
             * Returns the current file form model. To modify the current file form _before_ being displayed, it is recommended to use this function combined with (while not limited to) the exit event `File.afterSetModelData`.
             * @returns the file form model {@link documents.sdk.FileFormModel}
             * @see [exitRegistry.registerFileExitCallback]{@link documents.sdk.exitRegistry#registerFileExitCallback}
             */
            getFileFormModel(): documents.sdk.FileFormModel;

            /**
             * Sets the value of a file field to the specified value by its name. Caution: This function will work correctly only if the current file is already in edit mode. If, for any reason, the field is currently not visible, the field value will be set to the file instance on the server. This default fallback behaviour can be disabled by the `serverMode` option.
             * @param fieldName the technical file field name
             * @param value the new value of the file field, can be an array if used with a multi-value field type
             * @param options
             * @param options.serverMode if true (default) and the field is currently not visible, sets the field value to the server
             */
            setFileFieldValue(fieldName: string, value?: string | string[], options?: setFileFieldValue_options): string | string[];

            /**
             * Sets the value of multiple file fields to the specified value by its name. Caution: This function will work only if the user is already in edit mode.
             * @param fieldValues
             * @param options
             * @param options.serverMode set the field value on the server if the field is not visible, default true
             */
            setFileFieldValues(fieldValues: Object, options?: setFileFieldValues_options): void;

            /**
             * Sets the options for a select menu or the doublelist. This method does not work if the file is not in edit mode.
             * @param fieldName the name of the select/doublelist field
             * @param values the values for the select/doublelist field
             * @param options keepSelected === true: the previously selected value will be kept even if not inside the value String (default), false: the previously selected value will be removed except when inside the value String
             */
            setFileFieldOptions(fieldName: string, values: string | string[] | Object, options: Object): void;

            /**
             * Sets a file reference. Removing the file reference can be achieved by passing <code>null</code> or <code>""</code> in referenceFileId.
             * @param fieldName the name of the field
             * @param referenceFileId the id of the reference file, <code>null</code> or <code>""</code> to reset
             * @param options
             * @param options.serverMode set the reference field value on the server if the field is not visible, default true
             */
            setFileFieldReference(fieldName: string, referenceFileId: string, options?: setFileFieldReference_options): void;

            /**
             * Returns whether a file is an archive file or not.
             * @returns file is archive file
             */
            isArchiveFile(): boolean;

            /**
             * Return the archive file version.
             * @returns archive version of the file
             */
            getArchiveFileVersion(): string;

            /**
             * Returns if the file is currently in edit mode or not.
             */
            isFileEditMode(): boolean;

            /**
             * Starts the file edit mode. A temporary file working copy will be created in the background automatically. This function will operate only if the user is not already in edit mode. This is an asynchronous operation and it immediately returns a `Promise` object to allow a synchronized control flow of subsequent operations.
             * @see [cancelFileEditMode]{@link documents.sdk.FileContext#cancelFileEditMode}
             * @see [commitFileEditMode]{@link documents.sdk.FileContext#commitFileEditMode}
             */
            startFileEditMode(): Promise<any>;

            /**
             * Aborts the file edit mode. Any changes to the temporary file working copy will be discarded. This function will operate only if the user is already in edit mode. This is an asynchronous operation and it immediately returns a `Promise` object to allow a synchronized control flow of subsequent operations.
             * @see [startFileEditMode]{@link documents.sdk.FileContext#startFileEditMode}
             * @see [commitFileEditMode]{@link documents.sdk.FileContext#commitFileEditMode}
             */
            cancelFileEditMode(): Promise<any>;

            /**
             * Stops the file edit mode. Any changes to the temporary file working copy will be commited. This function will operate only if the user is already in edit mode. This is an asynchronous operation and it immediately returns a `Promise` object to allow a synchronized control flow of subsequent operations.
             * @see [startFileEditMode]{@link documents.sdk.FileContext#startFileEditMode}
             * @see [cancelFileEditMode]{@link documents.sdk.FileContext#cancelFileEditMode}
             */
            commitFileEditMode(): Promise<any>;

            /**
             * Updates the current file, meaning that the entire file will be reloaded. If in edit mode, any changes to the file will be submitted to the temporary file working copy in addition. This is an asynchronous operation and it immediately returns a `Promise` object to allow a synchronized control flow of subsequent operations.
             * @param options the options
             */
            updateFile(options?: Object): Promise<any>;

            /**
             * Checks if a file field is currently displayed or not.
             * @param fieldName the name of the field
             */
            isFileFieldVisible(fieldName: string): boolean;

            /**
             * Returns the id of a file field by its name.
             * @param fieldName the name of the field
             */
            getFileFieldId(fieldName: string): string;

            /**
             * Returns the DOM element id of a file field's input field by its name.
             * @param fieldName the name of the field
             */
            getFileFieldElId(fieldName: string): string;

            /**
             * Returns the DOM element of a file field's input field by its name.
             * @param fieldName the name of the field
             * @returns the DOM element of the input field
             */
            getFileFieldEl(fieldName: string): Element;

            /**
             * Returns the jQuery object of a file field's input field by its name.
             * @param fieldName the name of the field
             * @returns the jQuery object of the input field
             */
            getFileField$El(fieldName: string): JQuery;

            /**
             * Returns the jQuery object of a file field's label by its name.
             * @param fieldName the name of the field
             * @returns the jQuery object of the label
             */
            getFileFieldLabel$El(fieldName: string): JQuery;

            /**
             * Sets the text-color of a file field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setFileFieldColor(fieldName: string, color: string): void;

            /**
             * Sets the background-color of a file field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setFileFieldBgColor(fieldName: string, color: string): void;

            /**
             * Sets the border-color of a file field by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setFileFieldBorderColor(fieldName: string, color: string): void;

            /**
             * Sets the text-color of a file field label by its name.
             * @param fieldName the name of the field
             * @param color the new color
             */
            setFileFieldLabelColor(fieldName: string, color: string): void;

            /**
             * Sets the focus to a file field by its name.
             * @param fieldName the name of the field
             */
            setFileFieldFocus(fieldName: string): void;

            /**
             * Returns the current vertical scroll position from the top.
             */
            getScrollPositionTop(): number;

            /**
             * Returns the current horizontal scroll position from the left.
             */
            getScrollPositionLeft(): number;

            /**
             * Sets the vertical scroll position from the top.
             * @param value the new vertical scroll position
             */
            setScrollPositionTop(value: number): void;

            /**
             * Sets the horizontal scroll position from the left.
             * @param value the new horizontal scroll position
             */
            setScrollPositionLeft(value: number): void;

            /**
             * Returns the file property for the given key.
             * @param key the key of the property
             */
            getFileProperty(key: string): string;

            /**
             * Returns the file register property for the given key.
             * @param key the key of the property
             */
            getFileRegisterProperty(key: string): string;

            /**
             * Executes a server-side file script by its name. Any defined script parameters can be transmitted alike. The script can either be called <i>synchronous</i> (default) or <i>asynchronous</i> (via options parameter). If the script result has a defined <code>returnType</code> (defined by context.returnType in the portal script) the function has <strong>no return value</strong> and the output depends on the returnType. With the option <code>dispatch</code> it is possible to always retrieve the script result even if a returnType is defined. options.dispatch must be set to <strong>false</strong> (defaults to true) to use the script result as return value. With <code>option.async = true</code> the function always returns a Promise object. If this option is set it is also possible to input script parameters defined in the Documents Manager via a dialog. Script parameters added via dialog will override duplicate <code>scriptParams</code> keys.
             * @param scriptName - the name of the script
             * @param scriptParams - the input parameters for the script
             * @param options - additional options
             * @param options.dispatch if false scriptResult is returned even if the script has a returnType
             * @param options.async if true the script will be executed asynchronous and will return a promise
             * @param options.useScriptParameterDialog if true a script parameter dialog will always be displayed if the script has defined parameter, only works if options.async = true
             * @param options.defaultErrorHandling if set to false documents defaultErrorHandling, like opening an error-dialog will be prevented, only works if options.async = true. (**Since:** `5.0f`)
             * @param options.dialogTitle the title of the script parameter dialog
             */
            executeScript(scriptName: string, scriptParams?: Object, options?: executeScript_options): Promise<any> | string | undefined;

            /**
             * Returns the id of the current file.
             */
            getFileId(): string;

            /**
             * Returns the id of the current register.
             */
            getRegisterId(): string;

            /**
             * Returns the technical name of the current register.
             */
            getRegisterName(): string;

            /**
             * Returns a variation of identifier-information of the current register. (technical Name, registerId, label, type)
             */
            getRegisterInfo(): Object;

            /**
             * Returns the id of the current document.
             */
            getDocumentId(): string;

            /**
             * Returns the file type name of the current file.
             */
            getFileTypeName(): string;

            /**
             * Returns the type of the current register.
             */
            getRegisterType(): string;

            /**
             * Returns the title of the current file.
             */
            getFileTitle(): string;

            /**
             * Returns the title of the current register.
             */
            getRegisterTitle(): string;

            /**
             * Returns the title of the current document.
             */
            getDocumentTitle(): string;

            /**
             * Returns the current file task.
             */
            getFileTask(): string;

            /**
             * Opens or closes the file registerbar view.
             * @param action {string} action the action that should be performed, permitted values: `open`, `close`
             * @param options
             * @param options.animate {boolean} `true` (default) if the open or close action should be animated, `false` otherwise
             */
            toggleRegisterbarView(action: string, options?: toggleRegisterbarView_options): void;

            /**
             * Opens or closes the file monitor view.
             * @param action {string} action the action that should be performed, permitted values: `open`, `close`
             * @param options
             * @param options.animate {boolean} `true` (default) if the open or close action should be animated, `false` otherwise
             */
            toggleMonitorView(action: string, options?: toggleMonitorView_options): void;

            /**
             * Creates a quickview link containing the file information
             * @param options
             * @param options.register {boolean} `true` (default) if set to true the register will be included in the quickview link, in the case a register is opened, `false` otherwise
             * @param options.register {boolean} `true` (default) if set to true the document will be included in the quickview link, in the case a document is opened, `false` otherwise
             * @returns quickviewlink the quickviewlink
             */
            createFileQuickviewLink(options?: createFileQuickviewLink_options): string;

            /**
             * Opens the dialog to send the current file as an email. This function can only be used if not in edit mode.
             */
            sendAsEmail(): void;

        }

        class GadgetContext {
            /**
             * The GadgetContext provides gadget related functions for the client side scripting
             */
            constructor();

            /**
             * Returns the gadgetId if defined.
             */
            getGadgetId(): void;

            /**
             * Get the contextData added in the gadget portal script with the function `setContextData`
             */
            getContextData(): any;

            /**
             * Returns the gadget client object **if available**. Currently the following Gadgets have a client object: * **FullCalendar**: {@link external:FullcalendarJQueryElement} (jQuery element) is returned * **Chart**: The {@link external:ChartJs} is returned, * **Form**: {@link documents.sdk.gadget.GadgetForm} is returned, * **Tree**: {@link documents.sdk.gadget.GadgetTree} is returned, * **ScriptList**: The {@link external:DobyGrid} grid object is returned
             * @returns The client object
             */
            getClientObject(): undefined | any | any | any | documents.sdk.gadget.GadgetForm | documents.sdk.gadget.GadgetTree;

            /**
             * Returns the dom element of the gadget container
             */
            getContainerElement(): void;

            /**
             * Enable container button(s)
             * @param buttonId id of the container button
             * @param allBtns enable multiple buttons (possible values: `top`, `bottom`, `all`)
             */
            enableContainerButton(buttonId?: string, allBtns?: string): void;

            /**
             * Disable container button(s)
             * @param buttonId id of the container button
             * @param allBtns disable multiple buttons (possible values: `top`, `bottom`, `all`)
             */
            disableContainerButton(buttonId?: string, allBtns?: string): void;

            /**
             * Stores the gadget gentable data asynchronously. Returns a `Promise`.
             * @returns the `Promise` object for the eventual completion of this asynchronous operation
             */
            saveGadgetGentable(): Promise<any>;

        }

        class I18nContext {
            constructor();

            /**
             * Returns a <code>Messages</code> object providing the server messages. Provides the same functionality on the client side as the `context.getFromSystemTable()` method in the portal scripting.
             * @returns the <code>Messages</code> object holding all the messages
             * @see
             */
            getServerMessages(): Messages;

            /**
             * Returns a <code>Messages</code> object providing methods to work with values from a common key/value paired messages/properties file. Currently this methods supports the property files stored in the werbserver (Tomcat) context. This method tries to find a messages file with the locale currently selected by the logged in user at first. If no such file was found, a file without any specified locale is searched for.
             * @param propertiesFile the name of the messages file, leaving out the <code>_&lt;lang&gt;</code> postfix
             * @returns the <code>Messages</code> object holding all the messages
             * @see
             */
            getMessages(propertiesFile: string): Messages;

        }

        class LayoutContext {
            /**
             * The LayoutContext provides information about the currently displayed layout. It gives access to general layout info and about the current sizes of certain rendered elements.
             */
            constructor();

            toolbarDesign: any;

            /**
             * Returns the size info for the Menubar
             * @returns The size info as object: { width: &lt;width&gt;, height: &lt;height&gt; }
             */
            getMenubarSize(): object;

            /**
             * Returns the design type of the toolbars (Possible values: `default`, `titleToolbar`)
             * @returns Design type of the toolbars (Possible values: `default`, `titleToolbar`)
             */
            getToolbarDesign(): object;

        }

        class LocalEditContext {
            /**
             * The Local Edit Context provides access to various methods to use the local edit components.
             */
            constructor();

            /**
             * Calls the Browser Extension or the activeX component to compare two files.
             * @param fileA
             * @param fileA.fileId
             * @param fileA.registerId
             * @param fileA.docId
             * @param fileA.docName
             * @param fileA.versionId
             * @param fileA.url
             * @param fileB
             * @param fileB.fileId
             * @param fileB.registerId
             * @param fileB.docId
             * @param fileB.docName
             * @param fileB.versionId
             * @param fileB.url
             */
            compareFiles(fileA?: compareFiles_fileA, fileB?: compareFiles_fileB): void;

            /**
             * Returns the version of the native host.
             * @returns
             */
            getNativeHostVersion(): string;

            /**
             * Returns the api version of the native host.
             * @returns
             */
            getAPIVersion(): string;

            /**
             * Returns the version of the browser extension.
             * @returns
             */
            getBrowserExtensionVersion(): string;

        }

        class UserContext {
            /**
             * The UserContext provides access to information related to the current system user like the used language, login name, accessProfiles and custom properties.
             */
            constructor();

            /**
             * Returns a system user property by its key. User properties can be used to define arbitrary, user related application settings. They are <i>read-only</i> by default. The data type has to be <code>String</code>, e.g. JSON, XML or plain text data. <br>In DOCUMENTS Manager, any user property can be found at the <i>upper</i> properties tab of the user account settings dialog. <br>Notice that this function performs a request against the application server which is called <i>synchronous</i> by default. Thus the JavaScript- and UI thread of the browser will be blocked until the server response has returned.
             * @param key the key of the property
             */
            getProperty(key: string): string;

            /**
             * Clears all (server-side) cached user properties. A full page reload can be triggered after clearing the cache optionally. Note: If the page is not refreshed subsequently, the effects of the cleared user cache may not be visible to the user initially!
             * @param options
             * @param options.reload if true, a full page reload is triggered after clearing the cache
             */
            clearUserPropertyCache(options?: clearUserPropertyCache_options): Promise;

            /**
             * Returns a custom user property value by its name and type. Custom user properties can be used to persist (i.e. load and store) arbitrary, user related application data across user sessions. The data type has to be <code>String</code>, e.g. JSON, XML or plain text data. <br>In DOCUMENTS Manager, any custom user property can be found at the <i>lower</i> properties tab of the user account settings dialog. <br>Notice that this function performs a request against the application server which is called <i>synchronous</i> by default. Thus the JavaScript- and UI thread of the browser will be blocked until the server response has returned.
             * @param name the name of the property
             * @param type the type of the property
             * @see [setCustomPropertyValue]{@link documents.sdk.UserContext#setCustomPropertyValue}
             * @see [removeCustomProperty]{@link documents.sdk.UserContext#removeCustomProperty}
             */
            getCustomPropertyValue(name: string, type: string): string;

            /**
             * Sets a custom user property value by its name and type. Custom user properties can be used to persist (i.e. load and store) arbitrary, user related application data across user sessions. The data type has to be <code>String</code>, e.g. JSON, XML or plain text data. <br>In DOCUMENTS Manager, any custom user property can be found at the <i>lower</i> properties tab of the user account settings dialog. <br>Notice that this function performs a request against the application server which is called <i>synchronous</i> by default. Thus the JavaScript- and UI thread of the browser will be blocked until the server response has returned.
             * @param name the name of the property
             * @param type the type of the property
             * @param value the new value of the property
             * @see [getCustomPropertyValue]{@link documents.sdk.UserContext#getCustomPropertyValue}
             * @see [removeCustomProperty]{@link documents.sdk.UserContext#removeCustomProperty}
             */
            setCustomPropertyValue(name: string, type: string, value: string): string;

            /**
             * Removes a custom user property by its name and type and returns its previous value. Custom user properties can be used to persist (i.e. load and store) arbitrary, user related application data across user sessions. The data type has to be <code>String</code>, e.g. JSON, XML or plain text data. <br>In DOCUMENTS Manager, any custom user property can be found at the <i>lower</i> properties tab of the user account settings dialog. <br>Notice that this function performs a request against the application server which is called <i>synchronous</i> by default. Thus the JavaScript- and UI thread of the browser will be blocked until the server response has returned.
             * @param name the name of the property
             * @param type the type of the property
             * @see [getCustomPropertyValue]{@link documents.sdk.UserContext#getCustomPropertyValue}
             * @see [setCustomPropertyValue]{@link documents.sdk.UserContext#setCustomPropertyValue}
             */
            removeCustomProperty(name: string, type: string): string;

        }

        class Storage {
            constructor();

            /**
             * Returns the current storage options.
             */
            getOptions(): Object;

            /**
             * Sets the current storage options.
             * @param newOptions the storage options
             */
            setOptions(newOptions: Object): boolean;

            /**
             * Puts a new item or replaces an old item into the storage. Alternatively puts multiple items into the storage at once (see example below). If the `autoSave` option is switched on (which is default), the storage will be automatically saved afterwards. Otherwise, an explicit [`save`]{@link documents.sdk.Storage.prototype#save} has to be performed to persist all the items that are currently present in the storage.
             * @param key the key of the item
             * @param value the value of the item
             */
            set(key: string, value: Object): void;

            /**
             * Returns an item value of the storage by its key.
             * @param key the key of the item
             */
            get(key: string): boolean | number | string | object | any[];

            /**
             * Deletes an item of the storage by its key.
             * @param key the key of the item
             */
            remove(key: string): void;

            /**
             * Removes all items of the storage at once.
             */
            clear(): void;

            /**
             * Returns whether or not an item exits in the storage by its key.
             * @param key the key of the item
             */
            contains(key: string): boolean;

            /**
             * Returns a (shallow) copy of the entire storage for JSON serialization. For example this method can be used for persistence, serialization or augmentation before being sent to the server.
             */
            toJSON(): Object;

            /**
             * Returns all the keys of the storage.
             */
            keys(): string[];

            /**
             * Loads and deserializes the storage from the underlying HTML5 WebStorage area.
             */
            load(): void;

            /**
             * Serializes and saves the storage to the underlying HTML5 WebStorage area.
             */
            save(): void;

            /**
             * Erases the underlying HTML5 WebStorage area.
             */
            erase(): void;

        }

        class SessionStorage extends Storage {
            /**
             * The SessionStorage is a HTML5 WebStorage based storage area that has the ability to store user-defined key/value paired items. The storage remains available for the duration of a user session until logout, including any page reloads. Opening a new browser tab or window will cause a new storage to be initiated. While the item keys always have to be of type <code>String</code>, the item values are allowed to be of type <code>Boolean</code>, <code>Number</code>, <code>String</code>, <code>Object</code> (literal) or <code>Array</code> (literal).
             * @see [LocalStorage]{@link documents.sdk.LocalStorage}
             */
            constructor();

        }

        class LocalStorage extends Storage {
            /**
             * The LocalStorage is a HTML5 WebStorage based storage area that has the ability to store user-defined key/value paired items. The storage remains available after the duration of a user session and even when the browser is closed and reopened. While the item keys always have to be of type <code>String</code>, the item values are allowed to be of type <code>Boolean</code>, <code>Number</code>, <code>String</code>, <code>Object</code> (literal) or <code>Array</code> (literal).
             * @see [SessionStorage]{@link documents.sdk.SessionStorage}
             */
            constructor();

        }

    }

}

declare interface openOutbar_options {
    /**
     * Possible values:*OutbarPublicFolder*  //The outbar for public folders (Documents Manager - Settings - Documents (display) - Combined folder tree not checked)*OutbarPrivateFolder*  //The outbar for private folders (Documents Manager - Settings - Documents (display) - Combined folder tree not checked)*OutbarCombinedFolder*  //The outbar for a combination of public and private folders (Documents Manager - Settings - Documents (display) - Combined folder tree checked)*OutbarHitTree*  //The outbar for a hit tree (Documents Manager - Settings - Global Settings - Hit tree checked)User defined outbars can be accessed by their name (Documents Manager - settings - Outbars).
     */
    name: string;
}

declare interface openFileView_options {
    /**
     * , default: `true`
     */
    autoOpenDocumentMode?: boolean;
    /**
     * if constraints should be checked or not, default: `true`
     */
    checkConstraints?: boolean;
    /**
     * if file edit mode should be start ed or not, default: `false`
     */
    startFileEditMode?: boolean;
    /**
     * if file should be opened in the external view-mode (popup), default: `false` (**since 5.0h-hf2**)
     */
    externalMode?: boolean;
    /**
     * "open", "min", "closed", default :
     */
    registerBarState?: string;
    /**
     * Opens the file in the main window. Only relevant for decoupled windows (popups). (**since 5.0i-hf2**)*
     */
    useMainWindow?: boolean;
}

declare interface updateFileView_options {
    /**
     * ID of the file that should be updated. If the current file view doesn't match this file ID it won't be updated.
     */
    fileId: string;
    /**
     * List of file IDs that should be updated. If the current file view's file ID is not in the list, it won't be updated.
     */
    fileIds: string[];
}

declare interface getURL_options {
    /**
     * default false, if true the function will return an absolute url, otherwise a relative url
     */
    absolute?: boolean;
    /**
     * the id of the file
     */
    fileId?: string;
    /**
     * the id of the file document
     */
    documentId?: string;
    /**
     * the id of the file register
     */
    registerId?: string;
    /**
     * the file name of a file document
     */
    filename?: string;
    attachmentType?: string;
    /**
     * the id of a file document version
     */
    versionId?: string;
}

declare interface openFrameDialog_options {
    /**
     * the width of the dialog, default: 400
     */
    width?: number;
    /**
     * the height of the dialog, default: 300
     */
    height?: number;
    /**
     * the distance from the top of the window
     */
    top?: number;
    /**
     * the distance from the left of the window
     */
    left?: number;
    /**
     * the styles of the dialog
     */
    frameStyles?: Object;
    /**
     * the classes of the dialog
     */
    frameStyleClasses?: Object;
    /**
     * function to execute when close is clicked
     */
    onClose?: Function;
    /**
     * function to execute when ok is clicked
     */
    onOk?: Function;
    /**
     * function to execute when cancel is clicked
     */
    onCancel?: Function;
}

declare interface openTableDataDialog_options {
    /**
     * custom handler function that is executed after the selection of a tabledata row entry, the selected data is available as a function parameter.Notice: If this option is set, none of the fields will be set automatically.
     */
    onSelect?: Function;
    /**
     * the <code>options</code> object of the registered exit callback function, see examples below for details.Should be provided if <code>options.onSelect</code> option is not set.
     */
    exitOptions?: Object;
    /**
     * <code>true</code>, if an (external) popup window should be used to display the tabledata, otherwise an (internal) iframe dialog is used (default)
     */
    popupWin?: boolean;
    /**
     * the width of the dialog, default: 400
     */
    width?: number;
    /**
     * the height of the dialog, default: 300
     */
    height?: number;
    /**
     * the top position of the dialog
     */
    top?: number;
    /**
     * the left position of the dialog
     */
    left?: number;
    /**
     * custom handler function that is executed when the dialog is closed, not available if <code>popupWin: true</code> is set
     */
    onClose?: Function;
    /**
     * the column that sorts the tabledata, add '+' or '-' at the end of the column name to set the sort order. Default: '+'
     */
    sortColumn?: string;
    /**
     * the default search text, tabledata is searched on opening
     */
    searchText?: string;
    /**
     * the column to search the searchText in
     */
    searchColumn?: string;
    /**
     * additional parameter that will be added to the url
     */
    params?: Object;
}

declare interface callGadget_gadgetConfig {
    /**
     * name of the gadget-script on server
     */
    gadgetScript: String;
    /**
     * name of the function of the gadgetScript that will be executed
     */
    gadgetAction: String;
    /**
     * id of the gadget. If there is already a gadget opended with the same id, the old gadget will be replaced, regardless of the `gadgetDestination`.
     */
    gadgetId?: String;
    /**
     * location the gadget will be displayed at. Available are: `dialog`, `folder` and `file`. Defaults to `dialog`.
     */
    gadgetDestination?: String;
}

declare interface executeScript_options {
    /**
     * if false scriptResult is returned even if the script has a returnType
     */
    dispatch?: boolean;
    /**
     * if true the script will be executed asynchronous and will return a promise
     */
    async?: boolean;
    /**
     * if true a script parameter dialog will always be displayed if the script has defined parameter, only works if options.async = true
     */
    useScriptParameterDialog?: boolean;
    /**
     * if set to false documents defaultErrorHandling, like opening an error-dialog will be prevented, only works if options.async = true. (**Since:** `5.0f`)
     */
    defaultErrorHandling?: boolean;
    /**
     * the title of the script parameter dialog
     */
    dialogTitle?: string;
}

declare interface cacheEventClearAll_options {
    /**
     * if true a reload is triggered after clearing the cache
     */
    reload?: boolean;
}

declare interface fileExitCallback_options {
    /**
     * the technical name of the file type
     */
    fileTypeName: string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.fileTypeName the technical name of the file type
 */
declare type fileExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: fileExitCallback_options)=>void;

declare interface registerFileExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface searchExitCallback_options {
    /**
     * the search form model
     */
    searchForm?: documents.sdk.ExtendedSearchFormModel;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.searchForm the search form model
 */
declare type searchExitCallback = (documentsContext: documents.sdk.DocumentsContext, options?: searchExitCallback_options)=>void;

declare interface registerSearchExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface searchFieldExitCallback_options {
    /**
     * the id of the search field
     */
    searchFieldId: string;
    /**
     * the technical name of the search field
     */
    searchFieldName: string;
    /**
     * the value of the search field
     */
    searchFieldValue: string;
    /**
     * the search form model
     */
    searchForm: documents.sdk.ExtendedSearchFormModel;
    /**
     * the search field model
     */
    searchField: documents.sdk.SearchFieldModel;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.searchFieldId the id of the search field
 * @param options.searchFieldName the technical name of the search field
 * @param options.searchFieldValue the value of the search field
 * @param options.searchForm the search form model
 * @param options.searchField the search field model
 */
declare type searchFieldExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: searchFieldExitCallback_options)=>void;

declare interface registerSearchFieldExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface fileFieldExitCallback_options {
    /**
     * the technical name of the file type
     */
    fileTypeName: string;
    /**
     * the id of the file field
     */
    fileFieldId: string;
    /**
     * the technical name of the file field
     */
    fileFieldName: string;
    /**
     * the file form model
     */
    fileForm: documents.sdk.FileFormModel;
    /**
     * the file field model
     */
    fileField: documents.sdk.FileFieldModel;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.fileTypeName the technical name of the file type
 * @param options.fileFieldId the id of the file field
 * @param options.fileFieldName the technical name of the file field
 * @param options.fileForm the file form model
 * @param options.fileField the file field model
 */
declare type fileFieldExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: fileFieldExitCallback_options)=>void;

declare interface registerFileFieldExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface folderExitCallback_options {
    /**
     * the id of the folder
     */
    folderId: string;
    /**
     * the technical name of the folder
     */
    folderName: string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed in the function
 * @param options the options passed in the function
 * @param options.folderId the id of the folder
 * @param options.folderName the technical name of the folder
 */
declare type folderExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: folderExitCallback_options)=>void;

declare interface listExitCallback_options {
    /**
     * the id of the folder
     */
    folderId?: string;
    /**
     * the technical name of the folder
     */
    folderName?: string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed in the function
 * @param options the options passed in the function
 * @param options.folderId the id of the folder
 * @param options.folderName the technical name of the folder
 */
declare type listExitCallback = (documentsContext: documents.sdk.DocumentsContext, options?: listExitCallback_options)=>void;

declare interface outbarExitCallback_options {
    /**
     * the technical name of the outbar
     */
    outbarName: string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed in the function
 * @param options the options passed in the function
 * @param options.outbarName the technical name of the outbar
 */
declare type outbarExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: outbarExitCallback_options)=>void;

declare interface registerOutbarExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface scriptParameterExitCallback_options {
    /**
     * the technical name of the script
     */
    scriptName: string;
    /**
     * the script form model
     */
    scriptForm: documents.sdk.ScriptParameterFormModel;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.scriptName the technical name of the script
 * @param options.scriptForm the script form model
 */
declare type scriptParameterExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: scriptParameterExitCallback_options)=>void;

declare interface registerScriptParameterExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface scriptParameterFieldExitCallback_options {
    /**
     * the technical name of the script
     */
    scriptName: string;
    /**
     * the id of the script field
     */
    scriptFieldId: string;
    /**
     * the technical name of the script field
     */
    scriptFieldName: string;
    /**
     * the value of the script field
     */
    scriptFieldValue: string;
    /**
     * the script form model
     */
    scriptForm: documents.sdk.ScriptParameterFormModel;
    /**
     * the script field model
     */
    scriptField: documents.sdk.ScriptFieldModel;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 * @param options.scriptName the technical name of the script
 * @param options.scriptFieldId the id of the script field
 * @param options.scriptFieldName the technical name of the script field
 * @param options.scriptFieldValue the value of the script field
 * @param options.scriptForm the script form model
 * @param options.scriptField the script field model
 */
declare type scriptParameterFieldExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: scriptParameterFieldExitCallback_options)=>void;

declare interface registerScriptParameterFieldExitCallback_options {
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 * @param options the options passed to `fn`
 */
declare type treeChartExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: object)=>void;

declare interface registerTreeChartExitCallback_options {
    /**
     * Configuration used for this TreeChart.<br>In the callback <strong>TreeChart.beforeLoadConfig</strong> the configuration can be changed to affect the rendering of the displayed TreeChart.
     */
    config?: Object;
    /**
     * (**Since:** `5.0h`) Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface gentableExitCallback_options {
    /**
     * the technical name of the gentable
     */
    gentableName: string;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed in the function
 * @param options the options passed in the function
 * @param options.gentableName the technical name of the gentable
 */
declare type gentableExitCallback = (documentsContext: documents.sdk.DocumentsContext, options: gentableExitCallback_options)=>void;

declare interface alternativeRenderingExitCallback_options {
    /**
     * the edit-state of the current file.
     */
    editMode: string;
}

declare interface alternativeRenderingExitCallback_callbacks {
    /**
     * triggers the change-callback
     */
    change: Function;
    /**
     * triggers the focusin-callback
     */
    focusin: Function;
    /**
     * triggers the focusout-callback
     */
    focusout: Function;
    /**
     * triggers the exit-button-callback
     */
    button: Function;
}

/**
 * 
 * @param options the options passed to `fn`
 * @param options.editMode the edit-state of the current file.
 * @param callbacks Callback-trigger used to manually trigger exit-registry callbacks
 * @param callbacks.change triggers the change-callback
 * @param callbacks.focusin triggers the focusin-callback
 * @param callbacks.focusout triggers the focusout-callback
 * @param callbacks.button triggers the exit-button-callback
 */
declare type alternativeRenderingExitCallback = (options: alternativeRenderingExitCallback_options, callbacks: alternativeRenderingExitCallback_callbacks)=>String;

declare interface registerAlternativeRenderingCallback_options {
    /**
     * Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

/**
 * 
 * @param escapeHTML - Helpder function for escaping html
 * @param row - Current row index
 * @param cell - Current cell index
 * @param column - Doby-Grid column definition
 * @param data - Backbone model for row
 * @param value - Default string-value to be rendered
 * @param properties - Properties of field
 */
declare type alternativeCellRenderingExitCallback = (escapeHTML: Function, row: number, cell: number, column: object, data: object, value: string, properties?: object)=>String;

declare interface registerAlternativeCellRenderingCallback_options {
    /**
     * Sets the priority of the callback. The callbacks will be executed in order from the highest priority to the lowest. If no value is set, this function defaults to `medium` (0). Available values are numeric values or one of the following strings (listed with their corresponding numeric value):<code>low</code>  -100<br><code>medium</code>  0<br><code>high</code>  100<br><code>critical</code>  200<br>
     */
    priority?: number | string;
}

declare interface getSearchSources_options {
    /**
     * a filter
     */
    filter?: Object;
}

declare interface getSelectedSearchSources_options {
    /**
     * a filter
     */
    filter?: Object;
}

declare interface getSearchSourceNames_options {
    /**
     * a filter
     */
    filter?: Object;
}

declare interface getSelectedSearchSourceNames_options {
    /**
     * a filter
     */
    filter?: Object;
}

declare interface setValue_options {
    /**
     * When  <code>true</code> the silent mode is active, no backbone events will be triggered, if the  model changes
     */
    silent?: boolean;
}

declare interface setEnumValues_options {
    /**
     * `true` if the current selected entry should be set as the next selected entry. If it is not included within the enumValues it will be added. Default is `false`.
     */
    keepSelected?: boolean;
    /**
     * `true` if an empty entry should be added to the enumValues. Default is `false`
     */
    addEmptyEntry?: boolean;
}

declare interface setExit_options {
    /**
     * the exit trigger type
     */
    type: string;
    /**
     * the exit button image, if the <code>type</code> equals <code>button</code>
     */
    image?: string;
    /**
     * the exit button image tooltip, if the <code>type</code> equals <code>button</code>
     */
    tooltip?: string;
}

declare interface setAutoComplete_options {
    /**
     * the name of the script
     */
    scriptName: string;
    /**
     * amount of letters after which autocomplete starts
     */
    minQueryChars?: number;
    /**
     * time interval, after which autocomplete starts
     */
    queryDelay?: number;
    /**
     * max amount of autocomplete entries
     */
    maxResults?: number;
    /**
     * focus on the first autocomplete entry
     */
    autoFocusResult?: boolean;
    /**
     * additional parameter for the script
     */
    scriptParams?: Object;
}

declare interface getFileFieldValue_options {
    /**
     * if true (default) and the field is currently not visible, gets the field value from the server
     */
    serverMode?: boolean;
}

declare interface getFileFieldNumberValue_options {
    /**
     * if true (default) and the field is currently not visible, gets the field value from the server
     */
    serverMode?: boolean;
}

declare interface getFileFieldValues_options {
    /**
     * get the field value from the server if the field is not visible, default true
     */
    serverMode?: boolean;
}

declare interface setFileFieldValue_options {
    /**
     * if true (default) and the field is currently not visible, sets the field value to the server
     */
    serverMode?: boolean;
}

declare interface setFileFieldValues_options {
    /**
     * set the field value on the server if the field is not visible, default true
     */
    serverMode?: boolean;
}

declare interface setFileFieldReference_options {
    /**
     * set the reference field value on the server if the field is not visible, default true
     */
    serverMode?: boolean;
}

declare interface toggleRegisterbarView_options {
    /**
     * `true` (default) if the open or close action should be animated, `false` otherwise
     */
    animate?: boolean;
}

declare interface toggleMonitorView_options {
    /**
     * `true` (default) if the open or close action should be animated, `false` otherwise
     */
    animate?: boolean;
}

declare interface createFileQuickviewLink_options {
    /**
     * `true` (default) if set to true the register will be included in the quickview link, in the case a register is opened, `false` otherwise
     */
    register?: boolean;
    /**
     * `true` (default) if set to true the document will be included in the quickview link, in the case a document is opened, `false` otherwise
     */
    register?: boolean;
}

declare interface submitForm_options {
    /**
     * validate the form before submit
     */
    validateForm?: boolean;
    /**
     * show a busy panel on the container after submitting the form
     */
    showBusyPanel?: boolean;
    /**
     * the submit process will be executed asynchronous (in favour of long form validations)
     */
    async?: boolean;
}

declare interface validateForm_validationOptions {
    async?: boolean;
}

/**
 * 
 * @param row - current row index
 * @param cell - current cell index
 * @param value - string value that will be rendered
 * @param columnDef - doby-grid-column for this cell
 * @param data - doby-grid row that is being rendered
 */
declare type ColumnFormatter = (row: Number, cell: Number, value: string, columnDef: object, data: object)=>void;

declare interface GentableCallback_options {
    gentableDefinitionName: string;
    /**
     * the technical name of the file type
     */
    fileTypeName: string;
    /**
     * the current grid cell node
     */
    $cell?: jQueryElement;
    /**
     * the current grid row index
     */
    rowIndex?: Number;
    /**
     * the current grid cell index
     */
    cellIndex?: Number;
    /**
     * is grid in edit mode (available in `Gentable.onRowActivated`)
     */
    editable?: boolean;
    /**
     * the current grid row data (available in `Gentable.onRowActivated`)
     */
    rowData?: Object;
    /**
     * the current grid row model
     */
    row?: documents.sdk.gentable.grid.GentableGridRowModel;
    /**
     * the current grid column model
     */
    column?: dobyGridColumnModel;
    /**
     * the current original dom event
     */
    originalEvent?: string;
    /**
     * render-options for callback <strong>Gentable.cellFormatter</strong>
     */
    renderOptions?: Object;
    /**
     * Original <a href="https://otris.software/documents/api/dobygrid/#grid-options-columns-formatter">doby-grid-formatter</a> that would be used for this cell.Can be used to generate the default html and modify it further.
     */
    "renderOptions.defaultFormatter": ColumnFormatter;
    /**
     * Disable embedding the returned HTML in the default-formatter by setting this to false. (Default: true)
     */
    "renderOptions.useDefaultFormatter": boolean;
}

/**
 * 
 * @param documentsContext the <code>DocumentsContext</code> passed in the function
 * @param options the options passed in the function
 * @param options.gentableDefinitionName
 * @param options.fileTypeName the technical name of the file type
 * @param options.$cell the current grid cell node
 * @param options.rowIndex the current grid row index
 * @param options.cellIndex the current grid cell index
 * @param options.editable is grid in edit mode (available in `Gentable.onRowActivated`)
 * @param options.rowData the current grid row data (available in `Gentable.onRowActivated`)
 * @param options.row the current grid row model
 * @param options.column the current grid column model
 * @param options.originalEvent the current original dom event
 * @param options.renderOptions render-options for callback <strong>Gentable.cellFormatter</strong>
 * @param options.renderOptions.defaultFormatter Original <a href="https://otris.software/documents/api/dobygrid/#grid-options-columns-formatter">doby-grid-formatter</a> that would be used for this cell. Can be used to generate the default html and modify it further.
 * @param options.renderOptions.useDefaultFormatter Disable embedding the returned HTML in the default-formatter by setting this to false. (Default: true)
 */
declare type GentableCallback = (documentsContext: documents.sdk.DocumentsContext, options: GentableCallback_options)=>void;

declare interface set_options {
    /**
     * Reset grid column aggregators when setting a row value. This is enabled by default. (since DOCUMENTS 5.0i)
     */
    resetColumnAggregators?: boolean;
    /**
     * Set model data silently without triggering a re-render of the grid.
     */
    silent?: boolean;
}

declare interface addRow_options {
    /**
     * the index where the row should be added
     */
    index?: number;
}

declare interface copyRow_options {
    /**
     * Immediately re-render grid after copying the row. (since 5.0i HF III)
     */
    forced: boolean;
}

declare interface compareFiles_fileA {
    fileId: String;
    registerId: String;
    docId: String;
    docName: String;
    versionId?: String;
    url?: String;
}

declare interface compareFiles_fileB {
    fileId: String;
    registerId: String;
    docId: String;
    docName: String;
    versionId?: String;
    url?: String;
}

declare interface clearUserPropertyCache_options {
    /**
     * if true, a full page reload is triggered after clearing the cache
     */
    reload?: boolean;
}

declare interface parseDate_options {
    /**
     * The type of the string to parse. Either "date" (default) or "timestamp".
     */
    fieldType?: string;
    /**
     * The type of the return object. Either "ecma" (default) or "moment"
     */
    dateType?: string;
}

declare interface formatDate_options {
    /**
     * The type the Date object should be formatted to. Either "date" or "timestamp"
     */
    fieldType?: string;
    /**
     * The input type of the Date. Either "ecma" (default) or "moment"
     */
    dateType?: string;
}

declare interface copyToClipboard_options {
    /**
     * If `true` a notification will be shown on success. Defaults to `true`
     */
    showNotification?: boolean;
    /**
     * title of the shown notification
     */
    title?: string;
    /**
     * message of the shown notification. It is possible to pass HTML as the message. If no message is given, the copied text will be used (html escaped).
     */
    message?: string;
    /**
     * time the notification is shown in milliseconds
     */
    timeout?: number;
    /**
     * defines whether the notification is sticky
     */
    sticky?: boolean;
}

declare interface figure {
    type: String;
    page: Number;
    topLeft: Object;
    "topLeft.x": Number;
    "topLeft.y": Number;
    borderStyle?: String;
    borderColor?: String;
    borderWidth?: String;
    backgroundColor?: String;
    opacity?: Number;
}

