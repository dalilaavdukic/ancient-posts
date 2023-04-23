import { gql } from 'apollo-angular';

export class Queries {
  public static get GET_POSTS() {
    return gql`
      {
        posts(options: { paginate: { page: 1, limit: 15 } }) {
          data {
            id
            title
            body
          }
        }
      }
    `;
  }
}
