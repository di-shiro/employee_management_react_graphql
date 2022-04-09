import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password, email: "" }) {
      user {
        id
        username
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query {
    allEmployees {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            deptName
          }
        }
      }
    }
  }
`;

export const GET_DEPTS = gql`
  query {
    allDepartments {
      edges {
        node {
          id
          deptName
        }
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation ($name: String!, $joinYear: Int!, $department: ID!) {
    createEmployee(
      input: { name: $name, joinYear: $joinYear, department: $department }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          deptName
        }
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation ($id: ID!, $name: String!, $joinYear: Int!, $department: ID!) {
    updateEmployee(
      input: {
        id: $id
        name: $name
        joinYear: $joinYear
        department: $department
      }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          deptName
        }
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation ($id: ID!) {
    deleteEmployee(input: { id: $id }) {
      employee {
        id
      }
    }
  }
`;
