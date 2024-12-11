/**
 * Der OtrLogger ist eine Logger-Klasse, die mit der Scripting-Funktion
 * "util.out" auf die Documents-Konsole schreibt.<br/>
 * <br/>
 * <em>Hinweis:</em> Historisch bedingt, wird die Klasse OtrLogger auf
 * einer Variable gleichen Namens auf dem globalen Gültigkeitsbereich
 * definiert. Der Name OtrLogger ist daher reserviert, da sonst die
 * Klasse überschrieben wird.<br/>
 * <br/>
 * <b>Einbindung</b><br/>
 * Der otrLogger kann per Import-Direktive und per <code>require()</code>
 * eingebunden werden. Per <code>require()</code> wird aber nur das
 * Objekt "otrLogger" exportiert. Auf die Klasse "OtrLogger" kann entweder
 * über die globale Variable oder die Funktion
 * <code>otrLogger.Constructor</code> zugegriffen werden.<br/>
 * <br/>
 * Wird der OtrLogger per Import-Direktive eingebunden, dann ist ein
 * Logger (Objekt) mit dem Namen "otrLogger" ist bereits erzeugt.<br/>
 * <br/>
 * <b>Aktivierung</b><br/>
 * Wenn die Documents-Eigenschaft "CustomJSLogLevel" gesetzt ist,
 * wird diese übernommen. Gültige Eigenschaftswerte sind: DEBUG,
 * INFO, WARN, ERROR, FATAL, NONE (als Zeichenkette/String) In
 * Abhängigkeit des LOG-Level werden die Meldungen der
 * verschiedenen log-Funktionen (siehe Beispiel) ausgegeben oder
 * unterdrückt.<br/>
 * <br/>
 * <b>LOG-Level</b><br/>
 * Die LOG-Level haben die folgende Wertigkeit
 * <ul>
 * <li>DEBUG: Alle Meldungen werden ausgegeben</li>
 * <li>INFO: Alle ausser DEBUG</li>
 * <li>WARN: Alle Warnungen und Fehler-Text</li>
 * <li>ERROR: Fehler und fatale Fehler</li>
 * <li>FATAL: Nur der FATAL-Level</li>
 * </ul>
 * Alle LOG-Funktionen besitzen die gleiche Signatur<br/>
 * <ul>
 * <li>logContext: Skript/Klassenname</li>
 * <li>message: Beliebiger Text</li>
 * <li>transactionNo: Eine Transaktionsnummer (optional)</li>
 * <li>fileId: Eine Mappen-Id (optional)</li>
 * </ul>
 * <br/>
 * @version 1.5.0
 */
declare module 'otrLogger' {
    /**
     * verfügbare Log-Levels
     */
    type LogLevels = "DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL"|"NONE";

    /**
     * Variable, die den Konstruktor für die Klasse enthält. Damit kann
     * über den standardmäßig instantiierten Logger "otrLogger" auf
     * dessen Konstruktor zugegriffen werden und neue Instanzen erzeugt
     * werden.<br/>
     * <br/>
     * <em>Grund</em> für diese Konstruktion ist, dass bisher immer
     * mit der otrLogger-Instanz gearbeitet wurde. Diese wird auch
     * per <em>module.exports</em> exportiert, damit sich die
     * Einbindung per require() genauso verhält wie mit der
     * Import-Direktive.
     * @returns Konstruktor zum Erzeugen einer
     *          otrLogger-Instanz
     */
    function Constructor(): OtrLogger;

    /**
     * Setzt den LOG-Level und überschreibt die Documentseigenschaft "CustomJSLogLevel"
     * @param level LOG-Level DEBUG, INFO, WARN, ERROR, FATAL, NONE
     */
    function setLogLevel(level: LogLevels): void;

    /**
     * Überprüft ob das Logging aktiv ist, also LOG-Level nicht "NONE"
     * @returns wahr, wenn Logger aktiv ist.
     */
    function isActive(): boolean;

    /**
     * Log-Funktion für den Level ERROR, die nach <code>util.out()</code> schreibt
     * Siehe Funktion logger().
     * @param logContext Optionale Aufrufumgebung, z.B. Skript- und Funktionsname
     * @param message Beliebiger Text, Exception
     *        oder Funktion, deren Rückgabewert als Meldung ausgegeben wird
     * @param transactionNo Optionale Transaktionsnummer
     * @param fileId Optionale Mappen-Id
     */
    function logError(logContext?: string, message?: string | Error | Function, transactionNo?: string, fileId?: string): void;

    /**
     * Log-Funktion für den Level INFO, die nach <code>util.out()</code> schreibt
     * Siehe Funktion logger()
     * @param logContext Optionale Aufrufumgebung, z.B. Skript- und Funktionsname
     * @param message Beliebiger Text, Exception
     *        oder Funktion, deren Rückgabewert als Meldung ausgegeben wird
     * @param transactionNo Optionale Transaktionsnummer
     * @param fileId Optionale Mappen-Id
     */
    function logInfo(logContext?: string, message?: string | Error | Function, transactionNo?: string, fileId?: string): void;

