/**
 * The AccessProfile class has been added to the DOCUMENTS PortalScripting
 * API to gain full access to the DOCUMENTS access profiles by scripting means.
 *
 * A {@link SystemUser} can be assigned to an AccessProfile. At the filetype it is
 * possible to define several rights depending on the AccessProfile. You can
 * get an AccessProfile object by different methods like
 * {@link Context.findAccessProfile} or from the {@link AccessProfileIterator}.
 */
declare class AccessProfile {
    /**
     * **With the new method is it possible to create a new AccessProfile.**
     *
     * If an access profile with the profile name already exist, the method
     * return the existing access profile.
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param nameAccessProfile
     * @deprecated since ELC 3.60i / otrisPORTAL 6.0i use {@link context.createAccessProfile} instead
     * @example
     * var newAP = new AccessProfile("supportteam");
     * if (!newAP)
     *    util.out("Creation of AccessProfile failed.");
     */
    constructor(nameAccessProfile: string);
    /**
     * **The technical name of the AccessProfile.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @example
     * var su = context.getSystemUser(); // current user
     * if (su)
     * {
     *    var apIter = su.getAccessProfiles();
     *    for (var ap = apIter.first(); ap; ap = apIter.next())
     *    {
     *       util.out(ap.name);
     *    }
     * }
     */
    name: string;
    /**
     * **Access to the property cache of the AccessProfile.**
     *
     * @since DOCUMENTS 5.0
     * @see
     * {@link PropertyCache}
     * {@link SystemUser.propCache}
     * @example
     * var ap = context.findAccessProfile("Everybody");
     * if (!ap.propCache.hasProperty("Contacts"))
     * {
     *    util.out("Creating cache");
     *    ap.propCache.Contacts = ["Peter", "Paul", "Marry"];
     * }
     */
    propCache: PropertyCache;
    /**
     * **Creates a new {@link CustomProperty} for the AccessProfile.**
     *
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link AccessProfile.setOrAddCustomProperty | AccessProfile.setOrAddCustomProperty}
     * {@link AccessProfile.getCustomProperties | AccessProfile.getCustomProperties}
     * @example
     * var office = context.findAccessProfile("office");
     * if (!office) throw "office is null";
     * var custProp = office.addCustomProperty("favorites", "string", "peachit");
     * if (!custProp)
     *   util.out(office.getLastError());
     */
    addCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Get the String value of an attribute of the AccessProfile.**
     *
     * **Note:** This function is only for experts. Knowledge about the ELC-database schema is necessary!
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Get a {@link CustomPropertyIterator} with custom properties of the current AccessProfile.**
     *
     * @since DOCUMENTS 5.0
     * @param nameFilter String value defining an optional filter depending on the name
     * @param typeFilter String value defining an optional filter depending on the type
     * @returns CustomPropertyIterator
     * @see
     * {@link context.findCustomProperties | context.findCustomProperties}
     * {@link AccessProfile.setOrAddCustomProperty | AccessProfile.setOrAddCustomProperty}
     * {@link AccessProfile.addCustomProperty | AccessProfile.addCustomProperty}
     * @example
     * var office = context.findAccessProfile("office");
     * if (!office) throw "office is null";
     * var itProp = office.getCustomProperties();
     * for (var prop = itProp.first(); prop; prop = itProp.next())
     * {
     *    util.out(prop.name + ": " + prop.value);
     * }
     */
    getCustomProperties(nameFilter?: string, typeFilter?: string): CustomPropertyIterator;
    /**
     * **If you call a method at an AccessProfile object and an error occurred, you can get the error description with this function.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param shortMessage optional, removes "Error in function: class.method(): " from the message.
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the AccessProfile object (`m_oid`) will be returned.
     * If `false` the id of the AccessProfile object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     * **Default:** `false`
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Get the parent profile of the current profile.**
     *
     * @since DOCUMENTS 5.0g
     * @returns `AccessProfile` object representing the parent profile, `null` if no parent profile exists.
     * @example
     * var parentProfile = context.createAccessProfile("parentProfile");
     * if (parentProfile)
     * {
     *   var subProfile = context.createAccessProfile("subProfile");
     *   if (subProfile)
     *   {
     *       var success = subProfile.setParentProfile(parentProfile);
     *       if (!success)
     *           util.out(subProfile.getLastError());
     *       var parentAP = subProfile.getParentProfile();
     *       if (!parentAP)
     *           throw "The method getParentProfile() does not work.";
     *   }
     * }
     */
    getParentProfile(): AccessProfile;
    /**
     * **Get an iterator with all sub-profiles of the current profile.**
     *
     * @since DOCUMENTS 5.0g
     * @returns `AccessProfileIterator` object with the sub-profiles
     * @example
     * var parentProfile = context.createAccessProfile("parentProfile");
     * if (parentProfile)
     * {
     *   var subProfile = context.createAccessProfile("subProfile");
     *   if (subProfile)
     *   {
     *       var success = subProfile.setParentProfile(parentProfile);
     *       if (!success)
     *           util.out(subProfile.getLastError());
     *       var apIt = parentProfile.getSubProfiles();
     *       for (var ap = apIt.first(); ap; ap = apIt.next())
     *       {
     *           util.out(ap.name);
     *       }
     *   }
     * }
     */
    getSubProfiles(): AccessProfileIterator;
    /**
     * **Retrieve a list of desired {@link SystemUser} which are assigned to the current AccessProfile.**
     *
     * **Since:** DOCUMENTS 5.0c HF2 (new parameters includeLockedUsers and includeInvisibleUsers)
     * **Since:** DOCUMENTS 5.0g (new parameters includeSubProfiles)
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @param includeLockedUsers Optional flag indicating whether locked users also should be returned.
     * **Default:** `true`
     * @param includeInvisibleUsers Optional flag indicating whether the method also should return users for which the option
     * "Display user in DOCUMENTS lists" in the Documents Manager is not checkmarked.
     * **Default:** `true`
     * @param includeSubProfiles Optional flag indicating whether the method also should return users which are assigned to the sub-profiles.
     * **Default:** `false`
     * @returns SystemUserIterator containing a list of SystemUser
     * @example
     * var ap = context.findAccessProfile("supportteam");
     * if (ap)
     * {
     *    var itSU = ap.getSystemUsers();
     *    for (var su = itSU.first(); su; su = itSU.next())
     *       util.out(su.login);
     * }
     * else
     *    util.out("AccessProfile does not exist.");
     */
    getSystemUsers(includeLockedUsers?: boolean, includeInvisibleUsers?: boolean, includeSubProfiles?: boolean): SystemUserIterator;
    /**
     * **Set the String value of an attribute of the AccessProfile to the desired value.**
     *
     * **Note:** This function is only for experts. Knowledge about the ELC-database schema is necessary!
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Creates a new {@link CustomProperty} or modifies a {@link CustomProperty} according the name and type for the AccessProfile.**
     *
     * This method creates or modifies a unique CustomProperty for the AccessProfile. The combination of the name and the type make the CustomProperty unique for the AccessProfile.
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link AccessProfile.getCustomProperties | AccessProfile.getCustomProperties}
     * {@link AccessProfile.addCustomProperty | AccessProfile.addCustomProperty}
     * @example
     * var office = context.findAccessProfile("office");
     * if (!office) throw "office is null";
     * var custProp = office.setOrAddCustomProperty("favorites", "string", "peachit");
     * if (!custProp)
     *   util.out(office.getLastError());
     */
    setOrAddCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Set the parent profile of the current profile.**
     *
     * @since DOCUMENTS 5.0d
     * @param parentProfile optional AccessProfile object being the parent profile of the current profile. If no parent profile is defined, the current profile will be moved to the top level.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var parentProfile = context.createAccessProfile("parentProfile");
     * if (parentProfile)
     * {
     *   var subProfile = context.createAccessProfile("subProfile");
     *   if (subProfile)
     *   {
     *       var success = subProfile.setParentProfile(parentProfile);
     *       if (!success)
     *           util.out(subProfile.getLastError());
     *       // We can move subProfile to the top level as follows:
     *       success = subProfile.setParentProfile();
     *   }
     * }
     */
    setParentProfile(parentProfile: AccessProfile): boolean;
}
/**
 * **This class gives access to the DOCUMENTS access profiles**
 *
 * The objects of this class represent lists of {@link AccessProfile} objects and allow to loop through such a list of profiles. The following methods return an AccessProfileIterator:
 * <ul>
 * <li>{@link Context.getAccessProfiles}</li>
 * <li>{@link SystemUser.getAccessProfiles}</li>
 * </ul>
 * @since ELC 3.50b / otrisPORTAL 5.0b
 * @example
 * // take a certain Systemuser object (stored in user) and assign all availabe
 * // accessprofiles to this user
 * var itRoles = context.getAccessProfiles();
 * if (itRoles && itRoles.size() > 0)
 * {
 *    for (var ap = itRoles.first(); ap; ap = itRoles.next())
 *    {
 *       user.addToAccessProfile(ap); // add user to profile
 *    }
 * }
 */
declare interface AccessProfileIterator {
    /**
     * **Retrieve the first {@link AccessProfile} object in the AccessProfileIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns AccessProfile or `null` in case of an empty AccessProfileIterator
     */
    first(): AccessProfile;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the next {@link AccessProfile} object in the AccessProfileIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns AccessProfile or `null` if end of AccessProfileIterator is reached.
     */
    next(): AccessProfile;
    /**
     * **Get the amount of {@link AccessProfile} objects in the AccessProfileIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns integer value with the amount of AccessProfile objects in the AccessProfileIterator
     */
    size(): number;
}
/**
 * **The ArchiveConnection class allows low level access to the EAS Interface, EBIS and the EASY ENTERPRISE XML-Server.**
 *
 */
declare interface ArchiveConnection {
    /**
     * **Download an attachment from the XML-Server.**
     *
     * With this method you can download an attachment from the EASYWARE ENTERPRISE archive using the XML-Server.
     * The method returns an object of the class {@link ArchiveConnectionBlob | `ArchiveConnectionBlob`}. This object allows you to access the attachment.
     * If the method fails the return value is `null`. You can retrieve the error message by executing `ArchiveConnection.getLastError()`.
     *
     * **Note:** Method is only available for EE.x using XML-Server
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @param fileKey String containing the key of the file
     * @param docKey String containing the key of the attachment
     * @returns `ArchiveConnectionBlob` or `null`, if failed
     * @example
     * var xmlserver = context.getArchiveConnection();
     * if (xmlserver)
     * {
     *    var fileKey = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2"
     *    var docKey = "41D3695F2B1E11DD8A9A000C29FACDC2"
     *    var res = xmlserver.downloadBlob(fileKey, docKey);
     *    if (!res)
     *       util.out(xmlserver.getLastError());
     *    else
     *       util.out(res.localPath)
     * }
     */
    downloadBlob(fileKey: string, docKey: string): ArchiveConnectionBlob;
    /**
     * **Download multiple attachments from the XML-Server.**
     *
     * This method allows downloading multiple attachments from the EASYWARE ENTERPRISE archive using the XML-Server.
     * The method returns an object of the class {@link ArchiveConnectionBlobIterator | `ArchiveConnectionBlobIterator`}. This object allows you to access the attachments.
     * If the method fails the return value is `null`. You can retrieve the error message by executing `ArchiveConnection.getLastError()`.
     *
     * **Note:** Method is only available for EE.x using XML-Server
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @param fileKey String Array containing the keys of the files
     * @param docKey String Array containing the keys of the attachments
     * @returns `ArchiveConnectionBlobIterator` or `null`, if failed
     * @example
     * var fileKeys = new Array();
     * var docKeys = new Array();
     * var fileKey1 = "Unit=Default/Instance=Defaul...";
     * var docKey1 = "41D3695F2B1E11DD8A9A000C29FACDC2";
     * var fileKey2 = "Unit=Default/Instance=Defaul...";
     * var docKey2 = "28CDB49ECE1B11DB9FC3000C29FACDC2";
     * fileKeys[0] = fileKey1;
     * docKeys[0] = docKey1;
     * fileKeys[1] = fileKey2;
     * docKeys[1] = docKey2;
     * var itArchDoc = xmlserver.downloadBlobs(fileKeys, docKeys);
     * if (!itArchDoc)
     * {
     *    util.out(xmlserver.getLastError())
     *    return -1;
     * }
     * for (var archDoc=itArchDoc.first(); archDoc; archDoc=itArchDoc.next())
     * {
     *    util.out(archDoc.name);
     *    util.out(archDoc.localPath);
     * }
     */
    downloadBlobs(fileKey: string, docKey: string): ArchiveConnectionBlobIterator;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Upload an attachment to the XML-Server.**
     *
     * This method performs a "putblob" request to an installed EASY XML-Server.
     *
     * **Note:** You may use {@link util.getUniqueId | util.getUniqueId()} to create a blobreference. However this may be not unique enough,
     * if several portal servers are connected to the same XML-server in this way.
     *
     * **Note:** Method is only available for EE.x using XML-Server
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @param doc The Document object, whose binary content is to be uploaded
     * @param blobreference A unique string, which will identify the content in the XML-Server's blobcache.
     * @returns A boolean value indicates, if the attachment has succeessfully been uploaded.
     * @example
     * var xmlserver = context.getArchiveConnection();
     * if (!xmlserver)
     *    throw "Error: no ArchiveConnection"
     * // Create a unique id as BlobReference for the upload
     * var blobRef = util.getUniqueId();
     * // take a Document object and upload it to the ArchiveConnection
     * if (!xmlserver.putBlob(doc, blobRef))
     *    throw "Upload failed";
     * // Now the blobRef can be used e.g. for an IMPORT request
     */
    putBlob(doc: Document, blobreference: string): boolean;
    /**
     * **Sends a query EQL to the EE.x XML-Server and returns the response XML.**
     *
     * With this method you can send a query EQL to the XML-Server of EASY ENTERPRISE.x If the method succeed the return value is the response-xml,
     * otherwise it returns `null`. If the value is `null` you can retrieve the error message by executing `ArchiveConnection.getLastError()`.
     *
     * **Note:** Method is only available for EE.x using XML-Server
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @param eql String containing the EQL
     * @param wantedHits Number of currently wanted hits (optional)
     * **Default:** `-1`
     * @param maxHits Max. number of hits, that the ArchiveConnection should respond (optional).
     * **Default:** `-1`
     * @returns String with the response (xml) or `null` in case of any error
     * @example
     * var xmlserver = context.getArchiveConnection();
     * if (xmlserver)
     * {
     *    var eql = "SELECT \@Finance.Type FROM \@Finance WHERE isnewestversion(FIBU) ORDER BY FIBU.BUCHUNGSTYP ASC";
     *    var res = xmlserver.queryRawEEx(eql);
     *    if (!res)
     *       util.out(xmlserver.getLastError());
     *    else
     *       util.out(res);
     *  }
     */
    queryRawEEx(eql: string, wantedHits?: number, maxHits?: number): string;
    /**
     * **Sends a request to the EBIS interface and returns the response.**
     *
     * With this method you can send a GET or a POST request to an EBIS interface. If the request succeeds,
     * the return value is the HTTP-content of the response. Otherwise the function returns an empty String.
     * Call `ArchiveConnection.getLastError()` subsequently to test for eventual errors.
     * If the interface reports an error, it will be prefixed with "[EBIS] ".
     *
     * **Note:** The function is unable to handle a response with binary data. The function does not check the parameters for
     * illegal characters, such as linefeeds in the extraHeaders, for example.
     *
     * **Note:** Method is only available for EBIS
     * @since DOCUMENTS 5.0a
     * @param resourceIdentifier String containing the REST resource identifier (in other words: the back part of the URL).
     * @param postData A optional String with content data of a HTTP-POST request. If the parameter is missing or empty, the function generates a GET request.
     * @param extraHeaders A optional Array of Strings with an even number of elements. The first element of each pair must contain the name,
     * the second one the value of an additional HTTP header element.
     * **Default:** `[]`
     * @returns A String with the response. This may be an XML or plain text. It depends on the request.
     * @example
     * //
     * // Example for GET
     * //
     * var ebisConn = context.getArchiveConnection("ebisStore1");
     * if (ebisConn)
     * {
     *   var factoryInfo = ebisConn.sendEbisRequest("/factory");
     *   var eText = ebisConn.getLastError();
     *   if(eText == "")
     *     util.out(factoryInfo);
     *   else
     *     util.out(eText);
     * }
     * //
     * // Example for POST (do a query on EBIS with JSON)
     * //
     * var req = {};
     * req.maxHits = 250;
     * req.pageSize = 20;
     * req.unformattedResult = true;
     * req.includeTextmarkers = true;
     * // search sources
     * req.sources = ["Unit=Default/Instance=Default/View=Store01"];
     * // hitlist fields
     * req.fields = [];
     * req.fields.push({field: "TITLE", sort: "NONE"})
     * req.fields.push({field: "MODIFIED_DATE", sort: "NONE"})
     * req.fields.push({field: "_type", sort: "NONE"})
     * // search condition: all files of filetype "Simple"
     * req.conditions = {};
     * req.conditions.type = "set";
     * req.conditions.conditions = [{type : "compare", field : "_type", value : "Simple", or : true, not : false}];
     * var json = JSON.stringify(req);
     * var archiveServer = context.getArchiveServer("ebisStore1");
     * var ebisConn = archiveServer.getArchiveConnection();
     * var headers = ["Content-Type", "application/json", "Accept", "application/json"];
     * var res = ebisConn.sendEbisRequest("/search", json, headers);
     * util.out(res);
     * => EBIS returns query id  { id : "8c31d9352240a1c507d8d5f163e49085", columns : [ ], infos : [ ], executed : false }
     */
    sendEbisRequest(resourceIdentifier: string, postData?: string, extraHeaders?: string[]): string;
    /**
     * **Sends a request to the ArchiveConnection and returns the response XML.**
     *
     * With this method you can send a request to the XML-Server of EASY ENTERPRISE. If the method succeeds the return value is the response-xml,
     * otherwise it returns `null`. If the value is `null` you can retrieve the error message by executing `ArchiveConnection.getLastError()`.
     *
     * **Note:** Method is only available for EE.x using XML-Server
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @param request String containing the request
     * @returns an String with the response (xml) or `null` in case of any error
     * @example
     * var xmlserver = context.getArchiveConnection();
     * if (xmlserver)
     * {
     *    var req = "<INFO REQUESTID=\"1\"/>";
     *    var res = xmlserver.sendRequest(req);
     *    if (!res)
     *       util.out(xmlserver.getLastError());
     *    else
     *       util.out(res);
     *  }
     */
    sendRequest(request: string): string;
}
/**
 * **The ArchiveConnectionBlob class provides access to each single attachment of files in the archive.**
 *
 * This class holds data like name, extension, size etc. of attachments in the archive. The existance of an object means, that an attachment exists in the archive.
 *
 * **Note:** You can not create objects of this class. Objects of this class are available only as return value of other functions,
 * e.g. {@link ArchiveConnection.downloadBlob | ArchiveConnection.downloadBlob(String fileKey, String docKey)}.
 *
 * **Note:** Class is only available for an {@link ArchiveConnection} to a XML-Server
 * @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
 */
declare interface ArchiveConnectionBlob {
    /**
     * **Integer containing the filesize of an attachment in the archive.**
     *
     * This property contains the filesize of the attachment in bytes (83605).
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.bytes);
     */
    bytes: number;
    /**
     * **String containing the key of the attachment in the archive.**
     *
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.docKey);
     */
    docKey: string;
    /**
     * **boolean that indicates whether an attachment of the archive is locally available at the PortalServer.**
     *
     * If the attachment in the archive is locally available at the PortalServer's file system, this value is `true`.
     * @example
     * ....
     * var archDoc = ...
     * if (archDoc.downloaded)
     *    util.out(archDoc.localPath);
     */
    downloaded: boolean;
    /**
     * **String containing the key of the file the attachment belongs to in the archive.**
     *
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.fileKey);
     */
    fileKey: string;
    /**
     * **String with the local path to the attachment (blob).**
     *
     * This path is only available if the attribute {@link ArchiveConnectionBlob.downloaded | `ArchiveConnectionBlob.downloaded`} is `true`
     * @example
     * ....
     * var archDoc = ...
     * if (archDoc.downloaded)
     *    util.out(archDoc.localPath);
     */
    localPath: string;
    /**
     * **String containing the mime-type of an attachment in the archive.**
     *
     * This property contains the mime-type of the attachment, e.g image/jpeg.
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.mimeType);
     */
    mimeType: string;
    /**
     * **String containing the name of the attachment in the archive.**
     *
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.name);
     */
    name: string;
    /**
     * **String containing the filesize of an attachment in the archive.**
     *
     * This property contains the filesize of the attachment in as readable way (81.6 KB).
     * @example
     * ....
     * var archDoc = xmlserver.downloadBlob(....);
     * util.out(archDoc.size);
     */
    size: string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @returns Text of the last error as String
     */
    getLastError(): string;
}
/**
 * **The ArchiveConnectionBlobIterator class is an iterator that holds a list of objects of the class {@link ArchiveConnectionBlob}.**
 *
 * You may access ArchiveConnectionBlobIterator objects by the ArchiveConnection.downloadBlobs() method described in the ArchiceConnection chapter.
 *
 * **Note:** Class is only available for an {@link ArchiceConnection} to a XML-Server
 * @since ELC 3.60h / otrisPORTAL 6.0h
 */
declare interface ArchiveConnectionBlobIterator {
    /**
     * **Retrieve the first {@link ArchiveConnectionBlob} object in the ArchiveConnectionBlobIterator.**
     *
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @returns ArchiveConnectionBlob or `null` in case of an empty ArchiveConnectionBlobIterator
     */
    first(): ArchiveConnectionBlob;
    /**
     * **Retrieve the next {@link ArchiveConnectionBlob} object in the ArchiveConnectionBlobIterator.**
     *
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @returns ArchiveConnectionBlob or `null` if end of ArchiveConnectionBlobIterator is reached
     */
    next(): ArchiveConnectionBlob;
    /**
     * **Get the amount of {@link ArchiveConnectionBlob} objects in the ArchiveConnectionBlobIterator.**
     *
     * @since ELC 3.60h / otrisPORTAL 6.0h
     * @returns integer value with the amount of ArchiveConnectionBlob objects in the ArchiveConnectionBlobIterator
     */
    size(): number;
}
/**
 * The ArchiveFileResultset class supports basic functions to loop through a list of ArchiveFile objects.
 */
declare class ArchiveFileResultset {
    /**
     * **Create a new ArchiveFileResultset object.**
     *
     * Like in other programming languages you create a new object with the `new` operator (refer to example below).
     *
     * **Note:** Important: The resultset may contain less hits than really exist. For EE.i and EE.x the limit of
     * returned hits is the value of the DOCUMENTS property "MaxArchiveHitsFolder". If the property is not set,
     * the limit is the XML-Server's default hit count. For EAS, The limit is either the "MaxArchiveHitsFolder"
     * value or the limit of free research hitlists. The method is the same for dynamic folders and link-registers.
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @param archiveKey String containing the key of the desired view or archive
     * @param filter String containing an filter criterium; use empty String ('') if you don't want to filter at all
     * @param sortOrder String containing an sort order; use empty String ('') if you don't want to sort at all
     * @param hitlist String containing the hitlist that you want to use (optional für EE.i / mandatory for EE.x
     * @param unlimitedHits boolean that indicates if the archive hit limit must be ignored
     * **Default:** `false`
     * @example
     * // Example for EE.i:
     * var archiveKey = "$(#STANDARD)\\EINRECH";
     * archiveKey += "@myeei";            // since Documents 4.0 using multi archive server
     * var filter = "Kreditor='ALFKI'";
     * var sortOrder = "BelegNr+";
     * var hitlist = "STANDARD";
     * var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder, hitlist);
     * var archFile = null;
     * while (true)
     * {
     *    try
     *    {
     *       archFile = archFile ? myAFRS.next() : myAFRS.first();
     *       if (!archFile) // end of ArchiveFileResultset
     *          break;
     *       util.out(archFile.getArchiveKey());
     *    }
     *    catch (err)
     *    {
     *       util.out("Unable to load archFile: " + err);
     *    }
     * }
     * @example
     * // Example for EE.x:
     * var archiveKey = "Unit=Default/Instance=Default/View=Scanners";
     * archiveKey += "@myeex";            // since Documents 4.0 using multi archive server
     * var filter = "Speed=10";
     * var sortOrder = "";
     * var hitlist = "Default";
     * var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder, hitlist);
     * @example
     * // Example for EAS:
     * var archiveKey = "Order";
     * archiveKey += "@myeas";            // since Documents 4.0 using multi archive server
     * var filter = "company=A*";
     * var sortOrder = "company+";
     * var myAFRS = new ArchiveFileResultset(archiveKey, filter, sortOrder);
     */
    constructor(archiveKey: string, filter: string, sortOrder: string, hitlist: string, unlimitedHits?: boolean);
    /**
     * **Retrieve the first {@link DocFile} object in the ArchiveFileResultset.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @returns DocFile, `null` in case of an empty ArchiveFileResultset, throws an exception on error loading archive file.
     */
    first(): DocFile;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the last {@link DocFile} object in the ArchiveFileResultset.**
     *
     * @since ELC 3.60j / otrisPORTAL 6.0j
     * @returns DocFile or `null` if end of ArchiveFileResultset is reached.
     */
    last(): DocFile;
    /**
     * **Retrieve the next {@link DocFile} object in the ArchiveFileResultset.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @returns DocFile, `null` if end of ArchiveFileResultset is reached, throws an exception on error loading archive file.
     */
    next(): DocFile;
    /**
     * **Get the amount of {@link DocFile} objects in the ArchiveFileResultset.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @returns integer value with the amount of DocFile objects in the ArchiveFileResultset
     */
    size(): number;
}
/**
 * **The ArchiveServer class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS ArchiveServer by scripting means.**
 *
 * @since DOCUMENTS 5.0a
 */
declare interface ArchiveServer {
    /**
     * **The technical name of the ArchiveServer.**
     *
     * @since DOCUMENTS 5.0a
     */
    name: string;
    /**
     * **Retrieve the archive connection object for EAS, EBIS or EASY Enterprise XML-Server.**
     *
     * The ArchiveConnection object can be used for low level call directly on the archive interface.
     * @since DOCUMENTS 5.0a
     * @returns `ArchiveConnection` object if successful, `null` in case of any error
     */
    getArchiveConnection(): ArchiveConnection;
    /**
     * **Get the String value of an attribute of the ArchiveServer.**
     *
     * **Note:** This function is only for experts. Knowledge about the DOCUMENTS-database schema is necessary!
     * @since DOCUMENTS 5.0a
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **If you call a method at an ArchiveServer object and an error occurred, you can get the error description with this function.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since DOCUMENTS 5.0a
     * @param shortMessage optional Boolean; removes "Error in function: class.method(): " from the message.
     * **Default:** `false`
     * @returns Text of the last error as String
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     * @since DOCUMENTS 5.0a
     * @param oidLow  Optional flag:
     * If `true` only the id of the ArchiveServer object (`m_oid`) will be returned.
     * If `false` the id of the ArchiveServer object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     * **Default:** `false`
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Returns a json string with the retention policies of the ArchiveServer.**
     *
     * **Note:** Only available for EAS ArchiveServer
     * @since DOCUMENTS 5.0i
     * @returns `json-String`; throws an exception in case of an error
     * @example
     * try {
     *   var as = context.getArchiveServer("EDA_2022");
     *   var policiesString = as.getRetentionPolicies()
     *   util.out(policiesString);
     * } catch (err) {
     *   util.out(err)
     * }
     */
    getRetentionPolicies(): string;
    /**
     * **Set the String value of an attribute of the ArchiveServer to the desired value.**
     *
     * **Note:** This function is only for experts. Knowledge about the DOCUMENTS-database schema is necessary!
     * @since DOCUMENTS 5.0a
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **After changes on the ArchiveServer with scripting methods, it is necessary to submit them to make them immediately valid.**
     *
     * The settings of the ArchiveServer will be cached in a connection pool to the archive system. The pool does not recognize
     * changes in the ArchiveServer object automatically, therefore it is necessary to call this method after all.
     * @since DOCUMENTS 5.0c
     * @returns
     * @example
     * var as = context.getArchiveServer("EDA_2017");
     * if (as)
     * {
     *   as.setAttribute("Host", "127.0.0.1");
     *   as.submitChanges();
     * }
     */
    submitChanges(): void;
}
/**
 * **The ArchiveServerIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS ArchiveSerevr by scripting means.**
 *
 * @since DOCUMENTS 5.0a
 */
declare interface ArchiveServerIterator {
    /**
     * **Retrieve the first {@link ArchiveServer} object in the ArchiveServerIterator.**
     *
     * @since DOCUMENTS 5.0a
     * @returns ArchiveServer or `null` in case of an empty ArchiveServerIterator
     */
    first(): ArchiveServer;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0a
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Retrieve the next {@link ArchiveServer} object in the ArchiveServerIterator.**
     *
     * @since DOCUMENTS 5.0a
     * @returns ArchiveServer or `null` if end of ArchiveServerIterator is reached.
     */
    next(): ArchiveServer;
    /**
     * **Get the amount of {@link ArchiveServer} objects in the ArchiveServerIterator.**
     *
     * @since DOCUMENTS 5.0a
     * @returns integer value with the amount of ArchiveServer objects in the ArchiveServerIterator
     */
    size(): number;
}
/**
 * The ArchivingDescription class has been added to the DOCUMENTS PortalScripting API to improve the archiving process of DOCUMENTS files by scripting means.
 *
 * For instance this allows to use different target archives for each file as well as to influence the archiving process by the file's contents itself.
 * The ArchivingDescription object can only be used as parameter for the method [DocFile.archive(ArchivingDescription)](../interfaces/DocFile.html#archive.archive-3)
 *
 * **Note:** By default, archiving with an ArchivingDescription does not include any attachments. To archive some attachments, the script needs to call
 * {@link ArchivingDescription.addRegister | `addRegister()`} on this object.
 *
 * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
 * **Since:** EAS: ELC 4.0 / otrisPORTAL 7
 */
declare class ArchivingDescription {
    /**
     * **Create a new ArchivingDescription object.**
     *
     * Like in other programming languages you create a new object with the `new` operator (refer to example below).
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: ELC 4.0 / otrisPORTAL 7
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @see [DocFile.archive(ArchivingDescription)](../interfaces/DocFile.html#archive.archive-3)
     * @example
     * // Example for EE.i:
     * var docFile = context.file;
     * if (!docFile)
     * {
     *    // error handling
     * }
     * var ad = new ArchivingDescription();
     * ad.targetArchive = "$(#DEMO)\\BELEGE";
     * ad.archiveServer = "myeei";  // since Documents 4.0 using multi archive server
     * // Note: This example does not archive any attachments
     * var success = docFile.archive(ad);
     * if (!success)
     * {
     *    util.out(docFile.getLastError());
     * }
     * @example
     * // Example for EE.x:
     * var docFile = context.file;
     * if (!docFile)
     * {
     *    // error handling
     * }
     * var ad = new ArchivingDescription();
     * ad.targetView = "Unit=Default/Instance=Default/View=DeliveryNotes";
     * ad.targetSchema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
     * ad.archiveServer = "myeex";  // since Documents 4.0 using multi archive server
     * ad.archiveMonitor = true;
     * // Note: This example does not archive any attachments
     * var success = docFile.archive(ad);
     * if (!success)
     * {
     *    util.out(docFile.getLastError());
     * }
     * @example
     * // Example for EAS:
     * var docFile = context.file;
     * if (!docFile)
     * {
     *    // error handling
     * }
     * var ad = new ArchivingDescription();
     * ad.archiveServer = "myeas";
     * ad.archiveMonitor = true;
     * // Note: This example does not archive any attachments
     * var success = docFile.archive(ad);
     * if (success)
     *    util.out(docFile.getArchiveKey());
     * else
     *    util.out(docFile.getLastError());
     */
    constructor();
    /**
     * **boolean value whether to archive the monitor of the file.**
     *
     * Like on the filetype in the Portal Client you may decide whether you want to archive the monitor of the file along with the file.
     * If so, the file's monitor will be transformed to a HTML file named monitor.html, and it will be part of the archived file in the desired target archive.
     *
     * **Since:** ELC 3.51c / otrisPORTAL 5.1c EE.i
     * **Since:** ELC 3.60a / otrisPORTAL 6.0a EE.x
     * **Since:** ELC 4.0 / otrisPORTAL 7.0 EAS
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @example
     * var ad = new ArchivingDescription();
     * ad.archiveMonitor = true; // archive monitor of file as HTML page as well
     */
    archiveMonitor: boolean;
    /**
     * **String containing the name of the archive server in a multi archive server environment.**
     *
     * You need to define the archive server if you want to archive in an archive server that is different from the main archives server.
     * If you want to archive into the main archive you can leave this value empty.
     *
     * **Note:** This value has only to be set if you habe multiple archive servers
     * @since ELC 4.0 / otrisPORTAL 7.0 (EE.i, EE.x, EAS)
     * @example
     * var ad = new ArchivingDescription();
     * ad.archiveServer = "myeei"";
     */
    archiveServer: string;
    /**
     * **boolean value whether to archive the status of the file.**
     *
     * Like on the filetype in the Portal Client you may decide whether you want to archive the status of the file along with the file.
     * If so, the file's status will be transformed to a HTML file named status.html, and it will be part of the archived file in the desired target archive.
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: ELC 4.0 / otrisPORTAL 7
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @example
     * var ad = new ArchivingDescription();
     * ad.archiveStatus = true; // archive status of file as HTML page as well
     */
    archiveStatus: boolean;
    /**
     * **String containing the complete address of the target archive for archiving to EE.i.**
     *
     * You need to define the target archive including the "Storageplace".
     *
     * **Note:** This value has only to be set if you want to archive to EE.i. If you want to archive to EE.x, you have to set targetView and targetSchema.
     * It is important to know that the target archive String must use the socalled XML-Server syntax. It is as well neccessary to use a double backslash (\\)
     * if you define your target archive as an PortalScript String value, because a single backslash is a special character.
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @example
     * var ad = new ArchivingDescription();
     * ad.targetArchive = "$(#DEMO)\\BELEGE";  // archiving to "DEMO\BELEGE"
     */
    targetArchive: string;
    /**
     * **String containing the complete address of the target schema used for archiving to EE.x.**
     *
     * You need to define the target schema you want to archive into.
     *
     * **Note:** This value has only to be set if you want to archive to EE.x.
     * @since ELC 3.60a / otrisPORTAL 6.0a
     * @example
     * var ad = new ArchivingDescription();
     * ad.targetView = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
     */
    targetSchema: string;
    /**
     * **String containing the complete address of the target view used for archiving to EE.x.**
     *
     * You need to define the target view (write pool) you want to archive into.
     *
     * **Note:** This value has only to be set if you want to archive to EE.x.
     * @since ELC 3.60a / otrisPORTAL 6.0a
     * @example
     * var ad = new ArchivingDescription();
     * ad.targetView = "Unit=Default/Instance=Default/View=DeliveryNotes";
     */
    targetView: string;
    /**
     * **boolean value whether to use the versioning technique in the archive.**
     *
     * If the DocFile has already been archived and if you define this attribute to be true, a new version of the archive file
     * will be created otherwise a independent new file in the archive will be created.
     *
     * **Since:**  EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: ELC 4.0 / otrisPORTAL 7
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @example
     * var ad = new ArchivingDescription();
     * ad.versioning = true; // use versioning for archived file
     */
    versioning: boolean;
    /**
     * **flag an additional (document) register to be archived with the file.**
     *
     * You may add the technical names of different document registers to an internal list of your ArchivingDescription object.
     * This allows for example to archive only part of your documents of your DocFile.
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: ELC 4.0 / otrisPORTAL 7
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param registerName String containing the technical name of the register to be archived. Pass "all_docs" to archive all attachments of your DocFile.
     * @returns
     * @example
     * var docFile = context.file;
     * var ad = new ArchivingDescription();
     * ad.targetArchive = "$(#DEMO)\\BELEGE";
     * ad.addRegister("Documents");
     * ad.addRegister("InternalDocuments");
     * docFile.archive(ad);
     */
    addRegister(registerName: string): void;
}
type EventType = "afterMail" | "afterSave" | "attributeSetter" | "autoText" | "condition" | "custom" | "fileAction" | "folderAction" | "moveTrash" | "newFile" | "onAutoLogin" | "onArchive" | "onDelete" | "onDeleteAll" | "onEdit" | "onLogin" | "onSave" | "test" | "workflow" | "onUndelete" | "mailAvailableBlobs" | "afterArchive" | "beforeEdit" | "afterCancelEdit" | "afterCheckIn" | "afterCancelCheckOut" | "onAfterLogin" | "onAfterAutoLogin" | "afterEditArchiveFile" | "FileAccess" | "onSetPassword" | "onReceiveWorkflowAction" | "beforeWorkflowAssign" | "onForwardFile" | "afterForwardFile" | "hideForwardOption" | "hideForwardReceiver" | "filingStructureAction" | "afterReactivate" | "onUploadDocument" | "onUploadNewDocument" | "afterUploadDocument" | "afterUploadNewDocument" | "afterOcr" | "allowedActions" | "registerAction" | "beforeSendEmail" | "toFiletypeChanged";
/**
 * This is the ONE implicit object of the class {@link Context | `Context`} which is named `context`.
 * @see {@link Context | Context}
 */
declare const context: Context;
/**
 * **This class can be used to access the most important attributes and methods for customizing
 * DOCUMENTS with PortalScripting.**
 *
 * There is exactly ONE implicit object of this class which is named {@link context | `context`}.
 * This implicit object is the root object in any script. With the {@link context | `context`} object
 * you are able to access to the different DOCUMENTS objects like DocFile, Folder etc. Some
 * of the attributes are only available under certain conditions. It depends on the execution
 * context of the PortalScript, whether a certain attribute is accessible or not. For example,
 * {@link context.selectedFiles | `context.selectedFiles`} is available in a folder userdefined
 * action script, but not in a script used as a signal exit.
 *
 * @groupDescription PEM Module Constants
 * These constants build an enumeration of the possible values of the pem license.
 * **Since** DOCUMENTS 5.0c HF2
 * **See** {@link Context.hasPEMModule | Context.hasPEMModule(moduleConst)}
 *
 * @groupDescription Script Origin Constants
 * These constants build an enumeration of the possible values indicating where a script comes from.
 * **Since** DOCUMENTS 5.0i HF5
 * **See** {@link context.getScriptOrigin | context.getScriptOrigin(scriptName)}
 */
declare interface Context {
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_INVOICE: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_FP_HENR: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_LDAP: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CONTRACT: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_OUTLOOK_WEB: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_OUTLOOK_SYNC: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_WORDML: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_MOBILE: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_BUSINESS_UNITS: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CONTROLLING: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_REPORTING: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_EASYHR: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CONTRACT_SAP: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_GADGETS: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_INBOX: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_IMS: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CGC: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CGC_ENT: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CGC_ENT_PLUS: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_CREATOR: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_DOC_TREE: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_RISK_MANAGEMENT: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_IFRS16: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_SIGN: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_IP_MANAGEMENT: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_DROP: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_MATTER: number;
    /**
     * @group PEM Module Constants
     */
    readonly PEM_MODULE_DRIVECONNECT: number;
    /**
     * @group Script Origin Constants
     */
    readonly SCRIPT_UNKNOWN: number;
    /**
     * @group Script Origin Constants
     */
    readonly SCRIPT_FROM_DB: number;
    /**
     * @group Script Origin Constants
     */
    readonly SCRIPT_FROM_LIBS: number;
    /**
     * **Technical name of the user defined action the script is executed for.**
     *
     * @since DOCUMENTS 5.0f
     * @example
     * util.out(context.actionName);
     */
    actionName: string;
    /**
     * **Id of the client / thread which is the execution context of the script.**
     *
     * This property is helpful to identify the clients at scripts running concurrently (for debugging purposes).
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @example
     * util.out(context.clientId);
     */
    clientId: string;
    /**
     * **Login of the user who has triggered the script execution.**
     *
     * If the script is running e.g. as action in the workflow the user is the logged in user, who has initiated the action.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.currentUser);
     */
    currentUser: string;
    /**
     * **Document object representing the current document that the script is executed at.**
     *
     * **Note:** If the script is not executed in a document context then the return value is `null`.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var doc = context.document;
     */
    document: Document;
    /**
     * **Error message text to be returned by the script.**
     *
     * The error message will be displayed as Javascript alert box in the web client if the script is called in context of a web client.
     *
     * **Note:** You can get and set this property.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * context.errorMessage = "You are not authorized to run this script";
     * return -1; // neccessary to indicate an error
     */
    errorMessage: string;
    /**
     * **Event which triggered the script execution.**
     *
     * According to the context where the portal script has been called this property contains a key name for this event.
     *
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @example
     * if (context.event == "fileAction")
     * {
     *     util.out("Action at the file");
     * }
     */
    event: EventType;
    /**
     * **Returns in an enumeration script the name of the field where the script is executed for.**
     *
     * If the script is an enumeration script, this member contains the field name of the current field where the script is executed.
     * This is particularly helpful when the script is set at more than one enumeration field and the behaviour of the script should depend on the field.
     * @since DOCUMENTS 5.0c HF2
     */
    fieldName: string;
    /**
     * **DocFile object representing the current file that the script is executed at.**
     *
     * **Note:** If the script is not executed in a file context then the return value is `null`.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var file = context.file;
     */
    file: DocFile;
    /**
     * **Technical name of the filetype of the file which is the execution context of the script.**
     *
     * This property contains the technical name of the filetype of the file which is the execution context of the script.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @see {@link context.file | context.file}
     * @example
     * util.out(context.fileType);
     */
    fileType: string;
    /**
     * **Current folder in which context the script is running.**
     *
     * @since DOCUMENTS 5.0d
     * @example
     * var folder = context.folder;
     */
    folder: Folder;
    /**
     * **FileResultset with all files of a folder.**
     *
     * This property allows to retrieve a list of all files of a folder if this script is run as user defined action at the folder.
     * You can then iterate through this list for further use of the distinct files.
     *
     * **Note:** If there is no file inside the folder you will receive a valid empty FileResultset.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var it = context.folderFiles;
     */
    folderFiles: FileResultset;
    /**
     * **Technical name of the folder the script is called from.**
     *
     * This property contains the technical name of the folder which is the execution context of the script.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.folderName);
     */
    folderName: string;
    /**
     * **Session id of the current query-session.**
     *
     * @since DOCUMENTS 5.0d HF1
     */
    qsession: string;
    /**
     * **Register object representing the current register that the script is executed at.**
     *
     * **Note:** If the script is not executed in a register context then the return value is `null`.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var reg = context.register;
     */
    register: Register;
    /**
     * **Amount of documents (binaries) in documents repository for the current principal.**
     *
     * The amount includes all versions of the documents.
     * @since DOCUMENTS 5.0h HF1
     */
    repositoryCount: Number;
    /**
     * **Path to the documents repository for the current principal.**
     *
     * @since DOCUMENTS 5.0h HF1
     */
    repositoryPath: string;
    /**
     * **Size of documents repository for the current principal in bytes.**
     *
     * The size includes all versions of the documents.
     * @since DOCUMENTS 5.0h HF1
     */
    repositorySize: Number;
    /**
     * **Type of the return value that the script returns.**
     *
     * The following list shows all available types.
     * Return value of type object is not allowed (use `JSON.stringify()` if necessary).
     *
     * | **returnType** | **return Value** | **Description** |
     * |---|---|---|
     * | `"stay"` |  | Default behaviour. Show current file.   |
     * | `"updateFile"` |  | Show and update current file.   |
     * | `"html"` | **HTML** | Show the **HTML** |
     * | `"htmlpopup"` | **HTML** | Show the **HTML** in a dialog   |
     * | `"showFile"` | **fileId[**`&dlcRegisterId=`**registerId]** | Show the file   |
     * | `"showEditFile"` | **fileId** | Open the file in edit mode   |
     * | `"showNewFile"` | **fileId** | Open the file in edit mode and delete it on cancellation   |
     * | `"showFolder"` | **folderId** | Show the folder   |
     * | `"showOverview"` |  | Show the overview page   |
     * | `"updateTree"` | **folderId** | Show and update the folder   |
     * | `"file:filename"` | string with the content of the file  | Ask the user, if they want to download the content of the return value (usually a String variable). The filename `filename` will be proposed as a default.   |
     * | `"download:filename"` | string with path to th blob  | Ask the user, if they want to download the blob, that is specified in the return value (server-sided path to the blob). The filename `filename` will be proposed as a default.   |
     * | `"checkoutDocuments"` | `JSON.stringify({"fileId": "","registerId": "","documentId": "","openLocal": false})` | Checkout document and open it in edit mode   |
     * | `"clientScript"` | **JavaScript** code  | Execute the code   |
     * | `"destroyHitTree"` |  | Remove current **HitTree** from server cache. So after logout the **HitTree** won't be available anymore.   |
     * | `"gadget"` | Example: `JSON.stringify({gadgetScript:"Gadget_SimpleSample", gadgetAction: "initGadget"})` | Show **Gadget** in dialog   |
     * | `"hitTree"` |  | Show **HitTree** outbar   |
     * | `"openOutbar"` | Technical name of an outbar  | Show the outbar   |
     * | `"openAndReloadOutbar"` | Technical name of an outbar  | Show and reload the outbar   |
     * | `"refreshFolder"` | `JSON.stringify({folderId: "", selectedHit: ""})` | Refresh folder with id `folderId` or current folder if not set. The file in `selectedHit` will be selected.   |
     * | `"refreshScriptList"` |  | Refresh scriptlist by executing the referenced script.   |
     * | `"scriptList"` | Created scriptlist as JSON string  | Show the scriptlist   |
     * | `"treeChart"` | Treechart as JSON string  | Show the treechart   |
     * | `"multipleAction"` | Example: `JSON.stringify([{returnType: 'showFile', returnValue : fileId}, {returnType: 'html', returnValue : 'HTML-Code'}])` | Execute all actions specified in array. |
     *
     * **Note:** You may read from and write to this property. For further information and examples see "HowTo-Sammlung" on otris.software.
     *
     * **Since:** DOCUMENTS 4.0c showFile with return value of file-id and register-id
     * **Since:** ELC 3.50c / otrisPORTAL 5.0c showNewFile, updateTree, file
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * // Example 1: showFile
     * context.returnType = "showFile";
     * var idFile = docFile.getAutoText("id");
     * return idFile;
     * @example
     * // Example 2: showFile with specific register
     * context.returnType = "showFile";
     * var idFile = docFile.getAutoText("id");
     * var idRegister = docFile.getRegisterByName("internal_documents").getAttribute("id");
     * return idFile + "&dlcRegisterId=" + idRegister;
     * @example
     * // Example 3:
     * var itFolders = context.getFoldersByName("Invoice");
     * var folder = itFolders.first();
     * if (folder == null)
     * {
     *    context.returnType = "html";
     *    return "<h1>Unable to find folder Invoice</h1>";
     * }
     * context.returnType = "showFolder";
     * return folder.id;
     * @example
     * // Example 4:
     * var csv = "row11;row12;row13\n";
     * csv += "row21;row22;row23";
     * context.returnType = "file:example.csv";
     * return csv;
     */
    returnType: string;
    /**
     * **Set the return value of a PortalScript.**
     *
     * Until now the PortalScripts returns their return value by the `return` statement at the end of the script.
     * `return retvalue;` In DOCUMENTS 6 with the V8 JS-Engine, in script mode `Module` the `return` statement
     * is only allowed in the context of a function. Therefore, in this case it is no longer possible to use the
     * return statement in the "old" way. The return value has to be set as a property at the context object.
     * However, in script mode `Classic` the return statement can still be used at the end of the script, but
     * it is not recommended.
     *
     * ```
     * context.returnValue = retvalue;
     * ```
     *
     * In DOCUMENTS 5 `context.returnValue` is now supported since 5.0h HF1 and it is recommended to use this.
     * This makes your scripts compatible to run in DOCUMENTS 6.
     *
     * @since DOCUMENTS 5.0h HF1
     * @example
     * // Example 1: "old" Documents 5 return value
     * ...
     * var idFile = docFile.getid();
     * context.returnType = "showFile";
     * return idFile;
     * @example
     * // Example 2: "new" Documents 5/6 return value
     * ...
     * var idFile = docFile.getid();
     * context.returnType = "showFile";
     * context.returnValue = idFile;
     */
    returnValue: string | number | boolean | null;
    /**
     * **Name of the executed script.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.scriptName);
     */
    scriptName: string;
    /**
     * **Iterator with the selected archive files of a folder.**
     *
     * This property allows to retrieve a list of the selected archive files of a folder if this script is run as user defined action at the folder.
     * You can then iterate through this list for further use of the distinct files.
     *
     * **Note:** If there is no file selected you will receive a valid empty ArchiveFileResultset.
     * @since ELC 3.60j / otrisPORTAL 6.0j
     * @example
     * var it = context.selectedArchiveFiles;
     * var archiveFile = it.first()
     * while (archiveFile)
     * {
     *    util.out(archiveFile.getAutoText("title"));
     *    archiveFile = it.next();
     * }
     */
    selectedArchiveFiles: ArchiveFileResultset;
    /**
     * **Array with the keys of the selected archive files of a folder.**
     *
     * This property allows to retrieve an array with the keys of the selected archive files of a folder if this script is run as user defined action at the folder.
     *
     * **Note:** If there is no archive file selected you will receive a valid empty array.
     * @since ELC 3.60j / otrisPORTAL 6.0j
     * @example
     * var keys = context.selectedArchiveKeys;
     * util.out(keys.length)
     */
    selectedArchiveKeys: string[];
    /**
     * **DocumentIterator with the selected Documents (attachments) of the current document register.**
     *
     * This property allows to retrieve a list of all selected Documents of a register if this script is run as user defined action at the register.
     *
     * **Note:** If there is no document inside the Register you will receive a valid empty DocumentIterator.
     * @since DOCUMENTS 4.0b HF1
     * @example
     * var it = context.selectedDocuments;
     */
    selectedDocuments: DocumentIterator;
    /**
     * **Iterator with the selected files of a folder.**
     *
     * This property allows to retrieve a list of the selected files of a folder if this script is run as user defined action at the folder.
     * You can then iterate through this list for further use of the distinct files.
     *
     * **Note:** If there is no file selected you will receive a valid empty FileResultset.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var it = context.selectedFiles;
     */
    selectedFiles: FileResultset;
    /**
     * **Script source code of the script after including other scripts by the #import rule.**
     *
     * This property is useful for debugging purposes, if you need to have a look for a certain line of code to find an error,
     * but the script contains other imported sub scripts which mangle the line numbering.
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @example
     * util.out(context.sourceCode);
     */
    sourceCode: string;
    /**
     * **Id of the locking WorkflowStep for the user for the current file.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.workflowActionId);
     */
    workflowActionId: string;
    /**
     * **Name of the locking WorkflowStep for the user for the current file.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.workflowActionName);
     */
    workflowActionName: string;
    /**
     * **Id of the ControlFlow the current file currently passes.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.workflowControlFlowId);
     */
    workflowControlFlowId: string;
    /**
     * **Name of the ControlFlow the current file currently passes.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * util.out(context.workflowControlFlowName);
     */
    workflowControlFlowName: string;
    /**
     * **Returns the current workflowstep if the script is run in context of a workflow.**
     *
     * E.g. as guard or decision script.
     * @since DOCUMENTS 5.0
     */
    workflowStep: WorkflowStep;
    /**
     * **Creates a new global custom property.**
     *
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link context.setOrAddCustomProperty | context.setOrAddCustomProperty}
     * {@link context.getCustomProperties | context.getCustomProperties}
     * @example
     * var custProp = context.addCustomProperty("favorites", "string", "peachit");
     * if (!custProp)
     *   util.out(context.getLastError());
     */
    addCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Adds a time interval to a Date object.**
     *
     * Since date manipulation in Javascript is odd sometimes, this useful function allows to conveniently add a given period of time to a given date,
     * e.g. to calculate a due date based upon the current date plus `xx` days
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param ts Date object to which the period of time should be added
     * @param amount integer value of the period of time to be added
     * @param unit String value representing the time unit of the period of time.
     * You may use one of the following unit values:
     * + `"minutes"`
     * + `"hours"`
     * + `"days"`
     * + `"weeks"`
     * **Default:** `'minutes'`
     * @param useWorkCalendar `true` if work calendar should be taken into account, `false` if not. The work calendar has to be defined at Documents->Settings
     * **Default:** `true`
     * @returns Date object with the new date.
     * @see
     * {@link context.getDatesDiff | context.getDatesDiff}
     * {@link util.convertDateToString | util.convertDateToString}
     * {@link util.convertStringToDate | util.convertStringToDate}
     * @example
     * var actDate = new Date();  // actDate contains now the current date
     * var newDate = context.addTimeInterval(actDate, 14, "days", false);
     * util.out(newDate); // should  two weeks in the future
     */
    addTimeInterval(ts: Date, amount: number, unit?: string, useWorkCalendar?: boolean): Date;
    /**
     * **Change the user context of the PortalScript.**
     *
     * In some cases, especially if you make heavy use of access privileges both with files and file fields,
     * it might be neccessary to run a script in a different user context than the user who triggered the script execution.
     * For example, if the current user is not allowed to change any field values, a PortalScript running in this user's
     * context will fail, if it tries to change a field value. In this case it is best practice to switch the user context
     * to some superuser who is allowed to perform the restricted action before that restricted action is executed. You may
     * change the script's user context as often as you need, a change only applies to the instructions following the `changeScriptUser()` call.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param login String value containing the login name of the user to switch to
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var currentUserLogin = context.currentUser;
     * var success = context.changeScriptUser("schreiber");
     * // code runs now in the context of user "schreiber"
     * ...
     * // switch back to the original user
     * success = context.changeScriptUser(currentUserLogin);
     */
    changeScriptUser(login: string): boolean;
    /**
     * **Clears the cached enumval at the specified PortalScript.**
     *
     * @since DOCUMENTS 5.0c HF1
     * @param scriptName String with the name of the PortalScript
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var ret = context.clearEnumvalCache("lcmGetAllUser");
     * if (!ret)
     *    util.out(context.getLastError());
     */
    clearEnumvalCache(scriptName: string): boolean;
    /**
     * **Convert a Date object representing a date into a String.**
     *
     * The output String is in the date format of the specified locale. If you leave the locale parameter away the current locale of the script context will be used.
     * @since DOCUMENTS 4.0c HF1
     * @param dateOrTimeStamp Date/Timestamp object representing the desired date
     * @param locale **Default:** `user locale`
     * @returns
     * @see {@link util.convertDateToString | util.convertDateToString}
     * @example
     * var date1 = new Date(2014, 1, 14);
     * util.out(context.convertDateToString(date1, "de"));
     * // Output: 14.02.2014
     * util.out(context.convertDateToString(date1));
     * // Output: depends on the locale of the script context
     * var date2 = new Date(2014, 1, 14, 12, 59);
     * util.out(context.convertDateToString(date2, "en"));
     * // Output: 02/14/2014  12:59
     */
    convertDateToString(dateOrTimeStamp: Date, locale?: string): string;
    /**
     * **Converts a Number into a formatted String.**
     *
     * The output String may have any format you like. The parameters can be used to configure the format of the numeric String.
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param value Numeric object representing the number
     * @param decimalSep Decimal-Separator as String
     * @param thousandSep Thousend-Separator as String
     * @param precision Precision as number
     * **Default:** `2`
     * @returns String representing the desired number
     * @see {@link context.convertNumericToString | context.convertNumericToString}
     * @example
     * var numVal = 1000 * Math.PI;
     * util.out(context.convertNumericToString(numVal, ",", ".", 2));
     * Output: 3.141,59
     */
    convertNumericToString(value: number, decimalSep: string, thousandSep: string, precision?: number): string;
    /**
     * **Converts a Number into a formatted String.**
     *
     * The output String is formatted like the definition in the locale. If the locale is not defined by parameter, the locale of the current user will be used.
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param value Numeric object representing the number
     * @param locale Locale as String
     * **Default:** `user locale`
     * @param precision **Default:** `2`
     * @returns String representing the desired number
     * @see {@link context.convertNumericToString | context.convertNumericToString}
     * @example
     * var numVal = 1000 * Math.PI;
     * util.out(context.convertNumericToString(numVal, "en", 2));
     * Output: 3,141.59
     */
    convertNumericToString(value: number, locale?: string, precision?: number): string;
    /**
     * **Convert a String representing a date into a Date object.**
     *
     * The output Date is in the date format of the specified locale. If you omit the locale parameter the current locale of the script context will be used.
     * @since DOCUMENTS 5.0a HF2
     * @param dateOrTimeStamp String representing a date has to be formatted as the definition in the specified locale, e.g. "TT.MM.JJJJ" for the locale "de".
     * @param locale Optional String value with the locale abbreviation (according to the principal's configuration).
     * @returns
     * @see {@link util.convertStringToDate | util.convertStringToDate}
     * @example
     * var dateString = "19.09.1974";
     * var birthDay = context.convertStringToDate(dateString, "de");
     */
    convertStringToDate(dateOrTimeStamp: string, locale?: string): Date;
    /**
     * **Converts a formated String into a number.**
     *
     * The input String may have any format you like. The following parameters defines the format to configure the format of the numeric String.
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param numericValue Formatted numeric String
     * @param decimalSep Decimal-Separator as String
     * @param thousandSep Thousend-Separator as String
     * @returns the numeric number (float) or `null` if fail
     * @see {@link context.convertStringToNumeric | context.convertStringToNumeric}
     * @example
     * var numString = "1.000,99";
     * var floatVal = context.convertStringToNumeric(numString, ",", ".");
     */
    convertStringToNumeric(numericValue: string, decimalSep: string, thousandSep: string): number;
    /**
     * **Converts a formated String into a number.**
     *
     * The input String has to be formatted like the definition in the locale. If the locale is not defined by parameter, the locale of the current user will be used.
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param numericValue Formatted numeric String
     * @param locale Locale as String
     * **Default:** `userlocale`
     * @returns the numeric number (float) or `null` if fail
     * @see {@link context.convertStringToNumeric | context.convertStringToNumeric}
     * @example
     * var numString = "1,000.99";
     * var floatVal = context.convertStringToNumeric(numString, "en");
     */
    convertStringToNumeric(numericValue: string, locale?: string): number;
    /**
     * **Copy a file type.**
     *
     * @since DOCUMENTS 5.0f
     * @param sourceFileTypeName String containing the technical name of the file type to be copied.
     * @param targetFileTypeName Optional String containing the technical name of the file type copy. The default value is the `sourceFileTypeName` with the suffix "_copy".
     * @param released Optional boolean indicating whether the copied file type should be released. The default value is `true`.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * if (!context.copyFileType("myFileType", "fileTypeCopy"))
     *    util.out(contxt.getLastError());
     */
    copyFileType(sourceFileTypeName: string, targetFileTypeName: string, released: boolean): boolean;
    /**
     * **Retrieve the amount of pool files of the specified filetype in the system.**
     *
     * **Note:** This function is only for experts.
     * @since ELC 3.50j / otrisPORTAL 5.0j
     * @param fileType the technical name of the desired filetype
     * @returns Integer amount of pool files
     * @see {@link context.createPoolFile | context.createPoolFile}
     * @example
     * var fileType = "Standard"; // filetype
     * var poolSize = context.countPoolFiles(fileType); // amount of pool files
     * for (var i = poolSize; i < 3000; i++)
     * {
     *    context.createPoolFile(fileType);
     * }
     */
    countPoolFiles(fileType: string): number;
    /**
     * **Create a new access profile in the DOCUMENTS environment.**
     *
     * If the access profile already exist, the method returns an error.
     * @since ELC 3.60i / otrisPORTAL 6.0i
     * @param profileName technical name of the access profile
     * @returns AccessProfile object as a representation of the access profile in DOCUMENTS, `null` in case of any error
     * @example
     * var office = context.createAccessProfile("office");
     * if (!office)
     *    util.out(context.getLastError());
     */
    createAccessProfile(profileName: string): AccessProfile;
    /**
     * **Create a new ArchiveServer.**
     *
     * This function creates a new {@link ArchiveServer} for the specified archive software on the top level.
     * These types are available:
     * + `EEI`
     * + `EEX_native`
     * + `EBIS_store`
     * + `NOAH`
     * + `None`
     * @since DOCUMENTS 5.0a
     * @param name The technical name of the ArchiveServer to be created.
     * @param type The desired archive software of the ArchiveServer.
     * @returns New created ArchiveServer object or `null` if failed.
     * @example
     * var as = context.createArchiveServer("Invoice2016", "NOAH")   // EDA
     * if (as)
     *   util.out(as.name);
     * else
     *   util.out(context.getLastError());
     */
    createArchiveServer(name: string, type: string): ArchiveServer;
    /**
     * **Creates a new file of the specified FileType.**
     *
     * This function creates a new file object of the FileType with the given
     * `fieTypeName` and returns it.
     * So the type of the returned object is the FileType that is specified in the parameter
     * `fileTypeName` and which is an extension of {@link DocFile | DocFile}. In particular,
     * all field names of the FileType are available as properties on the returned object.
     *
     * If an error occurs during creation of the file the return
     * value will be `null` and you can access an error message describing
     * the error with getLastError().
     *
     * Since the script is executed in the context of a particular user,
     * it is mandatory that user possesses sufficient access privileges to
     * create new instances of the desired FileType, otherwise the method will fail.
     *
     * **Note:**
     * DOCUMENTS 5.0c HF1 and newer:  The function directly creates
     * a file for an EAS or EBIS store, if "@server" has been appended to the
     * filetype's name and if appropriate permissions are granted. In this case
     * the returned DocFile must be saved with
     * {@link DocFile.commit | DocFile.commit} instead of
     * {@link DocFile.sync | DocFile.sync}.
     *
     * **Since:**
     * DOCUMENTS 5.0c HF1 (support for EDA/EAS and EBIS stores)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param fileTypeName Technincal name of the desired FileType
     * @param jsonDefaultData Optional json-String with an object with default-values for the fields of the created file
     * @typeParam FileTypeName This is the type of the parameter `fileTypeName`, so it's a `string` containing the name
     * of a valid FileType.
     * @returns The new created file object or `null` if failed. The type of this object depends on the
     * parameter `fileTypeName` and is an extension of {@link DocFile | DocFile}. See main description.
     * @example
     * fileType: Person
     * field 1:
     *   Name: Lastname
     *   Defaultvalue: %data.foo1%
     *   Name: Firstname
     *   Defaultvalue: %data.foo2%
     * var defaultData = { foo1 : "Doe", foo2 : "John" };
     * var newFile = context.createFile("Standard", JSON.stringify(defaultData));
     * if (newFile)
     *    util.out(newFile.getAutoText("title"));
     * else
     *    util.out(context.getLastError());
     */
    createFile<K extends DefaultingFileTypeMapper>(fileTypeName: K, jsonDefaultData?: string): DefaultDocFileType<K>;
    /**
     * **Create a new folder of the specified type on the top level.**
     *
     * This function creates a new folder of the specified type on the top level. There are three types available:
     * + `public`
     * + `dynamicpublic`
     * + `onlysubfolder`
     * @since DOCUMENTS 4.0c
     * @param name The technical name of the folder to be created.
     * @param type The desired type of the folder.
     * @returns New created folder as Folder object or `null` if failed.
     * @example
     * var folder = context.createFolder("myFolder", "public")
     * if (folder)
     *   util.out(folder.type);
     * else
     *   util.out(context.getLastError());
     */
    createFolder(name: string, type: string): Folder;
    /**
     * **Create a new pool file of the specified filetype.**
     *
     * The script must run in the context of a user who has sufficient access privileges to create new files of the specified filetype, otherwise this method will fail.
     * @since ELC 3.50j / otrisPORTAL 5.0j
     * @param fileType the technical name of the desired filetype
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.countPoolFiles | context.countPoolFiles}
     */
    createPoolFile(fileType: string): boolean;
    /**
     * **Create a new Alias in the DOCUMENTS environment.**
     *
     * @since DOCUMENTS 5.0i HF6
     * @param name The name of the alias
     * @param userLogin Login name of the SystemUser to be assigned to the alias.
     * @returns The new created Alias object or `null` if failed.
     */
    createAlias(name: string, userLogin: string): Alias;
    /**
     * **Get an Alias object by its name.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @param name The name of the desired Alias.
     * @returns An Alias object if successful, `null` in case of any error.
     */
    getAliasByName(name: string): Alias;
    /**
     * **Get an AliasIterator with all aliases in DOCUMENTS.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @returns AliasIterator
     * @example
     * var it = context.getAllAliases();
     * for (var alias of it)
     * {
     *    // do something
     * }
     */
    getAllAliases(): AliasIterator;
    /**
     * **Create a new {@link GlobalEnumeration} in the DOCUMENTS environment.**
     *
     * @since DOCUMENTS 6.0.2
     * @param name The name of the GlobalEnumeration.
     * @returns The new created GlobalEnumeration object or `null` if failed.
     * @see {@link context.deleteGlobalEnumeration | context.deleteGlobalEnumeration}
     */
    createGlobalEnumeration(name: string): GlobalEnumeration;
    /**
     * **Delete a {@link GlobalEnumeration} in the DOCUMENTS environment.**
     *
     * @since DOCUMENTS 6.0.2
     * @param name The name of the GlobalEnumeration.
     * @returns `true` if the deletion was successful, `false` in case of any error
     * @see {@link context.createGlobalEnumeration | context.createGlobalEnumeration}
     * @example
     * var name = "testEnum";
     * var success = context.deleteGlobalEnumeration(name);
     * if (success)
     * {
     *    util.out("Successfully deleted GlobalEnumeration " + name);
     * }
     */
    deleteGlobalEnumeration(name: string): boolean;
    /**
     * **Get a {@link GlobalEnumerationIterator} with all GlobalEnumerations in DOCUMENTS.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumerationIterator
     * @example
     * var it = context.getGlobalEnumerations();
     * for (var gEnum of it)
     * {
     *    // do something
     * }
     */
    getGlobalEnumerations(): GlobalEnumerationIterator;
    /**
     * **Delete a certain access profile in the DOCUMENTS environment.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param profileName technical name of the access profile
     * @returns `true` in case of successful deletion, `false` in case of any error
     * @example
     * var profileName = "office"
     * var success = context.deleteAccessProfile(profileName);
     * if (success)
     * {
     *    util.out("Deletion of access profile " + profileName + " successful");
     * }
     */
    deleteAccessProfile(profileName: string): boolean;
    /**
     * **Delete a folder in DOCUMENTS.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @param folderObj an object of the Class Folder which represents the according folder in DOCUMENTS
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var itFD = context.getFoldersByName("Invoice");
     * var fd = itFD.first();
     * if (fd)
     * {
     *    var success = context.deleteFolder(fd);
     * }
     */
    deleteFolder(folderObj: Folder): boolean;
    /**
     * **Delete a user in the DOCUMENTS environment.**
     *
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param loginName login of the user
     * @returns `true` if the deletion was successful, `false` in case of any error
     * @see {@link context.createSystemUser | context.createSystemUser}
     * @example
     * var login = "schreiber";
     * var success = context.deleteSystemUser(login);
     * if (success)
     * {
     *    util.out("Successfully deleted user " + login);
     * }
     */
    deleteSystemUser(loginName: string): boolean;
    /**
     * **Calls the specified maintenance operation.**
     *
     * @since DOCUMENTS 5.0c HF1
     * @param operationName String with the name of the maintenance operation
     * @returns `String` with the return message of the of the maintenance operation.
     * @example
     * var msg = context.doMaintenance("BuildAclCache lcmContract");
     * util.out(msg);
     */
    doMaintenance(operationName: string): string;
    /**
     * **Allow dynamic imports of other scripts as modules.**
     *
     * This function defines a function named `require()`, either in a passed object or in the global scope of the calling script.
     * In sequence `require`('<scriptname>') can be used to import other portal scripts, which are implemented in the style of
     * CommonJS (Node.js) modules.
     *
     * **Note:**
     * Usually only top-level scripts call enableModules(). They should call it only once. Scripts loaded by require()
     * always see the function as a global parameter. DOCUMENTS exposes a generic 'module' and an initially empty 'exports'
     * object to each imported script. Virtually no other features of the module concept of Node.js are available.
     * Since DOCUMENTS 5.0i the module objects have got a readonly property "filename". In DOCUMENTS 5 this is a plain
     * script name. DOCUMENTS 6 will preferably return a virtual path like "/db/testPrincipal/myScriptCategory/myScriptName.js".
     * If the "documents.ini" contains the setting "$JSGlobalModule 1", enableModules() will create a main module object,
     * if no global variable 'module' is already defined. Presumably DOCUMENTS 6 will define a global module always.
     *
     * To customize the behaviour of the require() function the following flags may be set.
     * (Use one of the operators '|' or '+' to combine multiple flags.)
     *
     * + 1 = ignore ".js" or ".JS" extensions appended to the passed script name
     * + 2 = ignore file paths prepended to the script name
     *
     * The require() implementation saves the flags passed to enableModules() before a new module is loaded. It restores them
     * afterwards. This allows local overrides of the import flags, as shown in the second example. However, if require() is
     * called directly or indirectly from an exported function, local flag overrides generally do not work. When the importing
     * script calls the exported function, the embedded call of require() occurs with the flags set by the importing script,
     * not with the modules's local flags.
     *
     * **Since:** DOCUMENTS 5.0f (flags parameter)
     * **Since:** DOCUMENTS 5.0i (main module creation, property "module.filename")
     * @since DOCUMENTS 5.0d
     * @param root An optional Object to define the require() function as a property. Use this parameter, if the name "require"
     * is already reserved in the script's global namespace.
     * @param flags An optional integer number containing a bit mask with special options. Defaults to 0.
     * **Default:** `0`
     * @returns undefined.
     * @example
     * // The main script
     * context.enableModules();
     * var mymath = require('MyMath');
     * var test = mymath.square(42);
     * util.out("square(42) is " + test);
     * // End of main script
     * // The 'MyMath' module script
     * // "module.exports" is initially an empty object.
     * // require() will return whatever the script places here.
     * //
     * // "exports" is a shortcut reference to "module.exports".
     * // This works as long as only properties need to be added.
     * // Directly assigning a new value to "exports" or
     * // "module.exports" would break the reference.
     * exports.square = function(x) { return x*x; };
     * // End of module script
     * @example
     * // Excerpt from main script
     * context.enableModules(undefined, 1);
     * var firstModule = require('Module1.js'); // extension ".js" will be ignored
     * var someOtherModule = require('Module2.js'); // ".js" will be ignored again
     * // Excerpt from 'Module1' module script
     * // override import flags for local imports of this module
     * // DOCUMENTS will reset them after initialization of the module.
     * context.enableModules(undefined, 2);
     * var submodule1 = require("C:/anywhere/Module3"); // Path will be ignored
     * exports.square = function(x) { return x*x; };
     * // But don't rely on overridden flags within an exported function!
     * // This is a negative example.
     * exports.error_prone = function {
     *   // This raises an error when called from the main script: path is not ignored.
     *   var otherMod = require("C:/anywhere/Module4");
     *   // any more code ...
     * }
     * // End of module script
     */
    enableModules(root?: Object, flags?: number): void;
    /**
     * **Perform an external command shell call on the Portalserver.**
     *
     * Executes an external command shell call (usually a batch file or shell script) in the context of the given work directory.
     * With the `synced` parameter, you can specify if the scripting engine should wait for the external call to complete or
     * if the script execution should continue asynchonously. If the script waits for the external call to complete, this method
     * returns the errorcode of the external call as an integer value (see note for Linux).
     *
     * **Note:** On Linux, the return value contains some more information. You can see in the example, how you can get the exit status on Linux.
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param workDir String containing a complete directory path which should be used as the working directory
     * @param cmd String containing the full path and filename to the file to execute
     * @param synced boolean value that defines, if the script should wait for the external call to finish (`true`) or not (`false`)
     * @returns number containing the errorcode (ERRORLEVEL) of the call (see note for Linux).
     * @example
     * // execute testrun.bat in "c:\tmp" and wait for the call to complete
     * var errorLevel = context.extCall("c:\\tmp", "c:\\tmp\\testrun.bat", true);
     * util.out(errorLevel);
     * // get exit status on linux
     * var ret = context.extCall("/tmp", "/tmp/testrun", true);
     * var exitStatus = (ret & 0xff00) >> 8;
     */
    extCall(workDir: string, cmd: string, synced: boolean): number;
    /**
     * **Perform an external process call on the Portalserver and returns the exitcode of the external process and the standard output.**
     *
     * An external process call is executed, e.g. a batch file. The methods returns a string array of the size 2.
     * The first array value is the exit code (converted to its equivalent string representation) of the external process.
     * The second array value contains the content that the external process has written to the standard output.
     *
     * **Since:** DOCUMENTS 5.0i new optional parameter timeout
     * @since ELC 3.60g / otrisPORTAL 6.0g
     * @param cmd String containing the full path and filename to the program which shall be executed
     * @param timeout Number in milliseconds
     * **Default:** `0`
     * @returns a string array with the exit code and the content of the standard output; at timeout the exitcode = -99
     * @example
     * // execute testrun.bat and wait for the call to complete
     * var res = context.extProcess("c:\\tmp\\testrun.bat");
     * var exitcode = res[0];
     * var stdout = res[1];
     * if (exitcode !== "0")
     *   util.out(exitcode + ": " + stdout);
     */
    extProcess(cmd: string, timeout?: number): string[];
    /**
     * **Find a certain access profile in the DOCUMENTS environment.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param profileName technical name of the access profile
     * @returns AccessProfile object as a representation of the access profile in DOCUMENTS, `null` in case of any error
     * @example
     * var office = context.findAccessProfile("office");
     */
    findAccessProfile(profileName: string): AccessProfile;
    /**
     * **Searches for CustomProperties.**
     *
     * @since DOCUMENTS 5.0
     * @param filter Optional String value defining the search filter (specification see example)
     * @returns CustomPropertyIterator
     * @see
     * {@link context.getCustomProperties | context.getCustomProperties}
     * {@link AccessProfile.getCustomProperties | AccessProfile.getCustomProperties}
     * {@link SystemUser.getCustomProperties | SystemUser.getCustomProperties}
     * @example
     * // Specification of the filter:
     * // ----------------------------
     * // Possible filter-columns:
     * // name: String - name of the custom property
     * // type: String - type of the custom property
     * // to_Systemuser:    Integer (oid-low) - connected SystemUser
     * // to_AccessProfile: Integer (oid-low) - connected AccessProfile
     * // to_DlcFile      : Integer (oid-low) - connected Filetype
     * //
     * // Operators:
     * // &&: AND
     * // ||: OR
     * var oidUser = context.findSystemUser("schreiber").getOID(true);
     * var oidAP1 = context.findAccessProfile("Service").getOID(true);
     * var oidAP2 = context.findAccessProfile("Customer").getOID(true);
     * var oidFileType = context.getFileTypeOID("ftRecord", true);
     * var filter = "name='Prop1'";
     * filter += "&& to_Systemuser=" + oidUser;
     * filter += "&& (to_AccessProfile=" + oidAP1 + " || to_AccessProfile=" + oidAP2 + ")";
     * filter += "&& to_DlcFile =" + oidFileType;
     * var it = context.findCustomProperties(filter);
     * for (var cp=it.first(); cp; cp=it.next())
     * {
     *    util.out(cp.value);
     * }
     */
    findCustomProperties(filter: string): CustomPropertyIterator;
    /**
     * **Searches for log book entries.**
     *
     * @since DOCUMENTS 5.0h HF1
     * @param filter Optional String value defining the search filter (specification see example)
     * @returns String containing the JSON string with all log book entries matching the filter
     * @see {@link context.writeLogBook | context.writeLogBook}
     * @example
     * // Specification of the filter:
     * // ----------------------------
     * // Possible filter-columns:
     * // Ts: Timestamp - Timestamp of the creation of the entry (using special format 'fyyyymmddHHMMSS' for the filter value)
     * // UserLogin: String - Login of the responsible user
     * // TitleFile: String - Title of the file
     * // IdFile: String - Id of the file
     * // FieldValues: String - A log book entry defined on the file type
     * // TitleFileType: String - Title of the file type
     * // IdFileType: String - Id of the file type
     * // IdWorkflow: String - Id of the workflow within the file being circulated
     * // MainContextName: String - Name of the workflow template
     * // IdMainContext: String - Id of the workflow template
     * // IdStep: String - Id of the workflow step
     * // ContextName: String - Display name of the workflow action
     * // IdContext: String - Id of the workflow action
     * // ActionCode : Integer - Integer code of the executed action (see Context.writeLogBook() for more information)
     * // ActionDescription: String - Description of the executed action (see Context.writeLogBook() for more information)
     * // ActionDetail1: String - Additional information
     * // ActionDetail2: String - Additional information
     * // ActionDetail3: String - Additional information
     * //
     * // Operators:
     * // &&: AND
     * // ||: OR
     * var filter = "Ts <= 'f20220121092256'";
     * filter += "&& Ts >= 'f20220111092256'";
     * filter += "&& IdFile = 'peachitreg_fi20220000000193'";
     * filter += "&& (ActionCode = 7 || ActionCode = 6)";
     * var jsonStr = context.findLogBookEntries(filter);
     * var jsonArr = JSON.parse(jsonStr);
     * for (var entry of jsonArr)
     * {
     *     util.out("-------------------");
     *     for (var prop in entry)
     *     {
     *         util.out(prop + ": " + entry[prop]);
     *     }
     *     util.out("-------------------");
     * }
     */
    findLogBookEntries(filter?: string): string;
    /**
     * **Retrieve a user by his/her login.**
     *
     * If the user does not exist, then the return value will be `null`.
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param login name of the user
     * @returns User as SystemUser object
     * @see
     * {@link context.findSystemUserByAlias | context.findSystemUserByAlias}
     * {@link context.getSystemUser | context.getSystemUser}
     * {@link context.getSystemUsers | context.getSystemUsers}
     * {@link AccessProfile.getSystemUsers | AccessProfile.getSystemUsers}
     * @example
     * var myUser = context.findSystemUser("schreiber");
     */
    findSystemUser(login: string): SystemUser;
    /**
     * **Retrieve a user by an alias name.**
     *
     * If the alias does not exist or is not connected to a user then the return value will be `null`.
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param alias technical name of the desired alias
     * @returns User as SystemUser object
     * @see
     * {@link context.findSystemUser | context.findSystemUser}
     * {@link context.getSystemUser | context.getSystemUser}
     * {@link context.getSystemUsers | context.getSystemUsers}
     * @example
     * var myUser = context.findSystemUserByAlias("CEO");
     */
    findSystemUserByAlias(alias: string): SystemUser;
    /**
     * **Retrieve a user by a login alias.**
     * A login alias for a user can be set via the Systemuser property `loginAlias`.
     * If the login alias does not exist then the return value will be `null`.
     * @since DOCUMENTS 5.0i HF5
     * @param loginAlias The desired login alias for a user.
     * @returns User as SystemUser object or `null` if no user found.
     * @see {@link context.findSystemUserByAlias | context.findSystemUserByAlias(alias)}
     * @example
     * var myUser = context.findSystemUserByLoginAlias("myLoginAlias");
     */
    findSystemUserByLoginAlias(loginAlias: string): SystemUser;
    /**
     * **Get an iterator with all access profiles of in the DOCUMENTS environment.**
     *
     * **Note:** This method can only return access profiles which are checkmarked as being visible in DOCUMENTS lists.
     *
     * **Since:** ELC 3.60e / otrisPORTAL 6.0e (new parameter includeInvisibleProfiles)
     * @since ELC 3.51g / otrisPORTAL 5.1g
     * @param includeInvisibleProfiles optional boolean value to define, if access profiles that are not checkmarked as being visible in DOCUMENTS lists should be included
     * **Default:** `false`
     * @returns AccessProfileIterator object with all AccessProfile in DOCUMENTS
     * @example
     * var itAP = context.getAccessProfiles(false);
     * for (var ap = itAP.first(); ap; ap = itAP.next())
     * {
     *    util.out(ap.name);
     * }
     */
    getAccessProfiles(includeInvisibleProfiles?: boolean): AccessProfileIterator;
    /**
     * **Retrieve a global user-defined action.**
     *
     * @since DOCUMENTS 5.0i
     * @param actionName String value containing the desired action name.
     * @returns UserAction object representing the user-defined action.
     * @example
     * var action = context.getActionByName("testAction");
     * if (action)
     * {
     *    action.type = "PortalScript";
     *    action.setPortalScript("testScript");
     * }
     * else
     *    util.out(context.getLastError());
     */
    getActionByName(actionName: string): UserAction;
    /**
     * **Retrieve the information of all locked documents as JSON string.**
     *
     * @since DOCUMENTS 6.0
     * @returns JSON string containing the information of all locked documents
     */
    getAllLockedDocumentsInfo(): string;
    /**
     * **List all available Workflows.**
     *
     * Create a {@link WorkflowIterator}, which contains references to all available Workflows and distribution lists.
     *
     * **Note:**
     * typeFlags Parameter supports any combination of the following values.
     *
     * | Bit # | Value | Meaning                              |
     * |-------|-------|--------------------------------------|
     * | 0     | 1     | Enumerate simple distribution lists  |
     * | 1     | 2     | Enumerate complete workflows         |
     *
     * The bits not listed above should remain zero for upward compatibility. Hint for beginners: flag values
     * are always powers of 2. They can be combined with "|" or with "+". The expression (1|2|8) evaluates
     * to 11 for example.
     *
     * **Note:**
     * See the WorkflowIterator class description for an example.
     *
     * @since DOCUMENTS 6.0
     * @param typeFlags An optional integer number, which specifies the requested types of Workflow objects (see remarks). The default value is 2.
     * @returns A new WorkflowIterator.
     */
    getAllWorkflows(typeFlags?: number): WorkflowIterator;
    /**
     * **Get an {@link ArchiveConnection} object.**
     *
     * With this method you can get an ArchiveConnection object. This object offers several methods to use the EAS Interface, EBIS or the EASY ENTERPRISE XML-Server.
     * @since DOCUMENTS 5.0a
     * @param archiveServerName Optional string containing the archive server name; If the archive server is not defined, then the main archive server will be used
     * @returns ArchiveConnection-Object or `null`, if failed
     * @see {@link ArchiveServer.getArchiveConnection | ArchiveServer.getArchiveConnection}
     * @example
     * var xmlserver = context.getArchiveConnection("myeex")
     * if (!xmlserver) // failed
     *    util.out(context.getLastError());
     * else
     * {
     *    ...
     * }
     */
    getArchiveConnection(archiveServerName: string): ArchiveConnection;
    /**
     * **Get a file from the archive.**
     *
     * With this method you can get a file from the archive using the archive key. You need the necessary access rights on the archive side.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param key
     * @returns `DocFile` or `null`, if failed
     * @example
     * var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=PRESSE/Document=Waz.4E1D1F7E28C611DD9EE2000C29FACDC2@eex1";
     * var file = context.getArchiveFile(key)
     * if (!file) // failed
     *    util.out(context.getLastError());
     * else
     * {
     *    ...
     * }
     */
    getArchiveFile(key: string): DocFile;
    /**
     * **Get an {@link ArchiveServer} identified by its name.**
     *
     * @since DOCUMENTS 5.0a
     * @param name The technical name of the ArchiveServer.
     * @returns ArchiveServer object or `null` if failed.
     * @example
     * var as = context.getArchiveServer("ebis1");
     * if (as)
     *    util.out(as.name);
     */
    getArchiveServer(name: string): ArchiveServer;
    /**
     * **Get an iterator with all ArchiveServers in the DOCUMENTS environment.**
     *
     * @since DOCUMENTS 5.0a
     * @returns
     * @example
     * var itAS = context.getArchiveServers();
     * for (var as = itAS.first(); as; as = itAS.next())
     * {
     *    util.out(as.name);
     * }
     */
    getArchiveServers(): ArchiveServerIterator;
    /**
     * **Get the String value of a DOCUMENTS autotext.**
     *
     *
     * **Since:** DOCUMENTS 5.0i new optional parameters startTag and endTag
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param autoText the rule to be parsed
     * @param startTag optional start tag.
     * **Default:** `"%"`
     * @param endTag otional end tag.
     * **Default:** `"%"`
     * @returns String containing the parsed value of the autotext
     * @example
     * util.out(context.getAutoText("currentDate"));
     */
    getAutoText(autoText: string, startTag?: string, endTag?: string): string;
    /**
     * **Get the abbreviation of the current user's portal language.**
     *
     * If you want to return output messages through scripting, taking into account that your users might use different portal languages,
     * this function is useful to gain knowledge about the portal language used by the current user, who is part of the script's runtime context.
     * This function returns the current language as the two letter abbreviation as defined in the principal's settings in the Windows Portal Client (e.g. "de" for German).
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @returns String containing the abbreviation of the current user's portal language
     * @see
     * {@link context.setClientLang | context.setClientLang}
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * util.out(context.getClientLang());
     */
    getClientLang(): string;
    /**
     * **Get the script's execution context portal language index.**
     *
     * @since ELC 3.51g / otrisPORTAL 5.1g
     * @returns integer value of the index of the current system language
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * util.out(context.getClientSystemLang());
     * var erg = context.setClientSystemLang(0); // first portal language
     */
    getClientSystemLang(): number;
    /**
     * **Get the connection info of the client connection.**
     *
     * You can analyze the connection info to identify e.g. a client thread of the HTML5 Web-Client
     * ` HTML5-Client:   CL[Windows 7/Java 1.7.0_76], POOL[SingleConnector], INF[SID[ua:docsclient,
     * dca:2.0, docs_cv:5.0]] Classic-Client: CL[Windows 7/Java 1.7.0_76], POOL[SingleConnector] SOAP-Client:
     * Documents-SOAP-Proxy (In-Server-Client-Library) on Win32 `
     * @since DOCUMENTS 5.0
     * @returns String containing the connection info
     * @example
     * function isHTML5Client()
     * {
     *     return context.getClientType().indexOf("docs_cv:5.0") > -1;
     * }
     * if (isHTML5Client())
     *    util.out("HTML5-Client");
     * else
     *    util.out("NO HTML5-Client");
     */
    getClientType(): string;
    /**
     * **Get the String value of an attribute of the current user.**
     *
     * @since ELC 3.50f / otrisPORTAL 5.0f
     * @param attributeName the technical name of the desired attribute
     * @returns String containing the value of the attribute
     * @see
     * {@link context.getPrincipalAttribute | context.getPrincipalAttribute}
     * {@link context.setPrincipalAttribute | context.setPrincipalAttribute}
     * @example
     * util.out(context.getCurrentUserAttribute("particulars.lastName"));
     */
    getCurrentUserAttribute(attributeName: string): string;
    /**
     * **Get a CustomPropertyIterator with global custom properties.**
     *
     * @since DOCUMENTS 5.0
     * @param nameFilter String value defining an optional filter depending on the name
     * @param typeFilter String value defining an optional filter depending on the type
     * @returns CustomPropertyIterator
     * @see
     * {@link context.findCustomProperties | context.findCustomProperties}
     * {@link context.setOrAddCustomProperty | context.setOrAddCustomProperty}
     * {@link context.addCustomProperty | context.addCustomProperty}
     * @example
     * var itProp = context.getCustomProperties();
     * for (var prop = itProp.first(); prop; prop = itProp.next())
     * {
     *    util.out(prop.name + ": " + prop.value);
     * }
     */
    getCustomProperties(nameFilter?: string, typeFilter?: string): CustomPropertyIterator;
    /**
     * **Subtract two Date objects to get their difference.**
     *
     * This function calculates the time difference between two Date objects, for example if you need to know how many days a business trip takes.
     * By default this function takes the work calendar into account if it is configured and enabled for the principal.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param earlierDate Date object representing the earlier date
     * @param laterDate Date object representing the later date
     * @param unit optional String value defining the unit, allowed values are `"minutes"`, `"hours"` and `"days"` (default)
     * **Default:** `'days'`
     * @param useWorkCalendar optional boolean to take office hours into account or not (requires enabled and configured work calendar)
     * **Default:** `true`
     * @returns integer value representing the difference between the two dates
     * @example
     * var start = util.convertStringToDate("01.04.2006", "dd.mm.yyyy");
     * var end = util.convertStringToDate("05.04.2006", "dd.mm.yyyy");
     * var duration = context.getDatesDiff(start, end) ;
     * util.out("Difference: " + duration); // should be 4
     */
    getDatesDiff(earlierDate: Date, laterDate: Date, unit?: string, useWorkCalendar?: boolean): number;
    /**
     * **Get the Document by its unique file-id.**
     *
     * If the Document does not exist or the user in whose context the script is executed is not allowed to access the file, then the return value will be `null`.
     * @since DOCUMENTS 5.0e
     * @param idFile Unique id of the file
     * @param idDocument Unique id of the document
     * @returns Document as Document object.
     * @example
     * var doc = context.getDocumentById("dopaag_fi20160000000423", "dopaagdc0000000000000256");
     * if (!doc)
     *    util.out(context.getLastError());
     * else
     *   util.out(doc.fullname)
     */
    getDocumentById(idFile: string, idDocument: string): Document;
    /**
     * **Retrieve the content or the path of a document template from a file type.**
     *
     * @since DOCUMENTS 5.0f
     * @param fileTypeName String containing the technical name of the file type.
     * @param templateName String containing the technical name of the document template.
     * @param content **Default:** `false`.
     * Optional boolean indicating whether the path of the template file is wanted or the content of the file as String.
     * @returns `String` with the path to the template or the content of the template, an exception in case of any error
     * @example
     * try {
     *    var templatePath    = context.getDocumentTemplateFromFileType("crmUser", "TemplateOrder");
     *    var templateContent = context.getDocumentTemplateFromFileType("crmUser", "TemplateOrder", true);
     * } catch (err) {
     *    util.out(err)
     * }
     */
    getDocumentTemplateFromFileType(fileTypeName: string, templateName: string, content?: boolean): string;
    /**
     * **Get an array with the values of an enumeration autotext.**
     *
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param autoText to be parsed
     * @returns Array containing the values for the autotext
     * @example
     * var values = context.getEnumAutoText("%accessProfile%")
     * if (values)
     * {
     *   for (var i = 0; i < values.length; i++)
     *   {
     *       util.out(values[i]);
     *   }
     * }
     */
    getEnumAutoText(autoText: string): string[];
    /**
     * **Get the ergonomic label of a multilanguage enumeration list value.**
     *
     * Enumeration lists in multilanguage DOCUMENTS installations usually are translated into the different portal languages as well.
     * This results in the effect that only a technical value for an enumeration is stored in the database.
     * So, if you need to display the label which is usually visible instead in the enumeration field through scripting,
     * this function is used to access that ergonomic label.
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param fileType String value containing the technical name of the desired filetype
     * @param field String value containing the technical name of the desired enumeration field
     * @param techEnumValue String value containing the desired technical value of the enumeration entry
     * @param locale optional String value with the locale abbreviation (according to the principal's configuration);
     * if omitted, the current user's portal language is used automatically
     * @returns String containing the ergonomic value of the enumeration value in the appropriate portal language
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * util.out(context.getEnumErgValue("Standard", "Priority", "1", "de"));
     */
    getEnumErgValue(fileType: string, field: string, techEnumValue: string, locale?: string): string;
    /**
     * **Get an array with enumeration list entries.**
     *
     * In some cases it might be useful not only to access the selected value of an enumeration file field,
     * but the list of all possible field values as well. This function creates an Array of String values (zero-based),
     * and each index is one available value of the enumeration field. If the enumeration field is configured to sort the values
     * alphabetically, this option is respected.
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param fileType The technical name of the desired filetype
     * @param field The technical name of the desired enumeration field
     * @returns Array containing all possible values of the enumeration field, or false if the field does not exist.
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * var valueList = context.getEnumValues("Standard", "Priority");
     * if (valueList && valueList.length > 0)
     * {
     *    for (var i = 0; i < valueList.length; i++)
     *    {
     *       util.out(valueList[i]);
     *    }
     * }
     */
    getEnumValues(fileType: string, field: string): string[] | false;
    /**
     * **Retrieve the technical and ergonomic values of an enumeration list.**
     *
     * @since DOCUMENTS 6.0.1
     * @param fileType The technical name of the desired filetype.
     * @param fieldName The technical name of the desired enumeration field.
     * @param enumKeys Empty array for the technical values.
     * @param enumLocales Empty array for the ergonomic values.
     * @param locale The locale abbreviation (according to the principal's configuration).
     * **Default:** the current user's portal language
     * @returns Empty String if successful, the error message in case of any error.
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getEnumValues | context.getEnumValues}
     * @example
     * var enumKeys = new Array();
     * var enumLocales = new Array();
     * var msg = context.getEnumLocaleValues("Standard", "Priority", enumKeys, enumLocales, "en");
     * if (msg.length == 0)
     * {
     *    for (var i = 0; i < enumKeys.length; i++)
     *    {
     *       util.out(enumKeys[i]);
     *       util.out(enumLocales[i]);
     *       util.out("---------");
     *    }
     * }
     * else
     *    util.out(msg);
         
     */
    getEnumLocaleValues(fileType: string, fieldName: string, enumKeys: string[], enumLocales: string[], locale?: string): string;
    /**
     * **Get the ergonomic label of a file field.**
     *
     * In multilanguage DOCUMENTS environments, usually the file fields are translated to the different locales by using the well known ergonomic label hack.
     * The function is useful to output scripting generated information in the appropriate portal language of the web user who triggered the script execution.
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param fileType The technical name of the desired filetype
     * @param field The technical name of the desired field
     * @param locale The locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically
     * @returns String containing the ergonomic description of the file field in the appropriate portal language
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * util.out(context.getFieldErgName("Standard", "Prioritaet", "de"));
     */
    getFieldErgName(fileType: string, field: string, locale?: string): string;
    /**
     * **Get the file by its unique file-id.**
     *
     * If the file does not exist or the user in whose context the script is executed is not allowed to access the file, then the return value will be `null`.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param idFile Unique id of the file
     * @returns File as DocFile object.
     * @see {@link context.file | context.file}
     * @example
     * var file = context.getFileById("toastupfi_20070000002081");
     * if (file)
     *    util.out(file.getAutoText("title"));
     * else
     *    util.out(context.getLastError());
     */
    getFileById(idFile: string): DocFile;
    /**
     * **Get the ergonomic label of a filetype.**
     *
     * In multilanguage DOCUMENTS environments, usually the filetypes are translated to the different locales by using the well known ergonomic label hack.
     * The function is useful to output scripting generated information in the appropriate portal language of the web user who triggered the script execution.
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param fileType String value containing the technical name of the desired filetype
     * @param locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically
     * @returns String containing the ergonomic description of the filetype in the appropriate portal language. `false` in case of an error
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * util.out(context.getFileTypeErgName("Standard", "de"));
     */
    getFileTypeErgName(fileType: string, locale?: string): string | boolean;
    /**
     * **Returns the object-id of a filetype.**
     *
     * @since DOCUMENTS 5.0
     * @param nameFiletype String value containing the technical name of the filetype.
     * @param oidLow **Default:** `false`.
     * Optional flag:
     * If `true` only the id of the filetype object (`m_oid`) will be returned.
     * If `false` the id of the filetype object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     * @returns `String` with the object-id or `false` if filetype does not exist
     */
    getFileTypeOID(nameFiletype: string, oidLow?: boolean): string;
    /**
     * **Retrieve the position of a top level folder in the global context.**
     *
     * This method can be used to get the position of a top level folder (public, public dynamic or only subfolders folder with no parent) in the global context.
     * @since DOCUMENTS 5.0a
     * @param folder Folder object whose position to be retrieved.
     * @returns internal position number of the folder as integer or -1 in case of any error.
     * @see
     * {@link context.setFolderPosition | context.setFolderPosition}
     * {@link Folder.getPosition | Folder.getPosition}
     * {@link Folder.setPosition | Folder.setPosition}
     * @example
     * var folder = context.getFoldersByName("MyPublicFolder").first();
     * var pos = context.getFolderPosition(folder);
     * if (pos < 0)
     *    throw context.getLastError();
     */
    getFolderPosition(folder: Folder): number;
    /**
     * **Retrieve a list of folders with identical name.**
     *
     * Different folders might match an identical pattern, e.g. `"DE_20*"` for each folder like `"DE_2004"`, `"DE_2005"` and so on.
     * If you need to perform some action with the different folders or their contents, it might be useful to retrieve an iterator (a list)
     * of all these folders to loop through that list.
     *
     * **Note:** Until version 5.0h this method ignored the access rights of the user to the folders. With the optional parameter
     * checkAccessRight this can now be done. For backward compatibility the default value is set to false.
     *
     * **Since:** DOCUMENTS 5.0h (new optional parameter checkAccessRight)
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @param folderPattern the name pattern of the desired folder(s)
     * @param type optional parameter, a String value defining the type of folders to look for; allowed values are `"public"`, `"dynamicpublic"` and `"onlysubfolder"`
     * @param checkAccessRight **Default:** `false`.
     * optional boolean value, that indicates if the access rights should be considered
     * @returns FolderIterator containing a list of all folders matching the specified name pattern
     * @example
     * var folderIter = context.getFoldersByName("Inv*");
     */
    getFoldersByName(folderPattern: string, type?: string, checkAccessRight?: boolean): FolderIterator;
    /**
     * **Retrieve the desired entry of the system messages table.**
     *
     * It might be inconvenient to maintain the different output Strings of localized PortalScripts, if this requires to edit the scripts themselves.
     * This function adds a convenient way to directly access the system messages table which you may maintain in the Windows Portal Client.
     * This enables you to add your own system message table entries in your different portal languages and to directly access them in your scripts.
     * **Since:** DOCUMENTS 5.0i HF5 (new parameter locale)
     * @since ELC 3.50o / otrisPORTAL 5.0o
     * @param identifier String value containing the technical identifer of a certain system message table entry
     * @param locale String value containing the locale (de, en,...)
     * optional String value, that indicates the wanted language
     * @returns String containing the value of the desired entry in the current user's portal language
     * @see
     * {@link context.getEnumErgValue | context.getEnumErgValue}
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * {@link context.getEnumValues | context.getEnumValues}
     * {@link context.getFromSystemTable | context.getFromSystemTable}
     * @example
     * // requires an entry with that name in your system message table
     * util.out(context.getFromSystemTable("myOwnTableEntry"));
     */
    getFromSystemTable(identifier: string, locale?: string): string;
    /**
     * **Get the string value of an attribute of the DOCUMENTS global settings.**
     *
     * @since DOCUMENTS 5.0g
     * @param attributeName The name of the desired attribute
     * @returns String with the value of the attribute, an exception in case of using an invalid attribute and an empty string in case of
     * using a not existing property starting with '$', respectively.
     * @see {@link context.setGlobalAttribute | context.setGlobalAttribute}
     * @example
     * // Retrieve a global attribute
     * try {
     *    var value = context.getGlobalAttribute("StandardUser");
     *    util.out(value);
     * } catch (err) {
     *    util.out(err);
     * }
     * // Retrieve a global property whose name starts with '$'
     * var propValue = context.getGlobalAttribute("$decreaseSearchArchivesScript");
     * if (propValue == "")
     *   util.out("$decreaseSearchArchivesScript not set");
     * else
     *   util.out(propValue);
     */
    getGlobalAttribute(attributeName: string): string;
    /**
     * **Get a JS_Object by object id.**
     *
     * With this method you can get a JS-Object by the object id. Depending of the class of the object you get a JS-Object of the classes AccessProfile,
     * DocFile, Document, Folder, Register, SystemUser or WorkflowStep
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oid String containing the id of the object
     * @returns JS-Object or `null`, if failed
     * @example
     * var docFile1 = context.file;
     * var objectId = docFile1.getOID();
     * var docFile2 = context.getJSObject(objectId);
     * // docFile1 and docFile2 are both of the class DocFile
     * // and reference the same ELC-file object
     */
    getJSObject(oid: string): object;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * **Note:** All classes have their own error functions. Only global errors are available through the context getLastError() method.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param shortMessage **Default:** `false`.
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     * @example
     * util.out(context.getLastError());
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Retrievs license infos for the actual principal as json-String.**
     *
     * @since DOCUMENTS 5.0h HF1
     * @returns String with license restrictions and current usage.
     * @example
     * try {
     *    var json = context.getLicenseInfo();
     *    var obj = JSON.parse(json);
     *     .....
     * } catch (err) {
     *    util.out(err)
     * }
     */
    getLicenseInfo(): string;
    /**
     * **Get the value/label of a String with the format "de:rot;en:red;fr:rouge" in the current or defined portal language.**
     *
     * @since DOCUMENTS 5.0c HF1
     * @param value String with the complete value string
     * @param locale Optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically.
     * @returns `String` containing the valuein the appropriate portal language.
     * @example
     * var title = "de:Rechnung 001; en:Invoice 001"
     * var deVal = context.getLocaleValue(title, "de");
     * util.out(deVal);    // deVal = Rechnung 001
     * var valInCurrentLanguage = context.getLocaleValue(title);
     */
    getLocaleValue(value: string, locale?: string): string;
    /**
     * **Get an EmailIterator with all emails in DOCUMENTS.**
     *
     * @since DOCUMENTS 5.0i
     * @returns EmailIterator
     * @example
     * var it = context.getMails();
     * for (var mail of it)
     * {
     *    // do something
     * }
     */
    getMails(): EmailIterator;
    /**
     * **Get the String value of an attribute of the DOCUMENTS principal.**
     *
     * @since ELC 3.50f / otrisPORTAL 5.0f
     * @param attributeName the technical name of the desired attribute
     * @returns String containing the value of the attribute
     * @see
     * {@link context.getCurrentUserAttribute | context.getCurrentUserAttribute}
     * {@link context.setPrincipalAttribute | context.setPrincipalAttribute}
     * @example
     * util.out(context.getPrincipalAttribute("executive.eMail"));
     */
    getPrincipalAttribute(attributeName: string): string;
    /**
     * **Get the status of the principal.**
     *
     * @since DOCUMENTS 5.0g
     * @returns String with the value of the status
     * @see {@link context.setPrincipalStatus | context.setPrincipalStatus}
     */
    getPrincipalStatus(): string;
    /**
     * **Gets the current progress value in % of the progress bar in the Documents-Manager during the PortalScript execution.**
     *
     * @since DOCUMENTS 5.0c
     * @returns `progress` as float (value >= 0 and value <= 100)
     * @see
     * {@link context.setProgressBarText | context.setProgressBarText}
     * {@link context.setProgressBar | context.setProgressBar}
     */
    getProgressBar(): number;
    /**
     * **Get the actual search parameters within an "OnSearch" or "FillSearchScript" exit.**
     *
     * **Note:** The return value is `null`, if the calling script is not running as an "OnSearch" or "FillSearchMask" handler.
     * It can also be `null`, if the script has called changeScriptUser(). In order to access the search parameters,
     * the script needs to restore the original user context.
     * @since DOCUMENTS 4.0c
     * @returns A DocQueryParams object on success, otherwise `null`.
     * @example
     * var queryParams = context.getQueryParams();
     */
    getQueryParams(): DocQueryParams;
    /**
     * **Get the ergonomic label of a register.**
     *
     * @since DOCUMENTS 4.0d HF1
     * @param fileTypeName String value containing the technical name of the desired filetype
     * @param registerName String value containing the technical name of the desired register
     * @param locale optional String value with the locale abbreviation (according to the principal's configuration); if omitted, the current user's portal language is used automatically
     * @returns String containing the ergonomic description of the register in the appropriate portal language
     * @see
     * {@link context.getFieldErgName | context.getFieldErgName}
     * {@link context.getFileTypeErgName | context.getFileTypeErgName}
     * @example
     * util.out(context.getRegisterErgName("Standard", "Reg1", "de"));
     */
    getRegisterErgName(fileTypeName: string, registerName: string, locale?: string): string;
    /**
     * **Create a String containing the installation path of the portal server.**
     *
     * @since ELC 3.60a / otrisPORTAL 6.0a
     * @returns String containing the portal server installation path
     * @example
     * var installDir = context.getServerInstallPath();
     * util.out(installDir);
     */
    getServerInstallPath(): string;
    /**
     * **Get the "setSuperMode"-flag of the current PortalScript-Session.**
     *
     * @since DOCUMENTS 5.0e HF2
     * @returns `true` or `false`
     * @see {@link context.setSuperMode | context.setSuperMode}
     */
    getSuperMode(): boolean;
    /**
     * **Get the current user as a SystemUser object.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns SystemUser object representing the current user.
     * @see
     * {@link context.findSystemUser | context.findSystemUser}
     * {@link context.findSystemUserByAlias | context.findSystemUserByAlias}
     * {@link context.getSystemUsers | context.getSystemUsers}
     * @example
     * var su = context.getSystemUser();
     * if (su)
     *    util.out(su.login); // output login name of current user
     */
    getSystemUser(): SystemUser;
    /**
     * **Get a list of users created in the system.**
     *
     *
     * **Since:** DOCUMENTS 4.0c new optional parameter includeLockedUsers
     * **Since:** DOCUMENTS 5.0f HF2 new optional parameter includeInvisibleUsers
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param includeLockedUsers **Default:** `false`.
     * optional definition, if locked users also should be returned.
     * @param includeInvisibleUsers **Default:** `false`.
     * Optional flag indicating whether the method also should return users for which the option "Display user in DOCUMENTS lists" in the Documents Manager is not checkmarked.
     * @returns SystemUserIterator object containing a list of users created in the system.
     * @see
     * {@link context.findSystemUser | context.findSystemUser}
     * {@link context.getSystemUser | context.getSystemUser}
     * {@link context.findSystemUserByAlias | context.findSystemUserByAlias}
     * @example
     * var itSU = context.getSystemUsers();
     * for (var su = itSU.first(); su; su = itSU.next())
     * {
     *    util.out(su.login);
     * }
     */
    getSystemUsers(includeLockedUsers?: boolean, includeInvisibleUsers?: boolean): SystemUserIterator;
    /**
     * **Returns the temporary server path, that was ordered by the gadget API for the token.**
     *
     * @since DOCUMENTS 5.0d
     * @param accessToken String value with the token
     * @param dropToken **Default:** `true`.
     * Optional Boolean value that indicates the server to forget the token
     * @returns String with temporary path or Emptystring if accessToken is unknown
     */
    getTempPathByToken(accessToken: string, dropToken?: boolean): string;
    /**
     * **Subtract two Date objects to get their difference.**
     *
     * This function calculates the time difference between two Date objects, for example if you need to know how many days a business trip takes.
     * By default this function takes the work calendar into account if it is configured and enabled for the principal.
     * @since DOCUMENTS 5.0i HF3
     * @param earlierDate Date object representing the earlier date
     * @param laterDate Date object representing the later date
     * @param unit **Default:** `'days'`.
     * optional String value defining the unit, allowed values are `"minutes"`, `"hours"` and `"days"` (default)
     * @param useWorkCalendar **Default:** `true`.
     * optional boolean to take office hours into account or not (requires enabled and configured work calendar)
     * @returns integer value representing the difference between the two dates
     * @example
     * var start = util.convertStringToDate("01.04.2006 12:30", "dd.mm.yyyy HH:MM");
     * var end = util.convertStringToDate("05.04.2006 12:30", "dd.mm.yyyy HH:MM");
     * var duration = context.getTimestampsDiff(start, end) ;
     * util.out("Difference: " + duration); // should be 4
     */
    getTimestampsDiff(earlierDate: Date, laterDate: Date, unit?: string, useWorkCalendar?: boolean): number;
    /**
     * **Create a String containing a complete path and filename to a temporary file.**
     *
     * The created file path may be used without any danger of corrupting any important data by accident, because DOCUMENTS assures that there is no such file with the created filename yet.
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns String containing the complete "safe" path and filename
     * @example
     * var tmpFilePath = context.getTmpFilePath();
     * util.out(tmpFilePath);
     */
    getTmpFilePath(): string;
    /**
     * **Get a Workflow object by its technical name.**
     *
     * The name parameter may be composed of `name + "-" + version`. Otherwise the function seeks the newest available version of the workflow.
     *
     * **Note:** This function requires a full workflow engine license. It does not seek pure distribution lists.
     *
     * @since DOCUMENTS 6.0
     * @param name A string which contains the technical name of a workflow and optionally a version appendix
     * @returns The requested Workflow object or `null`, if the given name is unknown.
     */
    getWorkflowByName(name: string): Workflow;
    /**
     * **Retrieve the allowed workflows for a file type.**
     *
     * @since DOCUMENTS 5.0i
     * @param fileTypeName String value containing the desired file type name.
     * @param onlyReleased **Default:** `true`.
     * Optional flag indicating whether only released workflows should be returned.
     * @returns Array of strings containing the technical names of the allowed workflows.
     * @example
     * var workflows = context.getWorkflowsFromFileType("testFileType");
     * if (workflows)
     * {
     *   for (var wf of workflows)
     *   {
     *       util.out(wf);
     *   }
     * }
     */
    getWorkflowsFromFileType(fileTypeName: string, onlyReleased?: boolean): String[];
    /**
     * **Get an ArchiveConnection object.**
     *
     * With this method you can get an ArchiveConnection object. This object offers several methods to use the EAS Interface, EBIS or the EASY ENTERPRISE XML-Server.
     *
     * **Since:** archiveServerName: Documents 4.0
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @param archiveServerName Optional string containing the archive server name; If the archive server is not defined, then the main archive server will be used
     * @returns ArchiveConnection-Object or `null`, if failed
     * @deprecated since DOCUMENTS 5.0a - Use {@link Context.getArchiveConnection | Context.getArchiveConnection(archiveServerName)} instead
     */
    getXMLServer(archiveServerName?: string): ArchiveConnection;
    /**
     * **Function to check if a module is licenced in the pem.**
     *
     * @since DOCUMENTS 5.0c HF2
     * @param moduleConst from {@link Context.PEM_MODULE_BUSINESS_UNITS | `PEM Module Constants`}.
     * @returns `true` if licenced, otherwise `false`
     * @example
     * util.out(context.hasPEMModule(context.PEM_MODULE_GADGETS));
     */
    hasPEMModule(moduleConst: number): Boolean;
    /**
     * **Reloads the current principal.**
     *
     * This function invalidates or clears caches (e.g. `PortalScriptCache` and `ScriptEnumCache`) in order to reload them. If necessary,
     * you can also use this method to reload the pem-file for the current principal using the parameter `pemReload`.
     * @since DOCUMENTS 5.0e
     * @param pemReload **Default:** `false`.
     * Optional boolean indicating whether the pem-file for the current principal to be reloaded.
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link context.reloadPrincipal | context.reloadPrincipal}
     * @example
     * if (!context.reloadCurrentPrincipal(true))
     *    util.out(context.getLastError());
     */
    reloadCurrentPrincipal(pemReload?: boolean): boolean;
    /**
     * **Reloads the desired principal.**
     *
     * This function invalidates or clears caches (e.g. `PortalScriptCache` and `ScriptEnumCache`) in order to reload them. If necessary,
     * you can also use this method to reload the pem-file for the desired principal using the parameter `pemReload`.
     * @since DOCUMENTS 5.0e
     * @param principalName String containing the name of the principal to be reloaded.
     * @param pemReload **Default:** `false`.
     * Optional boolean indicating whether the pem-file for the desired principal to be reloaded.
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link context.reloadCurrentPrincipal | context.reloadCurrentPrincipal}
     * @example
     * if (!context.reloadPrincipal("peachit", true))
     *    util.out(context.getLastError());
     */
    reloadPrincipal(principalName: string, pemReload?: boolean): boolean;
    /**
     * **Send a String as TCP-Request to a server.**
     *
     * With this method it is possible to send a String via TCP to a server. The return value of the function is the response of the server.
     * Optional you can define a timeout in ms this function waits for the response of a server
     *
     * **Note:** The responseTimeout is effective only after a request has successfully been sent. Timeouts for connecting and sending are determined by the underlying OS.
     *
     * @since ELC 3.60b / otrisPORTAL 6.0b
     * @param server String containing the IP address or server host
     * @param port int containing the port on which the server is listening
     * @param request String with the request that should be sent to the server
     * @param responseTimeout **Default:** `3000`.
     * int with the timeout for the response in ms. Default value is 3000ms
     * @returns String containing the response and `null` on error
     * @example
     * var response = context.sendTCPStringRequest("192.168.1.1", "4010", "Hello World", 5000);
     * if (!response)
     *    util.out(context.getLastError());
     * else
     *    util.out(response);
     */
    sendTCPStringRequest(server: string, port: number, request: string, responseTimeout?: number): string;
    /**
     * **Set the abbreviation of the current user's portal language.**
     *
     * If you want to set the portal language different from the current users language, you can use this method. As parameter you have to use
     * the two letter abbreviation as defined in the principal's settings in the Windows DOCUMENTS Manager (e.g. "de" for German).
     * @since DOCUMENTS 4.0c
     * @param locale String containing the two letter abbreviation for the locale
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.getClientLang | context.getClientLang}
     * @example
     * context.setClientLang("en");
     */
    setClientLang(locale: string): string;
    /**
     * **Set the script's execution context portal language to the desired language.**
     *
     * @since ELC 3.51g / otrisPORTAL 5.1g
     * @param langIndex integer value of the index of the desired system language
     * @returns `true` if successful, `false` in case of any error
     * @deprecated since DOCUMENTS 4.0c use setClientLang(String locale) instead
     * @example
     * util.out(context.getClientSystemLang());
     * var erg = context.setClientSystemLang(0); // first portal language
     */
    setClientSystemLang(langIndex: number): boolean;
    /**
     * **Place a top level folder a at given position in the global context.**
     *
     * This method can be used to set the position of a top level folder (public, public dynamic or only subfolders folder with no parent) in the global context.
     * @since DOCUMENTS 5.0a
     * @param folder Folder object whose position to be set.
     * @param position new internal position number of folder.
     * @returns `true` if successful, `false` in case of any error.
     * @see
     * {@link context.getFolderPosition | context.getFolderPosition}
     * {@link Folder.getPosition | Folder.getPosition}
     * {@link Folder.setPosition | Folder.setPosition}
     * @example
     * // Create a folder B and place it before a folder A
     * var folderA = context.getFoldersByName("folderA").first();
     * var posA = context.getFolderPosition(folderA);
     * var folderB = context.createFolder("folderB", "public");
     * if (!context.setFolderPosition(folderB, posA - 1))
     *    throw context.getLastError();
     */
    setFolderPosition(folder: Folder, position: number): boolean;
    /**
     * **Set an attribute of the DOCUMENTS global settings to the desired value.**
     *
     * @since DOCUMENTS 5.0g
     * @param attributeName The name of the desired attribute
     * @param value The value that should be assigned
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.getGlobalAttribute | context.getGlobalAttribute}
     * @example
     * var ret = context.setGlobalAttribute("$decreaseSearchArchivesScript", "myDecreaseSearchArchivesScript");
     * if (!ret)
     *   throw context.getLastError();
     */
    setGlobalAttribute(attributeName: string, value: string): boolean;
    /**
     * **Creates or modifies a global custom property according the name and type.**
     *
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link context.getCustomProperties | context.getCustomProperties}
     * {@link context.addCustomProperty | context.addCustomProperty}
     * @example
     * var custProp = context.setOrAddCustomProperty("favorites", "string", "peachit");
     * if (!custProp)
     *   util.out(context.getLastError());
     */
    setOrAddCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Set an attribute of the DOCUMENTS principal to the desired value.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param attributeName the technical name of the desired attribute
     * @param value the value that should be assigned
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link context.getCurrentUserAttribute | context.getCurrentUserAttribute}
     * {@link context.getPrincipalAttribute | context.getPrincipalAttribute}
     * @example
     * context.setPrincipalAttribute("executive.eMail", "test@mail.de");
     * util.out(context.getPrincipalAttribute("executive.eMail"));
     */
    setPrincipalAttribute(attributeName: string, value: string): boolean;
    /**
     * **Set the status of the principal.**
     *
     * @since DOCUMENTS 5.0g
     * @param status String with the desired value of the status. There are following values available:
     *
     * + `inherited`
     * + `released`
     * + `registered`
     * + `blocked`
     * + `removable`
     *
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.getPrincipalStatus | context.getPrincipalStatus}
     * @example
     * if (!context.setPrincipalStatus("released"))
     *   throw context.getLastError();
     */
    setPrincipalStatus(status: string): boolean;
    /**
     * **Sets the progress (%) of the progress bar in the Documents-Manager during the PortalScript execution.**
     *
     * @since DOCUMENTS 5.0c
     * @param value Float with in % of the execution (value >= 0 and value <= 100)
     * @returns
     * @see
     * {@link context.setProgressBarText | context.setProgressBarText}
     * {@link context.getProgressBar | context.getProgressBar}
     * @example
     * context.setProgressBarText("Calculating...");
     * context.setProgressBar(0.0);  // set progress bar to 0.0%
     * for (var i = 1; i<100; i++) {
     *    // do something
     *    context.setProgressBar(i);
     * }
     */
    setProgressBar(value: number): void;
    /**
     * **Sets the progress bar text in the Documents-Manager during the PortalScript execution.**
     *
     * @since DOCUMENTS 5.0c
     * @param text String with the text to displayed in the progress bar
     * @returns
     * @see
     * {@link context.setProgressBar | context.setProgressBar}
     * {@link context.getProgressBar | context.getProgressBar}
     * @example
     * context.setProgressBarText("Calculating...");
     * context.setProgressBar(0.0);  // set progress bar to 0.0%
     * for (var i = 1; i<100; i++) {
     *    // do something
     *    context.setProgressBar(i);
     * }
     */
    setProgressBarText(text: string): void;
    /**
     * **Set and unset "setSuperMode"-flag for the current PortalScript-Session.**
     *
     * The method gives "superrights" to the session and overrules the DOCUMENTS right management e.g. if you use (G)ACL in a filetype,
     * in supermode a FileResultset / HitResultset in the script will find all files, independed of the access rights of the current user.
     * The supermode will be inhertited to sub-scripts (e.g. implicit running enum scripts), but not to ScriptCalls.
     * @since DOCUMENTS 5.0e HF2
     * @param value boolean to set / unset setSuperMode-flag
     * @returns
     * @see {@link context.getSuperMode | context.getSuperMode}
     * @example
     * try {
     *    context.setSuperMode(true);
     *    // do something with superrights
     *    // ...... new HitResultset(.....)
     * } finally {
     *   context.setSuperMode(false);
     * }
     */
    setSuperMode(value: boolean): void;
    /**
     * **Change the structure of files of a file type.**
     *
     * @since DOCUMENTS 5.0g HF2
     * @param fileTypeName String containing the technical name of the file type.
     * @param withStatusEntry **Default:** `true`.
     * Optional boolean indicating whether the status entries for the changed files should be suppressed.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * try {
     *    context.submitFileChanges("TestFileType", false);
     * } catch (err) {
     *    util.out(err)
     * }
     */
    submitFileChanges(fileTypeName: string, withStatusEntry?: boolean): boolean;
    /**
     * **Updates the server sided search field cache for file types.**
     *
     * @since DOCUMENTS 5.0g HF2
     * @param fileTypeName Optional string containing the technical name of the file type. If the parameter is missing or empty,
     * this function updates the search field cache for all file types.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * try {
     *    context.updateSearchFieldCache("TestFileType");
     * } catch (err) {
     *    util.out(err)
     * }
     */
    updateSearchFieldCache(fileTypeName?: string): boolean;
    /**
     * **Logs an executed action to the logbook.**
     *
     * @since DOCUMENTS 5.0e
     * @param actionCode The integer code of the executed action to be logged. Range: 0 to n described as follows:
     *
     * + `0` : Create file
     * + `1` : Start edit file
     * + `2` : Cancel edit file
     * + `3` : Save file
     * + `4` : Archive file
     * + `5` : Delete file
     * + `6` : Start workflow
     * + `7` : Receive file
     * + `8` : Forward file
     * + `9` : Change filetype
     * + `10` : Workflow escalation
     * + `11` : Workflow decision
     * + `12` : XML-Export
     * + `13` : Workflow receive-signal
     * + `14` : Workflow finished
     * + `15` : Filetype created
     * + `16` : Filetype changed
     * + `17` : Filetype deleted
     * + `18` : Filetype-field created
     * + `19` : Filetype-field changed
     * + `20` : Filetype-field deleted
     * + `21` : Filetype-register created
     * + `22` : Filetype-register changed
     * + `23` : Filetype-register deleted
     * + `24` : User created
     * + `25` : User changed
     * + `26` : User deleted
     * + `27` : Access profile created
     * + `28` : Access profile changed
     * + `29` : Access profile deleted
     * + `30` : Added user to access profile
     * + `31` : Removed user from access profile
     * + `32` : Delete file to trash
     * + `33` : Recovery from trash
     * + `34` : Delete archive file
     * + `35` : Maintenance operation performed
     * + `36` : Life cycle action performed
     * + `255`: Custom action
     *
     * @param detail1 Optional String with length <= 255 containing additional information of the action. if the string length > 255, only the first 255 characters will be displayed.
     * @param detail2 Optional String with length <= 60 containing additional information of the action. if the string length > 60, only the first 60 characters will be displayed.
     * @param detail3 Optional String with length <= 60 containing additional information of the action. if the string length > 60, only the first 60 characters will be displayed.
     * @param logObject Optional object to be logged. Currently only DocFile object is allowed.
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link context.findLogBookEntries | context.findLogBookEntries}
     * @example
     * context.writeLogBook(32, "info1", "info2", "info3");
     */
    writeLogBook(actionCode: number, detail1: string, detail2: string, detail3: string, logObject: any): boolean;
    /**
     * **Creates an xlsx from the given JSON-Data and returns the path to the xlsx.**
     *
     * The JSON-String represents a table and has the following structure:
     * ```json
     * {
     *    "exporttype" : export-format,
     *    "labels" : [column1-label, column2-label, ...],
     *    "datatypes" : [column1-datatype, column2-datatype, ...],
     *    "data" : [
     *      	       [data11, data12, ...],
     *      	       [data21, data22, ...],
     *                 ...
     *             ]
     * }
     * ```
     *
     * + `exporttype`: type of the exported format, currently only the type `xlsx` is available
     * + `labels`: array of labels for columns
     * + `datatypes`: array of data types for columns. The following types are avaiable: `string`, `date`, `timestamp` and `numeric`.
     * + `data`: array of arrays - each array specify one line in the table
     * @since DOCUMENTS 5.0i HF5
     * @param inJSON JSON-String containing the data to be exported.
     * @returns String containing the path to the xlsx file, an empty string in case of any error.
     * @example
     * var inJSON = {};
     * inJSON.exporttype = "xlsx";
     * inJSON.labels    = ["Title", "Date", "Time", "Amount", "Comment"];
     * inJSON.datatypes = ["string", "date", "timestamp", "numeric", "string"];
     * inJSON.data = [
     *      	       ["Title1", "12/01/2023", "12/01/2023  15:01", "1.000,99", "Comment 1"],
     *      	       ["Title2", "12/02/2023", "12/02/2023  15:02", "2.000", "Comment 2"],
     *      	       ["Title3", "12/03/2023", "12/03/2023  15:03", "3000", "Comment 3"]
     *               ];
     *
     * var filepath = context.exportList(JSON.stringify(inJSON));
     * if (filepath == "")
     *    throw context.getLastError();
     *
     * context.returnValue = filepath;
     */
    exportList(inJSON: string): string;
    /**
     * **Function to declare where a script comes from.**
     *
     * @since DOCUMENTS 5.0i HF5
     * @param scriptName The name of the desired script.
     * @returns One of `Script Origin Constants`:
     * <ul>
     * <li>{@link context.SCRIPT_FROM_DB} if the script comes from DB</li>
     * <li>{@link context.SCRIPT_FROM_LIBS} if the script comes from the server directory [...]\server\scriptlibs</li>
     * <li>{@link context.SCRIPT_UNKNOWN} otherwise</li>
     * </ul>
     */
    getScriptOrigin(scriptName: string): number;
    /**
     * **Retrieve a FileResultset of all the active files related with a scratch copy.**
     *
     * @since DOCUMENTS 5.0i HF5
     * @returns FileResultset containing a list of the DocFile objects.
     * @see {@link DocFile.deleteScratchCopy | DocFile.deleteScratchCopy}
     */
    getFilesWithScratchCopy(): FileResultset;
}
/**
 * **The ControlFlow class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's
 * workflow by scripting means.**
 *
 * You may access ControlFlow objects of a certain WorkflowStep by the different methods described in the WorkflowStep
 * chapter. The objects of this class reflect only outgoing control flows of a WorkflowStep object.
 *
 * **Note:**
 * This class and all of its methods and attributes require a full workflow engine license, it does not work with pure distribution lists.
 *
 * @since ELC 3.51e / otrisPORTAL 5.1e
 */
declare interface ControlFlow {
    /**
     * **String value containing the unique internal ID of the ControlFlow.**
     *
     * **Note:**
     * This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     */
    readonly id: string;
    /**
     * **String value containing the ergonomic label of the ControlFlow.**
     *
     * This is usually the label of the according button in the web surface.
     *
     * **Note:**
     * This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     */
    readonly label: string;
    /**
     * **String value containing the technical name of the ControlFlow.**
     *
     * **Note:**
     * This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     */
    readonly name: string;
    /**
     * **Get the String value of an attribute of the ControlFlow.**
     *
     * **Note:**
     * This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * **Note:**
     * This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Set the String value of an attribute of the ControlFlow to the desired value.**
     *
     * **Note:**
     * This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
}
/**
 * **The ControlFlowIterator class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's workflow by scripting means.**
 *
 * You may access ControlFlowIterator objects of a certain WorkflowStep by the different methods described in the WorkflowStep chapter. The objects of
 * this class reflect a list of outgoing control flows of a WorkflowStep object.
 * **Note:** This class and all of its methods and attributes require a full workflow engine license, it does not work with pure distribution lists.
 * @since ELC 3.51e / otrisPORTAL 5.1e
 */
declare interface ControlFlowIterator {
    /**
     * **Retrieve the first ControlFlow object in the ControlFlowIterator.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns ControlFlow or `null` in case of an empty ControlFlowIterator
     */
    first(): ControlFlow;
    /**
     * **Retrieve the next ControlFlow object in the ControlFlowIterator.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns ControlFlow or `null` if end of ControlFlowIterator is reached.
     */
    next(): ControlFlow;
    /**
     * **Get the amount of ControlFlow objects in the ControlFlowIterator.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns integer value with the amount of ControlFlow objects in the ControlFlowIterator
     */
    size(): number;
}
/**
 * **The CustomProperty class provides access to the user properties.**
 *
 * The class CustomProperty provides a container where used specific data can be stored. E.g it will be used to store the last search masks.
 * You can save project specific data using this class. The scripting classes {@link SystemUser}, {@link AccessProfile} and {@link Context}
 * have the following access methods available:
 * <ul>
 * <li>getCustomProperties() </li>
 * <li>addCustomProperty() </li>
 * <li>setOrAddCustomProperty() </li>
 * </ul>
 * In the DOCUMENTS-Manager you can find the CustomProperty on the relation-tab properties at the fellow and user account, access profiles and file types.
 * The global custom properties are listed in Documents > Global properties. A global custom property must not belong to a SystemUser, an AccessProfile,
 * a file type and another custom property. All custom properties are located in Documents > All properties.
 *
 * **Since:** DOCUMENTS 5.0 available for AccessProfile and Context
 * @since DOCUMENTS 4.0a
 * @see
 * {@link SystemUser.getCustomProperties | SystemUser.getCustomProperties}
 * {@link SystemUser.setOrAddCustomProperty | SystemUser.setOrAddCustomProperty}
 * {@link SystemUser.addCustomProperty | SystemUser.addCustomProperty}
 * @example
 * var user = context.findSystemUser("schreiber");
 * if (!user)
 *    throw "invalid user";
 * // Creation of an unique (name, type) CustomProperty
 * var custProp = user.setOrAddCustomProperty("superior", "person", "oppen");
 * if (!custProp)
 *    throw "unable to create CustomProperty " + user.getLastError();
 * util.out("New CustomProperty: " + custProp.name);
 * custProp.deleteCustomProperty();
 * // Creation of multiple equal (name, type) CustomProperty
 * for (var i=0; i<5; i++)
 * {
 *    var custProp = user.addCustomProperty("favorites", "something", "value_" + i);
 * }
 * var name = "favorites";
 * var type = "";
 * var it = user.getCustomProperties(name, type);
 * for (var prop = it.first(); prop; prop = it.next())
 * {
 *     if (prop.type == "something")
 *        prop.deleteCustomProperty();
 * }
 */
declare interface CustomProperty {
    /**
     * **String containing the name of the CustomProperty.**
     *
     */
    name: string;
    /**
     * **String containing the type of the CustomProperty.**
     *
     */
    type: string;
    /**
     * **String containing the value of the CustomProperty.**
     *
     */
    value: string;
    /**
     * **Creates a new subproperty for the custom property.**
     *
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link CustomProperty.setOrAddSubProperty | CustomProperty.setOrAddSubProperty}
     * {@link CustomProperty.getSubProperties | CustomProperty.getSubProperties}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is `null`";
     * var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
     * if (!custProp)
     *   util.out(currentUser.getLastError());
     * else
     *   custProp.addSubProperty("Address", "string", "Dortmund");
     */
    addSubProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Delete the CustomProperty.**
     *
     *
     * **Since:** DOCUMENTS 5.0f (new parameter includeSubProperties)
     * @since DOCUMENTS 4.0a
     * @param includeSubProperties **Default:** `false`.
     * Optional boolean indicating whether all subproperties should be also deleted recursively.
     * @returns `true` if successful, `false` in case of any error
     */
    deleteCustomProperty(includeSubProperties?: boolean): boolean;
    /**
     * **Get the String value of an attribute of the CustomProperty.**
     *
     * Valid attribute names are `name`, `type` and `value`
     * @since DOCUMENTS 4.0a
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 4.0a
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Get a CustomPropertyIterator with subproperties of the custom property.**
     *
     * @since DOCUMENTS 5.0
     * @param nameFilter String value defining an optional filter depending on the name
     * @param typeFilter String value defining an optional filter depending on the type
     * @returns CustomPropertyIterator
     * @see
     * {@link CustomProperty.setOrAddSubProperty | CustomProperty.setOrAddSubProperty}
     * {@link CustomProperty.addSubProperty | CustomProperty.addSubProperty}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var itProp = currentUser.getCustomProperties();
     * for (var prop = itProp.first(); prop; prop = itProp.next())
     * {
     *    util.out(prop.name + ": " + prop.value);
     *    var itSubprop = prop.getSubProperties();
     *    for (var subprop = itSubprop.first(); subprop; subprop = itSubprop.next())
     *       {
     *           util.out("Subproperty name: " + subprop.name + " Value: " + subprop.value);
     *       }
     * }
     */
    getSubProperties(nameFilter?: string, typeFilter?: string): CustomPropertyIterator;
    /**
     * **Connects a custom property to an AccessProfile.**
     *
     * An empty profile name disconnects the AccessProfile
     * @since DOCUMENTS 5.0
     * @param nameAccessProfile Optional String value containing the name of the AccessProfile
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link CustomProperty.setSystemUser | CustomProperty.setSystemUser}
     * {@link CustomProperty.setFiletype | CustomProperty.setFiletype}
     * @example
     * if (!custProp.setAccessProfile("Service"))
     *    throw custProp.getLastError();
     * custProp.setAccessProfile("");  // disconnects AccessProfile
     */
    setAccessProfile(nameAccessProfile?: string): boolean;
    /**
     * **Set the String value of an attribute of the CustomProperty to the desired value.**
     *
     * Valid attribute names are `name`, `type` and `value`
     * @since DOCUMENTS 4.0a
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Connects a custom property to a filetype.**
     *
     * An empty filetype name disconnects the filetype
     * @since DOCUMENTS 5.0
     * @param nameFiletype Optional String value containing the technical name of the filetype
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link CustomProperty.setSystemUser | CustomProperty.setSystemUser}
     * {@link CustomProperty.setAccessProfile | CustomProperty.setAccessProfile}
     * @example
     * if (!custProp.setFiletype("ftInvoice"))
     *    throw custProp.getLastError();
     * custProp.setFiletype("");  // disconnects filetype
     */
    setFiletype(nameFiletype?: string): boolean;
    /**
     * **Creates a new subproperty or modifies a subproperty according the name and type for the custom property.**
     *
     * This method creates or modifies a unique subproperty for the custom property. The combination of the name and the type make the subproperty unique for the custom property.
     * @since DOCUMENTS 5.0
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link CustomProperty.getSubProperties | CustomProperty.getSubProperties}
     * {@link CustomProperty.addSubProperty | CustomProperty.addSubProperty}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is `null`";
     * var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
     * if (!custProp)
     *   util.out(currentUser.getLastError());
     * else
     *   custProp.setOrAddSubProperty("Address", "string", "Dortmund");
     */
    setOrAddSubProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Connects a custom property to a parent.**
     *
     * @since DOCUMENTS 5.0g
     * @param parentProperty optional CustomProperty object being the parent CustomProperty of the current CustomProperty. If no parent CustomProperty is defined,
     * the current CustomProperty will be moved to the top level.
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link CustomProperty.setOrAddSubProperty | CustomProperty.setOrAddSubProperty}
     * {@link CustomProperty.getSubProperties | CustomProperty.getSubProperties}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is `null`";
     * var parentProp = currentUser.setOrAddCustomProperty("music", "string", "Pop");
     * if (!parentProp)
     *   throw currentUser.getLastError();
     * var subProp = currentUser.setOrAddCustomProperty("cd", "string", "AC/DC");
     * if (!subProp)
     *   throw currentUser.getLastError();
     * subProp.setParentProperty(parentProp);
     */
    setParentProperty(parentProperty: CustomProperty): boolean;
    /**
     * **Connects a custom property to a SystemUser.**
     *
     * An empty login disconnects the SystemUser
     * @since DOCUMENTS 5.0
     * @param login Optional String value containing the login name of the SystemUser.
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link CustomProperty.setFiletype | CustomProperty.setFiletype}
     * {@link CustomProperty.setAccessProfile | CustomProperty.setAccessProfile}
     * @example
     * if (!custProp.setSystemUser("schreiber"))
     *    throw custProp.getLastError();
     * custProp.setSystemUser("");  // disconnects SystemUser
     */
    setSystemUser(login?: string): boolean;
    /**
     * **Upload a file stored on the server's filesystem for a custom property of type `custompropertyblob`.**
     *
     * **Note:** This function is only available for a custom property of type `custompropertyblob`. After successful upload of a new blob the old blob on the server is removed!
     * @since DOCUMENTS 5.0i HF5
     * @param filePath The path of the file to be uploaded.
     *
     * **Note:** Backslashes contained in the file path must be quoted with a leading backslash, since the backslash is a special char in ECMAScript!
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var custProp = context.setOrAddCustomProperty("testProp", "custompropertyblob", "");
     * var ret = custProp.uploadBlob("c:\\tmp\\test.txt");
     * if (!ret)
     *    util.out(custProp.getLastError());
     */
    uploadBlob(filePath: string): boolean;
    /**
     * **Download a blob from a custom property of type `custompropertyblob` to the server's filesystem.**
     *
     * **Note:** This function is only available for a custom property of type `custompropertyblob`.
     * @since DOCUMENTS 5.0i HF5
     * @param filePath String specifying where the downloaded blob to be stored.
     *
     * **Note:** Backslashes contained in the file path must be quoted with a leading backslash, since the backslash is a special char in ECMAScript!
     * @returns Full path and file name of the downloaded blob, an empty string in case of any error.
     * @example
     * var it = context.findCustomProperties("name='testProp'");
     * var custProp = it.first();
     * if (custProp)
     * {
     *     var filePath = custProp.downloadBlob();
     *     if (filePath == "")
     *         util.out(custProp.getLastError());
     *     else
     *         util.out(filePath);
     * }
     */
    downloadBlob(filePath?: string): string;
}
/**
 * **The CustomPropertyIterator class is an iterator that holds a list of objects of the class CustomProperty.**
 *
 * @since DOCUMENTS 4.0a
 */
declare interface CustomPropertyIterator {
    /**
     * **Retrieve the first CustomProperty object in the CustomPropertyIterator.**
     *
     * @since DOCUMENTS 4.0a
     * @returns CustomProperty or `null` in case of an empty CustomPropertyIterator
     */
    first(): CustomProperty;
    /**
     * **Retrieve the next CustomProperty object in the CustomPropertyIterator.**
     *
     * @since DOCUMENTS 4.0a
     * @returns CustomProperty or `null` if end of CustomPropertyIterator is reached
     */
    next(): CustomProperty;
    /**
     * **Get the amount of CustomProperty objects in the CustomPropertyIterator.**
     *
     * @since DOCUMENTS 4.0a
     * @returns integer value with the amount of CustomProperty objects in the CustomPropertyIterator
     */
    size(): number;
}
/**
 * This class allows you to connect to a database and execute SQL statements.
 *
 * **Important:** For reading the result of a SELECT statement, the class {@link DBResultSet} is used. A DBConnection object can only be used for one DBResultSet object.
 * Meaning, if you want to create another DBResultSet object you must also create an additional DBConnection object.
 *
 * You can connect to the Documents or any other database. **See the {@link DBConnection.constructor | constructor} descriptions for further information.**
 */
declare class DBConnection {
    /**
     * **Connect to DOCUMENTS database.**
     *
     * This is the constructor with no parameters. It can only be used to get a connection to the DOCUMENTS database.
     * @since DOCUMENTS 4.0
     * @see {@link DBResultSet}
     */
    constructor();
    /**
     * **Connect to MySQL - DOCUMENTS DB is MySQL.**
     *
     * If your DOCUMENTS database is a MySQL compatible database, you can connect to any other MySQL compatible database using the following parameters.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param dbType The type of database to connect to, which is identical to the DOCUMENTS database type. The value must be `"mysql"`.
     * @param dbName The name of the database to connect to. E.g. `"mydatabase"`. The default host name is `localhost`. Another host name or IP address
     * can be specified like `"mydatabase@ip-address"`.
     * Examples: `"mydatabase@remote.example.com"`, `"mydatabase@123.123.12.1"`.
     * To connect to a remote database, the remote database server must be configured for remote access. The configuration for remote access is not the default for the database server.
     * @param dbUser The login name of a user that exists on the database server and has access to the database. If this is the user of the DOCUMENTS database, you can omit this parameter.
     * @param password The password of the database user in plain text. If the user is the user of the DOCUMENTS database, you can omit this parameter.
     * @see {@link DBResultSet}
     * @example
     * var testDB = new DBConnection("mysql", "testdb@123.123.12.1", "testuser", "testpw");
     * if (testDB && testDB.getLastError() == null)
     * {
     *   var myRS = testDB.executeQuery("SELECT * FROM testtbl");
     *   // ...
     * }
     */
    constructor(dbType?: string, dbName?: string, dbUser?: string, password?: string);
    /**
     * **Connect to SQL Server - DOCUMENTS DB is SQL Server.**
     *
     * If your DOCUMENTS database is SQL Server, you can connect to any other SQL Server database using the following parameters.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param dbType The type of database to connect to, which is identical to the DOCUMENTS database type. The value must be `odbc` (or `sqlserver`, it's the same).
     * @param connectionString All other information about the database, including information about the credentials, must be specified in a **Connection String**
     * which is passed via the second parameter. See this [Connection Strings Reference](https://www.connectionstrings.com/sql-server/).
     * It is highly recommended, to use an ODBC driver to connect to the database.
     * **OBDC drivers**
     * Open the **Drivers** tab in [ODBC Data Source Administrator](https://docs.microsoft.com/en-us/sql/odbc/admin/odbc-data-source-administrator)
     * on your DOCUMENTS maschine to see a list of available drivers. Microsoft recommends to use **Microsoft ODBC Driver for SQL Server**
     * ([in this documentation](https://docs.microsoft.com/en-us/sql/connect/connect-history)) which is called **ODBC Driver XX for SQL Server**
     * in the list (XX replaced by version). See example.
     * @see {@link DBResultSet}
     * @example
     * var connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=myServerAddress;Database=myDataBase;UID=myUsername;PWD=myPassword;";
     * var myDB = new DBConnection("odbc", connectionString);
     */
    constructor(dbType?: string, connectionString?: string);
    /**
     * **Connection to arbitrary database via ODBC and DSN.**
     *
     * This constructor can be used to create a connection to any database for which an ODBC driver is available.
     *
     * **Example: Conntection to SQL Server via DSN, if the DOCUMENTS database is SQL Server**
     *
     * Using the wizard in the [ODBC Data Source Administrator](https://docs.microsoft.com/en-gb/sql/odbc/admin/odbc-data-source-administrator),
     * you can configure a User- or System-DSN. If you have configured e.g. the DSN `myDSN`, then you can access the configured database like
     * in the second example (see below). If the user is not the DOCUMENTS database user, you must set the `dbUser` and `password` parameters,
     * even if it is configured in the Data Source Name.
     *
     * **Example: Connection to MariaDB via ODBC from DOCUMENTS on Linux**
     *
     * The ODBC Driver Manager package unixODBC can easily be installed using the package manager APT (see note).
     * Read [this section](https://mariadb.com/kb/en/about-mariadb-connector-odbc/#installing-mariadb-connectorodbc-on-debianubuntu) to install MariaDB Connector
     * and [this chapter](https://mariadb.com/kb/en/creating-a-data-source-with-mariadb-connectorodbc/) to create a Data Source.
     *
     * **Example: Connection to SQL Server via ODBC from DOCUMENTS on Linux**
     *
     * If your DOCUMENTS installation is on a Linux system, the type of your DOCUMENTS database is `mysql`. So if you want to access a database on SQL Server, then you must
     * [install the ODBC Driver for SQL Server on your Linux machine](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server).
     * The ODBC Driver Manager package unixODBC can easily be installed using the package manager APT (see note). For testing your database connection independent of PortalScripting,
     * you can use [isql](https://turbodbc.readthedocs.io/en/latest/pages/troubleshooting.html#testing-your-odbc-configuration). After installing the ODBC Driver and
     * the ODBC Driver Manager you must configure a Data Source Name (DNS) in the `odbc.ini` file (exenal documentations
     * [Microsoft](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/connection-string-keywords-and-data-source-names-dsns?view=sql-server-ver15),
     * [turbodbc](https://turbodbc.readthedocs.io/en/latest/pages/odbc/driver_manager_config.html#odbc-configuration-files)). Then you can access the database
     * using the Data Source Name (see first example below).
     *
     * **Note: Remote SQL Server**
     *
     * To connect to a remote SQL Server, you may have to
     * [enable the TCP/IP protocol in SQL Server Configuration Manager](https://docs.microsoft.com/en-gb/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port)
     * and to open the port in the firewall on the remote SQL Server host.
     *
     * **Note: unixODBC**
     *
     * You may also need to install libodbc1.
     *
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param connType This value must be `"odbc"`. The database will be accessed using a standard API for databases, called Open Database Connectivity (ODBC).
     * An ODBC driver for the database must be available and it must be installed on the DOCUMENTS host.
     * @param connString The **Data Source Name (DSN)** or the complete **Connection String**.
     * An ODBC Driver Manager can or sometimes must be used to specify a Data Source Name (DSN).
     * ([Microsoft Documentation](https://docs.microsoft.com/en-gb/sql/odbc/microsoft-open-database-connectivity-odbc)). A Data Source Name allows you
     * to store all required connection information to a database in a specific place (like the `odbc.ini` on Linux or a registry entry on Windows).
     * So it is possible to connect to the defined database only by the name.
     * Another option is to put all the information in one string, called **Connection String**. The Connection String can only be used if the DOCUMENTS database is SQL Server.
     * @param dbUser The login name of a database user who has been granted access to the database.
     * @param password The password of the database user in plain text.
     * @see {@link DBResultSet}
     * @example
     * // First example: using Data Source Name
     * var dataSourceName = "myDSN";
     * var dbUser = "test";
     * var password = "test";
     * var myDB = new DBConnection("odbc", dataSourceName, user, password);
     * @example
     * // Third example: using DBConnection together with DBResultset
     * var myDB = null;
     * var myRS = null;
     * try {
     *    // create DB-Connection using the Data Source Name "Nordwind"
     *    myDB = new DBConnection("odbc", "Nordwind");
     *    if (myDB.getLastError() != null)
     *       throw "Error connection the database: " + myDB.getLastError();
     *    // executeQuery returns a DBResultSet
     *    myRS = myDB.executeQuery("SELECT Nachname, Vorname FROM Personal");
     *    if (!myRS)
     *       throw "Error in SELECT statement: " + myDB.getLastError();
     *    // read all persons from the result set
     *    while (myRS.next()) {
     *       var fullName = myRS.getString(0) + ", " + myRS.getString(1);
     *       // Fails, because you must read the columns in the correct order!
     *       //var fullName = myRS.getString(1) + ", " + myRS.getString(0);
     *       // Fails, because it is not allowed to read a value twice!
     *       //var fullName = myRS.getString(0) + ", " + myRS.getString(0);
     *       util.out(fullName);
     *    }
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *     // Important: free resources!
     *     if (myRS)
     *        myRS.close();
     *     if (myDB)
     *        myDB.close();
     * }
     */
    constructor(connType?: string, connString?: string, dbUser?: string, password?: string);
    /**
     * **Close the database connection and free the server ressources.**
     *
     * **Note:** It is strongly recommanded to close each DBConnection object you have created,
     * since database connections are so-called expensive ressources and should be used carefully.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DBResultSet.close | DBResultSet.close}
     */
    close(): boolean;
    /**
     * **Execute a SELECT statement and retrieve a {@link DBResultSet} containing the result rows.**
     *
     * **Note:** This instruction should only be used to SELECT on the external database, since the method always tries to create a DBResultSet.
     * If you need to execute different SQL statements, refer to the {@link DBConnection.executeStatement | DBConnection.executeStatement()} method.
     *
     * **Note:** x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method handles the statement as UTF-8-String
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param sqlStatement String containing the SELECT statement you want to execute in the database
     * @returns DBResultSet containing the result rows generated by the SELECT instruction
     * @see {@link DBConnection.executeStatement | DBConnection.executeStatement}
     */
    executeQuery(sqlStatement: string): DBResultSet;
    /**
     * **Execute a SELECT statement using a x64/UTF-8 DOCUMENTS and retrieve a {@link DBResultSet} containing the result rows.**
     *
     * **Note:** This instruction should only be used to SELECT on the external database, since the method always tries to create a DBResultSet.
     * If you need to execute different SQL statements, refer to the {@link DBConnection.executeStatement | DBConnection.executeStatement()} method.
     *
     * @since DOCUMENTS 4.0
     * @param sqlStatement String containing the SELECT statement you want to execute in the database
     * @returns DBResultSet containing the result rows generated by the SELECT instruction
     * @see {@link DBConnection.executeStatementUC | DBConnection.executeStatementUC}
     * @deprecated since DOCUMENTS 4.0a HF2, use {@link DBConnection.executeQuery | DBConnection.executeQuery()} instead
     */
    executeQueryUC(sqlStatement: string): DBResultSet;
    /**
     * **Execute any SQL statement on the external database.**
     *
     * You can execute any SQL statement, as long as the database driver used for the connection supports the type of instruction.
     * Use this method especially if you want to INSERT or UPDATE or DELETE data rows in tables of the external database.
     * If you need to SELECT table rows, refer to the {@link DBConnection.executeQuery | DBConnection.executeQuery()} method.
     *
     * **Note:** x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method handles the statement as UTF-8-String
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param sqlStatement
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DBConnection.executeQuery | DBConnection.executeQuery}
     */
    executeStatement(sqlStatement: string): boolean;
    /**
     * **Execute any SQL statement using a x64/UTF-8 DOCUMENTS on the external database.**
     *
     * You can execute any SQL statement, as long as the database driver used for the connection supports the type of instruction.
     * Use this method especially if you want to INSERT or UPDATE or DELETE data rows in tables of the external database.
     * If you need to SELECT table rows, refer to the DBConnection.executeQueryUC() method.
     * @since DOCUMENTS 4.0
     * @param sqlStatement
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DBConnection.executeQueryUC | DBConnection.executeQueryUC}
     * @deprecated since DOCUMENTS 4.0a HF2, use {@link DBConnection.executeStatement | DBConnection.executeStatement()} instead
     */
    executeStatementUC(sqlStatement: string): boolean;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
}
/**
 * **The DBResultSet class contains a list of resultset rows.**
 *
 * You need an active {@link DBConnection} object to execute an SQL query which is used to create a DBResultSet.
 *
 * **Important:** Please consider the restrictions according the order of reading of the columns of the
 * DBResultSet. Read the example! The following data types for database columns will be supported:
 *
 * | **SQL data type** | **access method**                                                                                                             |
 * |-------------------|-------------------------------------------------------------------------------------------------------------------------------|
 * | SQL_INTEGER       | {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()}                                            |
 * | SQL_SMALLINT      | {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()}                                            |
 * | SQL_BIGINT        | {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()}                                            |
 * | SQL_FLOAT         | {@link DBResultSet.getFloat | getFloat()}, {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()} |
 * | SQL_DECIMAL       | {@link DBResultSet.getFloat | getFloat()}, {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()} |
 * | SQL_NUMERIC       | {@link DBResultSet.getFloat | getFloat()}, {@link DBResultSet.getInt | getInt()}, {@link DBResultSet.getString | getString()} |
 * | SQL_BIT           | {@link DBResultSet.getBool | getBool()}, {@link DBResultSet.getString | getString()}                                          |
 * | SQL_TIMESTAMP     | {@link DBResultSet.getTimestamp | getTimestamp()}, {@link DBResultSet.getString | getString()}                                |
 * | SQL_DATE          | {@link DBResultSet.getDate | getDate()}, {@link DBResultSet.getString | getString()}                                          |
 * | SQL_GUID          | {@link DBResultSet.getString | getString()}                                                                                   |
 * | SQL_VARCHAR       | {@link DBResultSet.getString | getString()}                                                                                   |
 * | SQL_CHAR          | {@link DBResultSet.getString | getString()}                                                                                   |
 * | all other types   | {@link DBResultSet.getString | getString()}                                                                                   |
 *
 * **Since:** DOCUMENTS 5.0c HF1 (support for SQL_GUID)
 * @since ELC 3.50 / otrisPORTAL 5.0
 * @see {@link DBConnection}
 * @example
 * // create DB-Connection to ODBC-64 Datasource "Nordwind"
 * var myDB = new DBConnection("odbc", "Nordwind");
 * if (myDB && myDB.getLastError() == null)
 * {
 *    var myRS = myDB.executeQuery("SELECT Nachname, Vorname FROM Personal");
 *    if (myRS)
 *    {
 *       // read all persons from the result set
 *       while (myRS.next())
 *       {
 *          var fullName = myRS.getString(0) + ", " + myRS.getString(1);
 *          // var fullName = myRS.getString(1) + ", " + myRS.getString(0);  // Fails, because you must read the columns in the correct order!
 *          // var fullName = myRS.getString(0) + ", " + myRS.getString(0);  // Fails, because it is not allowed to read a value twice!
 *          util.out(fullName);
 *       }
 *      // Important: free resource!
 *      myRS.close()
 *    }
 *    else
 *       util.out("Error in SELECT statement: " + myDB.getLastError());
 *    // Important: free resource!
 *    myDB.close();
 * }
 * else
 *    util.out("Error connection the database: " + myDB.getLastError())
 */
declare interface DBResultSet {
    /**
     * **Close the DBResultSet and free the server ressources.**
     *
     * **Note:** It is strongly recommanded to close each DBResultSet object you have created, since
     * database connections and resultsets are so-called expensive ressources and should be used carefully.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DBConnection.close | DBConnection.close}
     */
    close(): boolean;
    /**
     * **Read the indicated column of the current row of the DBResultSet as a boolean value.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns boolean value representing the indicated column of the current row
     */
    getBool(colNo: number): boolean;
    /**
     * **Function returns the name of a column.**
     *
     * @since DOCUMENTS 5.0
     * @param colNo integer value (zero based) indicating the desired column
     * @returns Column name as String
     */
    getColName(colNo: number): string;
    /**
     * **Read the indicated column of the current row of the DBResultSet as a Date object.**
     *
     * **Note:** The return value will be `null` if the content of the indicated column cannot be converted to a Date object.
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns Date object representing the indicated column of the current row or `null` if is null-value
     */
    getDate(colNo: number): Date;
    /**
     * **Read the indicated column of the current row of the DBResultSet as a float value.**
     *
     * **Note:** The return value will be NaN if the content of the indicated column cannot be converted to a float value.
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns float value representing the indicated column of the current row or `null` if is null-value
     */
    getFloat(colNo: number): number;
    /**
     * **Read the indicated column of the current row of the DBResultSet as an integer value.**
     *
     * **Note:** The return value will be NaN if the content of the indicated column cannot be converted to an integer value.
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns integer value representing the indicated column of the current row or `null` if is null-value
     */
    getInt(colNo: number): number;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Function returns the amount of columns of the DBResultSet.**
     *
     * @since DOCUMENTS 5.0
     * @returns Column count as int
     */
    getNumCols(): number;
    /**
     * **Read the indicated column of the current row of the DBResultSet as a String.**
     *
     * **Note:** x64/UTF-8 DOCUMENTS version: since DOCUMENTS 4.0a HF2 the method transcode the fetched data to UTF-8
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns String representing the indicated column of the current row or `null` if is null-value
     */
    getString(colNo: number): string;
    /**
     * **Read the indicated column of the current row of the DBResultSet as a Date object including the time.**
     *
     * **Note:** The return value will be `null` if the content of the indicated column cannot be converted to a Date object.
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns Date object (including time) representing the indicated column of the current row or `null` if is null-value
     */
    getTimestamp(colNo: number): Date;
    /**
     * **Read the indicated column of the current row of the DBResultSet on a x64/UTF-8 DOCUMENTS as a String.**
     *
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since DOCUMENTS 4.0
     * @param colNo integer value (zero based) indicating the desired column of the current row of the DBResultSet
     * @returns String representing the indicated column of the current row or `null` if is null-value
     * @deprecated since DOCUMENTS 4.0a HF2 use {@link DBResultSet.getString | DBResultSet.getString()} instead
     */
    getUCString(colNo: number): string;
    /**
     * **Move the resultset pointer to the next row of the DBResultSet.**
     *
     * The method must be called at least once after retrieving a DBResultSet, because the newly created object does not point to the first result row but to BOF (beginning of file).
     * **Note:** every value of a DBResultSet can only be read one time and in the correct order!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if the DBResultSet now points to the next row, `false` if there is no further result row
     */
    next(): boolean;
}
/**
 * **The DocFile class implements the file object of DOCUMENTS.**
 *
 * You may access a single DocFile with the help of the attribute `context.file` or by creating a {@link FileResultset}.
 * There are no special properties available, but each field of a file is mapped to an according property.
 * You can access the different field values with their technical names.
 * For this reason it is mandatory to use programming language friendly technical names, meaning
 * <ul>
 * <li>only letters, digits and the underscore "_" are allowed. </li>
 * <li>no whitespaces or any special characters are allowed. </li>
 * <li>the technical name must not start with a digit. </li>
 * <li>only the first 32 characters of the technical name are significant to identify the field.</li>
 * </ul>
 * @example
 * var myFile = context.file;
 * var priority = myFile.Priority; // read a field value
 * myFile.Remark = "Just a remark"; // assign a value to a field
 * myFile.sync(); // apply changes in field values to the file
 */
declare interface DocFile {
    /**
     * **The technical name of a field.**
     *
     * Each field of a DocFile is mapped to an according property. You can access the field value with the technical name.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * var myFile = context.file;
     * var strValue = myFile.stringField;
     * myFile.dateField = new Date();
     * myFile.sync();
     */
    fieldName: any;
    /**
     * **Cancel edit mode for a file.**
     *
     * If you switched a file to edit mode with the {@link DocFile.startEdit | startEdit()} method and if you want to cancel this
     * (e.g. due to some error that has occurred in the mean time) this function should be used to destroy
     * the scratch copy which has been created by the startEdit() instruction.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link DocFile.startEdit | DocFile.startEdit}
     * {@link DocFile.commit | DocFile.commit}
     * @example
     * var myFile = context.file;
     * myFile.startEdit();
     * myFile.Field = "value";
     * if(!myFile.abort()) { // effect: "value" is not applied!
     *      throw myFile.getLastError();
     * }
     */
    abort(): boolean;
    /**
     * **Add a file as a new {@link Document} from the server's filesystem to a given Register.**
     *
     * It is possible to parse Autotexts inside the source file to fill the Document with the contents of index fields of a DocFile object.
     * The max. file size for the source file is 512 KB.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.51f / otrisPORTAL 5.1f
     * @param pathDocument String value containing the complete filepath with file-extension to the source file on the server
     * @param targetRegister String value containing the technical name of the desired Register
     * @param targetFileName String value containing the desired filename of the uploaded Document
     * @param deleteDocumentAtFileSystem **Default:** `false`.
     * optional boolean value to decide whether to delete the source file on the server's filesystem
     * @param parseAutoText **Default:** `false`.
     * optional boolean value to decide whether to parse the AutoText values inside the source file.
     * The param pathDocument must have included an extension, otherwise parsing of Autotext will not work!
     *
     * **Note:** if you want to make use of AutoTexts in this kind of template files,
     * you need to use double percentage signs instead of single ones, e.g. %%Field1%% instead of %Field1%!
     * @param referencFileToParse **Default:** `this`.
     * optional DocFile object to be used to parse the AutoTexts inside the template. If you omit this parameter,
     * the current DocFile object is used as the data source.
     * @returns `Document` if successful, `null` in case of any error
     * @example
     * var f = context.file;
     * var success = f.addDocumentFromFileSystem("c:\\temp\\test.rtf", "Documents", "parsedRTFFile.rtf", false, true);
     */
    addDocumentFromFileSystem(pathDocument: string, targetRegister: string, targetFileName: string, deleteDocumentAtFileSystem?: boolean, parseAutoText?: boolean, referencFileToParse?: DocFile): Document;
    /**
     * **Create a PDF file containing the current DocFile's contents and store it on a given document register.**
     *
     * The different document types of your documents on your different tabs require the appropriate PDF filter programs to be installed and configured in DOCUMENTS.
     * To successfully add the created PDF file to a register the DocFile needs to be in edit mode (via {@link DocFile.startEdit | startEdit()} method),
     * and the changes have to be applied via {@link DocFile.commit | DocFile.commit()}.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50a / otrisPORTAL 5.0a
     * @param pathCoverXML String containing full path and filename of the template xml file to parse
     * @param createCover boolean whether to create a field list or to only take the documents
     * @param pdfFileName String value for the desired file name of the created PDF
     * @param targetRegister String value containing the technical name of the target document register
     * @param sourceRegisterNames Array with the technical names of the document registers you want to include
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var source = new Array();
     * source.push("FirstRegister");
     * source.push("SecondRegister");
     * var docFile = context.file;
     * docFile.startEdit();
     * docFile.addPDF("c:\\tmp\\cover.xml",
     *    true,
     *    "GeneratedPDF.pdf",
     *    "MyTargetRegister",
     *    source
     * );
     * docFile.commit();
     */
    addPDF(pathCoverXML: string, createCover: boolean, pdfFileName: string, targetRegister: string, sourceRegisterNames: any[]): boolean;
    /**
     * **Archive the DocFile object.**
     *
     * The target archive has to be configured in the filetype definition (in the Windows Portal Client) as the default archive.
     * If no default archive is defined, the execution of this operation will fail.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see
     * [DocFile.archive(archiveKey)](./DocFile.html#archive.archive-2)
     * [DocFile.archive(ArchivingDescription)](./DocFile.html#archive.archive-3)
     * @example
     * var myFile = context.file;
     * myFile.archive();
     */
    archive(): boolean;
    /**
     * **Archive the DocFile object to the desired archive.**
     *
     * If the target archive key is misspelled or if the target archive does not exist, the operation will fall back to the default archive,
     * as long as it is configured in the filetype definition. So the function will only fail if both the target archive and the default archive are missing.
     * **Note:** For EE.i: It is important to know that the target archive String must use the socalled XML-Server syntax. The old EAG syntax is not supported.
     * It is as well neccessary to use a double backslash (\\) if you define your target archive as an ECMAScript String value, because a single backslash is a special character.
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: Documents 4.0
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param archiveKey String value containing the complete archive key for EE.i or schema|view for EE.x of the desired target archive
     * @returns `true` if successful, `false` in case of any error
     * @see
     * [DocFile.archive()](./DocFile.html#archive.archive-1)
     * [DocFile.archive(ArchivingDescription)](./DocFile.html#archive.archive-3)
     * @example
     * // Example for EE.i:
     * var myFile = context.file;
     * var targetArchive = "$(#TOASTUP)\\STANDARD";
     * targetArchive += "@myeei";  // since Documents 4.0 using multi archive server
     * myFile.archive(targetArchive);
     * @example
     * // Example for EE.x:
     * var myFile = context.file;
     * var view = "Unit=Default/Instance=Default/View=DeliveryNotes";
     * var schema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
     * var target = schema + "|" + view;
     * target += "@myeex";  // since Documents 4.0 using multi archive server
     * myFile.archive(target);
     * @example
     * // Example for EAS:
     * var myFile = context.file;
     * myFile.archive("@myeas");  // using multi archive server
     */
    archive(archiveKey: string): boolean;
    /**
     * **Archive the DocFile object according to the given {@link ArchivingDescription} object.**
     *
     * This is the most powerful way to archive a file through scripting, since the ArchivingDescription object supports
     * a convenient way to influence which parts of the DocFile should be archived.
     *
     * **Since:** EE.i: ELC 3.51c / otrisPORTAL 5.1c
     * **Since:** EE.x: ELC 3.60a / otrisPORTAL 6.0a
     * **Since:** EAS: Documents 4.0
     *
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param desc ArchivingDescription object that configures several archiving options
     * @returns `true` if successful, `false` in case of any error
     * @see {@link ArchivingDescription}
     * @see [DocFile.archive()](./DocFile.html#archive.archive-1)
     * @see [DocFile.archive(archiveKey)](./DocFile.html#archive.archive-2)
     * @example
     * // Example for EE.i:
     * var myFile = context.file;
     * var ad = new ArchivingDescription();
     * ad.targetArchive = "$(#TOASTUP)\\STANDARD";
     * ad.archiveServer = "myeei";  // since Documents 4.0 using multi archive server
     * ad.archiveStatus = true;
     * ad.archiveMonitor = true;
     * ad.addRegister("all_docs");  // archive all attachments
     * var success = myFile.archive(ad);
     * if (success)
     * {
     *    context.returnType = "html";
     *    return ("<p>ArchiveFileID: " + myFile.getAttribute("Key") + "<p>");
     * }
     * @example
     * // Example for EE.x:
     * var myFile = context.file;
     * var ad = new ArchivingDescription();
     * ad.targetView = "Unit=Default/Instance=Default/View=DeliveryNotes";
     * ad.targetSchema = "Unit=Default/Instance=Default/DocumentSchema=LIEFERSCHEINE";
     * ad.archiveServer = "myeex";  // since Documents 4.0 using multi archive server
     * ad.archiveStatus = true;
     * ad.archiveMonitor = true;
     * ad.addRegister("all_docs");  // archive all attachments
     * var success = myFile.archive(ad);
     * if (success)
     * {
     *    context.returnType = "html";
     *    return ("<p>ArchiveFileID: " + myFile.getArchiveKey() + "</p>");
     * }
     * @example
     * // Example for EAS:
     * var myFile = context.file;
     * var ad = new ArchivingDescription();
     * ad.archiveServer = "myeas";  // using multi archive server
     * ad.archiveStatus = true;
     * ad.archiveMonitor = true;
     * ad.addRegister("all_docs");  // archive all attachments
     * var success = myFile.archive(ad);
     * if (success)
     * {
     *    context.returnType = "html";
     *    return ("<p>ArchiveFileID: " + myFile.getArchiveKey() + "</p>");
     * }
     */
    archive(desc: ArchivingDescription): boolean;
    /**
     * **Archive the DocFile object and remove the DOCUMENTS file.**
     *
     * The target archive has to be configured in the filetype definition (in the Windows Portal Client) as the default archive.
     * It depends on the filetype settings as well, whether Status and Monitor will be archived as well.
     * If no default archive is defined, the execution of this operation will fail.
     * **Note:** It is strictly forbidden to access the DocFile object after this function has been executed successfully;
     * if you try to access it, your script will fail, because the DocFile does not exist any longer in DOCUMENTS.
     * For the same reason it is strictly forbidden to execute this function in a signal exit PortalScript.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * myFile.archiveAndDelete();
     */
    archiveAndDelete(): boolean;
    /**
     * **Creates a JSON string of this file.**
     *
     *
     * **Since:** DOCUMENTS 5.0c HF2 (new parameter fieldList)
     * **Since:** DOCUMENTS 5.0F (new parameter jsonMode)
     * @since DOCUMENTS 5.0 HF1
     * @param fieldList **Default:** `[]`.
     * optional String array to specify the JSON output. The array must contain field names and DocFile attributes from the following list
     *
     * + `"DlcFile_Title"`
     * + `"DlcFile_Owner"`
     * + `"DlcFile_Created"`
     * + `"DlcFile_LastEditor"`
     * + `"DlcFile_LastModified"`
     *
     * @param jsonMode **Default:** `0`.
     * optional Integer bit mask to specify the JSON output structure. The jsonMode can be combined by the following values
     *
     * + {@link Util.JSON_RAW | `util.JSON_RAW`}
     * + {@link Util.JSON_LABEL | `util.JSON_LABEL`}
     * + {@link Util.JSON_LOCALE | `util.JSON_LOCALE`}
     *
     * @returns `string` with JSON content.
     * @see {@link DocFile.fromJSON | DocFile.fromJSON}
     * @example
     * var file = context.file;
     * util.out(file.asJSON());
     * // {
     * //    "DlcFile_Title": "Rechnung 17",
     * //    "DlcFile_Owner": "Schreiber, Willi",
     * //    "DlcFile_Created": "2019-11-08T10:42:42.000Z",
     * //    "DlcFile_LastEditor": "Schreiber, Willi",
     * //    "DlcFile_LastModified": "2019-11-08T10:45:10.000Z",
     * //    "company": "otris software AG",
     * //    "invoice_ts": "2019-11-08T10:45:10.000Z",     Zulu Time
     * //    "invoice_ok": true,
     * //    "invoice_no": 17,
     * //    "amount": 3.14,
     * // }
     * var file = context.file;
     * var fields = ["DlcFile_Title", "company"];
     * util.out(file.asJSON(fields));
     * // {
     * //    "DlcFile_Title": "Rechnung 17",
     * //    "company":"otris software AG"
     * // }
     * var file = context.file;
     * util.out(file.asJSON([], util.JSON_LOCALE));
     * // {
     * //    "DlcFile_Title": "Rechnung 17",
     * //    "DlcFile_Owner": "Schreiber, Willi",
     * //    "DlcFile_Created": "08.11.2019  11:42",
     * //    "DlcFile_LastEditor": "Schreiber, Willi",
     * //    "DlcFile_LastModified": "08.11.2019  11:45",
     * //    "company": "otris software AG",
     * //    "invoice_date": "08.11.2019  11:45",
     * //    "invoice_ok": true,
     * //    "invoice_no": 17,
     * //    "amount": "3,14",
     * // }
     * //
     * var file = context.file;
     * util.out(file.asJSON([], util.JSON_RAW | util.JSON_LABEL | util.JSON_LOCALE));
     * // {
     * //    "DlcFile_Title": "Rechnung 17",
     * //    "DlcFile_Owner": "Schreiber, Willi",
     * //    "DlcFile_Created": "08.11.2019  11:42",
     * //     ....
     * //     "raw":  {
     * //                "DlcFile_Title": "Rechnung 17",
     * //                "DlcFile_Created": "2019-11-08T10:42:42.000Z",
     * //                "company": "otris software AG",
     * //                ...
     * //              },
     * //     "label": {
     * //                "DlcFile_Title": "Titel",
     * //                "DlcFile_Created": "Erstellt am"",
     * //                "company": "Kundenname",
     * //                ...
     * //               }
     * // }
     */
    asJSON(fieldList?: String[], jsonMode?: number): string;
    /**
     * **Cancel the current workflow for the file.**
     *
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var f = context.file;
     * f.cancelWorkflow();
     */
    cancelWorkflow(): boolean;
    /**
     * **Change the filetype of this file.**
     *
     * @since DOCUMENTS 4.0e
     * @param nameFiletype String containing the technical name of the filetype.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var file = context.file;
     * if (!file.changeFiletype("newFiletype"))
     *   util.out(file.getLastError());
     */
    changeFiletype(nameFiletype: string): boolean;
    /**
     * **Executes the global otrLifeCycle_OnMasterExit Script-Exit If the property LifeCycleEnabled is set at the filetype the global otrLifeCycle_OnMasterExit Script will be started.**
     *
     * @since DOCUMENTS 5.0i
     * @param event optional String with en event name.
     * @returns `true` if successful or in case of an error an exception will be thrown
     * @see parameter 'checkLifeCyleScript' in {@link DocFile.sync | DocFile.sync()}
     * @example
     * try {
     *    var docFile = context.file;
     *    ... do something
     *    docFile.checkLifeCycleScript();
     * } catch (err) {
     *    util.out("Error: ") + err;
     * }
     */
    checkLifeCycleScript(event?: string): boolean;
    /**
     * **Function to check a DocFile rule.**
     *
     * @since DOCUMENTS 5.0h
     * @param jsonRule String json-String with the rule
     * @returns `true` if the rule is fulfilled, otherwise `false`
     */
    checkRule(jsonRule: string): boolean;
    /**
     * **Checks the receive signals of the workflow for the DocFile object.**
     *
     * This method can only be used for a DocFile, that runs in a workflow and the workflow has receive signals.
     * Usually the receive signals of the workflow step will be checked by a periodic job.
     * Use this method to trigger the check of the receive signals for the DocFile.
     * @since DOCUMENTS 4.0a
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * var succ = myFile.checkWorkflowReceiveSignal();
     * if (!succ)
     *    util.out(myFile.getLastError());
     */
    checkWorkflowReceiveSignal(): boolean;
    /**
     * **Clear a followup date for a desired user.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param pUser SystemUser object of the desired user
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DocFile.setFollowUpDate | DocFile.setFollowUpDate}
     * @example
     * var docFile = context.file;
     * var su = context.getSystemUser();
     * docFile.clearFollowUpDate(su);
     */
    clearFollowUpDate(pUser: SystemUser): boolean;
    /**
     * **Commit any changes to the DocFile object.**
     *
     * This method is mandatory to apply changes to a file that has been switched to edit mode with the {@link DocFile.startEdit | DocFile.startEdit()} method.
     * It is strictly prohibited to execute the {@link DocFile.commit | DocFile.commit()} method in a script which is attached to the onSave scripting hook.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link DocFile.startEdit | DocFile.startEdit}
     * {@link DocFile.sync | DocFile.sync}
     * {@link DocFile.abort | DocFile.abort}
     * @example
     * var myFile = context.file;
     * if (!myFile) {
     *    throw "file undefined";
     * }
     * if (!myFile.startEdit()) {
     *    throw myFile.getLastError();
     * }
     * myFile.Field = "value";
     * if (!myFile.commit()) {
     *    var errorMsg = myFile.getLastError(); // Stores error message of commit(), if abort() does not work its error message is appended
     *    if (!myFile.abort()) {
     *       errorMsg += '\n' + myFile.getLastError();
     *    }
     *    throw errorMsg;
     * }
     */
    commit(): boolean;
    /**
     * **Store a reference to the current file in the desired target folder.**
     *
     * The (public) folder must be a real folder, it must not be a dynamic filter, nor a "only subfolder" object.
     * @since ELC 3.51h / otrisPORTAL 5.1h
     * @param fObj Folder object representing the desired target public folder
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link DocFile.disconnectFolder | DocFile.disconnectFolder}
     * @example
     * var f = context.file;
     * var fObj = context.getFoldersByName("Invoices").first();
     * var success = f.connectFolder(fObj);
     */
    connectFolder(fObj: Folder): boolean;
    /**
     * **Count fields with a desired name in the file.**
     *
     * **Note:** When this function is called on an EE.x DocFile with an empty field name, the return value may be greater than expected.
     * The DOCUMENTS image of such a file can include EE.x system fields and symbolic fields for other imported scheme attributes (blob content, notice content).
     * @since DOCUMENTS 4.0c HF2
     * @param fieldName String containing the technical name of the fields to be counted.
     * @returns The number of fields als an Integer.
     * @example
     * var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2@eex1"
     * var docFile = context.getArchiveFile(key);
     * if (!docFile)
     *    throw "archive file does not exist: " + key;
     * else
     *    util.out(docFile.countFields("fieldName"));
     */
    countFields(fieldName: string): number;
    /**
     * **Creates a document using a document template, that was defined at the file type.**
     *
     * @since DOCUMENTS 5.0f
     * @param templateName String name of the filetypes template that must be used
     * @returns `string` with path to the created document object or an empty string, if failed.
     */
    createDocumentFromTemplate(templateName: string): string;
    /**
     * **Creates a workflow monitor file in the server's file system.**
     *
     * This method creates a monitor file in the server's file system with the workflow monitor content of the DocFile. The file will be created as a html-file.
     * **Note:** This generated file will no be automatically added to the DocFile
     * @since DOCUMENTS 4.0a HF2
     * @param asPDF **Default:** `false`.
     * boolean parameter that indicates that a pdf-file must be created instead of a html-file
     * @param locale String (de, en,..) in which locale the file must be created (empty locale = log-in locale)
     * @returns String containing the path of the created file
     */
    createMonitorFile(asPDF?: boolean, locale?: string): string;
    /**
     * **Creates a status file in the server's file system.**
     *
     * This method creates a status file in the server's file system with the status content of the DocFile. The file will be created as a html-file.
     * **Note:** This generated file will no be automatically added to the DocFile
     * @since DOCUMENTS 4.0a HF2
     * @param asPDF **Default:** `false`.
     * boolean parameter that indicates that a pdf-file must ge created instead of a html-file
     * @param locale String (de, en,..) in which locale the file must be created (empty locale = log-in locale)
     * @returns String containing the path of the created file
     */
    createStatusFile(asPDF?: boolean, locale?: string): string;
    /**
     * **Delete the DocFile object.**
     *
     * If there's another PortalScript attached to the onDelete scripting hook, it will be executed right before the deletion takes place.
     * **Note:** It is strictly forbidden to access the DocFile object after this function has been executed successfully;
     * if you try to access it, your script will fail, because the DocFile does not exist any longer in DOCUMENTS.
     * For the same reason it is strictly forbidden to execute this function in a signal exit PortalScript.
     * **Note:** The parameters moveTrash, movePool are ignored for archive files. The parameters allVersions and easDeleteMode require an EAS/EDA file and are ignored otherwise.
     * **Note:** The parameter easDeleteMode is interpreted in the following way.
     * <ul>
     * <li> 0 = Use default setting (property "EASDeleteMode" of the archive store or factory setting); </li>
     * <li> 1 = quick delete (restorable from WORM directory with archive administration tools); </li>
     * <li> 2 = full delete (requires archive maintenance login "eas_keeper"). </li>
     * </ul>
     * The last option ist occasionally needed to make a solution compliant with EU-GDPR. If a script tries to delete the actual "context.file",
     * the server usually enforces "movePool = true". This is controlled by the common DOCUMENTS property "ContextFileDeleteProtection".
     *
     * **Since:** ELC 3.50n / otrisPORTAL 5.0n (moveTrash parameter)
     * **Since:** ELC 3.51f / otrisPORTAL 5.1f (movePool parameter)
     * **Since:** DOCUMENTS 4.0a HF1 (available for archive files)
     * **Since:** DOCUMENTS 4.0e (all versions)
     * **Since:** DOCUMENTS 5.0e (easDeleteMode)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param moveTrash **Default:** `false`.
     * optional boolean parameter to decide whether to move the deleted file to the trash folder
     * @param movePool **Default:** `true`.
     * optional boolean parameter to decide whether to move the deleted file's object to the file pool
     * @param allVersions **Default:** `false`.
     * optional boolean parameter to delete all versions of an EAS archive file at once.
     * @param easDeleteMode **Default:** `0`.
     * opional integer specifying the delete mode for an EAS archive file. See remarks.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * myFile.deleteFile(false, true);
     */
    deleteFile(moveTrash?: boolean, movePool?: boolean, allVersions?: boolean, easDeleteMode?: number): boolean;
    /**
     * **Uncouple an active file from the archived version.**
     *
     * @since DOCUMENTS 4.0d
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link DocFile.archive | DocFile.archive}
     * @example
     * var f = context.file;
     * var f.archive();
     * var success = f.disconnectArchivedFile();
     */
    disconnectArchivedFile(): boolean;
    /**
     * **Remove a reference to the current file out of the desired target folder.**
     *
     * The (public) folder must be a real folder, it must not be a dynamic filter, nor a "only subfolder" object.
     * @since ELC 3.51h / otrisPORTAL 5.1h
     * @param fObj Folder object representing the desired target public folder
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link DocFile.connectFolder | DocFile.connectFolder}
     * @example
     * var f = context.file;
     * var fObj = context.getFoldersByName("Invoices").first();
     * var success = f.disconnectFolder(fObj);
     */
    disconnectFolder(fObj: Folder): boolean;
    /**
     * **Export the file as an XML file.**
     *
     *
     * **Since:** ELC 3.60e / otrisPORTAL 6.0e (Option: export of status & monitor)
     * @since ELC 3.50a / otrisPORTAL 5.0a
     * @param pathXML String containing full path and filename of the desired target xml file
     * @param withDocuments boolean value to include the documents. The value must be set to `true` in case status or monitor information are to be inserted.
     * @param withStatus **Default:** `false`.
     * boolean value to include status information. The value must be set to `true` in order to add the status. Status Information will then be generated into
     * a file which will be added to the documents. Please note that therefore `withDocuments` must be set to true in order to get Status information.
     * @param withMonitor **Default:** `false`.
     * boolean value to include Monitor information. The value must be set to `true` in order to add the monitor. Monitor Information will then be generated into
     * a file which will be added to the documents. Please note that therefore `withDocuments` must be set to true in order to get Monitor information.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * docFile.exportXML("c:\\tmp\\myXmlExport.xml", true, false, true);
     */
    exportXML(pathXML: string, withDocuments: boolean, withStatus?: boolean, withMonitor?: boolean): boolean;
    /**
     * **Forward file in its workflow via the given control flow.**
     *
     * This method only works if the file is inside a workflow and inside a workflow action that is accessible by a user of the web interface. Based on that
     * current workflowstep you need to gather the ID of one of the outgoing control flows of that step. The access privileges of the current user who tries
     * to execute the script are taken into account. Forwarding the file will only work if that control flow is designed to forward without query.
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param controlFlowId String containing the technical ID of the outgoing control flow that should be passed
     * @param comment optional String value containing a comment to be automatically added to the file's monitor
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * var step = docFile.getCurrentWorkflowStep();
     * var flowId = step.firstControlFlow;
     * docFile.forwardFile(flowId);
     */
    forwardFile(controlFlowId: string, comment?: string): boolean;
    /**
     * **Updates a file from a JSON-String.**
     *
     * **Note:** Only JSON-Strings that are created by DocFile.asJSON() with jsonMode = 0 can be imported Must be followed by `sync()`
     * @since DOCUMENTS 5.0 HF1
     * @param jsonstring
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link DocFile.asJSON | DocFile.asJSON}
     */
    fromJSON(jsonstring: string): boolean;
    /**
     * **Get a list of all locking workflow step that currently lock the file.**
     *
     * The locking workflow steps do not need to be locked by the current user executing the script, this function as well returns all locking steps which refer to different users.
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns WorkflowStepIterator object which represents a list of all locking workflow steps for the file
     * @see
     * {@link DocFile.getCurrentWorkflowStep | DocFile.getCurrentWorkflowStep}
     * {@link DocFile.getFirstLockingWorkflowStep | DocFile.getFirstLockingWorkflowStep}
     * @example
     * var f = context.file;
     * var stepIter = f.getAllLockingWorkflowSteps();
     * if (stepIter.size() > 0)
     *    util.out("File is locked by " + stepIter.size() + " workflow steps");
     */
    getAllLockingWorkflowSteps(): WorkflowStepIterator;
    /**
     * **Get a list of all workflow step of the file.**
     *
     * The methd will return all workflow steps, the currently locking and the previous ones.
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since DOCUMENTS 5.0b
     * @returns WorkflowStepIterator object which represents a list of all workflow steps for the file
     * @see
     * {@link DocFile.getCurrentWorkflowStep | DocFile.getCurrentWorkflowStep}
     * {@link DocFile.getFirstLockingWorkflowStep | DocFile.getFirstLockingWorkflowStep}
     * @example
     * var f = context.file;
     * var stepIter = f.getAllWorkflowSteps();
     */
    getAllWorkflowSteps(): WorkflowStepIterator;
    /**
     * **After archiving of a file this method returns the key of the file in the archive.**
     *
     * **Note:** If the file is not archived or archived without versioning or uncoupled from the achived file the key is empty.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.60a / otrisPORTAL 6.0a
     * @param withServer **Default:** `true`.
     * optional boolean value to indicate, if the key should include an "@archiveServerName" appendix
     * @returns String containing the key.
     * @see {@link DocFile.archive | DocFile.archive}
     * @example
     * var f = context.file;
     * if (f.archive())
     *    util.out(f.getArchiveKey());
     * else
     *    util.out(f.getLastError());
     */
    getArchiveKey(withServer?: boolean): string;
    /**
     * **Create a PDF file containing the current DocFile's contents and returns the path in the file system.**
     *
     * The different document types of your documents on your different tabs require the appropriate PDF filter programs to be installed and configured in DOCUMENTS.
     * @since DOCUMENTS 4.0b
     * @param nameCoverTemplate String containing the name of the pdf cover template defined at the filetype
     * @param createCover boolean whether to create a field list or to only take the documents
     * @param sourceRegisterNames Array with the technical names of the document registers you want to include
     * @returns `String` with file path of the pdf, an empty string in case of any error
     * @example
     * var source = new Array();
     * source.push("FirstRegister");
     * source.push("SecondRegister");
     * var docFile = context.file;
     * var pathPdfFile = docFile.getAsPDF("pdfcover", true, source);
     * if (pathPdfFile == "")
     *    throw docFile.getLastError();
     * util.out("Size: " + util.fileSize(pathPdfFile))
     */
    getAsPDF(nameCoverTemplate: string, createCover: boolean, sourceRegisterNames: any[]): string;
    /**
     * **Get the String value of an attribute of the file.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     * @example
     * var myFile = context.file;
     * util.out(myFile.getAttribute("Title"));
     */
    getAttribute(attribute: string): string;
    /**
     * **Get the String value of a DOCUMENTS autotext.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0i new optional parameters startTag and endTag
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param autoText the rule to be parsed
     * @param startTag **Default:** `"%"`.
     * optional start tag.
     * @param endTag **Default:** `"%"`.
     * otional end tag.
     * @returns String containing the parsed value of the autotext
     * @example
     * var myFile = context.file;
     * util.out(myFile.getAutoText("fileOwner"));
     */
    getAutoText(autoText: string, startTag?: string, endTag?: string): string;
    /**
     * **Duplicate a file.**
     *
     * This function creates a real 1:1 copy of the current file which may be submitted to its own workflow. The function returns the copied file.
     * If an error occurrs, the function returns `null` and `getLastError()` can be called on the calling object.
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param copyMode defines how to handle the documents of the originating file.
     * There are three different parameter values allowed:
     *
     * + `"NoDocs"` copied DocFile does not contain any documents
     * + `"ActualVersion"` copied DocFile contains only the latest (published) version of each document
     * + `"AllVersions"` copied DocFile contains all versions (both published and locked) of each document
     *
     * @returns DocFile object representing the copied file, `null` in case of error
     * @example
     * var docFile = context.file;
     * var newFile = docFile.getCopy("AllVersions");
     * if (!newFile)
     *   util.out(docFile.getLastError());
     */
    getCopy(copyMode: "NoDocs" | "ActualVersion" | "AllVersions"): DocFile;
    /**
     * **Returns the creation date (timestamp) of a DocFile.**
     *
     * @since DOCUMENTS 5.0c
     * @returns `Date` object, if the date is valid, `null` for an invalid data.
     * @see
     * {@link DocFile.getCreator | DocFile.getCreator}
     * {@link DocFile.getLastModificationDate | DocFile.getLastModificationDate}
     * @example
     * var file = context.file;
     * var c_ts = file.getCreationDate();
     * if (c_ts)
     *    util.out(c_ts);
     */
    getCreationDate(): Date;
    /**
     * **Returns the SystemUser object or fullname as String of the creator of the DocFile.**
     *
     * @since DOCUMENTS 5.0c
     * @param asObject **Default:** `false`.
     * optional boolean value, that specifies, if the SystemUser object or the fullname should be returned.
     * @returns `asObject=true:``SystemUser` object or `null` (if user does not exist anymore)
     * @see
     * {@link DocFile.getLastModifier | DocFile.getLastModifier}
     * {@link DocFile.getCreationDate | DocFile.getCreationDate}
     * @example
     * var file = context.file;
     * var su = file.getCreator(true);
     * if (su)
     *    util.out(su.login);
     * else
     *    util.out(file.getCreator());
     */
    getCreator(asObject?: boolean): any;
    /**
     * **Get the current workflow step of the current user locking the file.**
     *
     * The function returns a valid {@link WorkflowStep} object if there exists one for the current user. If the current user does not lock the file, the function returns `null` instead.
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns WorkflowStep object
     * @see {@link DocFile.getFirstLockingWorkflowStep | DocFile.getFirstLockingWorkflowStep}
     * @example
     * var f = context.file;
     * var step = f.getCurrentWorkflowStep();
     * if (!step)
     *    step = f.getFirstLockingWorkflowStep();
     * // still no workflow steps found? File not in workflow
     * if (!step)
     *    util.out("File is not in a workflow");
     */
    getCurrentWorkflowStep(): WorkflowStep;
    /**
     * **Returns the comment value for a DocFile.**
     *
     * @since DOCUMENTS 5.0d
     * @returns `DocFileDataField` object or `null`.
     */
    getDocFileComment(): DocFileDataField;
    /**
     * **Get the enumeration values of the desired double select list field.**
     *
     * @since DOCUMENTS 5.0e HF2
     * @param fieldName String containing the technical field name can be followed by the desired instance number in form techFieldName[i]
     * for multi-instance fields of an EE.i/EE.x archive file.
     *
     * **Note:** The index `i` is zero-based. The specification of field instance is olny available for an EE.i/EE.x archive file,
     * it will be ignored for other files. If the parameter contains no instance information, the first field instance is used.
     * The field instance order is determined by the field order in the file.
     * @param resolved **Default:** `false`.
     * Optional boolean value indicating whether to return the full multi language enumeration values (e.g. "key;de:Wert;en:Value") instead of only the keys (e.g. "key").
     * @returns Array of strings containing the multi language enumeration values or only the keys.
     * @example
     * var myFile = context.file;
     * var values = myFile.getDoubleSelectListValues("DoubleListfield", true);
     * if (values)
     * {
     *   for (var i = 0; i < values.length; i++)
     *   {
     *       util.out(values[i]);
     *   }
     * }
     */
    getDoubleSelectListValues(fieldName: string, resolved?: boolean): string[];
    /**
     * **Get an array with the values of an enumeration autotext.**
     *
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param autoText to be parsed
     * @returns Array containing the values for the autotext
     * @example
     * var values = context.getEnumAutoText("%accessProfile%")
     * if (values)
     * {
     *   for (var i=0; i < values.length; i++)
     *   {
     *       util.out(values[i]);
     *   }
     * }
     */
    getEnumAutoText(autoText: string): any[];
    /**
     * **Get the String value of an attribute of the desired file field.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param fieldName String containing the technical name of the desired field
     * @param attrName String containing the name of the desired attribute
     * @returns String containing the value of the desired field attribute
     * @example
     * var myFile = context.file;
     * util.out(myFile.getFieldAttribute("Samplefield", "Value"));
     */
    getFieldAttribute(fieldName: string, attrName: string): string;
    /**
     * **Returns an AutoText value of a specified field of the DocFile.**
     *
     * The following AutoTexts are available
     *
     * + `"[locale]"` - field value in the user locale or specified locale.
     * + `"key"` - key value (e.g. at refence fields, enumeration fields, etc.).
     * + `"fix"` - fix format value (e.g. at numeric fields, date fields, etc.).
     * + `"pos"` - order position of the field value at enumeration fields.
     * + `"raw"` - database field value.
     * + `"label[.locale]"` - label of the field in user locale or specified locale.
     *
     * @since DOCUMENTS 5.0c
     * @param fieldName Name of the field as string
     * @param autoText **Default:** `"[locale]"`.
     * The desired AutoText (see list) as string (default = "[locale]" returns field value in the user locale)
     * @returns `String` with the AutoText.
     * @example
     * var file = context.file;
     * util.out(file.getFieldAutoText("erpInvoiceDate"));             // => 31.12.2017
     * util.out(file.getFieldAutoText("erpInvoiceDate", "en"));       // => 12/31/2017
     * util.out(file.getFieldAutoText("erpInvoiceDate", "fix"));      // => 20171231
     * util.out(file.getFieldAutoText("erpInvoiceDate", "label"));    // => Rechnungsdatum
     * util.out(file.getFieldAutoText("erpInvoiceDate", "label.en")); // => Invoice date
     */
    getFieldAutoText(fieldName: string, autoText?: string): string;
    /**
     * **Get the technical name of the n-th field of the file.**
     *
     * This allows generic scripts to be capable of different versions of the same filetype, e.g. if you changed details of the filetype,
     * but there are still older files of the filetype in the system.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param index index of the desired field
     * @returns string containing the technical name of the file field, `false` if index is out of range
     * @example
     * var myFile = context.file;
     * var fieldName = "Samplefield";
     * var fields = new Array();
     * var i = 0;
     * // get all field names
     * while (myFile.getFieldName(i))
     * {
     *    fields[i] = myFile.getFieldName(i)
     *    i++;
     * }
     * // check for field existance
     * var found = false;
     * for (var j = 0; j < fields.length; j++)
     * {
     *    if (fields[j] == fieldName)
     *    {
     *       found = true;
     *       break;
     *    }
     * }
     */
    getFieldName(index: number): string;
    /**
     * **Get the value of the desired file field.**
     *
     *
     * **Since:** DOCUMENTS 4.0c HF2 available for multi-instance fields of an EE.i/EE.x archive file
     * **Since:** DOCUMENTS 5.0e HF2 (optional parameter `returnType`)
     * **Since:** DOCUMENTS 5.0i HF6 (`Nullable` for parameter `returnType`)
     * @since DOCUMENTS 4.0c
     * @param fieldName String containing the technical field name can be followed by the desired instance number in form techFieldName[i]
     * for multi-instance fields of an EE.i/EE.x archive file.
     *
     * **Note:** The index `i` is zero-based. The specification of field instance is olny available for an EE.i/EE.x archive file,
     * it will be ignored for other files. If the parameter contains no instance information, the first field instance is used.
     * The field instance order is determined by the field order in the file.
     * @param returnType Optional string specified the type of the return value. Currently only the following values are available:
     *
     * + `"Array"` for a double select list field
     * + `"Nullable"` for a numeric field: the function returns `null`, if the field empty, otherwise the field value.
     *
     * @returns The field value, its type depends on the field type (such as a Date object returned for a field of type 'Timestamp')
     * or the specified return type if applicable.
     * @see {@link DocFile.setFieldValue | DocFile.setFieldValue}
     * @see [Field Access Methods](../fieldmethods.html)
     * @example
     * var myFile = context.file;
     * util.out(myFile.getFieldValue("Samplefield"));
     * // Since DOCUMENTS 4.0c HF2
     * var key = "Unit=Default/Instance=Default/Pool=FeldZ/Document=Feldzahlen.86C94C30438011E2B925080027B22D11@eex1";
     * var eexFile = context.getArchiveFile(key);
     * util.out(eexFile.getFieldValue("multiInstanceField[2]"));
     * // Since DOCUMENTS 5.0e HF2
     * var myFile = context.file;
     * var values = myFile.getFieldValue("doubleListfield", "Array");
     * if (values)
     * {
     *   for (var i = 0; i < values.length; i++)
     *   {
     *       util.out(values[i]);
     *   }
     * }
     */
    getFieldValue(fieldName: string, returnType?: string): any;
    /**
     * **Get the file owner of the file.**
     *
     * @since ELC 3.51d / otrisPORTAL 5.1d
     * @returns SystemUser object representing the user who owns the file
     * @example
     * var docFile = context.file;
     * var su = docFile.getFileOwner();
     * util.out(su.login);
     */
    getFileOwner(): SystemUser;
    /**
     * **Get the first locking workflow step that currently locks the file.**
     *
     * The first locking workflow step does not need to be locked by the current user executing the script,
     * this function as well returns the first locking step if it is locked by a different user.
     * If no locking step is found at all, the function returns `null` instead.
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @returns WorkflowStep object
     * @see {@link DocFile.getCurrentWorkflowStep | DocFile.getCurrentWorkflowStep}
     * @example
     * var f = context.file;
     * var step = f.getCurrentWorkflowStep();
     * if (!step)
     * {
     *    step = f.getFirstLockingWorkflowStep();
     * }
     * // still no workflow steps found? File not in workflow
     * if (!step)
     * {
     *    util.out("File is not in a workflow");
     * }
     */
    getFirstLockingWorkflowStep(): WorkflowStep;
    /**
     * **Returns the file id of the DocFile.**
     *
     * @since DOCUMENTS 5.0c
     * @returns `String` with the file id.
     * @example
     * var file = context.file;
     * util.out(file.getid());
     */
    getid(): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param shortMessage **Default:** `false`.
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     * @returns Text of the last error as String
     * @example
     * var myFile = context.file;
     * // do something which may go wrong
     * if (!myFile.setUserStatus("user_notExist", "standard"))
     * {
     *    util.out(myFile.getLastError());
     * }
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the last modification date (timestamp) of a DocFile.**
     *
     * @since DOCUMENTS 5.0c
     * @returns `Date` object, if the date is valid, `null` for an invalid data.
     * @see
     * {@link DocFile.getLastModifier | DocFile.getLastModifier}
     * {@link DocFile.getCreationDate | DocFile.getCreationDate}
     * @example
     * var file = context.file;
     * var c_ts = file.getLastModificationDate();
     * if (c_ts)
     *    util.out(c_ts);
     */
    getLastModificationDate(): Date;
    /**
     * **Returns the fullname as String of the last editor of the DocFile.**
     *
     * @since DOCUMENTS 5.0c
     * @returns `String` with the fullname.
     * @see
     * {@link DocFile.getCreator | DocFile.getCreator}
     * {@link DocFile.getLastModificationDate | DocFile.getLastModificationDate}
     * @example
     * var file = context.file;
     * util.out(file.getLastModifier());
     */
    getLastModifier(): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow **Default:** `false`.
     * Optional flag:
     * If `true` only the id of the DocFile object (`m_oid`) will be returned.
     * If `false` the id of the DocFile object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Get the orginal file for a scratch copy.**
     *
     * If you run a scipt on a scratch copy (e.g. a onSave script), you can get the orginal file with this function.
     * @since DOCUMENTS 4.0 (EAS)
     * @returns DocFile
     * @example
     * var scratchCopy = context.file;
     * var origFile = scratchCopy.getOriginal();
     * if (!origFile)
     *    util.out(scratchFile.getLastError();
     * else
     * {
     *    if (scratchCopy.FieldA != origFile.FieldA)
     *       util.out("Field A changed");
     *    else
     *       util.out("Field A not changed");
     * }
     */
    getOriginal(): DocFile;
    /**
     * **Get the file referred by a reference field in the current file.**
     *
     * If the current file's filetype is connected to a superior filetype by a reference field,
     * this function allows to easily access the referred file, e.g. if you are in an invoice file
     * and you want to access data of the referring company.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.51c / otrisPORTAL 5.1c
     * @param referenceFileField String value containing the technical name of the file field contianing the definition to the referred filetype
     * @returns DocFile object representing the referred file if successful, `null` in case of any error
     * @example
     * var docFile = context.file;
     * var company = docFile.getReferenceFile("crmCompany");
     * if(!company) {
     *      if(!docFile.crmCompany) {
     *          throw "No company set in the reference field";
     *      } else {
     *          throw "The function 'getReferenceFile' failed";
     *      }
     * }
     * util.out(company.crmCompanyName);
     */
    getReferenceFile(referenceFileField: string): DocFile;
    /**
     * **Note:** Until version 5.0c this method ignored the access rights of the user to the register.
     * With the optional parameter checkAccessRight this can now be done. For backward compatibility the default value is set to false.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0c (new optional parameter checkAccessRight)
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param registerName String value containing the technical name of the desired register
     * @param checkAccessRight **Default:** `false`.
     * optional boolean value, that indicates if the access rights should be considered.
     * @returns Register object representing the desired register
     * @see {@link DocFile.getRegisters | DocFile.getRegisters}
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     */
    getRegisterByName(registerName: string, checkAccessRight?: boolean): Register;
    /**
     * **Get an iterator with the registers of the file for the specified type.**
     *
     * **Note:** Until version 5.0c this method ignored the access rights of the user to the register.
     * With the optional parameter checkAccessRight this can now be done. For backward compatibility the default value is set to false.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0c (new optional parameter checkAccessRight)
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param type **Default:** `"documents"`.
     * optional String value to filter for a desired register type. Default type is `documents`
     * Allowed values:
     *
     * + `documents`
     * + `fields`
     * + `links`
     * + `archiveddocuments`
     * + `externalcall`
     * + `all` (returns all registers independent of the type)
     *
     * @param checkAccessRight **Default:** `false`.
     * optional boolean value, that indicates if the access rights should be considered.
     * @returns RegisterIterator with all registers (matching the filter)
     * @see
     * {@link RegisterIterator}
     * {@link DocFile.getRegisterByName | DocFile.getRegisterByName}
     * @example
     * var docFile = context.file;
     * var regIter = docFile.getRegisters("documents");
     */
    getRegisters(type?: string, checkAccessRight?: boolean): RegisterIterator;
    /**
     * **Function to get a value of DocFile rule.**
     *
     * @since DOCUMENTS 5.0h
     * @param value String value of the rule value
     * @param type **Default:** `"auto"`.
     * Optional data type of the value (number, boolean, date, timestamp, auto)
     * @returns The rule value in the desired type or `null`, if failed
     */
    getRuleValue(value: string, type?: string): any;
    /**
     * **Get the status of the DocFile as a JSON string.**
     *
     * @since DOCUMENTS 5.0h HF1
     * @param locale String (de, en, ...) in which locale the status has to be returned (empty locale = log-in locale)
     * @returns String containing the JSON string with the status in the following structure:
     * ` [ { "Action": "File edited", "Comment": "test", "Time": "01/18/2022 15:39", "User": "Schreiber, Willi", }, ... ] `
     * @example
     * var docFile = context.file;
     * var jsonStr = docFile.getStatusAsJSON("en");
     * var jsonArr = JSON.parse(jsonStr);
     * for (var status of jsonArr)
     * {
     *   util.out("-------------------");
     *   for (var prop in status)
     *   {
     *       util.out(prop + ": " + status[prop]);
     *   }
     *   util.out("-------------------");
     * }
     */
    getStatusAsJSON(locale?: string): string;
    /**
     * **Returns the title of the DocFile.**
     *
     * **Note:** the special locale raw returns the title in all locales
     * @since DOCUMENTS 5.0c
     * @param locale **Default:** `user locale`.
     * Locale as String (default = user locale)
     * @returns `String` with the title.
     * @example
     * var file = context.file;
     * util.out(file.getTitle("en"));
     */
    getTitle(locale?: string): string;
    /**
     * **Gather information whether the file is marked as read or unread for a desired user.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since DOCUMENTS 5.0h
     * @param login String containing the login name of the desired user
     * @returns boolean value whether the file is marked as read for the desired user.
     * @see {@link DocFile.setUserRead | DocFile.setUserRead}
     * @example
     * var docFile = context.file;
     * var fileRead = docFile.getUserRead("schreiber");
     */
    getUserRead(login: string): boolean;
    /**
     * **Get the status of the file for a desired user.**
     *
     * @since DOCUMENTS 4.0c HF1
     * @param login String containing the login name of the desired user
     * @returns String with the status. Possible values:
     *
     * + `standard`
     * + `new`
     * + `fromFollowup`
     * + `toForward`
     * + `forInfo`
     * + `task`
     * + `workflowCanceled`
     * + `backFromDistribution`
     * + `consultation`
     *
     * @see {@link DocFile.setUserStatus | DocFile.setUserStatus}
     * @example
     * var docFile = context.file;
     * util.out(docFile.getUserStatus("schreiber"));
     */
    getUserStatus(login: string): string;
    /**
     * **Function to get webkey to use in the WebClient.**
     *
     * @since DOCUMENTS 5.0f
     * @returns String with key
     */
    getWebKey(): string;
    /**
     * **Gather information whether the current file has the field with the desired name.**
     *
     * @since DOCUMENTS 4.0d
     * @param fieldName String containing the technical name of the field.
     * @returns `true` if the file has the field, `false` if not
     * @example
     * var file = context.file;
     * if (file.hasField("address"))
     *   util.out(file.address);
     */
    hasField(fieldName: string): boolean;
    /**
     * **Add an entry to the status tab of the file.**
     *
     * This function is especially useful in connection with PortalScripts being used as decision guards in workflows,
     * because this allows to comment and describe the decisions taken by the scripts. This increases transparency concerning the life cycle of a file in DOCUMENTS.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param action String containing a brief description
     * @param comment optional String containing a descriptive comment to be added to the status entry
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * docFile.insertStatusEntry("Executed Guard Script","all conditions met");
     */
    insertStatusEntry(action: string, comment: string): boolean;
    /**
     * **Gather information whether the current file is an archive file.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @returns `true` if is an archive file, `false` if not
     * @example
     * var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2"
     * var docFile = context.getArchiveFile(key);
     * if (docFile)
     *   util.out(docFile.isArchiveFile());
     */
    isArchiveFile(): boolean;
    /**
     * **Gather information whether the current file is a deleted file of a trash folder.**
     *
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @returns `true` if is a deleted file, `false` if not
     * @example
     * ...
     * var trashFolder = user.getPrivateFolder("trash");
     * if (trashFolder)
     * {
     *    var it = trashFolder.getFiles();
     *    for (var file = it.first(); file; file = it.next())
     *    {
     *        if (file.isDeletedFile())
     *           util.out("ok");
     *        else
     *           util.out("Error: Found undeleted file in trash folder!");
     *    }
     * }
     */
    isDeletedFile(): boolean;
    /**
     * **Gather information whether the current file is a new file.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns `true` if new file, `false` if not
     * @example
     * var docFile = context.file;
     * util.out(docFile.isNewFile());
     */
    isNewFile(): boolean;
    /**
     * **Checks, if the file is sealed.**
     *
     * @since DOCUMENTS 5.0i
     * @returns `true` if sealed, otherwise `false`
     * @see {@link seal}
     * @example
     * var file = context.file;
     * util.out(file.isSealed())
     */
    isSealed(): boolean;
    /**
     * **Reactivate an archive file to a file of the corresponding filetype.**
     *
     * @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @returns `true` if successful, `false` if not - get error message with getLastError()
     * @example
     * var key = "Unit=Default/Instance=Default/Pool=DEMO/Pool=RECHNUNGEN/Document=RECHNUNGEN.41D3694E2B1E11DD8A9A000C29FACDC2@eex1"
     * var docFile = context.getArchiveFile(key);
     * if (!docFile)
     *    throw "archive file does not exist: " + key;
     * if (!docFile.reactivate())
     *    throw "Reactivation failed: " + docFile.getLastError();
     * docFile.startWorkflow....
     */
    reactivate(): boolean;
    /**
     * **Read the life cycle timestamp and action of an EAS-archived DocFile.**
     *
     * @since DOCUMENTS 5.0h
     * @returns JSON String with the elements 'timestamp' and 'action' or `null` if there are not any lifecycle info at the EAS file; in case of an error an exception will be thrown
     * @see {@link writeEASLifeCycle}
     * @example
     * // Somehow gain access to a EAS DocFile docFile
     * try {
     *    const json = docFile.readEASLifeCycle();
     *    if (!json)
     *        throw "There is no life cycle info at the EAS file";
     *    // e.g. json = " { timestamp : "2021-10-06T14:08:01.988Z", action : "delete" } "
     *    const lifeCycleInfos = JSON.parse(json);
     *    if (lifeCycleInfos.timestamp != "")
     *    {
     *        const dateObj = new Date(lifeCycleInfos.timestamp);
     *        util.out("Timestamp: " + dateObj);
     *    }
     *    util.out("Action: " + lifeCycleInfos.action);
     * } catch (err) {
     *    util.out("Error: ") + err;
     * }
     */
    readEASLifeCycle(): string;
    /**
     * **Read record-annotations of an EAS-archived DocFile.**
     *
     * Load and return annotation data of an EAS record. If the actual DocFile is not a representation of an EAS record,
     * the function throws an exception. It also throws one, if the archive is inaccessible (technically or by rights management).
     *
     *  **Note:** The structure of the returned JSON is an array of objects with string-properties "type" and "value".
     * Multiple annotations of the same type may exist. This operation only accesses annotations at the DocFile level
     * ("record" in EAS terminology). It cannot access annotations at the Document ("attachment") level. Unlike fields,
     * annotations in the archive are not sealed for auditing purposes. Modifications occur without versioning.
     * @since DOCUMENTS 5.0h
     * @param typeName An optional string with the technical name of an annotation-type for filtering purposes.
     * A script can omit the parameter or pass an empty string or pass "*" to read all annotations.
     * @returns JSON string with annotation data.
     * @see {@link writeEASRecordAnnotations}
     * @example
     * // Somehow gain access to a DocFile, which is
     * // a DOCUMENTS image of an EAS archive record
     * // (This example uses a search request.)
     * const searchsource="Typentest@EDA2"; // Resource pattern: "file_type@archive_server"
     * const keyfield = "F1_String";
     * const keyvalue = "RecordAnno1 Scripting";
     * var filter = keyfield + "|~" + util.getQuoted(keyvalue);
     * var hrs = new HitResultset(searchsource, filter, "");
     * if(hrs.getLastErrorCode() != 0 || hrs.size() <= 0)
     *     throw new Error("Test record not found.");
     * var df = hrs.first().getArchiveFile();
     * hrs.dispose(); // hrs is no longer needed.
     * if(df === null)
     *     throw new Error("Failed to create DOCUMENTS image of the test record.");
     * // Read and log the standard text annotations, which come
     * // from thw webclient's "Actions / add note" feature.
     * var textAnnos = df.readEASRecordAnnotations("3X");
     * util.out("\"3X\" annotations: " + textAnnos);
     */
    readEASRecordAnnotations(typeName: string): string;
    /**
     * **Invalidates the Javascript-Docile Object cache and reads the data from the database again.**
     *
     * @since DOCUMENTS 5.0i
     * @returns `true`
     * @see {@link restore}
     */
    restore(): boolean;
    /**
     * **Seal or unseal the file.**
     *
     * After sealing the file, it is not possible to modify it anymore.
     *
     * **Note:** Important: To use this method the user has to be switched to SuperMode (s. context.setSuperMode()).
     * Sealing of a file is only possible, if it is not already sealed - otherwise an exception will be thrown.
     * Unsealing of a file is only possible, if it is sealed - otherwise an exception will be thrown.
     * @since DOCUMENTS 5.0i
     * @param value boolean to seal / unseal the file.
     * @returns `true` if successful or in case of an error an exception will be thrown
     * @see {@link isSealed}
     * @example
     * var file = context.file;
     * // sealing
     * try {
     *    if (!file.isSealed()) {
     *       context.setSuperMode(true);
     *       file.seal(true);
     *    }
     * } catch (err) {
     *    util.out("Error: ") + err;
     * } finally {
     *    // Important: switch off the SuperMode!
     *    if (context.getSuperMode())
     *       context.setSuperMode(false);
     * }
     * // unsealing
     * try {
     *    if (file.isSealed()) {
     *       context.setSuperMode(true);
     *       file.seal(false);
     *    }
     * } catch (err) {
     *    util.out("Error: ") + err;
     * } finally {
     *    // Important: switch off the SuperMode!
     *    if (context.getSuperMode())
     *       context.setSuperMode(false);
     * }
     */
    seal(value: boolean): boolean;
    /**
     * **Send the DocFile directly.**
     *
     * @since DOCUMENTS 5.0
     * @param receivers Array with the names of the users or groups to which to send the DocFile. You need to specify at least one recipient.
     * @param sendMode String containing the send type. The following values are available:
     *
     * + `sequential` - one after the other
     * + `parallel_info` - concurrently for information
     *
     * @param task String specifying the task for the recipients of the DocFile
     * @param backWhenFinished boolean indicating whether the DocFile should be returned to the own user account after the cycle.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var docFile = context.createFile("Filetype1");
     * var success = docFile.sendFileAdHoc(["user2", "user3"], "parallel_info", "test task", true);
     * if (!success)
     *   util.out(docFile.getLastError());
     */
    sendFileAdHoc(receivers: any[], sendMode: string, task: string, backWhenFinished: boolean): boolean;
    /**
     * **Send the file as email to somebody.**
     *
     * You must define an email template in the Windows Portal Client at the filetype of your DocFile object.
     * This template may contain autotexts that can be parsed and replaced with their appropriate field values.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 4.0d new parameter bcc
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param from String value containing the sender's email address
     * @param templateName String value containing the technical name of the email template. This must be defined on the email templates tab of the filetype.
     * @param to String value containing the email address of the recipient
     * @param cc Optional String value for an additional recipient ("cc" means "carbon copy")
     * @param addDocs **Default:** `false`.
     * optional boolean value whether to include the documents of the file
     * @param bcc Optional String value for the email addresses of blind carbon-copy recipients (remaining invisible to other recipients).
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * docFile.sendMail("schreiber@toastup.de", "MyMailTemplate",
     *    "oppen@toastup.de", "", true
     * );
     */
    sendMail(from: string, templateName: string, to: string, cc?: string, addDocs?: boolean, bcc?: string): boolean;
    /**
     * **Set the String value of an attribute of the file to the desired value.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * myFile.setAttribute("hasInvoicePlugin", "true");
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Set the value of an attribute of the desired file field.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param fieldName String containing the technical name of the desired field
     * @param attrName String containing the name of the desired attribute
     * @param value String value containing the desired field attribute value
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * myFile.setFieldAttribute("Samplefield", "Value", "1");
     */
    setFieldAttribute(fieldName: string, attrName: string, value: string): boolean;
    /**
     * **Set the value of the desired file field.**
     *
     * **Since:** DOCUMENTS 4.0c HF2 available for multi-instance fields of an EE.i/EE.x archive file
     * **Since:** DOCUMENTS 5.0c HF2 String array as value for a double select list field
     * @since DOCUMENTS 4.0c
     * @param fieldName String containing the technical field name can be followed by the desired instance number
     * in form techFieldName[i] for multi-instance fields of an EE.i/EE.x archive file.
     *
     * **Note:** The index `i` is zero-based. The specification of field instance is only available for an EE.i/EE.x archive file,
     * it will be ignored for other files. If the parameter contains no instance information, the first field instance is used.
     * The field instance order is determined by the field order in the file.
     * @param value The desired field value of the proper type according to the field type, e.g. a Date object as value of
     * a field of type 'Timestamp'. In case of the value being `null` the field will be emptied.
     *
     * **Note:** The keys of the enumeration values for a double select list field may be passed either as an Array of strings
     * or as an ordinary string with one key per line of text (see [Field Access Methods](../fieldmethods.html)).
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link DocFile.getFieldValue | DocFile.getFieldValue}
     * @see [Field Access Methods](../fieldmethods.html)
     * @example
     * var myFile = context.file;
     * myFile.setFieldValue("NumericField", 3.14);
     * myFile.setFieldValue("TimestampField", new Date());
     * myFile.setFieldValue("BoolField", true);
     * myFile.setFieldValue("StringField", "Hello");
     * myFile.setFieldValue("DoubleListField1", "key1\nkey2";
     * myFile.setFieldValue("DoubleListField2", ["key1", "key2"]; // Since DOCUMENTS 5.0e HF2
     * myFile.sync();
     * // Since DOCUMENTS 4.0c HF2
     * var key = "Unit=Default/Instance=Default/Pool=FeldZ/Document=Feldzahlen.86C94C30438011E2B925080027B22D11@eex1";
     * var eexFile = context.getArchiveFile(key);
     * eexFile.startEdit();
     * eexFile.setFieldValue("multiInstanceField[2]", "Hello");
     * eexFile.commit();
     */
    setFieldValue(fieldName: string, value: any): boolean;
    /**
     * **Set the file owner of the file to the desired user.**
     *
     * @since ELC 3.51d / otrisPORTAL 5.1d
     * @param owner SystemUser object representing the desired new file owner
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * var su = context.getSystemUser();
     * docFile.setFileOwner(su);
     */
    setFileOwner(owner: SystemUser): boolean;
    /**
     * **Set a followup date for a desired user.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param pUser SystemUser object of the desired user
     * @param followUpDate Date object representing the desired followup date
     * @param comment optional String value containing a comment that is displayed as a task as soon as the followup is triggered
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DocFile.clearFollowUpDate | DocFile.clearFollowUpDate}
     * @example
     * var docFile = context.file;
     * var su = context.getSystemUser();
     * var followup = util.convertStringToDate("31.12.2008", "dd.mm.yyyy");
     * docFile.setFollowUpDate(su, followup, "Silvester");
     */
    setFollowUpDate(pUser: SystemUser, followUpDate: Date, comment?: string): boolean;
    /**
     * **set the referred file of the desired reference field in the current file.**
     *
     *
     * **Since:** DOCUMENTS 5.0f (Option referenceFile = `null` for deselecting the referred file)
     * @since DOCUMENTS 5.0e
     * @param fieldName String value containing the technical name of the reference field
     * @param referenceFile DocFile object representing the referred file or `null` to indicate deselecting the referred file.
     * If the property 'ReferenceFileClearDefaultValuesOnDeselect' is set to 1, the default values (of the other fields)
     * from the referred file are deleted by deselecting the referred file.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * var refFile = context.createFile("refFileType");
     * if (!docFile.setReferenceFile("crmCompany", refFile))
     *   util.out(docFile.getLastError());
     * // Deselect the referred file
     * if (!docFile.setReferenceFile("crmCompany", null))
     *   util.out(docFile.getLastError());
     */
    setReferenceFile(fieldName: string, referenceFile: DocFile): boolean;
    /**
     * **Mark the file as read or unread for the desired user.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param login String containing the login name of the desired user
     * @param fileRead boolean whether the file should be markes as read (`true`) or unread (`false`)
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * docFile.setUserRead("schreiber", true);
     */
    setUserRead(login: string, fileRead: boolean): boolean;
    /**
     * **Set the status of the file for a desired user to a desired value.**
     *
     * The file icon in the list view and file view depends on this status.
     *
     * **Since:** DOCUMENTS 4.0c (status values extended)
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param login String containing the login name of the desired user
     * @param status String value containing the desired status
     * Allowed values:
     *
     * + `standard`
     * + `new`
     * + `fromFollowup`
     * + `toForward`
     * + `forInfo`
     * + `task`
     * + `workflowCanceled`
     * + `backFromDistribution`
     * + `consultation`
     *
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DocFile.getUserStatus | DocFile.getUserStatus}
     * @example
     * var docFile = context.file;
     * docFile.setUserStatus("schreiber", "new");
     */
    setUserStatus(login: string, status: string): boolean;
    /**
     * **Switch a DocFile to edit mode.**
     *
     * Switching a file to edit mode with this function has the same effect as the "Edit" button in the web surface of DOCUMENTS.
     * This means, a scratch copy of the file is created, and any changes you apply to the file are temporarily stored
     * in the scratch copy - until you `commit()` your changes back to the original file. There are a few scripting event hooks
     * which disallow the use of this function at all costs:
     *
     * + `onEdit` hook - the system has already created the scratch copy.
     * + `onCreate` hook - a newly created file is always automatically in edit mode.
     *
     * You should avoid using this function in scripts that are executed inside a workflow (signal exits, decisions etc.).
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see {@link DocFile.abort | DocFile.abort}
     * @example
     * var myFile = context.file;
     * if (!myFile) {
     *   throw new Error('This file doesn´t exist');
     * }
     * if (!myFile.startEdit()) {
     *   throw new Error(myFile.getLastError());
     * }
     * myFile.Field = "value";
     * if (!myFile.commit()) {
     *    errorMsg = myFile.getLastError();
     *    if (!myFile.abort()) {
     *       errorMsg += '\n' + myFile.getLastError();
     *    }
     *    throw new Error(errorMsg);
     * }
     */
    startEdit(): boolean;
    /**
     * **Start a workflow for the DocFile object.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param workflowName String containing the technical name and optional the version number of the workflow.
     * The format of the workflowName is `technicalName`[-version]. If you don't specify the version of the workflow,
     * the workflow with the highest workflow version number will be used. If you want to start a specific version
     * you have to use technicalName-version e.g. (Invoice-2) as workflowName.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var myFile = context.file;
     * myFile.startWorkflow("Invoice");  // starts the latest version of the workflow "Invoice"
     * myFile.startWorkflow("Invoice-2"); // starts the version 2 of the workflow "Invoice"
     */
    startWorkflow(workflowName: string): boolean;
    /**
     * **Synchronize any changes to the DocFile object back to the real file.**
     *
     * If you want to apply changes to file fields through a script that is executed as a signal exit inside a workflow,
     * you should rather prefer sync() than the `startEdit() / commit()` instruction pair.
     *
     * **Note:** If there's a scratch copy of the file in the system (e.g. by some user through the web surface),
     * committing the changes in the scratch copy results in the effect that your synced changes are lost.
     * So be careful with the usage of this operation.
     *
     * **Note:** In case of an error, the function stops immediately, regardless of how many values were already written
     * to the database. So if sync() finishes due to an error, the file will probably contain some but not all new values.
     * f you change field values using setFieldValue(), you can get the errors before you call sync().
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i (checkHistoryFields parameter since)
     * **Since:** DOCUMENTS 5.0a (new parameter updateRefFields)
     * **Since:** DOCUMENTS 5.0a HF2 (new parameter updateModifiedDate)
     * **Since:** DOCUMENTS 5.0h HF2 (new parameter fieldPermissionCheckFlags)
     * **Since:** DOCUMENTS 5.0i (new parameter checkLifeCyleScript)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param checkHistoryFields
     * optional boolean parameter has to be set to true, if the file contains history fields, that are modified
     * **Default:** `false`
     * @param notifyHitlistChange
     * optional boolean parameter indicates the web client to refresh the current hitlist
     * **Default:** `true`
     * @param updateRefFields
     * optional boolean parameter indicates to update reference fields if using the property AutoUpdateByRefFields
     * **Default:** `false`
     * @param updateModifiedDate
     * optional boolean parameter indicates to update the modification date of the file
     * **Default:** `false`
     * @param fieldPermissionCheckFlags
     * optional int parameter to specify which field rights should be checked (bit-mask of the following values)
     *
     * + `0x001` : rights from filetype
     * + `0x002` : rights from workflow
     * + `0x004` : check mandatory field
     * + the default value is `0x007`
     *
     * **Default:** `7`
     * @param checkLifeCyleScript
     * optional boolean parameter that triggers a possible global otrLifeCycle_OnMasterExit-Script
     * **Default:** `false`
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link DocFile.startEdit | DocFile.startEdit}
     * {@link DocFile.commit | DocFile.commit}
     * {@link DocFile.setFieldValue | DocFile.setFieldValue}
     * @example
     * var myFile = context.file;
     * myFile.Field = "value";
     * if(!myFile.sync()){
     *  throw myFile.getLastError();
     * }
     */
    sync(checkHistoryFields?: boolean, notifyHitlistChange?: boolean, updateRefFields?: boolean, updateModifiedDate?: boolean, fieldPermissionCheckFlags?: number, checkLifeCyleScript?: boolean): boolean;
    /**
     * **Relive a deleted file.**
     *
     * Sets the status active to a file and redraws it from the trash folder. Deleted files are not searchable by a `FileResultSet`.
     * You can only retrieve deleted files by iterating throw the trash-folder of the users
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @returns `true` if successful, `false` if not
     * @example
     * ...
     * var trashFolder = user.getPrivateFolder("trash");
     * if (trashFolder)
     * {
     *    var it = trashFolder.getFiles();
     *    for (var file = it.first(); file; file = it.next())
     *    {
     * if (file.isDeletedFile())
     *       {
     *     file.undeleteFile();
     *          // now e.g. search a private folder and add the file...
     *       }
     *    }
     * }
     */
    undeleteFile(): boolean;
    /**
     * **Write the life cycle timestamp and action of an EAS-archived DocFile.**
     *
     * @since DOCUMENTS 5.0h
     * @param jsonString String in JSON-Format with an object, that contains the elements 'timestamp' and 'action'.
     * @returns `true` if successful or in case of an error an exception will be thrown
     * @see {@link readEASLifeCycle}
     * @example
     * // Somehow gain access to a EAS DocFile docFile
     * try {
     *    var lifeCycle = new Object();
     *    lifeCycle.timestamp = new Date(31,11, 2030);
     *    lifeCycle.action = "delete";
     *    docFile.writeEASLifeCycle(JSON.stringify(lifeCycle));
     * } catch (err) {
     *    util.out("Error: ") + err;
     * }
     */
    writeEASLifeCycle(jsonString: string): boolean;
    /**
     * **Write record-annotations of an EAS-archived DocFile.**
     *
     * Write (and replace) annotation data of an EAS record. If the actual DocFile is not a representation of an EAS record,
     * the function throws an exception. It usually also throws one, if the archive server is inaccessible
     * (technically or by rights management), or due to a JSON syntax error.
     *
     * **Note:** The basic structure of the annoJSON data is an array of objects with "type" and "value" string-properties.
     * In case of an inconsistency between an object's type and the annoType parameter the function may react differently for each product version.
     * The archive may silently ignore one of the conflicting values, or it may report an error. Depending on the parameters,
     * the function can operate in different modes.
     *
     * + For calls with an individual annoType the archive will replace the entire set of annotations of the given type with the new content.
     *   Existing annotations of other types remain unaffected.
     * + If annoType is empty or "*" and mergeForeignTypes is `false`, annoJSON must define the record's entire new annotation content.
     *   The archive will drop all old annotations.
     * + If annoType is empty or "*" and mergeForeignTypes is `true`, the function will read the existing annotations at first.
     *   Each old annotation of a type, which does not occur in the annoJSON data, will be copied into the new content buffer.
     *   Finally the merge of copied and passed annotations will be written.
     *
     * In the merge mode the function may take twice the time it takes in other modes. As a special case the merge mode accepts also objects without
     * a value property within annoJSON. This capability allows (for instance) deleting the annotations of two types without side-effects to other types.
     *
     * This operation only accesses annotations at the DocFile level ("record" in EAS terminology). It cannot access annotations at the Document ("attachment") level.
     * Unlike fields, annotations in the archive are not sealed for auditing purposes. Modifications occur without versioning. Multiple annotations of the same type are allowed.
     * @since DOCUMENTS 5.0h
     * @param annoJSON A JSON string with the annotation data to be written. The underlying structure is the same as in return values of readEASRecordAnnotations().
     * @param annoType A string, which names an annotation-type, if the operation is intended to modify only annotations of one type.
     * The parameter can be either an empty string or "*" in order to write/replace all types of annotations at once.
     * @param mergeForeignTypes This boolean parameter enables a client-side merge of foreign existing annotations with the data passed in annoJSON.
     * For calls with a given annoType this parameter is meaningless and optional. Otherwise it is mandatory.
     * @returns No return value.
     * @see {@link readEASRecordAnnotations}
     * @example
     * // Somehow gain access to a DocFile, which is
     * // a DOCUMENTS image of an EAS archive record
     * // (This example uses a search request.)
     * const searchsource="Typentest@EDA2"; // Resource pattern: "file_type@archive_server"
     * const keyfield = "F1_String";
     * const keyvalue = "RecordAnno1 Scripting";
     * var filter = keyfield + "|~" + util.getQuoted(keyvalue);
     * var hrs = new HitResultset(searchsource, filter, "");
     * if(hrs.getLastErrorCode() != 0 || hrs.size() <= 0)
     *     throw new Error("Test record not found.");
     * var df = hrs.first().getArchiveFile();
     * hrs.dispose(); // hrs is no longer needed.
     * if(df === null)
     *     throw new Error("Failed to create DOCUMENTS image of the test record.");
     * // As next define a few demo annotations.
     * var testAnnotations = [
     *     { type : "testExample", value : "first demo annotation" },
     *     { type : "testExample", value : "second demo annotation" },
     *     { type : "test2Example", value : "another type of demo annotation" },
     * ];
     * // Write these annotations into the archive record.
     * // We use the merge mode to protect foreign annotations
     * // (for instance the standard "3X" annotations) from being deleted.
     * // Old annotations of the types used above will disappear,
     * // because they have not been read and copied.
     * df.writeEASRecordAnnotations(JSON.stringify(testAnnotations), "", false);
     */
    writeEASRecordAnnotations(annoJSON: string, annoType: string, mergeForeignTypes: boolean): any;
    /**
    * **Returns the login of the user the DocFile locked by.**
    *
    * @since DOCUMENTS 5.0i HF5
    * @returns `String` with the login.
    * @example
    * var file = context.file;
    * util.out(file.getLockedBy());
    */
    getLockedBy(): string;
    /**
     * **Delete the scratch copy related to a DocFile.**
     *
     * If there's another PortalScript attached to the `afterCancelEdit` scripting hook, it will be executed after the deletion takes place.
     * **Note:** This function is only available for active files.
     * @since DOCUMENTS 5.0i HF5
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.getFilesWithScratchCopy | context.getFilesWithScratchCopy}
     * @example
     * var file = context.file;
     * if (!file.deleteScratchCopy())
     *	 util.out(file.getLastError());
     */
    deleteScratchCopy(): boolean;
}
/**
 * **The JS_DocFileDataField class represents the special comment field at the DocFile.**
 *
 * @since DOCUMENTS 5.0d
 */
declare interface DocFileDataField {
    /**
     * **Name of the field.**
     *
     * @since DOCUMENTS 5.0d
     */
    fieldName: string;
    /**
     * **Hash value of the last field value.**
     *
     * @since DOCUMENTS 5.0d
     */
    hash: string;
    /**
     * **Access-right to read the field.**
     *
     * @since DOCUMENTS 5.0d
     */
    readAccess: Boolean;
    /**
     * **Access-right to write the field.**
     *
     * @since DOCUMENTS 5.0d
     */
    writeAccess: Boolean;
    /**
     * **Is the field defined as readonly for the Web-Client (GUI).**
     *
     * @since DOCUMENTS 5.0g HF2
     */
    writeAccessGui: Boolean;
    /**
     * **If you call a method at a DocFileDataField object and an error occurred, you can get the error description with this function.**
     *
     * @since DOCUMENTS 5.0d
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Get the comment as String.**
     *
     * @since DOCUMENTS 5.0d
     * @returns String containing the comment
     */
    getValue(): string;
    /**
     * **Set the comment as String.**
     *
     * @since DOCUMENTS 5.0d
     * @param value String containing the new comment
     * @returns `true` if successful, `false` in case of any error
     */
    setValue(value: string): boolean;
}
/**
 * **The DocHit class presents the hit object collected by a HitResultset.**
 *
 * Objects of this class cannot be created directly. You may access a single DocHit by creating a HitResultset,
 * which provides functions to retrieve its hit entries.
 * @since DOCUMENTS 4.0b
 * @see
 * {@link HitResultset.first | HitResultset.first}
 * {@link HitResultset.getAt | HitResultset.getAt}
 * @example
 * var searchResource = "Standard";
 * var filter = "";
 * var sortOrder = "";
 * var myFile;
 * var myHRS = new HitResultset(searchResource, filter, sortOrder);
 * for (var myHit = myHRS.first(); myHit; myHit = myHRS.next())
 * {
 *     if (myHit.isArchiveHit())
 *         myFile = myHit.getArchiveFile();
 *     else
 *         myFile = myHit.getFile();
 *     if (myFile)
 *         util.out(myFile.getAutoText("title"));
 *     else
 *         util.out(myHit.getLastError());
 * }
 */
declare interface DocHit {
    /**
     * **Field value, addressed by a known column name.**
     *
     * Each field in a DocHit is mapped to an according property. You can read the value on the basis of the column name.
     *
     * **Note:** Overwriting values in a DocHit is not allowed. Each attempt will raise an exception.
     * To read dates and numbers in DOCUMENTS' storage format, see getTechValueByName().
     * @since DOCUMENTS 5.0HF2
     * @example
     * function logValue(label, value)
     * {
     *   util.out(label +" [" +  typeof(value) + "] "  + value);
     * }
     * var HRS = new HitResultset("ftOrder", "", "", "HL2");
     * var hitline = HRS.first();
     * if(hitline)
     * {
     *   // We assume, "ftOrder" has got a string field "company", a
     *   // date field "orderDate" and a numeric field "netPrice".
     *   var checkVal = hitline.company;
     *   logValue("company: ", checkVal);
     *   checkVal = hitline.orderDate;
     *   logValue("orderDate: ", checkVal);
     *   // The next example shows a different way to read "hitline.netPrice".
     *   // This style is necessary, if the name of a column contains
     *   // critical characters, or if the name equals a reserved JavaScript keyword.
     *   checkVal = hitline["netPrice"];
     *   logValue("orderDate: ", checkVal);
     *   // Columns can also be addressed by number (0..n-1)
     *   checkVal = hitline[0];
     *   logValue("first column: ", checkVal);
     * }
     */
    columnName: any;
    /**
     * **Get a file from the archive associated to the archive hit.**
     *
     * You need the necessary access rights on the archive side.
     *
     * **Note:** This function creates a complete DOCUMENTS image of the archived file, except for the content of attachments.
     * This is a time-consuming workstep. If a script calls this function for each hit in the set, it will not run any faster than a script,
     * which uses a conventional ArchiveFileResultset instead of this class.
     * @since DOCUMENTS 4.0b
     * @returns `DocFile` or `null`, if failed.
     * @see {@link getFile}
     */
    getArchiveFile(): DocFile;
    /**
     * **Retrieve the key of the associated archive file object.**
     *
     * @since DOCUMENTS 4.0b
     * @param withServer
     * optional boolean value to indicate, if the key should include an "@archiveServerName" appendix
     * **Default:** `true`
     * @returns The archive file's key as a String, but an empty String, if the hit does not refer to an archive file.
     * @see {@link getFileId}
     */
    getArchiveKey(withServer?: boolean): string;
    /**
     * **Function to get the blob info of the hit as xml.**
     *
     * @since DOCUMENTS 5.0c
     * @returns String with xml content
     */
    getBlobInfo(): string;
    /**
     * **Get the file associated to the hit.**
     *
     * If the file does not exist or the user in whose context the script is executed is not allowed to access the file, then the return value will be `null`.
     * @since DOCUMENTS 4.0b
     * @returns `DocFile` or `null`, if failed.
     * @see {@link getArchiveFile}
     */
    getFile(): DocFile;
    /**
     * **Get the file id of the associated file object.**
     *
     * @since DOCUMENTS 4.0b
     * @returns The file id as String, if the associated file is an active file, but an empty String otherwise.
     * @see {@link getArchiveKey}
     */
    getFileId(): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 4.0b
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Get the local value of an available column.**
     *
     * @since DOCUMENTS 4.0b
     * @param colIndex The zero-based index of the column.
     * @returns The local value of the given column as String.
     * @see {@link getLocalValueByName}
     */
    getLocalValue(colIndex: number): string;
    /**
     * **Get the local value of an available column.**
     *
     * **Note:** Accesing a column by its index is a bit faster than by its name.
     * @since DOCUMENTS 4.0b
     * @param colName The name of the column.
     * @returns The local value of the given column as String.
     * @see {@link getLocalValue}
     */
    getLocalValueByName(colName: string): string;
    /**
     * **Get a schema identifier of the archive hit.**
     *
     * **Note:** For EE.i, the value is an archive identifier in the XML-Server's notation. For EDA it is just the name of a filetype.
     *  All values come with an "@Servername" appendix.
     * @since DOCUMENTS 4.0b
     * @returns The schema identifier as a String.
     */
    getSchema(): string;
    /**
     * **Get the technical value of an available column.**
     *
     * **Note:** The function returns dates, timestamps and numbers in DOCUMENTS' storage format.
     * (In the DOCUMENTS Manager see menu 'Documents/Settings', dialog page 'Locale/format', group 'Format settings'.)
     * If you prefer JavaScript numbers and dates, simply use the object like an array: myDocHit[colIndex].
     * @since DOCUMENTS 4.0b
     * @param colIndex The zero-based index of the column.
     * @returns The technical value of the given column as a String.
     * @see {@link getTechValueByName}
     */
    getTechValue(colIndex: number): string;
    /**
     * **Get the technical value of an available column.**
     *
     * **Note:** Accessing a column by its index is a bit faster than by its name.
     *
     * **Note:** The function returns dates, timestamps and numbers in DOCUMENTS' storage format.
     * (In the DOCUMENTS Manager see menu 'Documents/Settings', dialog page 'Locale/format', group 'Format settings'.)
     * If you prefer JavaScript numbers and dates, you can simply read the columns as a property {@link DocHit.columnName}.
     * @since DOCUMENTS 4.0b
     * @param colName The name of the column.
     * @returns The technical value of the given column as String.
     * @see
     * {@link getTechValue}
     * {@link DocHit.columnName}
     */
    getTechValueByName(colName: string): string;
    /**
     * **Function to get webkey to use in the WebClient.**
     *
     * @since DOCUMENTS 5.0f
     * @returns String with key
     */
    getWebKey(): string;
    /**
     * **Function to test whether the associated file is an archive file.**
     *
     * @since DOCUMENTS 4.0b
     * @returns `true`, if the associated file is an archive file, `false` otherwise.
     */
    isArchiveHit(): boolean;
}
/**
 * **This class encapsulates the basic parameters of a Documents search request.**
 *
 * Only the script-exits "OnSearch" and "FillSearchMask" provide access to such an object. See also {@link Context.getQueryParams | Context.getQueryParams()}.
 * Scripts can modify the parameters only in the following ways.
 * <ol>
 * <li>A project-related "OnSearch" script may detect in advance, if an individual query won't find any hits in a specified searchable resource.
 * In this case, the script can call {@link removeSource | removeSource()} for each zero-hits resource to reduce the workload on the database and/or archive systems.
 * However the very first listed resource cannot be removed, because it regularly owns the selected hit list. As a result, removeSource()
 * is not suitable for implementing extraordinary permission restrictions. </li>
 * <li>A "OnSearch" script can substitute the relational operator or the value in a search field. This practice is not recommended,
 * because it may make the user find something competely different than he sought for. </li>
 * <li>A "OnSearch" script may cancel some special search requests and submit a custom message. The type (or origin) of the search request determines,
 * if and where this message will be displayed. </li>
 * <li>A "FillSearchMask" script can place default values in the search fields. </li>
 * </ol>
 * @since DOCUMENTS 4.0d
 * @example
 * util.out("* *** *** **** onSearch start * *** *** *** ***");
 * var params = context.getQueryParams();
 * if(params)
 * {
 *     // First write the contents of the object to the server window
 *     util.out("got retrieval parameter object");
 *     var requestType = params.requestType;
 *     util.out("queryType =  " + requestType);
 *     // Print the list of searchable resources.
 *     var count = params.sourceCount;
 *     util.out("sourceCount =  " + count);
 *     var cnt;
 *     for(cnt = 0; cnt < count; ++cnt)
 *     {
 *         var source = params.getSource(cnt);
 *         if(source)
 *         {
 *             util.out("<Source " + (cnt+1) + ">");
 *             util.out("resId = " + source.resId);
 *             util.out("type = " + source.type);
 *             util.out("server = " + source.server);
 *         }
 *         else
 *             util.out("got a NULL source");
 *     }
 *     // Print the list of all search fields.
 *     // This dump may include many empty fields.
 *     count = params.searchFieldCount;
 *     util.out("\r\nsearch fields = " + count);
 *     for(cnt = 0; cnt < count; ++cnt)
 *     {
 *         var sfield = params.getSearchField(cnt);
 *         if(sfield)
 *         {
 *             util.out("<Searchfield " + (cnt+1) + ">");
 *             var filter = sfield.name + sfield.compOp + sfield.valueExpr;
 *             util.out("Condition: " + filter);
 *             util.out("fieldType = " + sfield.type);
 *             util.out("label = " + sfield.label);
 *         }
 *         else
 *             util.out("got a NULL field");
 *     }
 *     // Print the search fields again, but this time ignore all empty
 *     // fields.
 *     count = params.filledSearchFieldCount;
 *     util.out("\r\nfilled search fields = " + count);
 *     for(cnt = 0; cnt < count; ++cnt)
 *     {
 *         sfield = params.getSearchField(cnt, true);
 *         if(sfield)
 *         {
 *             util.out("<Searchfield " + (cnt+1) + ">");
 *             var filter = sfield.name + sfield.compOp + sfield.valueExpr;
 *             util.out("Condition: " + filter);
 *             util.out("fieldType = " + sfield.type);
 *             util.out("label = " + sfield.label);
 *         }
 *         else
 *             util.out("got a NULL field");
 *     }
 *     // The subsequent test code requires at least one filled in search field
 *     if(count > 0)
 *     {
 *         sfield = params.getSearchField(0, true);
 *         var testExpr = sfield.valueExpr;
 *         // Test 1:
 *         // Let's assume we have got a bunch of EDA stores. We know,
 *         // that the value "rarely" is frequently searched across many
 *         // stores, but it never can appear in a store named "Playground".
 *         // We can try to exclude this store from the search request to
 *         // reduce the workload.
 *         if(testExpr == "rarely")
 *         {
 *             // Note: Source #0 cannot not be removed.
 *             for(cnt = 1; cnt < params.sourceCount; ++cnt)
 *             {
 *                 source = params.getSource(cnt);
 *                 if(source.server == "Playground")
 *                 {
 *                     params.removeSource(cnt--);
 *                     // About the "--": removeSource() has implicitly
 *                     // decreased the index number of all subsequent
 *                     // sources and also the "sourceCount" property.
 *                     // To skip nothing, the loop needs to run with
 *                     // the same index once again.
 *                 }
 *             }
 *         }
 *         // Test 2:
 *         // If the OnSearchScript triggers a search request itself, it
 *         // ends up in a recursive call! This section does nothing serious.
 *         // It just demonstrates the effect with a few log messages.
 *         if(testExpr == "recurse")
 *         {
 *             if(requestType == DocQueryParams.API)
 *                 util.out("OnSearchScript avoiding another recursion");
 *             else
 *             {
 *                 util.out("OnSearchScript before recursion");
 *                 var iter = new FileResultset("ftEmployee", "hrRemarks=recurse", "");
 *                 var o = iter.first();
 *                 util.out("OnSearchScript after recursion");
 *             }
 *         }
 *         // Test 3:
 *         // Generate an error for a specific search expression.
 *         if((requestType == DocQueryParams.DIRECT
 *             || requestType == DocQueryParams.EXTENDED)
 *            && testExpr == "want an error")
 *         {
 *             context.errorMessage = "Here is the error message you desired!";
 *             return -142;
 *         }
 *         // Test 4:
 *         // Substitute a search expression (not recommended; just a demo)
 *         if(requestType == DocQueryParams.EXTENDED && (testExpr == "U" ||testExpr == "u"))
 *             sfield.valueExpr = "X";
 *     }
 * }
 * else
 *     util.out("No retrieval parameters available.");
 * util.out("* *** *** **  onSearch end * *** *** *** ****");
 */
declare interface DocQueryParams {
    /**
     *
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly DIRECT: number;
    /**
     *
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly EXTENDED: number;
    /**
     * In the current release, this type can occur only, if the Documents setting "search field in folder" is enabled.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly FOLDER_S: number;
    /**
     * Listing the contents of such a folder already triggers a search request.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly FOLDER_D: number;
    /**
     *
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly REGISTER: number;
    /**
     * This request type originates from the web dialog, which opens, when a user is editing a file and presses a reference fields select button.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly REFERENCE: number;
    /**
     * (Archive-)FileResultsets, HitResultsets and the SOAP report functions belong to this category.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly API: number;
    /**
     *
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly FILING_PLAN: number;
    /**
     *
     * **Note:** Quick view URLs with just an id-Parameter do not trigger a search.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly QUICK_VIEW: number;
    /**
     * This is a special feature, where a script in the web server process sends a seach request and immediately generates a hit tree from the results.
     * The tabular list is not displayed in this case.
     * This constant is member of constant group: Request Type Constants
     * These constants are equally available in each instance of DocQueryParams and in the constructor object.
     */
    readonly SCRIPT_TREE: number;
    /**
     * **The number of filled in search fields in the query (read-only).**
     *
     * This is in other words the number of conditions in the query.
     *
     * **Note:** Attaching a default value to a search field does not fill it in this context.
     * Default values are being stored separately from concrete search values, for technical reasons.
     * @since DOCUMENTS 4.0c
     */
    filledSearchFieldCount: number;
    /**
     * **The type (or trigger) of the search request (read-only).**
     *
     * See the enumeration constants in this class. If Documents encounters a request, which it cannot categorize exactly,
     * it will return the nearest match with respect to the server's internal interfaces.
     * @since DOCUMENTS 4.0c
     */
    readonly requestType: number;
    /**
     * **The number of declared search fields in the query (read-only).**
     *
     * This count may include fields from a search mask, which have not been filled in.
     * @since DOCUMENTS 4.0c
     */
    readonly searchFieldCount: number;
    /**
     * **The (technical) name of the selected search mask, if available (read only).**
     *
     * **Note:** The value is an empty string, if the query has been prepared without a search mask or with an anonymous mask
     * (controlled by "show in search mask" checkboxes). Search mask names are unique with regard to a single searchable resource.
     * As soon as multiple resources are involved, the names are often ambiguous, because each resource may supply a search mask
     * with the same name. To obtain a better identifier, the script may combine the mask's name and the resId of the first selected resource.
     * However, even this identifier is not always unique. If a user has selected multiple EE.x views and the DOCUMENTS property "UseMainArchives"
     * is undefined or zero, the query does not specify a main resource. DOCUMENTS then passes the RetrievalSource objects with random order.
     * In this case the script cannot distinguish search masks with equal names.
     * @since DOCUMENTS 4.0e
     * @see
     * {@link getSource}
     * {@link sourceCount}
     */
    searchMaskName: string;
    /**
     * **The number of searchable resources involved in the query (read-only).**
     *
     * @since DOCUMENTS 4.0c undefined
     */
    readonly sourceCount: number;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 4.0c
     * @returns Text of the last error
     */
    getLastError(): string;
    /**
     * **Get a descriptive object of one of the search fields (conditions), which are declared in the query.**
     *
     * **Note:** If the request has been prepared with any kind of searck mask in the background, all available fields of
     * that mask appear in the internal list, not only those, which the user has filled in. The skipEmpty flag provides
     * a simple opportunity to examine only effective search conditions. Internally generated conditions (for example ACL-filters)
     * cannot be returned by this function. Attaching a default value to a field does not modify its "empty" state in terms of this function.
     * @since DOCUMENTS 4.0c
     * @param index The index of the desired search field. The valid range is 0 to (filledSearchFieldCount - 1), if the flag `skipEmpty` is set.
     * Otherwise the range is 0 to (searchFieldCount - 1).
     * @param skipEmpty An optional boolean to treat all empty search fields as non-existing. By default all fields can be examined.
     * @returns A RetrievalField object, which contains a search field name, an operator and (sometimes) a value expression.
     */
    getSearchField(index: number, skipEmpty: boolean): RetrievalField;
    /**
     * **Get a descriptive object of one selected search resource.**
     *
     * @since DOCUMENTS 4.0c
     * @param index The integer index of the resource in the internal list. Range: 0 to (sourceCount - 1)
     * @returns A RetrievalSource object on success, otherwise `null`.
     */
    getSource(index: number): RetrievalSource;
    /**
     * **Remove a search resource from the query.**
     *
     * **Note:** The access to this function is restricted. Only the "OnSearchScript" can effectively use it.
     *
     * **Note:** The id can be read from the property RetrievalSource.resId. Valid index values range from 1 to (sourceCount - 1).
     * The resource at index 0 cannot be removed (see the class details). After a succesful call, the sourceCount and the index
     * of each subsequent resource in the list are decreased by one. The method does not perform type-checking on the refSource parameter.
     * It interprets a value like "12345" always as an index, even when this value has been passed as a string.
     * @since DOCUMENTS 4.0c
     * @param refSource Either the current integer index or the id of the resource.
     * @returns A boolean value, which indicates a succesful call.
     */
    removeSource(refSource: any): boolean;
}
/**
 * **The Document class has been added to the DOCUMENTS PortalScripting API to gain full access to the documents stored on registers of a DOCUMENTS file by scripting means.**
 *
 * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
 * @since ELC 3.50n / otrisPORTAL 5.0n
 */
declare interface Document {
    /**
     * **The file size of the Document object in bytes.**
     *
     * @since DOCUMENTS 4.0e
     * @see {@link Document.size}
     */
    readonly bytes: number;
    /**
     * **The comment of the Document object.**
     *
     * @since DOCUMENTS 5.0d HF1
     */
    readonly comment: string;
    /**
     * **Info, if the blob is encrypted in the repository.**
     *
     * @since DOCUMENTS 4.0d HF3
     */
    readonly encrypted: boolean;
    /**
     * **The extension of the Document object.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     */
    readonly extension: string;
    /**
     * **The complete filename (name plus extension) of the Document object.**
     *
     *
     * **Since:** ELC 3.50n / otrisPORTAL 5.0n
     * @since ELC 3.60i / otrisPORTAL 6.0i available for archive files
     */
    readonly fullname: string;
    /**
     * **The id of the Document object.**
     *
     * @since DOCUMENTS 5.0e
     */
    readonly id: string;
    /**
     * **The name (without extension) of the Document object.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     */
    readonly name: string;
    /**
     * **The formatted file size (e.g. 3.91 KB) of the Document object.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @see {@link Document.bytes}
     */
    readonly size: string;
    /**
     * **Delete the Document object.**
     *
     * With the necessary rights you can delete a document of the file. Do this only on scratch copies (startEdit, commit)
     *
     * **Note:** It is strictly forbidden to access the Document object after this function has been executed successfully;
     * if you try to access it, your script will fail, because the Document does not exist any longer in DOCUMENTS.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.60b / otrisPORTAL 6.0b
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // Deletion of the first document of the register "docs"
     * var myFile = context.file;
     * if (!myFile)
     * {
     *    util.out("missing file");
     *    return -1;
     * }
     * if (!myFile.startEdit())
     * {
     *    util.out("Unable to create scratch copy: " + myFile.getLastError());
     *    return -1;
     * }
     * var myReg = myFile.getRegisterByName("docs");
     * if (!myReg)
     * {
     *    util.out("missing >docs< register");
     *    return -1;
     * }
     * var firstDoc = myReg.getDocuments().first();
     * if (!firstDoc)
     * {
     *    return 0; // Nothing to do
     * }
     * if (!firstDoc.deleteDocument())
     * {
     *    util.out(firstDoc.getLastError());
     *    myFile.abort();
     *    return -1;
     * }
     * if (!myFile.commit())
     * {
     *    util.out("commit failed: " + myFile.getLastError());
     *    myFile.abort();
     *   return -1;
     * }
     * return 0;
     */
    deleteDocument(): boolean;
    /**
     * **Execute OCR for the current document.**
     *
     * The OCR is executed independently of the main OCR property. Meaning OCR will be executed even if the
     * OCR property is not set for that document. The OCR method will create a searchable pdf-document or a
     * docx-document (not supported by Tesseract). If the type of the current document is an image format
     * like tif, png etc, the created searchable-document will be uploaded into the same register. If the
     * type of the current document already is a pdf/docx, the OCR-pdf will be uploaded as a new version of
     * the current document.
     *
     * Additionally to the pdf/docx creation, you can get the text content of the
     * document by using the parameters ocrTextFormat and ocrTextTarget. (The properties OCRTextFormat and
     * OCRTextTarget will be ignored in this function. If you specify an ocrTextFormat ("txt" or "alto")
     * the method will return the extracted words in the specified format as a string. If you specify an
     * ocrTextTarget (Registername), then the ocrTextFormat is uploaded to the specified register. The
     * parameters ocrTextFormat and ocrTextTarget are supported for the OCR-Engines Tesseract and Abbyy.
     *
     * If the parameter background is set to `true` only the OCR flag is set. In that case OCR is
     * executed in the background. As default, background is set to `false` and OCR is executed
     * immediately.
     *
     * Usually the job checks, if the document contains text before executing OCR. If you
     * want OCR to be executed even though the document contains text, set the parameter `force`
     * to `true`. If the check is performed, the Property OCRMinWordCount will be taken into account.
     *
     * @since DOCUMENTS 5.0f
     * @param ocrOutputFormat
     * `"pdf"` or `"docx"`, see main description
     *
     * **Default:** `"pdf"`
     * @param ocrTextFormat `"txt"` or `"alto"`, see main description
     * @param ocrTextTarget the registername, where the ocrText will be uploaded
     * @param background
     * `false`: OCR will be executed immediately, `true`: OCR will be executed later in a background job
     *
     * **Default:** `false`
     * @param force
     * `false`: OCR will be sipped, if document is text, `true`: OCR will be executed in any case
     *
     * **Default:** `false`
     * @returns the recongized text or an empty string, in case of an error, an exception will be thrown
     * @see {@link Document.extractText | Document.extractText}
     * @example
     * var file = context.file;
     * var reg1 = file.getRegisterByName("RegisterA");
     * var offerDoc = reg1.getDocuments().first();
     * if (offerDoc)
     * {
     *   try
     *   {
     *       // e.g. offerDoc.fullname = "offer.tif"
     *     var ocrText = offerDoc.doOCR("pdf", "txt", "RegisterA", false, false);
     *     util.out(ocrText);  // text content of offer.tif after OCR
     *       // now there are 3 documents at RegisterA
     *       // 1. offer.tif
     *       // 2. offer-ocr.pdf
     *       // 3. offer.txt
     *   }
     *   catch (ex)
     *   {
     *     util.out(ex);
     *   }
     * }
     */
    doOCR(ocrOutputFormat?: string, ocrTextFormat?: string, ocrTextTarget?: string, background?: boolean, force?: boolean): string;
    /**
     * **Download the Document to the server's filesystem for further use.**
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 4.0 (new parameter filePath)
     * **Since:** DOCUMENTS 4.0d (new parameter version)
     *
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param filePath Optional string specifying where the downloaded Document to be stored.
     *
     * **Note:** A file path containing special characters can be modified due to the encoding problem. The modified file path will be returned.
     * @param version Optional string value specifying which version of this Document to be downloaded (e.g. "2.0"). The default value is the active version.
     *
     * **Note:** This parameter is ignored for an archive document.
     * @returns String containing full path and file name of the downloaded Document, an empty string in case of any error.
     * @example
     * // Example 1
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * var docIter = reg.getDocuments();
     * if (docIter && docIter.size() > 0)
     * {
     *    var doc = docIter.first();
     *    var docPath = doc.downloadDocument();
     *    var txtFile = new File(docPath, "r+t");
     *    if (txtFile.ok())
     *    {
     *       var stringVar = txtFile.readLine(); // read the first line
     *       txtFile.close();
     *    }
     * }
     * @example
     * // Example 2
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * var docIter = reg.getDocuments();
     * if (docIter && docIter.size() > 0)
     * {
     *    var doc = docIter.first();
     *    var docPath = "C:\\tmp\\test.txt";
     *    docPath = doc.downloadDocument(docPath, "2.0"); // since DOCUMENTS 4.0d
     *    if (docPath == "")
     *     util.out(doc.getLastError());
     * }
     */
    downloadDocument(filePath?: string, version?: string): string;
    /**
     * **Extracts the text content of a document (eg pdf) **
     *
     * A appropriate extract program has to be defined in the documents.ini: $extracttext.pdf
     * @since DOCUMENTS 5.0f
     * @param version String containing the wanted version of the document e.g. "2.0", use an empty value for the actual version.
     * @param options String containing additional options that will passed to the extract program.
     * @returns `String` with the extracted text, an exception in case of any error.
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Doc1");
     * var docIt = reg.getDocuments();
     * for (doc = docIt.first(); doc; doc = docIt.next())
     * {
     *   var text = doc.extractText();
     *   if (text == "")
     *     util.out(doc.getLastError());
     *   else
     *       util.out(text);
     * }
     */
    extractText(version?: string, options?: string): string;
    /**
     * **Create a PDF file containing the current Document's contents and return the path in the file system.**
     *
     * The different document types of your documents require the appropriate PDF filter programs to be installed and configured in DOCUMENTS.
     * @since DOCUMENTS 4.0c
     * @returns `String` with file path of the PDF, an empty string in case of any error.
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Doc1");
     * var docIt = reg.getDocuments();
     * for (doc = docIt.first(); doc; doc = docIt.next())
     * {
     *   var pathPdfFile = doc.getAsPDF();
     *   if (pathPdfFile == "")
     *       util.out(doc.getLastError());
     *   else
     *    util.out("File path: " + pathPdfFile);
     * }
     */
    getAsPDF(): string;
    /**
     * **Get the String value of an attribute of the Document.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the Document object (`m_oid`) will be returned.
     * If `false` the id of the Document object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Returns the Register the Document belongs to.**
     *
     * @since DOCUMENTS 5.0c HF1
     * @returns Register object or `null` if missing
     * @example
     * var file = context.file;
     * var reg1 = file.getRegisterByName("RegisterA");
     * var firstDoc = reg1.getDocuments().first();
     * if (firstDoc)
     * {
     *    var reg = firstDoc.getRegister();
     *    if (reg)
     *       util.out(reg.name);  // "RegisterA"
     * }
     */
    getRegister(): Register;
    /**
     * **Generate the hash value for the Document using the given hash function.**
     *
     * These hash functions are supported:
     *
     * + `sha1`
     * + `sha224`
     * + `sha256`
     * + `sha384`
     * + `sha512`
     * + `md4`
     * + `md5`
     * + `whirlpool`
     * + `ripemd160`
     *
     * @since DOCUMENTS 5.0e
     * @param hashfunction String containing the name of the hash function.
     * @param version Optional string value specifying which version of this Document to be hashed (e.g. "2.0"). The default value is the active version.
     *
     * **Note:** This parameter is ignored for an archive document.
     * @returns String with the hash value of the Document, an empty string in case of any error.
     * @see {@link util.hash | util.hash}
     * @example
     * var file = context.file;
     * var reg1 = file.getRegisterByName("RegisterA");
     * var firstDoc = reg1.getDocuments().first();
     * if (firstDoc)
     * {
     *   try
     *   {
     *     var hashValue = firstDoc.hash("sha256", "2.0");
     *     if (hashValue == "")
     *         util.out(firstDoc.getLastError());
     *   }
     *   catch (ex)
     *   {
     *     util.out(ex);
     *   }
     * }
     */
    hash(hashfunction: string, version?: string): string;
    /**
     * **Checks if the current document still has to processed by the OCR engine.**
     *
     * If the OCR flag is set, the document must be processed by the OCR engine. After finishing the OCR process the flag is set back.
     * @since DOCUMENTS 5.0f
     * @returns `true` if flag is set, `false` if not
     */
    hasOcrFlag(): boolean;
    /**
     * **Check, if the current document has at least the specified number of words.**
     *
     * @param minWords
     * Number of words
     *
     * **Default:** `5`
     * @param version Optional string value specifying which version of this document to be read (e.g. "2.0").
     * @returns
     */
    hasWords(minWords?: number, version?: string): boolean;
    /**
     * **Move the document to a documents register of another file.**
     *
     * With the necessary rights you can move the document to a documents register of another file.
     *
     * **Note:** This operation is not available for a document located in an archive file.
     *
     * @since DOCUMENTS 6.0
     * @param targetFile The file this document will be moved to.
     * @param targetRegister The register in the target file this document will be moved to.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var sourceFile = context.getFileById("peachitreg_fi20230000000241");
     * var targetFile = context.getFileById("peachitreg_fi20230000000240");
     * var sourceReg = sourceFile.getRegisterByName("Doc1");
     * var targetReg = targetFile.getRegisterByName("Doc1");
     * var docIt = sourceReg.getDocuments();
     * for (var doc = docIt.first(); doc; doc = docIt.next())
     * {
     *   if (!doc.moveToDocFile(targetFile, targetReg))
     *   {
     *       util.out(doc.getLastError());
     *       break;
     *   }
     * }
     */
    moveToDocFile(targetFile: DocFile, targetRegister: Register): boolean;
    /**
     * **Move the Document to another document Register of the file.**
     *
     * With the necessary rights you can move the Document to another document Register of the file.
     *
     * **Note:** This operation is not available for a Document located in an archive file.
     * @since DOCUMENTS 4.0c
     * @param regObj The Register this Document will be moved to.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var file = context.file;
     * if (!file.isArchiveFile())
     * {
     *    var regDoc1 = file.getRegisterByName("Doc1");
     *    var regDoc2 = file.getRegisterByName("Doc2");
     *    var docIt = regDoc2.getDocuments();
     *    for (var doc = docIt.first(); doc; doc = docIt.next())
     *    {
     *       if (!doc.moveToRegister(regDoc1))
     *           util.out(doc.getLastError());
     *    }
     * }
     */
    moveToRegister(regObj: Register): boolean;
    /**
     * **Read the document and return its content as a string in case of the document being a text file.**
     *
     * @since DOCUMENTS 5.0f
     * @param version Optional string value specifying which version of this document to be read (e.g. "2.0"). The default version is the active version.
     *
     * **Note:** This parameter is ignored for an archive document.
     * @returns String with content of the document; empty string in case of errors.
     */
    readAsString(version?: string): string;
    /**
     * **Reindex the blob located in an active file.**
     *
     * This method is only allowed if at the filetype the option `'automatic document indexing'` is enabled.
     * @since DOCUMENTS 5.0e HF2
     * @returns `true` if successful, `false` in case of any error
     */
    reindexBlob(): boolean;
    /**
     * **Set the String value of an attribute of the Document to the desired value.**
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     *
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Set the name of the current document.**
     *
     * This method is only allowed for documents at a scratch copy (`startEdit`, `commit`).
     * @since DOCUMENTS 5.0e HF2
     * @param nameWithExt String containing the document name with extension.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // Rename the first document of the register "docs"
     * var myFile = context.file;
     * if (!myFile)
     * {
     *    util.out("missing file");
     *    return -1;
     * }
     * if (!myFile.startEdit())
     * {
     *    util.out("Unable to create scratch copy: " + myFile.getLastError());
     *    return -1;
     * }
     * var myReg = myFile.getRegisterByName("docs");
     * if (!myReg)
     * {
     *    util.out("missing >docs< register");
     *    return -1;
     * }
     * var firstDoc = myReg.getDocuments().first();
     * if (!firstDoc)
     * {
     *    return 0; // Nothing to do
     * }
     * if (!firstDoc.setDocumentName("newName.txt"))
     * {
     *    util.out(firstDoc.getLastError());
     *    myFile.abort();
     *    return -1;
     * }
     * if (!myFile.commit())
     * {
     *    util.out("commit failed: " + myFile.getLastError());
     *    myFile.abort();
     *   return -1;
     * }
     * return 0;
     */
    setDocumentName(nameWithExt: string): boolean;
    /**
     * **Upload a file stored on the server's filesystem for replacing or versioning this Document.**
     *
     * **Note:** After successful upload of the Document the source file on the server's directory structure is removed!
     * @since DOCUMENTS 4.0d
     * @param sourceFilePath String containing the path of the desired file to be uploaded.
     *
     * **Note:** Backslashes contained in the filepath must be quoted with a leading backslash, since the backslash is a special char in ECMAScript!
     * @param versioning
     * Optional flag: `true` for versioning the Document and `false` for replacing it.
     *
     * **Default:** `true`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * var docIter = reg.getDocuments();
     * if (docIter && docIter.size() > 0)
     * {
     *    var doc = docIter.first();
     *    if (!doc.uploadDocument("c:\\tmp\\test.txt", true))
     *       util.out(doc.getLastError());
     * }
     */
    uploadDocument(sourceFilePath: string, versioning?: boolean): boolean;
}
/**
 * **The DocumentIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the documents stored on registers of a DOCUMENTS file by scripting means.**
 *
 * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
 *
 * @since ELC 3.50n / otrisPORTAL 5.0n
 * @example
 * var docFile = context.file;
 * if (docFile)
 * {
 *    var docreg = docFile.getRegisterByName("Documents");
 *    if (docreg)
 *    {
 *       var docs = docreg.getDocuments();
 *       if (docs && docs.size() > 0)
 *       {
 *          for (var d = docs.first(); d; d = docs.next())
 *          {
 *             util.out(d.fullname);
 *          }
 *       }
 *    }
 * }
 */
declare interface DocumentIterator {
    /**
     * **Retrieve the first Document object in the DocumentIterator.**
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Document or `null` in case of an empty DocumentIterator
     */
    first(): Document;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the next Document object in the DocumentIterator.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Document or `null` if end of DocumentIterator is reached.
     */
    next(): Document;
    /**
     * **Get the amount of Document objects in the DocumentIterator.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns integer value with the amount of Document objects in the DocumentIterator
     */
    size(): number;
}
/**
 * This class allows the server as a gRPC client to access other (or its own) Documents Server via [gRPC API](../../../manuals/books/grpc/index.html).
 */
declare class DocumentsRemoteJSON {
    /**
     * **Create a new DocumentsRemoteJSON object.**
     *
     * **Note:** Invoked gRPC operation: Session.CreateSession, see sessions.proto for more information.
     *
     * **Since:** DOCUMENTS 5.0i
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the settings for the options `host, principal, user, locale, tls, caCert, clientCert`, `clientKey` and `timeout` in ms (default 30000).
     * @example
     * const certPath = "c:\\mycerts\\";
     * var json = {
     *               host : "localhost:50050",
     *               principal : "relations",
     *               user : "schreiber",
     *               locale : "de",
     *               tls : true,
     *               caCert: certPath + "ca_cert.pem",
     *               clientCert : certPath + "client_cert.pem",
     *               clientKey: certPath + "client_key.pem",
     *               timeout : 30000
     *             };
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *    // do something
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    constructor(json: string);
    /**
     * **locale of the gRPC client.**
     *
     * @since DOCUMENTS 5.0i
     */
    locale: string;
    /**
     * **Cancel the workflow of a file.**
     *
     * **Note:** Invoked gRPC operation: Workflow.CancelWorkflow, see workflow.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   dr.CancelWorkflow(JSON.stringify(reqJson));
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    CancelWorkflow(json: string): boolean;
    /**
     * **Close the session.**
     *
     * **Note:** Invoked gRPC operation: Session.CloseSession, see sessions.proto for more information.
     * @since DOCUMENTS 5.0i
     * @returns `true` if successful, `false` in case of any error.
     */
    CloseSession(): boolean;
    /**
     * **Check whether a valid session exists for the client.**
     *
     * **Note:** Invoked gRPC operation: Session.TestSession, see sessions.proto for more information.
     * @since DOCUMENTS 6.0.1
     * @returns `true` if successful, `false` in case of any error.
     */
    TestSession(): boolean;
    /**
     * **Create a file.**
     *
     * **Note:** Invoked gRPC operation: DocFile.CreateFile, see doc_file.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var inJson = {};
     *   inJson.file_path = "c:\\tmp\\easy.pdf";
     *   inJson.file_ext = "pdf";
     *   var res = dr.SpoolDocument(JSON.stringify(inJson));
     *   var spoolId = JSON.parse(res).spool_id;
     *   var reqJson = {};
     *   reqJson.file = {};
     *   reqJson.file.type = "crmNote";
     *   reqJson.file.field_updates = [];
     *   reqJson.file.document_updates = [];
     *   var field1 = {};
     *   field1.name = "crmSubject";
     *   field1.str = "Test CreateFile";
     *   reqJson.file.field_updates.push(field1);
     *   var doc1 = {};
     *   doc1.spool_id = spoolId;
     *   doc1.name = "easy.pdf";
     *   doc1.register_name = "crmAttachments";
     *   reqJson.file.document_updates.push(doc1);
     *   res = dr.CreateFile(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    CreateFile(json: string): string;
    /**
     * **Delete files.**
     *
     * **Note:** Invoked gRPC operation: DocFile.DeleteFiles, see doc_file.proto for more information.
     * @since DOCUMENTS 5.0i HF3
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_ids = ["peachitreg_fi20230000000036", "peachitreg_fi20230000000037", "d9c5275d-4a4f-4940-bef0-2d4e4c50cae8|Filetype1@eas1"];
     *   reqJson.all_versions = true;
     *   var res = dr.DeleteFiles(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    DeleteFiles(json: string): string;
    /**
     * **Archive files.**
     *
     * **Note:** Invoked gRPC operation: DocFile.ArchiveFiles, see doc_file.proto for more information.
     * @since DOCUMENTS 6.0.1
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_ids = ["peachitreg_fi20230000000036", "peachitreg_fi20230000000037"];
     *   reqJson.delete_files = true;
     *   var res = dr.ArchiveFiles(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    ArchiveFiles(json: string): string;
    /**
     * **Determine auto-texts.**
     *
     * **Note:** Invoked gRPC operation: DocFile.GetAutoText, see doc_file.proto for more information.
     * @since DOCUMENTS 6.0.1
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "peachitreg_fi20230000000036";
     *   reqJson.auto_text_names = ["fileOwner", "createdAt"];
     *   var res = dr.GetAutoText(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetAutoText(json: string): string;
    /**
     * **Download a document from a file.**
     *
     * **Note:** Invoked gRPC operation: DocFile.DownloadDocument, see doc_file.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the file path and file name of the downloaded document.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.doc_id = "relationsdc0000000000000490";
     *   var res = dr.DownloadDocument(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    DownloadDocument(json: string): string;
    /**
     * **Forward the file to its next workflow step.**
     *
     * **Note:** Invoked gRPC operation: Workflow.ForwardFile, see workflow.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.action_id = "{684E5F7B-D2E6-4307-8911-FC7260EF02BE}";
     *   dr.ForwardFile(JSON.stringify(reqJson));
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    ForwardFile(json: string): boolean;
    /**
     * **Get the information of a file.**
     *
     * **Note:** Invoked gRPC operation: DocFile.GetFileInfo, see doc_file.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.options = {};
     *   reqJson.options.add_fields = true;
     *   reqJson.options.add_documents = true;
     *   reqJson.options.add_field_display_value = true;
     *   reqJson.options.add_field_label = true;
     *   reqJson.options.add_field_reference_file_id = true;
     *   reqJson.options.add_registers = true;
     *   var res = dr.GetFileInfo(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetFileInfo(json: string): string;
    /**
     * **Get the information of desired file types.**
     *
     * **Note:** Invoked gRPC operation: DocFile.GetFileTypes, see doc_file.proto for more information.
     * @since DOCUMENTS 6.0.2
     * @param json JSON string containing the request of the corresponding gRPC call.
       * **Default:** "{}"
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.name_pattern = "TestFileType*";
     *   reqJson.options = {};
     *   reqJson.options.add_fields = true;
     *   reqJson.options.add_registers = true;
     *   var res = dr.GetFileTypes(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetFileTypes(json?: string): string;
    /**
     * **Get the information of the user.**
     *
     * **Note:** Invoked gRPC operation: User.GetUserInfo, see users.proto for more information.
     * @since DOCUMENTS 6.0.2
     * @param json JSON string containing the request of the corresponding gRPC call.
       * **Default:** "{}"
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.options = {};
     *   reqJson.options.add_particulars = true;
     *   var res = dr.GetUserInfo(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetUserInfo(json?: string): string;
    /**
     * **Get the information of files in a folder.**
     *
     * **Note:** Invoked gRPC operation: Folder.GetFiles, see folder.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.name = "testFolder"
     *   reqJson.start_index = 0;
     *   reqJson.count = -2;
     *   reqJson.preview = true;
     *   var res = dr.GetFiles(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetFiles(json: string): string;
    /**
     * **Returns only the status message for the last error.**
     *
     * **Note:** You can use this after catching an error to get only the message string for this error
     * @since DOCUMENTS 6.0
     * @returns Status message
     */
    getLastError(): string;
    /**
     * **Returns only the status code for the last error.**
     *
     * **Note:** You can use this after catching an error to get only the code number for this error
     * @since DOCUMENTS 6.0
     * @returns Status code
     */
    getLastErrorCode(): number;
    /**
     * **Determine the currently possible workflow steps of a file.**
     *
     * **Note:** Invoked gRPC operation: Workflow.GetPossibleActions, see workflow.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   var res = dr.GetPossibleActions(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetPossibleActions(json: string): string;
    /**
     * **List the information of the files in a private folder.**
     *
     * **Note:** Invoked gRPC operation: Folder.GetPrivateFolder, see folder.proto for more information.
     * This function is only available for the following folder types: Inbox and Sent.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.type_str = "Inbox"; // or reqJson.type = 1
     *   var res = dr.GetPrivateFolder(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetPrivateFolder(json: string): string;
    /**
     * **Get the public folders.**
     *
     * **Note:** Invoked gRPC operation: Folder.GetPublicFolders, see folder.proto for more information.
     * @since DOCUMENTS 5.0i
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var res = dr.GetPublicFolders();
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetPublicFolders(): string;
    /**
     * **Get the workflows im Documents.**
     *
     * **Note:** Invoked gRPC operation: Workflow.GetWorkflowPattern, see workflow.proto for more information.
     * @since DOCUMENTS 5.0i
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var res = dr.GetWorkflowPattern();
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    GetWorkflowPattern(): string;
    /**
     * **Search for files of one or more file types in one or more archives.**
     *
     * **Note:** Invoked gRPC operation: Search.Query, see search.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.filetypes = ["crmNote", "crmProduct"];
     *   reqJson.filter = "SETMETHOD(2)crmSubject ~ Test*";
     *   reqJson.sort = "crmDescription-";
     *   reqJson.field_names = ["crmDescription", "crmId", "crmSubject"];
     *   var res = dr.Query(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    Query(json: string): string;
    /**
     * **Run a script.**
     *
     * **Note:** Invoked gRPC operation: Scripting.RunScript, see scripting.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.script_name = "remoteScriptCall";
     *   reqJson.parameters = {};
     *   reqJson.parameters["param1"] = "value1";
     *   reqJson.parameters["param2"] = "value2";
     *   var res = dr.RunScript(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    RunScript(json: string): string;
    /**
     * **Spool a document.**
     *
     * **Note:** Invoked gRPC operation: DocumentSpooler.Spool, see spooler.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_path = "c:\\tmp\\easy.pdf";
     *   reqJson.file_ext = "pdf";
     *   var res = dr.SpoolDocument(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    SpoolDocument(json: string): string;
    /**
     * **Start a workflow for a file.**
     *
     * **Note:** Invoked gRPC operation: Workflow.StartWorkflow, see workflow.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.workflow_pattern_id = "352:8172";
     *   dr.StartWorkflow(JSON.stringify(reqJson));
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    StartWorkflow(json: string): boolean;
    /**
     * **Update a file.**
     *
     * **Note:** Invoked gRPC operation: DocFile.UpdateFile, see doc_file.proto for more information.
     * @since DOCUMENTS 5.0i
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns JSON string containing the response of the corresponding gRPC call.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson..file_id = "relations_fi20200000001335";
     *   reqJson.file = {};
     *   reqJson.file.type = "crmNote";
     *   reqJson.file.field_updates = [];
     *   reqJson.file.document_updates = [];
     *   var field1 = {};
     *   field1.name = "crmSubject";
     *   field1.str = "Test UpdateFile";
     *   reqJson.file.field_updates.push(field1);
     *   var doc1 = {};
     *   doc1.name = "easy_renamed.pdf";
     *   doc1.document_id = "relationsdc0000000000000490";
     *   doc1.action = "UPDATE_DOCUMENT";
     *   doc1.register_name = "crmAttachments";
     *   reqJson.file.document_updates.push(doc1);
     *   var res = dr.UpdateFile(JSON.stringify(reqJson));
     *   util.out("Response: " + res);
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    UpdateFile(json: string): string;
    /**
     * **Move a file from the user's inbox to the resubmission folder.**
     *
     * **Note:** Invoked gRPC operation: DocFile.FollowUp, see doc_file.proto for more information.
     * @since DOCUMENTS 6.0.1
     * @param json JSON string containing the request of the corresponding gRPC call.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var dr = null;
     * try {
     *   dr = new DocumentsRemoteJSON(JSON.stringify(json));
     *   var reqJson = {};
     *   reqJson.file_id = "relations_fi20200000001335";
     *   reqJson.comment = "Test for FollowUp";
     *   reqJson.absolute_time = context.addTimeInterval(new Date(), 2, "days", false);
     *   dr.FollowUp(JSON.stringify(reqJson));
     * } catch (err) {
     *    util.out(err);
     * } finally {
     *   if (dr)
     *     dr.CloseSession();
     * }
     */
    FollowUp(json: string): boolean;
}
/**
 * **This class models a single attribute of a DOMElement.**
 *
 * DOMAttrs cannot be created directly. This applies to almost all kinds of DOMNodes.
 * **Remarks about W3C conformity**
 * The class conforms to the Attribute interface of DOM level 2.
 *
 * **Since:** DOCUMENTS 5.0f (DOM level 2)
 * @since DOCUMENTS 4.0c (DOM level 1)
 */
declare interface DOMAttr {
    /**
     * **The name of the attribute.**
     *
     * This property is readonly.
     * @since DOCUMENTS 4.0c
     */
    name: string;
    /**
     * **The DOMElement node this attribute is attached to or `null` if this attribute is not in use.**
     *
     * This property is readonly.
     * @since DOCUMENTS 5.0f
     */
    ownerElement: DOMElement;
    /**
     * **A flag to test, whether the attribute's value has been explicitly specified.**
     *
     * The flag is `true`, if the value was explicitly contained in a parsed document. The flag is also `true`,
     * if the script has set the property "value" of this DOMAttr object. The flag is `false`,
     * if the value came from a default value declared in a DTD. The flag is readonly.
     * @since DOCUMENTS 4.0c
     */
    specified: boolean;
    /**
     * **The value of the attribute as a string.**
     *
     * Character and general entity references are replaced with their values.
     * @since DOCUMENTS 4.0c
     */
    value: string;
}
/**
 * **DOMCharacterData represents text-like nodes in the DOM tree.**
 *
 * An object of this class can represent either a text node, a comment node or a CDATA section.
 * Scripts should use the inherited nodeType attribute to distinguish these node types.
 *
 * **Remarks about W3C conformity**
 * The class covers the CharacterData interface of DOM level 2. The W3C has defined several derived
 * interfaces, namely "Text", "Comment" and "CDATASection". With respect to code size this API omits
 * the corresponding subclasses "DOMText", "DOMComment" and "DOMCDATASection". The only additional
 * method "DOMText.splitText()" has been moved into this class.
 * This simplification has got only one little disadvantage. Scripts cannot distinguish the three
 * node types using the JavaScript `instanceof` operator. They must use the nodeType attribute instead.
 * @since DOCUMENTS 4.0c
 */
declare interface DOMCharacterData {
    /**
     * **The text data in the node.**
     *
     * @since DOCUMENTS 4.0c
     */
    data: string;
    /**
     * **The text length in the node.**
     *
     * This property is readonly.
     * @since DOCUMENTS 4.0c
     */
    length: number;
    /**
     * **Append some string to the text.**
     *
     * @since DOCUMENTS 4.0c
     * @param arg The string to append.
     * @returns
     * @throws
     */
    appendData(arg: string): void;
    /**
     * **Delete a section of the text.**
     *
     * @since DOCUMENTS 4.0c
     * @param offset The zero-based position of the first character to delete.
     * @param count The number of characters to delete.
     * @returns
     * @throws
     */
    deleteData(offset: number, count: number): void;
    /**
     * **Insert some string into the text.**
     *
     * @since DOCUMENTS 4.0c
     * @param offset A zero-based position. On return, the inserted string will begin here.
     * @param arg The string to insert.
     * @returns
     * @throws
     */
    insertData(offset: number, arg: string): void;
    /**
     * **Replace a section of the text with a new string.**
     *
     * @since DOCUMENTS 4.0c
     * @param offset The zero-based position of the first character to be replaced.
     * @param count The number of characters to replace.
     * @param arg The string replacing the old one.
     * @returns
     * @throws
     */
    replaceData(offset: number, count: number, arg: string): void;
    /**
     * **Split a text node into two.**
     *
     * The new node becomes the next sibling of this node in the tree, and it has got the same nodeType.
     *
     * **Note:** Future releases of the API may expose this method only in a new subclass DOMText.
     * See also the W3C conformity remarks in the class description. If a script calls this method on a "Comment" node.
     * it will trigger a JavaScript error, because "Comment" is not derived from "Text" in the standard API.
     * @since DOCUMENTS 4.0c
     * @param offset The zero-based index of the character, which will become the first character of the new node.
     * @returns The new text node.
     * @throws
     */
    splitText(offset: number): DOMCharacterData;
    /**
     * **Extract a substring of the node's text.**
     *
     * @since DOCUMENTS 4.0c
     * @param offset The zero-based index of the first character to extract.
     * @param count The number of characters to extract.
     * @returns The requested substring.
     * @throws
     */
    substringData(offset: number, count: number): string;
}
/**
 * The DOMDocument is the root of a DOM tree.
 *
 * The constructor of this class always creates an empty document structure. Use the class DOMParser to obtain the structure of an existing XML.
 * To create any new child nodes, a script must call the appropriate create method of the DOMDocument. It is not possible to create child nodes standalone.
 *
 * After a DOMDocument has been deleted by the scripting engine's garbage collector, accessing any nodes and lists of that document may issue an error.
 * You should avoid code like the following.
 *
 * ```js
 * function buildSomeElement()
 * {
 *   var domDoc = new DOMDocument("root");
 *   var someElement = domDoc.createElement("Test");
 *   // This is an error: Some operations on the DOMElement may no
 *   // longer work, when the owning DOMDocument has already died.
 *   return someElement;
 * }
 * ```
 *
 * **Remarks about W3C conformity**
 *
 * The class covers most of the Document interface of DOM level 2, but the following properties and functions have not been implemented.
 * <ul>
 * <li>DOMImplementation implementation</li>
 * </ul>
 *
 * **Since:** DOCUMENTS 5.0f (DOM level 2 core support)
 */
declare class DOMDocument {
    /**
     * **Create a new empty XML document structure.**
     *
     * **Note:** The namespaceURI parameter is mandatory, if rootElementName includes a namespace prefix. Otherwise it is optional.
     * The optional doctype parameter can be used to place a Document Type Declaration in the new document, which may refererence an external DTD.
     * The constructor fails, if doctype is already owned by another document. Otherwise the new document takes exclusive ownership of the passed
     * object and doctype.ownerDocument is set to the new document.
     *
     * **Since:** DOCUMENTS 4.0c (restricted DOM level 1 support)
     * **Since:** DOCUMENTS 5.0f (parameters namespaceURI and doctype)
     *
     * @since DOCUMENTS 4.0c
     * @param rootElementName The (qualified) name for the document element.
     * @param namespaceURI The namespace URI of the document element to create. Can be `null` for documents without namespaces.
     * @param doctype An optional DOMDocumentType object. See remarks
     */
    constructor(rootElementName: string, namespaceURI: string, doctype: DOMDocumentType);
    /**
     * **The Document Type Declaration (see DOMDocumentType) associated with this document.**
     *
     * For documents without a document type declaration the value is `null`. This property is readonly.
     *
     * **Note:** The DOM Level 2 does not support editing the Document Type Declaration. doctype cannot be altered in any way,
     * including through the use of methods inherited from the DOMNode interface.
     * @since DOCUMENTS 5.0f
     */
    doctype: DOMDocumentType;
    /**
     * **The node, which represents the outermost structure element of the document.**
     *
     * This property is readonly.
     *
     * **Note:** Unlike written in older versions of this document, the documentElement is not necessarily the first child of the DOMDocument.
     * A DocumentType node, for example, may precede it in the list of direct children.
     * @since DOCUMENTS 4.0d
     */
    documentElement: DOMElement;
    /**
     * **Create a new atttribute within this document.**
     *
     * @since DOCUMENTS 4.0c
     * @param name The name of the attribute.
     * @returns A new DOMAttr object, which may initially appear anywhere or nowhere in the DOM tree.
     * @throws
     * @see {@link DOMElement.setAttributeNode | DOMElement.setAttributeNode()} to place the node within the tree.
     */
    createAttribute(name: string): DOMAttr;
    /**
     * **Creates a DOMAttr of the given qualified name and namespace URI.**
     *
     * **Note:** The new object is initialized with the following attributes.
     *
     * | Attribute            | Value                                                                  |
     * |----------------------|------------------------------------------------------------------------|
     * | DOMNode.nodeName     | qualifiedName                                                          |
     * | DOMNode.namespaceURI | namespaceURI                                                           |
     * | DOMNode.prefix       | prefix, extracted from qualifiedName, or `null` if there is no prefix  |
     * | DOMNode.localName    | local name, extracted from qualifiedName                               |
     * | DOMAttr.name         | qualifiedName                                                          |
     * | DOMNode.nodeValue    | the empty string                                                       |
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI (String) of the attribute to create
     * @param qualifiedName The qualified name (String) of the attribute to instantiate.
     * @returns A new DOMAttr object.
     * @throws
     */
    createAttributeNS(namespaceURI: string, qualifiedName: string): DOMElement;
    /**
     * **Create a new CDATA section within this document.**
     *
     * **Remarks about W3C conformity**
     * The W3C specifies the return type as "CDATASection". Considering code size the actual API omits a class CDATASection
     * and presents the only additional member (splitText(), inherited from "Text") directly in the second level base class.
     * Scripts can examine {@link DOMNode.nodeType} to distinguish different types of character data, if necessary.
     * @since DOCUMENTS 4.0c
     * @param data The data for the node
     * @returns A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree.
     * @throws
     * @see {@link DOMNode.appendChild} and {@link DOMNode.insertBefore} to place the node within the tree.
     */
    createCDATASection(data: string): DOMCharacterData;
    /**
     * **Create a new comment node within this document.**
     *
     * **Remarks about W3C conformity**
     * The W3C specifies the return type as "Comment". Considering code size the actual API omits a class DOMComment,
     * which would not get any more members apart from the inherited ones. Scripts can examine {@link DOMNode.nodeType} to
     * distinguish different types of character data, if necessary.
     * @since DOCUMENTS 4.0c
     * @param data The data for the node
     * @returns A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree.
     * @see {@link DOMNode.appendChild} and {@link DOMNode.insertBefore} to place the node within the tree.
     */
    createComment(data: string): DOMCharacterData;
    /**
     * **Creates an empty DocumentFragment object.**
     *
     * **Remarks about W3C conformity**
     * The interface "DocumentFragment" in the "W3C DOM level 2 core" is virtually the same as "Node". This API omits
     * a separate class "DOMDocumentFragment" to avoid code duplication. If a script needs to distinguish document fragments
     * from other nodes, it can compare {@link DOMNode.nodeType} with the constant {@link DOMNode.DOCUMENT_FRAGMENT_NODE}.
     * @since DOCUMENTS 5.0f
     * @returns A DOMNode object, representing the new DocumentFragment
     */
    createDocumentFragment(): DOMNode;
    /**
     * **Create a new DOMElement within this document.**
     *
     * @since DOCUMENTS 4.0c
     * @param tagName The name of the element.
     * @returns A new DOMElement, which may initially appear anywhere or nowhere in the DOM tree.
     * @throws
     * @see {@link DOMNode.appendChild} and {@link DOMNode.insertBefore} to place the node within the tree.
     */
    createElement(tagName: string): DOMElement;
    /**
     * **Creates an element of the given qualified name and namespace URI.**
     *
     * **Note:** The new element is initialized with the following attributes.
     *
     * | Attribute            | Value                                                                  |
     * |----------------------|------------------------------------------------------------------------|
     * | DOMNode.nodeName     | qualifiedName                                                          |
     * | DOMNode.namespaceURI | namespaceURI                                                           |
     * | DOMNode.prefix       | prefix, extracted from qualifiedName, or `null` if there is no prefix  |
     * | DOMNode.localName    | local name, extracted from qualifiedName                               |
     * | DOMElement.tagName   | qualifiedName                                                          |
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI (String) of the element to create
     * @param qualifiedName The qualified name (String) of the element to instantiate.
     * @returns A new DOMElement object.
     * @throws
     */
    createElementNS(namespaceURI: string, qualifiedName: string): DOMElement;
    /**
     * **Creates an EntityReference object.**
     *
     * In addition, if the referenced entity is known, the child list of the EntityReference node is made the same as that of the corresponding Entity node.
     *
     * **Note:** If any descendant of the Entity node has an unbound namespace prefix, the corresponding descendant of the created EntityReference node is
     * also unbound (its namespaceURI is null). The DOM Level 2 does not support any mechanism to resolve namespace prefixes.**Remarks about W3C conformity**
     *
     * The interface "EntityReference" in the "W3C DOM level 2 core" is virtually the same as "Node". This API omits a separate class "DOMEntityReference"
     * to avoid code duplication. If a script needs to distinguish entity references from other nodes, it can compare {@link DOMNode.nodeType}
     * with the constant {@link DOMNode.ENTITY_REFERENCE_NODE}.
     * @since DOCUMENTS 5.0f
     * @param name The name of the entity to reference.
     * @returns A DOMNode object representing the new EntityReference
     * @throws
     */
    createEntityReference(name: string): DOMNode;
    /**
     * **Creates a DOMProcessingInstruction node given the specified name and data strings.**
     *
     * @since DOCUMENTS 5.0f
     * @param target The target part of the processing instruction.
     * @param data The data for the node.
     * @returns DOMProcessingInstruction The new object
     * @throws
     */
    createProcessingInstruction(target: string, data: string): DOMProcessingInstruction;
    /**
     * **Create a new text node within this document.**
     *
     * **Remarks about W3C conformity**
     * The W3C specifies the return type as "Text". Considering code size the actual API omits a class DOMText
     * and presents the only additional member (splitText()) directly in the base class. Scripts can examine
     * {@link DOMNode.nodeType} to distinguish different types of character data, if necessary.
     * @since DOCUMENTS 4.0c
     * @param data The data for the node
     * @returns A new DOMCharacterData object, which may initially appear anywhere or nowhere in the DOM tree.
     * @see {@link DOMNode.appendChild} and {@link DOMNode.insertBefore} to place the node within the tree.
     */
    createTextNode(data: string): DOMCharacterData;
    /**
     * **Returns the DOMElement whose ID is given by elementId.**
     *
     * Returns `null` if no such element exists. Behavior is not defined if more than one element has this ID.
     *
     * **Note:** The DOM implementation must have information that says which attributes are of type ID.
     * Attributes with the name "ID" are not of type ID unless so defined. Implementations that do not know
     * whether attributes are of type ID or not are expected to return `null`.
     * @since DOCUMENTS 5.0f
     * @param elementId The unique id value for an element.
     * @returns The matching element.
     */
    getElementById(elementId: string): DOMElement;
    /**
     * **List all DOMElements in the document with a certain tag name.**
     *
     * The order of the elements in the returned list corresponds to a preorder traversal of the DOM tree.
     * @since DOCUMENTS 4.0c
     * @param tagName The name to match on. The special value "*" matches all tags.
     * @returns A dynamic list of the found elements.
     * @see {@link DOMNodeList | DOMNodeList}
     */
    getElementsByTagName(tagName: string): DOMNodeList;
    /**
     * **List all DOMElements in the document with a given local name and namespace URI.**
     *
     * The order of the elements in the returned list corresponds to a preorder traversal of the DOM tree.
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the elements to match on. The special value "*" matches all namespaces.
     * @param localName The local name of the elements to match on. The special value "*" matches all local names.
     * @returns A new DOMNodeList object containing all the matched DOMElements.
     */
    getElementsByTagNameNS(namespaceURI: string, localName: string): DOMNodeList;
    /**
     * **Import a node from another document to this document.**
     *
     * The returned node has no parent. Its parentNode is `null`. The source node is not altered or removed from the original document.
     * This method creates a new copy of the source node. Additional information is copied as appropriate to the nodeType.
     *
     * **Note:** Some node types cannot be imported (a whole DOMDocument for example). Copying child nodes may be restricted or mandatory
     * for a specific node type. Further Reading: http://www.w3.org/TR/DOM-Level-2-Core/core.html#Core-Document-importNode
     * @since DOCUMENTS 5.0f
     * @param source The node to copy.
     * @param deep Boolean value to request a deep copy with child nodes, if desired.
     * @returns The imported node that belongs to this document.
     * @throws
     */
    importNode(source: DOMNode, deep: boolean): DOMNode;
}
/**
 * This class describes a Document Type Declaration associated with a DOMDocument.
 *
 * Each DOMDocument has a doctype attribute whose value is either `null` or a DOMDocumentType object. The DOMDocumentType class provides
 * an interface to the list of entities that are defined for the document, and little else. The DOM Level 2 doesn't support editing DocumentType nodes.
 *
 * **Remarks about W3C conformity**
 *
 * DOCUMENTS allows creating DOMDocumentType objects directly with `new`. The constructor function replaces the W3C recommended function
 * `DOMImplementation.createDocumentType()`. Nodes listed in the notations property reuse the prototype of DOMEntity. Otherwise this class
 * conforms to the DocumentType interface in the W3C DOM level 2 specification.
 */
declare class DOMDocumentType {
    /**
     * **Creates an empty DocumentType node.**
     *
     * Entity declarations and notations are not made available. Entity reference expansions and default attribute additions do not occur.
     * It is expected that a future version of the DOM will provide a way for populating a DocumentType.
     *
     * **Note:** The returned object can be forwarded to the DOMDocument constructor to create a document with a reference to an external DTD.
     * Otherwise there is actually no benefit of creating nodes of this type directly.
     *
     * **Since:** DOCUMENTS 5.0f
     * @since DOCUMENTS 5.0f
     * @param qualifiedName String with the qualified name of the document type to be created.
     * @param publicId String with the external subset public identifier.
     * @param systemId String with the external subset system identifier.
     */
    constructor(qualifiedName: string, publicId: string, systemId: string);
    /**
     * **A DOMNamedNodeMap containing the general entities, both external and internal, declared in the DTD.**
     *
     * Parameter entities are not contained. This property is readonly.
     *
     * **Note:** Duplicates are discarded. For example in:
     * ` <!DOCTYPE ex SYSTEM "ex.dtd" [ <!ENTITY foo "foo"> <!ENTITY bar "bar"> <!ENTITY bar "bar2"> <!ENTITY % baz "baz"> ]> <ex/>
     * ` the interface provides access to foo and the first declaration of bar but not the second declaration of bar or baz. Every
     * node in this map also is an instance of DOMEntity. The DOM Level 2 does not support editing entities, therefore entities cannot be altered in any way.
     */
    entities: DOMNamedNodeMap;
    /**
     * **The internal subset as a string.**
     *
     * This property is readonly.
     *
     * **Note:** The actual content returned depends on how much information is available to the implementation.
     * This may vary depending on various parameters, including the XML processor used to build the document.
     */
    internalSubset: string;
    /**
     * **The name of DTD; i.e., the name immediately following the DOCTYPE keyword.**
     *
     * This property is readonly.
     */
    name: string;
    /**
     * **A DOMNamedNodeMap containing the notations declared in the DTD.**
     *
     * This property is readonly.
     *
     * **Note:** Duplicates are discarded. Every node in this map also implements the Notation interface.
     * The DOM Level 2 does not support editing notations, therefore notations cannot be altered in any way.**Remarks about W3C conformity**
     *
     * This API omits a separate class "DOMNotation" to avoid code duplication. Differing from the W3C standard the nodes in the returned map
     * are DOMEntity instances, having the attribute DOMEntity.notationName set to `undefined`.
     * To distinguish notation nodes from other nodes scripts can compare the attribute DOMNode.nodeType with the constant DOMNode.NOTATION_NODE.
     */
    notations: DOMNamedNodeMap;
    /**
     * **The public identifier of the external subset.**
     *
     * This property is readonly.
     */
    publicId: string;
    /**
     * **The system identifier of the external subset.**
     *
     * This property is readonly.
     */
    systemId: string;
}
/**
 * **An object of this class represents a HTML or XML element in the DOM.**
 *
 * DOMElements cannot be created directly. This applies to almost all kinds of DOMNodes.
 * **Remarks about W3C conformity**
 * The class conforms to the Element interface of DOM level 2.
 *
 * **Since:** DOCUMENTS 4.0c (DOM level 1)
 * **Since:** DOCUMENTS 5.0f (DOM level 2)
 *
 * @since DOCUMENTS 4.0c
 */
declare interface DOMElement {
    /**
     * **The name of the element.**
     *
     * This property is readonly.
     * @since DOCUMENTS 4.0c
     */
    tagName: string;
    /**
     * **Get the string value of an attribute of this element.**
     *
     * @since DOCUMENTS 4.0c
     * @param name The name of the attribute
     * @returns The atrribute's value or the empty string, if the attribute is not specified and has not got a default value.
     */
    getAttribute(name: string): string;
    /**
     * **Get an attribute of this element.**
     *
     * @param name The attribute's name
     * @returns The object, which represents the attribute in the DOM. If no attribute of the given name exists, the value is `null`.
     */
    getAttributeNode(name: string): DOMAttr;
    /**
     * **Retrieves a DOMAttr node by local name and namespace URI.**
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the attribute to retrieve.
     * @param localName The local name of the attribute to retrieve.
     * @returns The DOMAttr node with the specified local name and namespace URI or `null` if there is no such attribute.
     */
    getAttributeNodeNS(namespaceURI: string, localName: string): DOMAttr;
    /**
     * **Retrieves an attribute value by local name and namespace URI.**
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the attribute to retrieve.
     * @param localName The local name of the attribute to retrieve.
     * @returns The attribute's value as a string, or the empty string if that attribute does not have a specified or default value.
     */
    getAttributeNS(namespaceURI: string, localName: string): string;
    /**
     * **List all DOMElements in the subtree with a certain tag name.**
     *
     * The order of the elements in the returned list corresponds to a preorder traversal of the DOM tree.
     * @since DOCUMENTS 4.0c
     * @param tagName The name to match on. The special value "*" matches all tags.
     * @returns A dynamic list of the found elements.
     * @see {@link DOMNodeList | DOMNodeList}
     */
    getElementsByTagName(tagName: string): DOMNodeList;
    /**
     * **Returns a DOMNodeList of all the descendant DOMElements with a given local name and namespace URI.**
     *
     * The elements are listed in the order in which they are encountered in a preorder traversal of this element tree.
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the elements to match on. The special value "*" matches all namespaces.
     * @param localName The local name of the elements to match on. The special value "*" matches all local names.
     * @returns A new DOMNodeList object containing all the matched DOMElements.
     */
    getElementsByTagNameNS(namespaceURI: string, localName: string): DOMNodeList;
    /**
     * **Test whether an attribute with the given name is specified on this element or has a default value.**
     *
     * @since DOCUMENTS 5.0f
     * @param name The name of the attribute to look for.
     * @returns `true` if an attribute with the given name is specified on this element or has a default value, `false` otherwise.
     */
    hasAttribute(name: string): boolean;
    /**
     * **Test whether an attribute with the given local name and namespace URI is specified on this element or has a default value.**
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the attribute to look for.
     * @param localName The local name of the attribute to look for.
     * @returns `true` if an attribute with given parameters is specified on this element or has a default value, `false` otherwise.
     */
    hasAttributeNS(namespaceURI: string, localName: string): boolean;
    /**
     * **Remove an attribute from this element by name.**
     *
     * @since DOCUMENTS 4.0c
     * @param name The attribute's name
     * @returns
     * @throws
     */
    removeAttribute(name: string): void;
    /**
     * **Remove an attribute node from this element.**
     *
     * @since DOCUMENTS 4.0c
     * @param oldAttr The attribute object to remove
     * @returns The removed attribute node.
     * @throws
     */
    removeAttributeNode(oldAttr: DOMAttr): DOMAttr;
    /**
     * **Removes an attribute by local name and namespace URI.**
     *
     * If the removed attribute has a default value it is immediately replaced. The replacing attribute has the same namespace URI and local name, as well as the original prefix.
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the attribute to remove.
     * @param localName The local name of the attribute to remove.
     * @returns No return value.
     * @throws
     */
    removeAttributeNS(namespaceURI: string, localName: string): any;
    /**
     * **Set an attribute of this element by string.**
     *
     * If an attribute of the given name exists, the method only updates its value. Otherwise it creates the attribute.
     * @since DOCUMENTS 4.0c
     * @param name The attribute's name
     * @param value The new value of the attribute
     * @returns
     * @throws
     */
    setAttribute(name: string, value: string): void;
    /**
     * **Attach an attribute node to this element.**
     *
     * @since DOCUMENTS 4.0c
     * @param newAttr The DOMAttr object, which defines the attribute to add or replace.
     * @returns The formerly attached DOMAttr, if the call has replaced an attribute with the same name. Otherwise the method returns `null`.
     * @throws
     */
    setAttributeNode(newAttr: DOMAttr): DOMAttr;
    /**
     * **Adds a new attribute.**
     *
     * If an attribute with that local name and that namespace URI is already present in the element, it is replaced by the new one.
     * @since DOCUMENTS 5.0f
     * @param newAttr The DOMAttr node to add to the attribute list.
     * @returns If the newAttr replaces an existing attribute with the same local name and namespace URI, the replaced DOMAttr node is returned, otherwise `null` is returned.
     * @throws
     */
    setAttributeNodeNS(newAttr: DOMAttr): DOMAttr;
    /**
     * **Adds a new attribute or overwrites it.**
     *
     * If an attribute with the same local name and namespace URI is already present on the element, its prefix is changed to be the prefix part of the qualifiedName,
     * and its value is changed to be the value parameter.
     *
     * **Note:** The assigned value is a simple string; it is not parsed as it is being set. So any markup (such as syntax to be recognized as an entity reference)
     * is treated as literal text. In order to assign an attribute value that contains entity references, the user must create a {@link DOMAttr} node plus any Text and
     * EntityReference nodes, build the appropriate subtree, and use {@link setAttributeNodeNS | setAttributeNodeNS()} or {@link setAttributeNode | setAttributeNode()}
     * to assign it as the value of an attribute.
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the attribute to create or alter.
     * @param qualifiedName The qualified name of the attribute to create or alter.
     * @param value The value to set in string form.
     * @returns No return value.
     * @throws
     */
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): any;
}
/**
 * **Objects of this class represent either an entity in an XML document or a notation in a DTD.**
 *
 * If the inherited attribute {@link DOMNode.nodeType} equals {@link DOMNode.ENTITY_NODE} the object represents an entity, either parsed or unparsed, in an XML document.
 * This models the entity itself not the entity declaration.
 * The {@link DOMNode.nodeName} attribute contains the name of the entity. If the inherited attribute DOMNode.nodeType equals DOMNode.NOTATION_NODE the object represents
 * a notation declared in the DTD. A notation either declares, by name, the format of an unparsed entity (according to section 4.7 of the XML 1.0 specification),
 * or is used for formal declaration of processing instruction targets (according to section 2.6 of the XML 1.0 specification). The DOMNode.nodeName attribute is
 * set to the declared name of the notation.
 *
 * **Note:** If an entity contains an unbound namespace prefix, the namespaceURI of the corresponding node in the Entity node subtree is `null`.
 * The same is true for EntityReference nodes that refer to this entity, when they are created using
 * the {@link DOMDocument.createEntityReference | DOMDocument.createEntityReference()} method. The DOM Level 2 does not support any mechanism to resolve namespace prefixes.
 *
 * **Note:** An XML processor may choose to completely expand entities before the structure model is passed to the DOM. In this case there will
 * be no EntityReference nodes in the document tree. XML does not mandate that a non-validating XML processor read and process entity declarations
 * made in the external subset or declared in external parameter entities. This means that parsed entities declared in the external subset need not
 * be expanded by some classes of applications, and that the replacement value of the entity may not be available. When the replacement value is available,
 * the corresponding Entity node's child list represents the structure of that replacement text. Otherwise, the child list is empty. The DOM Level 2 does
 * not support editing Entity nodes; if a user wants to make changes to the contents of an Entity, every related EntityReference node has to be replaced
 * in the structure model by a clone of the Entity's contents, and then the desired changes must be made to each of those clones instead. Entity nodes and
 * all their descendants are readonly. Entity nodes and notation nodes do not have any parent.**Remarks about W3C conformity**
 *
 * This API omits a separate class "DOMNotation" to avoid code duplication. Differing from the W3C standard the DOMEntity class is also used for notation nodes.
 * To distinguish notation nodes from other nodes scripts can compare the attribute DOMNode.nodeType with the constant DOMNode.NOTATION_NODE.
 * @since DOCUMENTS 5.0f
 */
declare interface DOMEntity {
    /**
     * **For unparsed entities, the name of the notation for the entity.**
     *
     * For parsed entities this is `null`. For notation nodes the value is `undefined`.
     * This property is readonly.
     */
    notationName: string;
    /**
     * **The public identifier associated with the (entity or notation) node, if specified.**
     *
     * If the public identifier was not specified, this is `null`. This property is readonly.
     */
    publicId: string;
    /**
     * **The system identifier associated with the (entity or notation) node, if specified.**
     *
     * If the system identifier was not specified, this is `null`. This property is readonly.
     */
    systemId: string;
}
/**
 * **Many of the DOM API functions throw a DOMException, when an error has occurred.**
 *
 * **Remarks about W3C conformity**
 * The class implements the DOMException exception type with the error codes specified in DOM level 2.
 * @since DOCUMENTS 4.0c
 *
 * @groupDescription Error Code Constants
 * All these constants are also available as properties of the constructor.
 * **Since** DOCUMENTS 4.0c
 */
declare interface DOMException {
    /**
     * @group Error Code Constants
     */
    INDEX_SIZE_ERR: number;
    /**
     * @group Error Code Constants
     */
    DOMSTRING_SIZE_ERR: number;
    /**
      * @group Error Code Constants
     */
    HIERARCHY_REQUEST_ERR: number;
    /**
     * @group Error Code Constants
     */
    WRONG_DOCUMENT_ERR: number;
    /**
     * @group Error Code Constants
     */
    INVALID_CHARACTER_ERR: number;
    /**
     * @group Error Code Constants
     */
    NO_DATA_ALLOWED_ERR: number;
    /**
     * @group Error Code Constants
     */
    NO_MODIFICATION_ALLOWED_ERR: number;
    /**
     * @group Error Code Constants
     */
    NOT_FOUND_ERR: number;
    /**
     * @group Error Code Constants
     */
    NOT_SUPPORTED_ERR: number;
    /**
     * @group Error Code Constants
     */
    INUSE_ATTRIBUTE_ERR: number;
    /**
     * @group Error Code Constants
     */
    INVALID_STATE_ERR: number;
    /**
     * @group Error Code Constants
     */
    SYNTAX_ERR: number;
    /**
     * @group Error Code Constants
     */
    INVALID_MODIFICATION_ERR: number;
    /**
     * @group Error Code Constants
     */
    NAMESPACE_ERR: number;
    /**
     * @group Error Code Constants
     */
    INVALID_ACCESS_ERR: number;
    /**
     * @group Error Code Constants
     */
    VALIDATION_ERR: number;
    /**
     * **An error code.**
     *
     * See the {@link DOMParser.ErrCatDOM | `Error Constants`} in this class.
     * @since DOCUMENTS 4.0c
     */
    readonly code: number;
    /**
     * **An error message.**
     *
     * @since DOCUMENTS 4.0c
     */
    readonly message: string;
}
/**
 * **A DOMNamedNodeMap is a kind of index for a set of DOMNodes, in which each node has got a unique name.**
 *
 * The attributes of a DOMElement are organized in a DOMNamedNodeMap. See DOMElement.attributes. The attached nodes can
 * be accessed either by the name or by an integer index. When using an index, the output order of the nodes is not determined.
 * Objects of this class cannot be created directly.
 * **Remarks about W3C conformity**
 * This class conforms to the NamedNodeMap interface of DOM level 2.
 *
 * **Since:** DOCUMENTS 5.0f (DOM level 2)
 * @since DOCUMENTS 4.0c (DOM level 1)
 */
declare interface DOMNamedNodeMap {
    /**
     * **The number of nodes in the map.**
     *
     * This property is readonly.
     * @since DOCUMENTS 4.0c
     */
    length: number;
    /**
     * **Get a node from the map by its unique name.**
     *
     * @since DOCUMENTS 4.0c
     * @param name The name.
     * @returns The node, respectively `null`, if no node with the name is in the map.
     */
    getNamedItem(name: string): DOMNode;
    /**
     * **Retrieves a node specified by local name and namespace URI.**
     *
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the node to retrieve.
     * @param localName The local name of the node to retrieve.
     * @returns A DOMNode (of any type) with the specified local name and namespace URI, or `null` if they do not identify any node in this map.
     */
    getNamedItemNS(namespaceURI: string, localName: string): DOMNode;
    /**
     * **Get the a node from the map at a certain position.**
     *
     * This is useful only to iterate over all nodes in the map.
     *
     * **Note:** It is also possible to access the nodes using square brackets, as if the object would be an array.
     * @since DOCUMENTS 4.0c
     * @param index the zero based index of the element.
     * @returns The requested DOMNode Object. If the index is invalid, the method returns `null`.
     */
    item(index: number): DOMNode;
    /**
     * **Remove a node from the map.**
     *
     * @since DOCUMENTS 4.0c
     * @param name The unique node name.
     * @returns The removed node.
     * @throws
     */
    removeNamedItem(name: string): DOMNode;
    /**
     * **Removes a node specified by local name and namespace URI.**
     *
     * **Note:** A removed attribute may be known to have a default value when this map contains the attributes attached to an element,
     * as returned by the DOMNode.attributes attribute. If so, an attribute immediately appears containing the default value as well as
     * the corresponding namespace URI, local name, and prefix when applicable.
     * @since DOCUMENTS 5.0f
     * @param namespaceURI The namespace URI of the node to remove.
     * @param localName The local name of the node to remove.
     * @returns The node removed from this map, if a node with such a local name and namespace URI exists.
     * @throws
     */
    removeNamedItemNS(namespaceURI: string, localName: string): DOMNode;
    /**
     * **Add a node to the map or replace an existing one.**
     *
     * @since DOCUMENTS 4.0c
     * @param arg The node to add. The name for indexing is the value of the attribute DOMNode.nodeName,
     * @returns If a node with the same name has already been added, the method removes that node and returns it. Otherwise it returns `null`.
     * @throws
     */
    setNamedItem(arg: DOMNode): DOMNode;
    /**
     * **Adds a node using its namespaceURI and localName.**
     * If a node with that namespace URI and that local name is already present in this map, it is replaced by the new one.
     * @since DOCUMENTS 5.0f
     * @param arg A node to store in this map. The node will later be accessible using the value of its namespaceURI and localName attributes.
     * @returns If the new node replaces an existing node the replaced node is returned, otherwise `null` is returned.
     * @throws
     */
    setNamedItemNS(arg: DOMNode): DOMNode;
}
/**
 * **DOMNode is the base class of all tree elements in a DOMDocument.**
 *
 * DOMNodes cannot be created with `new`. Different create methods of DOMDocument can be used to create different types of nodes.
 * As an exception the subclasses DOMDocument and DOMDocumentType have a constructor.
 *
 * **Note:** Accessing any node may generate a JavaScript error, when the owning document has been deleted or "garbage collected". See the negative example at class DOMDocument.
 *
 * **Remarks about W3C conformity**
 *
 * The class widely conforms to the Node interface of DOM level 2. Only the function isSupported() does not work as expected. It should not be used.
 * The above-mentioned constructors of DOMDocument and DOMDocumentType are non-standard. They are a simplifying substitute of the unsupported standard interface `DOMImplementation`.
 *
 * **Since:** DOCUMENTS 5.0f (DOM level 2)
 * @since DOCUMENTS 4.0c (DOM level 1)
 *
 * @groupDescription Node Type Constants
 * These constants build an enumeration of the possible values of the property nodeType. The constants are also properties of the constructor,
 * so it is possible to read them in the style `DOMNode.ELEMENT_NODE`.
 */
declare interface DOMNode {
    /**
     * Constant for the nodeType "Element". The actual subclass is {@link DOMElement}.
     * @group Node Type Constants
     */
    ELEMENT_NODE: number;
    /**
     * Constant for the nodeType "Attr". The actual subclass is {@link DOMAttr}.
     * @group Node Type Constants
     */
    ATTRIBUTE_NODE: number;
    /**
     * Constant for the nodeType "Text". The actual subclass is {@link DOMCharacterData}, differing from the standard.
     * @group Node Type Constants
     */
    TEXT_NODE: number;
    /**
     * Constant for the nodeType "CDATASection". The actual subclass is {@link DOMCharacterData}, differing from the standard.
     * @group Node Type Constants
     */
    CDATA_SECTION_NODE: number;
    /**
     * Constant for the nodeType "EntityReference". The actual implementation does not provide a subclass for this type.
     * @group Node Type Constants
     */
    ENTITY_REFERENCE_NODE: number;
    /**
     * Constant for the nodeType "Entity".  The actual subclass is {@link DOMEntity}.
     * @group Node Type Constants
     */
    ENTITY_NODE: number;
    /**
     * Constant for the nodeType "ProcessingInstruction". The actual subclass is {@link DOMProcessingInstruction}.
     * @group Node Type Constants
     */
    PROCESSING_INSTRUCTION_NODE: number;
    /**
     * Constant for the nodeType "Comment". The actual subclass is {@link DOMCharacterData}, differing from the standard.
     * @group Node Type Constants
     */
    COMMENT_NODE: number;
    /**
     * Constant for the nodeType "Document". The actual subclass is {@link DOMDocument}.
     * @group Node Type Constants
     */
    DOCUMENT_NODE: number;
    /**
     * Constant for the nodeType "DocumentType". The actual subclass is {@link DOMDocumentType}.
     * @group Node Type Constants
     */
    DOCUMENT_TYPE_NODE: number;
    /**
     * Constant for the nodeType "DocumentFragment". The actual implementation does not provide a subclass for this type.
     * @group Node Type Constants
     */
    DOCUMENT_FRAGMENT_NODE: number;
    /**
      * Constant for the nodeType "Notation". The actual subclass is {@link DOMEntity}, differing from the standard.
      * @group Node Type Constants
      */
    NOTATION_NODE: number;
    /**
     * **A map of DOM attributes. If this node is not a {@link DOMElement}, the value is `null`. The property is readonly.**
     *
     */
    attributes: DOMNamedNodeMap;
    /**
     * **A list of all children of this node. The property is readonly.**
     *
     */
    childNodes: DOMNode[];
    /**
     * **The first child node, otherwise `null`. The property is readonly.**
     *
     */
    firstChild: DOMNode;
    /**
     * **The last child node, otherwise `null`. The property is readonly.**
     *
     */
    lastChild: DOMNode;
    /**
     * **The local part of the qualified name of this node.**
     *
     * This property is readonly.
     *
     * **Note:** For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE and nodes created with a DOM Level 1 method,
     * such as {@link DOMDocument.createElement | DOMDocument.createElement()}, this is always `null`.
     * @since DOCUMENTS 5.0f
     */
    localName: string;
    /**
     * **The namespace URI of this node, or `null` if it is unspecified.**
     *
     * This property is readonly.
     *
     * **Note:** This is not a computed value that is the result of a namespace lookup based on an examination of the namespace declarations in scope.
     * It is merely the namespace URI given at creation time. Per the "Namespaces in XML" Specification an attribute does not inherit its namespace
     * from the element it is attached to. If an attribute is not explicitly given a namespace, it simply has no namespace.
     *
     * **Note:** For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE and nodes created with a DOM Level 1 method,
     * such as {@link DOMDocument.createElement | DOMDocument.createElement()}, this is always `null`.
     * @since DOCUMENTS 5.0f
     */
    namespaceURI: string;
    /**
     * **The next sibling node, otherwise `null`. The property is readonly.**
     *
     */
    nextSibling: DOMNode;
    /**
     * **The name of this node. The property is readonly.**
     *
     */
    nodeName: string;
    /**
     * **The type or subclass of a this node, encoded as an integer. The property is readonly.**
     *
     */
    nodeType: number;
    /**
     * **The value of the node, which depends on the type.**
     *
     * For several node types, the value is constantly an empty string.
     * See also the [W3C documentation in the internet](http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html).
     */
    nodeValue: string;
    /**
     * **The document, which owns this node. The property is readonly.**
     *
     */
    ownerDocument: DOMDocument;
    /**
     * **The parent node or `null`. The property is readonly.**
     *
     */
    parentNode: DOMNode;
    /**
     * **The namespace prefix of this node, or `null` if it is unspecified.**
     *
     * **Note:** Note that setting this attribute, when permitted, changes the {@link nodeName} attribute, which holds the qualified name,
     * as well as the {@link DOMElement.tagName} and {@link DOMAttr.name} attributes, when applicable. Note also that changing the prefix of an attribute
     * that is known to have a default value, does not make a new attribute with the default value and the original prefix appear,
     * since the namespaceURI and localName do not change.
     *
     * **Note:** For nodes of any type other than ELEMENT_NODE and ATTRIBUTE_NODE and nodes created with a DOM Level 1 method,
     * such as{@link DOMDocument.createElement | DOMDocument.createElement()}, this is always `null`.
     * @since DOCUMENTS 5.0f
     */
    prefix: string;
    /**
     * **The previous sibling node, otherwise `null`. The property is readonly.**
     *
     */
    previousSibling: DOMNode;
    /**
     * **Append a new node to the list of child nodes.**
     *
     * @since DOCUMENTS 4.0c
     * @param newChild The DOMNode to append.
     * @returns The node added.
     * @throws
     */
    appendChild(newChild: DOMNode): DOMNode;
    /**
     * **Create a duplicate of this node.**
     *
     * **Note:** The returned node initially has not got a parent.
     * @since DOCUMENTS 4.0c
     * @param deep `true` to clone also the whole subtree, `false` to clone only the node (including the attributes, if it is a DOMElement).
     * @returns The copy. The actual type equals the type of `this`.
     * @see {@link DOMDocument.importNode | DOMDocument.importNode(DOMNode source, boolean deep)} to copy nodes from another document.
     */
    cloneNode(deep: boolean): DOMNode;
    /**
     * **Test, whether a node has got any associated attributes.**
     *
     * @since DOCUMENTS 4.0c
     * @returns
     */
    hasAttributes(): boolean;
    /**
     * **Test, whether a node has got any associated child nodes.**
     *
     * @since DOCUMENTS 4.0c
     * @returns
     */
    hasChildNodes(): boolean;
    /**
     * **Insert a new node into the list of child nodes.**
     *
     * @since DOCUMENTS 4.0c
     * @param newChild The DOMNode to insert.
     * @param refChild An existing DOMNode, which already is a child of `this`, and which shall become the next sibling of `newChild`.
     * @returns The node inserted.
     * @throws
     */
    insertBefore(newChild: DOMNode, refChild: DOMNode): DOMNode;
    /**
     * **Normalize the node ans its subtree.**
     *
     * This method restructures a DOMDocument (or a subtree of it) as if the document was written to a string and reparsed from it.
     * Subsequent "Text" nodes without any interjacent markup are combined into one node, for example.
     * @since DOCUMENTS 4.0c
     * @returns
     */
    normalize(): void;
    /**
     * **Remove a node from the list of child nodes.**
     *
     * @since DOCUMENTS 4.0c
     * @param oldChild The child DOMNode being removed.
     * @returns The node removed.
     * @throws
     */
    removeChild(oldChild: DOMNode): DOMNode;
    /**
     * **Replace a node in the list of child nodes.**
     *
     * @since DOCUMENTS 4.0c
     * @param newChild The DOMNode to insert.
     * @param oldChild The child DOMNode being replaced.
     * @returns The node replaced.
     * @throws
     */
    replaceChild(newChild: DOMNode, oldChild: DOMNode): DOMNode;
}
/**
 * **A dynamic, ordered list of DOMNodes.**
 *
 * These lists always reflect the actual state of the DOM tree, which can differ from that state, when the list has been created.
 * Getting the nodes from the list works with an integer index in square brackets, as if the list object would be an Array. DOMNodeLists
 * cannot be created directly. Some methods or properties of DOMNode and its subclasses can create them.
 *
 * **Remarks about W3C conformity**
 * The class covers the NodeList interface of DOM level 2.
 * @since DOCUMENTS 4.0c
 */
declare interface DOMNodeList {
    /**
     * **The actual number of nodes in the list.**
     *
     * @since DOCUMENTS 4.0c
     */
    length: number;
    /**
     * **Returns the element at a certain position.**
     *
     * This is just the same as using the square brackets on the object.
     * @since DOCUMENTS 4.0c
     * @param index The zero-based position of the requested element
     * @returns The DOMNode at the requested index. In the case of an invalid index the return value is `null`.
     */
    item(index: number): DOMNode;
}
/**
 * This class provides basic methods to parse or synthesize XML documents using the Document Object Model (DOM).
 * @see [XML-DOM Example](../xml-dom.html)
 * @since DOCUMENTS 4.0c
 *
 * @groupDescription Error Constants
 * In contrast to many other methods of the DOM API, the {@link parse | parse()} method does not forward exceptions of the native parser to the calling script.
 * It rather stores the error text in a buffer, which the script can read with {@link getLastError | getLastError()}. The return value signals the type of the exception,
 * which equals one of these constants. The constants are also properties of the constructor, so it is possible to read them in the style
 * `DOMParser.ErrCatDOM`.
 */
declare class DOMParser {
    /**
     * **The constructor actually takes no arguments.**
     *
     * @since DOCUMENTS 4.0c
     */
    constructor();
    /**
     * This constant with the value zero indicates "no error".
     * @group Error Constants
     */
    ErrCatNone: number;
    /**
     * This constant represents errors detected by interface code outside the native parser.
     * @group Error Constants
     */
    ErrCatEnv: number;
    /**
     * This constant represents a caught exception of the type "XMLException".
     * @group Error Constants
     */
    ErrCatXML: number;
    /**
     * This constant represents a caught exception of the type "SAXException".
     * @group Error Constants
     */
    ErrCatSAX: number;
    /**
     * This constant represents a caught exception of the type "DOMException".
     * @group Error Constants
     */
    ErrCatDOM: number;
    /**
     * **Control flag to enable or disable DTD loading.**
     *
     * If an input document contains a doctype declaration which refers an external DTD, the parser by default attempts to load and parse the DTD
     * (and possibly further files referenced from there). Setting this flag to `false` disables the parsing of external declarations.
     *
     * **Note:** In some cases this flag can prevent a deadlock. See the note at {@link parse | parse()}.
     * @since DOCUMENTS 5.0f
     */
    loadExternalDTD: boolean;
    /**
     * **This returns the root of the DOM tree after a successful call of {@link parse | parse()}, otherwise `null`.**
     *
     * @returns
     */
    getDocument(): DOMDocument;
    /**
     * **This returns the text of the last occurred error.**
     *
     * @returns
     */
    getLastError(): string;
    /**
     * **Parse an XML document, either from a String or from a local file.**
     *
     * **Note:** On success, call {@link getDocument | getDocument()} to access the DOM tree. On error use {@link getLastError | getLastError()} to obtain an error text.
     * The encapsulated native DOM library supports the following character encodings: ASCII, UTF-8, UTF-16, UCS4, EBCDIC code pages IBM037,
     * IBM1047 and IBM1140, ISO-8859-1 (aka Latin1) and Windows-1252. (no guarantee)
     *
     * **Note:** When parsing a doctype declaration with an URL-style systemId such as "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
     * the parser usually attempts to download the referenced definition file and all depedencies. Some public servers ignore these requests
     * in a way, which makes parse() wait forever. Unfortunately there is no timeout option. There are two ways to solve this problem.
     * <ul>
     * <li>Prepare a file system folder with local copies of the needed DTD files. Pre-process the document externally to replace the standard URLs with local "file://..." URLs. </li>
     * <li>Before calling parse(), disable the downloads with the loadExternalDTD property.</li>
     * </ul>
     * @since DOCUMENTS 4.0c
     * @param xml Either the XML itself or the path and file name of a local file
     * @param fromFile `true` to parse a local file, otherwise `false`.
     * @returns An integer, which describes an error category. See {@link ErrCatNone | ErrCatNone} and further constants.
     */
    parse(xml: string, fromFile: boolean): number;
    /**
     * **Build an XML document from a DOM tree.**
     *
     * **Note:** Saving to a local file is not supported on all platforms. If a script tries it while the version of the native DOM library is too old,
     * the method just throws a JavaScript error.
     *
     * **Note:** To obtain an error message use `getLastError()`. When the message is just "NULL pointer", the native DOM library may have failed to open
     * the output file for writing. When the method writes to a string, the encoding is always the server application's internal encoding.
     * The encapsulated native DOM library supports the following character encodings: ASCII, UTF-8, UTF-16, UCS4, EBCDIC code pages IBM037, IBM1047 and
     * IBM1140, ISO-8859-1 (aka Latin1) and Windows-1252. (no guarantee)
     *
     * **Since:** Parameter prettyPrint since DOCUMENTS 5.0b HF3
     * @since DOCUMENTS 4.0c
     * @param node The root node to build the document from. Though the interface accepts any DOMNode, only a DOMDocument should be passed.
     * Otherwise the output may be a fragment which is not a valid XML.
     * @param path Optional path and filename to save the XML in the local file system.
     * @param encoding Optional encoding specification for the file. Only used when <em>path</em> is also specified.
     * @param prettyPrint Optional boolean value.
     * @returns The return type depends on the parameters. After saving to a local file, the method returns a boolean value,
     * which indicates the success of the operation. Otherwise the return value is a String with the XML itself, or an empty string after an error.
     */
    write(node: DOMNode, path: string, encoding: string, prettyPrint: boolean): any;
}
/**
 * **A DOMProcessingInstruction object represents a "processing instruction", used in XML as a way to keep processor-specific information in the text of the document.**
 *
 */
declare interface DOMProcessingInstruction {
    /**
     * **The content of this processing instruction.**
     *
     * This is from the first non white space character after the target to the character immediately preceding the "?>".
     */
    data: string;
    /**
     * **The target of this processing instruction.**
     *
     * XML defines this as being the first token following the markup that begins the processing instruction.
     * This property is readonly.
     */
    target: string;
}
/**
 * Use DOMParser instead.
 * @deprecated XMLParser E4X is deprecated since DOCUMENTS 4.0c and was removed in DOCUMENTS 5.0.
 */
declare interface E4X {
}
/**
 * The Email class allows to create and send an email.
 *
 * All the email settings for the principal (such as SMTP server and authentication) are used when sending an email.
 */
declare class Email {
    /**
     * **Create a new instance of the Email class.**
     *
     * In case of multiple recipients for the parameters `to`, `cc` or `bcc`, the individual email addresses are to be separated by a comma (,).
     * It is not allowed to send an email without any primary recipients specified by the parameter `to`. To send a HTML email the body must begin
     * with the <HTML> tag. Emails in following cases are stored in the folder `Administration > Sent eMails` in the DOCUMENTS Manager:
     *
     * + They are to be sent in the future (specified by `sendingTime`);
     * + Sending them failed;
     * + The parameter `deleteAfterSending` is set to `false`.
     *
     * **Since:** DOCUMENTS 4.0d
     * @since DOCUMENTS 4.0d
     * @example
     * var mail = new Email("receiver@domain.de", "sender@domain.de", "Test", "This is a test email.");
     * mail.addAttachment("log.txt", "C:\\tmp\\changelog.txt");
     * mail.setBCC("somebody1@domain.de,somebody2@domain.com");
     * mail.setDeleteAfterSending(true);
     * if (!mail.send())
     *   util.out(mail.getLastError());
     * @param to String value containing the email addresses of primary recipients.
     * @param from Optional string value containing the sender's email address. If no sender is specified, the default sender for the principal is used.
     * @param subject Optional string value containing the subject of the email.
     * @param body Optional string value containing the content of the email.
     * @param cc Optional string value containing the email addresses of carbon-copy recipients (appearing in the header of the email).
     * @param bcc Optional string value containing the email addresses of blind carbon-copy recipients (remaining invisible to other recipients).
     * @param sendingTime Optional Date object specifying when the email is to be sent. If sending time is not specified, the email will be sent immediately by calling send().
     * @param deleteAfterSending Optional flag indicating whether the email is to be deleted after successful sending. The default value is `true`.
     */
    constructor(to: string, from: string, subject: string, body: string, cc: string, bcc: string, sendingTime: Date, deleteAfterSending: boolean);
    /**
     * **Add an attachment to the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param attachment {@link Document} object or string value containing the attachment name of the Email.
     * @param sourceFilePath Optional string value containing the path of the file to be attached and stored on the server's filesystem
     * in case the first parameter is a string specifying the attachment name. You may only delete this file after calling the function {@link send | send()}.
     *
     * **Note:** This Parameter is ignored in case the first parameter is a {@link Document} object.
     *
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var mail = new Email("receiver@domain.de", "sender@domain.de", "Test", "This is a test.");
     * if (!mail.addAttachment("log.txt", "C:\\tmp\\changelog.txt"))
     *   util.out(mail.getLastError());
     */
    addAttachment(attachment: any, sourceFilePath: string): boolean;
    /**
     * **Get the String value of an attribute of the email.**
     *
     * @since DOCUMENTS 5.0i
     * @param attribute String containing the name of the desired attribute.
     * @returns String containing the value of the desired attribute.
     */
    getAttribute(attribute: string): string;
    /**
     * **Get the description of the last error that occurred.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since DOCUMENTS 4.0d
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Remove the email object from DOCUMENTS.**
     *
     * @since DOCUMENTS 5.0i
     * @returns `true` if successful, `false` in case of any error
     */
    remove(): boolean;
    /**
     * **Send the email to recipients.**
     *
     * @since DOCUMENTS 4.0d
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var mail = new Email("receiver@domain.de");
     * mail.setSubject("Test");
     * mail.setBody("This is a test mail.");
     * if (!mail.send())
     *   util.out(mail.getLastError());
     */
    send(): boolean;
    /**
     * **Set the String value of an attribute of the email to the desired value.**
     *
     * @since DOCUMENTS 5.0i
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Set blind carbon-copy recipients of the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param bcc String containing the email addresses of blind carbon-copy recipients.
     * @returns `true` if successful, `false` in case of any error
     */
    setBCC(bcc: string): boolean;
    /**
     * **Set the content of the email.**
     *
     * **Note:** To send an HTML email, the body text must begin with the <HTML> tag.
     * **Note:** Lines may contain a maximum of 1000 characters (including the 1-2 characters for the line break).
     *
     * @since DOCUMENTS 4.0d
     * @param body String containing the content of the email.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var mail = new Email("receiver@domain.de");
     * mail.setSubject("Test");
     * mail.setBody("<HTML>This is a &#x3c;HTML&#x3e; mail.");
     * if (!mail.send())
     *   util.out(mail.getLastError());
     */
    setBody(body: string): boolean;
    /**
     * **Set carbon-copy recipients of the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param cc String containing the email addresses of carbon-copy recipients.
     * @returns `true` if successful, `false` in case of any error
     */
    setCC(cc: string): boolean;
    /**
     * **Decide on whether the email is to be deleted after successful sending.**
     *
     * @since DOCUMENTS 4.0d
     * @param deleteAfterSending boolean value indicating whether the email is to be deleted after successful sending.
     * @returns `true` if successful, `false` in case of any error
     */
    setDeleteAfterSending(deleteAfterSending: boolean): boolean;
    /**
     * **Set the sender's email address.**
     *
     * @since DOCUMENTS 4.0d
     * @param from String containing the sender's email address.
     * @returns `true` if successful, `false` in case of any error
     */
    setFrom(from: string): boolean;
    /**
     * **Set sending time of the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param sendingTime Date object representing the sending time.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var mail = new Email("receiver@domain.de", "sender@domain.de", "Test", "This is a test.");
     * var actDate = new Date();
     * var newDate = context.addTimeInterval(actDate, 2, "days", false);
     * mail.setSendingTime(newDate);
     */
    setSendingTime(sendingTime: Date): boolean;
    /**
     * **Set the subject of the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param subject String containing the desired subject of the email.
     * @returns `true` if successful, `false` in case of any error
     */
    setSubject(subject: string): boolean;
    /**
     * **Set the primary recipients of the email.**
     *
     * @since DOCUMENTS 4.0d
     * @param to String containing the email addresses of primary recipients.
     * @returns `true` if successful, `false` in case of any error
     */
    setTo(to: string): boolean;
}
/**
 * **The EmailIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS emails by scripting means.**
 *
 * The objects of this class represent lists of Email objects and allow to loop through such a list of emails.
 * The following method returns an EmailIterator: {@link context.getMails | context.getMails}.
 * @since DOCUMENTS 5.0i
 * @example
 * var itMail = context.getMails();
 * if (itMail && itMail.size() > 0)
 * {
 *    for (var mail = itMail.first(); mail; mail = itMail.next())
 *    {
 *       // do something
 *    }
 * }
 */
declare interface EmailIterator {
    /**
     * **Retrieve the first Email object in the EmailIterator.**
     *
     * @since DOCUMENTS 5.0i
     * @returns Email or `null` in case of an empty EmailIterator
     */
    first(): Email;
    /**
     * **Retrieve the next Email object in the EmailIterator.**
     *
     * @since DOCUMENTS 5.0i
     * @returns Email or `null` if end of EmailIterator is reached.
     */
    next(): Email;
    /**
     * **Get the amount of Email objects in the EmailIterator.**
     *
     * @since DOCUMENTS 5.0i
     * @returns integer value with the amount of Email objects in the EmailIterator
     */
    size(): number;
}
/**
 * The File class allows full access to files stored on the Portal Server's filesystem.
 */
declare class File {
    /**
     * **The constructor has the purpose to open a file handle to the desired file.**
     *
     * Once created, you cannot change the access mode of the file handle. If you need to change the access mode, you would have to close the file and reopen it.
     *
     * **Note:** File handles are so-called expensive ressources, thus it is strongly recommanded to close them as soon as possible.
     * Refer to {@link File.close | File.close()} for further information.
     *
     * **Since:** ELC 3.50 / otrisPORTAL 5.0
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param pathFileName String value containing the complete path and filename of the desired file
     * @param mode String representing the access mode for the file handle. Allowed values are:
     *
     * + `r` read mode
     * + `r+` read mode plus write access; if the file does not yet exist, an error is raised
     * + `w` write mode; if the file already exists, it will be completely overwritten
     * + `w+` write mode plus read access; if the file already exists, it will be completely overwritten
     * + `a` write mode with append; if the file does not yet exist, it is created, otherwise the data you write to the file will be appended
     * + `a+` write mode with append plus read access; if the file does not yet exist, it is created, otherwise the data you write to the file will be appended
     * + `t` open the file in text mode (ASCII 127)
     * + `b` open the file in binary mode
     *
     * @param encoding DocumentsOS: optional, should be set to `"utf-8"`. Documents 5: not available.
     *
     * **Default:** DocumentsOS: local encoding, Documents5: utf-8
     * @see {@link File.close | File.close}
     * @example
     * // Text-Sample
     * var fso = new File("c:\\tmp\\test.txt", "w+t");
     * if (!fso.ok())
     *    throw fso.error();
     * var int_val = 65;
     * fso.write("Hello world: ", int_val, "\n");
     * fso.close();
     * // result: test.txt: Hello world: 65
     * // Binary-Sample
     * var fso = new File("c:\\tmp\\test.txt", "w+b");
     * if (!fso.ok())
     *    throw fso.error();
     * var int_val = 65;
     * fso.write("Hello world: ", int_val);
     * fso.close();
     * // result: test.txt: Hello world: A
     * // Binary-Sample with Byte-Array
     * var fso = new File("c:\\tmp\\test.txt", "w+b");
     * if (!fso.ok())
     *    throw fso.error();
     * var byteArr = [];
     * byteArr.push(72);
     * byteArr.push(101);
     * byteArr.push(108);
     * byteArr.push(108);
     * byteArr.push(111);
     * byteArr.push(0);  // 0-Byte
     * byteArr.push(87);
     * byteArr.push(111);
     * byteArr.push(114);
     * byteArr.push(108);
     * byteArr.push(100);
     * fso.write(byteArr);
     * fso.close();
     * // result: test.txt: Hello{0-Byte}World
     * @example
     * var f = new File("file.text", "w", "utf-8");
     * f.writeLine(String.fromCodePoint(0x1f642));
     * f.close();
     */
    constructor(pathFileName: string, mode: string, encoding?: string);
    /**
     * **Close the file handle.**
     *
     * **Note:** Since file handles are so-called expensive ressources it is strongly recommanded to close each file handle you prior created in your scripts as soon as possible.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if successful, `false` in case of any error
     * @see {@link File.constructor}
     */
    close(): boolean;
    /**
     * **Report whether the file pointer points to EOF (end of file).**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if EOF, `false` if not
     */
    eof(): boolean;
    /**
     * **Retrieve the error message of the last file access error as String.**
     *
     * The error message (as long there is one) and its language depend on the operating system used on the Portal Server's machine. If there is no error, the method returns `null`.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns String with the content of the last file access error message, `null` in case of no error
     */
    error(): string;
    /**
     * **Report whether an error occurred while accessing the file handle.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns `true` if no error occurred, `false` in case of any error
     */
    ok(): boolean;
    /**
     * **Retrieve a block of data from the file, containing a maximum of charsNo byte.**
     *
     * After the method has been performed, the data pointer of the file handle is moved right after the block which has been read.
     * This might as well trigger the EOF flag, if the end of file has been reached.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param charsNo integer value indicating how many characters (resp. byte in binary mode) should be read
     * @returns String containing up to `charsNo` characters/byte of data of the file.
     */
    read(charsNo?: number): string;
    /**
     * **Retrieve one line of data from the file.**
     *
     * This method requires to have the file opened in text mode to work flawlessly, because the end of line is recognized by the linefeed character.
     * After the readLine() method has been performed, the data pointer of the file handle is moved to the beginning of the next line of data.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns String containing one line of data of the file.
     */
    readLine(): string;
    /**
     * **Write binary data to the file.**
     *
     * This requires to have the file handle opened with write access (meaning modes `r+`, `w/w+`, `a/a+`) and binary mode `b`.
     * @since DOCUMENTS 4.0
     * @param byteArray Array of integers containing any data you want to write to the file
     * @returns `true` if successful, `false` in case of any error
     * @see {@link File.close | File.close}
     * @example
     * // Binary-Sample with Byte-Array
     * var fso = new File("c:\\tmp\\test.txt", "w+b");
     * if (!fso.ok())
     *    throw fso.error();
     * var byteArr = [];
     * byteArr.push(72);
     * byteArr.push(101);
     * byteArr.push(108);
     * byteArr.push(108);
     * byteArr.push(111);
     * byteArr.push(0);  // 0-Byte
     * byteArr.push(87);
     * byteArr.push(111);
     * byteArr.push(114);
     * byteArr.push(108);
     * byteArr.push(100);
     * fso.write(byteArr);
     * fso.close();
     * // result: test.txt: Hello{0-Byte}World
     */
    write(byteArray: number[]): boolean;
    /**
     * **Write data to the file.**
     *
     * This requires to have the file handle opened with write access (meaning modes `r+`, `w/w+`, `a/a+`). You may concatenate as many strings as you want.
     *
     * **Note:** If you have opened the file in text mode (t), the line break is always \n, on Linux and Windows as well!
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param a String containing any data you want to write to the file
     * @param b String containing any data you want to write to the file
     * @param ...restParams
     * @returns `true` if successful, `false` in case of any error
     */
    write(a: string, b: string, ...restParams: any[]): boolean;
    /**
     * **Write data to the file.**
     *
     * This requires to have the file handle opened with write access (meaning modes `r+`, `w/w+`, `a/a+`).
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param data String containing any data you want to write to the file.
     * @param charsNo integer value indicating how many characters should be written.
     * @returns `true` if successful, `false` in case of any error
     */
    writeBuffer(data: string, charsNo: number): boolean;
}
/**
 * The FileResultset class supports basic functions to loop through a list of DocFile objects.
 *
 * You can manually create a FileResultset as well as access the (selected) files of a (public) Folder.
 */
declare class FileResultset {
    /**
     * **Create a new FileResultset object.**
     *
     * Like in other programming languages you create a new object with the `new` operator (refer to example below).
     *
     * **Note:** Details for the filter expression you find in section [Filter Expressions ](../filter.html)
     *
     * **Note:** Further samples are in [Filter Expression Examples](../filter-examples.html)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param fileType String containing the technical name of the desired filetype
     * @param filter String containing an optional filter criterium; use empty String ('') if you don't want to filter at all
     * @param sortOrder String containing an optional sort order; use empty String ('') if you don't want to sort at all
     * @example
     * var fileType = "Standard";
     * var filter = "";
     * var sortOrder = "";
     * var myFRS = new FileResultset(fileType, filter, sortOrder);
     */
    constructor(fileType: string, filter?: string, sortOrder?: string);
    /**
     * **Retrieve the first DocFile object in the FileResultset.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns DocFile or `null` in case of an empty FileResultset
     * @example
     * var myFRS = new FileResultset("Standard", "", "");
     * var myFile = myFRS.first();
     */
    first(): DocFile;
    /**
     * **Returns an array with all file ids in the FileResultset.**
     *
     * @since DOCUMENTS 5.0c
     * @returns Array of String with file ids of the FileResultset
     * @example
     * var myFRS = new FileResultset("Standard", "", "");
     * util.out(myFRS.getIds());
     */
    getIds(): string[];
    /**
     * **Returns JSON string with all file ids in the FileResultset.**
     *
     * **Note:** Assuming "myFRS" is a FileResultset the following expression produces the same result. ` JSON.stringify(myFRS.getIds()); `
     * @since DOCUMENTS 5.0f
     * @returns JSON string with file ids of the FileResultset
     * @see {@link getIds}
     */
    getIdsJSON(): string;
    /**
     * **Retrieve the last DocFile object in the FileResultset.**
     *
     * @since ELC 3.60j / otrisPORTAL 6.0j
     * @returns DocFile or `null` if end of FileResultset is reached.
     */
    last(): DocFile;
    /**
     * **Retrieve the next DocFile object in the FileResultset.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns DocFile or `null` if end of FileResultset is reached.
     * @example
     * var myFRS = new FileResultset("Standard", "", "");
     * for (var myFile = myFRS.first(); myFile; myFile = myFRS.next())
     * {
     *    // do something with each DocFile object
     * }
     */
    next(): DocFile;
    /**
     * **Get the amount of DocFile objects in the FileResultset.**
     *
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @returns integer value with the amount of DocFile objects in the FileResultset
     * @example
     * var myFRS = new FileResultset("Standard", "", "");
     * util.out(myFRS.size());
     */
    size(): number;
    /**
     * **Recreate a FileResultset from a formerly extracted id-list.**
     *
     * @since DOCUMENTS 5.0f
     * @param idList Array of String with file ids, as returned by FileResultset.getIds()
     * @returns A new FileResultset, which will iterate over the DocFiles with the given ids
     * @example
     * // * **
     * // * ** Main script * **
     * // * **
     * var myFRS = new FileResultset("ftEmployee", "", "");
     * var idListJson = JSON.stringify(myFRS.getIds());
     * var worker = new ScriptCall(context.currentUser, "AsyncFRSWorker", false);
     * // It is technically impossible to pass complex objects like a FileResultset as a script parameter.
     * // The above idListJson can be passed instead, provided it fits into memory.
     * worker.addParameter("idListJson", idListJson);
     * worker.launch();
     * // * ** End of main script * **
     * // * **
     * // * ** Background processing script "AsyncFRSWorker" * **
     * // * **
     * // Expects JSONified id list from employees-FileResultset in the script parameter "idListJson"
     * var idArray = JSON.parse(idListJson);
     * // +++ Now create a twin of the caller's FileResultset +++
     * var frs = FileResultset.fromIds(idArray);
     * var sumSalary = 0;
     * for(var df = frs.first(); df; df = frs.next())
     * {
     *   sumSalary += ensureInt(df.salary);
     * }
     * context.setOrAddCustomProperty("SumOfSalaries", "number", sumSalary);
     * function ensureInt(p)
     * {
     *   if(typeof(p) == "number") return Math.floor(p);
     *   var num = parseInt(p, 10);
     *   return isNaN(num) ? 0 : num;
     * }
     * // * ** End of background processing script * **
     */
    static fromIds(idList: string[]): FileResultset;
    /**
     * **Recreate a FileResultset from a formerly extracted id-list in JSON format.**
     *
     * **Note:** The following expression produces the same result ` FileResultset.fromIds(JSON.parse(idList)); `
     * @since DOCUMENTS 5.0f
     * @param idList JSON string with file ids, as returned by FileResultset.getIdsJSON()
     * @returns A new FileResultset, which will iterate over the DocFiles with the given ids
     * @see {@link fromIds}
     */
    static fromIdsJSON(idList: string): FileResultset;
}
/**
 * **The Folder class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS folders by scripting means.**
 *
 * @since ELC 3.50l01 / otrisPORTAL 5.0l01
 */
declare interface Folder {
    /**
     * **This property specifies whether the action 'Archive' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowArchive: boolean;
    /**
     * **This property specifies whether the action 'Copy to' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowCopyTo: boolean;
    /**
     * **This property specifies whether the action 'PDF creation (Print)' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowCreatePDF: boolean;
    /**
     * **This property specifies whether the action 'Delete' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowDelete: boolean;
    /**
     * **This property specifies whether the action 'Export' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowExport: boolean;
    /**
     * **This property specifies whether the action 'Forward' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowForward: boolean;
    /**
     * **This property specifies whether the action 'Store in' is available for the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    allowMoveTo: boolean;
    /**
     * **The comparator for the first filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    comparator1: string;
    /**
     * **The comparator for the second filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    comparator2: string;
    /**
     * **The comparator for the third filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    comparator3: string;
    /**
     * **The expression of the filter of the folder.**
     *
     * **Note:** This property is only available if the Folder represents a dynamic folder and the filter style 'Extended' is used.
     * @since DOCUMENTS 4.0c
     * @see [Filter Expressions ](../filter.html)
     */
    filterExpression: string;
    /**
     * **The field to use for the first filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    filterfieldname1: string;
    /**
     * **The field to use for the second filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    filterfieldname2: string;
    /**
     * **The field to use for the third filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    filterfieldname3: string;
    /**
     * **The filter style of the folder.**
     *
     * There are two filter styles available:
     *
     * + `Standard`
     * + `Extended`
     *
     * @since DOCUMENTS 4.0c
     */
    filterStyle: string;
    /**
     * **The icon to use in the folder tree.**
     *
     * @since DOCUMENTS 4.0c
     */
    icon: string;
    /**
     * **The internal id of the Folder object.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     */
    id: string;
    /**
     * **This property specifies whether the folder is invisible to the users.**
     *
     * **Note:** This property is not operative if the folder is not released.
     * @since DOCUMENTS 4.0c
     */
    invisible: boolean;
    /**
     * **The entire label defined for the Folder object.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @see {@link Folder.getLocaleLabel}
     */
    label: string;
    /**
     * **The technical name of the Folder object.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     */
    name: string;
    /**
     * **This property specifies whether the folder is available to the users.**
     *
     * @since DOCUMENTS 4.0c
     */
    released: boolean;
    /**
     * **The column used to sort the entries in the folder.**
     *
     * The following sort columns are available:
     *
     * + `Title`
     * + `LastModifiedAt`
     * + `LastEditor`
     * + `CreatedAt`
     * + `Owner`
     * + `CustomField`
     *
     * @since DOCUMENTS 4.0c
     */
    sortColumn: string;
    /**
     * **This property specifies the sort order of the entries in the folder.**
     *
     * @since DOCUMENTS 4.0c
     */
    sortDescending: boolean;
    /**
     * **The technical name of the custom field used to sort the entries in the folder.**
     *
     * **Note:** This field is only available if the Folder.sortColumn is set to 'CustomField'.
     * @since DOCUMENTS 4.0c
     */
    sortFieldName: string;
    /**
     * **Returns the owner of a private folder.**
     *
     * **Note:** If the folder is a private folder (e.g. inbox) this property returns the owning SystemUser
     * @since DOCUMENTS 5.0d
     */
    systemUser: SystemUser;
    /**
     * **The type of the Folder object.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     */
    type: string;
    /**
     * **The desired field value to use for the first filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    value1: string;
    /**
     * **The desired field value to use for the second filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    value2: string;
    /**
     * **The desired field value to use for the third filter of the Folder object.**
     *
     * **Note:** This attribute only exists if the Folder represents a dynamic folder
     */
    value3: string;
    /**
     * **Add a folder access right for the user group defined by an access profile to the folder.**
     *
     * @since DOCUMENTS 4.0c
     * @param accessProfileName The technical name of the access profile.
     * @param allowInsertFiles Flag indicating whether inserting files into the folder is allowed.
     * @param allowRemoveFiles Flag indicating whether removing files from the folder is allowed.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.addAccessProfile("AccessProfile1", true, false);
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addAccessProfile(accessProfileName: string, allowInsertFiles: boolean, allowRemoveFiles: boolean): boolean;
    /**
     * **Store a reference to a desired DocFile object in the current Folder.**
     *
     * **Note:** This only works in case the Folder is a real public Folder. The Folder must not represent a dynamic folder,
     * since a dynamic folder is sort of a hardcoded search, not a "real" folder.
     * @since ELC 3.51h / otrisPORTAL 5.1h
     * @param docFile DocFile object which shall be available in the given Folder
     * @returns `true` if successful, `false` in case of any error
     */
    addFile(docFile: DocFile): boolean;
    /**
     * **Add an EDA server to the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param serverName The technical name of the desired EDA server.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var success = folder.addFilterEDAServer("eas1");
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addFilterEDAServer(serverName: string): boolean;
    /**
     * **Add an EE.i archive to the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param archiveKey The key of the desired EE.i archive.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var archiveKey = "$(#STANDARD)\\REGTEST@eei1";
     * var success = folder.addFilterEEiArchive(archiveKey);
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addFilterEEiArchive(archiveKey: string): boolean;
    /**
     * **Add an EE.x view to the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param viewKey The key of the desired EE.x view.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var viewKey = "Unit=Default/Instance=Default/View=REGTEST";
     * var success = folder.addFilterEExView(viewKey);
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addFilterEExView(viewKey: string): boolean;
    /**
     * **Add a file type to the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param fileType The technical name of the desired file type.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var success = folder.addFilterFileType("Filetype1");
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addFilterFileType(fileType: string): boolean;
    /**
     * **Add a folder access right for a system user to the folder.**
     *
     * @since DOCUMENTS 4.0c
     * @param loginName The login name of the system user.
     * @param allowInsertFiles Flag indicating whether inserting files into the folder is allowed.
     * @param allowRemoveFiles Flag indicating whether removing files from the folder is allowed.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.addSystemUser("user1", true, false);
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addSystemUser(loginName: string, allowInsertFiles: boolean, allowRemoveFiles: boolean): boolean;
    /**
     * **Add the folder to an outbar.**
     *
     * @since DOCUMENTS 4.0d HF2
     * @param outbarName The technical name of the outbar.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.addToOutbar("testOutbar");
     * if (!success)
     *   util.out(folder.getLastError());
     */
    addToOutbar(outbarName: string): boolean;
    /**
     * **The current Folder object is duplicated to create a new Folder object.**
     *
     * The new Folder object is placed at the same hierarchical stage as the Folder used as its source object.
     * After the duplication of the Folder you can change all its public attributes, e.g. to modify the filter definition of a dynamic public folder.
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @param includeSubFolders boolean whether to duplicate any subfolders contained in the source folder as well
     * @param copyRights boolean whether to assign the same access privileges as those assigned to the source Folder
     * @param copyActions boolean whether to duplicate any userdefined actions attached to the source folder as well
     * @returns Folder object generated by the function call
     */
    copyFolder(includeSubFolders: boolean, copyRights: boolean, copyActions: boolean): Folder;
    /**
     * **Create a new subfolder of the specified folder type.**
     *
     * **Note:** There are three possible types available:
     *
     * + `public`
     * + `dynamicpublic`
     * + `onlysubfolder`
     *
     * @since DOCUMENTS 4.0c
     * @param name The technical name of the subfolder to be created.
     * @param type The desired type of the subfolder.
     * @returns New created subfolder as Folder object or `null` if failed.
     * @see {@link context.createFolder | context.createFolder}
     * @example
     * var parentFolder = context.createFolder("parentFolder", "public");
     * if (parentFolder)
     * {
     *   var subFolder = parentFolder.createSubFolder("subFolder", "dynamicpublic");
     *   if (subFolder)
     *       util.out(subFolder.type);
     *   else
     *       util.out(parentFolder.getLastError());
     * }
     */
    createSubFolder(name: string, type: string): Folder;
    /**
     * **Delete the folder in DOCUMENTS.**
     *
     * **Note:** All subfolders are also deleted recursively.
     * @since DOCUMENTS 4.0c
     * @returns `true` if successful, `false` in case of any error.
     * @see {@link context.deleteFolder | context.deleteFolder}
     * @example
     * var folder = context.createFolder("testFolder", "onlysubfolder");
     * if (folder)
     * {
     *   var success = folder.deleteFolder();
     *   if (success)
     *   {
     *       var itFolder = context.getFoldersByName("testFolder", "onlysubfolder");
     *       util.out(itFolder.size() == 0);
     *   }
     *  }
     */
    deleteFolder(): boolean;
    /**
     * **Retrieve an AccessProfileIterator representing a list of all AccessProfiles assigned to a folder access right.**
     *
     * @since DOCUMENTS 5.0i HF3
     * @returns AccessProfileIterator containing a list of all AccessProfiles assigned to a folder access right.
     */
    getAccessProfiles(): AccessProfileIterator;
    /**
     * **Retrieve a user-defined action of the Folder.**
     *
     * @since DOCUMENTS 4.0d
     * @param actionName String value containing the desired action name.
     * @returns UserAction object representing the user-defined action.
     * @example
     * var it = context.getFoldersByName("testFolder");
     * var folder = it.first();
     * if (folder)
     * {
     *   var action = folder.getActionByName("testAction");
     *   if (action)
     *   {
     *       action.type = "PortalScript";
     *       action.setPortalScript("testScript");
     *   }
     *   else
     *       util.out(folder.getLastError());
     * }
     */
    getActionByName(actionName: string): UserAction;
    /**
     * **Get the String value of an attribute of the Folder.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Retrieve a FileResultset of all the DocFile objects stored in the Folder.**
     *
     * **Note:** It does not matter whether the Folder is a real public folder or a dynamic folder.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns FileResultset containing a list of all DocFile objects stored in the Folder
     */
    getFiles(): FileResultset;
    /**
     * **Retrieve the filter file types of the folder.**
     *
     * @since DOCUMENTS 5.0a HF2
     * @returns Array of strings containing the technical names of the file types.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var success = folder.addFilterFileType("Filetype1");
     * if (!success)
     *   util.out(folder.getLastError());
     * var fileTypes = folder.getFilterFileTypes();
     * if (fileTypes)
     * {
     *   for (var i=0; i < fileTypes.length; i++)
     *   {
     *     util.out(fileTypes[i]);
     *   }
     * }
     * else
     *   util.out(folder.getLastError());
     */
    getFilterFileTypes(): any[];
    /**
     * **Create a {@link HitResultset}, which summarizes all DocFiles in the folder.**
     *
     * This function executes either an an empty (=unfiltered) search or a fulltext search in the folder. It creates a HitResultset,
     * which summarizes the Folder's files. By defaut the Resultset contains the same columns as the folder's web view.
     *
     * **Note:** The function operates on dynamic and on static folders, but not on the special folders "tasks" and "resubmission".
     * On a failed search request the function does not throw errors. To detect this kind of errors scripts should call
     * {@link HitResultset.getLastErrorCode | HitResultset.getLastErrorCode()} or {@link HitResultset.getLastError | HitResultset.getLastError()}
     * on the returned object.
     *
     * **Note:** When used, the hitlist parameter typically is a string with the pattern "file_type.hit_list".
     * In unambiguous cases a pure hit list name is accepted, too. The hitlist parameter can instead be an array of strings,
     * where each element declares an individual column (recommended pattern: "file_type.field"). Other valid array elements
     * are reserved attribute column names like "DlcFile_Title". Restriction: If a folder references an EE.i or EE.x native system,
     * only the plain name of a hit list of the folders's primary data source (view or archive) is accepted as the hitlist parameter.
     * A few folders are incapable of fulltext searching. An example is a dynamic folder with an API-Style filter expression,
     * which uses the "OR" keyword. For such folders the function returns an empty resultset with an attached error message,
     * if the fulltextFilter parameter is not empty. To detect in advance, if such an operation can succeed, scripts may first
     * create an unfiltered resultset and examine its property searchability. Reading from a lean HitResultset with only a few columns
     * can be faster than reading from a FileResultset. Sometimes this effect outweighs the time-related costs of a search.
     * If the folder addresses an archive, the time needed to create temporary DocFiles can be saved with this function.
     *
     * **Since:** DOCUMENTS 5.0f (parameters hitlist, sortOrder, fulltextFilter, pageSize)
     *
     * @since DOCUMENTS 5.0c
     * @param hitlist Optional String or Array with a hit list template specification to override the folder's default. See remarks.
     * @param sortOrder Optional sort expression to override the folder's default sort order.
     * @param fulltextFilter Optional fulltext filter expression. Not applicable to all folders. See remarks.
     * @param pageSize
     * This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once.
     * If the parameter is a positive value, Documents will initially load only the requested number of hits as a first page.
     * In order to access each further page, a call to {@link HitResultset.fetchNextPage | fetchNextPage()} is necessary. A negative
     * pageSize value will be replaced by the current user's "hits per page" preference setting.
     * **Default:** `0`
     * @returns A HitResultset, which contains column headers and a list of {@link DocHit} objects.
     * @see
     * {@link Folder.getFiles}
     * {@link HitResultset.searchability}
     */
    getHitResultset(hitlist: any, sortOrder: string, fulltextFilter: string, pageSize?: number): HitResultset;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Get the ergonomic label of the Folder.**
     *
     * @since DOCUMENTS 4.0b HF2
     * @param locale Optional String value with the locale abbreviation (according to the principal's configuration);
     * if omitted, the current user's portal language is used automatically.
     * @returns `String` containing the ergonomic label of the Folder in the appropriate portal language.
     */
    getLocaleLabel(locale?: string): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the Folder object (`m_oid`) will be returned.
     * If `false` the id of the Folder object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Returns the parent folder of the current folder.**
     *
     * @since DOCUMENTS 5.0f
     * @returns `The`Folder if successful, `null` is no parent exist
     */
    getParentFolder(): Folder;
    /**
     * **Retrieve the position of a subfolder within the subfolder list.**
     *
     * @since DOCUMENTS 4.0c
     * @param subFolder Folder object whose position to be retrieved.
     * @returns The zero-based position of the subfolder as integer or -1 in case of any error.
     * @see
     * {@link Folder.setPosition | Folder.setPosition}
     * {@link context.setFolderPosition | context.setFolderPosition}
     * @example
     * var parentFolder = context.createFolder("parentFolder", "public");
     * if (parentFolder)
     * {
     *   var subFolder1 = parentFolder.createSubFolder("subFolder1", "dynamicpublic");
     *   var subFolder2 = parentFolder.createSubFolder("subFolder2", "onlysubfolder");
     *   if (subFolder1 && subFolder2)
     *   {
     *       var pos = parentFolder.getPosition(subFolder2);
     *       util.out(pos == 1);
     *   }
     * }
     */
    getPosition(subFolder: Folder): number;
    /**
     * **Retrieve a {@link FolderIterator} containing all Folder objects which represent subfolders of the given Folder.**
     *
     * **Note:** Until version 5.0h this method ignored the access rights of the user to the folders.
     * With the optional parameter checkAccessRight this can now be done. For backward compatibility the default value is set to false.
     *
     * **Since:** DOCUMENTS 5.0h (new optional parameter checkAccessRight)
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @param checkAccessRight
     * optional boolean value, that indicates if the access rights should be considered.
     *
     * **Default:** `false`
     * @returns FolderIterator with all subfolders one hierarchical level below the given Folder
     */
    getSubFolders(checkAccessRight?: boolean): FolderIterator;
    /**
     * **Retrieve information whether the Folder is empty or not.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns `true` if DocFile objects available inside the Folder, `false` in case the Folder is empty
     */
    hasFiles(): boolean;
    /**
     * **Remove all folder access rights of the user group defined by an access profile from the folder.**
     *
     * @since DOCUMENTS 4.0c
     * @param accessProfileName The technical name of the access profile.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.addAccessProfile("AccessProfile1", true, false);
     * if (success)
     * {
     *   success = folder.removeAccessProfile("AccessProfile1");
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeAccessProfile(accessProfileName: string): boolean;
    /**
     * **Remove the reference to a desired DocFile object out of the current Folder.**
     *
     * **Note:** This only works in case the Folder is a real public Folder. The Folder must not represent a dynamic folder,
     * since a dynamic folder is sort of a hardcoded search, not a "real" folder.
     * @since ELC 3.51h / otrisPORTAL 5.1h
     * @param docFile DocFile object which shall be removed from the given Folder
     * @returns `true` if successful, `false` in case of any error
     */
    removeFile(docFile: DocFile): boolean;
    /**
     * **Remove an EDA server from the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param serverName The technical name of the desired EDA server.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var success = folder.addFilterEDAServer("eas1");
     * if (success)
     * {
     *   success = folder.removeFilterEDAServer("eas1");
     *   if (!success)
     *     util.out(folder.getLastError());
     * }
     */
    removeFilterEDAServer(serverName: string): boolean;
    /**
     * **Remove an EE.i archive from the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param archiveKey The key of the desired EE.i archive.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var archiveKey = "$(#STANDARD)\\REGTEST@eei1";
     * var success = folder.addFilterEEiArchive(archiveKey);
     * if (success)
     * {
     *   success = folder.removeFilterEEiArchive(archiveKey);
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeFilterEEiArchive(archiveKey: string): boolean;
    /**
     * **Remove an EE.x view from the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param viewKey The key of the desired EE.x view.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var viewKey = "Unit=Default/Instance=Default/View=REGTEST";
     * var success = folder.addFilterEExView(viewKey);
     * if (success)
     * {
     *   success = folder.removeFilterEExView(viewKey);
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeFilterEExView(viewKey: string): boolean;
    /**
     * **Remove a file type from the filter of the folder.**
     *
     * **Note:** This function is only available for a Folder of type 'dynamicpublic'.
     * @since DOCUMENTS 4.0c
     * @param fileType The technical name of the desired file type.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "dynamicpublic");
     * var success = folder.addFilterFileType("Filetype1");
     * if (success)
     * {
     *   success = folder.removeFilterFileType("Filetype1");
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeFilterFileType(fileType: string): boolean;
    /**
     * **Remove the folder from an outbar.**
     *
     * @since DOCUMENTS 4.0d HF2
     * @param outbarName The technical name of the outbar.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var itFolder = context.getFoldersByName("testFolder", "public");
     * var folder = itFolder.first();
     * if (folder)
     * {
     *   var success = folder.removeFromOutbar("testOutbar");
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeFromOutbar(outbarName: string): boolean;
    /**
     * **Remove all folder access rights of a system user from the folder.**
     *
     * @since DOCUMENTS 4.0c
     * @param loginName The login name of the system user.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.addSystemUser("user1", true, false);
     * if (success)
     * {
     *   success = folder.removeSystemUser("user1");
     *   if (!success)
     *       util.out(folder.getLastError());
     * }
     */
    removeSystemUser(loginName: string): boolean;
    /**
     * **Set the script containing the allowed user-defined actions.**
     *
     * @since DOCUMENTS 4.0c
     * @param scriptName The name of the desired script; use empty string ('') if you want to remove the associated action script.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var folder = context.createFolder("testFolder", "public");
     * var success = folder.setAllowedActionScript("testScript");
     * if (!success)
     *   util.out(folder.getLastError());
     * // We can remove the action script as follows:
     * success = folder.setAllowedActionScript('');
     */
    setAllowedActionScript(scriptName: string): boolean;
    /**
     * **Set the String value of an attribute of the Folder to the desired value.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Set the parent folder of the current folder.**
     *
     * @since DOCUMENTS 4.0c
     * @param parentFolder optional Folder object being the parent folder of the current folder. If no parent folder is defined, the current folder will be moved to the top level.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var parentFolder = context.createFolder("parentFolder", "public");
     * if (parentFolder)
     * {
     *   var subFolder = context.createFolder("subFolder", "dynamicpublic");
     *   if (subFolder)
     *   {
     *       var success = subFolder.setParentFolder(parentFolder);
     *       if (!success)
     *           util.out(subFolder.getLastError());
     *       // We can move subFolder to the top level as follows:
     *       success = subFolder.setParentFolder();
     *   }
     * }
     */
    setParentFolder(parentFolder: Folder): boolean;
    /**
     * **Place a subfolder at the given position in the subfolder list.**
     *
     * **Note:** 0 at the beginning and -1 at the end.
     * @since DOCUMENTS 4.0c
     * @param subFolder Folder object to be placed at the given position.
     * @param position The 0-based position for the subfolder.
     * @returns `true` if successful, `false` in case of any error.
     * @see
     * {@link Folder.getPosition | Folder.getPosition}
     * {@link context.setFolderPosition | context.setFolderPosition}
     * @example
     * var parentFolder = context.createFolder("parentFolder", "public");
     * if (parentFolder)
     * {
     *   var subFolder1 = parentFolder.createSubFolder("subFolder1", "dynamicpublic");
     *   var subFolder2 = parentFolder.createSubFolder("subFolder2", "onlysubfolder");
     *   if (subFolder1 && subFolder2)
     *   {
     *       var pos = parentFolder.getPosition(subFolder2);
     *       util.out(pos == 1);
     *       parentFolder.setPosition(subFolder1, -1);
     *       pos = parentFolder.getPosition(subFolder2);
     *       util.out(pos == 0);
     *   }
     * }
     */
    setPosition(subFolder: Folder, position: number): boolean;
}
/**
 * **The FolderIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS folders by scripting means.**
 *
 * @since ELC 3.50l01 / otrisPORTAL 5.0l01
 * @example
 * if (context.getFoldersByName(lstName, "public").size() == 0)
 * {
 *    var folderIter = context.getFoldersByName("TemplateFolder", "public");
 *    if (folderIter && folderIter.size() > 0)
 *    {
 *       var source = folderIter.first(); // fetch list folder
 *       var target = source.copyFolder(true, true, true);
 *       target.Name = lstName;
 *       target.Label = docFile.crmName;
 *       target.Type = "public";
 *    }
 * }
 */
declare interface FolderIterator {
    /**
     * **Retrieve the first Folder object in the FolderIterator.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns Folder or `null` in case of an empty FolderIterator
     */
    first(): Folder;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the next Folder object in the FolderIterator.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns Folder or `null` if end of FolderIterator is reached.
     */
    next(): Folder;
    /**
     * **Get the amount of Folder objects in the FolderIterator.**
     *
     * @since ELC 3.50l01 / otrisPORTAL 5.0l01
     * @returns integer value with the amount of Folder objects in the FolderIterator
     */
    size(): number;
}
/**
 * The HitResultset class allows comprehensive search operations in Documents and in connected archives.
 *
 * While the constructor of this class launches a search operation, the created object stores the results
 * and exposes them as a list of DocHit objects. Compared with the classes `FileResultset` and `ArchiveFileResultset`
 * this class has got the following characteristics.
 *
 * + Several filetypes and archives can be searched at one time.
 * + Extracting archive hits from a HitResultset does not make DOCUMENTS create a temporary DocFile for each hit.
 *   This can save a lot of time.
 * + Objects of this class may allocate large amounts of memory, because they sustain a complete hit list instead
 *   of a lean id-list. To save memory, scripts should prefer hit lists with as few columns as possible.
 * + Search-related errors and warnings do not trigger exceptions. Instead, they are stored inside the object.
 *   You can access them with `getLastErrorCode()` and `getLastError()` respectively. Advantage: The caller gets
 *   the freedom to process the results also after a warning. In this case the hit list maybe incomplete or unsorted.
*/
declare class HitResultset {
    /**
     * **Perform a search and create a new HitResultset object.**
     *
     * **Note:**
     * On a failed search request the constructor does not throw errors. To detect this kind of errors scripts should
     * test the object's error state with {@link getLastErrorCode | getLastErrorCode()} or {@link getLastError | getLastError()}.
     *
     * **Resource identifiers**
     *
     * A "resource identifier" can be one of the following: [ examples in brackets ]
     * + a filetype name [ ftOrder ]
     * + a filetype name for use with an EDA store [ ftOrder@peachitStore1 ]
     * + a filetype name for use with all EDA stores [ ftOrder@ALLEAS ]
     * + a EE.x view key [ Unit=Default/Instance=Default/View=Orders@MyEEX ]
     * + a EE.i archive key [ $(#STANDARD)\\ORDERS@STDARC\_360 ]
     * Archive resource identifiers should always get a "@Servername" appendix, though Documents recognizes
     * EE.x and EE.i resources of the primary archive server without that appendix.
     *
     * **Resource ordering and hitlist specification**
     *
     * The resource, which owns a specified hitlist, has to be passed in the first position of the list.
     * Search requests in EE.i/EE.x-archives do not work with a filetype's hitlist. These archives require
     * a hitlist of their own. For this reason, a list of resources of different types must be ordered
     * in the following way: EE.x before EE.i before anything else. Requests, which involve more than
     * one Easy Enterprise server can work only, if a hitlist of the given name exists in each resource of these servers.
     *
     * **Automatic hitlist selection**
     *
     * If the parameter "hitlist" is an empty string, Documents scans the search resources for a named hitlist.
     * If no named hitlist exists, Documents initializes an old-fashioned anonymous hitlist, which is based
     * on the "Display in hit list" option of fields in the Documents Manager and on corresponding options
     * for particular DocFile attributes (title, created, owner, last modified, last editor). An anonymous hitlist
     * does actually not work with EE.x. It partially works with EE.i. In this case, Documents externally uses
     * the setting "CommonDefaultHitlist" of the configuration file "ArchiveXML.ini" and transfers matching columns
     * into the internal hitlist. As long as named hitlists become imported with the archive structure, it does not matter.
     *
     * Search requests, which involve more than one Easy Enterprise server cannot rely on the automatic selection feature.
     * Scripts should always pass an appropriate hitlist name for these requests.
     *
     * **Since:** DOCUMENTS 4.0b
     * **Since:** DOCUMENTS 4.0d HF1 new parameter `fullColumnLength`
     * **Since:** DOCUMENTS 5.0 (New option for hitlist parameter: an array of field names instead of a hitlist name)
     * @since DOCUMENTS 4.0b
     * @example
     * var searchResources = "Filetype1  Filetype2";
     * var filter = "";
     * var sortOrder = "";
     * var myFile;
     * var myHRS = new HitResultset(searchResources, filter, sortOrder);
     * if (myHRS.getLastErrorCode() < 0)
     * {
     *     util.out(myHRS.getLastError());
     * }
     * else
     * {
     *     for (var myHit = myHRS.first(); myHit; myHit = myHRS.next())
     *     {
     *         myFile = myHit.getFile();
     *         if (myFile)
     *             util.out(myFile.getAutoText("id"));
     *         else
     *             util.out(myHit.getLastError());
     *     }
     * }
     * @example
     * var searchResources = ["$(#STANDARD)\\REGTEST@myeei", "Filetype1@myeas", "Filetype1"];
     * var filter = "";
     * var sortOrder = "";
     * var hitlist = ["feld1", "feld2", "feld3"];
     * var pageSize = 3;
     * var pos = 6;
     * var unlimitedHits = true;
     * var fullColumnLength = true;
     * var myHRS = new HitResultset(searchResources, filter, sortOrder, hitlist, pageSize, unlimitedHits, fullColumnLength);
     * if (myHRS.getLastErrorCode() < 0)
     *     throw new Error(myHRS.getLastError());
     * if (myHRS.size() > pos)
     * {
     *     while (pos >= myHRS.fetchedSize())
     *         myHRS.fetchNextPage();
     *     var myHit = myHRS.getAt(pos);
     *     if (myHit)
     *     {
     *         if (myHit.isArchiveHit())
     *             util.out(myHit.getArchiveKey());
     *         else
     *             util.out(myHit.getFileId());
     *     }
     * }
     * @example
     * var searchResources = "Unit=Default/Instance=Default/View=REGTEST@myeex";
     * var filter = "";
     * var sortOrder = "myField+";
     * var hitlist = ["feld1", "feld2", "feld3"];
     * var pageSize = 10;
     * var myFile;
     * var myHRS = new HitResultset(searchResources, filter, sortOrder, hitlist, pageSize);
     * if (myHRS.getLastErrorCode() < 0)
     *     throw new Error(myHRS.getLastError());
     * // Iterate only the hit entries on the first page.
     * for (var myHit = myHRS.first(); myHit; myHit = myHRS.next())
     * {
     *     myFile = myHit.getArchiveFile();
     *     if (myFile)
     *         util.out(myFile.getAttribute("Key"));
     *     else
     *         util.out(myHit.getLastError());
     * }
     * @param searchResources The list of resources to search through. The resource identifiers may be passed either as an array of strings
     * or as an ordinary string with one identifier per line of text. Please read the remarks section about restrictions.
     * @param filter A filter expression. Pass an empty string, if no filter ist required.
     * @param sortOrder A sort expression. Pass an empty string, if no sorting is required.
     * @param hitlist The technical name of a hitlist or an array of field names, which specifies the available columns in the resultset.
     * If the parameter is left empty, Documents tries to choose a hitlist automatically. Details follow in the remarks section.
     *
     * **Note:** If this parameter is an array of field names, a search in EE.i or EE.x is not allowed and the field names must not contain commas (,).
     * @param pageSize
     * This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once. If the parameter
     * is a positive value, Documents will initially load only the requested number of hits as a first page. In order to access each further page, a call to
     * {@link fetchNextPage | fetchNextPage()} is necessary. A negative pageSize value will be replaced by the current user's "hits per page" preference setting.
     *
     * **Default:** `0`.
     * @param unlimitedHits
     * A boolean that indicates, if the general hit limitations on filetypes and archives must be ignored. A wasteful use of this option
     * may cause issues with the system performance or situations with low free memory.
     *
     * **Default:** `false`
     * @param fullColumnLength
     * A boolean that indicates, if the general hit column length limitations must be ignored. The default column length is 50 characters
     * (if not a different value is defined by the property Documents-Settings: `MaxHitfieldLength`). If a field value exceeds this size,
     * the first 50 characters will be displayed followed by '...'. If the parameter `fullColumnLength` is set to `true`, no truncation will be done.
     *
     * **Default:** `false`
     * @param withBlobInfo
     * A boolean that indicates, if the HitResultset should contain blob-information that can be fetched with {@link DocHit.getBlobInfo | DocHit.getBlobInfo()}
     *
     * **Default:** `false`
     * @see
     * [Filter Expressions](../filter.html)
     * [Filter Expression Examples](../filter-examples.html)
     */
    constructor(searchResources: any, filter: string, sortOrder: string, hitlist: any, pageSize?: number, unlimitedHits?: boolean, fullColumnLength?: boolean, withBlobInfo?: boolean);
    /**
     * **Searchability indicator for folder-based or register-based HitResultsets.**
     *
     * For objects created by `Folder.getHitResultset()` or `Register.getHitResultset()` without a fulltextFilter parameter this property provides a hint,
     * if the same operation can succeed with a non-empty fulltext filter. For other HitResultsets it is not meaningful.
     * Possible values:
     * <ul>
     * <li> 0 = The folder/register is not capable of fulltext searching.</li>
     * <li> 1 = The folder/register technically supports fulltext searching. User interfaces, however,
     *      should hide or disable corresponding input fields due to the actual DOCUMENTS-settings.</li>
     * <li>3 = The folder/register is ready for fulltext searching.</li>
     * </ul>
     *
     * **Note:** The value can be interpreted as a bitmask, where Bit 0 indicates technical searchability and Bit 1 indicates UI-driven searchability.
     * @since DOCUMENTS 5.0f
     * @see {@link Folder.getHitResultset | Folder.getHitResultset}
     */
    readonly searchability: number;
    /**
     * **Free most of the memory of the HitResultset.**
     *
     * This function explicitly frees the memory used by the object. The Resultset itself becomes empty. All extracted DocHit objects become
     * invalid and must no longer be used. Long-running scripts should use this function instead of waiting for the garbage collector to clean up.
     * @since DOCUMENTS 4.0b
     * @returns The function does not return a value.
     */
    dispose(): any;
    /**
     * **Get the number of already loaded hits in the set.**
     *
     * **Note:** If the object has been created with a non-zero page size, this value is often smaller than the total amount of hits.
     * @since DOCUMENTS 4.0b
     * @returns integer value with the number of hits, which can actually be read from the resultset.
     * @see {@link size}
     */
    fetchedSize(): number;
    /**
     * **Load the next page of hits into the Resultset.**
     *
     * If the object has been created with a non-zero page size, each call of this function appends another page of hits to the resultset until all hits are loaded.
     * @since DOCUMENTS 4.0b
     * @returns The value indicates, if any more hits have been loaded.
     */
    fetchNextPage(): boolean;
    /**
     * **Retrieve the first DocHit in the HitResultset.**
     *
     * @since DOCUMENTS 4.0b
     * @returns DocHit object, `null` in case of an empty HitResultset
     * @see {@link next}
     */
    first(): DocHit;
    /**
     * **Retrieve the DocHit object at a given position in the HitResultset.**
     *
     * **Note:** Valid positions range from 0 to fetchedSize()-1.
     * @since DOCUMENTS 4.0b
     * @param pos Integer position of the hit, beginning with 0
     * @returns DocHit object or `null` if the position is out of bounds.
     */
    getAt(pos: number): DocHit;
    /**
     * **Get the number of available columns in the set of hits.**
     *
     * @since DOCUMENTS 4.0b
     * @returns The number of columns as an Integer.
     */
    getColumnCount(): number;
    /**
     * **Find the index of a column with a defined name.**
     *
     * **Note:** The function tests for a technical column name prior to a localized name.
     * @since DOCUMENTS 4.0b
     * @param colName The name of the column.
     * @returns The zero-based index of the column or a -1, which indicates an unknown column name.
     */
    getColumnIndex(colName: string): number;
    /**
     * **List the names of all columns in the set of hits.**
     *
     * **Note:** If the resultset is bases on an EE.i hitlist, the function usually returns field numbers instead of technical names,
     * because column descriptions of an EE.i hitlist only consist of the field number and a label. The label would not be a reliable
     * identifier of the column. Columns, which correspond to a DocFile attribute may be given a special constant name instead of
     * the name in an archive's scheme. "TITLE" on EE.x and "110" on EE.i may be presented as "DlcFile_Title", for example.
     * @since DOCUMENTS 4.0b
     * @param local
     * A boolean option to read the localized names instead of the technical names.
     *
     * **Default:** `false`
     * @returns Array of strings with the column names.
     */
    getColumnNames(local?: boolean): any[];
    /**
     * **Returns an array with all Hit-Ids (file ids or archive file keys) of the HitResultset.**
     *
     * @since DOCUMENTS 5.0d
     * @param withServer
     * optional boolean value to indicate, if the archive file keys should include an "@archiveServerName" appendix.
     *
     * **Default:** `true`
     * @returns Array of String with file ids and archive file keys of the HitResultset.
     * @see {@link FileResultset.getIds | FileResultset.getIds}
     * @example
     * var searchResources = ["Filetype1@myeas", "Filetype1"];
     * var myHRS = new HitResultset(searchResources, "", "");
     * util.out(myHRS.getHitIds());
     */
    getHitIds(withServer?: boolean): string[];
    /**
     * **Function to get the description of the last error (or warning) that occurred.**
     *
     * @since DOCUMENTS 4.0b
     * @returns Text of the last error as String
     * @see {@link getLastErrorCode}
     */
    getLastError(): string;
    /**
     * **Function to get a numeric code of the last error, that occurred.**
     *
     * **Note:** The value 0 means "no error". Positive values indicate warnings or minor errors, while negative values indicate serious errors.
     * After a serious error no hits should be processed. After a minor error, the resultset may be unsorted or truncated, but the contained data is still valid.
     * @since DOCUMENTS 4.0b
     * @returns Integer error code.
     * @see {@link getLastError}
     */
    getLastErrorCode(): number;
    /**
     * **Retrieve the next DocHit in the HitResultset.**
     *
     * **Note:** Calls of getAt() do not affect the internal cursor of next().
     * @since DOCUMENTS 4.0b
     * @returns DocHit object, `null` if either the end of the resultset or the end of the loaded pages is reached.
     * @see {@link first}
     */
    next(): DocHit;
    /**
     * **Put a HitResultset aside, for reuse in a later script execution.**
     *
     * This member function moves the HitResultset into a side buffer, which is located outside the scripting environment. A successful call
     * invalidates the object and its descendant {@link DocHit} objects. Later access to these objects by the caller would trigger an exception.
     * The buffered version of the HitResultset, however, can outlive the actual script runtime. It can be reintegrated into script memory
     * by a call of {@link HitResultset.reintegrate | HitResultset.reintegrate(String id)}.
     *
     * **Note:** By default the function assigns a unique id to the buffered object and returns it. The caller may pass a preferred id,
     * which the function will replace or modify only, if it collides with an existing object in the buffer. The caller may instead pass
     * a mandatory id, which is distinguished from preferred ids by an exclamation mark ('!') as the first character. If such an id is
     * already assigned, the function will fail, returning an empty string. Invalid values in the lifetime parameter cause an exception.
     * Please read also the tutorial [Moving HitResultsets across script boundaries](../HitResultsetSideBuffer.html)
     * @since DOCUMENTS 6.0
     * @param lifetime Lifetime of the buffer object in seconds. Only Integer values in the rande 1 to 7200 are valid.
     * @param id Optional string with a preferred id or a mandatory id. See remarks.
     * @returns Usually a string with the actual id of the buffered object; an empty string, if a passed mandatory id is already assigned.
     */
    putAside(lifetime: number, id: string): string;
    /**
     * **Get the total amount of hits in the set.**
     *
     * **Note:** If the object has been created with a non-zero page size, this value is often greater than the amount of already accessible hits.
     * @since DOCUMENTS 4.0b
     * @returns integer value with the total amount of hits. The value -1 may be returned to indicate, that the search continues in the background, and the final number is not yet known.
     * @see {@link fetchedSize}
     */
    size(): number;
    /**
     * **Reintegrate a HitResultset from the side buffer.**
     *
     * This function does the opposite of {@link HitResultset.putAside | HitResultset.putAside(number lifetime, string id)}.
     * It removes and extracts a HitResultset from the side buffer and reintegrates it into the actual scripting environment.
     * The function can only reintegrate objects of the actual DOCUMENTS principal. The actual user account must also match,
     * except if the script runs in supermode.
     *
     * **Note:** Please read also the tutorial [Moving HitResultsets across script boundaries](../HitResultsetSideBuffer.html) !
     * @since DOCUMENTS 6.0
     * @param id The string which was formerly returned by the putAside() member function.
     * @returns The reintegrated HitResultset on success, otherwise `null`.
     */
    static reintegrate(id: string): HitResultset;
}
/**
 * This is the global object of the interface `PropertyCache`. At `SystemUser` and
 * the `AccessProfile` are also PropertyCache objects
 * (`SystemUser.propCache`, `AccessProfile.propCache`).
 */
declare const propCache: PropertyCache;
/**
 * **The PropertyCache class is a util class that allows it to store / cache data over the end of the run time of a script.**
 *
 * There is exactly one global implicit object of the class `PropertyCache` which is named `propCache`. At the SystemUser and
 * the AccessProfile are also PropertyCache objects (`SystemUser.propCache`, `AccessProfile.propCache`).
 *
 * + You can define named members (properties) at this object to store the data: `propCache.Name1 = one_value;` `propCache.Name2 = another_value;`
 * + The stored data can be integer, boolean, string or array values
 * + There is no limit (except the memory of the OS) in the amount of properties or in the length of an array.
 * + Every principal has it's own propCache object.
 *
 * **Note:**
 * It is not possible to create objects of the class `PropertyCache`, since the propCache object is always available.
 *
 * @example
 * // If you have an enumeration field at a filetype and the enumeration
 * // values (enumval) are defined by a PortalScript, then every time a
 * // file of that filetype will be displayed, the PortalScript has to be
 * // excecuted. If now in the PortalScript the enum values are the result
 * // of a query on a filetype or an external DB (DBResultset), then this
 * // is a very "expensive" resource. It is recommanded to cache this data.
 * if (!propCache.hasProperty("Contacts"))
 * {
 *    util.out("Creating cache");
 *    propCache.Contacts = getEmployees();
 * }
 * util.out("Using cache");
 * // copy values to enumval "manually" - concat etc. not possible
 * // with the global object enumval
 * copyArray(propCache.Contacts, enumval);
 * return;
 * function getEmployees()
 * {
 *    var myList = new Array();
 *    var sort = "hrLastName+,hrFirstName+";
 *    var it = new FileResultset("ftEmployee", "", sort);
 *    for (var empl=it.first(); empl; empl=it.next())
 *       myList.push(empl.hrLastName + ", " + empl.hrFirstName);
 *    return myList;
 * }
 * function copyArray(srcList, trgList)
 * {
 *    for (var cnt=0; cnt<srcList.length; cnt++)
 *       trgList.push(srcList[cnt]);
 * }
 */
declare interface PropertyCache {
    /**
     * **Function to check if a named property exists in the PropertyCache.**
     *
     * @since DOCUMENTS 4.0
     * @param name
     * @returns `true` if the property exists, `false` if not
     */
    hasProperty(name: string): boolean;
    /**
     * **Function to list all properties in the PropertyCache.**
     *
     * @since DOCUMENTS 5.0c
     * @returns Array with the names of the properties in the PropertyCache.
     */
    listProperties(): string[];
    /**
     * **Function to delete a named property exists in the PropertyCache.**
     *
     * @since DOCUMENTS 4.0
     * @param name
     * @returns `true` if successful, `false` in case of any error
     */
    removeProperty(name: string): boolean;
}
/**
 * **The Register class has been added to the DOCUMENTS PortalScripting API to gain full access to the registers of a DOCUMENTS file by scripting means.**
 *
 * @since ELC 3.50n / otrisPORTAL 5.0n
 */
declare interface Register {
    /**
     * **The entire label of the Register object.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @see {@link Register.getLocaleLabel | Register.getLocaleLabel(locale?)}
     */
    readonly label: string;
    /**
     * **The technical name of the Register object.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     */
    readonly name: string;
    /**
     * **The type of the Register object.**
     *
     * The possible values of the type attribute are listed below:
     *
     * + `documents`
     * + `fields`
     * + `links`
     * + `archiveddocuments`
     * + `externalcall`
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     */
    readonly type: string;
    /**
     * **Adds a file to a file link register.**
     *
     * @since DOCUMENTS 5.0d
     * @param file
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var file = context.file;
     * var linkFile = context.createFile("Filetype1");
     * var reg = file.getRegisterByName("flReg");
     * if (!reg.addFileLink(linkFile))
     *   util.out(reg.getLastError());
     */
    addFileLink(file: DocFile): boolean;
    /**
     * **Delete a Document at the Register.**
     *
     * With the necessary access rights the user can delete a Document at the Register.
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @param doc Document to delete
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // deleting all documents at a register
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * if (reg)
     * {
     *    var docs = reg.getDocuments();
     *    for (var doc = docs.first(); doc; doc = docs.next())
     *       reg.deleteDocument(doc);
     * }
     */
    deleteDocument(doc: Document): boolean;
    /**
     * **Get the String value of an attribute of the Register.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Get the document by its full name.**
     *
     * @since DOCUMENTS 5.0f
     * @param nameWithExt String containing the document name with extension.
     * @returns Document object if successful, `null` in case of any error.
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("testReg");
     * if (reg)
     * {
     *   var doc = reg.getDocumentByName("test.txt");
     *   if (doc)
     *   {
     *       var content = doc.readAsString();
     *       if (content == "")
     *           throw doc.getLastError();
     *   }
     * }
     */
    getDocumentByName(nameWithExt: string): Document;
    /**
     * **Retrieve a list of all Documents stored on the given Register.**
     *
     * This method is available for documents registers only. You cannot use it with different types of Register objects.
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns DocumentIterator containing the Document objects stored on the Register
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * var docIter = reg.getDocuments();
     * for (var doc = docIter.first(); doc; doc = docIter.next())
     * {
     *    util.out(doc.fullname);
     * }
     */
    getDocuments(): DocumentIterator;
    /**
     * **Get the technical name of the n-th field of the register.**
     *
     * @since DOCUMENTS 5.0f
     * @param index index of the desired field.
     * @returns string containing the technical name of the register field, `false` if index is out of range.
     * @see {@link DocFile.getFieldName | DocFile.getFieldName}
     */
    getFieldName(index: number): string;
    /**
     * **Returns the DocFile the Register belongs to.**
     *
     * @since DOCUMENTS 5.0c HF1
     * @returns DocFile object or `null` if missing
     * @example
     * var file = context.file;
     * var reg = file.getRegisterByName("RegisterA");
     * var alwaysTrue = reg.getFile().getid() == file.getid();
     */
    getFile(): DocFile;
    /**
     * **Retrieve a FileResultset of all DocFile objects linked to the register.**
     *
     * @since DOCUMENTS 4.0b
     * @returns FileResultset containing a list of all DocFile objects linked to the register.
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("LinksReg");
     * if (reg)
     * {
     *    var myFRS = reg.getFiles();
     *    for (var file = myFRS.first(); file; file = myFRS.next())
     *       util.out(file.getAutoText("title"));
     * }
     */
    getFiles(): FileResultset;
    /**
     * **Create a HitResultset with the query parameters taken from a link register.**
     *
     * When called on a register of type "link tab" this method executes the same search request as the one,
     * which is usually triggered by a click on the tab in the web client. With a few exceptions an additional
     * fulltext filter can be applied. The results are encapsulated in a HitResultset object.
     * For all other register types the method simply returns `null`.
     *
     * **Note:** On a failed search request the function does not throw errors. To detect this kind of errors scripts should call
     * {@link HitResultset.getLastErrorCode | HitResultset.getLastErrorCode()} or {@link HitResultset.getLastError | HitResultset.getLastError()}
     * on the returned object.
     *
     * **Note:** When used, the hitlist parameter typically is a string with the pattern "file_type.hit_list". In unambiguous cases
     * a pure hit list name is accepted, too. The hitlist parameter can instead be an array of strings, where each element declares
     * an individual column (recommended pattern: "file_type.field"). Other valid array elements are reserved attribute column names
     * like "DlcFile_Title". Restriction: If a folder references an EE.i or EE.x native system, only the plain name of a hit list of
     * the folders's primary data source (view or archive) is accepted as the hitlist parameter. A few registers are incapable of
     * fulltext searching. An example is a register with an API-Style filter expression, which uses the "OR" keyword. In this case
     * the function returns an empty resultset with an attached error message, if the fulltextFilter parameter is not empty. To detect
     * in advance, if such an operation can succeed, scripts may first create an unfiltered resultset and examine its property searchability.
     * @since DOCUMENTS 5.0f
     * @param hitlist Optional String or Array with a hit list template specification to override the register's default. See remarks.
     * @param sortOrder Optional sort expression to override the register's default sort order.
     * @param fulltextFilter Optional fulltext filter expression. Not applicable to all registers. See remarks.
     * @param pageSize
     * This is a memory-saving and performance-tuning option. If the parameter is zero, Documents will load all available hits at once.
     * If the parameter is a positive value, Documents will initially load only the requested number of hits as a first page. In order
     * to access each further page, a call to {@link HitResultset.fetchNextPage | fetchNextPage()} is necessary. A negative pageSize
     * value will be replaced by the current user's "hits per page" preference setting.
     *
     * **Default:** `0`
     * @returns The created HitResultset
     * @see
     * {@link getFiles}
     * {@link HitResultset.searchability}
     */
    getHitResultset(hitlist: any, sortOrder: string, fulltextFilter: string, pageSize?: number): HitResultset;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the Register object (`m_oid`) will be returned.
     * If `false` the id of the Register object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Place the document at the given position in the document list of the register.**
     *
     * **Note:** 0 at the beginning and -1 at the end; This operation is only available for a register with attachment sort order of 'Manual' and located in an active file.
     * @since DOCUMENTS 6.0
     * @param doc Document object to be placed at the given position.
     * @param position The 0-based position for the document.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Doc1");
     * if (reg)
     * {
     *   var doc = reg.getDocumentByName("test.txt");
     *   if (doc)
     *   {
     *       var ret = reg.moveDocument(doc, -1);
     *       if (!ret)
     *           util.out(reg.getLastError());
     *   }
     * }
     */
    moveDocument(doc: Document, position: number): boolean;
    /**
     * **Removes a file from a file link register.**
     *
     * @since DOCUMENTS 5.0d
     * @param file
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var file = context.file;
     * var reg = file.getRegisterByName("flReg");
     * var frs = reg.getFiles();
     * for (var linkFile = frs.first(); linkFile; linkFile = frs.next())
     * {
     *   if (!reg.removeFileLink(linkFile))
     *       util.out(reg.getLastError());
     * }
     */
    removeFileLink(file: DocFile): boolean;
    /**
     * **Set the String value of an attribute of the Register to the desired value.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Upload a new Document stored on the server's filesystem to the Register.**
     *
     * The filePath parameter must contain not only the directory path but the filename as well. The registerFileName parameter has the purpose
     * to allow to rename the Document already while uploading it.
     *
     * **Note:** After successful upload of the Document the source file on the server's directory structure is removed!
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @param filePath String containing the filePath and filename of the desired file to be uploaded.
     *
     * **Note:** Backslashes contained in the filepath must be quoted with a leading backslash, since the backslash is a special char in ECMAScript!
     * @param registerFileName String containing the desired target filename of the Document on the Register
     * @returns `Document` if successful, `null` in case of any error
     * @example
     * var docFile = context.file;
     * var reg = docFile.getRegisterByName("Documents");
     * var newDoc = reg.uploadDocument("c:\\tmp\\sourcefile.rtf", "Filename_on_Register.rtf");
     * if (!newDoc)
     *    util.out("Error while uploading the file! " + reg.getLastError());
     * else
     *    util.out(newDoc.Name);
     */
    uploadDocument(filePath: string, registerFileName: string): Document;
    /**
     * **Get the ergonomic label of the Register**
     *
     * @since DOCUMENTS 5.0c HF1
     * @param locale Optional String value with the locale abbreviation (according to the principal's configuration);
     * if omitted, the current user's portal language is used automatically.
     * @returns `String` containing the ergonomic label of the Register in the appropriate portal language.
     */
    getLocaleLabel(locale?: string): string;
}
/**
 * **The RegisterIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the registers of a DOCUMENTS file by scripting means.**
 *
 * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
 * @since ELC 3.50n / otrisPORTAL 5.0n
 * @example
 * var docFile = context.file;
 * if (docFile)
 * {
 *    var docregs = docFile.getRegisters("documents");
 *    if (docregs && docregs.size() > 0)
 *    {
 *       for (var d = docregs.first(); d; d = docregs.next())
 *       {
 *          util.out(d.Name + ", " + d.Label);
 *       }
 *    }
 * }
 */
declare interface RegisterIterator {
    /**
     * **Retrieve the first Register object in the RegisterIterator.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Register or `null` in case of an empty RegisterIterator
     */
    first(): Register;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the next Register object in the RegisterIterator.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns Register or `null` if end of RegisterIterator is reached.
     */
    next(): Register;
    /**
     * **Get the amount of Register objects in the RegisterIterator.**
     *
     *
     * **Since:** ELC 3.60i / otrisPORTAL 6.0i available for archive files
     * @since ELC 3.50n / otrisPORTAL 5.0n
     * @returns integer value with the amount of Register objects in the RegisterIterator
     */
    size(): number;
}
/**
 * **This class represents one search field or one conditon within a DOCUMENTS search request.**
 *
 * @since DOCUMENTS 4.0c HF2
 * @see {@link DocQueryParams}
 *
 * @groupDescription Field Types
 * These constants are equally available in each instance of RetrievalField and in the constructor object.
 *
 */
declare interface RetrievalField {
    /**
     * Integer code for the field type "String" (single line)
     * @group Field Types
     */
    readonly FT_STRING: number;
    /**
     * Integer code for the field type "Text" (multiple lines)
     * @group Field Types
     */
    readonly FT_TEXT: number;
    /**
     * Integer code for the field type "boolean"
     * @group Field Types
     */
    readonly FT_BOOL: number;
    /**
     * Integer code for the field type "Date"
     * @group Field Types
     */
    readonly FT_DATE: number;
    /**
     * Integer code for the field type "Enumeration" (not extensible)
     * @group Field Types
     */
    readonly FT_ENUM: number;
    /**
     * Integer code for the field type "Numeric"
     * @group Field Types
     */
    readonly FT_NUMERIC: number;
    /**
     * Integer code for the field type "File reference"
     * @group Field Types
     */
    readonly FT_REFERENCE: number;
    /**
     * Integer code for the field type "History"
     * @group Field Types
     */
    readonly FT_HISTORY: number;
    /**
     * Integer code for the field type "Double select list"
     * @group Field Types
     */
    readonly FT_DOUBLE_LIST: number;
    /**
     * Integer code for the field type "Checkbox"
     * @group Field Types
     */
    readonly FT_CHECKBOX: number;
    /**
     * Integer code for the field type "Horizontal seperator" (actually ignored by the retrieval system)
     * @group Field Types
     */
    readonly FT_SEPARATOR: number;
    /**
     * Integer code for the field type "User defeined"
     * @group Field Types
     */
    readonly FT_USER_DEFINED: number;
    /**
     * Integer code for the field type "Text (fixed font)"
     * @group Field Types
     */
    readonly FT_TEXT_FIXED_FONT: number;
    /**
     * Integer code for the field type "E-mail address"
     * @group Field Types
     */
    readonly FT_E_MAIL: number;
    /**
     * Integer code for the field type "URL"
     * @group Field Types
     */
    readonly FT_URL: number;
    /**
     * Integer code for the field type "Time stamp"
     * @group Field Types
     */
    readonly FT_TIMESTAMP: number;
    /**
     * Integer code for the field type "Filing plan"
     * @group Field Types
     */
    readonly FT_FILING_PLAN: number;
    /**
     * Integer code for the field type "HTML"
     * @group Field Types
     */
    readonly FT_HTML: number;
    /**
     * Reserved constant for a possible future use.
     * @group Field Types
     */
    readonly FT_FILING_STRUCTURE: number;
    /**
     * Integer code for the field type "Gadget" (actually ignored by the retrieval system)
     * @group Field Types
     */
    readonly FT_GADGET: number;
    /**
     * Integer code for fields with an unspecified data type.
     * This constant has been added for completeness. Fields in this state should never appear in the retrieval system.
     * @group Field Types
     */
    readonly FT_UNDEFINED: number;
    /**
     * **The comparison operator / relational operator as a String.**
     *
     * For a list of valid operators see the page: [Filter Expressions](../filter.html).
     *
     * **Note:** The access to this property is restricted. Only the "OnSearchScript" can effectively modify it.
     * Modifying the operator is risky, since it can produce unexpected results from the user's point of view.
     * @since DOCUMENTS 4.0c HF2
     */
    compOp: string;
    /**
     * **The actual default value of the field (read-only).**
     *
     * **Note:** Actually only the "FillSearchMask" exit can attach default values (see setDefault()).
     * There might exist another method in a future version. To improve upward compatibility a "FillSearchMask" script
     * may check for external default values, and leave them unmodified.
     * @since DOCUMENTS 4.0d
     */
    defaultValue: string;
    /**
     * **The UI write protection state of the defautValue (read-only) **
     *
     * @since DOCUMENTS 4.0d
     * @see {@link setDefault}
     */
    defValWriteProt: boolean;
    /**
     * **The localized label of the field. Maybe an empty String.**
     *
     * **Note:** If the field has not got a label, DOCUMENTS falls back to the technical name. So there is no need to specify a label always.
     * A few reserved internal fields, which are usualli never displayed on a search mask or a hit list, also come along without any label.
     * An example is the special field "Search_EEIFileNr", which DOCUMENTS uses internally to implement a version listing for an ENTERPRISE.i file.
     * @since DOCUMENTS 4.0c HF2
     */
    label: string;
    /**
     * **The name of the look-up field (read-only).**
     *
     * @since DOCUMENTS 4.0c HF2
     */
    name: string;
    /**
     * **The field type coded as an integer (read-only).**
     *
     * See the enumeration constants in this class.
     * @since DOCUMENTS 4.0c HF2
     */
    type: number;
    /**
     * **The value sought after. If the operator is "~", it can be a composed value expression.**
     *
     * **Note:** The access to this property is restricted. Only the "OnSearchScript" can effectively modify it. Modifying the value is risky,
     * because it can produce unexpected results from the user's point of view. Within a "FillSearchMask" exit this property contains always an empty string.
     * @since DOCUMENTS 4.0c HF2
     */
    valueExpr: string;
    /**
     * **Place a default value in a search field.**
     *
     * A "FillSearchMask" script-exit can call this function to place default values in an extended search formular. Calls from other scripts will
     * rather deposit a "LastError" message in the superior {@link DocQueryParams} object.
     *
     * **Note:** The DocumentsServer only forwards these parameters to the client application. If a special client implementation will ignore them,
     * the server would not enforce the defaults, because such a behaviour would confuse users. Calling this function does not modify the "empty" state
     * in terms of {@link DocQueryParams.getSearchField | DocQueryParams.getSearchField()}.
     * @since DOCUMENTS 4.0d
     * @param value The initial text in the search field. Dates and numbers must be formatted with the current user's locale settings.
     * @param writeProtect Indicates, if the user interface shall write-protect the field.
     * @returns No return value.
     */
    setDefault(value: string, writeProtect: boolean): any;
}
/**
 * **This class describes a searchable resource in the DOCUMENTS retrieval system.**
 *
 * @since DOCUMENTS 4.0c HF2
 *
 * @groupDescription Searchable Resource
 * These constants are equally available in each instance of RetrievalSource and in the constructor object. Resource macroes can only
 * occur in the "FillSearchMask" exit. Within an "OnSearch" exit they have already been replaced by their single components.
 */
declare interface RetrievalSource {
    /**
     * Integer code of the source type "DOCUMENTS file type"
     * @group Searchable Resource
     */
    readonly ST_DLC_FILETYPE: number;
    /**
     * Integer code of the source type "EASY ENTERPRISE.i archive"
     * @group Searchable Resource
     */
    readonly ST_EEI_ARCHIVE: number;
    /**
     * Integer code of the source type "EASY ENTERPRISE.x view"
     * @group Searchable Resource
     */
    readonly ST_EEX_VIEW: number;
    /**
     * Integer code of the source type "EASY ENTERPRISE.x user specific view"
     * @group Searchable Resource
     */
    readonly ST_EEX_USERVIEW: number;
    /**
     * Integer code of the source type "DOCUMENTS file type within an EAS/EDA store"
     * @group Searchable Resource
     */
    readonly ST_EAS_FILETYPE: number;
    /**
     * Integer code of the macro source type "EAS server" (Apply selected file types also to the identified EDA-store)
     * @group Searchable Resource
     */
    readonly MST_EAS_SERVER: number;
    /**
     * Integer code of the macro source type "EAS only" (Remove standard file type sources after MST_EAS_SERVER macro expansion)
     *
     * **Note:** A "FillSearchMask" script can usually find a source of this type, when the user has deselected the "actual processes" checkbox.
     * This source has not got any parameters. If there are user accounts in the system, for which the checkbox does not show up, the script code
     * should not interpret this source type at all.
     * @group Searchable Resource
     */
    readonly MST_EAS_ONLY: number;
    /**
     * **A identifier of the resource.**
     *
     * For conventional file type resources the identifier equals the technical name of the file type. Archive related identifiers consist of
     * a software dependent key or name plus an "@serverName" appendix.
     *
     * **Note:** Modifications of this property won't be forwarded to the retrieval system.
     * @since DOCUMENTS 4.0c
     */
    resId: string;
    /**
     * **For archive resources: the technical name of the archive server. Otherwise empty.**
     *
     * **Note:** Modifications of this property won't be forwarded to the retrieval system.
     * @since DOCUMENTS 4.0c
     */
    server: string;
    /**
     * **The resource type encoded as an integer. See the enumeration constants in this class.**
     *
     * **Note:** Modifications of this property won't be forwarded to the retrieval system.
     * @since DOCUMENTS 4.0c
     */
    type: number;
}
/**
 * This class allows asynchronously calling a script from another script.
 *
 * You should deliberate whether a script call can be waitable or not. Only waitable script calls can be managed,
 * e.g. waiting for a script call to finish or checking whether a call is still running.
 *
 * **Note:** In the called script, which implements an asynchronous task, nested waitable calls should occur rarely.
 * Special caution is necessary with regard to the following scenarios.
 *
 * All of these scenarios carry the risk of a possible deadlock of the server! Since version 5.0i the server tries
 * to repel known deadlock conditions by returning or throwing errors.
 *
 *
 * 1. A script runs within a DOCUMENTS search operation. It launches a waitable call. The called script uses a method
 * like {@link Folder.getFiles | Folder.getFiles()}, which initiates another search operation on behalf of the same user.
 * (* Example: a search operation may call an enumeration script to allow translation of technical values into localized values.)
 *
 * 2. Recursive usage: A script launches a waitable call of the same script.
 *
 * 3. Indirect recursive usage: A script launches a waitable call of another script, which recalls the first script.
 * The recall is either synchronous or waitable. The recall may also be hidden (in a third script, which is called by an API method, for example).
 *
 * 4. Waitable script calls are used at a high nesting level. The risk of deadlock increases with each level.
 *
 * 5. A script launches 30 or more waitable calls at once, without awaiting previous results. It does not matter
 * whether different scripts are called or always the same script. Every called script (or script-instance) subsequently
 * launches only one other waitable script call.
 *
 * 6. A script "A" calls a script "B" asynchronously (maybe waitable or not). "B" launches any waitable call. Many instances of
 * script "A" are expected to run concurrently, for example when many users perform the same action at once.
 *
 *
 * The first scenario is a classic example of a deadlock. The calling script already holds the user's search mutex and
 * waits for the called script to finish. The called script, however, cannot make progress while the search mutex is locked.
 *
 * If the caller does not need to access the state or the return value of the called script, the simple solution is
 * a detached (not waitable) script call. Otherwise you can avoid this problem by using modules and normal function calls instead of separate scripts.
 *
 * The only search operations, which can safely be used in the first scenario, are the constructors of the classes {@link FileResultset}
 * and {@link HitResultset}. They operate isolated from the normal user session.
 *
 *
 * In the other scenarios the problem can occur, because every waitable call may block a worker thread and the number of worker threads in the server is limited.
 *
 * In detail: After a successful {@link launch | launch()} every waitable call requires a later synchronization, even if the script does not utilize
 * the {@link waitForFinish | waitForFinish()} method. At the latest when the script run ends, the server will await the end of unfinished waitable
 * calls in order to safely free the associated shared memory.
 *
 * This synchronization often blocks the thread on which the script runs. If the calling script itself was started by a ScriptCall, it runs on
 * a worker thread from a limited pool (usually upto 32 threads).
 *
 * In the worst case the thread pool has already reached its capacity limit and all the threads are blocked. There exists at least one other waitable
 * call in the queue, but no thread is ready to process it. The consequence is an infinite wait state.
 *
 *
 * The scenarios #5 and #6 are critical though the nesting level of waitable calls looks harmless. In these cases the top-level script calls can occupy
 * all worker threads before a second-level call gets a chance to run, but all threads will wait for the inner calls. Again: the consequence is an infinite wait state.
 */
declare class ScriptCall {
    /**
     * **Create a new ScriptCall object.**
     *
     * The following properties of the execution context of the called script are carried over from the execution context of the script
     * where this ScriptCall object is created:
     * <ul>
     * <li>file </li>
     * <li>register </li>
     * <li>document </li>
     * <li>event </li>
     * </ul>
     * You can change these context properties with the available set-methods.
     *
     * **Since:** DOCUMENTS 4.0d
     * @since DOCUMENTS 4.0d
     * @param systemUser The system user who triggers execution of the called script and can be specified as follows:
     * <ul>
     * <li>String containing the login name of the system user. </li>
     * <li>SystemUser object representing the system user. </li>
     * </ul>
     * @param scriptName String with the name of the called script.
     * @param waitable boolean flag indicating whether this script call is waitable.
     */
    constructor(systemUser: any, scriptName: string, waitable: boolean);
    /**
     * **Add a parameter to the called script.**
     *
     * @since DOCUMENTS 5.0
     * @param name String value containing the parameter name.
     * @param value String value containing the parameter value.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link addParameterWithType}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", false);
     * call.addParameter("testParam", "testValue");
     */
    addParameter(name: string, value: string): boolean;
    /**
     * **Add a parameter to the called script.**
     *
     * @since DOCUMENTS 5.0i HF3
     * @param name String value containing the parameter name.
     * @param value The desired parameter value of the specified data type, e.g. a Date object as value of data type 'Timestamp'.
     * @param datatype Optional string specified the data type of the parameter value. If no data type is specified, the data type will
     * be determined based on the given value. The following data types are available:
     * <ul>
     * <li>String </li>
     * <li>Bool </li>
     * <li>Numeric </li>
     * <li>Date </li>
     * <li>Timestamp </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link addParameter}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (!call.addParameterWithType("testParam", 12, "Numeric"))
     *    util.out(call.getLastError());
     */
    addParameterWithType(name: string, value: string | number | boolean | Date, datatype?: string): boolean;
    /**
     * **Get the return enumval value of the called script.**
     *
     * **Note:** This function is only available for a waitable ScriptCall.
     * @since DOCUMENTS 5.0 HF2
     * @returns The return value as an array if the waitable ScriptCall was successfully completed, otherwise the string "Undefined".
     * @example
     * var call = new ScriptCall("schreiber", "myEnumScript", true);
     * if (call.launch())
     * {
     *   if (call.waitForFinish())
     *       util.out(call.getEnumval());
     * }
     */
    getEnumval(): string[];
    /**
     * **Get the description of the last error that occurred.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since DOCUMENTS 5.0
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (!call.launch())
     *   util.out(call.getLastError());
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Get the return value of the called script.**
     *
     * **Note:** This function is only available for a waitable ScriptCall.
     * @since DOCUMENTS 5.0
     * @returns The return value as String if the waitable ScriptCall was successfully completed, otherwise the string "Undefined".
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (call.launch())
     * {
     *   if (call.waitForFinish())
     *       util.out(call.getReturnValue());
     * }
     */
    getReturnValue(): string;
    /**
     * **Check whether the script call was finished.**
     *
     * **Note:** This function is only available for a waitable script call.
     * @since DOCUMENTS 5.0e HF2
     * @returns `true` if the script call is finished, otherwise `false`
     * @see {@link ScriptCall.isRunning | ScriptCall.isRunning}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (!call.launch())
     *    throw call.getLastError();
     * while (!call.isFinished())
     * {
     *    // do something different
     * }
     * // Call is finished and result is available
     * return call.getReturnValue();
     */
    isFinished(): boolean;
    /**
     * **Check whether the script call is actually running.**
     *
     * Actually running means, that the script will be executed at this moment (other states are new or queued)
     *
     * **Note:** This function is only available for a waitable script call.
     * @since DOCUMENTS 4.0d
     * @returns `true` if the script call is running, otherwise `false`
     * @see {@link ScriptCall.isFinished | ScriptCall.isFinished}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (call.launch())
     * {
     *   if (call.isRunning())
     *   {
     *       // do something
     *   }
     * }
     */
    isRunning(): boolean;
    /**
     * **Launch the script call.**
     *
     * In case of successful launch the script will be executed in an own context.
     * @since DOCUMENTS 4.0d
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (!call.launch())
     *   util.out(call.getLastError());
     */
    launch(): boolean;
    /**
     * **Set the execution context file of the called script.**
     *
     * @since DOCUMENTS 4.0d
     * @param docFile DocFile object representing the desired execution context file.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.file | context.file}
     * @example
     * var user = context.findSystemUser("schreiber");
     * var call = new ScriptCall(user, "testScript", true);
     * var file = context.getFileById("peachit_fi20120000000016");
     * if (file)
     *   call.setDocFile(file);
     */
    setDocFile(docFile: DocFile): boolean;
    /**
     * **Set the execution context document of the called script.**
     *
     * @since DOCUMENTS 4.0d
     * @param doc Document object representing the desired execution context document.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.document | context.document}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", false);
     * var file = context.getFileById("peachit_fi20120000000016");
     * if (file)
     * {
     *    var reg = file.getRegisterByName("Doc1");
     *   if (reg)
     *   {
     *       var it = reg.getDocuments();
     *       if (it.size() > 0)
     *           call.setDocument(it.first());
     * }
     * }
     */
    setDocument(doc: Document): boolean;
    /**
     * **Set the execution context event of the called script.**
     *
     * @since DOCUMENTS 4.0d
     * @param scriptEvent String value containing the desired script event of the execution context.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.event | context.event}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", false);
     * call.setEvent("onArchive");
     */
    setEvent(scriptEvent: string): boolean;
    /**
     * **Set the execution context folder of the called script.**
     *
     * @since DOCUMENTS 5.0d
     * @param folder Folder object representing the desired execution context folder.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.folder | context.folder}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", false);
     * call.setFolder(context.folder);
     */
    setFolder(folder: Folder): boolean;
    /**
     * **Set the execution context register of the called script.**
     *
     * @since DOCUMENTS 4.0d
     * @param register Register object representing the desired execution context register.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link context.register | context.register}
     * @example
     * var call = new ScriptCall("schreiber", "testScript", false);
     * var file = context.getFileById("peachit_fi20120000000016");
     * if (file)
     * {
     *    var reg = file.getRegisterByName("Doc1");
     *    call.setRegister(reg);
     * }
     */
    setRegister(register: Register): boolean;
    /**
     * **Let the called script run as an enumeration script.**
     *
     * The global parameter `enumval` is then available in the called script
     * @since DOCUMENTS 5.0 HF2
     * @param runAsEnumScript boolean value.
     * @returns
     * @see {@link ScriptCall.getEnumval | ScriptCall.getEnumval}
     * @example
     * var call = new ScriptCall(context.getSystemUser(), "myEnumScript", true);
     * call.setRunAsEnumScript(true);
     * if (!call.launch())
     *      throw call.getLastError();
     * call.waitForFinish();
     * util.out(call.getEnumval());
     */
    setRunAsEnumScript(runAsEnumScript: boolean): boolean;
    /**
     * **Wait for the script call to finish.**
     *
     * **Note:** This function is only available for a waitable script call.
     * @since DOCUMENTS 4.0d
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var call = new ScriptCall("schreiber", "testScript", true);
     * if (call.launch())
     * {
     *   if (call.waitForFinish())
     *   {
     *       // do something
     *   }
     *   else
     *       util.out(call.getLastError());
     * }
     */
    waitForFinish(): boolean;
}
/**
 * **The SystemUser class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS users by scripting means.**
 *
 * There are several functions implemented in different classes to retrieve a SystemUser object.
 * @since ELC 3.50b / otrisPORTAL 5.0b
 */
declare interface SystemUser {
    /**
     * **Annotations right flag in the access mask.**
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    ANNOTATIONS: number;
    /**
     * **Archive right flag in the access mask.**
     *
     * The bit that specifies the right to archive files.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    ARCHIVE: number;
    /**
     * **Change filetype right flag in the access mask.**
     *
     * The bit that specifies the right to change the filetype of a file.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    CHANGE_TYPE: number;
    /**
     * **Change workflow right flag in the access mask.**
     *
     * The bit that specifies the right to change a workflow assigned to a file.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    CHANGE_WORKFLOW: number;
    /**
     * **Copy right flag in the access mask.**
     *
     * The bit that specifies the right to copy files to a personal or public folder.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    COPY: number;
    /**
     * **Create right flag in the access mask.**
     *
     * The bit that specifies the right to create new files.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    CREATE: number;
    /**
     * **Create workflow right flag in the access mask.**
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    CREATE_WORKFLOW: number;
    /**
     * **String value containing the email address of the SystemUser.**
     *
     * @since DOCUMENTS 5.0a
     */
    email: string;
    /**
     * **String value containing the first name of the SystemUser.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     */
    firstName: string;
    /**
     * **String value containing the last name of the SystemUser.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     */
    lastName: string;
    /**
     * **String value containing the unique login name of the SystemUser.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     */
    login: string;
    /**
     * **Mail right flag in the access mask.**
     *
     * The bit that specifies the right to send files via an e-mail system.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    MAIL: number;
    /**
     * **Move right flag in the access mask.**
     *
     * The bit that specifies the right to move files to a personal or public folder.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    MOVE: number;
    /**
     * **Create PDF right flag in the access mask.**
     *
     * The bit that specifies the right to create a PDF of a file.
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    PDF: number;
    /**
     * **Access to the property cache of the SystemUser.**
     *
     * @since DOCUMENTS 5.0
     * @see
     * {@link PropertyCache}
     * {@link AccessProfile.propCache}
     * @example
     * var user = context.getSystemUser();
     * if (!user.propCache.hasProperty("Contacts"))
     * {
     *    util.out("Creating cache");
     *    user.propCache.Contacts = ["Peter", "Paul", "Marry"];
     * }
     */
    propCache: PropertyCache;
    /**
     * **Read right flag in the access mask.**
     *
     * The bit that specifies the right to see files.
     *
     * **Note:** the access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    READ: number;
    /**
     * **Remove right flag in the access mask.**
     *
     * The bit that specifies the right to delete files.
     *
     * **Note:** the access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    REMOVE: number;
    /**
     * **Start workflow flag in the access mask.**
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    START_WORKFLOW: number;
    /**
     * **Versioning right flag in the access mask.**
     *
     * **Note:** The access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    VERSION: number;
    /**
     * **Write right flag in the access mask.**
     *
     * The bit that specifies the right for changing index fields or documents in files.
     *
     * **Note:** the access mask is returned by SystemUser.getAccess(DocFile)
     * @see {@link SystemUser.getAccess | SystemUser.getAccess}
     */
    WRITE: number;
    /**
     * **Creates a new CustomProperty for the user.**
     *
     * @since DOCUMENTS 4.0a
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link SystemUser.setOrAddCustomProperty | SystemUser.setOrAddCustomProperty}
     * {@link SystemUser.getCustomProperties | SystemUser.getCustomProperties}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var custProp = currentUser.addCustomProperty("favorites", "string", "peachit");
     * if (!custProp)
     *   util.out(currentUser.getLastError());
     */
    addCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Create file type agents for the user.**
     *
     * @since DOCUMENTS 5.0a
     * @param fileTypes The desired file types may be passed as follows:
     * <ul>
     * <li>String containing the technical name of the desired file type; </li>
     * <li>Array of strings containing the technical names of the desired file types; </li>
     * <li>String constant "*" indicating all file types. </li>
     * </ul>
     * @param loginNames Array of strings containing the login names of the agents.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var loginNames = new Array();
     * loginNames.push("user1");
     * loginNames.push("user2");
     * if (!currentUser.addFileTypeAgent("testFileType", loginNames))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    addFileTypeAgent(fileTypes: string | string[], loginNames: string[]): boolean;
    /**
     * **Create file type agents for the user, whereby the agents are specified by the desired script.**
     *
     * @since DOCUMENTS 5.0a
     * @param fileTypes The desired file types may be passed as follows:
     * <ul>
     * <li>String containing the technical name of the desired file type; </li>
     * <li>Array of strings containing the technical names of the desired file types; </li>
     * <li>String constant "*" indicating all file types. </li>
     * </ul>
     * @param scriptName String containing the name of the script specifying the file type agents.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.addFileTypeAgentScript("*", "testScript"))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    addFileTypeAgentScript(fileTypes: string | string[], scriptName: string): boolean;
    /**
     * **Make the SystemUser a member of the desired AccessProfile.**
     *
     * **Note:** If the user is already logged in, it is necessary to invalidate the cache of the user
     * s. {@link SystemUser.invalidateAccessProfileCache | SystemUser.invalidateAccessProfileCache()}
     *
     * **Since:** ELC 3.50b / otrisPORTAL 5.0b for PartnerAccounts
     * **Since:** DOCUMENTS 4.0b HF1 for Fellows
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param ap AccessProfile the user should be a member of
     * @returns `true` if successful, `false` in case of any error
     */
    addToAccessProfile(ap: AccessProfile): boolean;
    /**
     * **Evaluate if the password is correct.**
     *
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @param passwd String value containing the plain password
     * @returns `true` if correct, otherwise `false`
     */
    checkPassword(passwd: string): boolean;
    /**
     * **Move the files from the inbox of an absent user to his agent.**
     *
     * If a Systemuser is set to absent, then all new files are redirected to his agent. The currently existing files
     * (that came into the inbox before the was absent) can be moved to the agent with this method. If the user is
     * not absent this method returns an error.
     * @since ELC 3.60g / otrisPORTAL 6.0g
     * @returns `true` if succeeded, otherwise `false` - an error message describing the error with getLastError().
     * @see
     * {@link setAbsent}
     * {@link setAbsentMail}
     * {@link SystemUserIteratorgetAgents}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.delegateFilesOfAbsentUser())
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    delegateFilesOfAbsentUser(): boolean;
    /**
     * **Move the files from the inbox of a user to another user.**
     *
     * @since DOCUMENTS 6.0
     * @param login String containing the login name of the user the files moved to.
     * @returns Count of the files moved to the desired user or -1 in case of any error.
     * @see {@link delegateFilesOfAbsentUser}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var count = currentUser.delegateFilesToUser("anotherUser");
     * if ( count == -1)
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("Count of delegated files: " + count);
     */
    delegateFilesToUser(login: string): number;
    /**
     * Creates an API key.
     *
     * @param label An arbitrary name for the client application.
     * @param deviceInfo An arbitrary description for the client device.
     */
    generateAPIKey(label: any, deviceInfo: any): object;
    /**
     * **Retrieve the configured start date of absence.**
     *
     * @since DOCUMENTS 5.0g
     * @returns Date object representing when the absence begins.
     * @see {@link setAbsent}
     */
    getAbsentFrom(): Date;
    /**
     * **Get the absence message.**
     *
     * @since DOCUMENTS 5.0g
     * @returns String with the absence message.
     * @see
     * {@link setAbsentMail}
     * {@link setAbsent}
     */
    getAbsentMessage(): string;
    /**
     * **Retrieve the configured end date of absence.**
     *
     * @since DOCUMENTS 5.0g
     * @returns Date object representing when the absence ends.
     * @see {@link setAbsent}
     */
    getAbsentUntil(): Date;
    /**
     * **Retrieve an access mask whose bits correspond to the user's access rights supported by the given DocFile or filetype.**
     *
     * **Note:** There is a constant for any right flag in the access mask (e.g. SystemUser.READ specifies the read right).
     * @since DOCUMENTS 5.0a HF2
     * @param docFile DocFile object to which the access rights should be retrieved.
     * @returns 32-bit value whose bits correspond to the user's access rights.
     * @see e.g. {@link SystemUser.READ}
     * @example
     * var docFile = context.file;
     * var currentUser = context.getSystemUser();
     * if (!currentUser)
     *     throw "currentUser is NULL";
     * var accessMask = currentUser.getAccess(docFile);
     * if(SystemUser.READ & accessMask)
     *     util.out("The user " + currentUser.login + " has read access!");
     */
    getAccess(docFile: DocFile): number;
    /**
     * **Retrieve an {@link AccessProfileIterator} representing a list of all AccessProfiles the user is a member of.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns AccessProfileIterator containing a list of all AccessProfiles which are assigned to the user; `null` in case of any error
     */
    getAccessProfiles(): AccessProfileIterator;
    /**
     * **Get a {@link SystemUserIterator} with the agents of the user.**
     *
     * This method returns a SystemUserIterator with the agents of the user, if the user is absent.
     * @since ELC 3.60g / otrisPORTAL 6.0g
     * @returns SystemUserIterator
     * @see
     * {@link setAbsent}
     * {@link setAbsentMail}
     * {@link delegateFilesOfAbsentUser}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var itSU = currentUser.getAgents();
     * for (var su = itSU.first(); su; su = itSU.next())
     * {
     *    util.out(su.login);
     * }
     */
    getAgents(): SystemUserIterator;
    /**
     * **Retrieve a list of private and public Folders of the Systemuser.**
     *
     * @since DOCUMENTS 5.0c
     * @returns FolderIterator containing a list of the folders.
     * @see {@link SystemUser.getAllFolders | SystemUser.getAllFolders}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser)
     *   throw "currentUser is null";
     * var folderIter = currentUser.getAllFolders();
     */
    getAllFolders(): FolderIterator;
    /**
     * Returns the value of the property ApiKeyAuthentication.
     */
    getAPIKeyLevel(): string;
    /**
     * Returns all API keys as array.
     */
    getAPIKeys(): object[];
    /**
     * **Get the String value of an attribute of the SystemUser.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Get back the delegated files.**
     *
     * If the user is not present this method returns an error.
     * @since DOCUMENTS 4.0d
     * @param removeFromAgentInbox Optional boolean indicating whether the files are removed from agent inbox after getting back by the user.
     * If this parameter is not specified, the value from the user settings in the absent dialog on the web is used.
     * @returns `true` if successful, `false` in case of any error.
     * @see
     * {@link setAbsent}
     * {@link delegateFilesOfAbsentUser}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.getBackDelegatedFiles(true))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    getBackDelegatedFiles(removeFromAgentInbox: boolean): boolean;
    /**
     * **Get a {@link CustomPropertyIterator} with all {@link CustomProperty} of the user.**
     *
     * This method returns a CustomPropertyIterator with the CustomProperty of the user.
     * @since DOCUMENTS 4.0a
     * @param nameFilter String value defining an optional filter depending on the name
     * @param typeFilter String value defining an optional filter depending on the type
     * @returns CustomPropertyIterator
     * @see
     * {@link context.findCustomProperties | context.findCustomProperties}
     * {@link SystemUser.setOrAddCustomProperty | SystemUser.setOrAddCustomProperty}
     * {@link SystemUser.addCustomProperty | SystemUser.addCustomProperty}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var itProp = currentUser.getCustomProperties();
     * for (var prop = itProp.first(); prop; prop = itProp.next())
     * {
     *    util.out(prop.name +  prop.value);
     * }
     */
    getCustomProperties(nameFilter?: string, typeFilter?: string): CustomPropertyIterator;
    /**
     * **Retrieve a list of individual Folders of the Systemuser.**
     *
     * @since DOCUMENTS 4.0d
     * @returns FolderIterator containing a list of all individual folders.
     * @see {@link SystemUser.getPrivateFolder | SystemUser.getPrivateFolder}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser)
     *   throw "currentUser is null";
     * var folderIter = currentUser.getIndividualFolders();
     */
    getIndividualFolders(): FolderIterator;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the Systemuser object (`m_oid`) will be returned.
     * If `false` the id of the Systemuser object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns `String` with the object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Try to retrieve a particular private {@link Folder} of the Systemuser.**
     *
     * In addition to the public folders you may define in DOCUMENTS, each DOCUMENTS user has a set of private folders.
     * You might need to access a particular private folder to access its contents, for example.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param folderType String value defining the kind of private folder you want to access.
     * You may choose between
     *
     * + `"individual"` individual folder
     *
     *   **Note:** This function returns only the first individual folder on the top level. Using
     *   {@link SystemUser.getIndividualFolders | SystemUser.getIndividualFolders()} to retrieve all individual folders.
     * + `"favorites"` favorites folder
     * + `"inbox"` the user's inbox
     * + `"sent"` the user's sent folder
     * + `"sendingfinished"` user's folder containing files which finished their workflow
     * + `"inwork"` folder containing the files the SystemUser created himself
     * + `"resubmission"` folder containing files with a resubmission defined for the SystemUser
     * + `"trash"` folder containing files the user has deleted
     * + `"tasks"` folder containing all files the user has a task to perform to
     * + `"lastused"` folder containing the files the SystemUser accessed latest, sorted in descending chronological order
     * + `"introuble"` folder containing files which ran into some workflow error. This folder is only available for editors
     *   and only if it has been added manually by the administrator.
     *
     * @returns Folder object representing the desired folder, `null` in case of any error
     * @see {@link SystemUser.getIndividualFolders | SystemUser.getIndividualFolders}
     */
    getPrivateFolder(folderType: string): Folder;
    /**
     * **Gather information whether an absence mail will be sent.**
     *
     * If the Systemuser is absent and get a file in the inbox, an absence mail to the sender of this file can be send.
     * @since DOCUMENTS 5.0g
     * @returns `true` if an absence mail will be sent, otherwise `false`.
     * @see
     * {@link setAbsentMail}
     * {@link setAbsent}
     */
    getSendAbsenceMail(): boolean;
    /**
     * **Get the status of the SystemUser.**
     *
     * @since DOCUMENTS 5.0g
     * @returns String with the value of the status
     * @see {@link SystemUser.setStatus | SystemUser.setStatus}
     */
    getStatus(): string;
    /**
     * **Get the SystemUser object representing the superior of the user.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns SystemUser object representing the superior or `null` if no superior available
     */
    getSuperior(): SystemUser;
    /**
     * **Retrieve a list of userdefined inbox Folders of the Systemuser.**
     *
     * @since DOCUMENTS 4.0d
     * @returns FolderIterator containing a list of all userdefined inbox folders.
     * @see {@link SystemUser.getPrivateFolder | SystemUser.getPrivateFolder}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser)
     *   throw "currentUser is null";
     * var folderIter = currentUser.getUserdefinedInboxFolders();
     */
    getUserdefinedInboxFolders(): FolderIterator;
    /**
     * **Retrieve information whether the SystemUser is a member of a particular {@link AccessProfile} which is identified by its technical name.**
     *
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param profileName String value containing the technical name of an AccessProfile
     * @returns `true` if the SystemUser is a member of the desired profile, otherwise `false`
     */
    hasAccessProfile(profileName: string): boolean;
    /**
     * **Invalidates the server sided cache of the access profiles for the SystemUser.**
     *
     * @since DOCUMENTS 4.0 (HF1)
     * @returns `true` if successful, otherwise `false`
     */
    invalidateAccessProfileCache(): boolean;
    /**
     * **Invalidates the server sided cache of the folders for the SystemUser.**
     *
     * @since DOCUMENTS 5.0g (HF2)
     * @returns `true` if successful, otherwise `false`
     */
    invalidateFolderCache(): boolean;
    /**
     * **Gather information whether the current user is absent.**
     *
     * @since DOCUMENTS 5.0g
     * @returns `true` if the user is absent, otherwise `false`.
     * @see {@link setAbsent}
     */
    isAbsent(): boolean;
    /**
     * **Returns, if the "Superuser"-flag is actually set at the SystemUser.**
     *
     * @since DOCUMENTS 5.0b HF2
     * @returns `true` or `false`
     * @see {@link SystemUser.setSuperUser | SystemUser.setSuperUser}
     * @deprecated since DOCUMENTS 5.0e HF2 - Use Context.setSuperMode(boolean value) / Context.getSuperMode() instead
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * util.out(currentUser.isSuperUser());
     */
    isSuperUser(): boolean;
    /**
     * **Retrieve a list of file types for that an agent exists.**
     *
     * @since DOCUMENTS 5.0a
     * @returns The technical names of the file types. If the agent was set for all filetypes
     * by calling `SystemUser.addFileTypeAgent`, the returned array only contains the string "&#42;".
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var fileTypes = currentUser.listAgentFileTypes();
     * if (fileTypes)
     * {
     *    for (var i=0; i < fileTypes.length; i++)
     *    {
     *       util.out(fileTypes[i]);
     *     }
     * }
     * else
     *    util.out("Error: " + currentUser.getLastError());
     */
    listAgentFileTypes(): string[];
    /**
     * **Retrieve a list of all agents for the desired file type of the user.**
     *
     * @since DOCUMENTS 5.0a
     * @param fileType String containing the technical name of the file type.
     * @returns Array of strings containing login names of all agents for the desired file type.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var loginNames = currentUser.listFileTypeAgents("testFileType");
     * if (loginNames)
     * {
     *    for (var i=0; i < loginNames.length; i++)
     *    {
     *       util.out(loginNames[i]);
     *     }
     * }
     * else
     *    util.out("Error: " + currentUser.getLastError());
     */
    listFileTypeAgents(fileType: string | string[]): string[];
    /**
     * **Define whether to notify the user by e-mail of files returned from sending.**
     *
     * @since DOCUMENTS 5.0a
     * @param notifying
     * boolean indicating whether files returned from sending are to be notified to the user.
     *
     * **Default:** `true`
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.notifyFileReturnedFromSending(true))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    notifyFileReturnedFromSending(notifying?: boolean): boolean;
    /**
     * **Define whether to notify the user by e-mail of new files in inbox.**
     *
     * @since DOCUMENTS 5.0a
     * @param notifying
     * boolean indicating whether new files in inbox are to be notified to the user.
     *
     * **Default:** `true`
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.notifyNewFileInInbox(true))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    notifyNewFileInInbox(notifying?: boolean): boolean;
    /**
     * **Remove file type agents from the user.**
     *
     * @since DOCUMENTS 5.0a
     * @param fileTypes The desired file types may be passed as follows:
     * <ul>
     * <li>String containing the technical name of the desired file type; </li>
     * <li>Array of strings containing the technical names of the desired file types; </li>
     * <li>String constant "*" indicating all file types. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var fileTypes = new Array();
     * fileTypes.push("Filetype1");
     * fileTypes.push("Filetype2");
     * if (!currentUser.removeFileTypeAgent(fileTypes))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    removeFileTypeAgent(fileTypes: string | string[]): boolean;
    /**
     * **Clear the SystemUser's membership in the given AccessProfile.**
     *
     * **Note:** If the user is already logged in, it is necessary to invalidate the cache of the user
     * s. {@link SystemUser.invalidateAccessProfileCache | SystemUser.invalidateAccessProfileCache()}
     *
     * **Since:** ELC 3.50b / otrisPORTAL 5.0b for PartnerAccounts
     * **Since:** DOCUMENTS 4.0b HF1 for Fellows
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param ap
     * @returns `true` if successful, `false` in case of any error
     */
    removeFromAccessProfile(ap: AccessProfile): boolean;
    /**
     * **Clear the user's relation to a superior.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns true if successful, false in case of any error
     */
    resetSuperior(): boolean;
    /**
     * **Set a Systemuser absent or present.**
     *
     * If a Systemuser is on holiday with this function it is possible to set the user absent. After his return you can set him present.
     * You can also define one or more agents for the absent user. The agent will get new files for the absent user in substitution.
     * With the agent list you set the agents for the user (you overwrite the existing agents!). With an empty agent list you remove all agents.
     *
     * **Since:** DOCUMENTS 4.0d (Option: removeFromAgentInbox)
     * **Since:** DOCUMENTS 5.0a (Option: from and until)
     * @since ELC 3.60g / otrisPORTAL 6.0g
     * @param absent boolean `true`, if the user should be set absent, `false`, if the user is present
     * @param filesDueAbsenceToInfo
     * boolean set to `true`, if the user should get the files due absence to info in his inbox
     *
     * **Default:** `true`
     * @param agents
     * Array with the login-names of the agents
     *
     * **Default:** `[]`
     * @param removeFromAgentInbox
     * Optional boolean indicating whether the files are removed from agent inbox after getting back by the user. If this parameter is not specified,
     * the value from the user settings in the absent dialog on the web is used.
     *
     * **Default:** `false`
     * @param from
     * Optional Date object specifying when the absence begins.
     * @param until
     * Optional Date object specifying when the absence ends.
     * @returns `true` if correct, otherwise `false` an error message describing the error with getLastError().
     * @see
     * {@link setAbsentMail}
     * {@link delegateFilesOfAbsentUser}
     * {@link getBackDelegatedFiles}
     * {@link SystemUserIterator}
     * {@link getAgents}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * // set user absent
     * var agents = new Array();
     * agents.push("oppen");
     * agents.push("buch");
     * var from = new Date();
     * var until = context.addTimeInterval(from, 3, "days", false);
     * if (!currentUser.setAbsent(true, false, agents, true, from, until))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     * // set user present
     * if (!currentUser.setAbsent(false))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    setAbsent(absent: boolean, filesDueAbsenceToInfo?: boolean, agents?: string[], removeFromAgentInbox?: boolean, from?: Date, until?: Date): boolean;
    /**
     * **Define if an absence mail for the absent user will be sent to the sender of the file.**
     *
     * If a Systemuser is absent and get a file in the inbox, an absence mail to the sender of this file can be send.
     * @since ELC 3.60g / otrisPORTAL 6.0g
     * @param sendMail boolean `true`, if an absent mail should be sent, otherwise `false`
     * @param message String with an additional e-mail message from the absent user
     * @returns `true` if succeeded, otherwise `false` - an error message describing the error with getLastError().
     * @see
     * {@link setAbsent}
     * {@link delegateFilesOfAbsentUser}
     * {@link SystemUserIterator}
     * {@link getAgents}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * if (!currentUser.setAbsentMail(true, "I will be back on 12/31 2009"))
     *    util.out("Error: " + currentUser.getLastError());
     * else
     *    util.out("OK.");
     */
    setAbsentMail(sendMail: boolean, message?: string): boolean;
    /**
     * **Set the AccessProfiles for an user.**
     *
     * All existing AccessProfiles will be removed and the AccessProfiles from the parameters will be set.
     * @since DOCUMENTS 5.0c HF2
     * @param apNames1 String or Array with the names of the AccessProfiles
     * @param apNames2 String or Array with the names of the AccessProfiles
     * @param ...restParams
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var val1 = ["AP1", "AP2"];
     * var val2 = "AP3\r\nAP4";
     * var user = context.getSystemUser();
     * if (!user.setAccessProfiles(val1, val2))
     *    throw user.getLastError();
     */
    setAccessProfiles(apNames1: any, apNames2: any, ...restParams: any[]): boolean;
    /**
     * **Set the String value of an attribute of the SystemUser to the desired value.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Turn EASYWARE Authentication on or off.**
     *
     * @since DOCUMENTS 5.0c HF2
     * @param value boolean `true` to turn authentication on `false` to turn it off.
     * @returns `true` if successful, `false` in case of any error
     */
    setEasywareAuthentication(value: boolean): boolean;
    /**
     * **Creates a new CustomProperty or modifies a CustomProperty according the name and type for the user.**
     *
     * This method creates or modifies a unique CustomProperty for the user. The combination of the name and the type make the CustomProperty unique for the user.
     * @since DOCUMENTS 4.0a
     * @param name String value defining the name
     * @param type String value defining the type
     * @param value String value defining the value
     * @returns CustomProperty
     * @see
     * {@link SystemUser.getCustomProperties | SystemUser.getCustomProperties}
     * {@link SystemUser.addCustomProperty | SystemUser.addCustomProperty}
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * var custProp = currentUser.setOrAddCustomProperty("superior", "string", "oppen");
     * if (!custProp)
     *   util.out(currentUser.getLastError());
     */
    setOrAddCustomProperty(name: string, type: string, value: string): CustomProperty;
    /**
     * **Set the password of the user represented by the SystemUser object to the desired new value.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param newPwd String containing the plaintext new password
     * @param checkRestriction
     * boolean if true, check if password is strong (see property StrongPasswords)
     *
     * **Default:** `false`
     * @returns `true` if successful, `false` in case of any error
     */
    setPassword(newPwd: string, checkRestriction?: boolean): boolean;
    /**
     * **Set the status of the SystemUser.**
     *
     * @since DOCUMENTS 5.0g
     * @param status String with the desired value of the status. There are following values available:
     *
     * + `inherited`
     * + `released`
     * + `registered`
     * + `blocked`
     * + `removable`
     *
     * @returns `true` if successful, `false` in case of any error
     * @see {@link SystemUser.getStatus | SystemUser.getStatus}
     * @example
     * var currUser = context.getSystemUser();
     * if (!currUser.setStatus("released"))
     *   throw currUser.getLastError();
     */
    setStatus(status: string): boolean;
    /**
     * **Set the SystemUser object representing the superior of the user to the desired object.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @param sup Systemuser object representing the new superior of the user
     * @returns true if successful, false in case of any error
     */
    setSuperior(sup: SystemUser): boolean;
    /**
     * **Set and unset "Superuser"-flag at the SystemUser.**
     *
     * The method gives "superrights" to the user and overrules the DOCUMENTS right management. e.g. if you use (G)ACL in a filetype,
     * the Superuser will find all files, independed from the content of the ACL field...
     * @since DOCUMENTS 4.0a HF2
     * @param value boolean to set / unset superuser-flag
     * @returns
     * @deprecated since DOCUMENTS 5.0e HF2 - Use Context.setSuperMode(boolean value) instead
     * @example
     * var currentUser = context.getSystemUser();
     * if (!currentUser) throw "currentUser is NULL";
     * currentUser.setSuperUser(true);
     * // do something with super rights
     * currentUser.setSuperUser(false);  // Important: unset the rights!
     */
    setSuperUser(value: boolean): void;
}
/**
 * **The SystemUserIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS users by scripting means.**
 *
 * The objects of this class represent lists of Systemuser objects and allow to loop through such a list of users.
 * @since ELC 3.50b / otrisPORTAL 5.0b
 */
declare interface SystemUserIterator {
    /**
     * **Retrieve the first {@link SystemUser} object in the SystemUserIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns SystemUser or `null` in case of an empty SystemUserIterator
     */
    first(): SystemUser;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the next {@link SystemUser} object in the SystemUserIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns SystemUser or `null` if end of SystemUserIterator is reached.
     */
    next(): SystemUser;
    /**
     * **Get the amount of {@link SystemUser} objects in the SystemUserIterator.**
     *
     * @since ELC 3.50b / otrisPORTAL 5.0b
     * @returns integer value with the amount of SystemUser objects in the SystemUserIterator
     */
    size(): number;
}
/**
 * **The Alias class has been added to the DOCUMENTS Portalscript API to gain full access to the DOCUMENTS alias by scripting means.**
 *
 * An Alias object isn't created directly. You can get it using the {@link Context.createAlias | Context.createAlias} function.
 * @since DOCUMENTS 5.0i HF6
 */
declare interface Alias {
    /**
     * **The technical name of the alias.**
     *
     * @since DOCUMENTS 5.0i HF6
     */
    readonly name: string;
    /**
     * **The label of the alias.**
     *
     * @since DOCUMENTS 5.0i HF7
     */
    readonly label: string;
    /**
     * **Returns the {@link SystemUser} currently assigned to this alias.**
     *
     * @since DOCUMENTS 5.0i HF6
     */
    readonly systemUser: SystemUser;
    /**
     * **Set the name of the alias.**
     *
     * The alias will be renamed to the given name.
     * @since DOCUMENTS 5.0i HF6
     * @param name The new name of the alias.
     * @returns `true` if successful, `false` in case of any error
     */
    setName(name: string): boolean;
    /**
     * **Set the label of the alias.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @param label The new label of the alias.
     * @returns `true` if successful, `false` in case of any error
     */
    setLabel(label: string): boolean;
    /**
     * **Set a {@link SystemUser} to the alias.**
     *
     * The old `SystemUser` will be disconnected.
     * @since DOCUMENTS 5.0i HF6
     * @param login The login name of the `SystemUser` to be assigned to this alias.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!testAlias.setSystemUser("schreiber"))
     *    throw testAlias.getLastError();
     */
    setSystemUser(login?: string): boolean;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0i HF6
     * @param shortMessage Flag indicating whether to remove "Error in function: class.method(): " from the message.
     * **Default:** `false`
     * @returns Text of the last error as String
     */
    getLastError(shortMessage?: boolean): string;
}
/**
 * **The AliasIterator class has been added to the DOCUMENTS PortalScripting API to gain full access to the DOCUMENTS aliases by scripting means.**
 *
 * The objects of this class represent lists of {@link Alias} objects and allow to loop through such a list of aliases. The following method
 * returns an AliasIterator: {@link context.getAllAliases | context.getAllAliases}.
 * @since DOCUMENTS 5.0i HF7
 * @example
 * var itAlias = context.getAllAliases();
 * for (var alias = itAlias.first(); alias; alias = itAlias.next())
 * {
 *    // do something
 * }
 */
declare interface AliasIterator {
    /**
     * **Retrieve the first {@link Alias} object in the AliasIterator.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @returns Alias or `null` in case of an empty AliasIterator
     */
    first(): Alias;
    /**
     * **Retrieve the next {@link Alias} object in the AliasIterator.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @returns Alias or `null` if end of AliasIterator is reached.
     */
    next(): Alias;
    /**
     * **Get the amount of {@link Alias} objects in the AliasIterator.**
     *
     * @since DOCUMENTS 5.0i HF7
     * @returns integer value with the amount of Alias objects in the AliasIterator
     */
    size(): number;
}
/**
 * **The GlobalEnumeration class has been added to the DOCUMENTS Portalscript API to gain full access to the DOCUMENTS global enumerations by scripting means.**
 *
 * A GlobalEnumeration object isn't created directly. You can get it using the {@link Context.createGlobalEnumeration | Context.createGlobalEnumeration(name)} function.
 * @since DOCUMENTS 6.0.2
 */
declare interface GlobalEnumeration {
    /**
     * **The technical name of the GlobalEnumeration.**
     *
     * @since DOCUMENTS 6.0.2
     */
    name: string;
    /**
     * **The description of the GlobalEnumeration.**
     *
     * @since DOCUMENTS 6.0.2
     */
    description: string;
    /**
     * **Create a new {@link GlobalEnumerationItem} for the GlobalEnumeration.**
     *
     * @since DOCUMENTS 6.0.2
     * @param name The name of the GlobalEnumerationItem.
     * @returns The new created GlobalEnumerationItem object or `null` if failed.
     * @see {@link GlobalEnumeration.deleteGlobalEnumerationItem | GlobalEnumeration.deleteGlobalEnumerationItem}
     * @example
     * var testEnum = context.createGlobalEnumeration("testEnum");
     * var name = "testItem1";
     * var success = testEnum.createGlobalEnumerationItem(name);
     * if (success)
     * {
     *    util.out("Successfully created GlobalEnumerationItem " + name);
     * }
     */
    createGlobalEnumerationItem(name: string): GlobalEnumerationItem;
    /**
     * **Remove a {@link GlobalEnumerationItem} from the GlobalEnumeration.**
     *
     * @since DOCUMENTS 6.0.2
     * @param name The name of the GlobalEnumerationItem to be removed.
     * @returns `true` if the deletion was successful, `false` in case of any error
     * @see {@link GlobalEnumeration.createGlobalEnumerationItem | GlobalEnumeration.createGlobalEnumerationItem}
     * @example
     * var name = "testItem1";
     * var success = testEnum.deleteGlobalEnumerationItem(name);
     * if (success)
     * {
     *    util.out("Successfully deleted GlobalEnumerationItem " + name);
     * }
     */
    deleteGlobalEnumerationItem(name: string): boolean;
    /**
     * **Get a {@link GlobalEnumerationItemIterator} with all items of the GlobalEnumeration.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumerationItemIterator
     * @example
     * var it = testEnum.getGlobalEnumerationItems();
     * for (var item of it)
     * {
     *    // do something
     * }
     */
    getGlobalEnumerationItems(): GlobalEnumerationItemIterator;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 6.0.2
     * @param shortMessage Flag indicating whether to remove "Error in function: class.method(): " from the message.
     * **Default:** `false`
     * @returns Text of the last error as String
     */
    getLastError(shortMessage?: boolean): string;
}
/**
 * **The GlobalEnumerationItem class has been added to the DOCUMENTS Portalscript API to gain full access to the items of the DOCUMENTS global enumerations by scripting means.**
 *
 * A GlobalEnumerationItem object isn't created directly. You can get it using the {@link GlobalEnumeration.createGlobalEnumerationItem | GlobalEnumeration.createGlobalEnumerationItem(name)} function.
 * @since DOCUMENTS 6.0.2
 */
declare interface GlobalEnumerationItem {
    /**
     * **The technical name of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    name: string;
    /**
     * **This property specifies whether the GlobalEnumerationItem is active.**
     *
     * @since DOCUMENTS 6.0.2
     */
    active: boolean;
    /**
     * **This property specifies the ergonomic value in language 0 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang0: string;
    /**
     * **This property specifies the ergonomic value in language 1 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang1: string;
    /**
     * **This property specifies the ergonomic value in language 2 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang2: string;
    /**
     * **This property specifies the ergonomic value in language 3 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang3: string;
    /**
     * **This property specifies the ergonomic value in language 4 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang4: string;
    /**
     * **This property specifies the ergonomic value in language 5 of the GlobalEnumerationItem.**
     *
     * @since DOCUMENTS 6.0.2
     */
    lang5: string;
    /**
     * **This property specifies whether the GlobalEnumerationItem is a system value.**
     *
     * @since DOCUMENTS 6.0.2
     */
    systemvalue: boolean;
}
/**
 * **The EnumerationIterator class has been added to the DOCUMENTS Portalscript API to gain full access to the DOCUMENTS global enumerations by scripting means.**
 *
 * The objects of this class represent lists of {@link GlobalEnumeration} objects and allow to loop through such a list of global enumerations.
 * The following method returns a GlobalEnumerationIterator: {@link context.getGlobalEnumerations}
 * @since DOCUMENTS 6.0.2
 * @see {@link context.getGlobalEnumerations | context.getGlobalEnumerations}
 * @example
 * var itEnum = context.getGlobalEnumerations();
 * for (var gEnum = itEnum.first(); gEnum; gEnum = itEnum.next())
 * {
 *    // do something
 * }
 */
declare interface GlobalEnumerationIterator {
    /**
     * **Retrieve the first {@link GlobalEnumeration} object in the GlobalEnumerationIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumeration or `null` in case of an empty GlobalEnumerationIterator
     */
    first(): GlobalEnumeration;
    /**
     * **Retrieve the next {@link GlobalEnumeration} object in the GlobalEnumerationIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumeration or `null` if end of GlobalEnumerationIterator is reached.
     */
    next(): GlobalEnumeration;
    /**
     * **Get the amount of {@link GlobalEnumeration} objects in the GlobalEnumerationIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns Integer value with the amount of GlobalEnumeration objects in the GlobalEnumerationIterator
     */
    size(): number;
}
/**
 * **The EnumerationItemIterator class has been added to the DOCUMENTS Portalscript API to gain full access to the items of the DOCUMENTS global enumerations by scripting means.**
 *
 * The objects of this class represent lists of {@link GlobalEnumerationItem} objects and allow to loop through such a list of global enumeration items.
 * The following method returns a GlobalEnumerationItemIterator: {@link GlobalEnumeration.getGlobalEnumerationItems}
 * @since DOCUMENTS 6.0.2
 * @see {@link GlobalEnumeration.getGlobalEnumerationItems | GlobalEnumeration.getGlobalEnumerationItems}
 * @example
 * var itItem = testEnum.getGlobalEnumerationItems();
 * for (var item = itItem.first(); item; item = itItem.next())
 * {
 *    // do something
 * }
 */
declare interface GlobalEnumerationItemIterator {
    /**
     * **Retrieve the first {@link GlobalEnumerationItem} object in the GlobalEnumerationItemIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumerationItem or `null` in case of an empty GlobalEnumerationItemIterator
     */
    first(): GlobalEnumerationItem;
    /**
     * **Retrieve the next {@link GlobalEnumerationItem} object in the GlobalEnumerationItemIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns GlobalEnumerationItem or `null` if end of GlobalEnumerationItemIterator is reached.
     */
    next(): GlobalEnumerationItem;
    /**
     * **Get the amount of {@link GlobalEnumerationItem} objects in the GlobalEnumerationItemIterator.**
     *
     * @since DOCUMENTS 6.0.2
     * @returns Integer value with the amount of GlobalEnumerationItem objects in the GlobalEnumerationItemIterator
     */
    size(): number;
}
/**
 * The UserAction class represents the user-defined action of DOCUMENTS.
 */
declare class UserAction {
    /**
     * **Create a new instance of the UserAction class.**
     *
     *
     * **Since:** DOCUMENTS 4.0d
     * **Since:** DOCUMENTS 5.0i a global user-defined action will be created.
     * @since DOCUMENTS 4.0d
     * @example
     * var folder = context.createFolder("test", "public");
     * var action = new UserAction("testAction");
     * action.widget = "DropdownList";
     * action.setFileTypeForNewFile("FileType1");
     * if (!action.addToFolder(folder))
     *   util.out(action.getLastError());
     * @param name String value containing the desired user action name.
     * @param label String value containing the desired user action label.
     * @param widget
     * String value containing the desired user action widget.
     *
     * **Default:** `"Button"`
     * @param type
     * String value containing the desired user action type.
     *
     * **Default:** `"NewFile"`
     * @param scope
     * String value containting the desired user action scope.
     *
     * **Default:** `"Unrestricted"`
     * @see
     * {@link UserAction.widget}
     * {@link UserAction.type}
     * {@link UserAction.scope}
     * @example
     * var action = new UserAction("testAction", "de:Aktion;en:Action", "DropdownList", "PortalScript", "ProcessesOnly");
     */
    constructor(name: string, label?: string, widget?: string, type?: string, scope?: string);
    /**
     * **The entire label defined for the UserAction object.**
     *
     * @since DOCUMENTS 4.0d
     */
    label: string;
    /**
     * **The technical name of the UserAction object.**
     *
     * @since DOCUMENTS 4.0d
     */
    name: string;
    /**
     * **The scope of the UserAction object.**
     *
     * @since DOCUMENTS 4.0d
     */
    scope: string;
    /**
     * **The type of the UserAction object.**
     *
     * @since DOCUMENTS 4.0d
     */
    type: string;
    /**
     * **The widget identifier of the UserAction object.**
     *
     * @since DOCUMENTS 4.0d
     */
    widget: string;
    /**
     * **Add the user action to a {@link Folder}.**
     *
     * @since DOCUMENTS 4.0d
     * @param folder Folder object representing the desired Folder.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var it = context.getFoldersByName("testFolder");
     * var folder = it.first();
     * if (folder)
     * {
     *   var action = new UserAction("testAction");
     *   if (action)
     *   {
     *       if (!action.addToFolder(folder))
     *           util.out(action.getLastError());
     *   }
     * }
     */
    addToFolder(folder: Folder): boolean;
    /**
     * **Get the String value of an attribute of the user action.**
     *
     * @since DOCUMENTS 4.0d
     * @param attribute String containing the name of the desired attribute.
     * @returns String containing the value of the desired attribute.
     */
    getAttribute(attribute: string): string;
    /**
     * **Get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 4.0d
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since DOCUMENTS 4.0d
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the user action object (`m_oid`) will be returned.
     * If `false` the id of the user action object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns `String` with the object-id or an empty string in case of any error.
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Retrieve the position of the user action within the user-defined action list of the parent object.**
     *
     * @since DOCUMENTS 4.0d
     * @returns The zero-based position of the user action as integer or -1 in case of any error.
     * @example
     * var it = context.getFoldersByName("testFolder");
     * var folder = it.first();
     * if (folder)
     * {
     *   var action = folder.getActionByName("testAction");
     *   if (action)
     *       util.out(action.getPosition());
     * }
     */
    getPosition(): number;
    /**
     * **Remove the user-defined action from DOCUMENTS.**
     *
     * @since DOCUMENTS 4.0d
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var it = context.getFoldersByName("testFolder");
     * var folder = it.first();
     * if (folder)
     * {
     *   var action = folder.getActionByName("testAction");
     *   if (action)
     *       action.remove();
     * }
     */
    remove(): boolean;
    /**
     * **Set the String value of an attribute of the user action to the desired value.**
     *
     * @since DOCUMENTS 4.0d
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Set the context for a user action of type JSP.**
     *
     * **Note:** This function is only available for a user action of type JSP.
     * @since DOCUMENTS 4.0d
     * @param context String containing the desired context.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var action = new UserAction("testAction");
     * action.type = "JSP";
     * if (!action.setContext("myContext"))
     *   util.out(action.getLastError());
     */
    setContext(context: string): boolean;
    /**
     * **Set the flag whether to create the default workflow for a user action of type NewFile.**
     *
     * **Note:** This function is only available for a user action of type NewFile.
     * @since DOCUMENTS 4.0d
     * @param createDefaultWorkflow Flag indicating whether to create the default workflow for a new file.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var action = new UserAction("testAction");
     * if (!action.setCreateDefaultWorkflow(false))
     *   util.out(action.getLastError());
     */
    setCreateDefaultWorkflow(createDefaultWorkflow: boolean): boolean;
    /**
     * **Set the file type for a user action of type NewFile.**
     *
     * **Note:** This function is only available for a user action of type NewFile.
     * @since DOCUMENTS 4.0d
     * @param fileType The technical name of the desired file type; use empty string ('') if you want to remove the associated file type.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var action = new UserAction("testAction");
     * if (!action.setFileTypeForNewFile("Filetype1"))
     *   util.out(action.getLastError());
     * // You can remove the file type as follows:
     * action.setFileTypeForNewFile('');
     */
    setFileTypeForNewFile(fileType: string): boolean;
    /**
     * **Set the portal script for a user action of type PortalScript.**
     *
     * **Note:** This function is only available for a user action of type PortalScript.
     * @since DOCUMENTS 4.0d
     * @param scriptName The name of the desired portal script; use empty string ('') if you want to remove the associated script.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var action = new UserAction("testAction");
     * action.type = "PortalScript";
     * if (!action.setPortalScript("testScript"))
     *   util.out(action.getLastError());
     * // You can remove the script as follows:
     * action.setPortalScript('');
     */
    setPortalScript(scriptName: string): boolean;
    /**
     * **Place the user action at the given position in the user-defined action list of the parent object.**
     *
     * **Note:** 0 at the beginning and -1 at the end.
     * @since DOCUMENTS 4.0d
     * @param position The 0-based position for the user action.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var it = context.getFoldersByName("testFolder");
     * var folder = it.first();
     * if (folder)
     * {
     *   var action = folder.getActionByName("testAction");
     *   if (action)
     *       action.setPosition(-1);
     * }
     */
    setPosition(position: number): boolean;
}
/**
 * This is the ONE implicit object of the class {@link Util | `Util`}.
 */
declare const util: Util;
/**
 * **The Util class supports some functions that do not need any user or file context.**
 *
 * These functions allow customizable Date/String conversions and other useful stuff.
 * There is exactly ONE implicit object of the class {@link Util | `Util`} which is named {@link util | `util`}.
 *
 * **Note:**
 * It is not possible to create objects of the class Util. There are no properties
 * in this class, it supports only the help functions as documented below.
 *
 * @groupDescription JSON-Mode Constants
 * These constants build an enumeration of the possible values for the {@link DocFile.asJSON | Docfile.asJSON()} method.
 * **Since** DOCUMENTS 5.0f
 */
declare interface Util {
    /**
     * @group JSON-Mode Constants
     */
    JSON_RAW: number;
    /**
     * @group JSON-Mode Constants
     */
    JSON_LABEL: number;
    /**
     * @group JSON-Mode Constants
     */
    JSON_LOCALE: number;
    /**
     * **Build version number of the PortalServer.**
     *
     * This property allows to retrieve the build version number of the PortalServer to customize your PortalScripts in dependence of the used PortalServer.
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * if (util.buildNo > 1826)
     * {
     *    // do update
     * }
     */
    buildNo: number;
    /**
     * **Database using by the PortalServer.**
     *
     * The following databases are supported by the PortalServer:
     *
     * + `oracle`
     * + `mysql`
     * + `mssql`
     *
     * @since DOCUMENTS 4.0
     */
    DB: string;
    /**
     * **Memory model of the PortalServer.**
     *
     * There are two possible memory models available : x64 or x86.
     * @since DOCUMENTS 4.0
     */
    memoryModel: string;
    /**
     * **Main version number of the PortalServer.**
     *
     * This property allows to retrieve the version number of the PortalServer to customize your PortalScripts in dependence of the used PortalServer.
     * For example:
     * <ul>
     * <li>otrisPORTAL 5.1 / ELC 3.51 returns 5100 </li>
     * <li>otrisPORTAL 6.0 / ELC 3.60 returns 6000 </li>
     * <li>DOCUMENTS 4.0 returns 7000</li>
     * </ul>
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @example
     * if (util.version < 6000)
     * {
     *    // do update
     * }
     */
    version: number;
    /**
     * **Decodes a base64 string and returns a string or byte-array.**
     *
     * @since DOCUMENTS 4.0c HF1
     * @param value String to decode
     * @param returnArray
     * boolean as an optional parameter to define if the return value must be a byte-array or string (default)
     *
     * **Default:** `false`
     * @returns decoded string or byte-array
     * @example
     * var b64Str = util.base64Encode("Hello World");
     * util.out(b64Str);   // SGVsbG8gV29ybGQ=
     * var str = util.base64Decode(b64Str);
     * util.out(str);      // Hello World
     * var byteArr = util.base64Decode(b64Str, true);
     * util.out(byteArr);  // 72,101,108,108,111,32,87,111,114,108,100
     * b64Str = util.base64Encode(byteArr);
     * util.out(b64Str);   // SGVsbG8gV29ybGQ=
     */
    base64Decode(value: string, returnArray?: boolean): any;
    /**
     * **Encodes a byte-array or string to base64 and returns the base 64 string.**
     *
     * **Note:** The URL style uses the characters '-' and '_' in place of '+' and '/', and it does not allow padding characters ('=').
     * {@link base64Decode | base64Decode()} does actually not support this style.
     *
     * **Since:** 5.0d HF2 urlStyle
     *
     * @since DOCUMENTS 4.0c HF1
     * @param value String or byte-array to encode
     * @param urlStyle
     * optional boolean flag to request Base64URL encoding instead of standard Base64 encoding
     *
     * **Default:** `false`
     * @returns base64 encoded string
     * @example
     * var b64Str = util.base64Encode("Hello World");
     * util.out(b64Str);   // SGVsbG8gV29ybGQ=
     * var str = util.base64Decode(b64Str);
     * util.out(str);      // Hello World
     * var byteArr = util.base64Decode(b64Str, true);
     * util.out(byteArr);  // 72,101,108,108,111,32,87,111,114,108,100
     * b64Str = util.base64Encode(byteArr);
     * util.out(b64Str);   // SGVsbG8gV29ybGQ=
     */
    base64Encode(value: any, urlStyle?: boolean): string;
    /**
     * **Plays a beep sound at the PortalServer's system.**
     *
     * For testing purposes a beep sound can be played at the server
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param frequency int with the frequency in hertz
     * @param duration int with the length of the sound in milliseconds (ms)
     * @returns
     * @example
     * util.beep(1250, 3000);
     */
    beep(frequency: number, duration: number): void;
    /**
     * **Concatenate the given PDFs together into one PDF.**
     *
     * @since DOCUMENTS 4.0c
     * @param pdfFilePaths Array containing the file paths of PDFs to be concatenated.
     * @param deleteSinglePdfs
     * Optional boolean value to decide whether to delete the single PDFs on the server's filesystem after concatenating.
     *
     * **Default:** `false`
     * @returns String with file path of the PDF, an empty string in case of any error.
     * @example
     * var arr = ["C:\\temp\\number1.pdf", "C:\\temp\\number2.pdf"];
     * var filePath = util.concatPDF(arr, false);
     * util.out("PDF file path: " + filePath);
     */
    concatPDF(pdfFilePaths: any[], deleteSinglePdfs?: boolean): string;
    /**
     * **Convert a file to a PDF file and return the path in the file system.**
     *
     * The different file types require the appropriate PDF filter programs to be installed and configured in DOCUMENTS.
     * @since DOCUMENTS 4.0d HF3
     * @param sourceFilePath String containing the path of the file to be converted.
     * @returns `String` with file path of the PDF, an empty string in case of any error.
     * @example
     * var pathPdfFile = util.convertBlobToPDF("C:\\tmp\\testFile.doc");
     * util.out(pathPdfFile);
     */
    convertBlobToPDF(sourceFilePath: string): string;
    /**
     * **Convert a Date object to an Excel numeric date format.**
     *
     * Excel stores timestamp as a double value. This value exists by two parts. The pre-decimal position is the amount of days since 01.01.1900.
     * The fractional part is the percential time in day.
     * <ul>
     * <li>e.g. 10.01.1900 12:00 => 10.5</li>
     * <li>e.g. 19.10.2018 14:30: => 43392.6042</li>
     * </ul>
     * A date before 01.03.1900 can not be converted. The method will return -1.0.
     * @since DOCUMENTS 5.0e
     * @param timeStamp Date object representing the desired date
     * @returns double as excel date representation
     * @example
     * var now = new Date();
     * var excelDate = util.convertDateToExcelDate(now);
     * if (excelDate < 0.0)
     *    util.out("I can only convert dates that are after 01.03.1900")
     * else
     *    util.out(excelDate + " is now a numeric value");
     */
    convertDateToExcelDate(timeStamp: Date): number;
    /**
     * **Convert a Date object representing a date into a String.**
     *
     * The output String may have any format you like. The second parameter defines the format to configure which part of the date String should match the according properties of the Date object.
     *
     * **Since:** DOCUMENTS 5.0a (new: Special formats `"@date"` and `"@timestamp"`)
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param timeStamp Date object representing the desired date
     * @param format String defining the date format of the output String, e.g. "dd.mm.yyyy".
     *
     * The possible format parts are:
     * + `dd` = two digit day
     * + `mm` = two digit month
     * + `yy` = two digit year
     * + `yyyy` = four digit year
     * + `HH` = two digit hour (24 hour format)
     * + `MM` = two digit minute
     * + `SS` = two digit second
     *
     * Special formats:
     * + `@date` = `@yyyymmdd` (locale independant format for filter in a {@link FileResultset}, {@link HitResultset})
     * + `@timestamp` = `@yyyymmddHHMMSS` (locale independant format for filter in a {@link FileResultset}, {@link HitResultset})
     *
     * @returns String representing the desired date
     * @see
     * {@link util.convertStringToDate | util.convertStringToDate}
     * {@link context.convertDateToString | context.convertDateToString}
     * @example
     * var format = "dd.mm.yyyy HH:MM";
     * var now = new Date();
     * util.out(util.convertDateToString(now, format));
     */
    convertDateToString(timeStamp: Date, format: string): string;
    /**
     * **Convert a String representing a date into a Date object.**
     *
     * The String may contain a date or timestamp in any date format you like. The second parameter defines the format to configure which part of
     * the date String should match the according properties of the Date object.
     *
     * **Since:** DOCUMENTS 5.0a (new: Special formats `"@date"` and `"@timestamp"`)
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param dateOrTimeStamp String representing a date, e.g. "19.09.1974"
     * @param format String defining the date format of the input String, e.g. "dd.mm.yyyy".
     *
     * The possible format parts are:
     * + `dd` = two digit day
     * + `mm` = two digit month
     * + `yy` = two digit year
     * + `yyyy` = four digit year
     * + `HH` = two digit hour (24 hour format)
     * + `MM` = two digit minute
     * + `SS` = two digit second
     *
     * Special formats:
     * + `@date` = `@yyyymmdd` (locale independant format for filter in a {@link FileResultset}, {@link HitResultset})
     * + `@timestamp` = `@yyyymmddHHMMSS` (locale independant format for filter in a {@link FileResultset}, {@link HitResultset})
     *
     * @returns Date object representing the desired date
     * @see {@link util.convertDateToString | util.convertDateToString}
     * @example
     * var format = "dd.mm.yyyy HH:MM";
     * var dateString = "19.09.1974";
     * var birthDay = util.convertStringToDate(dateString, format);
     */
    convertStringToDate(dateOrTimeStamp: string, format: string): Date;
    /**
     * **Encrypt a plain password into an MD5 hash.**
     *
     * @since ELC 3.50o / otrisPORTAL 5.0o
     * @param pwPlain String containing the plain password
     * @returns String containing the encrypted password
     * @example
     * var cryptPW = util.cryptPassword("Hello World");
     * util.out(cryptPW);
     */
    cryptPassword(pwPlain: string): string;
    /**
     * **Returns the decoded URI String.**
     *
     * @since DOCUMENTS 5.0h
     * @param uriComponent String with the encoded URI component
     * @returns String with decoded content
     * @see {@link util.encodeURIComponent | util.encodeURIComponent}
     * @example
     * const text = "I live in München";
     * const encText = util.encodeURIComponent(text);   // I%20live%20in%20M%C3%BCnchen
     * const url = "https://api.deepl.com/v2/translate/?auth_key=123&target_lang=DE&text=" + encText;
     * const decodedText = util.decodeURIComponent(encText);
     */
    decodeURIComponent(uriComponent: string): string;
    /**
     * **Decode URL parameter from DOCUMENTS Urls.**
     *
     * @since DOCUMENTS 5.0a
     * @param encodedParam String containing the encoded URL param
     * @returns `String` with decoded URL param.
     * @see {@link util.encodeUrlCompatible | util.encodeUrlCompatible}
     * @example
     * // URL with an archive key
     * var encUrl = "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
     *               pri=easyhr&lang=de#fi_96:3020/
     *               id_{ehrmEmployeeDocument$EAstore2$HMUnit$DNDefault$CPInstance$DNDefault$CPPool$DNAdaptive
     *               $CPPool$DNAdaptive02$CPDocument$DNADAPTIVE$CO060C8A9C3A1811E6B75A000C29E0A93B}
     *               /ri_FileCover/di_easyhrdc0000000000000497";
     * var decUrl = util.decodeUrlCompatible(encUrl);
     * decUrl == "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn
     *            ?pri=easyhr&lang=de#fi_96:3020/
     *            id_{ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=Adaptive/Pool=
     *            Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B}
     *            /ri_FileCover/di_easyhrdc0000000000000497";
     */
    decodeUrlCompatible(encodedParam: string): string;
    /**
     * **Decrypts a String value hat was encrypted with the method {@link Util.encryptString | Util.encryptString(String input)}**
     *
     * @since DOCUMENTS 5.0b
     * @param input The string that will be decrypted
     * @returns String decrypted value
     * @see {@link util.encryptString | util.encryptString}
     * @example
     * var text = "I'm a secret password";
     * var encryptedText = util.encryptString(text);
     * util.out(encryptedText);  // NABPIGCGBHEBBOMECMJHDBHIIHOCDNOMODEILCABDKOLJBMFBKDDOFDABNAMCLJC
     * var decryptedText = util.decryptString(encryptedText);
     * util.out(decryptedText);  // I'm a secret password
     */
    decryptString(input: string): string;
    /**
     * **Deletes a directory including all its subdirectories and files.**
     *
     * @since DOCUMENTS 5.0h
     * @param dirPath String with the path to the directory to be deleted on the server.
     * @returns empty String if successful, the error message in case of any error
     * @example
     * var errMsg = util.deleteDirectory("c:\\tmp\\test");
     * if (errMsg.length > 0)
     *     util.out(errMsg);
     * else
     *     util.out("Ok.");
     */
    deleteDirectory(dirPath: string): string;
    /**
     * **Delete a file (file system object) at the PortalServer's system.**
     *
     * This functions provides a simple delete method for files on the server's file system.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param filePath String with the file path
     * @returns empty String if successful, the error message in case of any error
     * @example
     * var errMsg = util.deleteFile("c:\\Test.log");
     * if (errMsg.length > 0)
     *     util.out(errMsg);
     * else
     *     util.out("Ok.");
     */
    deleteFile(filePath: string): string;
    /**
     * **Execute OCR for the document and create a searchable pdf-document.**
     *
     * The doOCR method will create a searchable pdf-document and returns the path to the document.
     *
     * **Note:** OCR license is necessary
     * @since DOCUMENTS 5.0i HF3
     * @param filePath String with the path to binary (jpg, png, tif, pdf)
     * @param options String containing an optional value; currently supported "-f 2 -l 3" => create a new searchable pdf containing the pages 2-3
     * @returns filePath of the searchable pdf-documents
     */
    doOCR(filePath: string, options?: string): string;
    /**
     * **Returns the URI encoded String.**
     *
     * @since DOCUMENTS 5.0g
     * @param uriComponent String with the URI component
     * @returns String with encoded content
     * @see {@link util.decodeURIComponent | util.decodeURIComponent}
     * @example
     * const text = "I live in München";
     * const encText = util.encodeURIComponent(text);   // I%20live%20in%20M%C3%BCnchen
     * const url = "https://api.deepl.com/v2/translate/?auth_key=123&target_lang=DE&text=" + encText;
     */
    encodeURIComponent(uriComponent: string): string;
    /**
     * **Encode URL parameter for DOCUMENTS Urls.**
     *
     * Some parameters in DOCUMENTS urls must be encoded. E.g. the archive keys can contain invalid characters like / etc.
     * @since DOCUMENTS 5.0a
     * @param param String containing the value to encode
     * @returns `String` with encoded value.
     * @see {@link util.decodeUrlCompatible | util.decodeUrlCompatible}
     * @example
     * // URL with an archive key
     * var url = "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
     *            pri=easyhr&lang=de#fi_96:3020/
     *            id_{ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=Adaptive/Pool=
     *            Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B}
     *            /ri_FileCover/di_easyhrdc0000000000000497";
     * // The archive key is the value between  id_{   }
     * // "ehrmEmployeeDocument@store2|Unit=Default/Instance=Default/Pool=
     * //  Adaptive/Pool=Adaptive02/Document=ADAPTIVE.060C8A9C3A1811E6B75A000C29E0A93B"
     * // this key must be encoded
     * var encUrl = encodeURL(url);
     * encUrl == "http://localhost:8080/documents/UserLoginSuccessAction.act;cnvid=n0RIshUTRnOH3qAn?
     *            pri=easyhr&lang=de#fi_96:3020/
     *            id_{ehrmEmployeeDocument$EAstore2$HMUnit$DNDefault$CPInstance$DNDefault$CPPool$DNAdaptive
     *            $CPPool$DNAdaptive02$CPDocument$DNADAPTIVE$CO060C8A9C3A1811E6B75A000C29E0A93B}
     *            /ri_FileCover/di_easyhrdc0000000000000497";
     * function encodeURL(url)
     * {
     *    // RegEx to split the url in it's parts
     *    var reg = /(.*id_{)(.*)(}.*)/
     *    if (!url.match(reg))
     *       throw "unable to encode";
     *    var part1 = RegExp.$1;
     *    var partKey = RegExp.$2;
     *    var part3 = RegExp.$3;
     *    return encoded = part1 + util.encodeUrlCompatible(partKey) + part3;
     * }
     */
    encodeUrlCompatible(param: string): string;
    /**
     * **Encrypts a String value with the AES 256 CBC algorithm for symmetric encryption/decryption.**
     *
     * The length of the input String is limited to 1024 bytes. The encrypted value depends on the principal name. Usage is e.g. storing of passwords
     * in the database for authorization against 3rd party web services.
     *
     * **Since:** DOCUMENTS 5.0i HF1 max length 4096 bytes
     * @since DOCUMENTS 5.0b
     * @param input The string that will be encrypted
     * @returns String encrypted value
     * @see {@link util.decryptString | util.decryptString}
     * @example
     * var text = "I'm a secret password";
     * var encryptedText = util.encryptString(text);
     * util.out(encryptedText);  // NABPIGCGBHEBBOMECMJHDBHIIHOCDNOMODEILCABDKOLJBMFBKDDOFDABNAMCLJC
     * var decryptedText = util.decryptString(encryptedText);
     * util.out(decryptedText);  // I'm a secret password
     */
    encryptString(input: string): string;
    /**
     * **Extracts the text content of a document (e.g. docx) or returns the OCR content of binary (e.g. tif, pdf).**
     *
     * This method has two modes. Mode 1 is the OCR Mode. If you call the method with at minimum
     * two parameters (`filePath` and `textFormat`), then an OCR of the document (e.g. tif, pdf) will
     * be done and the content will be returned in the desired textFormat (**Note:** OCR license is necessary)
     *
     * Mode 2 is the extraction mode. If you call the method with exatct one parameter (`filePath`)
     * the text of the document (e.g. docx) will be extracted if an
     * appropriate extract program is defined in the `documents.ini: $extracttext.docx`.
     * If no extract program is defined for the document, then an OCR with default values will be done.
     *
     * **Since:** DOCUMENTS 5.0i HF3: Parameter options
     *
     * **Since:** DOCUMENTS 6.0.1: Mode for text extraction
     * @since DOCUMENTS 5.0f HF2
     * @param filePath String with the path to binary (jpg, png, tif, pdf)
     * @param textFormat String "txt" or "alto"
     * @param options String containing an optional value; currently supported "-f 2 -l 3" => only extract from pages 2-3
     * @returns String with text content
     */
    extractText(filePath: string, textFormat?: string, options?: string): string;
    /**
     * **Copy a file (file system object) at the PortalServer's system.**
     *
     * This functions provides a simple copy method for files on the server's file system.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param sourceFilePath String with the source file path
     * @param targetFilePath String with the target file path
     * @returns empty String if successful, the error message in case of any error
     * @see {@link util.fileMove | util.fileMove}
     * @example
     * var errMsg = util.fileCopy("c:\\Test.log", "d:\\Test.log");
     * if (errMsg.length > 0)
     *     util.out(errMsg);
     * else
     *     util.out("Ok.");
     */
    fileCopy(sourceFilePath: string, targetFilePath: string): string;
    /**
     * **Move a file (file system object) at the PortalServer's system from a source file path to the target file path.**
     *
     * This functions provides a simple move method for files on the server's file system.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param sourceFilePath String with the source file path
     * @param targetFilePath String with the target file path
     * @returns empty String if successful, the error message in case of any error
     * @see {@link util.fileCopy | util.fileCopy}
     * @example
     * var errMsg = util.fileMove("c:\\Test.log", "d:\\Test.log");
     * if (errMsg.length > 0)
     *     util.out(errMsg);
     * else
     *     util.out("Ok.");
     */
    fileMove(sourceFilePath: string, targetFilePath: string): string;
    /**
     * **Retrieve the filesize of a file (file system object) at the PortalServer's system.**
     *
     * This functions returns the filesize of a file.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param filePath String with the file path
     * @returns Int with file size if successful, the value -1 in case of any error
     * @example
     * var size = util.fileSize("c:\\Test.log");
     * if (size < 0)
     *     util.out("File does not exist.");
     * else
     *     util.out(size);
     */
    fileSize(filePath: string): number;
    /**
     * **Creates a MD5 checksum for the String value.**
     *
     * @since DOCUMENTS 4.0c
     * @param input The string for that the checksum will be generated
     * @returns String with the checksum
     * @example
     * var text = "I'm some type of text";
     * var md5 = util.generateChecksum(text);
     * if (md5 != "a77c16d60b9939295c0af4c7242b6c02")
     *    util.out("wrong md5!");
     */
    generateChecksum(input: string): string;
    /**
     * **Returns the base url of the web application.**
     *
     * @since DOCUMENTS 5.0i HF1
     * @returns `String` with the URL.
     */
    getBaseURL(): string;
    /**
     * **Retrieving files and subdirectories of a specified directory.**
     *
     * This function retrieve the content (files, subdirectories) of a specified directory of the PortalServer's file system. It expected two empty Arrays,
     * which the function fill with the filenames and subdirectory names. The names will not contain the full path, only the name itself. This function will not work recursively.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param dirname String containing the name of the wanted directory
     * @param files Empty array for the filenames
     * @param subDirs Empty array for the subdirectory names
     * @returns empty String if successful, the error message in case of any error
     * @example
     * var files = new Array();
     * var dirs = new Array();
     * util.getDir("c:\\Test", files, dirs);
     * var i=0;
     * for (i=0; i < files.length; i++)
     *    util.out(files[i])
     * for (i=0; i < dirs.length; i++)
     *    util.out(dirs[i])
     */
    getDir(dirname: string, files: any[], subDirs: any[]): string;
    /**
     * **Reads an environment variable of the PortalServer's system.**
     *
     * With this function an environment variable in the server's context can be read.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param variableName String with the name of the variable
     * @returns Environment value as String
     * @example
     * util.out(util.getEnvironment("HOME"));
     */
    getEnvironment(variableName: string): string;
    /**
     * **Get the content of a file at the PortalServer's system as string in base64 format.**
     *
     * @since DOCUMENTS 4.0c
     * @param filePath String with the file path.
     * @returns String containing the file content in base64 format.
     */
    getFileContentAsString(filePath: string): string;
    /**
     * **Returns the value of the desired ini parameter.**
     *
     * @since DOCUMENTS 5.0i
     * @param name String containing the name of the ini parameter.
     * @returns `String` with the value or empty string for an unknown parameter.
     * @example
     * var dhs = util.getIniValue("$DefaultHostName");
     * util.out("DefaultHostName: " + dhs);
     */
    getIniValue(name: string): string;
    /**
     * **Returns the input string enclosed in either double or single quotation marks.**
     *
     * This function is designed to simplify the composition of filter expressions for a {@link FileResultSet} or an {@link ArchiveFileResultSet}.
     * If the input string does not contain any double quotation mark ("), the function returns the input enclosed in double quotation marks.
     * Otherwise the function tests if it can use single quotation marks (') instead. If both quotation styles are already used within the input,
     * the function throws an exception.
     * @since DOCUMENTS 4.0b
     * @param input The string to be enclosed
     * @returns String with quotation marks around.
     */
    getQuoted(input: string): string;
    /**
     * **Returns the server OS.**
     *
     * @since DOCUMENTS 5.0e
     * @returns String with the server OS.
     */
    getServerOS(): string;
    /**
     * **Returns the path where the documents server binary is located.**
     *
     * @since DOCUMENTS 5.0f
     * @returns String with the path to the documentsserver binary
     */
    getServerPath(): string;
    /**
     * **Retrieve the scriptName with the current line no of this methed.**
     *
     * This functions returns the scriptName and line no for debugging or logging purposes
     * @since DOCUMENTS 5.0a
     * @returns String with the scriptName and line no
     */
    getSourceLineInfo(): string;
    /**
     * **Get the path to the temporary directory on the Portalserver.**
     *
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @returns String containing the complete path to the temporary directory
     * @example
     * util.out(util.getTmpPath());
     */
    getTmpPath(): string;
    /**
     * **Get a unique id from the system.**
     *
     * The length of the id is 40 characters and the id contains only the characters 'a-z','-','0-9'. This unique id can e.g. be used for file names etc.
     * @since ELC 3.60 / otrisPORTAL 6.0
     * @returns String containing the unique id
     * @example
     * var uniqueId = util.getUniqueId();
     * util.out(uniqueId);
     */
    getUniqueId(): string;
    /**
     * **Returns the current usage of private bytes memory of the documensserver process.**
     *
     * @since DOCUMENTS 5.0b
     * @returns integer value with the used memory in KBytes
     */
    getUsedPrivateBytes(): number;
    /**
     * **Generate the hash value for a file using the given hash function.**
     *
     * These hash functions are supported:
     *
     * + `sha1`
     * + `sha224`
     * + `sha256`
     * + `sha384`
     * + `sha512`
     * + `md4`
     * + `md5`
     * + `whirlpool`
     * + `ripemd160`
     *
     * @since DOCUMENTS 5.0e
     * @param filePath String containing the path of the file to be hashed.
     * @param hashfunction String containing the name of the hash function.
     * @returns String with the hash value of the file, an empty string in case of any error.
     * @see {@link Document.hash | Document.hash}
     * @example
     * try
     * {
     *   var hashValue = util.hash("c:/tmp/dok1.pdf", "sha256");
     *   util.out(hashValue);
     * }
     * catch (ex)
     * {
     *   util.out(ex);
     * }
     */
    hash(filePath: string, hashfunction: string): string;
    /**
     * **Generates a hash-based message authentication code (hmac) of a message string using a secret key.**
     *
     * These hash functions are supported:
     *
     * + `"sha1"`
     * + `"sha224"`
     * + `"sha256"`
     * + `"sha384"`
     * + `"sha512"`
     * + `"md4"`
     * + `"md5"`
     *
     * @since DOCUMENTS 5.0a HF2
     * @param hashfunction Name of the hash function.
     * @param key Secret key.
     * @param message Message string to be hashed.
     * @param rawOutput
     * Optional flag:
     * If set to `true`, the function outputs the raw binary representation of the hmac.
     * If set to `false`, the function outputs the hexadecimal representation of the hmac.
     *
     * **Default:** `false`
     * @returns String containing the hash-based message authentication code (hmac) of the message (see rawOutput for representation).
     * @example
     * var key = "MySecretKey";
     * var msg = "Hello world!";
     * var hmac = util.hmac("sha1", key, msg);
     * util.out(hmac);
     */
    hmac(hashfunction: string, key: string, message: string, rawOutput?: Boolean): string;
    /**
     * **Checks, if the current blob is encrypted (Repository encryption) or not.**
     *
     * @since DOCUMENTS 4.0d HF3
     * @param blobFilePath String containing the path of the file to be checked.
     * @returns `true`, if the blob is encrypted.
     */
    isEncryptedBlob(blobFilePath: string): boolean;
    /**
     * **Returns true, if the OS is a windows system.**
     *
     * @since DOCUMENTS 5.0f
     * @returns `true`, if the server runs on windows, `false` if the server runs on linux
     */
    isWindowsOS(): boolean;
    /**
     * **Returns the number of characters of a UTF-8 string.**
     *
     * You can use this function in a x64 / UTF-8 server to count the characters in a UTF-8 string.
     *
     * **Note:** for use in x64 / UTF-8 versions
     * @since DOCUMENTS 4.0a HF1
     * @param value UTF-8 String of which the number of characters will be counted
     * @returns Integer with the length in characters
     * @example
     * var text = "Köln is a german city";
     * util.out(text.length);          // => 22 bytes
     * util.out(util.length_u(text));  // => 21 characters
     */
    length_u(value: string): number;
    /**
     * **Log a String to the DOCUMENTS server window.**
     *
     * Same as util.out() with additional debugging information (script name and line number) You may output whatever information you want.
     * This function is useful especially for debugging purposes. Be aware that you should run the Portalserver as an application if you want
     * to make use of the `out()` function, otherwise the output is stored in the Windows Eventlog instead.
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param output String you want to output to the Portalserver Window
     * @returns
     * @example
     * util.log("Hello World");
     */
    log(output: string): any;
    /**
     * **Creates a directory with subdirectories at the PortalServer's file system.**
     *
     * This functions provides a simple method for directory creation on the file system.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param dirPath String with the directory path
     * @returns empty String if successful, the error message in case of any error
     * @example
     * var errMsg = util.makeFullDir("c:\\log\\ELC");
     * if (errMsg.length > 0)
     *     util.out(errMsg);
     * else
     *     util.out("Ok.");
     */
    makeFullDir(dirPath: string): string;
    /**
     * **Makes a valid GACL value from the parameters.**
     *
     * This method helps to create valid GACL values when set by PortalScripting. As separator for the single GACL values a `\r\n` (`%CRLF%`) will be used.
     * The values will be trimed (leading and ending whitespaces) and multiple values will be removed. The method returns a String value
     * in the format `\r\n` AP1 `\r\n` AP2 `\r\n` .... `\r\n` APx `\r\n`
     * @since DOCUMENTS 5.0c HF2
     * @param val1 String or Array
     * @param val2 String or Array
     * @param ...restParams
     * @returns String containing the GACL value.
     * @example
     * var sep = context.getAutoText("%CRLF%");    // \r\n
     * var val1 = ["AP1", "AP2"];
     * var val2 = "AP3" + sep + "AP4";
     * var val3 = " AP5";
     * var val4 = "AP3";
     * var gaclVal = util.makeGACLValue(val1, val2, val3, val4);
     * util.out(gaclVal);
     * =>
     * AP1
     * AP2
     * AP3
     * AP4
     * AP5
     * <=
     */
    makeGACLValue(val1: any, val2: any, ...restParams: any[]): string;
    /**
     * **Masks all HTML-elements of a String.**
     *
     * This function masks the following characters for HTML output:
     *
     * | `>`  | &gt;    |
     * |------|---------|
     * | `<`  | &lt;    |
     * | `\n` |         |
     * | `&`  | &amp;   |
     * | `"`  | &quot;  |
     *
     * If the String is in UTF-8 Format, all UTF-8 characters will be replaced with the according HTML entities.
     *
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param val String to be masked
     * @param isUTF8
     * boolean flag, if the val is in UTF-8 format
     *
     * **Default:** `false`
     * @returns HTML-String
     */
    makeHTML(val: string, isUTF8?: boolean): string;
    /**
     * **Output a String to the Portalserver window.**
     *
     * You may output whatever information you want. This function is useful especially for debugging purposes. Be aware that you should run the Portalserver
     * as an application if you want to make use of the `out()` function, otherwise the output is stored in the Windows Eventlog instead.
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param output String you want to output to the Portalserver Window
     * @returns
     * @example
     * util.out("Hello World");
     */
    out(output: string): any;
    /**
     * **Converts JSON-Strings with Source Code entities, e.g. \u00FA to UTF-8 Strings representation.**
     * @since DOCUMENTS 5.0e HF2
     * @param jsonString String with the JSON content to be converted.
     * @returns String with UTF-8 representation
     */
    prepareJSON(jsonString: string): string;
    /**
     * **Reads a text file (e.g. html, json... ) from the file system and returns it's content as a string.**
     *
     * @since DOCUMENTS 5.0f
     * @since DOCUMENTS 6.0.1 parameter encoding
     * @param pathToTextFile
     * @param encoding The following encodings are supported:
     *
     * + `UTF-8`: Unicode-characterset as ASCII-compatible 8-Bit-coding.
     * + `ISO-8859-1`: West-European characterset without Euro-Symbol.
     * + `ISO-8859-15`: West-European characterset with Euro-Symbol.
     * + `Windows-1252`
     * + `Windows-1250`
     *
     * @returns String with content of the text file; empty string in case of errors
     * @see {@link util.writeStringToTextFile | util.writeStringToTextFile}
     */
    readTextFileAsString(pathToTextFile: string, encoding?: string): string;
    /**
     * **Reads a binary file from the file system and returns it's data as a string in base64 format.**
     *
     * @since DOCUMENTS 6.0.2
     * @param path Path to the binary file in the file system
     * @returns Base64 string with data of the binary file; empty string in case of errors
     * @see {@link util.writeBase64ToBinaryFile | util.writeBase64ToBinaryFile}
     */
    readBinaryFileAsBase64(path: string): string;
    /**
     * **Writes a base64 string to a binary file in the file system.**
     *
     * @since DOCUMENTS 6.0.2
     * @param path Path to the file
     * @param base64String The base64 string to be written to the file
     * @returns `true` if successful, `false` in case of any error
     * @see {@link util.readBinaryFileAsBase64 | util.readBinaryFileAsBase64}
     */
    writeBase64ToBinaryFile(path: string, base64String: string): boolean;
    /**
     * **Executes the otrPdfTool.**
     *
     * Executes the pdf-Tool, that has to be definded in the documents.ini: $otrPdfTool
     * @since DOCUMENTS 5.0h HF1
     * @param command String containing command for the tool
     * @param inPdf String containing the path to source pdf to work with
     * @param outPdf String containing the path for the target pdf
     * @param jsonData String jsonString with additional data for the tool
     * @param addParam1 String Additional param for the tool
     * @param addParamN String Additional param for the tool
     * @returns a string array with the exit code and the content of the standard output
     * @example
     * const command = "pdfoverlay";
     * const sourcePdf = "c:\\tmp\\source.pdf";
     * const targetPdf = "c:\\tmp\\target.pdf";
     * var data = [{ type: "text", text: "Hello World", size: 16, x: 10, y: 10, invertY: true, page: 0 }];
     * var res = util.runPDFTool(command, sourcePdf, targetPdf, JSON.stringify(data));
     * var exitcode = res[0];
     * if (exitcode !== "0")
     *   throw "Executing the otrPdfTool failed: " + exitcode;
     */
    runPDFTool(command: string, inPdf: string, outPdf: string, jsonData: string, addParam1?: string, addParamN?: string): string[];
    /**
     * **Search for a String in an Array.**
     *
     * This functions provides a simple search method for Arrays to find the position of a string in an array.
     * @since ELC 3.60e / otrisPORTAL 6.0e
     * @param theArray Array in that the String will be searched
     * @param searchedString String that will be searched
     * @param occurence
     * Integer that define the wanted position at a multi-occurence of the String in the Array
     *
     * **Default:** `1`
     * @returns Integer with the position of the String in the array, -1 in case of the String isn't found
     * @example
     * enumval[0] = "This";
     * enumval[1] = "is";
     * enumval[2] = "a";
     * enumval[3] = "sample";
     * var pos = util.searchInArray(enumval, "is");
     * util.out(pos);  // should be the value 1
     */
    searchInArray(theArray: any[], searchedString: string, occurence?: number): number;
    /**
     * **Generates the SHA256 hash of any string.**
     *
     * @since DOCUMENTS 5.0a HF2
     * @param message Message string to be hashed.
     * @returns SHA256 hash of the message.
     */
    sha256(message: string): string;
    /**
     * **Create a digital signature.**
     *
     * **Note:** Signing strings with characters, which are not in the 7-Bit ASCII-Charset, may require a transcoded string.
     * This depends on how the string was created or received. See transcode(). The list of available hash algorithms depends
     * on the linked OpenSSL libraries, not on DOCUMENTS itself. About Arraybuffers Passing a TypedArray (UInt8Array, Int16Array etc.)
     * instead of an ArrayBuffer is possible, but not recommended. The actual implementation always sends the complete associated buffer.
     * The result can be unexpected, if the TypedArray covers only a section of a bigger buffer. This behaviour might change in future releases.
     * @since DOCUMENTS 5.0d HF2
     * @param algorithm string Short identification of used algorithms, for example "RSASHA256". The first three characters specify
     * an encryption standard. Actually only "RSA" is supported. The other characters select a hash algorithm, for example SHA1, SHA256.
     * @param privateKeyPEM string with a (usually encrypted) private key in PEM format.
     * @param pkPassword string The password to decrypt the private key.
     * @param payload The text or data to sign. Allowed data types are "String", "Array of Bytes (Integer 0..255)" and "ArrayBuffer".
     * @param urlStyle
     * boolean to request the result Base64URL-encoded
     *
     * **Default:** `false`
     * @returns Base64- or Base64URL-encoded string with signature data.
     * @example
     * // Load a private key in PEM-Format for digital signing.
     * // The file should look like this:
     * // -----BEGIN ENCRYPTED PRIVATE KEY-----
     * // <Base64-encoded binary data; usually 64 Characters per line>
     * // -----END ENCRYPTED PRIVATE KEY-----
     * //
     * // The openssl command-line tool, for instance, can be used in the
     * // following way to generate a private key-file for RSA enccryption.
     * // > openssl.exe genpkey -out testPK.pem -outform PEM -pass pass:myKeyPassword -des3 -algorithm RSA -pkeyopt rsa_keygen_bits:2048
     * // The next command extracts the public parts of the key and stores
     * // them in a separate PEM-file. A signature validator will require it.
     * // > openssl pkey -in testPK.pem -passin pass:myKeyPassword -out testPub.pem -pubout
     * function loadMyPrivateKey()
     * {
     * var f = new File("E:\\testPK.pem");
     * var text;
     * if(f.ok())
     * {
     * var text = f.read(10000);
     * f.close();
     * return text;
     * }
     * throw new Error("Keyfile not found");
     * }
     * function signMyData() {
     * var results = {};
     * var privateKey = loadMyPrivateKey();
     * var pkPassword = "myKeyPassword";
     * // 1) Sign a string.
     * var data = "This message needs to be signed.";
     * results.data1 = data;
     * results.signature1 = util.sign("RSASHA256", privateKey, pkPassword, data);
     * // 2) Sign a sequence of bytes, passed as a conventional array.
     * // Use the simpler SHA1 hash this time.
     * data = [65, 70, 70, 69, 0];
     * results.data2 = data;
     * results.signature2 = util.sign("RSASHA1", privateKey, pkPassword, data);
     * // 3) Sign a sequence of bytes, passes as an ArrayBuffer
     * data = new Uint8Array(4);
     * data[0] = 192;
     * data[1] = 168;
     * data[2] = 6;
     * data[3] = 101;
     * results.data3 = data;
     * results.signature3 = results.signature1 = util.sign("RSASHA256", privateKey, pkPassword, data.buffer);
     * return JSON.stringify(results);
     * }
     * return signMyData();
     */
    sign(algorithm: string, privateKeyPEM: string, pkPassword: string, payload: any, urlStyle?: boolean): string;
    /**
     * **Verify a digital signature.**
     * **Note:** The data in the publicKey parameter is assumed to be trustworthy.
     * No extra vallidation occurs, if the parameter contains (of includes) a certificate.
     * @since DOCUMENTS 6.0.1
     * @param algorithm Short identification of used algorithms, for example "RSASHA256". The first three characters specify an encryption standard.
     * Actually only "RSA" is supported. The other characters select a hash algorithm, for example SHA1, SHA256.
     * @param publicKey The signer's public key or certificate, either in PEM format or in JWK format.
     * @param payload  The signed text or data. Allowed data types are "String", "Array of Bytes (Integer 0..255)" and "ArrayBuffer".
     * @param signature The Base64- or Base64URL-encoded signature to verify
     * @param urlStyle Indicator, whether the passed signature is Base64URL-encoded.
     * **Default:** `false`
     * @returns The return value indicates whether the passed signature matches the passed data and key.
     */
    verify(algorithm: string, publicKey: string, payload: any, signature: string, urlStyle?: boolean): boolean;
    /**
     * **Let the PortalScript sleep for a defined duration.**
     *
     * @since DOCUMENTS 5.0a
     * @param duration Integer containing the duration in milliseconds
     * @returns
     */
    sleep(duration: number): void;
    /**
     * **Returns a substring of a UTF-8 string.**
     *
     * You can use this function in a x64 / UTF-8 server to get a substring of a UTF-8 string.
     *
     * **Note:** for use in x64 / UTF-8 versions
     * @since DOCUMENTS 4.0a HF1
     * @param value UTF-8 String of which the substring is wanted
     * @param startIndex int with the 0-based start index of the substring
     * @param length int with the length in characters of the substring
     * @returns UTF-8 String with the wanted substring
     * @example
     * var text = "Köln is a german city";
     * util.out(util.substr_u(text, 0, 4));   // => Köln
     * util.out(util.substr_u(text, 5));      // => is a german city
     * // but
     * util.out(text.substr(0, 4));      // => Köl
     */
    substr_u(value: string, startIndex: number, length: number): string;
    /**
     * **Transcode a String from encoding a to encoding b.**
     *
     * This method performs an transcoding for a String from a source encoding to a target encoding. The following encodings are supported:
     *
     * + `Local`: The standard system encoding for Windows systems is `Windows-1252` and for Linux systems `ISO-8859-1` or `UTF-8`.
     * + `UTF-8`: Unicode-characterset as ASCII-compatible 8-Bit-coding.
     * + `ISO-8859-1`: West-European characterset without Euro-Symbol.
     * + `ISO-8859-15`: West-European characterset with Euro-Symbol.
     * + `Windows-1252`
     * + `Windows-1250`
     *
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @param nameSourceEncoding String containing the name of the source encoding
     * @param text String containing the text to transcode
     * @param nameTargetEncoding String containing the name of the target encoding
     * @returns String containing the transcoded text
     * @example
     * var text = "Köln is a german city"
     * var utf8Text = util.transcode("windows-1252", text, "UTF-8");
     * util.out(utf8Text);
     * text = util.transcode("UTF-8", utf8Text, "windows-1252");
     * util.out(text);
     */
    transcode(nameSourceEncoding: string, text: string, nameTargetEncoding: string): string;
    /**
     * **Delete a physical file on the server's file system.**
     *
     * @since ELC 3.51 / otrisPORTAL 5.1
     * @param filePath String containing the full path and filename to the desired physical file
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var success = util.unlinkFile("c:\\tmp\\tempfile.txt");
     */
    unlinkFile(filePath: string): boolean;
    /**
     * **Writes a string as a text file to file system.**
     *
     * @since DOCUMENTS 5.0f
     * @since DOCUMENTS 6.0.1 parameter encoding
     * @param pathToTextFile
     * @param content
     * @param encoding The following encodings are supported:
     *
     * + `UTF-8`: Unicode-characterset as ASCII-compatible 8-Bit-coding.
     * + `ISO-8859-1`: West-European characterset without Euro-Symbol.
     * + `ISO-8859-15`: West-European characterset with Euro-Symbol.
     * + `Windows-1252`
     * + `Windows-1250`
     *
     * @returns `true` if successful, `false` in case of any error
     * @see {@link util.readTextFileAsString | util.readTextFileAsString}
     */
    writeStringToTextFile(pathToTextFile: string, content: string, encoding?: string): boolean;
}
/**
 * **A DOCUMENTS Workflow object.**
 *
 * This class provides read-only access to DOCUMENTS Workflow objects.
 *
 * **Note:** This class is designed for usage with a full workflow engine license. Its capability in representing pure distribution lists is
 * very limited. For the most part it is only possible to read the name of a distribution list.
 * @since DOCUMENTS 6.0
 */
declare interface Workflow {
    /**
     * **The technical name of the Workflow.**
     *
     * @since DOCUMENTS 6.0
     */
    readonly name: string;
    /**
     * **The version string of the Workflow.**
     *
     * @since DOCUMENTS 6.0
     */
    readonly version: string;
    /**
     * **Find DocFiles, which are traversing this workflow or a specific descendant step.**
     *
     * Given a valid actionId the function retrieves only the DocFiles, which actually pass the workflow step with this id. If the actionId parameter
     * is empty or missing, the function retrieves DocFiles at arbitrary positions in the worflow.
     * The function lists neither DocFiles, which have reached the end of the workflow nor DocFiles in a different version of the workflow.
     *
     * **Note:** This function requires a full workflow engine license. Each call on a distribution list creates only an empty {@link FileResultset}.
     * @since DOCUMENTS 6.0
     * @param actionId Optional string holding the actionId or nodeId of a specific workflow step.
     * @returns A new FileResultset object, which is capable of enumerating the found DocFiles.
     */
    getAllActiveFiles(actionId: string): FileResultset;
    /**
     * **Get the String value of an attribute of the Workflow.**
     *
     * **Note:** Workflows and distribution lists share one scripting class, but they are internally separate classes with different sets of attributes.
     * @since DOCUMENTS 6.0
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the attribute
     */
    getAttribute(attribute: string): string;
}
/**
 * **An Iterator over a list of {@link Workflow} objects.**
 *
 * You may create Workflowterator objects by the method getAllWorklows() described in the {@link Context} chapter.
 *
 * **Note:** This class is designed for usage with a a full workflow engine license. Pure distribution lists can also be enumerated by a WorkflowIterator,
 * but such Workflow objects have got very limited capabilities. For the most part they only contain a name.
 * @since DOCUMENTS 6.0
 * @example
 * // Log the names of all worklows and all distribution lists.
 * let it = context.getAllWorkflows(3);
 * for (let wfobj of it)
 * {
 *   let wfname = wfobj.name;
 *   let ver = wfobj.version;
 *   if(ver !== "")
 *     wfname += " (Version: " + ver + ")";
 *    util.out(wfname);
 * }
 */
declare interface WorkflowIterator {
    /**
     * **Retrieve the first {@link Workflow} object in the WorkflowIterator.**
     *
     * **Note:** The function silently skips Worklows, which have been deleted since the iterator's creation time. So the result can occasionally
     * be null even if size() returns a value greater than 0.
     * @since DOCUMENTS 6.0
     * @returns Workflow or `null` in case of an empty WorkflowIterator
     */
    first(): Workflow;
    /**
     * **Retrieve the next {@link Workflow} object in the WorkflowIterator.**
     *
     * **Note:** The function silently skips Worklows, which have been deleted since the iterator's creation time. So the total count of objects returned
     * by first() and next() can occasionally be less than the retunr value of size()
     * @since DOCUMENTS 6.0
     * @returns Workflow or `null` if end of the iterator is reached.
     */
    next(): Workflow;
    /**
     * **Get the amount of {@link Workflow} objects in the WorkflowIterator.**
     *
     * @since DOCUMENTS 6.0
     * @returns integer value with the amount of Workflow objects in the WorkflowIterator
     */
    size(): number;
}
/**
 * **The WorkflowStep class allows access to the according object type of DOCUMENTS.**
 *
 * You may access WorkflowStep objects by the different methods described in the {@link DocFile} chapter.
 *
 * **Note:** This class and all of its methods and attributes require a full workflow engine license, it does not work with pure distribution lists.
 */
declare interface WorkflowStep {
    /**
     * **String value containing the locking user group of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since DOCUMENTS 4.0c
     */
    readonly executiveGroup: string;
    /**
     * **String value containing the type of recipient of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly executiveType: string;
    /**
     * **String value containing the locking user of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly executiveUser: string;
    /**
     * **String value containing the unique internal ID of the first outgoing ControlFlow.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly firstControlFlow: string;
    /**
     * **String value containing the unique internal ID of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly id: string;
    /**
     * **String value containing the technical name of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly name: string;
    /**
     * **String value containing the status of the WorkflowStep.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly status: string;
    /**
     * **String value containing the unique internal ID of the Workflow template.**
     *
     * **Note:** This property requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50 / otrisPORTAL 5.0
     */
    readonly templateId: string;
    /**
     * **Forward the file to its next WorkflowStep.**
     *
     * This requires the internal ID (as a String value) of the {@link ControlFlow} you want the file to pass through.
     * The optional comment parameter will be stored as a comment in the file's monitor.
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * The current user's permissions are not checked when using this function!
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param controlFlowId String value containing the internal ID of the ControlFlow you want to pass through.
     * @param comment optional String value containing your desired comment for the file's monitor.
     * @returns `true` if successful, `false` in case of any error
     */
    forwardFile(controlFlowId: string, comment?: string): boolean;
    /**
     * **Get the String value of an attribute of the WorkflowStep.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @param attribute String containing the name of the desired attribute
     * @returns String containing the value of the desired attribute
     */
    getAttribute(attribute: string): string;
    /**
     * **Retrieve a AutoText in the context of the WorkflowStep and the executive user.**
     *
     *
     * **Since:** DOCUMENTS 5.0i new optional parameters startTag and endTag
     * @since DOCUMENTS 5.0f HF1
     * @param autoText String containing the rule of the autotext
     * @param startTag
     * optional start tag.
     *
     * **Default:** `"%"`
     * @param endTag
     * optional end tag.
     *
     * **Default:** `"%"`
     * @returns String containing the autotext
     */
    getAutoText(autoText: string, startTag?: string, endTag?: string): string;
    /**
     * **Retrieve an iterator representing a list of all outgoing ControlFlows of the WorkflowStep.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns ControlFlowIterator containing the outgoing ControlFlows of the current WorkflowStep object.
     */
    getControlFlows(): ControlFlowIterator;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     *
     * **Since:** DOCUMENTS 5.0g (new parameter shortMessage)
     * @since ELC 3.50 / otrisPORTAL 5.0
     * @param shortMessage
     * optional Boolean; removes "Error in function: class.method(): " from the message.
     *
     * **Default:** `false`
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(shortMessage?: boolean): string;
    /**
     * **Returns the object-id.**
     *
     *
     * **Since:** DOCUMENTS 5.0 (new parameter oidLow)
     * @since ELC 3.60c / otrisPORTAL 6.0c
     * @param oidLow
     * Optional flag:
     * If `true` only the id of the WorkflowStep object (`m_oid`) will be returned.
     * If `false` the id of the WorkflowStep object will be returned together with the id of the corresponding class in the form `class-id:m_oid`.
     *
     * **Default:** `false`
     * @returns `String` with object-id
     */
    getOID(oidLow?: boolean): string;
    /**
     * **Retrieve the name of the workflow, the WorkflowStep belongs to.**
     *
     * **Note:** This function is only available for workflows, but not distribution lists.
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @returns String containing the workflow name
     * @see {@link WorkflowStep.getWorkflowVersion | WorkflowStep.getWorkflowVersion}
     */
    getWorkflowName(): string;
    /**
     * **Retrieve a property value of the workflow action, the WorkflowStep belongs to.**
     *
     * **Note:** This function is only available for workflows, but not distribution lists.
     * @since DOCUMENTS 4.0a
     * @param propertyName String containing the name of the desired property
     * @returns String containing the property value
     */
    getWorkflowProperty(propertyName: string): string;
    /**
     * **Retrieve the version number of the workflow, the WorkflowStep belongs to.**
     *
     * **Note:** This function is only available for workflows, but not distribution lists.
     * @since ELC 3.60d / otrisPORTAL 6.0d
     * @returns String containing the workflow version number
     * @see {@link WorkflowStep.getWorkflowName | WorkflowStep.getWorkflowName}
     */
    getWorkflowVersion(): string;
    /**
     * **Set the String value of an attribute of the WorkflowStep to the desired value.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @param attribute String containing the name of the desired attribute
     * @param value String containing the desired value of the attribute
     * @returns `true` if successful, `false` in case of any error
     */
    setAttribute(attribute: string, value: string): boolean;
    /**
     * **Reassign the current WorkflowStep object to the given user group.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since DOCUMENTS 4.0c
     * @param accessProfileName String containing the technical name of the access profile.
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var f = context.file;
     * var step = f.getCurrentWorkflowStep();
     * if (!step)
     *   step = f.getFirstLockingWorkflowStep();
     * if (!step)
     *   util.out("File is not in a workflow.");
     * if (!step.setNewExecutiveGroup("AccessProfile1"))
     *   util.out(step.getLastError());
     */
    setNewExecutiveGroup(accessProfileName: string): boolean;
    /**
     * **Reassigns the current WorkflowStep object to the given user.**
     *
     * **Note:** This function requires a full workflow engine license, it does not work with pure distribution lists.
     * @since ELC 3.50e / otrisPORTAL 5.0e
     * @param loginUser String containing the login name of the desired user.
     * @returns `true` if successful, `false` in case of any error
     */
    setNewExecutiveUser(loginUser: string): boolean;
}
/**
 * **The WorkflowStepIterator class has been added to the DOCUMENTS PortalScripting API to gain full control over a file's workflow by scripting means.**
 *
 * You may access WorkflowStepIterator objects by the getAllLockingWorkflowSteps() method described in the {@link DocFile} chapter.
 *
 * **Note:** This class and all of its methods and attributes require a full workflow engine license, it does not work with pure distribution lists.
 * @since ELC 3.51e / otrisPORTAL 5.1e
 */
declare interface WorkflowStepIterator {
    /**
     * **Retrieve the first {@link WorkflowStep} object in the WorkflowStepIterator.**
     *
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns WorkflowStep or `null` in case of an empty WorkflowStepIterator
     */
    first(): WorkflowStep;
    /**
     * **Retrieve the next {@link WorkflowStep} object in the WorkflowStepIterator.**
     *
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns WorkflowStep or `null` if end of WorkflowStepIterator is reached.
     */
    next(): WorkflowStep;
    /**
     * **Get the amount of {@link WorkflowStep} objects in the WorkflowStepIterator.**
     *
     * @since ELC 3.51e / otrisPORTAL 5.1e
     * @returns integer value with the amount of WorkflowStep objects in the WorkflowStepIterator
     */
    size(): number;
}
/**
 * **The XLSXChart class allows creating an Excel chart.**
 *
 * An XLSXChart object represents an Excel chart. It provides functions for adding data series to the chart and for configuring the chart.
 * An XLSXChart object isn't created directly. Instead it is created by calling the {@link XLSXWriter.addChart | XLSXWriter.addChart(number type)}
 * function from an {@link XLSXWriter} object.
 *
 * The basic procedure for adding a chart to a worksheet is:
 *
 * + Create the chart with `XLSXWriter.addChart()`.
 * + Add one or more data series to the chart which refers to data in the Excel file using `XLSXChart.addSeries()`.
 * + Configure the chart with the other available functions shown below.
 * + Insert the chart into a worksheet using `XLSXWorksheet.insertChart()`.
 *
 * @since DOCUMENTS 5.0e
 * @see
 * {@link XLSXWriter.addChart | XLSXWriter.addChart}
 * {@link XLSXChart.addSeries | XLSXChart.addSeries}
 * {@link XLSXWorksheet.insertChart | XLSXWorksheet.insertChart}
 * {@link XLSXChartsheet.insertChart | XLSXChartsheet.insertChart}
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\chart.xlsx");
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * // Write some data to the worksheet.
 * writeWorksheetData(worksheet1);
 * // Create a chart object.
 * var chart = writer.addChart(writer.CHART_COLUMN);
 * // Configure the chart. In simplest case we just add some value data series.
 * // The empty categories will default to 1 to 6 like in Excel.
 * var series1 = chart.addSeries("", "=Worksheet1!$A$1:$A$6");
 * var series2 = chart.addSeries("", "=Worksheet1!$B$1:$B$6");
 * var series3 = chart.addSeries("", "=Worksheet1!$C$1:$C$6");
 * chart.setTable(); // Turn on the data table
 * chart.setStyle(37);
 * chart.setTitle("Chart with Data Table");
 * // Insert the chart into the worksheet
 * worksheet1.insertChart(8, 1, chart);
 * if (!writer.save())
 *     throw writer.getLastError();
 * function writeWorksheetData(worksheet)
 * {
 *     var data = [
 *         // Three columns of data.
 *         [1,   2,   3],
 *         [2,   4,   6],
 *         [3,   6,   9],
 *         [4,   8,  12],
 *         [5,  10,  15],
 *         [6,  12,  18]
 *     ];
 *     var row, col;
 *     for (row = 0; row < 6; row++)
 *         for (col = 0; col < 3; col++)
 *             worksheet.writeCell("number", row, col, data[row][col]);
 * }
 */
declare interface XLSXChart {
    /**
     * **Add a data series to the current chart.**
     *
     * The series numbering and order in the Excel chart will be the same as the order in which they are added with this function.
     * @since DOCUMENTS 5.0e
     * @param categories Optional range of categories in the data series being a string formula like `"=Worksheet1!$A$1:$A$6"`.
     * The category is more or less the same as the X axis. In most Excel chart types the `categories` property is optional and
     * the chart will just assume a sequential series from `1..n`.
     * @param values Optional range of values in the data series being a string formula like `"=Worksheet1!$A$1:$A$6"`.
     * This parameter links the chart with the worksheet data that it displays.
     * @returns An XLSXChartSeries object if successful, `null` in case of any error.
     * @see
     * {@link XLSXChartSeries.setCategories | XLSXChartSeries.setCategories}
     * {@link XLSXChartSeries.setValues | XLSXChartSeries.setValues}
     * @example
     * // The empty categories will default to 1 to 6 like in Excel.
     * var series1 = chart1.addSeries("", "=Worksheet1!$A$1:$A$6");
     * var series2 = chart1.addSeries("", "=Worksheet1!$B$1:$B$6");
     * // It is also possible to specify non-contiguous ranges:
     * chart2.addSeries("=(Sheet1!$A$1:$A$9,Sheet1!$A$14:$A$25)", "=(Sheet1!$B$1:$B$9,Sheet1!$B$14:$B$25)");
     */
    addSeries(categories?: string, values?: string): XLSXChartSeries;
    /**
     * **Get an axis from the chart.**
     *
     * @since DOCUMENTS 5.0e
     * @param axisType The axis type: `x` or `y`.
     * @returns An XLSXChartAxis object if successful, `null` in case of any error.
     * @example
     * var xAxis = chart.getAxis("x");
     */
    getAxis(axisType: string): XLSXChartAxis;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Set the chart style type.**
     *
     * This function is used to set the style of the chart to one of the 48 built-in styles available on the "Design" tab in Excel 2007.
     *
     * **Note:** In Excel 2013 the Styles section of the "Design" tab in Excel shows what were referred to as "Layouts" in previous versions of Excel.
     * These layouts are not defined in the file format. They are a collection of modifications to the base chart type. They can not be defined by this function.
     * @since DOCUMENTS 5.0e
     * @param styleId
     * Optional index representing the chart style, 1 - 48. The style index number is counted from 1 on the top left in the Excel dialog. The default style is 2.
     *
     * **Default:** `2`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chart.setStyle(37);
     */
    setStyle(styleId?: number): boolean;
    /**
     * **Add a data table below the horizontal axis with the data used to plot the chart.**
     *
     * **Note:** The data table can only be shown with Bar, Column, Line and Area charts.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setTable(): boolean;
    /**
     * **Set the title of the chart.**
     *
     * @since DOCUMENTS 5.0e
     * @param title The chart title displayed above the chart. This parameter can also be a formula such as `"=Worksheet1!$A$1"` to
     * point to a cell in the Excel file that contains the title. The Excel default is to have no chart title.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChart.setTitleRange | XLSXChart.setTitleRange}
     * @example
     * chart1.setTitle("Test Results");
     * chart2.setTitle("=Worksheet1!$B$1");
     */
    setTitle(title: string): boolean;
    /**
     * **Set a chart title formula using row and column values.**
     *
     * This function can be used to set a chart title range and is an alternative to using {@link XLSXChart.setTitle | XLSXChart.setTitle(String title)} and a string formula.
     * @since DOCUMENTS 5.0e
     * @param sheetname The name of the worksheet that contains the cell range.
     * @param row The zero indexed row number of the range.
     * @param col The zero indexed column number of the range.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chart2.setTitleRange("Worksheet1", 0, 1);
     */
    setTitleRange(sheetname: string, row: number, col: number): boolean;
}
/**
 * **The XLSXChartAxis class represents the Excel chart axis.**
 *
 * An XLSXChartAxis object isn't created directly. You can get it using the {@link XLSXChart.getAxis | XLSXChart.getAxis(String axisType)} function.
 * It provides functions for configuring a chart axis.
 * @since DOCUMENTS 5.0e
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\chartAxis.xlsx");
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * // Write some data to the worksheet.
 * writeWorksheetData(worksheet1);
 * // Create a chart object.
 * var chart = writer.addChart(writer.CHART_COLUMN);
 * // Configure the chart. In simplest case we just add some value data series.
 * // The empty categories will default to 1 to 6 like in Excel.
 * var series1 = chart.addSeries("", "=Worksheet1!$A$2:$A$7");
 * var series2 = chart.addSeries("", "=Worksheet1!$B$2:$B$7");
 * var series3 = chart.addSeries("", "=Worksheet1!$C$2:$C$7");
 * // Get the X axis
 * var xAxis = chart.getAxis("x");
 * xAxis.setName("Months");
 * xAxis.setLabelPosition("high");
 * xAxis.setLabelAlign("right");
 * // Get the Y axis
 * var yAxis = chart.getAxis("y");
 * yAxis.setName("Earnings (Millions)");
 * yAxis.setNumberFormat("$#,##0.00");
 * chart.setTitle("A sample chart");
 * worksheet1.insertChart(8, 1, chart);
 * if (!writer.save())
 *     throw writer.getLastError();
 * function writeWorksheetData(worksheet)
 * {
 *     var data = [
 *         // Three columns of data.
 *         [1,   2,   3],
 *         [2,   4,   6],
 *         [3,   6,   9],
 *         [4,   8,  12],
 *         [5,  10,  15],
 *         [6,  12,  18]
 *     ];
 *     var row, col;
 *     for (row = 1; row < 7; row++)
 *         for (col = 0; col < 3; col++)
 *             worksheet.writeCell("number", row, col, data[row-1][col]);
 * }
 */
declare interface XLSXChartAxis {
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Set the alignment of the axis labels.**
     *
     * Position the category axis labels for the chart. The labels are the numbers, or strings or dates, on the axis that indicate the categories of the axis.
     *
     * **Note:** This function is applicable to ** category axes ** only.
     * @since DOCUMENTS 5.0e
     * @param align The axis label alignment with the following available values:
     *
     * + `center`
     * + `left`
     * + `right`
     *
     * @returns `true` if successful, `false` in case of any error
     * @example
     * xAxis.setLabelAlign("right");
     */
    setLabelAlign(align: string): boolean;
    /**
     * **Position the axis labels.**
     *
     * Position the axis labels for the chart. The labels are the numbers, or strings or dates, on the axis that indicate the categories or values of the axis.
     * @since DOCUMENTS 5.0e
     * @param position Option to position the axis labels. The following values are available:
     *
     * + `nextTo`: Position the axis labels next to the axis. The default.
     * + `high`: Position the axis labels at the top of the chart, for horizontal axes, or to the right for vertical axes.
     * + `low`: Position the axis labels at the bottom of the chart, for horizontal axes, or to the left for vertical axes.
     * + `none`: Turn off the the axis labels.
     *
     * @returns `true` if successful, `false` in case of any error
     * @example
     * yAxis.setLabelPosition("high");
     */
    setLabelPosition(position: string): boolean;
    /**
     * **Set the name caption of the chart axis.**
     *
     * @since DOCUMENTS 5.0e
     * @param name String containing the name caption of the axis or a formula such as `"=Worksheet1!$A$1"` to point to a cell in the Excel file that contains the name.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChartAxis.setNameRange | XLSXChartAxis.setNameRange}
     * @example
     * xAxis.setName("Months");
     * yAxis.setName("=Worksheet1!$A$1");
     */
    setName(name: string): boolean;
    /**
     * **Set a chart axis name formula using row and column values.**
     *
     * This function can be used to set an axis name range and is an alternative to using {@link XLSXChartAxis.setName | `XLSXChartAxis.setName(String name)`} and a string formula.
     * @since DOCUMENTS 5.0e
     * @param sheetname The name of the worksheet that contains the cell range.
     * @param row The zero indexed row number of the range.
     * @param col The zero indexed column number of the range.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // Set the name formula programmatically
     *   yAxis.setNameRange("Worksheet1", 0, 0);
     */
    setNameRange(sheetname: string, row: number, col: number): boolean;
    /**
     * **Set the format of the numbers on the axis.**
     *
     * @since DOCUMENTS 5.0e
     * @param numFormat The number format string being similar to the parameter `numFormat` of the function {@link XLSXFormat.setNumberFormat | XLSXFormat.setNumberFormat(String numFormat)}.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * yAxis.setNumberFormat("$#,##0.00");
     */
    setNumberFormat(numFormat: string): boolean;
    /**
     * **Reverse the order of the axis categories or values.**
     *
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setReverse(): boolean;
}
/**
 * **The XLSXChartSeries class represents the Excel chart data series.**
 *
 * An XLSXChartSeries object is created using the {@link XLSXChart.addSeries | `XLSXChart.addSeries()`} function. It provides functions for configuring the chart series.
 * @since DOCUMENTS 5.0e
 * @see {@link XLSXChart.addSeries | XLSXChart.addSeries}
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\chartseries.xlsx");
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * worksheet1.writeCell("string", 0, 0, "Series I");
 * worksheet1.writeCell("string", 0, 1, "Series II");
 * worksheet1.writeCell("string", 0, 2, "Series III");
 * // Write some data to the worksheet.
 * writeWorksheetData(worksheet1);
 * // Create a chart object.
 * var chart = writer.addChart(writer.CHART_COLUMN);
 * // Configure the chart. In simplest case we just add some value data series.
 * // The empty categories will default to 1 to 6 like in Excel.
 * var series1 = chart.addSeries("", "=Worksheet1!$A$2:$A$7");
 * var series2 = chart.addSeries("", "=Worksheet1!$B$2:$B$7");
 * var series3 = chart.addSeries();
 * // Configure the series using a syntax that is easier to define programmatically.
 * series3.setCategories("Worksheet1", 1, 0, 6, 0); // "=Worksheet1!$A$2:$A$7"
 * series3.setValues("Worksheet1", 1, 2, 6, 2); // "=Worksheet1!$C$2:$C$7"
 * series1.setName("Series I");
 * series2.setName("=Worksheet1!$B$1");
 * series3.setNameRange("Worksheet1", 0, 2);
 * chart.setTitle("A sample chart");
 * worksheet1.insertChart(8, 1, chart);
 * if (!writer.save())
 *     throw writer.getLastError();
 * function writeWorksheetData(worksheet)
 * {
 *     var data = [
 *         // Three columns of data.
 *         [1,   2,   3],
 *         [2,   4,   6],
 *         [3,   6,   9],
 *         [4,   8,  12],
 *         [5,  10,  15],
 *         [6,  12,  18]
 *     ];
 *     var row, col;
 *     for (row = 1; row < 7; row++)
 *         for (col = 0; col < 3; col++)
 *             worksheet.writeCell("number", row, col, data[row-1][col]);
 * }
 */
declare interface XLSXChartSeries {
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Set a series "categories" range using row and column values.**
     *
     * The `categories` and `values` of a chart data series are generally set using the XLSXChart.addSeries(String categories, String values) function
     * and Excel range formulas like `"=Worksheet1!$A$2:$A$7"`. This function is an alternative method that is easier to generate programmatically.
     * It requires that you do not set the optional parameters (`categories` and `values`) in {@link XLSXChart.addSeries | `XLSXChart.addSeries()`} and then set them using row
     * and column values in this function and {@link XLSXChartSeries.setValues | `XLSXChartSeries.setValues()`}.
     * @since DOCUMENTS 5.0e
     * @param sheetname The name of the worksheet that contains the data range.
     * @param firstRow The first row of the range. (All zero indexed.)
     * @param firstCol The first column of the range.
     * @param lastRow The last row of the range.
     * @param lastCol The last col of the range.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChartSeries.setValues | XLSXChartSeries.setValues}
     * @example
     * var series3 = chart.addSeries();
     * // Configure the series using a syntax that is easier to define programmatically.
     *   series3.setCategories("Worksheet1", 0, 0, 5, 0); // "=Worksheet1!$A$1:$A$6"
     *   series3.setValues("Worksheet1", 0, 2, 5, 2); // "=Worksheet1!$C$1:$C$6"
     */
    setCategories(sheetname: string, firstRow: number, firstCol: number, lastRow: number, lastCol: number): boolean;
    /**
     * **Set the name of a chart series range.**
     *
     * The series name in Excel is displayed in the chart legend and in the formula bar. The name property is optional and if it isn't supplied it will default to `Series 1..n`.
     * @since DOCUMENTS 5.0e
     * @param name String containing the series name or a formula such as `"=Worksheet1!$A$1"` to point to a cell in the Excel file that contains the name.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChartSeries.setNameRange | XLSXChartSeries.setNameRange}
     * @example
     * series1.setName("Quarterly budget data");
     * series2.setName("=Worksheet1!$A$1");
     */
    setName(name: string): boolean;
    /**
     * **Set a series name formula using row and column values.**
     *
     * This function can be used to set a series name range and is an alternative to using {@link XLSXChartSeries.setName | `XLSXChartSeries.setName(String name)`} and a string formula.
     * @since DOCUMENTS 5.0e
     * @param sheetname The name of the worksheet that contains the cell range.
     * @param row The zero indexed row number of the range.
     * @param col The zero indexed column number of the range.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // Set the name formula programmatically
     *   series2.setNameRange("Worksheet1", 0, 0);
     */
    setNameRange(sheetname: string, row: number, col: number): boolean;
    /**
     * **Set a series "values" range using row and column values.**
     *
     * This function is an alternative method to configure the series using a syntax that is easier to define programmatically.
     * See the documentation for {@link XLSXChartSeries.setCategories | `XLSXChartSeries.setCategories()`}.
     * @since DOCUMENTS 5.0e
     * @param sheetname The name of the worksheet that contains the data range.
     * @param firstRow The first row of the range. (All zero indexed.)
     * @param firstCol The first column of the range.
     * @param lastRow The last row of the range.
     * @param lastCol The last col of the range.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChartSeries.setCategories | XLSXChartSeries.setCategories}
     */
    setValues(sheetname: string, firstRow: number, firstCol: number, lastRow: number, lastCol: number): boolean;
}
/**
 * **The XLSXChartsheet class represents the Excel chartsheet.**
 *
 * An Excel chartsheet is a type of worksheet that only contains a chart. An XLSXChartsheet object isn't created directly.
 * Instead it is created by calling the {@link XLSXWriter.addChartsheet | XLSXWriter.addChartsheet(String name)} function from an {@link XLSXWriter} object.
 * A chartsheet functions as a worksheet and not as a chart. In order to have it display data a chart must be created and added to the chartsheet.
 * The data for the chartsheet chart must be contained on a separate worksheet. That is why it is always created in conjunction with at least one data worksheet.
 * @since DOCUMENTS 5.0e
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\chartsheet.xlsx");
 * // Add an worksheet with a user defined sheet name.
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * // Write some data to the worksheet.
 * writeWorksheetData(worksheet1);
 * // Create a chart object.
 * var chart = writer.addChart(writer.CHART_COLUMN);
 * // Configure the chart. In simplest case we just add some value data
 * // series. The `null` categories will default to 1 to 5 like in Excel.
 * var series1 = chart.addSeries("", "=Worksheet1!$A$1:$A$5");
 * var series2 = chart.addSeries("", "=Worksheet1!$B$1:$B$5");
 * var series3 = chart.addSeries("", "=Worksheet1!$C$1:$C$5");
 * // Add a chartsheet with a user defined name
 * var chartsheet1 = writer.addChartsheet("Chartsheet1");
 * // Insert the chart into the chartsheet
 * chartsheet1.insertChart(chart);
 * // Save the file.
 * if (!writer.save())
 *     throw writer.getLastError();
 *
 * function writeWorksheetData(worksheet)
 * {
 *     var data = [
 *         // Three columns of data.
 *         [1,   2,   3],
 *         [2,   4,   6],
 *         [3,   6,   9],
 *         [4,   8,  12],
 *         [5,  10,  15]
 *     ];
 *     var row, col;
 *     for (row = 0; row < 5; row++)
 *         for (col = 0; col < 3; col++)
 *             worksheet.writeCell("number", row, col, data[row][col]);
 * }
 */
declare interface XLSXChartsheet {
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Insert a chart into the current chartsheet.**
     *
     * This function can be used to insert an {@link XLSXChart} object into the chartsheet. The XLSXChart object must be created first
     * using the {@link XLSXWriter.addChart | XLSXWriter.addChart(type)} function and configured using the functions from the class XLSXChart.
     *
     * **Note:** A chart may only be inserted into a chartsheet or a worksheet once. If several similar charts are required then
     * each one must be created separately with {@link XLSXWriter.addChart | XLSXWriter.addChart(type)}.
     * @since DOCUMENTS 5.0e
     * @param chart An XLSXChart object created via `XLSXWriter.addChart(type)`.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWorksheet.insertChart | XLSXWorksheet.insertChart}
     * @example
     * // Create a chart object.
     * var chart = writer.addChart(writer.CHART_COLUMN);
     * // Add some data series to the chart.
     * var series1 = chart.addSeries("", "Worksheet1!$A$1:$A$5");
     * var series2 = chart.addSeries("", "Worksheet1!$B$1:$B$5");
     * var series3 = chart.addSeries("", "Worksheet1!$C$1:$C$5");
     * // Insert the chart into the chartsheet.
     * if (!chartsheet1.insertChart(chart))
     *   throw chartsheet1.getLastError();
     */
    insertChart(chart: XLSXChart): boolean;
    /**
     * **Set current chartsheet as the first visible sheet tab.**
     *
     * The {@link XLSXWriter.activateChartsheet | XLSXWriter.activateChartsheet(chartsheet)} function determines which chartsheet is initially selected. However, if there are
     * a large number of chartsheets the selected chartsheet may not appear on the screen. To avoid this you can select the leftmost visible
     * chartsheet tab using this function. The default value is the first chartsheet.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chartsheet19.setFirstSheet(); // chartsheet19: First visible chartsheet tab.
     * writer.activateChartsheet(Chartsheet20); // chartsheet20: First visible chartsheet.
     */
    setFirstSheet(): boolean;
    /**
     * **Set the printed page footer caption.**
     *
     * Footers are generated using a string which is a combination of plain text and control characters (see [Generating header/footer](../xlsxwriter.html) for more details).
     * @since DOCUMENTS 5.0e
     * @param footer The footer string.
     * @param margin
     * Optional footer margin in inches. Excel default is 0.3.
     *
     * **Default:** `0.3`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!chartsheet1.setFooter("some text", 0.2))
     *   throw chartsheet1.getLastError();
     */
    setFooter(footer: string, margin?: number): boolean;
    /**
     * **Set the printed page header caption.**
     *
     * Headers are generated using a string which is a combination of plain text and control characters (see [Generating header/footer](../xlsxwriter.html) for more details).
     * @since DOCUMENTS 5.0e
     * @param header The header string.
     * @param margin
     * Optional header margin in inches. Excel default is 0.3.
     *
     * **Default:** `0.3`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!chartsheet1.setHeader("some text", 0.2))
     *   throw chartsheet1.getLastError();
     */
    setHeader(header: string, margin?: number): boolean;
    /**
     * **Set the page orientation as landscape.**
     *
     * This function is used to set the orientation of the chartsheet's printed page to landscape.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setLandscape(): boolean;
    /**
     * **Set the worksheet margins for the printed page.**
     *
     * This function is used to set the margins of the chartsheet when it is printed. The units are in inches.
     * Specifying -1 for any parameter will give the default Excel value as shown below.
     * @since DOCUMENTS 5.0e
     * @param left
     * Optional left margin in inches. Excel default is 0.7.
     * **Default:** `-1`
     * @param right
     * Optional right margin in inches. Excel default is 0.7.
     *
     * **Default:** `-1`
     * @param top
     * Optional top margin in inches. Excel default is 0.75.
     *
     * **Default:** `-1`
     * @param bottom
     * Optional bottom margin in inches. Excel default is 0.75.
     *
     * **Default:** `-1`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chartsheet1.setMargins(1.3, 1.2, -1, -1);
     */
    setMargins(left?: number, right?: number, top?: number, bottom?: number): boolean;
    /**
     * **Set the paper format for the printed output of the current chartsheet.**
     *
     * @since DOCUMENTS 5.0e
     * @param type
     * Optional integer paper format type. If you do not specify a paper type the chartsheet will print using the printer's default paper style.
     * See {@link XLSXWorksheet.setPaperType | XLSXWorksheet.setPaperType(type)} for a full list of available paper sizes.
     *
     * **Default:** `0`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chartsheet1.setPaperType(1);  // US Letter
     * chartsheet2.setPaperType(9);  // A4
     */
    setPaperType(type?: number): boolean;
    /**
     * **Set the page orientation as portrait.**
     *
     * This function is used to set the orientation of the chartsheet's printed page to portrait.
     * The default chartsheet orientation is portrait, so this function isn't generally required.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setPortrait(): boolean;
    /**
     * **Set the color of the current chartsheet tab.**
     *
     * @since DOCUMENTS 5.0e
     * @param color The desired tab color specified using a HTML style RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chartsheet1.setTabColor(0xFF9900); // Orange
     * chartsheet1.setTabColor(writer.COLOR_RED); // from Predefined values for common colors
     */
    setTabColor(color: number): boolean;
    /**
     * **Set the chartsheet zoom factor.**
     *
     * The default zoom factor is 100.
     *
     * **Note:** This function does not affect the scale of the printed page.
     * @since DOCUMENTS 5.0e
     * @param scale
     * Optional integer chartsheet zoom factor in the range `10 <= zoom <= 400`.
     *
     * **Default:** `100`
     * @returns `true` if successful, `false` in case of any error
     * @example
     * chartsheet1.setZoom(50);
     */
    setZoom(scale?: number): boolean;
}
/**
 * **The XLSXFormat class allows formatting cells in Excel.**
 *
 * An XLSXFormat object isn't created directly. Instead an XLSXFormat is created by calling
 * the {@link XLSXWriter.addFormat | XLSXWriter.addFormat(name)} function from an {@link XLSXWriter} object.
 * The properties of a cell that can be formatted include: fonts, colors, patterns, borders, alignment and number formatting.
 * @since DOCUMENTS 5.0e
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\format.xlsx");
 * // Add a worksheet with a user defined sheet name.
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * // Add a cell format.
 * var format1 = writer.addFormat("format1");
 * // Set the font name for the format
 * format1.setFontName("Times New Roman");
 * // Set the bold property for the format.
 * format1.setFontStyle("bold");
 * // Set the alignment for the format
 * format1.setAlign(writer.ALIGN_CENTER);
 * // Wrap text in a cell
 * format1.setTextWrap();
 * // Set cell border color
 * format1.setBorderColor("right", writer.COLOR_RED);
 * // Set cell border style
 * format1.setBorderStyle("right", writer.BORDER_DOUBLE);
 * // Write a string using the format
 * worksheet1.writeCell("string", 0, 0, "Some long text to wrap in a cell", format1);
 * // Set a number format
 * format1.setNumberFormat("0 \"dollar and\" .00 \"cents\"");
 * // Write a number using the format.
 * worksheet1.writeCell("number", 0, 1, 1.87, format1);
 * // Change the column width
 * worksheet1.setColumn(1, 1, 30);
 * // Save the file.
 * if (!writer.save())
 *     throw writer.getLastError();
 */
declare interface XLSXFormat {
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Set the alignment for data in a cell.**
     *
     * As in Excel, vertical and horizontal alignments can be combined. Text can be aligned across two or more adjacent cells using the center_across property.
     * However, for genuine merged cells it is better to use the `XLSXWorksheet.mergeRange()` method. The vertical justify option can be used to provide automatic
     * text wrapping in a cell. The height of the cell will be adjusted to accommodate the wrapped text.
     * @since DOCUMENTS 5.0e
     * @param alignment The horizontal or vertical alignment direction (see constant group {@link XLSXWriter.ALIGN_CENTER | `Text alignments`}).
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link XLSXWorksheet.mergeRange | XLSXWorksheet.mergeRange}
     * {@link XLSXFormat.setTextWrap | XLSXFormat.setTextWrap}
     * @example
     * var format1 = writer.addFormat("format1");
     * // Vertical and horizontal alignments can be combined
     * format1.setAlign(writer.ALIGN_CENTER);
     * format1.setAlign(writer.ALIGN_VERTICAL_CENTER);
     */
    setAlign(alignment: number): boolean;
    /**
     * **Set the background color of the pattern for a cell.**
     *
     * @since DOCUMENTS 5.0e
     * @param color The cell pattern background color being a RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     */
    setBackgroundColor(color: number): boolean;
    /**
     * **Set the background fill pattern for a cell.**
     *
     * @since DOCUMENTS 5.0e
     * @param pattern Pattern index from constant group {@link XLSXWriter.PATTERN_DARK_DOWN | `Background patterns`}.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * // The most common pattern is a solid fill of the background color.
     * format1.setBackgroundPattern(writer.PATTERN_SOLID);
     * format1.setBackgroundColor(writer.COLOR_YELLOW);
     */
    setBackgroundPattern(pattern: number): boolean;
    /**
     * **Set the color of the cell border.**
     *
     * @since DOCUMENTS 5.0e
     * @param border String specifying which cell border(s) the color to be set for. The following values are available:
     *
     * + `left`: the left cell border
     * + `right`: the right cell border
     * + `top`: the top cell border
     * + `bottom`: the bottom cell border
     * + `all`: all cell borders
     *
     * @param color The desired cell border color being a RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * format1.setBorderColor("bottom", writer.COLOR_RED);
     * format1.setBorderStyle("bottom", writer.BORDER_DOUBLE);
     */
    setBorderColor(border: string, color: number): boolean;
    /**
     * **Set the cell border style.**
     *
     * @since DOCUMENTS 5.0e
     * @param border String specifying which cell border(s) the style to be set for. The following values are available:
     *
     * + `left`: the left cell border
     * + `right`: the right cell border
     * + `top`: the top cell border
     * + `bottom`: the bottom cell border
     * + `all`: all cell borders
     *
     * @param style Border style index from constant group {@link XLSXWriter.BORDER_DASHED | `Cell border styles`}.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * format1.setBorderStyle("bottom", writer.BORDER_THIN);
     */
    setBorderStyle(border: string, style: number): boolean;
    /**
     * **Set the color of the font used in the cell.**
     *
     * @since DOCUMENTS 5.0e
     * @param color The cell font color being a RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     */
    setFontColor(color: number): boolean;
    /**
     * **Set the font used in the cell.**
     *
     * **Note:** Excel can only display fonts that are installed on the system that it is running on. Therefore it is generally best to
     * use the fonts that come as standard with Excel such as Calibri, Times New Roman and Courier New. The default font in Excel 2007, and later, is Calibri.
     * @since DOCUMENTS 5.0e
     * @param name Optional String containing the cell font name. The default value is "Calibri".
     * @returns `true` if successful, `false` in case of any error
     */
    setFontName(name: string): boolean;
    /**
     * **Set the script style of the font.**
     *
     * @since DOCUMENTS 5.0e
     * @param style Script style. The following styles are available:
     *
     * + `super`:superscript style
     * + `sub`: subscript style
     *
     * @returns `true` if successful, `false` in case of any error
     */
    setFontScript(style: string): boolean;
    /**
     * **Set the size of the font used in the cell.**
     *
     * **Note:** Excel adjusts the height of a row to accommodate the largest font size in the row. You can also explicitly
     * specify the height of a row using the `XLSXWorksheet.setRow()` function.
     * @since DOCUMENTS 5.0e
     * @param size The cell font size.
     * @returns `true` if successful, `false` in case of any error
     */
    setFontSize(size: number): boolean;
    /**
     * **Set the font style for the format.**
     *
     * @since DOCUMENTS 5.0e
     * @param style String containing the font style. The following font styles are available:
     *
     * + `bold`
     * + `italic`
     * + `underline`
     * + `strikeout`
     *
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * format1.setFontStyle("bold");
     */
    setFontStyle(style: string): boolean;
    /**
     * **Set the foreground color of the pattern for a cell.**
     *
     * @since DOCUMENTS 5.0e
     * @param color The cell pattern foreground color being a RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     */
    setForegroundColor(color: number): boolean;
    /**
     * **Set the cell text indentation level.**
     *
     * **Note:** Indentation is a horizontal alignment property. It will override any other horizontal properties but it can be used in conjunction with vertical properties.
     * @since DOCUMENTS 5.0e
     * @param level Integer indentation level.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * var format2 = writer.addFormat("format2");
     * format1.setIndent(1);
     * format2.setIndent(2);
     * worksheet1.writeString(0, 0, "This text is indented 1 level",  format1);
     * worksheet1.writeString(1, 0, "This text is indented 2 levels", format2);
     */
    setIndent(level: number): boolean;
    /**
     * **Set the number format for a cell.**
     *
     * This method is used to define the numerical format of a number in Excel. It controls whether a number is displayed as an integer, a floating point number,
     * a date, a currency value or some other user defined format. For more information about number formats in Excel refer to the
     * [Microsoft documentation for number formats](https://support.office.com/en-us/article/review-guidelines-for-customizing-a-number-format-c0a1d1fa-d3f4-4018-96b7-9c9354dd99f5).
     * @since DOCUMENTS 5.0e
     * @param numFormat The numerical format of a cell specified by using a format string.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var writer = new XLSXWriter("c:\\tmp\\numFormat.xlsx");
     * // Add a worksheet with a user defined sheet name.
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     * // Widen the first column to make the text clearer.
     * worksheet1.setColumn(0, 0, 30);
     * // Add some formats.
     * var format01 = writer.addFormat("format01");
     * var format02 = writer.addFormat("format02");
     * var format03 = writer.addFormat("format03");
     * var format04 = writer.addFormat("format04");
     * var format05 = writer.addFormat("format05");
     * var format06 = writer.addFormat("format06");
     * var format07 = writer.addFormat("format07");
     * var format08 = writer.addFormat("format08");
     * var format09 = writer.addFormat("format09");
     * var format10 = writer.addFormat("format10");
     * var format11 = writer.addFormat("format11");
     * // Set some example number formats.
     * format01.setNumberFormat("0.000");
     * format02.setNumberFormat("#,##0");
     * format03.setNumberFormat("#,##0.00");
     * format04.setNumberFormat("0.00");
     * format05.setNumberFormat("mm/dd/yyyy");
     * format06.setNumberFormat("mmm d yyyy");
     * format07.setNumberFormat("d mmmm yyyy");
     * format08.setNumberFormat("dd/mm/yyyy hh:mm AM/PM");
     * format09.setNumberFormat("0 \"dollar and\" .00 \"cents\"");
     * // Write data using the formats.
     * worksheet1.writeCell("number", 0, 0, 3.1415926); // 3.1415926
     * worksheet1.writeCell("number", 1, 0, 3.1415926, format01); // 3.142
     * worksheet1.writeCell("number", 2, 0, 1234.56, format02); // 1,235
     * worksheet1.writeCell("number", 3, 0, 1234.56, format03); // 1,234.56
     * worksheet1.writeCell("number", 4, 0, 49.99, format04); // 49.99
     * worksheet1.writeCell("number", 5, 0, 36892.521, format05); // 01/01/2001
     * worksheet1.writeCell("number", 6, 0, 36892.521, format06); // Jan 1 2001
     * worksheet1.writeCell("number", 7, 0, 36892.521, format07); // 1 January 2001
     * worksheet1.writeCell("number", 8, 0, 36892.521, format08); // 01/01/2001 12:30 PM
     * worksheet1.writeCell("number", 9, 0, 1.87, format09); // 1 dollar and .87 cents
     * // Show limited conditional number formats.
     * format10.setNumberFormat("[Green]General;[Red]-General;General");
     * worksheet1.writeCell("number", 10, 0, 123, format10);  // > 0 Green
     * worksheet1.writeCell("number", 11, 0, -45, format10);  // < 0 Red
     * worksheet1.writeCell("number", 12, 0,   0, format10);  // = 0 Default color
     * // Format a Zip code.
     * format11.setNumberFormat("00000");
     * worksheet1.writeCell("number", 13, 0, 1209, format11);
     * worksheet1.setGridlines("showPrint");
     * // Save the file.
     * if (!writer.save())
     *     throw writer.getLastError();
     */
    setNumberFormat(numFormat: string): boolean;
    /**
     * **Turn on the text "shrink to fit" for a cell.**
     *
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * format1.setShrink();
     * worksheet1.writeCell("string", 0, 0, "Shrink text so that it fits in a cell", format1);
     */
    setShrink(): boolean;
    /**
     * **Wrap text in a cell.**
     *
     * If you wish to control where the text is wrapped you can add newline characters to the string. Excel will adjust the height of the row
     * to accommodate the wrapped text. A similar effect can be obtained without newlines using the {@link XLSXFormat.setAlign | XLSXFormat.setAlign(alignment)}
     * function with {@link XLSXWriter.ALIGN_VERTICAL_JUSTIFY}.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var format1 = writer.addFormat("format1");
     * format1.setTextWrap();
     * worksheet1.writeCell("string", 0, 0, "Some long text to wrap in a cell", format1);
     */
    setTextWrap(): boolean;
}
/**
 * **The XLSXWorksheet class represents the Excel worksheet.**
 *
 * An XLSXWorksheet object isn't created directly. Instead an XLSXWorksheet is created by calling the {@link XLSXWriter.addWorksheet | XLSXWriter.addWorksheet(name)}
 * function from an {@link XLSXWriter} object. It handles operations such as writing data to cells or formatting worksheet layout.
 * @since DOCUMENTS 5.0e
 * @example
 * var writer = new XLSXWriter("c:\\tmp\\worksheet.xlsx");
 * // Add a worksheet with a user defined sheet name.
 * var worksheet1 = writer.addWorksheet("Worksheet1");
 * // Add a cell format.
 * var format1 = writer.addFormat("format1");
 * // Set the bold property for the format.
 * format1.setFontStyle("bold");
 * // Set the alignment for the format
 * format1.setAlign(writer.ALIGN_CENTER);
 * // Write formatted data.
 * worksheet1.writeCell("string", 0, 0, "Hello Excel", format1);
 * // Change the row height
 * worksheet1.setRow(0, 20);
 * // Change the column width
 * worksheet1.setColumn(0, 0, 15);
 * // Save the file.
 * if (!writer.save())
 *     throw writer.getLastError();
 */
declare interface XLSXWorksheet {
    /**
     * **Add an autofilter area to the current worksheet.**
     *
     * An autofilter is a way of adding drop down lists to the headers of a 2D range of worksheet data. This allows users to filter the data based
     * on simple criteria so that some data is shown and some is hidden.
     *
     * **Note:** It isn't currently possible to apply filter conditions to the autofilter.
     * @since DOCUMENTS 5.0e
     * @param firstRow The first row of the range. (All zero indexed.)
     * @param firstCol The first column of the range.
     * @param lastRow The last row of the range.
     * @param lastCol The last column of the range.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.addAutofilter(0, 0, 50, 3))
     *   throw worksheet1.getLastError();
     */
    addAutofilter(firstRow: number, firstCol: number, lastRow: number, lastCol: number): boolean;
    /**
     * **Split and freeze the current worksheet into panes.**
     *
     * This function can be used to divide a worksheet into horizontal or vertical regions known as panes and to "freeze" these panes
     * so that the splitter bars are not visible. The parameters `row` and `col` are used to specify the location of the split.
     * It should be noted that the split is specified at the top or left of a cell and that the function uses zero based indexing.
     * Therefore to freeze the first row of a worksheet it is necessary to specify the split at row 2 (which is 1 as the zero-based index).
     * You can set one of the `row` and `col` parameters as zero if you do not want either a vertical or horizontal split.
     * @since DOCUMENTS 5.0e
     * @param row The cell row (zero indexed).
     * @param col The cell column (zero indexed).
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.freezePanes(1, 0); // Freeze the first row.
     * worksheet2.freezePanes(0, 1); // Freeze the first column.
     * worksheet3.freezePanes(1, 1); // Freeze first row/column.
     */
    freezePanes(row: number, col: number): boolean;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Import data from a JSON-String to the current worksheet.**
     *
     * **Specification of the JSON-String / object-structure**
     *
     * The JSON-String represents a table and has the following structure:
     * ```json
     * {
     *    "formats" : [Format-Defintion1, Format-Defintion2, ...],
     *    "table" : {
     *       "columns" : [Column-Defintion1, Column-Defintion2, Column-Defintion3, ...],
     *       "body" : {
     *          "rows" : [
     *             [val_11, val_12, val_13, ...],
     *             [val_21, val_22, val_23, ...],
     *             ....
     *          ]
     *       }
     *    }
     * }
     * ```
     *
     * + `formats:` array of format-definitions, that can be used for the columns-header and body (how shall a cell look like)
     * + `table:` contains columns definition and the table-data (body)
     * + `columns:` array of columns-definitions with specification of column-label and column style
     * + `rows:` array of arrays - each array specify one line in the table
     *
     * **Format-Definition**
     *
     * ```json
     * {
     *     "name"       : formatName,
     *     "bgcolor"    : colorName,      // optional
     *     "pattern"    : patternName,    // optional
     *     "fontcolor"  : colorName,      // optional
     *     "fontstyle"  : styleName,      // optional
     *     "fontsize"   : int-value,      // optional
     *     "cellborder" : int-value,      // optional
     *     "align"      : alignStyle,     // optional
     *     "textwrap"   : 1,              // optional
     *     "numformat"  : "format-string" // optional
     *
     *     // colorName = 0xaabbcc , "black", "blue", "brown", "cyan", "gray", "green", "lime", "magenta", "navy", "orange", "pink", "purple", "red", "silver", "white", "yellow"
     *     // patternName = "solid", "mediumgrey", "lightgrey"
     *     // styleName = "bold", "italic"
     *     // alignStyle = "left", "center", "right"
     * }
     * ```
     *
     * **Column-Definition**
     *
     * ```json
     * {
     *     "label"      : "Column-Label",                                           // optional
     *     "header"     : "Name of Format-Definition for the column in the 1. row", // optional
     *     "body"       : "Name of Format-Definition for the column in the 2+. row",// optional
     *     "width"      : int-value,                                                // optional
     *     "type"       : "string"     forces to convert values to string           // optional
     * }
     * ```
     *
     * @since DOCUMENTS 5.0e
     * @param jsonString Containing the data to be imported.
     * @param row **Default:** `0`.
     * Optional the zero indexed row number of the first cell of the area the data to be written to.
     * @param col **Default:** `0`.
     * Optional the zero indexed column number of the first cell of the area the data to be written to.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWorksheet.importFromJSONFile | XLSXWorksheet.importFromJSONFile}
     * @example
     * // Definition of the data object
     * var impobj = {}
     * // first some format definitions, that will be used as header and body defs
     * impobj.formats = [];
     * impobj.formats[0] = {};
     * impobj.formats[0].name = "header";
     * impobj.formats[0].fontsize = 11;
     * impobj.formats[0].bgcolor = "gray";
     * impobj.formats[1] = {};
     * impobj.formats[1].name = "headerRight";
     * impobj.formats[1].fontsize = 11;
     * impobj.formats[1].bgcolor = 0x00FF00;
     * impobj.formats[1].align = "right";
     * impobj.formats[2] = {};
     * impobj.formats[2].name = "headerBold";
     * impobj.formats[2].fontsize = 11;
     * impobj.formats[2].bgcolor = "silver";
     * impobj.formats[2].fontstyle = "bold";
     * impobj.formats[3] = {};
     * impobj.formats[3].name = "bodyString";
     * impobj.formats[3].cellborder = 1;
     * impobj.formats[4] = {};
     * impobj.formats[4].name = "bodyNum";
     * impobj.formats[4].cellborder = 1;
     * impobj.formats[4].numformat = "#,##0.00";
     * impobj.formats[5] = {};
     * impobj.formats[5].name = "bodyDate";
     * impobj.formats[5].numformat = "yyyy-mm-dd";
     * // Data table
     * impobj.table = {};
     * impobj.table.columns = [];
     * // Definition of the columns
     * impobj.table.columns[0] = {};
     * impobj.table.columns[0].label = "String Label";
     * impobj.table.columns[0].width = 100;
     * impobj.table.columns[0].header = "headerBold";
     * impobj.table.columns[0].body = "bodyString";
     * impobj.table.columns[1] = {};
     * impobj.table.columns[1].label = "Number Label";
     * impobj.table.columns[1].width = 20;
     * impobj.table.columns[1].header = "headerRight";
     * impobj.table.columns[1].body = "bodyNum";
     * impobj.table.columns[2] = {};
     * impobj.table.columns[2].label = "Date Label";
     * impobj.table.columns[2].width = 30;
     * impobj.table.columns[2].header = "header";
     * impobj.table.columns[2].body = "bodyDate";
     * // Now add 3 rows with data
     * impobj.table.body = {};
     * impobj.table.body.rows = [];
     * impobj.table.body.rows.push( ["Hello", 2117.99, util.convertDateToExcelDate(new Date())] );
     * impobj.table.body.rows.push( ["World", 42, util.convertDateToExcelDate(new Date(2018, 11, 31))] );
     * impobj.table.body.rows.push( ["again", -42.30, new Date()] );
     * // Data object is now complete
     * // Create the JSON String..
     * var jsonString = JSON.stringify(impobj, null, 2);
     * var writer = new XLSXWriter("c:\\tmp\\importJson.xlsx")
     * var sheet = writer.addWorksheet("Sheet1");
     * if (!sheet.importFromJSON(jsonString))
     *     throw sheet.getLastError();
     * if (!writer.save())
     *     throw writer.getLastError();
     */
    importFromJSON(jsonString: string, row?: number, col?: number): boolean;
    /**
     * **Import data from a file containing a JSON-String to the current worksheet.**
     *
     * @since DOCUMENTS 5.0e
     * @param jsonFilePath The JSON-file path.
     * @param row **Default:** `0`.
     * Optional the zero indexed row number of the first cell of the area the data to be written to.
     * @param col **Default:** `0`.
     * Optional the zero indexed column number of the first cell of the area the data to be written to.
     * @returns
     * @see {@link XLSXWorksheet.importFromJSON | XLSXWorksheet.importFromJSON}
     * @example
     * if (!worksheet1.importFromJSONFile("c:\\tmp\\json.txt"))
     *   throw worksheet1.getLastError();
     */
    importFromJSONFile(jsonFilePath: string, row?: number, col?: number): boolean;
    /**
     * **Insert a chart into the current worksheet.**
     *
     * This function can be used to insert an {@link XLSXChart} object into a worksheet. It takes additional optional parameters to position
     * and scale the image of the chart. The XLSXChart object must be created first using the {@link XLSXWriter.addChart | XLSXWriter.addChart(type)} function
     * and configured using the functions from the class XLSXChart.
     *
     * **Note:** A chart may only be inserted once into a chartsheet or a worksheet. If several similar charts are required then each one
     * must be created separately with {@link XLSXWriter.addChart | XLSXWriter.addChart(type)}.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param chart An XLSXChart object created via XLSXWriter.addChart(number type).
     * @param xOffset **Default:** `0`.
     * Optional integer offset from the left of the cell in pixels.
     * @param yOffset **Default:** `0`.
     * Optional integer offset from the top of the cell in pixels.
     * @param xScale **Default:** `1`.
     * Optional X scale of the image as a decimal.
     * @param yScale **Default:** `1`.
     * Optional Y scale of the image as a decimal.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXChartsheet.insertChart | XLSXChartsheet.insertChart}
     * @example
     * // Create a chart object.
     * var chart = writer.addChart(writer.CHART_COLUMN);
     * // Add some data series to the chart.
     * var series1 = chart.addSeries("", "Worksheet1!$A$1:$A$5");
     * var series2 = chart.addSeries("", "Worksheet1!$B$1:$B$5");
     * var series3 = chart.addSeries("", "Worksheet1!$C$1:$C$5");
     * // Insert the chart into the worksheet.
     * if (!worksheet1.insertChart(6, 1, chart, 30, 10, 0.5, 0.75))
     *   throw worksheet1.getLastError();
     */
    insertChart(row: number, col: number, chart: XLSXChart, xOffset?: number, yOffset?: number, xScale?: number, yScale?: number): boolean;
    /**
     * **Insert an image in a worksheet cell specified by row and column.**
     *
     * This function can be used to insert an image (in PNG or JPEG format) into a worksheet. It takes additional optional parameters to position and scale the image.
     *
     * **Note:** The scaling of an image may be affected if it crosses a row that has its default height changed due to a font that is larger than the default font
     * size or that has text wrapping turned on. To avoid this you should explicitly set the height of the row using {@link XLSXWorksheet.setRow | XLSXWorksheet.setRow()}
     * if it crosses an inserted image.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param filename The image filename, with path if required.
     * @param xOffset **Default:** `0`.
     * Optional integer offset from the left of the cell in pixels.
     * @param yOffset **Default:** `0`.
     * Optional integer offset from the top of the cell in pixels.
     * @param xScale **Default:** `1`.
     * Optional X scale of the image as a decimal.
     * @param yScale **Default:** `1`.
     * Optional Y scale of the image as a decimal.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.insertImage(12, 4, "C:\\temp\\logo.jpg", 15, 10, 0.2, 0.2))
     *     throw worksheet1.getLastError();
     */
    insertImage(row: number, col: number, filename: string, xOffset?: number, yOffset?: number, xScale?: number, yScale?: number): boolean;
    /**
     * **Merge a range of cells.**
     *
     * This function allows cells to be merged together so that they act as a single area. Excel generally merges and centers cells at same time.
     * To get similar behavior you need to apply a format object with the appropriate alignment:
     *
     * ```js
     * var mergeFormat = writer.addFormat("mergeFormat");
     * mergeFormat.setAlign(writer.ALIGN_CENTER);
     *
     * worksheet1.mergeRange(1, 1, 1, 3, "Merged Range", mergeFormat);
     * ```
     *
     * **Note:** This function writes a string value to the merged range. In order to write other data types, such as a number or a formula,
     * you can overwrite the first cell with a call to the function {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)}
     * with the appropriate value type. The same format should be used as was used in the merged range.
     *
     * ```js
     * // First write a range with a blank string.
     * worksheet1.mergeRange(1, 1, 1, 3, "", format);
     *
     * // Then overwrite the first cell with a number.
     * worksheet1.writeCell("number", 1, 1, 123, format);
     * ```
     *
     * @since DOCUMENTS 5.0e
     * @param firstRow The first row of the range. (All zero indexed.)
     * @param firstCol The first column of the range.
     * @param lastRow The last row of the range.
     * @param lastCol The last col of the range.
     * @param value String value to write to the merged range.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the merged cells. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     */
    mergeRange(firstRow: number, firstCol: number, lastRow: number, lastCol: number, value: string, format?: XLSXFormat): boolean;
    /**
     * **Set the properties for one or more columns of cells.**
     *
     * This function can be used to change the default properties of a single column or a range of columns. If it is applied to a single column
     * the value of `firstCol` and `lastCol` should be the same. It can also be used to create Outlines and Grouping of columns with
     * the optional parameters `hidden`, `level` and `collapsed`. Adjacent columns with the same outline level are grouped together into a single outline.
     * Columns can be collapsed by setting the parameter `hidden` for the hidden columns and setting the parameter `collapsed` for a column that has the collapsed '+' symbol.
     * @since DOCUMENTS 5.0e
     * @param firstCol The zero indexed first column.
     * @param lastCol The zero indexed last column.
     * @param width **Default:** `8.43`.
     * Optional width of the column(s). The default column width is `8.43`. The `width` parameter sets the column width in the same units used
     * by Excel which is: the number of characters in the default font. The default width is `8.43` in the default font of Calibri 11.
     * The actual relationship between a string width and a column width in Excel is complex. See the
     * [following explanation of column widths](https://support.microsoft.com/en-us/kb/214123) from the Microsoft support documentation for more details.
     *
     * **Note:** There is no way to specify "AutoFit" for a column in the Excel file format. This feature is only available at runtime from within Excel.
     * It is possible to simulate "AutoFit" in your application by tracking the maximum width of the data in the column as your write it
     * and then adjusting the column width at the end.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to any cells in the column that don't have a format.
     * As in Excel a row format takes precedence over a default column format.
     * @param hidden **Default:** `false`.
     * Optional flag used to hide the column(s).
     * @param level **Default:** `0`.
     * Optional integer outline level of the column(s) used to create Outlines and Grouping. Excel allows up to 7 outline levels.
     * Therefore the level parameter should be in the range `0 <= level <= 7`.
     * @param collapsed **Default:** `false`.
     * Optional flag used to create Outlines and Grouping and indicating whether to collapse a column that has the collapsed '+' symbol.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link setRow}
     * @example
     * if (!worksheet1.setColumn(1, 6, 5, null, false, 1, false))
     *    throw worksheet1.getLastError();
     */
    setColumn(firstCol: number, lastCol: number, width?: number, format?: XLSXFormat, hidden?: boolean, level?: number, collapsed?: boolean): boolean;
    /**
     * **Set current worksheet as the first visible sheet tab.**
     *
     * The {@link XLSXWriter.activateWorksheet | XLSXWriter.activateWorksheet(worksheet)} function determines which worksheet is initially selected.
     * However, if there are a large number of worksheets the selected worksheet may not appear on the screen. To avoid this you can select the leftmost
     * visible worksheet tab using this function.
     * The default value is the first worksheet.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet19.setFirstSheet(); // worksheet19: First visible worksheet tab.
     * writer.activateWorksheet(worksheet20); // worksheet20: First visible worksheet.
     */
    setFirstSheet(): boolean;
    /**
     * **Set the printed page footer caption.**
     *
     * Footers are generated using a string which is a combination of plain text and control characters (see [Generating header/footer](../xlsxwriter.html) for more details).
     * @since DOCUMENTS 5.0e
     * @param footer The footer string.
     * @param margin **Default:** `0.3`.
     * Optional footer margin in inches. Excel default is 0.3.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.setFooter("some text", 0.2))
     *   throw worksheet1.getLastError();
     */
    setFooter(footer: string, margin?: number): boolean;
    /**
     * **Set the option to display or hide gridlines on the screen and the printed page.**
     *
     * There are two options
     *
     * + `hideAll`: Hide gridlines on the screen and the printed page.
     * + `showPrint`: Display gridlines on the screen and the printed page.
     *
     * **Note:** The Excel default is that the screen gridlines are on and the printed worksheet is off.
     * @since DOCUMENTS 5.0e
     * @param option string Gridline option. Possible values are `hideAll` and `showPrint`. See description for details.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.setGridlines("showPrint");
     */
    setGridlines(option: string): boolean;
    /**
     * **Set the printed page header caption.**
     *
     * Headers are generated using a string which is a combination of plain text and control characters (see [Generating header/footer](../xlsxwriter.html) for more details).
     * @since DOCUMENTS 5.0e
     * @param header The header string.
     * @param margin **Default:** `0.3`.
     * Optional header margin in inches. Excel default is 0.3.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.setHeader("some text", 0.2))
     *   throw worksheet1.getLastError();
     */
    setHeader(header: string, margin?: number): boolean;
    /**
     * **Set the horizontal page breaks on the current worksheet.**
     *
     * This function adds horizontal page breaks to the worksheet. A page break causes all the data that follows it to be printed on the next page.
     * Horizontal page breaks act between rows.
     *
     * **Note:** There is an Excel limitation of 1023 horizontal page breaks per worksheet.
     * @since DOCUMENTS 5.0e
     * @param breaks Integer array of page breaks.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // To create a page break between rows 20 and 21 you must specify the break at
     * // row 21. However in zero index notation this is actually row 20:
     * if (!worksheet1.setHorizontalPagebreaks([20]))
     *   throw worksheet1.getLastError();
     */
    setHorizontalPagebreaks(breaks: number[]): boolean;
    /**
     * **Set the page orientation as landscape.**
     *
     * This function is used to set the orientation of the worksheet's printed page to landscape.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setLandscape(): boolean;
    /**
     * **Set the worksheet margins for the printed page.**
     *
     * This function is used to set the margins of the worksheet when it is printed. The units are in inches.
     * Specifying -1 for any parameter will give the default Excel value as shown below.
     * @since DOCUMENTS 5.0e
     * @param left **Default:** `-1`.
     * Optional left margin in inches. Excel default is 0.7.
     * @param right **Default:** `-1`.
     * Optional right margin in inches. Excel default is 0.7.
     * @param top **Default:** `-1`.
     * Optional top margin in inches. Excel default is 0.75.
     * @param bottom **Default:** `-1`.
     * Optional bottom margin in inches. Excel default is 0.75.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.setMargins(1.3, 1.2, -1, -1);
     */
    setMargins(left?: number, right?: number, top?: number, bottom?: number): boolean;
    /**
     * **Set the page layout to page view mode.**
     *
     * This function is used to display the worksheet in "Page View/Layout" mode.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setPageView(): boolean;
    /**
     * **Set the paper format for the printed output of the current worksheet.**
     *
     * The following paper styles are available:
     *
     * | Index   | Paper format           | Paper size           |
     * |---------|------------------------|----------------------|
     * | 0       | Printer default        | Printer default      |
     * | 1       | Letter                 | 8 1/2 x 11 in        |
     * | 2       | Letter Small           | 8 1/2 x 11 in        |
     * | 3       | Tabloid                | 11 x 17 in           |
     * | 4       | Ledger                 | 17 x 11 in           |
     * | 5       | Legal                  | 8 1/2 x 14 in        |
     * | 6       | Statement              | 5 1/2 x 8 1/2 in     |
     * | 7       | Executive              | 7 1/4 x 10 1/2 in    |
     * | 8       | A3                     | 297 x 420 mm         |
     * | 9       | A4                     | 210 x 297 mm         |
     * | 10      | A4 Small               | 210 x 297 mm         |
     * | 11      | A5                     | 148 x 210 mm         |
     * | 12      | B4                     | 250 x 354 mm         |
     * | 13      | B5                     | 182 x 257 mm         |
     * | 14      | Folio                  | 8 1/2 x 13 in        |
     * | 15      | Quarto                 | 215 x 275 mm         |
     * | 16      | undefined              | 10x14 in             |
     * | 17      | undefined              | 11x17 in             |
     * | 18      | Note                   | 8 1/2 x 11 in        |
     * | 19      | Envelope 9             | 3 7/8 x 8 7/8        |
     * | 20      | Envelope 10            | 4 1/8 x 9 1/2        |
     * | 21      | Envelope 11            | 4 1/2 x 10 3/8       |
     * | 22      | Envelope 12            | 4 3/4 x 11           |
     * | 23      | Envelope 14            | 5 x 11 1/2           |
     * | 24      | C size sheet           | undefined            |
     * | 25      | D size sheet           | undefined            |
     * | 26      | E size sheet           | undefined            |
     * | 27      | Envelope DL            | 110 x 220 mm         |
     * | 28      | Envelope C3            | 324 x 458 mm         |
     * | 29      | Envelope C4            | 229 x 324 mm         |
     * | 30      | Envelope C5            | 162 x 229 mm         |
     * | 31      | Envelope C6            | 114 x 162 mm         |
     * | 32      | Envelope C65           | 114 x 229 mm         |
     * | 33      | Envelope B4            | 250 x 353 mm         |
     * | 34      | Envelope B5            | 176 x 250 mm         |
     * | 35      | Envelope B6            | 176 x 125 mm         |
     * | 36      | Envelope               | 110 x 230 mm         |
     * | 37      | Monarch                | 3.875 x 7.5 in       |
     * | 38      | Envelope               | 3 5/8 x 6 1/2 in     |
     * | 39      | Fanfold                | 14 7/8 x 11 in       |
     * | 40      | German Std Fanfold     | 8 1/2 x 12 in        |
     * | 41      | German Legal Fanfold   | 8 1/2 x 13 in        |
     *
     * **Note:** It is likely that not all of these paper types will be available to the end user since it will depend on the paper formats
     * that the user's printer supports. Therefore, it is best to stick to standard paper types. If you do not specify a paper type the worksheet
     * will print using the printer's default paper style.
     * @since DOCUMENTS 5.0e
     * @param type **Default:** `0`.
     * Optional integer paper format type (see table of paper styles).
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.setPaperType(1);  // US Letter
     * worksheet2.setPaperType(9);  // A4
     */
    setPaperType(type?: number): boolean;
    /**
     * **Set the page orientation as portrait.**
     *
     * This function is used to set the orientation of the worksheet's printed page to portrait.
     * The default worksheet orientation is portrait, so this function isn't generally required.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     */
    setPortrait(): boolean;
    /**
     * **Set the properties for a row of cells.**
     *
     * The function is used to change the default properties of a row. The most common use for this function is to change the height of a row.
     * It can also be used to create Outlines and Grouping of rows with the optional parameters `hidden`, `level` and `collapsed`.
     * Adjacent rows with the same outline level are grouped together into a single outline. Rows can be collapsed by setting the parameter `hidden`
     * for the hidden rows and setting the parameter `collapsed` for a row that has the collapsed '+' symbol.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param height **Default:** `15`.
     * Optional row height. The default row height is 15.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to any cells in the row that don't have a format.
     * As with Excel the row format is overridden by an explicit cell format.
     * @param hidden **Default:** `false`.
     * Optional flag used to hide the row.
     * @param level **Default:** `0`.
     * Optional integer outline level of the row used to create Outlines and Grouping. Excel allows up to 7 outline levels.
     * Therefore the level parameter should be in the range `0 <= level <= 7`.
     * @param collapsed **Default:** `false`.
     * Optional flag used to create Outlines and Grouping and indicating whether to collapse a row that has the collapsed '+' symbol.
     * @returns `true` if successful, `false` in case of any error
     * @see {@link setColumn}
     * @example
     * // Set the row options with the outline level.
     * worksheet1.setRow(1, 15, null, false, 2, false);
     * worksheet1.setRow(2, 15, null, false, 2, false);
     * worksheet1.setRow(3, 15, null, false, 2, false);
     * worksheet1.setRow(4, 15, null, false, 2, false);
     * worksheet1.setRow(5, 15, null, false, 1, false);
     * worksheet1.setRow(6, 15, null, false, 2, false);
     * worksheet1.setRow(7, 15, null, false, 2, false);
     * worksheet1.setRow(8, 15, null, false, 2, false);
     * worksheet1.setRow(9, 15, null, false, 2, false);
     * worksheet1.setRow(10, 15, null, false, 1, false);
     */
    setRow(row: number, height?: number, format?: XLSXFormat, hidden?: boolean, level?: number, collapsed?: boolean): boolean;
    /**
     * **Set the color of the current worksheet tab.**
     *
     * @since DOCUMENTS 5.0e
     * @param color The desired tab color specified using a HTML style RGB integer value.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.setTabColor(0xFF9900); // Orange
     * worksheet1.setTabColor(writer.COLOR_RED); // from Predefined values for common colors
     */
    setTabColor(color: number): boolean;
    /**
     * **Set the vertical page breaks on the current worksheet.**
     *
     * This function adds vertical page breaks to the worksheet. A page break causes all the data that follows it to be printed on the next page.
     * Vertical page breaks act between columns.
     *
     * **Note:** There is an Excel limitation of 1023 vertical page breaks per worksheet.
     * @since DOCUMENTS 5.0e
     * @param breaks Integer array of page breaks.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * // To create a page break between columns 20 and 21 you must specify the break
     * // at column 21. However in zero index notation this is actually column 20:
     * if (!worksheet1.setVerticalPagebreaks([20]))
     *   throw worksheet1.getLastError();
     */
    setVerticalPagebreaks(breaks: number[]): boolean;
    /**
     * **Set the worksheet zoom factor.**
     *
     * The default zoom factor is 100.
     *
     * **Note:** This function does not affect the scale of the printed page.
     * @since DOCUMENTS 5.0e
     * @param scale **Default:** `100`.
     * Optional integer worksheet zoom factor in the range `10 <= zoom <= 400`.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.setZoom(50);
     */
    setZoom(scale?: number): boolean;
    /**
     * **Split the current worksheet into panes.**
     *
     * This function can be used to divide a worksheet into horizontal or vertical regions known as panes.
     * This function is different from the function {@link XLSXWorksheet.freezePanes | XLSXWorksheet.freezePanes(row, col)}
     * in that the splits between the panes will be visible to the user and each pane will have its own scroll bars.
     * The parameters `vertical` and `horizontal` are used to specify the vertical and horizontal position of the split.
     * The units for `vertical` and `horizontal` are the same as those used by Excel to specify row height and column width.
     * However, the vertical and horizontal units are different from each other. Therefore you must specify the `vertical`
     * and `horizontal` parameters in terms of the row heights and column widths that you have set or the default values
     * which are 15 for a row and 8.43 for a column.
     * @since DOCUMENTS 5.0e
     * @param vertical The position for the vertical split.
     * @param horizontal The position for the horizontal split.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * worksheet1.splitPanes(15, 0);    // First row.
     * worksheet2.splitPanes(0, 8.43);  // First column.
     * worksheet3.splitPanes(15, 8.43); // First row and column.
     */
    splitPanes(vertical: number, horizontal: number): boolean;
    /**
     * **Write a blank cell specified by row and column.**
     *
     * This function is used to add formatting to a cell which doesn't contain a string or number value. Excel differentiates
     * between an "Empty" cell and a "Blank" cell. An Empty cell is a cell which doesn't contain data or formatting whilst a Blank cell
     * doesn't contain data but does contain formatting. Excel stores Blank cells but ignores Empty cells. As such, if you write
     * an empty cell without formatting it is ignored.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * format1.setBackgroundColor(writer.COLOR_RED);
     * worksheet1.writeBlank(0, 0, format1);
     */
    writeBlank(row: number, col: number, format?: XLSXFormat): boolean;
    /**
     * **Write an Excel boolean to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)}
     * with `type = "boolean"`.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value The boolean value to write to the cell.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeBoolean(1,5, false))
     *   throw worksheet1.getLastError();
     */
    writeBoolean(row: number, col: number, value: boolean, format?: XLSXFormat): boolean;
    /**
     * **Write a value to a worksheet cell.**
     *
     * This function writes a value according to the type (see below) to a worksheet cell specified by `row` and `column`.
     *
     * **Available value types:**
     *
     * + **`string`**
     *   A value of this type is a string. Unicode strings are supported in UTF-8 encoding. This generally requires
     *   that your source file is UTF-8 encoded or that the data has been read from a UTF-8 source.
     * + **`number`**
     *   A value of this type is a number. The native data type for all numbers in Excel is an IEEE-754 64-bit
     *   double-precision floating point, which is also the default type used by this function. According to
     *   the used number format, a number can be displayed as an integer, a floating point number, a date, a currency value
     *   or some other user defined format. See {@link XLSXFormat.setNumberFormat | XLSXFormat.setNumberFormat(numFormat)} for more details.
     *
     *   **Note:** Excel doesn't support `NaN`, `Inf` or `-Inf` as a number value. If you are writing data that contains
     *   these values then your application should convert them to a string or handle them in some other way.
     * + **`boolean`**
     *   A value of this type is a boolean value.
     * + **`formula`**
     *   A value of this type is a string containing a formula. Formulas must be written with the US style separator/range operator
     *   which is a comma (not semi-colon). Therefore a formula with multiple values should be written e.g. as follows: `"=SUM(1, 2, 3)"`.
     * + **`link`**
     *   A value of this type is a string containing a URL/hyperlink. The usual web style URI's are supported: `http://`, `https://`, `ftp://` and `mailto:`.
     *   An Excel hyperlink is comprised of two elements: the displayed string and the non-displayed link. By default the displayed string is the same
     *   as the link. However, it is possible to overwrite it with any other value type. The most common case is to overwrite the displayed link text
     *   with another string:
     *
     *   ```js
     *   // The typical worksheet format for a hyperlink is a blue underline:
     *   var urlFormat = writer.addFormat("urlFormat"); urlFormat.setFontStyle("underline");
     *   urlFormat.setFontColor(writer.COLOR_BLUE);
     *
     *   // Write a hyperlink but overwrite the displayed string.
     *   worksheet1.writeCell("link", 2, 0, "http://libxlsxwriter.github.io", urlFormat);
     *   worksheet1.writeCell("string", 2, 0, "Read the documentation.", urlFormat);
     *   ```
     *
     *   Two local URIs are supported: `internal:` and `external:`. These are used for hyperlinks to internal worksheet references
     *   or external Excel file and worksheet references. Worksheet references are typically of the form `Worksheet1!A1`. You can also
     *   link to a worksheet range using the standard Excel notation: `Worksheet1!A1:B2`.In external links the Excel file and worksheet
     *   name must be separated by the `#` character:
     *   ```js
     *   worksheet1.writeCell("link", 0, 0, "external:c:\\foo.xlsx#Worksheet2!A1", urlFormat);
     *   ```
     *   Excel requires that worksheet names containing spaces or non alphanumeric characters are single quoted as follows:
     *   ```js
     *   worksheet1.writeCell("link", 0, 0, "internal:'Sales Data'!A1", urlFormat);
     *   ```
     *   Links to network files are also supported.
     *   Network files normally begin with two back slashes as follows `\\NETWORK\etc`.
     *
     *   ```js
     *   worksheet1.writeCell("link", 0, 0, "external:c:/temp/foo.xlsx",     urlFormat);
     *   worksheet1.writeCell("link", 1, 0, "external://NET/share/foo.xlsx", urlFormat);
     *   ```
     *
     *   **Note:** This function will escape the following characters in URLs as required by Excel: `\s " < > \ [ ] ^ { }` unless
     *   the URL already contains `%xx` style escapes. In which case it is assumed that the URL was escaped correctly by the user
     *   and will by passed directly to Excel.
     * + **`datetime`**
     *   A value of this type is a Date object. Dates and times in Excel are represented by real numbers. For example a date that
     *   is displayed in Excel as `"Feb 28 2013 12:00 PM"` is stored as the number `41333.5`. The integer part of the number stores
     *   the number of days since the epoch, which is generally 1900, and the fractional part stores the percentage of the day.
     *   A date or time in Excel is just like any other number. To display the number as a date you must apply an Excel number format to it.
     *
     *   ```js
     *   // Write the number without formatting.
     *   worksheet1.writeCell("number", 0, 0, 41333.5);  // 41333.5
     *
     *   // Write the date without formatting.
     *   worksheet1.writeCell("datetime", 0, 1, new Date(2013, 1, 28, 12)); // 41333.5
     *
     *   // Add a format with date formatting.
     *   var dtFormat = writer.addFormat("dtFormat");
     *   dtFormat.setNumberFormat("mmm d yyyy hh:mm AM/PM");
     *
     *   // Write the number with formatting.
     *   worksheet1.writeCell("number", 1, 0, 41333.5, dtFormat); // Feb 28 2013 12:00 PM
     *
     *   // Write the date with formatting.
     *   worksheet1.writeCell("datetime", 1, 1, new Date(2013, 1, 28, 12), dtFormat); // Feb 28 2013 12:00 PM
     *
     *   // Widen the columns to make the text clearer.
     *   worksheet1.setColumn(0, 1, 20);
     *   ```
     *
     *   Dates in Excel do not support timezones and the maximum resolution of times is milliseconds. Dates can be formatted using any of the date formats
     *   supported by Excel. See {@link XLSXFormat.setNumberFormat | XLSXFormat.setNumberFormat(numFormat)} for more details.
     * + **`richString`**
     *   This type is used to write strings with multiple formats. A value of this type is a JSON-String containing an array of objects with the property pair
     *   `format` and `string`. Each object represents a fragment of the rich multi-format string with an {@link XLSXFormat} (specified with the format name or `null`)
     *   to define the format for the string part. If the string fragment is unformatted then `null` can be used for the format.
     *
     *   **Note:** An empty string fragment is not allowed in a rich string.
     *
     * @since DOCUMENTS 5.0e
     * @param type The type (see below) of the value to write to the cell.
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value The value to write to the cell can be specified as follows:
     *
     * + String for the value types `string`, `formula`, `link` and `richString`.
     * + Number for the value type `number`.
     * + Boolean for the value type `boolean`.
     * + Date object for the value type `datetime`.
     *
     * @param format **Default:** `null`.
     * Optional {@link XLSXFormat} object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @see
     * {@link XLSXWorksheet.writeString | XLSXWorksheet.writeString}
     * {@link XLSXWorksheet.writeNumber | XLSXWorksheet.writeNumber}
     * {@link XLSXWorksheet.writeBoolean | XLSXWorksheet.writeBoolean}
     * {@link XLSXWorksheet.writeFormula | XLSXWorksheet.writeFormula}
     * {@link XLSXWorksheet.writeLink | XLSXWorksheet.writeLink}
     * {@link XLSXWorksheet.writeDatetime | XLSXWorksheet.writeDatetime}
     * {@link XLSXWorksheet.writeRichString | XLSXWorksheet.writeRichString}
     * @example
     * var writer = new XLSXWriter("c:\\tmp\\exWriteCell.xlsx");
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     * var format1 = writer.addFormat("format1");
     * format1.setFontStyle("bold");
     * format1.setFontColor(writer.COLOR_RED);
     * format1.setNumberFormat("$#,##0.00");
     * var format2 = writer.addFormat("format2");
     * format2.setNumberFormat("d-mm-yy");
     * // Value type : string
     * if (!worksheet1.writeCell("string", 1,2,"Hello World", format1))
     *   throw worksheet1.getLastError();
     * // Value type : formula
     * if (!worksheet1.writeCell("formula", 1,3, "=DATEVALUE(\"1-Jan-2013\")", format2))
     *   throw worksheet1.getLastError();
     * // Value type : number
     * if (!worksheet1.writeCell("number", 1,4, 100, format1))
     *   throw worksheet1.getLastError();
     * // Value type : boolean
     * if (!worksheet1.writeCell("boolean", 1,5, false))
     *   throw worksheet1.getLastError();
     * // Value type : datetime
     * // Without a date format the datetime will appear as a number only.
     * if (!worksheet1.writeCell("datetime", 1,6, new Date(2014, 1, 14), format2))
     *   throw worksheet1.getLastError();
     * // Value type : link
     * if (!worksheet1.writeCell("link", 1,7, "http://libxlsxwriter.github.io"))
     *   throw worksheet1.getLastError();
     * var richString = [];
     * richString[0] = {};
     * richString[0].format = "format1";
     * richString[0].string = "Rich";
     * richString[1] = {};
     * richString[1].format = null;
     * richString[1].string = " string";
     * var jsonString = JSON.stringify(richString);
     * // Value type : richString
     * if (!worksheet1.writeCell("richString", 1, 8, jsonString))
     *   throw worksheet1.getLastError()
     * // Change the column width
     * worksheet1.setColumn(2, 8, 12);
     * worksheet1.setColumn(7, 7, 25);
     * if (!writer.save())
     *   throw writer.getLastError();
     */
    writeCell(type: string, row: number, col: number, value: any, format?: XLSXFormat): boolean;
    /**
     * **Write a date or time to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)}
     * with `type = "datetime"`. See the value type **undefined** in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value The datetime to write to the cell.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeDatetime(1,6, new Date(2014, 1, 14), format2))
     *   throw worksheet1.getLastError();
     */
    writeDatetime(row: number, col: number, value: Date, format?: XLSXFormat): boolean;
    /**
     * **Write a formula or function to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using
     * {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)} with `type = "formula"`.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value Formula string to write to cell. See the value type **undefined** in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeFormula(1,3, "=DATEVALUE(\"1-Jan-2013\")", format2))
     *   throw worksheet1.getLastError();
     */
    writeFormula(row: number, col: number, value: string, format?: XLSXFormat): boolean;
    /**
     * **Write a URL/hyperlink to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)}
     * with `type = "link"`. See the value type **undefined** in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value The URL/hyperlink to write to the cell.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeLink(1,7, "http://libxlsxwriter.github.io"))
     *   throw worksheet1.getLastError();
     */
    writeLink(row: number, col: number, value: string, format?: XLSXFormat): boolean;
    /**
     * **Write a numeric value to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using
     * {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)} with `type = "number"`.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value The number to write to the cell. See the value type **undefined** in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeNumber(1,4, 100, format1))
     *   throw worksheet1.getLastError();
     */
    writeNumber(row: number, col: number, value: number, format?: XLSXFormat): boolean;
    /**
     * **Write strings with multiple formats to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using
     * {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)} with `type = "richString"`.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value A JSON-String containing an array of objects with the property pair `format` and `string`. See the value type **undefined**
     * in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var writer = new XLSXWriter("c:\\tmp\\exWriteRichString.xlsx");
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     * var format1 = writer.addFormat("format1");
     * format1.setFontStyle("bold");
     * format1.setFontColor(writer.COLOR_RED);
     * format1.setNumberFormat("$#,##0.00");
     * var format2 = writer.addFormat("format2");
     * format2.setFontStyle("italic");
     * format2.setFontColor(writer.COLOR_ORANGE);
     * // Array of objects with format/string pairs
     * var richString = [];
     * richString[0] = {};
     * richString[0].format = "format1";
     * richString[0].string = "Rich";
     * richString[1] = {};
     * richString[1].format = null;
     * richString[1].string = " string";
     * richString[2] = {};
     * richString[2].format = "format2";
     * richString[2].string = " example";
     * var jsonString = JSON.stringify(richString);
     * if (!worksheet1.writeRichString(0, 0, jsonString))
     *   throw worksheet1.getLastError()
     * // Change the column width
     * worksheet1.setColumn(0, 0, 20);
     * if (!writer.save())
     *   throw writer.getLastError();
     */
    writeRichString(row: number, col: number, value: string, format?: XLSXFormat): boolean;
    /**
     * **Write a string to a worksheet cell specified by row and column.**
     *
     * This function is an alternative to using
     * {@link XLSXWorksheet.writeCell | XLSXWorksheet.writeCell(type, row, col, value, format)} with `type = "string"`.
     * @since DOCUMENTS 5.0e
     * @param row The zero indexed row number.
     * @param col The zero indexed column number.
     * @param value String to write to cell. See the value type **undefined** in the documentation of `XLSXWorksheet.writeCell()` for more details.
     * @param format **Default:** `null`.
     * Optional XLSXFormat object used to apply formatting to the cell. The default value is `null` to indicate no formatting.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!worksheet1.writeString(1,2,"Hello World", format1))
     *   throw worksheet1.getLastError();
     */
    writeString(row: number, col: number, value: string, format?: XLSXFormat): boolean;
}
/**
 * The XLSXWriter class allows creating files in the Excel 2007+ XLSX file format by use of the library Libxlsxwriter.
 *
 * An XLSXWriter object represents an entire Excel document. It can be used to write text, numbers, formulas and hyperlinks to multiple worksheets.
 * It supports features such as:
 * <ul>
 * <li>100% compatible Excel XLSX files </li>
 * <li>Excel formatting </li>
 * <li>Merged cells </li>
 * <li>Autofilters </li>
 * <li>Charts </li>
 * <li>Worksheet PNG/JPEG images </li>
 * </ul>
 *
 * **Note:** However, the XLSXWriter can only create new files. It **CANNOT READ OR MODIFY** existing files.
 *
 * @groupDescription Predefined values for common colors
 * The colors are specified using a HTML style RGB integer value. For convenience a limited number of common colors are predefined as follows.
 *
 * **Note:** Black in HTML is actually `0x000000` but {@link XLSXWriter.COLOR_BLACK | `XLSXWriter.COLOR_BLACK`} is defined as `0x1000000`
 * to avoid confusion with an undefined or Zero color value. It is converted to the correct HTML code internally.
 *
 * **Since** DOCUMENTS 5.0e
 *
 * **See**
 * {@link XLSXWorksheet.setTabColor | XLSXWorksheet.setTabColor(color)}
 * {@link XLSXChartsheet.setTabColor | XLSXChartsheet.setTabColor(color)}
 * {@link XLSXFormat.setFontColor | XLSXFormat.setFontColor(color)}
 * {@link XLSXFormat.setBorderColor | XLSXFormat.setBorderColor(border, color)}
 * {@link XLSXFormat.setForegroundColor | XLSXFormat.setForegroundColor(color)}
 * {@link XLSXFormat.setBackgroundColor | XLSXFormat.setBackgroundColor(color)}
 *
 * @groupDescription Cell border styles
 * The constants build an enumeration of the available values for cell border styles.
 * **Since** DOCUMENTS 5.0e
 * **See** {@link XLSXFormat.setBorderStyle | XLSXFormat.setBorderStyle(border, style)}
 *
 * @groupDescription Text alignments
 * These constants build an enumeration of the available values for the horizontal and vertical text alignment within a cell.
 * **Since** DOCUMENTS 5.0e
 * **See** {@link XLSXFormat.setAlign | XLSXFormat.setAlign(alignment)}
 *
 * @groupDescription Background Patterns
 * These constants build an enumeration of the available fill patterns for the background of a cell.
 * **Since** DOCUMENTS 5.0e
 * **See** {@link XLSXFormat.setBackgroundPattern | XLSXFormat.setBackgroundPattern(pattern)}
 *
 * @groupDescription Chart types
 * These constants build an enumeration of the available chart types.
 * **Since** DOCUMENTS 5.0e
 * **See** {@link XLSXWriter.addChart | XLSXWriter.addChart(type)}
 *
 */
declare class XLSXWriter {
    /**
     * **Create a new XLSXWriter object with a given filename.**
     *
     * **Note:** When specifying a filename it is recommended that you use an .xlsx extension or Excel will generate a warning when opening the file.
     *
     * **Since:** DOCUMENTS 5.0e
     * @since DOCUMENTS 5.0e
     * @example
     * var writer = new XLSXWriter("c:\\tmp\\writer.xlsx");
     * // Add a worksheet with a user defined sheet name.
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     * // Add a cell format.
     * var format1 = writer.addFormat("format1");
     * // Set the bold property for the format.
     * format1.setFontStyle("bold");
     * // Set the alignment for the format
     * format1.setAlign(writer.ALIGN_CENTER);
     * // Write formatted data.
     * worksheet1.writeCell("string", 0, 0, "Hello Excel", format1);
     * // Change the row height
     * worksheet1.setRow(0, 20);
     * // Change the column width
     * worksheet1.setColumn(0, 0, 15);
     * // Add an other worksheet with a user defined sheet name.
     * var worksheet2 = writer.addWorksheet("Worksheet2");
     * // Write some data to the worksheet.
     * writeWorksheetData(worksheet2);
     * // Create a chart object.
     * var chart = writer.addChart(writer.CHART_COLUMN);
     * // Configure the chart. In simplest case we just add some value data
     * // series. The empty categories will default to 1 to 5 like in Excel.
     * var series1 = chart.addSeries("", "=Worksheet2!$A$1:$A$5");
     * var series2 = chart.addSeries("", "=Worksheet2!$B$1:$B$5");
     * var series3 = chart.addSeries("", "=Worksheet2!$C$1:$C$5");
     * // Insert the chart into the worksheet
     * worksheet2.insertChart(6, 1, chart);
     * // Save the file.
     * if (!writer.save())
     *     throw writer.getLastError();
     *
     * function writeWorksheetData(worksheet)
     * {
     *     var data = [
     *         // Three columns of data.
     *         [1,   2,   3],
     *         [2,   4,   6],
     *         [3,   6,   9],
     *         [4,   8,  12],
     *         [5,  10,  15]
     *     ];
     *     var row, col;
     *     for (row = 0; row < 5; row++)
     *         for (col = 0; col < 3; col++)
     *             worksheet.writeCell("number", row, col, data[row][col]);
     * }
     * @param filename The name of the new Excel file to create.
     */
    constructor(filename: string);
    /**
     * Black defined as `0x1000000`
     * @group Predefined values for common colors
     */
    COLOR_BLACK: number;
    /**
     * Blue defined as `0x0000FF`
     * @group Predefined values for common colors
     */
    COLOR_BLUE: number;
    /**
     * Brown defined as `0x800000`
     * @group Predefined values for common colors
     */
    COLOR_BROWN: number;
    /**
     * Cyan defined as `0x00FFFF`
     * @group Predefined values for common colors
     */
    COLOR_CYAN: number;
    /**
     * Gray defined as `0x808080`
     * @group Predefined values for common colors
     */
    COLOR_GRAY: number;
    /**
     * Green defined as `0x008000`
     * @group Predefined values for common colors
     */
    COLOR_GREEN: number;
    /**
     * Lime defined as `0x00FF00`
     * @group Predefined values for common colors
     */
    COLOR_LIME: number;
    /**
     * Magenta defined as `0xFF00FF`
     * @group Predefined values for common colors
     */
    COLOR_MAGENTA: number;
    /**
     * Navy defined as `0x000080`
     * @group Predefined values for common colors
     */
    COLOR_NAVY: number;
    /**
     * Orange defined as `0xFF6600`
     * @group Predefined values for common colors
     */
    COLOR_ORANGE: number;
    /**
     * Pink defined as `0xFF00FF`
     * @group Predefined values for common colors
     */
    COLOR_PINK: number;
    /**
     * Purple defined as `0x800080`
     * @group Predefined values for common colors
     */
    COLOR_PURPLE: number;
    /**
     * Red defined as `0xFF0000`
     * @group Predefined values for common colors
     */
    COLOR_RED: number;
    /**
     * Silver defined as `0xC0C0C0`
     * @group Predefined values for common colors
     */
    COLOR_SILVER: number;
    /**
     * White defined as `0xFFFFFF`
     * @group Predefined values for common colors
     */
    COLOR_WHITE: number;
    /**
     * Yellow defined as `0xFFFF00`
     * @group Predefined values for common colors
     */
    COLOR_YELLOW: number;
    /**
     * No border
     * @group Cell border styles
     */
    BORDER_NONE: number;
    /**
     * Thin border style
     * @group Cell border styles
     */
    BORDER_THIN: number;
    /**
     * Medium border style
     * @group Cell border styles
     */
    BORDER_MEDIUM: number;
    /**
     * Dashed border style
     * @group Cell border styles
     */
    BORDER_DASHED: number;
    /**
     * Dotted border style
     * @group Cell border styles
     */
    BORDER_DOTTED: number;
    /**
     * hick border style
     * @group Cell border styles
     */
    BORDER_THICK: number;
    /**
     * Double border style
     * @group Cell border styles
     */
    BORDER_DOUBLE: number;
    /**
     * Hair border style
     * @group Cell border styles
     */
    BORDER_HAIR: number;
    /**
     * Medium dashed border style
     * @group Cell border styles
     */
    BORDER_MEDIUM_DASHED: number;
    /**
     * Dash-dot border style
     * @group Cell border styles
     */
    BORDER_DASH_DOT: number;
    /**
     * Medium dash-dot border style
     * @group Cell border styles
     */
    BORDER_MEDIUM_DASH_DOT: number;
    /**
     * Dash-dot-dot border style
     * @group Cell border styles
     */
    BORDER_DASH_DOT_DOT: number;
    /**
     * Medium dash-dot-dot border style
     * @group Cell border styles
     */
    BORDER_MEDIUM_DASH_DOT_DOT: number;
    /**
     * Slant dash-dot border style
     * @group Cell border styles
     */
    BORDER_SLANT_DASH_DOT: number;
    /**
     * No alignment. Cell will use Excel's default for the data type
     * @group Text alignments
     */
    ALIGN_NONE: number;
    /**
     * Left horizontal alignment
     * @group Text alignments
     */
    ALIGN_LEFT: number;
    /**
     * Center horizontal alignment
     * @group Text alignments
     */
    ALIGN_CENTER: number;
    /**
     * Right horizontal alignment
     * @group Text alignments
     */
    ALIGN_RIGHT: number;
    /**
     * Cell fill horizontal alignment
     * @group Text alignments
     */
    ALIGN_FILL: number;
    /**
     * Justify horizontal alignment
     * @group Text alignments
     */
    ALIGN_JUSTIFY: number;
    /**
     * Center Across horizontal alignment
     * @group Text alignments
     */
    ALIGN_CENTER_ACROSS: number;
    /**
     * Distributed horizontal alignment
     * @group Text alignments
     */
    ALIGN_DISTRIBUTED: number;
    /**
     * Top vertical alignment
     * @group Text alignments
     */
    ALIGN_VERTICAL_TOP: number;
    /**
     * Bottom vertical alignment
     * @group Text alignments
     */
    ALIGN_VERTICAL_BOTTOM: number;
    /**
     * Center vertical alignment
     * @group Text alignments
     */
    ALIGN_VERTICAL_CENTER: number;
    /**
     * Justify vertical alignment
     * @group Text alignments
     */
    ALIGN_VERTICAL_JUSTIFY: number;
    /**
     * Distributed vertical alignment
     * @group Text alignments
     */
    ALIGN_VERTICAL_DISTRIBUTED: number;
    /**
     * Empty pattern
     * @group Background Patterns
     */
    PATTERN_NONE: number;
    /**
     * Solid pattern
     * @group Background Patterns
     */
    PATTERN_SOLID: number;
    /**
     * Medium gray pattern
     * @group Background Patterns
     */
    PATTERN_MEDIUM_GRAY: number;
    /**
     * Dark gray pattern
     * @group Background Patterns
     */
    PATTERN_DARK_GRAY: number;
    /**
     * Light gray pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_GRAY: number;
    /**
     * Dark horizontal line pattern
     * @group Background Patterns
     */
    PATTERN_DARK_HORIZONTAL: number;
    /**
     * Dark vertical line pattern
     * @group Background Patterns
     */
    PATTERN_DARK_VERTICAL: number;
    /**
     * Dark diagonal stripe pattern
     * @group Background Patterns
     */
    PATTERN_DARK_DOWN: number;
    /**
     * Reverse dark diagonal stripe pattern
     * @group Background Patterns
     */
    PATTERN_DARK_UP: number;
    /**
     * Dark grid pattern
     * @group Background Patterns
     */
    PATTERN_DARK_GRID: number;
    /**
     * Dark trellis pattern
     * @group Background Patterns
     */
    PATTERN_DARK_TRELLIS: number;
    /**
     * Light horizontal Line pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_HORIZONTAL: number;
    /**
     * Light vertical line pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_VERTICAL: number;
    /**
     * Light diagonal stripe pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_DOWN: number;
    /**
     * Reverse light diagonal stripe pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_UP: number;
    /**
     * Light grid pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_GRID: number;
    /**
     * Light trellis pattern
     * @group Background Patterns
     */
    PATTERN_LIGHT_TRELLIS: number;
    /**
     * 12.5% gray pattern
     * @group Background Patterns
     */
    PATTERN_GRAY_125: number;
    /**
     * 6.25% gray pattern
     * @group Background Patterns
     */
    PATTERN_GRAY_0625: number;
    /**
     * Area chart
     * @group Chart types
     */
    CHART_AREA: number;
    /**
     * Area chart - stacked
     * @group Chart types
     */
    CHART_AREA_STACKED: number;
    /**
     * Area chart - percentage stacked
     * @group Chart types
     */
    CHART_AREA_STACKED_PERCENT: number;
    /**
     * Bar chart
     * @group Chart types
     */
    CHART_BAR: number;
    /**
     * Bar chart - stacked
     * @group Chart types
     */
    CHART_BAR_STACKED: number;
    /**
     * Bar chart - percentage stacked
     * @group Chart types
     */
    CHART_BAR_STACKED_PERCENT: number;
    /**
     * Column chart
     * @group Chart types
     */
    CHART_COLUMN: number;
    /**
     * Column chart - stacked
     * @group Chart types
     */
    CHART_COLUMN_STACKED: number;
    /**
     * Column chart - percentage stacked
     * @group Chart types
     */
    CHART_COLUMN_STACKED_PERCENT: number;
    /**
     * Doughnut chart
     * @group Chart types
     */
    CHART_DOUGHNUT: number;
    /**
     * Line chart
     * @group Chart types
     */
    CHART_LINE: number;
    /**
     * Pie chart
     * @group Chart types
     */
    CHART_PIE: number;
    /**
     * Scatter chart
     * @group Chart types
     */
    CHART_SCATTER: number;
    /**
     * Scatter chart - straight
     * @group Chart types
     */
    CHART_SCATTER_STRAIGHT: number;
    /**
     * Scatter chart - straight with markers
     * @group Chart types
     */
    CHART_SCATTER_STRAIGHT_WITH_MARKERS: number;
    /**
     * Scatter chart - smooth
     * @group Chart types
     */
    CHART_SCATTER_SMOOTH: number;
    /**
     * Scatter chart - smooth with markers
     * @group Chart types
     */
    CHART_SCATTER_SMOOTH_WITH_MARKERS: number;
    /**
     * Radar chart
     * @group Chart types
     */
    CHART_RADAR: number;
    /**
     * Radar chart - with markers
     * @group Chart types
     */
    CHART_RADAR_WITH_MARKERS: number;
    /**
     * Radar chart - filled
     * @group Chart types
     */
    CHART_RADAR_FILLED: number;
    /**
     * **String value containing the version number of the used library Libxlsxwriter.**
     *
     * @since DOCUMENTS 5.0e
     */
    version: string;
    /**
     * **Make a chartsheet the active, i.e., visible chartsheet.**
     *
     * This function is used to specify which chartsheet is initially visible in a multi-sheet Excel document.
     *
     * **Note:** More than one chartsheet can be selected via the {@link XLSXWriter.selectChartsheet | XLSXWriter.selectChartsheet(chartsheet)} function,
     * however only one chartsheet can be active.
     * @since DOCUMENTS 5.0e
     * @param chartsheet The chartsheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the chartsheet name. </li>
     * <li>XLSXChartsheet object representing the chartsheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.activateWorksheet | XLSXWriter.activateWorksheet}
     * @example
     * writer.activateChartsheet(chartsheet2);
     */
    activateChartsheet(chartsheet: any): boolean;
    /**
     * **Make a worksheet the active, i.e., visible worksheet.**
     *
     * This function is used to specify which worksheet is initially visible in a multi-sheet Excel document.
     *
     * **Note:** More than one worksheet can be selected via the {@link XLSXWriter.selectWorksheet | XLSXWriter.selectWorksheet(worksheet)} function, however only
     * one worksheet can be active. The default active worksheet is the first worksheet.
     * @since DOCUMENTS 5.0e
     * @param worksheet The worksheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the worksheet name. </li>
     * <li>XLSXWorksheet object representing the worksheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.activateChartsheet | XLSXWriter.activateChartsheet}
     * @example
     * writer.activateWorksheet(worksheet2);
     */
    activateWorksheet(worksheet: any): boolean;
    /**
     * **Create a new chart to be added to a worksheet/chartsheet.**
     *
     * @since DOCUMENTS 5.0e
     * @param type The type (from constant group {@link XLSXWriter.CHART_AREA | `Chart types`}) of chart to be created.
     * @returns An XLSXChart object if successful, `null` in case of any error.
     * @example
     * // Create a chart object.
     * var chart = writer.addChart(writer.CHART_COLUMN);
     * // Add data series to the chart.
     * chart.addSeries(NULL, "Worksheet2!$A$1:$A$5");
     * chart.addSeries(NULL, "Worksheet2!$B$1:$B$5");
     * chart.addSeries(NULL, "Worksheet2!$C$1:$C$5");
     * // Insert the chart into the worksheet
     * worksheet2.insertChart(6, 1, chart);
     */
    addChart(type: number): XLSXChart;
    /**
     * **Add a new chartsheet to the current Excel document.**
     *
     * **Note:** At least one worksheet should be added to a new Excel file when creating a chartsheet in order to provide data for the chart.
     * @since DOCUMENTS 5.0e
     * @param name Optional chartsheet name. If it is empty the default Excel convention will be followed, i.e. Chart1, Chart2, etc.
     * The chartsheet name must be a valid Excel chartsheet name, i.e. it must be less than 32 character and it cannot contain any of the characters: `/ \ [ ] : * ?`
     * In addition, you cannot use the same, case insensitive, `sheetname` for more than one worksheet, or chartsheet.
     * @returns An XLSXChartsheet object if successful, `null` in case of any error.
     * @example
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     * var chartsheet1 = writer.addChartsheet("Chartsheet1");
     */
    addChartsheet(name?: string): XLSXChartsheet;
    /**
     * **Create a new format object to format cells in worksheets.**
     *
     * @since DOCUMENTS 5.0e
     * @param name Unique format name.
     * @returns An XLSXFormat object if successful, `null` in case of any error.
     * @example
     * // Create the Format.
     * var format1 = writer.addFormat("format1");
     * // Set some of the format properties.
     * format1.setFontStyle("bold");
     * format1.setFontColor(writer.COLOR_RED); // see Predefined values for common colors
     * // Use the format to change the text format in a cell.
     * worksheet1.writeCell("string", 0, 0, "Hello", format1);
     */
    addFormat(name: string): XLSXWorksheet;
    /**
     * **Add a new worksheet to the current Excel document.**
     *
     * **Note:** At least one worksheet should be added to a new Excel file.
     * @since DOCUMENTS 5.0e
     * @param name Optional worksheet name. If it is empty the default Excel convention will be followed, i.e. Sheet1, Sheet2, etc.
     * The worksheet name must be a valid Excel worksheet name, i.e. it must be less than 32 character and it cannot contain any of the characters: `/ \ [ ] : * ?`
     * In addition, you cannot use the same, case insensitive, `sheetname` for more than one worksheet, or chartsheet.
     * @returns An XLSXWorksheet object if successful, `null` in case of any error.
     * @example
     * var worksheet1 = writer.addWorksheet("Worksheet1");
     */
    addWorksheet(name?: string): XLSXWorksheet;
    /**
     * **Get a chartsheet object from its name.**
     *
     * @since DOCUMENTS 5.0e
     * @param name Chartsheet name.
     * @returns An XLSXChartsheet object if successful, `null` in case of any error.
     * @example
     * var chartsheet1 = writer.getChartsheetByName("Chartsheet1");
     */
    getChartsheetByName(name: string): XLSXChartsheet;
    /**
     * **Get the file path of the created Excel file.**
     *
     * @since DOCUMENTS 5.0e
     * @returns The file path as String.
     * @example
     * util.out(writer.getFilePath());
     */
    getFilePath(): string;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since DOCUMENTS 5.0e
     * @returns Text of the last error as String
     */
    getLastError(): string;
    /**
     * **Get a worksheet object from its name.**
     *
     * @since DOCUMENTS 5.0e
     * @param name Worksheet name.
     * @returns An XLSXWorksheet object if successful, `null` in case of any error.
     * @example
     * var worksheet1 = writer.getWorksheetByName("Worksheet1");
     */
    getWorksheetByName(name: string): XLSXWorksheet;
    /**
     * **Hide the given chartsheet.**
     *
     * **Note:** A hidden chartsheet can not be activated or selected so this function is mutually exclusive with the
     * {@link XLSXWriter.activateChartsheet | XLSXWriter.activateChartsheet(chartsheet)} and
     * {@link XLSXWriter.selectChartsheet | XLSXWriter.selectChartsheet(chartsheet)} functions.
     * @since DOCUMENTS 5.0e
     * @param chartsheet The chartsheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the chartsheet name. </li>
     * <li>XLSXChartsheet object representing the chartsheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.hideWorksheet | XLSXWriter.hideWorksheet}
     * @example
     * writer.activateChartsheet(chartsheet2);
     * writer.hideChartsheet(chartsheet1);
     */
    hideChartsheet(chartsheet: any): boolean;
    /**
     * **Hide the given worksheet.**
     *
     * **Note:** A hidden worksheet can not be activated or selected so this function is mutually exclusive with the
     * {@link XLSXWriter.activateWorksheet | XLSXWriter.activateWorksheet(worksheet)} and
     * {@link XLSXWriter.selectWorksheet | XLSXWriter.selectWorksheet(worksheet)} functions. In addition,
     * since the first worksheet will default to being the active worksheet, you cannot hide the first worksheet without activating another sheet.
     * @since DOCUMENTS 5.0e
     * @param worksheet The worksheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the worksheet name. </li>
     * <li>XLSXWorksheet object representing the worksheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.hideChartsheet | XLSXWriter.hideChartsheet}
     * @example
     * writer.hideWorksheet(worksheet2);
     */
    hideWorksheet(worksheet: any): boolean;
    /**
     * **Write the Excel file to disk and free any memory allocated internally to the Excel file.**
     *
     * **Note:** After calling this function only both functions {@link XLSXWriter.getFilePath | XLSXWriter.getFilePath()} and
     * {@link XLSXWriter.getLastError | XLSXWriter.getLastError()} are available for the XLSXWriter object.
     * @since DOCUMENTS 5.0e
     * @returns `true` if successful, `false` in case of any error
     * @example
     * if (!writer.save())
     *   util.out(writer.getLastError());
     */
    save(): boolean;
    /**
     * **Set a chartsheet tab as selected.**
     *
     * This function is used to indicate that a chartsheet is selected in a multi-sheet Excel document.
     *
     * **Note:** A selected chartsheet has its tab highlighted. Selecting chartsheets is a way of grouping them together so that,
     * for example, several chartsheets could be printed in one go. A chartsheet that has been activated via the
     * {@link XLSXWriter.activateChartsheet | XLSXWriter.activateChartsheet(chartsheet)} function will also appear as selected.
     * @since DOCUMENTS 5.0e
     * @param chartsheet The chartsheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the chartsheet name. </li>
     * <li>XLSXChartsheet object representing the chartsheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.selectWorksheet | XLSXWriter.selectWorksheet}
     * @example
     * writer.selectChartsheet("Chartsheet2");
     */
    selectChartsheet(chartsheet: any): boolean;
    /**
     * **Set a worksheet tab as selected.**
     *
     * This function is used to indicate that a worksheet is selected in a multi-sheet Excel document.
     *
     * **Note:** A selected worksheet has its tab highlighted. Selecting worksheets is a way of grouping them together so that,
     * for example, several worksheets could be printed in one go. A worksheet that has been activated via the
     * {@link XLSXWriter.activateWorksheet | XLSXWriter.activateWorksheet(worksheet)} function will also appear as selected.
     * @since DOCUMENTS 5.0e
     * @param worksheet The worksheet to be updated can be specified as follows:
     * <ul>
     * <li>String containing the worksheet name. </li>
     * <li>XLSXWorksheet object representing the worksheet. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @see {@link XLSXWriter.selectChartsheet | XLSXWriter.selectChartsheet}
     * @example
     * writer.selectWorksheet(worksheet2);
     */
    selectWorksheet(worksheet: any): boolean;
    /**
     * **Set the document properties.**
     *
     * This function can be used to set the document properties of the current Excel document. These properties are visible in Excel
     * (e.g. under `File -> Information -> Properties` in Excel 2013) and are also available to external applications that read or index windows files.
     * @since DOCUMENTS 5.0e
     * @param title Title of the Excel document.
     * @param subject Optional subject of the Excel document.
     * @param author Optional author of the Excel document.
     * @param manager Optional manager field of the Excel document.
     * @param company Optional company field of the Excel document.
     * @param category Optional category of the Excel document.
     * @param keywords Optional keywords of the Excel document.
     * @param comments Optional comment of the Excel document.
     * @param status Optional status of the Excel document.
     * @param hyperlinkBase Optional hyperlink base url of the Excel document.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * writer.setProperties("This is an example spreadsheet");
     */
    setProperties(title: string, subject: string, author: string, manager: string, company: string, category: string, keywords: string, comments: string, status: string, hyperlinkBase: string): boolean;
}
/**
 * The XMLExport class allows to export DOCUMENTS elements as an XML file by scripting means.
 *
 *
 * The exported XML structure may then, for example, be used for further manipulation by an external ERP environment. The following elements can be exported:
 * <ul>
 * <li>DocFile</li>
 * <li>PortalScript </li>
 * <li>Filetype </li>
 * <li>Folder</li>
 * <li>Workflow</li>
 * <li>Distribution List </li>
 * <li>Editor (Fellow) </li>
 * <li>AccessProfile</li>
 * <li>Alias </li>
 * <li>Filing Plan </li>
 * <li>Outbar </li>
 * <li>DocumentsSettings </li>
 * <li>CustomProperties </li>
 * </ul>
 * The XML files may also be reimported into another (or the same) Portal environment by the Docimport application for DocFile objects
 * and by the XML-import of DOCUMENTS Manager for the remaining elements, respectively.
 *
 * **Since:** DOCUMENTS 4.0c available for PortalScript, Filetype, Folder, Workflow, Distribution List, Editor, AccessProfile, Alias and Filing Plan
 * **Since:** DOCUMENTS 4.0d available for Outbar
 * **Since:** DOCUMENTS 4.0e available for DocumentsSettings
 * **Since:** DOCUMENTS 5.0d available for CustomProperties
 */
declare class XMLExport {
    /**
     * **Create a new instance of the XMLExport class.**
     *
     * The constructor is neccessary to initialize the XMLExport object with some basic settings. The pathFileName parameter is mandatory,
     * the path must be an existing directory structure, and the target file should not yet exist in that directory structure.
     *
     * **Since:** ELC 3.51b / otrisPORTAL 5.1b available for DocFile
     * **Since:** DOCUMENTS 4.0c (new parameter exportDocFile)
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @example
     * var f = context.file;
     * if (f)
     * {
     *    // create a new XMLExport
     *    var xml = new XMLExport("c:\\tmp\\" + f.getAutoText("id") + ".xml");
     *    xml.addFile(f); // add the current file to the export
     *    xml.saveXML(); // perform the export operation
     *    var xmlString = xml.getXML(); // get XML as String for further use
     *    xml.clearXML(); // empty XMLExport object
     * }
     * @param pathFileName String containing full path and file name of the desired target output XML file
     * @param exportDocFile **Default:** `true`.
     * Optional boolean value:
     *
     * + `true` indicating that the created XMLExport instance is only able to export DocFile objects;
     * + `false` indicating the created XMLExport instance is able to export the following elements:
     * <ul>
     * <li>PortalScript </li>
     * <li>Filetype </li>
     * <li>Folder</li>
     * <li>Workflow</li>
     * <li>Distribution List </li>
     * <li>Editor (Fellow) </li>
     * <li>AccessProfile</li>
     * <li>Alias </li>
     * <li>Filing Plan </li>
     * <li>Outbar </li>
     * <li>DocumentsSettings </li>
     * <li>CustomProperties </li>
     * </ul>
     */
    constructor(pathFileName: string, exportDocFile?: boolean);
    /**
     * **Add the desired access profile to the XMLExport.**
     *
     * @since DOCUMENTS 4.0c
     * @param accessProfile The desired access profile to be added to the XML output and specified as follows:
     * <ul>
     * <li>String containing the technical name of the access profile </li>
     * <li>AccessProfile object </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expAccessProfile.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addAccessProfile("AccessProfile1");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addAccessProfile(accessProfile: any): boolean;
    /**
     * **Add the desired alias to the XMLExport.**
     *
     * @since DOCUMENTS 4.0c
     * @param aliasName String value containing the technical name of the alias to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var xmlExp = new XMLExport("C:\\temp\\expAlias.xml", false);
     * var success = xmlExp.addAlias("alias1");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addAlias(aliasName: string): boolean;
    /**
     * **Add the desired global custom property to the XMLExport.**
     *
     * @since DOCUMENTS 5.0d
     * @param propName The technical name of the desired global custom property to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expCustomProperty.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addCustomProperty("testProp");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addCustomProperty(propName: string): boolean;
    /**
     * **Add the desired distribution list to the XMLExport.**
     *
     * @since DOCUMENTS 4.0c
     * @param distributionListName String containing the name of the distribution list to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expDistributionList.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addDistributionList("DistributionList1");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addDistributionList(distributionListName: string): boolean;
    /**
     * **Add the DOCUMENTS settings data to the XMLExport.**
     *
     * @since DOCUMENTS 4.0e
     * @returns `true` if successful, `false` in case of any error
     */
    addDocumentsSettings(): boolean;
    /**
     * **Add the desired enumeration to the XMLExport.**
     *
     * @since DOCUMENTS 6.0
     * @param name The technical name of the desired enumeration to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expEnumeration.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addEnumeration("testEnum");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addEnumeration(name: string): boolean;
    /**
     * **Add the desired editor (fellow) to the XMLExport.**
     *
     *
     * **Since:** DOCUMENTS 4.0c HF2 (new parameter includePrivateFolders)
     * @since DOCUMENTS 4.0c
     * @param editor The editor to be added to the XML output and specified as follows:
     * <ul>
     * <li>String containing the login name of the editor. </li>
     * <li>SystemUser object representing the editor. </li>
     * </ul>
     * @param includePrivateFolders **Default:** `true`.
     * boolean value indicating whether to export the private folders of the fellow
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFellow.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFellow("editor1");
     * if (success)
     *  xmlExp.saveXML();
     * else
     *  util.out(xmlExp.getLastError());
     */
    addFellow(editor: any, includePrivateFolders?: boolean): boolean;
    /**
     * **Add the desired DocFile object to the XMLExport.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @param docFile An object of the DocFile class which should be added to the XML output
     * @param exportCondition **Default:** `true`.
     * Optional export conditions specified as follows:
     * <ul>
     * <li>boolean value indicating whether the file id should be exported as update key. </li>
     * <li>XMLExportDescription object defining serveral conditions for the exporting process of the DocFile object. </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expDocFile.xml";
     * var xmlExp = new XMLExport(path, true);
     * var success = xmlExp.addFile(context.file);
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFile(docFile: DocFile, exportCondition?: any): boolean;
    /**
     * **Add the desired file link template to the XMLExport.**
     *
     * @since DOCUMENTS 5.0h
     * @param templateName The technical name of the desired file link template to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFileLinkTemplate.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFileLinkTemplate("testTemplate");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFileLinkTemplate(templateName: string): boolean;
    /**
     * **Add the desired file type to the XMLExport.**
     *
     * The XML output is able to update the same file type (Update-XML).
     *
     * **Note:** The XML files exported in DOCUMENTS 6.0 format are incompatible with DOCUMENTS 5.0.
     *
     * **Since:** DOCUMENTS 6.0 (parameter format)
     * @since DOCUMENTS 4.0c
     * @param fileTypeName The technical name of the file type to be added to the XML output.
     * @param format **Default:** `"6.0"`.
     * Optional String value defining the desired export format. The following formats are available:
     * <ul>
     * <li>5.0 (DOCUMENTS 5.0) </li>
     * <li>6.0 (DOCUMENTS 6.0) </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFileType.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFileType("Filetype1");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFileType(fileTypeName: string, format?: string): boolean;
    /**
     * **Add all file types belonging to the specified category to the XMLExport.**
     *
     * The XML output is able to update the same file types (Update-XML).
     *
     * **Note:** The XML files exported in DOCUMENTS 6.0 format are incompatible with DOCUMENTS 5.0.
     *
     * **Since:** DOCUMENTS 5.0h (Parameter categoryName is optional)
     * **Since:** DOCUMENTS 6.0 (parameter format)
     * @since DOCUMENTS 5.0e
     * @param categoryName Optional category name of the file types to be added to the XML output. If no category name is specified,
     * then all file types that are NOT assigned to a category are exported.
     * @param format **Default:** `"6.0"`.
     * Optional String value defining the desired export format. The following formats are available:
     * <ul>
     * <li>5.0 (DOCUMENTS 5.0) </li>
     * <li>6.0 (DOCUMENTS 6.0) </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFileTypesFromCategory.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFileTypesFromCategory("ftCategory");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFileTypesFromCategory(categoryName?: string, format?: string): boolean;
    /**
     * **Add all file types belonging to the specified file type folder to the XMLExport.**
     *
     * The XML output is able to update the same file types (Update-XML).
     *
     * **Note:** The XML files exported in DOCUMENTS 6.0 format are incompatible with DOCUMENTS 5.0.
     *
     * **Since:** DOCUMENTS 6.0 (parameter format)
     * @since DOCUMENTS 5.0e
     * @param folderName The folder name of the file types to be added to the XML output.
     * @param format **Default:** `"6.0"`.
     * Optional String value defining the desired export format. The following formats are available:
     * <ul>
     * <li>5.0 (DOCUMENTS 5.0) </li>
     * <li>6.0 (DOCUMENTS 6.0) </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFileTypesFromFolder.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFileTypesFromFolder("ftFolder");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFileTypesFromFolder(folderName: string, format?: string): boolean;
    /**
     * **Add the desired filing plan to the XMLExport.**
     *
     * The XML output is able to update the same filing plan (Update-XML).
     * @since DOCUMENTS 4.0c
     * @param filingPlanName String containing the technical name of the filing plan to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expFilingPlan.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addFilingPlan("myFilingPlan");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addFilingPlan(filingPlanName: string): boolean;
    /**
     * **Add the desired Folder object to the XMLExport.**
     *
     * This function is able to add the folder structure or the files in the folder to the XMLExport.
     *
     * **Since:** DOCUMENTS 5.0e HF2 (optional parameter updateXML)
     * @since DOCUMENTS 4.0c
     * @param folder The Folder object to be added to the XML output.
     * @param exportStructure Boolean value indicating whether to export the folder structure or the files in the folder,
     * on which the current user has read rights. If you want to export the files in the folder, an XMLExport instance
     * being able to export DocFile should be used.
     * @param exportCondition The export conditions can be specified as follows:
     * <ul>
     * <li> boolean value
     *     <ul>
     *     <li>indicating whether the file id should be exported as update key in case of exporting files in the folder; </li>
     *     <li>indicating whether the subfolders should be exported in case of exporting the folder structure. </li>
     *     </ul>
     * </li>
     * <li> {@link XMLExportDescription} object defining several conditions for the exporting process of the files in the folder. </li>
     * </ul>
     * @param updateXML **Default:** `false`.
     * Optional boolean value indicating whether the XML output is able to update the same folder (Update-XML) in case of exporting the folder structure.
     *
     * **Note:** This Parameter is ignored in case of exporting the files in the folder.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var xmlExpFiles = new XMLExport("C:\\temp\\expFolderFiles.xml", true); // for exporting the files in the folder
     * var xmlExpStructure = new XMLExport("C:\\temp\\expFolderStructure.xml", false); // for exporting the folder structure
     * var it = context.getFoldersByName("myFolder", "dynamicpublic");
     * var folder = it.first();
     * if (folder)
     * {
     *   var success = xmlExpFiles.addFolder(folder, false, true); // add the files in the folder to the XML output
     *   if (success)
     *       xmlExpFiles.saveXML();
     *   success = xmlExpStructure.addFolder(folder, true, true); // add the folder structure to the XML output
     *   if (success)
     *       xmlExpStructure.saveXML();
     * }
     */
    addFolder(folder: Folder, exportStructure: boolean, exportCondition: any, updateXML?: boolean): boolean;
    /**
     * **Add the desired number range alias to the XMLExport.**
     *
     * @since DOCUMENTS 4.0d HF1
     * @param name String value containing the technical name of the number range to be added to the XML output.
     * @param withCounter **Default:** `false`.
     * boolean value indicating whether to export the actual counter value of the number range
     * @returns `true` if successful, `false` in case of any error
     */
    addNumberRange(name: string, withCounter?: boolean): boolean;
    /**
     * **Add the desired outbar to the XMLExport.**
     *
     * @since DOCUMENTS 4.0d
     * @param outbarName String value containing the technical name of the outbar to be added to the XML output.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var xmlExp = new XMLExport("C:\\temp\\expOutbar.xml", false);
     * var success = xmlExp.addOutbar("outbar1");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addOutbar(outbarName: string): boolean;
    /**
     * **Add the desired user account (not fellow) to the XMLExport.**
     *
     * @since DOCUMENTS 5.0 HF2
     * @param userAccount The user account to be added to the XML output and specified as follows:
     * <ul>
     * <li>String containing the login name of the user account. </li>
     * <li>SystemUser object representing the user account. </li>
     * </ul>
     * @param includePrivateFolders **Default:** `true`.
     * boolean value indicating whether to export the private folders of the user account
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expUserAccount.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addPartnerAccount("login1");
     * if (success)
     *  xmlExp.saveXML();
     * else
     *  util.out(xmlExp.getLastError());
     */
    addPartnerAccount(userAccount: any, includePrivateFolders?: boolean): boolean;
    /**
     * **Add all PortalScripts with the desired name pattern to the XMLExport.**
     *
     * **Note:** The XML files exported in DOCUMENTS 6.0 format are incompatible with DOCUMENTS 5.0.
     *
     * **Since:** DOCUMENTS 6.0 (default format is 6.0)
     * @since DOCUMENTS 4.0c
     * @param namePattern The name pattern of the PortalScripts to be added to the XML output.
     * @param format **Default:** `"6.0"`.
     * Optional String value defining the desired export format. The following formats are available:
     * <ul>
     * <li>5.0 (DOCUMENTS 5.0) </li>
     * <li>6.0 (DOCUMENTS 6.0) </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expPortalScript.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addPortalScript("test*", "6.0");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addPortalScript(namePattern: string, format?: string): boolean;
    /**
     * **Defines a PortalScript, that will be executed after the XML-import.**
     *
     * This method does not export the content of a PortalScript (see {@link XMLExport.addPortalScript | XMLExport.addPortalScript()}),
     * but executes a PortalScript at the end of the XML-Import of the whole xml file.
     * @since DOCUMENTS 5.0c HF1
     * @param nameScript The name of the PortalScript, that should be executed.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expPortalScript.xml";
     * var xmlExp = new XMLExport(path, false);
     * ...
     * var success = xmlExp.addPortalScriptCall("updateSolution");
     * ...
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addPortalScriptCall(nameScript: string): boolean;
    /**
     * **Add all PortalScripts belonging to the specified category to the XMLExport.**
     *
     * **Note:** The XML files exported in DOCUMENTS 6.0 format are incompatible with DOCUMENTS 5.0.
     *
     * **Since:** DOCUMENTS 5.0h (Parameter nameCategory is optional)
     * **Since:** DOCUMENTS 6.0 (default format is 6.0)
     * @since DOCUMENTS 4.0d HF1
     * @param nameCategory Optional category name of the PortalScripts to be added to the XML output. If no category name is specified,
     * then all scripts that are NOT assigned to a category are exported.
     * @param format **Default:** `"6.0"`.
     * Optional String value defining the desired export format. The following formats are available:
     * <ul>
     * <li>5.0 (DOCUMENTS 5.0) </li>
     * <li>6.0 (DOCUMENTS 6.0) </li>
     * </ul>
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expPortalScript.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addPortalScriptsFromCategory("testScripts", "6.0");
     * if (success)
     *    xmlExp.saveXML();
     * else
     *    util.out(xmlExp.getLastError());
     */
    addPortalScriptsFromCategory(nameCategory?: string, format?: string): boolean;
    /**
     * **Add the desired SystemUser (user account or fellow) to the XMLExport.**
     *
     * @since DOCUMENTS 5.0 HF2
     * @param systemUser The SystemUser to be added to the XML output and specified as follows:
     * <ul>
     * <li>String containing the login name of the SystemUser. </li>
     * <li>SystemUser object representing the user account. </li>
     * </ul>
     * @param includePrivateFolders **Default:** `true`.
     * boolean value indicating whether to export the private folders of the SystemUser
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expSystemUser.xml";
     * var xmlExp = new XMLExport(path, false);
     * var success = xmlExp.addSystemUser("login1");
     * if (success)
     *  xmlExp.saveXML();
     * else
     *  util.out(xmlExp.getLastError());
     */
    addSystemUser(systemUser: any, includePrivateFolders?: boolean): boolean;
    /**
     * **Add the desired workflow to the XMLExport.**
     *
     * @since DOCUMENTS 4.0c
     * @param workflowName String containing the technical name and optional the version number of the workflow to be added to the XML output.
     * The format of the workflowName is `technicalName`[-version]. If you don't specify the version of the workflow, the workflow with
     * the highest workflow version number will be used. If you want to add a specific version, you have to use technicalName-version e.g. "Invoice-2" as workflowName.
     * @returns `true` if successful, `false` in case of any error
     * @example
     * var path = "C:\\temp\\expWorkflow.xml";
     * var xmlExp = new XMLExport(path, false);
     * xmlExp.addWorkflow("Invoice"); // add the latest version of the workflow "Invoice"
     * xmlExp.addWorkflow("Invoice-2"); // add the version 2 of the workflow "Invoice"
     * xmlExp.saveXML();
     */
    addWorkflow(workflowName: string): boolean;
    /**
     * **Remove all references to DocFile objects from the XMLExport object.**
     *
     * After the execution of this method the XMLExport object is in the same state as right after its construction.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns `true` if successful, `false` in case of any error
     */
    clearXML(): boolean;
    /**
     * **Function to get the description of the last error that occurred.**
     *
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns Text of the last error as String
     * @see {@link DocFile.getLastError | DocFile.getLastError}
     */
    getLastError(): string;
    /**
     * **Retrieve the XML structure of the DocFile objects already added to the XMLExport.**
     *
     * The XML structure is returned as a String, so it is possible to further manipulate it
     * (e.g. with the E4X scripting extension (not discussed in this documentation) before outputting it to its final destination.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns String containing the complete XMl structure of the XMLExport
     */
    getXML(): string;
    /**
     * **Performs the final save process of the XML structure.**
     *
     * Not earlier than when executing this instruction the XML file is created in the target file path.
     * @since ELC 3.51b / otrisPORTAL 5.1b
     * @returns `true` if successful, `false` in case of any error
     */
    saveXML(): boolean;
}
/**
 * The XMLExportDescription class has been added to the DOCUMENTS PortalScripting API to improve the XML Export process of DOCUMENTS files by scripting means.
 *
 * For instance this allows to use different target archives for each file as well as to influence the archiving process by the file's contents itself.
 * The XMLExportDescription object can only be used as parameter for the method {@link XMLExport.addFile | XMLExport.addFile(XMLExportDescription)}
 */
declare class XMLExportDescription {
    /**
     * **Create a new XMLExportDescription object.**
     *
     * Like in other programming languages you create a new object with the `new` operator (refer to example below).
     *
     * **Since:** DOCUMENTS 4.0c
     * @since DOCUMENTS 4.0c
     * @see {@link XMLExport.addFile | XMLExport.addFile}
     * @example
     * var docFile = context.file;
     * if (!docFile)
     * {
     *    // error handling
     * }
     * var desc = new XMLExportDescription();
     * desc.exportFileId = true;
     * desc.exportOwner = true;
     * desc.exportLastModifiedBy = true;
     * desc.exportCreatedAt = true;
     * desc.exportLastModifiedAt = true;
     * // create a new XMLExport
     * var xml = new XMLExport("c:\\tmp\\" + docFile.getAutoText("id") + ".xml");
     * xml.addFile(docFile, desc); // add the current file to the export
     * xml.saveXML(); // perform the export operation
     */
    constructor();
    /**
     * **boolean value whether export the create timestamp of the file.**
     *
     * @since DOCUMENTS 4.0c
     */
    exportCreatedAt: boolean;
    /**
     * **boolean value whether export the id of the file.**
     *
     * @since DOCUMENTS 4.0c
     */
    exportFileId: boolean;
    /**
     * **boolean value whether export the timestamp of the last modification of the file.**
     *
     * @since DOCUMENTS 4.0c
     */
    exportLastModifiedAt: boolean;
    /**
     * **boolean value whether export the name of the last editor of the file.**
     *
     * @since DOCUMENTS 4.0c
     */
    exportLastModifiedBy: boolean;
    /**
     * **boolean value whether export the name of the owner of the file.**
     *
     * @since DOCUMENTS 4.0c
     */
    exportOwner: boolean;
}
/**
     * Namespace for the types relevant for the class {@link XMLHTTPRequest}.
     * @see {@link XMLHTTPRequest}
     */
declare namespace XMLHTTPRequest {
    /**
     * Supported event types.
     * @since DOCUMENTS 6.0.1
     * @see
     * {@link Event}
     * {@link XMLHTTPRequest.addEventListener}
     * {@link XMLHTTPRequest.removeEventListener}
     */
    type EventTypes = "receive";
    /**
     * Interface for the event.
     * @since DOCUMENTS 6.0.1
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event}
     */
    interface Event {
        /**
         * Type of the event
         */
        type: EventTypes;
    }
    /**
     * Event representing the writ event.
     * @since DOCUMENTS 6.0.1
     * @see
     * {@link XMLHTTPRequest.addEventListener}
     * {@link XMLHTTPRequest.removeEventListener}
     */
    interface ReceiveEvent extends Event {
        /**
         * Received data.
         */
        data: string;
    }
    /**
     * Callback function for the write event.
     * @since DOCUMENTS 6.0.1
     * @see {@link XMLHTTPRequest.addEventListener}
     * @see {@link XMLHTTPRequest.removeEventListener}
     */
    type ReceiveEventHandler = (event: ReceiveEvent) => void;
    /**
     * Event handler map for the supported events.
     * @since DOCUMENTS 6.0.1
     * @see
     * {@link EventTypes}
     * {@link XMLHTTPRequest.addEventListener}
     * {@link XMLHTTPRequest.removeEventListener}
     */
    interface EventHandlerMap {
        "receive": ReceiveEventHandler;
    }
}
/**
 * The XMLHTTPRequest class represents a HTTP request.
 *
 * Though the name of this class traditionally refers to XML, it can be used to transfer arbitrary strings or binary data.
 * The interface is based on the definition of the class `IXMLHTTPRequest` from MSXML. As http-library the libcurl is used.
 * To send a HTTP request the following steps are needed:
 * <ul>
 * <li>Creating an instance of this class. </li>
 * <li>Initializing the request via {@link XMLHTTPRequest.open | open()}. Possibly also adding header data by means of {@link XMLHTTPRequest.addRequestHeader | addRequestHeader()}. </li>
 * <li>Sending the request via {@link XMLHTTPRequest.send | send()}. </li>
 * <li>In case of asynchronous request checking for completion of the request operation via {@link XMLHTTPRequest.readyState}. </li>
 * <li>Evaluating the result via e.g. {@link XMLHTTPRequest.status}, {@link XMLHTTPRequest.response} and {@link XMLHTTPRequest.getAllResponseHeaders | getAllResponseHeaders()}.</li>
 * </ul>
 *
 * See <a href="../soap-dom.html">SOAP Client using DOM</a> for a detailed example using XMLHTTPRequest.
 *
 * **Note:** The XMLHTTPRequest is able to use a proxy configuration. The server searches the proxy settings in the following order (priority)
 * <ul>
 * <li>Specification in the constructor function s. <a href="./XMLHTTPRequest.html#constructor">XMLHTTPRequest(proxy, proxyPort, proxyUser, proxyPasswd)</a></li>
 * <li>Global specification in the documents.ini </li>
 * <li>On Windows systems: Internet Explorer proxy configuration for the current user </li>
 * <li>On Windows systems: Default WinHTTP proxy configuration from the registry.</li>
 * </ul>
 *
 * **Note:** If you want to be sure, that no proxy must be used, then use the constructor function <a href="./XMLHTTPRequest.html#constructor.new_XMLHTTPRequest-1">XMLHTTPRequest(useProxySetting)</a> with `useProxySetting = false`.
 *
 * **Note:** Changes to the certificate check as of version 6.0.1: The behavior has changed with regard to checking certificates when using HTTPS.
 * Previously, the certificate check had to be switched on explicitly using the {@link XMLHTTPRequest.setCAInfo | setCAInfo(cert, options)} method and the VERIFYHOST or VERIFYPEER values.
 * As of version 6.0.1, the certificate check is always activated unless it is explicitly switched off with {@link XMLHTTPRequest.setCAInfo | setCAInfo(cert, 0)}.
 */
declare class XMLHTTPRequest {
    /**
     * **Create a new XMLHTTPRequest object.**
     *
     * **Note:** On windows OS: If no proxy is specified as first parameter, the proxy settings of the Internet Explorer and and
     * the WinHTTP configuration will be checked, and a defined proxy setting will be used.
     *
     * **Since:** DOCUMENTS 4.0
     * **Since:** DOCUMENTS 5.0c (on windows OS support of system proxy configuration)
     * @since DOCUMENTS 4.0
     * @example
     * // synchron
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send();
     * util.out(xmlHttp.response);
     * @example
     * // asynchron
     * var xmlHttp = new XMLHTTPRequest();
     * var async = true;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send();
     * while(xmlHttp.status != xmlHttp.COMPLETED) {
     *    util.sleep(500);  // sleep 500 ms
     * }
     * util.out(xmlHttp.response);
     * @param proxy Optional string value specifying the hostname of the proxy server being resolvable by the nameserver. On windows OS: If this parameter
     * is not specified, the windows proxy configuration will be used. E.g. the proxy server specified in Internet Explorer is used in the <em>registry</em>.
     * @param proxyPort **Default:** `3128`.
     * Optional number of the port on which the <em>proxy</em> accepts requests.
     * @param proxyUser Optional string value specifying the desired login name for the proxy
     * @param proxyPasswd Optional string value specifying the password for logging in to the proxy
     * @see {@link XMLHTTPRequest.canProxy | XMLHTTPRequest.canProxy}
     */
    constructor(proxy?: string, proxyPort?: number, proxyUser?: string, proxyPasswd?: string);
    /**
     * **Create a new XMLHTTPRequest object with option to switch off the query mechanism for proxy settings.**
     *
     *
     * **Since:** DOCUMENTS 5.0d HF2
     * @since DOCUMENTS 4.0
     * @example
     * // synchron
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send();
     * util.out(xmlHttp.response);
     * @example
     * // asynchron
     * var xmlHttp = new XMLHTTPRequest();
     * var async = true;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send();
     * while(xmlHttp.status != xmlHttp.COMPLETED) {
     *    util.sleep(500);  // sleep 500 ms
     * }
     * util.out(xmlHttp.response);
     * @param useProxySetting **Default:** `true`.
     * Boolean value. Set to `false` to switch off the query for proxy settings.
     */
    constructor(useProxySetting?: boolean);
    /**
     * **Flag indicating whether asynchronous requests are possible on the used plattform.**
     *
     * @since DOCUMENTS 4.0
     */
    readonly canAsync: boolean;
    /**
     * **Flag indicating whether the implementation on the used plattform allows the direct specifying of a proxy server.**
     *
     * @since DOCUMENTS 4.0
     */
    readonly canProxy: boolean;
    /**
     * **The constant 4 for {@link XMLHTTPRequest.readyState}.**
     *
     * In this state the request is completed. All the data are available now.
     * @since DOCUMENTS 4.0
     */
    readonly COMPLETED: number;
    /**
     * **Optional File size indicator for sending pure sequential files.**
     *
     * When uploading files, the {@link XMLHTTPRequest.send | send()} function usually detects the file size and forwards it to lower APIs.
     * This is helpful in most cases, because old simple HTTP servers do not support the transfer mode "chunked". Web services may reject
     * uploads without an announced content-length, too.
     * However, the auto-detection will fail, if a given file is not rewindable (a named pipe, for instance). To avoid errors this property
     * should be set before sending such a special file. After the transmission the property should be either set to "-1" or deleted.
     * The value is interpreted in the following way.
     * <ul>
     * <li>Values > 0 specify a precise file size in bytes.</li>
     * <li>The value -1 has the same effect as leaving the property undefined (enable auto-detection).</li>
     * <li>The value -2 disables file size detection and enforces a chunked transfer.</li>
     * </ul>
     *
     * **Note:** This property serves as a hidden optional parameter to the {@link XMLHTTPRequest.send | send()} function. On new objects it is undefined.
     * Assigning an incorrect value >= 0 may trigger deadlocks or timeouts.
     * @since DOCUMENTS 5.0c
     * @see {@link XMLHTTPRequest.send}
     */
    FileSizeHint: number;
    /**
     * **The constant 3 for {@link XMLHTTPRequest.readyState}.**
     *
     * In this state the request is partially completed. This means that some data has been received.
     * @since DOCUMENTS 4.0
     */
    readonly INTERACTIVE: number;
    /**
     * **The constant 1 for {@link XMLHTTPRequest.readyState}.**
     *
     * In this state the object has been initialized, but not sent yet.
     * @since DOCUMENTS 4.0
     */
    readonly NOTSENT: number;
    /**
     * **The current state of the asynchronous request.**
     *
     * The following states are available:
     * <ul>
     * <li>{@link XMLHTTPRequest.UNINITIALIZED} = 0 : the method {@link XMLHTTPRequest.open | open()} has not been called. </li>
     * <li>{@link XMLHTTPRequest.NOTSENT} = 1: the object has been initialized, but not sent yet. </li>
     * <li>{@link XMLHTTPRequest.SENT} = 2 : the object has been sent. No data is available yet. </li>
     * <li>{@link XMLHTTPRequest.INTERACTIVE} = 3: the request is partially completed. This means that some data has been received. </li>
     * <li>{@link XMLHTTPRequest.COMPLETED} = 4: the request is completed. All the data are available now.</li>
     * </ul>
     * @since DOCUMENTS 4.0
     */
    readonly readyState: number;
    /**
     * **The response received from the HTTP server or `null` if no response is received.**
     *
     * **Note:** Starting with DOCUMENTS 5.0c its data type is influenced by the optional property {@link XMLHTTPRequest.responseType | responseType}. The default type is String.
     * For requests with an attached {@link XMLHTTPRequest.responseFile | responseFile} this value can be truncated after a few kBytes.
     * @since DOCUMENTS 4.0
     * @see
     * {@link XMLHTTPRequest.responseType}
     * {@link XMLHTTPRequest.responseFile}
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("POST", url, async);
     * if (xmlHttp.send(content))
     *   util.out(xmlHttp.response);
     */
    readonly response: any;
    /**
     * **An optional writable file for streaming a large response.**
     *
     * To achieve an efficient download scripts can create a writable `File` an attach it to the request.
     * The complete response will then be written into this file. The value of the `response` property,
     * however, will be truncated after the first few kBytes.
     *
     * **Note:** On new objects this property is undefined. When send() is called, the request takes exclusive ownership of the attached file.
     * The property will then be reset to null. Even in asynchronous mode {@link XMLHTTPRequest.send | send()} seems to close the file immediately.
     * In fact, {@link XMLHTTPRequest.send | send()} detaches the native file handle from the JavaScript object to ensure exclusive access.
     * Received content will be written to the file, disregarding the HTTP status.
     * @since DOCUMENTS 5.0c
     * @see
     * {@link XMLHTTPRequest.response}
     * {@link XMLHTTPRequest.responseType}
     * {@link File}
     * @example
     * var url = "http://localhost:8080/documents/img/documents/skin/black/module/dashboard/48/view.png";
     * var req = new XMLHTTPRequest;
     * req.open("GET", url);
     * var file = new File("E:\\test\\downloaded.png", "wb");
     * if(!file.ok())
     *     return "Cannot open response file for writing";
     * req.responseFile = file;
     * req.send();
     * return req.status;
     */
    responseFile: File;
    /**
     * **Preferred output format of the response property (optional).**
     *
     * By default, the object expects text responses and stores them in a String. If the application expects binary data,
     * it may request an ArrayBuffer by setting this property to "arraybuffer".
     *
     * **Note:** On new objects this property is undefined. ArrayBuffer responses are created only once after each request.
     * If a script changes the received buffer, the response property will reflect these changes until a new request starts.
     * @since DOCUMENTS 5.0c
     * @see
     * {@link XMLHTTPRequest.response}
     * {@link XMLHTTPRequest.responseFile}
     */
    responseType: string;
    /**
     * **The constant 2 for {@link XMLHTTPRequest.readyState}.**
     *
     * In this state the object has been sent. No data is available yet.
     * @since DOCUMENTS 4.0
     */
    readonly SENT: number;
    /**
     * **The HTTP status code of the request.**
     *
     * @since DOCUMENTS 4.0
     * @see {@link XMLHTTPRequest.statusText | XMLHTTPRequest.statusText}
     */
    readonly status: number;
    /**
     * **The HTTP status text of the request.**
     *
     * @since DOCUMENTS 4.0
     * @see {@link XMLHTTPRequest.status | XMLHTTPRequest.status}
     */
    readonly statusText: string;
    /**
     * **The constant 0 for {@link XMLHTTPRequest.readyState}.**
     *
     * In this state the method open() has not been called.
     * @since DOCUMENTS 4.0
     */
    readonly UNINITIALIZED: number;
    /**
     * **Constant for CA Certificate verification if using HTTPS.**
     *
     * This option activate the verification of the host.
     * @since DOCUMENTS 5.0c
     * @see {@link XMLHTTPRequest.setCAInfo | XMLHTTPRequest.setCAInfo}
     */
    readonly VERIFYHOST: number;
    /**
     * **Constant for CA Certificate verification if using HTTPS.**
     *
     * This option activate the verification of the certificate chain.
     * @since DOCUMENTS 5.0c
     * @see {@link XMLHTTPRequest.setCAInfo | XMLHTTPRequest.setCAInfo}
     */
    readonly VERIFYPEER: number;
    /**
     * **Abort an asynchronous request if it already has been sent.**
     *
     * @since DOCUMENTS 4.0
     * @returns `true` if successful, `false` in case of any error.
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = true;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("POST", url, async);
     * xmlHttp.send(content);
     * var timeout = 3000;   // milliseconds
     * var idle = 200; // 200 ms
     * var timeoutTS = (new Date()).getTime() + timeout;
     * while (httpCon.readyState != httpCon.COMPLETED) {
     *    if ((new Date()).getTime() > timeoutTS) {
     *       xmlHttp.abort();
     *       xmlHttp = null;
     *    }
     *    util.sleep(idle);
     * }
     * if (xmlHttp)
     *    util.out(xmlHttp.status);
     */
    abort(): boolean;
    /**
     * **Add a HTTP header to the request to be sent.**
     *
     * **Note:** The request must be initialized via {@link XMLHTTPRequest.open | open()} before.
     * @since DOCUMENTS 4.0
     * @param name String specifying the header name.
     * @param value String specifying the header value.
     * @returns `true` if the header was added successfully, `false` in case of any error.
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = true;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("POST", url, async);
     * xmlHttp.addRequestHeader("Content-Type", "text/xml");
     * xmlHttp.send(c);
     */
    addRequestHeader(name: string, value: string): boolean;
    /**
     * **Get all response headers as a string.**
     *
     * Each entry is in a separate line and has the form 'name:value'.
     * @since DOCUMENTS 4.0
     * @returns All response headers as a string.
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("POST", url, async);
     * if (xmlHttp.send(content))
     *   util.out(xmlHttp.getAllResponseHeaders());
     */
    getAllResponseHeaders(): string;
    /**
     * **Get the value of the specified response header.**
     *
     * @since DOCUMENTS 4.0
     * @param name String specifying the response header name.
     * @returns String with the value of the response header, an empty string in case of any error.
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("POST", url, async);
     * if (xmlHttp.send(content))
     *    util.out(xmlHttp.getResponseHeader("Content-Type"));
     */
    getResponseHeader(name: string): string;
    /**
     * **Initialize a HTTP request.**
     *
     *
     * **Since:** DOCUMENTS 5.0e (support PATCH request)
     * @since DOCUMENTS 4.0
     * @param method String specifying the used HTTP method. The following methods are available:
     * <ul>
     * <li>GET: Sending a GET request, for example, for querying a HTML file. </li>
     * <li>PUT: Sending data to the HTTP server. The data must be passed in the {@link XMLHTTPRequest.send | send()} call.
     *     The URI represents the name under which the data should be stored. Under this name, the data are then normally retrievable. </li>
     * <li>POST: Sending data to the HTTP server. The data must be passed in the {@link XMLHTTPRequest.send | send()} call. The URI represents the name of the consumer of the data. </li>
     * <li>DELETE: Sending a DELETE request. </li>
     * <li>PATCH: Sending a PATCH request, see <a href="https://tools.ietf.org/html/rfc5789">RFC 5789</a>. </li>
     * </ul>
     * @param url String containing the URL for this request.
     * @param async **Default:** `false`.
     * Optional flag indicating whether to handle the request asynchronously. In this case the operation {@link XMLHTTPRequest.send | send()} returns immediately,
     * in other word, it will not be waiting until a response is received. Asynchronous sending is only possible, when {@link XMLHTTPRequest.canAsync} returns `true`.
     * If asynchronous sending is not possible, this flag will be ignored. For an asynchronous request you can use {@link XMLHTTPRequest.readyState} to get the current state of the request.
     * @param user Optional user name must be specified only if the HTTP server requires authentication.
     * @param passwd Optional password must also be specified only if the HTTP server requires authentication.
     * @returns `true` if the request was successfully initialized, `false` in case of any error.
     * @see
     * {@link XMLHTTPRequest.send}
     * {@link XMLHTTPRequest.canAsync}
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send();
     */
    open(method: string, url: string, async?: boolean, user?: string, passwd?: string): boolean;
    /**
     * **Send the request to the HTTP server.**
     *
     * The request must be prepared via `open()` before.
     *
     * **Note:** The request must be initialized via {@link XMLHTTPRequest.open | open()} before. You can use {@link XMLHTTPRequest.readyState}
     * to get the current state of an asynchronous request. The properties {@link XMLHTTPRequest.status} and {@link XMLHTTPRequest.statusText}
     * return the status of the completed request while using {@link XMLHTTPRequest.getResponseHeader | getResponseHeader()} and {@link XMLHTTPRequest.response}
     * the actual result of the request can be retrieved. An asynchronous request can be canceled using {@link XMLHTTPRequest.abort | abort()}.
     *
     * **Note:** The type of the content parameter can be one of the following: String, ArrayBuffer, File.
     * Caution: all other types will be converted to a string! Given a conventional array, the function will only send a string like "[object Array]".
     *
     *<em> About files </em>
     * Passed files must be opened in binary read mode. If the file is not rewindable (a named pipe, for instance), the property {@link XMLHTTPRequest.FileSizeHint}
     * should be set before sending. The property is useful to supress an automatic length scan. The function implicitly closes the File object,
     * though the file may remain open for asynchronous operation. When an asynchronous request is completed, its associated files become closed outside the JavaScript environment.
     *
     *<em> About Arraybuffers </em>
     * Passing a TypedArray (UInt8Array, Int16Array etc.) instead of an ArrayBuffer is possible, but not recommended.
     * The actual implementation always sends the complete associated buffer. The result can be unexpected, if the TypedArray
     * covers only a section of a bigger buffer. This behaviour might change in future releases.
     *
     * **Since:** DOCUMENTS 5.0c (Support for sending File and ArrayBuffer)
     * @since DOCUMENTS 4.0
     * @param content Optional content to be sent; usually a String. See the remarks section about using other types.
     * @returns `true` if the request was successfully performed or initiated (for asynchronous requests), `false` in case of any error.
     * @see
     * {@link XMLHTTPRequest.open}
     * {@link FileSizeHint}
     * @example
     * var xmlHttp = new XMLHTTPRequest();
     * var async = false;
     * if (xmlHttp.canAsync)
     *    async = true;
     * var url = "http://localhost:11001/";
     * xmlHttp.open("GET", url + "?wsdl", async);
     * xmlHttp.send(null);
     * if (async) {
     *    while(xmlHttp.status != xmlHttp.COMPLETED) {
     *       util.sleep(500);  // sleep 500 ms
     *    }
     * }
     * util.out(xmlHttp.status);  // should be 200
     * @example
     * var file = new File("E:\\test\\Lighthouse.jpg", "rb");
     * if(!file || !file.ok())
     *     throw "File not found";
     * var req = new XMLHTTPRequest();
     * var url = "http://localhost:8080/myUploadServlet";
     * req.open("PUT", url, false);
     * // Uncomment the following instruction to suppress the
     * // "100-continue" communication cycle, if the target server
     * // does not support it. This might also speed up very little
     * // uploads. Otherwise better keep the default behaviour.
     * // req.addRequestHeader("Expect", " ");
     * req.addRequestHeader("Filename", "Lighthouse.jpg");
     * req.send(file);
     * util.out(req.status);
     * util.out(req.response);
     * // No need to close file here; send() already did.
     * util.out(req.status);  // should be 200
     */
    send(content?: string): boolean;
    /**
     * **Set one or more certificates to verify the peer if using HTTPS.**
     *
     * @since DOCUMENTS 5.0c
     * @param pemFile String with the path to pem-file with the servers certificates (bundle of X.509 certificates in PEM format).
     * @param options Integer with a bitmask of verification-options ({@link XMLHTTPRequest.VERIFYPEER}, {@link XMLHTTPRequest.VERIFYHOST})
     * @returns
     * @example
     * var url = "https://someserver:443/";
     * var async = false;
     * var xmlHttp = new XMLHTTPRequest();
     * // Important: method-order:
     * // 1. open()
     * // 2. setCAInfo()
     * xmlHttp.open("POST", url, async);
     * xmlHttp.setCAInfo("c:\\certs\\cabundle.pem", XMLHTTPRequest.VERIFYPEER + XMLHTTPRequest.VERIFYHOST);
     * if (xmlHttp.send(content))
     *   util.out(xmlHttp.getAllResponseHeaders());
     */
    setCAInfo(pemFile: string, options: number): void;
    /**
     * **Configure how many redirections are allowed, if the server returns a 3xx response.**
     *
     * **Note:** Since 5.0g is redirection the default behaviour of the XMLHTTPRequest;
     * @since DOCUMENTS 5.0g
     * @param count Integer with the amount of allowed redirects. -1 = unlimited, 0 = no redirects
     * @returns
     * @example
     * var url = "https://documents.testdomain.de/";
     * var async = false;
     * var xmlHttp = new XMLHTTPRequest();
     * // Important: method-order:
     * // 1. open()
     * // 2. setRedirect()
     * xmlHttp.open("GET", url, async);
     * xmlHttp.setRedirect(0);
     * if (xmlHttp.send(content))
     *   util.out(xmlHttp.getAllResponseHeaders());
     */
    setRedirect(count: number): void;
    /**
     * Adds an event handler for events triggered by XMLHTTPRequest.
     * @remarks
     * This only a partial implementation of the addEventListener
     * method:
     * <ul>
     * <li>The callbacks are not triggered concurrently. Use {@link XMLHTTPRequest.yield | yield()} to trigger to the execution.</li>
     * <li>Only the propriatary event "receive" is supported</li>
     * <li>Only a callback function as an event handler is supported</li>
     * </ul>
     * @param type Event type a listerener should be added for
     * @param handler Event handler to be added
     * @throws Invalid value for the argument, response callback could
     *   not be set or internal server error
     * @since DOCUMENTS 6.0.1
       @see
       {@link XMLHTTPRequest.Event}
     * {@link XMLHTTPRequest.removeEventListener}
     * {@link XMLHTTPRequest.yield}
     * @example
     * var url = "https://documents.testdomain.de/";
     * var async = true;
     * var xmlHttp = new XMLHTTPRequest();
     * xmlHttp.open("GET", url, async);
     *
     * // Write receiving data direct to the server log
     * xmlHttp.addEventListener("receive", (event) => util.out(event.data));
     *
     * if (!xmlHttp.send(content)) {
     *   throw new Error("Send failed!");
     * }
     * var i = 0;
     * while (xmlHttp.status != xmlHttp.COMPLETED && i < 10) {
     *   xmlHttp.yield();
     *   util.sleep(500);
     *   i++;
     * }
     */
    addEventListener<K extends keyof XMLHTTPRequest.EventHandlerMap>(type: K, handler: XMLHTTPRequest.EventHandlerMap[K]): void;
    /**
     * Removes an event handler for an event.
     * @remarks
     * This only a partial implementation of the addEventListener
     * method:
     * <ul>
     * <li>Only the propriatary event "receive" is supported</li>
     * <li>Only a callback function as an event handler is supported</li>
     * </ul>
       @see
       {@link XMLHTTPRequest.Event}
     * {@link XMLHTTPRequest.addEventListener}
     * @throws Invalid values of the arguments or internal server error
     * @since DOCUMENTS 6.0.1
     * @example
     * // ...
     * function log(event) {
     *   util.out(event.data);
     * }
     * xmlHttp.addEventListener("receive", log);
     * // ...
     * xmlHttp.removeEventListener("receive", log);
     */
    removeEventListener<K extends keyof XMLHTTPRequest.EventHandlerMap>(event: K, handler: XMLHTTPRequest.EventHandlerMap[K]): void;
    /**
     * Triggers the execution of event listeners for the received
     * data chunks so far.
     * @remarks
     * This is a workaround until the callbacks registered with
     * {@link XMLHTTPRequest.addEventListener} can be invoked concurrently.
     *
     * This function might be removed in upcoming releases, as
     * this is just temporary workaround.
     * @returns Received data chunks so far or since the last
     *   invocation of this function
     * @throws Internal server error
     * @since DOCUMENTS 6.0.1
     * @experimental
       @see
       {@link XMLHTTPRequest.Event}
     * {@link XMLHTTPRequest.addEventListener}
     */
    yield(): string[];
}
interface FileTypeMapper {
}
type DefaultingFileTypeMapper = keyof FileTypeMapper extends FileTypeMapper ? string : keyof FileTypeMapper;
type DefaultDocFileType<T extends keyof FileTypeMapper | string> = T extends keyof FileTypeMapper ? FileTypeMapper[T] : DocFile;
