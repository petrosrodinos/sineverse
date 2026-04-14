import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreditsService } from './credits.service';

@ApiTags('Credits')
@Controller('credits/webhooks')
export class CreditsWebhooksController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post('stripe')
  @ApiOperation({ summary: 'Handle Stripe webhook for credits purchases' })
  handleStripeWebhook(
    @Body() body: any,
    @Headers('stripe-signature') signature?: string,
  ) {
    return this.creditsService.handleStripeWebhook(body, signature);
  }
}