    /**
     * Log-Funktion für den Level WARN, die nach <code>util.out()</code> schreibt
     * Siehe Funktion logger()
     * @param logContext Optionale Aufrufumgebung, z.B. Skript- und Funktionsname
     * @param message Beliebiger Text, Exception
     *        oder Funktion, deren Rückgabewert als Meldung ausgegeben wird
     * @param transactionNo Optionale Transaktionsnummer
     * @param fileId Optionale Mappen-Id
     */
    function logWarn(logContext?: string, message?: string | Error | Function, transactionNo?: string, fileId?: string): void;

    /**
     * Log-Funktion für den Level FATAL, die nach <code>util.out()</code> schreibt
     * Siehe Funktion logger()
     * @param logContext Optionale Aufrufumgebung, z.B. Skript- und Funktionsname
     * @param message Beliebiger Text, Exception
     *        oder Funktion, deren Rückgabewert als Meldung ausgegeben wird
     * @param transactionNo Optionale Transaktionsnummer
     * @param fileId Optionale Mappen-Id
     */
    function logFatal(logContext?: string, message?: string | Error | Function, transactionNo?: string, fileId?: string): void;

    /**
     * Log-Funktion für den Level DEBUG, die nach <code>util.out()</code> schreibt
     * Siehe Funktion logger()
     * @param logContext Optionale Aufrufumgebung, z.B. Skript- und Funktionsname
     * @param message Beliebiger Text, Exception
     *        oder Funktion, deren Rückgabewert als Meldung ausgegeben wird
     * @param transactionNo Optionale Transaktionsnummer
     * @param fileId Optionale Mappen-Id
     */
    function logDebug(logContext?: string, message?: string | Error | Function, transactionNo?: string, fileId?: string): void;

    /**
     * Prüft, ob ein Ausgabe-Level aktiv ist.
     * 
     * Mögliche Werte sind: DEBUG, INFO, WARN, ERROR, FATAL
     * @param level Name des zu prüfenden Levels
     * @returns wahr, wenn Loglevel aktiv
     */
    function isLevelActive(level: LogLevels): boolean;

    /**
     * Startet einen Timer, wenn vorher kein Timer mit gleichem Label gestartet wurde.
     * @param label - Eindeutiger Bezeichner, mit welchem der Timer identifiziert werden kann.
     */
    function time(label: string): void;

    /**
     * Beendet den Timer mit dem übergebenen Label, falls vorher ein gleichnamiger gestartet wurde.
     * Schreibt die vergangene Zeit in das Log-File.
     * @param label Eindeutiger Bezeichner, mit welchem der Timer identifiziert werden kann.
     * @returns Vergangene Zeit in Millisekunden oder -1, wenn zuvor kein Timer gestartet wurde.
     */
    function timeEnd(label: String): number;

    /**
     * Gibt ein Objekt mit allen aktiven Timern zurück.
     * @returns Objekt mit allen aktiven Timern.
     */
    function getActiveTimers(): object;

    /**
     * Setzt einen eigenen Logging-Handler. Wird eine Meldung geloggt,
     * dann wird immer die übergebene Funktion mit der Log-Meldung
     * aufgerufen. Dies kann z. B. verwendet werden, um die Log-Meldung
     * zu ergänzen oder um diese in eine andere Ausgabe umzuleiten.
     * @param func - Der übergebene Handler muss genau einen Parameter erwarten, der die Log-Message enthält.
     */
    function setLogHandler(func: Function): void;

    /**
     * Setzt als Standard den Log-Handler, der auf die Server-Konsole schreibt.
     */
    function setDefaultLogHandler(): void;

    /**
     * Log-Handler, um Log-Messages innerhalb des Loggers zu speichern, anstatt Sie auf die Konsole rauszuschreiben.
     */
    function setInternalLogging(): void;

    /**
     * Setzt den regulären Ausdruck zum Filtern von Meldungen anhand des Log-Kontextes.
     * @param filterExpression String mit dem regulären Filterausdruck
     * @throws Ungültiger regulärer Ausdruck für Kontext-Filter
     */
    function setContextFilter(filterExpression: string): void;

    /**
     * Setzt den Kontextfilter auf den Wert zurück, der im Property CustomJSContextFilter
     * definiert ist. Ist das leer, wird der Context-Filter entfernt.
     * @throws Ungültiger regulärer Ausdruck für Kontext-Filter
     */
    function resetContextFilter(): void;

    /**
     * Gibt die intern gespeicherten Log-Messages aus.
     * @returns Eindimensionales Array mit allen gespeicherten Log-Messages.
     */
    function getInternalLogMessages(): string[];

    /**
     * Löscht alle gespeicherten Log-Messages.
     */
    function deleteInternalLogMessages(): void;

    /**
     * Fügt eine Meldung zum Cache hinzu.
     * @param message hinzuzufügende Meldung oder Exception
     */
    function addMessageToCache(message: string | Error | Function): void;

    /**
     * Fügt eine Meldung zum Cache hinzu.
     * @param message hinzuzufügende Meldung oder Exception
     * @deprecated
     * @see
     */
    function addMessage2Cache(message: string | Error): void;

    /**
     * Entfernt alle kritischen Meldungen (FATAL) aus dem Cache.
     */
    function clearLastFatalLogMessages(): void;

    /**
     * Liefert alle kritische Meldungen (FATAL) aus dem Cache zurück.
     * @returns gespeicherte, kritische Meldungen (FATAL)
     */
    function getLastFatalLogMessages(): string[];

}

