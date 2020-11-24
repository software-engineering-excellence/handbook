# Create or update the infrastructure.
.PHONY: infrastructure
infrastructure:
	(cd infrastructure; \
	terraform get && \
	terraform init && \
	terraform apply)

# Build the static site.
.PHONY: build
build:
	npm install
	npm run build

# Deploy the static site, by copying the built site to the site S3 bucket.
.PHONY: deploy
deploy: build
	aws s3 sync --delete ./build/ s3://software-engineering-excellence/
