import { useState } from 'react';
import { parseTorrentRSS } from '../utils/xmlParser';

export const useTorrentSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTorrents = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    const encodedQuery = encodeURIComponent(query);
    const targetUrl = `https://bt4gprx.com/search?q=${encodedQuery}&page=rss`;
    
    // Try direct fetch first
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const text = await response.text();
      const parsedResults = parseTorrentRSS(text);
      setResults(parsedResults);
    } catch (directError) {
      console.warn('Direct fetch failed, trying proxy...', directError);
      
      // Fallback to allorigins proxy
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        if (data.contents) {
            const parsedResults = parseTorrentRSS(data.contents);
            setResults(parsedResults);
        } else {
            throw new Error('Proxy returned no content');
        }
      } catch (proxyError) {
        console.error('Proxy fetch failed:', proxyError);
        setError('Failed to fetch results. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchTorrents };
};
