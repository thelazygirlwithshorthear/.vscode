const vscode = require('vscode');
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const format = require('xml-formatter'); 

/**
 * Writes into the settings.json file the new default values for the attribute(s) or save path
 */
async function modifySettings() {
    let options = JSON.parse(fs.readFileSync(__dirname+'/settings.json', 'utf8'));
    let optionTypes = ["Attributes default values", "Save location"];
    const newoptionTypes = await vscode.window.showQuickPick(optionTypes, {canPickMany: false, placeHolder:"Select what you want to modify."});
    console.log(newoptionTypes);
    if (newoptionTypes == "Attributes default values") {
        let optionAttributes = ['Anonymity', 'AllowDK', 'Decimals', 'MinResponse', 'MaxResponse'];
        const newoptionsAttributes = await vscode.window.showQuickPick(optionAttributes, {canPickMany: true, placeHolder: 'Select attribute(s) to change default value.' });
        for (let i = 0; i < newoptionsAttributes.length; i++) {
            switch (newoptionsAttributes[i]) {
                case 'Anonymity':
                await vscode.window.showQuickPick(['Yes', 'No'], {placeHolder: 'Please select a value for Anonymity:'}).then(value => {
                    if (value == 'Yes') {options.attributes.anonymity = '1'};
                    if (value == 'No') {options.attributes.anonymity = '0'};
                });
                break;
            
                case 'AllowDK':
                await vscode.window.showQuickPick(['Yes', 'No'], {placeHolder: 'Please select a value for AllowDK:'}).then(value => {
                    if (value == 'Yes') {options.attributes.allowdk = '1'}; 
                    if (value == 'No') {options.attributes.allowdk = '0'};
                });
                break;
            
                case 'Decimals':
                await vscode.window.showInputBox({placeHolder: 'Please enter a number for Decimals:'}).then(value => {
                    options.attributes.decimals = value;
                });
                break;
                
                default:
                break;
            }
        }
    } else if (newoptionTypes == "Save location") {
        const currentpath = await cp.execSync("cd "+options.savepath+ " && cd"); 
        await vscode.window.showOpenDialog({
            openLabel:"Select",
            defaultUri: vscode.Uri.parse('file:///'+currentpath.toString().trim()),
            canSelectFiles:false,
            canSelectFolders:true,
            canSelectMany:false
        }).then(value => {
                let newpath;
                if (value) {
                    if (value[0].path.charAt(0) == '/') {
                        newpath = value[0].path.substr(1);
                    } else {
                        newpath = value[0].path;
                    }
                    options.savepath = newpath;
                        vscode.window.showInformationMessage("New path saved.");
                } else {
                        vscode.window.showErrorMessage("Path not valid.");
                }
            }, 
                err => {if (err) throw err;
            });
    }
    fs.writeFile(__dirname+'\\settings.json', JSON.stringify(options), function(err){if (err) throw err;});
}


/**
 * Returns a string - removes invalid characters
 * @param {String} str Line from active editor
 */
function cleanCaption(str) {
    return str.replace(/(<\/)|<|([0-9]\.)|(-)|(Q[0-9]\.)|(Q[0-9])/g, '').trim();
}

/**
 * Returns a string without non ASCII characters
 * @param {string} str Selected text in editor (here the whole text) 
 */
function removeNonAsciiChar(str) {
    return str.replace(/[^\x00-\x7F]/g, '');
}


/**
 * Returns the long caption of a question
 * @param {Array} textAr Selected text in editor, which lines are elements of array
 */
function getQuestionLongCaption(textAr) {
    let caption = "";
    for (let i = 0; i < textAr.length; i++) {
        if (textAr[i].charAt(0).toUpperCase() == "Q") {
            caption = textAr[i].split(".")[1];
        }
    }
    return caption.trim();
}

/**
 * Returns the short caption of a question
 * @param {Array} textAr Selected text in editor, which lines are elements of array
 */
