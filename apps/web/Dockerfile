FROM node:23 AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
WORKDIR /app
RUN corepack enable
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# Install pnpm for this stage
RUN corepack enable

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build

FROM base AS runner
WORKDIR /app

# Create the user and set up directories with correct permissions
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs --gid nodejs --create-home && \
    mkdir -p /app /home/nextjs/.local/share/pnpm && \
    chown -R nextjs:nodejs /app /home/nextjs

# Set pnpm store directory
ENV PNPM_HOME="/home/nextjs/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Don't run production as root
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]
