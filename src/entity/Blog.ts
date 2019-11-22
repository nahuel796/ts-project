import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Category from "./Category";

@Entity()
class Blog {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 500, nullable: false})
    public title: string;

    @Column({type: "text", nullable: false})
    public description: string;

    @ManyToOne(type => Category, category => category.id)
    category: Category;
}

export default Blog;