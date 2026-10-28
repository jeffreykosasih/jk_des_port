import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectView } from '@/components/ProjectView';
import { PROJECTS } from '@/lib/data';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return { title: 'Project' };
  return { title: project.title };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectView slug={slug} />;
}
