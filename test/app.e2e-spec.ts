import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import supertest from 'supertest';



describe('AppController (e2e)',  () => {
  let app: INestApplication;
  let myApp: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    myApp = request(app.getHttpServer());
    await app.init();
  })

  afterAll( () => {
     app.close();
  });

  it('/linklis (GET)', async () => {
    let temp = await myApp.get('/linklist');
    expect(temp).not.toBeUndefined();
    expect(temp.body.length).not.toBe(0);
    expect(temp.body).toEqual(expect.any(Object));
    expect(temp.statusCode).toBe(200);

  });

  it('/addlink ', async () =>{
    let temp = await myApp.post('/addlink').send({'links':'1234-mobile.mp4'});
    expect(temp.body.LINK).toEqual(expect.any(String));
    temp = await myApp.post('/deletebyid').send({'id':temp.body.ID});
    console.log(temp);
  });
});
