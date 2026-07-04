import prisma from './prisma';

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(limit = 3) {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getLatestPosts(limit = 3) {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function getFormations() {
  try {
    return await prisma.formation.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}
