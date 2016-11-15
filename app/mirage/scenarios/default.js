/* global md5 */
export default function (server) {
  server.create('entry', {emailHash: md5('foobar@example.com')});
  server.createList('entry', 10);
}
