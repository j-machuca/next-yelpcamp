export function docToString(doc) {
    const document = doc.toObject();
    document._id = document._id.toString();
    return document;
}
