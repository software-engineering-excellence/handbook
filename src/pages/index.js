import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Code Reviews',
    imageUrl: 'img/undraw_code_reviews.svg',
    path: 'handbook/code-reviews',
    description: (
      <>
        Code reviews not only need to be given effectively,
        it is also important to know how to receiving them well.
      </>
    ),
  },
  {
    title: 'Pair Programming',
    imageUrl: 'img/undraw_pair_programming.svg',
    path: 'handbook/pair-programming',
    description: (
      <>
        A deep-dive into five techniques;
        their typical use-cases, effectiveness and how to practice these techniques remotely.
      </>
    ),
  },
  {
    title: 'Technical Debt',
    imageUrl: 'img/undraw_savings.svg',
    path: 'handbook/technical-debt',
    description: (
      <>
        Technical debt eventually has to be paid off. Learn here how you can
        apply preventive practices to make your life easier.
      </>
    ),
  },
  {
    title: 'Feature Flags',
    imageUrl: 'img/undraw_dev_focus.svg',
    path: 'handbook/feature-flags',
    description: (
      <>
        The moment you add a feature flag, it becomes a tech debt.
        Learn when and how to best use them in this chapter.
      </>
    ),
  },
  {
    title: 'Debugging Techniques',
    imageUrl: 'img/undraw_bug_fixing.svg',
    path: 'handbook/debugging-techniques',
    description: (
      <>
        Using techniques such as Rubber Duck Debugging effectively
        will make you a better developer.
      </>
    ),
  },
  {
    title: 'Refactoring Techniques',
    imageUrl: 'img/undraw_in_progress.svg',
    path: 'handbook/refactoring-techniques',
    description: (
      <>
        Have you found yourself in a situation where a refactor broke
        your entire system, then this chapter is for you.
      </>
    ),
  },
  {
    title: 'Branch-Based Testing',
    imageUrl: 'img/undraw_pull_request.svg',
    path: 'handbook/branch-based-testing',
    description: (
      <>
        Branch-Based Testing (BBT), also know as deployment previews, is the practice of
        testing new code in ephemeral environments.
      </>
    ),
  },
  {
    title: 'Branching Strategies',
    imageUrl: 'img/undraw_version_control.svg',
    path: 'handbook/branching-strategies',
    description: (
      <>
        An important part of the software development workflow,
        which can greatly improve the team’s efficiency, if executed correctly.
      </>
    ),
  },
  {
    title: 'Technical Documentation',
    imageUrl: 'img/undraw_google_docs.svg',
    path: 'handbook/technical-documentation',
    description: (
      <>
        Unless you work on private projects, most software you write needs
        to be easily understood by other engineers.
      </>
    ),
  },
];

function Feature({imageUrl, title, description, path}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <a className="text--center" href={path} target="_self">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </a>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      description="Proven practices for developing software successfully">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('handbook/')}>
              Handbook
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
