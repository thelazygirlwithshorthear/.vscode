/**
 * Namensraum für die Zusicherungsbibliothek otrAssert
 * @version v1.7.1
 */
declare module 'otrAssert' {
    /**
     * Wirft eine Exception, wenn die Bedingung nicht erfüllt ist.
     * @param condition zu prüfende Bedingung
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param message Fehlermeldung, wenn Zusicherung nicht erfüllt oder eine Funktion, die eine Fehlermeldung zurück gibt
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Exception, wenn Bedingung nicht erfüllt
     */
    function assert(condition: boolean, functionName: string, message: string | otrAssert.ErrorMessageFunction, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn eine Variable nicht definiert ist.
     * @param variable zu prüfende Variable
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param variableName Name der zu prüfenden Variable
     * @param customErrorMessage Optionale, benutzerdefinierte Fehlermeldung, die im Fehlerfall geworfen wird. Der Ausdruck "${variableName}" in der Fehlermeldung wird durch den Parameter "variableName" ersetzt
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Exception, wenn Bedingung nicht erfüllt
     */
    function assertDefined(variable: any, functionName: string, variableName: string, customErrorMessage?: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn ein Skript nicht in einem Mappenkontext
     * ausgeführt wird.
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @throws Exception, wenn Bedingung nicht erfüllt
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     */
    function assertFileContext(functionName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn der Typ der Variable nicht der erwartete ist
     * @param variable zu prüfende Variable
     * @param assertType Erwarteter Typ
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param variableName Name der zu prüfenden Variable
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Exception, wenn Bedingung nicht erfüllt
     */
    function assertType(variable: any, assertType: string, functionName: string, variableName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn das synchronisieren einer Mappe fehlschlägt
     * @param docFile Mappe, welche synchronisiert werden soll
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param optionalArguments optionale Argumente oder Exception, die im
     *        Fehlerfall geworfen werden soll
     *        werden soll
     * @throws Exception, wenn die Synchronisation fehlschlägt
     */
    function assertSync(docFile: DocFile, functionName: string, optionalArguments: otrAssert.OptionalArgumentsAssertSync | Error): void;

    /**
     * Wirft eine Exception, wenn das Bearbeiten der Mappe verwehrt wird
     * @param docFile die zu bearbeitende Mappe
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Exception, wenn das Bearbeiten verwehrt wird
     */
    function assertStartEdit(docFile: DocFile, functionName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn der Commit einer Mappe fehlschlägt
     * @param docFile die zu speichernde Mappe
     * @param functionName Name der Funktion, in der die Zusicherung verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Exception, wenn der Commit einer Mappe fehlschlägt
     */
    function assertCommit(docFile: DocFile, functionName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn das Erstellen einer Mappe fehlschlägt
     * @param fileType der Typ der zu erstellenden Mappe
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @returns Mappe, welche erstellt wurde
     * @throws Nachricht, die den Fehler beim Erstellen der Mappe beschreibt
     */
    function assertCreateFile(fileType: string, exception?: Error): DocFile;

    /**
     * Gibt die gesuchte Mappe zurück
     * @param fileId Id der gesuchten Mappe
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @returns Die gesuchte Mappe
     * @throws Fehlermeldung, wenn die Mappe nicht gefunden wurde oder bei sonstigen Ausnahmen
     */
    function getFile(fileId: string, exception?: Error): DocFile;

    /**
     * Liefert für die Instanzen von Klassen der Documents-API die Liste
     * von Funktionen zurück, welche durch einen Exception-werfenden
     * Proxy umhüllt werden sollen. Unterstützt derzeit das
     * <em>context</em>-Objekt und die <em>DocFile</em>-Klasse. Für das
     * <em>DocFile</em>-Klasse sind das die folgenden Funktionen
     * <ul>
     * <li>abort()</li>
     * <li>addDocumentFromFileSystem()</li>
     * <li>archive()</li>
     * <li>archiveAndDelete()</li>
     * <li>cancelWorkflow()</li>
     * <li>connectFolder()</li>
     * <li>commit()</li>
     * <li>deleteFile()</li>
     * <li>disconnectArchivedFile()</li>
     * <li>disconnectFolder()</li>
     * <li>exportXML()</li>
     * <li>forwardFile()</li>
     * <li>getReferenceFile()</li>
     * <li>insertStatusEntry()</li>
     * <li>reactivate()</li>
     * <li>sendFileAdHoc()</li>
     * <li>sendMail()</li>
     * <li>setAttribute()</li>
     * <li>setFieldAttribute()</li>
     * <li>setFieldValue()</li>
     * <li>setFileOwner()</li>
     * <li>setFollowUpDate()</li>
     * <li>setUserRead()</li>
     * <li>setUserStatus()</li>
     * <li>startEdit()</li>
     * <li>startWorkflow()</li>
     * <li>sync()</li>
     * <li>undeleteFile</li>
     * </ul>
     * Für das <em>context</em>-Objekt sind das
     * <ul>
     * <li>changeScriptUser()</li>
     * <li>clearEnumvalCache()</li>
     * <li>createAccessProfile()</li>
     * <li>createArchiveServer()</li>
     * <li>createFellow()</li>
     * <li>createFile()</li>
     * <li>createFolder()</li>
     * <li>createPoolFile()</li>
     * <li>createSystemUser()</li>
     * <li>deleteAccessProfile()</li>
     * <li>sendTCPStringRequest()</li>
     * <li>setClientLang()</li>
     * <li>setClientSystemLang()</li>
     * <li>setFolderPosition()</li>
     * <li>setPrincipalAttribute()</li>
     * </ul>
     * @param object
     * @returns Liste der zu umhüllenden Funktionen
     */
    function getStandardWrappingList(object: DocFile | context): string[];

    /**
     * Ersetzt in einem Objekt alle Funktionen durch Proxies, die die ersetzte
     * Funktion aufrufen und deren Wert zurückgeben. Schlagen die Funktionen
     * fehl, dann wird eine Exception geworfen. Dies wird aber nur für die
     * Funktionen vorgenommen, die in der wrappingList angegeben sind. Wird
     * diese nicht angegeben, wird eine Standardliste von
     * getStandardWrappingList() verwendet.
     * @param object Objekt, dessen Funktionen zugesichert
     *        werden sollen
     * @param wrappingList Liste von Funktionen, die
     *        mit einem Exception-werfenden Proxy ersetzt werden sollen. Ist die
     *        Liste leer wird die Standardliste getStandardWrappingList() verwendet.
     * @see
     * @returns Objekt, deren Funktion durch Exception-werfende
     *          Proxies ersetzt wurden.
     */
    function getThrowingObject(object: T, wrappingList?: string[]): T;

    /**
     * Wirft eine Exception, wenn der ausführende Server nicht mindestens die
     * angegebene Build-Nummer hat.
     * @param minimalServerBuildNumber Build-Nummer der Version, die
     *        mindestens zugesichert werden soll
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Server-Version ist zu klein, d. h., zu alt
     */
    function assertMinimalServerVersion(minimalServerBuildNumber: number, functionName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn der aktuelle Server aktueller als die
     * angegebene Build-Nummer ist.
     * @param maximalServerBuildNumber Build-Nummer der Version, die
     *        höchstens zugesichert werden soll
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Server-Version ist zu groß, d. h., zu neu
     */
    function assertMaximalServerVersion(maximalServerBuildNumber: number, functionName: string, exception?: Error): void;

    /**
     * Wirft eine Exception, wenn der aktuelle Server aktueller als die
     * angegebene Build-Nummer ist.
     * @param minimalServerBuildNumber Build-Nummer der Version, die
     *        mindestens zugesichert werden soll
     * @param maximalServerBuildNumber Build-Nummer der Version, die
     *        höchstens zugesichert werden soll
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @throws Server-Version ist zu groß, d. h., zu neu, oder zu
     *         klein, d. h., zu alt, oder Eingabeparameter sind ungültig
     */
    function assertServerVersionRange(minimalServerBuildNumber: number, maximalServerBuildNumber: number, functionName: string): void;

    /**
     * Setzt ein Attribute an einer Mappe.
     * @param docFile Mappe, deren Attribut gesetzt werden soll
     * @param name Name des Attributs
     * @param value Wert des Attributes
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Setzen des Attributs ist fehlgeschlagen
     */
    function assertSetAttribute(docFile: DocFile, name: string, value: string, functionName: string, exception?: Error): void;

    /**
     * Setzt ein Attribut am Mandanten.
     * @param name Name des Attributs
     * @param value Wert des Attributes
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Setzen des Attributs ist fehlgeschlagen
     */
    function assertSetPrincipalAttribute(name: string, value: string, functionName: string, exception?: Error): void;

    /**
     * Löscht ein Attribut von einer Mappe.
     * @param docFile Mappe, von der das Attribut entfernt werden
     *        soll
     * @param name Name des zu entfernenden Attributs
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Setzen des Attributs ist fehlgeschlagen
     */
    function assertRemoveAttribute(docFile: DocFile, name: string, functionName: string, exception?: Error): void;

    /**
     * Löscht ein Attribut vom Mandanten.
     * @param name Name des zu entfernenden Attributs
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Setzen des Attributs ist fehlgeschlagen
     */
    function assertRemovePrincipalAttribute(name: string, functionName: string, exception?: Error): void;

    /**
     * Löscht eine Mappe.
     * @param docFile zu löschende Mappe
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Löschen ist fehlgeschlagen
     */
    function assertDeleteFile(docFile: DocFile, functionName: string, exception?: Error): void;

    /**
     * Bricht den Bearbeitungs-Modus einer Mappe ab
     * @param docFile Mappe, deren Bearbeitungsmodus abgebrochen
     *        werden soll
     * @param functionName Name der Funktion, in der die Zusicherung
     *        verlangt wird
     * @param exception Exception, die im Fehlerfall geworfen
     *        werden soll
     * @throws Abbrechen des Bearbeitungsmodus ist fehlgeschlagen
     */
    function assertAbort(docFile: DocFile, functionName: string, exception?: Error): void;

    /**
     * Optionale Parameter des HitResultsets.
     */
    interface HitResultsetOptionalArguments {
        /**
         * Seitengröße der Trefferliste; 0
  unbeschränkt
         */
        pageSize?: number;
        /**
         * wahr, wenn alle Treffer
  ermittelt werden sollen
         */
        unlimitedHits?: boolean;
        /**
         * wahr, wenn die Feldwerte
  komplett zurückgegeben werden sollen; andernfalls werden die Werte
  nach 50 Zeichen abgeschnitten
         */
        fullColumnLength?: boolean;
        /**
         * wahr, wenn zusätzlich die
  Daten des Dokumente der Mappen zurückgegeben werden sollen
         */
        withBlobInfo?: boolean;
    }

    /**
     * Erzeugt ein neues HitResultset und wirft eine Exception, wenn
     * dies fehlschlägt.
     * @param searchResources Suchquellen
     * @param filter Filterausdruck
     * @param sortOrder Sortierreihenfolge
     * @param hitlist Name einer Trefferliste oder Array mit den gewünschten Feldnamen
     * @param optionalArguments Optionale Parameter für das HitResultset
     * @see
     */
    function getHitResultset(searchResources: string | string[], filter: string, sortOrder: string, hitlist: string | string[], optionalArguments?: otrAssert.HitResultsetOptionalArguments): void;

}

