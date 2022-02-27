import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Link} from "./link/link.entity";
import {BaseEntity} from "typeorm";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/linklist')
  async getLinkToPublish(): Promise<Link[]> {
    return await Link.find({where:{PUBLISHED:0}});
  }

  @Get('/linklist/all')
  async getAllLink(): Promise<Link[]>{
    return await Link.find();
  }

  @Get('/linklist/publish')
  async getLinkToPublished(): Promise<BaseEntity | undefined>{
    return await this.appService.getLinkToPublished()
  }

  @Post('/addlink')
  async addLink(@Body() body: any){
    return await this.appService.add_link(body);
  }

  @Post('/updatetopublish')
  async upadete_to_publish(@Body() body: any){
    return await this.appService.upadete_to_publish(body);
  }


  @Post('/updatetoarc')
  async updateArc(@Body() body: any){
    return await this.appService.upadete_to_arc(body);
  }


  @Post('/deletebyid')
  async deletebyId(@Body() body: any){
    return await this.appService.delete_by_id(body);
  }
}
