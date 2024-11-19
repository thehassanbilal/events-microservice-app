import { Body, Controller, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('')
  createEventEvent(@Body() payload: any) {
    return this.gatewayService.createEventEvent(payload);
  }
}
