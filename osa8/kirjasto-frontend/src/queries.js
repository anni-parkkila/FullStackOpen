import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      published
      author
      genres
      id
    }
  }
`;

export const ALL_AUTHORS_AND_BOOKS = gql`
  query AllAuthorsAndBooks {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      published
      author
      genres
      id
    }
  }
`;
