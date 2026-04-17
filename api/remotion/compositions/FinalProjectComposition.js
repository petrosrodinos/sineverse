const React = require('react');
const {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} = require('remotion');

const getCaptionPositionStyle = (position) => {
  if (position === 'TOP_LEFT') {
    return { top: 40, left: 40, transform: 'none', textAlign: 'left' };
  }
  if (position === 'TOP_RIGHT') {
    return { top: 40, right: 40, left: 'auto', transform: 'none', textAlign: 'right' };
  }
  if (position === 'TOP_CENTER') {
    return { top: 40, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
  }
  if (position === 'BOTTOM_LEFT') {
    return { bottom: 48, left: 40, transform: 'none', textAlign: 'left' };
  }
  if (position === 'BOTTOM_RIGHT') {
    return { bottom: 48, right: 40, left: 'auto', transform: 'none', textAlign: 'right' };
  }
  return { bottom: 48, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' };
};

const getCaptionStyle = (style) => {
  if (style === 'MINIMAL_THIN') {
    return {
      color: '#ffffff',
      fontSize: 42,
      fontWeight: 500,
      letterSpacing: 0.5,
      textShadow: '0 2px 18px rgba(0,0,0,0.55)',
    };
  }
  if (style === 'BOLD_CONTRAST') {
    return {
      color: '#ffffff',
      fontSize: 44,
      fontWeight: 700,
      letterSpacing: 0.3,
      padding: '12px 18px',
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.35)',
    };
  }
  return {
    color: '#ffffff',
    fontSize: 46,
    fontWeight: 700,
    letterSpacing: 0.3,
    textShadow: '0 3px 24px rgba(0,0,0,0.7)',
  };
};

const getVideoTransform = (
  transitionType,
  frame,
  transitionDurationFrames,
  clipDurationFrames,
) => {
  const duration = Math.max(
    Math.min(transitionDurationFrames || 1, Math.floor((clipDurationFrames || 1) / 2)),
    1,
  );
  const fadeInOpacity = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOutOpacity = interpolate(
    frame,
    [Math.max(clipDurationFrames - duration, 0), clipDurationFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const baseOpacity = Math.min(fadeInOpacity, fadeOutOpacity);

  if (transitionType === 'SLIDE_LEFT') {
    const enterX = interpolate(frame, [0, duration], [60, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const exitX = interpolate(
      frame,
      [Math.max(clipDurationFrames - duration, 0), clipDurationFrames],
      [0, -60],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
    return { opacity: baseOpacity, transform: `translateX(${enterX + exitX}px)` };
  }

  if (transitionType === 'SLIDE_RIGHT') {
    const enterX = interpolate(frame, [0, duration], [-60, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const exitX = interpolate(
      frame,
      [Math.max(clipDurationFrames - duration, 0), clipDurationFrames],
      [0, 60],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
    return { opacity: baseOpacity, transform: `translateX(${enterX + exitX}px)` };
  }

  if (transitionType === 'ZOOM') {
    const enterScale = interpolate(frame, [0, duration], [1.08, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const exitScale = interpolate(
      frame,
      [Math.max(clipDurationFrames - duration, 0), clipDurationFrames],
      [1, 0.92],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
    return { opacity: baseOpacity, transform: `scale(${Math.min(enterScale, exitScale)})` };
  }

  return { opacity: baseOpacity, transform: 'translateX(0px) scale(1)' };
};

const ClipLayer = ({ clip }) => {
  const frame = useCurrentFrame();
  const transitionType = (clip.transition && clip.transition.type) || 'FADE';
  const transitionDurationFrames =
    (clip.transition && clip.transition.duration_frames) || 15;
  const videoStyle = getVideoTransform(
    transitionType,
    frame,
    transitionDurationFrames,
    clip.duration_frames,
  );

  return React.createElement(
    AbsoluteFill,
    null,
    React.createElement(OffthreadVideo, {
      src: clip.video_url,
      startFrom: clip.trim_start_frames,
      endAt: clip.trim_end_frames,
      volume: clip.volume,
      playbackRate: clip.speed,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...videoStyle,
      },
    }),
    ...(clip.captions || []).map((caption, captionIndex) =>
      React.createElement(
        Sequence,
        {
          key: `${captionIndex}-${caption.start_frame}`,
          from: caption.start_frame,
          durationInFrames: Math.max(caption.end_frame - caption.start_frame, 1),
        },
        React.createElement(
          AbsoluteFill,
          {
            style: {
              justifyContent: 'flex-end',
              pointerEvents: 'none',
            },
          },
          React.createElement(
            'div',
            {
              style: {
                position: 'absolute',
                maxWidth: '84%',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.2,
                ...getCaptionPositionStyle(caption.position),
                ...getCaptionStyle(caption.style),
              },
            },
            caption.text,
          ),
        ),
      ),
    ),
  );
};

const FinalProjectComposition = ({ clips, music }) => {
  return React.createElement(
    AbsoluteFill,
    { style: { backgroundColor: '#000000' } },
    ...clips.map((clip, i) =>
      React.createElement(
        Sequence,
        { key: i, from: clip.start_frame, durationInFrames: clip.duration_frames },
        React.createElement(ClipLayer, { clip }),
      ),
    ),
    music
      ? React.createElement(Audio, {
          src: staticFile(music.audio_filename),
          volume: music.volume,
        })
      : null,
  );
};

module.exports = { FinalProjectComposition };
