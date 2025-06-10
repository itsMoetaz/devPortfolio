// Image Compression and Optimization Module
// ES module version
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { promisify } from 'util';

// ES modules don't have __dirname, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify fs methods
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

// Settings for image optimization
const QUALITY = 80; // JPEG/WebP quality (0-100)
const WIDTH_LARGE = 1920; // Max width for large images
const WIDTH_MEDIUM = 1280; // Max width for medium images
const WIDTH_SMALL = 640; // Max width for thumbnails
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// Make sure the output directory exists
const ensureDirectoryExists = async (directory) => {
  try {
    await mkdir(directory, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
};

// Process a single image
const processImage = async (inputPath, outputDir, filename, width) => {
  const outputPath = path.join(outputDir, filename);
  
  // Skip if output file already exists and is newer than input
  if (fs.existsSync(outputPath)) {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    
    if (outputStat.mtime > inputStat.mtime) {
      console.log(`Skipping ${filename} - already optimized`);
      return;
    }
  }

  console.log(`Optimizing: ${filename} to width: ${width}px`);
  
  try {
    // Process with sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Only resize if the image is larger than target width
    const pipeline = metadata.width > width ? image.resize(width) : image;
    
    // Convert based on original format
    const ext = path.extname(filename).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: QUALITY })
        .toFile(outputPath);
    } 
    else if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, palette: true })
        .toFile(outputPath);
    }
    // Also create WebP version for better performance
    const webpOutputPath = outputPath.replace(/\.[^.]+$/, '.webp');
    await pipeline.webp({ quality: QUALITY })
      .toFile(webpOutputPath);
      
    console.log(`✓ Optimized: ${filename}`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
};

// Process all images in a directory
const processDirectory = async (inputDir, outputDir) => {
  await ensureDirectoryExists(outputDir);
  
  // Find all image files
  const files = await new Promise((resolve, reject) => {
    glob(`${inputDir}/**/*+(${SUPPORTED_FORMATS.join('|')})`, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
  
  console.log(`Found ${files.length} images to process`);
  
  // Process each file
  for (const file of files) {
    const filename = path.basename(file);
    const relativePath = path.relative(inputDir, path.dirname(file));
    const outputSubDir = path.join(outputDir, relativePath);
    
    await ensureDirectoryExists(outputSubDir);
    
    // Generate different sizes
    await processImage(file, outputSubDir, `large-${filename}`, WIDTH_LARGE);
    await processImage(file, outputSubDir, `medium-${filename}`, WIDTH_MEDIUM);
    await processImage(file, outputSubDir, `small-${filename}`, WIDTH_SMALL);
  }
  
  console.log('Image optimization complete!');
};

// Run the optimization
const run = async () => {
  try {
    // Optimize public images
    await processDirectory('public', 'public/optimized');
    
    // Optimize src/assets images
    await processDirectory('src/assets', 'src/assets/optimized');
    
    console.log('All images have been optimized!');
  } catch (err) {
    console.error('Error during image optimization:', err);
    process.exit(1);
  }
};

run();
