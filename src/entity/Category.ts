import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 500, nullable: false})
    public name: string;

    @Column({type: "int", nullable: true})
    public parent: string;

    @Column({type: "varchar", length: 500, nullable: true})
    public area: string;

}

export default Category;