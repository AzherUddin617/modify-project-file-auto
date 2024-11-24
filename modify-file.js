const fs = require("fs");
const path = require("path");

// Function to recursively find all index.tsx files in the given directory
function findFiles(directory, files = []) {
	const items = fs.readdirSync(directory);

	for (const item of items) {
		const fullPath = path.join(directory, item);

		if (fs.statSync(fullPath).isDirectory()) {
			findFiles(fullPath, files);
		} else if (item === "index.tsx") {
			files.push(fullPath);
		}
	}

	return files;
}

// Function to modify the file contents
function modifyFile(filePath) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const modifiedContent = fileContent.replace(
		/className=\{classes\.HeaderBottom\}/g,
		"className={`${classes.HeaderBottom} header-bottom`}" // Add your changes here
	);

	if (fileContent !== modifiedContent) {
		fs.writeFileSync(filePath, modifiedContent, "utf8");
		console.log(`Modified: ${filePath}`);
	} else {
		console.log(`No changes needed: ${filePath}`);
	}
}

// Main script
const headersDir = path.resolve(__dirname, ""); // Set your root directory here if needed
const headerFiles = findFiles(headersDir);

console.log(`Found ${headerFiles.length} header files.`);

headerFiles.forEach((filePath) => {
	try {
		modifyFile(filePath);
	} catch (error) {
		console.error(`Failed to modify ${filePath}:`, error);
	}
});

console.log("Script completed.");
