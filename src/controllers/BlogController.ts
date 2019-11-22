import {Request, Response} from 'express';
import {getManager} from "typeorm";
import Blog from '../entity/Blog';

class BlogController {

    public async store(req: Request, res: Response) {
        const entityManager = getManager();
        const blog = new Blog();
        const {title, description, category} = req.body;

        title ? blog.title = title : blog.title = null;
        description ? blog.description = description : blog.description = null;
        category ? blog.category = category : blog.category = null;

        try {
            await entityManager.save(blog);
        } catch (error) {
            res.status(500).send(error);
        }
        res.status(200).send(blog);
    }

    public async show(req: Request, res: Response) {
        const entityManager = getManager();
        const {id} = req.params;
        const blog = await entityManager.findOne(Blog, id);

        if (blog) {
            res.status(200).send(blog);
        } else {
            res.status(200).send('no existe');
        }
    }
}

export default BlogController;