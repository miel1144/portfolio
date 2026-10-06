import portfolioData from '@/data/portfolio.json';

export type Personal = typeof portfolioData.personal;
export type Social = (typeof portfolioData.social)[number];
export type Project = (typeof portfolioData.projects)[number];
export type Skill = (typeof portfolioData.skills.frontend)[number];

export const portfolio = portfolioData;