function getQuestionShortCaption(textAr) {
    let caption = "";
    for (let i = 0; i < textAr.length; i++) {
        if (textAr[i].charAt(0).toUpperCase() == "Q") {
            caption = textAr[i].split(".")[0];
        }
    }
    return caption.trim();
}

/**
 * Returns all the answers of a question
 * @param {Array} textAr Selected text in editor, which lines are elements of array
 */
function getAnswers(textAr) {
    let res = [];
    for (let i = 0; i < textAr.length; i++) {
        if (textAr[i].charAt(0).toUpperCase() != "Q") {
            res.push(textAr[i].trim());
        }
    }
    return res;
}

/**
 * Returns all the text of the active editor
 */
function getWholeText() {
    let editor = vscode.window.activeTextEditor;
    let firstLine = editor.document.lineAt(0);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textRange = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    return editor.document.getText(textRange);
}

/**
 * Returns the modalities of a question loop
 * @param {string} text Selected text in editor
 * @param {number} modalityAcc Accumulator for modalities id
 */
function getLoopModalities(text, modalityAcc) {
    let tmp = text.split("</Question>")[1].trim().split("\n"); //Loop modalities are written under the question in plain text
    let res = '<Modalities>\n';
    for (let i = 0; i < tmp.length; i++) {
        res += '<Modality ID="'+ modalityAcc +'">\n<ShortCaption>'+ tmp[i].trim() +'</ShortCaption>\n</Modality>\n';
        modalityAcc++;
    }
    res += '</Modalities>\n';
    return res;
}

/**
 * Returns the total number of routing in the whole text (from active editor)
 * (Next id available)
 */
function totalNumberRoutings() {
    return getWholeText().split("<Routing ").length;
}

/**
 * Returns the total number of responses in the whole text (from active editor)
 * (Next id available)
 */
function totalNumberR() {
    return getWholeText().split("<Modality").length;
}

/**
 * Returns the total number of question int the whole text (from active editor)
 * (Next id available)
 */
function totalNumberQ() {    
    return getWholeText().split("<Question ").length;
}


/**
 * Returns array of questions and answers that have been selected e.g. [Q1. blabla, 1. bla, 2. bla, Q2. bla]
 * @param {Array} textAr Selected text in editor, which lines are elements of textAr
 */
function initQuestionArray(textAr) {
    let res = [];
    let questionIndex = [];
    for (let i = 0; i < textAr.length; i++) {
        if (textAr[i].charAt(0).toUpperCase() == "Q") {
            questionIndex.push(i);
        }
    }
    for (let i = 0; i < questionIndex.length; i++) {
        if (i != questionIndex.length-1) {
            res.push(textAr.slice(questionIndex[i], questionIndex[i+1]));
        } else {
            res.push(textAr.slice(questionIndex[i], textAr.length));
        }
    }
    return res;
}

/**
 * Returns a string - Last chapter question
 */
function addEndChapter() {
    return '<Question ID="'+ totalNumberQ() +'" Shortcut="ChapterEnd" Order="" ElementType="chapter" Translated="0">\n<LongCaption>End</LongCaption>\n</Question>\n';
}

/**
 * Returns a boolean - true if the modality is exclusive else false
 * @param {String} answer A modality 
 */
function isExclusive(answer) {
    return (answer.toUpperCase().includes("NONE OF THESE") || answer.toUpperCase().includes("DK") || answer.toUpperCase().includes("EXCLUSIVE") || answer.toUpperCase().includes(" NA "));
}



/**
 * Returns the XML as a string, having each attribute Order of each question correctly set
 * @param {string} text Selected text in editor (here the whole text)
 */
function setOrder(text) {
    let acc = 1;
    let tmp = text.split("\n");
    let res = "";
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].includes('Order=""')) {
            tmp[i] = tmp[i].replace('Order=""', 'Order="'+acc+'"');
            acc++;
        }
        res += tmp[i]+"\n";
    }
    return res;
}

