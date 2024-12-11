declare namespace otris {
    namespace tools {
        class ClientHeaderCode {
            /**
             * A class to generate client header code. Use this class for the script defined as `clientHeaderCode` script in the global properties.
             */
            constructor();

            /**
             * Add javascript code from portal scripts. The scripts are not executed. Only the contents of the scripts were added as script code to the header. > **Note:** Each script code is embedded in an IIFE (Immediately-invoked Function Expression) to prevent the pollution of the global scope.
             * @param names - script names
             */
            addScriptCodeByScriptName(names: string[]): void;

            /**
             * Add the code of a given function. The native *toString()* method is used to serialize the function code. On the client side the function is executed with an IIFE (Immediately-invoked Function Expression). Optionally, you can pass a data object (The data object is serialized with `JSON.stringify`). If a data object `dataObject` is defined. The function is called *(in the browser)* with this object as parameter.
             * @param codeFunction function
             * @param dataObject data object
             */
            addScriptCodeWithFunction(codeFunction: Function, dataObject?: object): void;

            /**
             * Add javascript code as string.
             * @param code javascript code
             */
            addCode(code: string): void;

            /**
             * Add the given CSS code inside a `<style>` tag.
             * @param cssCode CSS code
             */
            addStyle(cssCode: string): void;

            /**
             * Add the given string inside the `<head>` tag.
             * @param headString string to embed in `<head>` tag
             */
            addHeadString(headString: string): void;

            /**
             * Returns information about the client
             * @returns client information
             */
            getInfo(): otris.tools.ClientInformation;

            /**
             * Generates the client header code string.
             */
            transfer(): void;

        }

        interface ClientInformation {
            /**
             * list of origin types
             */
            originTypes: string[];
            /**
             * application context path (`since 6.0.1`)
             */
            contextPath: string;
            /**
             * application web app tag (`since 6.0.1`)
             */
            webAppTag: string;
            /**
             * http request header
             */
            requestHeader: Object.<string, Array.<string>>;
        }

    }

    namespace notifications {
        /**
         * The type of the notification. `info`, `progress`. Since *DOCUMENTS 5.0i* also: `warning`, `error`, `success`, `*-colored*`.
         */
        type Type = "info"|"progress"|"warning"|"error"|"success"|"info-colored"|"info-colored1"|"info-colored2"|"info-colored3"|"progress-colored"|"progress-colored1"|"progress-colored2"|"progress-colored3";

        /**
         * **Information:** In *DOCUMENTS 5.0g* the class **ScriptReturn** was moved to the namespace `otris.notifications`.To ensure backward compatibility, the *old* reference **otris.ScriptReturn** is still available.Creates a ScriptReturn. Used in {@link otris.notifications.Notification} to define actions
         */
        class ScriptReturn {
            /**
             * 
             * @param returnType returnType of the ScriptReturn
             * @param returnValue returnValue of the ScriptReturn
             */
            constructor(returnType: string, returnValue: string);

            /**
             * Set the returnType
             * @param returnType - returnType of the ScriptReturn
             */
            setReturnType(returnType: string): void;

            /**
             * Set the returnValue
             * @param returnValue - returnValue of the ScriptReturn
             */
            setReturnValue(returnValue: string): void;

        }

        /**
         * Some default values for the notifications
         */
        interface NotificationDefaults {
            /**
             * default notification type (info)
             */
            type: string;
            /**
             * default value for the sticky flag (false)
             */
            sticky: boolean;
            /**
             * default value for the remove on action flag (true)
             */
            removeOnAction: boolean;
            /**
             * default value for the delete on load (false)*
             */
            deleteOnload: boolean;
            /**
             * default timeout value (8000)
             */
            timeout: number;
        }

        /**
         * The type of the notification. `info`, `progress`, `warning`, `error`, `success`.
         */
        type Status = "new"|"read"|"delivered";

        /**
         * Create a new notification
         */
        class Notification {
            /**
             * 
             * @param message - message
             * @param title - notification title
             * @param type -  notification type
             * @param action - Add a click action for the notification
             * @param sticky - Remove notification only if closed or clicked (otris.notifications.NotificationDefaults.sticky)
             */
            constructor(message?: string, title?: string, type?: Type, action?: ScriptReturn, sticky?: boolean);

            /**
             * Set the user who *produced* the notification (e.g. the author of a file message) Defaults to the current system user
             * @param user - system user
             */
            setProducer(user?: SystemUser): void;

            /**
             * Set the notification title
             * @param title - notification title
             */
            setTitle(title: string): void;

            /**
             * Set the notification message
             * @param message - message
             */
            setMessage(message: string): void;

            /**
             * Set the type of the notification
             * @param type - notification type
             */
            setType(type: otris.notifications.Type): void;

            /**
             * Set the click action of the notification
             * @param action - notification onclick action
             */
            setAction(action: otris.notifications.ScriptReturn): void;

            /**
             * Set the onload action of the notification
             * @param onloadAction - notification onload action
             */
            setOnloadAction(onloadAction: otris.notifications.ScriptReturn): void;

            /**
             * Set a referenceId for the notification
             * @param referenceId - reference id
             */
            setReferenceId(referenceId: string): void;

            /**
             * Set the current progress value for a long running task. Set a integer value between 0 and 100. A value over 100 means the task is done and was successful. A negative value indicates that the task failed. A non-integer value is automatically rounded. The notification type must be set to `progress`. It is also necessary to set a [referenceId]{@link otris.notifications.Notification#setReferenceId} as a identifier for the task.
             * @param progressValue - current progress
             */
            setProgressValue(progressValue: Number): void;

            /**
             * Set the timeout (in ms) for this notification
             * @param timeout - notification timeout (in ms)
             */
            setTimeout(timeout: number): void;

            /**
             * Remove notification only if closed or clicked (otris.notifications.NotificationDefaults.sticky)
             * @param sticky - sticky flag
             */
            setSticky(sticky: boolean): void;

            /**
             * Remove the notification if action is executed
             * @param removeOnAction - remove on action flag
             */
            setRemoveOnAction(removeOnAction: boolean): void;

            /**
             * Delete the notification (on the server) automatically after it has been displayed on the client
             * @param deleteOnload - delete on load flag
             */
            setDeleteOnload(deleteOnload: boolean): void;

            /**
             * Set notification style Please note that the settings overwrite the default values of the notification type ({@link otris.notifications.Type}).
             * @param options
             * @param options.icon - icon definition (e.g. `mdi:mdi-fruit-pineapple;color:green`)*
             * @param options.iconBackground - icon background color
             * @param options.background - background color
             * @param options.color - text color for title & message (e.g.: `#eeeeee`)
             * @param options.className - sets the given class to the notification container (usage: use custom predefined stylings. e.g. added with client header code mechanism)
             * @param options.lightness - lightness adjustment of background colors when hovering the notification
             */
            setStyle(options?: setStyle_options): void;

            /**
             * Get title
             * @returns title
             */
            getType(): otris.notifications.Type;

            /**
             * Get title
             * @returns title
             */
            getTitle(): string;

            /**
             * Get message
             * @returns message
             */
            getMessage(): string;

            /**
             * Get action
             * @returns action
             */
            getAction(): otris.notifications.ScriptReturn;

            /**
             * Get onload action
             * @returns onload action
             */
            getOnloadAction(): otris.notifications.ScriptReturn;

            /**
             * Get referenceId
             * @returns referenceId
             */
            getReferenceId(): string;

            /**
             * Get filedId
             * @returns fileId
             */
            getFileId(): string;

            /**
             * Get notification style
             */
            getStyle(): void;

            /**
             * Publish the notification to the given user(s) and/or users of the given access profile(s). One of the parameters (user, accessProfile) must be provided.
             * @param user - recipients
             * @param accessProfile - access profile containing the recipients (since: `Documents 5.0g`)
             * @param options - publish options
             * @param options.includeSubProfiles - parameter used for AccessProfile#getSystemUsers()
             * @param options.includeLockedUsers - parameter used for AccessProfile#getSystemUsers()
             * @param options.includeInvisibleUsers - parameter used for AccessProfile#getSystemUsers()
             */
            publish(user?: string | SystemUser | string[] | SystemUser[], accessProfile?: string | AccessProfile | string[] | AccessProfile[], options?: publish_options): void;

            /**
             * Use this method to transfer a notification as return value to the client
             * @returns returnValue
             */
            transfer(): string;

        }

        class NotificationEntry extends Notification {
            /**
             * A {@link otris.notifications.NotificationEntry} is the **persisted** version of a {@link otris.notifications.Notification}.
             */
            constructor();

            /**
             * Persists the notification entry
             */
            save(): void;

            /**
             * Alias for [save()]{@link otris.notifications.NotificationEntry#save}.
             */
            publish(): void;

            /**
             * Alias for [save()]{@link otris.notifications.NotificationEntry#save}.
             */
            transfer(): void;

            /**
             * Change the status of the notification entry.
             * @param status - new status
             */
            setStatus(status: otris.notifications.Status): void;

            /**
             * Delete entry
             */
            delete(): void;

            /**
             * Returns the status of the notification entry.
             * @returns current status
             */
            getStatus(): otris.notifications.Status;

            /**
             * Returns the timestamp of the notification entry.
             * @returns timestamp (number of milliseconds elapsed since January 1, 1970 00:00:00 UTC)
             */
            getTimestamp(): Number;

        }

        class NotificationManager {
            /**
             * The {@link otris.notifications.NotificationManager} provides several methods to retrieve and manipulate notifications
             */
            constructor();

            /**
             * Deletes all notifications of the given status
             * @param user login of a user or a {@link SystemUser}
             * @param status notification status
             */
            deleteNotificationsByStatus(user: string | SystemUser, status: otris.notifications.Status): void;

            /**
             * Returns the notifications of a given user
             * @param user login of a user or a {@link SystemUser}
             * @param status restrict to specific status
             * @returns array of notification entries {@link otris.notifications.NotificationEntry}
             */
            getNotificationEntries(user: string | SystemUser, status?: otris.notifications.Status): any[];

        }

    }

    namespace scriptlist {
        /**
         * Convenience class to create Hitresult lists as scriptlist
         */
        class HitresultList extends List {
            /**
             * 
             * @param config - Configuration for the hitlist to be created
             * @param config.title - The title of the list that will be displayed in the lists toolbar
             * @param config.searchResources - The list of resources to search through. The resource identifiers may be passed either as an array of strings or as an ordinary string with one identifier per line of text. Please read the Portalscrit APIs remarks section for Hitresult about restrictions.
             * @param config.filter - A filter expression. Further information can be found in the Portalscript APIs section about [Filter Expressions](../portalscript/tutorial-filter.html).
             * @param config.unlimitedHits - A boolean that indicates, if the general hit limitations on filetypes and archives must be ignored. A wasteful use of this option may cause issues with the system performance or situations with low free memory.
             * @param config.pageSize - This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once. If the parameter is a positive value, Documents will initially load only the requested number of hits as a first page. When displaying the list, only as much pages as needed will be loaded into the viewport of the scriptlist. If the parameter is omitted the current user's "hits per page" preference is used. If the parameter is set to 0 all pages will be loaded initially.
             * @param config.sortOrder - A sort expression e.g. myField1+,myField2-, ...<br> If the list is being sorted (sortState is not empty), this parameter should be undefined or else it will overwrite the sorting being done by a user.
             * @param config.fullColumnLength - A boolean that indicates, if the general hit column length limitations must be ignored. The default column length is 50 characters (if not a different value is defined by the property Documents-Settings: MaxHitfieldLength). If a field value exceeds this size, the first 50 characters will be displayed followed by '...'. If the parameter fullColumnLength is set to true, no truncation will be done.
             * @param config.withBlobInfo - A boolean that indicates, if the HitResultset should contain blob-information.
             * @param config.hitlist - The technical name of a hitlist or an array of field names, which specifies the available columns in the resultset. If the parameter is left empty, Documents tries to choose a hitlist automatically. Details follow in the remarks section. **Note:** If this parameter is an array of field names, a search in EE.i or EE.x is not allowed and the field names must not contain commas (,).
             * @param config.folder Folder object to be used for hitresult list.
             * @param config.register register object to be used for hitresult list.
             * @param config.multiSort Allow sorting of multiple columns. Default is false.
             * @param config.appendTotalSize Append total rows size to list title.
             * @param config.openFileOnClick - A boolean to disable automatically opening a file when clicking a row.
             * @param config.showRefreshButton - Will show/hide the refresh button. Default is true.
             * @param config.tagArchiveHits - Tag archive hits. Default is true.
             * @param config.addDefaultActions - Add default documents actions. Currently only supports 'show external' (since DOCUMENTS 5.0i) and 'xlsx-export' (since DOCUMENTS 5.0i hf5) if showExport=true.
             * @param config.addDefaultActions.showExternal - Add 'show external' to contextmenu action. (default: true)
             * @param config.addDefaultActions.showExport - Add xlsx-export actions. (default: false) (since DOCUMENTS 5.0i HF5)
             * @param config.showToolbar - Show toolbar (since DOCUMENTS 5.0i)
             * @param config.useReintegrate - Use putAside and reintegrate to buffer HitResultset. (since DOCUMENTS 6.0.1)
             * @param config.beforeCreateHitResultset - Callback to manipulate the parameter for the HitResultset constructor (since: `Documents 5.0h`).
             * @param config.beforeTransfer - Callback to be executed before the list is transferred to the client (since: `Documents 5.0h`).
             * @param config.searchFilterCallback - Callback to manipulate the search filter used for the Hitresultset (since: `Documents 5.0h`).
             * @param config.beforeAddColumn - Callback to be executed before adding a column to the list. This can be used to either reject a column by returning 'false' and/or change the data before it is set to the column.
             * @param config.afterAddColumn - Callback to be executed after adding a column to the list. This can be used to alter the scriptlist column.
             * @param config.afterAddColumns - Callback to be executed after all columns have been added to the list.
             * @param config.beforeAddRow - Callback to be executed before adding the row to the list. This can be used to change the data before it is set to the row. If beforeAddRow returns false, the row will be rejected and not shown.
             * @param config.afterAddRow - Callback to be executed after adding the row to the list. This can be used to change the ScriptList Row.
             * @param config.onRowClick - Callback to be executed when clicking on a row.
             */
            constructor(config?: HitresultListConstructor_config);

            /**
             * Sets the filter expression that will be passed to to Hitresult. If the operand `OR` ist used in the filter expression, the search for this list will be disabled because `OR` cannot be combined with a fulltext search.
             * @param filter Filter expression that will be passed to Hitresult
             */
            setFilter(filter: string): void;

            /**
             * Use putAside and reintegrate to buffer the HitResultset.
             * @param useReintegrate Use reintegrate for HitResultset
             */
            setUseReintegrate(useReintegrate: boolean): void;

        }

        /**
         * Returns the ScriptList event. See [addListener]{@link otris.scriptlist.List#addListener} for details. **Notice:** Returns `undefined` if the script was not triggered by an event.
         * @returns ScriptList event object
         */
        function getScriptListEvent(): object | undefined;

        /**
         * This will get special parameters that were passed to the scriptlist.
         * @returns - Special parameters that were passed to the scriptlist.
         */
        function getScriptListParameters(): ScriptListParameters;

        /**
         * This class represents a RowUpdate used for the `reloadRow` event.
         */
        class RowUpdate {
            /**
             * 
             * @param updateData - an array of row update objects **or** a `listId` to bind the updates to a specific list (since: `DOCUMENTS 5.0i`)
             * @param updateData.id - id of the row
             * @param updateData.data - updated row data (plain key/value object)
             */
            constructor(updateData: (RowUpdateConstructor_updateData)[] | string);

            /**
             * Adds a new entry
             * @param rowId - row id
             * @param newData - updated row data (plain key/value object)
             * @returns - Row to be updated (since 5.0i)
             */
            addEntry(rowId: string, newData: object): otris.scriptlist.Row;

            /**
             * Remove an entry from the scriptlist.
             * @param rowId id of row to be removed
             */
            addRemoveEntry(rowId: string): void;

            /**
             * Return a proper JSON representation of this `rowUpdate`.
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(): string;

        }

        /**
         * This class represents a generic List that can be displayed and used in
         * DOCUMENTS 5 and above. It can be used as the return value of a PortalScript and
         * will be usually displayed in the main ListView.
         * 
         * To implement the various list functions, the following **script parameters** are available.
         * Some of the parameters are not always set since they are only transferred when a value change occurs.
         * 
         * ```
         * var scriptListParams = {
         *     start : (typeof start != "undefined") ? parseInt(start) : 0,	// Index from where to fetch the next row
         *     limit: (typeof limit != "undefined") ? parseInt(limit) : 50,	// Number of rows to fetch
         *     searchExpression: (typeof searchExpression != "undefined") ? searchExpression : null,	// search expression entered by the user to be used on this list
         *     sort: (typeof sort != "undefined") ? sort : null,	//	short notation of current sort action
         *     sortState: (typeof sortState != "undefined") ? sortState : null,	//	sort states with index for all columns
         *     sortExpression: (typeof sortExpression != "undefined") ? sortExpression : null,	//	id of clicked column
         *     sortOrder: (typeof sortOrder != "undefined") ? sortOrder : null,	//	new sort direction for the clicked column
         *     sortMode: (typeof sortMode != "undefined") ? sortMode : null,
         *     activeId: (typeof activeId != "undefined") ? activeId : null, // ID of the currently active row | since DOCUMENTS 5.0f
         *     allCheckboxSelected: (typeof allCheckboxSelected !== "undefined") ? JSON.parse(allCheckboxSelected) : null, // checkbox for selecting all entries is checked | since DOCUMENTS 5.0g
         *     selectedIds: (typeof selectedIds !== "undefined") ? JSON.parse(selectedIds) : null, // since DOCUMENTS 5.0f
         *     selectedGroupIds: (typeof selectedGroupIds !== "undefined") ? JSON.parse(selectedGroupIds) : null // since DOCUMENTS 5.0g
         * };
         * 
         * These parameters can also be fetched directly with otris.scriptlist.getScriptListParameters(). (since DOCUMENTS 5.0i)
         * ```
         * Further explanation of sort params:
         * ```
         * {
         *   sort: "1" // index of clicked column
         *   sortExpression: "col1", // name of clicked column
         *   sortMode: "sortAdd|sortRemove|sortReset" // executed sort action
         *   sortOrder: "-1",	// new sort order for the clicked column with index
         *   sortState: {	// sort indexes for all columns
         *     col1: 1,
         *     col2: -2,	//	a negative sort index indicated that this column is sorted descending
         *     ...
         *   }
         * }
         * ```
         * 
         * <img src="assets/myapilist.jpg"/>
         */
        class List {
            /**
             * 
             * @param title - The title of the list that will be displayed in the lists toolbar
             */
            constructor(title: string);

            /**
             * Gets the ScriptList's title.
             * @returns ScriptList title
             */
            getTitle(): string;

            /**
             * Set the title of the list. If the title is set to `false` the height of the ScriptList toolbar is adjusted when displayed in an dialog (*since DOCUMENTS 5.0f HF1*)
             * @param title - list title
             */
            setTitle(title: string): void;

            /**
             * Customize message displayed when list is empty
             * @param message - No data message
             */
            setNoDataMessage(message: object): void;

            /**
             * Adds a new action to the list.
             * @param listAction - List action to be addded to the list.
             * @param listAction.name Unique name of the action
             * @param listAction.label Label to display for this action
             * @param listAction.type Type of the action ("button", "list" or "contextmenu") default: "button"
             * @param listAction.action Action to be executed, e.g.<br><br> * <strong>runScript:&lt;script-name&gt;[&amp;&lt;param1&gt;=&lt;value1&gt;&amp;&lt;param2&gt;...]</strong> - execute a portal script and pass parameters * <strong>showFile:&lt;fileId&gt;</strong> - show a file * <strong>showFolder:&lt;folderId&gt;</strong> - show a folder * <strong>showHomeView</strong> - show the home * <strong>executePrivateSearch&privateSearchMaskName=&lt;name&gt;</strong> - execute a private search * <strong>refreshScriptlist[&amp;&lt;param1&gt;=&lt;value1&gt;&amp;&lt;param2&gt;...]</strong> - Refresh the current scriptlist with passed parameters. * <strong>xlsxExportSelected</strong> - export selected entries as xlsx * <strong>xlsxExportAll</strong> - export all entries as xlsx
             * @param listAction.actionGroup Id of the action groups' configuration that should be used for this action.
             * @param listAction.imageFile The action is displayed with the referenced icon (`entypo:` or `ionicons:` syntax is supported). **Only for type `button`**
             * @param listAction.alwaysShowLabel Show the label even if an imageFile is defined
             * @param listAction.autoResetSelection Use this to disable automatically resetting the grids selected rows after the action was executed. [*since DOCUMENTS 5.0i HF5]
             * @param listAction.enabled Action is enabled. If the value is "onRowSelect", this action will only be enabled if rows are selected. [*since DOCUMENTS 5.0i*]
             * @param listAction.tooltip Optional tooltip
             * @param listAction.clientAction <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a client function that is called with an array of ids if showCheckboxes is enabled
             * @param listAction.gadgetAction <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a gadget action belonging to the same gadgetScript to be executed on click
             * @param listAction.useScriptParameterDialog default false, if true a script parameter dialog will always be displayed if the script has defined parameter (*since DOCUMENTS 5.0f*)
             * @param listAction.dialogTitle the title of the script parameter dialog (*since DOCUMENTS 5.0f*)
             * @param listAction.clientScript Function to be exucuted in the client. (*since DOCUMENTS 5.0f*) ``` // The parameters documentsContext and options will be passed. function(documentsContext, options) { documentsContext: A newly created DocumentsContext options: { dobyGrid: doby-grid object for scriptlist listActionName: name of the action being executed selectedGroupsIds: list of the selected group ids selectedIds: list of selected ids } } ```
             */
            addAction(listAction?: addAction_listAction): void;

            /**
             * Get all list actions.
             * @returns The list actions.
             */
            getActions(): object[];

            /**
             * 
             * @param actionGroup - Configuration of the action group
             * @returns Action group that was created.
             */
            addActionGroup(actionGroup: ActionGroup): ActionGroup;

            /**
             * Add a column to the list
             * @param key - the technical name of the column or object configuration
             * @param key.key - the technical name of the column
             * @param key.label - Header label of the column
             * @param key.dataType - Data type of the data in this column (STRING, NUMBER, ICON, CUSTOM, CHECKBOX, DATE or TIMESTAMP)
             * @param key.formatter - Formatter to be used for this columns' cells (since DOCUMENTS 5.0i)
             * @param key.index - Index at which position the column should be inserted
             * @param key.sortOrder - Sort order of the column
             * @param key.visible - Column is visible
             * @param key.width - Width of the column
             * @param key.cellClass - CSS classs for the cells of this column (since DOCUMENTS 6.0.1)
             * @param label - the human readable label of the column
             * @param dataType - the type of the column (STRING, NUMBER, ICON, CUSTOM, CHECKBOX, DATE, TIMESTAMP or TRANSLATION_FIELD)
             * @param index - index at which position the column should be inserted
             * @returns Object of otris.scriptlist.Column
             */
            addColumn(key?: addColumn_key | string, label?: string, dataType?: otris.scriptlist.ColumnDataType, index?: number): otris.scriptlist.Column;

            /**
             * Add export actions to the scriptlist. If an export action is executed, the <strong>origin script</strong> will be called again with current search and sort parameters and a special scriptlist-event (<strong>xlsxExportAll</strong> or <strong>xlsxExportSelected</strong>), which will be handled in list.transfer(). The handling of this event will cause <strong>context.returnType</strong> to be set to <strong>multipleAction</strong>, because the displayed scriptlist will be updated with the data used for the export and trigger the exported file to be downloaded. After list.transfer() the context.returnType <strong>must not be changed</strong> or the download of the exported file will not work. Currently supports xlsx-export (since DOCUMENTS 5.0i HF5).
             * @param showExportActions Show export actions.
             */
            setShowExportActions(showExportActions: boolean): void;

            /**
             * Adds a listener to the ScriptList. If a registered event occurs the ScriptList script is called. With {@link otris.scriptlist.getScriptListEvent} you can check if the script was triggered by an event. Currently the following **events** are supported: * `reloadRow` Listen to file updates. Example for the `scriptListEvent`: `{name: "reloadRow", ids: ["dopaag_fi110", "dopaag_fi111", "dopaag_fi112"], loadedIds: ["dopaag_fi110", .., "dopaag_fi122"]}` In your script you have to check if the given ids are part of your list and/or if the referenced files matches your search criterias. The `ids` array contains the updated files and the `loadedIds` array contains the ids of the currently loaded ScriptList rows. For the **return value** you can use the helper class {@link otris.scriptlist.RowUpdate}. *(To remove a row, the ID of the row must **not** be added to the `RowUpdate` object.)* * `fileShown` (*since DOCUMENTS 5.0f*) Triggered when a DOCUMENTS file is shown in the file view. * `moveRow` (*since DOCUMENTS 5.0e*) Listen to drop row event after one row or a selection of rows has been dropped at its new position. Example for the `scriptListEvent` : ``` { name: "moveRow", ids: [<id_row_1>, <id_row_2>,... ],	// id(s) of the dropped rows newIndex: number,	// index of the row the item was dropped onto group: {        	// group data of the row the item was droppend onto groupCol1: groupVal1,	// value of grouping column groupCol2:... } } ``` In your script you can either return a new list for complete rerendering of the ScriptList or return the strings **MOVE_ROW_SUCCESS** and **MOVE_ROW_DENIED** to allow/reject dropping rows at the new position. If the user should get a message when dropping the row, an {@link otris.scriptlist.MoveRowResult} can be returned. Example for `otris.scriptlist.MoveRowResult`: `{ success: false, message: "The row can't be moved to this position." }` * `dropItemsOnRow` (*since DOCUMENTS 5.0g*) Triggered when an item is dropped on a row inside the grid. For this to work **only the acceptedDropTypes** have to be set and the listener will be triggered automatically. `scriptListEvent` on drop: ``` { name: "dropItemsOnRow", dropItems: [{ id: <id>, type: "docFile|genericItem"}, { id... }],	// ids(s) of the dragged row(s) id: string    // id of the row the item was dropped onto index: number // index of the row the item was dropped onto group: {      // group data of the row the item was droppend onto groupCol1: groupVal1, // value of grouping column groupCol2:... } } ```
             * @param eventName - event name (currently supported: `reloadRow`, `moveRow`, `fileShown`, `dropItemsOnRow`)
             */
            addListener(eventName: string): void;

            /**
             * Add a parameter that will be send to the script when the next page is beeing retrieved (infinite scrolling) or callbacks execute the origin script again e.g. events, sort etc.
             * @param key - Name of the parameter
             * @param value - Value of the parameter
             */
            addParameter(key: string, value: any): void;

            /**
             * Add a row to the list
             * @param key - The UNIQUE key of the row. (Can be a fileId or any other unique id)
             * @param values - An array containing the values of this row in the order of which the columns has been added to the list OR an object mapping the column keys to the columns values.
             * @returns
             */
            addRow(key: string, values: any[] | object): otris.scriptlist.Row;

            /**
             * Adds a setting (an option that can be defined by the user) to the gadget.
             * @param option - Setting(s) to add to the gadget.
             */
            addSettings(option: GadgetSetting | GadgetSetting[]): void;

            /**
             * Mark this list object to contain the last entries of the total list. Using this function means "the entries contained in this list are the last ones in the overall list"
             */
            endList(): void;

            /**
             * Check if endList() was called.
             */
            isListComplete(): void;

            /**
             * 
             * @see otris.scriptlist.getScriptListEvent
             * @returns ScriptList event object
             */
            getScriptListEvent(): object | undefined;

            /**
             * Sets a list of accepted item types that can be dropped on a row. After an item was dropped on a row the scriptListEvent `dropItemsOnRow` will be triggered with the drop location defined by id, index and maybe group data. Event handling is described in [addListener]{@link otris.scriptlist.List#addListener}. Available types: - docFile: DOCUMENTS file eg. file header image dragged and dropped on row. - genericItem: Genetic item eg. row from another scriptlist dropped on of this scriptlists row. - object: ``` { type:     "<docFile|genericItem>", fileType: "<filetype>" // will accept only the configured filetype. } ``` Set droptype on list
             * @param acceptedDropTypes List of item types that can be dropped on a row.
             */
            setAcceptedDropTypes(acceptedDropTypes: (string | object)[]): void;

            /**
             * If the width for a column is set but the content will overflow, add the overflow width to the first column with automatic width. Default is false.
             * @param addOverflowToAutoColumn - true if the overflow width should be added to the first auto width column
             */
            setAddOverflowToAutoColumn(addOverflowToAutoColumn: boolean): void;

            /**
             * Allow decoupling this list by clicking the list name.
             * @param allowDecouple Allow decoupling this list.
             */
            setAllowDecouple(allowDecouple: boolean): void;

            /**
             * Automatically appends the total size of loaded rows to the title. For the HitresultList this is set to true by default.
             * @param appendTotalSize - append total size of loaded rows to title
             */
            setAppendTotalSize(appendTotalSize: boolean): void;

            /**
             * Updates the headline if a new title is given (eg. for a search).
             * @param updateHeadline - Updates the headline if a new title is given
             */
            setUpdateHeadline(updateHeadline: boolean): void;

            /**
             * Sets whether or not the columns should take up the entire available space of the table automatically
             * @param autoWidth - true for the columns to take up the full width of the table
             */
            setAutoColumnWidth(autoWidth: boolean): void;

            /**
             * Sets whether all rows should be displayed without scrollbar. This will only take effect, if the list is shown alongside other elements inside a container for example as a gadget field on a file register. If the list is displayed as a sublist, <strong>setFitHeight()</strong> should be used instead. Otherwise the list might overflow the parent row's sublist container.
             * @param autoHeight - Enable auto height
             */
            setAutoHeight(autoHeight: any): void;

            /**
             * Set whether the details row of an entry should be expanded automatically when an entry is clicked.
             * @param autoShow - Show detail rows automatically
             */
            setAutoShowDetails(autoShow: boolean): void;

            /**
             * Sets the width for the check box column.
             * @param checkboxColumnWidth - Width for the checkbox column.
             */
            setCheckboxColumnWidth(checkboxColumnWidth: number): void;

            /**
             * Set the compact view setting for the list
             * @param compactView - true for default compact view or a String as a template for the compact view
             * @param lineHeight - line height of the compact view line
             */
            setCompactView(compactView: boolean | string, lineHeight: number): void;

            /**
             * Set the maximum with that the compact view will be used for (the point where the view is switched from full view to compact view)
             * @param width - the with where to switch at
             */
            setCompactViewWidth(width: number): void;

            /**
             * Set list to display groupings collapsed.
             * @param collapsed - true, if the list is collapsed
             */
            setCollapsed(collapsed: boolean): void;

            /**
             * Set the columns. Removes any columns that have been added before.
             * @param columnArray - Array of column configurations
             */
            setColumns(columnArray: any[]): void;

            /**
             * Get the columns.
             * @returns columnArray - Array of column configurations
             */
            getColumns(): any[];

            /**
             * Get a column by key.
             * @param key key of the column to get
             * @returns column
             */
            getColumn(key: string): otris.scriptlist.Column | undefined;

            /**
             * Get the index of a column
             * @param key key of the column to get the index for
             * @returns Index of a column (or `-1` if not found)
             */
            getColumnIndex(key: string): number;

            /**
             * Set the parameters that should be send to the details script when expanding a details row
             * @param detailsParams - object of the parameters to pass to the script
             */
            setDetailsParams(detailsParams: object): void;

            /**
             * Set the name of the script that will be called when a details row is expanded. Allowed returnTypes for the script are: "HTML" and "ScriptList"
             * @param detailsScriptName - The scriptName
             */
            setDetailsScriptName(detailsScriptName: string): void;

            /**
             * This can be used to explicitly allow text selection if moveRows is also activated or just to disable text selection if unwanted.
             * @param enableTextSelection - Enable the text selection
             */
            setEnableTextSelection(enableTextSelection: any): void;

            /**
             * Will set the grid height so all groups can be expanded. Can only be used with fitHeight = true.
             * @param fitGroups - Set grid height so all groups will fit expanded
             */
            setFitGroups(fitGroups: boolean): void;

            /**
             * Try to resize the grid until all rows fit (only applicable for subgrids)
             * @param fitHeight - Resize grid until content fits
             */
            setFitHeight(fitHeight: boolean): void;

            /**
             * Sets whether the height of the grid should be increased if expanding the group would cause a scrollbar to be shown. Can only be used with fitHeight = true.
             * @param fitHeightOnGroupExpand - Fit height of grid so all rows of the expanded group will be visible
             */
            setFitHeightOnGroupExpand(fitHeightOnGroupExpand: boolean): void;

            /**
             * Sets whether the height of the grid should be increased if expanding the group would cause a scrollbar to be shown. Can only be used with fitHeight = true.
             * @param fitHeightOnGroupCollapse - Fit height of grid so only the collapsed group will be visible
             */
            setFitHeightOnGroupCollapse(fitHeightOnGroupCollapse: boolean): void;

            /**
             * Sets whether or not the compactView should always be displayed, even is the table is wide enough to display the normal table view
             * @param forceCompactView - Always show list in compact view
             */
            setForceCompactView(forceCompactView: boolean): void;

            /**
             * Sets the index up to which column the columns should be frozen. This will cause the content of all columns on the right to have it`s own horizontal scrollbar when scrolling.
             * @param index - index up to which the columns should stay still on scroll
             */
            setFrozenColumns(index: boolean): void;

            /**
             * Sets whether details rows should fill the available row space if the current grid is a subgrid of a folder.
             * @param fullDetailsWidth - Fill whole width
             */
            setFullDetailsWidth(fullDetailsWidth: boolean): void;

            /**
             * Set template for rendering group header HTML
             * @param groupHeaderTemplate - Handlebars template string to use. Available parameters: - row: row-index - cell: cell-index - value: value to be rendered - columnDef: doby-grid column definition - index: group level index - collapsed: group is collapsed (since DOCUMENTS 6.0.1) - group: doby-grid group definition (since DOCUMENTS 6.0.1) - groupSize: size of the group (since DOCUMENTS 6.0.1)
             */
            setGroupHeaderTemplate(groupHeaderTemplate: string): void;

            /**
             * Set the groupings for the list.
             * @param groupings - Array of ids,`GroupingConfig` or `otris.scriptlist.Grouping` to group by
             */
            setGrouping(groupings: any[]): void;

            /**
             * Get grouping
             */
            getGrouping(): void;

            /**
             * Sets whether group rows can be focussed
             * @param groupsFocusable - Allow focusing of group rows
             */
            setGroupsFocusable(groupsFocusable: boolean): void;

            /**
             * Adds a html header to the table which is displayed above the table.
             * @param htmlheader - the html to display
             */
            setHTMLHeader(htmlheader: string): void;

            /**
             * Set the height for the current grid (only applicable for subgrids)
             * @param height - Height of the details row
             */
            setHeight(height: number): void;

            /**
             * Set the minimum height for the current grid (only applicable for subgrids)
             * @param minHeight - Minimum height of the detail rows content
             */
            setMinHeight(minHeight: number): void;

            /**
             * Set the maximum height for the current grid (only applicable for subgrids)
             * @param maxHeight - Maximum height of the detail rows content
             */
            setMaxHeight(maxHeight: number): void;

            /**
             * If resizeColumnsToContent is enabled, this will set the maximum width that can be used when the columns are resized.
             * @param maxResizeColumnsToContentWidth Max column width when resizing columns to content size.
             */
            setMaxResizeColumnsToContentWidth(maxResizeColumnsToContentWidth: number): void;

            /**
             * Sets whether rows can be moved to other positions by drag and drop. The row will be moved on client side only.
             * @param moveRows - allow moving rows to a new position
             */
            setMoveRows(moveRows: boolean): void;

            /**
             * Sets whether group rows should be moved to other positions by drag and drop. This will cause the group rows children to be moved to the dropped row while the group row itself might be removed.
             */
            setMoveGroupRows(): void;

            /**
             * Add a navibar entry. Define a script with parameters that reloads the scriptlist. *Only works if scriptlist is displayed in main list view area.* If scriptlist is used as gadget use the `setNavibarEntry()` from the gadget api.
             * @param options - navibar entry options or `true` for using default values
             * @param options.label - label for the navibar entry (defaults to the scriptlist title)
             * @param options.scriptName - label for the navibar entry (defaults to the value of `context.scriptName`)
             * @param options.scriptParams - key/value object for optional script parameter
             */
            setNavibarEntry(options?: setNavibarEntry_options | boolean): void;

            /**
             * Sets the level op to which groups should be opened
             * @param openGroupLevel Level up to which to open groups
             */
            setOpenGroupLevel(openGroupLevel: Number): void;

            /**
             * Executes a function when clicking a row
             * @param rowClick Function to be executed on click.
             */
            setOnRowClick(rowClick: otrListRowClickCB): void;

            /**
             * Executes a function when double clicking a row
             * @param rowDoubleClick Function to be executed on double click.
             */
            setOnRowDoubleClick(rowDoubleClick: otrListRowClickCB): void;

            /**
             * Executes a function when selection changes
             * @param onSelectionChanged Function to be executed after selection changed.
             */
            setOnSelectionChanged(onSelectionChanged: otrOnSelectionChangedCB): void;

            /**
             * Get defined record-view config for this scriptlist.
             * @returns Defined record-view
             */
            getRecordView(): RecordViewConfig;

            /**
             * Display this scriptlist as a Record-View. <img src="assets/script-liset_record-view.jpg" style="border: solid #ccc 1px" />
             * @param recordView Enable default Record-View-Configuration | Set custom Record-View-Configuration
             */
            setRecordView(recordView: boolean | RecordViewConfig): void;

            /**
             * Allows resizing of rows.
             * @param resizableRows Allow resizing rows.
             */
            setResizableRows(resizableRows: boolean): void;

            /**
             * Sets whether columns should be resized to its content. Attention: This only work with showHeader = true !!!
             * @param resizeColumnsToContent - Resize columns so all content is visible
             */
            setResizeColumnsToContent(resizeColumnsToContent: boolean): void;

            /**
             * Sets the height for all rows.
             * @param rowHeight Height of the rows
             */
            setRowHeight(rowHeight: number): void;

            /**
             * Sets the style for all rows as a string or adds a callback to be executed for each row. function rowStyle(row) { row - Row for which the style should be generated. }
             * @param rowStyle Direkt style to use or a function that will be executed when rendering the row.
             */
            setRowStyle(rowStyle: string | Function): void;

            /**
             * Save the column model if the size or position of a column changes.
             * @param saveColumnModel - Save column model on change
             */
            setSaveColumnModel(saveColumnModel: boolean): void;

            /**
             * Sets whether subgrids of grids should scroll their content so they will always stay inside it's parent containers viewport.
             * @param scrollWithParent - Scroll with parent container
             */
            setScrollWithParent(scrollWithParent: boolean): void;

            /**
             * Get the list's search context configuration.
             * @returns searchContext configuration
             */
            getSearchContext(): object;

            /**
             * Sets the name of the search context (displayed in the searchbar). If no name was set for the searchContext, the list's name will be used.
             * @param searchContext - The search context name or a config object
             * @param searchContext.name - The search context name (Defaults to the list title)
             * @param searchContext.remoteSearch - Enable/disable remote search. Default is `true`.
             * @param searchContext.liveSearch - Automatic search after keyboard input (*since DOCUMENTS 5.0e*)
             */
            setSearchContext(searchContext?: setSearchContext_searchContext | string): void;

            /**
             * Define the order in which the actions first be ordered, buttons first or list actions first.
             * @param showActionButtonsFirst Show button actions before list actions
             */
            setShowActionButtonsFirst(showActionButtonsFirst: boolean): void;

            /**
             * Sets whether or not to display a checkboxes for each column for multi selection. The selected IDs will be available in ScriptListActions as the JSON parameter "selectedIds" when executing a portal script. Example: ``` if(typeof selectedIds !== "undefined") { // parse selected ids to array var idsArr = JSON.parse(selectedIds); for(var i=0,ii=idsArr.length; i<ii; i++) { ... } } ```
             * @param showCheckboxes - Show checkboxes
             * @param options - Options for displayed checkboxes
             * @param options.verticalCenterCheckboxes - Vertically center displayed checkboxes. (since DOCUMENTS 6.0) This is usefull if the row height is changed.
             */
            setShowCheckboxes(showCheckboxes: boolean, options?: setShowCheckboxes_options): void;

            /**
             * Set whether or not to display a column containing a + sign for each entry that can be used to expand the entry and show some details inside the table.
             * @param showDetailsColumn - Show the plus sign
             * @param options - Options for displayed details column
             * @param options.verticalCenterDetailsToggle - Vertically center the displayed entry details toggle. (since DOCUMENTS 6.0) This is usefull if the row height is changed.
             */
            setShowDetailsColumn(showDetailsColumn: boolean, options?: setShowDetailsColumn_options): void;

            /**
             * Enable a checkbox inside of group headers. The selected group IDs will be available in ScriptListActions as the JSON parameter "selectedGroupIds" when executing a portal script. Example: ``` if(typeof selectedGroupIds !== "undefined") { // parse selected group ids to array var idsArrGroup = JSON.parse(selectedGroupIds); for(var i=0,ii=idsArrGroup.length; i<ii; i++) { ... } } ```
             * @param showGroupCheckbox - Enables the group checkbox if true.
             */
            setShowGroupCheckbox(showGroupCheckbox: boolean): void;

            /**
             * Show or hide the list header (column labels)
             * @param showHeader - show the list header (column labels)
             */
            setShowHeader(showHeader: boolean): void;

            /**
             * Show or hide the index numbers for each row on the left side of the grid.
             * @param showIndexNumbers Show index numbers
             */
            setShowIndexNumbers(showIndexNumbers: boolean): void;

            /**
             * Set whether or not display an extra column for dragging rows if moveRows or moveRowsRemote is enabled.
             * @param showMoveColumn - Show the drag column
             */
            setShowMoveColumn(showMoveColumn: boolean): void;

            /**
             * Will add a toolbar button to refresh the scriptlist.
             * @param showRefreshButton - Show/Hide the refresh button. By default the button is not shown in the standard otris.scriptlist.List.
             */
            setShowRefreshButton(showRefreshButton: boolean): void;

            /**
             * Set whether or not to display a search box in the toolbar
             * @param showSearchBox - True for searchbox with default remote search.
             * @param showSearchBox.showSearchBox - Show the search box
             * @param showSearchBox.remoteSearch - Use remote search for searching. Default is false.
             */
            setShowSearchBox(showSearchBox: setShowSearchBox_showSearchBox | boolean): void;

            /**
             * Displays a filter field above each column for filtering its content. This can only be used if showHeader is true.
             * @param showQuickFilter True to enable quickFilter
             */
            setShowQuickFilter(showQuickFilter: boolean): void;

            /**
             * Sets whether the title should be displayed. This can be used to for example only show the button or just a search box without the scriptlists title.
             * @param showTitle - show or hide title
             */
            setShowTitle(showTitle: boolean): void;

            /**
             * Show or hide the lists toolbar
             * @param showToolbar - show the toolbar
             */
            setShowToolbar(showToolbar: boolean): void;

            /**
             * Set sorting for the list
             * @param sort - True for sortable with default remote sort.
             * @param sort.sortable - Allow sorting columns.
             * @param sort.multiSort - Allow sorting multiple columns. Default is false.
             * @param sort.remoteSort - Sort the list remotely by executing the origin script again with sort params.
             */
            setSort(sort?: setSort_sort | boolean): void;

            /**
             * Automatically apply sort order to all columns. This will only work correctly after all columns have been added to the list.
             */
            applySortOrder(): void;

            /**
             * Set the start index of the list. The index of the first entry in this list object in relation to the total number of entries in the list.
             * @param startIndex - Index of the first entry
             */
            setStartIndex(startIndex: number): void;

            /**
             * Will stick group rows to the top of the grid while scrolling through the group.
             * @param stickyGroupRows Stick group rows to top
             */
            setStickyGroupRows(stickyGroupRows: boolean): void;

            /**
             * Get the total size of rows in the current ScriptList. **Attention:** If the list is a HitresultList, the total size will only have a valid value after list.transfer() has been called and all pages have been loaded (pageSize=0).
             * @returns total size of rows in list
             */
            getTotalSize(): number;

            /**
             * Shows the rows' sublists as a single row of blob thumbnails. For this to work correctly, all information needed to render the thumbnail must be available on the subrow.
             * @param sublistBlobThumbnails - Shows the sublist as a row ob blob thumbnails.
             */
            setSublistBlobThumbnails(sublistBlobThumbnails: boolean): void;

            /**
             * Adjust the default styling of the list with a {@link otris.scriptlist.ScriptListStyle} configuration.
             * @param style - {@link otris.scriptlist.ScriptListStyle} instance or a style configuration (Used for the {@link otris.scriptlist.ScriptListStyle} constructor)
             * @returns The given or a new {@link otris.scriptlist.ScriptListStyle} instance
             * @see otris.scriptlist.ScriptListStyle
             */
            setListStyle(style: otris.scriptlist.ScriptListStyle): otris.scriptlist.ScriptListStyle;

            /**
             * Set a class which is added to the list container
             * @param containerClass
             */
            setContainerClass(containerClass: string): void;

            /**
             * Adds a class name to the list container
             * @param cls
             */
            addContainerClass(cls: string): void;

            /**
             * Set a context data object that is transferred to the client. There it will be available in several callbacks.
             * @param cData
             * @see otris.scriptlist.List#setOnRowClick
             * @see otris.scriptlist.List#setOnRowDoubleClick
             * @see otris.scriptlist.List#setOnSelectionChanged
             */
            setContextData(cData: object): void;

            /**
             * Get the current context data object.
             * @returns context data
             * @see otris.scriptlist.List#setOnRowClick
             * @see otris.scriptlist.List#setOnRowDoubleClick
             * @see otris.scriptlist.List#setOnSelectionChanged
             */
            getContextData(): object | undefined;

            /**
             * Set a `listId` for listId specific row updates.
             * @param listId
             */
            setListId(listId: string): void;

            /**
             * Get the current `listId`.
             * @returns listId
             */
            getListId(): string | undefined;

            /**
             * Return a proper JSON representation of this list.
             * @param options Options for transferring the list.
             * @param options.stringify By default the result is stringified as JSON for setting it as a portal script return value. This can be used to <strong>not stringify</strong> the result immediately after creating a HitresultList so the list's data can be modified, after the list's hits have been loaded. Now the result must be stringified manually and set as return value.
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(options?: transfer_options): string;

        }

        /**
         * This class represents a Row used in a {@link otris.scriptlist.List}.
         * You do not need to instantiate objects of this class directly. Instances of
         * this class are returned from the [addRow]{@link otris.scriptlist.List#addRow}
         * method of the List object.
         */
        class Row {
            constructor();

            /**
             * Add a subrow to display as a sublist after the last grid column. This can also be used to add documents that will be opened by click on a file.
             * @param config `String` if only value should be displayed or `Object` for further configuration.
             * @param config.icons Array of icons to be used for the subrow. Currently only the first icon is displayed.
             * @param config.documentName full document name to be displayed if referenced subrow is a file document. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.extension Extension of the document to be used as automatically generate file type icon. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.size Size to be displayed on hover thumbnail icon, with unit (e.g. byte). This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.onclick Javascript Code to be executed if the subrow was clicked.
             * @param config.values 0 :name to be displayed 1 :size filesize to be displayed if list is displayed as blobthumbnails
             * @returns
             */
            addSubrow(config: addSubrow_config | string): otris.scriptlist.Subrow;

            /**
             * Action which will be fired when the row is clicked. Available actions: showFile, showFolder, runScript
             * @param newAction - function to be executed on mouse click
             */
            setAction(newAction: string): void;

            /**
             * 
             * @see [setAcceptedDropTypes]{@link otris.scriptlist.List#setAcceptedDropTypes}
             */
            setAcceptedDropTypes(): void;

            /**
             * Sets whether a row should be marked active. Only one row can be active.
             * @param active mark row active
             * @returns - current row (since DOCUMENTS 5.0i)
             */
            setActive(active: boolean): Row;

            /**
             * Get all data or certain value by key.
             * @param key - key for a certain value or undefined for all data
             * @returns Value for a passed key or all data.
             */
            getMetaData(key: string): any;

            /**
             * This can be used to transfer meta data to the client that is not displayed in the rendered grid.
             * @param key - Key to set in meta data or object containing all data.
             * @param value - Value to set for this key
             * @returns - current row
             */
            setMetaData(key: string | object, value: any): Row;

            /**
             * Set the row specific parameters that should be send to the details script when expanding the details row. Overwrites the parameters set in the list.
             * @param detailsParams - key/value object of parameters to pass to the details script
             * @returns - current row
             */
            setDetailsParams(detailsParams: object): Row;

            /**
             * Set the row specific name of the script that is called when the rows details row will be expanded. (Overwrites the scriptName set in the list).
             * @param detailsScriptName - the scriptname to use for displaying the details row
             * @returns - current row
             */
            setDetailsScriptName(detailsScriptName: string): Row;

            /**
             * Mark the row as emphasized. Shown with bold text in the list.
             * @param emphasized - emphasized flag
             * @returns - current row
             */
            setEmphasized(emphasized: boolean): Row;

            /**
             * Get the value for a key
             * @param key - value to get from this row
             * @returns Value for this key
             */
            getValue(key: string): any;

            /**
             * Set the row's value for a key.
             * @param key Key whose value should be set.
             * @param value Value that should be set.
             */
            setValue(key: string, value: any): void;

            /**
             * Get showCheckbox state for this row. If showCheckbox is undefined, the row will be shown by default.
             * @returns Row showCheckbox state
             */
            getShowCheckbox(): boolean;

            /**
             * Set whether the checkbox should be shown for this row. Only works if list.setShowCheckboxes(true) was set.
             * @param showCheckbox Show or hide checkbox for this row.
             */
            setShowCheckbox(showCheckbox: boolean): void;

            /**
             * Tag the row with a predefined grey marker or insert custom html
             * @param tag - True for a standard grey marker, String for HTML
             * @returns - current row
             */
            setTag(tag: boolean | string): Row;

            /**
             * Set the tag color
             * @param tagColor - Html color for the row's tag
             * @returns - current row
             */
            setTagColor(tagColor: string): Row;

            /**
             * Set handler for click event.
             * @param newOnclick - function or function as string (just for legacy support) to be executed on mouse click Regular functions are supported since DOCUMENTS 5.0g ```javascript listRow.setOnClick(function(documentsContext, options) { documentsContext: A newly created DocumentsContext options: { rowIndex: the current grid row index cellIndex: the current grid cell index row: the current grid row model column: the current grid column model originalEvent: the current original dom event } }); ```
             * @returns - current row
             */
            setOnClick(newOnclick: string | Function): Row;

            /**
             * Set handler for double click event.
             * @param newOnDoubleclick - function or function as string (just for legacy support) to be executed on mouse double click Regular functions are supported since DOCUMENTS 5.0g ```javascript listRow.setOnDoubleClick(function(documentsContext, options) { documentsContext: A newly created DocumentsContext options: { rowIndex: the current grid row index cellIndex: the current grid cell index row: the current grid row model column: the current grid column model originalEvent: the current original dom event } }); ```
             * @returns - current row (since DOCUMENTS 5.0i)
             */
            setOnDoubleClick(newOnDoubleclick: string | Function): Row;

            /**
             * Checks the row on display
             * @param selected - True if row should be selected in view
             * @returns - current row
             */
            setSelected(selected: boolean): Row;

            /**
             * Transfer function returning the data of the Row for a gadget.
             * @returns Data of the row
             */
            transfer(): object;

        }

        /**
         * This class represents a Subrow used in a {@link otris.scriptlist.Row}.
         * You do not need to instantiate objects of this class directly. Instances of
         * this class are returned from the [addSubrow]{@link otris.scriptlist.Row#addSubrow}
         * method of the List object.
         */
        class Subrow {
            constructor();

            /**
             * Javascript Code to be executed if the subrow was clicked.
             * @param newOnclick Javascript Code to be executed if the subrow was clicked.
             */
            setOnClick(newOnclick: string): void;

            /**
             * Sets an array of icons to be used for the subrow. Currently only the first icon is displayed.
             * @param icons array of icons to be used for the subrow
             */
            setIcons(icons: string[]): void;

            /**
             * Sets the document id if the parent row is referencing a file. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param documentId document id if the parent row is referencing a file
             */
            setDocumentId(documentId: string): void;

            /**
             * Sets the full document name to be displayed if referenced subrow is a file document. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param documentName full document name to be displayed if referenced subrow is a file document
             */
            setDocumentName(documentName: string): void;

            /**
             * Sets the extension of the document to be used as automatically generate file type icon. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param extension extension of the document
             */
            setExtension(extension: string): void;

            /**
             * Sets the size to be displayed on hover thumbnail icon, with unit (e.g. byte). This is only needed if thumbnails are created automatically based on these paremeters.
             * @param size Size to be displayed on hover thumbnail icon, with unit (e.g. byte).
             */
            setSize(size: string): void;

            /**
             * Sets the values to be displayed in the sublist. Normally only array[0] is needed, array[1] is reserved for special display of blob thumbnails. values: 0 :name to be displayed 1 :size filesize to be displayed if list is displayed as blobthumbnails
             * @param values Values to be displayed in the sublist.
             */
            setValues(values: string[]): void;

        }

        /**
         * String values for available data types of columns. `STRING`: Regular String `NUMBER`: Number formatted aligned right `CUSTOM`: Custom field that can be used for images `ICON`: Display a icon column with common icon syntax, eg: `entypo:home`. (since 5.0i) `ICONBUTTON`: Display a **clickable** icon column with common icon syntax, eg: `entypo:home`. (since `6.0`) `CHECKBOX`: Checkbox that will show boolean states `DATE`: Javascript Date that will be displayed in the local date format and supports sorting values chronologically. (since 5.0i) `TIMESTAMP`: Javascript Date that will be displayed in the local date time format and supports sorting values chronologically. (since 5.0i) `TRANSLATION_FIELD`: Field with multilanguage value (de:..;en:...) that will be displayed in the local language. (since 6.0.2) Further explanation for data types <strong>DATE</strong> and <strong>TIMESTAMP</strong>:<br> For these data types the row value must be either a real JavaScript-Date-Object, an Integer-Number in milliseconds since epoch or a string in the date time string format (ISO 8601).
         */
        type ColumnDataType = 'STRING'|'NUMBER'|'ICON'|'CUSTOM'|'CHECKBOX'|'DATE'|'TIMESTAMP'|'TRANSLATION_FIELD';

        /**
         * This class represents a Column used in a {@link otris.scriptlist.List}.
         * You do not need to instatiate objects of this class directly. Instances of this
         * class are returned from the [addColumn]{@link otris.scriptlist.List#addColumn}
         * method of the List object.
         */
        class Column {
            /**
             * 
             * @param key - Id for the column or object configuration
             * @param key.comparator - Callback to sort values of this column.
             * @param key.formatter - Formatter to be used for this columns' cells (since DOCUMENTS 5.0i)
             * @param key.sortKey - Key which will be used for a HitresultList when sorting this column (since DOCUMENTS 5.0i)
             * @param key.sortOrder - Sort order of the column
             * @param key.visible - Column is visible (since DOCUMENTS 5.0i)
             * @param key.width - Width of the column
             * @param dataType - Data type of the data in this column (STRING, NUMBER, ICON, CUSTOM, CHECKBOX, DATE, TIMESTAMP or TRANSLATION_FIELD)
             * @param label - Header label of the column
             */
            constructor(key: ColumnConstructor_key | string, dataType: ColumnDataType, label: string);

            /**
             * Get the comparator function that is used for sorting this column
             * @returns comparator that is used for sorting this column
             */
            getComparator(): comparatorCB;

            /**
             * Sets the comparator for sorting values of this column
             * @param comparator Comparator for sorting value of this column.
             * @returns - Current Column
             */
            setComparator(comparator: comparatorCB): Column;

            /**
             * Get whether number should be displayed localized and formatted.
             * @returns show as localized formatted number
             */
            getFormattedNumber(): boolean;

            /**
             * Show number in localized format.
             * @param formattedNumber show as localized formatted number
             * @returns - Current Column
             */
            setFormattedNumber(formattedNumber: boolean): Column;

            /**
             * Get number of decimals to display for this column.
             * @returns Number of decimals to display for this column.
             */
            getNrDecimals(): number;

            /**
             * Set number of decimals to display. Must be an integer.
             * @param nrDecimals Number of decimals to display. Must be an integer.
             * @returns - Current Column
             */
            setNrDecimals(nrDecimals: number): Column;

            /**
             * Gets the key (the technical name) of this column
             * @returns technical column name
             */
            getKey(): string;

            /**
             * Set the key (the technical name) of this column
             * @param key - the new key
             * @returns - Current column
             */
            setKey(key: string): Column;

            /**
             * Get the width(in pixels) of this column
             * @returns width of the column
             */
            getWidth(): number;

            /**
             * Set the width(in pixels) of this column
             * @param width - width of the column
             * @returns - Current column
             */
            setWidth(width: number): Column;

            /**
             * Get the label of the column
             */
            getLabel(): string;

            /**
             * Set the label of the column
             * @param label - the new label
             * @returns - Current column
             */
            setLabel(label: string): Column;

            /**
             * Get the data type of the column.
             */
            getDataType(): DataType;

            /**
             * Get the formatter for this column
             * @returns Formatter for this columns' cells
             */
            getFormatter(): otrListCellFormatterCB | string;

            /**
             * Function or template string (handlebars) to be used when rendering this columns' cell.
             * @param formatter Custom formatter to be used for cells from this column.
             * @returns - Current column
             */
            setFormatter(formatter: otrListCellFormatterCB | string): Column;

            /**
             * Get the export function for this column.
             * @returns Export function for this column.
             */
            getExporter(): boolean | otrisListColumnExporterCB;

            /**
             * If <strong>list.setShowExportActions(true)</strong> was set, the list can be exported to an export file. When the list is exported, the origin script will be called with the current sort and search parameters. Each row value will be exported to the file. If a column has an export-function defined, this function will be called to serialize the returned <strong>string value</strong> into the exported file. If column.setExport(false) is called, this column will be excluded from export. This can be used to exclude columns from export or return a more meaningful value in case a formatter is used or an icon is displayed in this column.
             * @param exporter Function that is executed when exporting the list or false if this column should not be exported. Must return a <strong>string value</strong>. If the value is empty, <strong>the empty string "" must be returned</strong>.
             * @returns - Current column
             */
            setExporter(exporter: boolean | otrisListColumnExporterCB): Column;

            /**
             * Set the data type of the column.
             * @param columnDataType - the new data type (STRING, NUMBER, ICON, CUSTOM, CHECKBOX, DATE, TIMESTAMP or TRANSLATION_FIELD)
             * @returns - Current column
             */
            setDataType(columnDataType: DataType): Column;

            /**
             * Sets the quickFilterType to be used as input element for this column. If the quickFilterType is set to false, the quickFilter will be disabled for this column.
             * @param quickFilterType quickFilterType - Possible values: STRING,CHECKBOX,false[,SELECT,DATE,RANGE]
             * @returns - Current column
             */
            setQuickFilterOptions(quickFilterType: string): Column;

            /**
             * Get sortability of this column.
             * @returns sorting this column is allowed
             */
            getSortable(): boolean;

            /**
             * Enable or disable sorting of a column
             * @param sortable - allow sorting this column
             * @returns - Current column
             */
            setSortable(sortable: boolean): Column;

            /**
             * Gets the quickFilterType of the column.
             */
            getQuickFilterOptions(): void;

            /**
             * Get sort key which will be used for sorting the HitresultList.
             * @returns The key by which this column will be sorted.
             */
            getSortKey(): string;

            /**
             * If a new column is added to a HitresultList, the grid cannot be sorted remotely by its key because it doesn't exist in the original hitlist. This can be used to set a proxy-key which will be used instead to sort the HitresultList by an existing column key.
             * @param sortKey - Key which will be used for the HitresultList when sorting this column.
             * @returns - Current column
             */
            setSortKey(sortKey: string): Column;

            /**
             * Gets the sort order of the column.
             */
            getSortOrder(): string;

            /**
             * Sets the sort order.
             * @param sortOrder - Possible values: 0, 1 (ascending), -1 (descending) (Use: 2,-2 / 3,-3 / ... for multi column sort).
             * @returns - Current column
             */
            setSortOrder(sortOrder: string): Column;

            /**
             * Gets wether or not the column should be visible.
             * @returns true, if the column should be visible
             */
            getVisible(): boolean;

            /**
             * Sets wether or not the column should be visible. Useful when you need columns to group by or columns containing a unique id that should not be displayed in the grid.
             * @param visible - true, if the column should be visible
             * @returns - Current column
             */
            setVisible(visible: boolean): Column;

            /**
             * Transfer function returning the data of the Column for a gadget.
             * @returns Data of the column
             */
            transfer(): object;

        }

        /**
         * Result to be returned after move row with moveRowsRemote enabled. This will cause the scriptlist to approve/deny rendering the row at the new position without rerendering the whole scriplist.
         * For this to work, the returnType "scriptList" should be set.
         * If no message will be displayed the script may also just return "MOVE_ROW_SUCCESS" or "MOVE_ROW_DENIED".
         */
        class MoveRowResult {
            /**
             * 
             * @param result Move row result options
             * @param result.success Move row was successfull.
             * @param result.message Detailed message why moving the row failed/succeded.
             */
            constructor(result?: MoveRowResultConstructor_result);

        }

        class ScriptListStyle {
            /**
             * 
             * @param configuration style configuration
             * @param configuration.defaultBackground - css color definiton (sets value for: `rowBackground`, `rowOddBackground`, `listBorderColor` and `scrollbarBackground`)
             * @param configuration.mainMargin - css margin definiton
             * @param configuration.mainBackground - css color definiton
             * @param configuration.mainBorderColorTop - css color definiton
             * @param configuration.headerBackground - css color definiton
             * @param configuration.color - css color definiton
             * @param configuration.oddColor - css color definiton
             * @param configuration.headerColumnBackground - css color definiton
             * @param configuration.groupColumnBackground - css color definiton
             * @param configuration.groupColumnColor - css color definiton
             * @param configuration.groupColumnBorderColor - css color definiton
             * @param configuration.rowBackground - css color definiton
             * @param configuration.rowOddBackground - css color definiton
             * @param configuration.rowActiveBackground - css color definiton
             * @param configuration.rowHoverBackground - css color definiton
             * @param configuration.rowCheckboxWrapperDisplay - css display definiton
             * @param configuration.rowCheckboxWrapperAlignItems - css align-items definiton
             * @param configuration.listBorderColor - css color definiton
             * @param configuration.scrollbarBackground - css color definiton
             * @param configuration.scrollbarColor - css color definiton
             * @see otris.scriptlist.List#setListStyle
             */
            constructor(configuration?: ScriptListStyleConstructor_configuration);

            /**
             * Set style
             * @param key - key to set (if `key` is type of *object* the set is done for all key&value pairs of the object)
             * @param value - value to set (only optional if `key` is of type *object*)
             */
            set(key: string | object, value?: string): void;

            /**
             * Get value for key
             * @param key
             * @returns value for the given key. returns undefined if key is not set
             */
            get(key: string): string;

        }

        /**
         * Group that will always be shown if added as a default group to grouping.
         */
        class Group {
            /**
             * 
             * @param columnOrGroup Group value or an object
             * @param columnOrGroup.id - value to group by
             * @param columnOrGroup.label - label to be displayed in the group row
             * @param columnOrGroup.emptyText - text that will be displayed if there are no rows for this group
             */
            constructor();

            /**
             * Group id that will be used for this group.
             * @param id id of this group
             */
            setId(id: string): void;

            /**
             * Label for the group row to be displayed.
             * @param label label for the group row
             */
            setLabel(label: string): void;

            /**
             * This text will be displayed if there are no rows for this group. Else the group will just be empty
             * @param emptyText text to display
             */
            setEmptyText(emptyText: string): void;

        }

        /**
         * Convenience object to hold grouping data
         */
        class Grouping {
            /**
             * 
             * @param columnOrGroup {string|GroupingConfig} Column info to group by. Either just a string for the column or object containing additional configuration.
             * @param columnOrGroup.comparator {groupComparatorCB} Callback to sort values of this group.
             * @param columnOrGroup.column_id {string} id of the column that should be grouped
             * @param columnOrGroup.default_groups {Array<string|GroupConfig>} groups that will be always displayed, even if there are no rows matching this group
             */
            constructor();

            /**
             * 
             * @see [setAcceptedDropTypes]{@link otris.scriptlist.List#setAcceptedDropTypes}
             */
            setAcceptedDropTypes(): void;

            /**
             * Set comparator for this group
             * @param comparator Comparator for this group
             */
            setComparator(comparator: comparatorCB): void;

            /**
             * List of default groups to display if there are empty groups. The default groups will be sorted in the order they were added.
             * @param default_groups list of default groups
             */
            setDefaultGroups(default_groups: any[]): void;

            /**
             * Initially groups will be expanded. This can be used to collapse a group.
             * @param collapsed collapse this group on first display
             */
            setCollapsed(collapsed: boolean): void;

            /**
             * Adds an accepted item type that can be dropped on all rows of this grouping and the generated parent group row. After an item was dropped on a row the scriptListEvent 'dropItemsOnRow' will be triggered with the drop location defined by id,index and group criteria. Available types: - docFile DOCUMENTS file eg. file header image dragged and dropped on row. { type: "docFile", fileType: "<filetype>"} will accept only the configured filetype. - genericItem Genetic item eg. row from another Scriptlist dropped on on of this Scriptlists' row.
             * @param acceptedDropTypes List of item types that can be dropped on a row.
             */
            addAcceptedDropType(acceptedDropTypes: string[]): void;

            /**
             * Add a default group that will always be displayed, even if there are no rows belonging to this group. The groups will be sorted in the order they were added to the default groups.
             * @param defaultGroup Default group to always be displayed, even if there are no rows for this group.
             */
            addDefaultGroup(defaultGroup: object | otris.scriptlist.Group): void;

        }

        /**
         * Clear the cached count for a scriptlist.
         * @param opts Options for clearing a cached scriptlist count.
         * @param opts.cacheKey Use this cache key to clear a cached script list count. If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
         */
        function clearCount(opts?: clearCount_opts): void;

        /**
         * Get the count for a scriptlist. If the file with the register belonging to this scriptlist is opened for the first time, the count will be determined by executing the provided count callback. If the file has already been shown before, the cached count will be returned.
         * @param opts Options for getting the count for a script list.
         * @param opts.cacheKey Use this cache key when getting the count for this scriptlist. If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
         * @param opts.countCallback Callback to count the rows of a scriptlist.
         * @returns Number of rows for this scriptlist.
         */
        function getCount(opts: getCount_opts): number;

        /**
         * Check if a count was cached for a scriptlist.
         * @param opts Options for getting the count for a script list.
         * @param opts.cacheKey Use this cache key when check whether the count for this scriptlist was cached. If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
         * @returns A count has been cached for this scriptlist.
         */
        function hasCount(opts?: hasCount_opts): boolean;

        /**
         * 
         * @param sortConfig Configuration for sorting.
         * @param sortConfig.multiSort Allow sorting of multiple columns.
         * @param sortConfig.sortOrder Custom sorting by comma separated string to be returned in object format eg. name+,age-
         * @param listSortOrder List of columns with sort info.
         * @returns String which can be passed to new HitResultset(search,filter,sort)
         */
        function getSortExpression(sortConfig: getSortExpression_sortConfig, listSortOrder: object[]): string;

        /**
         * 
         * @param sortConfig Configuration for sorting.
         * @param sortConfig.multiSort Allow sorting of multiple columns.
         * @param sortConfig.sortOrder Custom sorting by comma separated string to be returned in object format eg. name+,age-
         * @returns List of columns with sort info.
         */
        function getSortOrder(sortConfig: getSortOrder_sortConfig): any;

        /**
         * This is used to set the sort indicators on the columns.
         * @param hitlistSortOrder Sort information for the columns
         * @param listColumnsByKey Map of scriptlist columns by column key
         */
        function setSorting(hitlistSortOrder: object[], listColumnsByKey: object[]): void;

        /**
         * Get whether list is shown in a decoupled window.
         * @returns List is shown in a decoupled window
         */
        function isDecoupled(): boolean;

    }

    namespace tour {
        /**
         * This class is used to create a guided tour for the documents system
         */
        class Tour {
            constructor();

            /**
             * Sets the tour configuration. This overrides all previously made settings like language, etc.
             * @param tourConfiguration - complete tour configuration
             */
            setTourConfiguration(tourConfiguration: object): void;

            /**
             * Gets the tour configuration
             * @returns tourConfiguration - complete tour configuration
             */
            getTourConfiguration(): object;

            /**
             * Sets the language of the tour (Is used for button labels and loading text). The default value is the language of the current system user.
             * @param lang a language string like "en" or "de"
             */
            setTourLanguage(lang: string): void;

            /**
             * Gets the language of the tour (Is used for button labels and loading text). The default value is the language of the current system user.
             */
            getTourLanguage(): void;

            /**
             * Return the JSON representation of the tour
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(): string;

        }

    }

    namespace tree {
        interface ScriptTreeEvent {
            /**
             * event name
             */
            name: string;
            /**
             * node id
             */
            nodeId?: string;
        }

        /**
         * **Information:** In *DOCUMENTS 5.0g* the class **TreeItem** was moved to the namespace `otris.tree`. To ensure
         * backward compatibility, the *old* reference **otris.TreeItem** is still available.
         * 
         * PortalScript to create the data for the ScriptTree. This script needs to be
         * included in any other PortalScript which builds a ScriptTree. The returnType of the
         * script where this API is used must be `context.returnType = "scriptTree";`
         */
        class TreeItem {
            /**
             * 
             * @param id - Unique id of the item in the tree
             * @param name - Name of this node
             */
            constructor(id: string, name: string);

            /**
             * Unique id of the node in the tree
             */
            id: string;

            /**
             * Name of the tree node
             */
            name: string;

            /**
             * Tooltip for the tree node
             */
            tooltip: string;

            /**
             * Parent of this child, or null if it is the root node
             */
            parent: TreeItem;

            /**
             * Selection of this node true or false
             */
            isActive: boolean;

            /**
             * Disables selection of this node
             */
            isDisabled: boolean;

            /**
             * <strong>DEPRECATED!</strong> Do not use this attribute!
             */
            url: any;

            /**
             * <strong>DEPRECATED!</strong> Do not use this attribute!
             */
            bullet: any;

            /**
             * Sets the opened tree level.
             */
            openTreeLevel: number;

            /**
             * Adds an icon to the tree item. Possible values: **image path**, **entypo icon** or **ionicons icon**
             */
            activebullet: string;

            /**
             * Prevents the currently selected tree-item from loosing selection, if a folder that has an id that is not contained within the tree entries is opened. (Only relevant for the root node)
             */
            preventDeselectTreeItem: boolean;

            /**
             * Exand the first TreeItem (Only relevant for the root node and `treeVisualizationType = "sidebar"`)
             */
            expandFirstTreeItem: boolean;

            /**
             * Used to sort child items. Use a value below the default 0 to move items to the end.
             */
            order: number;

            /**
             * If set to true the outbar label is updated with the defined tree title (Only relevant for the root node)
             */
            updateOutbarLabel: boolean;

            /**
             * If set to `true` the children of the nodes are lazy loaded (Only relevant for the root node, defaults to `false`) **Note:** Lazy loading is only used if the node data does not contain `children` (added with [addItem]{@link otris.tree.TreeItem#addItem}) and the [hasChilds]{@link otris.tree.TreeItem#} flag is set to `true`. In the example below you can see how to return a subtree using [otris.tree.getScriptTreeEvent()]{@link otris.tree#getScriptTreeEvent}.
             */
            lazyLoad: boolean;

            /**
             * Defines the type of visualization. (possible values: `tree` (default), `sidebar`)
             */
            treeVisualizationType: string;

            /**
             * Specifies if the tree item is draggable (defaults to `true`)
             */
            draggable: boolean;

            /**
             * Specifies if the tree item has childs (relevant for lazy loading, defaults to `false`)
             */
            hasChilds: boolean;

            /**
             * List of nodes
             */
            items: any[];

            /**
             * Action which will be fired when the node is clicked. Possible actions `showFile:[FILE_ID]`, `showFolder:[FOLDER_ID]` and `executeScript:[SCRIPTNAME]`
             */
            action: string;

            /**
             * Drop action which will be fired when something will be dropped to this node. The defined script is executed before a file is uploaded. The script should return a fileId of a document. script returnType = (showFile|showNewFile)
             */
            dropaction: string;

            /**
             * Use this to start a busy panel if the defined action may have a longer execution time.
             */
            busyPanel: "Dialog" | "Gadget" | "MainFile" | "MainFileGentable" | "MainList" | "MainTree" | "Workspace";

            /**
             * Drop action which will be fired when something will be dropped to this node. The script is only executed if items from within documents are dropped on the node The script is called with the following json encoded parameter object (parameter name: `dndActionJSON`): <pre>dndAction = { treeType  string  "scriptTree" nodeId    string  id of the drop target action    string  "copy"/"move" itemIds   array   ids of the dropped items itemType  string  type of the items }</pre> Decode the parameter object in the script: <pre>var dndAction = JSON.parse(dndActionJSON);</pre>
             */
            docItemsDropAction: string;

            /**
             * The tree item drop action will be fired when one or more tree items are dropped on a tree node. The script is called with the following json encoded parameter object (parameter name: `dndActionJSON`): **This property is only relevant for the root node** <pre>dndAction = { nodeId    string  id of the drop target itemIds   array   ids of the dropped nodes action    string  "copy"/"move" }</pre> Decode the parameter object in the script: <pre>var dndAction = JSON.parse(dndActionJSON);</pre>
             */
            treeItemsDropAction: string;

            /**
             * Sets the type for this tree item (defaults to: `node`) Only accepts the following characters for the given string: `a-z`,`0-9`,`-` and `_` Non valid strings are automatically transformed (characters are transformed to lower case or replaced with `_`)
             * @param type - The type for this tree item
             */
            setType(type: string): void;

            /**
             * Sets the accepted types (e.g. for drag and drop) for this tree item (defaults to: `["node"]`) See [setType]{@link otris.TreeItem#setType} for valid type strings
             * @param types - An array of accepted types
             */
            setAcceptedTypes(types: string[]): void;

            /**
             * Add a new node as a child node to this node. This node will be the parent of the added node.
             * @param treeItem child node
             */
            addItem(treeItem: TreeItem): void;

            /**
             * Removes the item from the items list of his parent (if parent exists).
             */
            remove(): void;

            /**
             * Set the level up to which the tree will be opened.
             * @param level Level up wich the tree will be opened
             */
            setOpenTreeLevel(level: number): void;

            /**
             * Make this object ready for being transferred to the client.
             * @returns transferable string
             */
            transfer(): string;

            /**
             * Internal function for building the ScriptTree XML.
             * @param myLevel - Current level in the tree
             * @returns XML document representing the tree
             */
            getAll(myLevel: number): string;

            /**
             * Internal function returning the attributes of this class as ScriptTree XML.
             * @returns XML fragment with the attributes of this class
             */
            getAsXML(): string;

            /**
             * Escapes a xml string. Applicable for both xml text and xml attribute content. For internal purposes only! *Note: If the input is not a string, then it will be returned unchanged!*
             * @see https://www.w3.org/TR/xml/#syntax
             * @param input the unescaped xml string
             * @returns the escaped xml string
             */
            convertToXMLString(input: string): string;

        }

        /**
         * Returns the ScriptTree event. Currently the event `subtree` is supported. See [lazyLoad]{@link otris.tree.TreeItem#lazyLoad} for details. **Notice:** Returns `undefined` if the script was not triggered by an event.
         * @returns ScriptTree event object
         */
        function getScriptTreeEvent(): ScriptTreeEvent | undefined;

    }

    namespace treechart {
        /**
         * Style definition for a {@link otris.treechart.TreeNode}.
         */
        interface Skin {
            /**
             * code for node color
             */
            Color: string;
            /**
             * Color code for the border of a node
             */
            borderColor: string;
            /**
             * Name of the font for the node's label
             */
            font: string;
            /**
             * Color code for the node's label
             */
            fontColor: string;
            /**
             * Font size for the node's label
             */
            fontSize: number;
            /**
             * Radius if the corner should be rounded
             */
            borderRoundness: number;
            /**
             * Vertical margin of the label to the node's border
             */
            vMargin: number;
            /**
             * Horizontal margin of the label to the node's border
             */
            hMargin: number;
            /**
             * Code how leafs should be rendered
             */
            leafRendering: string;
            /**
             * Color code for highlighted node
             */
            highlightColorIn: string;
            /**
             * Color code for de-highlighting a node
             */
            highlightColorOut: string;
        }

        /**
         * Script command for executing an action. The following commands are available: * `showFile:fileId` * `runScript:scriptName (return needs to be a TreeChart)` * `showFolder:folderId` * `clientFunction:functionName` **Only available if TreeChart is used as a gadget (`otris.gadget.gui.TreeChart`)** The client function is called with the following object as parameter `{nodeId: "[nodeId]", nodeLabel: "[nodeLabel]", eventName: "[click|dblClick|rightClick]"}`
         */
        type ActionScript = string;

        /**
         * Event handlers on a {@link otris.treechart.TreeNode}.
         */
        interface EventHandlers {
            /**
             * Action for handling the click event
             */
            click: ActionScript;
            /**
             * Action for handling the double click event
             */
            dblClick: ActionScript;
            /**
             * Action for handling the right click event
             */
            rightClick: ActionScript;
            /**
             * Special action configuration (since DOCUMENTS 5.0f):<pre>{    doNotExecuteDefaultClientScript: true,	//	will prevent a defined client script from executing before action    clientFunction: function(documentsContext) {...}, // javascript function that will be transferred to the client    showFile: "<fileId>",    showFolder: "<fodlerId>"}</pre>
             */
            "click<br><br>dblClick<br><br>rightClick": object;
        }

        /**
         * Label of an edge between two {@link otris.treechart.TreeNode}.
         */
        interface EdgeLabel {
            /**
             * Labe of the edge
             */
            label: string;
        }

        /**
         * Specifies the edge between two {@link otris.treechart.TreeNode}. nodeId is the id of the child {@link otris.treechart.TreeNode}. For every child there has to be a corresponding property having the same name as the id of the child node.
         */
        interface Edge {
            /**
             * Label of the edge
             */
            nodeId: EdgeLabel;
        }

        /**
         * Code for the orientation of the tree. Allowed values are `LR` (left to right) and `TB` (top to bottom)
         */
        type Orientation = string;

        /**
         * Class for gathering the data needed for the Dynamic Tree Chart.
         */
        class TreeChart {
            constructor();

            /**
             * Transfer function generating the data for the Dynamic Tree Chart.
             * @returns JSON representation of the gathered data
             */
            transfer(): string;

            /**
             * Creates a tree node. This method is provided for convenience. Tree nodes can be also created via the constructor of {@link otris.treechart.TreeNode}.
             * @param id - Id of the new node
             * @param label - Label of the node
             * @returns Created tree node
             */
            createNode(id: string, label: string): otris.treechart.TreeNode;

            /**
             * Creates a tree node and initialize it as a leaf. This method is provided for convenience. Tree nodes can be also created via the constructor of {@link otris.treechart.TreeNode}.
             * @param id - Id of the new node
             * @param label - Label of the node
             * @returns Created tree node as leaf
             */
            createLeaf(id: string, label: string): otris.treechart.TreeNode;

            /**
             * Sets the root node of the tree.
             * @param node - Root node of the tree
             */
            setRoot(node: otris.treechart.TreeNode): void;

            /**
             * Gets the root node of the tree.
             */
            getRoot(): void;

        }

        /**
         * Represents a node for the {@link TreeChart}
         */
        class TreeNode {
            /**
             * 
             * @param id - Id of the node
             */
            constructor(id: string);

            /**
             * Adds another node as child to the node.
             * @param child - Node to add as a child
             */
            addChild(child: TreeNode): void;

            /**
             * Convenience method to retrieve the event handlers of the node. Possible actions: &emsp;&emsp;showFile:fileId[?dlcRegisterId=registerId&dlcDocumentId=documentId] &emsp;&emsp;showFolder:folderId &emsp;&emsp;runScript:scriptName
             * @returns Object with the node's event handlers
             */
            getActionEvents(): otris.treechart.EventHandlers;

            /**
             * Checks, if a node is a child of this node.
             * @param node - Node to be checked
             * @returns true, if the node is a child of this node
             */
            isChild(node: TreeNode): boolean;

            /**
             * Convenience method for setting the label of an edge to a child node. <strong>If the child-node is not a child yet, it becomes a child.</strong>
             * @param child - Child node which edge should be labeled. If the node is not a child, it becomes a child.
             * @param label - Label of the edge to the child node
             */
            setEdgeLabel(child: TreeNode, label: string): void;

            /**
             * Method to set a tree node to be groupable. This will collapse all grouped nodes to one node. Attention: Only nodes that are leafs can be grouped together, otherwise the design will break!
             * @param groupable - Value of groupable
             */
            setGroupable(groupable: boolean): void;

        }

        /**
         * Style specification for a {@link TreeNode}. This class can be usedlike a style template. By applying the same NodeStyle on various nodes makesthe nodes look the same.
         */
        class NodeStyle {
            /**
             * 
             * @param color - Color code for the fill color of the node
             * @param borderColor -Color code for the border of the node
             * @param font - Name of the font
             * @param fontColor - Color code for the
             * @param fontSize - Font size of the node text
             * @param borderRoundness - Sharpness of the node corner
             * @param vMargin - Vertical margin of the node
             * @param hMargin - Horizontal margin of the node
             */
            constructor(color: string, borderColor: string, font: string, fontColor: string, fontSize: string, borderRoundness: number, vMargin: number, hMargin: number);

            /**
             * Set a NodeStyle property. * **color** (string) Color code for the fill color of the node * **borderColor** (string) Color code for the border of the node * **font** (string) Name of the font * **fontColor** (string) Color code for the * **fontSize** (string) Font size of the node text * **fontStyle** (string) Specifies the font style for the node text. Possible values: normal, italic, oblique, initial, inherit * **borderRoundness** (number) Sharpness of the node corner * **vMargin** (number) Vertical margin of the node * **hMargin** (number) Horizontal margin of the node
             * @param propertyName - property name
             * @param propertyValue - property value
             */
            setProperty(propertyName: string, propertyValue: string | number): void;

            /**
             * Applies the style specification on a node.
             * @param node - The node the style should applied on
             * @returns The node with the applied style
             */
            applyOn(node: otris.treechart.TreeNode): otris.treechart.TreeNode;

        }

    }

}

declare interface FileMessage {
    /**
     * message id
     */
    id: string;
    /**
     * creation timestamp (seconds since 1.01.1970 00:00:00 UTC)
     */
    timestamp: number;
    /**
     * user login of the message author (eg: `schreiber`)
     */
    author: string;
    /**
     * displayed value for the author (eg: `Willi Schreiber`)
     */
    authorLabel: string;
    /**
     * message body
     */
    body: string;
    /**
     * array of user logins who are *mentioned* (eg: `@oppen`) in the message
     */
    recipients?: string[];
    /**
     * timestamp author was removed (seconds since 1.01.1970 00:00:00 UTC)
     */
    authorRemoved?: number;
    /**
     * edit timestamp (seconds since 1.01.1970 00:00:00 UTC)
     */
    edited?: number;
    /**
     * deletion timestamp (seconds since 1.01.1970 00:00:00 UTC)
     */
    deleted?: number;
}

/**
 * The **FileMessageManager** provides an API to access and edit the file messages (*comments*). For all methods concerning the messages it is necessary to initialize the manager with the {@link module:FileMessageManager#init init()} method. **Notice:** It is always necessary to use the {@link module:FileMessageManager#commit commit()} method to persist any modifications.
 */
declare module 'FileMessageManager' {
    /**
     * Set a default user for the following methods: {@link module:FileMessageManager#addMessage addMessage()}, {@link module:FileMessageManager#subscribeUser subscribeUser()}, {@link module:FileMessageManager#unsubscribeUser unsubscribeUser()} and {@link module:FileMessageManager#getSubscriptions getSubscriptions()} If these methods were called without a `user` parameter the default user is used.
     * @param user
     * @returns
     */
    function setDefaultUser(user: SystemUser): any;

    /**
     * This function must be called to initialize the FileMessageManager.
     * @param fileId if not given `context.file` is used.
     * @throws Will throw an error if initializing fails
     * @returns
     */
    function init(fileId?: string): any;

    /**
     * Unsubscribe a user from the file messages of the current file.
     * @param user user (use default user if none given)
     * @returns
     */
    function unsubscribeUser(user?: string | SystemUser): any;

    /**
     * Subscribe a user from to the file messages of the current file.
     * @param user user (use default user if none given)
     * @returns
     */
    function subscribeUser(user?: string | SystemUser): any;

    /**
     * Get all files where the user has subscribed to the comments. **Note:** In order to get the current user subscriptions the {@link module:FileMessageManager#resyncUserSubscriptionLists resyncUserSubscriptionLists()} method must be called at least once for an existing system.
     * @param user user (use default user if none given)
     * @param asIdList set to `true` to get a list of ids
     * @returns FileResultset or a list of ids if `asIdList = true`
     */
    function getSubscriptions(user?: string | SystemUser, asIdList?: boolean): FileResultset | string[];

    /**
     * Sync the *user subscriptions lists* with the subscription information stored in the files. **Notice:** The execution can be very resource-intensive.
     * @returns
     * @see
     */
    function resyncUserSubscriptionLists(): boolean;

    /**
     * Get messages.
     * @param author optional filter by message author
     * @returns list of file Messages
     */
    function getMessages(author?: string | SystemUser): FileMessage[];

    /**
     * Mark a message as deleted. {@link module:FileMessageManager#commit commit()} needed to persist this modification.
     * @param messageId id of a file message
     * @throws Throws an error if messageId is not valid
     * @returns
     */
    function deleteMessage(messageId?: string): any;

    /**
     * Remove the author of a message. {@link module:FileMessageManager#commit commit()} needed to persist this modification.
     * @param messageId id of a file message
     * @throws Throws an error if messageId is not valid
     * @returns
     */
    function removeAuthor(messageId?: string): any;

    /**
     * Remove a message. {@link module:FileMessageManager#commit commit()} needed to persist this modification.
     * @param messageId id of a file message
     * @throws Throws an error if messageId is not valid
     * @returns
     */
    function removeMessage(messageId: string): any;

    /**
     * Get a file message by id.
     * @param messageId id of a file message
     * @throws Throws an error if messageId is not type of string
     * @returns file message or undefined if message does not exist
     */
    function getMessage(messageId: string): FileMessage;

    /**
     * Update the body (message text) of a message. {@link module:FileMessageManager#commit commit()} needed to persist this modification.
     * @param messageId id of a file message
     * @param newBody id of a file message
     * @throws Throws an error if messageId is invalid or newBody is not type of string
     * @returns
     */
    function updateMessageBody(messageId: string, newBody: string): FileMessage;

    /**
     * Add a new message. Please note that added messages must be persisted/published with {@link module:FileMessageManager#commit commit()}.
     * @param body message body
     * @param author author of the message (fallback to default user if not given)
     * @param recipients recipients as user logins (The recipients receive a notification of the new message).
     * @see
     */
    function addMessage(body: string, author?: string | SystemUser, recipients?: string[]): void;

    /**
     * Save changes and publish messages.
     * @throws Throws an error if the "CommentField hash" changed after intializing the FileMessageManager or if an error occurs on save
     */
    function commit(): void;

}

/**
 * Before transfer list callback.
 * @param list - the hitresult list
 */
declare type hrlBeforeTransferCB = (list: otris.scriptlist.HitresultList)=>void;

/**
 * Callback to manipulate the search filter used for the Hitresultset.
 * @param list - the hitresult list
 * @param searchFilter - current search filter
 * @param searchExpression - search expression (search field user input)
 * @returns new search filter
 */
declare type hrlSearchFilterCB = (list: otris.scriptlist.HitresultList, searchFilter: string, searchExpression: string)=>string;

declare interface hrlBeforeCreateHrsCB_params {
    searchResources: any;
    filter: string;
    sortOrder: string;
    hitlist: any;
    pageSize: number;
    unlimitedHits: boolean;
    fullColumnLength: boolean;
    withBlobInfo: boolean;
}

/**
 * Callback to manipulate the parameter for the HitResultset constructor.
 * @param list - the hitresult list
 * @param params - parameter of the HitResultset constructor. (See [HitResultset constructor](../portalscript/HitResultset.html) for details)
 * @param params.searchResources
 * @param params.filter
 * @param params.sortOrder
 * @param params.hitlist
 * @param params.pageSize
 * @param params.unlimitedHits
 * @param params.fullColumnLength
 * @param params.withBlobInfo
 */
declare type hrlBeforeCreateHrsCB = (list: otris.scriptlist.HitresultList, params: hrlBeforeCreateHrsCB_params)=>void;

/**
 * Column object whose data be we set on a scriptlist column.
 */
declare interface Column {
    /**
     * Technical key of the column.
     */
    key: boolean;
    /**
     * Label of the column.
     */
    label: boolean;
    /**
     * Data type of the column.
     */
    columnDataType: otris.scriptlist.ColumnDataType;
}

/**
 * Callback to be executed before a column is added to the list. If beforeAddColumn returns false, the column will be rejected and not shown.
 * @param list - the hitresult list
 * @param docHit - DocHit from which the columns were created.
 * @param myHRS - Origin HitResultset from which the columns were created.
 * @param column - Column to be added to the list.
 * @returns - False if column should be rejected.
 */
declare type hrlBeforeAddColumnCB = (list: otris.scriptlist.HitresultList, docHit: DocHit, myHRS: HitResultset, column: Column)=>Boolean;

/**
 * Callback to be executed after a column has been added to the list.
 * @param list - the hitresult list
 * @param docHit - DocHit from which the columns were created.
 * @param myHRS - Origin HitResultset from which the columns were created.
 * @param listColumn - Column that was added to the list.
 */
declare type hrlAfterAddColumnCB = (list: otris.scriptlist.HitresultList, docHit: DocHit, myHRS: HitResultset, listColumn: otris.scriptlist.Column)=>void;

/**
 * Callback to be executed after all columns have been added to the list.
 * @param list - the hitresult list
 * @param docHit - DocHit from which the columns were created.
 * @param myHRS - Origin HitResultset from which the columns were created.
 */
declare type hrlAfterAddColumnsCB = (list: otris.scriptlist.HitresultList, docHit: DocHit, myHRS: HitResultset)=>void;

declare interface hrlBeforeAddRowCB_opts {
    /**
     * fileId
     */
    id: string;
    /**
     * {key1: value1, key2: value2, ...}
     */
    values: object;
    /**
     * DocHit
     */
    docHit: DocHit;
    /**
     * HitResultset
     */
    hitResultset: HitResultset;
    /**
     * [Column, ...]
     */
    columns: any[];
    /**
     * [key1, key2, ...]
     */
    columnKeys: any[];
    /**
     * the hitresult list
     */
    list: otris.scriptlist.HitresultList;
}

/**
 * Callback to be executed before adding the row to the list. This can be used to change the data before it is added to the row. If beforeAddRow returns false, the row will be rejected and not shown.
 * @param opts
 * @param opts.id - fileId
 * @param opts.values - {key1: value1, key2: value2, ...}
 * @param opts.docHit - DocHit
 * @param opts.hitResultset - HitResultset
 * @param opts.columns - [Column, ...]
 * @param opts.columnKeys - [key1, key2, ...]
 * @param opts.list - the hitresult list
 */
declare type hrlBeforeAddRowCB = (opts: hrlBeforeAddRowCB_opts)=>void;

declare interface hrlAfterAddRowCB_opts {
    /**
     * fileId
     */
    id: string;
    /**
     * {key1: value1, key2: value2, ...}
     */
    values: object;
    /**
     * DocHit
     */
    docHit: DocHit;
    /**
     * HitResultset
     */
    hitResultset: HitResultset;
    /**
     * [Column, ...]
     */
    columns: any[];
    /**
     * [key1, key2, ...]
     */
    columnKeys: any[];
    /**
     * the hitresult list
     */
    list: otris.scriptlist.HitresultList;
    /**
     * row that was added to the list
     */
    row: otris.scriptlist.Row;
}

/**
 * Callback to be executed after adding the row to the list. This can be used to change the ScriptList Row.
 * @param opts
 * @param opts.id - fileId
 * @param opts.values - {key1: value1, key2: value2, ...}
 * @param opts.docHit - DocHit
 * @param opts.hitResultset - HitResultset
 * @param opts.columns - [Column, ...]
 * @param opts.columnKeys - [key1, key2, ...]
 * @param opts.list - the hitresult list
 * @param opts.row - row that was added to the list
 */
declare type hrlAfterAddRowCB = (opts: hrlAfterAddRowCB_opts)=>void;

declare interface hrlOnRowClickCB_opts {
    /**
     * the current grid row index
     */
    rowIndex: number;
    /**
     * the current grid cell index
     */
    cellIndex: number;
    /**
     * the current grid row model
     */
    row: Row;
    /**
     * the current grid column model
     */
    column: Column;
    /**
     * the current original dom event
     */
    originalEvent: Event;
}

/**
 * Callback to be executed when clicking on a row.
 * @param dc - a newly created DocumentsContext
 * @param opts - options passed when a row was clicked
 * @param opts.rowIndex - the current grid row index
 * @param opts.cellIndex - the current grid cell index
 * @param opts.row - the current grid row model
 * @param opts.column - the current grid column model
 * @param opts.originalEvent - the current original dom event
 */
declare type hrlOnRowClickCB = (dc: DocumentsContext, opts: hrlOnRowClickCB_opts)=>void;

declare interface HitresultListConstructor_config {
    /**
     * The title of the list that will be displayed in the lists toolbar
     */
    title: string;
    /**
     * The list of resources to search through. The resource identifiers may be passed either as an array of strings or as an ordinary string with one identifier per line of text. Please read the Portalscrit APIs remarks section for Hitresult about restrictions.
     */
    searchResources: string | any[];
    /**
     * A filter expression. Further information can be found in the Portalscript APIs section about [Filter Expressions](../portalscript/tutorial-filter.html).
     */
    filter?: string;
    /**
     * A boolean that indicates, if the general hit limitations on filetypes and archives must be ignored. A wasteful use of this option may cause issues with the system performance or situations with low free memory.
     */
    unlimitedHits?: boolean;
    /**
     * This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once. If the parameter is a positive value, Documents will initially load only the requested number of hits as a first page. When displaying the list, only as much pages as needed will be loaded into the viewport of the scriptlist. If the parameter is omitted the current user's "hits per page" preference is used. If the parameter is set to 0 all pages will be loaded initially.
     */
    pageSize?: Number;
    /**
     * A sort expression e.g. myField1+,myField2-, ...<br>
     * If the list is being sorted (sortState is not empty), this parameter should be undefined or else it will overwrite the sorting being done by a user.
     */
    sortOrder?: string;
    /**
     * A boolean that indicates, if the general hit column length limitations must be ignored. The default column length is 50 characters (if not a different value is defined by the property Documents-Settings: MaxHitfieldLength). If a field value exceeds this size, the first 50 characters will be displayed followed by '...'. If the parameter fullColumnLength is set to true, no truncation will be done.
     */
    fullColumnLength?: boolean;
    /**
     * A boolean that indicates, if the HitResultset should contain blob-information.
     */
    withBlobInfo?: boolean;
    /**
     * The technical name of a hitlist or an array of field names, which specifies the available columns in the resultset. If the parameter is left empty, Documents tries to choose a hitlist automatically. Details follow in the remarks section.
     * **Note:** If this parameter is an array of field names, a search in EE.i or EE.x is not allowed and the field names must not contain commas (,).
     */
    hitlist?: string | any[];
    /**
     * Folder object to be used for hitresult list.
     */
    folder?: Folder;
    /**
     * register object to be used for hitresult list.
     */
    register?: Register;
    /**
     * Allow sorting of multiple columns. Default is false.
     */
    multiSort?: boolean;
    /**
     * Append total rows size to list title.
     */
    appendTotalSize?: boolean;
    /**
     * A boolean to disable automatically opening a file when clicking a row.
     */
    openFileOnClick?: boolean;
    /**
     * Will show/hide the refresh button. Default is true.
     */
    showRefreshButton?: boolean;
    /**
     * Tag archive hits. Default is true.
     */
    tagArchiveHits?: boolean;
    /**
     * Add default documents actions. Currently only supports 'show external' (since DOCUMENTS 5.0i) and
     * 'xlsx-export' (since DOCUMENTS 5.0i hf5) if showExport=true.
     */
    addDefaultActions?: boolean | object;
    /**
     * Add 'show external' to contextmenu action. (default: true)
     */
    "addDefaultActions.showExternal"?: boolean;
    /**
     * Add xlsx-export actions. (default: false) (since DOCUMENTS 5.0i HF5)
     */
    "addDefaultActions.showExport"?: boolean;
    /**
     * Show toolbar (since DOCUMENTS 5.0i)
     */
    showToolbar?: boolean;
    /**
     * Use putAside and reintegrate to buffer HitResultset. (since DOCUMENTS 6.0.1)
     */
    useReintegrate?: boolean;
    /**
     * Callback to manipulate the parameter for the HitResultset constructor (since: `Documents 5.0h`).
     */
    beforeCreateHitResultset?: hrlBeforeCreateHrsCB;
    /**
     * Callback to be executed before the list is transferred to the client (since: `Documents 5.0h`).
     */
    beforeTransfer?: hrlBeforeTransferCB;
    /**
     * Callback to manipulate the search filter used for the Hitresultset (since: `Documents 5.0h`).
     */
    searchFilterCallback?: hrlSearchFilterCB;
    /**
     * Callback to be executed before adding a column to the list. This can be used to either reject a column by returning 'false' and/or change the data before it is set to the column.
     */
    beforeAddColumn?: hrlBeforeAddColumnCB;
    /**
     * Callback to be executed after adding a column to the list. This can be used to alter the scriptlist column.
     */
    afterAddColumn?: hrlAfterAddColumnCB;
    /**
     * Callback to be executed after all columns have been added to the list.
     */
    afterAddColumns?: hrlAfterAddColumnsCB;
    /**
     * Callback to be executed before adding the row to the list. This can be used to change the data before it is set to the row.
     * If beforeAddRow returns false, the row will be rejected and not shown.
     */
    beforeAddRow?: hrlBeforeAddRowCB;
    /**
     * Callback to be executed after adding the row to the list. This can be used to change the ScriptList Row.
     */
    afterAddRow?: hrlAfterAddRowCB;
    /**
     * Callback to be executed when clicking on a row.
     */
    onRowClick?: hrlOnRowClickCB;
}

/**
 * The Portalscript SystemUser
 */
declare interface SystemUser {
}

/**
 * The Portalscript AccessProfile
 */
declare interface AccessProfile {
}

declare interface setStyle_options {
    /**
     * icon definition (e.g. `mdi:mdi-fruit-pineapple;color:green`)*
     */
    icon?: string;
    /**
     * icon background color
     */
    iconBackground?: string;
    /**
     * background color
     */
    background?: string;
    /**
     * text color for title & message (e.g.: `#eeeeee`)
     */
    color?: string;
    /**
     * sets the given class to the notification container (usage: use custom predefined stylings. e.g. added with client header code mechanism)
     */
    className?: string;
    /**
     * lightness adjustment of background colors when hovering the notification
     */
    lightness?: number;
}

declare interface publish_options {
    /**
     * parameter used for AccessProfile#getSystemUsers()
     */
    includeSubProfiles?: boolean;
    /**
     * parameter used for AccessProfile#getSystemUsers()
     */
    includeLockedUsers?: boolean;
    /**
     * parameter used for AccessProfile#getSystemUsers()
     */
    includeInvisibleUsers?: boolean;
}

declare interface otrListRowClickCB_options {
    /**
     * the current grid row index
     */
    rowIndex: number;
    /**
     * the current grid cell index
     */
    cellIndex: number;
    /**
     * the current grid row model
     */
    row: object;
    /**
     * the current grid column model
     */
    column: object;
    /**
     * the current original dom event
     */
    originalEvent: object;
    /**
     * context data, see [setContextData]{@link otris.scriptlist.List#setContextData}
     */
    contextData: object;
}

/**
 * 
 * @param documentsContext - A newly created DocumentsContext
 * @param options
 * @param options.rowIndex - the current grid row index
 * @param options.cellIndex - the current grid cell index
 * @param options.row - the current grid row model
 * @param options.column - the current grid column model
 * @param options.originalEvent - the current original dom event
 * @param options.contextData - context data, see [setContextData]{@link otris.scriptlist.List#setContextData}
 */
declare type otrListRowClickCB = (documentsContext: object, options: otrListRowClickCB_options)=>void;

declare interface otrOnSelectionChangedCB_options {
    /**
     * Rows that were added to the current selection.
     */
    addedRows: object;
    /**
     * Currently selected rows.
     */
    selectedRows: object;
    /**
     * true if rows were deselected.
     */
    deselecting: boolean;
    /**
     * context data, see [setContextData]{@link otris.scriptlist.List#setContextData}
     */
    contextData: object;
}

/**
 * Callback after rows have been selected/deselected
 * @param documentsContext - A newly created DocumentsContext
 * @param options
 * @param options.addedRows Rows that were added to the current selection.
 * @param options.selectedRows Currently selected rows.
 * @param options.deselecting true if rows were deselected.
 * @param options.contextData - context data, see [setContextData]{@link otris.scriptlist.List#setContextData}
 */
declare type otrOnSelectionChangedCB = (documentsContext: object, options: otrOnSelectionChangedCB_options)=>void;

/**
 * Format row cell callback.
 * @param row - rowIndex
 * @param cell - cellIndex
 * @param value - value of the cell
 * @param columnDef - column definition
 * @param data - data of the rendering row
 */
declare type otrListCellFormatterCB = (row: number, cell: number, value: string, columnDef: object, data: object)=>void;

/**
 * Export row column callback.
 * @param value - Value for this cell.
 * @param row - Row whose value should be exported.
 * @param col - Column definition whose value should be exported.
 */
declare type otrisListColumnExporterCB = (value: any, row: otris.scriptlist.Row, col: otris.scriptlist.Column)=>void;

declare interface ScriptListParameters {
    /**
     * Index from where to fetch the next row
     */
    start: number;
    /**
     * Number of rows to fetch
     */
    limit: number;
    /**
     * search expression entered by the user to be used on this list
     */
    searchExpression: string;
    /**
     * short notation of current sort action
     */
    sort: string;
    /**
     * sort states with index for all columns
     */
    sortState: string;
    /**
     * id of clicked column
     */
    sortExpression: string;
    /**
     * new sort direction for the clicked column
     */
    sortOrder: string;
    /**
     * Depending on how a column is clicked, certain sort actions are invoked for it:<br>
     * <strong style="margin-left:10px">sortAdd</strong> Sorting is added to column on left click.
     * <strong style="margin-left:10px">sortReset</strong> Sorting is reset to ascending on right click and removed from all non-clicked columns.
     * <strong style="margin-left:10px">sortRemove</strong> Sorting is removed from column on double click.
     */
    sortMode: string;
    /**
     * ID of the currently active row (since DOCUMENTS 5.0f)
     */
    activeId: string;
    /**
     * checkbox for selecting all entries is checked | since DOCUMENTS 5.0g
     */
    allCheckboxSelected: string[];
    /**
     * selected ids (since DOCUMENTS 5.0f)
     */
    selectedIds: string[];
    /**
     * selected group ids (since DOCUMENTS 5.0g)
     */
    selectedGroupIds: string[];
}

declare interface RowUpdateConstructor_updateData {
    /**
     * id of the row
     */
    id: string;
    /**
     * updated row data (plain key/value object)
     */
    data: object;
}

declare interface addAction_listAction {
    /**
     * Unique name of the action
     */
    name: string;
    /**
     * Label to display for this action
     */
    label: string;
    /**
     * Type of the action ("button", "list" or "contextmenu") default: "button"
     */
    type?: string;
    /**
     * Action to be executed, e.g.<br><br>
     * * <strong>runScript:&lt;script-name&gt;[&amp;&lt;param1&gt;=&lt;value1&gt;&amp;&lt;param2&gt;...]</strong> - execute a portal script and pass parameters
     * * <strong>showFile:&lt;fileId&gt;</strong> - show a file
     * * <strong>showFolder:&lt;folderId&gt;</strong> - show a folder
     * * <strong>showHomeView</strong> - show the home
     * * <strong>executePrivateSearch&privateSearchMaskName=&lt;name&gt;</strong> - execute a private search
     * * <strong>refreshScriptlist[&amp;&lt;param1&gt;=&lt;value1&gt;&amp;&lt;param2&gt;...]</strong> - Refresh the current scriptlist with passed parameters.
     * * <strong>xlsxExportSelected</strong> - export selected entries as xlsx
     * * <strong>xlsxExportAll</strong> - export all entries as xlsx
     */
    action?: string;
    /**
     * Id of the action groups' configuration that should be used for this action.
     */
    actionGroup?: string;
    /**
     * The action is displayed with the referenced icon (`entypo:` or `ionicons:` syntax is supported). **Only for type `button`**
     */
    imageFile?: string;
    /**
     * Show the label even if an imageFile is defined
     */
    alwaysShowLabel?: boolean;
    /**
     * Use this to disable automatically resetting the grids selected rows after the action was executed. [*since DOCUMENTS 5.0i HF5]
     */
    autoResetSelection?: boolean;
    /**
     * Action is enabled. If the value is "onRowSelect", this action will only be enabled if rows are selected. [*since DOCUMENTS 5.0i*]
     */
    enabled?: boolean | string;
    /**
     * Optional tooltip
     */
    tooltip?: string;
    /**
     * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a client function that is called with an array of ids if showCheckboxes is enabled
     */
    clientAction?: string;
    /**
     * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a gadget action belonging to the same gadgetScript to be executed on click
     */
    gadgetAction?: string;
    /**
     * default false, if true a script parameter dialog will always be displayed if the script has defined parameter (*since DOCUMENTS 5.0f*)
     */
    useScriptParameterDialog?: boolean;
    /**
     * the title of the script parameter dialog (*since DOCUMENTS 5.0f*)
     */
    dialogTitle?: string;
    /**
     * Function to be exucuted in the client. (*since DOCUMENTS 5.0f*)
     * ```
     * // The parameters documentsContext and options will be passed.
     * function(documentsContext, options) {
     * 
     *     documentsContext: A newly created DocumentsContext
     * 
     *     options: {
     *         dobyGrid: doby-grid object for scriptlist
     *         listActionName: name of the action being executed
     *         selectedGroupsIds: list of the selected group ids
     *         selectedIds: list of selected ids
     *     }
     * 
     * }
     * ```
     */
    clientScript?: Function;
}

declare interface addColumn_key {
    /**
     * the technical name of the column
     */
    key: string;
    /**
     * Header label of the column
     */
    label: string;
    /**
     * Data type of the data in this column (STRING, NUMBER, ICON, CUSTOM, CHECKBOX, DATE or TIMESTAMP)
     */
    dataType?: otris.scriptlist.ColumnDataType;
    /**
     * Formatter to be used for this columns' cells (since DOCUMENTS 5.0i)
     */
    formatter?: string | Function;
    /**
     * Index at which position the column should be inserted
     */
    index?: string;
    /**
     * Sort order of the column
     */
    sortOrder?: string;
    /**
     * Column is visible
     */
    visible?: boolean;
    /**
     * Width of the column
     */
    width?: number;
    /**
     * CSS classs for the cells of this column (since DOCUMENTS 6.0.1)
     */
    cellClass?: string;
}

declare interface GroupConfig {
    /**
     * id of this group.
     */
    id: string;
    /**
     * label for the group row.
     * If a row has the same value for this column it will be sorted into this group.
     */
    label: string;
    /**
     * text that will be displayed if there are no rows for this group.
     */
    emptyText: string;
}

/**
 * Collapsed object configuration for grouping
 */
declare interface CollapsedConfig {
    /**
     * collapse entries for this grouping
     */
    default: boolean;
    /**
     * list of group values that will be opposite from the default collapsed state
     */
    exclude: string[];
}

/**
 * Grouping object configuration
 */
declare interface GroupingConfig {
    /**
     * Callback to sort values of this group.
     */
    comparator: groupComparatorCB;
    /**
     * id of the column that should be grouped
     */
    column_id: string;
    /**
     * collapse group on inital display
     */
    collapsed: boolean | CollapsedConfig;
    /**
     * groups that will be always displayed, even if there are no rows matching this group
     */
    default_groups: any[];
}

declare interface setNavibarEntry_options {
    /**
     * label for the navibar entry (defaults to the scriptlist title)
     */
    label?: string;
    /**
     * label for the navibar entry (defaults to the value of `context.scriptName`)
     */
    scriptName?: string;
    /**
     * key/value object for optional script parameter
     */
    scriptParams?: object;
}

declare interface RecordViewConfig {
    /**
     * fileId to be openend when clicking the Record-View.
     */
    fileId: string;
    /**
     * Configuration for the Record-View-Icon displayed in the Toolbar-Header.
     */
    iconConfig: object;
    /**
     * CSS-Classes to be used for the Record-View-Icon.
     */
    classes: string;
    /**
     * Styles to be applied to the Record-View-Icon.
     */
    styles: string;
}

declare interface setSearchContext_searchContext {
    /**
     * The search context name (Defaults to the list title)
     */
    name?: string;
    /**
     * Enable/disable remote search. Default is `true`.
     */
    remoteSearch?: boolean;
    /**
     * Automatic search after keyboard input (*since DOCUMENTS 5.0e*)
     */
    liveSearch?: boolean;
}

declare interface setShowCheckboxes_options {
    /**
     * Vertically center displayed checkboxes. (since DOCUMENTS 6.0)
     * This is usefull if the row height is changed.
     */
    verticalCenterCheckboxes?: boolean;
}

declare interface setShowDetailsColumn_options {
    /**
     * Vertically center the displayed entry details toggle. (since DOCUMENTS 6.0)
     * This is usefull if the row height is changed.
     */
    verticalCenterDetailsToggle?: boolean;
}

declare interface setShowSearchBox_showSearchBox {
    /**
     * Show the search box
     */
    showSearchBox: boolean;
    /**
     * Use remote search for searching. Default is false.
     */
    remoteSearch: boolean;
}

declare interface setSort_sort {
    /**
     * Allow sorting columns.
     */
    sortable?: boolean;
    /**
     * Allow sorting multiple columns. Default is false.
     */
    multiSort?: boolean;
    /**
     * Sort the list remotely by executing the origin script again with sort params.
     */
    remoteSort?: boolean;
}

declare interface transfer_options {
    /**
     * By default the result is stringified as JSON for setting it as a portal script return value.
     * This can be used to <strong>not stringify</strong> the result immediately after creating a HitresultList
     * so the list's data can be modified, after the list's hits have been loaded.
     * Now the result must be stringified manually and set as return value.
     */
    stringify?: boolean;
}

declare interface addSubrow_config {
    /**
     * Array of icons to be used for the subrow. Currently only the first icon is displayed.
     */
    icons: string[];
    /**
     * full document name to be displayed if referenced subrow is a file document. This is only needed if thumbnails are created automatically based on these paremeters.
     */
    documentName: string;
    /**
     * Extension of the document to be used as automatically generate file type icon. This is only needed if thumbnails are created automatically based on these paremeters.
     */
    extension: string;
    /**
     * Size to be displayed on hover thumbnail icon, with unit (e.g. byte). This is only needed if thumbnails are created automatically based on these paremeters.
     */
    size: string;
    /**
     * Javascript Code to be executed if the subrow was clicked.
     */
    onclick: string;
    /**
     * 0 :name to be displayed
     * 								   1 :size filesize to be displayed if list is displayed as blobthumbnails
     */
    values: string[];
}

declare interface ColumnConstructor_key {
    /**
     * Callback to sort values of this column.
     */
    comparator: comparatorCB;
    /**
     * Formatter to be used for this columns' cells (since DOCUMENTS 5.0i)
     */
    formatter: Function | string;
    /**
     * Key which will be used for a HitresultList when sorting this column (since DOCUMENTS 5.0i)
     */
    sortKey: string;
    /**
     * Sort order of the column
     */
    sortOrder: string;
    /**
     * Column is visible (since DOCUMENTS 5.0i)
     */
    visible: boolean;
    /**
     * Width of the column
     */
    width: string;
}

/**
 * Callback to sort values of this column. If remoteSort is enabled, rowA and rowB will be a otris.scriptlist.Row else they will be a documents.sdk.grid.GridRowModel.
 * @param valA - value A that should be compared
 * @param valB - value B that should be compared
 * @param rowA - row A that should be compared
 * @param rowB - row B that should be compared
 * @returns - -1 sort rowA first, 1 sort rowB first, 0 rowA and rowB are sorted equally
 */
declare type comparatorCB = (valA: any, valB: any, rowA: otris.scriptlist.Row | documents.sdk.grid.GridRowModel, rowB: otris.scriptlist.Row | documents.sdk.grid.GridRowModel)=>number;

declare interface MoveRowResultConstructor_result {
    /**
     * Move row was successfull.
     */
    success: boolean;
    /**
     * Detailed message why moving the row failed/succeded.
     */
    message?: string;
}

declare interface ScriptListStyleConstructor_configuration {
    /**
     * css color definiton (sets value for: `rowBackground`, `rowOddBackground`, `listBorderColor` and `scrollbarBackground`)
     */
    defaultBackground?: string;
    /**
     * css margin definiton
     */
    mainMargin?: string;
    /**
     * css color definiton
     */
    mainBackground?: string;
    /**
     * css color definiton
     */
    mainBorderColorTop?: string;
    /**
     * css color definiton
     */
    headerBackground?: string;
    /**
     * css color definiton
     */
    color?: string;
    /**
     * css color definiton
     */
    oddColor?: string;
    /**
     * css color definiton
     */
    headerColumnBackground?: string;
    /**
     * css color definiton
     */
    groupColumnBackground?: string;
    /**
     * css color definiton
     */
    groupColumnColor?: string;
    /**
     * css color definiton
     */
    groupColumnBorderColor?: string;
    /**
     * css color definiton
     */
    rowBackground?: string;
    /**
     * css color definiton
     */
    rowOddBackground?: string;
    /**
     * css color definiton
     */
    rowActiveBackground?: string;
    /**
     * css color definiton
     */
    rowHoverBackground?: string;
    /**
     * css display definiton
     */
    rowCheckboxWrapperDisplay?: string;
    /**
     * css align-items definiton
     */
    rowCheckboxWrapperAlignItems?: string;
    /**
     * css color definiton
     */
    listBorderColor?: string;
    /**
     * css color definiton
     */
    scrollbarBackground?: string;
    /**
     * css color definiton
     */
    scrollbarColor?: string;
}

declare interface GadgetSetting {
    /**
     * The techincal name of the setting
     */
    name: string;
    /**
     * The default value to be used if no value is specified. If a number is specified the default value will be the value from the enum array with the given index.
     */
    def: string | number;
    /**
     * The type of the setting. (`string` | `boolean` | `number`)
     */
    type: string;
    /**
     * An Array of values i.e. ["A", "B"] that the user can choose from. Or an Array of key value pairs i.e. [[0, "A"], [1, "B"]]. The values must be of the type defined in <i>type</i>.
     */
    enum: string[] | (string[])[];
    /**
     * The description of this setting
     */
    desc?: string;
}

/**
 * Callback to sort values of a group.
 * @param groupA - doby-grid group A that should be compared
 * @param groupB - doby-grid group B that should be compared
 * @returns - -1 sort groupA first, 1 sort groupB first, 0 groupA and groupB are sorted equally
 */
declare type groupComparatorCB = (groupA: object, groupB: object)=>number;

declare class ActionGroup {
    constructor();

}

declare interface CountOptions {
    /**
     * If the file for the register with this scriptlist is shown, this will be true.
     */
    firstOpen: boolean;
    /**
     * If the file for the register with this scriptlist is closed, this will be true.
     */
    clear: boolean;
    /**
     * Id of the file for which the count script was called. Will be used for the default cache key.
     */
    fileId: string;
    /**
     * Id of the register for which the count script was called. Will be used for the default cache key.
     */
    registerId: string;
}

declare interface clearCount_opts {
    /**
     * Use this cache key to clear a cached script list count.
     * If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
     */
    cacheKey?: string;
}

declare interface getCount_opts {
    /**
     * Use this cache key when getting the count for this scriptlist.
     * If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
     */
    cacheKey?: string;
    /**
     * Callback to count the rows of a scriptlist.
     */
    countCallback: Function;
}

declare interface hasCount_opts {
    /**
     * Use this cache key when check whether the count for this scriptlist was cached.
     * If no cache key is provided, the default cache key <strong>&lt;file-id&gt;:&lt;register-id&gt;-count</strong> will be used.
     */
    cacheKey?: string;
}

declare interface getSortExpression_sortConfig {
    /**
     * Allow sorting of multiple columns.
     */
    multiSort: boolean;
    /**
     * Custom sorting by comma separated string to be returned in object format eg. name+,age-
     */
    sortOrder: boolean;
}

declare interface getSortOrder_sortConfig {
    /**
     * Allow sorting of multiple columns.
     */
    multiSort: boolean;
    /**
     * Custom sorting by comma separated string to be returned in object format eg. name+,age-
     */
    sortOrder: boolean;
}

/**
 * The `chromaColorTool` provides the functionality of the library **chroma.js**. **Please note this functionality can only be used with the require mechanism. See example for details.** For a detailed description of the chroma.js libary see the [chroma.js API Documentation](https://vis4.net/chromajs/). The following **named colors** are available in addition to the already defined in chroma.js. * `signalcolor`: The defined _skin signal color_ of the current user with a fallback to the global defined _skin signal color_ * `signalcolor_global`: The global defined _skin signal color_ ## Library: `chroma.js` * **License:** BSD license, **Author:** Gregor Aisch, **Source:** [https://github.com/gka/chroma.js](https://github.com/gka/chroma.js) The example below generates the following output as a message if executed in the web client. <img src="assets/chroma-example.png" />
 * @param color a valid color definition (see [chroma.js API Documentation](https://vis4.net/chromajs/) for details)
 */
declare function chromaColorTool(color: any): void;

