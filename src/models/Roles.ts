import { QueryConfig } from 'pg';
import { pgConnection } from '../server';


export const getRoles = async () => {
  const query : QueryConfig = {
    name: 'getRole',
    text: 'SELECT * FROM role',
    values: []
  };
  try {
    const result = await pgConnection.singleQuery(query);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createRole = async (name : string) => {
  const query : QueryConfig = {
    name: 'createRole',
    text: 'INSERT INTO role (name) VALUES ( \'$1\' )',
    values: [name]
  };
  try {
    const result = await pgConnection.singleQuery(query);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteRole = async (id : number) => {
  const query : QueryConfig = {
    name: 'deleteRole',
    text: 'DELETE FROM role id=$1',
    values: [id]
  };
  try {
    const result = await pgConnection.singleQuery(query);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateRole = async (id : number, payload : { name : string }) => {
  const query : QueryConfig = {
    name: 'updateRole',
    text: 'UPDATE role SET name=\'$1\' WHERE id=$2',
    values: [payload.name, id]
  };
  try {
    const result = await pgConnection.singleQuery(query);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
