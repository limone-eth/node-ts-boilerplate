/* eslint-disable camelcase */
interface Bio {
  text: string;
  mentioned_profiles?: any[];
}

interface Profile {
  bio: Bio;
}

interface User {
  object: string;
  fid: number;
  username: string | null;
  display_name: string;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  active_status: string;
  custody_address?: string;
}

interface ParentAuthor {
  fid: null;
}

interface Url {
  url: string;
}

interface Button {
  index: number;
  title?: string;
}

interface Frame {
  version: string;
  image: string;
  buttons: Button[];
  post_url: string;
  frames_url: string;
}

interface Fid {
  fid: number;
  fname: string;
}

interface Reactions {
  likes: Fid[];
  recasts: Fid[];
}

interface Replies {
  count: number;
}

interface ViewerContext {
  liked: boolean;
  recasted: boolean;
}

interface Cast {
  object: string;
  hash: string;
  thread_hash: string;
  parent_hash: null;
  parent_url: string;
  root_parent_url: string;
  parent_author: ParentAuthor;
  author: User;
  text: string;
  timestamp: string;
  embeds: Url[];
  frames: Frame[];
  reactions: Reactions;
  replies: Replies;
  mentioned_profiles: User[];
  viewer_context: ViewerContext;
}

interface TappedButton {
  index: number;
}

interface Action {
  object: string;
  interactor: User;
  tapped_button: TappedButton;
  cast: Cast;
}

interface ValidatedFrame {
  valid: boolean;
  action: Action;
}

export const validateFrame = async (messageBytes: string): Promise<ValidatedFrame> => {
  const response = await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      api_key: 'NEYNAR_API_DOCS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message_bytes_in_hex: messageBytes,
    }),
  });
  return response.json();
};
