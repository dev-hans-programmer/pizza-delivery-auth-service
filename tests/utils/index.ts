import { DataSource } from 'typeorm';

export const truncateTable = async (connection: DataSource) => {
    const entitites = connection.entityMetadatas;

    const promises = entitites.map((entity) => {
        const repo = connection.getRepository(entity.name);
        return repo.clear();
    });

    await Promise.all(promises);
};
