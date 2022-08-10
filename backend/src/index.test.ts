import { handler } from '.';
import * as UserService from './users.service';

describe('POST users/', () => {
  test('no body', async () => {
    const mockedEvent = {
      httpMethod: 'POST',
      pathParameters: {
        proxy: 'users/'
      },
      body: '{}'
    };
    const result = await handler(mockedEvent);
    expect(result.statusCode).toBe(400);
  });
  test('invalid body', async () => {
    const mockedEvent = {
      httpMethod: 'POST',
      pathParameters: {
        proxy: 'users/'
      },
      body: '{"firstName":"amr"}'
    };

    (UserService as any).createUser = jest.fn().mockResolvedValue(null);

    const result = await handler(mockedEvent);
    expect(result.statusCode).toBe(400);
  });
  test('valid body', async () => {
    const mockedEvent = {
      httpMethod: 'POST',
      pathParameters: {
        proxy: 'users/'
      },
      body: '{"firstName":"amr", "lastName":"el-shinawy", "email":"a@a.com"}'
    };

    (UserService as any).createUser = jest.fn().mockResolvedValue(null);

    const result = await handler(mockedEvent);
    expect(result.statusCode).toBe(201);
  });
});

describe('GET users/', () => {
  test('list', async () => {
    const mockedEvent = {
      httpMethod: 'GET',
      pathParameters: {
        proxy: 'users/'
      },
      body: '{}'
    };

    (UserService as any).getAllUsers = jest.fn().mockResolvedValue([{ firstName: 'amr', lastName: 'el-shinawy', email: 'a@a.com' }]);

    const result = await handler(mockedEvent);
    expect(result.statusCode).toBe(200);
  });

});
