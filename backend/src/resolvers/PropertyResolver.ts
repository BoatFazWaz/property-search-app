import { Resolver, Query, Mutation, Arg, Ctx, Int, Float } from 'type-graphql';
import { Property, PropertyPagination } from '../models/Property';
import { PrismaClient, PropertyType, PropertyStatus } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';
import Redis from 'ioredis';
import { Client } from '@elastic/elasticsearch';

interface Context {
  req: AuthRequest;
  prisma: PrismaClient;
}

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Initialize Elasticsearch client
const elasticsearch = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
});

@Resolver(Property)
export class PropertyResolver {
  // Get all properties with pagination and filtering
  @Query(() => PropertyPagination)
  async properties(
    @Arg('page', () => Int, { defaultValue: 1 }) page: number,
    @Arg('limit', () => Int, { defaultValue: 10 }) limit: number,
    @Arg('minPrice', () => Float, { nullable: true }) minPrice?: number,
    @Arg('maxPrice', () => Float, { nullable: true }) maxPrice?: number,
    @Arg('bedrooms', () => Int, { nullable: true }) bedrooms?: number,
    @Arg('bathrooms', () => Float, { nullable: true }) bathrooms?: number,
    @Arg('type', () => PropertyType, { nullable: true }) type?: PropertyType,
    @Arg('city', { nullable: true }) city?: string,
    @Arg('status', () => PropertyStatus, { nullable: true }) status?: PropertyStatus,
    @Ctx() ctx: Context
  ): Promise<PropertyPagination> {
    // Build filter object
    const filter: any = {
      where: {
        AND: []
      }
    };

    // Add filters if they exist
    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.where.AND.push({ price: { gte: minPrice, lte: maxPrice } });
    } else if (minPrice !== undefined) {
      filter.where.AND.push({ price: { gte: minPrice } });
    } else if (maxPrice !== undefined) {
      filter.where.AND.push({ price: { lte: maxPrice } });
    }

    if (bedrooms !== undefined) {
      filter.where.AND.push({ bedrooms: { gte: bedrooms } });
    }

    if (bathrooms !== undefined) {
      filter.where.AND.push({ bathrooms: { gte: bathrooms } });
    }

    if (type !== undefined) {
      filter.where.AND.push({ type });
    }

    if (city !== undefined) {
      filter.where.AND.push({ city: { contains: city } });
    }

    if (status !== undefined) {
      filter.where.AND.push({ status });
    }

    // If no filters, remove the AND clause
    if (filter.where.AND.length === 0) {
      delete filter.where.AND;
    }

    // Try to get from cache
    const cacheKey = `properties:${page}:${limit}:${JSON.stringify(filter)}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count
    const total = await ctx.prisma.property.count(filter);
    const pages = Math.ceil(total / limit);

    // Get properties
    const properties = await ctx.prisma.property.findMany({
      ...filter,
      skip,
      take: limit,
      include: {
        images: true,
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const result = {
      properties,
      total,
      pages,
      currentPage: page,
    };

    // Cache the result for 5 minutes
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);

    return result;
  }

  // Get single property by ID
  @Query(() => Property, { nullable: true })
  async property(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<Property | null> {
    // Try to get from cache
    const cacheKey = `property:${id}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const property = await ctx.prisma.property.findUnique({
      where: { id },
      include: {
        images: true,
        user: true,
      },
    });

    if (property) {
      // Cache the result for 10 minutes
      await redis.set(cacheKey, JSON.stringify(property), 'EX', 600);
    }

    return property;
  }

  // Search properties (uses Elasticsearch)
  @Query(() => [Property])
  async searchProperties(
    @Arg('query') query: string,
    @Ctx() ctx: Context
  ): Promise<Property[]> {
    try {
      // Try to get from cache
      const cacheKey = `search:${query}`;
      const cached = await redis.get(cacheKey);

      if (cached) {
        return JSON.parse(cached);
      }

      // In a real application, this would use Elasticsearch
      // For now, we'll do a simple search in the database
      const properties = await ctx.prisma.property.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { address: { contains: query } },
            { city: { contains: query } },
            { state: { contains: query } },
          ],
        },
        include: {
          images: true,
          user: true,
        },
      });

      // Cache the result for 5 minutes
      await redis.set(cacheKey, JSON.stringify(properties), 'EX', 300);

      return properties;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  // Create new property (requires authentication)
  @Mutation(() => Property)
  async createProperty(
    @Arg('title') title: string,
    @Arg('price', () => Float) price: number,
    @Arg('description') description: string,
    @Arg('address') address: string,
    @Arg('city') city: string,
    @Arg('state') state: string,
    @Arg('zipCode') zipCode: string,
    @Arg('bedrooms', () => Int) bedrooms: number,
    @Arg('bathrooms', () => Float) bathrooms: number,
    @Arg('area', () => Float) area: number,
    @Arg('type', () => PropertyType) type: PropertyType,
    @Arg('status', () => PropertyStatus, { nullable: true }) status?: PropertyStatus,
    @Arg('features', () => [String], { nullable: true }) features?: string[],
    @Arg('images', () => [String], { nullable: true }) imageUrls?: string[],
    @Arg('latitude', () => Float, { nullable: true }) latitude?: number,
    @Arg('longitude', () => Float, { nullable: true }) longitude?: number,
    @Ctx() ctx: Context
  ): Promise<Property> {
    // Check if user is authenticated
    if (!ctx.req.user) {
      throw new Error('You must be logged in to create a property');
    }

    // Create the property with images if provided
    const property = await ctx.prisma.property.create({
      data: {
        title,
        price,
        description,
        address,
        city,
        state,
        zipCode,
        bedrooms,
        bathrooms,
        area,
        type,
        status: status || PropertyStatus.AVAILABLE,
        features: features ? JSON.stringify(features) : null,
        latitude,
        longitude,
        userId: ctx.req.user.id,
        images: imageUrls ? {
          create: imageUrls.map(url => ({ url }))
        } : undefined,
      },
      include: {
        images: true,
        user: true,
      },
    });

    // Clear any related cache
    await redis.del('properties:*');

    return property;
  }
} 