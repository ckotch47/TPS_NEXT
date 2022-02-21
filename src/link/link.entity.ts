import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique} from 'typeorm';

@Entity({name: 'link'})
export class Link extends BaseEntity{
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    LINK: string;

    @Column()
    TOPUBLISH: number;

    @Column()
    PUBLISHED: number;

    @Column()
    DATE: Date;

    @Column()
    GROUP_ID: number;

    constructor(link: string, topublish: number, publish: number) {
        super();
        this.LINK = link;
        this.TOPUBLISH = topublish;
        this.PUBLISHED = publish;
        this.DATE = new Date();
        this.GROUP_ID = 0;
    }
}