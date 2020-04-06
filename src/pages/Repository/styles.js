import styled, { css } from 'styled-components';

import rotate from '../../utils/rotate';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          transition: all 0.3s;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  ${props =>
    props.issuesLoading &&
    css`
      svg {
        animation: ${rotate} 3s linear infinite;
      }
    `}
`;

export const IssueLabel = styled.span`
  background-color: ${props => `#${props.color}`};
  color: #222;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const IssueFilter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin-top: 20px;

  button {
    border: 0;
    background: none;
    font-size: 15px;
    font-weight: bold;
    color: #7159c1;
    font-family: Arial, Helvetica, sans-serif;
    height: 24px;

    cursor: pointer;

    transition: all 0.2s ease;

    &:hover {
      border-bottom: 2px solid #7159c1;
    }

    &:nth-child(${props => props.active + 1}) {
      border-bottom: 2px solid #7159c1;
    }
  }
`;

export const LoadingIssues = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 50px auto;

  svg {
    opacity: 0.4;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;

  button {
    border: 0;
    background-color: #7159c1;
    color: #fff;
    height: 38px;
    width: 72px;
    border-radius: 5px;
    cursor: pointer;

    transition: opacity 0.25s ease-out, background-color 0.3s;

    &:hover:enabled {
      background-color: #553da4;
    }

    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
