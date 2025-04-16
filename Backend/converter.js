const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

async function convertWordToPdf(inputPath, outputPath) {
  try {
    // Using LibreOffice for conversion
    const command = `soffice --headless --convert-to pdf "${inputPath}" --outdir "${outputPath.substring(0, outputPath.lastIndexOf('/'))}"`; 
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Conversion stderr:', stderr);
    }
    
    console.log('Conversion stdout:', stdout);
    return true;
  } catch (error) {
    console.error('Error during conversion:', error);
    throw new Error('Failed to convert file: ' + error.message);
  }
}

module.exports = {
  convertWordToPdf
}; 