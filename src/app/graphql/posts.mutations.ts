import { gql } from 'apollo-angular';

export class Mutations {
  public static get CREATE_POST() {
    return gql`
      mutation createPost($title: String!, $body: String!) {
        createPost(input: { title: $title, body: $body }) {
          id
          title
          body
        }
      }
    `;
  }
  public static get DELETE_POST() {
    return gql`
      mutation deletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;
  }
}
