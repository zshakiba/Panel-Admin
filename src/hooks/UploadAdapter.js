// components/UploadAdapter.js

class UploadAdapter {
  constructor(loader) {
     this.loader = loader;
  }
 
  upload() {
     return this.loader.file
       .then(file => new Promise((resolve, reject) => {
         // Here you should send the file to your server and get the URL of the uploaded file.
         // For demonstration purposes, we'll just log the file and resolve with a dummy URL.
         console.log('Uploading file:', file);
         // Replace this with your actual server upload logic.
         const dummyUrl = 'https://backend.toppteamm.ir/graphql/';
         resolve({ default: dummyUrl });
       }));
  }
 
  abort() {
     // Implement abort logic if needed.
  }
 }
 
 export default UploadAdapter;
 