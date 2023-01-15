import assert from 'assert';
import app from '../../src/app';

describe('\'task\' service', () => {
  it('registered the service', () => {
    const service = app.service('tasks');

    assert.ok(service, 'Registered the service');
  });
});
