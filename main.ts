import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, 'entry.png');
const buf = fs.readFileSync(inputPath);

if (buf.length > 1048576) {
  throw new Error('File size exceeds 1048576 bytes');
}

let format = '';
let width = 0;
let height = 0;

const isPng =
  buf.length >= 8 &&
  buf[0] === 0x89 &&
  buf[1] === 0x50 &&
  buf[2] === 0x4E &&
  buf[3] === 0x47 &&
  buf[4] === 0x0D &&
  buf[5] === 0x0A &&
  buf[6] === 0x1A &&
  buf[7] === 0x0A;

const isJpeg =
  buf.length >= 3 &&
  buf[0] === 0xFF &&
  buf[1] === 0xD8 &&
  buf[2] === 0xFF;

if (isPng) {
  format = 'PNG';
  if (buf.length < 24) {
    throw new Error('PNG file is shorter than 24 bytes');
  }
  if (
    buf[12] !== 0x49 ||
    buf[13] !== 0x48 ||
    buf[14] !== 0x44 ||
    buf[15] !== 0x52
  ) {
    throw new Error('PNG bytes 12 to 15 do not spell IHDR');
  }
  width = buf.readUInt32BE(16);
  height = buf.readUInt32BE(20);
} else if (isJpeg) {
  format = 'JPEG';
  if (buf.length < 2 || buf[buf.length - 2] !== 0xFF || buf[buf.length - 1] !== 0xD9) {
    throw new Error('JPEG file does not end with FF D9');
  }

  let pos = 2;
  let foundFrame = false;

  while (pos < buf.length) {
    while (pos < buf.length && buf[pos] === 0xFF && pos + 1 < buf.length && buf[pos + 1] === 0xFF) {
      pos++;
    }
    if (pos >= buf.length) {
      throw new Error('Unexpected end of file while scanning JPEG markers');
    }
    const markerPos = pos;
    const code = buf[pos + 1];
    pos += 2;

    if (code === 0xD8 || code === 0xD9 || code === 0x01 || (code >= 0xD0 && code <= 0xD9)) {
      continue;
    }

    if (pos + 2 > buf.length) {
      throw new Error('Unexpected end of file reading segment length');
    }
    const segLen = buf.readUInt16BE(pos);
    if (segLen < 2) {
      throw new Error('Invalid segment length: ' + segLen);
    }
    if (pos + segLen > buf.length) {
      throw new Error('Segment runs past the end of the file');
    }

    if (code >= 0xC0 && code <= 0xCF && code !== 0xC4 && code !== 0xC8 && code !== 0xCC) {
      if (segLen < 9) {
        throw new Error('Frame segment length below 9: ' + segLen);
      }
      height = buf.readUInt16BE(markerPos + 5);
      width = buf.readUInt16BE(markerPos + 7);
      foundFrame = true;
      break;
    }

    pos += segLen;
  }

  if (!foundFrame) {
    throw new Error('No JPEG frame marker found');
  }
} else {
  throw new Error('Unknown image format');
}

if (width === 0 || height === 0) {
  throw new Error('Image width or height cannot be zero: ' + width + 'x' + height);
}

if (width > 1024 || height > 1024) {
  throw new Error('Dimensions exceed 1024: ' + width + 'x' + height);
}

console.log('Format: ' + format + ', Size: ' + buf.length + ' bytes, Dimensions: ' + width + 'x' + height);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const outFilePath = join(outDir, 'entry.png');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFilePath, buf);

console.log('Successfully copied ' + format + ' image to ' + outFilePath + ' (Dimensions: ' + width + 'x' + height + ', Size: ' + buf.length + ' bytes)');