/**
 * Sets he attribute TargetQuestion to endId (id of chapter end) for all the routings
 * @param {string} text Whole text from active editor 
 */
function setTargetQ(text) {
    let tmp = text.split("\n");
    let res = '';
    let end = tmp.filter(line => line.includes('Shortcut="ChapterEnd"'));
    let endId = end[0].split('ID="')[1].split('"')[0];
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].includes('TargetQuestion') && tmp[i].includes('<Routing ')) {
            tmp[i] = tmp[i].replace('TargetQuestion=""', 'TargetQuestion="'+ endId +'"');
        }
        res += tmp[i]+"\n";
    }
    return res;
}

/**
 * Returns attributes of a question as a string, set with default values
 * @param {Number} id question id
 * @param {String} type question type 
 */
function setQuestionAttributes(id, type, modalities) {
    let options = JSON.parse(fs.readFileSync(__dirname+'\\settings.json', 'utf8')).attributes;
    let res = " ";
    res += 'ID="'+ id +'" ';
    res += 'Shortcut="Q'+ id +'" ';
    res += 'Order="" ';
    res += 'ElementType="question" ';
    if (type == "single") {
        res += 'QuestionType="closed" ';
        res += 'MinResponse="1" ';
        res += 'MaxResponse="1" ';
    } else if (type == 'multi') {
        res += 'QuestionType="closed" ';
        res += 'MinResponse="1" ';
        res += 'MaxResponse="' + ((modalities.split('<Modality').length-1) - (modalities.split('Exclusive=').length-1)) + '" ';
    } else {
        res += 'QuestionType="'+ type +'" ';
    }
    res += 'Anonymity="'+ options.anonymity +'" ';
    res += 'AllowDK="'+ options.allowdk +'" ';
    if (type == "numeric") {
        res += 'Decimals="'+ options.decimals +'" ';
    }
    res += 'Translated="0" ';

    return res;
}

/**
 * Add routing into the editor
 * @param {*} selection Selection in active editor
 */
function setRoutings(selection) {
    let editor = vscode.window.activeTextEditor;
    let text = editor.document.getText(selection);
    let modalityId = text.split('ID="')[1].split('"')[0];
    let newRouting = '';
    newRouting += '<Routing ID="'+ totalNumberRoutings() +'" Type="22" TargetQuestion="">\n';
    newRouting += '<Condition ConditionType="12" Responses="'+ modalityId +'"/>\n';
    newRouting += '</Routing>\n';
    let begin = editor.selection.end.line;
    let line = editor.document.lineAt(begin);
    while (!line.text.includes('<Routings>')) {
        begin++;
        line = editor.document.lineAt(begin);
    }
    let beginLine = line;
    let end = begin;
    while (!line.text.includes('</Routings>')) {
        end++;
        line = editor.document.lineAt(end);
    }
    let endLine = line;
    let textRange = new vscode.Range(begin ,beginLine.range.start.character, end, endLine.range.end.character);
    let routings = editor.document.getText(textRange).split('</Routings>')[0];
    routings += newRouting+'</Routings>';
    editor.edit(editBuilder => {editBuilder.replace(textRange, routings)});
}

/**
 * Returns a string with the chapter containing the selected question(s) (in 'text')
 * @param {string} text Selected text in editor
 */
function setQuestionInChapter(text) {
    let tmp = text.split("\n");
    let chapter = "";
    let question = "<Questions>\n";
    let sep = true;
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].includes("</Question>") && sep){
            sep = false;
            tmp.splice(i,1);
        }
        if (sep) {
            chapter += tmp[i].trim()+"\n";
        } else {
            question += tmp[i].trim()+"\n";
        }
    }

    return chapter+question+"</Questions>\n</Question>";
}


/**
 * Returns the XML for defining a chapter, as a string
 * @param {string} text Selected text in editor 
 */
