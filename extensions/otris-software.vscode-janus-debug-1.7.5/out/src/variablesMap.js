"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariablesMap = exports.VariablesContainer = void 0;
const node_file_log_1 = require("node-file-log");
const cantor_1 = require("./cantor");
// tslint:disable-next-line:no-var-requires
const utf8 = require('utf8');
const log = node_file_log_1.Logger.create('VariablesMap');
class VariablesContainer {
    constructor(contextId) {
        this.contextId = contextId;
        this.variables = [];
    }
}
exports.VariablesContainer = VariablesContainer;
class VariablesMap {
    constructor() {
        this.variablesMap = new Map();
    }
    /**
     * Generates a unique reference for a variable based on his contextId, frameId and the hashValue of the variables name.
     * @param {number} contextId The context id.
     * @param {number} frameId The frame id.
     * @param {string} variableName The name of the variable.
     * @returns {VariablesReference} A unique variables reference.
     */
    createReference(contextId, frameId, variableName) {
        if (variableName === '') {
            throw new Error('Variables name cannot be empty.');
        }
        let hash = 0;
        for (let i = 0; i < variableName.length; i++) {
            const charCode = variableName.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;
            hash |= 0; // Convert to 32-bit integer
        }
        return (0, cantor_1.cantorPairing)(frameId, hash);
    }
    /**
     * Returns all variables with the passed references.
     * @param {VariablesReference} reference Variables reference.
     * @returns {VariablesContainer} The variables container for the given reference.
     */
    getVariables(reference) {
        const variables = this.variablesMap.get(reference);
        if (variables === undefined) {
            throw new Error(`Unable to get variables: No variable with reference ${reference}`);
        }
        else {
            return variables;
        }
    }
    setVariables(reference, container) {
        this.variablesMap.set(reference, container);
    }
    /**
     * Creates a variable based on the variableValue passed from the debugger.
     * The created variable(s) will be saved in an variables container in the variables map.
     * @param {string} variablesName The display name of the variable.
     * @param {any} variableValue The value of the variable.
     * @param {number} contextId The context id.
     * @param {number} frameId The frame id.
     * @param {string} [evaluateName] This param is need for evaluate variables that are properties of object or elements of arrays. For this variables we need also the name of their parent to access the value.
     */
    createVariable(variableName, variableValue, contextId, context, frameId, evaluateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof evaluateName === 'undefined') {
                evaluateName = '';
            }
            // log.info(`Creating variable ${variableName} with value ${variableValue}`);
            const variablesContainer = this.variablesMap.get(frameId) || new VariablesContainer(contextId);
            variablesContainer.evaluateName = evaluateName;
            // If the container already contains a variable with this name => update
            const variable = yield this._createVariable(variableName, variableValue, contextId, context, frameId, evaluateName);
            if (variablesContainer.variables.length > 0) {
                const filterResult = variablesContainer.variables.filter((element) => {
                    return element.name === variable.name;
                });
                if (filterResult.length > 0) {
                    // Update the entry
                    const index = variablesContainer.variables.indexOf(filterResult[0]);
                    variablesContainer.variables[index] = variable;
                }
                else {
                    variablesContainer.variables.push(variable);
                }
            }
            else {
                variablesContainer.variables.push(variable);
            }
            this.variablesMap.set(frameId, variablesContainer);
        });
    }
    /**
     * The main logic for variables creation.
     * This function creates based on the variables type one or more variables and chains them together with the variablesReference-property.
     * @param {string} variablesName The display name of the variable.
     * @param {any} variableValue The value of the variable
     * @param {number} contextId The context id.
     * @param {number} frameId The frame id.
     * @param {string} [evaluateName=variableName] This param is need for evaluate variables that are properties of object or elements of arrays. For this variables we need also the name of their parent to access the value.
     * @returns {Variable} A full qualified variable object
     */
    _createVariable(variableName, variableValue, contextId, context, frameId, evaluateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof evaluateName === 'undefined' || evaluateName === '') {
                evaluateName = variableName;
            }
            if (variableValue === '___jsrdbg_undefined___') {
                return {
                    name: variableName,
                    value: 'undefined',
                    type: 'undefined',
                    variablesReference: 0,
                };
            }
            // We have to differentiate between primitive types, arrays, objects, and functions.
            switch (typeof variableValue) {
                case 'string':
                    const utf8string = utf8.decode(variableValue);
                    return this.createPrimitiveVariable(variableName, utf8string, evaluateName);
                case 'number':
                case 'boolean':
                case 'undefined':
                    return this.createPrimitiveVariable(variableName, variableValue, evaluateName);
                case 'object':
                    if (variableValue === null) {
                        return this.createPrimitiveVariable(variableName, variableValue, evaluateName);
                    }
                    else if (variableValue.hasOwnProperty("length")) {
                        return yield this.createArrayVariable(variableName, variableValue, contextId, context, frameId, evaluateName);
                    }
                    else {
                        return yield this.createObjectVariable(variableName, variableValue, contextId, context, frameId, evaluateName);
                    }
                default:
                    throw new Error(`Unsupported variables type: ${typeof variableValue}`);
            }
        });
    }
    /**
     * Creates a variable object for primitive types.
     * @param {string} variableName The display name of the variable.
     * @param {any} variableValue The content of the variable.
     * @param {string} evaluateName This param is need for evaluate variables that are properties of object or elements of arrays. For this variables we need also the name of their parent to access the value.
     * @returns {Variable} A full qualified variables object.
     */
    createPrimitiveVariable(variableName, variableValue, evaluateName) {
        if (variableName === '') {
            throw new Error('Variables name cannot be empty.');
        }
        let variableType = typeof variableValue;
        if (variableValue === undefined) {
            variableValue = 'undefined';
            variableType = 'undefined';
        }
        else if (variableValue === null) {
            variableValue = 'null';
            variableType = 'object';
        }
        else {
            variableValue = variableValue.toString();
        }
        return {
            name: variableName,
            evaluateName,
            value: variableValue,
            type: variableType,
            variablesReference: 0,
        };
    }
    /**
     * Creates a variable object for array types.
     * @param {string} variableName The display name of the variable.
     * @param {Array.<any>} variableValue The content of the variable.
     * @param {string} evaluateName This param is need for evaluate variables that are properties of object or elements of arrays. For this variables we need also the name of their parent to access the value.
     * @returns {Variable} A full qualified variables object.
     */
    createArrayVariable(variableName, variableValue, contextId, context, frameId, evaluateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (variableName === '') {
                throw new Error('Variables name cannot be empty.');
            }
            // Variables container for the entries of the array
            const variablesContainer = new VariablesContainer(contextId);
            variablesContainer.evaluateName = evaluateName;
            // Arrays are returned as objects because the debugger represents the array elements as object properties.
            // The debugger also adds a length-property which represents the amount of elements inside the array.
            let index = 0;
            if (variableValue) {
                for (const key in variableValue) {
                    if (variableValue.hasOwnProperty(key)) {
                        const _variableName = (key === 'length') ? 'length' : index.toString();
                        const _evaluateName = (key === 'length') ? `${evaluateName}.length` : `${evaluateName}[${index.toString()}]`;
                        variablesContainer.variables.push(yield this._createVariable(_variableName, variableValue[key], contextId, context, frameId, _evaluateName));
                        index++;
                    }
                }
            }
            // Create a reference for the variables container and insert it into the variables map
            const reference = this.createReference(contextId, frameId, evaluateName);
            this.variablesMap.set(reference, variablesContainer);
            // Return a variable which refers to this container
            return {
                name: variableName,
                evaluateName,
                type: 'array',
                value: '[Array]',
                variablesReference: reference
            };
        });
    }
    generateExpression(variableName) {
        // if it's an object, request the string representation to parse it
        const stringifyFunctionsReplacer = (key, value) => {
            if (typeof value === "function") {
                return "function " + value.toString().match(/(\([^\)]*\))/)[1] + "{ ... }";
            }
            else {
                return value;
            }
        };
        const evaluateExpression = `
            DocFile.prototype.toJSON = function() {
                return JSON.parse(this.asJSON());
            };

            FileResultset.prototype.toJSON = function() {
                return {
                    getIds: this.getIds(),
                    size: this.size()
                };
            };

            HitResultset.prototype.toJSON = function() {
                return {
                    getHitIds: (typeof this.getHitIds === "function") ? this.getHitIds() : null,
                    size: this.size()
                }
            };

            Document.prototype.toJSON = function() {
                return {
                    fullname: this.fullname,
                    comment: this.comment,
                    encrypted: this.encrypted,
                    id: this.id
                };
            };

            Folder.prototype.toJSON = function() {
                return {
                    name: this.name,
                    type: this.type,
                    label: this.label
                };
            };

            Register.prototype.toJSON = function() {
                return {
                    name: this.name,
                    type: this.type,
                    label: this.label
                };
            };

            try {
                context.enableModules();
                var a = require("documents-to-json");
                JSON.stringify(a(${variableName}));
            } catch (err) {
                JSON.stringify(${variableName});
            }
        `;
        return evaluateExpression;
    }
    generateContextEvalExpr() {
        const evaluateExpression = `{
            actionName: context.actionName,
            clientId: context.clientId,
            currentUser: context.currentUser,
            document: context.document,
            errorMessage: context.errorMessage,
            event: context.event,
            file: context.file,
            fileType: context.fileType,
            folder: context.folder,
            register: context.register,
            returnType: context.returnType
        }`;
        return evaluateExpression;
    }
    evaluateObject(context, variableName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let _variableValue;
                    if (variableName === "context") {
                        const evaluateExpression = this.generateContextEvalExpr();
                        const contextString = yield context.evaluate(evaluateExpression);
                        /* tslint:disable-next-line */
                        eval("_variableValue = " + contextString.value + ";");
                    }
                    else {
                        const evaluateExpression = this.generateExpression(variableName);
                        _variableValue = yield context.evaluate2(evaluateExpression);
                        // log.debug(`Evaluate for variable ${variableName} succeeded with ${_variableValue} of type ${typeof _variableValue}`);
                        /* tslint:disable-next-line */
                        _variableValue = eval("_variableValue = " + _variableValue + ";");
                    }
                    // log.debug(`New variable value for variable ${variableName} => ${JSON.stringify(_variableValue)} => ${_variableValue} with type ${typeof _variableValue}`);
                    resolve(_variableValue);
                }
                catch (err) {
                    log.debug(`Evaluate for variable ${variableName} failed: ${JSON.stringify(err)} => ${err instanceof Error ? err.message : err}`);
                    reject();
                }
            }));
        });
    }
    // tslint:disable-next-line:member-ordering
    addObjectMembers(context, variablesContainer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (variablesContainer.variableName === undefined) {
                return;
            }
            if (variablesContainer.parentId === undefined) {
                return;
            }
            const variableName = variablesContainer.evaluateName || variablesContainer.variableName;
            log.debug(`addObjectMembers ${variableName} parent ${variablesContainer.parentId}`);
            const variableValue = yield this.evaluateObject(context, variableName);
            if (variableValue && !(variableValue instanceof Date)) {
                // log.debug(`variable value ${JSON.stringify(variableValue)}`);
                // Create a new variable for each property on this object and chain them together with the reference property
                for (const key in variableValue) {
                    if (variableValue.hasOwnProperty(key)) {
                        variablesContainer.variables.push(yield this._createVariable(key, variableValue[key], context.id, context, variablesContainer.parentId, `${variableName}.${key}`));
                    }
                }
            }
        });
    }
    /**
     * Creates a variable object for object types.
     * @param {string} variableName The display name of the variable.
     * @param {any} variableValue The content of the variable.
     * @param {string} evaluateName This param is need for evaluate variables that are properties of object or elements of arrays. For this variables we need also the name of their parent to access the value.
     * @returns {Variable} A full qualified variables object.
     */
    createObjectVariable(variableName, variableValue, contextId, context, frameId, evaluateName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (variableName === '') {
                throw new Error('Variables name cannot be empty.');
            }
            // log.debug(`Create an object variable for variable ${variableName} with value ${JSON.stringify(variableValue)} of type ${typeof variableValue}`);
            if (variableValue && variableValue.hasOwnProperty('___jsrdbg_function_desc___')) {
                // functions will be recognized as objects because of the way the debugger evaluate functions
                // actually this case was handled earlier, so probably this is never executed
                let functionParams = variableValue.___jsrdbg_function_desc___.parameterNames;
                functionParams = functionParams.toString().replace(/,/, ', ');
                log.debug('createObjectVariable ___jsrdbg_function_desc___ params: ' + functionParams);
                return this.createPrimitiveVariable(variableName, 'function (' + functionParams + ') { ... }', `${evaluateName}.${variableName}`);
            } // else
            const variablesContainer = new VariablesContainer(contextId);
            variablesContainer.variableName = variableName;
            variablesContainer.evaluateName = evaluateName;
            variablesContainer.parentId = frameId;
            const reference = this.createReference(contextId, frameId, evaluateName);
            this.variablesMap.set(reference, variablesContainer);
            return {
                name: variableName,
                evaluateName,
                type: 'object',
                value: (!variableValue || variableValue.constructor.name === "Date") ? variableValue : variableValue.constructor.name,
                variablesReference: reference
            };
        });
    }
}
exports.VariablesMap = VariablesMap;
//# sourceMappingURL=variablesMap.js.map