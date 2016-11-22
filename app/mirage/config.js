import { AUTH_SECRET } from './serializers/entry';

export const ADMIN_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRyeUlkIjoiMSIsImFkbWluIjp0cnVlfQ.kTjIOnyHrHH1azZ0MdiIyLCmbs5qbSqNMhuyeZxtGv8';
export const AUTHORIZED_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnRyeUlkIjoiMSIsImFkbWluIjpmYWxzZX0.iCGyd7uuE1JOjnM60V3VAI_yvefgvL7XfvfmZ2gKWCo';

export default function () {
  this.namespace = '/api';
  this.resource('entries');
  this.post('token-auth', {token: AUTHORIZED_JWT_TOKEN});
  this.post('token-recover', {secret: AUTH_SECRET});
}