function setChapter(text) {
    let questionID = totalNumberQ();
    let res = '<Question '
    res += 'ID="'+ questionID +'" ';
    res += 'Shortcut="chapter '+ getWholeText().split('ElementType="chapter"').length +'" ';
    res += 'Order="" ';
    res += 'ElementType="chapter" >\n';
    res += '<LongCaption>'+ text.trim() +'</LongCaption>\n</Question>';

    return res;
}

/**
 * Returns XML for defining a question loop, as a string
 * @param {string} text Selected text in editor
 */
function setLoop(text) {
    let question = text.split("<Modalities")[0].replace('Order=""', 'Order="1"');
    let responses = text.split("</LongCaption>")[1].split("</Question>")[0];
    let shortcut = text.split('Shortcut="')[1].split('"')[0];
    let loopModalities = getLoopModalities(text, totalNumberR());
    let res = '<Question ID="'+ totalNumberQ() +'" Shortcut="Loop '+ shortcut +'" Order="" ElementType="loop" QuestionType="table" Translated="0">\n';
    res += '<LongCaption>Loop '+ shortcut +'</LongCaption>\n';
    res += loopModalities;
    res += '<Questions>\n'+ question.split("</Question>")[0];
    res += '<ShortCaption>??Loop '+ shortcut +'??</ShortCaption>';
    res += responses+'</Question>\n</Questions>\n</Question>';

    return res;
}

/**
 * Converts selected plain text modalities into XML modalities
 * Returns a string
 * @param {String[]} modalities Selected text splited by lines 
 * @param {Number} modalityAcc Modality id
 */
function modalityToXml (modalities, modalityAcc) {
    let res = '<Modalities>\n';
    
    for (let i = 0; i < modalities.length; i++) {     
        if (isExclusive(modalities[i])) {
            res +='<Modality ID="'+ modalityAcc +'" Exclusive="1" Behavior="1">\n<ShortCaption>'+ cleanCaption(modalities[i].replace("CLOSE","").trim()) +"</ShortCaption>\n</Modality>\n";
            modalityAcc++;
        } else {
            res +='<Modality ID="'+ modalityAcc +'">\n<ShortCaption>'+ cleanCaption(modalities[i]) +"</ShortCaption>\n</Modality>\n";
            modalityAcc++;
        }
    }
    res += '</Modalities>\n';
    return res;
}

/**
 * Returns XML of a question as a string
 * @param {String} text Selected question and modalities in text editor
 * @param {String} type Question type
 */
function questionToXml(text, type) {
    let question, modalities;
    if (type == 'single'|| type == 'multi') {
        question = text.split('<Modalities>')[0];
        modalities = '<Modalities>' + text.split('<Modalities>')[1];
    } else {
        question = text;
    }
    let res = '<Question'+ setQuestionAttributes(totalNumberQ(), type, modalities) +'>\n';
    res += "<LongCaption>"+ cleanCaption(question) +"</LongCaption>\n";
    if (type == 'single' || type == 'multi') {
        res += modalities;
    }
    res += "<Routings>\n</Routings>\n</Question>\n";
    
    return res;
}

/**
 * Final step of XML editing. 
 * Sets the tags for xml version, Survey, Languages
 * Sets the attribute Order for all the questions
 * Formats the XML to make it more readable
 */
function finishXml() {
    let xml = getWholeText();
    let finalxml = '<?xml version="1.0" encoding="utf-8" ?>\n';
    finalxml += '<Survey Version="1.0" Full="1" MaxQuestionID="'+ totalNumberQ() +'" MaxResponseID="'+ totalNumberR() +
                '" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="new_askia_flexible.xsd">\n';
    finalxml += '<Languages>\n<Language ID="2057" Abbr="ENG" Name="English (United Kingdom)" Default="1"/>\n</Languages>\n';
    finalxml += '<Questions>\n'+ xml + '\n' + addEndChapter() +'</Questions>\n';
    finalxml += '</Survey>';
    finalxml = setOrder(finalxml);
    finalxml = setTargetQ(finalxml);
    finalxml = removeNonAsciiChar(finalxml);
    finalxml = formatAllXml(finalxml);

    fs.writeFile(__dirname + '\\tmp.xml', finalxml, function (err) {
        if (err) throw err;        
    });
    let uri = vscode.Uri.file(__dirname+"\\tmp.xml");
    vscode.workspace.openTextDocument(uri).then((succ) => {
        vscode.window.showTextDocument(succ);
    });
}

