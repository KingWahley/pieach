function processImage(file, maxOriginalDim = 1920, maxThumbDim = 300) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/') || file.type.includes('svg')) {
      resolve({ original: file, thumbnail: null });
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      
      // 1. Process original (compress & resize if larger than maxOriginalDim)
      let origWidth = img.width;
      let origHeight = img.height;
      if (origWidth > maxOriginalDim || origHeight > maxOriginalDim) {
        if (origWidth > origHeight) {
          origHeight = Math.round((origHeight * maxOriginalDim) / origWidth);
          origWidth = maxOriginalDim;
        } else {
          origWidth = Math.round((origWidth * maxOriginalDim) / origHeight);
          origHeight = maxOriginalDim;
        }
      }
      
      const canvasOrig = document.createElement('canvas');
      canvasOrig.width = origWidth;
      canvasOrig.height = origHeight;
      const ctxOrig = canvasOrig.getContext('2d');
      ctxOrig.drawImage(img, 0, 0, origWidth, origHeight);
      
      // 2. Process thumbnail (resize to maxThumbDim)
      let thumbWidth = img.width;
      let thumbHeight = img.height;
      if (thumbWidth > maxThumbDim || thumbHeight > maxThumbDim) {
        if (thumbWidth > thumbHeight) {
          thumbHeight = Math.round((thumbHeight * maxThumbDim) / thumbWidth);
          thumbWidth = maxThumbDim;
        } else {
          thumbWidth = Math.round((thumbWidth * maxThumbDim) / thumbHeight);
          thumbHeight = maxThumbDim;
        }
      }
      
      const canvasThumb = document.createElement('canvas');
      canvasThumb.width = thumbWidth;
      canvasThumb.height = thumbHeight;
      const ctxThumb = canvasThumb.getContext('2d');
      ctxThumb.drawImage(img, 0, 0, thumbWidth, thumbHeight);
      
      // Convert both to blobs
      canvasOrig.toBlob((origBlob) => {
        canvasThumb.toBlob((thumbBlob) => {
          if (!origBlob || !thumbBlob) {
            resolve({ original: file, thumbnail: null });
            return;
          }
          // Wrap in File objects to preserve names (fallback to jpg for compression)
          const origFile = new File([origBlob], file.name.replace(/\.[^/.]+$/, "") + '.jpg', { type: 'image/jpeg' });
          const thumbFile = new File([thumbBlob], file.name.replace(/\.[^/.]+$/, "") + '_thumb.jpg', { type: 'image/jpeg' });
          resolve({ original: origFile, thumbnail: thumbFile });
        }, 'image/jpeg', 0.7);
      }, 'image/jpeg', 0.82);
    };
    img.onerror = () => {
      resolve({ original: file, thumbnail: null });
    };
  });
}

export async function uploadFile(file, bucket = 'media', folder = '', onProgress = null) {
  let originalFile = file;
  let thumbnailFile = null;

  if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
    try {
      const processed = await processImage(file);
      originalFile = processed.original;
      thumbnailFile = processed.thumbnail;
    } catch (e) {
      console.error('Error compressing image on client side, falling back to original:', e);
    }
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.url);
        } catch (e) {
          reject(new Error('Invalid JSON response from upload server'));
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          reject(new Error(errData.error || 'Upload failed'));
        } catch (e) {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });

    xhr.open('POST', '/api/upload');
    
    const formData = new FormData();
    formData.append('file', originalFile);
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    formData.append('bucket', bucket);
    if (folder) {
      formData.append('folder', folder);
    }
    
    xhr.send(formData);
  });
}
