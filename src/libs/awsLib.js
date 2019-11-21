export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

// Praveen: TODO
//   const stored = await Storage.vault.put(filename, file, {
//     contentType: file.type
//   });

//   return stored.key;
return;
}