import { Connection } from 'mongoose';
import { PostSchema } from './post.schema';

export const postProviders = [
  {
    provide: 'PostModel',
    useFactory: (connection: Connection) => connection.model('Post', PostSchema),
    inject: ['DatabaseConnection'],
  },
];
