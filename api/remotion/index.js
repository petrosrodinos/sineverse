const React = require('react');
const { Composition, registerRoot } = require('remotion');
const { FinalProjectComposition } = require('./compositions/FinalProjectComposition');

const COMPOSITION_ID = 'FinalProject';
const COMPOSITION_FPS = 30;
const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 720;

const RemotionRoot = () => {
  return React.createElement(Composition, {
    id: COMPOSITION_ID,
    component: FinalProjectComposition,
    durationInFrames: 300,
    fps: COMPOSITION_FPS,
    width: COMPOSITION_WIDTH,
    height: COMPOSITION_HEIGHT,
    defaultProps: { clips: [], music: null },
    calculateMetadata: ({ props }) => {
      const total = (props.clips || []).reduce((sum, clip) => sum + clip.duration_frames, 0);
      return { durationInFrames: Math.max(total, 1) };
    },
  });
};

registerRoot(RemotionRoot);
