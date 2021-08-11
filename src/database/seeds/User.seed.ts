import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '@src/user/entities/user.entity';
import { users } from '../data';
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    for (const user of users) {
      await User.create(user).save();
    }
  }
}
