import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 255, nullable: false})
    public email: string;

    @Column({type: "varchar", length: 255, nullable: false})
    public password: string;

}

export default User;