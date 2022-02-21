import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {Link} from "./link/link.entity";
import {BaseEntity} from "typeorm";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/linklist')
  async getLinkToPublish(): Promise<Link[]> {
    return Link.find({where:{PUBLISHED:0}});
  }

  @Get('/linklist/all')
  async getAllLink(): Promise<Link[]>{
    return Link.find();
  }

  @Get('/linklist/publish')
  async getLinkToPublished(): Promise<BaseEntity | undefined>{
    try {
      return  Link.getRepository()
                  .createQueryBuilder('link')
                  .where('link.TOPUBLISH = 1 AND link.PUBLISHED = 0')
                  .getOne();
    }
    catch (e){
     return e;
    }
  }

  @Post('/addlink')
  async add_link(@Body() body: any){
    body.links = body.links.replace('-mobile','');
    const temp = await Link.find({where: {LINK: body.links}});
    if(!temp[0]){
      const link = new Link(body.links,0,0);
      await link.save();
      return Link.find();
    }
    else
      return {'msg':'link entity'};
  }

  @Post('/updatetopublish')
  async upadete_to_publish(@Body() body: any){
    try {
      const my_id = body.id;
      const my_publish = body.topublish;
      let links = await Link.findOne(my_id);
      links.TOPUBLISH = my_publish;
      await Link.save(links);
      return links;
    }
    catch (e){
      return e;
    }
  }


  @Post('/updatetoarc')
  async upadete_to_arc(@Body() body: any){
    try {
      const my_id = body.id;
      const my_published = 1;
      let links = await Link.findOne(my_id);
      links.PUBLISHED = my_published;
      await Link.save(links);
      return links;
    }
    catch (e){
      return e;
    }
  }


  @Post('/deletebyid')
  async delete_by_id(@Body() body: any){
    try {
      return await Link.delete(body.id);
    }
    catch (e){
      return e;
    }
  }
}
