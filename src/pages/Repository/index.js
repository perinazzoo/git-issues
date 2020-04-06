import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueLabel,
  IssueFilter,
  LoadingIssues,
  PageContainer,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issuesLoading: false,
    filters: [
      { name: 'Todas', state: 'all', active: true },
      { name: 'Abertas', state: 'open', active: false },
      { name: 'Fechadas', state: 'closed', active: false },
    ],
    filterIndex: 0,
    repositoryName: '',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.name);

    const [info, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      loading: false,
      repository: info.data,
      issues: issues.data,
      repositoryName: repoName,
    });
  }

  loadIssues = async () => {
    const { repositoryName, page, filters, filterIndex } = this.state;

    this.setState({ issuesLoading: true });

    const issues = await api.get(`/repos/${repositoryName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: issues.data, issuesLoading: false });
  };

  handleFilter = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      issuesLoading,
      page,
      filterIndex,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              key={filter.state}
              value={filter.state}
              type="button"
              onClick={() => this.handleFilter(index)}
            >
              {filter.name}
            </button>
          ))}
        </IssueFilter>

        <IssueList issuesLoading={issuesLoading}>
          {issuesLoading ? (
            <LoadingIssues>
              <FaSpinner color="#999" size={150} />
            </LoadingIssues>
          ) : (
              issues.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a>
                      {issue.labels.map(label => (
                        <IssueLabel color={label.color} key={String(label.id)}>
                          {label.name}
                        </IssueLabel>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))
            )}
        </IssueList>
        <PageContainer>
          <button
            disabled={page === 1}
            type="button"
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <button type="button" onClick={() => this.handlePage('next')}>
            Próxima
          </button>
        </PageContainer>
      </Container>
    );
  }
}
