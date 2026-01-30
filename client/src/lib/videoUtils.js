/**
 * Video URL Utilities
 * Handles normalization and validation of video URLs from various platforms
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - URLs with additional parameters (timestamps, playlists, etc.)
 */
export function extractYouTubeId(url) {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Pattern 1: youtu.be/VIDEO_ID
  const shortPattern = /(?:youtu\.be\/)([\w-]{11})/;
  const shortMatch = url.match(shortPattern);
  if (shortMatch) return shortMatch[1];

  // Pattern 2: youtube.com/watch?v=VIDEO_ID
  const watchPattern = /(?:youtube\.com\/watch\?v=)([\w-]{11})/;
  const watchMatch = url.match(watchPattern);
  if (watchMatch) return watchMatch[1];

  // Pattern 3: youtube.com/embed/VIDEO_ID
  const embedPattern = /(?:youtube\.com\/embed\/)([\w-]{11})/;
  const embedMatch = url.match(embedPattern);
  if (embedMatch) return embedMatch[1];

  // Pattern 4: youtube.com/v/VIDEO_ID
  const vPattern = /(?:youtube\.com\/v\/)([\w-]{11})/;
  const vMatch = url.match(vPattern);
  if (vMatch) return vMatch[1];

  return null;
}

/**
 * Checks if a URL is a YouTube URL
 */
export function isYouTubeUrl(url) {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

/**
 * Checks if a URL is a Vimeo URL
 */
export function isVimeoUrl(url) {
  if (!url) return false;
  return /vimeo\.com/.test(url);
}

/**
 * Normalizes a video URL to ensure compatibility with ReactPlayer
 * - Converts YouTube URLs to standard watch format
 * - Preserves other platform URLs as-is
 * - Returns null for invalid URLs
 */
export function normalizeVideoUrl(url) {
  if (!url || typeof url !== 'string') return null;

  url = url.trim();
  if (!url) return null;

  // If it's a YouTube URL, normalize it
  if (isYouTubeUrl(url)) {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      // Return standard YouTube watch URL (ReactPlayer handles this best)
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    // If we couldn't extract ID, return original URL and let ReactPlayer try
    return url;
  }

  // For all other URLs (Vimeo, direct links, etc.), return as-is
  return url;
}

/**
 * Validates if a URL is likely a valid video URL
 * This is a basic check - ReactPlayer will do the final validation
 */
export function isValidVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;

  url = url.trim();
  if (!url) return false;

  // Check for common video platforms
  if (isYouTubeUrl(url)) {
    return extractYouTubeId(url) !== null;
  }

  if (isVimeoUrl(url)) {
    return /vimeo\.com\/\d+/.test(url);
  }

  // Check for direct video file URLs
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return true;
  }

  // Check for other streaming platforms
  if (/(?:dailymotion\.com|twitch\.tv|soundcloud\.com)/.test(url)) {
    return true;
  }

  // If it starts with http/https, assume it might be valid
  // ReactPlayer will handle the final validation
  return /^https?:\/\/.+/.test(url);
}

/**
 * Gets a user-friendly platform name from a video URL
 */
export function getVideoPlatform(url) {
  if (!url) return 'Unknown';
  
  if (isYouTubeUrl(url)) return 'YouTube';
  if (isVimeoUrl(url)) return 'Vimeo';
  if (/dailymotion\.com/.test(url)) return 'Dailymotion';
  if (/twitch\.tv/.test(url)) return 'Twitch';
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return 'Direct Video';
  
  return 'Video';
}
