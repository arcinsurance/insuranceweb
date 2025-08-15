import React, { useState, useMemo } from 'react';

type SmartAvatarProps = {
  name: string;
  candidates?: string[]; // list of image URLs (local or remote) to try in order
  size?: number; // px
  className?: string;
};

/**
 * SmartAvatar tries a list of candidate image URLs in order.
 * If all fail, it falls back to ui-avatars.com with the agent's initials.
 * Place local photos in /public/agents/{NPN}.jpg or .png
 */
export default function SmartAvatar({ name, candidates = [], size = 112, className = '' }: SmartAvatarProps) {
  const [index, setIndex] = useState(0);
  const initialsUrl = useMemo(() => {
    const base = 'https://ui-avatars.com/api/';
    const qs = new URLSearchParams({
      name,
      background: 'EBF4FF',
      color: '2563EB',
      bold: 'true'
    }).toString();
    return `${base}?${qs}`;
  }, [name]);

  const sources = useMemo(() => {
    // De-dupe empty/undefined and ensure strings
    const list = candidates.filter((u): u is string => !!u && typeof u === 'string');
    // Always add ui-avatars last as a safe fallback
    list.push(initialsUrl);
    return list;
  }, [candidates, initialsUrl]);

  const src = sources[Math.min(index, sources.length - 1)];

  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIndex((i) => Math.min(i + 1, sources.length - 1))}
      className={`rounded-full object-cover ring-4 ring-blue-100 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}