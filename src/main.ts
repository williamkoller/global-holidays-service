import 'dotenv/config'
import * as rateLimit from 'express-rate-limit'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
    }),
  )

  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
