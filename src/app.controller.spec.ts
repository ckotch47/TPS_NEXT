import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppController} from "./app.controller";
import { AppService} from "./app.service";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appController: AppController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appController = app.get<AppController>(AppController);
  });

  it('get all links',  async () => {
     const links = await appController.getLinkToPublish({});
     expect(links).not.toBeUndefined();
     expect(links[links.length-1].ID).not.toBeUndefined()
     expect(links[links.length-1].ID).toEqual(expect.any(Number));
     expect(links[links.length-1].LINK).not.toBeUndefined()
     expect(links[links.length-1].LINK).toEqual(expect.any(String));
  });
});
