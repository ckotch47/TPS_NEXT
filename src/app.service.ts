import { Injectable } from '@nestjs/common';
import { Link } from './link/link.entity';
import { BaseEntity } from 'typeorm';


@Injectable()
export class AppService {
  async upadete_to_publish(body: any) {
    try {
      const my_id = body.id;
      const my_publish = body.topublish;
      let links = await Link.findOne(my_id);
      links.TOPUBLISH = my_publish;
      await Link.save(links);
      return links;
    } catch (e) {
      return e;
    }
  };

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
  };

  async add_link(body: any){
    body.links = body.links.replace('-mobile','');
    const temp = await Link.find({where: {LINK: body.links}});
    if(!temp[0]){
      const link = new Link(body.links,0,0);
      await link.save();
      return link;
    }
    else
      return {'msg':'link entity'};
  };

  async upadete_to_arc(body: any){
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
  };
  async delete_by_id(body: any){
    try {
      return await Link.delete(body.id);
    }
    catch (e){
      return e;
    }
  };
}
