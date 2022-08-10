import { createUser, getAllUsers } from './users.service';
import { validationRules } from './users.validation';



const handleGetUsersRequest = async () => {
  try {

    const items = await getAllUsers();

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      },
      body: items
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(err)
    };
  }
};

const handleCreateUserRequest = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const { error } = validationRules.validate(body);
    if (error) {
      return {
        statusCode: 400,
        headers: {
          'content-type': 'text/plain'
        },
        body: `validation error: ${error.message}.`
      };
    }

    await createUser(body);

    return {
      statusCode: 201,
      headers: {
        'content-type': 'text/plain'
      },
      body: 'Created.'
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'content-type': 'text/plain'
      },
      body: 'Internal server error.'
    };
  }
};

export const handler = async (event: any) => {

  const routeKey = `${event.httpMethod} ${event.pathParameters?.proxy}`;

  if (routeKey === 'GET users/') {
    return await handleGetUsersRequest();
  }

  if (routeKey === 'POST users/') {
    return await handleCreateUserRequest(event);
  }

  return {
    statusCode: 404,
    body: `No handler for routeKey ${routeKey}.`
  };
};
