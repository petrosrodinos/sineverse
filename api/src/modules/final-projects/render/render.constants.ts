export const FINAL_RENDER_QUEUE = 'final-render';

export const FINAL_RENDER_JOB = 'render-final-project';

export const FinalProjectRenderStatus = {
  IDLE: 'IDLE',
  RENDERING: 'RENDERING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type FinalProjectRenderStatusType =
  (typeof FinalProjectRenderStatus)[keyof typeof FinalProjectRenderStatus];
