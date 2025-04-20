FROM node:23 AS base

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
WORKDIR /app
RUN corepack enable
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# Install pnpm for this stage
RUN corepack enable

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build

FROM base AS runner
WORKDIR /app

# Create the user and set up directories with correct permissions
RUN groupadd --system --gid 1001 expressjs && \
    useradd --system --uid 1001 expressjs --gid expressjs --create-home && \
    mkdir -p /app /home/expressjs/.local/share/pnpm && \
    chown -R expressjs:expressjs /app /home/expressjs

# Set pnpm store directory
ENV PNPM_HOME="/home/expressjs/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Don't run production as root
USER expressjs
COPY --from=installer --chown=expressjs:expressjs /app .

CMD ["node", "apps/api/dist/index.js"]
