import {Request, Response} from 'express';
import {getManager} from "typeorm";
import Category from '../entity/Category';

class CategoryController {

    public async store(req: Request, res: Response) {
        const entityManager = getManager();
        const category = new Category();
        const {name, parent, area} = req.body;

        name ? category.name = name : category.name = null;
        parent ? category.parent = parent : category.parent = null;
        area ? category.area = area : category.area = null;

        try {
            await entityManager.save(category);
        } catch (error) {
            res.status(500).send(error);
        }
        res.status(200).send(category);
    }

    public async show(req: Request, res: Response) {
        const entityManager = getManager();
        const {id} = req.params;
        const category = await entityManager.findOne(Category, id);

        if (category) {
            res.status(200).send(category);
        } else {
            res.status(200).send('no existe');
        }
    }
}

export default CategoryController;