import fs from 'fs'
import path from 'path'

const destinationFolder = './uploads/profile_images'; // default upload destination 


export async function saveImageToFile(file) {
  try {
    const { createReadStream, filename } = await file;

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    console.log(currentTimeInSeconds);
    let new_filename = currentTimeInSeconds+"_"+filename;
    
    const outPath = path.join(destinationFolder, new_filename);
    
    const outStream = fs.createWriteStream(outPath);
    
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(outStream)
        .on('error', error => {
          reject(error);
        })
        .on('finish', () => {
          resolve({ filename: new_filename, success:true});
        });
    });
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}