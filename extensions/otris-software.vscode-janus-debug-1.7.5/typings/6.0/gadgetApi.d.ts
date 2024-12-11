declare namespace otris {
    namespace gadget {
        namespace gui {
            class Transferable {
                /**
                 * 
                 * @param viewId the viewId of the transferable object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Adds a JavaScript Function to this Transferable Object. When the Object is transfered to the client the functions added to this Object will be available on the client side. To achieve better code readability, it is also possible to swap the two parameters (The 1st parameter must be a string and the 2nd of the type function). eg: `addClientFunction("myFunctionName", function() { ... })`, since: `Documents 5.0i`
                 * @param clientFn The function to be added to the clientFunctions of this Object. (Can be a JavaScript Function or an Object returned by otris.gadget.util.FunctionUtils.getFunctionObject)
                 * @param functionName Set a specific function name. Useful if a source code minifier is used (since: `Documents 5.0i`)
                 */
                addClientFunction(clientFn: string | Function | otris.gadget.util.FunctionUtils.FunctionObject, functionName?: string | Function): void;

                /**
                 * Sets an onLoad handler for the Gadget. The handler is executed when the gadget is displayed at the client.
                 * @param onloadHandler - the handler to be executed (must be either a javascript function or a string representing a function)
                 * @see otris.gadget.gui.Transferable#addOnGadgetLoad
                 */
                onGadgetLoad(onloadHandler: Function | string): void;

                /**
                 * Adds an onLoad handler for the Gadget. The handler is executed when the gadget is displayed at the client.
                 * @param onLoadHandlerFunction - the handler to be executed (must be either a javascript function)
                 * @see otris.gadget.gui.Transferable#onGadgetLoad
                 */
                addOnGadgetLoad(onLoadHandlerFunction: Function): void;

                /**
                 * Sets the Title of the gadget
                 * @param title the title of the gadget (will be displayed as the window header on dashboards)
                 * @param titleIcon optional icon for the title if gadget displayed as dialog, in common icon syntax (since: `Documents 5.0f`)
                 */
                setTitle(title: string, titleIcon?: string): void;

                /**
                 * Add a navibar entry. Define a gadgetConfig that reloads the gadget. *Only works if the gadget ist displayed in main list view area.*
                 * @param gadgetConfig - gadgetConfig
                 * @param label - label for the navibar entry (defaults to the gadget title)
                 */
                setNavibarEntry(gadgetConfig: object, label?: string): void;

                /**
                 * Creates the Transfer object to send to the client
                 * @returns
                 */
                transfer(): string;

                /**
                 * Stores data that can later be accessed on client side. **ATTENTION: The store used in this method is global.** Use [`setContextData`]{@link otris.gadget.gui.Transferable#setContextData} to store data for this gadget instance.
                 * @param key the key to store the data
                 * @param value the value, or object that should be stored
                 * @see otris.gadget.gui.Transferable#setContextData
                 * @deprecated
                 */
                store(key: string, value: any): void;

                /**
                 * Set additional data which is serialized with [`JSON.stringify()`]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify} and then transferred to the client On the client side the the context data is accessible with the [`GadgetContext`]{@link documents.sdk.GadgetContext}
                 * @param contextData - the context data
                 */
                setContextData(contextData: any): void;

                /**
                 * Get the current context data object
                 * @returns contextData
                 */
                getContextData(): object;

                /**
                 * Add a client function which is executed when the gadget container resizes > **Attention:** The function is called at each resizing. Therefore, the performance > of the function should always be taken into account during implementation.
                 * @param resizeObserver - resize observer function
                 */
                setResizeObserver(resizeObserver: gadgetResizeObserver): void;

                /**
                 * Set dialog options for this gadget.
                 * @param options - jQuery UI dialog options to be set on dialog.
                 */
                setDialogOptions(options: DialogOptions): void;

                /**
                 * Sets a style attribute of the html container
                 * @param name the name of the style parameter (i.e. "height")
                 * @param value the value of the style parameter (i.e. "100px")
                 */
                setStyle(name: string, value: string): void;

                /**
                 * Adds a setting (an option that can be defined by the user) to the gadget.
                 * @param option the setting(s) to add to the gadget.
                 */
                addSettings(option: GadgetSetting | GadgetSetting[]): void;

                /**
                 * Adds a button to download the displayed gadget as pdf. The button will show on hover in the left top corner of the gadget.
                 * @param config config object
                 * @param config.fileName filename of the pdf for download
                 * @param config.buttonStyle style for the pdf button to be applied to
                 * @param config.openDocument open document after download, default is true (since 5.0e HFII)
                 * @param config.beforeSend callback to be executed before generating the pdf (since 5.0e HFII)
                 */
                addPdfButton(config?: addPdfButton_config): void;

                /**
                 * Adds a button to display the gadget content in fullscreen mode (https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
                 * @param value Enable/disable fullscreen button
                 */
                addFullscreenButton(value?: boolean): void;

                /**
                 * Adds a container button.
                 * @param buttonConfig button config object
                 * @returns buttonConfig
                 */
                addContainerButton(buttonConfig: ContainerButtonConfig): object;

                /**
                 * Returns an array of container button definitions
                 * @returns buttonConfig[]
                 */
                getContainerButtons(): object[];

                /**
                 * Returns a buttonConfig by id
                 * @param buttonId button id
                 * @returns buttonConfig
                 */
                getContainerButton(buttonId: string): object | undefined;

                /**
                 * Set the container buttons. Please note that existing default buttons are removed by this operation.
                 * @param containerButtonConfigs array of button config objects
                 * @param options container button configuration (since: `Documents 5.0f`)
                 * @param options.topStyle css styles added to the top button container
                 * @param options.bottomStyle css styles added to the bottom button container
                 * @param options.magicButton Collapse overlapping buttons in a magic button. (default: true, since DOCUMENTS 6.0)
                 * @param options.topStyleType set a predefined style type for the top button container (available types: `fileviewHeader`, see example for details)
                 * @param options.bottomStyleType set a predefined stye type for the bottom button container
                 * @see otris.gadget.gui.Transferable#addContainerButton
                 */
                setContainerButtons(containerButtonConfigs?: ContainerButtonConfig[], options?: setContainerButtons_options): void;

                /**
                 * Transfers the given less code to the client and append the resulting css code on the client side. The complete code is wrapped with the CSS id of the module instance. The styles are only available for the lifetime of the gadget module. **Attention:** For general style changes (CSS) or adaptations that should be applied globally, adaptation should take place via the Standard-LESS or ClientHeaderCode mechanism.
                 * @param lessCode less code
                 * @see otris.gadget.gui.Transferable#addGadgetStyles
                 */
                setGadgetStyles(lessCode: string): void;

                /**
                 * Append less code **Attention:** For general style changes (CSS) or adaptations that should be applied globally, adaptation should take place via the Standard-LESS or ClientHeaderCode mechanism.
                 * @param lessCode less code
                 * @see otris.gadget.gui.Transferable#setGadgetStyles
                 */
                addGadgetStyles(lessCode: string): void;

                /**
                 * Return the client library configuration.
                 */
                getClientLibConfiguration(): void;

                /**
                 * Return the `ApplicationInfo ` if gadget is called by a _native addin_. See DocumentsNativeConnector API for details.
                 */
                getApplicationInfo(): void;

            }

            /**
             * Objects of the class <otris.gadget.gui.BarChart> can be transferred to the client as the result of the call to a gadget.**ATTENTION:** Since Documents 5, this component was marked as deprecated.In Documents 6, the ExtJS library has been removed. Using this componentin Documents 6 will therefore directly lead to an error.
             */
            class BarChart extends Transferable {
                /**
                 * 
                 * @deprecated Use [otris.gadget.gui.Chart]{@link otris.gadget.gui.Chart} instead
                 */
                constructor();

                /**
                 * Sets the gadgetConfig Object for retrieving the data
                 * @param dataGadgetConfig the new config object
                 */
                setDataGadgetConfig(dataGadgetConfig: GadgetConfig): void;

                /**
                 * Sets the dataScript to use for this PieChart
                 * @param dataScript name of the dataScript
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataScript(dataScript: string): void;

                /**
                 * Sets the name of the gadgetAction to be called for retrieveing the Data for the PieChart
                 * @param dataAction name of the gadgetAction
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataAction(dataAction: string): void;

                /**
                 * Function: setDataParams
                 * @param dataParamsa JavaScript Object containing each parameter as a property.
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataParams(dataParamsa: object): void;

                /**
                 * Sets the Width of the PieChart. The PieChart *must* have a given width. Its width can not be determined dynamicly.
                 * @param width the new width in pixels
                 */
                setGadgetWidth(width: number): void;

                /**
                 * Sets the height of the PieChart. The PieChart *must* have a given height. Its height can not be determined dynamicly.
                 * @param height the new height in pixels
                 */
                setGadgetHeight(height: number): void;

                /**
                 * Sets the TooltipRenderer function for this pie chart
                 * @param fn the function which will be called to render the tooltip of the differend sections of this pie chart
                 */
                setTooltipRenderer(fn: Function): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a gadget element that displays charts with the **chart.js library** ([https://www.chartjs.org/](https://www.chartjs.org/))
             */
            class Chart extends Transferable {
                /**
                 * 
                 * @param type The chart type i.e. `line` or `bar` corresponding to the chart types in the chart.js library
                 * @param data The data for the chart. See [chart.js documentation](https://www.chartjs.org/).
                 * @param options The options for the chart. See [chart.js documentation](https://www.chartjs.org/).
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(type: string, data: object, options: object, viewId?: string);

                /**
                 * Set the type of the chart.
                 * @param type the new type of the chart
                 */
                setType(type: string): void;

                /**
                 * Set the data for the chart
                 * @param data the new data of the chart
                 */
                setData(data: object): void;

                /**
                 * Sets an onClick handler for the Chart. The function is called with the following parameter: **index**, **dataset** The value at dataset[index] represents the clicked area. Not supported in ChartJS 4. Use chart configuration for this, example below.
                 * @deprecated
                 * @param onClickHandler the handler to be executed
                 */
                setChartOnClickHandler(onClickHandler: Function): void;

                /**
                 * Set the options of the chart.
                 * @param options the new options of the chart
                 */
                setOptions(options: object): void;

                /**
                 * Get the options of the chart.
                 * @returns chart options
                 */
                getOptions(): object;

                /**
                 * Get the type of the chart.
                 * @returns chart type
                 */
                getType(): string;

                /**
                 * Get the data for the chart
                 * @returns chart data
                 */
                getData(): object;

                /**
                 * Get the onClick handler for the Chart.
                 * @returns chart onClick handler
                 */
                getChartOnClickHandler(): Function;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            class DropForm extends Transferable {
                /**
                 * 
                 * @param dropConfiguration drop configuration
                 * @param dropConfiguration.processCallback callback function which processes the data of the submitted form
                 * @param dropConfiguration.buttons `true` for adding the default buttons or a custom container button configuration (see: {@link otris.gadget.gui.DropForm#setContainerButtons})
                 * @param viewId the viewId of the form (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(dropConfiguration: DropFormConstructor_dropConfiguration, viewId?: string);

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * This object can be used to create any Component supported by the Ext JS Framework and transfer it as the result of a gadget.For more information on Ext JS please see [https://www.sencha.com]{@link https://www.sencha.com}.**ATTENTION:** Since Documents 5, this component was marked as deprecated.In Documents 6, the ExtJS library has been removed. Using this componentin Documents 6 will therefore directly lead to an error.
             */
            class ExtComponent extends Transferable {
                /**
                 * 
                 * @deprecated
                 * @param extclass the extclass for this object
                 * @param config the ext-config
                 * @param uniqueid the unique id to identify this instance as a unique object
                 * @param viewId the viewId of this element  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(extclass: string, config: object, uniqueid: string, viewId?: string);

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            class ExtTable extends Transferable {
                /**
                 * **ATTENTION:** Since Documents 5, this component was marked as deprecated. In Documents 6, the ExtJS library has been removed. Using this component in Documents 6 will therefore directly lead to an error.
                 * @param title the title of the Ext table
                 * @param dataGadgetConfig the gadgetConfig for the gadget to be called when the table retrieves its data
                 * @deprecated Use ScriptList with [otris.gadget.gui.ScriptListWrapper]{@link otris.gadget.gui.ScriptListWrapper} instead
                 */
                constructor(title: string, dataGadgetConfig: GadgetConfig);

                /**
                 * Set a default column defintion with settings to use for all columns
                 * @see addColumnDef
                 * @param def column definition object to use as the default
                 */
                setColumnDefaults(def: ColumnDefinition): void;

                /**
                 * Add a column definition to the table. A column definition can contain detailed settings for single columns.
                 * @param def column definition object
                 * @param index - the index of the column to specify the defintion for (if omitted, a new column is appended)
                 */
                addColumnDef(def: ColumnDefinition, index?: number): void;

                /**
                 * Fit column widths to the width of the table? (default: true)
                 * @param fit fit column widths to table?
                 */
                setFitColumns(fit: boolean): void;

                /**
                 * Sets the headers of the Ext table
                 * @param header array of new column headings
                 */
                setHeader(header: string[]): void;

                /**
                 * Sets a css Style for all columns in the table
                 * @param columnStyle the new columnStyle
                 */
                setColumnStyle(columnStyle: string): void;

                /**
                 * Sets the dataIndex of the Ext table
                 * @param dataIndex an array containing the names of the properties for the columns. This name is used to retrieve the value for the current cell from the result returned by the dataScript.
                 */
                setDataIndex(dataIndex: string[]): void;

                /**
                 * Sets the gadgetConfig Object for retrieving the data
                 * @param dataGadgetConfig the new config object
                 */
                setDataGadgetConfig(dataGadgetConfig: GadgetConfig): void;

                /**
                 * Sets the dataStoreId for the data store of this table. Data of this table can later be aquired on the clientside using this id. By default the dataStoreId is set to the gadgetId of the gadget.
                 * @param dataStoreId the new dataStoreId
                 */
                setDataStoreId(dataStoreId: string): void;

                /**
                 * Sets whether or not the sorting of the table should be handled by the dataScript
                 * @param remoteSort
                 */
                setRemoteSort(remoteSort: boolean): void;

                /**
                 * Sets whether or not a column with a checkbox should be shown on each line so that rows can be selected
                 * @param showCheckboxes
                 */
                setShowCheckboxes(showCheckboxes: boolean): void;

                /**
                 * Sets additional parameters which should be passed to the dataAction each time the data is retrieved
                 * @param dataParams a JavaScript Object containing each parameter as a property.
                 */
                setDataParams(dataParams: object): void;

                /**
                 * Sets whether or not the first column of the table should be hidden
                 * @param hideFirstCol
                 */
                setHideFirstColumn(hideFirstCol: boolean): void;

                /**
                 * 
                 * @see
                 * @param hideFirstCol
                 */
                setHideFirstCol(hideFirstCol: boolean): void;

                /**
                 * Sets whether or not the search field should be disabled (default: true)
                 * @param disableSearch
                 */
                setDisableSearch(disableSearch: boolean): void;

                /**
                 * Sets whether or not the entries of the table should be editable (default: false)
                 * @param editable
                 */
                setEditable(editable: boolean): void;

                /**
                 * Sets whether or not an empty row should be added to the end of the table so that new entries can be added by simply editing the last empty row. (default: true) This option only has an effect if the table is editable.
                 * @param addEmptyRow
                 */
                setAddEmptyRow(addEmptyRow: boolean): void;

                /**
                 * Sets the page size
                 * @param pageSize the new page size (amount of entries displayed on one page)
                 */
                setPageSize(pageSize: number): void;

                /**
                 * Adds a handler function to this Ext table which will be fired when the given event is triggered
                 * @param event the event which fires the handler
                 * @param handler the handler function
                 */
                addHandler(event: string, handler: Function): void;

                /**
                 * Sets whether or not the table should habe a top toolbar
                 * @param show
                 */
                setShowTopToolbar(show: boolean): void;

                /**
                 * Sets whether or not the table should habe a bottom toolbar
                 * @param show
                 */
                setShowBottomToolbar(show: boolean): void;

                /**
                 * Sets the height of the Ext table
                 * @param height the height (in Pixels) of the table
                 */
                setHeight(height: number): void;

                /**
                 * Sets the width of the Ext table
                 * @param width the width (in Pixels) of the table
                 */
                setWidth(width: number): void;

                /**
                 * Adds a handler function to the table which is called each time the table has been edited by the user. The handler is passed an Array of entries currently in the table
                 * @param handler the handler to call
                 */
                onUpdate(handler: Function): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * The Base class for every form element used with otris.gadget.gui.Form
             */
            class Element {
                /**
                 * 
                 * @param type the type of the form field
                 */
                constructor(type: string);

                /**
                 * Replace or set an attribute
                 * @param name the name of the attribute to replace/ set
                 * @param value the value to set
                 * @returns current instance for chaining methods
                 */
                setAttribute(name: string, value: string): Element;

                /**
                 * Finds and returns the value of a given attribute
                 * @param name the name of the attribute to look for/ return its value
                 * @returns the value of the given attribute or "" in case the attribute was not found/ empty
                 */
                getAttribute(name: string): string;

                /**
                 * Adds a css class to the form field
                 * @param styleClass the style class to be added
                 * @returns current instance for chaining methods
                 */
                addStyleClass(styleClass: string): Element;

                /**
                 * Set a style attribute of the form field
                 * @param name the name of the style parameter (e.g. `height`)
                 * @param value the value of the style parameter (e.g. `100px`)
                 * @returns current instance for chaining methods
                 */
                setStyle(name: string, value: string): Element;

                /**
                 * Adds an event handler
                 * @param event name of the event (e.g. `change`)
                 * @param handler the name of the client function (e.g. `myOnchangeFunction`)
                 * @returns current instance for chaining methods
                 */
                setEvent(event: string, handler: string): Element;

                /**
                 * Moves the element before a given element in the form.
                 * @param name name of an existing form element
                 * @returns current instance for chaining methods
                 */
                moveBefore(name: string): Element;

                /**
                 * Moves the element after a given element in the form.
                 * @param name name of an existing form element
                 * @returns current instance for chaining methods
                 */
                moveAfter(name: string): Element;

                /**
                 * Remove the element from the form
                 * @returns current instance for chaining methods
                 */
                remove(): Element;

                /**
                 * Sets the label of the form field
                 * @param label the new label (if set to `false` the label-tag will not be generated)
                 * @returns current instance for chaining methods
                 */
                setLabel(label: string | boolean): Element;

                /**
                 * Sets wether or not the form field will be required to submit the form
                 * @param mandatory is the field mandatory?
                 * @returns current instance for chaining methods
                 */
                setMandatory(mandatory: boolean): Element;

                /**
                 * Sets wether or not the form field will readonly For compatibility reasons it is necessary to pass the string `readonly` if you want to set the element ONLY as readable. Otherwise, the element is also set `disabled`. (since: `DOCUMENTS 5.0f HF2`)
                 * @param readonly - is the field readonly?
                 * @returns current instance for chaining methods
                 */
                setReadonly(readonly: boolean | "readonly"): Element;

                /**
                 * Sets the width of the form field
                 * @param width the width (in Pixels) of the form field
                 * @returns current instance for chaining methods
                 */
                setWidth(width: number): Element;

                /**
                 * Sets wether or not the form field should be displayed in one line with the previous form field
                 * @param inLine in same line as previous?
                 * @returns current instance for chaining methods
                 */
                setInLine(inLine: boolean): Element;

                /**
                 * End a current horizontal ruler group.
                 * @returns current instance for chaining methods
                 * @param endBefore set to true to end the ruler group before this element
                 */
                endHorizontalRuler(endBefore?: boolean): Element;

                /**
                 * Sets wether or not the form should reload if the the value of the field changes. The form ist submitted to the current gadgetAction and the client side validation is disabled
                 * @param options
                 * @param options.delay the form is not sent until the value does not change for the given `delay` of time in milliseconds
                 * @returns current instance for chaining methods
                 */
                setReloadOnChange(options?: setReloadOnChange_options | boolean): Element;

                /**
                 * Sets the value of the element dependend on the element type
                 * @param value value of the element
                 * @returns current instance for chaining methods
                 */
                setValue(value: string): Element;

                /**
                 * Applies a validator to the input element A {@link validatorFunction} is used to validate the content of the input element The form can only be submitted if all validators are successful
                 * @param validator function to validate an input field
                 * @returns current instance for chaining methods
                 */
                setValidator(validator: validatorFunction): Element;

            }

            /**
             * The Base class for every form element containing any kind of selectable options
             */
            class SelectableElement extends Element {
                constructor();

                /**
                 * Sets the values that can be selected with this SelectableElement
                 * @param selectableValues an array of arrays containing values and labels
                 */
                setSelectableValues(selectableValues: any[]): void;

                /**
                 * Adds one value to the list of selectable values
                 * @param value the value to add
                 * @param label the label to show for that value
                 */
                addSelectableValue(value: string, label: string): void;

                /**
                 * Get the selectable values
                 */
                getSelectableValues(): void;

                /**
                 * Get the selected values
                 */
                getSelectedValues(): void;

                /**
                 * Adds and returns a new option group to group selectable items
                 * @param name the name of the group
                 * @param selectableValues
                 * @returns a new [OptionGroup]{@link otris.gadget.gui.OptionGroup} instance
                 */
                addGroup(name: string, selectableValues: (string[])[]): otris.gadget.gui.OptionGroup;

                /**
                 * Sets the values that are selected
                 * @param selectedValues an array of values of the selected options
                 */
                setSelectedValues(selectedValues: any[]): void;

                /**
                 * Adds one (pre)selected value to the list of selected options
                 * @param selectedValue the value to add
                 */
                addSelectedValue(selectedValue: string): void;

                /**
                 * Sets the initial value of the SelectableElement
                 * @param initialValue initial value or values of the element
                 * @returns this element for chaining
                 */
                setValue(initialValue: string | string[]): any;

            }

            /**
             * A class for grouping together selectable Elements
             */
            class OptionGroup {
                constructor();

                /**
                 * Set the name of the group
                 * @param name the display name of the group
                 */
                setName(name: string): void;

                /**
                 * Adds one value to the list of selectable values of this group
                 * @param value the value to add
                 * @param label the label to show for that value
                 */
                addSelectableValue(value: string, label: string): void;

            }

            class Form extends Transferable {
                /**
                 * 
                 * @param viewId the viewId of the form (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Sets the autoOverrideDefaults flag. Replaces the values of the elements if a fitting value exists in gadgetContext.formParams
                 * @param options boolean value whether to override the elements values OR a configuration object (since: `Documents 5.0f HF2`)
                 * @param options.active the boolean value whether to override the elements values
                 * @param options.clearUnsubmitted clear the value of a field if it is not present in the submitted form data (only relevant if `active` is set to `true`)
                 */
                setAutoOverrideDefaults(options?: setAutoOverrideDefaults_options | boolean): void;

                /**
                 * Applies a validator to the entire form A {@link validatorFunction} is used to validate the content of the input element The form can only be submitted if all validators are successful
                 * @param validator function to validate an input field
                 */
                setFormValidator(validator: validatorFunction): void;

                /**
                 * Sets the dafault margin of a form-gadget-dialog to the same margin as other documents-form-dialogs.
                 * @param active boolean value whether to match the margin equal to other documents-form-dialogs. defaults to `false`
                 */
                setDialogDefaultMargin(active: boolean): void;

                /**
                 * Adds a dependency describing a relation between form fields
                 * @param controller the controller form field which affects other form fields
                 * @param condition the condition to be tested ("==", "!=", "any", "non-any")
                 * @param value the value to test the controller for
                 * @param fields the fields that are affected if the condition yields true
                 */
                addDependency(controller: string, condition: string, value: string, fields: any[]): void;

                /**
                 * Adds a text field to the Form (can contain any text)
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @param options text field options (since `DOCUMENTS 5.0g HF2`)
                 * @param options.button button configuration
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addTextField(name: string, label: string | boolean, value: string, options?: addTextField_options): otris.gadget.gui.Element;

                /**
                 * Adds a translation field to the Form (can contain any text)
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @param options
                 * @param options.type type of the field, available are input/text, textarea and htmlField
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addTranslationField(name: string, label: string | boolean, value: string, options: addTranslationField_options): otris.gadget.gui.Element;

                /**
                 * Adds a date field with a date picker to the Form
                 * @param name - the technical name of the form field
                 * @param label - the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value - the predefined value of the form field
                 * @param addTime - add hours and minutes
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addDateField(name: string, label: string | boolean, value: string | Date, addTime?: boolean): otris.gadget.gui.Element;

                /**
                 * Adds a number field to the Form (a text field which can only contain numbers)
                 * @param name - the technical name of the form field
                 * @param label - (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value - the predefined value of the form field
                 * @returns - The representing the form field added which can be further manipulated before transfering the form
                 */
                addNumberField(name: string, label: string | boolean, value: string): otris.gadget.gui.Element;

                /**
                 * Adds a password field to the Form (the content will be hidden with asterisks while typing)
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addPasswordField(name: string, label: string | boolean, value: string): otris.gadget.gui.Element;

                /**
                 * Adds an E-Mail field to the Form (can only contain valid e-mail adresses)
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addEMailField(name: string, label: string | boolean, value: string): otris.gadget.gui.Element;

                /**
                 * Adds an URL field to the Form (can only contain valid URLs)
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addURLField(name: string, label: string | boolean, value: string): otris.gadget.gui.Element;

                /**
                 * Adds a dropzone to the Form. The uploaded files could be accessed through the portal script method `context.getTempPathByToken(accessToken)`.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param dropzoneValues list of the uploaded files (see: {@link DropzoneValue})
                 * @param dropzoneConfig the dropzone configuration
                 * @param dropzoneConfig.multiple - allow multiple uploads
                 * @param dropzoneConfig.height - height in pixel
                 * @param dropzoneConfig.style - additional css styles (e.g.: background-color:#333;color:#fff;)
                 * @param dropzoneConfig.icon - icon for the dropzone
                 * @param dropzoneConfig.label - label for the dropzone (if set to `false` the label-tag will not be generated)
                 * @param dropzoneConfig.labelStyle - additional css styles for the label (e.g.: font-size:32px;font-weight:bold;)
                 * @param dropzoneConfig.extensions - allowed extensions
                 * @param dropzoneConfig.maxSize - max file size (in bytes)
                 * @param dropzoneConfig.listPosition - position of the list of the uploaded files
                 * @param dropzoneConfig.onFinish - name of a client function that will be called after a successful upload. called once for multiple selection. (since: `Documents 5.0g HF2`)
                 * @param dropzoneConfig.onClickEntry - name of a client function that will be called if a list entry is clicked in readonly mode. (since: `Documents 5.0i`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addDropzone(name: string, label: string, dropzoneValues?: DropzoneValue | DropzoneValue[], dropzoneConfig?: addDropzone_dropzoneConfig): otris.gadget.gui.Element;

                /**
                 * Adds a text area field to the Form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addTextArea(name: string, label: string | boolean, value: string): otris.gadget.gui.Element;

                /**
                 * Adds a html field to the Form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the form field
                 * @param editorConfig editor configuration
                 * @param editorConfig.ckEditor configuration for the CKEditor ([https://ckeditor.com/](https://ckeditor.com/))
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addHtmlField(name: string, label: string | boolean, value?: string, editorConfig?: addHtmlField_editorConfig): otris.gadget.gui.Element;

                /**
                 * Adds a horizontal rule to the form
                 * @param name the technical name of the ruler
                 * @param label the (visible) label of the ruler
                 * @param value state of the ruler (default is open)
                 * @param options additional ruler settings
                 * @param options.size the view type changes the rendering of the ruler (possible values: `default`, `small`)
                 * @param options.iconOpened icon for the _open state_
                 * @param options.iconClosed icon for the _closed state_
                 * @param options.labelTemplate Handlebars template for the ruler label. In the template the objects `field` and `model` (*labelModel*) are available (since `DOCUMENTS 5.0h`)
                 * @param options.labelModel data which is provided as `model` in the handlebars template (since `DOCUMENTS 5.0h`)
                 * @param options.tooltip tooltip to be displayed when hovering the ruler
                 * @param options.beforeStateChange callback called before the ruler state changes (returning `false` in this callback prevents the state change).
                 * @param options.afterStateChange callback called after the ruler state changes.
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addHorizontalRuler(name: string, label: string, value?: boolean, options?: addHorizontalRuler_options): otris.gadget.gui.Element;

                /**
                 * Adds a checkbox to the form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param value the predefined value of the form field
                 * @param options checkbox options (if a `boolean`  given it is intepreted as value for the **checked** flag)
                 * @param options.checked the initial check state
                 * @param options.verticalCentered use this flag to vertically center a checkbox with a another inline field element (since `DOCUMENTS 5.0g HF2`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addCheckbox(name: string, label: string, value: string, options?: addCheckbox_options | boolean): otris.gadget.gui.Element;

                /**
                 * Adds an Select field to the Form. The SingleSelectList is an SelectableElement please see <otris.gadget.gui.SelectableElement> for more information.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param selectableValues the predefined values that can be selected (an array of arrays containing values and labels, e.g.: [['value1', 'label1'],['value2', 'label2']])
                 * @param multiple Enable multiple selection
                 * @param size the number of entries that are displayed by this select list without scrolling or using the dropdown menu
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addSingleSelectList(name: string, label: string | boolean, selectableValues: (string[])[], multiple?: boolean, size?: number): otris.gadget.gui.SelectableElement;

                /**
                 * Adds a double Select field to the Form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param selectableValues the predefined values that can be selected (an array of arrays containing values and labels, e.g.: [['value1', 'label1'],['value2', 'label2']])
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addDoubleSelectList(name: string, label: string | boolean, selectableValues: any[]): otris.gadget.gui.SelectableElement;

                /**
                 * Adds a CheckboxList (a list of checkboxes where multiple checkboxes can be checked) to the form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param selectableValues the predefined values that can be selected (an array of arrays containing values and labels, e.g.: [['value1', 'label1'],['value2', 'label2']])
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addCheckboxList(name: string, label: string | boolean, selectableValues: any[]): otris.gadget.gui.SelectableElement;

                /**
                 * Adds a radioButtonList (a list of radio buttons where only one  can be checked) to the form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param selectableValues the predefined values that can be selected (an array of arrays containing values and labels, e.g.: [['value1', 'label1'],['value2', 'label2']])
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addRadiobuttonList(name: string, label: string | boolean, selectableValues: any[]): otris.gadget.gui.SelectableElement;

                /**
                 * Adds a button to the form with an user defined onClickHandler.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param onClickHandler the NAME of a JavaScript function which is available at client side (called when the button is clicked)
                 * @param options button configuration (since: `Documents 5.0f`)
                 * @param options.style additional css rules for the button
                 * @param options.icon button icon, eg. `entypo:folder;color:red;`. For syntax details see [Icon HowTo](../../howto/design/icons.html)
                 * @param options.tooltip button tooltip
                 * @param options.labelStyle additional css rules for the label of the button
                 * @param options.labelPadding Set to `true` to correct the vertical alignment of the button when it is displayed in the same line as an field (since: `Documents 5.0h`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addButton(name: string, label: string, onClickHandler: string, options?: addButton_options): otris.gadget.gui.Element;

                /**
                 * Adds a button to the form which will call another gadget Please note that since version **2.3.3** the signature of this function has changed. The old signature `addGadgetActionButton(name, label, gadgetConfig, newWindow, windowOptions)` is still supported but should not be used anymore.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param gadgetConfig the gadget config for the gadget to be called when the button is pressed
                 * @param options additional options
                 * @param options.newWindow opens the gadget in a new dialog
                 * @param options.windowOptions the options to configure the appearance of the new dialog { title: "Dialog-Title" }
                 * @param options.validateForm whether the actionButton validates the form
                 * @param options.showBusyPanel Lock the target gadget container after clicking the button. (since: `Documents 5.0e`)
                 * @param options.style additional css rules for the button (since: `Documents 5.0f`)
                 * @param options.icon button icon, eg. `entypo:folder;color:red;`. For syntax details see [Icon HowTo](../../howto/design/icons.html) (since: `Documents 5.0f`)
                 * @param options.tooltip button tooltip (since: `Documents 5.0f`)
                 * @param options.labelStyle additional css rules for the label of the button (since: `Documents 5.0f`)
                 * @param options.disabled
                 * @param options.labelPadding Set to `true` to correct the vertical alignment of the button when it is displayed in the same line as an field (since: `Documents 5.0h`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addGadgetActionButton(name: string, label: string, gadgetConfig?: object, options?: addGadgetActionButton_options): otris.gadget.gui.Element;

                /**
                 * Adds an image to the form
                 * @param id the technical name of the image
                 * @param src the path to the image file
                 * @param onClickHandler the NAME of a JavaScript function which is available at client side (called when the image is clicked)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addImage(id: string, src: string, onClickHandler: string): otris.gadget.gui.Element;

                /**
                 * Adds a hidden form field to the form
                 * @param name the technical name of the field
                 * @param value the value of the form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addHiddenField(name: string, value: string): otris.gadget.gui.Element;

                /**
                 * Adds a html headline to the form
                 * @param value the text of the headline
                 * @param options options object or only the `importance` option as number (setting option as number leads to setting allowHtml to `false`)
                 * @param options.name name to identify the field*
                 * @param options.importance set the importance of the headline (1-6)
                 * @param options.allowHtml allow html code for the content of the headline (since: `Documents 5.0g`)
                 * @param options.sanitize By default the html code is sanitized before added to the DOM to prevent XSS attacks. With this flag you can disable this mechanism. (since: `Documents 5.0g`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addHeadLine(value: string, options?: addHeadLine_options | number): otris.gadget.gui.Element;

                /**
                 * Adds a html div containing text to the form. **Notice:** This method can also be used to embed HTML code in a form. To prevent possible XSS, values may have to be masked. **Deprecation:** Please use the more specific methods {@link otris.gadget.gui.Form#addPlainText addPlainText()} or {@link otris.gadget.gui.Form#addHtml addHtml()}.
                 * @param value - the html content of the div
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 * @deprecated since Documents 5.0g
                 * @see
                 * @see
                 */
                addText(value: string): otris.gadget.gui.Element;

                /**
                 * Adds html content to the form
                 * @param htmlCode - the html code (if multiple strings are passed, these are combined into one)
                 * @param options
                 * @param options.name name to identify the field
                 * @param options.model If model given the htmlCode is treated as handlebars template string and *executed* with this model (During transportation the model is serailized with `JSON.stringify()`).
                 * @param options.labelPadding Add top padding with height of the label of a form field
                 * @param options.sanitize By default the html code is sanitized before added to the DOM to prevent XSS attacks. With this flag you can disable this mechanism.
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 * @see
                 */
                addHtml(htmlCode: string | string[], options?: addHtml_options): otris.gadget.gui.Element;

                /**
                 * Adds a box with plain text to the form.
                 * @param text - the text content of the div
                 * @param options
                 * @param options.name name to identify the field
                 * @param options.labelPadding Add top padding with height of the label of a form field
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 * @see
                 */
                addPlainText(text: string, options?: addPlainText_options): otris.gadget.gui.Element;

                /**
                 * Adds an autoComplete field to the form. The script defined in the autoComplete configuration `autoCompleteConfig.scriptName` is called with a script parameter `query` containing the current value of the autoComplete field.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field (if set to `false` the label-tag will not be generated)
                 * @param value the predefined value of the autoCompleteField. Type `object` if `autoCompleteConfig.isReference` is used. See example for details.
                 * @param autoCompleteConfig autocomplete config object or only the name of the autoComplete script (string)
                 * @param autoCompleteConfig.scriptName the name of the autoComplete script to execute.
                 * @param autoCompleteConfig.maxResults max results
                 * @param autoCompleteConfig.minQueryChars min query length
                 * @param autoCompleteConfig.queryDelay delay in seconds
                 * @param autoCompleteConfig.autoSelectFirstResult auto select first result
                 * @param autoCompleteConfig.scriptParams optional script parameter
                 * @param autoCompleteConfig.isReference Use the autocomplete field as reference field. See example for details (since: `Documents 5.0e`)
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addAutoCompleteField(name: string, label: string | boolean, value: string | object, autoCompleteConfig?: addAutoCompleteField_autoCompleteConfig | string): otris.gadget.gui.Element;

                /**
                 * Adds an ext Component as form field to the form **ATTENTION:** Since Documents 5, this function was marked as deprecated. In Documents 6, the ExtJS library has been removed. Using this function in Documents 6 will therefore directly lead to an error.
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param extComponent the extComponent
                 * @deprecated
                 */
                addExtComponent(name: string, label: string, extComponent: otris.gadget.gui.ExtComponent): void;

                /**
                 * Adds a custom Component as form field to the form
                 * @param name the technical name of the form field
                 * @param label the (visible) label of the form field
                 * @param data the data that the loader function will get as its argument
                 * @param loader the function that will be called when the component is loaded into the form
                 * @returns element representing the form field added which can be further manipulated before transfering the form
                 */
                addCustomField(name: string, label: string, data: any, loader: Function): otris.gadget.gui.Element;

                /**
                 * Focus a specific field on load.
                 * @param type
                 * @param fieldName name of an existing field (only used with type `name`)
                 */
                setFocusField(type: "first" | "current" | "next" | "name", fieldName?: string): void;

                /**
                 * Returns the name of the field that caused the reload triggered by {@link otris.gadget.gui.Element#setReloadOnChange}
                 * @see
                 * @returns name of the form element
                 */
                getChangedField(): string | undefined;

                /**
                 * Sets a style attribute of the html container containing the form elements
                 * @param name the name of the style parameter (i.e. "height")
                 * @param value the value of the style parameter (i.e. "100px")
                 */
                setFormStyle(name: string, value: string): void;

                /**
                 * Get a form element by name or id.
                 * @param name name or id of a existing form element
                 * @returns element representing the form field
                 */
                getElement(name: string): otris.gadget.gui.Element;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a calendar gadget element. The implementation is based on **FullCalendar** {@link https://fullcalendar.io/}
             */
            class FullCalendar extends Transferable {
                /**
                 * 
                 * @param title Set the title of the dialog if the module is displayed in a modal dialog
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(title: string, viewId?: string);

                /**
                 * Sets the calendar configuration.  See fullcalendar documentation (http://fullcalendar.io) for details. The calendar sources must be added with the addSource() function
                 * @param calConfig calendar config. See fullcalendar documentation for details
                 */
                setConfig(calConfig?: object): void;

                /**
                 * Activates the search context for this calendar. The parameter `filterFunction` is only necessary if *lazyLoad is false*
                 * @param label Label for the search box
                 * @param filterFunction Function with the following signature: <code>function filterFunction([FullCalendarSource]{@link FullCalendarSource} source, **String** searchExpression)</code> Expects the filtered event array as return value. `source.events` always contains the initial array.
                 */
                setSearchContext(label: string, filterFunction?: Function): void;

                /**
                 * Sets the global event loader function. The registered function is called for every source with no custom event loader function. The function must return the events for the given source in the specified time range <code>start - end</code> The options object can contain a filter string (`options.filter`) if the search context is used (see [setSearchContext]{@link otris.gadget.gui.FullCalendar#setSearchContext}) Required return format: <code><strong>Array of [FullCalendarEvents]{@link FullCalendarEvents}</strong></code>
                 * @param Function with the following signature: <code>function eventLoader([FullCalendarSource]{@link FullCalendarSource} eventLoaderFunction source, **Date** start, **Date** end,**(String|Boolean)** timezone, **(Object)** options)</code>
                 */
                setEventLoader(Function: Function): void;

                /**
                 * If set to false the events are all loaded on the first request. The eventLoader functions are called with empty time range params
                 * @param lazyLoad Lazy load the events?
                 */
                setLazyLoad(lazyLoad?: boolean): void;

                /**
                 * Set a double click function for the calendar. For example to create new entries on double click
                 * @param doubleClickFunction - The given function is executed if the caleandar is double clicked <code>function(**Object** event, **String** dateString, [DocumentsContext]{@link documents.sdk.DocumentsContext} documentsContext)</code>
                 */
                setDoubleClickFunction(doubleClickFunction: doubleClickFunction): void;

                /**
                 * Add a event source to the calendar
                 * @param soure A fullcalendar source definition
                 * @param eventLoader eventLoader function for this source. See details <code>[setEventLoader]{@link otris.gadget.gui.FullCalendar#setEventLoader}
                 */
                addSource(soure: FullCalendarSource, eventLoader?: Function): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * To use this gadget you have to implement a **gadgetAction** with the name `gentableDefinition`which returns the gentable definition in the typical xml format (See the example below for details).  You can use the following default button actions (*function-Tag*) `appendNewRow`, `cloneRow`,`deleteRow`,`moveUpRow` and`moveDownRow` in your xml structure.#### XML Example (See gentable documentation for details):```xml<?xml version="1.0" encoding="UTF-8"?><table_def name="otris_gadgetGentable">	<xmlfield>xmlfield</xmlfield>	<alwaysShowToolbar>false</alwaysShowToolbar>	<storeFormat>json</storeFormat>	<field number="1">		<label>de:Konto;en:account</label>		<title>account</title>		<type>NUMBER</type>		<width>90</width>		<maxLength>10</maxLength>		<editable>true</editable>	</field>	...	<button>		<label>de:Neue Zeile;en:New row</label>		<function>appendNewRow</function>	</button>...	</table_def>```
             */
            class Gentable extends Transferable {
                /**
                 * 
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

                /**
                 * Set the XML gentable definition to be used for the gentable. <strong>Attention</stron>: This must only be used in the <strong>gentableDefinition Gadget-Action</strong>.
                 * @param definition xml gentable definition
                 * @returns Gentable Gadget
                 */
                setDefinition(definition: string): Gentable;

                /**
                 * Sets the definitionName for the gentable definition. This name is used to cache the definition. It is NOT used for the gentable registry. The registry only uses the name defined in the XML definition (`<table_def name="nameUsedForRegistry">...`).
                 * @param name - definition name used as a cache key
                 */
                setDefinitionName(name: string): void;

                /**
                 * Define which store type the grid should use.
                 * @param store - store configuration
                 * @param store.type - sort type `field` or `script`
                 * @param store.fieldName - field name for the store type `field`
                 * @param store.scriptName - script name for the store type `script` (Script parameter `gentableData` contains the grid data)
                 * @param store.scriptParams - optional script parameter
                 */
                setStore(store?: setStore_store): void;

                /**
                 * Enable/disable the edit mode of the grid
                 * @param editable set the grid editable or readonly
                 */
                setEditable(editable: boolean): void;

            }

            /**
             * Constructs a gadget element that can display HTML as its contents
             */
            class HTML extends Transferable {
                /**
                 * 
                 * @param html The html to display
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(html: string, viewId?: string);

                /**
                 * Append html code
                 * @param newHtml html code to append
                 */
                appendHtml(newHtml: string | string[]): void;

                /**
                 * Prepend html code
                 * @param newHtml html code to append
                 */
                prependHtml(newHtml: string | string[]): void;

                /**
                 * This function can be used to substitude any marks in the html of this object with the corresponding property of the templatedata object i.e. if the html is &lt;h1&gt;{title}&lt;/h1&gt; "{title}" will be substituted by the value of templatedata.title . <strong>Attention</strong>: This way of creating templated html is deprecated. It is highly recommended to use the Handlebars-Environment instead.
                 * @param templatedata An object containing the templatedata
                 * @param before A text to put before the html of this Object
                 * @param after A text to put after the html of this Object
                 * @deprecated
                 */
                compileTemplate(templatedata: object, before?: string, after?: string): void;

                /**
                 * This function activates the DHT processing of the html content on the client side.
                 */
                activateDHTProcessing(): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a layout gadget. 
             * The example [Layout Gadget](tutorial-samples.html#layout-gadget ) can be used as a starting point.
             */
            class Layout extends Transferable {
                /**
                 * 
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Append html code. A given `GadgetConfig` **(with gadgetId)** is automatically converted to the corresponding gadget container. The `GadgetConfig` is also automatically added through `addGadgetConfig()`.
                 * @param newHtml html code to append
                 */
                append(...newHtml: string | GadgetConfig): void;

                /**
                 * Add a gadgetConfig for this layout
                 * @param gadgetConfig gadgetConfig (gadgetId, gadgetScript, gadgetAction, are mandatory)
                 */
                addGadgetConfig(gadgetConfig: GadgetConfig): void;

                /**
                 * Set gadgetConfigs for this layout. **Deletes all previous definitions.**
                 * @param gadgetConfigs Array of gadgetConfigs (gadgetId is mandatory)
                 */
                setGadgetConfigs(gadgetConfigs: GadgetConfig[]): void;

                /**
                 * Return the defined gadgetConfigs
                 * @returns array of gadgetConfigs
                 */
                getGadgetConfigs(): GadgetConfig[];

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Objects of the class <otris.gadget.gui.Message> can be transferred to the client as the result of the call to an gadget. The content will be displayed to the user as a modal popup.
             */
            class Message extends Transferable {
                /**
                 * 
                 * @param message the message to display
                 * @param messageType the type of the message (error/info/warn)
                 */
                constructor(message: string, messageType?: string);

                /**
                 * Set the message
                 * @param message message
                 * @returns current instance for chaining methods
                 */
                setMessage(message: string): this;

                /**
                 * Set the messageType
                 * @param messageType type of the message
                 * @returns current instance for chaining methods
                 */
                setMessageType(messageType: string): this;

                /**
                 * Get message
                 * @returns message
                 */
                getMessage(): string;

                /**
                 * Get messageType
                 * @returns messageType type of the message
                 */
                getMessageType(): string;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Objects of the class **otris.gadget.gui.PieChart** can be transferred to the client as the result of the call to a gadget.**ATTENTION:** Since Documents 5, this component was marked as deprecated.In Documents 6, the ExtJS library has been removed. Using this componentin Documents 6 will therefore directly lead to an error.
             */
            class PieChart extends Transferable {
                /**
                 * 
                 * @param dataGadgetConfig the data gadget config
                 * @deprecated Use [otris.gadget.gui.Chart]{@link otris.gadget.gui.Chart} instead
                 */
                constructor(dataGadgetConfig: GadgetConfig);

                /**
                 * Sets the gadgetConfig Object for retrieving the data
                 * @param dataGadgetConfig the new config object
                 */
                setDataGadgetConfig(dataGadgetConfig: GadgetConfig): void;

                /**
                 * Sets the dataScript to use for this PieChart
                 * @param dataScript name of the dataScript
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataScript(dataScript: string): void;

                /**
                 * Sets the name of the gadgetAction to be called for retrieveing the Data for the PieChart
                 * @param dataAction name of the gadgetAction
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataAction(dataAction: string): void;

                /**
                 * Function: setDataParams
                 * @param dataParams a JavaScript Object containing each parameter as a property.
                 * @deprecated please use {@link setDataGadgetConfig}
                 */
                setDataParams(dataParams: object): void;

                /**
                 * Sets the Width of the PieChart. The PieChart *must* have a given width. Its width can not be determined dynamicly.
                 * @param width=500 the new width in pixels
                 */
                setGadgetWidth(width?: number): void;

                /**
                 * Sets the height of the PieChart. The PieChart *must* have a given height. Its height can not be determined dynamicly.
                 * @param height=500 the new height in pixels
                 */
                setGadgetHeight(height?: number): void;

                /**
                 * Sets the TooltipRenderer function for this pie chart
                 * @param fn the function which will be called to render the tooltip of the differend sections of this pie chart
                 */
                setTooltipRenderer(fn: Function): void;

                /**
                 * Adds a handler function to this PieChart which will be fired when the given event is triggered <p>The Piechart object supports the following events:</p> <ul> <li>itemmouseover</li> <li>itemmouseout</li> <li>itemmousedown</li> <li>itemmouseup</li> </ul> An "item" object is passed to the function registered to any of these events. The stored data of this item is available in the function through: "item.storeItem.data".
                 * @param event the event which fires the handler
                 * @param handler the handler function
                 */
                addHandler(event: string, handler: Function): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a PropertyGrid.When creating a new PropertyGrid, **the option *autoHeight* will be enabled by default**. This means that the grids height will grow when rows are being added.If the grid should have a scrollbar, either the function PropertyGrid.setHeight() should be used or autoHeight should be disabled when setting the height via setStyle().
             */
            class PropertyGrid extends Gentable {
                /**
                 * 
                 * @param options The options for the grid.
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(options: object, viewId?: string);

                /**
                 * Adds a property definition
                 * @param name - name of the property
                 * @param jsonType - json type `string`, `number` or `boolean` and the array version of this types `string[]`, `number[]` or `boolean[]`
                 * @param editorType - editor type
                 * @param label - property label
                 * @param options - additional options
                 * @param options.description - description for the property (used for a tooltip for example)
                 * @param options.height - set a custom height (in pixel) for the grid row
                 * @param options.selectOptions - used as options if the *editorType* is `SELECT`. Simple array with values or array of objects (key, label, description)
                 * @param options.selectOptions.key - key of the select option
                 * @param options.selectOptions.label - optional label
                 * @param options.selectOptions.description - optional description
                 * @param options.default - default value
                 */
                addProperty(name: string | object, jsonType: string, editorType: string, label?: string, options?: addProperty_options): void;

                /**
                 * Adjust the columns
                 * @param options - column options
                 * @param options.keyLabel - label for the key column
                 * @param options.valueLabel - label for the value column
                 * @param options.keyWidth - width of the key column in pixel
                 * @param options.valueWidth - width of the value column in pixel
                 * @param options.keySelectionType - selection type for the property keys (possible values: `text` or `select`)
                 * @param options.keyAutoComplete - autocomplete configuration (only works with *keySelectionType* `text`)
                 * @param options.keyAutoComplete.gadgetAction - gadget action which returns the suggested values
                 * @param options.keyAutoComplete.minQueryChars - Number of characters that must be entered for the autocompletion script to run.*
                 * @param options.keyAutoComplete.queryDelay - Delay script execution in milliseconds after user input
                 * @param options.keyAutoComplete.maxResults - Maximum number of suggestions displayed.
                 * @param options.keyAutoComplete.autoFocusResult - Automatically select the first hit
                 * @param options.keyReadonly - if set to true the key column is readonly
                 * @param options.checkboxColumn - Show or hide the checkbox column
                 */
                setColumnOptions(options?: setColumnOptions_options): void;

                /**
                 * Configure grid buttons
                 * @param buttons - buttons (by default all buttons are enabled)
                 * @param buttons.id - button id (available `add`, `remove`, `up`, `down`)
                 */
                setGridButtons(buttons?: (setGridButtons_buttons)[]): void;

                /**
                 * Configure the auto height mechanism
                 * @param autoHeight - auto height configuration or `boolean` as an enable/disable shortcut
                 * @param autoHeight.enabled - enable/disable auto height mechanism
                 * @param autoHeight.maxHeight - maxHeight for auto height mechanism
                 */
                setAutoHeight(autoHeight?: setAutoHeight_autoHeight | boolean): void;

                /**
                 * Sets the height of the grid to be rendered. This will disable autoHeight.
                 * @param height height for the rendered grid
                 */
                setHeight(height: number): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a gadget element that can wrap a ScriptList to add client functions to the wrapper<strong>Attention:</strong>If the ScriptListWrapper is shown as a <b>gadget field</b>, the height of the gadget must either be set manually via ScriptListWrapper.setStyle("height", ...) or auto height must be set on the ScriptList via ScriptList.setAutoHeight(true).If neither is set, the height of the ScriptList will collapse making the rows seem invisible.
             */
            class ScriptListWrapper extends Transferable {
                /**
                 * 
                 * @param scriptList ScriptList to be wrapped
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(scriptList: otris.scriptlist.List, viewId?: string);

                /**
                 * Adds the ScriptList that is wrapped by this wrapper
                 * @param scriptList ScriptList to be wrapped
                 */
                addScriptList(scriptList: otris.scriptlist.List): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a gadget script tree
             */
            class ScriptTree extends Transferable {
                /**
                 * 
                 * @param rootItem The root item of the tree. See <strong>Script Extensions API</strong> for details
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(rootItem: otris.TreeItem, viewId?: string);

                /**
                 * Set the root item of the tree
                 * @param rootItem The root item of the tree. See <strong>Script Extensions API</strong> for details
                 */
                setRootItem(rootItem: otris.TreeItem): void;

                /**
                 * Set the onclick function for the tree nodes. The function must have the following signature: <strong>function(node, selectedIds, documentsContext) {}</strong>
                 * @param onClickFunction Function with the following signature: <strong>function(node, selectedIds, documentsContext) {}</strong>
                 */
                setOnClick(onClickFunction: Function): void;

                /**
                 * Set the onDoubleClick function for the tree nodes. The function must have the following signature: <strong>function(node, selectedIds, documentsContext) {}</strong>
                 * @param onClickFunction Function with the following signature: <strong>function(node, selectedIds, documentsContext) {}</strong>
                 */
                setOnDoubleClick(onClickFunction: Function): void;

                /**
                 * If set to false the root node is not rendered. Defaults to true
                 * @param renderRootNode Render the root node?
                 */
                setRenderRootNode(renderRootNode?: boolean): void;

                /**
                 * Enables a search field for the tree. Defaults to false
                 * @param useTreeSearch Display a search field?
                 */
                setUseTreeSearch(useTreeSearch?: boolean): void;

                /**
                 * Defines to which level the tree is opened by default
                 * @param openTreeLevel - tree level
                 */
                setOpenTreeLevel(openTreeLevel: number): void;

                /**
                 * Add a dialog action. The action are displayed as buttons if the tree is rendered in a dialog. The callbackFunction must have the following signature: <strong>function(selectedIds, documentsContext) {}</strong>
                 * @param id id for the action.
                 * @param label The label for the button
                 * @param dialogActionCallback The function that is executed if the button is clicked.
                 */
                addDialogAction(id: string, label: string, dialogActionCallback: dialogActionCallback): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * A class containing settings for gadgets, can be used with the "addSettings" method on transferable objects. **Only relevant in context of the Dashboard.**
             */
            class Settings {
                constructor();

                /**
                 * Adds a generic setting to this settings object
                 * @param name the name of the option to set
                 * @param value the value of the option
                 */
                set(name: string, value: any): void;

                /**
                 * Set the title of the gadget
                 * @param title the new title to set for the gadget
                 */
                setTitle(title: string): void;

                /**
                 * Set the icon path for the icon displayed for the gadget
                 * @param iconPath the new iconPath
                 */
                setIconPath(iconPath: string): void;

                /**
                 * Set the color (foreground) for the gadghet
                 * @param color the desired foreground color
                 */
                setColor(color: string): void;

                /**
                 * Set the color (background) for the gadghet
                 * @param color the desired background color
                 */
                setBackgroundColor(color: string): void;

                /**
                 * Set weather or not the gadget will be resizable by the user
                 * @param resizable will it be resizable (default: false)
                 */
                setResizable(resizable: boolean): void;

                /**
                 * Set weather or not the gadget will be viewable
                 * @param viewable will it be viewable (default: false)
                 */
                setViewable(viewable: boolean): void;

                /**
                 * Set weather or not the gadget will be editable
                 * @param editable will it be editable (default: false)
                 */
                setEditable(editable: boolean): void;

                /**
                 * Set weather or not the gadget will have a link on its title.
                 * @param tileLink An external URL or a javascript client command starting with 'javascript:'
                 */
                setTileLink(tileLink: string): void;

                /**
                 * Set weather or not the gadget will have a link on its icon.
                 * @param iconLink An external URL or a javascript client command starting with 'javascript:'
                 */
                setIconLink(iconLink: string): void;

                /**
                 * Set weather or not the gadget will have a link on its icon.
                 * @param refreshInterval Refreshinterval in seconds
                 */
                setRefreshInterval(refreshInterval: number): void;

                /**
                 * Set weather or not the gadget will have a link on its icon.
                 * @param langLabelArray Array with the Mapping of key -> Langlabel
                 */
                setTextLabels(langLabelArray: any[]): void;

            }

            /**
             * Constructs a tabledata gadget element
             */
            class TableData extends Transferable {
                /**
                 * 
                 * @param title Set the title of the dialog if the module is displayed in a modal dialog
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(title: string, viewId?: string);

                /**
                 * Sets the title of the list (Display above the list)
                 * @param title title of the list
                 */
                setListTitle(title: string): void;

                /**
                 * Sets the db connection which is used to excecute the database queries Expects an instance of DBConnection class defined in the PortalScripting API
                 * @param dbConnection database connection
                 */
                setDBConnection(dbConnection: DBConnection): void;

                /**
                 * Set the sql query used to fetch the list entries Set only the simple query without WHERE- and ORDER-clause. For default filtering entries use the [setSqlFilter(sqlFilter)]{@link otris.gadget.gui.TableData#setSqlFilter} method
                 * @param sqlSelect sql select query
                 */
                setSqlSelect(sqlSelect: string): void;

                /**
                 * Sets a default filter for the select query (WHERE-clause used for the sql query to fetch the list entries).
                 * @param sqlFilter sql WHERE-clause
                 */
                setSqlFilter(sqlFilter: string): void;

                /**
                 * Set the key column for the list entries. The value of this column is used as a identifier for the entries. For example the details query is called with this values
                 * @param keyColumn key column
                 */
                setKeyColumn(keyColumn: string): void;

                /**
                 * Add the column configuration for the list.
                 * @param columns array of [TableDataColumns]{@link TableDataColumn}
                 */
                setColumns(columns: TableDataColumn[]): void;

                /**
                 * Set the sql query to fetsch the details for the selected entries. The query must contain a ? so the values of the defined key column could be added to the query (The ? ist replaced by a comma seperated list of the key colum values).
                 * @param detailsSql sql select query with WHERE-clause
                 */
                setDetailsSql(detailsSql: string): void;

                /**
                 * Set a mapping to automatically fill file fields of the current map. For example if the gadget is used a user-exit
                 * @param mappings Array of [TableDataMapping]{@link TableDataMapping}s
                 */
                setMapping(mappings: TableDataMapping[]): void;

                /**
                 * Register a **before execute query callback**. The function is called with 2 parameters: <strong>sqlStmt</strong> and the <strong>TableData gadget instance</strong>. If the callback returns a string this string is set and used as sql query.
                 * @param beforeExecuteQueryFunction the escape function
                 */
                setBeforeExecuteQuery(beforeExecuteQueryFunction: Function): void;

                /**
                 * Register your own escape function to prevent sql injection (Warning: Replaces the default implementation). The function is called with 2 parameters: <strong>searchExpression</strong> and <strong>column</strong> (column definition, not always defined). The returned value (string) is used in the sql query wrapped by single quotes so the escape function must escape those.
                 * @param escapeFunction the escape function
                 */
                setSqlEscapeFunction(escapeFunction: Function): void;

                /**
                 * Enable the search box
                 * @param showSearchBox show or hide the search box
                 */
                setShowSearchBox(showSearchBox: boolean): void;

                /**
                 * Enable multi select
                 * @param multiSelect Enable or disable multi select
                 * @param buttonLabel label for the button to call the detailsHandler
                 * @param the function to be executed if the button is clicked. See [setDetailsHandler(detailsHandler)]{@link otris.gadget.gui.TableData#setDetailsHandler} detailsHandler
                 */
                setMultiSelect(multiSelect: boolean, buttonLabel: string, the: Function): void;

                /**
                 * Set a callback function to handle the details data
                 * @param detailsHandler callback function. The function is called with two parameters: <strong>items</strong> (array of detail data), <strong>mapping</strong> (the mapping added with [setMapping]{@link otris.gadget.gui.TableData#setMapping})
                 */
                setDetailsHandler(detailsHandler: Function): void;

                /**
                 * Enable or disable multi column sorting
                 * @param multiColumnSort enable or disable multi column sorting
                 */
                setMultiColumnSort(multiColumnSort: boolean): void;

                /**
                 * Adds a new action to the list. For details see ScriptList API (ScriptExtensions). **SEE:** [`otris.scriptlist.List.html#addAction`](../scriptextensions/otris.scriptlist.List.html#addAction)
                 * @param action List action to be addded to the list.
                 */
                addAction(action: object): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Objects of the class {@link otris.gadget.gui.Timeline} can contain any number of Entries that are displayed as "Bubbles" on a timeline on client side.
             */
            class Timeline {
                /**
                 * 
                 * @param viewId the viewId of this HTML Component  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Sets a function which is executed when a bubble is clicked.
                 * @param onClickFunction The function to be executed on click. The function is called with the `id` of the clicked bubble
                 */
                setBubbleOnClick(onClickFunction: Function): void;

                /**
                 * Sets the header of this timeline to be displayed above the timeline
                 * @param header the new header
                 */
                setHeader(header: string): void;

                /**
                 * Adds a bubble to the Timeline
                 * @param config The json configuration object
                 * @param config.id Unique identifier for this bubble (The bubbleOnClick function is called with this id as parameter)
                 * @param config.content The content to display in the bubble (can contain html)
                 * @param config.highlight Highlight the bubble
                 * @param config.cssClass Additional css class to add to the bubble
                 * @param config.title The title that is displayed at the top of the bubble
                 * @param config.onClick Name of a client function to be executed on click (function is called with bubble id as parameter). Set to `false` to disable onClick for this bubble. *(since Documents 5.0e)*
                 */
                addBubble(config?: addBubble_config): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a gadget tree chart
             */
            class TreeChart extends Transferable {
                /**
                 * 
                 * @param treeChart
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(treeChart: otris.treechart.TreeChart, viewId?: string);

                /**
                 * Set the tree chart object `otris.treechart.TreeChart`
                 * @param treeChart
                 */
                setTreeChart(treeChart: otris.treechart.TreeChart): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a gadget wizard
             */
            class Wizard extends Transferable {
                /**
                 * 
                 * @param viewId The viewId of the gadget object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(viewId?: string);

                /**
                 * Adds a new step to the wizard
                 * @param newStep new wizard step
                 */
                addStep(newStep: Step): void;

                /**
                 * Returns the wizard data object. On the object you can save general wizard data which should be available in every step.
                 */
                getWizardData(): void;

                /**
                 * gadgetAction which is called as final step
                 * @param gadgetAction gadget action name
                 * @param finishActionCloseFunction name of a client function which is called by on click on the close button
                 */
                setFinishAction(gadgetAction: string, finishActionCloseFunction?: string): void;

                /**
                 * gadgetAction which is called if the wizard is canceled
                 * @param gadgetAction gadget action name
                 */
                setCancelAction(gadgetAction: string): void;

                /**
                 * Get the array of the defined steps
                 * @returns steps Array of the defined steps
                 */
                getSteps(): any[];

                /**
                 * Configure the navigation row/column.
                 * @param options options for the navigation
                 * @param options.enable show or hide the navigation.
                 * @param options.position show the navigation as row (`top`) or as  column (`left`)
                 * @param options.width width of the navigation column (ignored for position `top`)
                 */
                showNavigation(options?: showNavigation_options): void;

                /**
                 * Configure the info content column/row.
                 * @param options options for the info content
                 * @param options.enable show or hide the info content row/column.
                 * @param options.position show the info content as column (`left`) or row (`top`)
                 * @param options.width width of the info column (ignored for position `top`)
                 */
                showInfoContent(options?: showInfoContent_options): void;

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

            /**
             * Constructs a wizard stepThe gadget used for the wizard step should have a client function that returnsthe step data (The data which should be saved in this step).`dataClientFunction` must then contain the name of the client function.If the `dataClientFunction` returns `false` the progress to the next step is aborted.For the form gadget (`otris.gadget.gui.Form`) a default implementation of the data client function is used. In thiscase it is not necessary to implement your own function. If you still specify a function nameyou have to validate and serialize the form data by yourself.On all other gadgets the step does not save any data if the `dataClientFunction` is missing.
             */
            class WizardStep {
                /**
                 * 
                 * @param id
                 * @param label
                 * @param gadgetConfig gadget config (object) or gadgetAction (string).
                 * @param dataClientFunction Name of the client function that provides the step data
                 */
                constructor(id: string, label: string, gadgetConfig: object | string, dataClientFunction?: string);

                /**
                 * Show a busy panel while the step is loading.
                 * @param showBusyPanelFlag
                 */
                setShowBusyPanel(showBusyPanelFlag: boolean): void;

                /**
                 * Add info content for the step. The content is displayed in a extra column or row.
                 * @param info
                 * @param info.title Adds a title to the info content (html markup is allowed)
                 * @param info.text Adds text to the info content (html markup is allowed)
                 * @param info.html Adds html content to the info content
                 */
                addInfo(info?: addInfo_info): void;

            }

            /**
             * Object to return XML to the client
             */
            class XML extends Transferable {
                /**
                 * 
                 * @param xml the xml to return to the client
                 * @param viewId the view id of the object  (The viewId specifies the destination in the DOM. This destination must exist otherwise the gadget is not rendered.)
                 */
                constructor(xml: string, viewId?: string);

                /**
                 * Make this object ready for beeing transferred to the client
                 * @returns
                 */
                transfer(): string;

            }

        }

        namespace util {
            /**
             * Global object holding various functions for the processing of function objects
             */
            namespace FunctionUtils {
                /**
                 * Object describing a function that can be attached to a transferable object.
                 */
                interface FunctionObject {
                    /**
                     * true, if function will be used as handler
                     */
                    isHandler: boolean;
                    /**
                     * always true
                     */
                    isGadgetFunction: boolean;
                    /**
                     * string containting the function
                     */
                    functionString: string;
                    /**
                     * string of the function's body
                     */
                    functionBody: string;
                }

                /**
                 * Returns an object holding a function which can be attached to some transferable objects.
                 * @param functionString the String containing the function (can contain multiple functions)
                 * @param isHandler sets weather this function will be uses as a handler
                 * @returns the created object holding the function
                 */
                function getFunctionObject(functionString: Function | string, isHandler?: boolean): FunctionObject;

            }

            /**
             * otris.gadget.util.FileUtils is a static object containing utility-FUNCTIONS used to read FileTypes and Files from the Documents Database
             */
            namespace FileUtils {
                /**
                 * returns a list of ergonomic names of files of a specific filetype
                 * @param fileType the name of the fileType
                 * @param locale the locale to use for retrieving the names
                 */
                function getErgFields(fileType: string, locale: string): void;

                /**
                 * Returns a list of technical field names of a specific filetype
                 * @param fileType the name of the fileType
                 */
                function getFields(fileType: string): void;

                /**
                 * Returns a FileResultSet of a specific fileType
                 * @param fileType the name of the fileType
                 * @param searchExpression the searchExpression to filter the result
                 */
                function getFileResultSet(fileType: string, searchExpression: string): void;

                /**
                 * Returns a list of all available fileTypes
                 */
                function getFileTypeList(): void;

            }

            /**
             * Global Object holding general functions for data processing
             */
            namespace DataUtils {
                /**
                 * Returns an data object to use with an ExtTable based on a FileResultSet (Useful for displaying lists of Files in an ExtTable Element).
                 * @param myFRS the FileResultset where the files should be retrieved from
                 * @param myFields an array of fieldnames to display in the table (set null for all fields)
                 * @param start the starting row of the resultset (optional)
                 * @param limit the amount of rows that should be retrieved from the resultset (optional)
                 */
                function getTableData(myFRS: FileResultset, myFields: string[], start: number, limit: number): void;

            }

        }

        namespace WizardData {
            /**
             * Checks if the current gadget is running in a wizard
             * @returns inWizard - Is the current gadget running in a wizard
             */
            function isWizardStep(): boolean;

            /**
             * Add a button to the current wizard step that will be displayed before the other buttons (prev, next, cancel)
             * @param containerButtonConfig button config object
             */
            function addStepButton(containerButtonConfig: ContainerButtonConfig): void;

            /**
             * Get a reference to the data of the previous step
             * @returns stepData - data of the previous step
             */
            function getDataFromPreviousStep(): object;

            /**
             * Get a reference to the step data defined by the `stepId`
             * @param stepId - id of the step
             * @returns stepData - data of the step
             */
            function getStepData(stepId?: string): object;

            /**
             * Get a reference to wizard data
             * @returns wizardData - wizard data (saved with stepIds as keys)
             */
            function getData(): object;

        }

    }

}

declare interface ColumnDefinition {
    /**
     * The header of the column
     */
    header: string;
    /**
     * The property of the data object where the data for this column can be found,
     */
    dataIndex: string;
    /**
     * The minimal width of the column,
     */
    minWidth: number;
    /**
     * The maximum width of the column
     */
    maxWidth: number;
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

declare interface ContainerButtonConfig {
    /**
     * button id (optional since `Documents 6.0`, use attribute `name` instead to identify the button)
     */
    id?: string;
    /**
     * button name (since: `Documents 6.0`)
     */
    name?: string;
    /**
     * button label
     */
    label: string;
    /**
     * set the button position (possible values: `top`,`bottom`)
     */
    position?: "top" | "bottom";
    /**
     * additional css rules for the button (since: `Documents 5.0f`)
     */
    style?: string;
    /**
     * button icon, eg. `entypo:folder;color:red;`. For syntax details see [Icon HowTo](../../howto/design/icons.html) (since: `Documents 5.0f`)
     */
    icon?: string;
    /**
     * button tooltip (since: `Documents 5.0f`)
     */
    tooltip?: string;
    /**
     * additional css rules for the label of the button (since: `Documents 5.0f`)
     */
    labelStyle?: string;
    /**
     * show as button or move to list of actions
     */
    type?: "button" | "list";
    /**
     * apply a predefined style to the button (since: `Documents 5.0f`)
     */
    styleType?: "main" | "commit" | "cancel";
    /**
     * name of the client function to execute on click
     */
    clickFunction: string;
    disabled?: boolean;
}

declare interface gadgetResizeObserver_options {
    /**
     * current width
     */
    width: number;
    /**
     * current height
     */
    height: number;
    /**
     * rect ({@link https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly DOMRectReadOnly})
     */
    rect: any;
    /**
     * entry ({@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry ResizeObserverEntry}) This object is not available in the initial (first) call.
     */
    entry?: any;
}

/**
 * Resize observer function.
 * @param target - the gadget container
 * @param options
 * @param options.width - current width
 * @param options.height - current height
 * @param options.rect - rect ({@link https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly DOMRectReadOnly})
 * @param options.entry - entry ({@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry ResizeObserverEntry}) This object is not available in the initial (first) call.
 */
declare type gadgetResizeObserver = (target: any, options?: gadgetResizeObserver_options)=>void;

declare interface DialogOptions {
    /**
     * Specifies the title of the dialog.
     */
    title: string;
    /**
     * The width of the dialog, in pixels.
     */
    width?: number;
    /**
     * The height of the dialog.
     */
    height?: number;
    /**
     * The minimum height to which the dialog can be resized, in pixels.
     */
    minHeight?: number;
    /**
     * The maximum height to which the dialog can be resized, in pixels.
     */
    maxHeight?: number;
    /**
     * The minimum width to which the dialog can be resized, in pixels.
     */
    minWidth?: number;
    /**
     * The maximum width to which the dialog can be resized, in pixels.
     */
    maxWidth?: number;
    /**
     * Specifies where the dialog should be displayed when opened. (<a href="https://api.jqueryui.com/dialog/#option-position"/>https://api.jqueryui.com/dialog/#option-position</a>)
     */
    position?: object;
    /**
     * If set to true, the dialog will be resizable.
     */
    resizable?: boolean;
    /**
     * Specify additional classes to add to the widget's elements.
     */
    classes?: string;
}

declare interface addPdfButton_config {
    /**
     * filename of the pdf for download
     */
    fileName?: string;
    /**
     * style for the pdf button to be applied to
     */
    buttonStyle?: string;
    /**
     * open document after download, default is true (since 5.0e HFII)
     */
    openDocument?: boolean;
    /**
     * callback to be executed before generating the pdf (since 5.0e HFII)
     */
    beforeSend?: Function;
}

declare interface setContainerButtons_options {
    /**
     * css styles added to the top button container
     */
    topStyle?: string;
    /**
     * css styles added to the bottom button container
     */
    bottomStyle?: string;
    /**
     * Collapse overlapping buttons in a magic button. (default: true, since DOCUMENTS 6.0)
     */
    magicButton?: boolean;
    /**
     * set a predefined style type for the top button container (available types: `fileviewHeader`, see example for details)
     */
    topStyleType?: "fileviewHeader" | string | object;
    /**
     * set a predefined stye type for the bottom button container
     */
    bottomStyleType?: string | object;
}

/**
 * Callback function which processes the data of the submitted form
 */
declare type dropFormProcessCB = ()=>void;

declare interface DropFormConstructor_dropConfiguration {
    /**
     * callback function which processes the data of the submitted form
     */
    processCallback: dropFormProcessCB;
    /**
     * `true` for adding the default buttons or a custom container button configuration (see: {@link otris.gadget.gui.DropForm#setContainerButtons})
     */
    buttons: boolean | object;
}

declare interface setReloadOnChange_options {
    /**
     * the form is not sent until the value does not change for the given `delay` of time in milliseconds
     */
    delay?: number;
}

/**
 * The field object used by the validator function
 */
declare interface GadgetFormField {
    /**
     * input field id
     */
    id: string;
    /**
     * type of the input field
     */
    type: string;
    /**
     * value of the input field
     */
    value: string;
}

declare interface validatorFunction_options {
    /**
     * reference to the {@link documents.sdk.DocumentsContext}
     */
    documentsContext: documents.sdk.DocumentsContext;
}

/**
 * The validator function The field object contains a single field if this validator function is used by {@link otris.gadget.gui.Element#setValidator} The field object contains multiple fields if this validator function is used by {@link otris.gadget.gui.Form#setFormValidator}
 * @param field - single input field information or object containing mutliple field informations
 * @param gadgetForm - reference to the {@link documents.sdk.gadget.GadgetForm}
 * @param options - options
 * @param options.documentsContext - reference to the {@link documents.sdk.DocumentsContext}
 * @returns - validation result should be generated via {@link documents.sdk.gadget.GadgetForm}
 */
declare type validatorFunction = (field: GadgetFormField | object, gadgetForm: documents.sdk.gadget.GadgetForm, options: validatorFunction_options)=>validationResult;

/**
 * The validation result
 */
declare interface validationResult {
    /**
     * information of the validated field (not available if result of {@link otris.gadget.gui.Form#setFormValidator})
     */
    field?: GadgetFormField;
    /**
     * whether the validation was successful
     */
    successful: boolean;
    /**
     * the error message displayed on failed validation
     */
    errorMessage: string;
    /**
     * optional properties
     */
    options?: object;
}

declare interface setAutoOverrideDefaults_options {
    /**
     * the boolean value whether to override the elements values
     */
    active?: boolean;
    /**
     * clear the value of a field if it is not present in the submitted form data (only relevant if `active` is set to `true`)
     */
    clearUnsubmitted?: boolean;
}

declare interface failedValidationHandlerFunction_validationResult {
    /**
     * object containing one validation result for each field of the form
     */
    resultObject: object;
    /**
     * the jquery object of the entire form
     */
    formJqueryObject: object;
    /**
     * a reference to the {@link documents.sdk.DocumentsContext}
     */
    documentsContext: documents.sdk.DocumentsContext;
}

/**
 * The failed validation handler function
 * @param validationResult - the object containing all informations about executed {@link validatorFunction}
 * @param validationResult.resultObject - object containing one validation result for each field of the form
 * @param validationResult.formJqueryObject - the jquery object of the entire form
 * @param validationResult.documentsContext - a reference to the {@link documents.sdk.DocumentsContext}
 */
declare type failedValidationHandlerFunction = (validationResult: failedValidationHandlerFunction_validationResult)=>void;

/**
 * Text field button
 */
declare interface TextFieldButton {
    /**
     * name of a client function (The function is call with the following parameters: `event, fieldValue, fieldDomElement`)
     */
    action: string;
    /**
     * tooltip for the button
     */
    tooltip?: string;
    /**
     * icon for the button
     */
    icon?: string;
}

declare interface addTextField_options {
    /**
     * button configuration
     */
    button?: TextFieldButton;
}

declare interface addTranslationField_options {
    /**
     * type of the field, available are input/text, textarea and htmlField
     */
    type: string;
}

declare interface DropzoneValue {
    /**
     * filename of the uploaded file
     */
    fileName: string;
    /**
     * token to access the file in the portal script
     */
    accessToken: string;
}

declare interface addDropzone_dropzoneConfig {
    /**
     * allow multiple uploads
     */
    multiple?: boolean;
    /**
     * height in pixel
     */
    height?: number;
    /**
     * additional css styles (e.g.: background-color:#333;color:#fff;)
     */
    style?: string;
    /**
     * icon for the dropzone
     */
    icon?: string;
    /**
     * label for the dropzone (if set to `false` the label-tag will not be generated)
     */
    label?: string | boolean;
    /**
     * additional css styles for the label (e.g.: font-size:32px;font-weight:bold;)
     */
    labelStyle?: string;
    /**
     * allowed extensions
     */
    extensions?: string[];
    /**
     * max file size (in bytes)
     */
    maxSize?: number;
    /**
     * position of the list of the uploaded files
     */
    listPosition?: 'top' | 'bottom';
    /**
     * name of a client function that will be called after a successful upload. called once for multiple selection. (since: `Documents 5.0g HF2`)
     */
    onFinish?: string;
    /**
     * name of a client function that will be called if a list entry is clicked in readonly mode. (since: `Documents 5.0i`)
     */
    onClickEntry?: string;
}

declare interface addHtmlField_editorConfig {
    /**
     * configuration for the CKEditor ([https://ckeditor.com/](https://ckeditor.com/))
     */
    ckEditor?: object;
}

/**
 * 
 * @param name name of the horizontal ruler
 * @param isOpen `true` if the horizontal ruler is open
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 */
declare type beforeRulerStateChange = (name: string, isOpen: boolean, documentsContext: documents.sdk.DocumentsContext)=>void;

/**
 * 
 * @param name name of the horizontal ruler
 * @param isOpen `true` if the horizontal ruler is open
 * @param documentsContext the <code>DocumentsContext</code> passed to `fn`
 */
declare type afterRulerStateChange = (name: string, isOpen: boolean, documentsContext: documents.sdk.DocumentsContext)=>void;

declare interface addHorizontalRuler_options {
    /**
     * the view type changes the rendering of the ruler (possible values: `default`, `small`)
     */
    size?: string;
    /**
     * icon for the _open state_
     */
    iconOpened?: string;
    /**
     * icon for the _closed state_
     */
    iconClosed?: string;
    /**
     * Handlebars template for the ruler label. In the template the objects `field` and `model` (*labelModel*) are available (since `DOCUMENTS 5.0h`)
     */
    labelTemplate?: string;
    /**
     * data which is provided as `model` in the handlebars template (since `DOCUMENTS 5.0h`)
     */
    labelModel?: string;
    /**
     * tooltip to be displayed when hovering the ruler
     */
    tooltip?: string;
    /**
     * callback called before the ruler state changes (returning `false` in this callback prevents the state change).
     */
    beforeStateChange?: beforeRulerStateChange;
    /**
     * callback called after the ruler state changes.
     */
    afterStateChange?: afterRulerStateChange;
}

declare interface addCheckbox_options {
    /**
     * the initial check state
     */
    checked?: boolean;
    /**
     * use this flag to vertically center a checkbox with a another inline field element (since `DOCUMENTS 5.0g HF2`)
     */
    verticalCentered?: boolean;
}

declare interface addButton_options {
    /**
     * additional css rules for the button
     */
    style?: string;
    /**
     * button icon, eg. `entypo:folder;color:red;`. For syntax details see [Icon HowTo](../../howto/design/icons.html)
     */
    icon?: string;
    /**
     * button tooltip
     */
    tooltip?: string;
    /**
     * additional css rules for the label of the button
     */
    labelStyle?: string;
    /**
     * Set to `true` to correct the vertical alignment of the button when it is displayed in the same line as an field (since: `Documents 5.0h`)
     */
    labelPadding?: boolean;
}

declare interface addGadgetActionButton_options {
    /**
     * opens the gadget in a new dialog
     */
    newWindow?: boolean;
    /**
     * the options to configure the appearance of the new dialog { title: "Dialog-Title" }
     */
    windowOptions?: object;
    /**
     * whether the actionButton validates the form
     */
    validateForm?: boolean;
    /**
     * Lock the target gadget container after clicking the button. (since: `Documents 5.0e`)
     */
    showBusyPanel?: boolean;
    /**
     * additional css rules for the button (since: `Documents 5.0f`)
     */
    style?: string;
    /**
     * button icon, eg. `entypo:folder;color:red;`. For syntax details see [Icon HowTo](../../howto/design/icons.html) (since: `Documents 5.0f`)
     */
    icon?: string;
    /**
     * button tooltip (since: `Documents 5.0f`)
     */
    tooltip?: string;
    /**
     * additional css rules for the label of the button (since: `Documents 5.0f`)
     */
    labelStyle?: string;
    disabled?: boolean;
    /**
     * Set to `true` to correct the vertical alignment of the button when it is displayed in the same line as an field (since: `Documents 5.0h`)
     */
    labelPadding?: boolean;
}

declare interface addHeadLine_options {
    /**
     * name to identify the field*
     */
    name?: string;
    /**
     * set the importance of the headline (1-6)
     */
    importance?: number;
    /**
     * allow html code for the content of the headline (since: `Documents 5.0g`)
     */
    allowHtml?: boolean;
    /**
     * By default the html code is sanitized before added to the DOM to prevent XSS attacks. With this flag you can disable this mechanism. (since: `Documents 5.0g`)
     */
    sanitize?: boolean;
}

declare interface addHtml_options {
    /**
     * name to identify the field
     */
    name?: string;
    /**
     * If model given the htmlCode is treated as handlebars template string and *executed* with this model (During transportation the model is serailized with `JSON.stringify()`).
     */
    model?: object;
    /**
     * Add top padding with height of the label of a form field
     */
    labelPadding?: boolean;
    /**
     * By default the html code is sanitized before added to the DOM to prevent XSS attacks. With this flag you can disable this mechanism.
     */
    sanitize?: boolean;
}

declare interface addPlainText_options {
    /**
     * name to identify the field
     */
    name?: string;
    /**
     * Add top padding with height of the label of a form field
     */
    labelPadding?: boolean;
}

declare interface addAutoCompleteField_autoCompleteConfig {
    /**
     * the name of the autoComplete script to execute.
     */
    scriptName: string;
    /**
     * max results
     */
    maxResults?: number;
    /**
     * min query length
     */
    minQueryChars?: number;
    /**
     * delay in seconds
     */
    queryDelay?: number;
    /**
     * auto select first result
     */
    autoSelectFirstResult?: boolean;
    /**
     * optional script parameter
     */
    scriptParams?: object;
    /**
     * Use the autocomplete field as reference field. See example for details (since: `Documents 5.0e`)
     */
    isReference?: boolean;
}

declare interface FullCalendarEvents {
    /**
     * A id for the event
     */
    id: string | number;
    /**
     * The date/time an event begins (A Moment-ish input, like an ISO8601 string).
     */
    start: string;
    /**
     * The exclusive date/time an event ends (A Moment-ish input, like an ISO8601 string).
     */
    end?: string;
    /**
     * The text on an event's element
     */
    title: string;
}

declare interface FullCalendarSource {
    /**
     * A id for this event source
     */
    id: string;
    /**
     * Sets every Event Object's color for this source.
     */
    color: string;
    /**
     * Sets every Event Object's textColor for this source.
     */
    textColor: string;
}

/**
 * Double click function
 * @param event - Event
 * @param dateString - The date as string of the clicked item
 * @param documentsContext - The DocumentsContext instance
 */
declare type doubleClickFunction = (event: object, dateString: string, documentsContext: documents.sdk.DocumentsContext)=>void;

declare interface setStore_store {
    /**
     * sort type `field` or `script`
     */
    type: string;
    /**
     * field name for the store type `field`
     */
    fieldName?: string;
    /**
     * script name for the store type `script` (Script parameter `gentableData` contains the grid data)
     */
    scriptName?: string;
    /**
     * optional script parameter
     */
    scriptParams?: object;
}

declare interface addProperty_options {
    /**
     * description for the property (used for a tooltip for example)
     */
    description?: string;
    /**
     * set a custom height (in pixel) for the grid row
     */
    height?: number;
    /**
     * used as options if the *editorType* is `SELECT`. Simple array with values or array of objects (key, label, description)
     */
    selectOptions?: string[] | object[];
    /**
     * key of the select option
     */
    "selectOptions.key": string;
    /**
     * optional label
     */
    "selectOptions.label"?: string;
    /**
     * optional description
     */
    "selectOptions.description"?: string;
    /**
     * default value
     */
    default?: string | number | boolean;
}

declare interface setColumnOptions_options {
    /**
     * label for the key column
     */
    keyLabel?: string;
    /**
     * label for the value column
     */
    valueLabel?: string;
    /**
     * width of the key column in pixel
     */
    keyWidth?: number;
    /**
     * width of the value column in pixel
     */
    valueWidth?: number;
    /**
     * selection type for the property keys (possible values: `text` or `select`)
     */
    keySelectionType?: string;
    /**
     * autocomplete configuration (only works with *keySelectionType* `text`)
     */
    keyAutoComplete?: object;
    /**
     * gadget action which returns the suggested values
     */
    "keyAutoComplete.gadgetAction": object;
    /**
     * Number of characters that must be entered for the autocompletion script to run.*
     */
    "keyAutoComplete.minQueryChars"?: number;
    /**
     * Delay script execution in milliseconds after user input
     */
    "keyAutoComplete.queryDelay"?: number;
    /**
     * Maximum number of suggestions displayed.
     */
    "keyAutoComplete.maxResults"?: number;
    /**
     * Automatically select the first hit
     */
    "keyAutoComplete.autoFocusResult"?: boolean;
    /**
     * if set to true the key column is readonly
     */
    keyReadonly?: boolean;
    /**
     * Show or hide the checkbox column
     */
    checkboxColumn?: boolean;
}

declare interface setGridButtons_buttons {
    /**
     * button id (available `add`, `remove`, `up`, `down`)
     */
    id?: string;
}

declare interface setAutoHeight_autoHeight {
    /**
     * enable/disable auto height mechanism
     */
    enabled?: boolean;
    /**
     * maxHeight for auto height mechanism
     */
    maxHeight?: number;
}

/**
 * Dialog action function
 * @param selectedIds - The date as string of the clicked item
 * @param documentsContext - The DocumentsContext instance
 */
declare type dialogActionCallback = (selectedIds: string[], documentsContext: documents.sdk.DocumentsContext)=>void;

declare interface TableDataColumn {
    /**
     * column key (must match a database column name)
     */
    key: string;
    /**
     * column key
     */
    label: string;
    /**
     * data type of this column (STRING, NUMBER, CUSTOM or CHECKBOX)
     */
    dataType: string;
    /**
     * define how the search on this colum is processed. Possible values: <strong>default</strong> (columnName LIKE '%EXPR%'), <strong>exact</strong> (columnName = 'EXPR'), <strong>start</strong>  (columnName LIKE 'EXPR%'), <strong>end</strong> (columnName LIKE '%EXPR')
     */
    searchMode: string;
    /**
     * set to false to exclude this column from search
     */
    searchable: boolean;
    /**
     * search this column case sensitive (database must support this)
     */
    searchCaseSensitive: boolean;
}

declare interface TableDataMapping {
    /**
     * database column containing the value for the field
     */
    columnName: string;
    /**
     * the technical name of the field to fill with the given value
     */
    fieldName: string;
    /**
     * optional callback function to manipulate the value from the database colum. function valueCallback(value, documentsContext, item, mappingConfig) {}
     */
    valueCallback: Function;
}

declare interface addBubble_config {
    /**
     * Unique identifier for this bubble (The bubbleOnClick function is called with this id as parameter)
     */
    id: string;
    /**
     * The content to display in the bubble (can contain html)
     */
    content: string;
    /**
     * Highlight the bubble
     */
    highlight?: boolean;
    /**
     * Additional css class to add to the bubble
     */
    cssClass?: string;
    /**
     * The title that is displayed at the top of the bubble
     */
    title?: string;
    /**
     * Name of a client function to be executed on click (function is called with bubble id as parameter). Set to `false` to disable onClick for this bubble. *(since Documents 5.0e)*
     */
    onClick?: string | boolean;
}

declare interface showNavigation_options {
    /**
     * show or hide the navigation.
     */
    enable?: boolean;
    /**
     * show the navigation as row (`top`) or as  column (`left`)
     */
    position?: string;
    /**
     * width of the navigation column (ignored for position `top`)
     */
    width?: string;
}

declare interface showInfoContent_options {
    /**
     * show or hide the info content row/column.
     */
    enable?: boolean;
    /**
     * show the info content as column (`left`) or row (`top`)
     */
    position?: string;
    /**
     * width of the info column (ignored for position `top`)
     */
    width?: string;
}

declare interface addInfo_info {
    /**
     * Adds a title to the info content (html markup is allowed)
     */
    title?: string;
    /**
     * Adds text to the info content (html markup is allowed)
     */
    text?: string;
    /**
     * Adds html content to the info content
     */
    html?: string;
}

declare interface GadgetContext {
    /**
     * the current gadget id.
     */
    gadgetId: string;
    /**
     * name of the gadget script.
     */
    gadgetScript: string;
    /**
     * the current gadget action.
     */
    gadgetAction: string;
    /**
     * contains the defined gadget params (parameter from the gadget config).
     */
    gadgetParams?: { [key: string]: string };
    /**
     * contains the form data of a submitted gadget form.
     */
    formParams?: Object.<string, Array.<string>>;
    /**
     * `true` if gadget is executed in file context and file is in edit mode.
     */
    editMode: boolean;
}

declare interface GadgetVersionInformation {
    /**
     * version in x.x.x syntax
     */
    version: string;
    /**
     * build date
     */
    buildDate: string;
    /**
     * git revision
     */
    gitRevision: string;
}

/**
 * 
 * @param gadgetAction gadgetAction
 * @param options options
 * @param gadgetConfig complete gadget config
 * @returns gadget instance
 */
declare type SwitchEntryCallback = (gadgetAction: string, options: any, gadgetConfig: GadgetConfig)=>any;

/**
 * 
 * @param gadgetContext
 * @param otris - otris namespace
 * @returns gadget instance
 */
declare type GadgetActionFunction = (gadgetContext: GadgetContext, otris: otris)=>any;

/**
 * Gadget API module
 */
declare module 'gadgetAPI' {
    /**
     * Check if the current script call is a gadget call.
     * @returns
     */
    function isGadgetCall(): boolean;

    /**
     * 
     * @returns
     */
    function getChatInstance(): otris.gadget.gui.Chat;

    /**
     * 
     * @returns
     */
    function getChartInstance(): otris.gadget.gui.Chart;

    /**
     * 
     * @returns
     */
    function getDropFormInstance(): otris.gadget.gui.DropForm;

    /**
     * 
     * @returns
     */
    function getFormInstance(): otris.gadget.gui.Form;

    /**
     * 
     * @returns
     */
    function getElementInstance(): otris.gadget.gui.Element;

    /**
     * 
     * @returns
     */
    function getSelectableElementInstance(): otris.gadget.gui.SelectableElement;

    /**
     * 
     * @returns
     */
    function getOptionGroupInstance(): otris.gadget.gui.OptionGroup;

    /**
     * 
     * @returns
     */
    function getFullCalendarInstance(): otris.gadget.gui.FullCalendar;

    /**
     * 
     * @returns
     */
    function getGentableInstance(): otris.gadget.gui.Gentable;

    /**
     * 
     * @returns
     */
    function getHTMLInstance(): otris.gadget.gui.HTML;

    /**
     * 
     * @param message the message to display (since: Documents 5.0i HF3)
     * @param messageType the type of the message (error/info/warn) (since: Documents 5.0i HF3)
     * @returns
     */
    function getMessageInstance(message?: string, messageType?: string): otris.gadget.gui.Message;

    /**
     * 
     * @returns
     */
    function getPropertyGridInstance(): otris.gadget.gui.PropertyGrid;

    /**
     * 
     * @returns
     */
    function getScriptListWrapperInstance(): otris.gadget.gui.ScriptListWrapper;

    /**
     * 
     * @returns
     */
    function getScriptTreeInstance(): otris.gadget.gui.ScriptTree;

    /**
     * 
     * @returns
     */
    function getSettingsInstance(): otris.gadget.gui.Settings;

    /**
     * 
     * @returns
     */
    function getTableDataInstance(): otris.gadget.gui.TableData;

    /**
     * 
     * @returns
     */
    function getTimelineInstance(): otris.gadget.gui.Timeline;

    /**
     * 
     * @returns
     */
    function getTreeChartInstance(): otris.gadget.gui.TreeChart;

    /**
     * 
     * @returns
     */
    function getWizardInstance(): otris.gadget.gui.Wizard;

    /**
     * 
     * @param id
     * @param label
     * @param gadgetConfig gadget config (object) or gadgetAction (string)
     * @param dataClientFunction name of the client function that provides the step data
     * @returns
     */
    function getWizardStepInstance(id: string, label: string, gadgetConfig: string | object, dataClientFunction?: string): otris.gadget.gui.WizardStep;

    /**
     * 
     * @returns
     */
    function getXMLInstance(): otris.gadget.gui.XML;

    /**
     * Returns a reference to the gadgetContext object
     * @returns The otris namespace
     */
    function getGadgetContext(): GadgetContext;

    /**
     * Get the gadget api version information
     * @returns version information
     */
    function getVersionInfo(): GadgetVersionInformation;

    /**
     * Returns a reference to the `otris`-namespace
     * @returns The otris namespace
     */
    function getOtrisNamespace(): otris;

    /**
     * Register a gadget action.
     * @param gadgetAction gadget action name
     * @param actionFunction gadget action function
     * @returns
     */
    function registerGadgetAction(gadgetAction: string, actionFunction: GadgetActionFunction): otris.gadget.gui.XML;

    /**
     * Use this function to serialize and return the gadget instances.
     * @returns gadget instance serialized as string
     */
    function transfer(): string;

}