function formatAllXml(xml) {
    let tab = xml.split("\n");
    for (let i = 0; i < tab.length; i++) {
        tab[i] = tab[i].trim();
    }
    xml = tab.join("");
    xml.replace(/\r\n/g, "");
    xml = format(xml, {stripComments: false});
    let editor = vscode.window.activeTextEditor;
    let firstLine = editor.document.lineAt(0);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textRange = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    editor.edit((editBuilder) => {editBuilder.replace(textRange, xml)});
    return xml;
}

function cleanTmp() {
    fs.writeFile(__dirname+'\\tmp.xml', '', (err) => {if (err) throw err;});
}

async function setAskiaDesignPath() {
    let options = JSON.parse(fs.readFileSync(__dirname+'\\settings.json', 'utf8'));
    if (options.designpath == '') {
        const cmd = await cp.execSync('Cd\\ & dir /b/s Design.exe');
        options.designpath = path.dirname(cmd.toString());
        fs.writeFile(__dirname+'\\settings.json', JSON.stringify(options), function(err){if (err) throw err;});
        vscode.window.showInformationMessage("AskiaDesign path is set.");
    }
}

// this method is called when the extension is activated
function activate(context) {
    
    let settings = vscode.commands.registerCommand('extension.defaultSettings', () => {modifySettings()});

    let modToXml = vscode.commands.registerCommand('extension.modalityToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        let textAr = text.split("\n").filter(line => line.length > 1);

        editor.edit((editBuilder) => {editBuilder.replace(editor.selection, modalityToXml(textAr, totalNumberR()))});
    });
    
    let qclosedSingleToXml = vscode.commands.registerCommand('extension.closedSingleToXml',  () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);

        editor.edit((editBuilder) => {editBuilder.replace(editor.selection, questionToXml(text, "single"))});
    });

    let qclosedMultiToXml = vscode.commands.registerCommand('extension.closedMultiToXml',  () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);

        editor.edit((editBuilder) => {editBuilder.replace(editor.selection, questionToXml(text, "multi"))});
    });
    
    let qopenToXml = vscode.commands.registerCommand('extension.openToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        if (selection.isEmpty) {
            let line = editor.document.lineAt(selection.start.line);
            let textrange = new vscode.Range(line.lineNumber,0,line.lineNumber,line.text.length);
            editor.edit((editBuilder) => {editBuilder.replace(textrange, questionToXml(line.text, "open"))});
        } else {
            let text = editor.document.getText(selection);
            editor.edit((editBuilder) => {editBuilder.replace(editor.selection, questionToXml(text, "open"))});
        }
    });
    
    let qnumToXml = vscode.commands.registerCommand('extension.numericToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        if (selection.isEmpty) {
            let line = editor.document.lineAt(selection.start.line);
            let textrange = new vscode.Range(line.lineNumber,0,line.lineNumber,line.text.length);
            editor.edit((editBuilder) => {editBuilder.replace(textrange, questionToXml(line.text, "numeric"))});
        } else {
            let text = editor.document.getText(selection);
            editor.edit((editBuilder) => {editBuilder.replace(editor.selection, questionToXml(text, "numeric"))});
        }
    });
    
    let qdateToXml = vscode.commands.registerCommand('extension.dateToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        if (selection.isEmpty) {
            let line = editor.document.lineAt(selection.start.line);
            let textrange = new vscode.Range(line.lineNumber,0,line.lineNumber,line.text.length);
            editor.edit((editBuilder) => {editBuilder.replace(textrange, questionToXml(line.text, "date"))});
        } else {
            let text = editor.document.getText(selection);
            editor.edit((editBuilder) => {editBuilder.replace(editor.selection, questionToXml(text, "date"))});
        }
    });
    
    let chapterToXml = vscode.commands.registerCommand('extension.chapterToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        if (selection.isEmpty) {
            let line = editor.document.lineAt(selection.start.line);
            let textrange = new vscode.Range(line.lineNumber,0,line.lineNumber,line.text.length);
            editor.edit((editBuilder) => {editBuilder.replace(textrange, setChapter(line.text))});
        } else {
            let text = editor.document.getText(selection);
            editor.edit((editBuilder) => {editBuilder.replace(editor.selection, setChapter(text))});
        }
    });
    
    let qInChapter = vscode.commands.registerCommand('extension.questionInChapter', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        
        editor.edit((editBuilder) => {editBuilder.replace(selection, setQuestionInChapter(text))});
    });
    
    let loopToXml = vscode.commands.registerCommand('extension.loopToXml', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        
        editor.edit((editBuilder) => {editBuilder.replace(selection, setLoop(text))});
    });
    
    let xmlRoutings = vscode.commands.registerCommand('extension.setRouting', () => { 
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No text editor open.');; // No open text editor
        }
        setRoutings(vscode.window.activeTextEditor.selection); 
    });
    
    let xmlFinish = vscode.commands.registerCommand('extension.finishXml', () => {finishXml()});
        
    let exportToDesign = vscode.commands.registerCommand('extension.exportXml', async () => {
        let options = JSON.parse(fs.readFileSync(__dirname+'\\settings.json', 'utf8'));
        if (options.designpath == '') {
            vscode.window.showInformationMessage("AskiaDesign path has not been set yet, please wait.");
            setAskiaDesignPath();
        }

        let savepath = options.savepath;
        let uri = vscode.Uri.file(__dirname+'\\tmp.xml');
        let diagnostics = vscode.languages.getDiagnostics(uri);
        if (vscode.extensions.getExtension("IBM.XMLLanguageSupport") != undefined) {
            if (diagnostics.length == 0) {
                cp.exec('Cd "'+ options.designpath + '" & design ' + __dirname +
                 '\\tmp.xml /Saveas:'+savepath+'\\QeXML-generated-questionnaire.qex && design '+savepath+'\\QeXML-generated-questionnaire.qex', function (err) {
                    if (err) throw err;
                });
                cleanTmp();
            } else {
                vscode.window.showErrorMessage("XML file is not valid. Please correct the errors and try again.");
            }
        } else {
            vscode.window.showInformationMessage("XML validation extension not detected. Could not perfom validation. Export aborted.");
        }
                
    });

    let prettyXml = vscode.commands.registerCommand('extension.prettifyAllXml', () => {formatAllXml(getWholeText())});

    setAskiaDesignPath();

    context.subscriptions.push(settings);
    context.subscriptions.push(modToXml);
    context.subscriptions.push(qclosedSingleToXml);
    context.subscriptions.push(qclosedMultiToXml);
    context.subscriptions.push(qopenToXml);
    context.subscriptions.push(qnumToXml);
    context.subscriptions.push(qdateToXml);
    context.subscriptions.push(chapterToXml);
    context.subscriptions.push(qInChapter);
    context.subscriptions.push(loopToXml);
    context.subscriptions.push(xmlRoutings);
    context.subscriptions.push(xmlFinish);
    context.subscriptions.push(exportToDesign);
    context.subscriptions.push(prettyXml);

}
exports.activate = activate;

// this method is called when the extension is deactivated
function deactivate() {
    cleanTmp();
}
exports.deactivate = deactivate;