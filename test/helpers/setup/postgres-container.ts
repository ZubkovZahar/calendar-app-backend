import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';

export class PostgresContainer {
  private container: StartedPostgreSqlContainer;

  async start() {
    this.container = await new PostgreSqlContainer('postgres:15')
      .withDatabase('test_db')
      .withUsername('test')
      .withPassword('test')
      .start();

    process.env.DB_HOST = this.container.getHost();
    process.env.DB_PORT = this.container.getPort().toString();
    process.env.DB_USERNAME = this.container.getUsername();
    process.env.DB_PASSWORD = this.container.getPassword();
    process.env.DB_NAME = this.container.getDatabase();
    process.env.NODE_ENV = 'test';
  }

  async stop() {
    if (this.container) {
      await this.container.stop();
    }
  }

  async cleanDatabase(dataSource: DataSource) {
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE "${entity.tableName}" CASCADE;`);
    }
  }
}
