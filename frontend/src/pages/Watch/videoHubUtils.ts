import { formatTimeAgo, resolveMediaUrl } from '../../utils/helpers';

export interface VideoHubItem {
  id: string;
  source: 'youtube' | 'mindbook';
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  creator: string;
  creatorAvatar: string;
  creatorId?: string;
  isVerified?: boolean;
  views: number;
  duration: string;
  relativeTime: string;
  watchProgress?: number;
  isLive?: boolean;
  postId?: string;
}

const DEFAULT_THUMB =
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=640&h=360&q=80';

export function postToVideoHubItem(post: any): VideoHubItem {
  const titleLine = (post.content || 'Untitled video').split('\n')[0].trim();
  const descLines = (post.content || '').split('\n').slice(1).join('\n').trim();

  return {
    id: `mb_${post._id}`,
    postId: post._id,
    source: 'mindbook',
    title: titleLine.slice(0, 100) || 'MindBook Video',
    description: descLines || titleLine,
    thumbnailUrl: post.image ? resolveMediaUrl(post.image) : DEFAULT_THUMB,
    videoUrl: resolveMediaUrl(post.video),
    creator: post.user?.name || 'MindBook Creator',
    creatorAvatar: resolveMediaUrl(post.user?.profilePicture) || DEFAULT_THUMB,
    creatorId: post.user?._id,
    isVerified: false,
    views: Math.max((post.reactions?.length || 0) * 12 + 50, 1),
    duration: 'Video',
    relativeTime: formatTimeAgo(post.createdAt) || 'Recently',
  };
}

export const YOUTUBE_CURATED: VideoHubItem[] = [
  {
    id: 'yt_1',
    source: 'youtube',
    title: 'Building Next.js 15 Apps with Tailwind & TypeScript',
    description: 'Server actions, route transitions, and animations for professional developers.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=640&h=360&q=80',
    youtubeId: 'Ke90Tje7VS0',
    creator: 'NextJS Insiders',
    creatorAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
    isVerified: true,
    views: 85200,
    duration: '14:25',
    relativeTime: '2 hours ago',
    watchProgress: 60,
  },
  {
    id: 'yt_live',
    source: 'youtube',
    title: 'Lofi Hip Hop Radio — Beats to Study/Relax',
    description: 'Chilled lofi beats streaming live. Perfect for coding and design.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&h=360&q=80',
    youtubeId: 'jfKfPfyJRdk',
    creator: 'Lofi Chill Room',
    creatorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    views: 245000,
    duration: 'LIVE',
    relativeTime: 'Live',
    isLive: true,
  },
  {
    id: 'yt_2',
    source: 'youtube',
    title: 'TypeScript 5.8: New Features You Must Know',
    description: 'Return type inference and strict compilation in the latest TypeScript release.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=640&h=360&q=80',
    youtubeId: '5lC6A9_o9qI',
    creator: 'TS Experts Academy',
    creatorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    isVerified: true,
    views: 45000,
    duration: '08:52',
    relativeTime: '1 week ago',
  },
];
