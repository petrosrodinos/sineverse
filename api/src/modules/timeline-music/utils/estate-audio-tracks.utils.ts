export const ESTATE_AUDIO_TRACKS = [
  { id: 'soft_ambient', filename: 'soft-ambient.mp3', mimetype: 'audio/mpeg' },
  { id: 'minimal_piano', filename: 'minimal-piano.mp3', mimetype: 'audio/mpeg' },
  { id: 'light_upbeat', filename: 'light-upbeat.mp3', mimetype: 'audio/mpeg' },
  { id: 'cinematic_pad', filename: 'cinematic-pad.mp3', mimetype: 'audio/mpeg' },
  { id: 'nostalgic_soft', filename: 'nostalgic-soft.mp3', mimetype: 'audio/mpeg' },
] as const;

export type EstateAudioTrackId = (typeof ESTATE_AUDIO_TRACKS)[number]['id'];

export type EstateAudioTrack = (typeof ESTATE_AUDIO_TRACKS)[number];

export function getEstateAudioTrackById(trackId: string): EstateAudioTrack | null {
  return ESTATE_AUDIO_TRACKS.find((track) => track.id === trackId) ?? null;
}

export function getEstateAudioTrackUrl(track: EstateAudioTrack): string {
  return `/assets/estate-audios/${track.filename}`;
}
