import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const chapters = [
  {
    title: 'Code Reviews',
    imageUrl: '/img/undraw_code_reviews.svg',
    path: 'code-reviews',
    description:
      'Code reviews not only need to be given effectively, it is also important to know how to receive them well',
  },
  {
    title: 'Pair Programming',
    imageUrl: '/img/undraw_pair_programming.svg',
    path: 'pair-programming',
    description:
      'A deep-dive into five techniques; their typical use-cases, effectiveness and how to practice these techniques remotely.',
  },
  {
    title: 'Technical Debt',
    imageUrl: '/img/undraw_savings.svg',
    path: 'technical-debt',
    description:
      'Technical debt eventually has to be paid off. Learn here how you can apply preventive practices to make your life easier.',
  },
  {
    title: 'Feature Flags',
    imageUrl: '/img/undraw_dev_focus.svg',
    path: 'feature-flags',
    description:
      'The moment you add a feature flag, it becomes a tech debt. Learn when and how to best use them in this chapter.',
  },
  {
    title: 'Debugging Techniques',
    imageUrl: '/img/undraw_bug_fixing.svg',
    path: 'debugging-techniques',
    description: 'Using techniques such as Rubber Duck Debugging effectively will make you a better developer',
  },
  {
    title: 'Refactoring Techniques',
    imageUrl: '/img/undraw_in_progress.svg',
    path: 'refactoring-techniques',
    description:
      'Have you found yourself in a situation where a refactor broke your entire system, then this chapter is for you',
  },
  {
    title: 'Branch-Based Testing',
    imageUrl: '/img/undraw_pull_request.svg',
    path: 'branch-based-testing',
    description:
      'Branch-Based Testing (BBT), also know as deployment previews, is the practice of testing new code in ephemeral environments',
  },
  {
    title: 'Branching Strategies',
    imageUrl: '/img/undraw_version_control.svg',
    path: 'branching-strategies',
    description:
      'An important part of the software development workflow, which can greatly improve the team’s efficiency, if executed correctly.',
  },
  {
    title: 'Technical Documentation',
    imageUrl: '/img/undraw_google_docs.svg',
    path: 'technical-documentation',
    description:
      'Unless you work on private projects, most software you write needs to be easily understood by other engineers.',
  },
];

function Chapter({ imageUrl, title, path, description }) {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className="col col--4" style={{ marginBottom: '1rem' }}>
      <div className="card shadow--lw" style={{ height: '100%' }}>
        <div className="card__image text--center">
          <a className="text--center" href={path} target="_self">
            <img src={imgUrl} alt={title} width="80%" height="200" />
          </a>
        </div>
        <div className="card__body">
          <h4>{title}</h4>
          <small>{description}</small>
        </div>
        <div className="card__footer">
          <a href={path} className="button button--primary button--block">
            Read
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ChapterList() {
  return (
    <section>
      <div className="container">
        <div className="row">
          {chapters.map((props, index) => (
            <Chapter key={index} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
