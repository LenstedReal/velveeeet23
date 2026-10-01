'use client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CHANNEL = 'grok-preview-bridge';
const VERSION = 1;
const ROUTES = [
  '/', '/girls', '/anime', '/guys', '/my-ai', '/gallery',
  '/generate', '/generate-image', '/roleplay', '/roulette', '/live-action',
  '/terms', '/privacy', '/age-policy',
];

export default function PreviewHostBridge() {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === 'undefined' || window.parent === window) return undefined;
    let parentOrigin = '*';
    try {
      if (document.referrer) parentOrigin = new URL(document.referrer).origin;
    } catch (_) { /* ignore */ }
    const post = (message) => {
      try { window.parent.postMessage(message, parentOrigin); } catch (_) { /* ignore */ }
    };
    const reportLocation = () => {
      post({
        channel: CHANNEL, version: VERSION, type: 'location',
        path: window.location.pathname || '/',
        search: window.location.search, hash: window.location.hash,
      });
    };
    const announce = () => {
      reportLocation();
      post({ channel: CHANNEL, version: VERSION, type: 'routes', paths: ROUTES });
      post({ channel: CHANNEL, version: VERSION, type: 'ready' });
    };
    const onMessage = (event) => {
      const data = event.data;
      if (!data || data.channel !== CHANNEL) return;
      if (data.type === 'hello') { announce(); return; }
      if (data.type === 'navigate' && typeof data.path === 'string' && data.path.startsWith('/') && !data.path.startsWith('//')) {
        navigate(data.path);
        queueMicrotask(reportLocation);
        return;
      }
      if (data.type === 'history' && (data.delta === -1 || data.delta === 1)) {
        window.history.go(data.delta);
      }
    };
    window.addEventListener('message', onMessage);
    announce();
    return () => window.removeEventListener('message', onMessage);
  }, [navigate]);
  return null;
}
