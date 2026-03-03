import { Logger } from '@nestjs/common';
import { VideoStatus } from '@/generated/prisma';

export const logVideoGenerationStatus = (logger: Logger, sceneVideoUuid: string, status: VideoStatus, message?: string) => {
    const logMsg = `SceneVideo ${sceneVideoUuid} status updated to ${status}${message ? `: ${message}` : ''}`;

    if (status === VideoStatus.FAILED) {
        logger.error(logMsg);
    } else {
        logger.log(logMsg);
    }
};

export const formatProviderJobId = (provider: string, externalId: string): string => {
    return `${provider.toLowerCase()}_${externalId}`;
};
