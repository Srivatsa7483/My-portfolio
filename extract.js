const fs = require('fs');

try {
  const content = fs.readFileSync('C:\\Users\\sriva\\.gemini\\antigravity-ide\\brain\\90e39a3a-0140-4949-8988-d676dd18e666\\.system_generated\\steps\\324\\content.md', 'utf8');
  
  // Search for codeString inside the minified nextjs page JSON data
  const searchKey = '"code":';
  const startIdx = content.indexOf(searchKey);
  if (startIdx !== -1) {
    console.log("Found code key at:", startIdx);
    
    // Let's find the closing quote of the code string
    // The code is usually in JSON format: "code":"...compiled string..."
    const codeStart = content.indexOf('"', startIdx + searchKey.length);
    if (codeStart !== -1) {
      let codeEnd = codeStart + 1;
      let escaped = false;
      while (codeEnd < content.length) {
        const char = content[codeEnd];
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === '"') {
          break; // Found matching quote
        }
        codeEnd++;
      }
      
      const rawCode = content.substring(codeStart + 1, codeEnd);
      // Clean up JSON escaping
      const cleanCode = JSON.parse('"' + rawCode + '"');
      fs.writeFileSync('extracted_code.txt', cleanCode);
      console.log("Successfully extracted code to extracted_code.txt! Length:", cleanCode.length);
    } else {
      console.log("Could not find start quote");
    }
  } else {
    console.log("Could not find 'code' key");
  }
} catch (e) {
  console.error("Error:", e);
}
