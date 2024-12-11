
# Askia QeXML Generator


## Description

This extension allows you to transform plain text questionnaires into Askia Compliant XML.

## Content

- [Commands](#commands)
    - [Settings](#settings)
    - [Modalities](#modalities)
    - [Closed question - Single coded](#single-coded-closed-question)
    - [Closed question - Multi coded](#multi-coded-closed-question)
    - [Open question](#open-question)
    - [Numeric question](#numeric-question)
    - [Date question](#date-question)
    - [Chapter](#chapter)
    - [Indent selection - Questions in chapter](#indent-selection)
    - [Loop](#loop)
    - [Routing](#routing)
    - [Finish - Final step](#final-step)
    - [Export to AskiaDesign](#export-to-askiadesign)
    - [Prettify XML](#prettify-xml)
- [Requirements](#requirements)


# Commands

There is a total of twelve commands to help you tranform your plain text questionnaire into XML to be used in Askia Design.

## Settings

### Description
As you know each question tag no matter its type has a certain number of attributes.
The `extension.defaultSettings` command allows you to change the default value of these attributes:

Attributes | Default values
---|:---:
Anonymity | `true`
AllowDK | `true`
Decimals | `0`

You may also modify the **save location** which default value is `%userprofile%\Documents`.

All these values are stored in `settings.json` file, along with the **path to AskiaDesign executable file**.

>NOTE: You do not have to set the path to AskiaDesign executable file yourself as it is automaticaly done. See [Export to AskiaDesign](#export-to-askiadesign) for additional information. 

### Use

You can either execute this command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Modify default settings`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>.
Then a pop-up will appear with the different modifyable attributes.

[Top](#content)

## Modalities

### Description

The `extension.modalityToXml` command converts plain text modalities into XML :

```
- Bla
- Blabla
- Blablabla

1. Bla
2. Blabla
3. Blablabla
```
Into
```xml
<Modalities>
    <Modality ID="1">
        <ShortCaption>Bla</ShortCaption>
    </Modality>
    <Modality ID="2">
        <ShortCaption>Blabla</ShortCaption>
    </Modality>
    <Modality ID="3">
        <ShortCaption>Blablabla</ShortCaption>
    </Modality>
</Modalities>
```

### Use

First you have to select (highlight) all the responses of the question you are dealing with. Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to modalities`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd>.

[Top](#content)

## Single coded closed question

### Description

`extension.closedSingleToXml` converts plain text single coded closed question caption into XML, setting the `MaxResponse` attribute to `1`:

```
    This is a question caption.

    Q1 This is a question caption.

    Q1. This is a question caption.

    1. This is a question caption.
```

Into

```XML
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="closed" Anonymity="1" AllowDK="1" MinResponse="1" MaxResponse="1" Translated="0">
    <LongCaption>This is a question caption.</LongCaption>
    <Modalities>
        ...
    </Modalities>
    <Routings>
    </Routings>
</Question>
```
>NOTE: The attribute `Order` is not set yet, as for all the different types of question. See [Final step](#final-step) for additional information.


### Use
To use this functionality, you first have to [convert the responses](#Modalities) of the closed question into modalities.

You have to select (highlight) all the modalities and the question caption. Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to single-coded closed question`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>.

[Top](#content)

## Multi coded closed question

### Description

Same [description](#single-coded-closed-question) as above.
The difference with `extension.closedSingleToXml` is that `extension.closedMultiToXml` sets the `MaxResponse` attribute to the number of modalities in the question.

### Use

To use this functionality, you first have to [convert the responses](#Modalities) of the closed question into modalities.

You have to select (highlight) all the modalities and the question caption. Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to multi-coded closed question`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd>.

[Top](#content)

## Open question

### Description

The `extension.openToXml` command converts a plain text open question caption into XML:

```
    This is a question caption.

    Q1 This is a question caption.

    Q1. This is a question caption.

    1. This is a question caption.
```
Into
```XML
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="open" Anonymity="1" AllowDK="1" Translated="0" >
    <LongCaption>This is a question caption.</LongCaption>
    <Routings>
    </Routings>
</Question>
```

### Use

First you can either select (highlight) the whole caption or just place the cursor on the line containing the caption.
Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to open question`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd>.

[Top](#content)

## Numeric question

### Description

The `extension.numericToXml` command converts a plain text numeric question caption into XML:
```
    This is a question caption.

    Q1 This is a question caption.

    Q1. This is a question caption.

    1. This is a question caption.
```
Into
```XML
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="numeric" Anonymity="1" AllowDK="1" Decimals="0" Translated="0" >
    <LongCaption>This is a question caption.</LongCaption>
    <Routings>
    </Routings>
</Question>
```

### Use

First you can either select (highlight) the whole caption or just place the cursor on the line containing the caption.
Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to numeric question`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>N</kbd>.

[Top](#content)

## Date question

### Description

The `extension.dateToXml` command converts a plain text date question caption into XML:
```
    This is a question caption.

    Q1 This is a question caption.

    Q1. This is a question caption.

    1. This is a question caption.
```
Into
```XML
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="date" Anonymity="1" AllowDK="1" Translated="0">
    <LongCaption>This is a question caption.</LongCaption>
    <Routings>
    </Routings>
</Question>
```

### Use

First you can either select (highlight) the whole caption or just place the cursor on the line containing the caption.
Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to date question`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>D</kbd>.

[Top](#content)

## Chapter

### Description

The `extension.chapterToXml` command converts a plain text chapter caption into XML:
```
    This is a chapter title.
```
Into
```XML
<Question ID="1" Shortcut="chapter 1" Order="" ElementType="chapter" >
    <LongCaption>This is a chapter title.</LongCaption>
</Question>
```

### Use

First you can either select (highlight) the whole caption or just place the cursor on the line containing the caption.
Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to chapter`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>C</kbd>.

[Top](#content)

## Indent selection

### Description

The `extension.questionInChapter` command allows you to put questions, as plain text or XML, within a chapter tag.

If your question is still in plain text :
```xml
<Question ID="1" Shortcut="chapter 1" Order="" ElementType="chapter" >
    <LongCaption>This is a chapter title.</LongCaption>
</Question>

Q1. Example
- A
- B
- C
```
Into

```xml
<Question ID="1" Shortcut="chapter 1" Order="" ElementType="chapter">
    <LongCaption>This is a chapter title.</LongCaption>
    <Questions>
    Q1. Example
    - A
    - B
    - C
    </Questions>
</Question>
```

Or, if you already convert the question into XML :
```xml
<Question ID="1" Shortcut="chapter 1" Order="" ElementType="chapter">
    <LongCaption>This is a chapter title.</LongCaption>
</Question>

<Question ID="2" Shortcut="Q2" Order="" ElementType="question" QuestionType="closed" Anonymity="1" AllowDK="1" MinResponse="1" MaxResponse="3" Translated="0">
    <LongCaption>Example</LongCaption>
    <Modalities>
        <Modality ID="1">
            <ShortCaption>A</ShortCaption>
        </Modality>
        <Modality ID="2">
            <ShortCaption>B</ShortCaption>
        </Modality>
        <Modality ID="3">
            <ShortCaption>C</ShortCaption>
        </Modality>
    </Modalities>
    <Routings>
    </Routings>
</Question>
```
Into
```xml
<Question ID="1" Shortcut="chapter 1" Order="" ElementType="chapter">
    <LongCaption>This is a chapter title.</LongCaption>
    <Questions>
        <Question ID="2" Shortcut="Q2" Order="" ElementType="question" QuestionType="closed" Anonymity="1" AllowDK="1" MinResponse="1" MaxResponse="3" Translated="0">
            <LongCaption>Example</LongCaption>
            <Modalities>
                <Modality ID="1">
                    <ShortCaption>A</ShortCaption>
                </Modality>
                <Modality ID="2">
                    <ShortCaption>B</ShortCaption>
                </Modality>
                <Modality ID="3">
                    <ShortCaption>C</ShortCaption>
                </Modality>
            </Modalities>
            <Routings>
            </Routings>
        </Question>
    </Questions>
</Question>
```

### Use

To put your question(s) within a chapter tag, you first need to [convert your chapter](#chapter) into XML.

Once you have your chapter tag you just need to select (highlight) the whole chapter tag with the question(s) you want to place inside. Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Indent selection`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>I</kbd>.

[Top](#content)

## Loop

### Description

The `extension.loopToXMl` command converts a plain text question into loop question :

```xml
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="closed" MinResponse="1" MaxResponse="1" Anonymity="1" AllowDK="1" Translated="0">
    <LongCaption>This is a question caption</LongCaption>
    <Modalities>
        <Modality ID="1">
            <ShortCaption>A</ShortCaption>
        </Modality>
        <Modality ID="2">
            <ShortCaption>B</ShortCaption>
        </Modality>
        <Modality ID="3">
            <ShortCaption>C</ShortCaption>
        </Modality>
    </Modalities>
    <Routings>
    </Routings>
</Question>

A loop modality
Another loop modality
```
Into
```xml
<Question ID="2" Shortcut="Loop Q1" Order="" ElementType="loop" QuestionType="table" Translated="0">
    <LongCaption>Loop Q1</LongCaption>
    <Modalities>
        <Modality ID="4">
            <ShortCaption>A loop modality</ShortCaption>
        </Modality>
        <Modality ID="5">
            <ShortCaption>Another loop modality</ShortCaption>
        </Modality>
    </Modalities>
    <Questions>
        <Question ID="1" Shortcut="Q1" Order="1" ElementType="question" QuestionType="closed" MinResponse="1" MaxResponse="1" Anonymity="1" AllowDK="1" Translated="0">
            <LongCaption>This is a question caption</LongCaption>
            <ShortCaption>??Loop Q1??</ShortCaption>
            <Modalities>
                <Modality ID="1">
                    <ShortCaption>A</ShortCaption>
                </Modality>
                <Modality ID="2">
                    <ShortCaption>B</ShortCaption>
                </Modality>
                <Modality ID="3">
                    <ShortCaption>C</ShortCaption>
                </Modality>
            </Modalities>
            <Routings>
            </Routings>
        </Question>
    </Questions>
</Question>
```

### Use

In order to tranform your question into a loop question, you first have to convert your question into XML, as in the example above.

Once you have your XML question you can select (highlight) both the question and the loop modalities. Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Convert to loop`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd>.

>NOTE: The loop modalities have to be under the question tag in the selection, when executing the command.

[Top](#content)

## Routing

### Description

The `extension.setRouting` allows you to create a routing tag within a question tag. For example, here we set a routing for the last modality :
```xml
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="closed" MinResponse="1" MaxResponse="1" Anonymity="1" AllowDK="1" Translated="0">
    <LongCaption>This is a question caption</LongCaption>
    <Modalities>
        <Modality ID="1">
            <ShortCaption>A</ShortCaption>
        </Modality>
        <Modality ID="2">
            <ShortCaption>B</ShortCaption>
        </Modality>
        <Modality ID="3">
            <ShortCaption>C</ShortCaption>
        </Modality>
    </Modalities>
    <Routings>
    </Routings>
</Question>
```
Into
```xml
<Question ID="1" Shortcut="Q1" Order="" ElementType="question" QuestionType="closed" MinResponse="1" MaxResponse="1" Anonymity="1" AllowDK="1" Translated="0">
    <LongCaption>This is a question caption</LongCaption>
    <Modalities>
        <Modality ID="1">
            <ShortCaption>A</ShortCaption>
        </Modality>
        <Modality ID="2">
            <ShortCaption>B</ShortCaption>
        </Modality>
        <Modality ID="3">
            <ShortCaption>C</ShortCaption>
        </Modality>
    </Modalities>
    <Routings>
        <Routing ID="1" Type="22" TargetQuestion="">
            <Condition ConditionType="12" Responses="3"/>
        </Routing>
    </Routings>
</Question>
```
>NOTE:

>By defauflt attribute `Type` from the `Routing` tag is always set to `22`, meaning `Go to and mark as incomplete`.

>Concerning the `Condition` tag, the attribute `ConditionType` is always set to `12`, meaning `At least one`.

>Finally, the attribute `TargetQuestion` of the `Routing` tag will be defined when executing the command `extension.finishXml`. See [Final step](#final-step) for additional information.

### Use

First you need to have a question, already converted into XML, then you have to select (highlight) the whole modality tag of a response.
Here :
```xml
<Modality ID="3">
    <ShortCaption>C</ShortCaption>
</Modality>
```
Then you can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Set a routing`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>R</kbd>.


[Top](#content)

## Final step

### Description

The `extension.finishXml` command is essential if you intend to export your questionnaire to AskiaDesign. It sets the final tags, allowing the validation of your file. It is also in this command that the attribute `Order` is set for all the question, as we are now able to identify each question.

It is also thanks to this step that the XML validation against the `askia.xsd` file is possible.

Finally, `extension.finishXml` creates a chapter `ChapterEnd` at the end of the questionnaire to provide a value (which is the chapter's ID) for the `TargetQuestion` attribute of `Routing` tags.

```xml
<?xml version="1.0" encoding="Unicode" ?>
<Survey Version="1.0" Full="1" MaxQuestionID="1" MaxResponseID="1" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="new_askia.xsd">
    <Languages>
        <Language ID="2057" Abbr="ENG" Name="English (United Kingdom)" Default="1"/>
    </Languages>
    <Questions>

        ...

        <Question ID="1" Shortcut="End" Order="1" ElementType="chapter" Translated="0">
            <LongCaption>End</LongCaption>
        </Question>
    </Questions>
</Survey>
```

>NOTE: By default there is only one `Language` tag for english.

### Use

You can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Finish XML`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd>.

[Top](#content)

## Export to AskiaDesign

### Description

Once you have finished to convert your questionnaire into XML and you have runned the `extension.finishXml` command, you can use `extension.exportXml` command to export your questionnaire to AskiaDesign.

The AskiaDesign application path is set when the extension starts. It is placed in the `settings.json` file of the extension.

If you want to, you can modify the save location, see [Settings](#settings).

The questionnaire will be exported then saved as `QeXML-generated-questionnaire.qex` in `%USERPROFILE%\Documents` or the location you add yourself.


### Use

You can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Export XML to AskiaDesign`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>E</kbd>.

[Top](#content)

## Prettify XML

### Description 

You can format your XML at any time to make it more readable.

### Use 

You can either execute the command via the Command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>), searching for `Askia QeXML Generator: Prettify XML`, or you can use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd>.

[Top](#content)

# Requirements

## XML Language Support

This extension is needed to perform the validation of the XML before the exportation.

Click on the following [link](https://marketplace.visualstudio.com/items?itemName=IBM.XMLLanguageSupport) for futher information concerning this extension. 