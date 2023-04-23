import { gql } from 'apollo-angular';

export class Queries {
  public static get GET_POSTS() {
    return gql`
      {
        posts {
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
